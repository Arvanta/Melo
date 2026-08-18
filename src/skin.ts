import { busEmit, busOn, isTauri } from "./bus";

let customStyleEl: HTMLStyleElement | null = null;
let customFrame: HTMLIFrameElement | null = null;

export interface SkinItem {
  id: string;
  name: string;
  filename: string;
  path?: string;
}

export interface SkinGeometry {
  width?: number;
  height?: number;
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
  resizable?: boolean;
}

/**
 * Resolve a player hook by legacy id first, then by the position-independent
 * `data-melo` role attribute. Skins may use either (or both) conventions.
 */
export function findHook<T extends HTMLElement = HTMLElement>(id: string, role: string): T | null {
  const byId = document.getElementById(id);
  if (byId) return byId as T;
  return document.querySelector<T>(`[data-melo="${role}"]`);
}

/**
 * A full HTML skin may declare the native window size it wants via
 * data-window-width / data-window-height (plus optional min sizes and
 * resizability) on <html>, <body> or the #lumi-player root.
 */
export function parseSkinGeometry(htmlText: string): SkinGeometry | null {
  const read = (attr: string): number | null => {
    const m = htmlText.match(new RegExp(attr + '\\s*=\\s*["\']?(\\d+)'));
    return m ? parseInt(m[1], 10) : null;
  };
  const width = read("data-window-width");
  const height = read("data-window-height");
  const minWidth = read("data-min-width");
  const minHeight = read("data-min-height");
  const maxWidth = read("data-max-width");
  const maxHeight = read("data-max-height");
  const resizable = !/data-resizable\s*=\s*["\']?false/i.test(htmlText);
  // Return geometry whenever the skin declares anything about its window —
  // a target size, min/max bounds, or both.
  if (
    width == null && height == null &&
    minWidth == null && minHeight == null &&
    maxWidth == null && maxHeight == null
  ) return null;
  return {
    width: width ?? undefined,
    height: height ?? undefined,
    minWidth: minWidth ?? undefined,
    minHeight: minHeight ?? undefined,
    maxWidth: maxWidth ?? undefined,
    maxHeight: maxHeight ?? undefined,
    resizable,
  };
}

export function readSkinGeometry(): SkinGeometry | null {
  try {
    const geo = JSON.parse(localStorage.getItem("melo-skin-geometry") || "null");
    if (!geo || typeof geo !== "object") return null;
    return geo as SkinGeometry;
  } catch {}
  return null;
}

const COMPACT_PILL = `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Melo Skin - Minimal Compact (Light/Dark)</title>
<style>
  /* Theme tokens — dark is the default, light overrides via [data-theme] */
  :root {
    --card: #151b23;
    --card-border: rgba(255, 255, 255, 0.1);
    --text: #f3f4f6;
    --text-soft: #9ca3af;
    --text-muted: #6b7280;
    --accent: #4db6ac;
    --track-bg: #212833;
    --shadow: 0 16px 36px rgba(0, 0, 0, 0.5), 0 2px 8px rgba(0, 0, 0, 0.3);
    --accent-soft: rgba(77, 182, 172, 0.2);
    --cover-bg: #0d1117;
    --cover-border: #30363d;
    --cover-shadow: 0 4px 14px rgba(0, 0, 0, 0.4);
    --fallback-grad: linear-gradient(135deg, #1e293b, #0f766e);
    --fallback-fg: #5eead4;
    --thumb-shadow: 0 0 8px rgba(77, 182, 172, 0.4);
    --transport-fg: #9ca3af;
  }
  :root[data-theme="light"] {
    --card: #ffffff;
    --card-border: rgba(0, 0, 0, 0.08);
    --text: #111827;
    --text-soft: #6b7280;
    --text-muted: #9ca3af;
    --accent: #5b92a5;
    --track-bg: #e5e7eb;
    --shadow: 0 12px 32px rgba(0, 0, 0, 0.12), 0 2px 6px rgba(0, 0, 0, 0.04);
    --accent-soft: rgba(91, 146, 165, 0.15);
    --cover-bg: #e2e8f0;
    --cover-border: #ffffff;
    --cover-shadow: 0 4px 12px rgba(0, 0, 0, 0.10);
    --fallback-grad: linear-gradient(135deg, #a5b4fc, #67e8f9);
    --fallback-fg: #ffffff;
    --thumb-shadow: 0 1px 4px rgba(0, 0, 0, 0.18);
    --transport-fg: #4b5563;
  }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: transparent;
    color: var(--text);
    overflow: hidden;
    height: 100vh;
    display: flex;
    align-items: stretch;
  }
  .player-card {
    background: var(--card) !important;
    border: none !important;
    border-radius: 24px !important;
    box-shadow: none !important;
    clip-path: inset(0 round 24px) !important;
    padding: 10px 18px 12px 18px !important;
    width: 100% !important;
    height: 100% !important;
    min-height: 135px !important;
    max-height: 145px !important;
    display: flex !important;
    flex-direction: column !important;
    justify-content: space-between !important;
    position: relative !important;
    box-sizing: border-box !important;
  }

  /* Top Bar */
  .player-titlebar {
    position: relative !important;
    height: 24px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: space-between !important;
    margin-bottom: 2px !important;
    -webkit-app-region: drag !important;
    user-select: none !important;
  }

  /* Top-Left: Brand + Action Buttons in ordered compact row */
  .titlebar-left {
    display: flex !important;
    align-items: center !important;
    gap: 4px !important;
    -webkit-app-region: no-drag !important;
  }
  .app-name-btn {
    display: flex; align-items: center; gap: 5px;
    font-size: 11.5px; font-weight: 700; color: var(--text);
    background: transparent; border: none; padding: 2px 6px;
    border-radius: 6px; cursor: default; letter-spacing: 0.02em;
    pointer-events: none; user-select: none;
  }

  .mini-btn {
    width: 22px; height: 22px; border-radius: 5px; border: none;
    background: transparent; color: var(--text-soft); display: grid;
    place-items: center; cursor: pointer; font-size: 11px;
    transition: all 0.15s; padding: 0;
  }
  .mini-btn:hover { background: var(--track-bg); color: var(--text); }
  .mini-btn.active { color: var(--accent); background: var(--accent-soft); font-weight: bold; }
  .mini-sep { width: 1px; height: 12px; background: var(--card-border); margin: 0 2px; }

  /* Top-Right: Window Controls (NO MAXIMIZE) */
  .win-controls {
    display: flex !important;
    gap: 2px !important;
    -webkit-app-region: no-drag !important;
  }
  .win-btn {
    width: 24px !important; height: 20px !important; border-radius: 4px !important;
    border: none !important; background: transparent !important; color: var(--text-soft) !important;
    display: grid !important; place-items: center !important; cursor: pointer !important;
    font-size: 11px !important; transition: all 0.15s !important;
  }
  .win-btn:hover { background: var(--track-bg) !important; color: var(--text) !important; }
  .win-btn.close:hover { background: #ef4444 !important; color: white !important; }

  /* Main Streamlined Player Row */
  .player-main {
    display: flex !important;
    align-items: center !important;
    gap: 14px !important;
    flex: 1 !important;
    margin-top: 0 !important;
    min-height: 0 !important;
  }

  /* Circular Album Art */
  .cover-col {
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    flex-shrink: 0 !important;
  }
  .cover-wrap {
    width: 78px !important;
    height: 78px !important;
    border-radius: 50% !important;
    overflow: hidden !important;
    background: var(--cover-bg) !important;
    box-shadow: var(--cover-shadow) !important;
    flex-shrink: 0 !important;
    border: 2px solid var(--cover-border) !important;
  }
  .cover-wrap img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .cover-fallback { width: 100%; height: 100%; display: grid; place-items: center; background: var(--fallback-grad); color: var(--fallback-fg); font-size: 24px; }

  /* Track Title & Artist */
  .track-info {
    display: flex !important;
    flex-direction: column !important;
    justify-content: center !important;
    width: 180px !important;
    min-width: 180px !important;
    max-width: 180px !important;
    flex: 0 0 180px !important;
  }
  .track-title {
    font-size: 17.5px !important;
    font-weight: 700 !important;
    color: var(--text) !important;
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
    line-height: 1.25 !important;
  }
  .track-artist {
    font-size: 13px !important;
    color: var(--text-soft) !important;
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
    margin-top: 3px !important;
  }
  .track-album, .track-format { display: none !important; }

  /* Center Sleek Seeker */
  .seek-center {
    flex: 1 !important;
    display: flex !important;
    align-items: center !important;
    gap: 8px !important;
    padding: 0 4px !important;
    min-width: 120px !important;
  }
  .time-label {
    font-size: 11px !important;
    color: var(--text-muted) !important;
    font-variant-numeric: tabular-nums !important;
    min-width: 28px !important;
  }
  .time-label.cur { text-align: right !important; }
  .time-label.dur { text-align: left !important; }

  .seek-row { flex: 1 !important; display: flex !important; align-items: center !important; }
  input[type="range"].seek {
    -webkit-appearance: none !important;
    appearance: none !important;
    width: 100% !important;
    height: 5px !important;
    border-radius: 999px !important;
    background: linear-gradient(to right, var(--accent, #4db6ac) 0%, var(--accent, #4db6ac) var(--progress, 35%), var(--track-bg) var(--progress, 35%), var(--track-bg) 100%) !important;
    outline: none !important;
    cursor: pointer !important;
  }
  input[type="range"].seek::-webkit-slider-thumb {
    -webkit-appearance: none !important;
    width: 15px !important;
    height: 15px !important;
    border-radius: 50% !important;
    background: #ffffff !important;
    /* Border (and glow) follow the Dynamic Album Artwork accent color when
       it is active; otherwise they fall back to the theme's static values. */
    border: 3.5px solid var(--accent, #4db6ac) !important;
    box-shadow: 0 0 8px var(--accent-glow, var(--thumb-shadow)) !important;
    cursor: pointer !important;
    transition: transform 0.1s !important;
  }
  input[type="range"].seek::-webkit-slider-thumb:hover { transform: scale(1.2) !important; }

  /* Right Transport Controls */
  .transport {
    display: flex !important;
    align-items: center !important;
    gap: 6px !important;
    flex-shrink: 0 !important;
    padding-right: 2px !important;
  }
  .transport button, .transport .icon-btn, .transport .play-btn {
    border: none !important;
    background: transparent !important;
    color: var(--transport-fg) !important;
    cursor: pointer !important;
    display: grid !important;
    place-items: center !important;
    width: 28px !important;
    height: 28px !important;
    padding: 3px !important;
    border-radius: 6px !important;
    transition: all 0.15s !important;
  }
  .transport button:hover, .transport .play-btn:hover {
    color: var(--text) !important;
    background: var(--track-bg) !important;
    transform: scale(1.08) !important;
  }
  .transport button.active {
    color: var(--accent) !important;
    background: var(--accent-soft) !important;
  }
  .transport button svg, .transport .icon-btn svg { width: 16px !important; height: 16px !important; }
  .transport .play-btn { width: 32px !important; height: 32px !important; }
  .transport .play-btn svg { width: 20px !important; height: 20px !important; }

  /* Hidden audio support elements (kept for JS event listeners) */
  .hidden-helper { display: none !important; }
</style>
</head>
<body>
<div id="lumi-player">
  <div class="player-titlebar" data-tauri-drag-region>
    <!-- Top-Left: App name + Add files + Add folder + Theme toggle + Windows buttons -->
    <div class="titlebar-left">
      <button class="app-name-btn" id="appMenuBtn">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M2 12h2l1-7 2 14 3-10 2 6h2l2-9 2 14 2-7h2"/></svg>
        Melo
      </button>
      <div class="mini-sep"></div>
      <button class="mini-btn" id="btnAddFiles" title="Add files (Ctrl+O)">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M12 12v6"/><path d="M9 15h6"/></svg>
      </button>
      <button class="mini-btn" id="btnAddFolder" title="Add folder (Ctrl+Shift+O)">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/><path d="M12 10v6"/><path d="M9 13h6"/></svg>
      </button>
      <button class="mini-btn" id="btnThemeToggle" title="Toggle Light / Dark Theme">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="M4.93 4.93l1.41 1.41"/><path d="M17.66 17.66l1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="M6.34 17.66l-1.41 1.41"/><path d="M19.07 4.93l-1.41 1.41"/></svg>
      </button>
      <div class="mini-sep"></div>
      <button class="mini-btn" id="btnToggleLibrary" title="Library">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m16 6 4 14"/><path d="M12 6v14"/><path d="M8 8v12"/><path d="M4 4v16"/></svg>
      </button>
      <button class="mini-btn" id="btnTogglePlaylist" title="Playlist">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15V6"/><path d="M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"/><path d="M12 12H3"/><path d="M16 6H3"/><path d="M12 18H3"/></svg>
      </button>
      <button class="mini-btn" id="btnToggleEq" title="Equalizer">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 14h3v7H3zM9 10h3v11H9zM15 6h3v15h-3z"/></svg>
      </button>
      <button class="mini-btn" id="btnToggleLyrics" title="Lyric">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
      </button>
      <button class="mini-btn" id="btnOpenSettings" title="Settings">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
      </button>
      <div class="mini-sep"></div>
      <button class="mini-btn" id="btnShuffle" title="Shuffle (S)">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 3h5v5"/><path d="M4 20l8-8"/><path d="M21 3l-8 8"/><path d="M16 21h5v-5"/><path d="M4 4l5 5"/><path d="M9 15l-5 5"/></svg>
      </button>
      <button class="mini-btn" id="btnRepeat" title="Repeat (R)">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 1l4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><path d="M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>
      </button>
    </div>

    <!-- Top-Right: Window Controls (NO MAXIMIZE) -->
    <div class="win-controls">
      <button class="win-btn" aria-label="minimize" title="Minimize">—</button>
      <button class="win-btn close" aria-label="close" title="Close">×</button>
    </div>
  </div>

  <!-- Main Streamlined Content Row -->
  <div class="player-main">
    <div class="cover-col">
      <div class="cover-wrap" id="coverWrap">
        <img id="coverImg" style="display:none" alt="cover"/>
        <div id="coverFallback" class="cover-fallback">♪</div>
      </div>
    </div>

    <div class="track-info">
      <div class="track-title" id="trackTitle">Morning Sun</div>
      <div class="track-artist" id="trackArtist">Serenity Now</div>
      <div id="trackAlbum" class="hidden-helper"></div>
      <div id="trackCodec" class="hidden-helper"></div>
      <div id="trackSpecs" class="hidden-helper"></div>
    </div>

    <div class="seek-center">
      <span class="time-label cur" id="curTime">0:00</span>
      <div class="seek-row">
        <input id="seekBar" type="range" class="seek" min="0" max="276" value="130"/>
      </div>
      <span class="time-label dur" id="durTime">4:36</span>
    </div>

    <div class="transport">
      <button class="icon-btn" id="btnPrev" title="Previous">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h2v12H6zm3.5 6 8.5 6V6z"/></svg>
      </button>
      <button class="play-btn" id="btnPlay" title="Play / Pause (Space)">
        <svg id="iconPause" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
        <svg id="iconPlay" viewBox="0 0 24 24" fill="currentColor" style="display:none"><path d="M8 5v14l11-7z"/></svg>
      </button>
      <button class="icon-btn" id="btnStop" title="Stop">
        <svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="6" width="12" height="12" rx="2"/></svg>
      </button>
      <button class="icon-btn" id="btnNext" title="Next">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="m6 18 8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>
      </button>
    </div>
  </div>

  <!-- Hidden volume & visualizer placeholders for player bindings -->
  <div class="hidden-helper">
    <input id="volBar" type="range" min="0" max="100" value="60"/>
    <span id="volIcon">🔊</span>
    <span id="volPct">60%</span>
    <div id="vizBars"></div>
  </div>
</div>
</body>
</html>
`;

const EMBEDDED_SKINS: Record<string, string> = {
  "compact-pill.html": COMPACT_PILL,
  "compact-pill": COMPACT_PILL,
  // Legacy ids kept so saved preferences from older versions still resolve
  "compact-pill-light.html": COMPACT_PILL,
  "compact-pill-dark.html": COMPACT_PILL,
  "compact-pill-light": COMPACT_PILL,
  "compact-pill-dark": COMPACT_PILL,
};

const WEB_SKINS_LIST: SkinItem[] = [
  { id: "compact-pill", name: "Minimal Compact (Light/Dark)", filename: "compact-pill.html" },
  { id: "full-html-example", name: "Full HTML Example", filename: "full-html-example.html" },
  { id: "slate", name: "Slate", filename: "slate.html" },
  { id: "silk-orbit", name: "Silk Orbit", filename: "silk-orbit.html" },
  { id: "ivory", name: "Ivory", filename: "ivory.html" },
  { id: "microline", name: "Microline", filename: "microline.html" },
];

export function isFullHtmlSkin(htmlText: string): boolean {
  const idMarkers = ["trackTitle", "btnPlay", "seekBar", "coverImg"];
  let count = 0;
  for (const m of idMarkers) if (htmlText.includes(m)) count++;
  // `data-melo` based skins (new convention) also count as full skins.
  const meloAttrCount = (htmlText.match(/data-melo\s*=/g) || []).length;
  count += Math.min(meloAttrCount, 3);
  return count >= 3;
}

export function applyCustomSkin(htmlText: string, toast?: (m: string) => void, applyGeometry = true) {
  const playerCard = document.getElementById("playerCard") as HTMLElement;
  if (!playerCard) return;
  const originalPlayerHTML = (playerCard as any)._originalHTML || playerCard.innerHTML;
  if (!(playerCard as any)._originalHTML) (playerCard as any)._originalHTML = originalPlayerHTML;

  if (customStyleEl) { customStyleEl.remove(); customStyleEl = null; }
  if (customFrame) { customFrame.remove(); customFrame = null; }

  const styleMatches = [...htmlText.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)];
  let css = styleMatches.map((m) => m[1]).join("\n");

  if (css) {
    customStyleEl = document.createElement("style");
    customStyleEl.id = "melo-custom-skin";
    customStyleEl.textContent = css;
    document.head.appendChild(customStyleEl);
  }

  const isFull = isFullHtmlSkin(htmlText);
  let bodyHTML = "";
  const bodyMatch = htmlText.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (bodyMatch) bodyHTML = bodyMatch[1];
  else {
    const afterStyle = htmlText.split(/<\/style>/i).pop() || "";
    bodyHTML = afterStyle;
  }
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = bodyHTML;
  const lumiRoot = tempDiv.querySelector("#lumi-player");
  if (lumiRoot) bodyHTML = lumiRoot.innerHTML;

  if (isFull && bodyHTML.trim().length > 20) {
    const trimmed = bodyHTML.trim();
    playerCard.innerHTML = trimmed;
    if (toast) toast("Skin applied");
    setTimeout(() => {
      (window as any).__LUMI_REBIND__?.();
      const audio = (window as any).__LUMI_AUDIO__ as HTMLAudioElement;
      if (audio && (window as any).__LUMI_REBIND_VISUALIZER__) {
        (window as any).__LUMI_REBIND_VISUALIZER__(audio);
      }
      (window as any).__LUMI_REBIND_MAIN__?.();
    }, 40);
  } else if (css && toast) {
    toast("Skin CSS applied");
  }

  // Persist the window geometry declared by a full skin (any size/shape).
  // The geometry is always saved (so a restart can honour it), but the
  // resize event is only emitted when the user explicitly picks/imports a
  // skin — re-applying the same skin at boot or on a theme change must NOT
  // snap the window back to the skin's default size.
  if (isFull) {
    const geometry = parseSkinGeometry(htmlText);
    if (geometry) {
      localStorage.setItem("melo-skin-geometry", JSON.stringify(geometry));
      if (applyGeometry) busEmit("melo:skin-geometry", geometry);
    } else {
      localStorage.removeItem("melo-skin-geometry");
    }
  }

  localStorage.setItem("lumi-custom-skin", htmlText);
  localStorage.setItem("lumi-custom-skin-isFull", isFull ? "1" : "0");
}

