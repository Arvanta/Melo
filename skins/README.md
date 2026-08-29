# Melo — Skin Authoring Guide

Melo is a Tauri desktop music player whose **main player window can be fully
re-skinned**. A skin is a single `.html` file that replaces the player's
layout and styling. You have complete freedom over **size, shape, structure,
and styling**: move any control anywhere, replace icons with text (or vice
versa), resize the visualizer, change the number of visualizer bars, add your
own decorations — anything HTML/CSS can do.

This guide covers everything you need to write, import, and share a skin.

---

## 1. Quick start

1. Copy `full-html-example.html` (shipped next to this file) and rename it,
   e.g. `my-skin.html`.
2. Edit the copy with any text editor.
3. Open Melo → **Settings → Appearance → Import Skin (.html)** and choose
   your file. The skin is applied immediately.
4. The imported file is saved into the skins folder — use
   **Settings → Appearance → Open Skins Folder** to find it, tweak it, then
   press **Refresh** to reload.

> In the desktop app, imported skins are stored in the app's writable
> `skins/` folder. On Windows this is under `%APPDATA%\com.melo.app\skins`
> (or the `skins` folder next to the app when running portable).

---

## 2. The two kinds of skins

| Kind | What it does | Example |
|---|---|---|
| **Full HTML skin** | Replaces the whole player markup *and* styles. Anything you can describe in HTML/CSS is possible. | `full-html-example.html` |
| **Compact skin** | A built-in, fixed-size (780×138) mini player. Kept for reference; it is also a full HTML skin. | `compact-pill.html` |

This guide focuses on **full HTML skins**.

---

## 3. File structure

A full HTML skin is a normal HTML document:

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>My Skin</title>
<style>
  /* All your styling goes here */
</style>
</head>
<body>
<div id="melo-player">
  <!-- Your player markup goes here -->
</div>
</body>
</html>
```

- The `<style>` block(s) are injected into the app.
- The contents of `<div id="melo-player">` replace the player's markup.
- The `<title>` is used as the skin's display name in the skin list.

> Skins made before the app was renamed from Lumi to Melo may still use
> `<div id="lumi-player">` — that id still works as a fallback, so older
> custom skins don't need to be edited. New/updated skins should use
> `melo-player`.

---

## 4. Declaring the window size (and shape)

The player window normally is 960×240. A skin can declare its own size by
adding these attributes to the `<body>` (or `<html>`, or the `#melo-player`
root):

| Attribute | Meaning |
|---|---|
| `data-window-width` | Target window width in px, e.g. `900` |
| `data-window-height` | Target window height in px, e.g. `260` |
| `data-min-width` | Minimum width the user may resize to |
| `data-min-height` | Minimum height the user may resize to |
| `data-max-width` | Maximum width — the window never grows past this |
| `data-max-height` | Maximum height — the window never grows past this |
| `data-resizable="true\|false"` | Whether the user can resize this skin's window |

```html
<body data-window-width="900" data-window-height="260"
      data-min-width="560" data-min-height="200"
      data-max-width="1400" data-max-height="520"
      data-resizable="true">
```

- **Any combination works** — you can declare a target size only, min/max
  bounds only, or all of them together.
- **Fixed size** (the window cannot be resized at all): set the target and
  min/max to the same value, e.g.
  `data-window-width="700" data-window-height="220" data-min-width="700"
  data-min-height="220" data-max-width="700" data-max-height="220"
  data-resizable="false"`.
- If you omit these attributes, the window keeps its current/default size.
- The player card always fills the window (`height: 100vh; width: 100%`), so
  your layout should be built to fill its container.

---

## 5. Hooking up controls (`data-melo`)

Every interactive part of the player is wired to an element through a
**`data-melo` attribute**. Move the elements anywhere in your markup — Melo
finds them by role, not by position.

### 5.1 Playback

