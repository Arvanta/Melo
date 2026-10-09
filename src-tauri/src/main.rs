#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod instance_guard;
mod library_db;

use lofty::file::{AudioFile, TaggedFileExt};
use lofty::tag::{Accessor, TagExt};
use serde::{Deserialize, Serialize};
use std::path::{Path, PathBuf};
use std::sync::Mutex;
use tauri::Manager;

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Track {
    id: String,
    title: String,
    artist: String,
    album_artist: String,
    album: String,
    genre: String,
    year: u32,
    duration: f64,
    path: String,
    cover: Option<String>,
    codec: String,
    specs: String,
    replay_gain: Option<f32>,
}

#[derive(Debug, Deserialize)]
pub struct TagWriteRequest {
    title: Option<String>,
    artist: Option<String>,
    album: Option<String>,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct SkinFileInfo {
    pub id: String,
    pub name: String,
    pub filename: String,
    pub path: String,
}

// Embedded default skin templates to ensure the skins folder is always populated on disk
const DEFAULT_SKIN_FULL_EXAMPLE: &str = include_str!("../../skins/full-html-example.html");
const DEFAULT_SKIN_GUIDE: &str = include_str!("../../skins/README.md");
const DEFAULT_SKIN_SLATE: &str = include_str!("../../skins/slate.html");
const DEFAULT_SKIN_SILK_ORBIT: &str = include_str!("../../skins/silk-orbit.html");
const DEFAULT_SKIN_MICROLINE: &str = include_str!("../../skins/microline.html");
// Bundled community skins
const DEFAULT_SKIN_ARIA: &str = include_str!("../../skins/aria.html");
const DEFAULT_SKIN_GRAPHITE: &str = include_str!("../../skins/graphite.html");
const DEFAULT_SKIN_HALCYON: &str = include_str!("../../skins/halcyon.html");
const DEFAULT_SKIN_HAVEN: &str = include_str!("../../skins/haven.html");
const DEFAULT_SKIN_HIRA: &str = include_str!("../../skins/hira.html");
const DEFAULT_SKIN_KOTO: &str = include_str!("../../skins/koto.html");
const DEFAULT_SKIN_LUMEN: &str = include_str!("../../skins/lumen.html");
// "Mica" is the skin formerly shipped as "Mica 2"; Mica 1 is retired. The two
// hashes let the one-time migration below recognise the old *stock* files on a
// disk that was seeded before the rename — anything the user edited is left
// alone (the project never overwrites user edits).
const DEFAULT_SKIN_MICA: &str = include_str!("../../skins/mica.html");
const RETIRED_MICA1_SHA256: &str = "25d4ea46500789773eed08abcd8a3a822ba966d9bbcfba195e463bd85f000485";
const RETIRED_MICA2_SHA256: &str = "15ffd3d332577bc18a8f2c3a1ea86ede58e7be9fc284603563ce638fd681c084";
const DEFAULT_SKIN_MICROLINE_V: &str = include_str!("../../skins/microline-v.html");
const DEFAULT_SKIN_MIST: &str = include_str!("../../skins/mist.html");
const DEFAULT_SKIN_RAIL: &str = include_str!("../../skins/rail.html");
// Round 86: five more bundled community skins (fresh installs only, see
// ensure_default_skins_on_disk; existing installs are not changed).
const DEFAULT_SKIN_BEAN: &str = include_str!("../../skins/bean.html");
const DEFAULT_SKIN_BEAN_COMPACT: &str = include_str!("../../skins/bean-compact.html");
const DEFAULT_SKIN_FOLD: &str = include_str!("../../skins/Fold.html");
const DEFAULT_SKIN_LILT: &str = include_str!("../../skins/lilt.html");
const DEFAULT_SKIN_PRISM: &str = include_str!("../../skins/Prism.html");

/// Every skin shipped in `skins/` (the guide is handled separately). They are
/// written into the user's skins folder when missing — see
/// `sync_bundled_skins_once`.
const BUNDLED_SKINS: &[(&str, &str)] = &[
    ("full-html-example.html", DEFAULT_SKIN_FULL_EXAMPLE),
    ("slate.html", DEFAULT_SKIN_SLATE),
    ("silk-orbit.html", DEFAULT_SKIN_SILK_ORBIT),
    ("microline.html", DEFAULT_SKIN_MICROLINE),
    ("aria.html", DEFAULT_SKIN_ARIA),
    ("graphite.html", DEFAULT_SKIN_GRAPHITE),
    ("halcyon.html", DEFAULT_SKIN_HALCYON),
    ("haven.html", DEFAULT_SKIN_HAVEN),
    ("hira.html", DEFAULT_SKIN_HIRA),
    ("koto.html", DEFAULT_SKIN_KOTO),
    ("lumen.html", DEFAULT_SKIN_LUMEN),
    ("mica.html", DEFAULT_SKIN_MICA),
    ("microline-v.html", DEFAULT_SKIN_MICROLINE_V),
    ("mist.html", DEFAULT_SKIN_MIST),
    ("rail.html", DEFAULT_SKIN_RAIL),
    ("bean.html", DEFAULT_SKIN_BEAN),
    ("bean-compact.html", DEFAULT_SKIN_BEAN_COMPACT),
    ("Fold.html", DEFAULT_SKIN_FOLD),
    ("lilt.html", DEFAULT_SKIN_LILT),
    ("Prism.html", DEFAULT_SKIN_PRISM),
];

// ---- Helpers ----

fn codec_from_ext(path: &Path) -> String {
    match path.extension().and_then(|e| e.to_str()).map(|s| s.to_lowercase()) {
        Some(ext) => match ext.as_str() {
            "mp3" => "MP3".to_string(),
            "flac" => "FLAC".to_string(),
            "wav" => "WAV".to_string(),
            "ogg" => "OGG".to_string(),
            "aac" => "AAC".to_string(),
            "m4a" | "alac" => "ALAC".to_string(),
            "mka" => "MKA".to_string(),
            _ => ext.to_uppercase(),
        },
        None => "Unknown".to_string(),
    }
}

fn supported_ext(path: &Path) -> bool {
    if let Some(ext) = path.extension().and_then(|e| e.to_str()) {
        matches!(
            ext.to_lowercase().as_str(),
            "mp3" | "flac" | "wav" | "ogg" | "aac" | "m4a" | "alac" | "opus" | "wma" | "aiff" | "mka"
        )
    } else {
        false
    }
}

fn parse_track(p: &Path) -> Option<Track> {
    // Matroska audio (.mka) is not supported by Lofty's tag reader; fall
    // back to filename-based metadata so the file can still be queued and
    // played (duration is filled in by the player once metadata loads).
    if p.extension()
        .and_then(|e| e.to_str())
        .map(|e| e.eq_ignore_ascii_case("mka"))
        .unwrap_or(false)
    {
        let title = p
            .file_stem()
            .and_then(|s| s.to_str())
            .unwrap_or("Unknown")
            .to_string();
        let path = p.to_string_lossy().to_string();
        return Some(Track {
            id: path.clone(),
            title,
            artist: "Unknown Artist".to_string(),
            album_artist: "Unknown Artist".to_string(),
            album: "Unknown Album".to_string(),
            genre: "Unknown".to_string(),
            year: 0,
            duration: 0.0,
            path,
            cover: None,
            codec: "MKA".to_string(),
            specs: "Matroska Audio".to_string(),
            replay_gain: None,
        });
    }
    let tagged = lofty::probe::Probe::open(p).ok()?.read().ok()?;
    let tag = tagged.primary_tag().or(tagged.first_tag());

    let title = tag
        .and_then(|t| t.title().map(|s| s.to_string()))
        .unwrap_or_else(|| {
            p.file_stem()
                .and_then(|s| s.to_str())
                .unwrap_or("Unknown")
                .to_string()
        });

    let artist = tag
        .and_then(|t| t.artist().map(|s| s.to_string()))
        .unwrap_or_else(|| "Unknown Artist".to_string());
    let album_artist = tag
        .and_then(|t| t.get_string(&lofty::tag::ItemKey::AlbumArtist).map(|s| s.trim().to_string()))
        .filter(|s| !s.is_empty())
        .unwrap_or_else(|| artist.clone());

    let album = tag
        .and_then(|t| t.album().map(|s| s.to_string()))
        .unwrap_or_else(|| "Unknown Album".to_string());

    let genre = tag
        .and_then(|t| t.genre().map(|s| s.to_string()))
        .unwrap_or_else(|| "Unknown".to_string());

    let year = tag.and_then(|t| t.year()).unwrap_or(0);

    let props = tagged.properties();
    let duration = props.duration().as_secs_f64();

    let codec = codec_from_ext(p);
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

    // Artwork is intentionally `None` here: `parse_track` is the cheap
    // tag-only probe used at boot (CLI "open with" / single-instance
    // forwarding, where decoding every embedded image would stall startup)
    // and by `get_cli_tracks` (the frontend only needs title/artist/
    // duration). Real artwork arrives lazily via `get_track_artwork_full`
    // when the user lands on the track.
    let cover = None;

    Some(Track {
        id: p.to_string_lossy().to_string(),
        title,
        artist,
        album_artist,
        album,
        genre,
        year,
        duration,
        path: p.to_string_lossy().to_string(),
        cover,
        codec,
        specs,
        replay_gain,
    })
}

// ---- Skin Folder Resolver & Populator ----

fn get_skins_dir(app: &tauri::AppHandle) -> PathBuf {
    // Always use the per-user AppData skins directory — never write next to
    // the executable: Program Files is not user-writable, and the NSIS
    // updater stages builds in temporary `up_*` folders next to the exe.
    // AppData is writable, survives upgrades, and is the canonical place
    // for user customisation.
    if let Ok(app_data) = app.path().app_data_dir() {
        let p = app_data.join("skins");
        let _ = std::fs::create_dir_all(&p);
        ensure_default_skins_on_disk(&p);
        return p;
    }
    // Fallback relative path (dev / portable runs only).
    let p = PathBuf::from("skins");
    let _ = std::fs::create_dir_all(&p);
    ensure_default_skins_on_disk(&p);
    p
}

/// Install-time sync of the bundled skins (round 88).
///
/// A marker named after a hash of the bundled set records that this exact set
/// was already applied. On the first launch of a build with a new set — a fresh
/// install, an upgrade over an older install, or a build that bundles different
/// skins — every bundled skin that is MISSING from the folder is written. After
/// that the marker stops the sync, so a skin the user deletes stays deleted
/// across restarts. It comes back only if the bundled set itself changes, i.e.
/// on a later release that ships different skins.
fn sync_bundled_skins_once(skins_dir: &Path) {
    use sha2::{Digest, Sha256};
    let mut hasher = Sha256::new();
    for &(name, content) in BUNDLED_SKINS {
        hasher.update(name.as_bytes());
        hasher.update(b"\0");
        hasher.update(content.as_bytes());
        hasher.update(b"\0");
    }
    let digest = format!("{:x}", hasher.finalize());
    let marker = skins_dir.join(format!(".melo-bundle-{}", &digest[..16]));
    if marker.exists() {
        return;
    }
    for &(name, content) in BUNDLED_SKINS {
        let f = skins_dir.join(name);
        if !f.exists() {
            let _ = std::fs::write(f, content);
        }
    }
    let _ = std::fs::write(
        &marker,
        "Melo synced the bundled skins for this release; user deletions are respected.",
    );
    // Drop markers left by earlier bundled sets so the folder stays tidy.
    if let Ok(entries) = std::fs::read_dir(skins_dir) {
        for entry in entries.flatten() {
            let name = entry.file_name();
            let name = name.to_string_lossy();
            if name.starts_with(".melo-bundle-") && entry.path() != marker {
                let _ = std::fs::remove_file(entry.path());
            }
        }
    }
}

fn ensure_default_skins_on_disk(skins_dir: &Path) {
    // One-time bundled-skins migrations run on every launch (each gated by its
    // own marker) so already-seeded installs pick up renames and retirements.
    migrate_retired_mica_once(skins_dir);
    // Bundled skins missing from the folder are added once per bundled set —
    // on fresh installs AND on upgraded installs (runs before the seed guard).
    sync_bundled_skins_once(skins_dir);

    // One-time seeding: bundled skins are written on the very first run only.
    // A marker file records the seeding, so skins the user deletes are NEVER
    // resurrected and the dropdown reflects the folder's real contents
    // (skins newly bundled in an update are not auto-installed either —
    // deliberate). Existing installs without a marker get one final seeding
    // pass (incl. the retired-skin cleanup), then the marker is written.
    let marker = skins_dir.join(".melo-seeded");
    if marker.exists() {
        return;
    }

    // Remove retired skins left by older installs so they don't linger in
    // the skins folder / dropdown: Minimal Compact (compact-pill) and
    // its legacy light/dark splits, the old example-custom placeholder,
    // and the retired Ivory skin.
    let _ = std::fs::remove_file(skins_dir.join("compact-pill.html"));
    let _ = std::fs::remove_file(skins_dir.join("compact-pill-light.html"));
    let _ = std::fs::remove_file(skins_dir.join("compact-pill-dark.html"));
    let _ = std::fs::remove_file(skins_dir.join("example-custom.html"));
    let _ = std::fs::remove_file(skins_dir.join("ivory.html"));

    let f3 = skins_dir.join("full-html-example.html");
    if !f3.exists() {
        let _ = std::fs::write(f3, DEFAULT_SKIN_FULL_EXAMPLE);
    }
    let f4 = skins_dir.join("README.md");
    if !f4.exists() {
        let _ = std::fs::write(f4, DEFAULT_SKIN_GUIDE);
    }
    // Bundled community/user skins
    let f5 = skins_dir.join("slate.html");
    if !f5.exists() {
        let _ = std::fs::write(f5, DEFAULT_SKIN_SLATE);
    }
    let f6 = skins_dir.join("silk-orbit.html");
    if !f6.exists() {
        let _ = std::fs::write(f6, DEFAULT_SKIN_SILK_ORBIT);
    }
    let f8 = skins_dir.join("microline.html");
    if !f8.exists() {
        let _ = std::fs::write(f8, DEFAULT_SKIN_MICROLINE);
    }
    // Bundled community skins (written only when missing, so a newer
    // local edit by the user is never overwritten)
    for (fname, content) in [
        ("aria.html", DEFAULT_SKIN_ARIA),
        ("graphite.html", DEFAULT_SKIN_GRAPHITE),
        ("halcyon.html", DEFAULT_SKIN_HALCYON),
        ("haven.html", DEFAULT_SKIN_HAVEN),
        ("hira.html", DEFAULT_SKIN_HIRA),
        ("koto.html", DEFAULT_SKIN_KOTO),
        ("lumen.html", DEFAULT_SKIN_LUMEN),
        ("mica.html", DEFAULT_SKIN_MICA),
        ("microline-v.html", DEFAULT_SKIN_MICROLINE_V),
        ("mist.html", DEFAULT_SKIN_MIST),
        ("rail.html", DEFAULT_SKIN_RAIL),
        ("bean.html", DEFAULT_SKIN_BEAN),
        ("bean-compact.html", DEFAULT_SKIN_BEAN_COMPACT),
        ("Fold.html", DEFAULT_SKIN_FOLD),
        ("lilt.html", DEFAULT_SKIN_LILT),
        ("Prism.html", DEFAULT_SKIN_PRISM),
    ] {
        let f = skins_dir.join(fname);
        if !f.exists() {
            let _ = std::fs::write(f, content);
        }
    }

    // Seeding complete — from now on the skins folder belongs to the user.
    let _ = std::fs::write(&marker, "Melo seeded this folder once; user deletions are respected.");
}

/// One-time migration (round 71): the bundled skin set changed from
/// "Mica + Mica 2" to a single "Mica" (the file formerly shipped as Mica 2).
/// Installs seeded earlier still hold the old pair on disk, so:
///   * `mica.html` is replaced with the new Mica — but ONLY while it is still
///     the byte-exact stock Mica 1 (hash-checked); an edited file is the
///     user's and is never touched;
///   * `mica-2.html` is deleted only when it is the byte-exact stock Mica 2,
///     so a customised copy is never destroyed.
/// Safe to run on a fresh install (nothing matches) and on a re-run (marker).
fn migrate_retired_mica_once(skins_dir: &Path) {
    use sha2::{Digest, Sha256};
    let marker = skins_dir.join(".melo-migrated-mica");
    if marker.exists() {
        return;
    }
    let hash_of = |p: &Path| -> Option<String> {
        std::fs::read(p).ok().map(|b| {
            let mut h = Sha256::new();
            h.update(&b);
            format!("{:x}", h.finalize())
        })
    };
    let mica = skins_dir.join("mica.html");
    if hash_of(&mica).as_deref() == Some(RETIRED_MICA1_SHA256) {
        let _ = std::fs::write(&mica, DEFAULT_SKIN_MICA);
    }
    let mica2 = skins_dir.join("mica-2.html");
    if hash_of(&mica2).as_deref() == Some(RETIRED_MICA2_SHA256) {
        let _ = std::fs::remove_file(&mica2);
    }
    let _ = std::fs::write(
        &marker,
        "Mica 1 retired; Mica 2 renamed to Mica. Stock files only.",
    );
}

// ---- Tauri Commands ----

#[tauri::command]
fn get_lyrics_cache_dir(app: tauri::AppHandle) -> Option<PathBuf> {
    app.path().app_data_dir().ok().map(|d| d.join("lyrics-cache"))
}

fn cached_lrc_path(app: &tauri::AppHandle, track_path: &Path) -> Option<PathBuf> {
    use sha2::{Digest, Sha256};
    let key = track_path.to_string_lossy();
    let mut h = Sha256::new();
    h.update(key.as_bytes());
    let hash = format!("{:x}", h.finalize());
    get_lyrics_cache_dir(app.clone()).map(|d| d.join(format!("{}.lrc", &hash[..24])))
}

#[tauri::command]
fn get_cached_lyrics(app: tauri::AppHandle, track_path: String) -> Option<String> {
    let p = Path::new(&track_path);
    // Same priority as get_track_lyrics but also checks the central cache.
    // 1. Sidecar .lrc — checked first for speed (no network needed).
    let sidecar = p.with_extension("lrc");
    if sidecar.exists() && sidecar.is_file() {
        if let Ok(c) = std::fs::read_to_string(&sidecar) {
            if !c.trim().is_empty() { return Some(c); }
        }
    }
    // 2. Central cache (AppData/lyrics-cache/<hash>.lrc)
    if let Some(cache_path) = cached_lrc_path(&app, p) {
        if cache_path.exists() && cache_path.is_file() {
            if let Ok(c) = std::fs::read_to_string(&cache_path) {
                if !c.trim().is_empty() { return Some(c); }
            }
        }
    }
    // 3. Embedded tag (handled by get_track_lyrics)
    None
}

#[tauri::command]
fn save_lyrics_lrc(app: tauri::AppHandle, track_path: String, content: String, mode: String) -> Result<String, String> {
    // mode: "cache" -> write to AppData/lyrics-cache/<hash>.lrc
    //       "sidecar" -> write to <audiofile>.lrc (may fail on read-only media)
    let p = Path::new(&track_path);
    let target = match mode.as_str() {
        "sidecar" => p.with_extension("lrc"),
        _ => {
            let cp = cached_lrc_path(&app, p).ok_or_else(|| "Could not resolve lyrics cache directory".to_string())?;
            if let Some(parent) = cp.parent() {
                let _ = std::fs::create_dir_all(parent);
            }
            cp
        }
    };
    std::fs::write(&target, content).map_err(|e| format!("Could not write lyrics file: {}", e))?;
    Ok(target.to_string_lossy().to_string())
}

#[tauri::command]
fn get_track_lyrics(path: String) -> Option<String> {
    let p = Path::new(&path);
    // 1. Check for .lrc file next to the audio file
    let lrc_path = p.with_extension("lrc");
    if lrc_path.exists() && lrc_path.is_file() {
        if let Ok(content) = std::fs::read_to_string(&lrc_path) {
            if !content.trim().is_empty() {
                return Some(content);
            }
        }
    }

    // 2. Central lyrics cache. (No App handle here — this function runs in
    // contexts without one; get_cached_lyrics covers this path when called
    // from the frontend.)

    // 3. Check embedded lyrics via lofty
    if let Some(tagged) = lofty::probe::Probe::open(p).ok().and_then(|pr| pr.read().ok()) {
        let tag = tagged.primary_tag().or(tagged.first_tag());
        if let Some(t) = tag {
            if let Some(lyrics) = t.get_string(&lofty::tag::ItemKey::Lyrics) {
                if !lyrics.trim().is_empty() {
                    return Some(lyrics.to_string());
                }
            }
        }
    }
    None
}

#[tauri::command]
fn list_installed_skins(app: tauri::AppHandle) -> Result<Vec<SkinFileInfo>, String> {
    let skins_dir = get_skins_dir(&app);
    let mut list = Vec::new();
    if let Ok(entries) = std::fs::read_dir(&skins_dir) {
        for entry in entries.filter_map(|e| e.ok()) {
            let path = entry.path();
            if path.is_file() {
                if let Some(ext) = path.extension().and_then(|e| e.to_str()) {
                    if ext.eq_ignore_ascii_case("html") || ext.eq_ignore_ascii_case("htm") {
                        let filename = path.file_name().unwrap_or_default().to_string_lossy().to_string();
                        let stem = path.file_stem().unwrap_or_default().to_string_lossy().to_string();
                        let name_clean = stem.replace('-', " ").replace('_', " ");
                        let name_formatted = name_clean.split_whitespace()
                            .map(|word| {
                                let mut c = word.chars();
                                match c.next() {
                                    None => String::new(),
                                    Some(f) => f.to_uppercase().collect::<String>() + c.as_str(),
                                }
                            })
                            .collect::<Vec<_>>()
                            .join(" ");
                        list.push(SkinFileInfo {
                            id: stem,
                            name: name_formatted,
                            filename,
                            path: path.to_string_lossy().to_string(),
                        });
                    }
                }
            }
        }
    }
    list.sort_by(|a, b| a.name.cmp(&b.name));
    Ok(list)
}

fn skin_leaf_filename(value: &str) -> Result<&str, String> {
    let path = Path::new(value);
    let leaf = path.file_name().and_then(|name| name.to_str())
        .filter(|leaf| *leaf == value && !leaf.is_empty())
        .ok_or_else(|| "Skin filename must not include a path".to_string())?;
    let lower = leaf.to_ascii_lowercase();
    if !(lower.ends_with(".html") || lower.ends_with(".htm")) {
        return Err("Skin must be an .html or .htm file".into());
    }
    Ok(leaf)
}

#[tauri::command]
fn read_skin_file(filename_or_path: String, app: tauri::AppHandle) -> Result<String, String> {
    // A skin is trusted UI markup, never a general-purpose file reader: only
    // a leaf HTML filename inside Melo's skins directory may load. No
    // embedded fallback — if the file is gone (user deleted it), the read
    // fails and the frontend falls back to Default. Deletions are permanent.
    let filename = skin_leaf_filename(&filename_or_path)?;
    let skins_dir = get_skins_dir(&app);
    let target = skins_dir.join(filename);
    if target.exists() {
        return std::fs::read_to_string(&target).map_err(|e| e.to_string());
    }
    Err(format!("Skin file not found: {}", filename_or_path))
}

#[tauri::command]
fn save_custom_skin_file(filename: String, content: String, app: tauri::AppHandle) -> Result<String, String> {
    // Match `read_skin_file`: reject traversal and write only a leaf HTML
    // file below the per-app skins directory.
    let safe_filename = skin_leaf_filename(&filename)?;
    // Never create 0-byte skin files: an empty payload is a failed import,
    // and an empty file would show up in the dropdown but never load.
    if content.trim().is_empty() {
        return Err("Skin content is empty — nothing to save".to_string());
    }
    // Defense-in-depth for the import guard: real skins are a few dozen KB at
    // most; reject oversized payloads before they touch the disk.
    const MAX_SKIN_BYTES: usize = 512 * 1024;
    if content.len() > MAX_SKIN_BYTES {
        return Err("Skin content is too large (limit 512 KB)".to_string());
    }
    let skins_dir = get_skins_dir(&app);
    std::fs::create_dir_all(&skins_dir).map_err(|e| e.to_string())?;
    let target = skins_dir.join(safe_filename);
    std::fs::write(&target, content).map_err(|e| e.to_string())?;
    Ok(target.to_string_lossy().to_string())
}

#[tauri::command]
fn open_skins_folder(app: tauri::AppHandle) -> Result<(), String> {
    let skins_dir = get_skins_dir(&app);
    let _ = std::fs::create_dir_all(&skins_dir);
    let abs_path = skins_dir.canonicalize().unwrap_or(skins_dir);
    let mut path_str = abs_path.to_string_lossy().to_string();
    #[cfg(target_os = "windows")]
    {
        // Windows canonicalize() may prefix the path with the NT extended-length
        // marker `\\?\` (>260 chars or long-path opt-in). Explorer accepts it,
        // but downstream consumers (PowerShell snippets, the asset-protocol
        // scope) don't — strip it here so the rest of the codebase sees plain
        // UTF-8 paths.
        if path_str.starts_with(r"\\?\") {
            path_str = path_str[4..].to_string();
        }
        let win_path = path_str.replace('/', "\\");
        std::process::Command::new("explorer.exe")
            .arg(&win_path)
            .spawn()
            .map_err(|e| e.to_string())?;
    }
    #[cfg(not(target_os = "windows"))]
    {
        std::process::Command::new("xdg-open")
            .arg(&path_str)
            .spawn()
            .map_err(|e| e.to_string())?;
    }
    Ok(())
}

/// Open an https/http URL in the user's default browser.
/// WebView2 does not honor target=_blank / window.open for external sites
/// under Melo's CSP, so About links (and any future external links) must
/// go through this command instead of a plain <a href>.
#[tauri::command]
fn open_external_url(url: String) -> Result<(), String> {
    let trimmed = url.trim();
    // Allowlist: only real web URLs. Reject file:, javascript:, data:, etc.
    let lower = trimmed.to_ascii_lowercase();
    if !(lower.starts_with("https://") || lower.starts_with("http://")) {
        return Err("only http(s) URLs can be opened".into());
    }
    if trimmed.chars().any(|c| c.is_control() || c == '"' || c == '\'') {
        return Err("invalid URL".into());
    }
    #[cfg(target_os = "windows")]
    {
        // rundll32 FileProtocolHandler is the reliable way to hand a URL to
        // the default browser on Windows. `cmd /C start "" url` also works
        // but quotes/spaces are easier to get wrong; explorer.exe treats a
        // URL as a folder path and fails silently.
        std::process::Command::new("rundll32")
            .args(["url.dll,FileProtocolHandler", trimmed])
            .spawn()
            .map_err(|e| e.to_string())?;
    }
    #[cfg(target_os = "macos")]
    {
        std::process::Command::new("open")
            .arg(trimmed)
            .spawn()
            .map_err(|e| e.to_string())?;
    }
    #[cfg(all(unix, not(target_os = "macos")))]
    {
        std::process::Command::new("xdg-open")
            .arg(trimmed)
            .spawn()
            .map_err(|e| e.to_string())?;
    }
    Ok(())
}

/// CLI / "open with" paths collected for the frontend. The primary
/// instance's own argv is pushed at startup by `main()`; companion-instance
/// paths are pushed by the single-instance callback (Explorer launches one
/// process per selected file unless MultiSelectModel=Player is registered).
/// The frontend drains this buffer via `get_cli_tracks` (which clears it)
/// several times during boot, so paths that arrived before the webview
/// loaded are not lost (Tauri drops events with no listener).
static PENDING_CLI_PATHS: Mutex<Vec<String>> = Mutex::new(Vec::new());

fn push_cli_path(path: &str) {
    let p = Path::new(path);
    if path.starts_with('-') || !p.exists() || !p.is_file() || !supported_ext(p) {
        return;
    }
    let mut buf = PENDING_CLI_PATHS.lock().unwrap_or_else(|e| e.into_inner());
    if buf.len() < 512 {
        if buf.iter().any(|x| x == path) {
            return;
        }
        buf.push(path.to_string());
    } else {
        // Hard cap so a multi-thousand-file "Open With" can't OOM the boot
        // buffer. The extra path is dropped — logged once so it is visible in
        // the captured stderr stream.
        eprintln!(
            "[melo] PENDING_CLI_PATHS at cap (512); dropping companion path: {}",
            path
        );
    }
}
// Companion-instance argument contract: `push_cli_path` is the single
// sink for EVERY externally-received path — (1) the initial argv in
// main(), (2) the single-instance plugin closure (a second melo.exe was
// launched). Both call sites filter identically (must look like a file,
// supported extension, no leading '-'). `push_cli_path` itself only
// filters and dedups; parsing happens in `get_cli_tracks`, polled by
// the frontend during boot and after `melo:open-files`.
// `parse_args_and_push` centralises skip-program-name / filter / push /
// return-parsed-tracks for both callers.
fn parse_args_and_push(args: &[String]) -> Vec<Track> {
    let mut tracks = Vec::new();
    for arg in args.iter().skip(1) {
        if arg.starts_with('-') {
            continue;
        }
        let p = Path::new(arg);
        if !p.exists() || !p.is_file() {
            continue;
        }
        // Double-clicking an .m3u/.m3u8 in Explorer (Open With → Melo) queues the
        // playlist's TRACKS: entries resolve against the file's own folder and
        // every existing, supported entry flows through the regular CLI
        // pipeline (import-and-play, queue replace, in file order).
        if library_db::is_m3u_file(p) {
            match library_db::resolve_m3u_paths(p) {
                Ok(entries) => {
                    for e in entries {
                        if e.is_file() && supported_ext(&e) {
                            let s = e.to_string_lossy().to_string();
                            push_cli_path(&s);
                            if let Some(t) = parse_track(Path::new(&s)) {
                                tracks.push(t);
                            }
                        }
                    }
                }
                Err(err) => eprintln!("[melo] skipping unresolvable playlist {arg}: {err}"),
            }
            continue;
        }
        if !supported_ext(p) {
            continue;
        }
        push_cli_path(arg);
        if let Some(t) = parse_track(p) {
            tracks.push(t);
        }
    }
    tracks
}

#[tauri::command]
fn get_cli_tracks() -> Vec<Track> {
    let paths: Vec<String> = {
        let mut buf = PENDING_CLI_PATHS.lock().unwrap_or_else(|e| e.into_inner());
        std::mem::take(&mut *buf)
    };
    let mut tracks = Vec::new();
    for path in paths {
        if let Some(t) = parse_track(Path::new(&path)) {
            tracks.push(t);
        }
    }
    tracks
}

#[tauri::command]
fn write_tags(path: String, tags: TagWriteRequest) -> Result<(), String> {
    let p = Path::new(&path);
    let mut tagged = lofty::probe::Probe::open(p)
        .map_err(|e| e.to_string())?
        .read()
        .map_err(|e| e.to_string())?;

    if tagged.primary_tag().is_none() && tagged.first_tag().is_none() {
        use lofty::tag::TagType;
        let ty = match p.extension().and_then(|e| e.to_str()).unwrap_or("").to_lowercase().as_str() {
            "mp3" => TagType::Id3v2,
            "flac" => TagType::VorbisComments,
            "ogg" => TagType::VorbisComments,
            "m4a" => TagType::Mp4Ilst,
            _ => TagType::Id3v2,
        };
        tagged.insert_tag(lofty::tag::Tag::new(ty));
    }

    let t = match tagged.primary_tag_mut() {
        Some(t) => t,
        None => tagged
            .first_tag_mut()
            .ok_or_else(|| "No writable tag found".to_string())?,
    };
    if let Some(v) = tags.title {
        t.set_title(v);
    }
    if let Some(v) = tags.artist {
        t.set_artist(v);
    }
    if let Some(v) = tags.album {
        t.set_album(v);
    }
    t.save_to_path(p, Default::default()).map_err(|e| e.to_string())?;

    Ok(())
}
fn main() {
    // Cold-start guard: later processes of an Explorer multi-select wait here
    // until the primary's single-instance window exists, so none of them can
    // slip through the plugin's mutex-without-window gap and become a second
    // primary. See instance_guard.rs.
    instance_guard::wait_for_primary_if_booting();

    tauri::Builder::default()
        .plugin(tauri_plugin_single_instance::init(|app, args, _cwd| {
            use tauri::Emitter;
            if let Some(window) = app.get_webview_window("main") {
                // If the user (or another instance) double-clicked an audio
                // file while Melo was hidden in the tray, bring the main
                // window back — same behaviour as the "Show / Hide" menu.
                let _ = window.show();
                let _ = window.unminimize();
                let _ = window.set_focus();
            }

            // For companion launches we both buffer the paths (in case the
            // webview is mid-startup and the event would be dropped) and
            // emit parsed tracks immediately so the running session plays
            // them without waiting for the next get_cli_tracks poll.
            let tracks = parse_args_and_push(&args);
            if !tracks.is_empty() {
                let _ = app.emit("melo:open-files", &tracks);
            }
        }))
        .plugin(tauri_plugin_fs::init())
        // Persists the user-approved folder scopes selected by Manage so
        // `asset:` can expose only those roots after an app restart.
        .plugin(tauri_plugin_persisted_scope::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_global_shortcut::Builder::new().build())
        .invoke_handler(tauri::generate_handler![
            library_db::start_managed_library_scan,
            library_db::cancel_library_scan,
            library_db::list_library_roots,
            library_db::add_library_roots,
            library_db::remove_library_root,
            library_db::library_stats,
            library_db::library_groups,
            library_db::library_tracks,
            library_db::list_playlists,
            library_db::record_track_play,
            library_db::touch_track_last_played,
            library_db::shuffle_queue_rows,
            library_db::create_playlist,
            library_db::rename_playlist,
            library_db::delete_playlist,
            library_db::duplicate_playlist,
            library_db::sweep_missing_playlist_tracks,
            library_db::playlist_tracks,
            library_db::add_tracks_to_playlist,
            library_db::remove_playlist_entry,
            library_db::remove_playlist_entries,
            library_db::clear_playlist,
            library_db::reorder_playlist_entry,
            library_db::queue_tracks,
            library_db::replace_queue_tracks,
            library_db::append_queue_tracks,
            library_db::replace_queue_from_playlist,
            library_db::replace_queue_from_library,
            library_db::clear_queue,
            library_db::sort_queue,
            library_db::move_queue_track,
            library_db::move_queue_entries,
            library_db::remove_queue_entries,
            library_db::move_playlist_entries,
            library_db::clear_library_database,
            library_db::import_audio_files,
            library_db::list_dir_audio_files,
            library_db::expand_drop_paths,
            library_db::import_m3u_file,
            library_db::cleanup_orphan_data,
            library_db::ensure_track_artwork,
            library_db::ensure_track_artwork_batch,
            library_db::get_track_artwork_full,
            library_db::get_track_by_id,
            library_db::get_tracks_by_ids,
            library_db::write_text_file,
            library_db::delete_tracks,
            library_db::delete_library_group,
            library_db::open_track_folder,
            get_cli_tracks,
            get_track_lyrics,
            get_cached_lyrics,
            save_lyrics_lrc,
            list_installed_skins,
            read_skin_file,
            save_custom_skin_file,
            open_skins_folder,
            open_external_url,
            write_tags,
        ])
        .setup(|app| {
            // Remember this instance's own "open with" paths so the frontend
            // can drain them at boot via get_cli_tracks. Runs only in the
            // primary (companions exit inside the single-instance plugin
            // before setup), and before any page script can poll. The parsed
            // tracks are discarded - the boot polls surface the buffered paths.
            let _ = parse_args_and_push(&std::env::args().collect::<Vec<_>>());

            let library_state = library_db::LibraryState::new(app.handle())
                .map_err(|e| std::io::Error::new(std::io::ErrorKind::Other, e))?;
            app.manage(library_state);

            use tauri::menu::{MenuBuilder, MenuItemBuilder, PredefinedMenuItem};
            use tauri::tray::{MouseButton, MouseButtonState, TrayIconBuilder, TrayIconEvent};

            let toggle_item = MenuItemBuilder::with_id("toggle", "Show / Hide Melo").build(app)?;
            let play_item = MenuItemBuilder::with_id("play_pause", "Play / Pause").build(app)?;
            let next_item = MenuItemBuilder::with_id("next", "Next Track").build(app)?;
            let prev_item = MenuItemBuilder::with_id("prev", "Previous Track").build(app)?;
            let mute_item = MenuItemBuilder::with_id("mute", "Mute / Unmute").build(app)?;
            let sep1 = PredefinedMenuItem::separator(app)?;
            let sep2 = PredefinedMenuItem::separator(app)?;
            let quit_item = MenuItemBuilder::with_id("quit", "Exit Melo").build(app)?;

            let tray_menu = MenuBuilder::new(app)
                .item(&toggle_item)
                .item(&sep1)
                .item(&play_item)
                .item(&next_item)
                .item(&prev_item)
                .item(&mute_item)
                .item(&sep2)
                .item(&quit_item)
                .build()?;

            if let Some(icon) = app.default_window_icon().cloned() {
                let _tray = TrayIconBuilder::new()
                    .icon(icon)
                    .tooltip("Melo Music Player")
                    .menu(&tray_menu)
                    .show_menu_on_left_click(false)
                    .on_menu_event(|app, event| {
                        use tauri::Emitter;
                        match event.id().as_ref() {
                            "toggle" => {
                                // Don't toggle the main window from Rust: the frontend owns the
                                // hide/restore policy (it hides every panel alongside main and restores
                                // them at their saved positions). Emitting an event lets the main
                                // document decide.
                                let _ = app.emit("melo:tray-toggle-all", ());
                            }
                            "play_pause" => {
                                let _ = app.emit("melo:tray-action", "play_pause");
                            }
                            "next" => {
                                let _ = app.emit("melo:tray-action", "next");
                            }
                            "prev" => {
                                let _ = app.emit("melo:tray-action", "prev");
                            }
                            "mute" => {
                                let _ = app.emit("melo:tray-action", "mute");
                            }
                            "quit" => {
                                app.exit(0);
                            }
                            _ => {}
                        }
                    })
                    .on_tray_icon_event(|tray, event| {
                        // Left-click on the tray icon: same as the "Show / Hide Melo" menu item
                        // — emit and let the frontend decide.
                        if let TrayIconEvent::Click { button: MouseButton::Left, button_state: MouseButtonState::Up, .. } = event {
                            use tauri::Emitter;
                            let _ = tray.app_handle().emit("melo:tray-toggle-all", ());
                        }
                    })
                    .build(app)?;
            }

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