export function resetSkin(toast?: (m: string) => void, broadcast = true) {
  document.documentElement.classList.remove("compact-skin-active");
  document.body.classList.remove("compact-skin-active");
  document.documentElement.classList.remove("custom-skin-active");
  document.body.classList.remove("custom-skin-active");
  if (customStyleEl) { customStyleEl.remove(); customStyleEl = null; }
  if (customFrame) { customFrame.remove(); customFrame = null; }
  const playerCard = document.getElementById("playerCard") as HTMLElement;
  if (playerCard && (playerCard as any)._originalHTML) {
    playerCard.innerHTML = (playerCard as any)._originalHTML;
    setTimeout(() => {
      (window as any).__LUMI_REBIND__?.();
      const audio = (window as any).__LUMI_AUDIO__ as HTMLAudioElement;
      if (audio && (window as any).__LUMI_REBIND_VISUALIZER__) {
        (window as any).__LUMI_REBIND_VISUALIZER__(audio);
      }
      (window as any).__LUMI_REBIND_MAIN__?.();
    }, 40);
  }
  localStorage.removeItem("lumi-custom-skin");
  localStorage.removeItem("lumi-custom-skin-isFull");
  localStorage.removeItem("melo-skin-geometry");
  localStorage.setItem("melo-active-skin-id", "default");
  if (broadcast) busEmit("melo:skin-changed", "default");
  if (toast) toast("Switched to Default Melo skin");
}