| Role | Element type | What Melo does with it |
|---|---|---|
| `play` | any clickable element | Toggles play/pause |
| `play-icon` | any element | Shown while **paused** (the "play" glyph) |
| `pause-icon` | any element | Shown while **playing** (the "pause" glyph) |
| `prev` | clickable | Previous track |
| `next` | clickable | Next track |
| `stop` | clickable | Stop |
| `shuffle` | clickable | Toggle shuffle; gets `.active` class |
| `repeat` | clickable | Toggle repeat; gets `.active` class |

### 5.2 Track metadata (text targets)

| Role | What Melo writes into it |
|---|---|
| `title` | Track title |
| `artist` | Artist name |
| `album` | Album name |
| `codec` | Codec label (e.g. FLAC) |
| `specs` | Sample rate / bit depth |

### 5.3 Seek, volume, time

| Role | Element type | Notes |
|---|---|---|
| `seek` | `<input type="range">` | Seek bar. Melo updates its `value` and sets a `--progress` CSS variable (0–100%) so you can style the fill: `background: linear-gradient(to right, var(--accent) 0%, var(--accent) var(--progress), #333 var(--progress), #333 100%)` |
| `volume` | `<input type="range">` | Volume. Melo sets a `--vol` CSS variable (0–100%) for the fill. |
| `volume-icon` | any element | Volume/mute icon; click toggles mute, gets `.muted` class when muted |
| `volume-pct` | text element | Shows e.g. `60%` |
| `current-time` | text element | Elapsed time |
| `duration` | text element | Total duration |

### 5.4 Cover art

| Role | Element type | Notes |
|---|---|---|
| `cover` | **`<img>`** (must be an image) | Album art; Melo sets its `src` and shows/hides it |
| `cover-fallback` | any element | Shown when a track has no cover art (sibling of `cover`) |

> Keep `cover` and `cover-fallback` as **siblings**: Melo shows exactly one of
> the two at a time.

### 5.5 Visualizer

| Role | Notes |
|---|---|
| `visualizer` | A container (any size). Melo draws the visualization into a `<canvas>` that fills it. Add `data-bars="24"` to set the number of bars/columns (any positive integer). The mode (classic bars, line, wave, …) is user-selectable by clicking/right-clicking the visualizer. |

### 5.6 Optional: Playlist / Lyrics embedded in the skin

The Playlist and Lyrics windows normally open as their own separate
windows (via `toggle-playlist` / `toggle-lyrics` above, unchanged). A skin
can *additionally* show a lightweight, optional view of either one
directly inside the player itself — this is entirely opt-in; skins that
don't include these hooks are completely unaffected.

| Role | Element type | Notes |
|---|---|---|
| `embedded-playlist` | a container | Melo renders a compact, read-mostly list of the current playlist here (click a row to play it). No search box, sort control, drag-reorder, remove button, or M3U export — this is meant to be small and glanceable, not a replacement for the full Playlist window. |
| `embedded-lyrics` | a container | Melo renders the current track's synced/plain lyrics here, the same way the Lyrics window does. |
| `toggle-embedded-playlist` | clickable | Toggles the `melo-show-playlist` class on `<html>`. |
| `toggle-embedded-lyrics` | clickable | Toggles the `melo-show-lyrics` class on `<html>`. |

By default, `embedded-playlist` / `embedded-lyrics` are hidden until their
matching `html.melo-show-playlist` / `html.melo-show-lyrics` class is
present — a skin doesn't need to hide them itself.

**"Swap with the visualizer" pattern**: to make a toggle button replace the
visualizer with the playlist/lyrics view (instead of showing both at once
or adding new space), style your `visualizer` container to hide under the
same state class in your own CSS, e.g.:

```css
html.melo-show-playlist [data-melo="visualizer"] { display: none; }
```

Melo detects when the visualizer's container becomes hidden this way and
pauses its render loop entirely (rather than just leaving it invisible),
so there's no wasted drawing/CPU while it's swapped out — this happens
automatically, you don't need to do anything extra for it.

Two settings — under Settings → Appearance → *Embedded Playlist (skins)* —
let the user show/hide cover art and scale the text size of the embedded
playlist independently of the standalone Playlist window's own look;
these only matter if your skin actually includes the `embedded-playlist`
hook.

### 5.7 App actions & windows

