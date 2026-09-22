use crossbeam_channel::{bounded, Receiver};
use lofty::file::{AudioFile, TaggedFileExt};
use lofty::tag::Accessor;
use rusqlite::{params, params_from_iter, Connection, OptionalExtension, ToSql};
use serde::{Deserialize, Serialize};
use sha2::{Digest, Sha256};
use std::collections::HashMap;
use std::path::{Path, PathBuf};
use std::sync::atomic::{AtomicBool, AtomicU32, AtomicUsize, Ordering};
use std::sync::{Arc, Mutex, MutexGuard};
use std::time::{SystemTime, UNIX_EPOCH};
use tauri::{AppHandle, Emitter, Manager, State};
use walkdir::WalkDir;

#[derive(Clone)]
pub struct LibraryState {
    pub db_path: PathBuf,
    pub artwork_dir: PathBuf,
    jobs: Arc<Mutex<HashMap<String, Arc<AtomicBool>>>>,
    // Process-global in-memory cache for full-resolution artwork decodes,
    // keyed by track id; avoids re-reading/re-decoding tags on every request.
    full_art_cache: Arc<Mutex<HashMap<String, String>>>,
    // One long-lived SQLite connection shared by all query commands (serialized
    // on a Mutex; queries are sub-millisecond). The scan pipeline keeps its own
    // dedicated writer connection — under WAL, readers proceed while it writes.
    conn: Arc<Mutex<Connection>>,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct DbTrack {
    pub id: String,
    pub title: String,
    pub artist: String,
    pub album_artist: String,
    pub album: String,
    pub genre: String,
    pub year: u32,
    pub duration: f64,
    pub path: String,
    pub cover: Option<String>,
    pub codec: String,
    pub specs: String,
    pub replay_gain: Option<f32>,
    // A playlist occurrence has its own identity so one repeated row can
    // be removed or reordered without touching the others.
    pub playlist_entry_id: Option<i64>,
}

#[derive(Debug, Serialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct LibraryRoot {
    pub path: String,
    pub added_at: i64,
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
    kind: String,
}

#[derive(Debug, Serialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct ScanStarted {
    scan_id: String,
}

/// Result of a "remove broken entries" sweep over one playlist.
#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct SweepResult {
    checked: usize,
    removed: usize,
}

/// Result of an M3U/M3U8 import. `missing` is a capped sample of absent or
/// unreadable entries; the true count is `total - imported`.
#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct M3uImportResult {
    playlist_id: String,
    playlist_name: String,
    imported: usize,
    missing: Vec<String>,
    total: usize,
}

/// Result of an orphan-data cleanup pass.
#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct CleanupResult {
    tracks_removed: usize,
    artwork_removed: usize,
}

fn now_ms() -> i64 {
    SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .unwrap_or_default()
        .as_millis() as i64
}

fn now_secs() -> i64 {
    SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .unwrap_or_default()
        .as_secs() as i64
}

/// Escapes `%`, `_` and the escape char itself so a literal path can be used
/// as a LIKE prefix pattern (paired with `ESCAPE '$'`).
fn like_escape(input: &str) -> String {
    input.replace('$', "$$").replace('%', "$%").replace('_', "$_")
}

/// Builds a substring-match LIKE pattern from free-text search: wraps the
/// trimmed value in `%…%` and escapes user wildcards. Empty input yields
/// `"%%"` (matches everything — column predicates still filter).
fn search_pattern(input: &str) -> String {
    let trimmed = input.trim();
    if trimmed.is_empty() {
        return "%%".to_string();
    }
    format!("%{}%", like_escape(trimmed))
}

/// Row-mapping failures are logged and skipped instead of silently dropped,
/// so an items/COUNT(*) divergence stays diagnosable.
fn log_skipped<T>(result: rusqlite::Result<T>) -> Option<T> {
    match result {
        Ok(v) => Some(v),
        Err(e) => {
            eprintln!("[melo] skipping unreadable row: {e}");
            None
        }
    }
}

/// Same as `log_skipped`, for directory-walk errors (permission denied,
/// vanished mounts).
fn log_skipped_walk<T, E: std::fmt::Display>(result: Result<T, E>) -> Option<T> {
    match result {
        Ok(v) => Some(v),
        Err(e) => {
            eprintln!("[melo] skipping unreadable path: {e}");
            None
        }
    }
}

fn supported_ext(path: &Path) -> bool {
    path.extension()
        .and_then(|e| e.to_str())
        .map(|e| {
            matches!(
                e.to_ascii_lowercase().as_str(),
                "mp3" | "flac" | "wav" | "ogg" | "aac" | "m4a" | "alac" | "opus" | "wma" | "aiff" | "mka"
            )
        })
        .unwrap_or(false)
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
        "mka" => "MKA".into(),
        _ => ext.to_ascii_uppercase(),
    }
}

fn open_db(path: &Path) -> Result<Connection, String> {
    let conn = Connection::open(path).map_err(|e| e.to_string())?;
    conn.busy_timeout(std::time::Duration::from_secs(5))
        .map_err(|e| e.to_string())?;
    conn.pragma_update(None, "foreign_keys", "ON")
        .map_err(|e| e.to_string())?;
    Ok(conn)
}

/// Locks the shared persistent connection. The guard must never be held
/// across `.await`.
fn locked_db(state: &LibraryState) -> Result<MutexGuard<'_, Connection>, String> {
    state
        .conn
        .lock()
        .map_err(|_| "Library database is unavailable".to_string())
}

/// No in-place migration for older databases: the probe exists only to emit
/// a clear reset instruction.
fn table_has_column(conn: &Connection, table: &str, column: &str) -> Result<bool, String> {
    let mut stmt = conn.prepare(&format!("PRAGMA table_info({table})")).map_err(|e| e.to_string())?;
    let rows = stmt.query_map([], |r| r.get::<_, String>(1)).map_err(|e| e.to_string())?;
    for name in rows {
        if name.map_err(|e| e.to_string())? == column { return Ok(true); }
    }
    Ok(false)
}

fn init_schema(conn: &Connection) -> Result<(), String> {
    conn.execute_batch(
        r#"
        CREATE TABLE IF NOT EXISTS tracks (
          id TEXT PRIMARY KEY,
          path TEXT NOT NULL UNIQUE,
          title TEXT NOT NULL,
          artist TEXT NOT NULL,
          album_artist TEXT NOT NULL DEFAULT '',
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
          library_owned INTEGER NOT NULL DEFAULT 1,
          play_count INTEGER NOT NULL DEFAULT 0,
          last_played_at INTEGER
        );
        CREATE INDEX IF NOT EXISTS idx_tracks_artist ON tracks(artist COLLATE NOCASE);
        CREATE INDEX IF NOT EXISTS idx_tracks_album_artist ON tracks(album_artist COLLATE NOCASE);
        CREATE INDEX IF NOT EXISTS idx_tracks_album ON tracks(album COLLATE NOCASE);
        CREATE INDEX IF NOT EXISTS idx_tracks_genre ON tracks(genre COLLATE NOCASE);
        CREATE INDEX IF NOT EXISTS idx_tracks_title ON tracks(title COLLATE NOCASE);
        -- Combined with idx_tracks_artist this lets SQLite resolve the
        -- artist drill-in (albums of one artist) from a single index
        -- range instead of a table scan filtered by artist.
        CREATE INDEX IF NOT EXISTS idx_tracks_artist_album ON tracks(artist COLLATE NOCASE, album COLLATE NOCASE);
        CREATE INDEX IF NOT EXISTS idx_tracks_album_artist_album ON tracks(album_artist COLLATE NOCASE, album COLLATE NOCASE);
        -- Library browse indexes. Every browse query filters library_owned=1, so
        -- these are PARTIAL (WHERE library_owned=1) and cover every column the
        -- grouped scans read: the scan never touches the tracks table, and the
        -- group/sort order comes straight from the index (no temp sort, so
        -- LIMIT/OFFSET stops early). The COLLATE NOCASE terms must match the
        -- collation used by the queries or SQLite cannot use them.
        CREATE INDEX IF NOT EXISTS idx_lib_album_album_artist ON tracks(album COLLATE NOCASE, album_artist COLLATE NOCASE) WHERE library_owned=1;
        CREATE INDEX IF NOT EXISTS idx_lib_album_artist ON tracks(album COLLATE NOCASE, artist COLLATE NOCASE) WHERE library_owned=1;
        CREATE INDEX IF NOT EXISTS idx_lib_artist_album ON tracks(artist COLLATE NOCASE, album COLLATE NOCASE) WHERE library_owned=1;
        CREATE INDEX IF NOT EXISTS idx_lib_album_artist_album ON tracks(album_artist COLLATE NOCASE, album COLLATE NOCASE) WHERE library_owned=1;
        CREATE INDEX IF NOT EXISTS idx_lib_genre ON tracks(genre COLLATE NOCASE) WHERE library_owned=1;
        CREATE INDEX IF NOT EXISTS idx_lib_title_id ON tracks(title COLLATE NOCASE, id) WHERE library_owned=1;

        CREATE TABLE IF NOT EXISTS playlists (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          created_at INTEGER NOT NULL,
          kind TEXT NOT NULL DEFAULT 'manual',
          source_path TEXT UNIQUE
        );
        -- A playlist entry has its own surrogate identity. The same track
        -- may intentionally appear more than once; entry_id makes each
        -- occurrence independently removable/reorderable.
        CREATE TABLE IF NOT EXISTS playlist_tracks (
          entry_id INTEGER PRIMARY KEY,
          playlist_id TEXT NOT NULL,
          track_id TEXT NOT NULL,
          position INTEGER NOT NULL,
          FOREIGN KEY(playlist_id) REFERENCES playlists(id) ON DELETE CASCADE,
          FOREIGN KEY(track_id) REFERENCES tracks(id) ON DELETE CASCADE
        );

        -- The playback queue is separate from playlists: rows are ENTRY-keyed
        -- and the same track MAY appear more than once (dragging a duplicate
        -- appends a new occurrence) — the model stored playlists always had.
        CREATE TABLE IF NOT EXISTS queue (
          entry_id INTEGER PRIMARY KEY,
          track_id TEXT NOT NULL REFERENCES tracks(id) ON DELETE CASCADE,
          position INTEGER NOT NULL
        );

        -- Persisted, user-approved Library roots. Files become visible in
        -- the Library only through scans of these directories.
        CREATE TABLE IF NOT EXISTS library_roots (
          path TEXT PRIMARY KEY,
          added_at INTEGER NOT NULL
        );

        -- Playback-only permissions for folders the user imported files
        -- from via the Open Files dialog / drag-and-drop (NOT scans).
        -- Without an entry here the asset protocol would refuse to stream
        -- those files back into the webview: its static scope covers only
        -- artwork-cache and the managed roots above, so dialog-imported
        -- tracks showed full metadata + cover (both come through IPC) but
        -- silently failed to produce sound. Recorded so the grant survives
        -- restarts; re-applied in LibraryState::new, exactly like roots.
        CREATE TABLE IF NOT EXISTS allowed_dirs (
          path TEXT PRIMARY KEY,
          added_at INTEGER NOT NULL
        );

        "#,
    )
    .map_err(|e| e.to_string())?;
    // Clean-reset release: pre-v0.9 databases must be removed before first
    // launch; there is no in-place schema migration. The probe keys on
    // playlist_tracks ONLY — `queue` is exempt because queue v2 legitimately
    // gives it an entry_id column.
    if !table_has_column(conn, "playlist_tracks", "entry_id")?
        || !table_has_column(conn, "tracks", "play_count")?
        || !table_has_column(conn, "playlists", "kind")?
        || !table_has_column(conn, "playlists", "source_path")?
    {
        return Err("Library database schema is obsolete. Remove library.db (and its -wal/-shm files) before using this clean-reset build.".into());
    }
    conn.execute_batch(
        "CREATE UNIQUE INDEX IF NOT EXISTS idx_playlist_position ON playlist_tracks(playlist_id, position);
         CREATE INDEX IF NOT EXISTS idx_playlist_track ON playlist_tracks(playlist_id, track_id);
         CREATE UNIQUE INDEX IF NOT EXISTS idx_queue_position ON queue(position);"
    ).map_err(|e| e.to_string())?;
    // Refresh ANALYZE stats after long write gaps so the planner keeps picking
    // the right indexes (no-op when fresh).
    // Queue v2 migration: the queue is entry-keyed (a track can be queued more
    // than once); existing rows keep their position and gain an entry id.
    let queue_has_entries: bool = conn
        .query_row(
            "SELECT COUNT(*) FROM pragma_table_info('queue') WHERE name='entry_id'",
            [],
            |r| r.get::<_, i64>(0),
        )
        .map(|n| n > 0)
        .unwrap_or(false);
    if !queue_has_entries {
        conn.execute_batch(
            r#"
            ALTER TABLE queue RENAME TO queue_legacy;
            CREATE TABLE queue (
              entry_id INTEGER PRIMARY KEY,
              track_id TEXT NOT NULL REFERENCES tracks(id) ON DELETE CASCADE,
              position INTEGER NOT NULL
            );
            INSERT INTO queue(entry_id, track_id, position)
              SELECT rowid, track_id, position FROM queue_legacy;
            DROP TABLE queue_legacy;
            "#,
        )
        .map_err(|e| e.to_string())?;
    }
    let _ = conn.execute_batch("PRAGMA optimize");
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
        // The persisted-scope plugin restores already-granted paths; reapply the
        // managed roots too so pre-plugin upgrades keep asset access aligned with
        // the roots visible in Manage.
        for root in read_library_roots(&conn)? {
            app.asset_protocol_scope()
                .allow_directory(Path::new(&root.path), true)
                .map_err(|e| e.to_string())?;
        }
        // Re-apply playback grants recorded for dialog/drop imports: the runtime
        // scope starts empty each run, so without this those tracks would fail to
        // play after a relaunch.
        for dir in read_allowed_dirs(&conn)? {
            // Non-recursive on purpose: the grant covers exactly the folder the user
            // picked files from, nothing below it.
            let _ = app.asset_protocol_scope().allow_directory(Path::new(&dir), false);
        }
        Ok(Self {
            db_path,
            artwork_dir,
            jobs: Arc::new(Mutex::new(HashMap::new())),
            full_art_cache: Arc::new(Mutex::new(HashMap::new())),
            conn: Arc::new(Mutex::new(conn)),
        })
    }
}

fn cache_artwork(data: &[u8], artwork_dir: &Path) -> Option<String> {
    if data.is_empty() {
        return None;
    }
    let hash = format!("{:x}", Sha256::digest(data));
    // JPEG q80 instead of PNG: much smaller at equal visible quality (lists
    // show ≤256px). Transparent art is flattened onto white (JPEG has no alpha).
    let target = artwork_dir.join(format!("{}.jpg", hash));
    if !target.exists() {
        // Decode with explicit limits: embedded art beyond 8K in either dimension
        // is rejected, so a corrupt/pathological tag cannot allocate unbounded
        // memory.
        let mut reader = image::io::Reader::new(std::io::Cursor::new(data))
            .with_guessed_format()
            .ok()?;
        let mut limits = image::io::Limits::default();
        limits.max_image_width = Some(8192);
        limits.max_image_height = Some(8192);
        reader.limits(limits);
        let img = reader.decode().ok()?;
        let thumb = img.thumbnail(256, 256);
        let rgb = thumb.to_rgb8();
        // Unique temp name per write: concurrent writers racing on the same content
        // hash must not share a tmp path, or a half-written file can survive.
        static TMP_SEQ: AtomicUsize = AtomicUsize::new(0);
        let tmp = artwork_dir.join(format!(
            "{}.{}.{}.tmp.jpg",
            hash,
            std::process::id(),
            TMP_SEQ.fetch_add(1, Ordering::Relaxed)
        ));
        let saved = std::fs::File::create(&tmp)
            .and_then(|f| {
                let mut enc =
                    image::codecs::jpeg::JpegEncoder::new_with_quality(std::io::BufWriter::new(f), 80);
                enc.encode_image(&rgb).map_err(std::io::Error::other)
            })
            .is_ok();
        if !saved {
            let _ = std::fs::remove_file(&tmp);
            return None;
        }
        if std::fs::rename(&tmp, &target).is_err() && !target.exists() {
            let _ = std::fs::remove_file(&tmp);
            return None;
        }
    }
    Some(target.to_string_lossy().to_string())
}

