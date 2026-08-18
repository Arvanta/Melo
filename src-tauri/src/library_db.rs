use crossbeam_channel::{bounded, Receiver};
use lofty::file::{AudioFile, TaggedFileExt};
use lofty::tag::Accessor;
use rusqlite::{params, params_from_iter, Connection, OptionalExtension, ToSql};
use serde::{Deserialize, Serialize};
use sha2::{Digest, Sha256};
use std::collections::HashMap;
use std::path::{Path, PathBuf};
use std::sync::atomic::{AtomicBool, AtomicUsize, Ordering};
use std::sync::{Arc, Mutex};
use std::time::{SystemTime, UNIX_EPOCH};
use tauri::{AppHandle, Emitter, Manager, State};
use walkdir::WalkDir;

#[derive(Clone)]
pub struct LibraryState {
    pub db_path: PathBuf,
    pub artwork_dir: PathBuf,
    jobs: Arc<Mutex<HashMap<String, Arc<AtomicBool>>>>,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct DbTrack {
    pub id: String,
    pub title: String,
    pub artist: String,
    pub album: String,
    pub genre: String,
    pub year: u32,
    pub duration: f64,
    pub path: String,
    pub cover: Option<String>,
    pub codec: String,
    pub specs: String,
    pub replay_gain: Option<f32>,
}

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct LibraryStats {
    tracks: i64,
    artists: i64,
    albums: i64,
    genres: i64,
}

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct GroupRow {
    key: String,
    name: String,
    subtitle: String,
    count: i64,
    cover: Option<String>,
    artwork_track_id: Option<String>,
}

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct Page<T> {
    items: Vec<T>,
    total: i64,
    limit: usize,
    offset: usize,
}

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct PlaylistRow {
    id: String,
    name: String,
    created_at: i64,
    track_count: i64,
}

#[derive(Debug, Serialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct ScanStarted {
    scan_id: String,
}

pub(crate) fn now_ms() -> i64 {
    SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .unwrap_or_default()
        .as_millis() as i64
}

pub(crate) fn supported_ext(path: &Path) -> bool {
    path.extension()
        .and_then(|e| e.to_str())
        .map(|e| {
            matches!(
                e.to_ascii_lowercase().as_str(),
                "mp3" | "flac" | "wav" | "ogg" | "aac" | "m4a" | "alac" | "opus" | "wma" | "aiff"
            )
        })
        .unwrap_or(false)
}

#[cfg(test)]
pub(crate) fn make_test_track(id: &str, title: &str) -> DbTrack {
    DbTrack {
        id: id.to_string(),
        path: id.to_string(),
        title: title.to_string(),
        artist: "Test Artist".into(),
        album: "Test Album".into(),
        genre: "Test".into(),
        year: 2024,
        duration: 120.0,
        cover: None,
        codec: "MP3".into(),
        specs: "MP3 · 44.1 kHz · 16 bit".into(),
        replay_gain: None,
    }
}

#[cfg(test)]
pub(crate) fn insert_test_track(conn: &Connection, id: &str, title: &str, library_owned: bool) {
    let track = make_test_track(id, title);
    upsert_track(conn, &track, 100, 0, None, library_owned).unwrap();
}

fn codec_from_ext(path: &Path) -> String {
    let ext = path
        .extension()
        .and_then(|e| e.to_str())
        .unwrap_or("audio")
        .to_ascii_lowercase();
    match ext.as_str() {
        "mp3" => "MP3".into(),
        "flac" => "FLAC".into(),
        "wav" => "WAV".into(),
        "ogg" => "OGG".into(),
        "aac" => "AAC".into(),
        "m4a" | "alac" => "ALAC".into(),
        _ => ext.to_ascii_uppercase(),
    }
}

pub(crate) fn open_db(path: &Path) -> Result<Connection, String> {
    let conn = Connection::open(path).map_err(|e| e.to_string())?;
    conn.busy_timeout(std::time::Duration::from_secs(5))
        .map_err(|e| e.to_string())?;
    conn.pragma_update(None, "foreign_keys", "ON")
        .map_err(|e| e.to_string())?;
    Ok(conn)
}