export async function listInstalledSkins(): Promise<SkinItem[]> {
  if (isTauri) {
    try {
      const { invoke } = await import("@tauri-apps/api/core");
      const list: SkinItem[] = await invoke("list_installed_skins");
      if (Array.isArray(list) && list.length > 0) {
        return list;
      }
    } catch {}
  }
  return WEB_SKINS_LIST;
}

export async function loadSkinFromDisk(filenameOrPath: string, toast?: (m: string) => void, applyGeometry = true): Promise<boolean> {
  // 1. Try reading directly from disk via Rust command
  if (isTauri) {
    try {
      const { invoke } = await import("@tauri-apps/api/core");
      const content: string = await invoke("read_skin_file", { filenameOrPath });
      if (content && content.trim().length > 0) {
        applyCustomSkin(content, toast, applyGeometry);
        return true;
      }
    } catch {}
  }

  // 2. Try fetching from web root
  try {
    const cleanPath = filenameOrPath.startsWith("skins/") ? filenameOrPath : `skins/${filenameOrPath}`;
    const resp = await fetch(cleanPath);
    if (resp.ok) {
      const text = await resp.text();
      applyCustomSkin(text, toast, applyGeometry);
      return true;
    }
  } catch {}

  // 3. Guaranteed embedded fallback
  const baseName = filenameOrPath.replace(/^.*[\\/]/, "");
  if (EMBEDDED_SKINS[baseName]) {
    applyCustomSkin(EMBEDDED_SKINS[baseName], toast, applyGeometry);
    return true;
  }

  if (toast) toast(`Could not load skin: ${filenameOrPath}`);
  return false;
}

