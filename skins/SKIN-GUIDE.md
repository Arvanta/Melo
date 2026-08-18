# Melo Skin Guide

Build a custom player look with a single HTML file. Drop it in the `skins/` folder (or import it from Settings → Appearance) and pick it from the skin list. No rebuild required.

This file lives next to the starter template: `full-html-example.html`.

---

## 1. How skins are loaded

1. Melo lists every `.html` / `.htm` file in the installation `skins/` folder.
2. A **full HTML skin** (it contains the binding IDs below) **replaces the entire player card**. You own layout, typography, and chrome.
3. A **CSS-only skin** (styles, but almost no player markup) only restyles the default layout.

If the file contains a `#melo-player` (or legacy `#lumi-player`) wrapper, only the **inside** of that element is injected. That is the recommended pattern.

---

## 2. Required IDs

Keep these IDs exactly. You may move them, hide them, restyle them, or fill them with text instead of icons. If an ID is missing, that control simply will not work.

| ID | Role |
|----|------|
| `coverWrap` | Album-art container |
| `coverImg` | `<img>` for artwork |
| `coverFallback` | Shown when there is no art |
| `trackTitle` | Title |
| `trackArtist` | Artist |
| `trackAlbum` | Album (optional) |
| `trackCodec` | Format badge (optional) |
| `trackSpecs` | Sample-rate / bit-depth (optional) |
| `btnPlay` | Play / pause |
| `iconPlay` | Play glyph (hidden while playing) |
| `iconPause` | Pause glyph (hidden while paused) |
| `btnPrev` / `btnNext` | Previous / next |
| `btnStop` | Stop (also gated by Settings → Show Stop) |
| `btnShuffle` / `btnRepeat` | Toggle; Melo adds `.active` when on |
| `seekBar` | `<input type="range">` progress |
| `curTime` / `durTime` | Elapsed / duration labels |
| `volBar` | `<input type="range" min="0" max="100">` |
| `volPct` | Volume percent label |
| `volIcon` | Mute toggle |
| `vizBars` | Visualizer host (Melo draws a canvas inside) |
| `btnToggleLibrary` | Open Library window |
| `btnTogglePlaylist` | Open Playlist window |
| `btnToggleEq` | Open Equalizer |
| `btnToggleLyrics` | Open Lyrics |
| `btnOpenSettings` | Open Settings |
| `btnAddFiles` / `btnAddFolder` | File / folder pickers |
| `btnThemeToggle` | Light / dark |
| `btnAbout` | About popup |
| `win-btn` + `aria-label="minimize"` / `"close"` | Window controls |

Optional aliases that also work: `menuToggleLibrary`, `menuTogglePlaylist`, `menuToggleEq`, `menuToggleLyrics`, `menuToggleSettings`.

---

## 3. Window size and shape

The default Melo window is a wide 960×240 bar. **Custom skins can request any size**, including a tall/narrow vertical player.

Add these tags in `<head>` (or matching `data-melo-*` attributes on `#melo-player`):

```html
<meta name="melo-width" content="360">
<meta name="melo-height" content="640">
<meta name="melo-min-width" content="300">
<meta name="melo-min-height" content="480">
<meta name="melo-max-width" content="480">
<meta name="melo-max-height" content="900">
<meta name="melo-resizable" content="true">
```

| Meta | Meaning |
|------|---------|
| `melo-width` / `melo-height` | Preferred window size in CSS pixels |
| `melo-min-width` / `melo-min-height` | Minimum size |
| `melo-max-width` / `melo-max-height` | Optional maximum |
| `melo-resizable` | `true` or `false` |

Examples:

- Vertical tower: `360 × 640`
- Mini widget: `420 × 160`, `resizable=false`
- Wide cinema bar: `1100 × 200`

Make the card fill the window:

```css
.player-card {
  width: 100% !important;
  height: 100% !important;
  min-height: 0 !important;
  max-height: none !important;
}
```

Use `border-radius` and `clip-path` for pills, circles, or notched cards.

---

## 4. Layout freedom

Anything CSS can do is allowed:

- `flex-direction: column` for a vertical stack
- `grid` to put Library at the bottom and the seek bar at the top
- Buttons that are **text**, **icon**, or **both**
- Hide unused chrome with `display: none` (keep the element in the DOM if you still want the feature)

Drag region for the frameless window:

```html
<div data-tauri-drag-region>…title bar…</div>
```

Interactive children need `-webkit-app-region: no-drag` so clicks work.

---

## 5. Visualizer size and bar count

`#vizBars` is just a box. Size it with CSS:

```css
#vizBars { height: 96px; width: 100%; }
```

Override how many bands are drawn (4–128):

```html
<meta name="melo-viz-bars" content="32">
<!-- or -->
<div id="vizBars" data-bars="32"></div>
```

Users can still click the visualizer to cycle modes (bars, thin, wave, …). You may pin a starting mode later from Settings; the skin only controls geometry and band count.

---

## 6. Theme tokens

Skins may redefine these CSS variables. Dynamic Album Artwork Theme writes `--accent` and `--visualizer` on `<html>` at runtime — prefer `var(--accent)` for highlights so they follow the cover.

```css
:root {
  --card: #12141c;
  --text: #f4f6fb;
  --text-soft: #9aa3b5;
  --text-muted: #6d7688;
  --accent: #7c6af7;
  --track-bg: #1c2030;
  --visualizer: #7c6af7;
}
```

---

## 7. Seek / volume sliders

Melo paints the filled portion with CSS variables `--progress` and `--vol` (percent). Mirror this in your skin:

```css
input[type="range"].seek {
  background: linear-gradient(
    to right,
    var(--accent) 0%,
    var(--accent) var(--progress, 0%),
    var(--track-bg) var(--progress, 0%),
    var(--track-bg) 100%
  );
}
```

---

## 8. Workflow

1. Duplicate `full-html-example.html` and rename it (`my-tower.html`).
2. Edit in any editor. Change meta size, HTML order, and CSS.
3. Settings → Appearance → **Open Skins Folder**, then **Refresh**.
4. Select your file in the skin dropdown.
5. Or drag the `.html` onto the player window.

The built-in compact skin is a single file: `compact-pill.html`. Light and dark tokens live in the same file and follow Melo’s `[data-theme]` attribute, so switching theme does not reload the skin. Your own files are not overwritten if they already exist (the starter template and this guide are refreshed on launch).

---

## 9. Checklist

- [ ] `#melo-player` wrapper
- [ ] Binding IDs present (even if visually hidden)
- [ ] Window meta tags if you need a non-default size
- [ ] `data-tauri-drag-region` on a chrome bar
- [ ] `aria-label="minimize"` / `"close"` on window buttons
- [ ] `#vizBars` sized; optional `data-bars`
- [ ] Saved as `.html` in `skins/`