pub(crate) fn init_schema(conn: &Connection) -> Result<(), String> {
    conn.execute_batch(
        r#"
        CREATE TABLE IF NOT EXISTS tracks (
          id TEXT PRIMARY KEY,
          path TEXT NOT NULL UNIQUE,
          title TEXT NOT NULL,
          artist TEXT NOT NULL,
          album TEXT NOT NULL,
          genre TEXT NOT NULL,
          year INTEGER NOT NULL DEFAULT 0,
          duration REAL NOT NULL DEFAULT 0,
          codec TEXT NOT NULL,
          specs TEXT NOT NULL,
          replay_gain REAL,
          artwork_path TEXT,
          file_size INTEGER NOT NULL DEFAULT 0,
          modified_at INTEGER NOT NULL DEFAULT 0,
          added_at INTEGER NOT NULL,
          last_seen_scan TEXT,
          library_owned INTEGER NOT NULL DEFAULT 1
        );
        CREATE INDEX IF NOT EXISTS idx_tracks_artist ON tracks(artist COLLATE NOCASE);
        CREATE INDEX IF NOT EXISTS idx_tracks_album ON tracks(album COLLATE NOCASE);
        CREATE INDEX IF NOT EXISTS idx_tracks_genre ON tracks(genre COLLATE NOCASE);
        CREATE INDEX IF NOT EXISTS idx_tracks_title ON tracks(title COLLATE NOCASE);

        CREATE TABLE IF NOT EXISTS playlists (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          created_at INTEGER NOT NULL
        );
        CREATE TABLE IF NOT EXISTS playlist_tracks (
          playlist_id TEXT NOT NULL,
          track_id TEXT NOT NULL,
          position INTEGER NOT NULL,
          PRIMARY KEY(playlist_id, track_id),
          FOREIGN KEY(playlist_id) REFERENCES playlists(id) ON DELETE CASCADE,
          FOREIGN KEY(track_id) REFERENCES tracks(id) ON DELETE CASCADE
        );
        CREATE INDEX IF NOT EXISTS idx_playlist_position ON playlist_tracks(playlist_id, position);

        CREATE TABLE IF NOT EXISTS scan_jobs (
          id TEXT PRIMARY KEY,
          root TEXT NOT NULL,
          status TEXT NOT NULL,
          discovered INTEGER NOT NULL DEFAULT 0,
          processed INTEGER NOT NULL DEFAULT 0,
          added INTEGER NOT NULL DEFAULT 0,
          errors INTEGER NOT NULL DEFAULT 0,
          started_at INTEGER NOT NULL,
          finished_at INTEGER
        );
        "#,
    )
    .map_err(|e| e.to_string())?;
    let _ = conn.execute(
        "ALTER TABLE tracks ADD COLUMN library_owned INTEGER NOT NULL DEFAULT 1",
        [],
    );
    conn.execute(
        "INSERT OR IGNORE INTO playlists(id,name,created_at) VALUES('p1','Favorites',?1)",
        params![now_ms()],
    )
    .map_err(|e| e.to_string())?;
    Ok(())
}

impl LibraryState {
    pub fn new(app: &AppHandle) -> Result<Self, String> {
        let root = app.path().app_data_dir().map_err(|e| e.to_string())?;
        std::fs::create_dir_all(&root).map_err(|e| e.to_string())?;
        let artwork_dir = root.join("artwork-cache");
        std::fs::create_dir_all(&artwork_dir).map_err(|e| e.to_string())?;
        let db_path = root.join("library.db");
        let conn = open_db(&db_path)?;
        conn.pragma_update(None, "journal_mode", "WAL")
            .map_err(|e| e.to_string())?;
        conn.pragma_update(None, "synchronous", "NORMAL")
            .map_err(|e| e.to_string())?;
        init_schema(&conn)?;
        crate::queue_db::ensure_queue_schema(&conn)?;
        Ok(Self {
            db_path,
            artwork_dir,
            jobs: Arc::new(Mutex::new(HashMap::new())),
        })
    }
}

fn cache_artwork(data: &[u8], artwork_dir: &Path) -> Option<String> {
    if data.is_empty() {
        return None;
    }
    let hash = format!("{:x}", Sha256::digest(data));
    let target = artwork_dir.join(format!("{}.png", hash));
    if !target.exists() {
        let img = image::load_from_memory(data).ok()?;
        let thumb = img.thumbnail(256, 256);
        let tmp = artwork_dir.join(format!("{}.tmp.png", hash));
        if thumb
            .save_with_format(&tmp, image::ImageFormat::Png)
            .is_err()
        {
            let _ = std::fs::remove_file(tmp);
            return None;
        }
        if std::fs::rename(&tmp, &target).is_err() && !target.exists() {
            let _ = std::fs::remove_file(tmp);
            return None;
        }
    }
    Some(target.to_string_lossy().to_string())
}

pub(crate) fn parse_track_cached(
    path: &Path,
    artwork_dir: &Path,
    extract_artwork: bool,
) -> Option<(DbTrack, u64, i64)> {
    let metadata = std::fs::metadata(path).ok()?;
    let file_size = metadata.len();
    let modified_at = metadata
        .modified()
        .ok()
        .and_then(|m| m.duration_since(UNIX_EPOCH).ok())
        .map(|d| d.as_secs() as i64)
        .unwrap_or(0);
    let tagged = lofty::probe::Probe::open(path).ok()?.read().ok()?;
    let tag = tagged.primary_tag().or(tagged.first_tag());
    let title = tag
        .and_then(|t| t.title().map(|s| s.to_string()))
        .unwrap_or_else(|| {
            path.file_stem()
                .and_then(|s| s.to_str())
                .unwrap_or("Unknown")
                .to_string()
        });
    let artist = tag
        .and_then(|t| t.artist().map(|s| s.to_string()))
        .unwrap_or_else(|| "Unknown Artist".into());
    let album = tag
        .and_then(|t| t.album().map(|s| s.to_string()))
        .unwrap_or_else(|| "Unknown Album".into());
    let genre = tag
        .and_then(|t| t.genre().map(|s| s.to_string()))
        .unwrap_or_else(|| "Unknown".into());
    let year = tag.and_then(|t| t.year()).unwrap_or(0);
    let props = tagged.properties();
    let codec = codec_from_ext(path);
    let specs = format!(
        "{} · {:.1} kHz · {} bit",
        codec,
        props.sample_rate().unwrap_or(44100) as f32 / 1000.0,
        props.bit_depth().unwrap_or(16)
    );
    let replay_gain = tag.and_then(|t| {
        t.get_string(&lofty::tag::ItemKey::ReplayGainTrackGain)
            .and_then(|s| s.trim().trim_end_matches(" dB").parse::<f32>().ok())
    });
    let cover = if extract_artwork {
        tag.and_then(|t| t.pictures().first())
            .and_then(|p| cache_artwork(p.data(), artwork_dir))
    } else {
        None
    };
    let p = path.to_string_lossy().to_string();
    Some((
        DbTrack {
            id: p.clone(),
            path: p,
            title,
            artist,
            album,
            genre,
            year,
            duration: props.duration().as_secs_f64(),
            cover,
            codec,
            specs,
            replay_gain,
        },
        file_size,
        modified_at,
    ))
}

