use crate::library_db::{self, DbTrack, LibraryState};
use rusqlite::{params, Connection, OptionalExtension};
use serde::Deserialize;
use serde::Serialize;
use std::path::{Path, PathBuf};
use tauri::{AppHandle, Emitter, State};

const QUEUE_ID: &str = "default";
const HISTORY_LIMIT: i64 = 500;

/// Where a playing queue was populated from. The frontend asks for a new
/// queue to be built in a single backend transaction, so no full Track array
/// crosses IPC during Replace.
#[derive(Debug, Clone, Deserialize)]
#[serde(tag = "type", rename_all = "camelCase")]
pub enum QueueSource {
    /// Explicit list of already-known track ids (e.g. browser/open files).
    Tracks { ids: Vec<String> },
    /// A saved playlist.
    Playlist { id: String },
    /// The whole Library (optionally filtered).
    Library {
        search: Option<String>,
        artist: Option<String>,
        album: Option<String>,
        genre: Option<String>,
        sort: Option<String>,
    },
    /// Tracks discovered by a previous scan job.
    Scan { scan_id: String },
    /// A music folder parsed on demand.
    Folder { path: String },
}

#[derive(Debug, Clone, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct QueueState {
    pub total: i64,
    pub current_seq: Option<i64>,
    pub current_track: Option<DbTrack>,
    pub current_position: f64,
    pub shuffle: bool,
    pub repeat: String,
    /// Sequence index of the current entry in the displayed order, used by
    /// the virtualized queue list to anchor its window.
    pub current_order_index: Option<i64>,
}

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct QueuePage<T> {
    pub items: Vec<T>,
    pub total: i64,
    pub limit: usize,
    pub offset: usize,
    pub current_seq: Option<i64>,
}

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct QueueEntry {
    pub seq: i64,
    #[serde(flatten)]
    pub track: DbTrack,
}

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct HistoryRow {
    pub id: String,
    pub title: String,
    pub artist: String,
    pub album: String,
    pub duration: f64,
    pub cover: Option<String>,
    pub played_at: i64,
}

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct QueuePopulated {
    pub total: i64,
    pub current_seq: Option<i64>,
    pub current_track: Option<DbTrack>,
    pub position: f64,
    pub shuffle: bool,
    pub repeat: String,
}

trait ValueConn {
    fn query_value<T: rusqlite::types::FromSql>(&self, sql: &str) -> Result<T, String>;
}

impl ValueConn for Connection {
    fn query_value<T: rusqlite::types::FromSql>(&self, sql: &str) -> Result<T, String> {
        self.query_row(sql, params![QUEUE_ID], |r| r.get(0))
            .map_err(|e| e.to_string())
    }
}

impl ValueConn for rusqlite::Transaction<'_> {
    fn query_value<T: rusqlite::types::FromSql>(&self, sql: &str) -> Result<T, String> {
        self.query_row(sql, params![QUEUE_ID], |r| r.get(0))
            .map_err(|e| e.to_string())
    }
}

fn queue_repeat(conn: &impl ValueConn) -> Result<String, String> {
    conn.query_value("SELECT repeat_mode FROM queue_state WHERE id=?1")
}

fn queue_shuffle(conn: &impl ValueConn) -> Result<bool, String> {
    conn.query_value::<i64>("SELECT shuffle FROM queue_state WHERE id=?1")
        .map(|v| v != 0)
}

pub fn ensure_queue_schema(conn: &Connection) -> Result<(), String> {
    conn.execute_batch(
        r#"
        CREATE TABLE IF NOT EXISTS playing_queue (
          seq INTEGER PRIMARY KEY AUTOINCREMENT,
          track_id TEXT NOT NULL,
          shuffle_pos INTEGER,
          played INTEGER NOT NULL DEFAULT 0,
          FOREIGN KEY(track_id) REFERENCES tracks(id) ON DELETE CASCADE
        );
        CREATE INDEX IF NOT EXISTS idx_queue_shuffle ON playing_queue(shuffle_pos);
        CREATE INDEX IF NOT EXISTS idx_queue_track ON playing_queue(track_id);

        CREATE TABLE IF NOT EXISTS queue_state (
          id TEXT PRIMARY KEY,
          current_seq INTEGER,
          current_position REAL NOT NULL DEFAULT 0,
          shuffle INTEGER NOT NULL DEFAULT 0,
          repeat_mode TEXT NOT NULL DEFAULT 'off',
          updated_at INTEGER NOT NULL DEFAULT 0
        );

        CREATE TABLE IF NOT EXISTS history (
          track_id TEXT PRIMARY KEY,
          played_at INTEGER NOT NULL,
          play_count INTEGER NOT NULL DEFAULT 1,
          FOREIGN KEY(track_id) REFERENCES tracks(id) ON DELETE CASCADE
        );
        CREATE INDEX IF NOT EXISTS idx_history_time ON history(played_at DESC);
        "#,
    )
    .map_err(|e| e.to_string())?;
    conn.execute(
        "INSERT OR IGNORE INTO queue_state(id,current_seq,current_position,shuffle,repeat_mode,updated_at) \
         VALUES(?1,NULL,0,0,'off',?2)",
        params![QUEUE_ID, library_db::now_ms()],
    )
    .map_err(|e| e.to_string())?;
    Ok(())
}

trait ExecConn {
    fn exec(&self, sql: &str) -> Result<usize, String>;
}

impl ExecConn for Connection {
    fn exec(&self, sql: &str) -> Result<usize, String> {
        self.execute_batch(sql).map_err(|e| e.to_string())?;
        Ok(0)
    }
}

impl ExecConn for rusqlite::Transaction<'_> {
    fn exec(&self, sql: &str) -> Result<usize, String> {
        self.execute_batch(sql).map_err(|e| e.to_string())?;
        Ok(0)
    }
}

