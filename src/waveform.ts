import { readSetting } from "./settings";
import { busEmit, busOn, isTauri } from "./bus";
import { findHook } from "./skin";
import type { Track } from "./types";

// ---------------------------------------------------------------------
// Optional waveform seek bar.
//
// Settings → Appearance & Skin → "Waveform seek bar" (`melo-pref-waveformSeek` = "1",
// default OFF). When ON, and the active skin declares a slot, the plain progress bar is
// replaced by the track's waveform:
//
//   <div data-melo="waveform"></div>     ← the slot (id="skinWaveform" also works)
//
// The slot is a plain container: Melo builds two stacked canvases inside it (the whole
// waveform + the played part, revealed with a clip-path) and a thin playhead. Style it
// like any element (size, position, border-radius); colours come from two CSS variables
// on the slot, both with defaults:
//
//   --melo-wave-played   (default: var(--accent))
//   --melo-wave-rest     (default: a soft tint of the text colour)
//
// Purely opt-in: a skin without the slot is untouched (nothing is decoded for it). Peaks
// come from Rust (`get_waveform_peaks`: decoded once per file on a background thread and
// cached on disk). While a file is still being analysed the slot shows a thin line -
// which already works as the seek bar - and the finished part of the waveform grows in
// from the left, replacing it. The line appears at once (never after a delay): the plain
// 4px bar must not show for a moment first and then thin out.
// For unsupported codecs (or an error) the regular seek bar comes back. Seeking reuses the real seek input's own handlers
// (`input`/`change`), so crossfade cancel, "seeking" state and the clock behave exactly
// as when dragging the plain bar. On <html>: `melo-wave-on` marks "waveform ready for the
// current track" so a skin/CSS can hide its plain bar.
//
// Performance: the waveform is drawn only when the peaks, the size or the theme change.
// Playback progress only moves a CSS variable (the played canvas is clipped, never
// redrawn), at the ~4 Hz position event the player already fires.
// ---------------------------------------------------------------------

const PREF_KEY = "melo-pref-waveformSeek";
const ROOT_CLASS = "melo-wave-on";

export function isWaveformSeekEnabled(): boolean {
  return localStorage.getItem(PREF_KEY) === "1";
}

/** Bar widths for the "Bar thickness" setting (CSS px); the gap between bars is constant. */
const BAR_WIDTHS: Record<string, number> = { thin: 1, normal: 2, thick: 3 };
const BAR_GAP = 1;
/** Quietest bar, as a fraction of the slot height, so silence still shows a hairline. */
const MIN_BAR = 0.06;
const PEAK_CACHE_MAX = 24;
/** Columns Rust reports for a finished waveform (partial reports are a prefix of these). */
const TOTAL_COLS = 400;
/** Thickness of the "not analysed yet" line (CSS px). */
const LINE_H = 1.5;