pub(crate) fn row_track(row: &rusqlite::Row<'_>) -> rusqlite::Result<DbTrack> {
    row_track_indexed(row, 0)
}

pub(crate) fn row_track_indexed(row: &rusqlite::Row<'_>, base: usize) -> rusqlite::Result<DbTrack> {
    Ok(DbTrack {
        id: row.get(base)?,
        path: row.get(base + 1)?,
        title: row.get(base + 2)?,
        artist: row.get(base + 3)?,
        album: row.get(base + 4)?,
        genre: row.get(base + 5)?,
        year: row.get::<_, i64>(base + 6)? as u32,
        duration: row.get(base + 7)?,
        cover: row.get(base + 8)?,
        codec: row.get(base + 9)?,
        specs: row.get(base + 10)?,
        replay_gain: row.get(base + 11)?,
    })
}

pub(crate) const TRACK_SELECT: &str = "SELECT id,path,title,artist,album,genre,year,duration,artwork_path,codec,specs,replay_gain FROM tracks";

pub(crate) fn upsert_track(
    conn: &Connection,
    track: &DbTrack,
    size: u64,
    modified: i64,
    scan_id: Option<&str>,
    library_owned: bool,
) -> Result<(), String> {
    conn.execute(
        r#"INSERT INTO tracks(id,path,title,artist,album,genre,year,duration,codec,specs,replay_gain,artwork_path,file_size,modified_at,added_at,last_seen_scan,library_owned)
        VALUES(?1,?2,?3,?4,?5,?6,?7,?8,?9,?10,?11,?12,?13,?14,?15,?16,?17)
        ON CONFLICT(path) DO UPDATE SET
          title=excluded.title,artist=excluded.artist,album=excluded.album,genre=excluded.genre,
          year=excluded.year,duration=excluded.duration,codec=excluded.codec,specs=excluded.specs,
          replay_gain=excluded.replay_gain,
          artwork_path=COALESCE(excluded.artwork_path,tracks.artwork_path),
          file_size=excluded.file_size,modified_at=excluded.modified_at,last_seen_scan=excluded.last_seen_scan,
          library_owned=MAX(tracks.library_owned,excluded.library_owned)"#,
        params![
            track.id,
            track.path,
            track.title,
            track.artist,
            track.album,
            track.genre,
            track.year as i64,
            track.duration,
            track.codec,
            track.specs,
            track.replay_gain,
            track.cover,
            size as i64,
            modified,
            now_ms(),
            scan_id,
            if library_owned {1} else {0}
        ],
    )
    .map(|_| ())
    .map_err(|e| e.to_string())
}

fn unchanged(conn: &Connection, path: &Path, size: u64, modified: i64) -> bool {
    conn.query_row(
        "SELECT 1 FROM tracks WHERE path=?1 AND file_size=?2 AND modified_at=?3",
        params![path.to_string_lossy(), size as i64, modified],
        |_| Ok(()),
    )
    .optional()
    .ok()
    .flatten()
    .is_some()
}

enum ScanResult {
    Parsed(DbTrack, u64, i64),
    Unchanged(String),
    Failed,
}

fn worker_loop(
    paths: Receiver<PathBuf>,
    output: crossbeam_channel::Sender<ScanResult>,
    artwork_dir: PathBuf,
    cancelled: Arc<AtomicBool>,
    db_path: PathBuf,
) {
    let conn = open_db(&db_path).ok();
    while !cancelled.load(Ordering::Relaxed) {
        let path = match paths.recv() {
            Ok(p) => p,
            Err(_) => break,
        };
        let meta = match std::fs::metadata(&path) {
            Ok(m) => m,
            Err(_) => continue,
        };
        let modified = meta
            .modified()
            .ok()
            .and_then(|m| m.duration_since(UNIX_EPOCH).ok())
            .map(|d| d.as_secs() as i64)
            .unwrap_or(0);
        if conn
            .as_ref()
            .map(|c| unchanged(c, &path, meta.len(), modified))
            .unwrap_or(false)
        {
            if output
                .send(ScanResult::Unchanged(path.to_string_lossy().to_string()))
                .is_err()
            {
                break;
            }
            continue;
        }
        let message = match parse_track_cached(&path, &artwork_dir, false) {
            Some((track, size, modified)) => ScanResult::Parsed(track, size, modified),
            None => ScanResult::Failed,
        };
        if output.send(message).is_err() {
            break;
        }
    }
}