fn is_mka(path: &Path) -> bool {
    path.extension()
        .and_then(|e| e.to_str())
        .map(|e| e.eq_ignore_ascii_case("mka"))
        .unwrap_or(false)
}

fn parse_track_cached(path: &Path, artwork_dir: &Path, extract_artwork: bool) -> Option<(DbTrack, u64, i64)> {
    let metadata = std::fs::metadata(path).ok()?;
    let file_size = metadata.len();
    let modified_at = metadata
        .modified()
        .ok()
        .and_then(|m| m.duration_since(UNIX_EPOCH).ok())
        .map(|d| d.as_secs() as i64)
        .unwrap_or(0);
    // Lofty cannot read Matroska audio (.mka) tags; import with filename-based
    // metadata so it can still play. Duration is filled in by the player.
    if is_mka(path) {
        let title = path
            .file_stem()
            .and_then(|s| s.to_str())
            .unwrap_or("Unknown")
            .to_string();
        let p = path.to_string_lossy().to_string();
        let track = DbTrack {
            id: p.clone(),
            path: p,
            title,
            artist: "Unknown Artist".into(),
            album_artist: "Unknown Artist".into(),
            album: "Unknown Album".into(),
            genre: "Unknown".into(),
            year: 0,
            duration: 0.0,
            cover: None,
            codec: "MKA".into(),
            specs: "Matroska Audio".into(),
            replay_gain: None,
            playlist_entry_id: None,
        };
        return Some((track, file_size, modified_at));
    }
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
    let album_artist = tag
        .and_then(|t| t.get_string(&lofty::tag::ItemKey::AlbumArtist).map(|s| s.trim().to_string()))
        .filter(|s| !s.is_empty())
        .unwrap_or_else(|| artist.clone());
    let album = tag
        .and_then(|t| t.album().map(|s| s.to_string()))
        .unwrap_or_else(|| "Unknown Album".into());
    let genre = tag
        .and_then(|t| t.genre().map(|s| s.to_string()))
        .unwrap_or_else(|| "Unknown".into());
    let year = tag.and_then(|t| t.year()).unwrap_or(0);
    let props = tagged.properties();
    let codec = codec_from_ext(path);
    // Show track BITRATE ("320 kbps") instead of bit depth; audio bitrate wins,
    // overall bitrate is the fallback. Omit the section when neither is known.
    let sample_khz = props.sample_rate().unwrap_or(44100) as f32 / 1000.0;
    let bitrate_kbps = props
        .audio_bitrate()
        .filter(|b| *b > 0)
        .or_else(|| props.overall_bitrate().filter(|b| *b > 0));
    // The player renders the codec in its own badge. Keep it out of specs
    // so the format is not displayed twice (for example: MP3 MP3 ...).
    let specs = match bitrate_kbps {
        Some(br) => format!("{:.1} kHz · {} kbps", sample_khz, br),
        None => format!("{:.1} kHz", sample_khz),
    };
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
            album_artist,
            album,
            genre,
            year,
            duration: props.duration().as_secs_f64(),
            cover,
            codec,
            specs,
            replay_gain,
            playlist_entry_id: None,
        },
        file_size,
        modified_at,
    ))
}

fn row_track_with_entries(
    row: &rusqlite::Row<'_>,
    playlist_entry_id: Option<i64>,
) -> rusqlite::Result<DbTrack> {
    Ok(DbTrack {
        id: row.get(0)?,
        path: row.get(1)?,
        title: row.get(2)?,
        artist: row.get(3)?,
        album_artist: row.get(4)?,
        album: row.get(5)?,
        genre: row.get(6)?,
        year: row.get::<_, i64>(7)? as u32,
        duration: row.get(8)?,
        cover: row.get(9)?,
        codec: row.get(10)?,
        specs: row.get(11)?,
        replay_gain: row.get(12)?,
        playlist_entry_id,
    })
}

fn row_track(row: &rusqlite::Row<'_>) -> rusqlite::Result<DbTrack> {
    row_track_with_entries(row, None)
}

fn row_playlist_track(row: &rusqlite::Row<'_>) -> rusqlite::Result<DbTrack> {
    row_track_with_entries(row, Some(row.get(13)?))
}

const TRACK_SELECT: &str = "SELECT id,path,title,artist,album_artist,album,genre,year,duration,artwork_path,codec,specs,replay_gain FROM tracks";

fn upsert_track(
    conn: &Connection,
    track: &DbTrack,
    size: u64,
    modified: i64,
    scan_id: Option<&str>,
    library_owned: bool,
) -> Result<(), String> {
    conn.execute(
        r#"INSERT INTO tracks(id,path,title,artist,album_artist,album,genre,year,duration,codec,specs,replay_gain,artwork_path,file_size,modified_at,added_at,last_seen_scan,library_owned)
        VALUES(?1,?2,?3,?4,?5,?6,?7,?8,?9,?10,?11,?12,?13,?14,?15,?16,?17,?18)
        ON CONFLICT(path) DO UPDATE SET
          title=excluded.title,artist=excluded.artist,album_artist=excluded.album_artist,album=excluded.album,genre=excluded.genre,
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
            track.album_artist,
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
    .map_err(|e| e.to_string())?;
    Ok(())
}

fn unchanged(conn: &Connection, path: &Path, size: u64, modified: i64) -> bool {
    let hit = conn
        .query_row(
            "SELECT 1 FROM tracks WHERE path=?1 AND file_size=?2 AND modified_at=?3",
            params![path.to_string_lossy(), size as i64, modified],
            |_| Ok(()),
        )
        .optional()
        .ok()
        .flatten()
        .is_some();
    if !hit {
        return false;
    }
    // One-time specs migration: rows still carrying the old "· 16 bit" tail are
    // treated as changed so the next scan re-parses them once into the bitrate
    // format.
    let specs_has_bit_depth = conn
        .query_row(
            "SELECT 1 FROM tracks WHERE path=?1 AND specs LIKE '% bit'",
            params![path.to_string_lossy()],
            |_| Ok(()),
        )
        .optional()
        .ok()
        .flatten()
        .is_some();
    !specs_has_bit_depth
}

enum ScanResult {
    Parsed(DbTrack, u64, i64),
    Unchanged(String),
    Failed(PathBuf),
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
            Err(_) => {
                // Every file counted into `total` must yield exactly one result, or `done`
                // never reaches `total` and progress sticks below 100%.
                if output.send(ScanResult::Failed(path)).is_err() { break; }
                continue;
            }
        };
        let modified = meta
            .modified()
            .ok()
            .and_then(|m| m.duration_since(UNIX_EPOCH).ok())
            .map(|d| d.as_secs() as i64)
            .unwrap_or(0);
        // `is_some_and`: false when the connection isn't open; only delegates to
        // `unchanged()` with a live DB handle.
        if conn.as_ref().is_some_and(|c| unchanged(c, &path, meta.len(), modified))
        {
            if output.send(ScanResult::Unchanged(path.to_string_lossy().to_string())).is_err() { break; }
            continue;
        }
        // extract_artwork MUST be true during scans: `library_groups` picks group
        // covers only from tracks WHERE artwork_path IS NOT NULL — otherwise the
        // Artists/Albums grids render placeholders until a track view is opened.
        let message = match parse_track_cached(&path, &artwork_dir, true) {
            Some((track, size, modified)) => ScanResult::Parsed(track, size, modified),
            None => ScanResult::Failed(path),
        };
        if output.send(message).is_err() { break; }
    }
}

#[tauri::command]
pub async fn start_managed_library_scan(
    app: AppHandle,
    state: State<'_, LibraryState>,
) -> Result<ScanStarted, String> {
    // The scan target is never an IPC path: only folders stored through
    // Library > Manage can be scanned — the configured roots are the single
    // source of truth.
    let roots: Vec<PathBuf> = {
        let conn = locked_db(&state)?;
        read_library_roots(&conn)?.into_iter().map(|root| PathBuf::from(root.path)).collect()
    };
    if roots.is_empty() {
        return Err("Add at least one music folder in Manage before scanning".into());
    }
    if let Some(missing) = roots.iter().find(|root| !root.is_dir()) {
        return Err(format!("A managed folder is no longer available: {}. Remove or re-add it in Manage.", missing.display()));
    }
    let scan_id = format!("scan-{}", now_ms());
    let cancelled = Arc::new(AtomicBool::new(false));
    // The "scan already running?" check and the job registration must be one
    // critical section, or two near-simultaneous calls can both start a scan.
    {
        let mut jobs = state
            .jobs
            .lock()
            .map_err(|_| "Scan state is unavailable".to_string())?;
        if !jobs.is_empty() {
            return Err("Another Library scan is already running".into());
        }
        jobs.insert(scan_id.clone(), cancelled.clone());
    }
    let db_path = state.db_path.clone();
    let artwork_dir = state.artwork_dir.clone();
    let jobs = state.jobs.clone();
    let id = scan_id.clone();

    tauri::async_runtime::spawn_blocking(move || {
        let mut conn = match open_db(&db_path) {
            Ok(c) => c,
            Err(e) => {
                let _ = app.emit("melo:scan-error", serde_json::json!({"scanId":id,"error":e}));
                // Drop the job registration too, or the map keeps this dead entry and every
                // later scan reports "already running" until restart.
                if let Ok(mut map) = jobs.lock() {
                    map.remove(&id);
                }
                return;
            }
        };
        // Two-phase scan: the walk completes FIRST (paths collected in memory,
        // cancellable), so the true total is published up front and done/total is
        // meaningful from the first tick.
        let _ = app.emit(
            "melo:scan-progress",
            serde_json::json!({"scanId":id,"done":0,"total":0,"added":0,"errors":0,"phase":"count"}),
        );
        let mut pending_paths: Vec<PathBuf> = Vec::new();
        let mut pending_playlists: Vec<PathBuf> = Vec::new();
        {
            const ENUMERATION_CAP: usize = 250_000;
            'roots: for root in &roots {
                if cancelled.load(Ordering::Relaxed) { break; }
                for entry in WalkDir::new(root)
                    .follow_links(false)
                    .into_iter()
                    .filter_map(|e| log_skipped_walk(e))
                {
                    if cancelled.load(Ordering::Relaxed) { break 'roots; }
                    if entry.file_type().is_file() {
                        let path = entry.into_path();
                        if supported_ext(&path) {
                            pending_paths.push(path);
                        } else if is_m3u_file(&path) && pending_playlists.len() < 10_000 {
                            pending_playlists.push(path);
                        }
                        if pending_paths.len() >= ENUMERATION_CAP { break 'roots; }
                    }
                }
            }
        }
        let scan_total = Arc::new(AtomicUsize::new(pending_paths.len()));
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
            workers.push(std::thread::spawn(move || worker_loop(rx, tx, art, cancel, db)));
        }
        drop(result_tx);

        let producer_cancel = cancelled.clone();
        let producer = std::thread::spawn(move || {
            // The walk already happened above — the producer only feeds the enumerated
            // list into the parse pipeline; the channel bound applies backpressure.
            for item in pending_paths {
                if producer_cancel.load(Ordering::Relaxed) { return; }
                let mut pending = item;
                loop {
                    match path_tx.send_timeout(pending, std::time::Duration::from_millis(100)) {
                        Ok(()) => break,
                        Err(crossbeam_channel::SendTimeoutError::Timeout(value)) => {
                            pending = value;
                            if producer_cancel.load(Ordering::Relaxed) { return; }
                        }
                        Err(crossbeam_channel::SendTimeoutError::Disconnected(_)) => return,
                    }
                }
            }
        });

        // The scan-phase event carries the real total, so progress is exact from
        // the first tick.
        let _ = app.emit(
            "melo:scan-progress",
            serde_json::json!({"scanId":id,"done":0,"total":scan_total.load(Ordering::Relaxed),"added":0,"errors":0,"phase":"scan"}),
        );

        let processed = AtomicUsize::new(0);
        let added = AtomicUsize::new(0);
        // Real cumulative error counters split by origin (worker vs DB batch), not
        // just the last batch's failure count.
        let parse_failures = AtomicUsize::new(0);
        let db_failures = AtomicUsize::new(0);
        // Failed file paths are shared with the consumer thread through a mutex'd
        // list, capped to bound progress events; the `errors` counter stays exact.
        let failed_paths = std::sync::Arc::new(std::sync::Mutex::new(Vec::<String>::new()));
        // A destructive reconciliation is allowed only if every DB batch succeeded.
        // Never delete records merely because an update/insert failed during this
        // scan.
        let reconciliation_safe = AtomicBool::new(true);
        let mut batch = Vec::with_capacity(25);
        let mut last_flush = std::time::Instant::now();
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
                        reconciliation_safe.store(false, Ordering::Relaxed);
                        if disconnected { break; }
                        continue;
                    }
                };
                let mut completed = 0usize;
                let mut changed = 0usize;
                let mut sql_failed = 0usize;
                let mut parse_failed = 0usize;
                for result in batch.drain(..) {
                    completed += 1;
                    match result {
                        ScanResult::Parsed(track, size, modified) => {
                            if upsert_track(&tx, &track, size, modified, Some(&id), true).is_ok() { changed += 1; }
                            else { sql_failed += 1; }
                        }
                        ScanResult::Unchanged(path) => {
                            if tx.execute("UPDATE tracks SET last_seen_scan=?2,library_owned=1 WHERE path=?1", params![path,id]).is_err() { sql_failed += 1; }
                        }
                        // Discovery, not metadata parsing, defines whether a file exists. An
                        // unreadable existing file must not be deleted as "missing" during
                        // reconciliation.
                        ScanResult::Failed(path) => {
                            parse_failed += 1;
                            // Remember WHICH files failed so the UI can list them; capped per scan to
                            // bound the event payload (the count itself stays exact).
                            {
                                let mut list = failed_paths.lock().unwrap();
                                if list.len() < 50 { list.push(path.to_string_lossy().to_string()); }
                            }
                            // `params!` has no ToSql for PathBuf — convert via `to_string_lossy()`
                            // (matches what the row path stores).
                            let path_str = path.to_string_lossy().into_owned();
                            if tx.execute("UPDATE tracks SET last_seen_scan=?2,library_owned=1 WHERE path=?1", params![path_str,id]).is_err() {
                                sql_failed += 1;
                            }
                        },
                    }
                }
                if tx.commit().is_ok() {
                    added.fetch_add(changed, Ordering::Relaxed);
                } else {
                    reconciliation_safe.store(false, Ordering::Relaxed);
                    sql_failed += completed;
                }
                if sql_failed > 0 { reconciliation_safe.store(false, Ordering::Relaxed); }
                last_flush = std::time::Instant::now();
                let done = processed.fetch_add(completed, Ordering::Relaxed) + completed;
                let errors_total = parse_failures.fetch_add(parse_failed, Ordering::Relaxed) + parse_failed
                    + db_failures.fetch_add(sql_failed, Ordering::Relaxed) + sql_failed;
                let _ = app.emit(
                    "melo:scan-progress",
                    // `total` is fixed by the enumeration phase, so done/total is exact from
                    // the first tick. `errorPaths` rides along (bounded sample,
                    // snapshot-and-clear) for the Manage dialog's failure list.
                    serde_json::json!({"scanId":id,"done":done,"total":scan_total.load(Ordering::Relaxed),"added":added.load(Ordering::Relaxed),"errors":errors_total,
                        "errorPaths": failed_paths.lock().map(|l| l.clone()).unwrap_or_default()}),
                );
                if let Ok(mut l) = failed_paths.lock() { l.clear(); }
                let _ = app.emit(
                    "melo:library-changed",
                    serde_json::json!({"scanId":id,"added":changed}),
                );
            }
            if disconnected {
                break;
            }
        }
        let _ = producer.join();
        for worker in workers {
            let _ = worker.join();
        }
        // Playlist files are imported after audio parsing has completed, so
        // entries already discovered by this scan resolve to library-owned
        // tracks. A source_path key makes repeated scans idempotent.
        let mut playlist_errors = 0usize;
        if !cancelled.load(Ordering::Relaxed) {
            for playlist_path in &pending_playlists {
                match import_m3u_sync(playlist_path, &artwork_dir, &mut conn, Some(&id), Some(&roots)) {
                    Ok(result) => {
                        playlist_errors += result.total.saturating_sub(result.imported);
                        if !result.missing.is_empty() {
                            if let Ok(mut list) = failed_paths.lock() {
                                for path in &result.missing {
                                    if list.len() >= 50 { break; }
                                    list.push(path.clone());
                                }
                            }
                        }
                        let _ = app.emit("melo:playlist-imported", serde_json::json!({
                            "scanId": id, "path": playlist_path, "playlistId": result.playlist_id,
                            "playlistName": result.playlist_name, "imported": result.imported,
                            "total": result.total, "missing": result.missing
                        }));
                    }
                    Err(error) => {
                        playlist_errors += 1;
                        if let Ok(mut list) = failed_paths.lock() {
                            if list.len() < 50 { list.push(playlist_path.to_string_lossy().to_string()); }
                        }
                        let _ = app.emit("melo:playlist-import-error", serde_json::json!({
                            "scanId": id, "path": playlist_path, "error": error
                        }));
                    }
                }
            }
        }
        let status = if cancelled.load(Ordering::Relaxed) {
            "cancelled"
        } else {
            "complete"
        };
        // True cumulative error count for the final progress event (a cancelled
        // job reports what it actually processed, not a fake 100%).
        let final_errors = parse_failures.load(Ordering::Relaxed) + db_failures.load(Ordering::Relaxed) + playlist_errors;
        // Reconciliation: every track seen in this scan is stamped with its id;
        // library_owned rows under this root WITHOUT the stamp are gone from disk
        // and get deleted (a rename/move becomes a new Track; foreign keys clean
        // stale playlist/queue references). Runs only for a completed directory
        // scan — a cancelled or single-file scan saw an incomplete subset.
        let mut removed_count: usize = 0;
        if status == "complete" && reconciliation_safe.load(Ordering::Relaxed) {
            // Each managed root reconciles independently; the shared scan id is
            // stamped across all roots, so overlap is safe.
            for root in &roots {
                let mut prefix = root.to_string_lossy().to_string();
                while prefix.ends_with(std::path::MAIN_SEPARATOR) {
                    prefix.pop();
                }
                prefix.push(std::path::MAIN_SEPARATOR);
                let pattern = format!("{}%", like_escape(&prefix));
                if let Ok(n) = conn.execute(
                    "DELETE FROM tracks \
                     WHERE path LIKE ?1 ESCAPE '$' \
                     AND (last_seen_scan IS NULL OR last_seen_scan != ?2)",
                    params![pattern, id],
                ) {
                    removed_count += n;
                }
            }
        }
        let final_error_paths = failed_paths.lock().map(|list| list.clone()).unwrap_or_default();
        let _ = app.emit(
            "melo:scan-progress",
            serde_json::json!({"scanId":id,"done":processed.load(Ordering::Relaxed),"total":scan_total.load(Ordering::Relaxed),"added":added.load(Ordering::Relaxed),"errors":final_errors,"errorPaths":final_error_paths,"removed":removed_count,"finished":true,"cancelled":status=="cancelled"}),
        );
        let _ = app.emit("melo:library-changed", serde_json::json!({"scanId":id,"finished":true}));
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

