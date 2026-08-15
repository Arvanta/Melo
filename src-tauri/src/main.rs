#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use base64::Engine as _;
use lofty::file::{AudioFile, TaggedFileExt};
use lofty::tag::{Accessor, TagExt};
use serde::{Deserialize, Serialize};
use std::path::{Path, PathBuf};
use walkdir::WalkDir;

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
const DEFAULT_SKIN_COMPACT_LIGHT: &str = include_str!("../../skins/compact-pill-light.html");
const DEFAULT_SKIN_COMPACT_DARK: &str = include_str!("../../skins/compact-pill-dark.html");
const DEFAULT_SKIN_EXAMPLE: &str = include_str!("../../skins/example-custom.html");
const DEFAULT_SKIN_FULL_EXAMPLE: &str = include_str!("../../skins/full-html-example.html");

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

    let cover = tag.and_then(|t| {
        let pics = t.pictures();
        if pics.is_empty() {
            return None;
        }
        let pic = &pics[0];
        let mime = pic
            .mime_type()
            .map(|m| m.as_str().to_string())
            .unwrap_or_else(|| "image/jpeg".to_string());
        let data = pic.data();
        if data.len() > 300_000 {
            return None;
        }
        let b64 = base64::engine::general_purpose::STANDARD.encode(data);
        Some(format!("data:{};base64,{}", mime, b64))
    });

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

// Fast metadata parser for bulk library scanning — skips heavy base64 cover extraction
fn parse_track_fast(p: &Path) -> Option<Track> {
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

    Some(Track {
        id: p.to_string_lossy().to_string(),
        title,
        artist,
        album,
        genre,
        year,
        duration,
        path: p.to_string_lossy().to_string(),
        cover: None, // Lazy-loaded on demand during playback
        codec,
        specs,
        replay_gain,
    })
}

// ---- Skin Folder Resolver & Populator ----

fn get_skins_dir(app: &tauri::AppHandle) -> PathBuf {
    use tauri::Manager;
    // 1. Next to current executable (e.g. C:\Program Files\Melo\skins\ or portable)
    if let Ok(exe) = std::env::current_exe() {
        if let Some(parent) = exe.parent() {
            let p = parent.join("skins");
            let _ = std::fs::create_dir_all(&p);
            if p.exists() && p.is_dir() {
                ensure_default_skins_on_disk(&p);
                return p;
            }
        }
    }
    // 2. Standard AppData writable directory on Windows
    if let Ok(app_data) = app.path().app_data_dir() {
        let p = app_data.join("skins");
        let _ = std::fs::create_dir_all(&p);
        ensure_default_skins_on_disk(&p);
        return p;
    }
    // 3. Fallback relative
    let p = PathBuf::from("skins");
    let _ = std::fs::create_dir_all(&p);
    ensure_default_skins_on_disk(&p);
    p
}