#[tauri::command]
pub async fn start_library_scan(
    path: String,
    app: AppHandle,
    state: State<'_, LibraryState>,
) -> Result<ScanStarted, String> {
    let root = PathBuf::from(&path);
    if !root.exists() {
        return Err("Path does not exist".into());
    }
    {
        let jobs = state
            .jobs
            .lock()
            .map_err(|_| "Scan state is unavailable".to_string())?;
        if !jobs.is_empty() {
            return Err("Another Library scan is already running".into());
        }
    }
    let scan_id = format!("scan-{}", now_ms());
    let cancelled = Arc::new(AtomicBool::new(false));
    state
        .jobs
        .lock()
        .map_err(|_| "Scan state is unavailable".to_string())?
        .insert(scan_id.clone(), cancelled.clone());
    let db_path = state.db_path.clone();
    let artwork_dir = state.artwork_dir.clone();
    let jobs = state.jobs.clone();
    let id = scan_id.clone();

    tauri::async_runtime::spawn_blocking(move || {
        let conn = match open_db(&db_path) {
            Ok(c) => c,
            Err(e) => {
                let _ = app.emit(
                    "melo:scan-error",
                    serde_json::json!({"scanId":id,"error":e}),
                );
                return;
            }
        };
        let _ = conn.execute(
            "INSERT OR REPLACE INTO scan_jobs(id,root,status,started_at) VALUES(?1,?2,'running',?3)",
            params![id, root.to_string_lossy(), now_ms()],
        );

        // Count without retaining every path. Walking twice is deliberately
        // traded for bounded memory and an accurate progress denominator.
        let total = if root.is_file() {
            usize::from(supported_ext(&root))
        } else {
            WalkDir::new(&root)
                .follow_links(false)
                .into_iter()
                .filter_map(Result::ok)
                .filter(|e| e.file_type().is_file() && supported_ext(e.path()))
                .count()
        };
        let _ = conn.execute(
            "UPDATE scan_jobs SET discovered=?2 WHERE id=?1",
            params![id, total as i64],
        );
        let _ = app.emit(
            "melo:scan-progress",
            serde_json::json!({"scanId":id,"done":0,"total":total,"added":0,"errors":0}),
        );

        let (path_tx, path_rx) = bounded::<PathBuf>(64);
        let (result_tx, result_rx) = bounded::<ScanResult>(24);
        let worker_count = std::thread::available_parallelism()
            .map(|n| n.get().saturating_sub(1).clamp(2, 4))
            .unwrap_or(2);
        let mut workers = Vec::new();
        for _ in 0..worker_count {
            let rx = path_rx.clone();
            let tx = result_tx.clone();
            let art = artwork_dir.clone();
            let cancel = cancelled.clone();
            let db = db_path.clone();
            workers.push(std::thread::spawn(move || {
                worker_loop(rx, tx, art, cancel, db)
            }));
        }
        drop(result_tx);

        let producer_cancel = cancelled.clone();
        let producer_root = root.clone();
        let producer = std::thread::spawn(move || {
            if producer_root.is_file() {
                if supported_ext(&producer_root) {
                    let _ = path_tx.send(producer_root);
                }
                return;
            }
            for entry in WalkDir::new(producer_root)
                .follow_links(false)
                .into_iter()
                .filter_map(Result::ok)
            {
                if producer_cancel.load(Ordering::Relaxed) {
                    break;
                }
                if entry.file_type().is_file() && supported_ext(entry.path()) {
                    let mut pending = entry.into_path();
                    loop {
                        match path_tx.send_timeout(pending, std::time::Duration::from_millis(100)) {
                            Ok(()) => break,
                            Err(crossbeam_channel::SendTimeoutError::Timeout(value)) => {
                                pending = value;
                                if producer_cancel.load(Ordering::Relaxed) {
                                    return;
                                }
                            }
                            Err(crossbeam_channel::SendTimeoutError::Disconnected(_)) => return,
                        }
                    }
                }
            }
        });

        let processed = AtomicUsize::new(0);
        let added = AtomicUsize::new(0);
        let mut batch = Vec::with_capacity(25);
        let mut last_flush = std::time::Instant::now();
        let mut last_progress_emit = std::time::Instant::now();
        loop {
            let mut disconnected = false;
            let timed_out = match result_rx.recv_timeout(std::time::Duration::from_millis(150)) {
                Ok(item) => {
                    batch.push(item);
                    false
                }
                Err(crossbeam_channel::RecvTimeoutError::Timeout) => true,
                Err(crossbeam_channel::RecvTimeoutError::Disconnected) => {
                    disconnected = true;
                    true
                }
            };
            let should_flush = !batch.is_empty()
                && (batch.len() >= 25
                    || timed_out
                    || last_flush.elapsed() >= std::time::Duration::from_millis(250));
            if should_flush {
                let tx = match conn.unchecked_transaction() {
                    Ok(t) => t,
                    Err(_) => {
                        if disconnected {
                            break;
                        }
                        continue;
                    }
                };
                let mut completed = 0usize;
                let mut changed = 0usize;
                let mut failed = 0usize;
                for result in batch.drain(..) {
                    completed += 1;
                    match result {
                        ScanResult::Parsed(track, size, modified) => {
                            if upsert_track(&tx, &track, size, modified, Some(&id), true).is_ok() {
                                changed += 1;
                            } else {
                                failed += 1;
                            }
                        }
                        ScanResult::Unchanged(path) => {
                            if tx.execute("UPDATE tracks SET last_seen_scan=?2,library_owned=1 WHERE path=?1", params![path,id]).is_err() { failed += 1; }
                        }
                        ScanResult::Failed => failed += 1,
                    }
                }
                if tx.commit().is_ok() {
                    added.fetch_add(changed, Ordering::Relaxed);
                }
                last_flush = std::time::Instant::now();
                let done = processed.fetch_add(completed, Ordering::Relaxed) + completed;
                let _ = conn.execute(
                    "UPDATE scan_jobs SET processed=?2,added=?3 WHERE id=?1",
                    params![id, done as i64, added.load(Ordering::Relaxed) as i64],
                );
                // Throttle progress updates to ~4/sec. The frontend only
                // needs a coarse progress bar; emitting on every batch for
                // thousands of files wastes IPC/CPU and can keep the UI
                // thread busy long after the scan finishes.
                let now = std::time::Instant::now();
                if now.duration_since(last_progress_emit).as_millis() >= 250 {
                    last_progress_emit = now;
                    let _ = app.emit(
                        "melo:scan-progress",
                        serde_json::json!({"scanId":id,"done":done,"total":total,"added":added.load(Ordering::Relaxed),"errors":failed}),
                    );
                }
            }
            if disconnected {
                break;
            }
            // No results right now and the queue is empty. Yield briefly
            // so the collector threads don't busy-spin the main thread
            // while the scan is draining.
            if batch.is_empty() {
                std::thread::sleep(std::time::Duration::from_millis(20));
            }
        }
        let _ = producer.join();
        for worker in workers {
            let _ = worker.join();
        }
        let status = if cancelled.load(Ordering::Relaxed) {
            "cancelled"
        } else {
            "complete"
        };
        let _ = conn.execute(
            "UPDATE scan_jobs SET status=?2,finished_at=?3 WHERE id=?1",
            params![id, status, now_ms()],
        );
        let _ = app.emit(
            "melo:scan-progress",
            serde_json::json!({"scanId":id,"done":total,"total":total,"added":added.load(Ordering::Relaxed),"finished":true,"cancelled":status=="cancelled"}),
        );
        let _ = app.emit(
            "melo:library-changed",
            serde_json::json!({"scanId":id,"finished":true}),
        );
        if let Ok(mut map) = jobs.lock() {
            map.remove(&id);
        }
    });

    Ok(ScanStarted { scan_id })
}