fn read_library_roots(conn: &Connection) -> Result<Vec<LibraryRoot>, String> {
    let mut stmt = conn
        .prepare("SELECT path,added_at FROM library_roots ORDER BY added_at,path")
        .map_err(|e| e.to_string())?;
    let rows = stmt
        .query_map([], |r| Ok(LibraryRoot { path: r.get(0)?, added_at: r.get(1)? }))
        .map_err(|e| e.to_string())?;
    Ok(rows.filter_map(log_skipped).collect())
}

/// Folders granted asset-protocol playback because files were imported from
/// them via the Open Files dialog or drag-and-drop (see `allowed_dirs`).
fn read_allowed_dirs(conn: &Connection) -> Result<Vec<String>, String> {
    let mut stmt = conn
        .prepare("SELECT path FROM allowed_dirs ORDER BY added_at,path")
        .map_err(|e| e.to_string())?;
    let rows = stmt
        .query_map([], |r| r.get::<_, String>(0))
        .map_err(|e| e.to_string())?;
    Ok(rows.filter_map(log_skipped).collect())
}

#[tauri::command]
pub async fn list_library_roots(state: State<'_, LibraryState>) -> Result<Vec<LibraryRoot>, String> {
    let conn = locked_db(&state)?;
    read_library_roots(&conn)
}

/// Adds user-selected directories only. Canonical paths eliminate spelling
/// aliases; nested roots are coalesced so files never pay the scan cost
/// twice.
#[tauri::command]
pub async fn add_library_roots(paths: Vec<String>, app: AppHandle, state: State<'_, LibraryState>) -> Result<Vec<LibraryRoot>, String> {
    let mut canonical = Vec::<PathBuf>::new();
    for raw in paths {
        let path = std::fs::canonicalize(&raw).map_err(|_| format!("Folder is not available: {raw}"))?;
        if !path.is_dir() { return Err(format!("Not a folder: {}", path.display())); }
        if !canonical.iter().any(|known| known == &path) { canonical.push(path); }
    }
    let mut conn = locked_db(&state)?;
    if canonical.is_empty() { return read_library_roots(&conn); }
    let tx = conn.transaction().map_err(|e| e.to_string())?;
    // A mutable in-memory mirror coalesces parent/child picked in the SAME
    // dialog too, not just roots added across sessions.
    let mut known: Vec<PathBuf> = {
        let mut stmt = tx.prepare("SELECT path FROM library_roots").map_err(|e| e.to_string())?;
        let rows = stmt.query_map([], |r| r.get::<_, String>(0)).map_err(|e| e.to_string())?;
        rows.filter_map(log_skipped).map(PathBuf::from).collect()
    };
    for candidate in canonical {
        if known.iter().any(|root| candidate.starts_with(root)) { continue; }
        let children: Vec<PathBuf> = known.iter().filter(|root| root.starts_with(&candidate)).cloned().collect();
        for child in &children {
            tx.execute("DELETE FROM library_roots WHERE path=?1", params![child.to_string_lossy()])
                .map_err(|e| e.to_string())?;
        }
        known.retain(|root| !root.starts_with(&candidate));
        tx.execute(
            "INSERT OR IGNORE INTO library_roots(path,added_at) VALUES(?1,?2)",
            params![candidate.to_string_lossy(), now_ms()],
        ).map_err(|e| e.to_string())?;
        known.push(candidate);
    }
    tx.commit().map_err(|e| e.to_string())?;
    let roots = read_library_roots(&conn)?;
    // This emits PathAllowed, which tauri-plugin-persisted-scope records for
    // restart-safe `asset:` playback without a global filesystem wildcard.
    for root in &roots {
        app.asset_protocol_scope().allow_directory(Path::new(&root.path), true)
            .map_err(|e| e.to_string())?;
    }
    Ok(roots)
}

/// Removing a root removes its tracks from Library browsing only (never
/// disk, playlists, or the queue) — re-adding the folder later loses
/// nothing.
#[tauri::command]
pub async fn remove_library_root(path: String, state: State<'_, LibraryState>) -> Result<Vec<LibraryRoot>, String> {
    let mut conn = locked_db(&state)?;
    let tx = conn.transaction().map_err(|e| e.to_string())?;
    let removed: Option<String> = tx.query_row(
        "SELECT path FROM library_roots WHERE path=?1", params![path], |r| r.get(0)
    ).optional().map_err(|e| e.to_string())?;
    let Some(removed) = removed else {
        tx.commit().map_err(|e| e.to_string())?;
        return read_library_roots(&conn);
    };
    tx.execute("DELETE FROM library_roots WHERE path=?1", params![removed])
        .map_err(|e| e.to_string())?;
    let remaining: Vec<PathBuf> = {
        let mut stmt = tx.prepare("SELECT path FROM library_roots").map_err(|e| e.to_string())?;
        let rows = stmt.query_map([], |r| r.get::<_, String>(0)).map_err(|e| e.to_string())?;
        rows.filter_map(log_skipped).map(PathBuf::from).collect()
    };
    let mut prefix = removed.clone();
    while prefix.ends_with(std::path::MAIN_SEPARATOR) { prefix.pop(); }
    prefix.push(std::path::MAIN_SEPARATOR);
    let pattern = format!("{}%", like_escape(&prefix));
    let candidates: Vec<(String, String)> = {
        let mut stmt = tx.prepare("SELECT id,path FROM tracks WHERE library_owned=1 AND path LIKE ?1 ESCAPE '$'")
            .map_err(|e| e.to_string())?;
        let rows = stmt.query_map(params![pattern], |r| Ok((r.get(0)?, r.get(1)?)))
            .map_err(|e| e.to_string())?;
        rows.filter_map(log_skipped).collect()
    };
    for (id, track_path) in candidates {
        if !remaining.iter().any(|root| Path::new(&track_path).starts_with(root)) {
            tx.execute("UPDATE tracks SET library_owned=0 WHERE id=?1", params![id])
                .map_err(|e| e.to_string())?;
        }
    }
    tx.commit().map_err(|e| e.to_string())?;
    // No permanent scope denial here: Tauri retains explicit forbids, which
    // would break the documented remove-then-re-add flow.
    read_library_roots(&conn)
}

#[tauri::command]
pub async fn library_stats(state: State<'_, LibraryState>) -> Result<LibraryStats, String> {
    let conn = locked_db(&state)?;
    Ok(LibraryStats {
        tracks: conn.query_row("SELECT COUNT(*) FROM tracks WHERE library_owned=1", [], |r| r.get(0)).unwrap_or(0),
        artists: conn.query_row("SELECT COUNT(DISTINCT artist) FROM tracks WHERE library_owned=1", [], |r| r.get(0)).unwrap_or(0),
        albums: conn.query_row("SELECT COUNT(*) FROM (SELECT album_artist,album FROM tracks WHERE library_owned=1 GROUP BY album_artist,album)", [], |r| r.get(0)).unwrap_or(0),
        genres: conn.query_row("SELECT COUNT(DISTINCT genre) FROM tracks WHERE library_owned=1", [], |r| r.get(0)).unwrap_or(0),
    })
}

/// One page of Library groups (artists / albums / genres).
///
/// Cost model (why it is shaped like this):
/// * The grouped scan runs over a partial COVERING index (`idx_lib_*`), so it
///   never reads the tracks table, and the groups stream out already in
///   display order: no temp sort, and LIMIT/OFFSET stops early.
/// * Cover art is resolved ONLY for the (<= limit) rows of the returned page,
///   with the NOCASE comparison those indexes are built on. The former
///   correlated subqueries compared with the column's default BINARY
///   collation, which no NOCASE index can serve: every group triggered a
///   full-table scan, and they ran for EVERY group of the library before
///   LIMIT applied (O(groups x tracks) per page - seconds for a few
///   hundred albums on a cold cache).
/// * The group COUNT is optional: the UI caches it per view, so scroll
///   pages skip the full aggregate (`total` is 0 when not requested).
fn query_groups(
    conn: &Connection,
    kind: &str,
    search: Option<String>,
    artist: Option<String>,
    limit: usize,
    offset: usize,
    include_total: bool,
) -> Result<Page<GroupRow>, String> {
    let limit = limit.clamp(1, 5000);
    let raw_search = search.unwrap_or_default();
    let has_search = !raw_search.trim().is_empty();
    // (group column, key expr, subtitle expr, GROUP BY / ORDER BY terms).
    // Album order ends with the artist so equal album names page
    // deterministically; each term list matches its idx_lib_* index.
    let (group_col, key_expr, subtitle_expr, group_by): (&str, &str, &str, &str) = match kind {
        "albums" => (
            "album",
            "album_artist || char(0) || album",
            "album_artist",
            "album COLLATE NOCASE, album_artist COLLATE NOCASE",
        ),
        "album-artists" => (
            "album_artist",
            "album_artist",
            "COUNT(DISTINCT album) || ' albums · ' || COUNT(*) || ' tracks'",
            "album_artist COLLATE NOCASE",
        ),
        "genres" => ("genre", "genre", "COUNT(*) || ' tracks'", "genre COLLATE NOCASE"),
        _ => (
            "artist",
            "artist",
            "COUNT(DISTINCT album) || ' albums · ' || COUNT(*) || ' tracks'",
            "artist COLLATE NOCASE",
        ),
    };
    // The existing `artist` argument is the selected group value for the
    // Albums view; Albums are scoped by album_artist, not track artist.
    let album_artist_filter = if kind == "albums" { artist.filter(|a| !a.is_empty()) } else { None };
    let has_artist_filter = album_artist_filter.is_some();
    let mut values: Vec<rusqlite::types::Value> = Vec::new();
    let mut where_sql = String::from(" WHERE library_owned=1");
    if has_search {
        values.push(search_pattern(&raw_search).into());
        where_sql.push_str(&format!(" AND {} LIKE ?{} COLLATE NOCASE ESCAPE '$'", group_col, values.len()));
    }
    if let Some(a) = album_artist_filter {
        values.push(a.into());
        where_sql.push_str(&format!(" AND album_artist=?{}", values.len()));
    }
    let total: i64 = if include_total {
        let count_sql = format!("SELECT COUNT(*) FROM (SELECT 1 FROM tracks{} GROUP BY {})", where_sql, group_by);
        let refs: Vec<&dyn ToSql> = values.iter().map(|v| v as &dyn ToSql).collect();
        conn.query_row(&count_sql, params_from_iter(refs), |r| r.get(0)).map_err(|e| e.to_string())?
    } else {
        0
    };
    let page_sql = |table: &str| {
        format!(
            "SELECT {key},{name},{subtitle},COUNT(*) FROM {table}{where_sql} GROUP BY {group_by} ORDER BY {group_by} LIMIT ?{li} OFFSET ?{oi}",
            key = key_expr,
            name = group_col,
            subtitle = subtitle_expr,
            table = table,
            where_sql = where_sql,
            group_by = group_by,
            li = values.len() + 1,
            oi = values.len() + 2,
        )
    };
    // Albums sort by album name, but without ANALYZE stats (a fresh library
    // has none) the planner prefers the artist-first index and adds a full
    // temp sort of every group. Pin the album-first index for the unscoped
    // list. The hint is a pure optimisation: if SQLite ever refuses it
    // (index missing), the plain statement runs instead.
    let pin_album_index = kind == "albums" && !has_artist_filter;
    let mut stmt = match conn.prepare(&page_sql(if pin_album_index { "tracks INDEXED BY idx_lib_album_album_artist" } else { "tracks" })) {
        Ok(stmt) => stmt,
        Err(_) if pin_album_index => conn.prepare(&page_sql("tracks")).map_err(|e| e.to_string())?,
        Err(e) => return Err(e.to_string()),
    };
    values.push((limit as i64).into());
    values.push((offset as i64).into());
    let refs: Vec<&dyn ToSql> = values.iter().map(|v| v as &dyn ToSql).collect();
    let mut rows = stmt.query(params_from_iter(refs)).map_err(|e| e.to_string())?;
    // (key, name, subtitle, count) of the page rows, collected first so the
    // cover lookups below run on a released statement.
    let mut page_rows: Vec<(String, String, String, i64)> = Vec::new();
    while let Some(row) = rows.next().map_err(|e| e.to_string())? {
        page_rows.push((
            row.get(0).map_err(|e| e.to_string())?,
            row.get(1).map_err(|e| e.to_string())?,
            row.get(2).map_err(|e| e.to_string())?,
            row.get(3).map_err(|e| e.to_string())?,
        ));
    }
    drop(rows);
    drop(stmt);
    // Cover + artwork track id come from the SAME row (smallest id with
    // artwork), so both stay consistent and stable across renders.
    let cover_sql = match kind {
        "albums" => "SELECT id,artwork_path FROM tracks WHERE library_owned=1 AND album_artist=?1 COLLATE NOCASE AND album=?2 COLLATE NOCASE AND artwork_path IS NOT NULL ORDER BY id LIMIT 1",
        "album-artists" => "SELECT id,artwork_path FROM tracks WHERE library_owned=1 AND album_artist=?1 COLLATE NOCASE AND artwork_path IS NOT NULL ORDER BY id LIMIT 1",
        "genres" => "SELECT id,artwork_path FROM tracks WHERE library_owned=1 AND genre=?1 COLLATE NOCASE AND artwork_path IS NOT NULL ORDER BY id LIMIT 1",
        _ => "SELECT id,artwork_path FROM tracks WHERE library_owned=1 AND artist=?1 COLLATE NOCASE AND artwork_path IS NOT NULL ORDER BY id LIMIT 1",
    };
    let mut cover_stmt = conn.prepare(cover_sql).map_err(|e| e.to_string())?;
    let mut items = Vec::with_capacity(page_rows.len());
    for (key, name, subtitle, count) in page_rows {
        // Album rows carry the artist as their subtitle.
        let looked_up: rusqlite::Result<(String, Option<String>)> = if kind == "albums" {
            cover_stmt.query_row(params![subtitle, name], |r| Ok((r.get(0)?, r.get(1)?)))
        } else {
            cover_stmt.query_row(params![name], |r| Ok((r.get(0)?, r.get(1)?)))
        };
        let found = looked_up.optional().map_err(|e| e.to_string())?;
        let (artwork_track_id, cover) = match found {
            Some((id, path)) => (Some(id), path),
            None => (None, None),
        };
        items.push(GroupRow { key, name, subtitle, count, cover, artwork_track_id });
    }
    Ok(Page { items, total, limit, offset })
}