fn assign_shuffle_order(conn: &impl ExecConn) -> Result<(), String> {
    conn.exec(
        "UPDATE playing_queue
         SET shuffle_pos = (
           SELECT pos FROM (
             SELECT seq, ROW_NUMBER() OVER (ORDER BY RANDOM()) - 1 AS pos
             FROM playing_queue
           ) s WHERE s.seq = playing_queue.seq
         );",
    )?;
    Ok(())
}

fn clear_shuffle_order(conn: &impl ExecConn) -> Result<(), String> {
    conn.exec("UPDATE playing_queue SET shuffle_pos=NULL;")?;
    Ok(())
}

trait QueryScalarConn {
    fn scalar<T: rusqlite::types::FromSql>(&self, sql: &str) -> Result<T, String>;
}

impl QueryScalarConn for Connection {
    fn scalar<T: rusqlite::types::FromSql>(&self, sql: &str) -> Result<T, String> {
        self.query_row(sql, [], |r| r.get(0))
            .map_err(|e| e.to_string())
    }
}

impl QueryScalarConn for rusqlite::Transaction<'_> {
    fn scalar<T: rusqlite::types::FromSql>(&self, sql: &str) -> Result<T, String> {
        self.query_row(sql, [], |r| r.get(0))
            .map_err(|e| e.to_string())
    }
}

fn highest_seq(conn: &impl QueryScalarConn) -> Result<i64, String> {
    conn.scalar("SELECT COALESCE(MAX(seq),-1) FROM playing_queue")
}

fn next_seq_after_current(
    conn: &impl QueryScalarConn,
    current: Option<i64>,
) -> Result<i64, String> {
    let top = highest_seq(conn)?;
    match current {
        None => Ok(0),
        Some(c) if c >= top => Ok(top + 1),
        Some(c) => Ok(c + 1),
    }
}

fn order_clause(shuffle: bool) -> &'static str {
    if shuffle {
        "q.shuffle_pos ASC, q.seq ASC"
    } else {
        "q.seq ASC"
    }
}

fn entry_count(conn: &impl QueryScalarConn) -> Result<i64, String> {
    conn.scalar("SELECT COUNT(*) FROM playing_queue")
}

trait CurrentSeqConn {
    fn current_seq(&self) -> Result<Option<i64>, String>;
}

impl CurrentSeqConn for Connection {
    fn current_seq(&self) -> Result<Option<i64>, String> {
        self.query_row(
            "SELECT current_seq FROM queue_state WHERE id=?1",
            params![QUEUE_ID],
            |r| r.get(0),
        )
        .optional()
        .map(|v| v.flatten())
        .map_err(|e| e.to_string())
    }
}

impl CurrentSeqConn for rusqlite::Transaction<'_> {
    fn current_seq(&self) -> Result<Option<i64>, String> {
        self.query_row(
            "SELECT current_seq FROM queue_state WHERE id=?1",
            params![QUEUE_ID],
            |r| r.get(0),
        )
        .optional()
        .map(|v| v.flatten())
        .map_err(|e| e.to_string())
    }
}

#[allow(dead_code)]
fn current_seq_value(conn: &impl CurrentSeqConn) -> Result<Option<i64>, String> {
    conn.current_seq()
}

trait QueueConn {
    fn execute_queue(&self, sql: &str, params: &[&dyn rusqlite::ToSql]) -> Result<usize, String>;
}

impl QueueConn for Connection {
    fn execute_queue(&self, sql: &str, params: &[&dyn rusqlite::ToSql]) -> Result<usize, String> {
        self.execute(sql, params).map_err(|e| e.to_string())
    }
}

impl QueueConn for rusqlite::Transaction<'_> {
    fn execute_queue(&self, sql: &str, params: &[&dyn rusqlite::ToSql]) -> Result<usize, String> {
        self.execute(sql, params).map_err(|e| e.to_string())
    }
}

fn reset_sequence_numbers_tx(conn: &impl QueueConn) -> Result<(), String> {
    conn.execute_queue("CREATE TEMP TABLE IF NOT EXISTS queue_renumber (old_seq INTEGER PRIMARY KEY, new_seq INTEGER NOT NULL)", &[])?;
    conn.execute_queue("DELETE FROM queue_renumber", &[])?;
    conn.execute_queue(
        "INSERT INTO queue_renumber(old_seq,new_seq) SELECT seq, ROW_NUMBER() OVER (ORDER BY seq) - 1 FROM playing_queue",
        &[],
    )?;
    conn.execute_queue(
        "UPDATE playing_queue SET seq=(SELECT new_seq FROM queue_renumber WHERE old_seq=playing_queue.seq)",
        &[],
    )?;
    conn.execute_queue("DROP TABLE queue_renumber", &[])?;
    Ok(())
}

fn touch_state(conn: &impl QueueConn) -> Result<(), String> {
    conn.execute_queue(
        "UPDATE queue_state SET updated_at=?1 WHERE id=?2",
        &[&library_db::now_ms(), &QUEUE_ID],
    )?;
    Ok(())
}