#[tauri::command]
pub fn cancel_library_scan(scan_id: String, state: State<'_, LibraryState>) -> Result<(), String> {
    if let Some(flag) = state
        .jobs
        .lock()
        .map_err(|_| "Scan state is unavailable".to_string())?
        .get(&scan_id)
    {
        flag.store(true, Ordering::Relaxed);
    }
    Ok(())
}

#[tauri::command]
pub async fn library_stats(state: State<'_, LibraryState>) -> Result<LibraryStats, String> {
    let conn = open_db(&state.db_path)?;
    Ok(LibraryStats {
        tracks: conn.query_row("SELECT COUNT(*) FROM tracks WHERE library_owned=1", [], |r| r.get(0)).unwrap_or(0),
        artists: conn.query_row("SELECT COUNT(DISTINCT artist) FROM tracks WHERE library_owned=1", [], |r| r.get(0)).unwrap_or(0),
        albums: conn.query_row("SELECT COUNT(*) FROM (SELECT artist,album FROM tracks WHERE library_owned=1 GROUP BY artist,album)", [], |r| r.get(0)).unwrap_or(0),
        genres: conn.query_row("SELECT COUNT(DISTINCT genre) FROM tracks WHERE library_owned=1", [], |r| r.get(0)).unwrap_or(0),
    })
}

#[tauri::command]
pub async fn library_groups(
    kind: String,
    search: Option<String>,
    artist: Option<String>,
    limit: usize,
    offset: usize,
    state: State<'_, LibraryState>,
) -> Result<Page<GroupRow>, String> {
    let conn = open_db(&state.db_path)?;
    let q = format!("%{}%", search.unwrap_or_default());
    let (group_expr, key_expr, subtitle_expr, extra_where, extra): (
        &str,
        &str,
        &str,
        &str,
        Option<String>,
    ) = match kind.as_str() {
        "albums" => (
            "album",
            "artist || char(0) || album",
            "artist",
            if artist.is_some() {
                " AND artist=?2"
            } else {
                ""
            },
            artist,
        ),
        "genres" => ("genre", "genre", "COUNT(*) || ' tracks'", "", None),
        _ => ("artist", "artist", "COUNT(*) || ' tracks'", "", None),
    };
    let where_sql = format!(
        " WHERE library_owned=1 AND {} LIKE ?1 COLLATE NOCASE{}",
        group_expr, extra_where
    );
    let count_sql = format!(
        "SELECT COUNT(*) FROM (SELECT {} FROM tracks{} GROUP BY {})",
        group_expr,
        where_sql,
        if kind == "albums" {
            "artist,album"
        } else {
            group_expr
        }
    );
    let total: i64 = if let Some(ref x) = extra {
        conn.query_row(&count_sql, params![q, x], |r| r.get(0))
            .map_err(|e| e.to_string())?
    } else {
        conn.query_row(&count_sql, params![q], |r| r.get(0))
            .map_err(|e| e.to_string())?
    };
    let sql = format!(
        "SELECT {key},{name},{subtitle},COUNT(*),MAX(artwork_path),MIN(id) FROM tracks{where_sql} GROUP BY {group_by} ORDER BY {name} COLLATE NOCASE LIMIT ?{li} OFFSET ?{oi}",
        key=key_expr,
        name=group_expr,
        subtitle=subtitle_expr,
        where_sql=where_sql,
        group_by=if kind=="albums" {"artist,album"} else {group_expr},
        li=if extra.is_some(){3}else{2},
        oi=if extra.is_some(){4}else{3}
    );
    let mut stmt = conn.prepare(&sql).map_err(|e| e.to_string())?;
    let mut rows = if let Some(ref x) = extra {
        stmt.query(params![q, x, limit as i64, offset as i64])
    } else {
        stmt.query(params![q, limit as i64, offset as i64])
    }
    .map_err(|e| e.to_string())?;
    let mut items = Vec::new();
    while let Some(row) = rows.next().map_err(|e| e.to_string())? {
        items.push(GroupRow {
            key: row.get(0).map_err(|e| e.to_string())?,
            name: row.get(1).map_err(|e| e.to_string())?,
            subtitle: row.get(2).map_err(|e| e.to_string())?,
            count: row.get(3).map_err(|e| e.to_string())?,
            cover: row.get(4).map_err(|e| e.to_string())?,
            artwork_track_id: row.get(5).map_err(|e| e.to_string())?,
        });
    }
    Ok(Page {
        items,
        total,
        limit,
        offset,
    })
}