/// Runs on the blocking pool with its OWN read connection: a long browse
/// query must never hold the shared connection's mutex (that stalled every
/// other command - stats, playlists, queue) nor occupy an async worker.
#[tauri::command]
pub async fn library_groups(
    kind: String,
    search: Option<String>,
    artist: Option<String>,
    limit: usize,
    offset: usize,
    include_total: Option<bool>,
    state: State<'_, LibraryState>,
) -> Result<Page<GroupRow>, String> {
    let db_path = state.db_path.clone();
    tauri::async_runtime::spawn_blocking(move || -> Result<Page<GroupRow>, String> {
        let conn = open_db(&db_path)?;
        query_groups(&conn, &kind, search, artist, limit, offset, include_total.unwrap_or(true))
    })
    .await
    .map_err(|e| e.to_string())?
}

// Shared WHERE/ORDER builders for `library_tracks` and
// `replace_queue_from_library`: the queue must contain exactly what the
// browse view shows, in the same order. Every ORDER BY ends with a unique
// tie-breaker (`id`) so virtualized pages never duplicate or drop rows.
fn library_filter(
    search: Option<String>,
    artist: Option<String>,
    album_artist: Option<String>,
    album: Option<String>,
    genre: Option<String>,
) -> (String, Vec<rusqlite::types::Value>) {
    library_filter_field(search, None, artist, album_artist, album, genre)
}

/// `field` narrows the free-text search to one column ("artist" /
/// "album" / "title"); None/"all" matches any of the three (the
/// Library search box's selector).
fn library_filter_field(
    search: Option<String>,
    field: Option<String>,
    artist: Option<String>,
    album_artist: Option<String>,
    album: Option<String>,
    genre: Option<String>,
) -> (String, Vec<rusqlite::types::Value>) {
    let mut clauses = vec!["library_owned=1"];
    let mut values: Vec<rusqlite::types::Value> = Vec::new();
    if let Some(q) = search.filter(|x| !x.trim().is_empty()) {
        let q = search_pattern(&q);
        match field.as_deref() {
            Some("artist") => {
                clauses.push("artist LIKE ? ESCAPE '$'");
                values.push(q.into());
            }
            Some("album") => {
                clauses.push("album LIKE ? ESCAPE '$'");
                values.push(q.into());
            }
            Some("title") => {
                clauses.push("title LIKE ? ESCAPE '$'");
                values.push(q.into());
            }
            _ => {
                clauses.push("(title LIKE ? ESCAPE '$' OR artist LIKE ? ESCAPE '$' OR album_artist LIKE ? ESCAPE '$' OR album LIKE ? ESCAPE '$')");
                values.push(q.clone().into()); values.push(q.clone().into()); values.push(q.clone().into()); values.push(q.into());
            }
        }
    }
    for (column, value) in [("artist", artist), ("album_artist", album_artist), ("album", album), ("genre", genre)] {
        if let Some(v) = value.filter(|x| !x.is_empty()) {
            clauses.push(match column {
                "artist" => "artist=?",
                "album_artist" => "album_artist=?",
                "album" => "album=?",
                _ => "genre=?",
            });
            values.push(v.into());
        }
    }
    let where_sql = format!(" WHERE {}", clauses.join(" AND "));
    (where_sql, values)
}

fn library_order(sort: Option<&str>) -> &'static str {
    match sort {
        Some("artist-asc") => "artist COLLATE NOCASE,title COLLATE NOCASE,id",
        Some("album-asc") => "album COLLATE NOCASE,title COLLATE NOCASE,id",
        Some("dur-asc") => "duration ASC,id",
        Some("dur-desc") => "duration DESC,id",
        _ => "title COLLATE NOCASE,id",
    }
}

// Same shared-order rationale for the playlist view (`pt.` prefix lives in
// the JOIN). Sorted views break ties by `entry_id` (unique per occurrence)
// for a stable, page-safe order.
fn playlist_order(sort: Option<&str>) -> &'static str {
    match sort {
        Some("title-asc")=>"t.title COLLATE NOCASE,pt.entry_id",
        Some("artist-asc")=>"t.artist COLLATE NOCASE,pt.entry_id",
        Some("album-asc")=>"t.album COLLATE NOCASE,pt.entry_id",
        Some("dur-asc")=>"t.duration,pt.entry_id",
        Some("dur-desc")=>"t.duration DESC,pt.entry_id",
        _=>"pt.position",
    }
}

#[tauri::command]
pub async fn library_tracks(
    search: Option<String>,
    field: Option<String>,
    artist: Option<String>,
    album_artist: Option<String>,
    album: Option<String>,
    genre: Option<String>,
    sort: Option<String>,
    limit: usize,
    offset: usize,
    state: State<'_, LibraryState>,
) -> Result<Page<DbTrack>, String> {
    let conn = locked_db(&state)?;
    // Server-side page-size ceiling: callers must page instead of serializing
    // a multi-MB payload in one IPC call.
    let limit = limit.clamp(1, 5000);
    let (where_sql, mut values) = library_filter_field(search, field, artist, album_artist, album, genre);
    let count_sql = format!("SELECT COUNT(*) FROM tracks{}", where_sql);
    let refs: Vec<&dyn ToSql> = values.iter().map(|v| v as &dyn ToSql).collect();
    let total: i64 = conn.query_row(&count_sql, params_from_iter(refs.clone()), |r| r.get(0)).map_err(|e| e.to_string())?;
    let sql = format!("{}{} ORDER BY {} LIMIT ? OFFSET ?", TRACK_SELECT, where_sql, library_order(sort.as_deref()));
    values.push((limit as i64).into());
    values.push((offset as i64).into());
    let refs: Vec<&dyn ToSql> = values.iter().map(|v| v as &dyn ToSql).collect();
    let mut stmt = conn.prepare(&sql).map_err(|e| e.to_string())?;
    let items = stmt
        .query_map(params_from_iter(refs), row_track)
        .map_err(|e| e.to_string())?
        .filter_map(log_skipped)
        .collect();
    Ok(Page { items, total, limit, offset })
}

const AUTO_MOST_PLAYED_ID: &str = "__auto_most_played__";
const AUTO_RECENTLY_ADDED_ID: &str = "__auto_recently_added__";
const AUTO_RECENTLY_PLAYED_ID: &str = "__auto_recently_played__";

/// Rebuilds the three read-only projections from durable track metadata. The
/// projections are ordinary playlist rows, so every UI surface can select and
/// play them through the existing playlist commands.
fn ensure_auto_playlists(conn: &Connection) -> Result<(), String> {
    let definitions = [
        (AUTO_MOST_PLAYED_ID, "Most Played", "ORDER BY play_count DESC, COALESCE(last_played_at, 0) DESC, added_at DESC, id"),
        (AUTO_RECENTLY_ADDED_ID, "Recently Added", "ORDER BY added_at DESC, id"),
        (AUTO_RECENTLY_PLAYED_ID, "Recently Played", "ORDER BY last_played_at DESC, id"),
    ];
    for (id, name, order) in definitions {
        conn.execute(
            "INSERT OR IGNORE INTO playlists(id,name,created_at,kind) VALUES(?1,?2,?3,'auto')",
            params![id, name, now_ms()],
        ).map_err(|e| e.to_string())?;
        // Keep names stable after upgrading an existing clean-reset database.
        conn.execute("UPDATE playlists SET name=?2,kind='auto',source_path=NULL WHERE id=?1", params![id, name])
            .map_err(|e| e.to_string())?;
        conn.execute("DELETE FROM playlist_tracks WHERE playlist_id=?1", params![id]).map_err(|e| e.to_string())?;
        let filter = if id == AUTO_MOST_PLAYED_ID {
            " AND play_count >= 1"
        } else if id == AUTO_RECENTLY_PLAYED_ID {
            " AND last_played_at IS NOT NULL"
        } else {
            ""
        };
        let sql = format!(
            "INSERT INTO playlist_tracks(playlist_id,track_id,position) SELECT ?1,id,ROW_NUMBER() OVER ({})-1 FROM tracks WHERE library_owned=1{} LIMIT 100",
            order, filter
        );
        conn.execute(&sql, params![id]).map_err(|e| e.to_string())?;
    }
    Ok(())
}

#[tauri::command]
pub async fn record_track_play(track_id: String, state: State<'_, LibraryState>) -> Result<(), String> {
    let conn = locked_db(&state)?;
    conn.execute(
        "UPDATE tracks SET play_count=play_count+1,last_played_at=?2 WHERE id=?1",
        params![track_id, now_ms()],
    ).map_err(|e| e.to_string())?;
    ensure_auto_playlists(&conn)
}

#[tauri::command]
pub async fn list_playlists(state: State<'_, LibraryState>) -> Result<Vec<PlaylistRow>, String> {
    let conn = locked_db(&state)?;
    ensure_auto_playlists(&conn)?;
    let mut stmt = conn.prepare("SELECT p.id,p.name,p.created_at,COUNT(pt.track_id),p.kind FROM playlists p LEFT JOIN playlist_tracks pt ON pt.playlist_id=p.id GROUP BY p.id ORDER BY CASE p.id WHEN '__auto_most_played__' THEN 0 WHEN '__auto_recently_played__' THEN 1 WHEN '__auto_recently_added__' THEN 2 ELSE 3 END,p.created_at").map_err(|e| e.to_string())?;
    let mapped = stmt.query_map([], |r| Ok(PlaylistRow{id:r.get(0)?,name:r.get(1)?,created_at:r.get(2)?,track_count:r.get(3)?,kind:r.get(4)?})).map_err(|e|e.to_string())?;
    let rows = mapped.filter_map(log_skipped).collect();
    Ok(rows)
}

/// Playlist ids are a millisecond timestamp plus a per-process nonce; pure
/// timestamps can collide when two ids are minted in the same millisecond.
static PLAYLIST_ID_NONCE: AtomicU32 = AtomicU32::new(0);

fn new_playlist_id() -> String {
    format!("pl-{}-{:x}", now_ms(), PLAYLIST_ID_NONCE.fetch_add(1, Ordering::Relaxed))
}

const MAX_PLAYLIST_NAME_LEN: usize = 120;

fn validate_playlist_name(name: &str) -> Result<String, String> {
    let trimmed = name.trim();
    if trimmed.is_empty() {
        return Err("Playlist name cannot be empty".into());
    }
    if trimmed.chars().count() > MAX_PLAYLIST_NAME_LEN {
        return Err(format!("Playlist name is too long (max {MAX_PLAYLIST_NAME_LEN} characters)"));
    }
    Ok(trimmed.to_string())
}

/// Generative flows (create / duplicate / M3U import) auto-suffix duplicate
/// names ("Name (2)", case-insensitive); rename is explicit user intent
/// and rejects collisions instead.
fn ensure_manual_playlist(conn: &Connection, playlist_id: &str) -> Result<(), String> {
    let kind: String = conn
        .query_row("SELECT kind FROM playlists WHERE id=?1", params![playlist_id], |r| r.get(0))
        .optional()
        .map_err(|e| e.to_string())?
        .ok_or_else(|| "Playlist no longer exists".to_string())?;
    if kind == "auto" {
        return Err("Automatic playlists are read-only".into());
    }
    Ok(())
}

fn unique_playlist_name(conn: &Connection, desired: &str) -> Result<String, String> {
    let taken = |candidate: &str| -> Result<bool, String> {
        conn.query_row(
            "SELECT 1 FROM playlists WHERE name=?1 COLLATE NOCASE",
            params![candidate],
            |_| Ok(()),
        )
        .optional()
        .map_err(|e| e.to_string())
        .map(|o| o.is_some())
    };
    let mut candidate = desired.to_string();
    for n in 2..=500 {
        if !taken(&candidate)? {
            return Ok(candidate);
        }
        candidate = format!("{desired} ({n})");
    }
    Err("Too many playlists share this name".into())
}

