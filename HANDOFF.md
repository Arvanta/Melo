# 🎵 Melo (v0.3 Beta / 0.3.0) — Master Handoff Document

> **Important**: This document contains the full architectural breakdown, codebase state, solved pitfalls, and setup instructions for **Melo**. Use this document as the single source of truth to immediately continue development in a new chat/session without losing any context.

---

## 📌 1. Project Overview & Identity

- **Project Name**: Melo (Windows Desktop Music Player)
- **Current Version**: **0.3 Beta (`0.3.0`)**
- **Repository**: [https://github.com/Arvanta/Melo](https://github.com/Arvanta/Melo)
- **License**: **GPL-3.0-only** *(STRICT CONSTRAINT: Do NOT add MIT or any other license headers/files)*.
- **Target OS**: Windows 10 / 11 (x64)
- **Tech Stack**:
  - **Framework**: Tauri v2 (`@tauri-apps/api` ^2.0.0, Tauri CLI v2)
  - **Frontend**: TypeScript 5.x, Vite 6.x, HTML5 Canvas, WebAudio API, Vanilla DOM (lightweight, zero heavy UI frameworks)
  - **Backend**: Rust 1.77.2+ (Lofty for metadata/audio tags, Walkdir, Rayon, Serde, Tauri Plugins)
  - **Installer**: NSIS (`installMode: "perMachine"`, defaults to `C:\Program Files\Melo`)

---

## 🏗️ 2. Architectural Structure

```
Melo/
├── .github/workflows/
│   └── build.yml               # GitHub Actions CI for Windows x64 NSIS/MSI installers
├── public/
│   └── cover-demo.jpg          # Fallback cover art
├── skins/                      # Physical external skins loadable at runtime
│   ├── compact-pill-dark.html  # Minimal Compact Pill skin (Dark theme)
│   ├── compact-pill-light.html # Minimal Compact Pill skin (Light theme)
│   ├── example-custom.html     # Custom skin template
│   └── full-html-example.html  # Full HTML replacement skin template
├── src/
│   ├── app.css                 # Master application styles, dark/light variables & window styles
│   ├── audio-graph.ts          # Unified WebAudio graph (Source -> 10 EQ Filters -> Gain -> Analyser -> Dest)
│   ├── bus.ts                  # Cross-window EventBus (Tauri 2 emit/listen with BroadcastChannel fallback)
│   ├── cover.ts                # Cover art extractor & dynamic ambient color palette generator
│   ├── equalizer.ts            # 10-band Equalizer (32Hz–16kHz), 12 presets, persistent localStorage
│   ├── library.ts              # Track store, file ingestion, search/sort, drag-and-drop listener
│   ├── lyrics.ts               # LRC parser, real-time synced lyrics scrolling, click-to-seek
│   ├── main.ts                 # App entry, multi-window router, shortcuts (Ctrl+,, F2), DOM bindings
│   ├── mmb-stub.ts             # Stub for browser metadata parsing fallback
│   ├── player.ts               # Playback engine, queue management, volume, seeking, audio events
│   ├── skin.ts                 # Skin engine: disk loader, embedded fallbacks, DOM replacement
│   ├── types.ts                # TypeScript interfaces (Track, Skin, EqualizerPreset, etc.)
│   └── visualizer.ts           # 5-mode Canvas Visualizer (Bars, Wave, Circular, Mirror, Neon)
├── src-tauri/
│   ├── capabilities/
│   │   └── default.json        # Tauri 2 capabilities (identifier: "melo-capability")
│   ├── icons/                  # Application icons (32x32, 128x128, icon.ico, icon.png)
│   ├── src/
│   │   └── main.rs             # Rust backend (IPC commands, System Tray, Single Instance, Explorer)
│   ├── Cargo.toml              # Rust crate dependencies
│   ├── build.rs                # Tauri build script
│   └── tauri.conf.json         # Tauri 2 configuration (windows, NSIS perMachine, file associations)
├── index.html                  # Single-Page entry for all window instances
├── melo-final.zip              # Pre-bundled ready-to-push archive
├── package.json                # Frontend dependencies and npm scripts
├── tsconfig.json               # TypeScript compiler config
└── vite.config.ts              # Vite bundler config
```

---

## 🪟 3. Multi-Window & Routing Architecture

Melo uses Tauri 2 multi-window capabilities sharing the same `index.html` via URL query parameters (`?panel=...`):

1. **Main Player (`label: "main"`, default route `index.html`)**:
   - Frameless, transparent background (`"transparent": true`).
   - Default dimensions: **960 × 240 px** (Max height: 260px).
   - Compact Pill skin dimensions: **780 × 138 px** (resizes dynamically on skin switch).
   - Displays player card, transport controls, seeker, volume, dynamic ambient glow, and visualizer.
2. **Playlist Window (`?panel=playlist`)**:
   - Dimensions: 420 × 560 px.
   - Displays queue, track search, drag-and-drop zone, track duration, active playing indicator.
3. **Equalizer Window (`?panel=equalizer`)**:
   - Dimensions: 500 × 340 px.
   - 10 frequency sliders (-12dB to +12dB), 12 preset selector dropdown, Flat reset button.
4. **Lyrics Window (`?panel=lyrics`)**:
   - Dimensions: 420 × 520 px.
   - Auto-scrolling `.lrc` synced lyrics with active line highlighting and click-to-seek.
5. **Settings Window (`?panel=settings`)**:
   - Shortcuts: `Ctrl + ,` and `F2`.
   - Tabs: **General**, **Playback**, **Library**, **Appearance**, **Shortcuts**, **About**.
   - **Appearance Tab Components**:
     - Active Skin dropdown (`#skinSelect`).
     - Light/Dark theme toggle button (`#btnSkinThemeToggle` ☀️/🌙).
     - Refresh Skins from disk button (`🔄`).
     - Open Skins Folder button (`📁 Open Skins Folder`).
     - Dynamic Ambient Theme toggle (extracts dominant color from album art).
     - *(Note: Window Opacity slider and Show Stop Button have been intentionally removed)*.

---

## 🎧 4. Audio Pipeline & WebAudio Graph

- **Unified Audio Graph Chain** (`src/audio-graph.ts`):
  ```
  HTMLAudioElement -> MediaElementAudioSourceNode -> [10 BiquadFilterNodes (EQ)] -> GainNode -> AnalyserNode -> AudioContext.destination
  ```
- **Asset Protocol & CORS (Crucial Gotcha)**:
  - Local tracks are converted with `convertFileSrc(path)` (`asset://` or `http://asset.localhost/`).
  - **DO NOT** set `audio.crossOrigin = "anonymous"` on Tauri local asset files. In Chromium / WebView2, setting `crossOrigin` on custom asset protocols causes CORS taint and mutes WebAudio to zero output.
  - `AudioContext.resume()` is called on user interaction and play events to comply with browser autoplay policies.

---

## 🎨 5. Skin Engine & Compact Pill Skin

- **Skin Types**:
  - `Default (Dark)` & `Default (Light)`: Classic studio wide player.
  - `Compact Pill (Dark)` & `Compact Pill (Light)`: Minimalist pill design (138px height) with circular album cover, single-line seeker, minimalist SVG transport buttons, and ordered header actions.
  - `Custom Disk Skins`: HTML/CSS files loaded from `skins/` or `%APPDATA%/com.melo.app/skins/`.
- **Recursion Guard**:
  - When skin change event (`melo:skin-changed`) arrives from another window, `applySkinChoice(skinId, false)` is called with `broadcast = false` to prevent infinite event feedback loops between windows.

---

## 🦀 6. Rust Backend Commands (`src-tauri/src/main.rs`)

| Command | Description |
|---|---|
| `scan_library(paths)` | Recursively scans folders for audio files using `walkdir` + `rayon` + `lofty` metadata extractor. |
| `parse_track(path)` | Extracts ID3/Vorbis/FLAC metadata and embedded cover art (<300KB payload cap). |
| `get_cli_tracks()` | Retrieves audio files passed via CLI arguments or Windows "Open With". |
| `get_track_lyrics(path)` | Searches for adjacent or tag-embedded `.lrc` lyrics file. |
| `list_installed_skins()` | Scans `skins/` directory and returns available skin definitions. |
| `read_skin_file(filename)` | Reads custom skin HTML/CSS content from disk. |
| `open_skins_folder()` | Opens the user skins folder in Windows File Explorer (`cmd /C start` / `explorer.exe`). |
| `save_custom_skin_file(name, content)` | Writes user-imported skin to disk. |

---

## ⚙️ 7. System Configuration & Windows Integration

1. **Tauri 2 Capability Identifier**:
   - `src-tauri/capabilities/default.json` uses `"identifier": "melo-capability"` (Avoids conflict with Tauri internal `default` identifier).
2. **Windows NSIS Installer**:
   - `src-tauri/tauri.conf.json` configures:
     ```json
     "windows": {
       "nsis": {
         "installMode": "perMachine"
       }
     }
     ```
   - Automatically installs to `C:\Program Files\Melo`.
3. **File Associations**:
   - Supported extensions: `.mp3`, `.flac`, `.wav`, `.aac`, `.ogg`, `.m4a`, `.alac`, `.opus`, `.wma`, `.aiff`.
4. **Single-Instance Plugin**:
   - If a user double-clicks an audio file while Melo is open, the second instance forwards the file path to the running instance and terminates immediately.
5. **System Tray**:
   - Context menu: Play/Pause, Next Track, Previous Track, Mute/Unmute, Show/Hide Melo, Exit.

---

## 🐛 8. Solved Issues & Pitfall Memory

1. **Tauri 2 Runtime Detection**:
   - `(window as any).__TAURI__` is undefined by default in Tauri 2. Use `typeof (window as any).__TAURI_INTERNALS__ !== "undefined" || typeof (window as any).__TAURI__ !== "undefined"`.
2. **WebAudio Silent Playback**:
   - Caused by `audio.crossOrigin = "anonymous"`. Removed to allow clean playback through `MediaElementAudioSourceNode`.
3. **LocalStorage 5MB Quota Crash**:
   - Large raw base64 covers previously caused `localStorage` to fail silently, breaking playlist sync. Resolved by capping parsed cover payloads under 300KB in Rust.
4. **Tauri Capability Build Error**:
   - Error: `capability with identifier 'default' already exists`. Fixed by renaming capability identifier to `melo-capability`.
5. **Window Transparency Ghost Box**:
   - Fixed by applying `background: transparent !important;` on `body.tauri-main` and `.app-shell`.

---

## 🚀 9. How to Build, Run, and Release

### Local Development:
```bash
# Install dependencies
npm install

# Build frontend
npm run build

# Run in Tauri Desktop mode (requires Rust & Tauri CLI installed)
npm run tauri dev
```

### GitHub Actions Automated Release:
- Push to `main` or `master` branch with tag `v0.3.0`.
- `.github/workflows/build.yml` will automatically build the Windows x64 `.exe` (NSIS) and `.msi` installers and create a draft GitHub Release.

### Package Archive:
- All source files and pre-built `dist/` assets are packed in **`melo-final.zip`** in the repository root.

---

## 📋 10. Next Steps / Checklist for the Next Session

- [x] Version bumped to **0.3.0 / Melo 0.3 Beta** everywhere.
- [x] NSIS perMachine configured for `C:\Program Files\Melo`.
- [x] File associations registered.
- [x] Single instance audio argument handling verified.
- [x] Minimal Compact Pill skin integrated & resized correctly.
- [x] Settings window shortcuts (`Ctrl+,`, `F2`) and Appearance controls verified.
- [x] WebAudio EQ, Visualizer, and Synced Lyrics operational.
- [x] `melo-final.zip` updated with all latest code.
- [ ] Push `melo-final.zip` contents to GitHub repository `Arvanta/Melo` to trigger CI build.
- [ ] Download and test the generated `.exe` installer on Windows machine.
