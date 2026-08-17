# Melo Skin Authoring Guide

Melo skins are single `.html` files placed in the **skins** folder. A skin can
range from a few lines of CSS that recolor the default player to a completely
custom interface with its own layout, dimensions, icons, text labels, and
visualizer. The included `full-html-example.html` is a ready-to-edit starting
point that demonstrates every feature documented here.

---

## 1. Installing a skin

1. Open Melo and go to **Settings → Appearance**.
2. Click **Open Skins Folder** to reveal the skins directory.
3. Drop your `.html` file into that folder.
4. Click **Refresh** (the circular-arrow button) — your skin appears in the
   dropdown. Select it to apply.

You can also use **Import Skin (.html)** to copy a file into the folder and
apply it in one step, or drag-and-drop an `.html` file onto the player.

Skins ship with Melo:

- **Default Melo** — built-in horizontal player.
- **Minimal Compact (Pill Bar)** — the small fixed pill (light/dark).
- **Full HTML Example (Vertical)** — the documented starter skin. Select it,
  then open its file from the skins folder to use it as a template.

---

## 2. Two kinds of skin

### A) CSS-only skin

A file containing only a `<style>` block overrides the default layout's
appearance (colors, fonts, radii, shadows, slider thickness, etc.). It cannot
move elements or change the window shape. CSS-only skins are simple and always
stay compatible.

```html
<!doctype html>
<html>
<head><style>
  :root { --accent: #ff4ecd; --card: #1a0f2e; }
  .track-title { font-size: 20px; }
  .transport .play-btn { border-radius: 14px; }
</style></head>
<body></body>
</html>
```

### B) Full-HTML skin

A file whose body contains at least three of the element IDs listed below
replaces the **entire player card** with your own markup. You control every
pixel: layout direction, sizes, which controls appear, whether buttons show
icons, text, or emoji, and the dimensions of the native window.

Wrap your markup in `<div id="melo-player">…</div>`. Melo injects the inner
HTML of that element as the player and applies your `<style>`.

```html
<div id="melo-player">
  <button id="btnPlay">Play</button>
  <div id="trackTitle">Song name</div>
</div>
```

---

## 3. Declaring the window size and shape

Add a `<meta name="melo-window">` tag inside `<head>` to tell Melo how to size
the native OS window for your skin. Without it, the default 960×240 window is
used and a tall/vertical skin would be clipped.

```html
<meta name="melo-window"
      content="width=340, height=580,
               minWidth=300, minHeight=460,
               maxWidth=520, maxHeight=900,
               resizable=true, transparent=true" />
```

| Key          | Meaning                                                        |
| ------------ | ------------------------------------------------------------- |
| `width`      | Initial window width in logical pixels.                        |
| `height`     | Initial window height in logical pixels.                       |
| `minWidth`   | Minimum width the user can resize to.                          |
| `minHeight`  | Minimum height the user can resize to.                         |
| `maxWidth`   | Maximum width (optional).                                      |
| `maxHeight`  | Maximum height (optional).                                     |
| `resizable`  | `true` lets the user drag-resize the window edges.             |
| `transparent` | Keep `true` for rounded/transparent corners; `false` gives an opaque window. |

Because the window now follows the skin, you can build:

- **Horizontal players** — wide and short (e.g. 960×220).
- **Vertical players** — narrow and tall (e.g. 340×580), like the example.
- **Square widgets** — equal width/height with large cover art.
- **Any aspect ratio** you like, as long as `minWidth`/`minHeight` are set so
  the layout doesn't collapse.

The root of your skin (`#melo-player`) is given `width:100%; height:100vh`,
so design it to fill whatever window size the user chooses when
`resizable=true`. Use Flexbox/Grid and `min-width` to keep it robust.

---

## 4. Element IDs (the skin contract)

Each ID wires up one piece of behavior. Include only the IDs you actually
want — omitted features simply don't appear in your skin.

### Track information

| ID             | Element              | Purpose                                            |
| -------------- | -------------------- | -------------------------------------------------- |
| `trackTitle`   | any text element     | Current song title.                                |
| `trackArtist`  | any text element     | Artist name.                                       |
| `trackAlbum`   | any text element     | Album name.                                        |
| `trackCodec`   | any text element     | Codec badge (e.g. `FLAC`).                         |
| `trackSpecs`   | any text element     | Specs text (e.g. `44.1 kHz · 16 bit`).            |

### Cover art

| ID             | Element   | Purpose                                                                 |
| -------------- | --------- | ----------------------------------------------------------------------- |
| `coverWrap`    | container | Optional wrapper; sized by your CSS.                                   |
| `coverImg`     | `<img>`   | Artwork image (kept hidden until art loads).                           |
| `coverFallback`| element   | Shown when there is no artwork. Put any glyph/content inside it.       |

### Transport