#[tauri::command]
pub async fn create_playlist(name: String, state: State<'_, LibraryState>) -> Result<PlaylistRow, String> {
    let conn = locked_db(&state)?;
    let row = PlaylistRow { id: new_playlist_id(), name: unique_playlist_name(&conn, &validate_playlist_name(&name)?)?, created_at: now_ms(), track_count: 0, kind: "manual".into() };
    conn.execute("INSERT INTO playlists(id,name,created_at,kind) VALUES(?1,?2,?3,'manual')",params![row.id,row.name,row.created_at]).map_err(|e|e.to_string())?;
    Ok(row)
}

#[tauri::command]
pub async fn rename_playlist(playlist_id: String, name: String, state: State<'_, LibraryState>) -> Result<PlaylistRow, String> {
    let name = validate_playlist_name(&name)?;
    let conn = locked_db(&state)?;
    ensure_manual_playlist(&conn, &playlist_id)?;
    // Explicit user intent: report a collision instead of silently
    // suffixing (the generative flows auto-suffix instead).
    let collision = conn
        .query_row("SELECT 1 FROM playlists WHERE name=?1 COLLATE NOCASE AND id<>?2", params![name, playlist_id], |_| Ok(()))
        .optional()
        .map_err(|e| e.to_string())?
        .is_some();
    if collision {
        return Err("Another playlist already has this name".into());
    }
    let updated = conn.execute("UPDATE playlists SET name=?2 WHERE id=?1", params![playlist_id, name]).map_err(|e| e.to_string())?;
    if updated == 0 {
        return Err("Playlist no longer exists".into());
    }
    conn.query_row(
        "SELECT p.id,p.name,p.created_at,COUNT(pt.track_id),p.kind FROM playlists p LEFT JOIN playlist_tracks pt ON pt.playlist_id=p.id WHERE p.id=?1 GROUP BY p.id",
        params![playlist_id],
        |r| Ok(PlaylistRow { id: r.get(0)?, name: r.get(1)?, created_at: r.get(2)?, track_count: r.get(3)?, kind: r.get(4)? }),
    ).map_err(|e| e.to_string())
}

/// Deleting the playlist row cascades to its membership rows; track records
/// and audio files are never touched. The caller retargets the active
/// playlist.
#[tauri::command]
pub async fn delete_playlist(playlist_id: String, state: State<'_, LibraryState>) -> Result<usize, String> {
    let conn = locked_db(&state)?;
    conn.execute("DELETE FROM playlists WHERE id=?1", params![playlist_id]).map_err(|e| e.to_string())
}

/// Duplicate a playlist (entries + order) in one transaction. The copy gets
/// its own id and independent positions, so reordering/removing in either
/// list never affects the other.
#[tauri::command]
pub async fn duplicate_playlist(playlist_id: String, name: Option<String>, state: State<'_, LibraryState>) -> Result<PlaylistRow, String> {
    let mut conn = locked_db(&state)?;
    ensure_manual_playlist(&conn, &playlist_id)?;
    let source_name: String = conn
        .query_row("SELECT name FROM playlists WHERE id=?1", params![playlist_id], |r| r.get(0))
        .optional()
        .map_err(|e| e.to_string())?
        .ok_or_else(|| "Playlist no longer exists".to_string())?;
    let default_name = format!("{source_name} (copy)");
    let desired = match name { Some(n) => validate_playlist_name(&n)?, None => default_name };
    let row = PlaylistRow {
        id: new_playlist_id(),
        name: unique_playlist_name(&conn, &desired)?,
        created_at: now_ms(),
        track_count: 0,
        kind: "manual".into(),
    };
    let tx = conn.transaction().map_err(|e| e.to_string())?;
    tx.execute("INSERT INTO playlists(id,name,created_at,kind) VALUES(?1,?2,?3,'manual')", params![row.id, row.name, row.created_at]).map_err(|e| e.to_string())?;
    let copied = tx.execute(
        "INSERT INTO playlist_tracks(playlist_id,track_id,position) SELECT ?2,track_id,position FROM playlist_tracks WHERE playlist_id=?1",
        params![playlist_id, row.id],
    ).map_err(|e| e.to_string())?;
    tx.commit().map_err(|e| e.to_string())?;
    Ok(PlaylistRow { track_count: copied as i64, ..row })
}

/// Removes playlist entries whose audio file no longer exists on disk.
/// Existence checks are cheap metadata lookups on the blocking pool (only
/// an explicit user action); the DB is touched only for the final
/// transactional removal.
#[tauri::command]
pub async fn sweep_missing_playlist_tracks(playlist_id: String, state: State<'_, LibraryState>) -> Result<SweepResult, String> {
    let db_path = state.db_path.clone();
    tauri::async_runtime::spawn_blocking(move || {
        let mut conn = open_db(&db_path)?;
        ensure_manual_playlist(&conn, &playlist_id)?;
        let entries: Vec<(i64, String)> = {
            let mut stmt = conn.prepare("SELECT pt.entry_id,t.path FROM playlist_tracks pt JOIN tracks t ON t.id=pt.track_id WHERE pt.playlist_id=?1 ORDER BY pt.position").map_err(|e| e.to_string())?;
            let rows = stmt.query_map(params![playlist_id], |r| Ok((r.get(0)?, r.get(1)?))).map_err(|e| e.to_string())?;
            rows.filter_map(log_skipped).collect()
        };
        let checked = entries.len();
        let missing: Vec<i64> = entries
            .into_iter()
            .filter(|(_, path)| !Path::new(path).is_file())
            .map(|(entry_id, _)| entry_id)
            .collect();
        let removed = missing.len();
        if removed > 0 {
            // Explicit `drop(stmt)` before `tx.commit()` documents the lifetime
            // requirement. `mut tx` is needed by prepare/commit (the unused_mut
            // warning is a false positive in this Rust version).
            #[allow(unused_mut)]
            let mut tx = conn.transaction().map_err(|e| e.to_string())?;
            {
                let mut stmt = tx.prepare("DELETE FROM playlist_tracks WHERE playlist_id=?1 AND entry_id=?2").map_err(|e| e.to_string())?;
                for entry_id in &missing {
                    stmt.execute(params![playlist_id, entry_id]).map_err(|e| e.to_string())?;
                }
                drop(stmt);
            }
            // No renumber: positions are order keys and gaps are fine.
            tx.commit().map_err(|e| e.to_string())?;
        }
        Ok(SweepResult { checked, removed })
    }).await.map_err(|e| e.to_string())?
}

/// Garbage-collects unreachable import rows (library_owned=0, in no
/// playlist or queue), then sweeps the artwork cache dir for files no
/// surviving track references (incl. stale `*.tmp.jpg`). Runs on the
/// blocking pool after an explicit user action; audio files never touched.
#[tauri::command]
pub async fn cleanup_orphan_data(state: State<'_, LibraryState>) -> Result<CleanupResult, String> {
    let db_path = state.db_path.clone();
    let artwork_dir = state.artwork_dir.clone();
    tauri::async_runtime::spawn_blocking(move || {
        let mut conn = open_db(&db_path)?;
        let orphans: Vec<String> = {
            let mut stmt = conn.prepare(
                "SELECT id FROM tracks WHERE library_owned=0 \
                 AND NOT EXISTS (SELECT 1 FROM playlist_tracks pt WHERE pt.track_id=tracks.id) \
                 AND NOT EXISTS (SELECT 1 FROM queue q WHERE q.track_id=tracks.id)",
            ).map_err(|e| e.to_string())?;
            let rows = stmt.query_map([], |r| r.get::<_, String>(0)).map_err(|e| e.to_string())?;
            rows.filter_map(log_skipped).collect()
        };
        let tracks_removed = orphans.len();
        if tracks_removed > 0 {
            let tx = conn.transaction().map_err(|e| e.to_string())?;
            {
                let mut stmt = tx.prepare("DELETE FROM tracks WHERE id=?1").map_err(|e| e.to_string())?;
                for id in &orphans {
                    stmt.execute(params![id]).map_err(|e| e.to_string())?;
                }
            }
            tx.commit().map_err(|e| e.to_string())?;
        }
        // The artwork sweep is a set difference over OUR cache dir: only files
        // with zero surviving references are removed.
        let referenced: std::collections::HashSet<String> = {
            let mut stmt = conn.prepare("SELECT artwork_path FROM tracks WHERE artwork_path IS NOT NULL").map_err(|e| e.to_string())?;
            let rows = stmt.query_map([], |r| r.get::<_, String>(0)).map_err(|e| e.to_string())?;
            rows.filter_map(log_skipped).collect()
        };
        let mut artwork_removed = 0usize;
        if let Ok(entries) = std::fs::read_dir(&artwork_dir) {
            for entry in entries.flatten() {
                let path = entry.path();
                if !path.is_file() {
                    continue;
                }
                if !referenced.contains(&path.to_string_lossy().to_string())
                    && std::fs::remove_file(&path).is_ok()
                {
                    artwork_removed += 1;
                }
            }
        }
        Ok(CleanupResult { tracks_removed, artwork_removed })
    })
    .await
    .map_err(|e| e.to_string())?
}

const M3U_MAX_ENTRIES: usize = 100_000;

/// Sanitizes a free-form string into a safe single file-name segment for
/// the M3U export: Windows-invalid chars and control codes become `_`,
/// trailing dots/spaces dropped, length capped, empty falls back to
/// "playlist".
fn sanitize_file_name(name: &str) -> String {
    let cleaned: String = name
        .chars()
        .map(|c| match c {
            '<' | '>' | ':' | '"' | '/' | '\\' | '|' | '?' | '*' => '_',
            c if (c as u32) < 0x20 => '_',
            c => c,
        })
        .collect();
    let trimmed: String = cleaned.trim().chars().take(80).collect();
    // Re-strip after the length cut: truncation can re-expose a trailing
    // dot/space, which Windows file names must not end with.
    let trimmed = trimmed.trim().trim_end_matches('.').trim();
    if trimmed.is_empty() { "playlist".to_string() } else { trimmed.to_string() }
}

/// Shared M3U entry resolution: reads the file (UTF-8, BOM tolerated),
/// skips blank lines and `#` directives, strips surrounding quotes, and
/// resolves relative entries against the playlist's own folder. Used by
/// the import, CLI launch, and native-drop paths so every route expands
/// .m3u files identically.
pub(crate) fn resolve_m3u_paths(m3u_path: &Path) -> Result<Vec<PathBuf>, String> {
    let raw = std::fs::read(m3u_path).map_err(|e| e.to_string())?;
    let text = String::from_utf8_lossy(raw.strip_prefix(b"\xef\xbb\xbf").unwrap_or(&raw));
    let base_dir = m3u_path.parent().map(|p| p.to_path_buf());
    let mut entries: Vec<PathBuf> = Vec::new();
    for line in text.lines() {
        let line = line.trim();
        if line.is_empty() || line.starts_with('#') {
            continue;
        }
        let line = line.strip_prefix('"').and_then(|l| l.strip_suffix('"')).map(str::trim).unwrap_or(line);
        if line.is_empty() {
            continue;
        }
        let p = PathBuf::from(line);
        let resolved = if p.is_absolute() { p } else if let Some(ref base) = base_dir { base.join(p) } else { p };
        // Store the canonical absolute form: strips `..` (the asset scope rejects
        // it), matches scanner-stored ids (imports update the existing row instead
        // of duplicating it), and matches recorded playback grants. Missing files
        // stay unresolved.
        let resolved = std::fs::canonicalize(&resolved).unwrap_or(resolved);
        entries.push(resolved);
        if entries.len() > M3U_MAX_ENTRIES {
            return Err("Playlist file has too many entries".into());
        }
    }
    Ok(entries)
}

/// Playlist files are deliberately NOT in `supported_ext` (folder scans
/// must never treat them as audio) — they expand through
/// `resolve_m3u_paths` instead.
pub(crate) fn is_m3u_file(path: &Path) -> bool {
    path.extension()
        .and_then(|e| e.to_str())
        .map(|e| matches!(e.to_ascii_lowercase().as_str(), "m3u" | "m3u8"))
        .unwrap_or(false)
}

fn import_m3u_sync(
    m3u_path: &Path,
    artwork_dir: &Path,
    conn: &mut Connection,
    scan_id: Option<&str>,
    scan_roots: Option<&[PathBuf]>,
) -> Result<M3uImportResult, String> {
    if !m3u_path.is_file() {
        return Err("Playlist file is no longer available".into());
    }
    let entries = resolve_m3u_paths(m3u_path)?;
    let total = entries.len();
    if total == 0 {
        return Err("The playlist file contains no tracks".into());
    }
    let source_path = std::fs::canonicalize(m3u_path)
        .unwrap_or_else(|_| m3u_path.to_path_buf())
        .to_string_lossy()
        .to_string();
    let existing: Option<(String, String)> = conn
        .query_row(
            "SELECT id,name FROM playlists WHERE source_path=?1",
            params![source_path],
            |r| Ok((r.get(0)?, r.get(1)?)),
        )
        .optional()
        .map_err(|e| e.to_string())?;
    let (playlist_id, name, is_existing) = match existing {
        Some((id, name)) => (id, name, true),
        None => {
            let stem = m3u_path.file_stem().and_then(|s| s.to_str()).unwrap_or("Imported Playlist");
            let desired = sanitize_file_name(stem);
            (new_playlist_id(), unique_playlist_name(conn, &desired)?, false)
        }
    };
    let tx = conn.transaction().map_err(|e| e.to_string())?;
    if is_existing {
        tx.execute("DELETE FROM playlist_tracks WHERE playlist_id=?1", params![playlist_id])
            .map_err(|e| e.to_string())?;
    } else {
        tx.execute(
            "INSERT INTO playlists(id,name,created_at,kind,source_path) VALUES(?1,?2,?3,'manual',?4)",
            params![playlist_id, name, now_ms(), source_path],
        ).map_err(|e| e.to_string())?;
    }
    let mut imported = 0usize;
    let mut missing: Vec<String> = Vec::new();
    {
        let mut ins = tx.prepare("INSERT INTO playlist_tracks(playlist_id,track_id,position) VALUES(?1,?2,?3)").map_err(|e| e.to_string())?;
        let mut pos: i64 = 0;
        for entry in &entries {
            let permitted = scan_roots.map(|roots| roots.iter().any(|root| entry.starts_with(root))).unwrap_or(true);
            if permitted && entry.is_file() && supported_ext(entry) {
                if let Some((track, size, modified)) = parse_track_cached(entry, artwork_dir, true) {
                    upsert_track(&tx, &track, size, modified, scan_id, false)?;
                    ins.execute(params![playlist_id, track.id, pos]).map_err(|e| e.to_string())?;
                    pos += 1;
                    imported += 1;
                    continue;
                }
            }
            missing.push(entry.to_string_lossy().to_string());
        }
    }
    // Imported files outside managed roots remain playable after restart.
    let now = now_ms();
    let mut seen: std::collections::BTreeSet<String> = std::collections::BTreeSet::new();
    for entry in &entries {
        let permitted = scan_roots.map(|roots| roots.iter().any(|root| entry.starts_with(root))).unwrap_or(true);
        if permitted && entry.is_file() {
            if let Some(dir) = entry.parent() {
                seen.insert(dir.to_string_lossy().to_string());
            }
        }
    }
    for d in seen {
        let _ = tx.execute("INSERT OR IGNORE INTO allowed_dirs(path,added_at) VALUES(?1,?2)", params![d, now]);
    }
    tx.commit().map_err(|e| e.to_string())?;
    if missing.len() > 50 { missing.truncate(50); }
    Ok(M3uImportResult { playlist_id, playlist_name: name, imported, missing, total })
}

