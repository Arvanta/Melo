#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod library_db;
mod queue_db;

use lofty::file::{AudioFile, TaggedFileExt};
use lofty::tag::{Accessor, TagExt};
use serde::{Deserialize, Serialize};
use std::path::{Path, PathBuf};

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Track {
    id: String,
    title: String,
    artist: String,
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
const DEFAULT_SKIN_COMPACT: &str = include_str!("../../skins/compact-pill.html");
const DEFAULT_SKIN_FULL_EXAMPLE: &str = include_str!("../../skins/full-html-example.html");

// ---- Helpers ----

fn codec_from_ext(path: &Path) -> String {
    match path
        .extension()
        .and_then(|e| e.to_str())
        .map(|s| s.to_lowercase())
    {
        Some(ext) => match ext.as_str() {
            "mp3" => "MP3".to_string(),
            "flac" => "FLAC".to_string(),
            "wav" => "WAV".to_string(),
            "ogg" => "OGG".to_string(),
            "aac" => "AAC".to_string(),
            "m4a" | "alac" => "ALAC".to_string(),
            _ => ext.to_uppercase(),
        },
        None => "Unknown".to_string(),
    }
}

fn supported_ext(path: &Path) -> bool {
    if let Some(ext) = path.extension().and_then(|e| e.to_str()) {
        matches!(
            ext.to_lowercase().as_str(),
            "mp3" | "flac" | "wav" | "ogg" | "aac" | "m4a" | "alac" | "opus" | "wma" | "aiff"
        )
    } else {
        false
    }
}

fn parse_track(p: &Path) -> Option<Track> {
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

    let cover = None;

    Some(Track {
        id: p.to_string_lossy().to_string(),
        title,
        artist,
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

/// Returns true if we can create and write a small file inside `dir`.
/// Installed locations such as `C:\Program Files\Melo\skins` are typically
/// read-only for non-admin users; in that case we must fall back to the
/// per-user AppData folder so custom skins can actually be saved.
fn dir_is_writable(dir: &Path) -> bool {
    if let Err(e) = std::fs::create_dir_all(dir) {
        if e.kind() != std::io::ErrorKind::AlreadyExists {
            return false;
        }
    }
    let probe = dir.join(".melo-write-test");
    match std::fs::write(&probe, b"ok") {
        Ok(_) => {
            let _ = std::fs::remove_file(&probe);
            true
        }
        Err(_) => false,
    }
}



// ---- Tauri Commands ----

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

    // 2. Check embedded lyrics via lofty
    if let Some(tagged) = lofty::probe::Probe::open(p)
        .ok()
        .and_then(|pr| pr.read().ok())
    {
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

/// Seed the writable skins folder with the built-in default skins so that
/// there is only ONE skins directory the user ever deals with (AppData).
/// Missing defaults are copied in; existing files (including the user's
/// edited copies) are never overwritten.
fn ensure_default_skins(skins_dir: &Path) {
    let defaults = [
        ("compact-pill.html", DEFAULT_SKIN_COMPACT),
        ("full-html-example.html", DEFAULT_SKIN_FULL_EXAMPLE),
    ];
    for (name, content) in defaults {
        let target = skins_dir.join(name);
        if !target.exists() {
            let _ = std::fs::write(target, content);
        }
    }
}

#[tauri::command]
fn list_installed_skins(app: tauri::AppHandle) -> Result<Vec<SkinFileInfo>, String> {
    let skins_dir = get_writable_skins_dir(&app)?;
    let mut list = Vec::new();
    if let Ok(entries) = std::fs::read_dir(&skins_dir) {
        for entry in entries.filter_map(|e| e.ok()) {
            let path = entry.path();
            if path.is_file() {
                if let Some(ext) = path.extension().and_then(|e| e.to_str()) {
                    if ext.eq_ignore_ascii_case("html") || ext.eq_ignore_ascii_case("htm") {
                        let filename = path
                            .file_name()
                            .unwrap_or_default()
                            .to_string_lossy()
                            .to_string();
                        let stem = path
                            .file_stem()
                            .unwrap_or_default()
                            .to_string_lossy()
                            .to_string();
                        let name_clean = stem.replace('-', " ").replace('_', " ");
                        let name_formatted = name_clean
                            .split_whitespace()
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

#[tauri::command]
fn read_skin_file(filename_or_path: String, app: tauri::AppHandle) -> Result<String, String> {
    let path = Path::new(&filename_or_path);
    if path.is_absolute() && path.exists() {
        return std::fs::read_to_string(path).map_err(|e| e.to_string());
    }

    let skins_dir = get_writable_skins_dir(&app)?;
    let target = skins_dir.join(&filename_or_path);
    if target.exists() {
        return std::fs::read_to_string(&target).map_err(|e| e.to_string());
    }

    // Last-resort embedded fallback.
    match filename_or_path.as_str() {
        "compact-pill.html" | "compact-pill" => Ok(DEFAULT_SKIN_COMPACT.to_string()),
        "full-html-example.html" | "full-html-example" => Ok(DEFAULT_SKIN_FULL_EXAMPLE.to_string()),
        _ => Err(format!("Skin file not found: {}", filename_or_path)),
    }
}

/// The writable per-user skins directory where imported custom skins are
/// saved. Always AppData (or equivalent) on normal installs — never the
/// read-only Program Files location.
fn get_writable_skins_dir(app: &tauri::AppHandle) -> Result<PathBuf, String> {
    use tauri::Manager;
    let p = app
        .path()
        .app_data_dir()
        .map(|d| d.join("skins"))
        .map_err(|e| format!("Cannot resolve AppData skins folder: {}", e))?;
    std::fs::create_dir_all(&p)
        .map_err(|e| format!("Cannot create skins folder at {}: {}", p.display(), e))?;
    // Seed the single skins folder with the built-in defaults (only copies
    // files that don't already exist, so user edits are preserved).
    ensure_default_skins(&p);
    // If the directory exists but isn't actually writable, surface that now
    // instead of failing silently on the file write.
    if !dir_is_writable(&p) {
        return Err(format!(
            "The skins folder is not writable: {}",
            p.display()
        ));
    }
    Ok(p)
}

#[tauri::command]
fn save_custom_skin_file(
    filename: String,
    content: String,
    app: tauri::AppHandle,
) -> Result<String, String> {
    let skins_dir = get_writable_skins_dir(&app)?;
    let safe_filename = if filename.ends_with(".html") || filename.ends_with(".htm") {
        sanitize_filename(&filename)
    } else {
        format!("{}.html", sanitize_filename(&filename))
    };
    let target = skins_dir.join(&safe_filename);
    std::fs::write(&target, &content).map_err(|e| {
        format!(
            "Could not write skin to {}: {}",
            target.display(),
            e
        )
    })?;
    Ok(target.to_string_lossy().to_string())
}

/// Strip path separators and illegal characters from a skin filename so it
/// can't escape the skins directory.
fn sanitize_filename(name: &str) -> String {
    name.chars()
        .map(|c| match c {
            '/' | '\\' | ':' | '*' | '?' | '"' | '<' | '>' | '|' => '_',
            c => c,
        })
        .collect()
}

#[tauri::command]
fn open_skins_folder(app: tauri::AppHandle) -> Result<(), String> {
    let skins_dir = get_writable_skins_dir(&app)?;
    let abs_path = skins_dir.canonicalize().unwrap_or(skins_dir);
    let mut path_str = abs_path.to_string_lossy().to_string();
    if path_str.starts_with(r"\\?\") {
        path_str = path_str[4..].to_string();
    }
    #[cfg(target_os = "windows")]
    {
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

/// Collect every audio file passed on the command line. We only skip args
/// that look like actual flags (`--foo`/`-f`); bare paths (including any
/// starting with a dash on some shells) are checked against the filesystem.
fn args_to_tracks(args: impl IntoIterator<Item = String>) -> Vec<Track> {
    let mut tracks = Vec::new();
    for arg in args {
        // Skip well-known Tauri/webview flags.
        if arg.starts_with("--") || (arg.starts_with('-') && arg.len() <= 2 && !arg.ends_with(['\\', '/']))
        {
            continue;
        }
        let p = Path::new(&arg);
        if p.exists() && p.is_file() && supported_ext(p) {
            if let Some(t) = parse_track(p) {
                tracks.push(t);
            }
        }
    }
    tracks
}

#[tauri::command]
fn get_cli_tracks() -> Vec<Track> {
    args_to_tracks(std::env::args().skip(1))
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
        let ty = match p
            .extension()
            .and_then(|e| e.to_str())
            .unwrap_or("")
            .to_lowercase()
            .as_str()
        {
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
    t.save_to_path(p, Default::default())
        .map_err(|e| e.to_string())?;

    Ok(())
}

#[tauri::command]
fn open_url(url: String) -> Result<(), String> {
    #[cfg(target_os = "windows")]
    {
        std::process::Command::new("cmd")
            .args(["/C", "start", "", &url])
            .spawn()
            .map_err(|e| e.to_string())?;
    }
    #[cfg(not(target_os = "windows"))]
    {
        std::process::Command::new("xdg-open")
            .arg(&url)
            .spawn()
            .map_err(|e| e.to_string())?;
    }
    Ok(())
}

#[tauri::command]
fn get_audio_devices() -> Result<Vec<String>, String> {
    Ok(vec!["Default".to_string()])
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_single_instance::init(|app, args, _cwd| {
            use tauri::{Emitter, Manager};
            if let Some(window) = app.get_webview_window("main") {
                let _ = window.show();
                let _ = window.unminimize();
                let _ = window.set_focus();
            }

            let tracks = args_to_tracks(args.into_iter().skip(1));
            if !tracks.is_empty() {
                let _ = app.emit("melo:open-files", &tracks);
            }
        }))
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_global_shortcut::Builder::new().build())
        .invoke_handler(tauri::generate_handler![
            library_db::start_library_scan,
            library_db::cancel_library_scan,
            library_db::library_stats,
            library_db::library_groups,
            library_db::library_tracks,
            library_db::list_playlists,
            library_db::create_playlist,
            library_db::playlist_tracks,
            library_db::add_tracks_to_playlist,
            library_db::remove_track_from_playlist,
            library_db::clear_playlist,
            library_db::replace_playlist_tracks,
            library_db::replace_playlist_from_scan,
            library_db::clear_library_database,
            library_db::import_audio_files,
            library_db::ensure_track_artwork,
            library_db::get_track_by_id,
            library_db::delete_tracks,
            queue_db::queue_get_state,
            queue_db::queue_get_page,
            queue_db::queue_populate,
            queue_db::queue_append,
            queue_db::queue_play_next,
            queue_db::queue_remove,
            queue_db::queue_reorder,
            queue_db::queue_clear,
            queue_db::queue_next,
            queue_db::queue_prev,
            queue_db::queue_jump,
            queue_db::queue_set_position,
            queue_db::queue_set_shuffle,
            queue_db::queue_set_repeat,
            queue_db::queue_history,
            get_cli_tracks,
            get_track_lyrics,
            list_installed_skins,
            read_skin_file,
            save_custom_skin_file,
            open_skins_folder,
            write_tags,
            get_audio_devices,
            open_url
        ])
        .setup(|app| {
            let library_state = library_db::LibraryState::new(app.handle())
                .map_err(|e| std::io::Error::new(std::io::ErrorKind::Other, e))?;
            app.manage(library_state);

            use tauri::menu::{MenuBuilder, MenuItemBuilder, PredefinedMenuItem};
            use tauri::tray::{MouseButton, MouseButtonState, TrayIconBuilder, TrayIconEvent};
            use tauri::Manager;

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
                                if let Some(window) = app.get_webview_window("main") {
                                    if window.is_visible().unwrap_or(false) {
                                        let _ = window.hide();
                                    } else {
                                        let _ = window.show();
                                        let _ = window.unminimize();
                                        let _ = window.set_focus();
                                    }
                                }
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
                        if let TrayIconEvent::Click {
                            button: MouseButton::Left,
                            button_state: MouseButtonState::Up,
                            ..
                        } = event
                        {
                            let app = tray.app_handle();
                            if let Some(window) = app.get_webview_window("main") {
                                if window.is_visible().unwrap_or(false) {
                                    let _ = window.hide();
                                } else {
                                    let _ = window.show();
                                    let _ = window.unminimize();
                                    let _ = window.set_focus();
                                }
                            }
                        }
                    })
                    .build(app)?;
            }

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
