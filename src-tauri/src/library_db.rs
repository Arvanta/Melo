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
    // Only `playlist_tracks` knows a track's play count (its JOIN reaches the
    // tracks table anyway, so one extra column costs nothing); every other
    // command leaves it None and the field disappears from the JSON.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub play_count: Option<i64>,
    // Star rating 0..=5 read from the file's tag while scanning (round 125).
    // Internal only: the UI asks `ratings_of` instead.
    #[serde(skip)]
    pub rating: u8,
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
                "mp3" | "flac" | "wav" | "ogg" | "aac" | "m4a" | "alac" | "opus" | "aiff" | "mka"
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
    // Round 118: natural file-name order for the playlist/queue sort. Applied
    // to `tracks.path`; only used by playlist_order / queue_order.
    conn.create_collation("MELO_FILENAME", |a: &str, b: &str| natural_file_cmp(a, b))
        .map_err(|e| e.to_string())?;
    Ok(conn)
}

/// One piece of a file stem: a digit run (leading zeros stripped, original
/// length kept for tie-breaking) or a run of other characters (lower-cased,
/// Arabic yeh/kaf folded to the Persian letters).
enum NatTok {
    Num(String, usize),
    Text(String),
}

fn nat_fold(c: char) -> char {
    match c {
        '\u{064A}' => '\u{06CC}', // ARABIC YEH -> FARSI YEH
        '\u{0643}' => '\u{06A9}', // ARABIC KAF -> KEHEH
        _ => c,
    }
}

fn nat_tokens(stem: &str) -> Vec<NatTok> {
    let mut out: Vec<NatTok> = Vec::new();
    let mut digits = String::new();
    let mut text = String::new();
    let flush_digits = |digits: &mut String, out: &mut Vec<NatTok>| {
        if !digits.is_empty() {
            let trimmed = digits.trim_start_matches('0').to_string();
            out.push(NatTok::Num(trimmed, digits.len()));
            digits.clear();
        }
    };
    for c in stem.chars() {
        if c.is_ascii_digit() {
            if !text.is_empty() {
                out.push(NatTok::Text(std::mem::take(&mut text)));
            }
            digits.push(c);
        } else {
            flush_digits(&mut digits, &mut out);
            for l in c.to_lowercase() {
                text.push(nat_fold(l));
            }
        }
    }
    flush_digits(&mut digits, &mut out);
    if !text.is_empty() {
        out.push(NatTok::Text(text));
    }
    out
}

/// Splits a path into (stem, extension, full file name): last `/` or `\`
/// separates the directory; the extension is the part after the last `.`
/// (a leading dot is part of the stem).
fn nat_split(path: &str) -> (&str, &str, &str) {
    let name = path.rsplit(|c| c == '/' || c == '\\').next().unwrap_or(path);
    match name.rfind('.') {
        Some(i) if i > 0 => (&name[..i], &name[i + 1..], name),
        _ => (name, "", name),
    }
}

/// Natural, case-insensitive file-name order (`track2 < track03 < track10 <
/// track100`). Directory and extension are ignored for the main comparison;
/// ties fall back to zero-padding, extension and the raw name so the order is
/// total and stable. An empty path sorts LAST.
pub(crate) fn natural_file_cmp(a: &str, b: &str) -> std::cmp::Ordering {
    use std::cmp::Ordering;
    match (a.is_empty(), b.is_empty()) {
        (true, true) => return Ordering::Equal,
        (true, false) => return Ordering::Greater,
        (false, true) => return Ordering::Less,
        _ => {}
    }
    let (sa, ea, na) = nat_split(a);
    let (sb, eb, nb) = nat_split(b);
    let ta = nat_tokens(sa);
    let tb = nat_tokens(sb);
    let mut zero_tie = Ordering::Equal;
    for (x, y) in ta.iter().zip(tb.iter()) {
        let ord = match (x, y) {
            (NatTok::Num(nx, lx), NatTok::Num(ny, ly)) => {
                let o = nx.len().cmp(&ny.len()).then_with(|| nx.cmp(ny));
                if o == Ordering::Equal && zero_tie == Ordering::Equal {
                    zero_tie = lx.cmp(ly);
                }
                o
            }
            (NatTok::Text(tx), NatTok::Text(ty)) => tx.cmp(ty),
            (NatTok::Num(..), NatTok::Text(_)) => Ordering::Less,
            (NatTok::Text(_), NatTok::Num(..)) => Ordering::Greater,
        };
        if ord != Ordering::Equal {
            return ord;
        }
    }
    ta.len()
        .cmp(&tb.len())
        .then(zero_tie)
        .then_with(|| ea.to_lowercase().cmp(&eb.to_lowercase()))
        .then_with(|| na.cmp(nb))
}

/// Locks the shared persistent connection. The guard must never be held
/// across `.await`.
#[track_caller]
fn locked_db(state: &LibraryState) -> Result<MutexGuard<'_, Connection>, String> {
    let caller = std::panic::Location::caller();
    let started = std::time::Instant::now();
    let guard = state
        .conn
        .lock()
        .map_err(|_| "Library database is unavailable".to_string());
    perf::note_if_slow(&state.db_path, started, &format!("waited for the database lock at line {}", caller.line()));
    guard
}

/// Round 128: timing log (`melo-perf.log` next to the database). Only slow
/// steps are written (>= 20 ms), the file is capped at ~400 KB (the previous
/// one is kept as `.old`), and nothing here can fail a command.
mod perf {
    use std::io::Write;
    use std::path::{Path, PathBuf};
    use std::sync::OnceLock;
    use std::time::Instant;

    pub const SLOW_MS: u128 = 20;
    const MAX_BYTES: u64 = 400 * 1024;
    static LOG: OnceLock<PathBuf> = OnceLock::new();

    fn stamp() -> String {
        let ms = std::time::SystemTime::now().duration_since(std::time::UNIX_EPOCH).map(|d| d.as_millis()).unwrap_or(0);
        let day = ms % 86_400_000;
        format!("{:02}:{:02}:{:02}.{:03}Z", day / 3_600_000, (day / 60_000) % 60, (day / 1000) % 60, day % 1000)
    }

    pub fn note(db_path: &Path, line: &str) {
        let path = LOG.get_or_init(|| db_path.with_file_name("melo-perf.log"));
        if let Ok(meta) = std::fs::metadata(path) {
            if meta.len() > MAX_BYTES { let _ = std::fs::rename(path, path.with_extension("log.old")); }
        }
        if let Ok(mut f) = std::fs::OpenOptions::new().create(true).append(true).open(path) {
            let _ = writeln!(f, "{} {}", stamp(), line);
        }
    }

    pub fn note_if_slow(db_path: &Path, started: Instant, what: &str) {
        let ms = started.elapsed().as_millis();
        if ms >= SLOW_MS { note(db_path, &format!("{ms} ms  {what}")); }
    }
}

/// Diagnostics for "file may be missing or moved": what is really on disk for
/// a track that failed to play. Writes one line to the timing log.
#[tauri::command]
pub fn perf_probe_file(path: String, state: State<'_, LibraryState>) {
    let p = std::path::Path::new(&path);
    let line = match std::fs::metadata(p) {
        Ok(m) => {
            let open = match std::fs::File::open(p) { Ok(_) => "ok".to_string(), Err(e) => format!("FAILED ({e})") };
            format!("[probe] {} exists=yes size={} readonly={} open={}", path, m.len(), m.permissions().readonly(), open)
        }
        Err(e) => format!("[probe] {} exists=NO ({e})", path),
    };
    perf::note(&state.db_path, &line);
}

/// The interface reports its own slow steps (IPC round trips, painting).
#[tauri::command]
pub fn perf_log(lines: Vec<String>, state: State<'_, LibraryState>) {
    for l in lines.iter().take(50) { perf::note(&state.db_path, &format!("[ui] {}", l.chars().take(300).collect::<String>())); }
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
        CREATE INDEX IF NOT EXISTS idx_lib_year ON tracks(year) WHERE library_owned=1;
        -- Round 129: the per-row cover lookups of the Library lists
        -- (`SELECT id,artwork_path ... ORDER BY id LIMIT 1`) are answered from
        -- these covering indexes alone — without them each lookup read every
        -- track row of the group from the table (790 albums took ~3.5 s on a
        -- cold connection). `id` comes right after the group columns, so the
        -- smallest id with artwork is the first index entry (no sort).
        CREATE INDEX IF NOT EXISTS idx_cov_album_artist_album ON tracks(album_artist COLLATE NOCASE, album COLLATE NOCASE, id, artwork_path) WHERE library_owned=1 AND artwork_path IS NOT NULL;
        CREATE INDEX IF NOT EXISTS idx_cov_artist_album ON tracks(artist COLLATE NOCASE, album COLLATE NOCASE, id, artwork_path) WHERE library_owned=1 AND artwork_path IS NOT NULL;
        CREATE INDEX IF NOT EXISTS idx_cov_genre ON tracks(genre COLLATE NOCASE, id, artwork_path) WHERE library_owned=1 AND artwork_path IS NOT NULL;

        -- Round 116: one row per listening segment (written by the player at
        -- track boundaries). Powers the Home statistics; rows of tracks that
        -- were later removed are ignored by every join.
        CREATE TABLE IF NOT EXISTS listen_log (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          track_id TEXT NOT NULL,
          started_at INTEGER NOT NULL,
          seconds REAL NOT NULL,
          counted INTEGER NOT NULL DEFAULT 0
        );
        CREATE INDEX IF NOT EXISTS idx_listen_started ON listen_log(started_at);
        CREATE INDEX IF NOT EXISTS idx_listen_track ON listen_log(track_id);
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
    // listen_log.counted (1.3.0): 1 on the row in which a play was earned, using the same rule as
    // play_count (min(30 s, half the track), unpaused). Older rows are approximated by >= 30 s.
    if !table_has_column(conn, "listen_log", "counted")? {
        conn.execute_batch(
            "ALTER TABLE listen_log ADD COLUMN counted INTEGER NOT NULL DEFAULT 0;
             UPDATE listen_log SET counted=1 WHERE seconds>=30;",
        )
        .map_err(|e| e.to_string())?;
    }
    // Round 126: smart playlists keep their rules (JSON) on the playlist row.
    if !table_has_column(conn, "playlists", "rules")? {
        conn.execute_batch("ALTER TABLE playlists ADD COLUMN rules TEXT;").map_err(|e| e.to_string())?;
    }
    // Round 125: star rating. `rating_dirty` = the new value is in the database
    // but not yet written to the file's tag (deferred for the playing track, or
    // a failed write); a dirty value always wins over what a scan reads.
    if !table_has_column(conn, "tracks", "rating")? {
        conn.execute_batch("ALTER TABLE tracks ADD COLUMN rating INTEGER NOT NULL DEFAULT 0;").map_err(|e| e.to_string())?;
    }
    if !table_has_column(conn, "tracks", "rating_dirty")? {
        conn.execute_batch("ALTER TABLE tracks ADD COLUMN rating_dirty INTEGER NOT NULL DEFAULT 0;").map_err(|e| e.to_string())?;
    }
    conn.execute_batch("CREATE INDEX IF NOT EXISTS idx_tracks_rating ON tracks(library_owned, rating);").map_err(|e| e.to_string())?;
    // One-time (round 119b): drop listen_log rows left behind by tracks removed
    // before deletes purged them, so a re-added file does not resurrect them.
    let ver: i64 = conn.query_row("PRAGMA user_version", [], |r| r.get(0)).map_err(|e| e.to_string())?;
    if ver < 1 {
        purge_orphan_listens(conn)?;
        conn.execute_batch("PRAGMA user_version = 1;").map_err(|e| e.to_string())?;
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
        spawn_rating_startup(db_path.clone());
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

/// Size in bytes of the ID3v2 tag starting at `pos` (header + body + footer),
/// or None when no ID3v2 header sits there.
fn id3v2_total_len(f: &mut std::fs::File, pos: u64) -> Option<u64> {
    use std::io::{Read, Seek, SeekFrom};
    let mut h = [0u8; 10];
    f.seek(SeekFrom::Start(pos)).ok()?;
    f.read_exact(&mut h).ok()?;
    if &h[0..3] != b"ID3" || h[6..10].iter().any(|b| b & 0x80 != 0) {
        return None;
    }
    let body = h[6..10].iter().fold(0u64, |n, b| (n << 7) | u64::from(*b));
    let footer = if h[5] & 0x10 != 0 { 10 } else { 0 };
    Some(10 + body + footer)
}

/// Some taggers leave the OLD ID3v2 tag in place when they write a new one,
/// so a file starts with two (or more) ID3v2 tags back to back. Lofty merges
/// them and the stale tag (often a download site's advert in the artist /
/// title) wins. Returns the byte range of the extra tags that follow the first.
fn extra_id3v2_span(path: &Path) -> Option<(u64, u64)> {
    let mut f = std::fs::File::open(path).ok()?;
    let first_end = id3v2_total_len(&mut f, 0)?;
    let mut pos = first_end;
    while let Some(n) = id3v2_total_len(&mut f, pos) {
        pos += n;
    }
    (pos > first_end).then_some((first_end, pos))
}

/// A file as if the byte range [cut_start, cut_end) were not there.
struct SkipSpan {
    file: std::fs::File,
    cut_start: u64,
    cut_len: u64,
    len: u64,
    pos: u64,
}

impl std::io::Read for SkipSpan {
    fn read(&mut self, buf: &mut [u8]) -> std::io::Result<usize> {
        use std::io::{Seek, SeekFrom};
        if self.pos >= self.len || buf.is_empty() {
            return Ok(0);
        }
        let mut want = buf.len() as u64;
        let mut phys = self.pos;
        if self.pos < self.cut_start {
            want = want.min(self.cut_start - self.pos);
        } else {
            phys += self.cut_len;
        }
        self.file.seek(SeekFrom::Start(phys))?;
        let n = std::io::Read::read(&mut self.file, &mut buf[..want as usize])?;
        self.pos += n as u64;
        Ok(n)
    }
}

impl std::io::Seek for SkipSpan {
    fn seek(&mut self, to: std::io::SeekFrom) -> std::io::Result<u64> {
        use std::io::SeekFrom;
        let target = match to {
            SeekFrom::Start(n) => n as i128,
            SeekFrom::End(d) => self.len as i128 + d as i128,
            SeekFrom::Current(d) => self.pos as i128 + d as i128,
        };
        if target < 0 {
            return Err(std::io::Error::new(std::io::ErrorKind::InvalidInput, "seek before start"));
        }
        self.pos = target as u64;
        Ok(self.pos)
    }
}

fn read_skipping_extra_id3v2(path: &Path, span: (u64, u64), opts: lofty::config::ParseOptions) -> Option<lofty::file::TaggedFile> {
    let file = std::fs::File::open(path).ok()?;
    let total = file.metadata().ok()?.len();
    let cut_len = span.1 - span.0;
    if span.1 > total {
        return None;
    }
    let reader = std::io::BufReader::new(SkipSpan { file, cut_start: span.0, cut_len, len: total - cut_len, pos: 0 });
    lofty::probe::Probe::new(reader).options(opts).guess_file_type().ok()?.read().ok()
}

/// Tolerant tag reader used by every READ path (scan, artwork, lyrics, quick
/// parse). Strict parsing rejected whole files over one bad frame — e.g.
/// JRiver writes `TYER = "0"` and lofty fails with "invalid year length" —
/// although the audio itself is fine. First try Relaxed mode with tags; if
/// the tags still cannot be parsed, read the audio properties only so the
/// file is imported with filename-based metadata instead of being dropped.
/// (Tag WRITING stays strict: see `write_tags` in main.rs.)
pub fn read_tagged_tolerant(path: &Path) -> Result<lofty::file::TaggedFile, String> {
    use lofty::config::{ParseOptions, ParsingMode};
    let relaxed = ParseOptions::new().parsing_mode(ParsingMode::Relaxed);
    let mut props_only = relaxed;
    props_only.read_tags(false);
    // Stacked ID3v2 tags: trust the FIRST (newest) one; fall back to the merged
    // read below when the first tag carries neither a title nor an artist.
    if let Some(span) = extra_id3v2_span(path) {
        if let Some(t) = read_skipping_extra_id3v2(path, span, relaxed) {
            let has_identity = t.primary_tag().or(t.first_tag()).map_or(false, |tag| tag.title().is_some() || tag.artist().is_some());
            if has_identity {
                return Ok(t);
            }
        }
    }
    let first = lofty::probe::Probe::open(path)
        .map_err(|e| e.to_string())?
        .options(relaxed)
        .read();
    match first {
        Ok(t) => Ok(t),
        Err(first_err) => lofty::probe::Probe::open(path)
            .map_err(|e| e.to_string())?
            .options(props_only)
            .read()
            .map_err(|_| first_err.to_string()),
    }
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
            play_count: None,
            rating: 0,
        };
        return Some((track, file_size, modified_at));
    }
    let tagged = read_tagged_tolerant(path).ok()?;
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
    let rating = if crate::tag_edit::is_mpeg(&tagged) { crate::tag_edit::read_rating_mpeg(path) } else { tag.map(crate::tag_edit::read_rating).unwrap_or(0) };
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
            play_count: None,
            rating,
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
        play_count: None,
        rating: 0,
    })
}

fn row_track(row: &rusqlite::Row<'_>) -> rusqlite::Result<DbTrack> {
    row_track_with_entries(row, None)
}

fn row_playlist_track(row: &rusqlite::Row<'_>) -> rusqlite::Result<DbTrack> {
    let mut track = row_track_with_entries(row, Some(row.get(13)?))?;
    // Column 14 is the optional t.play_count projection (round 73).
    // Round 76b: this used rusqlite's checked getter — REMOVED in 0.31 (the
    // pinned version), so the next Windows build died with a method-not-found.
    // Plain `get` is exactly as defensive here: per the 0.31 docs it returns
    // Err(InvalidColumnIndex) for an out-of-range index and Err(...) for a
    // type mismatch — it never panics (only get_unwrap does). So a caller
    // that forgets to select the column still degrades to "no play count".
    // Note the turbofish order is <I, T>: index type first, value second.
    track.play_count = row.get::<_, Option<i64>>(14).unwrap_or(None);
    Ok(track)
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
        r#"INSERT INTO tracks(id,path,title,artist,album_artist,album,genre,year,duration,codec,specs,replay_gain,artwork_path,file_size,modified_at,added_at,last_seen_scan,library_owned,rating)
        VALUES(?1,?2,?3,?4,?5,?6,?7,?8,?9,?10,?11,?12,?13,?14,?15,?16,?17,?18,?19)
        ON CONFLICT(path) DO UPDATE SET
          title=excluded.title,artist=excluded.artist,album_artist=excluded.album_artist,album=excluded.album,genre=excluded.genre,
          year=excluded.year,duration=excluded.duration,codec=excluded.codec,specs=excluded.specs,
          replay_gain=excluded.replay_gain,
          artwork_path=COALESCE(excluded.artwork_path,tracks.artwork_path),
          file_size=excluded.file_size,modified_at=excluded.modified_at,last_seen_scan=excluded.last_seen_scan,
          library_owned=MAX(tracks.library_owned,excluded.library_owned),
          rating=CASE WHEN tracks.rating_dirty=1 THEN tracks.rating ELSE excluded.rating END"#,
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
            if library_owned {1} else {0},
            track.rating as i64
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
                        // Entries a playlist lists that no longer exist (or lie outside the
                        // scanned folders) are NOT audio-file errors: they are neither counted
                        // nor listed under "Files that couldn't be read". They stay available
                        // in the `melo:playlist-imported` event below (`missing`).
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
            if removed_count > 0 { let _ = purge_orphan_listens(&conn); }
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
    let phase_start = std::time::Instant::now();
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
        // Search results on the ARTISTS tab: the same albums, but each row carries the
        // TRACK artist (what that tab filters by), so opening one stays in Artists mode.
        "artist-albums" => (
            "album",
            "artist || char(0) || album",
            "artist",
            "album COLLATE NOCASE, artist COLLATE NOCASE",
        ),
        "album-artists" => (
            "album_artist",
            "album_artist",
            "COUNT(DISTINCT album) || ' albums · ' || COUNT(*) || ' tracks'",
            "album_artist COLLATE NOCASE",
        ),
        "genres" => ("genre", "genre", "COUNT(*) || ' tracks'", "genre COLLATE NOCASE"),
        // Round 116: Years tab. Release year as text; unknown (0) years are
        // excluded below, newest year first (ORDER BY override further down).
        "years" => ("CAST(year AS TEXT)", "CAST(year AS TEXT)", "COUNT(*) || ' tracks'", "year"),
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
    if kind == "years" {
        where_sql.push_str(" AND year>0");
    }
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
            "SELECT {key},{name},{subtitle},COUNT(*) FROM {table}{where_sql} GROUP BY {group_by} ORDER BY {order_by} LIMIT ?{li} OFFSET ?{oi}",
            key = key_expr,
            name = group_col,
            subtitle = subtitle_expr,
            table = table,
            where_sql = where_sql,
            group_by = group_by,
            order_by = if kind == "years" { "year DESC" } else { group_by },
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
        "artist-albums" => "SELECT id,artwork_path FROM tracks WHERE library_owned=1 AND artist=?1 COLLATE NOCASE AND album=?2 COLLATE NOCASE AND artwork_path IS NOT NULL ORDER BY id LIMIT 1",
        "genres" => "SELECT id,artwork_path FROM tracks WHERE library_owned=1 AND genre=?1 COLLATE NOCASE AND artwork_path IS NOT NULL ORDER BY id LIMIT 1",
        "years" => "SELECT id,artwork_path FROM tracks WHERE library_owned=1 AND year=CAST(?1 AS INTEGER) AND artwork_path IS NOT NULL ORDER BY id LIMIT 1",
        _ => "SELECT id,artwork_path FROM tracks WHERE library_owned=1 AND artist=?1 COLLATE NOCASE AND artwork_path IS NOT NULL ORDER BY id LIMIT 1",
    };
    let groups_ms = phase_start.elapsed().as_millis();
    let cover_start = std::time::Instant::now();
    let mut cover_stmt = conn.prepare(cover_sql).map_err(|e| e.to_string())?;
    let mut items = Vec::with_capacity(page_rows.len());
    for (key, name, subtitle, count) in page_rows {
        // Album rows carry the artist as their subtitle.
        let looked_up: rusqlite::Result<(String, Option<String>)> = if kind == "albums" || kind == "artist-albums" {
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
    if let Some(db) = conn.path() {
        let cover_ms = cover_start.elapsed().as_millis();
        if groups_ms + cover_ms >= perf::SLOW_MS {
            perf::note(Path::new(db), &format!("  query_groups kind={kind}: grouping+count {groups_ms} ms, cover lookups {cover_ms} ms for {} rows", items.len()));
        }
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
        let t0 = std::time::Instant::now();
        let conn = open_db(&db_path)?;
        let opened = t0.elapsed().as_millis();
        let with_total = include_total.unwrap_or(true);
        let label = format!("library_groups kind={kind} search={} limit={limit} offset={offset} total={with_total}", search.as_deref().map(|s| !s.is_empty()).unwrap_or(false));
        let res = query_groups(&conn, &kind, search, artist, limit, offset, with_total);
        let rows = res.as_ref().map(|p| p.items.len()).unwrap_or(0);
        perf::note_if_slow(&db_path, t0, &format!("{label} -> {rows} rows (open {opened} ms)"));
        res
    })
    .await
    .map_err(|e| e.to_string())?
}

