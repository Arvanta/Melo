# 🎵 Melo (v0.5.2 Beta) — Master Handoff Document

> **Important**: This document is the single source of truth for continuing
> Melo's development in a new chat/session without losing context. It
> reflects the **real, current state** as of the v0.5.2 Beta release.
> It supersedes the previous v0.5.1 handoff. Per release-packaging policy,
> `HANDOFF.md` is **intentionally excluded** from distributable ZIP files.

---

## 📌 1. Project Overview & Identity

- **Project Name**: Melo (Windows Desktop Music Player)
- **Current Version**: **0.5.2 Beta (`0.5.2`)**
- **Repository**: [https://github.com/Arvanta/Melo](https://github.com/Arvanta/Melo)
- **License**: **GPL-3.0-only** *(STRICT CONSTRAINT: do NOT add MIT or any other license headers/files)*.
- **Target OS**: Windows 10 / 11 (x64)
- **Tech Stack**:
  - **Framework**: Tauri v2 (`@tauri-apps/api` ^2.0.0, Tauri CLI v2)
  - **Frontend**: TypeScript 5.x, Vite 6.x, HTML5 Canvas, WebAudio API, Vanilla DOM
  - **Backend**: Rust 1.77.2+ (Lofty for metadata/audio tags, Walkdir, Serde, rusqlite/SQLite, crossbeam-channel, Tauri Plugins)
  - **Installer**: NSIS (`installMode: "perMachine"`, defaults to `C:\Program Files\Melo`)
- **Release strategy**: each version ships as its own GitHub tag/release
  (`v0.5.2`). The previous `v0.5.1` and `v0.4.0` releases are **not**
  replaced or overwritten — each build's version bump (`package.json`,
  `package-lock.json`, `src-tauri/Cargo.toml`, `src-tauri/tauri.conf.json`,
  About UI, README) is what drives `tauri-action`'s `v__VERSION__` tag in
  `.github/workflows/build.yml`, so a new version number always produces a
  brand-new draft prerelease tag rather than overwriting an old one.

---

## 🏗️ 2. Architectural Structure