| Role | What it does |
|---|---|
| `add-files` | Open the "add files" dialog |
| `add-folder` | Open the "add folder" dialog |
| `theme-toggle` | Toggle light/dark theme |
| `about` | Show the About popup |
| `toggle-library` | Open/close the Library window |
| `toggle-playlist` | Open/close the Playlist window |
| `toggle-eq` | Open/close the Equalizer window |
| `toggle-lyrics` | Open/close the Lyrics window |
| `toggle-settings` | Open/close the Settings window |
| `minimize` | Minimize the window |
| `close` | Close the window |

### 5.8 Draggable window region

Add `data-tauri-drag-region` to any element to make it a window-drag handle
(so the frameless window can be moved). Add `-webkit-app-region: no-drag;`
to the interactive controls inside that region.

---

## 6. Backwards compatibility: classic IDs

Skins written for older Melo versions use hard-coded `id`s instead of
`data-melo`. Those still work — Melo falls back to them automatically:

`btnPlay`, `iconPlay`, `iconPause`, `btnPrev`, `btnNext`, `btnStop`,
`btnShuffle`, `btnRepeat`, `seekBar`, `volBar`, `volIcon`, `volPct`,
`curTime`, `durTime`, `trackTitle`, `trackArtist`, `trackAlbum`,
`trackCodec`, `trackSpecs`, `coverImg`, `coverFallback`, `vizBars`,
`btnToggleLibrary`, `btnTogglePlaylist`, `btnToggleEq`, `btnToggleLyrics`,
`btnOpenSettings`, `btnAddFiles`, `btnAddFolder`, `btnThemeToggle`,
`btnAbout`.

`data-melo` is recommended for new skins: it is position-independent and
lets you use any element type you like.

---

## 7. Theming variables

The app exposes CSS custom properties you can use directly:

| Variable | Meaning |
|---|---|
| `--accent` | The accent color (driven by the **Dynamic Album Artwork Theme** when enabled) |
| `--accent-glow` | A translucent glow version of the accent |
| `--visualizer` | Visualizer color |
| `--text`, `--text-soft`, `--text-muted` | Text colors |
| `--card`, `--track-bg`, `--card-border` | Surface colors |

Also, the current theme is exposed as `data-theme` on `<html>`:

```css
:root { /* dark styles */ }
:root[data-theme="light"] { /* light styles */ }
```

So a single file can support both light and dark mode (the built-in compact
skin does exactly this).

---

## 8. Complete example

`full-html-example.html` (shipped next to this guide) demonstrates all of the
above: a custom-size window, `data-melo` hooks, text buttons instead of
icons, a custom-positioned seek bar, a resized visualizer with 24 bars, and
both theme variants via CSS variables.

---

## 9. Tips & gotchas

- **One of `cover` / `cover-fallback` is always hidden** — style both to fill
  the same space so the layout doesn't jump.
- **`play-icon` / `pause-icon`** — Melo toggles their `display`. Give them a
  sensible default in the markup (usually hide the `play-icon` initially).
- **Range inputs** — style the fill with `var(--progress)` (seek) and
  `var(--vol)` (volume); update the track/thumb colors as you like.
- **Don't rely on default-skin class names** (`.visualizer-bars`,
  `.right-panel`, `.right-main`, …). They may be affected by the app's own
  responsive rules. Use your own class names.
- **Give the skin a fill-everything root** — the player card is
  `100vw × 100vh`; make your root `width:100%; height:100%` (or flex/grid
  that fills).
- **Broken markup?** A skin with no recognized hooks is treated as a
  "CSS-only" skin and won't replace the layout. Make sure you keep at least
  the core hooks (e.g. `play`, `seek`, `title`, `cover`).
- **Debugging** — DevTools are enabled in the build. Right-click → inspect to
  see console errors from your skin.

---

## 10. Sharing skins

A skin is a single `.html` file. Share it as-is; others import it via
**Settings → Appearance → Import Skin**. Keep your CSS self-contained
(no external fonts/CDNs needed — the app has no internet access by default).

Happy skinning! 🎨