// Shared WHERE/ORDER builders for `library_tracks` and
// `replace_queue_from_library`: the queue must contain exactly what the
// browse view shows, in the same order. Every ORDER BY ends with a unique
// tie-breaker (`id`) so virtualized pages never duplicate or drop rows.
#[allow(dead_code)] // superseded by library_filter_field (round 118); kept for the static tests
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
            // Round 116: the Years tab reuses the genre scope slot with a
            // reserved token ("\u{1}year=2019") so no command signature changes.
            if column == "genre" {
                if let Some(y) = v.strip_prefix("\u{1}year=") {
                    clauses.push("year=?");
                    values.push(rusqlite::types::Value::Integer(y.parse::<i64>().unwrap_or(0)));
                    continue;
                }
            }
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
        Some("file-asc")=>"t.path COLLATE MELO_FILENAME,pt.entry_id",
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

// ───────── Library Home (round 116) ─────────
// One round trip for the Home tab: album / artist shelves, the play-count
// leaderboards and a few counters. Everything derives from columns that
// already exist (play_count, last_played_at, added_at) - no schema change.

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct HomeGroup {
    key: String,
    name: String,
    subtitle: String,
    count: i64,
    plays: i64,
    cover: Option<String>,
    artwork_track_id: Option<String>,
    /// Recently played / added shelves: the one track Play should queue (not the whole album).
    track: Option<DbTrack>,
    /// Listening-time rankings only: seconds listened in the selected period.
    seconds: f64,
}

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct HomeData {
    /// Recently played: one row per TRACK, newest counted listen first (same rule as play_count).
    recently_played_tracks: Vec<HomeTrack>,
    recently_added: Vec<HomeGroup>,
    top_artists: Vec<HomeGroup>,
    top_albums: Vec<HomeGroup>,
    total_seconds: f64,
    never_played: i64,
    forgotten: i64,
    last_track: Option<DbTrack>,
    top_tracks: Vec<HomeTrack>,
    repeat_tracks: Vec<HomeTrack>,
    decades: Vec<HomeDecade>,
    long_count: i64,
    on_this_day: Vec<OnThisDay>,
}

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct HomeTrack {
    track: DbTrack,
    /// Plays (Top tracks), recent listens (on repeat) or seconds (stats).
    plays: i64,
    seconds: f64,
}

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct HomeDecade {
    decade: i64,
    count: i64,
}

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct OnThisDay {
    year: i64,
    seconds: f64,
    track: Option<DbTrack>,
}

const TRACK_COLS_T: &str = "t.id,t.path,t.title,t.artist,t.album_artist,t.album,t.genre,t.year,t.duration,t.artwork_path,t.codec,t.specs,t.replay_gain";
/// Tracks longer than this count as "long listens" (mixes, DJ sets, live albums).
const HOME_LONG_SECS: f64 = 600.0;
const HOME_REPEAT_WINDOW_MS: i64 = 30 * 24 * 60 * 60 * 1000;



fn home_cover(conn: &Connection, by_artist_col: Option<&str>, album_artist: &str, album: &str) -> (Option<String>, Option<String>) {
    // Same row rule as query_groups: the smallest track id that has artwork.
    let found: rusqlite::Result<(String, Option<String>)> = match by_artist_col {
        None => conn.query_row(
            "SELECT id,artwork_path FROM tracks WHERE library_owned=1 AND album_artist=?1 COLLATE NOCASE AND album=?2 COLLATE NOCASE AND artwork_path IS NOT NULL ORDER BY id LIMIT 1",
            params![album_artist, album],
            |r| Ok((r.get(0)?, r.get(1)?)),
        ),
        Some("artist") => conn.query_row(
            "SELECT id,artwork_path FROM tracks WHERE library_owned=1 AND artist=?1 COLLATE NOCASE AND artwork_path IS NOT NULL ORDER BY id LIMIT 1",
            params![album],
            |r| Ok((r.get(0)?, r.get(1)?)),
        ),
        _ => conn.query_row(
            "SELECT id,artwork_path FROM tracks WHERE library_owned=1 AND album_artist=?1 COLLATE NOCASE AND artwork_path IS NOT NULL ORDER BY id LIMIT 1",
            params![album],
            |r| Ok((r.get(0)?, r.get(1)?)),
        ),
    };
    match found.optional().ok().flatten() {
        Some((id, path)) => (path, Some(id)),
        None => (None, None),
    }
}

/// Album shelf: grouped like the Albums tab (album artist + album). `time_col`
/// orders by the newest timestamp in the group; `by_plays` orders by the sum of
/// play counts instead (and drops albums nobody played).
fn home_group_track(conn: &Connection, album_artist: &str, album: &str, extra: &str, order: &str) -> Option<DbTrack> {
    let sql = format!(
        "SELECT {} FROM tracks t WHERE t.library_owned=1 AND t.album_artist=?1 COLLATE NOCASE AND t.album=?2 COLLATE NOCASE{} ORDER BY {},t.id LIMIT 1",
        TRACK_COLS_T, extra, order
    );
    conn.query_row(&sql, params![album_artist, album], row_track).optional().ok().flatten()
}

fn home_albums(conn: &Connection, filter: &str, order_expr: &str, having: &str, limit: i64, track_order: Option<&str>) -> Result<Vec<HomeGroup>, String> {
    let sql = format!(
        "SELECT album_artist,album,COUNT(*),COALESCE(SUM(play_count),0) FROM tracks \
         WHERE library_owned=1 AND album<>''{} GROUP BY album COLLATE NOCASE, album_artist COLLATE NOCASE{} ORDER BY {} LIMIT ?1",
        filter, having, order_expr
    );
    let mut stmt = conn.prepare(&sql).map_err(|e| e.to_string())?;
    let rows: Vec<(String, String, i64, i64)> = stmt
        .query_map(params![limit], |r| Ok((r.get(0)?, r.get(1)?, r.get(2)?, r.get(3)?)))
        .map_err(|e| e.to_string())?
        .filter_map(|r| r.ok())
        .collect();
    let mut out = Vec::with_capacity(rows.len());
    for (album_artist, album, count, plays) in rows {
        let (cover, artwork_track_id) = home_cover(conn, None, &album_artist, &album);
        let track = track_order.and_then(|o| home_group_track(conn, &album_artist, &album, if o.contains("last_played_at") { " AND t.last_played_at IS NOT NULL" } else { "" }, o));
        out.push(HomeGroup { key: format!("{}\0{}", album_artist, album), name: album, subtitle: album_artist, count, plays, cover, artwork_track_id, track, seconds: 0.0 });
    }
    Ok(out)
}

fn home_artists(conn: &Connection, column: &str, limit: i64) -> Result<Vec<HomeGroup>, String> {
    let sql = format!(
        "SELECT {c},COUNT(DISTINCT album),COUNT(*),SUM(play_count) AS s FROM tracks \
         WHERE library_owned=1 AND {c}<>'' GROUP BY {c} COLLATE NOCASE HAVING s>0 ORDER BY s DESC,{c} COLLATE NOCASE LIMIT ?1",
        c = column
    );
    let mut stmt = conn.prepare(&sql).map_err(|e| e.to_string())?;
    let rows: Vec<(String, i64, i64, i64)> = stmt
        .query_map(params![limit], |r| Ok((r.get(0)?, r.get(1)?, r.get(2)?, r.get(3)?)))
        .map_err(|e| e.to_string())?
        .filter_map(|r| r.ok())
        .collect();
    let mut out = Vec::with_capacity(rows.len());
    for (name, albums, tracks, plays) in rows {
        let (cover, artwork_track_id) = home_cover(conn, Some(if column == "artist" { "artist" } else { "album_artist" }), "", &name);
        out.push(HomeGroup {
            key: name.clone(),
            name,
            subtitle: format!("{} albums · {} tracks", albums, tracks),
            count: tracks,
            plays,
            cover,
            artwork_track_id,
            track: None,
            seconds: 0.0,
        });
    }
    Ok(out)
}

/// "Recently played": one row per track, ordered by its newest COUNTED listen
/// (listen_log.counted = the min(30 s, half the track) rule), so skipped tracks
/// never appear. `plays` carries that track's counted listens.
fn home_recent_tracks(conn: &Connection, limit: i64) -> Result<Vec<HomeTrack>, String> {
    let sql = format!(
        "SELECT {},COUNT(*) FROM listen_log l JOIN tracks t ON t.id=l.track_id \
         WHERE l.counted=1 AND t.library_owned=1 GROUP BY t.id ORDER BY MAX(l.started_at) DESC,t.id LIMIT {}",
        TRACK_COLS_T,
        limit.clamp(1, 30)
    );
    let mut stmt = conn.prepare(&sql).map_err(|e| e.to_string())?;
    let rows = stmt
        .query_map([], |r| Ok(HomeTrack { track: row_track(r)?, plays: r.get(13)?, seconds: 0.0 }))
        .map_err(|e| e.to_string())?;
    Ok(rows.filter_map(log_skipped).collect())
}

/// The most recently STARTED track (no 30 s rule): the "Continue listening" card.
fn home_last_track(conn: &Connection) -> Result<Option<DbTrack>, String> {
    conn.query_row(
        &format!("{} WHERE library_owned=1 AND last_played_at IS NOT NULL ORDER BY last_played_at DESC,id LIMIT 1", TRACK_SELECT),
        [],
        row_track,
    )
    .optional()
    .map_err(|e| e.to_string())
}

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct HomeLive {
    last_track: Option<DbTrack>,
    recently_played_tracks: Vec<HomeTrack>,
}

/// Light refresh for the open Home tab: only the two live sections.
#[tauri::command]
pub async fn library_home_live(limit: Option<i64>, state: State<'_, LibraryState>) -> Result<HomeLive, String> {
    let db_path = state.db_path.clone();
    tauri::async_runtime::spawn_blocking(move || -> Result<HomeLive, String> {
        let conn = open_db(&db_path)?;
        Ok(HomeLive { last_track: home_last_track(&conn)?, recently_played_tracks: home_recent_tracks(&conn, limit.unwrap_or(14))? })
    })
    .await
    .map_err(|e| e.to_string())?
}

fn query_home(conn: &Connection, artist_kind: &str, limit: i64, rank_limit: i64, top_tracks_limit: i64, repeat_limit: i64, forgotten_plays: i64, forgotten_days: i64) -> Result<HomeData, String> {
    let forgotten_plays = forgotten_plays.clamp(1, 1000);
    let forgotten_days = forgotten_days.clamp(1, 3650);
    let limit = limit.clamp(1, 30);
    let rank_limit = rank_limit.clamp(1, 30);
    let top_tracks_limit = top_tracks_limit.clamp(1, 30);
    let repeat_limit = repeat_limit.clamp(1, 30);
    let artist_col = if artist_kind == "artists" { "artist" } else { "album_artist" };
    let recently_played_tracks = home_recent_tracks(conn, limit)?;
    let recently_added = home_albums(conn, "", "MAX(added_at) DESC, album COLLATE NOCASE", "", limit, Some("t.added_at DESC"))?;
    let top_albums = home_albums(conn, "", "SUM(play_count) DESC, album COLLATE NOCASE", " HAVING SUM(play_count)>0", rank_limit, None)?;
    let top_artists = home_artists(conn, artist_col, rank_limit)?;
    let total_seconds: f64 = conn
        .query_row("SELECT COALESCE(SUM(duration),0) FROM tracks WHERE library_owned=1", [], |r| r.get(0))
        .unwrap_or(0.0);
    let never_played: i64 = conn
        .query_row("SELECT COUNT(*) FROM tracks WHERE library_owned=1 AND play_count=0 AND last_played_at IS NULL", [], |r| r.get(0))
        .unwrap_or(0);
    let cutoff = now_ms() - forgotten_days * 24 * 60 * 60 * 1000;
    let forgotten: i64 = conn
        .query_row(
            "SELECT COUNT(*) FROM tracks WHERE library_owned=1 AND play_count>=?2 AND COALESCE(last_played_at,0)<?1",
            params![cutoff, forgotten_plays],
            |r| r.get(0),
        )
        .unwrap_or(0);
    let last_track: Option<DbTrack> = home_last_track(conn)?;
    let top_tracks: Vec<HomeTrack> = {
        let sql = format!("SELECT {},t.play_count FROM tracks t WHERE t.library_owned=1 AND t.play_count>0 ORDER BY t.play_count DESC,t.title COLLATE NOCASE LIMIT {}", TRACK_COLS_T, top_tracks_limit);
        let mut stmt = conn.prepare(&sql).map_err(|e| e.to_string())?;
        let rows = stmt
            .query_map([], |r| Ok(HomeTrack { track: row_track(r)?, plays: r.get(13)?, seconds: 0.0 }))
            .map_err(|e| e.to_string())?;
        rows.filter_map(log_skipped).collect()
    };
    // "Recently on repeat": tracks listened to at least 2 times (a counted play each) in the last 30 days.
    let repeat_tracks: Vec<HomeTrack> = {
        let sql = format!(
            "SELECT {},COUNT(*) AS c,SUM(l.seconds) FROM listen_log l JOIN tracks t ON t.id=l.track_id \
             WHERE l.started_at>=?1 AND l.counted=1 AND t.library_owned=1 GROUP BY t.id HAVING c>=2 \
             ORDER BY c DESC,MAX(l.started_at) DESC LIMIT {}",
            TRACK_COLS_T, repeat_limit
        );
        let mut stmt = conn.prepare(&sql).map_err(|e| e.to_string())?;
        let rows = stmt
            .query_map(params![now_ms() - HOME_REPEAT_WINDOW_MS], |r| {
                Ok(HomeTrack { track: row_track(r)?, plays: r.get(13)?, seconds: r.get(14)? })
            })
            .map_err(|e| e.to_string())?;
        rows.filter_map(log_skipped).collect()
    };
    let decades: Vec<HomeDecade> = {
        let mut stmt = conn
            .prepare("SELECT (year/10)*10 AS d,COUNT(*) FROM tracks WHERE library_owned=1 AND year>=1900 AND year<=2069 GROUP BY d ORDER BY d DESC")
            .map_err(|e| e.to_string())?;
        let rows = stmt
            .query_map([], |r| Ok(HomeDecade { decade: r.get(0)?, count: r.get(1)? }))
            .map_err(|e| e.to_string())?;
        rows.filter_map(log_skipped).collect()
    };
    let long_count: i64 = conn
        .query_row("SELECT COUNT(*) FROM tracks WHERE library_owned=1 AND duration>=?1", params![HOME_LONG_SECS], |r| r.get(0))
        .unwrap_or(0);
    // "On this day": the same month/day in earlier years (local time).
    let on_this_day: Vec<OnThisDay> = {
        let day_match = "strftime('%m-%d',l.started_at/1000,'unixepoch','localtime')=strftime('%m-%d','now','localtime')";
        let mut years: Vec<(i64, f64)> = Vec::new();
        {
            let sql = format!(
                "SELECT CAST(strftime('%Y',l.started_at/1000,'unixepoch','localtime') AS INTEGER) AS y,SUM(l.seconds) FROM listen_log l \
                 WHERE {} AND CAST(strftime('%Y',l.started_at/1000,'unixepoch','localtime') AS INTEGER)<CAST(strftime('%Y','now','localtime') AS INTEGER) \
                 GROUP BY y ORDER BY y DESC LIMIT 3",
                day_match
            );
            let mut stmt = conn.prepare(&sql).map_err(|e| e.to_string())?;
            let rows = stmt.query_map([], |r| Ok((r.get::<_, i64>(0)?, r.get::<_, f64>(1)?))).map_err(|e| e.to_string())?;
            years.extend(rows.filter_map(log_skipped));
        }
        let mut out = Vec::new();
        for (year, seconds) in years {
            let sql = format!(
                "SELECT {} FROM listen_log l JOIN tracks t ON t.id=l.track_id WHERE {} AND CAST(strftime('%Y',l.started_at/1000,'unixepoch','localtime') AS INTEGER)=?1 \
                 AND t.library_owned=1 GROUP BY t.id ORDER BY SUM(l.seconds) DESC LIMIT 1",
                TRACK_COLS_T, day_match
            );
            let track = conn.query_row(&sql, params![year], row_track).optional().map_err(|e| e.to_string())?;
            out.push(OnThisDay { year, seconds, track });
        }
        out
    };
    Ok(HomeData { recently_played_tracks, recently_added, top_artists, top_albums, total_seconds, never_played, forgotten, last_track, top_tracks, repeat_tracks, decades, long_count, on_this_day })
}

/// Runs on the blocking pool with its own read connection (like `library_groups`).
#[tauri::command]
pub async fn library_home(
    artist_kind: Option<String>,
    limit: Option<i64>,
    rank_limit: Option<i64>,
    top_tracks_limit: Option<i64>,
    repeat_limit: Option<i64>,
    forgotten_min_plays: Option<i64>,
    forgotten_days: Option<i64>,
    state: State<'_, LibraryState>,
) -> Result<HomeData, String> {
    let db_path = state.db_path.clone();
    tauri::async_runtime::spawn_blocking(move || -> Result<HomeData, String> {
        let conn = open_db(&db_path)?;
        query_home(&conn, artist_kind.as_deref().unwrap_or("album-artists"), limit.unwrap_or(14), rank_limit.unwrap_or(5), top_tracks_limit.unwrap_or(5), repeat_limit.unwrap_or(5), forgotten_min_plays.unwrap_or(10), forgotten_days.unwrap_or(30))
    })
    .await
    .map_err(|e| e.to_string())?
}

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct ArtistBest {
    tracks: Vec<HomeTrack>,
    albums: Vec<HomeGroup>,
}