fn build_queue_from_source(
    tx: &rusqlite::Transaction<'_>,
    source: &QueueSource,
    artwork_dir: &Path,
) -> Result<i64, String> {
    tx.execute("DELETE FROM playing_queue", [])
        .map_err(|e| e.to_string())?;
    tx.execute(
        "UPDATE queue_state SET current_seq=NULL,current_position=0 WHERE id=?1",
        params![QUEUE_ID],
    )
    .map_err(|e| e.to_string())?;

    let inserted: i64 = match source {
        QueueSource::Tracks { ids } => {
            let mut n = 0i64;
            for id in ids {
                n += tx
                    .execute(
                        "INSERT OR IGNORE INTO playing_queue(track_id) VALUES(?1)",
                        params![id],
                    )
                    .map_err(|e| e.to_string())? as i64;
            }
            n
        }
        QueueSource::Playlist { id } => tx
            .execute(
                "INSERT OR IGNORE INTO playing_queue(track_id)
                 SELECT pt.track_id FROM playlist_tracks pt
                 JOIN tracks t ON t.id=pt.track_id
                 WHERE pt.playlist_id=?1
                 ORDER BY pt.position ASC",
                params![id],
            )
            .map_err(|e| e.to_string())? as i64,
        QueueSource::Library {
            search,
            artist,
            album,
            genre,
            sort,
        } => {
            let mut clauses: Vec<String> = vec!["library_owned=1".into()];
            let mut values: Vec<rusqlite::types::Value> = Vec::new();
            if let Some(q) = search.as_ref().filter(|s| !s.trim().is_empty()) {
                clauses.push("(title LIKE ? OR artist LIKE ? OR album LIKE ?)".into());
                let q = format!("%{}%", q);
                values.push(q.clone().into());
                values.push(q.clone().into());
                values.push(q.into());
            }
            for (col, v) in [("artist", artist), ("album", album), ("genre", genre)] {
                if let Some(value) = v.as_ref().filter(|x| !x.is_empty()) {
                    clauses.push(format!("{}=?", col));
                    values.push(value.clone().into());
                }
            }
            let where_sql = clauses.join(" AND ");
            let order = match sort.as_deref() {
                Some("artist-asc") => "artist COLLATE NOCASE,title COLLATE NOCASE",
                Some("album-asc") => "album COLLATE NOCASE,title COLLATE NOCASE",
                Some("dur-asc") => "duration ASC",
                Some("dur-desc") => "duration DESC",
                _ => "title COLLATE NOCASE",
            };
            let sql = format!(
                "INSERT OR IGNORE INTO playing_queue(track_id)
                 SELECT id FROM tracks WHERE {} ORDER BY {}",
                where_sql, order
            );
            let refs: Vec<&dyn rusqlite::ToSql> =
                values.iter().map(|v| v as &dyn rusqlite::ToSql).collect();
            tx.execute(&sql, rusqlite::params_from_iter(refs))
                .map_err(|e| e.to_string())? as i64
        }
        QueueSource::Scan { scan_id } => tx
            .execute(
                "INSERT OR IGNORE INTO playing_queue(track_id)
                 SELECT id FROM tracks
                 WHERE last_seen_scan=?1
                 ORDER BY path ASC",
                params![scan_id],
            )
            .map_err(|e| e.to_string())? as i64,
        QueueSource::Folder { path } => {
            parse_folder_into_tracks(tx, PathBuf::from(path), artwork_dir)?;
            tx.execute(
                "INSERT OR IGNORE INTO playing_queue(track_id)
                 SELECT id FROM tracks WHERE path LIKE ?1 ESCAPE '\\'
                 ORDER BY path ASC",
                params![format!(
                    "{}/%",
                    path.trim_end_matches('/').replace('\\', "/")
                )],
            )
            .map_err(|e| e.to_string())? as i64
        }
    };

    if queue_shuffle(tx).unwrap_or(false) {
        assign_shuffle_order(tx)?;
    } else {
        clear_shuffle_order(tx)?;
    }
    reset_sequence_numbers_tx(tx)?;
    touch_state(tx)?;
    Ok(inserted)
}

fn parse_folder_into_tracks(
    conn: &rusqlite::Transaction<'_>,
    root: PathBuf,
    artwork_dir: &Path,
) -> Result<(), String> {
    use walkdir::WalkDir;
    if !root.exists() {
        return Err("Folder does not exist".into());
    }
    let files = if root.is_file() {
        if library_db::supported_ext(&root) {
            vec![root]
        } else {
            Vec::new()
        }
    } else {
        WalkDir::new(&root)
            .follow_links(false)
            .into_iter()
            .filter_map(Result::ok)
            .filter(|e| e.file_type().is_file() && library_db::supported_ext(e.path()))
            .map(|e| e.into_path())
            .collect()
    };
    for path in files {
        if let Some((track, size, modified)) =
            library_db::parse_track_cached(&path, artwork_dir, false)
        {
            // Folders opened from the player are transient (library_owned=0)
            // unless a later scan promotes them.
            library_db::upsert_track(conn, &track, size, modified, None, false)?;
        }
    }
    Ok(())
}

fn queue_page(
    conn: &Connection,
    limit: usize,
    offset: usize,
) -> Result<QueuePage<QueueEntry>, String> {
    let total = entry_count(conn)?;
    let shuffle = queue_shuffle(conn)?;
    let current = current_seq_value(conn)?;
    let order = order_clause(shuffle);
    let columns = "t.id,t.path,t.title,t.artist,t.album,t.genre,t.year,t.duration,t.artwork_path,t.codec,t.specs,t.replay_gain";
    let sql = format!(
        "SELECT q.seq, {} FROM playing_queue q
         JOIN tracks t ON t.id=q.track_id
         ORDER BY {} LIMIT ? OFFSET ?",
        columns, order
    );
    let mut stmt = conn.prepare(&sql).map_err(|e| e.to_string())?;
    let items = stmt
        .query_map(params![limit as i64, offset as i64], |row| {
            let seq: i64 = row.get(0)?;
            let track = library_db::row_track_indexed(row, 1)?;
            Ok(QueueEntry { seq, track })
        })
        .map_err(|e| e.to_string())?
        .filter_map(Result::ok)
        .collect();
    Ok(QueuePage {
        items,
        total,
        limit,
        offset,
        current_seq: current,
    })
}