fn ensure_default_skins_on_disk(skins_dir: &Path) {
    let f1 = skins_dir.join("compact-pill-light.html");
    if !f1.exists() {
        let _ = std::fs::write(f1, DEFAULT_SKIN_COMPACT_LIGHT);
    }
    let f2 = skins_dir.join("compact-pill-dark.html");
    if !f2.exists() {
        let _ = std::fs::write(f2, DEFAULT_SKIN_COMPACT_DARK);
    }
    let f3 = skins_dir.join("example-custom.html");
    if !f3.exists() {
        let _ = std::fs::write(f3, DEFAULT_SKIN_EXAMPLE);
    }
    let f4 = skins_dir.join("full-html-example.html");
    if !f4.exists() {
        let _ = std::fs::write(f4, DEFAULT_SKIN_FULL_EXAMPLE);
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

#[tauri::command]
fn read_skin_file(filename_or_path: String, app: tauri::AppHandle) -> Result<String, String> {
    let path = Path::new(&filename_or_path);
    if path.is_absolute() && path.exists() {
        return std::fs::read_to_string(path).map_err(|e| e.to_string());
    }

    let skins_dir = get_skins_dir(&app);
    let target = skins_dir.join(&filename_or_path);
    if target.exists() {
        return std::fs::read_to_string(&target).map_err(|e| e.to_string());
    }

    // Check embedded fallback if filename matches
    match filename_or_path.as_str() {
        "compact-pill-light.html" | "compact-pill-light" => Ok(DEFAULT_SKIN_COMPACT_LIGHT.to_string()),
        "compact-pill-dark.html" | "compact-pill-dark" => Ok(DEFAULT_SKIN_COMPACT_DARK.to_string()),
        "example-custom.html" | "example-custom" => Ok(DEFAULT_SKIN_EXAMPLE.to_string()),
        "full-html-example.html" | "full-html-example" => Ok(DEFAULT_SKIN_FULL_EXAMPLE.to_string()),
        _ => Err(format!("Skin file not found: {}", filename_or_path)),
    }
}

#[tauri::command]
fn save_custom_skin_file(filename: String, content: String, app: tauri::AppHandle) -> Result<String, String> {
    let skins_dir = get_skins_dir(&app);
    let safe_filename = if filename.ends_with(".html") || filename.ends_with(".htm") {
        filename
    } else {
        format!("{}.html", filename)
    };
    let target = skins_dir.join(&safe_filename);
    std::fs::write(&target, content).map_err(|e| e.to_string())?;
    Ok(target.to_string_lossy().to_string())
}

#[tauri::command]
fn open_skins_folder(app: tauri::AppHandle) -> Result<(), String> {
    let skins_dir = get_skins_dir(&app);
    let _ = std::fs::create_dir_all(&skins_dir);
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

#[tauri::command]
fn get_cli_tracks() -> Vec<Track> {
    let args: Vec<String> = std::env::args().skip(1).collect();
    let mut tracks = Vec::new();
    for arg in args {
        if arg.starts_with("--") || arg.starts_with("-") {
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
fn get_track_cover(path: String) -> Option<String> {
    let p = Path::new(&path);
    let tagged = lofty::probe::Probe::open(p).ok()?.read().ok()?;
    let tag = tagged.primary_tag().or(tagged.first_tag())?;
    let pics = tag.pictures();
    if pics.is_empty() {
        return None;
    }
    let pic = &pics[0];
    let mime = pic
        .mime_type()
        .map(|m| m.as_str().to_string())
        .unwrap_or_else(|| "image/jpeg".to_string());
    let data = pic.data();
    if data.len() > 600_000 {
        return None;
    }
    let b64 = base64::engine::general_purpose::STANDARD.encode(data);
    Some(format!("data:{};base64,{}", mime, b64))
}

#[tauri::command]
fn scan_library(path: String, app: tauri::AppHandle) -> Result<Vec<Track>, String> {
    use rayon::prelude::*;
    use tauri::Emitter;
    let root = Path::new(&path);
    if !root.exists() {
        return Err("Path does not exist".to_string());
    }

    if root.is_file() {
        if supported_ext(root) {
            if let Some(t) = parse_track_fast(root) {
                return Ok(vec![t]);
            }
        }
        return Ok(Vec::new());
    }

    let entries: Vec<_> = WalkDir::new(root)
        .follow_links(true)
        .into_iter()
        .filter_map(|e| e.ok())
        .filter(|e| e.file_type().is_file() && supported_ext(e.path()))
        .collect();

    let total = entries.len();
    let _ = app.emit("melo:scan-progress", serde_json::json!({ "done": 0, "total": total, "finished": false }));
    let mut tracks: Vec<Track> = Vec::with_capacity(total);
    // Process in batches of 100 for lightweight streaming and UI smoothness
    for chunk in entries.chunks(100) {
        let batch: Vec<Track> = chunk
            .par_iter()
            .filter_map(|entry| parse_track_fast(entry.path()))
            .collect();
        let done = tracks.len() + batch.len();
        let _ = app.emit("melo:scan-batch", &batch);
        let _ = app.emit("melo:scan-progress", serde_json::json!({ "done": done, "total": total, "finished": done == total }));
        tracks.extend(batch);
    }
    let _ = app.emit(
        "melo:scan-progress",
        serde_json::json!({ "done": total, "total": total, "finished": true }),
    );
    Ok(tracks)
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

#[tauri::command]
fn toggle_devtools(window: tauri::WebviewWindow) {
    #[cfg(feature = "devtools")]
    {
        if window.is_devtools_open() {
            window.close_devtools();
        } else {
            window.open_devtools();
        }
    }
}

#[tauri::command]
fn open_devtools(window: tauri::WebviewWindow) {
    #[cfg(feature = "devtools")]
    {
        window.open_devtools();
    }
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

            let mut tracks = Vec::new();
            for arg in args.into_iter().skip(1) {
                if !arg.starts_with("-") {
                    let p = Path::new(&arg);
                    if p.exists() && p.is_file() && supported_ext(p) {
                        if let Some(t) = parse_track(p) {
                            tracks.push(t);
                        }
                    }
                }
            }
            if !tracks.is_empty() {
                let _ = app.emit("melo:open-files", &tracks);
            }
        }))
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_global_shortcut::Builder::new().build())
        .invoke_handler(tauri::generate_handler![
            get_cli_tracks,
            get_track_lyrics,
            get_track_cover,
            list_installed_skins,
            read_skin_file,
            save_custom_skin_file,
            open_skins_folder,
            scan_library,
            write_tags,
            get_audio_devices,
            open_url,
            toggle_devtools,
            open_devtools
        ])
        .setup(|app| {
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
                        if let TrayIconEvent::Click { button: MouseButton::Left, button_state: MouseButtonState::Up, .. } = event {
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
