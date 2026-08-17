# Melo — Handoff Notes (v0.5.0)

## Project overview
Melo is a Tauri v2 + TypeScript desktop music player for Windows.
Backend: Rust (SQLite via rusqlite). Frontend: vanilla TS + Vite, no framework.
Main source folders:
- `src/`            frontend (player, library, queue, skins, visualizer)
- `src-tauri/src/`  Rust backend (library_db.rs, queue_db.rs, main.rs)
- `skins/`          built-in skins (HTML/CSS, shipped via include_str!)

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

## Important conventions
- All skin commands read/write from a SINGLE writable folder:
  `%AppData%/com.melo.app/skins`. The installer/Program Files folder is
  read-only and never written to (legacy `_up_/skins` is migrated + removed on
  startup by `migrate_legacy_skins`).
- Default skin window: 960×240, **fixed height**, width resizable 640–960.
- Persistent prefs use `localStorage` keys `melo-pref-*` (e.g. `melo-pref-tray`).
- Bus events (cross-window) use `busOn/busEmit` (`src/bus.ts`) wrapping Tauri
  events. The `melo:skin-changed` / `melo:skins-changed` events drive live
  updates.

## Build / run
- Dev:        `npm run tauri dev`
- Frontend:  `npm run build`   (tsc + vite → dist/)
- Backend:   `cargo check --manifest-path src-tauri/Cargo.toml`
- Release:   `npm run tauri build`
- Linux deps for `cargo check`: libgtk-3-dev, libwebkit2gtk-4.1-dev,
  libsoup-3.0-dev, libjavascriptcoregtk-4.1-dev, librsvg2-dev, libssl-dev,
  pkg-config.

## Known things to watch
1. The Windows MSIX/NSIS installer may leave skins in
   `C:\Program Files\Melo\_up_\skins`; migration runs best-effort on launch.
2. `asset.localhost` requires `csp` allowances in tauri.conf.json — if cover
   images fail to load, check the CSP first.
3. When changing the default player markup, also update
   `skins/compact-pill.html` and `skins/full-html-example.html` IDs.
4. The visualizer canvas sizes from its container via ResizeObserver; if you
   add a new container, make sure it has a non-zero height at mount.
5. `library_db.rs` uses blocking SQLite inside `spawn_blocking`; keep all DB
   access off the async runtime.

## Release checklist
- Bump version in `package.json`, `src-tauri/Cargo.toml`, `tauri.conf.json`.
- Run `npm run build` and `cargo check`.
- Build the Windows installer with `npm run tauri build`.
- Tag the release and attach `Melo-v0.5.0-source.zip`.