export async function applySkinChoice(skinChoice: string, currentTheme: "light" | "dark", toast?: (m: string) => void, broadcast = true, applyGeometry = true) {
  if (skinChoice === "default") {
    resetSkin(toast, broadcast);
    return;
  }

  let targetFile = skinChoice;
  const isCompact = skinChoice === "compact-pill" || skinChoice.startsWith("compact-pill");
  const isCustom = !isCompact;
  document.documentElement.classList.toggle("compact-skin-active", isCompact);
  document.body.classList.toggle("compact-skin-active", isCompact);
  document.documentElement.classList.toggle("custom-skin-active", isCustom);
  document.body.classList.toggle("custom-skin-active", isCustom);
  if (isCompact) {
    // Single combined skin handles both themes via CSS [data-theme] variables
    targetFile = "compact-pill.html";
  } else if (!targetFile.endsWith(".html") && !targetFile.endsWith(".htm")) {
    targetFile = targetFile + ".html";
  }

  // Built-in compact skins are loaded from this build's embedded copy.
  // This prevents an old skin file left in AppData by an earlier install
  // from silently overriding layout and bug fixes in a newer version.
  let success = false;
  if (isCompact && EMBEDDED_SKINS[targetFile]) {
    applyCustomSkin(EMBEDDED_SKINS[targetFile], toast, applyGeometry);
    success = true;
  } else {
    success = await loadSkinFromDisk(targetFile, toast, applyGeometry);
  }
  if (success) {
    localStorage.setItem("melo-active-skin-id", skinChoice);
    if (broadcast) busEmit("melo:skin-changed", skinChoice);
  }
}