/// "Best of an artist" (Home): that artist's top tracks and albums, ranked by
/// listening time (`by` = "time", from listen_log) or by plays (`by` = "plays",
/// play_count). `artist_kind` follows the Library's Artist / Album Artist mode.
/// Tracks carry both numbers (`plays`, `seconds`) so the UI can show either.
#[tauri::command]
pub async fn library_artist_best(
    artist: String,
    artist_kind: Option<String>,
    by: Option<String>,
    limit: Option<i64>,
    state: State<'_, LibraryState>,
) -> Result<ArtistBest, String> {
    let db_path = state.db_path.clone();
    tauri::async_runtime::spawn_blocking(move || -> Result<ArtistBest, String> {
        let conn = open_db(&db_path)?;
        let col = if artist_kind.as_deref() == Some("artists") { "artist" } else { "album_artist" };
        let by_plays = by.as_deref() == Some("plays");
        let limit = limit.unwrap_or(5).clamp(1, 30);
        let order = if by_plays { "t.play_count DESC,s DESC,t.title COLLATE NOCASE" } else { "s DESC,t.play_count DESC,t.title COLLATE NOCASE" };
        let having = if by_plays { "t.play_count>0" } else { "s>0" };
        let sql = format!(
            "SELECT {},t.play_count,COALESCE(SUM(l.seconds),0) AS s FROM tracks t LEFT JOIN listen_log l ON l.track_id=t.id \
             WHERE t.library_owned=1 AND t.{c}=?1 COLLATE NOCASE GROUP BY t.id HAVING {} ORDER BY {} LIMIT {}",
            TRACK_COLS_T, having, order, limit, c = col
        );
        let tracks: Vec<HomeTrack> = {
            let mut stmt = conn.prepare(&sql).map_err(|e| e.to_string())?;
            let rows = stmt
                .query_map(params![artist], |r| Ok(HomeTrack { track: row_track(r)?, plays: r.get(13)?, seconds: r.get(14)? }))
                .map_err(|e| e.to_string())?;
            rows.filter_map(log_skipped).collect()
        };
        let album_sql = format!(
            "SELECT album_artist,album,COUNT(*),COALESCE(SUM(play_count),0) FROM tracks \
             WHERE library_owned=1 AND album<>'' AND {c}=?1 COLLATE NOCASE GROUP BY album COLLATE NOCASE,album_artist COLLATE NOCASE",
            c = col
        );
        let rows: Vec<(String, String, i64, i64)> = {
            let mut stmt = conn.prepare(&album_sql).map_err(|e| e.to_string())?;
            let it = stmt
                .query_map(params![artist], |r| Ok((r.get(0)?, r.get(1)?, r.get(2)?, r.get(3)?)))
                .map_err(|e| e.to_string())?;
            it.filter_map(|r| r.ok()).collect()
        };
        let mut albums: Vec<HomeGroup> = Vec::new();
        for (album_artist, album, count, plays) in rows {
            let seconds: f64 = conn
                .query_row(
                    "SELECT COALESCE(SUM(l.seconds),0) FROM listen_log l JOIN tracks t ON t.id=l.track_id \
                     WHERE t.library_owned=1 AND t.album=?1 COLLATE NOCASE AND t.album_artist=?2 COLLATE NOCASE",
                    params![album, album_artist],
                    |r| r.get(0),
                )
                .unwrap_or(0.0);
            if (by_plays && plays <= 0) || (!by_plays && seconds <= 0.0) {
                continue;
            }
            let (cover, artwork_track_id) = home_cover(&conn, None, &album_artist, &album);
            albums.push(HomeGroup { key: format!("{}\0{}", album_artist, album), name: album, subtitle: album_artist, count, plays, cover, artwork_track_id, track: None, seconds });
        }
        if by_plays {
            albums.sort_by(|a, b| b.plays.cmp(&a.plays).then(b.seconds.partial_cmp(&a.seconds).unwrap_or(std::cmp::Ordering::Equal)).then(a.name.to_lowercase().cmp(&b.name.to_lowercase())));
        } else {
            albums.sort_by(|a, b| b.seconds.partial_cmp(&a.seconds).unwrap_or(std::cmp::Ordering::Equal).then(b.plays.cmp(&a.plays)).then(a.name.to_lowercase().cmp(&b.name.to_lowercase())));
        }
        albums.truncate(limit as usize);
        Ok(ArtistBest { tracks, albums })
    })
    .await
    .map_err(|e| e.to_string())?
}

/// Tracks for a Home mix, in the order they should play (capped, so one IPC
/// call stays small). `kind`: "forgotten" (played before, least recently
/// first, played at least `min_plays` times, not within `days`), "never" (never played), "shuffle" (whole library,
/// random order). The caller replaces the queue with them and starts the first.
#[tauri::command]
pub async fn library_mix_tracks(
    kind: String,
    limit: Option<i64>,
    min_plays: Option<i64>,
    days: Option<i64>,
    state: State<'_, LibraryState>,
) -> Result<Vec<DbTrack>, String> {
    let db_path = state.db_path.clone();
    tauri::async_runtime::spawn_blocking(move || -> Result<Vec<DbTrack>, String> {
        let conn = open_db(&db_path)?;
        let limit = limit.unwrap_or(500).clamp(1, 5000);
        let cutoff = now_ms() - days.unwrap_or(30).clamp(1, 3650) * 24 * 60 * 60 * 1000;
        let min_plays = min_plays.unwrap_or(10).clamp(1, 1000);
        let (where_extra, order): (String, &str) = match kind.as_str() {
            "forgotten" => (format!(" AND play_count>={} AND COALESCE(last_played_at,0)<?1", min_plays), "play_count DESC,COALESCE(last_played_at,0) ASC,id"),
            "never" => (" AND play_count=0 AND last_played_at IS NULL".to_string(), "artist COLLATE NOCASE,album COLLATE NOCASE,title COLLATE NOCASE,id"),
            "shuffle" => (String::new(), "RANDOM()"),
            "long" => (format!(" AND duration>={}", HOME_LONG_SECS), "RANDOM()"),
            other => match other.strip_prefix("decade:").and_then(|d| d.parse::<i64>().ok()) {
                Some(d) if (1900..=2060).contains(&d) && d % 10 == 0 => (format!(" AND year>={} AND year<{}", d, d + 10), "RANDOM()"),
                _ => return Err(format!("unknown mix: {}", other)),
            },
        };
        let sql = format!("{} WHERE library_owned=1{} ORDER BY {} LIMIT {}", TRACK_SELECT, where_extra, order, limit);
        let mut stmt = conn.prepare(&sql).map_err(|e| e.to_string())?;
        let items: Vec<DbTrack> = if kind == "forgotten" {
            stmt.query_map(params![cutoff], row_track).map_err(|e| e.to_string())?.filter_map(log_skipped).collect()
        } else {
            stmt.query_map([], row_track).map_err(|e| e.to_string())?.filter_map(log_skipped).collect()
        };
        Ok(items)
    })
    .await
    .map_err(|e| e.to_string())?
}

/// The player reports one listening segment (wall-clock seconds spent
/// unpaused on a track) at track boundaries. Tiny insert, never blocks playback.
#[tauri::command]
pub async fn record_listen(track_id: String, started_at: i64, seconds: f64, counted: Option<bool>, state: State<'_, LibraryState>) -> Result<(), String> {
    if track_id.is_empty() || !(1.0..=6.0 * 3600.0).contains(&seconds) {
        return Ok(());
    }
    let conn = locked_db(&state)?;
    conn.execute(
        "INSERT INTO listen_log(track_id,started_at,seconds,counted) VALUES(?1,?2,?3,?4)",
        params![track_id, started_at, seconds, counted.unwrap_or(false) as i64],
    )
    .map_err(|e| e.to_string())?;
    Ok(())
}

#[tauri::command]
pub async fn clear_listen_log(state: State<'_, LibraryState>) -> Result<(), String> {
    let conn = locked_db(&state)?;
    conn.execute("DELETE FROM listen_log", []).map_err(|e| e.to_string())?;
    Ok(())
}

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct MonthSeconds {
    month: String,
    seconds: f64,
}

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct ListenStats {
    seconds: f64,
    sessions: i64,
    /// Counted plays (same rule as play_count): what "plays" means for the Plays ranking.
    plays: i64,
    /// First day of the range (differs from the request only for "All").
    range_start: i64,
    months: Vec<MonthSeconds>,
    /// "All" only: the day with the most listening (local date) and the longest run of consecutive listening days.
    longest_day: String,
    longest_day_seconds: f64,
    streak: i64,
    active_days: i64,
    prev_seconds: f64,
    buckets: Vec<f64>,
    top_artists: Vec<HomeGroup>,
    top_albums: Vec<HomeGroup>,
    top_tracks: Vec<HomeTrack>,
    has_any: bool,
}

/// Listening statistics for [start, end) (epoch ms, computed by the UI in the
/// user's local time) against the previous period [prev_start, prev_end).
/// `bucket_ms` splits the range for the bar chart (an hour or a day).
#[tauri::command]
pub async fn library_listen_stats(
    start: i64,
    end: i64,
    prev_start: i64,
    prev_end: i64,
    bucket_ms: i64,
    artist_kind: Option<String>,
    top_n: Option<i64>,
    artist_by: Option<String>,
    album_by: Option<String>,
    track_by: Option<String>,
    state: State<'_, LibraryState>,
) -> Result<ListenStats, String> {
    let db_path = state.db_path.clone();
    tauri::async_runtime::spawn_blocking(move || -> Result<ListenStats, String> {
        let conn = open_db(&db_path)?;
        let artist_col = if artist_kind.as_deref() == Some("artists") { "artist" } else { "album_artist" };
        // "All": the UI sends start <= 0, so the range starts at the first recorded listen.
        let start = if start <= 0 {
            conn.query_row("SELECT MIN(started_at) FROM listen_log WHERE started_at<?1", params![end], |r| r.get::<_, Option<i64>>(0))
                .ok()
                .flatten()
                .unwrap_or(end - 1)
        } else {
            start
        };
        let (seconds, sessions, active_days, plays): (f64, i64, i64, i64) = conn
            .query_row(
                "SELECT COALESCE(SUM(seconds),0),COUNT(*),COUNT(DISTINCT date(started_at/1000,'unixepoch','localtime')),COALESCE(SUM(counted),0) FROM listen_log WHERE started_at>=?1 AND started_at<?2",
                params![start, end],
                |r| Ok((r.get(0)?, r.get(1)?, r.get(2)?, r.get(3)?)),
            )
            .map_err(|e| e.to_string())?;
        let prev_seconds: f64 = conn
            .query_row(
                "SELECT COALESCE(SUM(seconds),0) FROM listen_log WHERE started_at>=?1 AND started_at<?2",
                params![prev_start, prev_end],
                |r| r.get(0),
            )
            .unwrap_or(0.0);
        let has_any: bool = conn.query_row("SELECT EXISTS(SELECT 1 FROM listen_log)", [], |r| r.get(0)).unwrap_or(false);
        let monthly = bucket_ms <= 0;
        let bucket_ms = bucket_ms.max(60_000);
        let n_buckets = if monthly { 0 } else { (((end - start) + bucket_ms - 1) / bucket_ms).clamp(1, 400) as usize };
        let mut buckets = vec![0.0f64; n_buckets];
        let mut months: Vec<MonthSeconds> = Vec::new();
        let (mut longest_day, mut longest_day_seconds, mut streak) = (String::new(), 0.0f64, 0i64);
        if monthly {
            let mut stmt = conn
                .prepare("SELECT date(started_at/1000,'unixepoch','localtime') AS d,CAST(julianday(date(started_at/1000,'unixepoch','localtime')) AS INTEGER) AS n,SUM(seconds) FROM listen_log WHERE started_at>=?1 AND started_at<?2 GROUP BY d ORDER BY d")
                .map_err(|e| e.to_string())?;
            let days = stmt
                .query_map(params![start, end], |r| Ok((r.get::<_, String>(0)?, r.get::<_, i64>(1)?, r.get::<_, f64>(2)?)))
                .map_err(|e| e.to_string())?;
            let (mut run, mut prev_n) = (0i64, i64::MIN);
            for (d, n, secs) in days.filter_map(log_skipped) {
                if secs > longest_day_seconds {
                    longest_day_seconds = secs;
                    longest_day = d;
                }
                run = if n == prev_n + 1 { run + 1 } else { 1 };
                prev_n = n;
                streak = streak.max(run);
            }
            drop(stmt);
            let mut stmt = conn
                .prepare("SELECT strftime('%Y-%m',started_at/1000,'unixepoch','localtime') AS m,SUM(seconds) FROM listen_log WHERE started_at>=?1 AND started_at<?2 GROUP BY m ORDER BY m")
                .map_err(|e| e.to_string())?;
            let rows = stmt
                .query_map(params![start, end], |r| Ok(MonthSeconds { month: r.get(0)?, seconds: r.get(1)? }))
                .map_err(|e| e.to_string())?;
            months.extend(rows.filter_map(log_skipped));
        } else {
            let mut stmt = conn
                .prepare("SELECT (started_at-?1)/?3 AS b,SUM(seconds) FROM listen_log WHERE started_at>=?1 AND started_at<?2 GROUP BY b")
                .map_err(|e| e.to_string())?;
            let rows = stmt
                .query_map(params![start, end, bucket_ms], |r| Ok((r.get::<_, i64>(0)?, r.get::<_, f64>(1)?)))
                .map_err(|e| e.to_string())?;
            for (b, v) in rows.filter_map(log_skipped) {
                if b >= 0 && (b as usize) < n_buckets {
                    buckets[b as usize] += v;
                }
            }
        }
        let top_n = top_n.unwrap_or(3).clamp(1, 10);
        // Each ranking is by listening time OR by plays (counted plays), chosen per list.
        let by_plays = |v: &Option<String>| v.as_deref() == Some("plays");
        let (artist_plays, album_plays, track_plays) = (by_plays(&artist_by), by_plays(&album_by), by_plays(&track_by));
        let rank = |plays: bool| if plays { ("HAVING p>0", "p DESC,s DESC") } else { ("", "s DESC") };
        let mut top_artists: Vec<HomeGroup> = Vec::new();
        {
            let mut stmt = conn
                .prepare(&format!(
                    "SELECT t.{c},SUM(l.seconds) AS s,SUM(l.counted) AS p FROM listen_log l JOIN tracks t ON t.id=l.track_id \
                     WHERE l.started_at>=?1 AND l.started_at<?2 AND t.library_owned=1 AND t.{c}<>'' GROUP BY t.{c} COLLATE NOCASE {h} ORDER BY {o} LIMIT ?3",
                    c = artist_col, h = rank(artist_plays).0, o = rank(artist_plays).1
                ))
                .map_err(|e| e.to_string())?;
            let rows: Vec<(String, f64, i64)> = stmt
                .query_map(params![start, end, top_n], |r| Ok((r.get(0)?, r.get(1)?, r.get(2)?)))
                .map_err(|e| e.to_string())?
                .filter_map(|r| r.ok())
                .collect();
            for (name, secs, p) in rows {
                let (cover, artwork_track_id) = home_cover(&conn, Some(artist_col), "", &name);
                top_artists.push(HomeGroup { key: name.clone(), name, subtitle: String::new(), count: 0, plays: p, cover, artwork_track_id, track: None, seconds: secs });
            }
        }
        let mut top_albums: Vec<HomeGroup> = Vec::new();
        {
            let mut stmt = conn
                .prepare(&format!(
                    "SELECT t.album,t.album_artist,SUM(l.seconds) AS s,SUM(l.counted) AS p FROM listen_log l JOIN tracks t ON t.id=l.track_id \
                     WHERE l.started_at>=?1 AND l.started_at<?2 AND t.library_owned=1 AND t.album<>'' \
                     GROUP BY t.album COLLATE NOCASE,t.album_artist COLLATE NOCASE {} ORDER BY {} LIMIT ?3",
                    rank(album_plays).0, rank(album_plays).1
                ))
                .map_err(|e| e.to_string())?;
            let rows: Vec<(String, String, f64, i64)> = stmt
                .query_map(params![start, end, top_n], |r| Ok((r.get(0)?, r.get(1)?, r.get(2)?, r.get(3)?)))
                .map_err(|e| e.to_string())?
                .filter_map(|r| r.ok())
                .collect();
            for (album, album_artist, secs, p) in rows {
                let (cover, artwork_track_id) = home_cover(&conn, None, &album_artist, &album);
                top_albums.push(HomeGroup { key: format!("{}\0{}", album_artist, album), name: album, subtitle: album_artist, count: 0, plays: p, cover, artwork_track_id, track: None, seconds: secs });
            }
        }
        let mut top_tracks: Vec<HomeTrack> = Vec::new();
        {
            let mut stmt = conn
                .prepare(&format!(
                    "SELECT {},SUM(l.counted) AS p,SUM(l.seconds) AS s FROM listen_log l JOIN tracks t ON t.id=l.track_id \
                     WHERE l.started_at>=?1 AND l.started_at<?2 AND t.library_owned=1 GROUP BY t.id {} ORDER BY {} LIMIT ?3",
                    TRACK_COLS_T, rank(track_plays).0, rank(track_plays).1
                ))
                .map_err(|e| e.to_string())?;
            let rows = stmt
                .query_map(params![start, end, top_n], |r| Ok(HomeTrack { track: row_track(r)?, plays: r.get(13)?, seconds: r.get(14)? }))
                .map_err(|e| e.to_string())?;
            top_tracks.extend(rows.filter_map(log_skipped));
        }
        Ok(ListenStats { seconds, sessions, plays, range_start: start, months, longest_day, longest_day_seconds, streak, active_days, prev_seconds, buckets, top_artists, top_albums, top_tracks, has_any })
    })
    .await
    .map_err(|e| e.to_string())?
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
        // Round 129: this runs on every list_playlists / play. It used to
        // delete and re-insert all three lists each time (a dozen separate
        // commits = a dozen disk syncs, 30-100 ms on Windows). Now it only
        // READS unless something really changed.
        let row_ok: i64 = conn
            .query_row("SELECT COUNT(*) FROM playlists WHERE id=?1 AND name=?2 AND kind='auto' AND source_path IS NULL", params![id, name], |r| r.get(0))
            .map_err(|e| e.to_string())?;
        if row_ok != 1 {
            conn.execute(
                "INSERT OR IGNORE INTO playlists(id,name,created_at,kind) VALUES(?1,?2,?3,'auto')",
                params![id, name, now_ms()],
            ).map_err(|e| e.to_string())?;
            // Keep names stable after upgrading an existing clean-reset database.
            conn.execute("UPDATE playlists SET name=?2,kind='auto',source_path=NULL WHERE id=?1", params![id, name])
                .map_err(|e| e.to_string())?;
        }
        let filter = if id == AUTO_MOST_PLAYED_ID {
            " AND play_count >= 1"
        } else if id == AUTO_RECENTLY_PLAYED_ID {
            " AND last_played_at IS NOT NULL"
        } else {
            ""
        };
        let wanted: Vec<String> = {
            let mut stmt = conn
                .prepare(&format!("SELECT id FROM tracks WHERE library_owned=1{} {} LIMIT 100", filter, order))
                .map_err(|e| e.to_string())?;
            let rows = stmt.query_map([], |r| r.get::<_, String>(0)).map_err(|e| e.to_string())?;
            rows.filter_map(log_skipped).collect()
        };
        sync_playlist_entries(conn, id, &wanted)?;
    }
    Ok(())
}

/// Makes the stored entries of `playlist_id` equal `wanted` (in that order).
/// Writes NOTHING when they already match (stable entry ids, no disk sync);
/// otherwise one transaction.
fn sync_playlist_entries(conn: &Connection, playlist_id: &str, wanted: &[String]) -> Result<(), String> {
    let current: Vec<String> = {
        let mut stmt = conn.prepare("SELECT track_id FROM playlist_tracks WHERE playlist_id=?1 ORDER BY position,entry_id").map_err(|e| e.to_string())?;
        let rows = stmt.query_map(params![playlist_id], |r| r.get::<_, String>(0)).map_err(|e| e.to_string())?;
        rows.filter_map(log_skipped).collect()
    };
    if wanted == current.as_slice() { return Ok(()); }
    conn.execute_batch("BEGIN").map_err(|e| e.to_string())?;
    let result = (|| -> Result<(), String> {
        conn.execute("DELETE FROM playlist_tracks WHERE playlist_id=?1", params![playlist_id]).map_err(|e| e.to_string())?;
        let mut ins = conn.prepare("INSERT INTO playlist_tracks(playlist_id,track_id,position) VALUES(?1,?2,?3)").map_err(|e| e.to_string())?;
        for (i, id) in wanted.iter().enumerate() {
            ins.execute(params![playlist_id, id, i as i64]).map_err(|e| e.to_string())?;
        }
        Ok(())
    })();
    match result {
        Ok(()) => conn.execute_batch("COMMIT").map_err(|e| e.to_string()),
        Err(e) => { let _ = conn.execute_batch("ROLLBACK"); Err(e) }
    }
}

/// Round 76: this counts a LISTEN, nothing else. The player fires it only
/// after a track has actually played min(30s, half its length) — skipping a
/// track no longer inflates play_count. `last_played_at` is stamped
/// separately at track start (touch_track_last_played) so Recently Played
/// still tracks what the user queued up, not what they finished.
#[tauri::command]
pub async fn record_track_play(track_id: String, state: State<'_, LibraryState>) -> Result<(), String> {
    let conn = locked_db(&state)?;
    conn.execute(
        "UPDATE tracks SET play_count=play_count+1 WHERE id=?1",
        params![track_id],
    ).map_err(|e| e.to_string())?;
    ensure_auto_playlists(&conn)
}

