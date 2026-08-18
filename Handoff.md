# Melo — Handoff Notes (v0.5.1)

## Project overview
Melo is a Tauri v2 + TypeScript desktop music player for Windows.
Backend: Rust (SQLite via rusqlite). Frontend: vanilla TS + Vite, no framework.
Main source folders:
- `src/`            frontend (player, library, queue, skins, visualizer)
- `src-tauri/src/`  Rust backend (library_db.rs, queue_db.rs, main.rs)
- `skins/`          built-in skins (HTML/CSS, shipped via include_str!)

## What's new in v0.5.1
This is a stability/performance patch over v0.5.0:
- **CPU usage after large scans is fixed.** Removed a global
  `MutationObserver` that re-ran `querySelectorAll` on every DOM change
  during list rendering — this was the main cause of sustained high CPU
  (especially for 8k-track libraries).
- **Scan event throttling.** `melo:scan-progress` is emitted at most
  ~4×/sec and the per-file `melo:library-changed` flood during scans was
  removed (only one final event is sent).
- **Visualizer is idle-friendly.** When playback is paused it now draws at
  ~4 fps instead of a full 60 fps rAF, and stops completely when the
  window is hidden.
- **Busy-spin removed** from the scan result collector loop (20 ms sleep
  when the result queue is empty).
- The bundled **slate** skin has been updated to the latest uploaded
  version.

Everything else from v0.5.0 is unchanged (queue, skins engine, single
AppData skins folder, cover fixes, folder drag, multi-file Open With, etc.).

## Key architecture
- **Player** (`src/player.ts`): owns the `<audio>` element, transport, replay gain,
  fade-on-pause, MediaSession. It does NOT hold the queue itself — it calls the
  queue layer (`src/queue.ts`) which talks to Rust (`queue_db.rs`).
- **Queue** (`src-tauri/src/queue_db.rs`): a single `playing_queue` table plus
  `queue_state` (current seq/position). Sources: tracks / playlist / library /
  scan / folder. History table for prev/back navigation.
- **Library** (`src-tauri/src/library_db.rs`): `tracks` table with
  `artwork_path`. Artwork is extracted from tags once, hashed (SHA-256) and
  cached as 256px PNGs in `artwork-cache/`. The frontend loads them via
  `convertFileSrc` (asset.localhost).
- **Skins**: full-HTML skins replace `#playerCard` innerHTML. They can declare
  window geometry via `<meta name="melo-window" content="...">`. Default skin is
  the built-in markup; `compact-pill.html` is a fixed skin. Custom skins are
  saved ONLY in the per-user AppData skins folder.
- **Skins shipped with v0.5.1**: compact-pill, full-html-example, microline,
  ivory, silk-orbit, slate.

## Important conventions
- All skin commands read/write from a SINGLE writable folder:
  `%AppData%/com.melo.app/skins`. The installer/Program Files folder is
  read-only and never written to. Legacy skins next to the old install are
  migrated and the old folder removed on launch.
- Default skin window: 960×240, **fixed height**, width resizable 640–960.
- Persistent prefs use `localStorage` keys `melo-pref-*`.
- Bus events (cross-window) use `busOn/busEmit` (`src/bus.ts`).
- Cover loading uses a `Map<id, HTMLElement[]>` so multiple rows sharing
  one artwork (e.g. tracks from one album) all receive the image; never
  silently drop a second element with the same id.

## Build / run
- Dev:        `npm run tauri dev`
- Frontend:  `npm run build`   (tsc + vite → dist/)
- Backend:   `cargo check --manifest-path src-tauri/Cargo.toml`
- Release:   `npm run tauri build`
- Linux deps for `cargo check`: libgtk-3-dev, libwebkit2gtk-4.1-dev,
  libsoup-3.0-dev, libjavascriptcoregtk-4.1-dev, librsvg2-dev, libssl-dev,
  pkg-config.

## Release checklist
- Version bumped in `package.json`, `src-tauri/Cargo.toml`,
  `src-tauri/tauri.conf.json`, and `src-tauri/Cargo.lock`.
- Run `npm run build` and `cargo check`.
- Build the Windows installer with `npm run tauri build`.
- Tag the release `v0.5.1` and attach `Melo-v0.5.1-source.zip`.
- The previous `v0.5.0` release and its asset stay untouched.

## Known things to watch
1. If covers still don't appear, the cause is almost always the stale WebView
   cache of `asset.localhost` — delete `%AppData%/com.melo.app/artwork-cache`
   and restart.
2. When changing the default player markup, also update
   `skins/compact-pill.html` and `skins/full-html-example.html` IDs.
3. The visualizer canvas sizes from its container via ResizeObserver; make
   sure any new container has a non-zero height at mount.
4. `library_db.rs` uses blocking SQLite inside `spawn_blocking`; keep all DB
   access off the async runtime.