#[tauri::command]
pub async fn library_tracks(
    search: Option<String>,
    artist: Option<String>,
    album: Option<String>,
    genre: Option<String>,
    sort: Option<String>,
    limit: usize,
    offset: usize,
    state: State<'_, LibraryState>,
) -> Result<Page<DbTrack>, String> {
    let conn = open_db(&state.db_path)?;
    let mut clauses = vec!["library_owned=1"];
    let mut values: Vec<rusqlite::types::Value> = Vec::new();
    if let Some(q) = search.filter(|x| !x.trim().is_empty()) {
        clauses.push("(title LIKE ? OR artist LIKE ? OR album LIKE ?)");
        let q = format!("%{}%", q);
        values.push(q.clone().into());
        values.push(q.clone().into());
        values.push(q.into());
    }
    for (column, value) in [("artist", artist), ("album", album), ("genre", genre)] {
        if let Some(v) = value.filter(|x| !x.is_empty()) {
            clauses.push(match column {
                "artist" => "artist=?",
                "album" => "album=?",
                _ => "genre=?",
            });
            values.push(v.into());
        }
    }
    let where_sql = if clauses.is_empty() {
        String::new()
    } else {
        format!(" WHERE {}", clauses.join(" AND "))
    };
    let count_sql = format!("SELECT COUNT(*) FROM tracks{}", where_sql);
    let refs: Vec<&dyn ToSql> = values.iter().map(|v| v as &dyn ToSql).collect();
    let total: i64 = conn
        .query_row(&count_sql, params_from_iter(refs.clone()), |r| r.get(0))
        .map_err(|e| e.to_string())?;
    let order = match sort.as_deref() {
        Some("artist-asc") => "artist COLLATE NOCASE,title COLLATE NOCASE",
        Some("album-asc") => "album COLLATE NOCASE,title COLLATE NOCASE",
        Some("dur-asc") => "duration ASC",
        Some("dur-desc") => "duration DESC",
        _ => "title COLLATE NOCASE",
    };
    let sql = format!(
        "{}{} ORDER BY {} LIMIT ? OFFSET ?",
        TRACK_SELECT, where_sql, order
    );
    values.push((limit as i64).into());
    values.push((offset as i64).into());
    let refs: Vec<&dyn ToSql> = values.iter().map(|v| v as &dyn ToSql).collect();
    let mut stmt = conn.prepare(&sql).map_err(|e| e.to_string())?;
    let items = stmt
        .query_map(params_from_iter(refs), row_track)
        .map_err(|e| e.to_string())?
        .filter_map(Result::ok)
        .collect();
    Ok(Page {
        items,
        total,
        limit,
        offset,
    })
}

#[tauri::command]
pub async fn list_playlists(state: State<'_, LibraryState>) -> Result<Vec<PlaylistRow>, String> {
    let conn = open_db(&state.db_path)?;
    let mut stmt = conn.prepare("SELECT p.id,p.name,p.created_at,COUNT(pt.track_id) FROM playlists p LEFT JOIN playlist_tracks pt ON pt.playlist_id=p.id GROUP BY p.id ORDER BY p.created_at").map_err(|e| e.to_string())?;
    let mapped = stmt
        .query_map([], |r| {
            Ok(PlaylistRow {
                id: r.get(0)?,
                name: r.get(1)?,
                created_at: r.get(2)?,
                track_count: r.get(3)?,
            })
        })
        .map_err(|e| e.to_string())?;
    let rows = mapped.filter_map(Result::ok).collect();
    Ok(rows)
}

#[tauri::command]
pub async fn create_playlist(
    name: String,
    state: State<'_, LibraryState>,
) -> Result<PlaylistRow, String> {
    let conn = open_db(&state.db_path)?;
    let row = PlaylistRow {
        id: format!("pl-{}", now_ms()),
        name,
        created_at: now_ms(),
        track_count: 0,
    };
    conn.execute(
        "INSERT INTO playlists(id,name,created_at) VALUES(?1,?2,?3)",
        params![row.id, row.name, row.created_at],
    )
    .map_err(|e| e.to_string())?;
    Ok(row)
}