| ID           | Element   | Purpose                                              |
| ------------ | --------- | ---------------------------------------------------- |
| `btnPlay`    | button    | Play/pause toggle.                                   |
| `iconPlay`   | element   | Shown when paused.                                   |
| `iconPause`  | element   | Shown while playing.                                 |
| `btnPrev`    | button    | Previous track.                                      |
| `btnNext`    | button    | Next track.                                          |
| `btnStop`    | button    | Stop playback (respects the "Show Stop" preference). |
| `btnShuffle` | button    | Toggles shuffle; receives `.active`.                 |
| `btnRepeat`  | button    | Cycles Off → All → One; receives `.active`.          |

### Seek / time

| ID        | Element              | Purpose                           |
| --------- | -------------------- | --------------------------------- |
| `seekBar` | `<input type=range>` | Playback position scrubber.       |
| `curTime` | text element         | Current position (e.g. `1:24`).   |
| `durTime` | text element         | Total duration (e.g. `4:36`).     |

### Volume

| ID        | Element              | Purpose                  |
| --------- | -------------------- | ------------------------ |
| `volBar`  | `<input type=range>` | Volume slider (0–100).   |
| `volIcon` | element              | Click toggles mute.      |
| `volPct`  | text element         | Volume percentage.       |

### Visualizer

| ID        | Element   | Purpose                                                                                  |
| --------- | --------- | ---------------------------------------------------------------------------------------- |
| `vizBars` | container | A `<canvas>` is created inside automatically. Size it with CSS (width/height). Add `data-bars="N"` to set the number of bars for bar-based modes (4–256). |

### Toolbar / panel toggles

| ID                  | Element | Purpose                              |
| ------------------- | ------- | ------------------------------------ |
| `btnAddFiles`       | button  | Open the add-files dialog (Ctrl+O).  |
| `btnAddFolder`      | button  | Scan a folder (Ctrl+Shift+O).        |
| `btnThemeToggle`    | button  | Toggle light/dark theme.             |
| `btnAbout`          | button  | Show the About pop-up.               |
| `btnToggleLibrary`  | button  | Open/close the Library panel.        |
| `btnTogglePlaylist` | button  | Open/close the Playing Queue panel.  |
| `btnToggleEq`       | button  | Open/close the Equalizer panel.      |
| `btnToggleLyrics`   | button  | Open/close the Lyric panel.          |
| `btnOpenSettings`   | button  | Open/close the Settings panel.       |

Panel-toggle buttons can be icons, **text labels** (e.g.
`<button id="btnToggleLibrary">Library</button>`), emoji, images, or any
combination. They automatically receive the `.active` class while their panel
is open.

### Window chrome

- Put `data-tauri-drag-region` on the element the user drags to move the
  window (typically your title bar). Nested buttons remain clickable — give
  their container `-webkit-app-region: no-drag` in CSS if needed.
- Minimize/Close buttons are recognized by `aria-label`:

```html
<button class="win-btn" aria-label="minimize">&mdash;</button>
<button class="win-btn close" aria-label="close">&times;</button>
```

---

## 5. Buttons can be anything

Melo only looks at IDs, not what's inside them. All of these are valid
play buttons:

```html
<button id="btnPlay" title="Play/Pause">
  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
</button>

<button id="btnPlay">▶ Play</button>

<button id="btnPlay"><img src="play.png" alt=""/></button>
```

You can place the Library/Equalizer/etc. toggles anywhere — in a top row, a
side column, a bottom toolbar — and label them with text instead of icons, or
mix both.

---

## 6. Controlling the visualizer

The visualizer canvas fills its container, so you control its size purely
with CSS:

```css
#vizBars { height: 90px; border-radius: 12px; }
#vizBars canvas { width: 100% !important; height: 100% !important; }
```

Use `data-bars` to change how many columns the bar-based modes draw:

```html
<div id="vizBars" data-bars="40"></div>
```

- Accepts any integer from `4` to `256`.
- Affects **Classic Bars**, **Thin Bars**, and **Mirror Bars**.
- The line/wave/block-equalizer modes have their own densities and are not
  affected.

The visualizer color follows the `--visualizer` and `--accent` CSS variables.

---

## 7. CSS variables you can override

```css
:root {
  --card:          #0f1115;  /* player background        */
  --card-border:   rgba(255,255,255,0.08);
  --text:          #f5f7fa;  /* primary text             */
  --text-soft:     #b3bcc9;  /* secondary text           */
  --text-muted:    #737d8c;  /* disabled/hint text       */
  --accent:        #7c9cff;  /* active controls, sliders */
  --track-bg:      #1a1e26;  /* hover/control surfaces   */
  --visualizer:    #7c9cff;  /* visualizer gradient      */
  --visualizer-soft: rgba(124,156,255,0.25);
  --shadow:        0 24px 60px rgba(0,0,0,0.55);
}
```

You may write **any CSS you like** beyond these — animations, gradients,
`backdrop-filter`, custom fonts via `@font-face`, etc. Selectors target the
default class names (`.player-card`, `.track-title`, `.transport`,
`.seek-row`, `.cover-wrap`, etc.) when restyling the default skin, or your
own class names when you supply full HTML.