fn state_from_conn(conn: &Connection) -> Result<QueueState, String> {
    let total = entry_count(conn)?;
    let shuffle = queue_shuffle(conn)?;
    let repeat = queue_repeat(conn)?;
    let row: Option<(Option<i64>, f64)> = conn
        .query_row(
            "SELECT current_seq,current_position FROM queue_state WHERE id=?1",
            params![QUEUE_ID],
            |r| Ok((r.get(0)?, r.get(1)?)),
        )
        .optional()
        .map_err(|e| e.to_string())?;
    let (current_seq, position) = row.unwrap_or((None, 0.0));
    let current_track = match current_seq {
        Some(seq) => conn
            .query_row(
                "SELECT t.id,t.path,t.title,t.artist,t.album,t.genre,t.year,t.duration,t.artwork_path,t.codec,t.specs,t.replay_gain FROM playing_queue q JOIN tracks t ON t.id=q.track_id WHERE q.seq=?1",
                params![seq],
                |r| library_db::row_track_indexed(r, 0),
            )
            .optional()
            .map_err(|e| e.to_string())?,
        None => None,
    };
    let current_order_index = match current_seq {
        Some(seq) if shuffle => conn
            .query_row(
                "SELECT (SELECT COUNT(*) FROM playing_queue q2 WHERE q2.shuffle_pos < q.shuffle_pos)
                 FROM playing_queue q WHERE q.seq=?1",
                params![seq],
                |r| r.get::<_, i64>(0),
            )
            .optional()
            .map_err(|e| e.to_string())?,
        Some(seq) => Some(seq),
        None => None,
    };
    Ok(QueueState {
        total,
        current_seq,
        current_track,
        current_position: position,
        shuffle,
        repeat,
        current_order_index,
    })
}

fn emit_state(app: &AppHandle, conn: &Connection) {
    if let Ok(state) = state_from_conn(conn) {
        let _ = app.emit("melo:queue-state", state);
    }
}

fn pick_next_seq(
    conn: &Connection,
    current: Option<i64>,
    allow_wrap: bool,
    only_unplayed: bool,
) -> Result<Option<i64>, String> {
    let shuffle = queue_shuffle(conn)?;
    let order = order_clause(shuffle);
    let mut sql = format!("SELECT q.seq FROM playing_queue q JOIN tracks t ON t.id=q.track_id");
    let mut clauses: Vec<String> = Vec::new();
    let mut values: Vec<rusqlite::types::Value> = Vec::new();
    if let Some(cur) = current {
        if shuffle {
            clauses.push(
                "(q.shuffle_pos > (SELECT shuffle_pos FROM playing_queue WHERE seq=?1) OR \
                 (q.shuffle_pos = (SELECT shuffle_pos FROM playing_queue WHERE seq=?1) AND q.seq > ?1))"
                    .into(),
            );
            values.push(cur.into());
        } else {
            clauses.push("q.seq > ?1".into());
            values.push(cur.into());
        }
    }
    if only_unplayed {
        clauses.push("q.played=0".into());
    }
    if !clauses.is_empty() {
        sql.push_str(" WHERE ");
        sql.push_str(&clauses.join(" AND "));
    }
    sql.push_str(&format!(" ORDER BY {} LIMIT 1", order));
    let refs: Vec<&dyn rusqlite::ToSql> =
        values.iter().map(|v| v as &dyn rusqlite::ToSql).collect();
    let found: Option<i64> = conn
        .query_row(&sql, rusqlite::params_from_iter(refs), |r| r.get(0))
        .optional()
        .map_err(|e| e.to_string())?;
    if found.is_some() {
        return Ok(found);
    }
    if only_unplayed {
        return pick_next_seq(conn, current, allow_wrap, false);
    }
    if allow_wrap {
        let first: Option<i64> = conn
            .query_row(
                &format!("SELECT seq FROM playing_queue ORDER BY {} LIMIT 1", order),
                [],
                |r| r.get(0),
            )
            .optional()
            .map_err(|e| e.to_string())?;
        return Ok(first);
    }
    Ok(None)
}

fn pick_prev_seq(conn: &Connection, current: i64) -> Result<i64, String> {
    let shuffle = queue_shuffle(conn)?;
    let mut sql = String::from("SELECT q.seq FROM playing_queue q JOIN tracks t ON t.id=q.track_id");
    if shuffle {
        sql.push_str(
            " WHERE (q.shuffle_pos < (SELECT shuffle_pos FROM playing_queue WHERE seq=?1) OR \
             (q.shuffle_pos = (SELECT shuffle_pos FROM playing_queue WHERE seq=?1) AND q.seq < ?1)) \
             ORDER BY q.shuffle_pos DESC, q.seq DESC LIMIT 1",
        );
    } else {
        sql.push_str(" WHERE q.seq < ?1 ORDER BY q.seq DESC LIMIT 1");
    }
    let found: Option<i64> = conn
        .query_row(&sql, params![current], |r| r.get(0))
        .optional()
        .map_err(|e| e.to_string())?;
    Ok(match found {
        Some(s) => s,
        None => current,
    })
}

fn mark_played(conn: &Connection, seq: i64) -> Result<(), String> {
    conn.execute(
        "UPDATE playing_queue SET played=1 WHERE seq=?1",
        params![seq],
    )
    .map_err(|e| e.to_string())?;
    let track_id: String = conn
        .query_row(
            "SELECT track_id FROM playing_queue WHERE seq=?1",
            params![seq],
            |r| r.get(0),
        )
        .map_err(|e| e.to_string())?;
    conn.execute(
        "INSERT INTO history(track_id,played_at,play_count) VALUES(?1,?2,1)
         ON CONFLICT(track_id) DO UPDATE SET played_at=excluded.played_at,play_count=play_count+1",
        params![track_id, library_db::now_ms()],
    )
    .map_err(|e| e.to_string())?;
    // Cap history so it cannot grow without bound.
    conn.execute(
        "DELETE FROM history WHERE track_id NOT IN
         (SELECT track_id FROM history ORDER BY played_at DESC LIMIT ?1)",
        params![HISTORY_LIMIT],
    )
    .map_err(|e| e.to_string())?;
    touch_state(conn)?;
    Ok(())
}

