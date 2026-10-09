# Melo — Modern Windows Music Player

A lightweight, native-feeling desktop music player built with **Tauri 2**, **TypeScript** and **Rust**.
The main window is a compact player card; the Library, Playlist, Equalizer, Synced Lyrics and Settings each open as
**independent native OS windows** that stay in sync with the player.

Version: **1.1.0** • License: **GPL-3.0**

![Melo — main player window](assets/main-window.png)

## ❤️ Donate

If Melo is useful to you, you can support development here:

**[https://arvanta.github.io](https://arvanta.github.io)**

## ✨ Features

| Area | Details |
|------|---------|
| **Formats** | MP3, FLAC, WAV, AAC, OGG, ALAC/OPUS — metadata & covers read natively via Rust (`lofty`) |
| **Playback** | Play/Pause, Stop, Next/Prev, seek bar, volume under the cover, Shuffle, Repeat (Off/All/One). Keys: Space, ←/→, M, S, R, ↑/↓ |
| **Playlist Management** | Multiple playlists, **Drag & Drop reordering**, in-playlist **search/filter**, **sorting** (by Title, Artist, Album, Duration), M3U export |
| **Synced Lyrics** | Real-time synchronized lyrics support (**`.lrc` files** and embedded tags), smooth active line highlighting, auto-scroll, and click-to-seek |
| **Dynamic Ambient Theme** | Automatically extracts vibrant dominant colors from album artwork to dynamically colorize the accent, visualizer, and ambient glows (toggleable in Settings) |
| **System Tray Menu** | Windows system tray icon with full playback menu: Play/Pause, Next, Prev, Mute/Unmute, Show/Hide, and Quit |
| **Single-Instance** | Prevents multiple instances; clicking shortcuts or opening audio files from Explorer focuses the existing instance and plays immediately |
| **Multi-window** | Library / Playlist / Equalizer / Lyrics / Settings open as real OS windows, synced via the event bus |
| **Equalizer** | 10 bands (31 Hz – 16 kHz), 12 presets + Reset button, persistent state across restarts |
| **Skins from Disk** | Loads skins directly from the `skins/` installation folder; instant live reload via Refresh button (🔄) and explorer opener. Build your own player layout — any size, any structure — see the **[Skin Authoring Guide](skins/README.md)** |

## 🖥️ Build for Windows (GitHub Actions)

1. Create a GitHub repository and push this folder:
   ```bash
   git init
   git add .
   git commit -m "Melo 1.1.0"
   git branch -M main
   git remote add origin https://github.com/Arvanta/Melo.git
   git push -u origin main
   ```
2. The `Build Melo` workflow runs automatically on push (or via **Actions → Run workflow**).
3. Get the installers:
   - **Releases** → the draft release `v1.1.0` (contains `Melo_1.1.0_x64-setup.exe` and the `.msi`) — publish it to make the release permanent.
   - **Actions → run → Artifacts → melo-windows** (zip with the same installers).
4. Install `Melo_1.1.0_x64-setup.exe` (installs to standard `C:\Program Files\Melo`).

### 🔢 Publishing a new version (older releases are never replaced)

Every release is identified by its tag `v<version>`, and the workflow builds exactly that tag.
Before it does anything it runs two checks, and **it stops the whole build if either fails**:

| Check | What it protects |
|---|---|
| `node tools/version.mjs --check` | All version-declaring files must agree (`package.json`, `package-lock.json`, `tauri.conf.json`, `Cargo.toml`, `Cargo.lock`, `src/version.ts`, this README) — so the installer name, the app's About version and the release tag can never drift apart. |
| Duplicate-tag guard | If the tag already exists on the remote the build refuses to continue — a version that was ever built (draft **or** published) can never be rebuilt or overwritten, and older releases and tags (`v1.0.0`, `v0.8.1`, `v0.8.0`, `v0.7.2`, …) stay exactly as they are. |

To ship the next version:

```bash
node tools/version.mjs 1.2.0     # bumps every version-declaring file at once
node tools/version.mjs --check   # optional: confirm they all agree
git commit -am "Melo 1.2.0"
git push
```

- The workflow creates a **draft** release tagged `v<version>` with the installers attached.
  Drafts are invisible to everyone else — open **Releases**, review it and press **Publish**
  when you are happy. Nothing is ever published automatically.
- Once a version has been built, its tag exists, so a later push with that same version fails
  the guard on purpose. Bump the version again (e.g. `node tools/version.mjs 1.2.1`) to build
  a new release instead of touching the old one.
- Installing a newer `Melo_x.y.z_x64-setup.exe` upgrades the copy already installed in
  `C:\Program Files\Melo` (same app identity). Nothing on the GitHub side is replaced by that.

## 🌐 Web Demo / Local Development

```bash
npm install
npm run dev      # http://localhost:1420
```

## 🛠️ Tech Notes

- **Rust**: `lofty` for metadata, `walkdir` + bounded background workers for scanning, SQLite for the Library, disk-cached artwork, and `tauri-plugin-single-instance` for single-instance control and tray actions.
- **Frontend audio**: `HTMLAudioElement` + one shared `AudioContext` (EQ filters → gain → analyser → output).
- **Desktop metadata**: `music-metadata-browser` is stubbed out of desktop bundles, keeping the Windows build small and fast.
