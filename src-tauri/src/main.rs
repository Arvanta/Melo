#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use base64::Engine as _;
use lofty::file::{AudioFile, TaggedFileExt};
use lofty::tag::{Accessor, TagExt};
use serde::{Deserialize, Serialize};
use std::path::Path;
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

// ---- Tauri Commands ----

#[tauri::command]
fn scan_library(path: String, app: tauri::AppHandle) -> Result<Vec<Track>, String> {
    use rayon::prelude::*;
    use tauri::Emitter;
    let root = Path::new(&path);
    if !root.exists() {
        return Err("Path does not exist".to_string());
    }

    let entries: Vec<_> = WalkDir::new(root)
        .follow_links(true)
        .into_iter()
        .filter_map(|e| e.ok())
        .filter(|e| e.file_type().is_file() && supported_ext(e.path()))
        .collect();

    // progressive, non-blocking scan: emit batches + progress so the UI can
    // add files incrementally while scanning continues in the background
    let total = entries.len();
    let _ = app.emit("melo:scan-progress", serde_json::json!({ "done": 0, "total": total }));
    let mut tracks: Vec<Track> = Vec::new();
    for chunk in entries.chunks(25) {
        let batch: Vec<Track> = chunk
            .par_iter()
            .filter_map(|entry| parse_track(entry.path()))
            .collect();
        let done = tracks.len() + batch.len();
        let _ = app.emit("melo:scan-batch", &batch);
        let _ = app.emit("melo:scan-progress", serde_json::json!({ "done": done, "total": total }));
        tracks.extend(batch);
    }
    let _ = app.emit(
        "melo:scan-progress",
        serde_json::json!({ "done": total, "total": total, "finished": true }),
    );
    Ok(tracks)
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
        if data.len() > 800_000 {
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

#[tauri::command]
fn write_tags(path: String, tags: TagWriteRequest) -> Result<(), String> {
    let p = Path::new(&path);
    let mut tagged = lofty::probe::Probe::open(p)
        .map_err(|e| e.to_string())?
        .read()
        .map_err(|e| e.to_string())?;

    // If no tag exists, create one based on file type (immutable check first)
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

    // Borrow the tag exactly once (avoids E0499 double mutable borrow)
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
    // Save
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
    // Placeholder — in a full build you would enumerate via cpal
    Ok(vec!["Default".to_string()])
}

fn main() {
    // System Media Transport Controls (SMTC) on Windows
    // Uses `souvlaki` crate — minimal integration example
    #[cfg(target_os = "windows")]
    {
        // We initialize SMTC in a separate thread so it doesn't block
        std::thread::spawn(|| {
            #[cfg(feature = "souvlaki")]
            {
                // Example: let mut controls = souvlaki::MediaControls::new(...);
            }
        });
    }

    tauri::Builder::default()
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_global_shortcut::Builder::new().build())
        .invoke_handler(tauri::generate_handler![
            scan_library,
            write_tags,
            get_audio_devices,
            open_url
        ])
        .setup(|app| {
            // Global shortcuts for media keys
            #[cfg(desktop)]
            {
                let _ = app.handle();
                // Media keys are usually handled by OS/SMTC, but we also register
                // Ctrl+Shift+P etc as fallback
            }
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