#[tauri::command]
pub async fn queue_get_state(state: State<'_, LibraryState>) -> Result<QueueState, String> {
    let db_path = state.db_path.clone();
    tauri::async_runtime::spawn_blocking(move || {
        let conn = library_db::open_db(&db_path)?;
        state_from_conn(&conn)
    })
    .await
    .map_err(|e| e.to_string())?
}

#[tauri::command]
pub async fn queue_get_page(
    limit: usize,
    offset: usize,
    state: State<'_, LibraryState>,
) -> Result<QueuePage<QueueEntry>, String> {
    let db_path = state.db_path.clone();
    tauri::async_runtime::spawn_blocking(move || {
        let conn = library_db::open_db(&db_path)?;
        queue_page(&conn, limit, offset)
    })
    .await
    .map_err(|e| e.to_string())?
}

#[tauri::command]
pub async fn queue_populate(
    source: QueueSource,
    start_seq: Option<i64>,
    start_track_id: Option<String>,
    autoplay: Option<bool>,
    app: AppHandle,
    state: State<'_, LibraryState>,
) -> Result<QueuePopulated, String> {
    let db_path = state.db_path.clone();
    let artwork_dir = state.artwork_dir.clone();
    tauri::async_runtime::spawn_blocking(move || {
        let mut conn = library_db::open_db(&db_path)?;
        let tx = conn.transaction().map_err(|e| e.to_string())?;
        let total = build_queue_from_source(&tx, &source, &artwork_dir)?;
        tx.commit().map_err(|e| e.to_string())?;

        let mut seq = start_seq;
        if seq.is_none() {
            if let Some(track_id) = start_track_id.as_ref().filter(|s| !s.is_empty()) {
                let found: Option<i64> = conn
                    .query_row(
                        "SELECT seq FROM playing_queue WHERE track_id=?1 ORDER BY seq LIMIT 1",
                        params![track_id],
                        |r| r.get(0),
                    )
                    .optional()
                    .map_err(|e| e.to_string())?;
                seq = found;
            }
        }
        if seq.is_none() {
            seq = pick_next_seq(&conn, None, false, false)?;
        }
        if let Some(s) = seq {
            conn.execute(
                "UPDATE queue_state SET current_seq=?1,current_position=0 WHERE id=?2",
                params![s, QUEUE_ID],
            )
            .map_err(|e| e.to_string())?;
            mark_played(&conn, s)?;
        } else {
            conn.execute(
                "UPDATE queue_state SET current_seq=NULL,current_position=0 WHERE id=?1",
                params![QUEUE_ID],
            )
            .map_err(|e| e.to_string())?;
        }
        let current_track = seq.and_then(|s| load_track_for_seq(&conn, s).ok().flatten());
        let shuffle = queue_shuffle(&conn)?;
        let repeat = queue_repeat(&conn)?;
        let payload = QueuePopulated {
            total,
            current_seq: seq,
            current_track: current_track.clone(),
            position: 0.0,
            shuffle,
            repeat,
        };
        let _ = app.emit(
            "melo:queue-populated",
            serde_json::json!({
                "autoplay": autoplay.unwrap_or(true),
                "state": payload,
            }),
        );
        emit_state(&app, &conn);
        let _ = app.emit("melo:queue-changed", ());
        Ok(payload)
    })
    .await
    .map_err(|e| e.to_string())?
}