#[tauri::command]
/// Imports an M3U/M3U8 file as a playlist. Re-importing the same file updates
/// its existing source-backed playlist instead of creating a duplicate.
pub async fn import_m3u_file(path: String, state: State<'_, LibraryState>) -> Result<M3uImportResult, String> {
    // import_m3u_sync records every source folder in allowed_dirs for restart-safe playback.
    let db_path = state.db_path.clone();
    let artwork_dir = state.artwork_dir.clone();
    tauri::async_runtime::spawn_blocking(move || {
        let mut conn = open_db(&db_path)?;
        import_m3u_sync(Path::new(&path), &artwork_dir, &mut conn, None, None)
    })
    .await
    .map_err(|e| e.to_string())?
}

#[tauri::command]
pub async fn playlist_tracks(playlist_id: String, search: Option<String>, sort: Option<String>, limit: usize, offset: usize, state: State<'_, LibraryState>) -> Result<Page<DbTrack>, String> {
    let conn = locked_db(&state)?;
    let limit = limit.clamp(1, 5000);
    let q = search_pattern(&search.unwrap_or_default());
    let total:i64=conn.query_row("SELECT COUNT(*) FROM playlist_tracks pt JOIN tracks t ON t.id=pt.track_id WHERE pt.playlist_id=?1 AND (t.title LIKE ?2 ESCAPE '$' OR t.artist LIKE ?2 ESCAPE '$' OR t.album LIKE ?2 ESCAPE '$')",params![playlist_id,q],|r|r.get(0)).map_err(|e|e.to_string())?;
    let order=playlist_order(sort.as_deref());
    let sql=format!("SELECT t.id,t.path,t.title,t.artist,t.album_artist,t.album,t.genre,t.year,t.duration,t.artwork_path,t.codec,t.specs,t.replay_gain,pt.entry_id FROM playlist_tracks pt JOIN tracks t ON t.id=pt.track_id WHERE pt.playlist_id=?1 AND (t.title LIKE ?2 ESCAPE '$' OR t.artist LIKE ?2 ESCAPE '$' OR t.album LIKE ?2 ESCAPE '$') ORDER BY {} LIMIT ?3 OFFSET ?4",order);
    let mut stmt=conn.prepare(&sql).map_err(|e|e.to_string())?;
    let items=stmt.query_map(params![playlist_id,q,limit as i64,offset as i64],row_playlist_track).map_err(|e|e.to_string())?.filter_map(log_skipped).collect();
    Ok(Page{items,total,limit,offset})
}

#[tauri::command]
pub async fn add_tracks_to_playlist(playlist_id:String, track_ids:Vec<String>, state:State<'_,LibraryState>)->Result<(),String>{
    let mut conn=locked_db(&state)?;
    ensure_manual_playlist(&conn, &playlist_id)?;
    // `tx` must be `mut`: prepare/execute take `&mut self`, commit takes
    // `self`.
    // allow(unused_mut): false positive — `tx` is mutated via prepare/commit.
    #[allow(unused_mut)]
    let mut tx=conn.transaction().map_err(|e|e.to_string())?;
    let mut pos:i64=tx.query_row("SELECT COALESCE(MAX(position),-1)+1 FROM playlist_tracks WHERE playlist_id=?1",params![playlist_id],|r|r.get(0)).unwrap_or(0);
    let mut stmt=tx.prepare("INSERT INTO playlist_tracks(playlist_id,track_id,position) VALUES(?1,?2,?3)").map_err(|e|e.to_string())?;
    for id in track_ids { stmt.execute(params![playlist_id,id,pos]).map_err(|e|e.to_string())?; pos+=1; }
    // `stmt` must drop before `tx.commit()` (Statement's Drop borrows the tx).
    drop(stmt);
    tx.commit().map_err(|e|e.to_string())?; Ok(())
}

// Positions are ORDER KEYS, not a dense 0..n-1 numbering: gaps are fine,
// appends use MAX+1 — that keeps removal O(k) and reorder limited to the
// moved range.
#[tauri::command]
pub async fn remove_playlist_entry(playlist_id:String,entry_id:i64,state:State<'_,LibraryState>)->Result<(),String>{
    let mut conn=locked_db(&state)?; ensure_manual_playlist(&conn, &playlist_id)?; let tx=conn.transaction().map_err(|e|e.to_string())?;
    tx.execute("DELETE FROM playlist_tracks WHERE playlist_id=?1 AND entry_id=?2",params![playlist_id,entry_id]).map_err(|e|e.to_string())?;
    tx.commit().map_err(|e|e.to_string())?; Ok(())
}

/// Bulk removal is entry-based: removing one duplicate occurrence never
/// erases its siblings. One transaction, O(k) deletes, no renumber.
#[tauri::command]
pub async fn remove_playlist_entries(playlist_id:String,entry_ids:Vec<i64>,state:State<'_,LibraryState>)->Result<(),String>{
    let mut conn=locked_db(&state)?; ensure_manual_playlist(&conn, &playlist_id)?; let tx=conn.transaction().map_err(|e|e.to_string())?;
    { let mut stmt=tx.prepare("DELETE FROM playlist_tracks WHERE playlist_id=?1 AND entry_id=?2").map_err(|e|e.to_string())?;
      for entry_id in entry_ids { stmt.execute(params![playlist_id,entry_id]).map_err(|e|e.to_string())?; } }
    tx.commit().map_err(|e|e.to_string())?; Ok(())
}

#[tauri::command]
pub async fn clear_playlist(playlist_id:String,state:State<'_,LibraryState>)->Result<(),String>{let conn=locked_db(&state)?;ensure_manual_playlist(&conn, &playlist_id)?;conn.execute("DELETE FROM playlist_tracks WHERE playlist_id=?1",params![playlist_id]).map_err(|e|e.to_string())?;Ok(())}

/// Moves one entry to `target_index` (an index into the ordered list).
/// Only the moved RANGE shifts: the dragged entry parks at a scratch
/// position, each neighbor takes the slot just freed, and it lands on the
/// target slot — the unique (playlist_id, position) index is never
/// transiently violated.
#[tauri::command]
pub async fn reorder_playlist_entry(playlist_id:String, entry_id:i64, target_index:i64, state:State<'_,LibraryState>)->Result<(),String>{
    let mut conn=locked_db(&state)?;
    ensure_manual_playlist(&conn, &playlist_id)?;
    let entries: Vec<(i64, i64)> = {
        let mut stmt=conn.prepare("SELECT entry_id,position FROM playlist_tracks WHERE playlist_id=?1 ORDER BY position,entry_id").map_err(|e|e.to_string())?;
        let rows=stmt.query_map(params![playlist_id], |r| Ok((r.get(0)?, r.get(1)?))).map_err(|e|e.to_string())?;
        rows.filter_map(log_skipped).collect()
    };
    let Some(current) = entries.iter().position(|(id, _)| *id == entry_id) else { return Ok(()); };
    let clamped = (target_index.max(0) as usize).min(entries.len().saturating_sub(1));
    if clamped == current { return Ok(()); }
    let scratch: i64 = entries.iter().map(|(_, p)| *p).max().unwrap_or(0) + 1;
    let tx=conn.transaction().map_err(|e|e.to_string())?;
    // Park the dragged entry outside the live range first so every
    // single-row shift below lands in an already-freed slot.
    tx.execute("UPDATE playlist_tracks SET position=?2 WHERE entry_id=?1", params![entry_id, scratch]).map_err(|e|e.to_string())?;
    if current < clamped {
        for k in current + 1..=clamped {
            tx.execute("UPDATE playlist_tracks SET position=?2 WHERE entry_id=?1", params![entries[k].0, entries[k - 1].1]).map_err(|e|e.to_string())?;
        }
    } else {
        for k in (clamped..current).rev() {
            tx.execute("UPDATE playlist_tracks SET position=?2 WHERE entry_id=?1", params![entries[k].0, entries[k + 1].1]).map_err(|e|e.to_string())?;
        }
    }
    tx.execute("UPDATE playlist_tracks SET position=?2 WHERE entry_id=?1", params![entry_id, entries[clamped].1]).map_err(|e|e.to_string())?;
    tx.commit().map_err(|e|e.to_string())?;Ok(())
}

#[tauri::command]
pub async fn clear_library_database(state:State<'_,LibraryState>)->Result<(),String>{
    let db_path=state.db_path.clone();
    tauri::async_runtime::spawn_blocking(move || {
        let conn=open_db(&db_path)?;
        // Keep track rows and artwork because playlists may still reference
        // them; only remove their membership in Library browsing.
        conn.execute("UPDATE tracks SET library_owned=0 WHERE library_owned=1",[]).map_err(|e|e.to_string())?;
        // A managed/imported playlist belongs to the Library surface. Clear
        // removes those source-backed rows, while user-created playlists stay.
        conn.execute("DELETE FROM playlists WHERE source_path IS NOT NULL",[]).map_err(|e|e.to_string())?;
        Ok(())
    }).await.map_err(|e|e.to_string())?
}

/// Imports audio files (Add Files / Open With routes). Strictly APPEND-only
/// when a playlist id is given — "replace" semantics target the play
/// queue, never a stored playlist. Dropped directories expand to their
/// TOP-LEVEL supported audio files (sorted); recursive enumeration stays
/// Manage-only. Playback scope is granted via allowed_dirs.
#[tauri::command]
pub async fn expand_drop_paths(paths: Vec<String>) -> Result<Vec<String>, String> {
    tauri::async_runtime::spawn_blocking(move || -> Result<Vec<String>, String> {
        let mut out: Vec<String> = Vec::new();
        for raw in paths {
            let p = PathBuf::from(&raw);
            if p.is_dir() {
                let mut sub: Vec<String> = Vec::new();
                match std::fs::read_dir(&p) {
                    Ok(entries) => {
                        for entry in entries {
                            let entry = match entry {
                                Ok(e) => e,
                                Err(e) => { eprintln!("[melo] skipping unreadable entry: {e}"); continue; }
                            };
                            let q = entry.path();
                            if q.is_file() && supported_ext(&q) {
                                sub.push(q.to_string_lossy().to_string());
                            }
                        }
                    }
                    Err(e) => { eprintln!("[melo] skipping unreadable dir {}: {e}", raw); }
                }
                sub.sort();
                out.extend(sub);
            } else if p.is_file() {
                if supported_ext(&p) {
                    out.push(raw);
                } else if is_m3u_file(&p) {
                    // Dropping an .m3u on the player queues its tracks (replace semantics live
                    // in the caller); on the Playlist window it appends them to the current
                    // view. Missing/unreadable entries are skipped.
                    match resolve_m3u_paths(&p) {
                        Ok(entries) => {
                            for e in entries {
                                if e.is_file() && supported_ext(&e) {
                                    out.push(e.to_string_lossy().to_string());
                                }
                            }
                        }
                        Err(err) => eprintln!("[melo] skipping unresolvable playlist {raw}: {err}"),
                    }
                }
            }
        }
        Ok(out)
    }).await.map_err(|e| e.to_string())?
}

/// Player titlebar "Open Folder": lists the TOP-LEVEL supported audio
/// files of one folder, sorted. Deliberately not a scan — recursive
/// enumeration stays behind Library > Manage. Read-only; the playback
/// grant happens in `import_audio_files`.
#[tauri::command]
pub async fn list_dir_audio_files(path: String) -> Result<Vec<String>, String> {
    tauri::async_runtime::spawn_blocking(move || -> Result<Vec<String>, String> {
        let dir = PathBuf::from(&path);
        if !dir.is_dir() {
            return Err(format!("Not a folder: {path}"));
        }
        let mut out: Vec<String> = Vec::new();
        for entry in std::fs::read_dir(&dir).map_err(|e| e.to_string())? {
            let entry = match entry {
                Ok(e) => e,
                Err(e) => { eprintln!("[melo] skipping unreadable entry: {e}"); continue; }
            };
            let p = entry.path();
            if p.is_file() && supported_ext(&p) {
                out.push(p.to_string_lossy().to_string());
            }
        }
        out.sort();
        Ok(out)
    }).await.map_err(|e| e.to_string())?
}

#[tauri::command]
pub async fn import_audio_files(paths:Vec<String>,playlist_id:Option<String>,app:AppHandle,state:State<'_,LibraryState>)->Result<Vec<DbTrack>,String>{
    let db_path=state.db_path.clone();
    let artwork_dir=state.artwork_dir.clone();
    // `dirs` = distinct parent folders of successfully imported files:
    // recorded in `allowed_dirs` (restart-safe) and granted to the
    // asset-protocol scope so `convertFileSrc` playback is not refused.
    // The closure's return type is explicit so rustc can pin the error type
    // (E0282/E0283).
    let (out, dirs)=tauri::async_runtime::spawn_blocking(move || -> Result<(Vec<DbTrack>, Vec<String>), String> {
        let mut conn=open_db(&db_path)?; let mut out=Vec::new();
        let mut seen_dirs: Vec<String> = Vec::new();
        let now = now_ms();
        for raw in paths { let path=PathBuf::from(raw); if !path.is_file()||!supported_ext(&path){continue;} if let Some((track,size,modified))=parse_track_cached(&path,&artwork_dir,true){upsert_track(&conn,&track,size,modified,None,false)?; if let Some(parent)=Path::new(&track.path).parent(){let ps=parent.to_string_lossy().to_string(); if !seen_dirs.contains(&ps){seen_dirs.push(ps);}} out.push(track);} }
        if !seen_dirs.is_empty() {
            let tx=conn.transaction().map_err(|e|e.to_string())?;
            for d in &seen_dirs { tx.execute("INSERT OR IGNORE INTO allowed_dirs(path,added_at) VALUES(?1,?2)",params![d,now]).map_err(|e|e.to_string())?; }
            tx.commit().map_err(|e|e.to_string())?;
        }
        if let Some(pid)=playlist_id { let tx=conn.transaction().map_err(|e|e.to_string())?; let mut pos:i64=tx.query_row("SELECT COALESCE(MAX(position),-1)+1 FROM playlist_tracks WHERE playlist_id=?1",params![pid],|r|r.get(0)).unwrap_or(0); for t in &out {tx.execute("INSERT INTO playlist_tracks(playlist_id,track_id,position) VALUES(?1,?2,?3)",params![pid,t.id,pos]).map_err(|e|e.to_string())?;pos+=1;} tx.commit().map_err(|e|e.to_string())?; }
        Ok((out,seen_dirs))
    }).await.map_err(|e|e.to_string())??;
    // Non-recursive playback grant. A grant failure must not fail the import
    // itself — the next successful import retries.
    for d in &dirs {
        if let Err(e)=app.asset_protocol_scope().allow_directory(Path::new(d),false){
            eprintln!("[melo] could not grant playback scope for {d}: {e}");
        }
    }
    Ok(out)
}

// Shared per-album artwork resolution for the single and batched commands.
// The batch exists so scrolling a large grid does not fire one IPC call +
// SQLite open per album.
fn ensure_track_artwork_sync(conn: &Connection, id: &str, artwork_dir: &Path) -> Result<Option<String>, String> {
    let existing:Option<String>=conn.query_row("SELECT artwork_path FROM tracks WHERE id=?1",params![id],|r|r.get(0)).optional().map_err(|e|e.to_string())?.flatten();
    if existing.as_ref().map(|p|Path::new(p).exists()).unwrap_or(false){return Ok(existing);}
    let path:String=conn.query_row("SELECT path FROM tracks WHERE id=?1",params![id],|r|r.get(0)).map_err(|e|e.to_string())?;
    let tagged=lofty::probe::Probe::open(&path).map_err(|e|e.to_string())?.read().map_err(|e|e.to_string())?;
    let tag=tagged.primary_tag().or(tagged.first_tag());
    let artwork=tag.and_then(|t|t.pictures().first()).and_then(|p|cache_artwork(p.data(),artwork_dir));
    if let Some(ref value)=artwork{conn.execute("UPDATE tracks SET artwork_path=?2 WHERE id=?1",params![id,value]).map_err(|e|e.to_string())?;}
    Ok(artwork)
}

#[tauri::command]
pub async fn ensure_track_artwork(id:String,state:State<'_,LibraryState>)->Result<Option<String>,String>{
    let db_path=state.db_path.clone();
    let artwork_dir=state.artwork_dir.clone();
    tauri::async_runtime::spawn_blocking(move || {
        let conn=open_db(&db_path)?;
        ensure_track_artwork_sync(&conn,&id,&artwork_dir)
    }).await.map_err(|e|e.to_string())?
}

/// Resolves a whole page of artwork lookups in ONE command and connection;
/// results align with `ids` (None = no art found).
#[tauri::command]
pub async fn ensure_track_artwork_batch(ids: Vec<String>, state: State<'_, LibraryState>) -> Result<Vec<Option<String>>, String> {
    let db_path = state.db_path.clone();
    let artwork_dir = state.artwork_dir.clone();
    tauri::async_runtime::spawn_blocking(move || {
        let conn = open_db(&db_path)?;
        let mut paths: Vec<Option<String>> = Vec::with_capacity(ids.len());
        for id in ids.iter() {
            paths.push(ensure_track_artwork_sync(&conn, id, &artwork_dir)?);
        }
        Ok(paths)
    }).await.map_err(|e|e.to_string())?
}

/// Full-resolution embedded artwork as a `data:` URL (base64) for the
/// player UI. No disk cache; a process-local in-memory cache keyed by
/// track id skips repeat lofty probes. Art larger than
/// `MAX_FULL_ART_BYTES` returns None (the thumb stays as fallback).
#[tauri::command]
pub async fn get_track_artwork_full(id: String, state: State<'_, LibraryState>) -> Result<Option<String>, String> {
    // Hit the in-memory cache before any I/O; entries are the full `data:` URL
    // (empty string = "no art"). Every owned value is extracted from `state`
    // inside an inner scope so no borrow crosses into `spawn_blocking`.
    let db_path = state.db_path.clone();
    // Clone the cache Arc into `spawn_blocking` — a freestanding owned Arc,
    // borrowing `state` only for the clone expression.
    let cache_arc: Arc<Mutex<HashMap<String, String>>> = state.full_art_cache.clone();
    if let Some(cached) = cache_arc.lock().unwrap_or_else(|e| e.into_inner()).get(&id).cloned() {
        return Ok(if cached.is_empty() { None } else { Some(cached) });
    }

    tauri::async_runtime::spawn_blocking(move || {
        let conn = open_db(&db_path)?;
        let path: String = conn
            .query_row("SELECT path FROM tracks WHERE id=?1", params![id], |r| r.get(0))
            .map_err(|e| e.to_string())?;
        let tagged = lofty::probe::Probe::open(&path)
            .map_err(|e| e.to_string())?
            .read()
            .map_err(|e| e.to_string())?;
        let tag = tagged.primary_tag().or(tagged.first_tag());
        let data_url = tag
            .and_then(|t| t.pictures().first())
            .and_then(|picture| image_data_url(picture.data()));
        // Cache the resolved value (or the empty string for "no usable
        // art", so we don't re-probe a tag-only file on every request).
        cache_arc
            .lock()
            .unwrap_or_else(|e| e.into_inner())
            .insert(id, data_url.clone().unwrap_or_default());
        Ok(data_url)
    })
    .await
    .map_err(|e| e.to_string())?
}

const MAX_FULL_ART_BYTES: usize = 8 * 1024 * 1024;

fn art_mime(data: &[u8]) -> &'static str {
    if data.len() >= 8 && &data[..8] == b"\x89PNG\r\n\x1a\n" {
        "image/png"
    } else if data.len() >= 3 && &data[..3] == b"\xff\xd8\xff" {
        "image/jpeg"
    } else if data.len() >= 12 && &data[..4] == b"RIFF" && &data[8..12] == b"WEBP" {
        "image/webp"
    } else if data.len() >= 6 && (&data[..6] == b"GIF87a" || &data[..6] == b"GIF89a") {
        "image/gif"
    } else {
        // Most embedded album art is JPEG; the webview sniffs content anyway.
        "image/jpeg"
    }
}