export async function openSkinsFolderOnDisk(toast?: (m: string) => void) {
  if (isTauri) {
    try {
      const { invoke } = await import("@tauri-apps/api/core");
      await invoke("open_skins_folder");
      if (toast) toast("Opening skins folder...");
    } catch {
      if (toast) toast("Could not open skins folder");
    }
  } else {
    if (toast) toast("Skins are located in the skins/ folder");
  }
}

export function setupSkinEngine(toast: (m: string) => void) {
  const skinUpload = document.getElementById("skinUpload") as HTMLInputElement;

  const savedSkinId = localStorage.getItem("melo-active-skin-id") || "default";
  const theme = (localStorage.getItem("lumi-theme") as "light" | "dark") || "dark";

  if (savedSkinId && savedSkinId !== "default") {
    setTimeout(() => {
      // Boot re-application must not snap the window back to the skin's
      // default size — a resizable skin keeps its saved dimensions.
      applySkinChoice(savedSkinId, theme, undefined, false, false);
    }, 150);
  }

  busOn("melo:theme", (t: any) => {
    const activeSkin = localStorage.getItem("melo-active-skin-id");
    if (activeSkin && activeSkin !== "default") {
      applySkinChoice(activeSkin, t, undefined, false, false);
    }
  });

  busOn("melo:skin-changed", (skinChoice: any) => {
    if (skinChoice && typeof skinChoice === "string") {
      const currentTheme = (localStorage.getItem("lumi-theme") as "light" | "dark") || "dark";
      applySkinChoice(skinChoice, currentTheme, undefined, false, false);
    }
  });

  if (skinUpload) {
    skinUpload.addEventListener("change", async () => {
      const file = skinUpload.files?.[0];
      if (!file) return;
      const text = await file.text();
      const filename = file.name;
      
      if (isTauri) {
        try {
          const { invoke } = await import("@tauri-apps/api/core");
          await invoke("save_custom_skin_file", { filename, content: text });
          toast(`Saved ${filename} to skins folder`);
        } catch {}
      }
      
      applyCustomSkin(text, toast);
      localStorage.setItem("melo-active-skin-id", filename);
      busEmit("melo:skin-changed", filename);
      skinUpload.value = "";
    });
  }

  document.addEventListener("dragover", (e) => {
    if ([...(e.dataTransfer?.types || [])].includes("Files")) e.preventDefault();
  });
  document.addEventListener("drop", async (e) => {
    const file = [...(e.dataTransfer?.files || [])].find(
      (f) => f.name.endsWith(".html") || f.name.endsWith(".htm")
    );
    if (file) {
      e.preventDefault();
      const text = await file.text();
      if (text.includes("<style") || text.includes("<html") || isFullHtmlSkin(text)) {
        const filename = file.name;
        if (isTauri) {
          try {
            const { invoke } = await import("@tauri-apps/api/core");
            await invoke("save_custom_skin_file", { filename, content: text });
          } catch {}
        }
        applyCustomSkin(text, toast);
        localStorage.setItem("melo-active-skin-id", filename);
        busEmit("melo:skin-changed", filename);
      }
    }
  });

  (window as any).LumiSkin = { applyCustomSkin, resetSkin, applySkinChoice, listInstalledSkins, openSkinsFolderOnDisk };
}