fn load_track_for_seq(conn: &Connection, seq: i64) -> Result<Option<DbTrack>, String> {
    conn.query_row(
        "SELECT t.id,t.path,t.title,t.artist,t.album,t.genre,t.year,t.duration,t.artwork_path,t.codec,t.specs,t.replay_gain FROM playing_queue q JOIN tracks t ON t.id=q.track_id WHERE q.seq=?1",
        params![seq],
        |r| library_db::row_track_indexed(r, 0),
    )
    .optional()
    .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn queue_append(
    track_ids: Vec<String>,
    app: AppHandle,
    state: State<'_, LibraryState>,
) -> Result<QueueState, String> {
    let db_path = state.db_path.clone();
    tauri::async_runtime::spawn_blocking(move || {
        let conn = library_db::open_db(&db_path)?;
        for id in track_ids {
            let exists: i64 = conn
                .query_row(
                    "SELECT COUNT(*) FROM playing_queue WHERE track_id=?1",
                    params![id],
                    |r| r.get(0),
                )
                .unwrap_or(0);
            if exists == 0 {
                let pos = highest_seq(&conn)? + 1;
                conn.execute(
                    "INSERT INTO playing_queue(seq,track_id,played) VALUES(?1,?2,0)",
                    params![pos, id],
                )
                .map_err(|e| e.to_string())?;
            }
        }
        touch_state(&conn)?;
        let _ = app.emit("melo:queue-changed", ());
        emit_state(&app, &conn);
        state_from_conn(&conn)
    })
    .await
    .map_err(|e| e.to_string())?
}

#[tauri::command]
pub async fn queue_play_next(
    track_ids: Vec<String>,
    app: AppHandle,
    state: State<'_, LibraryState>,
) -> Result<QueueState, String> {
    let db_path = state.db_path.clone();
    tauri::async_runtime::spawn_blocking(move || {
        let mut conn = library_db::open_db(&db_path)?;
        let current = current_seq_value(&conn)?;
        let tx = conn.transaction().map_err(|e| e.to_string())?;
        let insert_count = track_ids.len() as i64;
        tx.execute(
            "UPDATE playing_queue SET seq = -seq - ?1 - 1 WHERE ?2 IS NOT NULL AND seq > ?2",
            params![insert_count, current],
        )
        .map_err(|e| e.to_string())?;
        let base = next_seq_after_current(&tx, current)?;
        for (i, id) in track_ids.iter().enumerate() {
            let exists: bool = tx
                .query_row(
                    "SELECT 1 FROM playing_queue WHERE track_id=?1 LIMIT 1",
                    params![id],
                    |_| Ok(()),
                )
                .optional()
                .map_err(|e| e.to_string())?
                .is_some();
            if !exists {
                tx.execute(
                    "INSERT INTO playing_queue(seq,track_id,played) VALUES(?1,?2,0)",
                    params![base + i as i64, id],
                )
                .map_err(|e| e.to_string())?;
            }
        }
        tx.execute(
            "UPDATE playing_queue SET seq = -seq - ?1 - 1 WHERE seq < 0",
            params![0_i64],
        )
        .map_err(|e| e.to_string())?;
        tx.commit().map_err(|e| e.to_string())?;
        if queue_shuffle(&conn).unwrap_or(false) {
            assign_shuffle_order(&conn)?;
        }
        touch_state(&conn)?;
        let _ = app.emit("melo:queue-changed", ());
        emit_state(&app, &conn);
        state_from_conn(&conn)
    })
    .await
    .map_err(|e| e.to_string())?
}

#[tauri::command]
pub async fn queue_remove(
    seq: i64,
    app: AppHandle,
    state: State<'_, LibraryState>,
) -> Result<QueueState, String> {
    let db_path = state.db_path.clone();
    tauri::async_runtime::spawn_blocking(move || {
        let mut conn = library_db::open_db(&db_path)?;
        let tx = conn.transaction().map_err(|e| e.to_string())?;
        let current = current_seq_value(&tx)?;
        let removed_current = current == Some(seq);
        tx.execute("DELETE FROM playing_queue WHERE seq=?1", params![seq])
            .map_err(|e| e.to_string())?;
        reset_sequence_numbers_tx(&tx)?;
        let total = entry_count(&tx)?;
        if total == 0 {
            tx.execute(
                "UPDATE queue_state SET current_seq=NULL,current_position=0 WHERE id=?1",
                params![QUEUE_ID],
            )
            .map_err(|e| e.to_string())?;
        } else if let Some(cur) = current {
            let new_current = if removed_current {
                // Move playback to the item that now occupies the removed
                // position, or the last item when removing the tail.
                Some(cur.min(total - 1))
            } else if seq < cur {
                Some(cur - 1)
            } else {
                Some(cur)
            };
            if let Some(value) = new_current {
                tx.execute(
                    "UPDATE queue_state SET current_seq=?1,current_position=0 WHERE id=?2",
                    params![value, QUEUE_ID],
                )
                .map_err(|e| e.to_string())?;
            }
        }
        tx.commit().map_err(|e| e.to_string())?;
        touch_state(&conn)?;
        let _ = app.emit("melo:queue-changed", ());
        emit_state(&app, &conn);
        state_from_conn(&conn)
    })
    .await
    .map_err(|e| e.to_string())?
}

#[tauri::command]
pub async fn queue_reorder(
    from_seq: i64,
    to_seq: i64,
    app: AppHandle,
    state: State<'_, LibraryState>,
) -> Result<QueueState, String> {
    let db_path = state.db_path.clone();
    tauri::async_runtime::spawn_blocking(move || {
        let mut conn = library_db::open_db(&db_path)?;
        let tx = conn.transaction().map_err(|e| e.to_string())?;
        let exists: bool = tx
            .query_row(
                "SELECT 1 FROM playing_queue WHERE seq=?1",
                params![from_seq],
                |_| Ok(()),
            )
            .optional()
            .map_err(|e| e.to_string())?
            .is_some();
        if !exists {
            drop(tx);
            return state_from_conn(&conn);
        }
        let target = to_seq.max(0);
        tx.execute(
            "UPDATE playing_queue SET seq=-seq-1000000 WHERE seq=?1",
            params![from_seq],
        )
        .map_err(|e| e.to_string())?;
        if from_seq < target {
            tx.execute(
                "UPDATE playing_queue SET seq=seq-1 WHERE seq>?1 AND seq<=?2",
                params![from_seq, target],
            )
            .map_err(|e| e.to_string())?;
        } else if from_seq > target {
            tx.execute(
                "UPDATE playing_queue SET seq=seq+1 WHERE seq>=?1 AND seq<?2",
                params![target, from_seq],
            )
            .map_err(|e| e.to_string())?;
        }
        tx.execute(
            "UPDATE playing_queue SET seq=?1 WHERE seq=-?2-1000000",
            params![target, from_seq],
        )
        .map_err(|e| e.to_string())?;
        if queue_shuffle(&tx).unwrap_or(false) {
            assign_shuffle_order(&tx)?;
        }
        touch_state(&tx)?;
        tx.commit().map_err(|e| e.to_string())?;
        let _ = app.emit("melo:queue-changed", ());
        emit_state(&app, &conn);
        state_from_conn(&conn)
    })
    .await
    .map_err(|e| e.to_string())?
}

#[tauri::command]
pub async fn queue_clear(
    app: AppHandle,
    state: State<'_, LibraryState>,
) -> Result<QueueState, String> {
    let db_path = state.db_path.clone();
    tauri::async_runtime::spawn_blocking(move || {
        let conn = library_db::open_db(&db_path)?;
        conn.execute("DELETE FROM playing_queue", [])
            .map_err(|e| e.to_string())?;
        conn.execute(
            "UPDATE queue_state SET current_seq=NULL,current_position=0 WHERE id=?1",
            params![QUEUE_ID],
        )
        .map_err(|e| e.to_string())?;
        touch_state(&conn)?;
        let _ = app.emit("melo:queue-changed", ());
        let _ = app.emit("melo:queue-cleared", ());
        emit_state(&app, &conn);
        state_from_conn(&conn)
    })
    .await
    .map_err(|e| e.to_string())?
}

#[tauri::command]
pub async fn queue_next(
    app: AppHandle,
    state: State<'_, LibraryState>,
) -> Result<QueueState, String> {
    let db_path = state.db_path.clone();
    tauri::async_runtime::spawn_blocking(move || {
        let conn = library_db::open_db(&db_path)?;
        let repeat = queue_repeat(&conn)?;
        let current = current_seq_value(&conn)?;
        let next = if repeat == "one" {
            current
        } else {
            let allow_wrap = repeat == "all";
            let unplayed = queue_shuffle(&conn)?;
            pick_next_seq(&conn, current, allow_wrap, unplayed)?
        };
        match next {
            Some(s) => {
                conn.execute(
                    "UPDATE queue_state SET current_seq=?1,current_position=0 WHERE id=?2",
                    params![s, QUEUE_ID],
                )
                .map_err(|e| e.to_string())?;
                mark_played(&conn, s)?;
            }
            None => {
                conn.execute(
                    "UPDATE queue_state SET current_position=0 WHERE id=?1",
                    params![QUEUE_ID],
                )
                .map_err(|e| e.to_string())?;
            }
        }
        emit_state(&app, &conn);
        state_from_conn(&conn)
    })
    .await
    .map_err(|e| e.to_string())?
}

#[tauri::command]
pub async fn queue_prev(
    app: AppHandle,
    state: State<'_, LibraryState>,
) -> Result<QueueState, String> {
    let db_path = state.db_path.clone();
    tauri::async_runtime::spawn_blocking(move || {
        let conn = library_db::open_db(&db_path)?;
        if let Some(cur) = current_seq_value(&conn)? {
            let prev = pick_prev_seq(&conn, cur)?;
            conn.execute(
                "UPDATE queue_state SET current_seq=?1,current_position=0 WHERE id=?2",
                params![prev, QUEUE_ID],
            )
            .map_err(|e| e.to_string())?;
            mark_played(&conn, prev)?;
            emit_state(&app, &conn);
        }
        state_from_conn(&conn)
    })
    .await
    .map_err(|e| e.to_string())?
}

#[tauri::command]
pub async fn queue_jump(
    seq: i64,
    position: Option<f64>,
    app: AppHandle,
    state: State<'_, LibraryState>,
) -> Result<QueueState, String> {
    let db_path = state.db_path.clone();
    tauri::async_runtime::spawn_blocking(move || {
        let conn = library_db::open_db(&db_path)?;
        let exists: bool = conn
            .query_row(
                "SELECT 1 FROM playing_queue WHERE seq=?1",
                params![seq],
                |_| Ok(()),
            )
            .optional()
            .map_err(|e| e.to_string())?
            .is_some();
        if exists {
            conn.execute(
                "UPDATE queue_state SET current_seq=?1,current_position=COALESCE(?2,0) WHERE id=?3",
                params![seq, position, QUEUE_ID],
            )
            .map_err(|e| e.to_string())?;
            mark_played(&conn, seq)?;
            emit_state(&app, &conn);
        }
        state_from_conn(&conn)
    })
    .await
    .map_err(|e| e.to_string())?
}

#[tauri::command]
pub async fn queue_set_position(
    position: f64,
    state: State<'_, LibraryState>,
) -> Result<(), String> {
    let db_path = state.db_path.clone();
    tauri::async_runtime::spawn_blocking(move || {
        let conn = library_db::open_db(&db_path)?;
        conn.execute(
            "UPDATE queue_state SET current_position=?1 WHERE id=?2",
            params![position, QUEUE_ID],
        )
        .map(|_| ())
        .map_err(|e| e.to_string())
    })
    .await
    .map_err(|e| e.to_string())?
}

#[tauri::command]
pub async fn queue_set_shuffle(
    enabled: bool,
    app: AppHandle,
    state: State<'_, LibraryState>,
) -> Result<QueueState, String> {
    let db_path = state.db_path.clone();
    tauri::async_runtime::spawn_blocking(move || {
        let conn = library_db::open_db(&db_path)?;
        conn.execute(
            "UPDATE queue_state SET shuffle=?1 WHERE id=?2",
            params![if enabled { 1 } else { 0 }, QUEUE_ID],
        )
        .map_err(|e| e.to_string())?;
        if enabled {
            assign_shuffle_order(&conn)?;
            conn.execute("UPDATE playing_queue SET played=0", [])
                .map_err(|e| e.to_string())?;
            if let Some(cur) = current_seq_value(&conn)? {
                conn.execute(
                    "UPDATE playing_queue SET played=1 WHERE seq=?1",
                    params![cur],
                )
                .map_err(|e| e.to_string())?;
            }
        } else {
            clear_shuffle_order(&conn)?;
        }
        touch_state(&conn)?;
        let _ = app.emit("melo:queue-changed", ());
        emit_state(&app, &conn);
        state_from_conn(&conn)
    })
    .await
    .map_err(|e| e.to_string())?
}

#[tauri::command]
pub async fn queue_set_repeat(
    mode: String,
    app: AppHandle,
    state: State<'_, LibraryState>,
) -> Result<QueueState, String> {
    let normalized = match mode.as_str() {
        "all" => "all",
        "one" => "one",
        _ => "off",
    };
    let db_path = state.db_path.clone();
    tauri::async_runtime::spawn_blocking(move || {
        let conn = library_db::open_db(&db_path)?;
        conn.execute(
            "UPDATE queue_state SET repeat_mode=?1 WHERE id=?2",
            params![normalized, QUEUE_ID],
        )
        .map_err(|e| e.to_string())?;
        touch_state(&conn)?;
        emit_state(&app, &conn);
        state_from_conn(&conn)
    })
    .await
    .map_err(|e| e.to_string())?
}

#[tauri::command]
pub async fn queue_history(
    limit: Option<i64>,
    state: State<'_, LibraryState>,
) -> Result<Vec<HistoryRow>, String> {
    let cap = limit.unwrap_or(100).clamp(1, HISTORY_LIMIT);
    let db_path = state.db_path.clone();
    tauri::async_runtime::spawn_blocking(move || {
        let conn = library_db::open_db(&db_path)?;
        let mut stmt = conn
            .prepare(
                "SELECT t.id,t.title,t.artist,t.album,t.duration,t.artwork_path,h.played_at
                 FROM history h JOIN tracks t ON t.id=h.track_id
                 ORDER BY h.played_at DESC LIMIT ?1",
            )
            .map_err(|e| e.to_string())?;
        let rows = stmt
            .query_map(params![cap], |r| {
                Ok(HistoryRow {
                    id: r.get(0)?,
                    title: r.get(1)?,
                    artist: r.get(2)?,
                    album: r.get(3)?,
                    duration: r.get(4)?,
                    cover: r.get(5)?,
                    played_at: r.get(6)?,
                })
            })
            .map_err(|e| e.to_string())?
            .filter_map(Result::ok)
            .collect();
        Ok(rows)
    })
    .await
    .map_err(|e| e.to_string())?
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::library_db::{init_schema, insert_test_track};

    fn setup() -> Connection {
        let conn = Connection::open_in_memory().unwrap();
        conn.pragma_update(None, "foreign_keys", "ON").unwrap();
        init_schema(&conn).unwrap();
        ensure_queue_schema(&conn).unwrap();
        for i in 0..20 {
            insert_test_track(
                &conn,
                &format!("/music/track-{}.mp3", i),
                &format!("Track {}", i),
                true,
            );
        }
        conn
    }

    #[test]
    fn populate_replace_append_and_jump() {
        let mut conn = setup();
        let ids: Vec<String> = (0..5).map(|i| format!("/music/track-{}.mp3", i)).collect();
        let source = QueueSource::Tracks { ids };
        let tx = conn.transaction().unwrap();
        let count = build_queue_from_source(&tx, &source, Path::new("/tmp")).unwrap();
        tx.commit().unwrap();
        assert_eq!(count, 5);
        assert_eq!(entry_count(&conn).unwrap(), 5);

        conn.execute(
            "UPDATE queue_state SET current_seq=0,current_position=12 WHERE id='default'",
            [],
        )
        .unwrap();
        let state = state_from_conn(&conn).unwrap();
        assert_eq!(state.current_seq, Some(0));
        assert_eq!(state.current_position, 12.0);

        let extra = vec!["/music/track-9.mp3".to_string()];
        conn.execute(
            "INSERT INTO playing_queue(seq,track_id,played) VALUES(?1,?2,0)",
            params![5_i64, extra[0]],
        )
        .unwrap();
        assert_eq!(entry_count(&conn).unwrap(), 6);
    }

    #[test]
    fn shuffle_never_repeats_until_all_played() {
        let mut conn = setup();
        let ids: Vec<String> = (0..10).map(|i| format!("/music/track-{}.mp3", i)).collect();
        let tx = conn.transaction().unwrap();
        build_queue_from_source(&tx, &QueueSource::Tracks { ids }, Path::new("/tmp")).unwrap();
        tx.commit().unwrap();
        conn.execute("UPDATE queue_state SET shuffle=1 WHERE id='default'", [])
            .unwrap();
        assign_shuffle_order(&conn).unwrap();
        let first = pick_next_seq(&conn, None, false, true).unwrap().unwrap();
        conn.execute("UPDATE playing_queue SET played=1 WHERE seq=?1", params![first])
            .unwrap();
        let second = pick_next_seq(&conn, Some(first), false, true).unwrap().unwrap();
        assert_ne!(first, second);
    }

    #[test]
    fn remove_current_compacts_and_advances() {
        let mut conn = setup();
        let ids: Vec<String> = (0..5).map(|i| format!("/music/track-{}.mp3", i)).collect();
        let tx = conn.transaction().unwrap();
        build_queue_from_source(&tx, &QueueSource::Tracks { ids }, Path::new("/tmp")).unwrap();
        tx.commit().unwrap();
        conn.execute("UPDATE queue_state SET current_seq=2 WHERE id='default'", [])
            .unwrap();
        conn.execute("DELETE FROM playing_queue WHERE seq=2", []).unwrap();
        reset_sequence_numbers_tx(&conn).unwrap();
        conn.execute("UPDATE queue_state SET current_seq=2 WHERE id='default'", [])
            .unwrap();
        let count: i64 = conn
            .query_row("SELECT COUNT(*) FROM playing_queue", [], |r| r.get(0))
            .unwrap();
        let max_seq: i64 = conn
            .query_row("SELECT MAX(seq) FROM playing_queue", [], |r| r.get(0))
            .unwrap();
        assert_eq!(count, 4);
        assert_eq!(max_seq, 3);
    }

    #[test]
    fn paged_query_returns_only_visible_window() {
        let mut conn = setup();
        let ids: Vec<String> = (0..12).map(|i| format!("/music/track-{}.mp3", i)).collect();
        let tx = conn.transaction().unwrap();
        build_queue_from_source(&tx, &QueueSource::Tracks { ids }, Path::new("/tmp")).unwrap();
        tx.commit().unwrap();
        let page = queue_page(&conn, 4, 6).unwrap();
        assert_eq!(page.items.len(), 4);
        assert_eq!(page.total, 12);
    }
}