const B64_CHARS: &[u8; 64] = b"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

fn b64_encode(data: &[u8]) -> String {
    let mut out = String::with_capacity((data.len() + 2) / 3 * 4);
    let mut i = 0;
    while i + 3 <= data.len() {
        let n = ((data[i] as u32) << 16) | ((data[i + 1] as u32) << 8) | (data[i + 2] as u32);
        out.push(B64_CHARS[(n >> 18) as usize & 63] as char);
        out.push(B64_CHARS[(n >> 12) as usize & 63] as char);
        out.push(B64_CHARS[(n >> 6) as usize & 63] as char);
        out.push(B64_CHARS[n as usize & 63] as char);
        i += 3;
    }
    match data.len() - i {
        1 => {
            let n = (data[i] as u32) << 16;
            out.push(B64_CHARS[(n >> 18) as usize & 63] as char);
            out.push(B64_CHARS[(n >> 12) as usize & 63] as char);
            out.push('=');
            out.push('=');
        }
        2 => {
            let n = ((data[i] as u32) << 16) | ((data[i + 1] as u32) << 8);
            out.push(B64_CHARS[(n >> 18) as usize & 63] as char);
            out.push(B64_CHARS[(n >> 12) as usize & 63] as char);
            out.push(B64_CHARS[(n >> 6) as usize & 63] as char);
            out.push('=');
        }
        _ => {}
    }
    out
}

fn image_data_url(data: &[u8]) -> Option<String> {
    if data.is_empty() || data.len() > MAX_FULL_ART_BYTES {
        return None;
    }
    Some(format!("data:{};base64,{}", art_mime(data), b64_encode(data)))
}