/// Round 77: materialise a shuffle order into the physical play queue, so
/// every "Queue" view shows what will actually play next (the player used to
/// keep a private in-memory deck — the user asked the queue itself to be
/// re-ordered). `order` lists track ids in the desired play order; duplicate
/// tracks consume their queue rows greedily in current order, and rows not
/// mentioned keep their relative place at the tail. `position` carries a
/// UNIQUE index, so the new positions are staged through negatives first
/// (the same two-phase dance replace_queue uses).
#[tauri::command]
pub async fn shuffle_queue_rows(order: Vec<String>, state: State<'_, LibraryState>) -> Result<(), String> {
    // .transaction() takes &mut self — conn must be mut (E0596, caught by the
    // Windows CI build; sibling tx commands like replace_queue declare it so).
    let mut conn = locked_db(&state)?;
    let rows: Vec<(i64, String)> = {
        let mut stmt = conn
            .prepare("SELECT entry_id, track_id FROM queue ORDER BY position, entry_id")
            .map_err(|e| e.to_string())?;
        let mapped = stmt
            .query_map([], |r| Ok((r.get(0)?, r.get(1)?)))
            .map_err(|e| e.to_string())?;
        let mut out: Vec<(i64, String)> = Vec::new();
        for item in mapped {
            out.push(item.map_err(|e| e.to_string())?);
        }
        out
    };
    if rows.len() < 2 {
        return Ok(());
    }
    let mut used = vec![false; rows.len()];
    let mut picked: Vec<i64> = Vec::with_capacity(rows.len());
    for want in &order {
        for (i, (entry, tid)) in rows.iter().enumerate() {
            if !used[i] && tid == want {
                used[i] = true;
                picked.push(*entry);
                break;
            }
        }
    }
    for (i, (entry, _)) in rows.iter().enumerate() {
        if !used[i] {
            picked.push(*entry);
        }
    }
    let tx = conn.transaction().map_err(|e| e.to_string())?;
    for (i, entry) in picked.iter().enumerate() {
        tx.execute("UPDATE queue SET position=?2 WHERE entry_id=?1", params![entry, -(i as i64) - 1])
            .map_err(|e| e.to_string())?;
    }
    for (i, entry) in picked.iter().enumerate() {
        tx.execute("UPDATE queue SET position=?2 WHERE entry_id=?1", params![entry, i as i64])
            .map_err(|e| e.to_string())?;
    }
    tx.commit().map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn touch_track_last_played(track_id: String, state: State<'_, LibraryState>) -> Result<(), String> {
    let conn = locked_db(&state)?;
    conn.execute(
        "UPDATE tracks SET last_played_at=?2 WHERE id=?1",
        params![track_id, now_ms()],
    ).map_err(|e| e.to_string())?;
    ensure_auto_playlists(&conn)
}

#[tauri::command]
pub async fn list_playlists(state: State<'_, LibraryState>) -> Result<Vec<PlaylistRow>, String> {
    let conn = locked_db(&state)?;
    let t0 = std::time::Instant::now();
    ensure_auto_playlists(&conn)?;
    let t1 = std::time::Instant::now();
    refresh_all_smart(&conn)?;
    perf::note_if_slow(&state.db_path, t0, &format!("list_playlists (auto lists {} ms, smart lists {} ms)", t1.duration_since(t0).as_millis(), t1.elapsed().as_millis()));
    let mut stmt = conn.prepare("SELECT p.id,p.name,p.created_at,COUNT(pt.track_id),p.kind FROM playlists p LEFT JOIN playlist_tracks pt ON pt.playlist_id=p.id GROUP BY p.id ORDER BY CASE p.id WHEN '__auto_most_played__' THEN 0 WHEN '__auto_recently_played__' THEN 1 WHEN '__auto_recently_added__' THEN 2 ELSE CASE p.kind WHEN 'smart' THEN 3 ELSE 4 END END,p.created_at").map_err(|e| e.to_string())?;
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
    if kind == "smart" {
        return Err("The tracks of a smart playlist follow its rules — edit the rules, or duplicate it to get a normal playlist".into());
    }
    Ok(())
}

/// Rename / duplicate: a smart playlist may be renamed and copied (the copy is
/// a normal playlist), automatic ones may not.
fn ensure_not_auto(conn: &Connection, playlist_id: &str) -> Result<(), String> {
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
    ensure_not_auto(&conn, &playlist_id)?;
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
    ensure_not_auto(&conn, &playlist_id)?;
    refresh_if_smart(&conn, &playlist_id)?;
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
    // A smart playlist is re-evaluated whenever its first page is requested
    // (unchanged results keep their entry ids, so scrolling stays stable).
    if offset == 0 { refresh_if_smart(&conn, &playlist_id)?; }
    let limit = limit.clamp(1, 5000);
    let q = search_pattern(&search.unwrap_or_default());
    let total:i64=conn.query_row("SELECT COUNT(*) FROM playlist_tracks pt JOIN tracks t ON t.id=pt.track_id WHERE pt.playlist_id=?1 AND (t.title LIKE ?2 ESCAPE '$' OR t.artist LIKE ?2 ESCAPE '$' OR t.album LIKE ?2 ESCAPE '$')",params![playlist_id,q],|r|r.get(0)).map_err(|e|e.to_string())?;
    let order=playlist_order(sort.as_deref());
    let sql=format!("SELECT t.id,t.path,t.title,t.artist,t.album_artist,t.album,t.genre,t.year,t.duration,t.artwork_path,t.codec,t.specs,t.replay_gain,pt.entry_id,t.play_count FROM playlist_tracks pt JOIN tracks t ON t.id=pt.track_id WHERE pt.playlist_id=?1 AND (t.title LIKE ?2 ESCAPE '$' OR t.artist LIKE ?2 ESCAPE '$' OR t.album LIKE ?2 ESCAPE '$') ORDER BY {} LIMIT ?3 OFFSET ?4",order);
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

// ---------------------------------------------------------------------------
// Library backup / restore (1.3.0)
//
// A backup is ONE file: magic + header (JSON) + a consistent copy of library.db
// (made with VACUUM INTO). Audio files and artwork are never stored. Restore
// copies the tables into the live database inside ONE transaction (all or
// nothing), remaps folder roots when the music lives somewhere else now, and
// leaves covers to be rebuilt from the audio files.
// ---------------------------------------------------------------------------
const BACKUP_MAGIC: &[u8; 8] = b"MELOBK01";
const BACKUP_FORMAT: i64 = 1;
const BACKUP_HEADER_MAX: u64 = 4 * 1024 * 1024;
const BS: char = '\u{5c}';

#[derive(Debug, Serialize, Deserialize, Clone, Default)]
#[serde(rename_all = "camelCase")]
pub struct BackupRootInfo {
    pub path: String,
    #[serde(default)]
    pub tracks: i64,
    #[serde(default)]
    pub exists: bool,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct BackupHeader {
    pub format: i64,
    pub app_version: String,
    pub created_at: i64,
    pub db_bytes: u64,
    pub db_sha256: String,
    pub tracks: i64,
    pub playlists: i64,
    pub listens: i64,
    pub roots: Vec<BackupRootInfo>,
    #[serde(default)]
    pub settings: HashMap<String, String>,
}

#[derive(Debug, Deserialize)]
pub struct RootRemap {
    pub from: String,
    pub to: String,
}

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct RestoreReport {
    pub tracks: i64,
    pub playlists: i64,
    pub listens: i64,
    pub missing: i64,
    pub missing_samples: Vec<String>,
    pub remapped: i64,
    pub settings: HashMap<String, String>,
}

fn hex_sha256_of_file(path: &Path) -> Result<String, String> {
    use std::io::Read;
    let mut file = std::fs::File::open(path).map_err(|e| e.to_string())?;
    let mut hasher = Sha256::new();
    let mut buf = vec![0u8; 1 << 20];
    loop {
        let n = file.read(&mut buf).map_err(|e| e.to_string())?;
        if n == 0 { break; }
        hasher.update(&buf[..n]);
    }
    Ok(format!("{:x}", hasher.finalize()))
}

fn count_one(conn: &Connection, sql: &str) -> i64 {
    conn.query_row(sql, [], |r| r.get::<_, i64>(0)).unwrap_or(0)
}

fn write_backup(db_path: &Path, dest: &Path, settings: HashMap<String, String>, version: &str) -> Result<BackupHeader, String> {
    use std::io::{Read, Seek, SeekFrom, Write};
    let dir = db_path.parent().ok_or_else(|| "Library folder is unavailable".to_string())?;
    let snap = dir.join("library-backup-snapshot.db");
    let part = PathBuf::from(format!("{}.part", dest.display()));
    let _ = std::fs::remove_file(&snap);
    let _ = std::fs::remove_file(&part);
    let result = (|| -> Result<BackupHeader, String> {
        {
            let live = open_db(db_path)?;
            live.execute("VACUUM INTO ?1", params![snap.to_string_lossy().to_string()])
                .map_err(|e| format!("Couldn't snapshot the library: {e}"))?;
        }
        let snap_conn = Connection::open(&snap).map_err(|e| e.to_string())?;
        let mut roots: Vec<BackupRootInfo> = Vec::new();
        {
            let mut stmt = snap_conn.prepare("SELECT path FROM library_roots ORDER BY path").map_err(|e| e.to_string())?;
            let paths: Vec<String> = stmt.query_map([], |r| r.get::<_, String>(0)).map_err(|e| e.to_string())?.filter_map(log_skipped).collect();
            for path in paths {
                let mut prefix = path.clone();
                while prefix.ends_with(std::path::MAIN_SEPARATOR) { prefix.pop(); }
                prefix.push(std::path::MAIN_SEPARATOR);
                let pattern = format!("{}%", like_escape(&prefix));
                let tracks = snap_conn
                    .query_row("SELECT COUNT(*) FROM tracks WHERE library_owned=1 AND path LIKE ?1 ESCAPE '$'", params![pattern], |r| r.get::<_, i64>(0))
                    .unwrap_or(0);
                roots.push(BackupRootInfo { path, tracks, exists: true });
            }
        }
        let tracks = count_one(&snap_conn, "SELECT COUNT(*) FROM tracks WHERE library_owned=1");
        let playlists = count_one(&snap_conn, "SELECT COUNT(*) FROM playlists");
        let listens = count_one(&snap_conn, "SELECT COUNT(*) FROM listen_log");
        drop(snap_conn);
        let db_bytes = std::fs::metadata(&snap).map_err(|e| e.to_string())?.len();
        let header = BackupHeader {
            format: BACKUP_FORMAT,
            app_version: version.to_string(),
            created_at: now_ms(),
            db_bytes,
            db_sha256: hex_sha256_of_file(&snap)?,
            tracks,
            playlists,
            listens,
            roots,
            settings,
        };
        let header_json = serde_json::to_vec(&header).map_err(|e| e.to_string())?;
        let mut out = std::fs::File::create(&part).map_err(|e| format!("Couldn't write the backup file: {e}"))?;
        out.write_all(BACKUP_MAGIC).map_err(|e| e.to_string())?;
        out.write_all(&(header_json.len() as u32).to_le_bytes()).map_err(|e| e.to_string())?;
        out.write_all(&header_json).map_err(|e| e.to_string())?;
        let mut input = std::fs::File::open(&snap).map_err(|e| e.to_string())?;
        input.seek(SeekFrom::Start(0)).map_err(|e| e.to_string())?;
        let mut buf = vec![0u8; 1 << 20];
        loop {
            let n = input.read(&mut buf).map_err(|e| e.to_string())?;
            if n == 0 { break; }
            out.write_all(&buf[..n]).map_err(|e| format!("Couldn't write the backup file: {e}"))?;
        }
        out.flush().map_err(|e| e.to_string())?;
        out.sync_all().map_err(|e| e.to_string())?;
        drop(out);
        std::fs::rename(&part, dest).map_err(|e| format!("Couldn't save the backup file: {e}"))?;
        Ok(header)
    })();
    let _ = std::fs::remove_file(&snap);
    if result.is_err() { let _ = std::fs::remove_file(&part); }
    result
}

/// Reads and validates the header. Returns it with the byte offset of the database.
fn read_backup_header(path: &Path) -> Result<(BackupHeader, u64), String> {
    use std::io::Read;
    let mut file = std::fs::File::open(path).map_err(|e| format!("Couldn't open the backup file: {e}"))?;
    let total = file.metadata().map_err(|e| e.to_string())?.len();
    let mut magic = [0u8; 8];
    if file.read_exact(&mut magic).is_err() || &magic != BACKUP_MAGIC {
        return Err("This is not a Melo backup file.".to_string());
    }
    let mut len_bytes = [0u8; 4];
    file.read_exact(&mut len_bytes).map_err(|_| "The backup file is damaged.".to_string())?;
    let header_len = u32::from_le_bytes(len_bytes) as u64;
    if header_len == 0 || header_len > BACKUP_HEADER_MAX {
        return Err("The backup file is damaged.".to_string());
    }
    let mut header_bytes = vec![0u8; header_len as usize];
    file.read_exact(&mut header_bytes).map_err(|_| "The backup file is damaged.".to_string())?;
    let header: BackupHeader = serde_json::from_slice(&header_bytes).map_err(|_| "The backup file is damaged.".to_string())?;
    if header.format > BACKUP_FORMAT {
        return Err("This backup was made by a newer version of Melo. Update Melo to restore it.".to_string());
    }
    let offset = 8 + 4 + header_len;
    if total != offset + header.db_bytes {
        return Err("The backup file is incomplete or damaged.".to_string());
    }
    Ok((header, offset))
}

#[tauri::command]
pub async fn create_library_backup(dest: String, settings: HashMap<String, String>, app: AppHandle, state: State<'_, LibraryState>) -> Result<BackupHeader, String> {
    let db_path = state.db_path.clone();
    let version = app.package_info().version.to_string();
    tauri::async_runtime::spawn_blocking(move || write_backup(&db_path, Path::new(&dest), settings, &version))
        .await
        .map_err(|e| e.to_string())?
}

#[tauri::command]
pub async fn inspect_library_backup(path: String) -> Result<BackupHeader, String> {
    tauri::async_runtime::spawn_blocking(move || {
        let (mut header, _) = read_backup_header(Path::new(&path))?;
        for root in header.roots.iter_mut() {
            root.exists = Path::new(&root.path).is_dir();
        }
        Ok(header)
    })
    .await
    .map_err(|e| e.to_string())?
}

/// Case-insensitive, separator-insensitive, extended-prefix-insensitive form of a path.
fn logical_path(s: &str) -> String {
    let ext = format!("{b}{b}?{b}", b = BS);
    let unc = format!("{b}{b}?{b}UNC{b}", b = BS);
    if let Some(rest) = s.strip_prefix(unc.as_str()) {
        return format!("{b}{b}{rest}", b = BS);
    }
    if let Some(rest) = s.strip_prefix(ext.as_str()) {
        return rest.to_string();
    }
    s.to_string()
}

fn fold_char(c: char) -> char {
    if c == '/' { BS } else { c.to_lowercase().next().unwrap_or(c) }
}

fn trim_end_separators(s: &str) -> String {
    let mut out = s.to_string();
    while out.len() > 1 && (out.ends_with(BS) || out.ends_with('/')) { out.pop(); }
    out
}

fn remap_one(path: &str, maps: &[(Vec<char>, String)]) -> Option<String> {
    let logical = logical_path(path);
    let folded: Vec<char> = logical.chars().map(fold_char).collect();
    for (from, to) in maps {
        if folded.len() >= from.len() && folded[..from.len()] == from[..] && (folded.len() == from.len() || folded[from.len()] == BS) {
            let rest: String = logical.chars().skip(from.len()).collect();
            return Some(format!("{}{}", to, rest));
        }
    }
    None
}

fn table_columns(conn: &Connection, schema: &str, table: &str) -> Result<Vec<String>, String> {
    let mut stmt = conn.prepare(&format!("PRAGMA {schema}.table_info({table})")).map_err(|e| e.to_string())?;
    let rows = stmt.query_map([], |r| r.get::<_, String>(1)).map_err(|e| e.to_string())?;
    Ok(rows.filter_map(log_skipped).collect())
}

fn bk_has_table(conn: &Connection, table: &str) -> bool {
    conn.query_row("SELECT COUNT(*) FROM bk.sqlite_master WHERE type='table' AND name=?1", params![table], |r| r.get::<_, i64>(0))
        .map(|n| n > 0)
        .unwrap_or(false)
}

/// Copies the columns both schemas share, so backups from older or newer
/// versions still restore (missing columns fall back to their defaults).
fn copy_table(conn: &Connection, table: &str, filter: &str) -> Result<(), String> {
    if !bk_has_table(conn, table) { return Ok(()); }
    let main_cols = table_columns(conn, "main", table)?;
    let bk_cols = table_columns(conn, "bk", table)?;
    let common: Vec<String> = main_cols.into_iter().filter(|c| bk_cols.contains(c)).map(|c| format!("\"{c}\"")).collect();
    if common.is_empty() { return Ok(()); }
    let list = common.join(",");
    conn.execute_batch(&format!("INSERT OR IGNORE INTO main.\"{table}\"({list}) SELECT {list} FROM bk.\"{table}\" {filter}"))
        .map_err(|e| format!("Couldn't restore {table}: {e}"))
}

fn restore_into_live(conn: &Connection, remaps: &[RootRemap]) -> Result<i64, String> {
    if !bk_has_table(conn, "tracks") {
        return Err("This backup contains no library data.".to_string());
    }
    let owned = count_one(conn, "SELECT COUNT(*) FROM main.tracks WHERE library_owned=1");
    if owned > 0 {
        return Err("Restore needs an empty library. Use Clear Library first.".to_string());
    }
    // Normalised remap table, longest source first.
    let mut maps: Vec<(Vec<char>, String)> = Vec::new();
    for r in remaps {
        let from = trim_end_separators(&logical_path(r.from.trim()));
        let to_raw = r.to.trim();
        if from.is_empty() || to_raw.is_empty() { continue; }
        let to = match std::fs::canonicalize(to_raw) {
            Ok(p) => p.to_string_lossy().to_string(),
            Err(_) => to_raw.to_string(),
        };
        let to = trim_end_separators(&to);
        let from_folded: Vec<char> = from.chars().map(fold_char).collect();
        let to_folded: Vec<char> = logical_path(&to).chars().map(fold_char).collect();
        if from_folded == to_folded { continue; }
        maps.push((from_folded, to));
    }
    maps.sort_by(|a, b| b.0.len().cmp(&a.0.len()));

    conn.execute_batch(
        "DELETE FROM main.queue;
         DELETE FROM main.playlist_tracks;
         DELETE FROM main.playlists;
         DELETE FROM main.listen_log;
         DELETE FROM main.tracks;
         DELETE FROM main.library_roots;
         DELETE FROM main.allowed_dirs;",
    )
    .map_err(|e| e.to_string())?;
    copy_table(conn, "tracks", "")?;
    copy_table(conn, "playlists", "")?;
    copy_table(conn, "playlist_tracks", "WHERE playlist_id IN (SELECT id FROM main.playlists) AND track_id IN (SELECT id FROM main.tracks)")?;
    copy_table(conn, "listen_log", "WHERE track_id IN (SELECT id FROM main.tracks)")?;
    copy_table(conn, "library_roots", "")?;
    copy_table(conn, "allowed_dirs", "")?;
    // Backups made before listen_log.counted existed: same approximation as the schema migration.
    if bk_has_table(conn, "listen_log") && !table_columns(conn, "bk", "listen_log")?.iter().any(|c| c == "counted") {
        conn.execute_batch("UPDATE main.listen_log SET counted=1 WHERE seconds>=30").map_err(|e| e.to_string())?;
    }

    let mut remapped: i64 = 0;
    if !maps.is_empty() {
        let tracks: Vec<(String, String)> = {
            let mut stmt = conn.prepare("SELECT id,path FROM main.tracks").map_err(|e| e.to_string())?;
            let rows = stmt.query_map([], |r| Ok((r.get::<_, String>(0)?, r.get::<_, String>(1)?))).map_err(|e| e.to_string())?;
            rows.filter_map(log_skipped).collect()
        };
        for (id, path) in tracks {
            if let Some(new_path) = remap_one(&path, &maps) {
                conn.execute("UPDATE OR IGNORE main.tracks SET path=?2 WHERE id=?1", params![id, new_path]).map_err(|e| e.to_string())?;
                remapped += 1;
            }
        }
        for table in ["library_roots", "allowed_dirs"] {
            let rows: Vec<String> = {
                let mut stmt = conn.prepare(&format!("SELECT path FROM main.{table}")).map_err(|e| e.to_string())?;
                let found = stmt.query_map([], |r| r.get::<_, String>(0)).map_err(|e| e.to_string())?;
                found.filter_map(log_skipped).collect()
            };
            for path in rows {
                if let Some(new_path) = remap_one(&path, &maps) {
                    conn.execute(&format!("UPDATE OR IGNORE main.{table} SET path=?2 WHERE path=?1"), params![path, new_path]).map_err(|e| e.to_string())?;
                }
            }
        }
        let playlists: Vec<(String, String)> = {
            let mut stmt = conn.prepare("SELECT id,source_path FROM main.playlists WHERE source_path IS NOT NULL").map_err(|e| e.to_string())?;
            let rows = stmt.query_map([], |r| Ok((r.get::<_, String>(0)?, r.get::<_, String>(1)?))).map_err(|e| e.to_string())?;
            rows.filter_map(log_skipped).collect()
        };
        for (id, path) in playlists {
            if let Some(new_path) = remap_one(&path, &maps) {
                conn.execute("UPDATE OR IGNORE main.playlists SET source_path=?2 WHERE id=?1", params![id, new_path]).map_err(|e| e.to_string())?;
            }
        }
    }
    Ok(remapped)
}

#[tauri::command]
pub async fn restore_library_backup(path: String, remaps: Vec<RootRemap>, app: AppHandle, state: State<'_, LibraryState>) -> Result<RestoreReport, String> {
    let state = state.inner().clone();
    tauri::async_runtime::spawn_blocking(move || -> Result<RestoreReport, String> {
        use std::io::{Read, Seek, SeekFrom, Write};
        if state.jobs.lock().map(|j| !j.is_empty()).unwrap_or(true) {
            return Err("A library scan is running. Wait for it to finish or cancel it first.".to_string());
        }
        let backup_path = PathBuf::from(&path);
        let (header, offset) = read_backup_header(&backup_path)?;
        let dir = state.db_path.parent().ok_or_else(|| "Library folder is unavailable".to_string())?.to_path_buf();
        let staging = dir.join("library-restore-staging.db");
        let _ = std::fs::remove_file(&staging);
        // Extract + verify the embedded database before touching the live one.
        let extracted = (|| -> Result<(), String> {
            let mut input = std::fs::File::open(&backup_path).map_err(|e| e.to_string())?;
            input.seek(SeekFrom::Start(offset)).map_err(|e| e.to_string())?;
            let mut out = std::fs::File::create(&staging).map_err(|e| e.to_string())?;
            let mut hasher = Sha256::new();
            let mut remaining = header.db_bytes;
            let mut buf = vec![0u8; 1 << 20];
            while remaining > 0 {
                let want = std::cmp::min(remaining, buf.len() as u64) as usize;
                let n = input.read(&mut buf[..want]).map_err(|e| e.to_string())?;
                if n == 0 { return Err("The backup file is incomplete or damaged.".to_string()); }
                hasher.update(&buf[..n]);
                out.write_all(&buf[..n]).map_err(|e| e.to_string())?;
                remaining -= n as u64;
            }
            out.flush().map_err(|e| e.to_string())?;
            drop(out);
            if format!("{:x}", hasher.finalize()) != header.db_sha256 {
                return Err("The backup file failed its integrity check and was not restored.".to_string());
            }
            let probe = Connection::open(&staging).map_err(|e| e.to_string())?;
            let verdict: String = probe.query_row("PRAGMA quick_check", [], |r| r.get(0)).map_err(|e| e.to_string())?;
            if verdict != "ok" {
                return Err("The backup database is damaged and was not restored.".to_string());
            }
            Ok(())
        })();
        if let Err(e) = extracted {
            let _ = std::fs::remove_file(&staging);
            return Err(e);
        }

        let report = (|| -> Result<RestoreReport, String> {
            let conn = locked_db(&state)?;
            conn.execute("ATTACH DATABASE ?1 AS bk", params![staging.to_string_lossy().to_string()])
                .map_err(|e| format!("Couldn't open the backup: {e}"))?;
            let outcome = (|| -> Result<i64, String> {
                conn.execute_batch("BEGIN IMMEDIATE").map_err(|e| e.to_string())?;
                let r = restore_into_live(&conn, &remaps);
                match r {
                    Ok(n) => { conn.execute_batch("COMMIT").map_err(|e| e.to_string())?; Ok(n) }
                    Err(e) => { let _ = conn.execute_batch("ROLLBACK"); Err(e) }
                }
            })();
            let _ = conn.execute_batch("DETACH DATABASE bk");
            let remapped = outcome?;

            // Covers: drop paths to cache files that do not exist on this computer.
            let artwork: Vec<String> = {
                let mut stmt = conn.prepare("SELECT DISTINCT artwork_path FROM tracks WHERE artwork_path IS NOT NULL").map_err(|e| e.to_string())?;
                let rows = stmt.query_map([], |r| r.get::<_, String>(0)).map_err(|e| e.to_string())?;
                rows.filter_map(log_skipped).collect()
            };
            for p in artwork {
                if !Path::new(&p).exists() {
                    let _ = conn.execute("UPDATE tracks SET artwork_path=NULL WHERE artwork_path=?1", params![p]);
                }
            }
            // Playback permission for the (possibly remapped) folders.
            for root in read_library_roots(&conn)? {
                let _ = app.asset_protocol_scope().allow_directory(Path::new(&root.path), true);
            }
            for dir in read_allowed_dirs(&conn)? {
                let _ = app.asset_protocol_scope().allow_directory(Path::new(&dir), false);
            }
            // Which restored files are not on disk right now.
            let paths: Vec<String> = {
                let mut stmt = conn.prepare("SELECT path FROM tracks WHERE library_owned=1").map_err(|e| e.to_string())?;
                let rows = stmt.query_map([], |r| r.get::<_, String>(0)).map_err(|e| e.to_string())?;
                rows.filter_map(log_skipped).collect()
            };
            let mut missing: i64 = 0;
            let mut missing_samples: Vec<String> = Vec::new();
            for p in paths {
                if !Path::new(&p).exists() {
                    missing += 1;
                    if missing_samples.len() < 5 { missing_samples.push(p); }
                }
            }
            Ok(RestoreReport {
                tracks: count_one(&conn, "SELECT COUNT(*) FROM tracks WHERE library_owned=1"),
                playlists: count_one(&conn, "SELECT COUNT(*) FROM playlists"),
                listens: count_one(&conn, "SELECT COUNT(*) FROM listen_log"),
                missing,
                missing_samples,
                remapped,
                settings: header.settings.clone(),
            })
        })();
        let _ = std::fs::remove_file(&staging);
        report
    })
    .await
    .map_err(|e| e.to_string())?
}

/// After a restore the cover cache is empty: rebuild one cover per album
/// straight from the audio files (everything else fills in lazily when shown).
#[tauri::command]
pub async fn rebuild_library_artwork(state: State<'_, LibraryState>) -> Result<i64, String> {
    let db_path = state.db_path.clone();
    let artwork_dir = state.artwork_dir.clone();
    tauri::async_runtime::spawn_blocking(move || {
        let conn = open_db(&db_path)?;
        let rows: Vec<(String, String, String)> = {
            let mut stmt = conn
                .prepare("SELECT id,album_artist,album FROM tracks WHERE library_owned=1 AND artwork_path IS NULL ORDER BY album_artist COLLATE NOCASE, album COLLATE NOCASE, id")
                .map_err(|e| e.to_string())?;
            let found = stmt.query_map([], |r| Ok((r.get::<_, String>(0)?, r.get::<_, String>(1)?, r.get::<_, String>(2)?))).map_err(|e| e.to_string())?;
            found.filter_map(log_skipped).collect()
        };
        let mut built: i64 = 0;
        let mut last_key: Option<(String, String)> = None;
        let mut group_done = false;
        let mut attempts = 0;
        for (id, artist, album) in rows {
            let key = (artist.to_lowercase(), album.to_lowercase());
            if last_key.as_ref() != Some(&key) {
                last_key = Some(key);
                group_done = false;
                attempts = 0;
            }
            if group_done || attempts >= 4 { continue; }
            attempts += 1;
            if let Ok(Some(_)) = ensure_track_artwork_sync(&conn, &id, &artwork_dir) {
                group_done = true;
                built += 1;
            }
        }
        Ok(built)
    })
    .await
    .map_err(|e| e.to_string())?
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
    let tagged=read_tagged_tolerant(Path::new(&path))?;
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
        let tagged = read_tagged_tolerant(Path::new(&path))?;
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

/// Round 118: totals for the Playlist window footer. `seconds` is the summed
/// duration of the rows matching the (optional) search; `remaining_seconds`
/// is only meaningful for the queue (current track + everything after it).
#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct ListTotals {
    pub count: i64,
    pub seconds: f64,
    pub remaining_seconds: f64,
    /// Queue only: zero-based index of the playing row (None when idle/unknown).
    pub current_index: Option<i64>,
}

#[tauri::command]
pub async fn playlist_totals(playlist_id: String, search: Option<String>, state: State<'_, LibraryState>) -> Result<ListTotals, String> {
    let conn = locked_db(&state)?;
    let q = search_pattern(&search.unwrap_or_default());
    let (count, seconds): (i64, f64) = conn
        .query_row(
            "SELECT COUNT(*),COALESCE(SUM(t.duration),0) FROM playlist_tracks pt JOIN tracks t ON t.id=pt.track_id \
             WHERE pt.playlist_id=?1 AND (t.title LIKE ?2 ESCAPE '$' OR t.artist LIKE ?2 ESCAPE '$' OR t.album LIKE ?2 ESCAPE '$')",
            params![playlist_id, q],
            |r| Ok((r.get(0)?, r.get(1)?)),
        )
        .map_err(|e| e.to_string())?;
    Ok(ListTotals { count, seconds, remaining_seconds: seconds, current_index: None })
}

/// Queue totals plus the time left from the playing entry (inclusive) to the
/// end. The playing row is found by queue entry id, else by the first row of
/// that track; unknown/idle -> the whole queue counts as remaining.
#[tauri::command]
pub async fn queue_totals(current_entry_id: Option<i64>, current_track_id: Option<String>, state: State<'_, LibraryState>) -> Result<ListTotals, String> {
    let conn = locked_db(&state)?;
    let (count, seconds): (i64, f64) = conn
        .query_row(
            "SELECT COUNT(*),COALESCE(SUM(t.duration),0) FROM queue q JOIN tracks t ON t.id=q.track_id",
            [],
            |r| Ok((r.get(0)?, r.get(1)?)),
        )
        .map_err(|e| e.to_string())?;
    let mut pos: Option<i64> = None;
    if let Some(entry) = current_entry_id {
        pos = conn
            .query_row("SELECT position FROM queue WHERE entry_id=?1", params![entry], |r| r.get(0))
            .optional()
            .map_err(|e| e.to_string())?;
    }
    if pos.is_none() {
        if let Some(track) = current_track_id {
            pos = conn
                .query_row("SELECT MIN(position) FROM queue WHERE track_id=?1", params![track], |r| r.get::<_, Option<i64>>(0))
                .optional()
                .map_err(|e| e.to_string())?
                .flatten();
        }
    }
    let remaining_seconds: f64 = match pos {
        Some(p) => conn
            .query_row(
                "SELECT COALESCE(SUM(t.duration),0) FROM queue q JOIN tracks t ON t.id=q.track_id WHERE q.position>=?1",
                params![p],
                |r| r.get(0),
            )
            .map_err(|e| e.to_string())?,
        None => seconds,
    };
    let current_index: Option<i64> = match pos {
        Some(p) => conn
            .query_row("SELECT COUNT(*) FROM queue WHERE position<?1", params![p], |r| r.get(0))
            .ok(),
        None => None,
    };
    Ok(ListTotals { count, seconds, remaining_seconds, current_index })
}

/// Round 118: zero-based row index of `track_id` inside a playlist as the
/// window shows it (same search + sort), so the list can scroll to the
/// playing track. First occurrence; None when the track is not listed.
#[tauri::command]
pub async fn playlist_track_index(playlist_id: String, track_id: String, search: Option<String>, sort: Option<String>, state: State<'_, LibraryState>) -> Result<Option<i64>, String> {
    let conn = locked_db(&state)?;
    let q = search_pattern(&search.unwrap_or_default());
    let order = playlist_order(sort.as_deref());
    let sql = format!(
        "SELECT idx FROM (SELECT pt.track_id AS tid, ROW_NUMBER() OVER (ORDER BY {order}) - 1 AS idx \
         FROM playlist_tracks pt JOIN tracks t ON t.id=pt.track_id \
         WHERE pt.playlist_id=?1 AND (t.title LIKE ?2 ESCAPE '$' OR t.artist LIKE ?2 ESCAPE '$' OR t.album LIKE ?2 ESCAPE '$')) \
         WHERE tid=?3 ORDER BY idx LIMIT 1"
    );
    conn.query_row(&sql, params![playlist_id, q, track_id], |r| r.get(0)).optional().map_err(|e| e.to_string())
}

/// "Play next": inserts the tracks right AFTER the anchor row (the playing
/// entry, else the first row of the playing track); without a usable anchor
/// they go to the END. Returns the new entry ids in input order.
#[tauri::command]
pub async fn insert_queue_after(track_ids: Vec<String>, after_entry_id: Option<i64>, after_track_id: Option<String>, state: State<'_, LibraryState>) -> Result<Vec<i64>, String> {
    let mut conn = locked_db(&state)?;
    let tx = conn.transaction().map_err(|e| e.to_string())?;
    let mut anchor: Option<i64> = None;
    if let Some(entry) = after_entry_id {
        anchor = tx
            .query_row("SELECT entry_id FROM queue WHERE entry_id=?1", params![entry], |r| r.get(0))
            .optional()
            .map_err(|e| e.to_string())?;
    }
    if anchor.is_none() {
        if let Some(track) = after_track_id {
            anchor = tx
                .query_row("SELECT entry_id FROM queue WHERE track_id=?1 ORDER BY position LIMIT 1", params![track], |r| r.get(0))
                .optional()
                .map_err(|e| e.to_string())?;
        }
    }
    let mut position: i64 = tx.query_row("SELECT COALESCE(MAX(position),-1)+1 FROM queue", [], |r| r.get(0)).unwrap_or(0);
    let mut new_entries: Vec<i64> = Vec::with_capacity(track_ids.len());
    {
        let mut stmt = tx.prepare("INSERT INTO queue(position,track_id) VALUES(?1,?2)").map_err(|e| e.to_string())?;
        for id in track_ids {
            stmt.execute(params![position, id]).map_err(|e| e.to_string())?;
            new_entries.push(tx.last_insert_rowid());
            position += 1;
        }
    }
    if let Some(anchor_entry) = anchor {
        // The new rows sit at the end; rebuild the order with them moved
        // directly behind the anchor.
        let existing: Vec<i64> = {
            let mut stmt = tx.prepare("SELECT entry_id FROM queue ORDER BY position,entry_id").map_err(|e| e.to_string())?;
            let rows = stmt.query_map([], |r| r.get::<_, i64>(0)).map_err(|e| e.to_string())?;
            rows.filter_map(log_skipped).collect()
        };
        let mut ordered: Vec<String> = Vec::with_capacity(existing.len());
        for e in existing.iter().filter(|e| !new_entries.contains(e)) {
            ordered.push(e.to_string());
            if *e == anchor_entry {
                ordered.extend(new_entries.iter().map(|n| n.to_string()));
            }
        }
        apply_queue_order(&tx, &ordered)?;
    }
    renumber_queue(&tx)?;
    tx.commit().map_err(|e| e.to_string())?;
    Ok(new_entries)
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
pub async fn replace_queue_from_library(search: Option<String>, field: Option<String>, artist: Option<String>, album_artist: Option<String>, album: Option<String>, genre: Option<String>, sort: Option<String>, state: State<'_, LibraryState>) -> Result<(), String> {
    let mut conn = locked_db(&state)?;
    // Round 118: the SAME filter the visible list used (search field + the
    // artist / album-artist scope) — the queue must equal what the list shows.
    let (where_sql, values) = library_filter_field(search, field, artist, album_artist, album, genre);
    let sql = format!("INSERT INTO queue(position,track_id) SELECT ROW_NUMBER() OVER (ORDER BY {})-1,id FROM tracks{}", library_order(sort.as_deref()), where_sql);
    let tx = conn.transaction().map_err(|e| e.to_string())?;
    tx.execute("DELETE FROM queue", []).map_err(|e| e.to_string())?;
    let refs: Vec<&dyn ToSql> = values.iter().map(|v| v as &dyn ToSql).collect();
    tx.execute(&sql, params_from_iter(refs)).map_err(|e| e.to_string())?;
    renumber_queue(&tx)?;
    tx.commit().map_err(|e| e.to_string())
}

/// Group Play button (artist / album artist / album / genre card): replaces
/// the queue with EVERY library track of that group — the active search is
/// deliberately not an input. Natural order: artist groups run album by
/// album, everything else by title.
#[tauri::command]
pub async fn replace_queue_from_group(artist: Option<String>, album_artist: Option<String>, album: Option<String>, genre: Option<String>, state: State<'_, LibraryState>) -> Result<i64, String> {
    let has_scope = [&artist, &album_artist, &album, &genre].iter().any(|v| v.as_deref().map_or(false, |x| !x.is_empty()));
    if !has_scope {
        return Err("no group given".into());
    }
    let mut conn = locked_db(&state)?;
    let by_album = album.as_deref().map_or(true, str::is_empty) && (artist.is_some() || album_artist.is_some());
    let (where_sql, values) = library_filter_field(None, None, artist, album_artist, album, genre);
    let order = library_order(Some(if by_album { "album-asc" } else { "title-asc" }));
    let sql = format!("INSERT INTO queue(position,track_id) SELECT ROW_NUMBER() OVER (ORDER BY {})-1,id FROM tracks{}", order, where_sql);
    let tx = conn.transaction().map_err(|e| e.to_string())?;
    tx.execute("DELETE FROM queue", []).map_err(|e| e.to_string())?;
    let refs: Vec<&dyn ToSql> = values.iter().map(|v| v as &dyn ToSql).collect();
    tx.execute(&sql, params_from_iter(refs)).map_err(|e| e.to_string())?;
    renumber_queue(&tx)?;
    let n: i64 = tx.query_row("SELECT COUNT(*) FROM queue", [], |r| r.get(0)).map_err(|e| e.to_string())?;
    tx.commit().map_err(|e| e.to_string())?;
    Ok(n)
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
        Some("file-asc") => "t.path COLLATE MELO_FILENAME,q.position",
        _ => "q.position",
    }
}

/// Writes the queue in the given order: rows park on a negative range first
/// (UNIQUE(position) is never transiently violated), then compact to 0..n.
fn apply_queue_order(conn: &Connection, ids: &[String]) -> Result<(), String> {
    // Round 118: ONE transaction (a savepoint, so it also nests inside a
    // caller's transaction) — without it every UPDATE was its own commit and
    // sorting a few thousand queue rows took seconds.
    conn.execute_batch("SAVEPOINT melo_queue_order").map_err(|e| e.to_string())?;
    let run = || -> Result<(), String> {
        // Ids are queue ENTRY ids (strings for the broadcast round-trip).
        let mut stmt = conn.prepare("UPDATE queue SET position=?2 WHERE entry_id=?1").map_err(|e| e.to_string())?;
        for (i, id) in ids.iter().enumerate() {
            stmt.execute(params![id, -1 - i as i64]).map_err(|e| e.to_string())?;
        }
        for (i, id) in ids.iter().enumerate() {
            stmt.execute(params![id, i as i64]).map_err(|e| e.to_string())?;
        }
        Ok(())
    };
    match run() {
        Ok(()) => conn.execute_batch("RELEASE melo_queue_order").map_err(|e| e.to_string()),
        Err(e) => {
            let _ = conn.execute_batch("ROLLBACK TO melo_queue_order; RELEASE melo_queue_order");
            Err(e)
        }
    }
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
/// Playlist / queue rows are ENTRY-keyed (a track can appear twice). The tag
/// editor needs the TRACKS: entry ids -> distinct track ids, in list order.
/// `source` is "queue" or a playlist id.
fn entry_track_ids_in(conn: &Connection, source: &str, entry_ids: &[i64]) -> Result<Vec<String>, String> {
    let wanted: std::collections::HashSet<i64> = entry_ids.iter().copied().collect();
    let rows: Vec<(i64, String)> = if source == "queue" {
        let mut stmt = conn.prepare("SELECT entry_id, track_id FROM queue ORDER BY position, entry_id").map_err(|e| e.to_string())?;
        let it = stmt.query_map([], |r| Ok((r.get::<_, i64>(0)?, r.get::<_, String>(1)?))).map_err(|e| e.to_string())?;
        it.filter_map(log_skipped).collect()
    } else {
        let mut stmt = conn.prepare("SELECT entry_id, track_id FROM playlist_tracks WHERE playlist_id = ?1 ORDER BY position, entry_id").map_err(|e| e.to_string())?;
        let it = stmt.query_map(params![source], |r| Ok((r.get::<_, i64>(0)?, r.get::<_, String>(1)?))).map_err(|e| e.to_string())?;
        it.filter_map(log_skipped).collect()
    };
    let mut seen = std::collections::HashSet::new();
    let mut out = Vec::new();
    for (entry, track) in rows {
        if wanted.contains(&entry) && seen.insert(track.clone()) {
            out.push(track);
        }
    }
    Ok(out)
}

#[tauri::command]
pub async fn entry_track_ids(source: String, entry_ids: Vec<i64>, state: State<'_, LibraryState>) -> Result<Vec<String>, String> {
    let conn = locked_db(&state)?;
    entry_track_ids_in(&conn, &source, &entry_ids)
}

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

/// Round 119b: "removed from the Library" means forgotten. listen_log has no
/// foreign key (track id = file path), so without this its rows of a deleted
/// track survived and re-attached when the same file was added again, while
/// play_count / last_played_at restarted from zero.
fn purge_orphan_listens(conn: &Connection) -> Result<usize, String> {
    conn.execute("DELETE FROM listen_log WHERE track_id NOT IN (SELECT id FROM tracks)", [])
        .map_err(|e| e.to_string())
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
    purge_orphan_listens(&tx)?;
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
    purge_orphan_listens(&tx)?;
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

// ───────────────────────── Tag editor (round 119) ─────────────────────────
// Reading/writing lives in tag_edit.rs (pure lofty, tested on real files);
// this section only maps track ids to paths and keeps the database in step.

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct TagFileInfo {
    pub id: String,
    pub path: String,
    pub file_name: String,
    pub fields: Option<crate::tag_edit::TagFields>,
    pub error: Option<String>,
}

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct TagReadResult {
    pub files: Vec<TagFileInfo>,
    /// Fields every readable file agrees on (None = mixed).
    pub common: crate::tag_edit::CommonFields,
}

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct TagWriteFailure {
    pub id: String,
    pub path: String,
    pub error: String,
}

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct TagWriteResult {
    pub ok: Vec<String>,
    pub failed: Vec<TagWriteFailure>,
}

fn track_path_of(conn: &Connection, id: &str) -> Result<Option<String>, String> {
    conn.query_row("SELECT path FROM tracks WHERE id=?1", params![id], |r| r.get(0))
        .optional()
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn tag_read(track_ids: Vec<String>, state: State<'_, LibraryState>) -> Result<TagReadResult, String> {
    let db_path = state.db_path.clone();
    tauri::async_runtime::spawn_blocking(move || -> Result<TagReadResult, String> {
        let conn = open_db(&db_path)?;
        let mut files: Vec<TagFileInfo> = Vec::with_capacity(track_ids.len());
        let mut readable: Vec<crate::tag_edit::TagFields> = Vec::new();
        for id in track_ids {
            let Some(path) = track_path_of(&conn, &id)? else {
                files.push(TagFileInfo { id, path: String::new(), file_name: String::new(), fields: None, error: Some("This track is no longer in the library".into()) });
                continue;
            };
            let p = Path::new(&path);
            let file_name = p.file_name().map(|n| n.to_string_lossy().to_string()).unwrap_or_default();
            if is_mka(p) {
                files.push(TagFileInfo { id, path, file_name, fields: None, error: Some("Tags of Matroska audio files cannot be edited".into()) });
                continue;
            }
            match read_tagged_tolerant(p) {
                Ok(tagged) => {
                    let mut fields = crate::tag_edit::read_fields_at(p, &tagged);
                    // A rating still waiting to be written to the file is the real one.
                    if let Ok(Some((r, true))) = conn.query_row("SELECT rating,rating_dirty FROM tracks WHERE id=?1", params![id], |r| Ok((r.get::<_, i64>(0)?, r.get::<_, i64>(1)? == 1))).optional().map(|o| o) {
                        fields.rating = r.clamp(0, 5) as u8;
                    }
                    readable.push(fields.clone());
                    files.push(TagFileInfo { id, path, file_name, fields: Some(fields), error: None });
                }
                Err(e) => files.push(TagFileInfo { id, path, file_name, fields: None, error: Some(e) }),
            }
        }
        let common = crate::tag_edit::common_fields(&readable);
        Ok(TagReadResult { files, common })
    })
    .await
    .map_err(|e| e.to_string())?
}

/// Re-reads one file after a successful write and brings its database row up
/// to date. Unlike a scan upsert this OVERWRITES `artwork_path` (a removed
/// cover must clear it) and keeps id, play counts and playlist membership.
fn refresh_track_row(conn: &Connection, id: &str, path: &str, artwork_dir: &Path) -> Result<(), String> {
    let Some((t, size, modified)) = parse_track_cached(Path::new(path), artwork_dir, true) else {
        return Ok(());
    };
    conn.execute(
        "UPDATE tracks SET title=?2,artist=?3,album_artist=?4,album=?5,genre=?6,year=?7,duration=?8,replay_gain=?9,artwork_path=?10,file_size=?11,modified_at=?12,rating=CASE WHEN rating_dirty=1 THEN rating ELSE ?13 END WHERE id=?1",
        params![id, t.title, t.artist, t.album_artist, t.album, t.genre, t.year as i64, t.duration, t.replay_gain, t.cover, size as i64, modified, t.rating as i64],
    )
    .map_err(|e| e.to_string())?;
    Ok(())
}

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct TagCover {
    pub data_url: String,
    pub mime: String,
    pub bytes: usize,
}

/// The embedded cover of one file, read from the FILE (not the thumbnail cache)
/// so the editor shows what is really stored.
#[tauri::command]
pub async fn tag_cover_read(track_id: String, state: State<'_, LibraryState>) -> Result<Option<TagCover>, String> {
    let db_path = state.db_path.clone();
    tauri::async_runtime::spawn_blocking(move || -> Result<Option<TagCover>, String> {
        let conn = open_db(&db_path)?;
        let Some(path) = track_path_of(&conn, &track_id)? else { return Ok(None) };
        let p = Path::new(&path);
        if is_mka(p) { return Ok(None); }
        let tagged = read_tagged_tolerant(p)?;
        let Some((mime, data)) = crate::tag_edit::read_cover(&tagged) else { return Ok(None) };
        if data.len() > MAX_FULL_ART_BYTES { return Ok(None); }
        let bytes = data.len();
        Ok(Some(TagCover { data_url: format!("data:{};base64,{}", art_mime(&data), b64_encode(&data)), mime, bytes }))
    })
    .await
    .map_err(|e| e.to_string())?
}

/// Read-only facts shown by the editor's Info tab.
#[derive(Debug, Serialize, Default)]
#[serde(rename_all = "camelCase")]
pub struct TagInfo {
    pub id: String,
    pub path: String,
    pub error: Option<String>,
    pub format: String,
    pub tag_types: Vec<String>,
    pub id3_version: Option<String>,
    pub size: u64,
    pub modified: Option<i64>,
    pub duration_ms: u64,
    pub overall_bitrate: Option<u32>,
    pub audio_bitrate: Option<u32>,
    pub sample_rate: Option<u32>,
    pub channels: Option<u8>,
    pub bit_depth: Option<u8>,
    pub encoder: String,
    pub added_at: Option<i64>,
    pub play_count: Option<i64>,
    pub last_played_at: Option<i64>,
}

fn friendly_format(ft: lofty::file::FileType) -> String {
    use lofty::file::FileType as F;
    match ft {
        F::Mpeg => "MPEG audio (MP3)".into(),
        F::Flac => "FLAC".into(),
        F::Mp4 => "MP4 audio (M4A)".into(),
        F::Vorbis => "Ogg Vorbis".into(),
        F::Opus => "Ogg Opus".into(),
        F::Speex => "Ogg Speex".into(),
        F::Wav => "WAV".into(),
        F::Aiff => "AIFF".into(),
        F::Ape => "Monkey's Audio (APE)".into(),
        F::Mpc => "Musepack".into(),
        F::WavPack => "WavPack".into(),
        other => format!("{other:?}"),
    }
}

fn friendly_tag_type(t: lofty::tag::TagType) -> String {
    use lofty::tag::TagType as T;
    match t {
        T::Id3v2 => "ID3v2".into(),
        T::Id3v1 => "ID3v1".into(),
        T::VorbisComments => "Vorbis comments".into(),
        T::Mp4Ilst => "MP4 (iTunes)".into(),
        T::Ape => "APE".into(),
        T::RiffInfo => "RIFF INFO".into(),
        T::AiffText => "AIFF text".into(),
        other => format!("{other:?}"),
    }
}

fn read_tag_info(conn: &Connection, id: &str, path: &str) -> TagInfo {
    use lofty::file::{AudioFile, TaggedFileExt};
    let mut info = TagInfo { id: id.to_string(), path: path.to_string(), ..Default::default() };
    let p = Path::new(path);
    match std::fs::metadata(p) {
        Ok(m) => {
            info.size = m.len();
            info.modified = m.modified().ok().and_then(|t| t.duration_since(std::time::UNIX_EPOCH).ok()).map(|d| d.as_secs() as i64);
        }
        Err(e) => { info.error = Some(format!("Cannot open the file: {e}")); return info; }
    }
    if let Ok((added, plays, last)) = conn.query_row(
        "SELECT added_at, play_count, last_played_at FROM tracks WHERE id = ?1",
        [id],
        |r| Ok((r.get::<_, i64>(0)?, r.get::<_, Option<i64>>(1)?, r.get::<_, Option<i64>>(2)?)),
    ) {
        info.added_at = Some(added);
        info.play_count = plays;
        info.last_played_at = last;
    }
    if is_mka(p) {
        info.format = "Matroska audio".into();
        return info;
    }
    if let Ok(mut f) = std::fs::File::open(p) {
        use std::io::Read;
        let mut head = [0u8; 10];
        if f.read_exact(&mut head).is_ok() && &head[0..3] == b"ID3" {
            info.id3_version = Some(format!("ID3v2.{}", head[3]));
        }
    }
    match read_tagged_tolerant(p) {
        Ok(tagged) => {
            info.format = friendly_format(tagged.file_type());
            let props = tagged.properties();
            info.duration_ms = props.duration().as_millis() as u64;
            info.overall_bitrate = props.overall_bitrate();
            info.audio_bitrate = props.audio_bitrate();
            info.sample_rate = props.sample_rate();
            info.channels = props.channels();
            info.bit_depth = props.bit_depth();
            info.tag_types = tagged.tags().iter().map(|t| friendly_tag_type(t.tag_type())).collect();
            if let Some(t) = tagged.primary_tag().or_else(|| tagged.first_tag()) {
                info.encoder = t.get_string(&lofty::tag::ItemKey::EncoderSoftware).unwrap_or("").trim().to_string();
            }
        }
        Err(e) => info.error = Some(e),
    }
    info
}

/// Facts for the Info tab: one entry per id (the UI aggregates for several files).
#[tauri::command]
pub async fn tag_info(track_ids: Vec<String>, state: State<'_, LibraryState>) -> Result<Vec<TagInfo>, String> {
    let db_path = state.db_path.clone();
    tauri::async_runtime::spawn_blocking(move || -> Result<Vec<TagInfo>, String> {
        let conn = open_db(&db_path)?;
        let mut out = Vec::with_capacity(track_ids.len());
        for id in track_ids {
            match track_path_of(&conn, &id)? {
                Some(path) => out.push(read_tag_info(&conn, &id, &path)),
                None => out.push(TagInfo { id, error: Some("This track is no longer in the library".into()), ..Default::default() }),
            }
        }
        Ok(out)
    })
    .await
    .map_err(|e| e.to_string())?
}

/// Moves one track's identity in every table that references it. Normally
/// id == path; a row whose id differs keeps its id and only gets the new path.
/// Needs `defer_foreign_keys=ON` (set by the caller's transaction) because the
/// child tables reference tracks(id) without ON UPDATE.
fn move_track_rows(tx: &Connection, old_id: &str, old_path: &str, new_path: &str) -> Result<String, String> {
    let new_id = if old_id == old_path { new_path.to_string() } else { old_id.to_string() };
    tx.execute("UPDATE tracks SET id=?2, path=?3 WHERE id=?1", params![old_id, new_id, new_path])
        .map_err(|e| format!("The library could not be updated ({e})"))?;
    if new_id != old_id {
        tx.execute("UPDATE playlist_tracks SET track_id=?2 WHERE track_id=?1", params![old_id, new_id]).map_err(|e| e.to_string())?;
        tx.execute("UPDATE queue SET track_id=?2 WHERE track_id=?1", params![old_id, new_id]).map_err(|e| e.to_string())?;
        tx.execute("UPDATE listen_log SET track_id=?2 WHERE track_id=?1", params![old_id, new_id]).map_err(|e| e.to_string())?;
    }
    Ok(new_id)
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct RenameItem {
    pub track_id: String,
    /// New file name WITHOUT extension (the extension and folder never change).
    pub new_stem: String,
}

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct Renamed {
    pub old_id: String,
    pub new_id: String,
    pub new_path: String,
}

/// Renames audio files (all or nothing). The track id IS the path, so the id is
/// moved in every table that references it in ONE transaction; a `.lrc` next to
/// the file and the lyrics-cache entry follow the file. Any failure puts every
/// file back.
#[tauri::command]
pub async fn rename_tracks(app: tauri::AppHandle, items: Vec<RenameItem>, state: State<'_, LibraryState>) -> Result<Vec<Renamed>, String> {
    use crate::file_rename::{apply_renames, target_for, undo_renames, RenamePair};
    let db_path = state.db_path.clone();
    let art_cache = state.full_art_cache.clone();
    tauri::async_runtime::spawn_blocking(move || -> Result<Vec<Renamed>, String> {
        let mut conn = open_db(&db_path)?;
        struct Plan { old_id: String, old_path: String, from: std::path::PathBuf, to: std::path::PathBuf }
        let mut plans: Vec<Plan> = Vec::new();
        let mut pairs: Vec<RenamePair> = Vec::new();
        for it in &items {
            let Some(old_path) = track_path_of(&conn, &it.track_id)? else {
                return Err("This track is no longer in the library".into());
            };
            let from = std::path::PathBuf::from(&old_path);
            let to = target_for(&from, &it.new_stem)?;
            if to == from { continue; }
            pairs.push(RenamePair { from: from.clone(), to: to.clone() });
            let lrc_from = from.with_extension("lrc");
            if lrc_from.is_file() {
                pairs.push(RenamePair { from: lrc_from, to: to.with_extension("lrc") });
            }
            plans.push(Plan { old_id: it.track_id.clone(), old_path, from, to });
        }
        if plans.is_empty() { return Ok(Vec::new()); }
        apply_renames(&pairs)?;

        let db_result = (|| -> Result<Vec<Renamed>, String> {
            let tx = conn.transaction().map_err(|e| e.to_string())?;
            tx.pragma_update(None, "defer_foreign_keys", "ON").map_err(|e| e.to_string())?;
            let mut out = Vec::new();
            for p in &plans {
                let new_path = p.to.to_string_lossy().to_string();
                let new_id = move_track_rows(&tx, &p.old_id, &p.old_path, &new_path)?;
                out.push(Renamed { old_id: p.old_id.clone(), new_id, new_path });
            }
            tx.commit().map_err(|e| e.to_string())?;
            Ok(out)
        })();
        let renamed = match db_result {
            Ok(r) => r,
            Err(e) => {
                undo_renames(&pairs);
                return Err(format!("{e}. No file was renamed."));
            }
        };
        // Best effort from here on: the files and the database already agree.
        if let Ok(mut cache) = art_cache.lock() {
            for p in &plans { cache.remove(&p.old_id); }
        }
        for p in &plans {
            if let (Some(c_from), Some(c_to)) = (crate::cached_lrc_path(&app, &p.from), crate::cached_lrc_path(&app, &p.to)) {
                if c_from.is_file() && !c_to.exists() { let _ = std::fs::rename(c_from, c_to); }
            }
        }
        Ok(renamed)
    })
    .await
    .map_err(|e| e.to_string())?
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct TagWriteItem {
    pub track_id: String,
    pub edit: crate::tag_edit::TagEdit,
}

/// Shared writer: one (id, edit) pair per file. Covers are loaded once per
/// distinct image path, up front, so a bad image fails the request before any
/// file changes.
async fn write_tag_items(items: Vec<(String, crate::tag_edit::TagEdit)>, state: &State<'_, LibraryState>) -> Result<TagWriteResult, String> {
    let mut covers: std::collections::HashMap<String, crate::tag_edit::CoverImage> = std::collections::HashMap::new();
    for (_, edit) in &items {
        if let Some(crate::tag_edit::CoverEdit::Set { path }) = &edit.cover {
            if !covers.contains_key(path) {
                covers.insert(path.clone(), crate::tag_edit::load_cover(Path::new(path))?);
            }
        }
    }
    let db_path = state.db_path.clone();
    let artwork_dir = state.artwork_dir.clone();
    let art_cache = state.full_art_cache.clone();
    tauri::async_runtime::spawn_blocking(move || -> Result<TagWriteResult, String> {
        let conn = open_db(&db_path)?;
        let mut ok: Vec<String> = Vec::new();
        let mut failed: Vec<TagWriteFailure> = Vec::new();
        for (id, edit) in items {
            if edit.is_empty() { continue; }
            let Some(path) = track_path_of(&conn, &id)? else {
                failed.push(TagWriteFailure { id, path: String::new(), error: "This track is no longer in the library".into() });
                continue;
            };
            let p = Path::new(&path);
            let cover = match &edit.cover {
                Some(crate::tag_edit::CoverEdit::Set { path }) => covers.get(path),
                _ => None,
            };
            let result: Result<(), String> = if is_mka(p) {
                Err("Tags of Matroska audio files cannot be edited".into())
            } else {
                read_tagged_tolerant(p).and_then(|mut tagged| {
                    crate::tag_edit::apply_edit(&mut tagged, &edit, cover)?;
                    crate::tag_edit::write_safely_rated(p, &tagged, edit.rating)
                })
            };
            match result {
                Ok(()) => {
                    // The file is already changed: a row refresh problem must not
                    // turn this into a reported failure (the next scan repairs it).
                    let _ = refresh_track_row(&conn, &id, &path, &artwork_dir);
                    if let Some(n) = edit.rating {
                        // The file now carries this rating: nothing is pending any more.
                        let _ = conn.execute("UPDATE tracks SET rating=?2,rating_dirty=0 WHERE id=?1", params![id, n.min(5) as i64]);
                    }
                    if let Ok(mut cache) = art_cache.lock() {
                        cache.remove(&id);
                    }
                    ok.push(id);
                }
                Err(error) => failed.push(TagWriteFailure { id, path, error }),
            }
        }
        Ok(TagWriteResult { ok, failed })
    })
    .await
    .map_err(|e| e.to_string())?
}

/// One edit applied to every listed file.
#[tauri::command]
pub async fn tag_write(track_ids: Vec<String>, edit: crate::tag_edit::TagEdit, state: State<'_, LibraryState>) -> Result<TagWriteResult, String> {
    if edit.is_empty() {
        return Ok(TagWriteResult { ok: Vec::new(), failed: Vec::new() });
    }
    write_tag_items(track_ids.into_iter().map(|id| (id, edit.clone())).collect(), &state).await
}

/// A DIFFERENT edit per file (tag-from-filename, numbering, find/replace).
#[tauri::command]
pub async fn tag_write_each(items: Vec<TagWriteItem>, state: State<'_, LibraryState>) -> Result<TagWriteResult, String> {
    write_tag_items(items.into_iter().map(|i| (i.track_id, i.edit)).collect(), &state).await
}

// ───────────────────────── smart playlists (round 126) ─────────────────────────
//
// A smart playlist is a playlist row (kind 'smart') with its rules as JSON.
// Its tracks are MATERIALISED into `playlist_tracks` like the automatic ones,
// so paging, search, sorting, totals, play / queue and M3U export all work
// unchanged. They are re-evaluated when the playlist list is read and when the
// first page of the playlist is requested; if the result is identical nothing
// is written (entry ids stay stable).

const MAX_SMART_RULES: usize = 10;
const MAX_SMART_LIMIT: u32 = 100_000;

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct SmartRule {
    /// Only "rating" for now; the structure leaves room for more fields.
    pub field: String,
    /// is | isNot | atLeast | atMost | between
    pub op: String,
    pub value: i64,
    #[serde(default)]
    pub value2: i64,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct SmartRules {
    pub rules: Vec<SmartRule>,
    /// true: every rule must match; false: any rule.
    #[serde(default = "smart_default_match_all")]
    pub match_all: bool,
    /// title | artist | rating-desc | added-desc | plays-desc
    #[serde(default = "smart_default_sort")]
    pub sort: String,
    #[serde(default)]
    pub limit: Option<u32>,
}

fn smart_default_match_all() -> bool { true }
fn smart_default_sort() -> String { "title".into() }

/// Checks and normalises rules from the UI (values are inserted into SQL as
/// integers, so everything is range-checked here).
pub fn validate_smart_rules(input: &SmartRules) -> Result<SmartRules, String> {
    if input.rules.is_empty() {
        return Err("Add at least one rule".into());
    }
    if input.rules.len() > MAX_SMART_RULES {
        return Err(format!("A smart playlist can have at most {MAX_SMART_RULES} rules"));
    }
    let mut rules = Vec::new();
    for r in &input.rules {
        if r.field != "rating" {
            return Err(format!("Unknown rule field \"{}\"", r.field));
        }
        if !matches!(r.op.as_str(), "is" | "isNot" | "atLeast" | "atMost" | "between") {
            return Err(format!("Unknown rule \"{}\"", r.op));
        }
        if !(0..=5).contains(&r.value) || !(0..=5).contains(&r.value2) {
            return Err("Stars must be between 0 and 5".into());
        }
        let mut rule = r.clone();
        if rule.op == "between" {
            if rule.value > rule.value2 { std::mem::swap(&mut rule.value, &mut rule.value2); }
        } else {
            rule.value2 = 0;
        }
        rules.push(rule);
    }
    let sort = match input.sort.as_str() {
        "title" | "artist" | "rating-desc" | "added-desc" | "plays-desc" => input.sort.clone(),
        other => return Err(format!("Unknown sort \"{other}\"")),
    };
    let limit = match input.limit {
        Some(0) | None => None,
        Some(n) if n <= MAX_SMART_LIMIT => Some(n),
        Some(_) => return Err(format!("The limit can be at most {MAX_SMART_LIMIT} tracks")),
    };
    Ok(SmartRules { rules, match_all: input.match_all, sort, limit })
}

fn smart_condition(r: &SmartRule) -> String {
    match r.op.as_str() {
        "is" => format!("rating = {}", r.value),
        "isNot" => format!("rating <> {}", r.value),
        "atLeast" => format!("rating >= {}", r.value),
        "atMost" => format!("rating <= {}", r.value),
        _ => format!("rating BETWEEN {} AND {}", r.value, r.value2),
    }
}

/// `SELECT id ...` for already validated rules.
fn smart_select_sql(rules: &SmartRules) -> String {
    let glue = if rules.match_all { " AND " } else { " OR " };
    let cond = rules.rules.iter().map(|r| format!("({})", smart_condition(r))).collect::<Vec<_>>().join(glue);
    let order = match rules.sort.as_str() {
        "artist" => "artist COLLATE NOCASE, album COLLATE NOCASE, title COLLATE NOCASE, id",
        "rating-desc" => "rating DESC, title COLLATE NOCASE, id",
        "added-desc" => "added_at DESC, id",
        "plays-desc" => "play_count DESC, title COLLATE NOCASE, id",
        _ => "title COLLATE NOCASE, artist COLLATE NOCASE, id",
    };
    let limit = rules.limit.map(|n| format!(" LIMIT {n}")).unwrap_or_default();
    format!("SELECT id FROM tracks WHERE library_owned=1 AND ({cond}) ORDER BY {order}{limit}")
}

fn read_smart_rules(conn: &Connection, playlist_id: &str) -> Result<Option<SmartRules>, String> {
    let row: Option<(String, Option<String>)> = conn
        .query_row("SELECT kind,rules FROM playlists WHERE id=?1", params![playlist_id], |r| Ok((r.get(0)?, r.get(1)?)))
        .optional()
        .map_err(|e| e.to_string())?;
    match row {
        Some((kind, Some(json))) if kind == "smart" => serde_json::from_str::<SmartRules>(&json).map(Some).map_err(|e| format!("The smart playlist's rules are damaged: {e}")),
        _ => Ok(None),
    }
}

/// Re-evaluates one smart playlist; writes only when the result changed.
fn refresh_smart_playlist(conn: &Connection, playlist_id: &str, rules: &SmartRules) -> Result<(), String> {
    let wanted: Vec<String> = {
        let mut stmt = conn.prepare(&smart_select_sql(rules)).map_err(|e| e.to_string())?;
        let rows = stmt.query_map([], |r| r.get::<_, String>(0)).map_err(|e| e.to_string())?;
        rows.filter_map(log_skipped).collect()
    };
    sync_playlist_entries(conn, playlist_id, &wanted)
}

fn refresh_if_smart(conn: &Connection, playlist_id: &str) -> Result<(), String> {
    match read_smart_rules(conn, playlist_id)? {
        Some(rules) => refresh_smart_playlist(conn, playlist_id, &rules),
        None => Ok(()),
    }
}

fn refresh_all_smart(conn: &Connection) -> Result<(), String> {
    let ids: Vec<String> = {
        let mut stmt = conn.prepare("SELECT id FROM playlists WHERE kind='smart'").map_err(|e| e.to_string())?;
        let rows = stmt.query_map([], |r| r.get::<_, String>(0)).map_err(|e| e.to_string())?;
        rows.filter_map(log_skipped).collect()
    };
    for id in ids {
        // One damaged playlist must not hide all the others.
        if let Err(e) = refresh_if_smart(conn, &id) { eprintln!("smart playlist {id}: {e}"); }
    }
    Ok(())
}

fn playlist_row_of(conn: &Connection, playlist_id: &str) -> Result<PlaylistRow, String> {
    conn.query_row(
        "SELECT p.id,p.name,p.created_at,COUNT(pt.track_id),p.kind FROM playlists p LEFT JOIN playlist_tracks pt ON pt.playlist_id=p.id WHERE p.id=?1 GROUP BY p.id",
        params![playlist_id],
        |r| Ok(PlaylistRow { id: r.get(0)?, name: r.get(1)?, created_at: r.get(2)?, track_count: r.get(3)?, kind: r.get(4)? }),
    ).map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn create_smart_playlist(name: String, rules: SmartRules, state: State<'_, LibraryState>) -> Result<PlaylistRow, String> {
    let rules = validate_smart_rules(&rules)?;
    let conn = locked_db(&state)?;
    let name = unique_playlist_name(&conn, &validate_playlist_name(&name)?)?;
    let id = new_playlist_id();
    let json = serde_json::to_string(&rules).map_err(|e| e.to_string())?;
    conn.execute("INSERT INTO playlists(id,name,created_at,kind,rules) VALUES(?1,?2,?3,'smart',?4)", params![id, name, now_ms(), json]).map_err(|e| e.to_string())?;
    refresh_smart_playlist(&conn, &id, &rules)?;
    playlist_row_of(&conn, &id)
}

#[tauri::command]
pub async fn update_smart_playlist(playlist_id: String, name: String, rules: SmartRules, state: State<'_, LibraryState>) -> Result<PlaylistRow, String> {
    let rules = validate_smart_rules(&rules)?;
    let name = validate_playlist_name(&name)?;
    let conn = locked_db(&state)?;
    let kind: Option<String> = conn.query_row("SELECT kind FROM playlists WHERE id=?1", params![playlist_id], |r| r.get(0)).optional().map_err(|e| e.to_string())?;
    if kind.as_deref() != Some("smart") {
        return Err("This is not a smart playlist".into());
    }
    let collision = conn
        .query_row("SELECT 1 FROM playlists WHERE name=?1 COLLATE NOCASE AND id<>?2", params![name, playlist_id], |_| Ok(()))
        .optional()
        .map_err(|e| e.to_string())?
        .is_some();
    if collision {
        return Err("Another playlist already has this name".into());
    }
    let json = serde_json::to_string(&rules).map_err(|e| e.to_string())?;
    conn.execute("UPDATE playlists SET name=?2,rules=?3 WHERE id=?1", params![playlist_id, name, json]).map_err(|e| e.to_string())?;
    refresh_smart_playlist(&conn, &playlist_id, &rules)?;
    playlist_row_of(&conn, &playlist_id)
}

/// The rules of a smart playlist (for the edit dialog).
#[tauri::command]
pub async fn smart_playlist_rules(playlist_id: String, state: State<'_, LibraryState>) -> Result<Option<SmartRules>, String> {
    let conn = locked_db(&state)?;
    read_smart_rules(&conn, &playlist_id)
}

// ───────────────────────── star ratings (round 125) ─────────────────────────

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct RatingItem {
    pub track_id: String,
    pub stars: u8,
}

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct RatingState {
    pub id: String,
    pub rating: u8,
    /// True while the value is only in the database (not yet in the file's tag).
    pub pending: bool,
}

#[derive(Debug, Serialize, Default)]
#[serde(rename_all = "camelCase")]
pub struct RatingSetResult {
    /// Written to the file's tag.
    pub written: Vec<String>,
    /// File paths of `written` (the player drops its cached copies of them).
    pub paths: Vec<String>,
    /// Saved in the database; the file write waits (playing track).
    pub pending: Vec<String>,
    /// Saved in the database; writing the file failed (will be retried).
    pub failed: Vec<TagWriteFailure>,
}

/// Writes only the rating into the file's tag (one atomic replace).
fn write_rating_file(path: &Path, stars: u8) -> Result<(), String> {
    if is_mka(path) { return Ok(()); }
    let mut tagged = read_tagged_tolerant(path)?;
    let edit = crate::tag_edit::TagEdit { rating: Some(stars), ..Default::default() };
    crate::tag_edit::apply_edit(&mut tagged, &edit, None)?;
    crate::tag_edit::write_safely_rated(path, &tagged, Some(stars))
}

/// After a successful file write: nothing pending any more, and the stored
/// size / modified time follow the file so the next scan does not re-read it.
/// Only when the rating was not changed again in the meantime.
fn mark_rating_written(conn: &Connection, id: &str, path: &Path, stars: u8) {
    let Ok(meta) = std::fs::metadata(path) else { return };
    let modified = meta.modified().ok().and_then(|m| m.duration_since(UNIX_EPOCH).ok()).map(|d| d.as_secs() as i64).unwrap_or(0);
    let _ = conn.execute(
        "UPDATE tracks SET rating_dirty=0,file_size=?3,modified_at=?4 WHERE id=?1 AND rating=?2",
        params![id, stars as i64, meta.len() as i64, modified],
    );
}

/// Database first (always instant), then the files. Paths in `defer` (the
/// track that is playing) are only marked pending.
pub fn set_ratings_blocking(db_path: &Path, items: Vec<RatingItem>, defer: &[String]) -> Result<RatingSetResult, String> {
    let mut conn = open_db(db_path)?;
    {
        let tx = conn.transaction().map_err(|e| e.to_string())?;
        for it in &items {
            tx.execute(
                "UPDATE tracks SET rating=?2,rating_dirty=CASE WHEN lower(path) LIKE '%.mka' THEN 0 ELSE 1 END WHERE id=?1",
                params![it.track_id, it.stars.min(5) as i64],
            ).map_err(|e| e.to_string())?;
        }
        tx.commit().map_err(|e| e.to_string())?;
    }
    let mut out = RatingSetResult::default();
    for it in items {
        let stars = it.stars.min(5);
        let Some(path) = track_path_of(&conn, &it.track_id)? else { continue };
        if is_mka(Path::new(&path)) { out.written.push(it.track_id); continue; }
        if defer.iter().any(|d| d == &path) { out.pending.push(it.track_id); continue; }
        match write_rating_file(Path::new(&path), stars) {
            Ok(()) => { mark_rating_written(&conn, &it.track_id, Path::new(&path), stars); out.paths.push(path); out.written.push(it.track_id); }
            Err(error) => out.failed.push(TagWriteFailure { id: it.track_id, path, error }),
        }
    }
    Ok(out)
}

/// Writes every pending rating except for the paths in `avoid`.
pub fn flush_ratings_blocking(db_path: &Path, avoid: &[String]) -> Result<RatingSetResult, String> {
    let conn = open_db(db_path)?;
    let rows: Vec<(String, String, i64)> = {
        let mut stmt = conn.prepare("SELECT id,path,rating FROM tracks WHERE rating_dirty=1").map_err(|e| e.to_string())?;
        let mapped = stmt.query_map([], |r| Ok((r.get(0)?, r.get(1)?, r.get(2)?))).map_err(|e| e.to_string())?;
        mapped.filter_map(log_skipped).collect()
    };
    let mut out = RatingSetResult::default();
    for (id, path, rating) in rows {
        if avoid.iter().any(|a| a == &path) { out.pending.push(id); continue; }
        let stars = rating.clamp(0, 5) as u8;
        match write_rating_file(Path::new(&path), stars) {
            Ok(()) => { mark_rating_written(&conn, &id, Path::new(&path), stars); out.paths.push(path); out.written.push(id); }
            Err(error) => out.failed.push(TagWriteFailure { id, path, error }),
        }
    }
    Ok(out)
}

/// Rating of a file without reading its audio properties.
fn read_rating_of_file(path: &Path) -> u8 {
    if is_mka(path) { return 0; }
    use lofty::config::ParseOptions;
    use lofty::file::TaggedFileExt;
    let Ok(probe) = lofty::probe::Probe::open(path) else { return 0 };
    let Ok(tagged) = probe.options(ParseOptions::new().read_properties(false)).read() else { return 0 };
    if crate::tag_edit::is_mpeg(&tagged) { return crate::tag_edit::read_rating_mpeg(path); }
    tagged.primary_tag().or_else(|| tagged.first_tag()).map(crate::tag_edit::read_rating).unwrap_or(0)
}

/// One-time import of the ratings already stored in the files' tags (the scan
/// only re-reads files that changed). Safe to interrupt: it simply runs again
/// at the next start. Pending (dirty) ratings are never overwritten.
pub fn backfill_ratings_blocking(db_path: &Path) -> Result<(), String> {
    let mut conn = open_db(db_path)?;
    let ver: i64 = conn.query_row("PRAGMA user_version", [], |r| r.get(0)).map_err(|e| e.to_string())?;
    if ver >= 2 { return Ok(()); }
    let rows: Vec<(String, String)> = {
        let mut stmt = conn.prepare("SELECT id,path FROM tracks WHERE rating_dirty=0").map_err(|e| e.to_string())?;
        let mapped = stmt.query_map([], |r| Ok((r.get(0)?, r.get(1)?))).map_err(|e| e.to_string())?;
        mapped.filter_map(log_skipped).collect()
    };
    for chunk in rows.chunks(400) {
        let found: Vec<(&String, u8)> = chunk.iter().map(|(id, path)| (id, read_rating_of_file(Path::new(path)))).collect();
        let tx = conn.transaction().map_err(|e| e.to_string())?;
        for (id, stars) in found {
            if stars > 0 {
                tx.execute("UPDATE tracks SET rating=?2 WHERE id=?1 AND rating_dirty=0", params![id, stars as i64]).map_err(|e| e.to_string())?;
            }
        }
        tx.commit().map_err(|e| e.to_string())?;
    }
    conn.execute_batch("PRAGMA user_version = 2;").map_err(|e| e.to_string())
}

/// Background work at start-up: import existing ratings once, then write the
/// ratings that were still pending when the app last closed.
pub fn spawn_rating_startup(db_path: PathBuf) {
    std::thread::spawn(move || {
        std::thread::sleep(std::time::Duration::from_secs(3));
        let _ = backfill_ratings_blocking(&db_path);
        let _ = flush_ratings_blocking(&db_path, &[]);
    });
}

/// Stars for the given tracks (pending = not yet in the file).
#[tauri::command]
pub async fn ratings_of(track_ids: Vec<String>, state: State<'_, LibraryState>) -> Result<Vec<RatingState>, String> {
    let conn = locked_db(&state)?;
    let mut out = Vec::with_capacity(track_ids.len());
    for id in track_ids {
        let row: Option<(i64, i64)> = conn
            .query_row("SELECT rating,rating_dirty FROM tracks WHERE id=?1", params![id], |r| Ok((r.get(0)?, r.get(1)?)))
            .optional()
            .map_err(|e| e.to_string())?;
        if let Some((r, d)) = row {
            out.push(RatingState { id, rating: r.clamp(0, 5) as u8, pending: d == 1 });
        }
    }
    Ok(out)
}

/// Sets the stars of one or many tracks. `defer_paths`: files that must not be
/// rewritten right now (the one that is playing).
#[tauri::command]
pub async fn rating_set(items: Vec<RatingItem>, defer_paths: Vec<String>, state: State<'_, LibraryState>) -> Result<RatingSetResult, String> {
    let db_path = state.db_path.clone();
    tauri::async_runtime::spawn_blocking(move || set_ratings_blocking(&db_path, items, &defer_paths))
        .await
        .map_err(|e| e.to_string())?
}

/// Writes the ratings that are still pending (called when the playing track
/// changes). `avoid_paths` are skipped.
#[tauri::command]
pub async fn rating_flush(avoid_paths: Vec<String>, state: State<'_, LibraryState>) -> Result<RatingSetResult, String> {
    let db_path = state.db_path.clone();
    tauri::async_runtime::spawn_blocking(move || flush_ratings_blocking(&db_path, &avoid_paths))
        .await
        .map_err(|e| e.to_string())?
}

#[cfg(test)]
mod natural_file_tests {
    use super::natural_file_cmp;

    fn sorted(mut v: Vec<&str>) -> Vec<&str> {
        v.sort_by(|a, b| natural_file_cmp(a, b));
        v
    }

    #[test]
    fn digits_compare_as_numbers() {
        assert_eq!(
            sorted(vec!["track100.mp3", "track2.mp3", "track10.mp3", "track03.mp3"]),
            vec!["track2.mp3", "track03.mp3", "track10.mp3", "track100.mp3"]
        );
    }

    #[test]
    fn directory_case_and_extension() {
        assert_eq!(sorted(vec!["C:\\m\\b.mp3", "/x/A.flac"]), vec!["/x/A.flac", "C:\\m\\b.mp3"]);
        assert_eq!(sorted(vec!["Track2.mp3", "track1.mp3"]), vec!["track1.mp3", "Track2.mp3"]);
    }

    #[test]
    fn collation_is_registered_on_real_connections() {
        let dir = std::env::temp_dir().join(format!("melo-collation-{}", std::process::id()));
        std::fs::create_dir_all(&dir).unwrap();
        let conn = super::open_db(&dir.join("t.db")).unwrap();
        conn.execute_batch("CREATE TABLE t(p TEXT); INSERT INTO t VALUES('C:\\m\\track10.mp3'),('/x/track2.mp3'),(''),('/x/Track03.flac'),('/x/track100.mp3');").unwrap();
        let mut stmt = conn.prepare("SELECT p FROM t ORDER BY p COLLATE MELO_FILENAME").unwrap();
        let rows: Vec<String> = stmt.query_map([], |r| r.get(0)).unwrap().map(|r| r.unwrap()).collect();
        assert_eq!(rows, vec!["/x/track2.mp3", "/x/Track03.flac", "C:\\m\\track10.mp3", "/x/track100.mp3", ""]);
        drop(stmt);
        drop(conn);
        let _ = std::fs::remove_dir_all(&dir);
    }

    #[test]
    fn padding_tie_and_empty_last() {
        assert_eq!(sorted(vec!["t02.mp3", "t2.mp3"]), vec!["t2.mp3", "t02.mp3"]);
        assert_eq!(sorted(vec!["", "a.mp3"]), vec!["a.mp3", ""]);
    }
}

#[cfg(test)]
mod purge_tests {
    use super::*;

    #[test]
    fn deleting_a_track_forgets_its_listens_but_keeps_others() {
        let conn = Connection::open_in_memory().unwrap();
        conn.execute_batch(
            "CREATE TABLE tracks (id TEXT PRIMARY KEY);
             CREATE TABLE listen_log (id INTEGER PRIMARY KEY AUTOINCREMENT, track_id TEXT NOT NULL, started_at INTEGER NOT NULL, seconds REAL NOT NULL, counted INTEGER NOT NULL DEFAULT 0);
             INSERT INTO tracks VALUES ('a'),('b');
             INSERT INTO listen_log(track_id,started_at,seconds,counted) VALUES ('a',1,10,1),('a',2,10,1),('b',3,10,1);",
        ).unwrap();
        conn.execute("DELETE FROM tracks WHERE id='a'", []).unwrap();
        assert_eq!(purge_orphan_listens(&conn).unwrap(), 2);
        let left: i64 = conn.query_row("SELECT COUNT(*) FROM listen_log", [], |r| r.get(0)).unwrap();
        assert_eq!(left, 1);
        // Re-adding the same id must not resurrect anything.
        conn.execute("INSERT INTO tracks VALUES ('a')", []).unwrap();
        let again: i64 = conn.query_row("SELECT COUNT(*) FROM listen_log WHERE track_id='a'", [], |r| r.get(0)).unwrap();
        assert_eq!(again, 0);
    }
}

#[cfg(test)]
mod entry_track_tests {
    use super::*;

    #[test]
    fn entries_resolve_to_distinct_tracks_in_list_order() {
        let conn = Connection::open_in_memory().unwrap();
        conn.execute_batch(
            "CREATE TABLE queue (entry_id INTEGER PRIMARY KEY, track_id TEXT NOT NULL, position INTEGER NOT NULL);
             CREATE TABLE playlist_tracks (entry_id INTEGER PRIMARY KEY, playlist_id TEXT NOT NULL, track_id TEXT NOT NULL, position INTEGER NOT NULL);
             INSERT INTO queue VALUES (1,'a',0),(2,'b',1),(3,'a',2);
             INSERT INTO playlist_tracks VALUES (10,'p','x',1),(11,'p','y',0),(12,'q','z',0);",
        ).unwrap();
        // the same track queued twice counts once
        assert_eq!(entry_track_ids_in(&conn, "queue", &[3, 1, 2]).unwrap(), vec!["a", "b"]);
        // list order, not request order; other playlists are ignored
        assert_eq!(entry_track_ids_in(&conn, "p", &[10, 11, 12]).unwrap(), vec!["y", "x"]);
        assert!(entry_track_ids_in(&conn, "queue", &[99]).unwrap().is_empty());
    }
}

#[cfg(test)]
mod rename_row_tests {
    use super::*;

    #[test]
    fn id_moves_through_every_table_with_foreign_keys_on() {
        let mut conn = Connection::open_in_memory().unwrap();
        conn.pragma_update(None, "foreign_keys", "ON").unwrap();
        conn.execute_batch(
            "CREATE TABLE tracks (id TEXT PRIMARY KEY, path TEXT NOT NULL UNIQUE);
             CREATE TABLE playlist_tracks (entry_id INTEGER PRIMARY KEY, playlist_id TEXT NOT NULL, track_id TEXT NOT NULL REFERENCES tracks(id) ON DELETE CASCADE, position INTEGER NOT NULL);
             CREATE TABLE queue (entry_id INTEGER PRIMARY KEY, track_id TEXT NOT NULL REFERENCES tracks(id) ON DELETE CASCADE, position INTEGER NOT NULL);
             CREATE TABLE listen_log (id INTEGER PRIMARY KEY AUTOINCREMENT, track_id TEXT NOT NULL, started_at INTEGER NOT NULL, seconds REAL NOT NULL, counted INTEGER NOT NULL DEFAULT 0);
             INSERT INTO tracks VALUES ('/m/a.mp3','/m/a.mp3'),('/m/other.mp3','/m/other.mp3');
             INSERT INTO playlist_tracks VALUES (1,'p','/m/a.mp3',0),(2,'p','/m/other.mp3',1);
             INSERT INTO queue VALUES (1,'/m/a.mp3',0),(2,'/m/a.mp3',1);
             INSERT INTO listen_log(track_id,started_at,seconds,counted) VALUES ('/m/a.mp3',1,30,1),('/m/other.mp3',2,30,1);",
        ).unwrap();
        let tx = conn.transaction().unwrap();
        tx.pragma_update(None, "defer_foreign_keys", "ON").unwrap();
        let id = move_track_rows(&tx, "/m/a.mp3", "/m/a.mp3", "/m/b.mp3").unwrap();
        tx.commit().unwrap();
        assert_eq!(id, "/m/b.mp3");
        let count = |sql: &str| -> i64 { conn.query_row(sql, [], |r| r.get(0)).unwrap() };
        assert_eq!(count("SELECT COUNT(*) FROM tracks WHERE id='/m/b.mp3' AND path='/m/b.mp3'"), 1);
        assert_eq!(count("SELECT COUNT(*) FROM tracks WHERE id='/m/a.mp3'"), 0);
        assert_eq!(count("SELECT COUNT(*) FROM playlist_tracks WHERE track_id='/m/b.mp3'"), 1);
        assert_eq!(count("SELECT COUNT(*) FROM queue WHERE track_id='/m/b.mp3'"), 2);
        assert_eq!(count("SELECT COUNT(*) FROM listen_log WHERE track_id='/m/b.mp3'"), 1);
        // the other track is untouched and the foreign keys still hold
        assert_eq!(count("SELECT COUNT(*) FROM playlist_tracks WHERE track_id='/m/other.mp3'"), 1);
        let violations: i64 = conn.query_row("SELECT COUNT(*) FROM pragma_foreign_key_check", [], |r| r.get(0)).unwrap();
        assert_eq!(violations, 0);
    }

    #[test]
    fn a_taken_path_fails_and_rolls_back() {
        let mut conn = Connection::open_in_memory().unwrap();
        conn.execute_batch("CREATE TABLE tracks (id TEXT PRIMARY KEY, path TEXT NOT NULL UNIQUE);
            INSERT INTO tracks VALUES ('/m/a.mp3','/m/a.mp3'),('/m/b.mp3','/m/b.mp3');").unwrap();
        let tx = conn.transaction().unwrap();
        assert!(move_track_rows(&tx, "/m/a.mp3", "/m/a.mp3", "/m/b.mp3").is_err());
        drop(tx);
        let n: i64 = conn.query_row("SELECT COUNT(*) FROM tracks WHERE id='/m/a.mp3'", [], |r| r.get(0)).unwrap();
        assert_eq!(n, 1);
    }
}

#[cfg(test)]
mod rating_tests {
    use super::*;
    use std::sync::atomic::{AtomicUsize, Ordering};

    static N: AtomicUsize = AtomicUsize::new(0);
    const MP3: &[u8] = include_bytes!("../../tools/tag-edit-test/fixtures/base.mp3");
    const FLAC: &[u8] = include_bytes!("../../tools/tag-edit-test/fixtures/base.flac");

    struct Env { dir: PathBuf, db: PathBuf, art: PathBuf }
    fn env() -> Env {
        let dir = std::env::temp_dir().join(format!("melo-rating-test-{}-{}", std::process::id(), N.fetch_add(1, Ordering::SeqCst)));
        let _ = std::fs::remove_dir_all(&dir);
        std::fs::create_dir_all(&dir).unwrap();
        let db = dir.join("library.db");
        let conn = open_db(&db).unwrap();
        init_schema(&conn).unwrap();
        Env { art: dir.join("art"), dir, db }
    }
    fn add(e: &Env, name: &str, bytes: &[u8]) -> String {
        let p = e.dir.join(name);
        std::fs::write(&p, bytes).unwrap();
        let conn = open_db(&e.db).unwrap();
        let (t, size, modified) = parse_track_cached(&p, &e.art, false).unwrap();
        upsert_track(&conn, &t, size, modified, None, true).unwrap();
        t.id
    }
    fn db_rating(e: &Env, id: &str) -> (i64, i64) {
        open_db(&e.db).unwrap().query_row("SELECT rating,rating_dirty FROM tracks WHERE id=?1", params![id], |r| Ok((r.get(0)?, r.get(1)?))).unwrap()
    }
    fn file_rating(id: &str) -> u8 {
        let t = read_tagged_tolerant(Path::new(id)).unwrap();
        crate::tag_edit::read_fields_at(Path::new(id), &t).rating
    }
    fn item(id: &str, stars: u8) -> Vec<RatingItem> { vec![RatingItem { track_id: id.into(), stars }] }

    #[test]
    fn setting_a_rating_writes_the_file_and_clears_the_pending_flag() {
        let e = env();
        for (name, bytes) in [("a.mp3", MP3), ("a.flac", FLAC)] {
            let id = add(&e, name, bytes);
            assert_eq!(db_rating(&e, &id), (0, 0));
            let r = set_ratings_blocking(&e.db, item(&id, 4), &[]).unwrap();
            assert_eq!(r.written, vec![id.clone()], "{name}");
            assert_eq!(r.paths, vec![id.clone()], "{name}: written paths are reported for the player");
            assert_eq!(db_rating(&e, &id), (4, 0), "{name}");
            assert_eq!(file_rating(&id), 4, "{name}");
            // the stored stamp follows the file, so a scan skips it
            let conn = open_db(&e.db).unwrap();
            assert!(unchanged(&conn, Path::new(&id), std::fs::metadata(&id).unwrap().len(), std::fs::metadata(&id).unwrap().modified().unwrap().duration_since(UNIX_EPOCH).unwrap().as_secs() as i64), "{name}");
        }
        let _ = std::fs::remove_dir_all(&e.dir);
    }

    #[test]
    fn the_playing_track_is_deferred_then_flushed() {
        let e = env();
        let id = add(&e, "p.mp3", MP3);
        let r = set_ratings_blocking(&e.db, item(&id, 5), &[id.clone()]).unwrap();
        assert_eq!(r.pending, vec![id.clone()]);
        assert_eq!(db_rating(&e, &id), (5, 1));
        assert_eq!(file_rating(&id), 0, "file untouched while deferred");
        // still playing: nothing happens
        let r = flush_ratings_blocking(&e.db, &[id.clone()]).unwrap();
        assert_eq!(r.pending, vec![id.clone()]);
        assert_eq!(db_rating(&e, &id), (5, 1));
        // track changed: written
        let r = flush_ratings_blocking(&e.db, &[]).unwrap();
        assert_eq!(r.written, vec![id.clone()]);
        assert_eq!(r.paths, vec![id.clone()]);
        assert_eq!(db_rating(&e, &id), (5, 0));
        assert_eq!(file_rating(&id), 5);
        let _ = std::fs::remove_dir_all(&e.dir);
    }

    #[test]
    fn a_pending_rating_survives_a_scan_but_a_clean_one_follows_the_file() {
        let e = env();
        let id = add(&e, "s.mp3", MP3);
        set_ratings_blocking(&e.db, item(&id, 3), &[id.clone()]).unwrap(); // pending
        // another program changes the file (rating 1) -> the scan re-reads it
        let mut t = read_tagged_tolerant(Path::new(&id)).unwrap();
        let edit = crate::tag_edit::TagEdit { rating: Some(1), ..Default::default() };
        crate::tag_edit::apply_edit(&mut t, &edit, None).unwrap();
        crate::tag_edit::write_safely_rated(Path::new(&id), &t, Some(1)).unwrap();
        let conn = open_db(&e.db).unwrap();
        let (tr, size, modified) = parse_track_cached(Path::new(&id), &e.art, false).unwrap();
        assert_eq!(tr.rating, 1);
        upsert_track(&conn, &tr, size, modified, None, true).unwrap();
        assert_eq!(db_rating(&e, &id), (3, 1), "pending value wins over the scan");
        // once written, the file is the truth again: an external change is imported
        flush_ratings_blocking(&e.db, &[]).unwrap();
        assert_eq!(db_rating(&e, &id), (3, 0));
        let mut t = read_tagged_tolerant(Path::new(&id)).unwrap();
        let edit = crate::tag_edit::TagEdit { rating: Some(2), ..Default::default() };
        crate::tag_edit::apply_edit(&mut t, &edit, None).unwrap();
        crate::tag_edit::write_safely_rated(Path::new(&id), &t, Some(2)).unwrap();
        let (tr, size, modified) = parse_track_cached(Path::new(&id), &e.art, false).unwrap();
        upsert_track(&conn, &tr, size, modified, None, true).unwrap();
        assert_eq!(db_rating(&e, &id), (2, 0));
        let _ = std::fs::remove_dir_all(&e.dir);
    }

    #[test]
    fn a_failed_file_write_keeps_the_rating_pending() {
        let e = env();
        let id = add(&e, "f.mp3", MP3);
        std::fs::remove_file(&id).unwrap(); // the file vanished
        let r = set_ratings_blocking(&e.db, item(&id, 4), &[]).unwrap();
        assert_eq!(r.failed.len(), 1);
        assert_eq!(db_rating(&e, &id), (4, 1), "database value kept, retried later");
        let _ = std::fs::remove_dir_all(&e.dir);
    }

    #[test]
    fn a_newer_click_is_not_marked_written_by_an_older_write() {
        let e = env();
        let id = add(&e, "n.mp3", MP3);
        set_ratings_blocking(&e.db, item(&id, 2), &[id.clone()]).unwrap();
        set_ratings_blocking(&e.db, item(&id, 5), &[id.clone()]).unwrap();
        let conn = open_db(&e.db).unwrap();
        mark_rating_written(&conn, &id, Path::new(&id), 2); // an old write finishing late
        assert_eq!(db_rating(&e, &id), (5, 1));
        let _ = std::fs::remove_dir_all(&e.dir);
    }

    #[test]
    fn backfill_imports_existing_ratings_once() {
        let e = env();
        let id = add(&e, "b.mp3", MP3);
        // give the file a rating behind the database's back, and reset the version
        let mut t = read_tagged_tolerant(Path::new(&id)).unwrap();
        let edit = crate::tag_edit::TagEdit { rating: Some(4), ..Default::default() };
        crate::tag_edit::apply_edit(&mut t, &edit, None).unwrap();
        crate::tag_edit::write_safely_rated(Path::new(&id), &t, Some(4)).unwrap();
        let conn = open_db(&e.db).unwrap();
        conn.execute_batch("PRAGMA user_version = 1;").unwrap();
        assert_eq!(db_rating(&e, &id), (0, 0));
        backfill_ratings_blocking(&e.db).unwrap();
        assert_eq!(db_rating(&e, &id), (4, 0));
        let ver: i64 = conn.query_row("PRAGMA user_version", [], |r| r.get(0)).unwrap();
        assert_eq!(ver, 2);
        let _ = std::fs::remove_dir_all(&e.dir);
    }
}

#[cfg(test)]
mod smart_tests {
    use super::*;
    use std::sync::atomic::{AtomicUsize, Ordering};

    static N: AtomicUsize = AtomicUsize::new(0);
    const MP3: &[u8] = include_bytes!("../../tools/tag-edit-test/fixtures/base.mp3");

    fn db() -> (PathBuf, Connection) {
        let dir = std::env::temp_dir().join(format!("melo-smart-test-{}-{}", std::process::id(), N.fetch_add(1, Ordering::SeqCst)));
        let _ = std::fs::remove_dir_all(&dir);
        std::fs::create_dir_all(&dir).unwrap();
        let conn = open_db(&dir.join("library.db")).unwrap();
        init_schema(&conn).unwrap();
        (dir, conn)
    }
    /// One real file per (title, rating); a row per call.
    fn add(dir: &Path, conn: &Connection, title: &str, rating: i64, owned: bool) -> String {
        let p = dir.join(format!("{title}.mp3"));
        std::fs::write(&p, MP3).unwrap();
        let (t, size, modified) = parse_track_cached(&p, &dir.join("art"), false).unwrap();
        upsert_track(conn, &t, size, modified, None, owned).unwrap();
        conn.execute("UPDATE tracks SET title=?2,rating=?3 WHERE id=?1", params![t.id, title, rating]).unwrap();
        t.id
    }
    fn rule(op: &str, a: i64, b: i64) -> SmartRule { SmartRule { field: "rating".into(), op: op.into(), value: a, value2: b } }
    fn rules(rs: Vec<SmartRule>, all: bool, sort: &str, limit: Option<u32>) -> SmartRules { SmartRules { rules: rs, match_all: all, sort: sort.into(), limit } }
    fn ids(conn: &Connection, r: &SmartRules) -> Vec<String> {
        let v = validate_smart_rules(r).unwrap();
        let mut stmt = conn.prepare(&smart_select_sql(&v)).unwrap();
        let rows = stmt.query_map([], |r| r.get::<_, String>(0)).unwrap();
        rows.map(|x| x.unwrap()).collect()
    }
    fn titles(conn: &Connection, r: &SmartRules) -> Vec<String> {
        ids(conn, r).iter().map(|id| conn.query_row("SELECT title FROM tracks WHERE id=?1", params![id], |x| x.get::<_, String>(0)).unwrap()).collect()
    }

    #[test]
    fn auto_playlists_are_not_rewritten_when_nothing_changed() {
        let (dir, conn) = db();
        add(&dir, &conn, "one", 0, true);
        add(&dir, &conn, "two", 0, true);
        ensure_auto_playlists(&conn).unwrap();
        let entries = |c: &Connection| -> Vec<(i64, String)> {
            let mut st = c.prepare("SELECT entry_id,playlist_id FROM playlist_tracks ORDER BY entry_id").unwrap();
            st.query_map([], |r| Ok((r.get(0)?, r.get(1)?))).unwrap().map(|x| x.unwrap()).collect()
        };
        let before = entries(&conn);
        assert!(!before.is_empty(), "Recently Added is filled");
        let total = |c: &Connection| -> i64 { c.query_row("SELECT total_changes()", [], |r| r.get(0)).unwrap() };
        let changes = total(&conn);
        ensure_auto_playlists(&conn).unwrap();
        assert_eq!(total(&conn), changes, "a second run must not write at all");
        assert_eq!(entries(&conn), before, "entry ids stay stable");
        // A real change is picked up.
        conn.execute("UPDATE tracks SET play_count=3 WHERE title='one'", []).unwrap();
        ensure_auto_playlists(&conn).unwrap();
        let most: i64 = conn.query_row("SELECT COUNT(*) FROM playlist_tracks WHERE playlist_id=?1", params![AUTO_MOST_PLAYED_ID], |r| r.get(0)).unwrap();
        assert_eq!(most, 1);
    }

    #[test]
    fn cover_lookups_use_covering_indexes() {
        let (_dir, conn) = db();
        for (kind, sql, idx) in [
            ("albums", "SELECT id,artwork_path FROM tracks WHERE library_owned=1 AND album_artist=?1 COLLATE NOCASE AND album=?2 COLLATE NOCASE AND artwork_path IS NOT NULL ORDER BY id LIMIT 1", "idx_cov_album_artist_album"),
            ("artist-albums", "SELECT id,artwork_path FROM tracks WHERE library_owned=1 AND artist=?1 COLLATE NOCASE AND album=?2 COLLATE NOCASE AND artwork_path IS NOT NULL ORDER BY id LIMIT 1", "idx_cov_artist_album"),
            ("genres", "SELECT id,artwork_path FROM tracks WHERE library_owned=1 AND genre=?1 COLLATE NOCASE AND artwork_path IS NOT NULL ORDER BY id LIMIT 1", "idx_cov_genre"),
        ] {
            let mut st = conn.prepare(&format!("EXPLAIN QUERY PLAN {sql}")).unwrap();
            let args: Vec<&str> = vec!["a"; st.parameter_count()];
            let plan: Vec<String> = st.query_map(params_from_iter(args), |r| r.get::<_, String>(3)).unwrap().map(|x| x.unwrap()).collect();
            assert!(plan.iter().any(|l| l.contains("COVERING INDEX") && l.contains(idx)), "{kind}: {plan:?}");
        }
    }

    #[test]
    fn rules_are_validated() {
        let ok = rules(vec![rule("between", 5, 3)], true, "title", Some(0));
        let v = validate_smart_rules(&ok).unwrap();
        assert_eq!((v.rules[0].value, v.rules[0].value2, v.limit), (3, 5, None), "between is ordered, 0 limit = none");
        assert!(validate_smart_rules(&rules(vec![], true, "title", None)).is_err());
        assert!(validate_smart_rules(&rules(vec![rule("is", 6, 0)], true, "title", None)).is_err());
        assert!(validate_smart_rules(&rules(vec![rule("is", -1, 0)], true, "title", None)).is_err());
        assert!(validate_smart_rules(&rules(vec![rule("like", 1, 0)], true, "title", None)).is_err());
        let mut bad_field = rule("is", 1, 0); bad_field.field = "title; DROP TABLE tracks".into();
        assert!(validate_smart_rules(&rules(vec![bad_field], true, "title", None)).is_err());
        assert!(validate_smart_rules(&rules(vec![rule("is", 1, 0)], true, "random", None)).is_err());
        assert!(validate_smart_rules(&rules(vec![rule("is", 1, 0)], true, "title", Some(MAX_SMART_LIMIT + 1))).is_err());
        assert!(validate_smart_rules(&rules((0..11).map(|_| rule("is", 1, 0)).collect(), true, "title", None)).is_err());
    }

    #[test]
    fn rules_select_the_right_tracks() {
        let (dir, conn) = db();
        for (t, r) in [("a0", 0), ("b1", 1), ("c2", 2), ("d3", 3), ("e4", 4), ("f5", 5)] { add(&dir, &conn, t, r, true); }
        add(&dir, &conn, "gone5", 5, false); // removed from the library: never listed
        let t = |rs: Vec<SmartRule>, all| titles(&conn, &rules(rs, all, "title", None));
        assert_eq!(t(vec![rule("is", 5, 0)], true), ["f5"]);
        assert_eq!(t(vec![rule("is", 0, 0)], true), ["a0"], "0 = unrated");
        assert_eq!(t(vec![rule("isNot", 0, 0)], true), ["b1", "c2", "d3", "e4", "f5"]);
        assert_eq!(t(vec![rule("atLeast", 4, 0)], true), ["e4", "f5"]);
        assert_eq!(t(vec![rule("atMost", 1, 0)], true), ["a0", "b1"]);
        assert_eq!(t(vec![rule("between", 3, 5)], true), ["d3", "e4", "f5"]);
        assert_eq!(t(vec![rule("is", 1, 0), rule("is", 5, 0)], false), ["b1", "f5"], "any");
        assert_eq!(t(vec![rule("atLeast", 2, 0), rule("atMost", 3, 0)], true), ["c2", "d3"], "all");
        assert_eq!(t(vec![rule("is", 1, 0), rule("is", 5, 0)], true), Vec::<String>::new(), "all of two exclusive rules");
        // sort and limit
        assert_eq!(titles(&conn, &rules(vec![rule("atLeast", 1, 0)], true, "rating-desc", Some(3))), ["f5", "e4", "d3"]);
        assert_eq!(titles(&conn, &rules(vec![rule("atLeast", 1, 0)], true, "title", Some(2))), ["b1", "c2"]);
        let _ = std::fs::remove_dir_all(&dir);
    }

    #[test]
    fn a_smart_playlist_is_materialised_and_kept_fresh_without_churn() {
        let (dir, conn) = db();
        let a = add(&dir, &conn, "a", 5, true);
        let b = add(&dir, &conn, "b", 2, true);
        let r = validate_smart_rules(&rules(vec![rule("atLeast", 4, 0)], true, "title", None)).unwrap();
        conn.execute("INSERT INTO playlists(id,name,created_at,kind,rules) VALUES('s1','Top',1,'smart',?1)", params![serde_json::to_string(&r).unwrap()]).unwrap();
        let members = |c: &Connection| -> Vec<(String, i64)> {
            let mut stmt = c.prepare("SELECT track_id,entry_id FROM playlist_tracks WHERE playlist_id='s1' ORDER BY position").unwrap();
            let rows = stmt.query_map([], |x| Ok((x.get(0)?, x.get(1)?))).unwrap();
            rows.map(|x| x.unwrap()).collect()
        };
        refresh_all_smart(&conn).unwrap();
        let first = members(&conn);
        assert_eq!(first.iter().map(|m| m.0.clone()).collect::<Vec<_>>(), vec![a.clone()]);
        // nothing changed -> not rewritten: entry ids stay
        refresh_all_smart(&conn).unwrap();
        assert_eq!(members(&conn), first);
        // a rating changes -> the playlist follows
        conn.execute("UPDATE tracks SET rating=4 WHERE id=?1", params![b]).unwrap();
        refresh_if_smart(&conn, "s1").unwrap();
        assert_eq!(members(&conn).iter().map(|m| m.0.clone()).collect::<Vec<_>>(), vec![a.clone(), b.clone()]);
        conn.execute("UPDATE tracks SET rating=0 WHERE id=?1", params![a]).unwrap();
        refresh_if_smart(&conn, "s1").unwrap();
        assert_eq!(members(&conn).iter().map(|m| m.0.clone()).collect::<Vec<_>>(), vec![b.clone()]);
        // a manual playlist is never touched by the refresh
        conn.execute("INSERT INTO playlists(id,name,created_at,kind) VALUES('m1','Mine',2,'manual')", []).unwrap();
        conn.execute("INSERT INTO playlist_tracks(playlist_id,track_id,position) VALUES('m1',?1,0)", params![a]).unwrap();
        refresh_all_smart(&conn).unwrap();
        let n: i64 = conn.query_row("SELECT COUNT(*) FROM playlist_tracks WHERE playlist_id='m1'", [], |x| x.get(0)).unwrap();
        assert_eq!(n, 1);
        // smart playlists refuse manual edits but may be renamed / duplicated
        assert!(ensure_manual_playlist(&conn, "s1").unwrap_err().contains("smart playlist"));
        assert!(ensure_not_auto(&conn, "s1").is_ok());
        assert!(ensure_manual_playlist(&conn, "m1").is_ok());
        let _ = std::fs::remove_dir_all(&dir);
    }

    #[test]
    fn a_damaged_playlist_does_not_hide_the_others() {
        let (dir, conn) = db();
        add(&dir, &conn, "a", 5, true);
        conn.execute("INSERT INTO playlists(id,name,created_at,kind,rules) VALUES('bad','Bad',1,'smart','not json')", []).unwrap();
        let ok = validate_smart_rules(&rules(vec![rule("is", 5, 0)], true, "title", None)).unwrap();
        conn.execute("INSERT INTO playlists(id,name,created_at,kind,rules) VALUES('good','Good',2,'smart',?1)", params![serde_json::to_string(&ok).unwrap()]).unwrap();
        refresh_all_smart(&conn).unwrap();
        let n: i64 = conn.query_row("SELECT COUNT(*) FROM playlist_tracks WHERE playlist_id='good'", [], |x| x.get(0)).unwrap();
        assert_eq!(n, 1);
        let _ = std::fs::remove_dir_all(&dir);
    }
}