```
Melo/
├── .github/workflows/build.yml   # CI for Windows x64 NSIS/MSI installers
├── skins/
│   ├── compact-pill.html         # SINGLE combined Compact skin (Light + Dark)
│   ├── full-html-example.html    # Rewritten flexible example (English, data-melo)
│   └── README.md                 # SKIN-AUTHORING GUIDE (shipped to users' skins folder)
├── src/
│   ├── app.css
│   ├── audio-graph.ts            # WebAudio graph (Source -> 10 EQ Filters -> Gain -> Analyser -> Dest)
│   ├── bus.ts                    # Cross-window EventBus (Tauri emit/listen + CustomEvent fallback)
│   ├── cover.ts                  # Cover art extractor + dynamic ambient color palette
│   ├── equalizer.ts              # 10-band EQ, 12 presets, persistent localStorage
│   ├── i18n.ts                   # Minimal i18n loader (Settings window only)
│   ├── locales/
│   │   ├── en.json               # Base English strings (Settings window)
│   │   └── README.md             # Contributor guide for adding a translation
│   ├── library.ts                # SQLite-backed store, Artists/Albums/Genres, playlists
│   ├── lyrics.ts                 # LRC parser, synced scrolling lyrics
│   ├── main.ts                   # App entry, multi-window router, shortcuts, DOM bindings
│   ├── mmb-stub.ts               # Stub replacing music-metadata-browser in desktop builds
│   ├── player.ts                 # Playback engine, queue, volume, seeking, resume-on-reopen
│   ├── skin.ts                   # Skin engine: disk loader, embedded fallbacks, DOM replacement
│   ├── types.ts
│   └── visualizer.ts             # 5-mode Canvas Visualizer
├── src-tauri/
│   ├── capabilities/default.json # Tauri 2 permissions (all window ops included)
│   ├── src/main.rs               # Rust backend (IPC commands, tray, single instance, skins)
│   ├── src/library_db.rs         # SQLite Library backend (authoritative store)
│   ├── Cargo.toml
│   └── tauri.conf.json
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

Note: `src-tauri/Cargo.lock` is **not** committed (no Rust toolchain in this
workspace). It will be generated on the first `cargo build` / `tauri build`
on Windows — commit it afterwards for reproducible CI builds.

---

## 🪟 3. Multi-Window & Routing Architecture

Tauri 2 multi-window; all windows share `index.html` via `?panel=...`:

1. **Main Player** (`label: "main"`) — frameless, transparent, 960×240
   default / 780×138 in Compact Pill. Non-resizable while Compact Pill is
   active.
2. **Playlist Window** (`?panel=playlist`) — 440×560.
3. **Equalizer Window** (`?panel=equalizer`) — 700×440.
4. **Lyrics Window** (`?panel=lyrics`) — 380×520.
5. **Settings Window** (`?panel=settings`) — tabs: **General, Playback,
   Appearance, Shortcuts, About**.

The title-bar dropdown menu was removed in v0.4.0; actions remain in the
toolbar and Settings window.

---

## 🎨 4. Skin Architecture (v0.5.1 — IMPORTANT)

### 4.1 Compact Pill is now a SINGLE combined skin
- **`skins/compact-pill.html`** replaces the old
  `compact-pill-dark.html` + `compact-pill-light.html` pair.
- Both themes live in **one file** via CSS custom properties:
  - Dark values are the default in `:root`.
  - Light values override in `:root[data-theme="light"]`.
- The app sets `data-theme` on `<html>` (see `applyThemeLocal` in `main.ts`),
  so **switching theme no longer swaps skin files** — colors update in place.
- Extra token vars introduced for theme-differences that weren't previously
  parameterized: `--accent-soft`, `--cover-bg`, `--cover-border`,
  `--cover-shadow`, `--fallback-grad`, `--fallback-fg`, `--thumb-shadow`,
  `--transport-fg`.

### 4.2 Embedding & fallbacks
- `src/skin.ts` holds a single `COMPACT_PILL` embedded copy of the combined
  file (generated from `skins/compact-pill.html` — keep them in sync).
  `EMBEDDED_SKINS` maps both the new id AND the legacy ids
  (`compact-pill-light`, `compact-pill-dark`, with/without `.html`) to the
  same combined HTML, so users' saved `melo-active-skin-id` from older
  versions keeps working.
- `applySkinChoice()` no longer picks a dark/light file by theme; compact
  always resolves to `compact-pill.html`.
- **Rust** (`src-tauri/src/main.rs`):
  - `include_str!` is now a single `DEFAULT_SKIN_COMPACT`.
  - `ensure_default_skins_on_disk()` writes `compact-pill.html` and
    **deletes any leftover `compact-pill-light.html` / `compact-pill-dark.html`**
    from old installs.
  - `read_skin_file` fallback maps legacy names → `DEFAULT_SKIN_COMPACT`.
- **If you regenerate or edit `skins/compact-pill.html`, re-sync the
  embedded copy in `src/skin.ts`** (the `<style>` and `<body>` must match).

### 4.3 Bundled skins (v0.5.1)
- `skins/` ships 6 skins: `compact-pill.html`, `full-html-example.html`,
  **`slate.html`**, **`silk-orbit.html`**, **`ivory.html`**, **`microline.html`**
  (plus `README.md` guide). The four user/community skins are listed in
  `WEB_SKINS_LIST` (frontend) and embedded in Rust via `include_str!`
  (`DEFAULT_SKIN_SLATE`, `DEFAULT_SKIN_SILK_ORBIT`, `DEFAULT_SKIN_IVORY`,
  `DEFAULT_SKIN_MICROLINE`), written by `ensure_default_skins_on_disk`, and
  mapped in `read_skin_file`'s fallback. They are also bundled by the
  `../skins/*` resource glob in `tauri.conf.json`.
- **Resizable-skin size persistence (fixed)**: a skin whose geometry allows
  resizing no longer snaps back to its declared default size after app
  restart. `main.ts` startup clamps the saved `melo-geo-main` size to the
  active skin's min/max bounds, and `applyCustomSkin` gained an
  `applyGeometry` flag so boot-time / theme-change / broadcast re-applications
  persist geometry to localStorage **without** emitting `melo:skin-geometry`
  (which would force the default size). Geometry is only force-applied on
  explicit user selection/import.

### 4.4 Flexible custom-skin system (new in v0.5.1)

- **`example-custom.html` was removed entirely** (frontend list, Rust
  `include_str!`, disk write). Rust now deletes any stale
  `example-custom.html` from old installs on startup.
- **`full-html-example.html` was rewritten** in English as a complete
  reference skin that demonstrates every capability.
- **`data-melo` hooks**: every player control can be wired position-
  independently via a `data-melo` attribute instead of a hard-coded `id`.
  `findHook(id, role)` (in `src/skin.ts`) resolves `id` first, then
  `[data-melo="role"]`. Roles: `play`, `play-icon`, `pause-icon`, `prev`,
  `next`, `stop`, `shuffle`, `repeat`, `seek`, `volume`, `volume-icon`,
  `volume-pct`, `current-time`, `duration`, `title`, `artist`, `album`,
  `codec`, `specs`, `cover` (must be `<img>`), `cover-fallback`,
  `visualizer`, `add-files`, `add-folder`, `theme-toggle`, `about`,
  `toggle-library`, `toggle-playlist`, `toggle-eq`, `toggle-lyrics`,
  `toggle-settings`, `minimize`, `close`.
- **Window geometry**: a full skin can declare its native window bounds via
  `data-window-width` / `data-window-height` (+ optional `data-min-width`,
  `data-min-height`, **`data-max-width`, `data-max-height`**,
  `data-resizable="true|false"`) on `<html>`, `<body>` or `#lumi-player`.
  Any combination of target size / min / max works (e.g. min/max only, or a
  fixed size by setting min == max == target). `parseSkinGeometry()` stores
  it to `localStorage["melo-skin-geometry"]`; `main.ts` `getTargetSize()` /
  `applySizeConstraints()` resize the window and set min/max/resizable per
  skin (compact = fixed 780×138; default = 960×240 with a 650 floor and 260
  max height; custom = declared bounds, defaulting to a generous 240×120
  floor + free resize). `tauri.conf.json` main window constraints were
  relaxed (minWidth 240, minHeight 120, no maxHeight) to allow any skin size.
- **Visualizer is skin-controllable**: the container is resolved via
  `#vizBars` or `[data-melo="visualizer"]`, and `data-bars="N"` on it
  overrides the number of bars/columns for the bar-based modes.
- **CSS**: `body.custom-skin-active` lifts the default skin's 640px floor
  (`min-width: 0`) so narrow custom skins work.
- **Import now works from the Settings window too** — `setupSkinEngine` is
  also called for `?panel=settings` (it no-ops safely where there is no
  player card, but wires the Import Skin input / drag-drop and the save →
  broadcast → main-window-apply flow).
- **`skins/README.md`** is the full English skin-authoring guide; Rust
  `DEFAULT_SKIN_GUIDE` writes it into the user's skins folder so users can
  read it via "Open Skins Folder".

---

## 🔀 5. Crossfade Architecture (v0.5.2 — NEW)

### 5.1 Why a dual-deck design
Melo's playback engine was originally built around a **single** `<audio>`
element and a **singleton** Web Audio graph (`audio-graph.ts`): one
`MediaElementAudioSourceNode` feeding a fixed `EQ filters → gain →
analyser → destination` chain. Changing tracks meant swapping `audio.src`
on that one element, which cuts the previous track instantly — there is no
way to have two decoded streams overlapping in time on a single
`<audio>` element. Crossfade requires two simultaneous audio streams, so
this had to become a **two-deck** engine.

### 5.2 `audio-graph.ts` — multi-deck shared graph
- Refactored from a per-call singleton keyed to "the one audio element" into
  a **hub**: one `AudioContext`, one shared 10-band EQ filter chain, one
  master `GainNode`, one `AnalyserNode` — all created once — plus a
  `WeakMap<HTMLAudioElement, Deck>` where each `Deck` is
  `{ source: MediaElementAudioSourceNode; gain: GainNode }`.
- `getAudioGraph(audio)` now lazily creates (or reuses) a **deck** for
  whichever element is passed in, and fans that deck's `GainNode` into the
  shared filter chain's first node. Multiple decks can be connected
  simultaneously (Web Audio mixes multiple inputs into one node
  automatically) — this is what lets two tracks play, and be crossfaded,
  through the exact same EQ/analyser pipeline without touching
  `equalizer.ts` or `visualizer.ts` at all.
- Each deck's own `GainNode.gain` is what the crossfade automates (see
  5.4); it is separate from `HTMLMediaElement.volume` (used for user
  volume / ReplayGain / fade-out-on-pause, unchanged) and separate from the
  shared master `GainNode` (kept for API compatibility, unused for
  per-track volume).
- **Exported `Deck` interface** (was previously unexported/internal) so
  `player.ts` can type deck handles it retrieves via `graph.getDeck(el)`.

### 5.3 `player.ts` — active-deck pointer, not a full rewrite of playback state
Rather than threading "which deck is active" through every function, the
implementation keeps a single mutable pointer:
- `let audio: HTMLAudioElement = primaryAudio;` — **always** refers to
  whichever deck is the "current" one for UI purposes (seek bar, time
  labels, volume slider, mute, media session, keyboard shortcuts, resume
  snapshot, etc.). Because nearly the entire pre-existing `player.ts` body
  already read/wrote through a closure variable named `audio`, this required
  **no changes** to any of that logic — it transparently follows whichever
  physical element is active.
- `secondaryAudio: HTMLAudioElement | null` is created **lazily**, the
  first time a crossfade actually needs it. If the user never enables
  Crossfade, no second element, no second Web Audio deck, and no extra
  event listeners are ever created — zero overhead for the common case.
- `attachDeckListeners(el)` is called once per physical element (immediately
  for `primaryAudio`, lazily for `secondaryAudio`) and registers
  `timeupdate` / `loadedmetadata` / `ended` **once, permanently**, on that
  element. Each handler internally guards with `if (el !== audio) return;`
  so only whichever element is *currently* the active deck drives UI state
  or scheduling — this avoids the problem of JS listeners staying bound to
  the physical element they were registered on even after the `audio`
  pointer is reassigned.

### 5.4 Fade scheduling — native AudioParam automation, not rAF
- The existing fade-out-on-pause feature (`fadeVolumeTo`) drives
  `HTMLMediaElement.volume` via `requestAnimationFrame`, which is fine for a
  short, single-element 0.5s fade but is not used for crossfade.
- Crossfade instead uses **`GainNode.gain.setValueCurveAtTime(...)`** with a
  precomputed equal-power curve (`sin`/`cos`, so perceived loudness stays
  roughly constant through the transition instead of dipping). This curve
  runs on the browser's **audio rendering thread**, not JS — an in-flight
  crossfade costs effectively zero extra per-frame JS/CPU beyond decoding
  the second stream (which is unavoidable for any true crossfade).
- Trigger check (`maybeStartCrossfade()`) piggybacks on the *existing*
  `timeupdate` event (no new timer/interval/rAF loop): once
  `duration - currentTime <= effectiveCrossfadeDuration`, it kicks off
  `startCrossfade()`.
- `effectiveCrossfadeDuration = min(userSetting 1–12s, trackDuration * 0.9)`
  so a very short track still gets a sane (shorter) crossfade instead of a
  broken/negative one.

### 5.5 Handoff / swap at the end of a crossfade
`finishCrossfade()` runs on a `setTimeout` scheduled for exactly the
curve's duration:
- Pauses and resets the outgoing deck, resets both decks' `GainNode.gain`
  back to a clean `1.0` baseline (safe regardless of physical element reuse
  in a later crossfade — every future crossfade re-defines its own curve
  from `0`/`1` via `setValueCurveAtTime` anyway).
- Reassigns the `audio` pointer to the incoming deck and updates
  `currentIndex` — this is the moment the UI "becomes" the new track.
- Calls a new shared helper, **`applyTrackMetadata(t, { resetProgress })`**,
  extracted from the metadata/UI-binding block that used to live inline in
  `loadTrack()` (title/artist/album/cover/seek-bar max/media-session
  metadata/localStorage snapshot/`melo:track-changed` emit/etc.). Both the
  normal `loadTrack()` path (`resetProgress: true`) and the crossfade
  handoff path (`resetProgress: false`, since the incoming deck is already
  mid-playback) now share this one code path instead of duplicating it.

### 5.6 Edge cases handled
- **Manual interruption during an active crossfade** (`pause`, `next`,
  `prev`, seek-bar `onchange`, `ArrowLeft`/`ArrowRight` skip, a fresh
  `loadTrack()` from double-clicking a Library/Playlist row, or a
  `melo:play-tracks` bus event) all call `cancelCrossfade()` first, which
  cancels the scheduled `GainNode` automation, cancels the pending
  `finishCrossfade` timer, pauses/resets the incoming deck, and restores the
  outgoing deck's gain to `1.0` — playback continues cleanly on the
  still-active (outgoing) deck.
- **Incoming-track load/playback failure** (`error` event, or a rejected
  `play()` promise) also calls `cancelCrossfade()` so a bad file can't kill
  audio output — the current track keeps playing normally and behaves as if
  crossfade simply didn't trigger for that transition.
- **`repeat: one`** and **single-track queues** skip crossfade entirely
  (crossfading a track into itself isn't meaningful); natural loop/`ended`
  behavior is unchanged.
- **Volume / mute changes mid-crossfade** are propagated to the incoming
  deck too (`applyReplayGain()` and `toggleMute()` both update
  `cfIncoming` when a crossfade is in flight), so the transition doesn't
  audibly "snap" to a different volume once it completes.
- **A stray `ended` event** from a deck that's already been paused/reset
  (e.g. right as a crossfade starts) is ignored via the same
  `el !== audio` guard used everywhere else, so it can't double-trigger
  `next()`.

### 5.7 Settings UI
- **Playback tab**: new `Crossfade` on/off switch
  (`melo-pref-crossfade`, generic `.switch[data-key]` handler, same pattern
  as ReplayGain/Fade-out-on-pause) plus a **duration row** with a
  `1–12s` range slider + `−`/`+` stepper buttons
  (`melo-pref-crossfadeDuration`, default `4`). The duration row visually
  dims (`.disabled-row`) when Crossfade is off. Both emit
  `melo:pref-changed` on change; `player.ts` re-reads these two
  `localStorage` keys live on every crossfade attempt, so changes apply
  immediately without a restart.
- New CSS: `.disabled-row`, `.stepper-control`, `.stepper-btn`,
  `.crossfade-range`, `.stepper-value` in `app.css`, styled consistently
  with the existing `.seek`/`.vol` range-input look.
- New locale keys in `src/locales/en.json`: `settings.playback.crossfade.*`
  and `settings.playback.crossfadeDuration.*`.

### 5.8 What did NOT change
- No Rust/backend changes — this is entirely a frontend (TypeScript + Web
  Audio) feature. `src-tauri/` is untouched apart from the version bump
  (see §12).
- `equalizer.ts` and `visualizer.ts` are **unmodified** — they still call
  `getAudioGraph(audio).filters/.gain/.analyser` exactly as before; the
  multi-deck refactor is fully backward-compatible with their existing
  usage, and the visualizer now naturally reflects whatever is actually
  audible (both decks) during a crossfade.
- The Playing Queue is still a plain in-memory `Track[]` (see §6.1) — it
  was **not** made DB-backed for this feature. Crossfade only needs to
  *peek* the next index (`computeNextIndex()`), which is a synchronous
  array read; there is no async/DB dependency in the critical path.

---

## ✅ 6. Changes Shipped in v0.5.1

### 5.1 Playback & skin-swap fixes
- **Wrong total time / progress position after changing skin during
  playback** — fixed. A skin swap replaces the player DOM, which previously
  left the skin template's placeholder values (4:36 / mid position) until the
  next track. `bindDOM()` in `player.ts` (re-run after every skin swap) now
  re-syncs the full transport UI from live audio state: `seekBar.max`/`durTime`
  from real duration, `seekBar.value`/`curTime` from current position, play /
  pause icon state, volume label, and shuffle/repeat active states.

### 5.2 Compact skin seek-thumb accent
- The circular seek thumb border + glow now follow the **Dynamic Album
  Artwork Theme**: `border: 3.5px solid var(--accent, …)` and
  `box-shadow: 0 0 8px var(--accent-glow, var(--thumb-shadow))`.
  (`cover.ts` sets `--accent` / `--accent-glow` on `<html>` when the dynamic
  theme is enabled.)

### 5.3 Window control glyph thickness
- Minimize and close glyphs unified at **2px** (was 1.5px) so all custom
  windows render the same stroke weight without sub-pixel blur.

### 5.4 Playlist: "now playing" highlight
- `library.ts` keeps a `currentTrackId`; playlist rows render with `.active`
  for the playing track.
- On (re)open, the Playlist window restores the highlight from
  `melo:request-playback-state` (double-requested, like the Lyrics window)
  plus a localStorage fallback (`melo-current-track`). No longer requires a
  track change to appear.

### 5.5 Search clear buttons
- Library and Playlist search boxes each have a "×" clear button
  (`#searchClear`, `#playlistSearchClear`), shown **only while there is text**
  (`.search-clear.show`). Clicking clears the input, refocuses, and
  re-renders.

### 5.6 Compact skin logo non-clickable
- `.app-name-btn` in the compact skin: `cursor: default`,
  `pointer-events: none`, hover removed (no click affordance on the logo/text).

### 5.7 Fade out on pause
- Duration changed **0.3s → 0.5s** (`FADE_MS = 500` in `player.ts`).
- Settings description text updated to "0.5s".
- Now **enabled by default**: logic is `localStorage.getItem("melo-pref-fadePause") !== "0"`
  and the Settings switch ships with the `on` class.

### 5.8 Close to system tray — default OFF
- Logic is now `melo-pref-tray === "1"`; the Settings switch no longer ships
  with the `on` class. Default behavior on close = full quit.

### 5.9 Resume playback on reopen — now actually plays
- `main.ts` restore path calls `p.loadTrack(0, true, state.position || 0)`
  (was `false`). The track resumes **playing** from the saved position.
  Note: relies on the existing WebView2 autoplay path; if Windows blocks
  autoplay, the first click resumes (deliberately avoided
  `additionalBrowserArgs` because different browser args across windows
  conflict in Tauri v2 — see `tauri-apps/tauri#12819`).

### 5.10 Playlist toolbar layout
- Single row, order: **Search → Playlist select → "+" → Sort**.
- "+ New" is now an icon-only "+" button (26×26, `title="New playlist"`).
- Sort select narrowed to **92px**; options renamed to **"Shortest"** /
  **"Longest"** (was "Duration (Shortest)" / "Duration (Longest)").
- Responsive: only on very narrow windows (≤ 360px) does the search box take
  a full-width row of its own and the remaining controls wrap below.
- **Removed a stale CSS rule** that set
  `.panel-window .playlist-toolbar #playlistSearchInput { width: 0 !important; }`
  — that was the root cause of the tiny search box after the wrapper was
  introduced.

---

## ⚙️ 6. Existing Architecture (unchanged from v0.4.0, kept for reference)

### 6.1 SQLite Library (authoritative)
- SQLite is the authoritative Library and Playlist store (rusqlite, bundled,
  WAL mode, indexed Artist/Album/Genre/title/playlist queries).
- Folder scans run as background jobs (`start_library_scan` returns a
  `scanId` immediately); discovery streams paths through a bounded channel;
  metadata parsing uses 2–4 workers (64-path + 24-result queues); a single
  SQLite writer commits batches of up to 25 records.
- Unchanged files are detected by size + mtime and promoted back into Library
  membership on rescan. Concurrent scans are rejected; a scan can be cancelled.
- Artwork is deferred — visible rows request it lazily (max 2 frontend jobs),
  resized to max 256×256 PNG, cached under the app `artwork-cache`; SQLite
  stores only the cached path.
- Library and Playlist use paged SQLite queries + virtualized fixed-height
  rows (~40–60 rows in DOM).
- Secondary WebViews query the same backend DB (no per-window Library copies).
- Playlist create/list/add/remove/clear/query + M3U export use SQLite.

### 6.2 Library UX
- Artists / Albums / Genres top-level tabs.
- Selecting an Artist opens its tracks with **All Tracks** active + a sticky
  album-chip row (Artist+Album filter); album groups cached per Artist.
- Theme-aware custom scrollbars (light/dark) in Library, Playlist, and chips.
- Scan / Clear controls sit beside Library search; Clear uses an in-app
  confirm dialog and sets `library_owned=0` (does not delete playlists or
  their tracks).
- Track deletion only via the custom right-click menu.

### 6.3 Playlist / open behavior
- Open Files, Open With/CLI, drop on main player, and main-player folder open
  **replace** the selected playlist and start playback.
- Dropping onto the Playlist window is the **only append** path and does not
  interrupt playback.
- Opened/dropped files are stored `library_owned=0`; a later scan promotes
  them into the Library.

### 6.4 Player / windows / appearance
- Lyric window restores current track when opened later, receives position
  from the main player, supports plain/LRC lyrics, click-to-seek.
- Spectrum Wave and Block Equalizer visualizer modes; visualizer changes are
  silent and use dynamic theme colors.
- Secondary windows expose only Minimize and Close (Maximize removed).
- Volume icon click toggles mute; mouse wheel over the player = ±5% volume.
- Dynamic Album Artwork Theme defaults **ON** on fresh/reset settings.

---

## 🌐 7. i18n

- `src/i18n.ts` minimal loader; `t(key)` falls back English → raw key.
- Only **English** ships, and only the **Settings window** is wired to `t()`.
- The rest of the app is hardcoded English. Full app-wide i18n = follow-up
  work, not started. See `src/locales/README.md` for adding languages.

---

## 🔧 8. Tauri v2 Capabilities

`src-tauri/capabilities/default.json` includes (as of v0.4.0, unchanged):
`core:default`, `core:event:default`, `core:window:*` (including set-size,
set-position, set-min/max-size, inner/outer size & position, is-maximized,
set-resizable), `core:webview:default`, `allow-create-webview-window`,
`core:path:default`, `dialog:default`, `fs:default`,
`global-shortcut:default`.

**Rule**: if you add any new `WebviewWindow`/`Window` API call from the
frontend, check this file first — missing permissions fail silently.

---

## 🦀 9. Rust Backend Commands

| Command | Description |
|---|---|
| `start_library_scan(path)` | Background scan job, returns `scanId` immediately, emits lightweight progress. |
| `cancel_library_scan(scan_id)` | Cancels an active scan. |
| `library_stats()` | Track/artist/album/genre counts. |
| `library_groups(...)` / `library_tracks(...)` | Paged Library browsing. |
| `playlist_tracks(...)` | Paged playlist query with search + sort. |
| `import_audio_files(paths, playlist_id, replace_playlist)` | File-dialog/OS import → SQLite + artwork cache. |
| `get_track_by_id(id)` | Single track fetch (used by resume-on-reopen). |
| `ensure_track_artwork(id)` | Lazy artwork extraction. |
| `add_tracks_to_playlist` / `replace_playlist_tracks` / `replace_playlist_from_scan` / `remove_track_from_playlist` / `clear_playlist` | Playlist ops. |
| `delete_tracks(ids)` / `clear_library_database` | Library maintenance. |
| `get_cli_tracks()` | Files passed via CLI / "Open With". |
| `get_track_lyrics(path)` | Adjacent or tag-embedded `.lrc` lookup. |
| `list_installed_skins()` / `read_skin_file(name)` / `save_custom_skin_file(name, content)` / `open_skins_folder()` | Skin disk I/O. |

---

## 🚀 10. How to Build, Run, and Release

```bash
npm install
npm run build          # tsc && vite build
npm run tauri dev       # desktop dev mode (needs Rust + Tauri CLI)
```

Release: with project version `0.5.1`, `.github/workflows/build.yml` creates
a distinct **draft prerelease tag `v0.5.1`** with title `v0.5.1 Beta`
(Windows x64 NSIS/MSI). It does **not** replace `v0.4.0`.

```bash
cargo check            # inside src-tauri (Windows)
npm run tauri build    # Windows x64
```

---

## 📋 11. Known Gaps / Honest Limitations

- **i18n covers only the Settings window.**
- **Rust backend is unverified in this workspace** (no Cargo toolchain). The
  SQLite/scanning Rust code and the skin `include_str!` changes must be
  validated by `cargo check` / `tauri build` on Windows (CI does this on
  push). Frontend `tsc` + `vite build` are green.
- **ReplayGain, fade-on-pause (0.5s), and resume-on-reopen** are
  implemented and type/build-checked, but audio behavior needs a real
  Windows playback test. Resume autoplay may be gated by WebView2 autoplay
  policy (first-click resume fallback exists).
- **Artist/album/track cover art** uses the first matching track's embedded
  cover; no per-artist/per-album "preferred cover" concept.
- **`Cargo.lock` is not committed** — generate and commit it after the first
  Windows build.
- **Old compact skin files**: the app deletes stale
  `compact-pill-light.html`/`compact-pill-dark.html` from the skins dir at
  startup. Users who customized those old files will lose those edits.

---

## ✅ 12. Session Checklist (v0.5.1)

- [x] Version bump 0.4.0 → 0.5.1 across package.json, package-lock.json,
      Cargo.toml, tauri.conf.json, About UI, README.
- [x] Merge compact-pill-dark + compact-pill-light into one `compact-pill.html`
      (theme via CSS `[data-theme]`), synced embedded copy in `skin.ts`,
      legacy-id fallbacks, Rust `include_str!` + old-file cleanup.
- [x] Fix wrong duration/position after skin swap during playback.
- [x] Compact seek-thumb follows Dynamic Album Artwork Theme.
- [x] Unify minimize/close glyph thickness (2px).
- [x] Playlist "now playing" highlight + restore on window reopen.
- [x] Search clear ("×") buttons in Library & Playlist (show on text).
- [x] Compact skin logo non-clickable.
- [x] Fade out on pause → 0.5s, default ON, settings text updated.
- [x] Close to system tray → default OFF.
- [x] Resume playback on reopen now autoplays.
- [x] Playlist toolbar reordered (search → playlist → + → sort), icon-only
      "+", narrower sort with Shortest/Longest labels, responsive wrap,
      removed stale `width: 0` CSS bug.
- [ ] Real Windows `cargo check` / `tauri build` + installer smoke test.
- [ ] Commit generated `Cargo.lock` after first Windows build.
- [ ] Push to `Arvanta/Melo` to trigger the CI release.