#[tauri::command]
pub async fn get_track_by_id(id:String,state:State<'_,LibraryState>)->Result<Option<DbTrack>,String>{let conn=locked_db(&state)?;let sql=format!("{} WHERE id=?1",TRACK_SELECT);conn.query_row(&sql,params![id],row_track).optional().map_err(|e|e.to_string())}

/// Batch variant of `get_track_by_id`: one `WHERE id IN (...)` query per
/// chunk replaces ~50 IPC round-trips (order restored client-side).
#[tauri::command]
pub async fn get_tracks_by_ids(ids:Vec<String>,state:State<'_,LibraryState>)->Result<Vec<DbTrack>,String>{
    if ids.is_empty(){return Ok(Vec::new());}
    let conn=locked_db(&state)?;
    let mut out:Vec<DbTrack>=Vec::with_capacity(ids.len());
    // SQLite caps the number of bound variables per statement (999 on older
    // builds; 32766 on newer bundled ones) — chunk conservatively.
    for chunk in ids.chunks(200){
        let marks=std::iter::repeat("?").take(chunk.len()).collect::<Vec<_>>().join(",");
        let sql=format!("{} WHERE id IN ({})",TRACK_SELECT,marks);
        let mut stmt=conn.prepare(&sql).map_err(|e|e.to_string())?;
        // Bind the MappedRows to a local so its destructor runs before `stmt` is
        // dropped (borrow checker).
        let rows = stmt.query_map(params_from_iter(chunk.iter()),row_track).map_err(|e|e.to_string())?;
        for row in rows { if let Some(t)=log_skipped(row){out.push(t);} }
    }
    Ok(out)
}
/// The playback QUEUE is intentionally entry-keyed: the same track may be
/// queued more than once. Each row's entry_id is what reordering, drag and
/// player identity use.
#[tauri::command]
pub async fn queue_tracks(limit: usize, offset: usize, state: State<'_, LibraryState>) -> Result<Page<DbTrack>, String> {
    let conn = locked_db(&state)?;
    let limit = limit.clamp(1, 5000);
    let total: i64 = conn.query_row("SELECT COUNT(*) FROM queue", [], |r| r.get(0)).map_err(|e| e.to_string())?;
    let mut stmt = conn.prepare(
        "SELECT t.id,t.path,t.title,t.artist,t.album_artist,t.album,t.genre,t.year,t.duration,t.artwork_path,t.codec,t.specs,t.replay_gain,q.entry_id \
         FROM queue q JOIN tracks t ON t.id=q.track_id ORDER BY q.position LIMIT ?1 OFFSET ?2"
    ).map_err(|e| e.to_string())?;
    // Rows expose the queue entry_id through playlist_entry_id — the frontend
    // keys drag/selection/play identity on it (duplicates distinguishable).
    // Column 13 is q.entry_id (0..12 are the track fields including replay_gain).
    // Reading column 12 here used to feed replay_gain into playlist_entry_id,
    // which left every queue row without an entry id → drag/multi-select dead.
    let items = stmt.query_map(params![limit as i64,offset as i64], |r| row_track_with_entries(r, Some(r.get(13)?)))
        .map_err(|e| e.to_string())?.filter_map(log_skipped).collect();
    Ok(Page { items, total, limit, offset })
}

fn renumber_queue(conn: &Connection) -> Result<(), String> {
    let entries: Vec<i64> = {
        let mut stmt = conn.prepare("SELECT entry_id FROM queue ORDER BY position,entry_id").map_err(|e| e.to_string())?;
        // Bind the MappedRows to a local so it drops before `stmt` (borrow
        // checker).
        let rows = stmt.query_map([], |r| r.get::<_, i64>(0)).map_err(|e| e.to_string())?;
        rows.filter_map(log_skipped).collect()
    };
    // Move to a disjoint negative range first so renumbering never
    // transiently collides with an existing position value.
    for (i, id) in entries.iter().enumerate() {
        conn.execute("UPDATE queue SET position=?2 WHERE entry_id=?1", params![id, -1 - i as i64]).map_err(|e| e.to_string())?;
    }
    for (i, id) in entries.iter().enumerate() {
        conn.execute("UPDATE queue SET position=?2 WHERE entry_id=?1", params![id, i as i64]).map_err(|e| e.to_string())?;
    }
    Ok(())
}

#[tauri::command]
pub async fn replace_queue_tracks(track_ids: Vec<String>, state: State<'_, LibraryState>) -> Result<(), String> {
    let mut conn = locked_db(&state)?;
    let tx = conn.transaction().map_err(|e| e.to_string())?;
    tx.execute("DELETE FROM queue", []).map_err(|e| e.to_string())?;
    // Plain INSERT — repeated track ids are KEPT (one row per occurrence).
    let mut stmt = tx.prepare("INSERT INTO queue(position,track_id) VALUES(?1,?2)").map_err(|e| e.to_string())?;
    for (position, id) in track_ids.iter().enumerate() {
        stmt.execute(params![position as i64, id]).map_err(|e| e.to_string())?;
    }
    drop(stmt);
    renumber_queue(&tx)?;
    tx.commit().map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn append_queue_tracks(track_ids: Vec<String>, state: State<'_, LibraryState>) -> Result<Vec<i64>, String> {
    let mut conn = locked_db(&state)?;
    let tx = conn.transaction().map_err(|e| e.to_string())?;
    let mut position: i64 = tx.query_row("SELECT COALESCE(MAX(position),-1)+1 FROM queue", [], |r| r.get(0)).unwrap_or(0);
    // Plain INSERT: dragging the same track again appends ANOTHER occurrence
    // (INSERT OR IGNORE silently dropped it while the UI reported success).
    let mut stmt = tx.prepare("INSERT INTO queue(position,track_id) VALUES(?1,?2)").map_err(|e| e.to_string())?;
    // entry_id is the rowid: collect one per row so callers can broadcast
    // the new entries' identity to the other windows.
    let mut entry_ids: Vec<i64> = Vec::with_capacity(track_ids.len());
    for id in track_ids {
        stmt.execute(params![position, id]).map_err(|e| e.to_string())?;
        entry_ids.push(tx.last_insert_rowid());
        position += 1;
    }
    drop(stmt);
    renumber_queue(&tx)?;
    tx.commit().map_err(|e| e.to_string())?;
    Ok(entry_ids)
}

/// Builds a whole filtered playlist queue in SQLite; repeated entries are
/// queued as separate occurrences (entry-keyed queue).
#[tauri::command]
pub async fn replace_queue_from_playlist(playlist_id: String, search: Option<String>, sort: Option<String>, state: State<'_, LibraryState>) -> Result<(), String> {
    let mut conn = locked_db(&state)?;
    let tx = conn.transaction().map_err(|e| e.to_string())?;
    let q = search_pattern(&search.unwrap_or_default());
    tx.execute("DELETE FROM queue", []).map_err(|e| e.to_string())?;
    let sql = format!(
        "INSERT INTO queue(position,track_id) \
         SELECT ROW_NUMBER() OVER (ORDER BY {})-1,t.id FROM playlist_tracks pt \
         JOIN tracks t ON t.id=pt.track_id WHERE pt.playlist_id=?1 AND \
         (t.title LIKE ?2 ESCAPE '$' OR t.artist LIKE ?2 ESCAPE '$' OR t.album LIKE ?2 ESCAPE '$')",
        playlist_order(sort.as_deref())
    );
    tx.execute(&sql, params![playlist_id, q]).map_err(|e| e.to_string())?;
    renumber_queue(&tx)?;
    tx.commit().map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn replace_queue_from_library(search: Option<String>, artist: Option<String>, album: Option<String>, genre: Option<String>, sort: Option<String>, state: State<'_, LibraryState>) -> Result<(), String> {
    let mut conn = locked_db(&state)?;
    let (where_sql, values) = library_filter(search, artist, None, album, genre);
    let sql = format!("INSERT INTO queue(position,track_id) SELECT ROW_NUMBER() OVER (ORDER BY {})-1,id FROM tracks{}", library_order(sort.as_deref()), where_sql);
    let tx = conn.transaction().map_err(|e| e.to_string())?;
    tx.execute("DELETE FROM queue", []).map_err(|e| e.to_string())?;
    let refs: Vec<&dyn ToSql> = values.iter().map(|v| v as &dyn ToSql).collect();
    tx.execute(&sql, params_from_iter(refs)).map_err(|e| e.to_string())?;
    renumber_queue(&tx)?;
    tx.commit().map_err(|e| e.to_string())
}

/// Deterministic ORDER for the play queue: same visible columns as the
/// playlist sort, tie-broken by queue position (every ORDER BY ends with a
/// unique key).
fn queue_order(sort: Option<&str>) -> &'static str {
    match sort {
        Some("title-asc") => "t.title COLLATE NOCASE,q.position",
        Some("artist-asc") => "t.artist COLLATE NOCASE,q.position",
        Some("album-asc") => "t.album COLLATE NOCASE,q.position",
        Some("dur-asc") => "t.duration,q.position",
        Some("dur-desc") => "t.duration DESC,q.position",
        _ => "q.position",
    }
}

/// Writes the queue in the given order: rows park on a negative range first
/// (UNIQUE(position) is never transiently violated), then compact to 0..n.
fn apply_queue_order(conn: &Connection, ids: &[String]) -> Result<(), String> {
    // Ids are queue ENTRY ids (strings for the broadcast round-trip).
    for (i, id) in ids.iter().enumerate() {
        conn.execute("UPDATE queue SET position=?2 WHERE entry_id=?1", params![id, -1 - i as i64]).map_err(|e| e.to_string())?;
    }
    for (i, id) in ids.iter().enumerate() {
        conn.execute("UPDATE queue SET position=?2 WHERE entry_id=?1", params![id, i as i64]).map_err(|e| e.to_string())?;
    }
    Ok(())
}

/// One row of a queue-reorder broadcast: the queue ENTRY id plus the TRACK
/// id it points at, so the player can resolve runtime-only (not yet
/// hydrated) items too.
#[derive(serde::Serialize)]
#[serde(rename_all = "camelCase")]
pub struct QueueOrderRow {
    pub entry_id: i64,
    pub track_id: String,
}

fn queue_order_rows(conn: &Connection, ordered: &[String]) -> Result<Vec<QueueOrderRow>, String> {
    let mut stmt = conn.prepare("SELECT entry_id, track_id FROM queue WHERE entry_id = ?1").map_err(|e| e.to_string())?;
    let mut out = Vec::with_capacity(ordered.len());
    for entry in ordered {
        let entry_id: i64 = entry.parse().map_err(|_| "invalid queue entry id".to_string())?;
        let track_id: String = stmt
            .query_row(params![entry_id], |r| r.get(1))
            .optional()
            .ok()
            .flatten()
            .unwrap_or_default();
        out.push(QueueOrderRow { entry_id, track_id });
    }
    Ok(out)
}

/// Sorts the PLAY QUEUE in place: rewrites the persisted positions (unlike
/// playlist sorting, which is a view projection). The playing track is
/// unaffected.
#[tauri::command]
pub async fn sort_queue(sort: String, state: State<'_, LibraryState>) -> Result<Vec<QueueOrderRow>, String> {
    let conn = locked_db(&state)?;
    // The broadcast order is a sequence of queue ENTRY ids (duplicates
    // distinguishable); each row also carries its TRACK id so the player can
    // resolve runtime-only items.
    let order_ids: Vec<String> = {
        let sql = format!(
            "SELECT q.entry_id FROM queue q JOIN tracks t ON t.id=q.track_id ORDER BY {}",
            queue_order(Some(&sort))
        );
        let mut stmt = conn.prepare(&sql).map_err(|e| e.to_string())?;
        let rows = stmt.query_map([], |r| r.get::<_, i64>(0)).map_err(|e| e.to_string())?;
        rows.filter_map(log_skipped).map(|v: i64| v.to_string()).collect()
    };
    apply_queue_order(&conn, &order_ids)?;
    queue_order_rows(&conn, &order_ids)
}

/// Drag-reorder for the play queue: moves `track_id` to `target_index`
/// (clamped) and returns the new order for the broadcast; playback
/// continues unaffected.
#[tauri::command]
pub async fn move_queue_track(track_id: String, target_index: i64, state: State<'_, LibraryState>) -> Result<Vec<String>, String> {
    let conn = locked_db(&state)?;
    // Order is a sequence of entry ids; a TRACK id moves its earliest
    // occurrence (compat).
    let order_ids: Vec<String> = {
        let mut stmt = conn.prepare("SELECT entry_id FROM queue ORDER BY position,entry_id").map_err(|e| e.to_string())?;
        let rows = stmt.query_map([], |r| r.get::<_, i64>(0)).map_err(|e| e.to_string())?;
        rows.filter_map(log_skipped).map(|v: i64| v.to_string()).collect()
    };
    let mut moved: Vec<String> = Vec::new();
    if let Some(first) = conn.query_row(
        "SELECT entry_id FROM queue WHERE track_id=?1 ORDER BY position,entry_id LIMIT 1",
        params![track_id],
        |r| r.get::<_, i64>(0),
    ).optional().ok().flatten() {
        let mut rest: Vec<String> = order_ids.iter().filter(|e| e.as_str() != first.to_string().as_str()).cloned().collect();
        let target = target_index.clamp(0, rest.len() as i64) as usize;
        rest.insert(target, first.to_string());
        moved = rest;
        apply_queue_order(&conn, &moved)?;
    }
    Ok(if moved.is_empty() { order_ids } else { moved })
}

/// Multi-row drag for the queue: selected entries (including duplicates of
/// one track) keep their relative order and land as one block at
/// `target_index` (clamped). Returns the new order (entry ids).
#[tauri::command]
pub async fn move_queue_entries(entry_ids: Vec<i64>, target_index: i64, state: State<'_, LibraryState>) -> Result<Vec<QueueOrderRow>, String> {
    let conn = locked_db(&state)?;
    let order_ids: Vec<String> = {
        let mut stmt = conn.prepare("SELECT entry_id FROM queue ORDER BY position,entry_id").map_err(|e| e.to_string())?;
        let rows = stmt.query_map([], |r| r.get::<_, i64>(0)).map_err(|e| e.to_string())?;
        rows.filter_map(log_skipped).map(|v: i64| v.to_string()).collect()
    };
    let wanted: Vec<String> = entry_ids.iter().map(|v| v.to_string()).collect();
    let moving: Vec<String> = order_ids
        .iter()
        .filter(|id| wanted.contains(id))
        .cloned()
        .collect();
    if moving.is_empty() {
        // The early exit must convert to QueueOrderRow rows like every other exit.
        return Ok(queue_order_rows(&conn, &order_ids)?);
    }
    // `target_index` is the ORIGINAL index of the hovered row: dropping below
    // a selected block must subtract the block entries before the hovered row
    // and land AFTER it (dropping above inserts before it). Borrow-based
    // values are computed before `order_ids` is consumed (E0382).
    let t = target_index.max(0) as usize;
    let first_moving = order_ids.iter().position(|id| wanted.contains(id));
    let below = first_moving.map(|first| t > first).unwrap_or(false);
    let moving_before_t = order_ids
        .iter()
        .take(t.min(order_ids.len()))
        .filter(|id| wanted.contains(id))
        .count();
    let mut target = t.saturating_sub(moving_before_t);
    if below {
        target += 1; // the hovered row stays directly ABOVE the block
    }
    let rest: Vec<String> = order_ids
        .into_iter()
        .filter(|id| !moving.contains(id))
        .collect();
    let target = target.min(rest.len());
    let mut new_order: Vec<String> = Vec::with_capacity(rest.len() + moving.len());
    new_order.extend_from_slice(&rest[..target]);
    new_order.extend_from_slice(&moving);
    new_order.extend_from_slice(&rest[target..]);
    apply_queue_order(&conn, &new_order)?;
    queue_order_rows(&conn, &new_order)
}

/// Multi-row drag for stored playlists: selected entries move as one block
/// to `target_index`; positions park negative first so no UNIQUE
/// constraint trips.
#[tauri::command]
pub async fn move_playlist_entries(playlist_id: String, entry_ids: Vec<i64>, target_index: i64, state: State<'_, LibraryState>) -> Result<(), String> {
    let mut conn = locked_db(&state)?;
    ensure_manual_playlist(&conn, &playlist_id)?;
    let entries: Vec<i64> = {
        let mut stmt = conn.prepare("SELECT entry_id FROM playlist_tracks WHERE playlist_id=?1 ORDER BY position,entry_id").map_err(|e| e.to_string())?;
        let rows = stmt.query_map(params![playlist_id], |r| r.get::<_, i64>(0)).map_err(|e| e.to_string())?;
        rows.filter_map(log_skipped).collect()
    };
    let moving: Vec<i64> = entries.iter().filter(|id| entry_ids.contains(id)).cloned().collect();
    if moving.is_empty() {
        return Ok(());
    }
    let rest: Vec<i64> = entries.iter().filter(|id| !entry_ids.contains(id)).cloned().collect();
    // Same below-the-block correction as the queue reorder.
    let t = target_index.max(0) as usize;
    let first_moving = entries.iter().position(|id| entry_ids.contains(id));
    let below = first_moving.map(|first| t > first).unwrap_or(false);
    let moving_before_t = entries
        .iter()
        .take(t.min(entries.len()))
        .filter(|id| entry_ids.contains(id))
        .count();
    let mut target = t.saturating_sub(moving_before_t);
    if below {
        target += 1; // the hovered row stays directly ABOVE the block
    }
    let target = target.min(rest.len());
    let mut new_order: Vec<i64> = Vec::with_capacity(entries.len());
    new_order.extend_from_slice(&rest[..target]);
    new_order.extend_from_slice(&moving);
    new_order.extend_from_slice(&rest[target..]);
    let tx = conn.transaction().map_err(|e| e.to_string())?;
    for (i, id) in new_order.iter().enumerate() {
        tx.execute("UPDATE playlist_tracks SET position=?2 WHERE entry_id=?1 AND playlist_id=?3", params![id, -1 - i as i64, playlist_id]).map_err(|e| e.to_string())?;
    }
    for (i, id) in new_order.iter().enumerate() {
        tx.execute("UPDATE playlist_tracks SET position=?2 WHERE entry_id=?1 AND playlist_id=?3", params![id, i as i64, playlist_id]).map_err(|e| e.to_string())?;
    }
    tx.commit().map_err(|e| e.to_string())?;
    Ok(())
}

/// Removes queue rows by ENTRY id (the × button); returns the remaining
/// order as entry+track rows for the broadcast so the player follows
/// immediately.
#[tauri::command]
pub async fn remove_queue_entries(entry_ids: Vec<i64>, state: State<'_, LibraryState>) -> Result<Vec<QueueOrderRow>, String> {
    let conn = locked_db(&state)?;
    {
        let mut stmt = conn.prepare("DELETE FROM queue WHERE entry_id = ?1").map_err(|e| e.to_string())?;
        for id in &entry_ids {
            stmt.execute(params![id]).map_err(|e| e.to_string())?;
        }
    }
    renumber_queue(&conn)?;
    let order_ids: Vec<String> = {
        let mut stmt = conn.prepare("SELECT entry_id FROM queue ORDER BY position,entry_id").map_err(|e| e.to_string())?;
        let rows = stmt.query_map([], |r| r.get::<_, i64>(0)).map_err(|e| e.to_string())?;
        rows.filter_map(log_skipped).map(|v: i64| v.to_string()).collect()
    };
    queue_order_rows(&conn, &order_ids)
}

#[tauri::command]
pub async fn clear_queue(state: State<'_, LibraryState>) -> Result<(), String> {
    let conn = locked_db(&state)?;
    conn.execute("DELETE FROM queue", []).map_err(|e| e.to_string())?;
    Ok(())
}

/// Writes text via our own command (no fs-plugin scope/permission wiring),
/// behaving the same in dev and packaged builds.
#[tauri::command]
pub async fn write_text_file(path:String, contents:String)->Result<(),String>{
    tauri::async_runtime::spawn_blocking(move || std::fs::write(&path, contents).map_err(|e| e.to_string())).await.map_err(|e|e.to_string())?
}

/// Permanently removes track rows; foreign keys remove playlist/queue
/// occurrences. A no-longer-scanned path is a removed Track, not a rename.
fn delete_track_ids(conn: &mut Connection, ids: &[String]) -> Result<(), String> {
    if ids.is_empty() { return Ok(()); }
    let tx = conn.transaction().map_err(|e| e.to_string())?;
    // Artwork files are content-hash-named and shared by tracks. Remove a
    // cached file only after no surviving row references it.
    let mut artwork_candidates: std::collections::HashSet<String> = std::collections::HashSet::new();
    for id in ids {
        if let Ok(Some(path)) = tx.query_row(
            "SELECT artwork_path FROM tracks WHERE id=?1", params![id], |r| r.get::<_, Option<String>>(0)
        ) {
            artwork_candidates.insert(path);
        }
        tx.execute("DELETE FROM tracks WHERE id=?1", params![id]).map_err(|e| e.to_string())?;
    }
    for path in &artwork_candidates {
        let still_used: i64 = tx.query_row("SELECT COUNT(*) FROM tracks WHERE artwork_path=?1", params![path], |r| r.get(0)).unwrap_or(1);
        if still_used == 0 { let _ = std::fs::remove_file(path); }
    }
    tx.commit().map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn delete_tracks(ids: Vec<String>, state: State<'_, LibraryState>) -> Result<(), String> {
    let mut conn = locked_db(&state)?;
    delete_track_ids(&mut conn, &ids)
}

/// Removes every Library-owned track of one artist (or artist+album) as a
/// set-based DELETE in one transaction — no huge id list crosses IPC.
#[tauri::command]
pub async fn delete_library_group(
    artist: String,
    album_artist: Option<String>,
    album: Option<String>,
    state: State<'_, LibraryState>,
) -> Result<usize, String> {
    let mut conn = locked_db(&state)?;
    let tx = conn.transaction().map_err(|e| e.to_string())?;
    let removed = if let Some(album) = album {
        if let Some(album_artist) = album_artist {
            tx.execute(
                "DELETE FROM tracks WHERE library_owned=1 AND album_artist=?1 AND album=?2",
                params![album_artist, album],
            )
        } else {
            tx.execute(
                "DELETE FROM tracks WHERE library_owned=1 AND artist=?1 AND album=?2",
                params![artist, album],
            )
        }
    } else if let Some(album_artist) = album_artist {
        tx.execute("DELETE FROM tracks WHERE library_owned=1 AND album_artist=?1", params![album_artist])
    } else {
        tx.execute("DELETE FROM tracks WHERE library_owned=1 AND artist=?1", params![artist])
    }.map_err(|e| e.to_string())?;
    tx.commit().map_err(|e| e.to_string())?;
    Ok(removed)
}

/// Opens the containing folder of a KNOWN Library record (the path is read
/// from SQLite, never an arbitrary IPC path); Explorer selects the file.
#[tauri::command]
pub async fn open_track_folder(id: String, state: State<'_, LibraryState>) -> Result<(), String> {
    let path: String = {
        let conn = locked_db(&state)?;
        conn.query_row("SELECT path FROM tracks WHERE id=?1", params![id], |r| r.get(0))
            .map_err(|_| "Track is no longer in the Library".to_string())?
    };
    let file = PathBuf::from(path);
    if !file.is_file() { return Err("Track file is no longer available".into()); }
    #[cfg(target_os = "windows")]
    {
        use std::os::windows::process::CommandExt;
        // explorer.exe /select quirks: (1) strip the extended-length prefix
        // (`\\?\`, `\?\`, `\\?\UNC\server\share` → `\\server\share`);
        // (2) use `raw_arg` to quote ONLY the path — Rust's automatic whole-arg
        // quoting breaks /select when the path contains a space.
        let mut plain = file.to_string_lossy().to_string().replace("/", "\\");
        loop {
            if let Some(rest) = plain.strip_prefix(r"\\?\UNC\") { plain = format!(r"\\{rest}"); continue; }
            if let Some(rest) = plain.strip_prefix(r"\\?\") { plain = rest.to_string(); continue; }
            if let Some(rest) = plain.strip_prefix("\\?\\") { plain = rest.to_string(); continue; }
            break;
        }
        std::process::Command::new("explorer.exe")
            .raw_arg(format!("/select,\"{}\"", plain))
            .spawn().map_err(|e| e.to_string())?;
    }
    #[cfg(not(target_os = "windows"))]
    {
        let folder = file.parent().ok_or_else(|| "Track has no containing folder".to_string())?;
        std::process::Command::new("xdg-open").arg(folder).spawn().map_err(|e| e.to_string())?;
    }
    Ok(())
}