#[tauri::command]
pub async fn playlist_tracks(
    playlist_id: String,
    search: Option<String>,
    sort: Option<String>,
    limit: usize,
    offset: usize,
    state: State<'_, LibraryState>,
) -> Result<Page<DbTrack>, String> {
    let conn = open_db(&state.db_path)?;
    let q = format!("%{}%", search.unwrap_or_default());
    let total:i64=conn.query_row("SELECT COUNT(*) FROM playlist_tracks pt JOIN tracks t ON t.id=pt.track_id WHERE pt.playlist_id=?1 AND (t.title LIKE ?2 OR t.artist LIKE ?2 OR t.album LIKE ?2)",params![playlist_id,q],|r|r.get(0)).map_err(|e|e.to_string())?;
    let order = match sort.as_deref() {
        Some("title-asc") => "t.title COLLATE NOCASE",
        Some("artist-asc") => "t.artist COLLATE NOCASE",
        Some("album-asc") => "t.album COLLATE NOCASE",
        Some("dur-asc") => "t.duration",
        Some("dur-desc") => "t.duration DESC",
        _ => "pt.position",
    };
    let sql=format!("SELECT t.id,t.path,t.title,t.artist,t.album,t.genre,t.year,t.duration,t.artwork_path,t.codec,t.specs,t.replay_gain FROM playlist_tracks pt JOIN tracks t ON t.id=pt.track_id WHERE pt.playlist_id=?1 AND (t.title LIKE ?2 OR t.artist LIKE ?2 OR t.album LIKE ?2) ORDER BY {} LIMIT ?3 OFFSET ?4",order);
    let mut stmt = conn.prepare(&sql).map_err(|e| e.to_string())?;
    let items = stmt
        .query_map(
            params![playlist_id, q, limit as i64, offset as i64],
            row_track,
        )
        .map_err(|e| e.to_string())?
        .filter_map(Result::ok)
        .collect();
    Ok(Page {
        items,
        total,
        limit,
        offset,
    })
}

#[tauri::command]
pub async fn add_tracks_to_playlist(
    playlist_id: String,
    track_ids: Vec<String>,
    state: State<'_, LibraryState>,
) -> Result<(), String> {
    let mut conn = open_db(&state.db_path)?;
    let tx = conn.transaction().map_err(|e| e.to_string())?;
    let mut pos: i64 = tx
        .query_row(
            "SELECT COALESCE(MAX(position),-1)+1 FROM playlist_tracks WHERE playlist_id=?1",
            params![playlist_id],
            |r| r.get(0),
        )
        .unwrap_or(0);
    for id in track_ids {
        let changed=tx.execute("INSERT OR IGNORE INTO playlist_tracks(playlist_id,track_id,position) VALUES(?1,?2,?3)",params![playlist_id,id,pos]).map_err(|e|e.to_string())?;
        if changed > 0 {
            pos += 1;
        }
    }
    tx.commit().map_err(|e| e.to_string())?;
    Ok(())
}

#[tauri::command]
pub async fn remove_track_from_playlist(
    playlist_id: String,
    track_id: String,
    state: State<'_, LibraryState>,
) -> Result<(), String> {
    let conn = open_db(&state.db_path)?;
    conn.execute(
        "DELETE FROM playlist_tracks WHERE playlist_id=?1 AND track_id=?2",
        params![playlist_id, track_id],
    )
    .map_err(|e| e.to_string())?;
    Ok(())
}

#[tauri::command]
pub async fn clear_playlist(
    playlist_id: String,
    state: State<'_, LibraryState>,
) -> Result<(), String> {
    let conn = open_db(&state.db_path)?;
    conn.execute(
        "DELETE FROM playlist_tracks WHERE playlist_id=?1",
        params![playlist_id],
    )
    .map_err(|e| e.to_string())?;
    Ok(())
}

#[tauri::command]
pub async fn replace_playlist_tracks(
    playlist_id: String,
    track_ids: Vec<String>,
    state: State<'_, LibraryState>,
) -> Result<(), String> {
    let mut conn = open_db(&state.db_path)?;
    let tx = conn.transaction().map_err(|e| e.to_string())?;
    tx.execute(
        "DELETE FROM playlist_tracks WHERE playlist_id=?1",
        params![playlist_id],
    )
    .map_err(|e| e.to_string())?;
    for (position, id) in track_ids.iter().enumerate() {
        tx.execute(
            "INSERT OR IGNORE INTO playlist_tracks(playlist_id,track_id,position) VALUES(?1,?2,?3)",
            params![playlist_id, id, position as i64],
        )
        .map_err(|e| e.to_string())?;
    }
    tx.commit().map_err(|e| e.to_string())?;
    Ok(())
}