export function setupWaveformSeek() {
  let enabled = isWaveformSeekEnabled();
  let track: Track | null = null;
  // Columns known so far: a growing prefix while Rust decodes, all of them once complete.
  let known: number[] = [];
  let complete = false;
  let active = false; // the slot is shown (loading line or finished waveform)
  let loadToken = 0;
  let positionSec = 0;
  const peakCache = new Map<string, number[]>();

  // Slot + the nodes Melo builds inside it. A skin swap replaces the whole player
  // markup, so these are re-resolved lazily and rebuilt when the slot element changes.
  let slot: HTMLElement | null = null;
  let restCv: HTMLCanvasElement | null = null;
  let playedCv: HTMLCanvasElement | null = null;
  let head: HTMLElement | null = null;
  let ro: ResizeObserver | null = null;
  let drawQueued = false;
  let lastPct = -1;
  let dragging = false;
  // Appearance + hover preference (Settings → Appearance), read once and kept in sync
  // through melo:pref-changed.
  let barW = BAR_WIDTHS[String(readSetting("waveformBar"))] ?? 2;
  let topOnly = readSetting("waveformShape") === "top";
  let hoverOn = readSetting("waveformHover") !== false;
  let hoverCv: HTMLCanvasElement | null = null;
  let hoverLine: HTMLElement | null = null;
  let hoverTip: HTMLElement | null = null;
  let hoverQueued = false;
  let hoverX = -1;

  const setRootOn = (on: boolean) => document.documentElement.classList.toggle(ROOT_CLASS, on);

  function resolveSlot(): HTMLElement | null {
    const el = findHook<HTMLElement>("skinWaveform", "waveform");
    if (el !== slot) {
      teardownSlot();
      slot = el;
      if (slot) buildSlot(slot);
    }
    return slot;
  }

  function buildSlot(host: HTMLElement) {
    host.textContent = "";
    host.classList.add("melo-wave-slot");
    restCv = document.createElement("canvas");
    restCv.className = "mw-rest";
    playedCv = document.createElement("canvas");
    playedCv.className = "mw-played";
    hoverCv = document.createElement("canvas");
    hoverCv.className = "mw-hover";
    head = document.createElement("div");
    head.className = "mw-head";
    hoverLine = document.createElement("div");
    hoverLine.className = "mw-hline";
    hoverTip = document.createElement("div");
    hoverTip.className = "mw-tip";
    // Order matters: rest < hover-brightened < played < playhead < hover line < tooltip.
    host.append(restCv, hoverCv, playedCv, head, hoverLine, hoverTip);
    host.setAttribute("role", "presentation");
    host.addEventListener("pointerdown", onPointerDown);
    host.addEventListener("pointermove", onHoverMove);
    host.addEventListener("pointerleave", hideHover);
    // A label next to the slot growing a pixel or two (0:59 -> 10:00) must not re-bin the
    // bars: the canvas just stretches by <1%. Only real size changes redraw.
    let rw = 0, rh = 0;
    ro = new ResizeObserver((entries) => {
      const r = entries[0]?.contentRect;
      if (r && rw && Math.abs(r.width - rw) <= 3 && Math.abs(r.height - rh) < 1) return;
      if (r) { rw = r.width; rh = r.height; }
      scheduleDraw();
    });
    ro.observe(host);
    lastPct = -1;
  }

  function teardownSlot() {
    ro?.disconnect();
    ro = null;
    if (slot) {
      slot.removeEventListener("pointerdown", onPointerDown);
      slot.removeEventListener("pointermove", onHoverMove);
      slot.removeEventListener("pointerleave", hideHover);
      slot.classList.remove("melo-wave-slot", "mw-hovering");
      slot.style.removeProperty("--mw-p");
      slot.style.removeProperty("--mw-h");
    }
    slot = null;
    restCv = playedCv = hoverCv = head = hoverLine = hoverTip = null;
  }

  function seekInput(): HTMLInputElement | null {
    return findHook<HTMLInputElement>("seekBar", "seek");
  }

  function durationSec(): number {
    const bar = seekInput();
    const fromBar = bar ? parseFloat(bar.max) : NaN;
    if (Number.isFinite(fromBar) && fromBar > 0) return fromBar;
    return Number(track?.duration) > 0 ? Number(track!.duration) : 0;
  }

  // ---- drawing ----
  function scheduleDraw() {
    if (drawQueued) return;
    drawQueued = true;
    requestAnimationFrame(() => {
      drawQueued = false;
      draw();
    });
  }

  function cssColor(host: HTMLElement, name: string, fallback: string): string {
    const v = getComputedStyle(host).getPropertyValue(name).trim();
    return v || fallback;
  }

  function paint(cv: HTMLCanvasElement, w: number, h: number, dpr: number, color: string) {
    cv.width = Math.max(1, Math.round(w * dpr));
    cv.height = Math.max(1, Math.round(h * dpr));
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = color;
    const step = barW + BAR_GAP;
    const n = Math.max(1, Math.floor((w + BAR_GAP) / step));
    const total = complete ? known.length : TOTAL_COLS;
    const mid = h / 2;
    // Top-only shape: every bar grows upward from the bottom edge instead of both ways.
    const barTop = (bh: number) => (topOnly ? h - bh : mid - bh / 2);
    let lineFrom = 0; // x where the not-yet-analysed thin line starts
    for (let i = 0; i < n; i++) {
      const a = Math.floor((i * total) / n);
      const b = Math.max(a + 1, Math.floor(((i + 1) * total) / n));
      if (b > known.length) break; // everything from here on is not analysed yet
      // Each bar shows the loudest of the columns it covers.
      let m = 0;
      for (let k = a; k < b; k++) if (known[k] > m) m = known[k];
      const bh = Math.max(MIN_BAR, m / 255) * h;
      const x = i * step;
      ctx.fillRect(x, barTop(bh), barW, bh);
      lineFrom = x + step;
    }
    if (lineFrom < w) ctx.fillRect(lineFrom, topOnly ? h - LINE_H : mid - LINE_H / 2, w - lineFrom, LINE_H);
  }

  function draw() {
    const host = slot;
    if (!host || !restCv || !playedCv || !hoverCv || !active) return;
    const rect = host.getBoundingClientRect();
    if (rect.width < 4 || rect.height < 4) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    paint(restCv, rect.width, rect.height, dpr, cssColor(host, "--melo-wave-rest", "rgba(128,128,128,.35)"));
    const playedColor = cssColor(host, "--melo-wave-played", "#2a7bd6");
    paint(playedCv, rect.width, rect.height, dpr, playedColor);
    // The hover layer is the played colour at reduced strength, so the not-yet-played part
    // under the pointer reads as "half-lit". Skipped (blank) when hover preview is off.
    if (hoverOn) paint(hoverCv, rect.width, rect.height, dpr, cssColor(host, "--melo-wave-hover", `color-mix(in srgb, ${playedColor} 32%, transparent)`));
    else hoverCv.width = 1;
    applyProgress(true);
  }

  function applyProgress(force = false) {
    if (!slot) return;
    const d = durationSec();
    const pct = d > 0 ? Math.max(0, Math.min(100, (positionSec / d) * 100)) : 0;
    // 0.1% steps are far below a pixel on any slot: skip identical writes.
    const q = Math.round(pct * 10) / 10;
    if (!force && q === lastPct) return;
    lastPct = q;
    slot.style.setProperty("--mw-p", q + "%");
  }

  // ---- loading ----
  function setActive(on: boolean) {
    active = on;
    setRootOn(on);
    if (slot) slot.dataset.ready = on ? (complete ? "1" : "loading") : "0";
  }

  // Reveal the slot and paint it in the SAME frame: the canvases are wiped first (they
  // still hold the previous track's drawing) and drawn synchronously, so the slot never
  // shows stale or stretched content.
  function showNow() {
    if (restCv) restCv.width = 1;
    if (playedCv) playedCv.width = 1;
    setActive(true);
    draw();
  }

  async function loadPeaks(t: Track | null) {
    const token = ++loadToken;
    known = [];
    complete = false;
    setActive(false);
    if (!enabled || !t?.path || !isTauri) return;
    if (!resolveSlot()) return; // the skin has no slot: nothing is decoded
    const cached = peakCache.get(t.path);
    if (cached) {
      peakCache.delete(t.path);
      peakCache.set(t.path, cached); // refresh LRU order
      known = cached;
      complete = true;
      showNow();
      return;
    }
    // The thin "analysing" line replaces the plain bar immediately.
    showNow();
    try {
      const { invoke, Channel } = await import("@tauri-apps/api/core");
      const chunks = new Channel<{ peaks: number[] }>();
      chunks.onmessage = (m) => {
        if (token !== loadToken || complete || !m?.peaks?.length || m.peaks.length < known.length) return;
        known = m.peaks;
        if (active) scheduleDraw();
      };
      const raw: number[] = await invoke("get_waveform_peaks", { trackPath: t.path, onChunk: chunks });
      if (token !== loadToken) return; // the track changed while decoding
      if (!Array.isArray(raw) || raw.length === 0) { known = []; setActive(false); return; }
      known = raw;
      complete = true;
      peakCache.set(t.path, raw);
      if (peakCache.size > PEAK_CACHE_MAX) peakCache.delete(peakCache.keys().next().value as string);
      if (!enabled) return;
      setActive(true);
      scheduleDraw();
    } catch {
      // unsupported codec / unreadable / superseded: the plain seek bar (comes back)
      if (token === loadToken) {
        known = [];
        setActive(false);
      }
    }
  }

  function setEnabled(on: boolean) {
    enabled = on;
    if (!on) {
      loadToken++;
      known = [];
      complete = false;
      setActive(false);
      teardownSlot();
    } else {
      void loadPeaks(track);
    }
  }

  // ---- hover preview ----
  function fmtTime(sec: number): string {
    const t = Math.max(0, Math.floor(sec));
    const h = Math.floor(t / 3600);
    const m = Math.floor((t % 3600) / 60);
    const ss = String(t % 60).padStart(2, "0");
    return h > 0 ? `${h}:${String(m).padStart(2, "0")}:${ss}` : `${m}:${ss}`;
  }

  function onHoverMove(ev: PointerEvent) {
    if (!hoverOn || ev.pointerType === "touch") return;
    hoverX = ev.clientX;
    if (hoverQueued) return;
    hoverQueued = true;
    requestAnimationFrame(() => {
      hoverQueued = false;
      showHover();
    });
  }

  function showHover() {
    if (!hoverOn || !slot || !active || !hoverTip || hoverX < 0) return;
    const r = slot.getBoundingClientRect();
    const d = durationSec();
    if (r.width <= 0 || d <= 0) return;
    const f = Math.max(0, Math.min(1, (hoverX - r.left) / r.width));
    slot.style.setProperty("--mw-h", f * 100 + "%");
    slot.classList.add("mw-hovering");
    hoverTip.textContent = fmtTime(f * d);
    // Centre the tip on the pointer but keep it fully inside the slot's horizontal span.
    const half = hoverTip.offsetWidth / 2;
    const x = Math.max(half, Math.min(r.width - half, f * r.width));
    hoverTip.style.left = x + "px";
  }

  function hideHover() {
    hoverX = -1;
    slot?.classList.remove("mw-hovering");
  }

  function applyHoverPref(on: boolean) {
    hoverOn = on;
    if (!on) hideHover();
    scheduleDraw();
  }

  // ---- seeking (reuses the seek input's own input/change handlers) ----
  function fractionAt(ev: PointerEvent): number {
    const r = slot!.getBoundingClientRect();
    return r.width > 0 ? Math.max(0, Math.min(1, (ev.clientX - r.left) / r.width)) : 0;
  }

  function onPointerDown(ev: PointerEvent) {
    if (!slot || !active || ev.button !== 0) return;
    const bar = seekInput();
    const d = durationSec();
    if (!bar || d <= 0) return;
    ev.preventDefault();
    dragging = true;
    try { slot.setPointerCapture(ev.pointerId); } catch {}
    const move = (e: PointerEvent) => {
      const sec = fractionAt(e) * d;
      positionSec = sec;
      bar.value = String(Math.floor(sec));
      bar.dispatchEvent(new Event("input", { bubbles: true }));
      applyProgress();
    };
    const up = (e: PointerEvent) => {
      slot?.removeEventListener("pointermove", move);
      slot?.removeEventListener("pointerup", up);
      slot?.removeEventListener("pointercancel", up);
      try { slot?.releasePointerCapture(e.pointerId); } catch {}
      dragging = false;
      bar.dispatchEvent(new Event("change", { bubbles: true }));
    };
    slot.addEventListener("pointermove", move);
    slot.addEventListener("pointerup", up);
    slot.addEventListener("pointercancel", up);
    move(ev);
  }

  // ---- wiring ----
  busOn("melo:track-changed", (t: any) => {
    track = t || null;
    positionSec = 0;
    void loadPeaks(track);
  });
  busOn("melo:playback-state", (s: any) => {
    const t: Track | null = s?.track || null;
    positionSec = Number(s?.currentTime) || 0;
    if ((t?.path || null) !== (track?.path || null)) {
      track = t;
      void loadPeaks(track);
    } else {
      applyProgress();
    }
  });
  busOn("melo:playback-position", (sec: any) => {
    if (!enabled || dragging) return;
    const v = Number(sec);
    if (!Number.isFinite(v)) return;
    positionSec = v;
    applyProgress();
  });
  busOn("melo:pref-changed", (p: any) => {
    if (p?.key === "waveformSeek") setEnabled(!!p.value);
    else if (p?.key === "waveformHover") applyHoverPref(!!p.value);
    else if (p?.key === "waveformBar") {
      barW = BAR_WIDTHS[String(p.value)] ?? 2;
      scheduleDraw();
    } else if (p?.key === "waveformShape") {
      topOnly = p.value === "top";
      scheduleDraw();
    }
  });
  // A skin swap replaces the markup (and maybe the slot): re-resolve and reload. The
  // `melo:skin-changed` event fires BEFORE the main window has finished loading and injecting
  // the new skin, so reacting to it alone found the old (or no) markup and left the new
  // slot empty until the setting was toggled. The real signal is the player card's
  // content being replaced, so watch that and rebuild when the slot element changed.
  let skinCheckQueued = false;
  function checkSlotChanged() {
    skinCheckQueued = false;
    if (!enabled) return;
    const el = findHook<HTMLElement>("skinWaveform", "waveform");
    if (el === slot && (!slot || slot.isConnected)) return;
    teardownSlot();
    void loadPeaks(track);
  }
  const queueSlotCheck = () => {
    if (skinCheckQueued) return;
    skinCheckQueued = true;
    requestAnimationFrame(checkSlotChanged);
  };
  busOn("melo:skin-changed", queueSlotCheck);
  const cardEl = document.getElementById("playerCard");
  if (cardEl) new MutationObserver(queueSlotCheck).observe(cardEl, { childList: true });
  // Theme switches change the resolved colours: repaint (no re-decode).
  new MutationObserver(() => scheduleDraw()).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme", "class", "style"],
  });

  if (enabled) busEmit("melo:request-playback-state");
}