> The `body` background is transparent; paint your own background on
> `#melo-player` and use `border-radius` to shape the window.

---

## 8. Workflow tips

1. Start by copying `full-html-example.html` and renaming it (e.g.
   `my-skin.html`) in the skins folder.
2. Edit with any editor. Save the file.
3. In Melo, click **Refresh** and re-select your skin, or just re-select it
   from the dropdown — Melo re-reads the file from disk each time.
4. Toggle the **Theme** button to verify light/dark both look right, or hard-
   code your own palette and ignore the theme.
5. Use your browser's DevTools (in `tauri dev`) to inspect elements.
6. If a button does nothing, double-check its ID against the table above —
   IDs are case-sensitive.
7. If the window is the wrong size, verify the `melo-window` meta tag is a
   direct child of `<head>` and its `content` string uses commas between
   key/value pairs.
8. If artwork appears stretched, constrain `#coverImg` with
   `object-fit: cover` and give its wrapper a fixed aspect ratio.

---

## 9. Minimal full-HTML template

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>My Melo Skin</title>
<meta name="melo-window" content="width=360, height=500, resizable=true" />
<style>
  * { box-sizing: border-box; margin: 0; }
  #melo-player {
    width: 100%; height: 100vh;
    background: #111; color: #fff;
    border-radius: 18px; padding: 16px;
    display: flex; flex-direction: column; gap: 14px;
    font-family: sans-serif;
  }
  [data-tauri-drag-region] { -webkit-app-region: drag; }
  button { -webkit-app-region: no-drag; }
  .cover { width: 100%; aspect-ratio: 1; border-radius: 14px;
           background: #222; overflow: hidden; }
  .cover img { width: 100%; height: 100%; object-fit: cover; }
  .title { font-size: 18px; font-weight: 700; }
  .controls { display: flex; gap: 10px; justify-content: center; }
  button { background: #333; color: #fff; border: 0;
           padding: 10px 16px; border-radius: 10px; cursor: pointer; }
  #btnPlay { background: #7c9cff; color: #111; }
</style>
</head>
<body>
<div id="melo-player">
  <div data-tauri-drag-region style="display:flex;justify-content:space-between;">
    <strong>MELO</strong>
    <div>
      <button aria-label="minimize">&mdash;</button>
      <button aria-label="close">&times;</button>
    </div>
  </div>

  <div class="cover" id="coverWrap">
    <img id="coverImg" style="display:none" alt="" />
    <div id="coverFallback" style="display:grid;place-items:center;height:100%;">&#9834;</div>
  </div>

  <div class="title" id="trackTitle">No track loaded</div>
  <div id="trackArtist" style="color:#aaa">Add music to start</div>

  <div style="display:flex;gap:8px;align-items:center;">
    <span id="curTime">0:00</span>
    <input id="seekBar" type="range" min="0" max="100" value="0" style="flex:1" />
    <span id="durTime">0:00</span>
  </div>

  <div class="controls">
    <button id="btnPrev">Prev</button>
    <button id="btnPlay">
      <span id="iconPause">Pause</span>
      <span id="iconPlay" style="display:none">Play</span>
    </button>
    <button id="btnNext">Next</button>
  </div>

  <div class="controls">
    <button id="btnShuffle">Shuffle</button>
    <button id="btnRepeat">Repeat</button>
    <button id="btnToggleLibrary">Library</button>
    <button id="btnOpenSettings">Settings</button>
  </div>

  <!-- Hidden elements Melo expects but this skin doesn't show -->
  <div style="display:none">
    <input id="volBar" type="range" min="0" max="100" value="60" />
    <span id="volIcon"></span><span id="volPct"></span>
    <div id="vizBars"></div>
    <div id="trackAlbum"></div><div id="trackCodec"></div><div id="trackSpecs"></div>
    <button id="btnStop"></button>
  </div>
</div>
</body>
</html>
```

---

## 10. Troubleshooting

| Symptom                                         | Fix                                                                                  |
| ----------------------------------------------- | ------------------------------------------------------------------------------------ |
| Skin doesn't change when selected               | Ensure the file contains at least 3 known IDs, or contains a `<style>` block.        |
| Window is the wrong size / content clipped      | Add/correct the `<meta name="melo-window">` tag with explicit `width` and `height`. |
| A button is dead                               | Check its ID exactly matches this guide; IDs are case-sensitive.                     |
| Can't drag the window                          | Add `data-tauri-drag-region` to your title bar and `-webkit-app-region: drag`.       |
| Cover never shows                              | Include both `#coverImg` (an `<img>`) and `#coverFallback` inside `#coverWrap`.     |
| Visualizer is invisible                        | Give `#vizBars` an explicit height in CSS; the canvas fills its container.           |
| Changes not appearing after saving              | Click **Refresh** in Settings, then re-select the skin.                             |
| Rounded corners show a black rectangle          | Keep `transparent=true` and paint your own background/rounded corners on `#melo-player`. |

Happy skinning!