#[tauri::command]
pub async fn replace_playlist_from_scan(
    playlist_id: String,
    scan_id: String,
    state: State<'_, LibraryState>,
) -> Result<(), String> {
    let mut conn = open_db(&state.db_path)?;
    let tx = conn.transaction().map_err(|e| e.to_string())?;
    tx.execute(
        "DELETE FROM playlist_tracks WHERE playlist_id=?1",
        params![playlist_id],
    )
    .map_err(|e| e.to_string())?;
    tx.execute("INSERT OR IGNORE INTO playlist_tracks(playlist_id,track_id,position) SELECT ?1,id,ROW_NUMBER() OVER (ORDER BY path)-1 FROM tracks WHERE last_seen_scan=?2",params![playlist_id,scan_id]).map_err(|e|e.to_string())?;
    tx.commit().map_err(|e| e.to_string())?;
    Ok(())
}

#[tauri::command]
pub async fn clear_library_database(state: State<'_, LibraryState>) -> Result<(), String> {
    let db_path = state.db_path.clone();
    tauri::async_runtime::spawn_blocking(move || {
        let conn = open_db(&db_path)?;
        // Keep track rows and artwork because playlists may still reference
        // them; only remove their membership in Library browsing.
        conn.execute(
            "UPDATE tracks SET library_owned=0 WHERE library_owned=1",
            [],
        )
        .map_err(|e| e.to_string())?;
        conn.execute("DELETE FROM scan_jobs", [])
            .map_err(|e| e.to_string())?;
        Ok(())
    })
    .await
    .map_err(|e| e.to_string())?
}

#[tauri::command]
pub async fn import_audio_files(
    paths: Vec<String>,
    playlist_id: Option<String>,
    replace_playlist: Option<bool>,
    state: State<'_, LibraryState>,
) -> Result<Vec<DbTrack>, String> {
    let db_path = state.db_path.clone();
    let artwork_dir = state.artwork_dir.clone();
    tauri::async_runtime::spawn_blocking(move || {
        let mut conn=open_db(&db_path)?; let mut out=Vec::new();
        for raw in paths { let path=PathBuf::from(raw); if !path.is_file()||!supported_ext(&path){continue;} if let Some((track,size,modified))=parse_track_cached(&path,&artwork_dir,true){upsert_track(&conn,&track,size,modified,None,false)?;out.push(track);} }
        if let Some(pid)=playlist_id { let tx=conn.transaction().map_err(|e|e.to_string())?; if replace_playlist.unwrap_or(false){tx.execute("DELETE FROM playlist_tracks WHERE playlist_id=?1",params![pid]).map_err(|e|e.to_string())?;} let mut pos:i64=tx.query_row("SELECT COALESCE(MAX(position),-1)+1 FROM playlist_tracks WHERE playlist_id=?1",params![pid],|r|r.get(0)).unwrap_or(0); for t in &out {let changed=tx.execute("INSERT OR IGNORE INTO playlist_tracks(playlist_id,track_id,position) VALUES(?1,?2,?3)",params![pid,t.id,pos]).map_err(|e|e.to_string())?;if changed>0{pos+=1;}} tx.commit().map_err(|e|e.to_string())?; }
        Ok(out)
    }).await.map_err(|e|e.to_string())?
}

#[tauri::command]
pub async fn ensure_track_artwork(
    id: String,
    state: State<'_, LibraryState>,
) -> Result<Option<String>, String> {
    let db_path = state.db_path.clone();
    let artwork_dir = state.artwork_dir.clone();
    tauri::async_runtime::spawn_blocking(move || {
        let conn = open_db(&db_path)?;
        let existing: Option<String> = conn
            .query_row(
                "SELECT artwork_path FROM tracks WHERE id=?1",
                params![id],
                |r| r.get(0),
            )
            .optional()
            .map_err(|e| e.to_string())?
            .flatten();
        if existing
            .as_ref()
            .map(|p| Path::new(p).exists())
            .unwrap_or(false)
        {
            return Ok(existing);
        }
        let path: String = conn
            .query_row("SELECT path FROM tracks WHERE id=?1", params![id], |r| {
                r.get(0)
            })
            .map_err(|e| e.to_string())?;
        let tagged = lofty::probe::Probe::open(&path)
            .map_err(|e| e.to_string())?
            .read()
            .map_err(|e| e.to_string())?;
        let tag = tagged.primary_tag().or(tagged.first_tag());
        let artwork = tag
            .and_then(|t| t.pictures().first())
            .and_then(|p| cache_artwork(p.data(), &artwork_dir));
        if let Some(ref value) = artwork {
            conn.execute(
                "UPDATE tracks SET artwork_path=?2 WHERE id=?1",
                params![id, value],
            )
            .map_err(|e| e.to_string())?;
        }
        Ok(artwork)
    })
    .await
    .map_err(|e| e.to_string())?
}

#[tauri::command]
pub async fn get_track_by_id(
    id: String,
    state: State<'_, LibraryState>,
) -> Result<Option<DbTrack>, String> {
    let conn = open_db(&state.db_path)?;
    let sql = format!("{} WHERE id=?1", TRACK_SELECT);
    conn.query_row(&sql, params![id], row_track)
        .optional()
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn delete_tracks(ids: Vec<String>, state: State<'_, LibraryState>) -> Result<(), String> {
    let mut conn = open_db(&state.db_path)?;
    let tx = conn.transaction().map_err(|e| e.to_string())?;
    for id in ids {
        tx.execute("DELETE FROM tracks WHERE id=?1", params![id])
            .map_err(|e| e.to_string())?;
    }
    tx.commit().map_err(|e| e.to_string())?;
    Ok(())
}
