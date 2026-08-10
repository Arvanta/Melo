# Melo — Modern Windows Music Player (Tauri + TypeScript + Rust)

A lightweight, native-feeling desktop music player built with **Tauri 2**, **TypeScript** and **Rust**.
The main window is a compact player card; the Library, Playlist, Equalizer and Settings each open as
**independent native OS windows** that stay in sync with the player.

![Melo — main player window](assets/main-window.png)

## ✨ Features

| Area | Details |
|------|---------|
| **Formats** | MP3, FLAC, WAV, AAC, OGG, ALAC/OPUS — metadata & covers read natively via Rust (`lofty`) |
| **Playback** | Play/Pause, optional Stop button (Settings → Appearance), Next/Prev, seek bar, volume under the cover (aligned with the progress bar), Shuffle, Repeat (Off/All/One). Keys: Space, ←/→, M, S, R, ↑/↓ |
| **Multi-window** | Library / Playlist / Equalizer / Settings open as real OS windows (native title bars), synced via the Tauri event bus (play, queue, theme, EQ, playlists) |
| **Drag & Drop** | Drop audio files/folders onto the player window → play + add to current playlist; onto the playlist window → add to playlist; onto the library window → import |
| **Playlists** | Multiple playlists, current-playlist selector, M3U export of the current list, persisted & synced across windows |
| **Equalizer** | 10 bands (31 Hz – 16 kHz), presets (Flat/Pop/Rock/Bass/Jazz/Classical/Vocal), live curve — runs as a remote window controlling the main audio graph |
| **Visualizer** | 5 modes: Classic Bars, Thin Bars, Spectrum Line, Mirror Bars, Oscilloscope. Left-click = next mode, right-click = choose. Log-spaced bands + AGC + smoothing for even, musical motion |
| **Library** | Folder scanning (parallel, via Rust), search, artist/album/genre filters, tag editor (title/artist/album/year/cover) written back with `lofty` |
| **Extras** | Light/Dark themes, custom HTML/CSS skins (web mode), ReplayGain, lyrics panel, GitHub Actions Windows builds |

## 🖥️ Build for Windows (GitHub Actions)

1. Create a GitHub repository and push this folder:
   ```bash
   git init
   git add .
   git commit -m "Melo"
   git branch -M main
   git remote add origin https://github.com/YOUR-USER/YOUR-REPO.git
   git push -u origin main
   ```
2. The `Build Melo` workflow runs automatically on push (or via **Actions → Run workflow**).
3. Get the installers:
   - **Releases** → draft release `Melo v1.0.0` (contains `Melo_1.0.0_x64-setup.exe` and the `.msi`) — publish to keep it permanent.
   - **Actions → run → Artifacts → melo-windows** (zip with the same installers).
4. Install `Melo_1.0.0_x64-setup.exe` (per-user, no admin needed). Windows SmartScreen may warn about the unsigned build — choose *More info → Run anyway*.

Bump the version in `src-tauri/tauri.conf.json` (and `package.json`) before tagging a new release.

## 🌐 Web demo (no Tauri)

```bash
npm install
npm run dev      # http://localhost:1420
```

In the browser the panels behave as draggable floating windows inside one page (same features,
single-window demo mode).

## ️ Project structure

```
── index.html
├── package.json / vite.config.ts
├── src/
│   ├── main.ts        # shell, routing (panel windows), menu, settings tabs
│   ├── bus.ts         # cross-window event bus (Tauri events / CustomEvents)
│   ├── audio-graph.ts # single shared WebAudio graph (EQ + visualizer)
│   ├── player.ts      # playback engine, queue, media session
│   ├── library.ts     # library, playlists, M3U, tags, drag & drop
│   ├── equalizer.ts   # EQ engine + remote UI
│   ├── visualizer.ts  # canvas visualizer (5 modes)
│   ├── skin.ts        # HTML/CSS skin engine
│   └── app.css
├── src-tauri/
│   ├── tauri.conf.json
│   ├── capabilities/default.json
│   └── src/main.rs    # scan_library / write_tags (lofty, walkdir, rayon)
└── .github/workflows/build.yml
```

## 🛠️ Tech notes

- **Rust**: `lofty` for reading/writing tags & covers, `walkdir` + `rayon` for parallel scanning.
- **Frontend audio**: `HTMLAudioElement` + one shared `AudioContext` (EQ filters → gain → analyser → output).
- **Desktop metadata**: `music-metadata-browser` is stubbed out of desktop bundles (native layer handles it), keeping the Windows build small and warning-free.

MIT License.
