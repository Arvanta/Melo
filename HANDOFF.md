# Melo — Project Handoff (Version 0.3 Beta)

Attach this file plus `melo-final.zip` (full source) to a new chat and say "continue".

## Basics
- **Melo** — Windows desktop music player. Tauri 2 + TypeScript (Vite) + Rust.
- Repo: https://github.com/Arvanta/Melo — version **0.3 Beta** (`0.3.0`), license **GPL-3.0** (LICENSE already in repo; do NOT add "MIT" anywhere).
- Installer: NSIS configured with `installMode: "perMachine"` to install into standard `C:\Program Files\Melo`.
- CI: `.github/workflows/build.yml` (windows-latest, tauri-action, draft release `v0.3.0`; `paths-ignore` for README/assets/LICENSE).

## Architecture & What's New in 0.3 Beta
- **Advanced Playlist Management**:
  - Drag & Drop reordering of tracks inside the playlist window with live visual insertion indicator.
  - In-playlist real-time search & filter bar (`#playlistSearchInput`).
  - Playlist sorting dropdown (`#playlistSortSelect` by Title A-Z, Artist A-Z, Album A-Z, Duration Shortest/Longest).
- **Synced Lyrics (.lrc Support)**:
  - Real-time line-by-line synchronized scrolling lyrics from `.lrc` files (located next to audio files) and embedded tags.
  - Active line highlighting with smooth auto-scroll to center.
  - Interactive click-to-seek: clicking any lyric line seeks audio playback directly to that timestamp.
  - Dedicated Synced Lyrics window (`#win-lyrics` and Tauri OS window `/?panel=lyrics`).
- **Dynamic Ambient Theme (Cover-based)**:
  - Automatic extraction of vibrant dominant palette colors from album artwork.
  - Real-time adaptation of `--accent`, `--visualizer`, and ambient glow colors.
  - Option to toggle on/off in Settings ⬅ Appearance & Skin (`#swDynamicTheme`).
- **System Tray Playback Control Menu**:
  - Full Windows System Tray icon with context menu (Play/Pause, Next, Prev, Mute/Unmute, Show/Hide Melo, Exit).
  - Left-clicking the tray icon toggles and focuses the main window.
- **Dynamic Skin System from Physical Disk Folder (`skins/`)**:
  - Rust backend (`src-tauri/src/main.rs`) provides `list_installed_skins`, `read_skin_file`, `save_custom_skin_file`, and `open_skins_folder`.
  - In Settings: A **Refresh button (🔄)** re-scans the directory and applies changes immediately without restarting the app. An **Open Skins Folder 📁** button opens the folder in Explorer.
- **Minimal Compact Skin (Pill Bar)**:
  - Designed based on the ultra-clean pill card mockup (circular album art, large title, sleek single-line seeker, minimalist transport with full SVG icons, and no maximize button).
  - Both **Light ☀️** (`skins/compact-pill-light.html`) and **Dark 🌙** (`skins/compact-pill-dark.html`) themes included.
  - Dynamic window height locking: Automatically sizes window to `140px` and locks height without resizing artifacts.
- **Single-Instance Enforcement & Window Focus**:
  - `tauri-plugin-single-instance` prevents opening multiple instances of Melo.
  - Launching Melo while already running unminimizes and brings the active window to front.
- **Windows Explorer "Open With" & File Associations**:
  - `src-tauri/tauri.conf.json` registers file associations for `.mp3`, `.flac`, `.wav`, `.aac`, `.ogg`, `.m4a`, `.alac`, `.opus`, `.wma`, `.aiff`.
  - `src-tauri/src/main.rs` implements `get_cli_tracks` and `tauri_plugin_single_instance` to pass double-clicked/open-with files directly to the running instance and start playback immediately.
- **Equalizer Presets & Persistence**:
  - 12-preset profile list (`Flat`, `Pop`, `Rock`, `Bass Boost`, `Treble Boost`, `Dance`, `Jazz`, `Classical`, `Vocal`, `Acoustic`, `Hip Hop`, `Metal`).
  - Dedicated **Reset** button to quickly reset all 10 bands to 0 dB Flat.
  - Full persistence across restarts (`melo-eq-gains`, `melo-eq-preset`, `melo-eq-enabled`).
- **Multi-window**: main window = frameless player card only (`body.tauri-main`); panels open as real OS windows via `WebviewWindow` with `url: /?panel=library|playlist|equalizer|lyrics|settings`.
- **Cross-window sync**: Tauri events (`bus.ts`: busEmit/busOn) plus localStorage polling fallback.

## Build & publish flow
1. Commit all files, `git add -A && git commit -m "Melo 0.3 Beta" && git push` (no force push).
2. GitHub Actions builds `Melo_0.3.0_x64-setup.exe` + `.msi`; publish the draft release.
3. Verify locally with `npm i && npm run dev` (web demo mode = floating windows; Tauri-only features need the desktop build).
