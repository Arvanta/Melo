import { getAudioGraph } from "./audio-graph";
import { busOn } from "./bus";

export type VizMode =
  | "Classic Bars" | "Thin Bars" | "Spectrum Line" | "Mirror Bars" | "Oscilloscope" | "Spectrum Wave" | "Block Equalizer" | "Radial Sunburst" | "Dot Matrix"
  | "Aurora" | "Aurora II" | "Bubbles" | "Fireflies" | "Glitch" | "Lantern" | "Wildflower Meadow"
  | "Petals" | "Quake" | "Ripples" | "Shards" | "Sparks" | "Tide" | "Tide II"
  | "Warp Drive" | "Triumph" | "Disco" | "Carnival"
  | "Velvet"
  | "Ashes" | "Waves" | "Charge"
  | "Puddle Ripples";

export const VIZ_MODES: { id: VizMode; label: string }[] = [
  { id: "Classic Bars", label: "Classic Bars" },
  { id: "Thin Bars", label: "Thin Bars" },
  { id: "Spectrum Line", label: "Spectrum Line" },
  { id: "Mirror Bars", label: "Mirror Bars" },
  { id: "Oscilloscope", label: "Oscilloscope" },
  { id: "Spectrum Wave", label: "Spectrum Wave" },
  { id: "Block Equalizer", label: "Block Equalizer" },
  { id: "Radial Sunburst", label: "Radial Sunburst" },
  { id: "Dot Matrix", label: "Dot Matrix" },
  { id: "Aurora", label: "Aurora" },
  { id: "Aurora II", label: "Aurora II" },
  { id: "Bubbles", label: "Bubbles" },
  { id: "Fireflies", label: "Fireflies" },
  { id: "Glitch", label: "Glitch" },
  { id: "Lantern", label: "Lantern" },
  { id: "Wildflower Meadow", label: "Wildflower Meadow" },
  { id: "Petals", label: "Petals" },
  { id: "Quake", label: "Quake" },
  { id: "Ripples", label: "Ripples" },
  { id: "Shards", label: "Shards" },
  { id: "Sparks", label: "Sparks" },
  { id: "Tide", label: "Tide" },
  { id: "Tide II", label: "Tide II" },


  { id: "Warp Drive", label: "Warp Drive" },

  { id: "Triumph", label: "Triumph" },


  { id: "Disco", label: "Disco" },
  { id: "Carnival", label: "Carnival" },
  { id: "Velvet", label: "Velvet" },
  { id: "Ashes", label: "Ashes" },
  { id: "Waves", label: "Waves" },
  { id: "Charge", label: "Charge" },
  { id: "Puddle Ripples", label: "Puddle Ripples" },


];

// ---------------------------------------------------------------------
// Settings (persisted in localStorage; the Settings → Visualizer tab
// writes these and broadcasts "melo:viz-pref-changed" so a live player
// picks them up instantly).
// ---------------------------------------------------------------------
export interface VizFx {
  peak: boolean;      // Peak hold — thin line above each column, falls slowly
  afterglow: boolean; // Trail — previous frame stays slightly faded
  bloom: boolean;     // Soft bloom — small shadowBlur on peaks/bars
  mirrorFade: boolean;// Mirror fade — very subtle reflection below the baseline
  pale: boolean;      // Tall bars get slightly different, paler colors at the top
  smoothing: number;  // 0..100 — attack/decay speed of the level follower
}

function fxFromStorage(): VizFx {
  const g = (k: string) => localStorage.getItem(k);
  return {
    peak: g("melo-viz-peak") === "1",
    afterglow: g("melo-viz-afterglow") === "1",
    bloom: g("melo-viz-bloom") === "1",
    mirrorFade: g("melo-viz-mirror") === "1",
    pale: g("melo-viz-pale") === "1",
    smoothing: Math.min(100, Math.max(0, parseInt(g("melo-viz-smoothing") || "50", 10) || 50)),
  };
}

export function getDisabledVizModes(): VizMode[] {
  try {
    const raw = JSON.parse(localStorage.getItem("melo-viz-disabled") || "[]");
    if (Array.isArray(raw)) {
      return raw.filter((x) => typeof x === "string" && VIZ_MODES.some((m) => m.id === x));
    }
  } catch { /* corrupted → treat as none */ }
  return [];
}

export function getEnabledVizModes(): VizMode[] {
  const disabled = new Set(getDisabledVizModes());
  const all = VIZ_MODES.map((m) => m.id);
  const enabled = all.filter((id) => !disabled.has(id));
  return enabled.length ? enabled : all; // never leave the player mode-less
}

function getContainer(): HTMLElement | null {
  return (
    (document.getElementById("vizBars") as HTMLElement | null) ||
    document.querySelector<HTMLElement>('[data-melo="visualizer"]') ||
    document.querySelector<HTMLElement>(".visualizer-bars")
  );
}

function hexToRgb(c: string): [number, number, number] {
  const s = c.trim().toLowerCase();
  if (s.startsWith("#")) {
    const h = s.slice(1);
    if (/^[0-9a-f]{3}$/.test(h)) {
      return [parseInt(h[0] + h[0], 16), parseInt(h[1] + h[1], 16), parseInt(h[2] + h[2], 16)];
    }
    if (/^[0-9a-f]{6}$/.test(h)) {
      const n = parseInt(h, 16);
      return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
    }
  } else {
    // cover.ts writes the album-art color as "rgb(r, g, b)" into
    // --visualizer / --accent; parse those too, otherwise mix() silently
    // falls back to the fixed sky-blue and modes based on it (Radial
    // Sunburst, Dot Matrix, peak caps, pale tops) never follow the cover.
    const m = /^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/.exec(s);
    if (m) return [Math.min(255, +m[1]), Math.min(255, +m[2]), Math.min(255, +m[3])];
  }
  return [56, 189, 248];
}
function mix(hexA: string, hexB: string, t: number): string {
  const a = hexToRgb(hexA), b = hexToRgb(hexB);
  const c = a.map((v, i) => Math.round(v + (b[i] - v) * t));
  return `rgb(${c[0]},${c[1]},${c[2]})`;
}

export function setupVisualizer(audio: HTMLAudioElement) {
  let container = getContainer();
  if (!container) return;
  let canvas = ensureCanvas(container);
  let g2d = canvas.getContext("2d")!;

  let audioCtx: AudioContext | null = null;
  let analyser: AnalyserNode | null = null;
  let freqData: Uint8Array | null = null;
  let timeData: Uint8Array | null = null;
  let fakeWaveData: Uint8Array | null = null;
  let useFake = false;

  let mode: VizMode = (localStorage.getItem("melo-viz-mode") as VizMode) || "Classic Bars";
  if (!getEnabledVizModes().includes(mode)) mode = getEnabledVizModes()[0];

  let fx: VizFx = fxFromStorage();

  let raf = 0;
  let levels: number[] = [];
  let peakHold: number[] = [];
  let slowMax = 0.45;
  let menuEl: HTMLElement | null = null;
  // Set true when a skin's toggle button is showing the embedded
  // playlist/lyrics view in the visualizer's slot instead of the
  // visualizer itself — the canvas is invisible in that state, so the
  // render loop (which otherwise runs every frame reading the analyser
  // and drawing) is stopped entirely rather than just CSS-hidden, to avoid
  // wasting CPU/battery on draws nobody can see.
  let externallyPaused = false;

  function ensureCanvas(host: HTMLElement) {
    let c = host.querySelector("canvas") as HTMLCanvasElement | null;
    if (!c) {
      host.innerHTML = "";
      c = document.createElement("canvas");
      host.appendChild(c);
    }
    return c;
  }

  function ensure() {
    if (analyser && freqData) return;
    try {
      const g = getAudioGraph(audio);
      audioCtx = g.ctx;
      analyser = g.analyser;
      freqData = new Uint8Array(analyser.frequencyBinCount);
      timeData = new Uint8Array(analyser.fftSize);
    } catch {
      useFake = true;
    }
  }

  function spectrumBands(n: number): number[] {
    const bins = freqData!.length;
    const ny = (audioCtx?.sampleRate || 44100) / 2;
    const fMin = 45, fMax = Math.min(15000, ny * 0.95);
    const lmin = Math.log(fMin), lmax = Math.log(fMax);
    const out: number[] = [];
    for (let i = 0; i < n; i++) {
      const f0 = Math.exp(lmin + ((lmax - lmin) * i) / n);
      const f1 = Math.exp(lmin + ((lmax - lmin) * (i + 1)) / n);
      let b0 = Math.floor((f0 / ny) * bins);
      let b1 = Math.max(b0 + 1, Math.ceil((f1 / ny) * bins));
      if (b0 < 0) b0 = 0;
      if (b1 > bins) b1 = bins;
      let s = 0;
      for (let b = b0; b < b1; b++) s += freqData![b];
      out.push(s / (b1 - b0) / 255);
    }
    return out;
  }

  function fakeLevels(n: number): number[] {
    const t = performance.now() / 1000;
    const beat = Math.pow(Math.abs(Math.sin(t * 2.2)), 2.5);
    const out: number[] = [];
    for (let i = 0; i < n; i++) {
      let v = 0.42 + 0.26 * Math.sin(t * 1.35 + i * 0.62) + 0.2 * Math.sin(t * 2.9 + i * 1.31) + Math.random() * 0.07;
      v *= 0.55 + 0.5 * beat;
      out.push(Math.max(0.04, Math.min(1, v)));
    }
    return out;
  }

  function fakeWave(out: Uint8Array) {
    const t = performance.now() / 1000;
    const env = 0.5 + 0.5 * Math.pow(Math.abs(Math.sin(t * 1.9)), 2);
    for (let i = 0; i < out.length; i++) {
      const p = i / out.length;
      out[i] = 128 + 66 * env * (Math.sin(p * Math.PI * 6 + t * 7) * 0.6 + Math.sin(p * Math.PI * 13 - t * 11) * 0.4);
    }
  }

  function getLevels(n: number): number[] {
    let raw: number[];
    if (useFake || !analyser || !freqData) {
      raw = fakeLevels(n);
    } else {
      analyser.getByteFrequencyData(freqData as any);
      raw = spectrumBands(n);
      const hasSignal = raw.some((v) => v > 0.01);
      if (!hasSignal && !audio.paused) {
        raw = fakeLevels(n);
      } else {
        for (let i = 0; i < n; i++) raw[i] *= 1 + 1.7 * (i / Math.max(1, n - 1));
      }
    }
    let curMax = 0;
    for (const v of raw) if (v > curMax) curMax = v;
    if (curMax > slowMax) slowMax = curMax;
    else slowMax = Math.max(0.35, slowMax * 0.985);
    if (levels.length !== n) levels = new Array(n).fill(0);
    if (peakHold.length !== n) peakHold = new Array(n).fill(0);
    // Smoothing slider: attack/decay of the level follower (0..100).
    const s = fx.smoothing / 100;
    const attack = 0.18 + 0.7 * s;
    const decay = 0.05 + 0.25 * s;
    for (let i = 0; i < n; i++) {
      const target = Math.min(1, raw[i] / slowMax);
      const a = target > levels[i] ? attack : decay;
      levels[i] += (target - levels[i]) * a;
      // Peak hold: follows instantly, falls slowly (classic EQ cap).
      peakHold[i] = Math.max(levels[i], peakHold[i] - (0.004 + 0.008 * s));
    }
    return levels;
  }

  function cssVar(name: string, fallback: string) {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;
  }

  // cover.ts sets BOTH --visualizer and --accent to the same cover color, so
  // many modes collapsed to one flat tone. accentOrDarker() returns --accent
  // when a skin defines a different one, otherwise a slightly DARKENED copy
  // of the cover color — giving every mode a real two-tone range.
  function accentOrDarker(c1: string): string {
    const a = cssVar("--accent", "#0284c7");
    if (a.replace(/\s/g, "") === c1.replace(/\s/g, "")) return mix(c1, "#000000", 0.32);
    return a;
  }
  function dprOf() {
    return canvas.width / Math.max(1, canvas.clientWidth) || 1;
  }
  function rr(x: number, y: number, w: number, h: number, r: number) {
    r = Math.min(r, w / 2, h / 2);
    if ((g2d as any).roundRect) {
      (g2d as any).roundRect(x, y, w, h, r);
      return;
    }
    g2d.rect(x, y, w, h);
  }
  function resize() {
    const dpr = window.devicePixelRatio || 1;
    const w = canvas.clientWidth || container?.clientWidth || 200;
    const h = canvas.clientHeight || container?.clientHeight || 56;
    if (w > 0 && h > 0) {
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
    }
  }
  new ResizeObserver(resize).observe(canvas);
  resize();

  function clearFrame() {
    if (!fx.afterglow) {
      g2d.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }
    // Trail effect: instead of a hard clear, fade what's already there out
    // with destination-out. Modes like Spectrogram/oscilloscope-style
    // traces and Lissajous get natural phosphor trails from this.
    g2d.globalCompositeOperation = "destination-out";
    g2d.fillStyle = "rgba(0,0,0,0.14)";
    g2d.fillRect(0, 0, canvas.width, canvas.height);
    g2d.globalCompositeOperation = "source-over";
  }


  const AMBIENT_BANDS = 24;
  const GOLDEN = 0.6180339887;
  interface AmbientSignals { low: number; mid: number; high: number; all: number; bands: number[]; dt: number; t: number }
  let ambLow = 0, ambMid = 0, ambHigh = 0, ambAll = 0;
  let ambFlow = 0, ambSpeed = 0, ambLast = 0;
  let ripplePhase = 0;
  let petals: { x: number; y: number; s: number; a: number; spin: number; ph: number; sway: number; b: number; c: number }[] = [];
  let fireflies: { x: number; y: number; vx: number; vy: number; ph: number; rate: number; b: number; glow: number; c: number }[] = [];
  let lanternPuffs: { x: number; y: number; r: number; life: number; max: number; drift: number }[] = [];
  let lanternBreath = 0;
  let bubbles: { x: number; y: number; r: number; s: number; ph: number; b: number; pop: number }[] = [];
  // Wildflower Meadow
  let meadowBlades: { x: number; h: number; lean: number; ph: number; b: number; depth: number; c: number }[] = [];
  let meadowFlowers: { x: number; stem: number; petals: number; ph: number; spin: number; b: number; c: number; size: number }[] = [];
  let meadowPollen: { x: number; y: number; r: number; ph: number; sp: number; b: number; c: number }[] = [];

  function ambientSignals(lively: boolean): AmbientSignals {
    const now = performance.now();
    const dt = ambLast ? Math.min(0.1, (now - ambLast) / 1000) : 1 / 60;
    ambLast = now;
    const d = getLevels(AMBIENT_BANDS);
    const silent = audio.paused && !useFake;
    let low = 0, mid = 0, high = 0;
    for (let i = 0; i < 6; i++) low += d[i];
    for (let i = 6; i < 16; i++) mid += d[i];
    for (let i = 16; i < AMBIENT_BANDS; i++) high += d[i];
    low /= 6; mid /= 10; high /= AMBIENT_BANDS - 16;
    let all = (low + mid + high) / 3;
    if (silent) low = mid = high = all = 0;
    // Asymmetric exponential smoothing (time constants in seconds).
    const up = lively ? 0.04 : 0.22;
    const down = lively ? 0.26 : 1.0;
    const follow = (cur: number, target: number, u: number, dn: number) =>
      cur + (target - cur) * (1 - Math.exp(-dt / (target > cur ? u : dn)));
    ambLow = follow(ambLow, low, up, down);
    ambMid = follow(ambMid, mid, up * 1.3, down * 1.2);
    ambHigh = follow(ambHigh, high, up, down * 0.8);
    ambAll = follow(ambAll, all, up * 1.6, down * 1.4);
    const wantSpeed = silent ? 0 : 1;
    ambSpeed += (wantSpeed - ambSpeed) * (1 - Math.exp(-dt / (lively ? 0.5 : 1.2)));
    ambFlow += dt * ambSpeed * (lively ? 0.9 + 1.6 * ambAll : 0.55 + 0.7 * ambAll);
    const bands = silent ? new Array(AMBIENT_BANDS).fill(0) : d.slice();
    return { low: ambLow, mid: ambMid, high: ambHigh, all: ambAll, bands, dt, t: ambFlow };
  }

  // Smoothly sample the band array at a fractional position 0..1 (bass → treble).
  function bandAt(bands: number[], u: number): number {
    const q = Math.min(1, Math.max(0, u)) * (bands.length - 1);
    const i = Math.floor(q), f = q - i;
    return bands[i] * (1 - f) + bands[Math.min(bands.length - 1, i + 1)] * f;
  }

  // Resolve any CSS colour (hex / rgb() / named / dynamic-theme value) once
  // per frame and return an alpha → "rgba(...)" painter for it.
  function painter(color: string): (alpha: number) => string {
    g2d.fillStyle = "#000";
    g2d.fillStyle = color;
    const c = g2d.fillStyle as string;
    let r = 0, g = 0, b = 0;
    if (c.startsWith("#")) {
      r = parseInt(c.slice(1, 3), 16); g = parseInt(c.slice(3, 5), 16); b = parseInt(c.slice(5, 7), 16);
    } else {
      const m = c.match(/rgba?\(([^)]+)\)/);
      if (m) [r, g, b] = m[1].split(",").map((x) => parseFloat(x));
    }
    return (alpha: number) => `rgba(${r}, ${g}, ${b}, ${Math.max(0, Math.min(1, alpha))})`;
  }

  // Which theme the skin is in. A scene that wants a dark room cannot just
  // paint black over a light skin — it reads as a hole punched in the page —
  // so it asks for a scrim and gets the value that suits the ground it sits
  // on. Light theme: a pale wash. Dark theme: the usual black.
  function isLightTheme(): boolean {
    try {
      return document.documentElement.getAttribute("data-theme") === "light";
    } catch { return false; }
  }
  function scrim(alpha: number): string {
    return isLightTheme() ? `rgba(255,255,255,${alpha})` : `rgba(0,0,0,${alpha})`;
  }
  // The hottest thing in a scene — the specular, the core, the flash. White
  // is the brightest thing on a dark ground, but it disappears on a pale
  // one, so there it becomes a deep, saturated accent instead.
  function hotInk(P: (a: number) => string): (a: number) => string {
    return isLightTheme()
      ? (a: number) => P(Math.max(0, Math.min(1, a * 1.7)))
      : (a: number) => `rgba(255,255,255,${Math.max(0, Math.min(1, a))})`;
  }

  // Concentric rings expanding outward from the centre like drops on
  // still water. The expansion speed and brightness follow the low end and
  // the number of visible rings grows with the music's intensity; each
  // ring also carries a faint, slowly rotating shimmer (bass → wide 2-lobe
  // swell, mids → 4 lobes) so the water "trembles" with the music without
  // ever losing its stillness.
  function drawRipples(w: number, h: number) {
    const dpr = dprOf();
    const S = ambientSignals(false);
    const P1 = painter(cssVar("--visualizer", "#38bdf8"));
    const P2 = painter(cssVar("--accent", "#0284c7"));
    const cx = w / 2, cy = h / 2;
    const maxR = Math.hypot(w, h) / 2;
    const squash = Math.max(0.35, h / w);
    // slow: a ring needs ~6-12 s to travel from the centre to the edge
    ripplePhase = (ripplePhase + S.dt * ambSpeed * (0.08 + 0.08 * S.low)) % 1;
    const maxRings = 9;
    const count = 2.5 + 6 * S.all;                          // fractional: the newest ring fades in/out
    const k2 = 0.035 * S.low;
    const k4 = 0.02 * S.mid;
    const rot = S.t * 0.12;
    const steps = 64;
    for (let k = 0; k < maxRings; k++) {
      const vis = Math.max(0, Math.min(1, count - k));
      if (vis <= 0) continue;
      const p = (ripplePhase + k * GOLDEN) % 1;               // golden-ratio offsets stay evenly spread for any count
      const r = (0.04 + 0.96 * p) * maxR;
      const alpha = Math.pow(1 - p, 1.6) * vis * (0.28 + 0.45 * S.all);
      if (alpha < 0.01) continue;
      const ph = k * 1.3;
      g2d.beginPath();
      for (let i = 0; i <= steps; i++) {
        const th = (i / steps) * Math.PI * 2;
        const bend = 1 + k2 * Math.cos(2 * th + rot + ph) + k4 * Math.cos(4 * th - rot * 1.4 + ph);
        const x = cx + Math.cos(th) * r * bend, y = cy + Math.sin(th) * r * bend * squash;
        if (i === 0) g2d.moveTo(x, y); else g2d.lineTo(x, y);
      }
      g2d.closePath();
      const P = k % 2 ? P1 : P2;
      // A water ring has a bright crest and a soft inner wash trailing it,
      // rather than being one uniform hairline.
      g2d.strokeStyle = P(alpha * 0.35);
      g2d.lineWidth = (3.5 + 5 * (1 - p)) * dpr;
      g2d.stroke();
      g2d.strokeStyle = P(Math.min(1, alpha * 1.6));
      g2d.lineWidth = (0.9 + 1.3 * (1 - p)) * dpr;
      g2d.stroke();
    }
    // still centre dot that glows with energy
    const gr = (12 + 30 * S.low) * dpr;
    const g = g2d.createRadialGradient(cx, cy, 0, cx, cy, gr);
    g.addColorStop(0, P1(0.55 + 0.4 * S.low));
    g.addColorStop(1, P1(0));
    g2d.fillStyle = g;
    g2d.beginPath(); g2d.arc(cx, cy, gr, 0, Math.PI * 2); g2d.fill();
  }

  // Layered translucent curtains drifting sideways. Calm: their height
  // follows the mids (voices / pads), not the kick. Lively: the curtains
  // additionally take the silhouette of the spectrum and drift faster.
  function drawAurora(w: number, h: number, lively: boolean) {
    const S = ambientSignals(lively);
    const P1 = painter(cssVar("--visualizer", "#38bdf8"));
    const P2 = painter(cssVar("--accent", "#0284c7"));
    const layers = 4, steps = 64;
    for (let L = 0; L < layers; L++) {
      const depth = L / (layers - 1);                  // 0 back → 1 front
      const energy = lively ? 0.35 + 1.2 * S.mid : 0.55 + 0.9 * S.mid;
      const amp = h * (0.16 + 0.22 * depth) * energy;
      const baseY = h * (0.62 + 0.12 * depth);
      const speed = lively ? 0.6 + 0.5 * depth : 0.25 + 0.2 * depth;
      const alpha = (0.10 + 0.16 * depth + 0.15 * S.all) * (lively ? 1.15 : 1);
      const spec = lively ? h * (0.10 + 0.18 * depth) : 0;
      g2d.beginPath();
      g2d.moveTo(0, h);
      for (let i = 0; i <= steps; i++) {
        const u = i / steps;
        let y = baseY
          - amp * (0.55 + 0.45 * Math.sin(u * Math.PI * 2.2 + S.t * speed + L * 1.7))
          - amp * 0.35 * Math.sin(u * Math.PI * 5.1 - S.t * speed * 1.6 + L * 0.9);
        if (spec) y -= spec * Math.pow(bandAt(S.bands, u + 0.06 * (L - 1.5)), 1.3);
        g2d.lineTo(u * w, y);
      }
      g2d.lineTo(w, h);
      g2d.closePath();
      const A = L % 2 ? P1 : P2, B = L % 2 ? P2 : P1;
      const grad = g2d.createLinearGradient(0, baseY - amp * 1.4 - spec, 0, h);
      grad.addColorStop(0, A(0));
      grad.addColorStop(0.4, A(alpha * 0.85));
      grad.addColorStop(1, B(0));
      g2d.fillStyle = grad;
      g2d.fill();
    }
  }

  // A calm sea under a soft moon. Calm: three slow swells rise with the
  // overall energy. Lively: each swell follows its own band (all / mid /
  // bass), moves faster and carries spectrum "foam" on its crest.
  // Each swell is filled with a vertical gradient (lit near the crest,
  // sinking into the dark toward the bottom) and finished with a specular
  // crest line, so the water has depth instead of reading as flat paper
  // cut-outs.
  function drawTide(w: number, h: number, lively: boolean) {
    const dpr = dprOf();
    const S = ambientSignals(lively);
    const P1 = painter(cssVar("--visualizer", "#38bdf8"));
    const P2 = painter(cssVar("--accent", "#0284c7"));
    const gx = w * 0.72, gy = h * 0.35;
    const gr = Math.min(w, h) * (0.35 + (lively ? 0.45 : 0.25) * S.low);
    const glow = g2d.createRadialGradient(gx, gy, 0, gx, gy, gr);
    glow.addColorStop(0, P1(0.22 + (lively ? 0.4 : 0.2) * S.low));
    glow.addColorStop(0.45, P1(0.07 + 0.1 * S.low));
    glow.addColorStop(1, P1(0));
    g2d.fillStyle = glow;
    g2d.fillRect(0, 0, w, h);

    const steps = 72;
    const waves = [
      { base: 0.58, amp: 0.10, k: 1.6, sp: 0.45, a: 0.30, P: P2, drive: S.all },
      { base: 0.68, amp: 0.13, k: 2.3, sp: -0.32, a: 0.42, P: P1, drive: lively ? S.mid : S.all },
      { base: 0.80, amp: 0.09, k: 3.1, sp: 0.26, a: 0.60, P: P2, drive: lively ? S.low : S.all },
    ];
    waves.forEach((wv, wi) => {
      const amp = h * wv.amp * (lively ? 0.35 + 1.7 * wv.drive : 0.5 + 1.0 * wv.drive);
      const sp = wv.sp * (lively ? 1.7 : 1);
      const foam = lively ? h * 0.045 * (1 + wi) : 0;
      const yAt = (u: number) => h * wv.base
        - amp * Math.sin(u * Math.PI * wv.k + S.t * sp)
        - amp * 0.3 * Math.sin(u * Math.PI * wv.k * 2.7 - S.t * sp * 1.9)
        - (foam ? foam * bandAt(S.bands, u) : 0);
      const crestTop = h * wv.base - amp * 1.4 - foam;
      g2d.beginPath();
      g2d.moveTo(0, h);
      for (let i = 0; i <= steps; i++) g2d.lineTo((i / steps) * w, yAt(i / steps));
      g2d.lineTo(w, h);
      g2d.closePath();
      const body = g2d.createLinearGradient(0, crestTop, 0, h);
      const a0 = wv.a * (0.7 + 0.3 * S.all);
      body.addColorStop(0, wv.P(Math.min(1, a0 * 1.25)));
      body.addColorStop(0.35, wv.P(a0 * 0.9));
      body.addColorStop(1, wv.P(a0 * 0.45));
      g2d.fillStyle = body;
      g2d.fill();
      // Specular crest: a light sweep along the wave top, brightest where
      // the moon glow sits.
      const sweep = g2d.createLinearGradient(0, 0, w, 0);
      sweep.addColorStop(0, P1(0.10 + 0.12 * S.all));
      sweep.addColorStop(0.72, P1(0.42 + 0.35 * S.all));
      sweep.addColorStop(1, P1(0.12 + 0.14 * S.all));
      g2d.strokeStyle = sweep;
      g2d.lineWidth = (0.9 + 0.5 * wi) * dpr;
      g2d.beginPath();
      for (let i = 0; i <= steps; i++) {
        const u = i / steps;
        if (i === 0) g2d.moveTo(0, yAt(u)); else g2d.lineTo(u * w, yAt(u));
      }
      g2d.stroke();
    });
  }

  // Soft petals sailing down on a warm breeze. Each petal leans into the
  // music through its own spectrum slice (a gentle swell, a slightly quicker
  // spin); the breeze itself follows the mids and lifts with the energy.
  function drawPetals(w: number, h: number) {
    const dpr = dprOf();
    const S = ambientSignals(false);
    const P1 = painter(cssVar("--visualizer", "#38bdf8"));
    const P2 = painter(cssVar("--accent", "#0284c7"));
    const count = Math.max(10, Math.min(26, Math.round((w / dpr) / 30)));
    if (petals.length !== count) {
      petals = Array.from({ length: count }, (_, i) => ({
        x: Math.random(), y: Math.random(),
        s: 0.55 + Math.random() * 0.8,
        a: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 1.6,
        ph: Math.random() * Math.PI * 2,
        sway: 0.6 + Math.random() * 0.8,
        b: (i * GOLDEN) % 1,
        c: i % 4 === 0 ? 1 : 0,
      }));
    }
    const breeze = 0.012 + 0.03 * S.mid;                      // sideways wind
    const fall = 0.035 + 0.05 * S.all;
    const size = Math.max(6, Math.min(17, h / 8.5)) * dpr;
    for (const q of petals) {
      const lv = bandAt(S.bands, q.b);
      q.y += S.dt * ambSpeed * fall * q.s;
      q.x += S.dt * ambSpeed * (breeze + Math.sin(S.t * q.sway + q.ph) * 0.02);
      q.a += S.dt * ambSpeed * q.spin * (1 + 1.2 * lv);
      if (q.y > 1.12) { q.y = -0.12; q.x = Math.random(); }
      if (q.x > 1.1) q.x = -0.1; else if (q.x < -0.1) q.x = 1.1;
      const px = q.x * w, py = q.y * h;
      const sz = size * q.s * (1 + 0.35 * lv);
      const tilt = 0.55 + 0.45 * Math.abs(Math.sin(q.a * 0.7 + q.ph));   // petal turning in the air
      const P = q.c ? P2 : P1;
      g2d.save();
      g2d.translate(px, py);
      g2d.rotate(q.a);
      g2d.scale(1, tilt);
      g2d.beginPath();
      g2d.moveTo(0, -sz);
      g2d.bezierCurveTo(sz * 0.9, -sz * 0.6, sz * 0.9, sz * 0.5, 0, sz);
      g2d.bezierCurveTo(-sz * 0.9, sz * 0.5, -sz * 0.9, -sz * 0.6, 0, -sz);
      g2d.closePath();
      // Shaded petal: lit along the leading edge, translucent at the far
      // side, with a centre crease — the old flat fill read as a blob.
      const pg = g2d.createLinearGradient(-sz * 0.9, -sz, sz * 0.9, sz);
      const a0 = 0.22 + 0.26 * q.s * (0.6 + 0.4 * S.all) + 0.18 * lv;
      pg.addColorStop(0, P(Math.min(1, a0 * 1.9)));
      pg.addColorStop(0.5, P(a0));
      pg.addColorStop(1, P(a0 * 0.45));
      g2d.fillStyle = pg;
      g2d.fill();
      g2d.strokeStyle = P(0.4 + 0.3 * lv);
      g2d.lineWidth = 1 * dpr;
      g2d.stroke();
      g2d.beginPath();
      g2d.moveTo(0, -sz * 0.86);
      g2d.quadraticCurveTo(sz * 0.10, 0, 0, sz * 0.86);
      g2d.strokeStyle = P(0.22 + 0.22 * lv);
      g2d.lineWidth = 0.7 * dpr;
      g2d.stroke();
      g2d.restore();
    }
  }

  // A summer meadow at dusk: tiny lights wandering lazily, each blinking to
  // its own rhythm that speeds up with its spectrum slice; a soft ground
  // haze breathes with the low end.
  function drawFireflies(w: number, h: number) {
    const dpr = dprOf();
    const S = ambientSignals(false);
    const P1 = painter(cssVar("--visualizer", "#38bdf8"));
    const P2 = painter(cssVar("--accent", "#0284c7"));
    const count = Math.max(16, Math.min(46, Math.round((w / dpr) / 16)));
    if (fireflies.length !== count) {
      fireflies = Array.from({ length: count }, (_, i) => ({
        x: Math.random(), y: 0.15 + Math.random() * 0.85,
        vx: 0, vy: 0,
        ph: Math.random() * Math.PI * 2,
        rate: 0.6 + Math.random() * 1.2,
        b: (i * GOLDEN) % 1,
        glow: 0.6 + Math.random() * 0.8,
        c: i % 3 === 0 ? 1 : 0,
      }));
    }
    // ground haze
    const hz = g2d.createLinearGradient(0, h * 0.55, 0, h);
    hz.addColorStop(0, P2(0));
    hz.addColorStop(1, P2(0.10 + 0.14 * S.low));
    g2d.fillStyle = hz;
    g2d.fillRect(0, 0, w, h);
    const wander = 0.06 + 0.10 * S.all;
    for (const q of fireflies) {
      const lv = bandAt(S.bands, q.b);
      // slow random-walk steering, biased to stay in frame
      q.vx += (Math.random() - 0.5) * 0.4 * S.dt + (0.5 - q.x) * 0.02 * S.dt;
      q.vy += (Math.random() - 0.5) * 0.4 * S.dt + (0.6 - q.y) * 0.02 * S.dt;
      const sp = Math.hypot(q.vx, q.vy) || 1;
      if (sp > wander) { q.vx *= wander / sp; q.vy *= wander / sp; }
      q.x += q.vx * S.dt * ambSpeed * 60 * 0.016;
      q.y += q.vy * S.dt * ambSpeed * 60 * 0.016;
      if (q.x < 0) { q.x = 0; q.vx = Math.abs(q.vx); } else if (q.x > 1) { q.x = 1; q.vx = -Math.abs(q.vx); }
      if (q.y < 0) { q.y = 0; q.vy = Math.abs(q.vy); } else if (q.y > 1) { q.y = 1; q.vy = -Math.abs(q.vy); }
      q.ph += S.dt * ambSpeed * q.rate * (0.8 + 1.6 * lv);
      const blink = Math.pow(0.5 + 0.5 * Math.sin(q.ph), 3);             // short bright flashes, long soft dims
      const a = 0.10 + 0.75 * blink * q.glow * (0.6 + 0.4 * S.all) + 0.15 * lv;
      const r = (2 + 4 * blink + 3 * lv) * dpr;
      const P = q.c ? P2 : P1;
      const px = q.x * w, py = q.y * h;
      const g = g2d.createRadialGradient(px, py, 0, px, py, r * 3);
      g.addColorStop(0, P(a));
      g.addColorStop(0.35, P(a * 0.35));
      g.addColorStop(1, P(0));
      g2d.fillStyle = g;
      g2d.beginPath(); g2d.arc(px, py, r * 3, 0, Math.PI * 2); g2d.fill();
      g2d.fillStyle = P(Math.min(1, a + 0.25));
      g2d.beginPath(); g2d.arc(px, py, Math.max(0.8 * dpr, r * 0.45), 0, Math.PI * 2); g2d.fill();
    }
  }

  // A single warm lantern glowing in the dark. The flame breathes with the
  // music (bass → bigger, mids → livelier flicker), warm light pools around
  // it, and little embers rise from it when the music swells.
  function drawLantern(w: number, h: number) {
    const dpr = dprOf();
    const S = ambientSignals(false);
    const P1 = painter(cssVar("--visualizer", "#38bdf8"));
    const P2 = painter(cssVar("--accent", "#0284c7"));
    const cx = w / 2, cy = h * 0.56;
    const base = Math.min(w * 0.5, h);
    lanternBreath += ((0.4 + 0.6 * S.low) - lanternBreath) * (1 - Math.exp(-S.dt / 0.35));
    const flicker = 1 + (0.03 + 0.08 * S.mid) * Math.sin(S.t * 7.3) * Math.sin(S.t * 3.1 + 1) + 0.03 * Math.sin(S.t * 11.7);
    // warm pool of light filling the frame
    const pool = base * (0.9 + 0.5 * lanternBreath) * flicker;
    const g0 = g2d.createRadialGradient(cx, cy, 0, cx, cy, pool);
    g0.addColorStop(0, P2(0.28 + 0.18 * lanternBreath));
    g0.addColorStop(0.5, P2(0.10 + 0.08 * lanternBreath));
    g0.addColorStop(1, P2(0));
    g2d.fillStyle = g0;
    g2d.fillRect(0, 0, w, h);
    // faint ground reflection
    const rg = g2d.createLinearGradient(0, h * 0.8, 0, h);
    rg.addColorStop(0, P1(0));
    rg.addColorStop(1, P1(0.08 + 0.1 * lanternBreath));
    g2d.fillStyle = rg;
    g2d.fillRect(0, h * 0.8, w, h * 0.2);
    // embers
    const want = S.all > 0.35 && Math.random() < 0.05 + 0.35 * S.all ? 1 : 0;
    if (want && lanternPuffs.length < 30) {
      lanternPuffs.push({ x: cx + (Math.random() - 0.5) * base * 0.2, y: cy - base * 0.05, r: (1 + Math.random() * 1.8) * dpr,
        life: 0, max: 2 + Math.random() * 2.5, drift: (Math.random() - 0.5) * 0.3 });
    }
    const alive: typeof lanternPuffs = [];
    for (const q of lanternPuffs) {
      q.life += S.dt * ambSpeed;
      if (q.life >= q.max) continue;
      alive.push(q);
      const f = q.life / q.max;
      q.y -= S.dt * ambSpeed * h * (0.12 + 0.1 * S.all);
      q.x += Math.sin(q.life * 2 + q.drift * 10) * 0.35 * dpr + q.drift * dpr;
      g2d.fillStyle = (Math.random() < 0.6 ? P1 : P2)(0.9 * (1 - f) * (0.6 + 0.4 * Math.sin(q.life * 6)));
      g2d.beginPath(); g2d.arc(q.x, q.y, q.r * (1 - 0.5 * f), 0, Math.PI * 2); g2d.fill();
    }
    lanternPuffs = alive;
    // the flame: outer halo, soft body, bright core
    const fh = base * (0.30 + 0.18 * lanternBreath) * flicker;
    const fw = fh * 0.55;
    const halo = g2d.createRadialGradient(cx, cy - fh * 0.2, 0, cx, cy - fh * 0.2, fh * 1.6);
    halo.addColorStop(0, P1(0.45 + 0.25 * lanternBreath));
    halo.addColorStop(0.4, P2(0.25));
    halo.addColorStop(1, P2(0));
    g2d.fillStyle = halo;
    g2d.beginPath(); g2d.arc(cx, cy - fh * 0.2, fh * 1.6, 0, Math.PI * 2); g2d.fill();
    const lean = (0.08 + 0.15 * S.mid) * Math.sin(S.t * 2.6) * fw;
    const flame = (scale: number, alpha: number, P: (a: number) => string, hot: number) => {
      const hh = fh * scale, ww = fw * scale;
      g2d.beginPath();
      g2d.moveTo(cx, cy + hh * 0.35);
      g2d.bezierCurveTo(cx + ww, cy + hh * 0.2, cx + ww * 0.7 + lean, cy - hh * 0.45, cx + lean * 1.3, cy - hh);
      g2d.bezierCurveTo(cx - ww * 0.7 + lean, cy - hh * 0.45, cx - ww, cy + hh * 0.2, cx, cy + hh * 0.35);
      g2d.closePath();
      // Gradient centred low and slightly forward: hot at the base, cooling
      // and thinning out toward the tip, so shells blend instead of banding.
      const gy = cy + hh * 0.12;
      const gr = g2d.createRadialGradient(cx + lean * 0.2, gy, 0, cx + lean * 0.2, gy, hh * 1.15);
      gr.addColorStop(0, P(Math.min(1, alpha * (0.9 + 0.5 * hot))));
      gr.addColorStop(0.45, P(alpha * 0.8));
      gr.addColorStop(1, P(alpha * 0.12));
      g2d.fillStyle = gr;
      g2d.fill();
    };
    // Three hard-edged stacked shapes made the flame look like a layered
    // logo. Each shell is now filled through its own radial gradient so the
    // body melts into the next one, and the core carries a white-hot tip.
    flame(1.08, 0.34, P2, 0.55);
    flame(0.80, 0.52, P2, 0.7);
    flame(0.58, 0.68, P1, 0.85);
    flame(0.34, 0.92, P1, 1);
    // white-hot heart, sitting low in the flame where combustion is hottest
    const heartR = fh * 0.18;
    const heart = g2d.createRadialGradient(cx + lean * 0.3, cy - fh * 0.05, 0, cx + lean * 0.3, cy - fh * 0.05, heartR);
    heart.addColorStop(0, "rgba(255,255,255," + (0.55 + 0.3 * lanternBreath).toFixed(3) + ")");
    heart.addColorStop(0.5, P1(0.5));
    heart.addColorStop(1, P1(0));
    g2d.fillStyle = heart;
    g2d.beginPath(); g2d.arc(cx + lean * 0.3, cy - fh * 0.05, heartR, 0, Math.PI * 2); g2d.fill();
  }

  // Soap bubbles rising slowly through the frame: thin iridescent rings
  // with a highlight, each wobbling and swelling with its own spectrum
  // slice; when its band peaks a bubble may pop into a fading ring.
  function drawBubbles(w: number, h: number) {
    const dpr = dprOf();
    const S = ambientSignals(false);
    const P1 = painter(cssVar("--visualizer", "#38bdf8"));
    const P2 = painter(cssVar("--accent", "#0284c7"));
    const count = Math.max(10, Math.min(24, Math.round((w / dpr) / 34)));
    if (bubbles.length !== count) {
      bubbles = Array.from({ length: count }, (_, i) => ({
        x: Math.random(), y: Math.random(),
        r: 0.35 + Math.random() * 0.65,
        s: 0.6 + Math.random() * 0.8,
        ph: Math.random() * Math.PI * 2,
        b: (i * GOLDEN) % 1,
        pop: 0,
      }));
    }
    const rise = 0.04 + 0.08 * S.all;
    const size = Math.max(6, Math.min(18, h / 7)) * dpr;
    g2d.lineCap = "round";
    for (const q of bubbles) {
      const lv = bandAt(S.bands, q.b);
      const rad = size * q.r * (1 + 0.25 * lv);
      const px = q.x * w, py = q.y * h;
      if (q.pop > 0) {
        q.pop += S.dt * 3.5;
        if (q.pop >= 1) { q.pop = 0; q.y = 1.15; q.x = Math.random(); continue; }
        g2d.beginPath(); g2d.arc(px, py, rad * (1 + 1.2 * q.pop), 0, Math.PI * 2);
        g2d.strokeStyle = P1(0.7 * (1 - q.pop)); g2d.lineWidth = 1 * dpr; g2d.stroke();
        continue;
      }
      q.y -= S.dt * ambSpeed * rise * q.s;
      q.x += Math.sin(S.t * 0.9 * q.s + q.ph) * S.dt * 0.03;
      if (q.y < -0.15) { q.y = 1.15; q.x = Math.random(); }
      if (q.x < -0.05) q.x = 1.05; else if (q.x > 1.05) q.x = -0.05;
      if (lv > 0.85 && q.y < 0.5 && Math.random() < 0.02) q.pop = 0.01;
      const wob = 1 + 0.08 * Math.sin(S.t * 3 * q.s + q.ph) * (0.5 + lv);
      g2d.save();
      g2d.translate(px, py);
      g2d.scale(wob, 1 / wob);
      const g = g2d.createRadialGradient(0, 0, rad * 0.45, 0, 0, rad);
      g.addColorStop(0, P1(0.02));
      g.addColorStop(0.82, P1(0.10 + 0.12 * lv));
      g.addColorStop(1, P1(0.20 + 0.22 * lv));
      g2d.fillStyle = g;
      g2d.beginPath(); g2d.arc(0, 0, rad, 0, Math.PI * 2); g2d.fill();
      // Iridescent rim: brightest where the light hits, dimming round the
      // far side, instead of a single flat-weight outline.
      const rim = g2d.createLinearGradient(-rad, -rad, rad, rad);
      rim.addColorStop(0, P1(0.75 + 0.25 * lv));
      rim.addColorStop(0.45, P2(0.32 + 0.3 * lv));
      rim.addColorStop(1, P1(0.5 + 0.3 * lv));
      g2d.strokeStyle = rim; g2d.lineWidth = 1.3 * dpr; g2d.stroke();
      // crescent sheen + a hard specular dot
      g2d.beginPath(); g2d.arc(0, 0, rad * 0.72, Math.PI * 1.12, Math.PI * 1.46);
      g2d.strokeStyle = P2(0.85); g2d.lineWidth = 1.6 * dpr; g2d.stroke();
      g2d.beginPath();
      g2d.arc(-rad * 0.34, -rad * 0.38, Math.max(0.7 * dpr, rad * 0.12), 0, Math.PI * 2);
      g2d.fillStyle = "rgba(255,255,255,0.55)";
      g2d.fill();
      g2d.restore();
    }
  }


  // Beat-driven renderers — Glitch / Quake / Shards / Sparks
  // They share punchSignals(): fast-attack band groups from getLevels(), a
  // short-release energy envelope and a simple bass-onset detector (`hit`
  // is true on the frame a beat lands, `beat` then decays 1 → 0 in about a
  // fifth of a second). Everything is painted with the theme's --accent /
  // --visualizer colours so dynamic album themes keep working.
  // ---------------------------------------------------------------------
  interface PunchSignals { d: number[]; low: number; mid: number; high: number; all: number; beat: number; hit: boolean; dt: number; t: number }
  let pLowAvg = 0, pBeat = 0, pLast = 0, pLastHit = 0, pFlow = 0, pEnergy = 0;
  let sparks: { x: number; y: number; vx: number; vy: number; life: number; max: number; size: number; c: number }[] = [];
  let cracks: { pts: number[]; life: number }[] = [];
  let glitchBuf: HTMLCanvasElement | null = null;
  let quakeShake = 0;

  function punchSignals(n: number): PunchSignals {
    const now = performance.now();
    const dt = pLast ? Math.min(0.1, (now - pLast) / 1000) : 1 / 60;
    pLast = now;
    const d = getLevels(n);
    const silent = audio.paused && !useFake;
    const q = Math.max(1, Math.floor(n / 4));
    let low = 0, mid = 0, high = 0;
    for (let i = 0; i < n; i++) {
      if (i < q) low += d[i]; else if (i >= n - q) high += d[i]; else mid += d[i];
    }
    low /= q; high /= q; mid /= Math.max(1, n - 2 * q);
    let all = (low + mid + high) / 3;
    if (silent) low = mid = high = all = 0;
    // bass-onset detector: the fast low band against its own ~0.7 s average
    const onset = low - pLowAvg;
    pLowAvg += (low - pLowAvg) * (1 - Math.exp(-dt / 0.7));
    let hit = false;
    if (!silent && onset > 0.08 && low > 0.25 && now - pLastHit > 170) { hit = true; pLastHit = now; pBeat = 1; }
    else pBeat *= Math.exp(-dt / 0.16);
    pEnergy += (all - pEnergy) * (1 - Math.exp(-dt / (all > pEnergy ? 0.05 : 0.3)));
    pFlow += dt * (0.6 + 1.4 * pEnergy);
    return { d, low, mid, high, all: pEnergy, beat: pBeat, hit, dt, t: pFlow };
  }

  // A smooth spectrum floor that throws glowing sparks into the
  // air; loud bands spit more of them and every beat fires a burst.
  function drawSparks(w: number, h: number) {
    const dpr = dprOf();
    const n = 32;
    const S = punchSignals(n);
    const P1 = painter(cssVar("--visualizer", "#38bdf8"));
    const P2 = painter(cssVar("--accent", "#0284c7"));
    const cap = Math.round(Math.max(90, Math.min(280, (w / dpr) * 0.4)));
    const floorH = h * 0.42;
    const slot = w / n;
    const top = (i: number) => h - Math.max(1.5 * dpr, S.d[Math.max(0, Math.min(n - 1, i))] * floorH);
    g2d.beginPath();
    g2d.moveTo(0, h); g2d.lineTo(0, top(0));
    for (let i = 0; i < n - 1; i++) {
      const x0 = (i + 0.5) * slot, x1 = (i + 1.5) * slot;
      g2d.quadraticCurveTo(x0, top(i), (x0 + x1) / 2, (top(i) + top(i + 1)) / 2);
    }
    g2d.lineTo(w, top(n - 1)); g2d.lineTo(w, h); g2d.closePath();
    const fg = g2d.createLinearGradient(0, h - floorH, 0, h);
    fg.addColorStop(0, P2(0.6)); fg.addColorStop(1, P2(0.12));
    g2d.fillStyle = fg; g2d.fill();
    g2d.lineJoin = "round";
    g2d.strokeStyle = P1(0.6 + 0.4 * S.beat); g2d.lineWidth = 1.5 * dpr; g2d.stroke();
    const want = Math.round(1 + 10 * S.all + (S.hit ? 26 : 0));
    for (let k = 0; k < want && sparks.length < cap; k++) {
      let j = Math.floor(Math.random() * n);
      if (Math.random() > S.d[j] && !S.hit) continue;            // loud bands spit more sparks
      const lv = S.d[j];
      const sp = (0.9 + 1.8 * Math.random()) * h * (0.4 + 0.6 * lv) * (S.hit ? 1.3 : 1);
      sparks.push({
        x: (j + Math.random()) * slot, y: top(j),
        vx: (Math.random() - 0.5) * 0.6 * h, vy: -sp,
        life: 0, max: 0.45 + 0.75 * Math.random(),
        size: (1 + 2 * Math.random() + 1.5 * S.beat) * dpr,
        c: Math.random() < 0.35 ? 1 : 0,
      });
    }
    const grav = 2.4 * h;
    const alive: typeof sparks = [];
    for (const q of sparks) {
      q.life += S.dt;
      if (q.life >= q.max) continue;
      q.vy += grav * S.dt; q.x += q.vx * S.dt; q.y += q.vy * S.dt;
      if (q.y > h + 4 * dpr) continue;
      alive.push(q);
      const f = 1 - q.life / q.max;
      g2d.fillStyle = (q.c ? P2 : P1)(0.25 + 0.75 * f);
      g2d.beginPath(); g2d.arc(q.x, q.y, q.size * (0.5 + 0.5 * f), 0, Math.PI * 2); g2d.fill();
    }
    sparks = alive;
  }

  // Hard-edged bars with colour-split ghosts, dropouts, scanlines
  // and horizontal tears that shove slices of the image sideways on beats.
  function drawGlitch(w: number, h: number) {
    const dpr = dprOf();
    const n = 48;
    const S = punchSignals(n);
    const P1 = painter(cssVar("--visualizer", "#38bdf8"));
    const P2 = painter(cssVar("--accent", "#0284c7"));
    if (!glitchBuf) glitchBuf = document.createElement("canvas");
    if (glitchBuf.width !== w || glitchBuf.height !== h) { glitchBuf.width = w; glitchBuf.height = h; }
    const b = glitchBuf.getContext("2d")!;
    b.clearRect(0, 0, w, h);
    const slot = w / n, bw = Math.max(1, slot * 0.7);
    const split = (1 + 3 * S.high + 5 * S.beat) * dpr;
    for (let i = 0; i < n; i++) {
      if (Math.random() < 0.015 + 0.06 * S.high) continue;        // dropouts
      const v = S.d[i];
      const bh = Math.max(1.5 * dpr, v * (h - 2 * dpr) * (1 + 0.1 * S.beat));
      const x = i * slot + (slot - bw) / 2, y = h - bh;
      // Chromatic-aberration ghosts, then a shaded core column and a hot
      // scan cap. The core used to be one flat fill, which read as a plain
      // bar chart with an offset shadow.
      b.fillStyle = P1(0.45); b.fillRect(x - split, y, bw, bh);
      b.fillStyle = P2(0.45); b.fillRect(x + split, y, bw, bh);
      const cg = b.createLinearGradient(0, y, 0, h);
      cg.addColorStop(0, P1(0.98));
      cg.addColorStop(0.35, P2(0.95));
      cg.addColorStop(1, P2(0.55));
      b.fillStyle = cg; b.fillRect(x, y, bw, bh);
      b.fillStyle = "rgba(255,255,255,0.75)"; b.fillRect(x, y, bw, Math.max(1, 2 * dpr));
    }
    b.fillStyle = P2(0.10);
    for (let y = 0; y < h; y += 4 * dpr) b.fillRect(0, y, w, 1 * dpr);
    if (S.beat > 0.3) {
      for (let k = 0; k < 2; k++) {
        b.fillStyle = P1(0.5 * S.beat);
        b.fillRect(0, Math.random() * h, w, (1 + Math.random() * 4) * dpr);
      }
    }
    const slices = 8, sh = h / slices;
    const tearChance = 0.08 + 0.55 * S.beat + 0.15 * S.high;
    for (let k = 0; k < slices; k++) {
      const y = k * sh;
      const off = Math.random() < tearChance ? (Math.random() - 0.5) * 2 * (3 + 30 * S.beat + 8 * S.high) * dpr : 0;
      g2d.drawImage(glitchBuf, 0, y, w, sh, off, y, w, sh);
    }
  }

  // A jagged seismograph trace of the waveform; beats shake the
  // whole picture, flash it and split cracks off the trace.
  function drawQuake(w: number, h: number) {
    const dpr = dprOf();
    const S = punchSignals(24);
    const P1 = painter(cssVar("--visualizer", "#38bdf8"));
    const P2 = painter(cssVar("--accent", "#0284c7"));
    let td: Uint8Array;
    if (useFake || !analyser || !timeData) {
      if (!fakeWaveData) fakeWaveData = new Uint8Array(1024);
      fakeWave(fakeWaveData);
      td = fakeWaveData;
    } else {
      analyser.getByteTimeDomainData(timeData as any);
      td = timeData;
      // Same guard as the oscilloscope: dead-silent time-domain data while a
      // track is playing would otherwise flatten the seismograph into a
      // single horizontal line.
      let moved = false;
      for (let i = 0; i < td.length; i += 17) {
        if (Math.abs(td[i] - 128) > 2) { moved = true; break; }
      }
      if (!moved && !audio.paused) {
        if (!fakeWaveData) fakeWaveData = new Uint8Array(1024);
        fakeWave(fakeWaveData);
        td = fakeWaveData;
      }
    }
    quakeShake = S.hit ? 1 : quakeShake * Math.exp(-S.dt / 0.12);
    const shake = quakeShake * 7 * dpr;
    const cy = h / 2;
    g2d.save();
    g2d.translate((Math.random() - 0.5) * 2 * shake, (Math.random() - 0.5) * 2 * shake);
    if (S.beat > 0.05) { g2d.fillStyle = P2(0.10 * S.beat); g2d.fillRect(-shake, -shake, w + 2 * shake, h + 2 * shake); }
    const amp = h * 0.45 * (1 + 0.15 * S.beat);
    const jitter = (0.5 + 6 * S.high) * dpr;
    const step = Math.max(2 * dpr, w / 220);
    const trace = () => {
      g2d.beginPath();
      for (let x = -shake; x <= w + shake; x += step) {
        const idx = Math.min(td.length - 1, Math.max(0, Math.floor((x / w) * td.length)));
        const y = cy + ((td[idx] - 128) / 128) * amp + (Math.random() - 0.5) * jitter;
        if (x === -shake) g2d.moveTo(x, y); else g2d.lineTo(x, y);
      }
    };
    g2d.lineJoin = "miter"; g2d.lineCap = "butt";
    if (quakeShake > 0.05) {                                 // motion-blur ghost while the picture shakes
      g2d.save(); g2d.translate(-shake * 1.5, shake * 0.8);
      trace(); g2d.strokeStyle = P1(0.35 * quakeShake); g2d.lineWidth = 2 * dpr; g2d.stroke();
      g2d.restore();
    }
    trace(); g2d.strokeStyle = P1(0.22); g2d.lineWidth = 7 * dpr; g2d.stroke();
    trace(); g2d.strokeStyle = P2(0.95); g2d.lineWidth = 2 * dpr; g2d.stroke();
    if (S.hit) {
      const count = 3 + Math.floor(Math.random() * 3);
      for (let k = 0; k < count && cracks.length < 16; k++) {
        const pts: number[] = [];
        let x = Math.random() * w, y = cy + (Math.random() - 0.5) * amp * 0.6;
        const dir = Math.random() < 0.5 ? -1 : 1;
        pts.push(x, y);
        const segs = 4 + Math.floor(Math.random() * 4);
        for (let m = 0; m < segs; m++) {
          x += (Math.random() - 0.5) * w * 0.07;
          y += dir * (h * 0.06 + Math.random() * h * 0.12);
          pts.push(x, y);
          if (m === 1 && Math.random() < 0.6) {              // side fork
            let fx = x, fy = y;
            const fp: number[] = [fx, fy];
            for (let f = 0; f < 3; f++) {
              fx += (Math.random() < 0.5 ? -1 : 1) * (w * 0.02 + Math.random() * w * 0.04);
              fy += dir * (h * 0.04 + Math.random() * h * 0.08);
              fp.push(fx, fy);
            }
            cracks.push({ pts: fp, life: 0.08 });
          }
        }
        cracks.push({ pts, life: 0 });
      }
    }
    const aliveCracks: typeof cracks = [];
    const crackLife = 0.4;
    for (const c of cracks) {
      c.life += S.dt;
      if (c.life > crackLife) continue;
      aliveCracks.push(c);
      const a = 1 - c.life / crackLife;
      g2d.beginPath();
      for (let i = 0; i < c.pts.length; i += 2) {
        if (i === 0) g2d.moveTo(c.pts[0], c.pts[1]); else g2d.lineTo(c.pts[i], c.pts[i + 1]);
      }
      g2d.strokeStyle = P1(0.35 * a); g2d.lineWidth = 5 * dpr; g2d.stroke();
      g2d.strokeStyle = P1(0.95 * a); g2d.lineWidth = 1.6 * dpr; g2d.stroke();
    }
    cracks = aliveCracks;
    g2d.restore();
  }

  // Two interlocking jaws of razor-sharp spikes (spectrum from the
  // bottom edge, mirrored spectrum from the top) with instant attack,
  // nervous tip jitter and a snap flash between the jaws on each beat.
  function drawShards(w: number, h: number) {
    const dpr = dprOf();
    const custom = parseInt(container?.dataset.bars || "", 10);
    const n = Number.isFinite(custom) && custom > 0 ? custom : 36;
    const S = punchSignals(n);
    const P1 = painter(cssVar("--visualizer", "#38bdf8"));
    const P2 = painter(cssVar("--accent", "#0284c7"));
    const slot = w / n;
    const H = h * 0.5 * (1 + 0.12 * S.beat);
    const jit = (0.5 + 5 * S.high) * dpr;
    const kick = S.beat > 0.5 ? (Math.random() - 0.5) * 6 * dpr : 0;
    g2d.lineJoin = "miter"; g2d.miterLimit = 20;
    const jaw = (fromTop: boolean) => {
      const edge = fromTop ? 0 : h;
      const sign = fromTop ? 1 : -1;
      const shift = fromTop ? 0 : kick;
      g2d.beginPath();
      g2d.moveTo(0, edge);
      for (let i = 0; i < n; i++) {
        const j = fromTop ? n - 1 - i : i;                  // bass on opposite sides so the jaws interlock
        const tipX = (i + 0.5) * slot + shift; // valleys land exactly on 0 and w: every tooth the same shape
        // motion floor + a shared beat pulse: quiet (treble) bands at the
        // jaw ends used to sit almost still; now every tooth dances with
        // the rhythm while loud bands still reach further
        const v = 0.22 * (0.4 + 0.6 * S.beat) + 0.78 * S.d[j];
        const tipY = edge + sign * Math.max(2 * dpr, v * H + (Math.random() - 0.5) * jit);
        g2d.lineTo(tipX, tipY);
        g2d.lineTo(Math.min(w, tipX + slot / 2), edge);
      }
      g2d.lineTo(w, edge);
      g2d.closePath();
      const g = g2d.createLinearGradient(0, edge, 0, edge + sign * H);
      g.addColorStop(0, P2(0.95)); g.addColorStop(0.55, P2(0.8)); g.addColorStop(1, P1(0.5));
      g2d.fillStyle = g; g2d.fill();
      g2d.strokeStyle = P1(0.85); g2d.lineWidth = 1 * dpr; g2d.stroke();

      // Crystal facets: one lit flank per tooth. Without this the jaws are
      // a perfectly uniform sawtooth — geometric, but not a shard.
      for (let i = 0; i < n; i++) {
        const j = fromTop ? n - 1 - i : i;
        const tipX = (i + 0.5) * slot + shift;
        const len = Math.max(2 * dpr, (0.22 * (0.4 + 0.6 * S.beat) + 0.78 * S.d[j]) * H);
        const tipY = edge + sign * len;
        const rootL = tipX - slot / 2, rootR = tipX + slot / 2;
        // lit flank (left side of every tooth)
        g2d.beginPath();
        g2d.moveTo(rootL, edge);
        g2d.lineTo(tipX, tipY);
        g2d.lineTo(tipX - slot * 0.14, edge);
        g2d.closePath();
        g2d.fillStyle = P1(0.20 + 0.22 * S.d[j]);
        g2d.fill();
        // shaded flank (right side), only on the taller teeth
        if (S.d[j] > 0.35) {
          g2d.beginPath();
          g2d.moveTo(rootR, edge);
          g2d.lineTo(tipX, tipY);
          g2d.lineTo(tipX + slot * 0.16, edge);
          g2d.closePath();
          g2d.fillStyle = "rgba(0,0,0,0.22)";
          g2d.fill();
        }
        // tip spark on the tallest teeth
        if (S.d[j] > 0.72) {
          g2d.fillStyle = "rgba(255,255,255," + (0.25 + 0.5 * S.beat).toFixed(3) + ")";
          g2d.beginPath();
          g2d.arc(tipX, tipY, Math.max(0.8 * dpr, slot * 0.07), 0, Math.PI * 2);
          g2d.fill();
        }
      }
    };
    jaw(false);
    jaw(true);
    if (S.beat > 0.02) {
      g2d.fillStyle = P1(0.75 * S.beat);
      g2d.fillRect(0, h / 2 - 1 * dpr, w, 2 * dpr);
    }
  }


  // ---------------------------------------------------------------------
  // Shared column helpers for the spectrum family.
  // ---------------------------------------------------------------------
  // Column paint for the bar family.
  //
  // Default is deliberately FLAT: a single solid cover colour, which is the
  // look Melo has always had. The two-tone crown → dark-accent gradient is
  // what the Settings → Visualizer "Pale tops" switch turns on, so the two
  // are not two different features doing almost the same thing.
  function columnGrad(yTop: number, yBase: number, c1: string, c2: string) {
    if (!fx.pale) return c1;
    const g = g2d.createLinearGradient(0, yTop, 0, yBase);
    g.addColorStop(0, mix(c1, "#ffffff", 0.55));
    g.addColorStop(0.42, c1);
    g.addColorStop(1, mix(c2, "#000000", 0.18));
    return g;
  }
  // Rounded crown, square foot — a bar should sit flush on its baseline
  // rather than turn into a pill when it is short.
  function barPath(x: number, y: number, bw: number, bh: number, r: number) {
    r = Math.max(0, Math.min(r, bw / 2, bh));
    g2d.beginPath();
    g2d.moveTo(x, y + bh);
    g2d.lineTo(x, y + r);
    g2d.quadraticCurveTo(x, y, x + r, y);
    g2d.lineTo(x + bw - r, y);
    g2d.quadraticCurveTo(x + bw, y, x + bw, y + r);
    g2d.lineTo(x + bw, y + bh);
    g2d.closePath();
  }

  function drawPeaks(data: number[], h: number, bw: number, slot: number) {
    if (!fx.peak) return;
    const dpr = dprOf();
    const c1 = cssVar("--visualizer", "#38bdf8");
    const c2 = accentOrDarker(c1);
    // Cover-derived sweep: darker accent on the bass side, lighter toward the
    // treble side — peak caps are no longer one flat color.
    const pg = g2d.createLinearGradient(0, 0, data.length * slot, 0);
    pg.addColorStop(0, mix(c2, "#ffffff", 0.3));
    pg.addColorStop(1, mix(c1, "#ffffff", 0.62));
    g2d.fillStyle = pg;
    g2d.beginPath();
    for (let i = 0; i < data.length; i++) {
      const x = i * slot + (slot - bw) / 2;
      const y = h - 1.5 * dpr - peakHold[i] * (h - 6 * dpr);
      g2d.rect(x, y, bw, Math.max(1.2 * dpr, 1.5 * dpr));
    }
    g2d.fill();
  }

  function drawBars(data: number[], w: number, h: number, gapFrac: number) {
    const dpr = dprOf();
    const c1 = cssVar("--visualizer", "#38bdf8");
    const c2 = accentOrDarker(c1);
    const n = data.length, slot = w / n;
    const bw = Math.max(1.2 * dpr, slot * (1 - gapFrac));
    // Mirror fade reserves a thin zone at the bottom for the reflection.
    const mirH = fx.mirrorFade ? Math.max(6 * dpr, Math.min(h * 0.22, 12 * dpr)) : 0;
    const base = h - mirH - 1 * dpr;
    const radius = Math.min(bw / 2, 3.5 * dpr);
    const grad: string | CanvasGradient = columnGrad(2 * dpr, base, c1, c2);

    if (fx.bloom) { g2d.shadowColor = c1; g2d.shadowBlur = 7 * dpr; }
    for (let i = 0; i < n; i++) {
      const v = data[i];
      const bh = Math.max(2 * dpr, v * (base - 2 * dpr));
      const x = i * slot + (slot - bw) / 2, y = base - bh;
      g2d.fillStyle = grad;
      // Pale tops: bars that reach high fade slightly + shift color.
      if (fx.pale && v > 0.72) g2d.globalAlpha = 1 - (v - 0.72) * 0.8;
      barPath(x, y, bw, bh, radius);
      g2d.fill();
      g2d.globalAlpha = 1;

      // Bright crown cap — part of the "Pale tops" look, not the default.
      if (fx.pale && bh > 3 * dpr) {
        const capH = Math.min(bh * 0.45, Math.max(1.4 * dpr, 2.6 * dpr));
        g2d.fillStyle = mix(c1, "#ffffff", 0.72);
        g2d.globalAlpha = 0.30 + 0.45 * v;
        barPath(x, y, bw, capH, Math.min(radius, capH));
        g2d.fill();
        g2d.globalAlpha = 1;
      }
    }
    g2d.shadowBlur = 0;

    if (mirH > 0) {
      // Reflection: drawn once through a fading gradient instead of a flat
      // 14% alpha, so it actually falls off like a reflection.
      const refl = g2d.createLinearGradient(0, base, 0, base + mirH);
      refl.addColorStop(0, mix(c1, "#000000", 0.1));
      refl.addColorStop(1, "rgba(0,0,0,0)");
      g2d.save();
      g2d.beginPath();
      g2d.rect(0, base + 1 * dpr, w, mirH);
      g2d.clip();
      g2d.fillStyle = refl;
      g2d.globalAlpha = 0.26;
      for (let i = 0; i < n; i++) {
        const bh = Math.max(2 * dpr, data[i] * (base - 2 * dpr));
        const x = i * slot + (slot - bw) / 2;
        g2d.fillRect(x, base + 1 * dpr, bw, Math.max(1.5 * dpr, bh * 0.3));
      }
      g2d.globalAlpha = 1;
      g2d.restore();
    }
    drawPeaks(data, base, bw, slot);
  }

  function drawMirror(data: number[], w: number, h: number) {
    const dpr = dprOf();
    const c1 = cssVar("--visualizer", "#38bdf8");
    const c2 = accentOrDarker(c1);
    const n = data.length, slot = w / n, mid = h / 2;
    const bw = Math.max(1.5 * dpr, slot * 0.62);
    const half = h / 2 - 3 * dpr;
    // Flat by default; "Pale tops" turns it into bright-at-the-centre-line
    // falling to the darker accent at both tips. No centre rail — the bars
    // themselves already mark the axis.
    let grad: string | CanvasGradient = c1;
    if (fx.pale) {
      const g = g2d.createLinearGradient(0, mid - half, 0, mid + half);
      g.addColorStop(0, mix(c2, "#000000", 0.14));
      g.addColorStop(0.35, c1);
      g.addColorStop(0.5, mix(c1, "#ffffff", 0.6));
      g.addColorStop(0.65, c1);
      g.addColorStop(1, mix(c2, "#000000", 0.14));
      grad = g;
    }

    if (fx.bloom) { g2d.shadowColor = c1; g2d.shadowBlur = 6 * dpr; }
    for (let i = 0; i < n; i++) {
      const v = data[i];
      const bh = Math.max(1.5 * dpr, v * half);
      const x = i * slot + (slot - bw) / 2;
      g2d.fillStyle = grad;
      if (fx.pale && v > 0.72) g2d.globalAlpha = 1 - (v - 0.72) * 0.8;
      g2d.beginPath();
      rr(x, mid - bh, bw, bh * 2, Math.min(bw / 2, 3 * dpr));
      g2d.fill();
      g2d.globalAlpha = 1;
    }
    g2d.shadowBlur = 0;
    drawPeaks(data, mid, bw, slot);
  }

  function drawLine(data: number[], w: number, h: number) {
    const dpr = dprOf();
    const c1 = cssVar("--visualizer", "#38bdf8");
    const c2 = accentOrDarker(c1);
    const n = data.length;
    const px: number[] = [], py: number[] = [];
    for (let i = 0; i < n; i++) {
      px.push(((i + 0.5) / n) * w);
      py.push(h - 2 * dpr - data[i] * (h - 8 * dpr));
    }
    const spine = () => {
      g2d.beginPath();
      g2d.moveTo(px[0], py[0]);
      for (let i = 1; i < n; i++) {
        const cx = (px[i - 1] + px[i]) / 2;
        g2d.quadraticCurveTo(px[i - 1], py[i - 1], cx, (py[i - 1] + py[i]) / 2);
      }
      g2d.lineTo(px[n - 1], py[n - 1]);
    };

    // Filled body under the curve.
    g2d.beginPath();
    g2d.moveTo(px[0], h);
    g2d.lineTo(px[0], py[0]);
    for (let i = 1; i < n; i++) {
      const cx = (px[i - 1] + px[i]) / 2;
      g2d.quadraticCurveTo(px[i - 1], py[i - 1], cx, (py[i - 1] + py[i]) / 2);
    }
    g2d.lineTo(px[n - 1], py[n - 1]);
    g2d.lineTo(px[n - 1], h);
    g2d.closePath();
    const fill = g2d.createLinearGradient(0, 0, 0, h);
    fill.addColorStop(0, mix(c1, "#ffffff", fx.pale ? 0.45 : 0.15));
    fill.addColorStop(0.55, c1);
    fill.addColorStop(1, mix(c2, "#000000", 0.35));
    g2d.globalAlpha = 0.34;
    g2d.fillStyle = fill;
    g2d.fill();
    g2d.globalAlpha = 1;

    g2d.lineJoin = "round";
    g2d.lineCap = "round";
    // Soft halo underneath, then the crisp trace on top.
    if (fx.bloom) { g2d.shadowColor = c1; g2d.shadowBlur = 9 * dpr; }
    spine();
    g2d.strokeStyle = c1;
    g2d.globalAlpha = 0.22;
    g2d.lineWidth = 6 * dpr;
    g2d.stroke();
    g2d.shadowBlur = 0;
    g2d.globalAlpha = 1;
    // One even trace. A horizontal bass→treble sweep was tried here and
    // rejected: whitening the treble end read as a smear of haze over the
    // right-hand side of the canvas rather than as shading.
    spine();
    g2d.strokeStyle = c2;
    g2d.lineWidth = 2.2 * dpr;
    g2d.stroke();
    g2d.lineCap = "butt";
  }

  // Mirrored, connected spectrum around a horizontal centre line.
  // It follows the form of an audio waveform while still reacting to FFT
  // energy, and uses the same accent variables as every other mode.
  function drawSpectrumWave(data: number[], w: number, h: number) {
    const dpr = dprOf();
    const c1 = cssVar("--visualizer", "#38bdf8");
    const c2 = accentOrDarker(c1);
    const mid = h / 2;
    const n = data.length;
    const amp = data.map((v, i) => {
      // Soften both ends to produce the tapered waveform silhouette.
      const x = i / Math.max(1, n - 1);
      const taper = Math.pow(Math.sin(Math.PI * x), 0.28);
      return Math.max(0.7 * dpr, v * taper * (h * 0.46));
    });

    const trace = (upper: boolean) => {
      g2d.beginPath();
      for (let i = 0; i < n; i++) {
        const x = (i / Math.max(1, n - 1)) * w;
        const y = mid + (upper ? -amp[i] : amp[i]);
        if (i === 0) g2d.moveTo(x, y);
        else {
          const px = ((i - 1) / Math.max(1, n - 1)) * w;
          const py = mid + (upper ? -amp[i - 1] : amp[i - 1]);
          g2d.quadraticCurveTo(px, py, (px + x) / 2, (py + y) / 2);
        }
      }
    };

    // Soft glow behind the waveform.
    trace(true);
    for (let i = n - 1; i >= 0; i--) {
      const x = (i / Math.max(1, n - 1)) * w;
      g2d.lineTo(x, mid + amp[i]);
    }
    g2d.closePath();
    const fill = g2d.createLinearGradient(0, 0, 0, h);
    fill.addColorStop(0, fx.pale ? mix(c1, "#ffffff", 0.4) : c1);
    fill.addColorStop(0.5, c1);
    fill.addColorStop(1, fx.pale ? mix(c1, "#ffffff", 0.4) : c1);
    g2d.fillStyle = fill;
    g2d.globalAlpha = 0.3;
    g2d.fill();

    g2d.globalAlpha = 0.18;
    g2d.shadowColor = c1;
    g2d.shadowBlur = 8 * dpr;
    trace(true); g2d.strokeStyle = c1; g2d.lineWidth = 4 * dpr; g2d.stroke();
    trace(false); g2d.stroke();
    g2d.shadowBlur = 0;

    g2d.globalAlpha = 1;
    trace(true); g2d.strokeStyle = c2; g2d.lineWidth = 1.4 * dpr; g2d.stroke();
    trace(false); g2d.stroke();
    g2d.beginPath();
    g2d.moveTo(0, mid); g2d.lineTo(w, mid);
    g2d.strokeStyle = c1; g2d.globalAlpha = 0.45;
    g2d.lineWidth = 0.8 * dpr; g2d.stroke();
    g2d.globalAlpha = 1;
  }

  // Quantized square-cell equalizer — a hardware LED ladder: the whole
  // grid is always faintly visible and the level lights cells from the
  // bottom up, instead of only drawing the lit cells against a void.
  function drawBlocks(data: number[], w: number, h: number) {
    const dpr = dprOf();
    const c1 = cssVar("--visualizer", "#38bdf8");
    const c2 = accentOrDarker(c1);
    const cols = data.length;
    const rows = 8;
    const colGap = Math.max(1 * dpr, w * 0.0035);
    const rowGap = Math.max(1 * dpr, h * 0.025);
    const cellW = Math.max(1, (w - colGap * (cols - 1)) / cols);
    const cellH = Math.max(1, (h - rowGap * (rows - 1)) / rows);
    const rad = Math.min(2 * dpr, cellW / 3, cellH / 3);
    const cell = (x: number, y: number) => { g2d.beginPath(); rr(x, y, cellW, cellH, rad); g2d.fill(); };

    // Unlit ladder.
    g2d.fillStyle = c1;
    g2d.globalAlpha = 0.07;
    for (let i = 0; i < cols; i++) {
      const x = i * (cellW + colGap);
      for (let r = 0; r < rows; r++) cell(x, h - (r + 1) * cellH - r * rowGap);
    }
    g2d.globalAlpha = 1;

    if (fx.bloom) { g2d.shadowColor = c1; g2d.shadowBlur = 5 * dpr; }
    for (let i = 0; i < cols; i++) {
      const lit = Math.max(1, Math.min(rows, Math.round(data[i] * rows)));
      const x = i * (cellW + colGap);
      for (let r = 0; r < lit; r++) {
        const t = (r + 1) / rows;
        const y = h - (r + 1) * cellH - r * rowGap;
        const top = r === lit - 1;
        // Flat cover colour with the classic alpha climb. "Pale tops" is
        // what makes the ladder shift colour from the dark accent up to a
        // white-lifted head cell.
        g2d.fillStyle = fx.pale ? (top ? mix(c1, "#ffffff", 0.7) : mix(c2, c1, t)) : c1;
        g2d.globalAlpha = top && fx.pale ? 1 : 0.52 + 0.4 * t;
        cell(x, y);
      }
    }
    g2d.globalAlpha = 1;
    g2d.shadowBlur = 0;
    drawPeaks(data, h, cellW, cellW + colGap);
  }



  function drawWave() {
    const w = canvas.width, h = canvas.height;
    const dpr = dprOf();
    const c1 = cssVar("--visualizer", "#38bdf8");
    const c2 = accentOrDarker(c1);
    let td: Uint8Array;
    if (useFake || !analyser || !timeData) {
      if (!fakeWaveData) fakeWaveData = new Uint8Array(1024);
      fakeWave(fakeWaveData);
      td = fakeWaveData;
    } else {
      analyser.getByteTimeDomainData(timeData as any);
      td = timeData;
      // Parity with getLevels(): if the graph hands us dead silence while a
      // track is actually playing, fall back to the synthetic wave instead
      // of drawing a flat dead line across the middle.
      let moved = false;
      for (let i = 0; i < td.length; i += 17) {
        if (Math.abs(td[i] - 128) > 2) { moved = true; break; }
      }
      if (!moved && !audio.paused) {
        if (!fakeWaveData) fakeWaveData = new Uint8Array(1024);
        fakeWave(fakeWaveData);
        td = fakeWaveData;
      }
    }
    const path = () => {
      g2d.beginPath();
      for (let x = 0; x <= w; x += 2) {
        const idx = Math.min(td.length - 1, Math.floor((x / w) * td.length));
        const y = (td[idx] / 255) * h;
        if (x === 0) g2d.moveTo(x, y);
        else g2d.lineTo(x, y);
      }
    };
    g2d.lineJoin = "round";
    g2d.lineCap = "round";
    if (fx.bloom) { g2d.shadowColor = c1; g2d.shadowBlur = 8 * dpr; }
    path();
    g2d.strokeStyle = c1;
    g2d.globalAlpha = 0.18;
    g2d.lineWidth = 7 * dpr;
    g2d.stroke();
    g2d.shadowBlur = 0;
    g2d.globalAlpha = 1;
    // Even trace, no horizontal sweep (see drawLine for why).
    path();
    g2d.strokeStyle = c2;
    g2d.lineWidth = 2 * dpr;
    g2d.stroke();
    g2d.lineCap = "butt";
  }

  // Radial Sunburst — a full 360 degree corona around a pulsing core.
  // The old version fanned rays across a half-circle rooted at the bottom
  // edge with a ray width computed from the arc length, which on a wide
  // strip overlapped every ray into one solid blob. Now the rays are
  // mirrored around the vertical axis (so the figure is symmetric), sized
  // from the actual angular slot, and drawn with a gradient along their
  // length.
  function drawRadial(data: number[], w: number, h: number) {
    const dpr = dprOf();
    const c1 = cssVar("--visualizer", "#38bdf8");
    const c2 = accentOrDarker(c1);
    const cx = w / 2, cy = h / 2;
    const R = Math.min(w, h) * 0.46;
    const inner = R * 0.30;
    const n = data.length;
    const rays = n * 2;                       // mirrored → symmetric corona
    const slot = (Math.PI * 2) / rays;
    const spin = (performance.now() / 1000) * 0.10;

    let sum = 0;
    for (const v of data) sum += v;
    const avg = sum / Math.max(1, n);

    // Core: soft halo + solid disc that breathes with the average level.
    const coreR = inner * (0.72 + 0.42 * avg);
    const halo = g2d.createRadialGradient(cx, cy, 0, cx, cy, inner * 2.6);
    halo.addColorStop(0, mix(c1, "#ffffff", 0.4));
    halo.addColorStop(0.35, c1);
    halo.addColorStop(1, "rgba(0,0,0,0)");
    g2d.globalAlpha = 0.30 + 0.3 * avg;
    g2d.fillStyle = halo;
    g2d.beginPath(); g2d.arc(cx, cy, inner * 2.6, 0, Math.PI * 2); g2d.fill();
    g2d.globalAlpha = 1;

    if (fx.bloom) { g2d.shadowColor = c1; g2d.shadowBlur = 6 * dpr; }
    g2d.lineCap = "round";
    const rayW = Math.max(1.4 * dpr, Math.min(inner * slot * 0.9, 6 * dpr));
    for (let k = 0; k < rays; k++) {
      const i = k < n ? k : rays - 1 - k;     // mirror the second half
      const v = data[i];
      const theta = -Math.PI / 2 + slot * (k + 0.5) + spin;
      const len = inner + Math.max(2 * dpr, v * (R - inner));
      const ct = Math.cos(theta), st = Math.sin(theta);
      const x0 = cx + ct * inner, y0 = cy + st * inner;
      const x1 = cx + ct * len,   y1 = cy + st * len;
      const rg = g2d.createLinearGradient(x0, y0, x1, y1);
      rg.addColorStop(0, mix(c2, "#000000", 0.1));
      rg.addColorStop(0.55, mix(c2, c1, 0.75));
      rg.addColorStop(1, mix(c1, "#ffffff", fx.pale ? 0.62 : 0.30));
      g2d.strokeStyle = rg;
      g2d.globalAlpha = fx.pale && v > 0.72 ? 1 - (v - 0.72) * 0.6 : 1;
      g2d.lineWidth = rayW;
      g2d.beginPath();
      g2d.moveTo(x0, y0);
      g2d.lineTo(x1, y1);
      g2d.stroke();
      // Peak cap riding the ray.
      if (fx.peak) {
        const pl = inner + peakHold[i] * (R - inner);
        g2d.fillStyle = mix(c1, "#ffffff", 0.75);
        g2d.globalAlpha = 0.8;
        g2d.beginPath();
        g2d.arc(cx + ct * pl, cy + st * pl, rayW * 0.42, 0, Math.PI * 2);
        g2d.fill();
      }
      g2d.globalAlpha = 1;
    }
    g2d.lineCap = "butt";
    g2d.shadowBlur = 0;

    // Core disc + rim, drawn last so the ray roots disappear under it.
    const disc = g2d.createRadialGradient(cx - coreR * 0.3, cy - coreR * 0.35, 0, cx, cy, coreR);
    disc.addColorStop(0, mix(c1, "#ffffff", 0.8));
    disc.addColorStop(0.6, c1);
    disc.addColorStop(1, mix(c2, "#000000", 0.15));
    g2d.fillStyle = disc;
    g2d.beginPath(); g2d.arc(cx, cy, coreR, 0, Math.PI * 2); g2d.fill();
    g2d.strokeStyle = mix(c1, "#ffffff", 0.6);
    g2d.globalAlpha = 0.5;
    g2d.lineWidth = 0.9 * dpr;
    g2d.beginPath(); g2d.arc(cx, cy, coreR, 0, Math.PI * 2); g2d.stroke();
    g2d.globalAlpha = 1;
  }

  // Dot Matrix — grid of dots lit by spectrum energy.
  function drawDots(data: number[], w: number, h: number) {
    const dpr = dprOf();
    const c1 = cssVar("--visualizer", "#38bdf8");
    const c2 = accentOrDarker(c1);
    const cols = data.length;
    const rows = 7;
    const cellW = w / cols;
    const cellH = h / rows;
    const rad = Math.max(1.2 * dpr, Math.min(cellW * 0.3, cellH * 0.3));
    if (fx.bloom) { g2d.shadowColor = c1; g2d.shadowBlur = 4 * dpr; }
    for (let i = 0; i < cols; i++) {
      const lit = Math.max(1, Math.min(rows, Math.round(data[i] * rows)));
      const x = i * cellW + cellW / 2;
      for (let r = 0; r < lit; r++) {
        const y = h - (r + 0.5) * cellH;
        g2d.fillStyle = mix(c2, c1, (r + 1) / rows);
        g2d.globalAlpha = 0.5 + 0.5 * ((r + 1) / rows);
        g2d.beginPath();
        g2d.arc(x, y, rad, 0, Math.PI * 2);
        g2d.fill();
      }
    }
    g2d.globalAlpha = 1;
    g2d.shadowBlur = 0;
  }

  // ---------------------------------------------------------------------
  // Wildflower Meadow — a field of grass and flowers breathing in the wind.
  // Layered blades bend to a two-octave breeze, each flower head opens with
  // its own slice of the spectrum, and pollen drifts up through warm air.
  // ---------------------------------------------------------------------
  function drawMeadow(w: number, h: number) {
    const dpr = dprOf();
    const S = ambientSignals(false);
    const P1 = painter(cssVar("--visualizer", "#38bdf8"));
    const P2 = painter(cssVar("--accent", "#0284c7"));
    const cssW = w / dpr;
    const ground = h * 0.985;

    const bladeCount = Math.max(24, Math.min(130, Math.round(cssW / 6.5)));
    if (meadowBlades.length !== bladeCount) {
      meadowBlades = Array.from({ length: bladeCount }, (_, i) => {
        const depth = (i % 3) / 2; // 0 = far/dim/short, 1 = near/bright/tall
        return {
          x: (i + 0.5) / bladeCount + (Math.random() - 0.5) / bladeCount,
          h: (0.22 + 0.30 * Math.random()) * (0.65 + 0.6 * depth),
          lean: (Math.random() - 0.5) * 0.7,
          ph: Math.random() * Math.PI * 2,
          b: (i * GOLDEN) % 1,
          depth,
          c: i % 4 === 0 ? 1 : 0,
        };
      });
    }
    const flowerCount = Math.max(4, Math.min(20, Math.round(cssW / 38)));
    if (meadowFlowers.length !== flowerCount) {
      meadowFlowers = Array.from({ length: flowerCount }, (_, i) => ({
        x: (i + 0.5) / flowerCount + (Math.random() - 0.5) * 0.6 / flowerCount,
        stem: 0.30 + Math.random() * 0.46,
        petals: 5 + (i % 3),
        ph: Math.random() * Math.PI * 2,
        spin: (i % 2 ? 1 : -1) * (0.10 + Math.random() * 0.22),
        b: ((i + 0.5) * GOLDEN * 3) % 1,
        c: i % 2,
        size: 0.72 + Math.random() * 0.55,
      }));
    }
    const pollenCount = Math.max(8, Math.min(38, Math.round(cssW / 22)));
    if (meadowPollen.length !== pollenCount) {
      meadowPollen = Array.from({ length: pollenCount }, (_, i) => ({
        x: Math.random(), y: Math.random(),
        r: 0.6 + Math.random() * 1.4,
        ph: Math.random() * Math.PI * 2,
        sp: 0.5 + Math.random(),
        b: ((i + 1) * GOLDEN * 5) % 1,
        c: i % 3 === 0 ? 1 : 0,
      }));
    }

    // Warm air above, soft earth glow along the ground line.
    const sky = g2d.createLinearGradient(0, 0, 0, ground);
    sky.addColorStop(0, P2(0.15 + 0.14 * S.high));
    sky.addColorStop(0.62, P2(0.03 + 0.05 * S.all));
    sky.addColorStop(1, P1(0));
    g2d.fillStyle = sky;
    g2d.fillRect(0, 0, w, h);

    // Two overlapping breeze waves so the field never sways in lockstep.
    const breeze = (Math.sin(S.t * 0.75) * 0.62 + Math.sin(S.t * 1.63 + 1.3) * 0.38) * (0.45 + 0.85 * S.all);

    // Distant rolling hills — depth behind the field, drifting very slowly.
    for (let k = 0; k < 2; k++) {
      const base = ground - h * (0.30 + 0.13 * k);
      const amp = h * (0.045 + 0.03 * k) * (0.7 + 0.5 * S.low);
      g2d.fillStyle = P1(0.05 + 0.045 * k + 0.05 * S.low);
      g2d.beginPath();
      g2d.moveTo(0, h);
      g2d.lineTo(0, base);
      for (let x = 0; x <= w; x += Math.max(4 * dpr, w / 40)) {
        const u = x / w;
        const y = base + Math.sin(u * Math.PI * (2.2 + k) + S.t * 0.12 * (k + 1) + k * 1.7) * amp
                       + Math.sin(u * Math.PI * (5.3 - k) + k) * amp * 0.35;
        g2d.lineTo(x, y);
      }
      g2d.lineTo(w, h);
      g2d.closePath();
      g2d.fill();
    }

    const soil = g2d.createLinearGradient(0, ground - h * 0.26, 0, h);
    soil.addColorStop(0, P1(0));
    soil.addColorStop(1, P1(0.13 + 0.17 * S.low));
    g2d.fillStyle = soil;
    g2d.fillRect(0, ground - h * 0.26, w, h - ground + h * 0.26);

    // Grass: tapered blades (filled, not stroked) so they read as leaves
    // rather than needles, curving into the breeze with a real arc.
    for (const q of meadowBlades) {
      const lv = bandAt(S.bands, q.b);
      const bh = q.h * h * (0.82 + 0.55 * lv);
      // Per-blade phase carries most of the motion so the field ripples
      // instead of every blade leaning the same way at the same instant.
      const bend = (q.lean + breeze * (0.20 + 0.30 * q.depth) + Math.sin(S.t * 1.7 + q.ph) * (0.16 + 0.20 * S.all)) * bh * 0.45;
      const bx = q.x * w;
      const tipX = bx + bend, tipY = ground - bh;
      // Control point pulled BACK from the tip → the blade arcs instead of
      // running dead straight to its tip.
      const cx = bx + bend * 0.22, cy = ground - bh * 0.62;
      const halfW = (0.55 + 1.15 * q.depth) * dpr;
      const P = q.c ? P2 : P1;
      g2d.fillStyle = P(0.10 + 0.22 * q.depth + 0.34 * lv * (0.35 + 0.65 * q.depth));
      g2d.beginPath();
      g2d.moveTo(bx - halfW, ground);
      g2d.quadraticCurveTo(cx - halfW * 0.55, cy, tipX, tipY);
      g2d.quadraticCurveTo(cx + halfW * 0.55, cy, bx + halfW, ground);
      g2d.closePath();
      g2d.fill();
    }

    if (fx.bloom) { g2d.shadowColor = cssVar("--visualizer", "#38bdf8"); g2d.shadowBlur = 5 * dpr; }
    g2d.lineCap = "round";
    for (const f of meadowFlowers) {
      const lv = bandAt(S.bands, f.b);
      const bloom = 0.55 + 0.45 * lv;
      const sh = f.stem * h * (0.9 + 0.22 * lv);
      const bend = (breeze * 0.85 + Math.sin(S.t * 1.45 + f.ph) * 0.28) * sh * 0.45;
      const sx = f.x * w;
      const hx = sx + bend, hy = ground - sh;
      const P = f.c ? P2 : P1;
      const Q = f.c ? P1 : P2;
      g2d.strokeStyle = P(0.34 + 0.30 * lv);
      g2d.lineWidth = 1.5 * dpr;
      g2d.beginPath();
      g2d.moveTo(sx, ground);
      g2d.quadraticCurveTo(sx + bend * 0.28, ground - sh * 0.55, hx, hy);
      g2d.stroke();
      // a pair of slim leaves halfway up the stem, angled upward
      const lx = sx + bend * 0.28, ly = ground - sh * 0.5;
      const leaf = Math.max(1.6 * dpr, sh * 0.11);
      g2d.fillStyle = P(0.16 + 0.16 * lv);
      for (const side of [-1, 1]) {
        g2d.save();
        g2d.translate(lx, ly);
        g2d.rotate(side * (0.75 + 0.12 * Math.sin(S.t * 1.3 + f.ph)));
        g2d.beginPath();
        g2d.moveTo(0, 0);
        g2d.quadraticCurveTo(leaf * 0.5, -leaf * 0.34, leaf * 1.6, -leaf * 0.15);
        g2d.quadraticCurveTo(leaf * 0.5, leaf * 0.10, 0, 0);
        g2d.closePath();
        g2d.fill();
        g2d.restore();
      }
      const rad = Math.max(2.2 * dpr, Math.min(w * 0.018, h * 0.115)) * f.size * bloom;
      const halo = g2d.createRadialGradient(hx, hy, 0, hx, hy, rad * 3.2);
      halo.addColorStop(0, P(0.20 + 0.32 * lv));
      halo.addColorStop(1, P(0));
      g2d.fillStyle = halo;
      g2d.beginPath(); g2d.arc(hx, hy, rad * 3.2, 0, Math.PI * 2); g2d.fill();
      const spin = S.t * f.spin + f.ph;
      g2d.lineWidth = 0.9 * dpr;
      for (let p = 0; p < f.petals; p++) {
        g2d.save();
        g2d.translate(hx, hy);
        g2d.rotate(spin + (p / f.petals) * Math.PI * 2);
        // Petals fan slightly wider as the band lifts, so the head "opens".
        g2d.beginPath();
        g2d.ellipse(0, -rad * 0.92, rad * 0.44, rad * 0.92, 0, 0, Math.PI * 2);
        const pg = g2d.createLinearGradient(0, 0, 0, -rad * 1.85);
        pg.addColorStop(0, P(0.20 + 0.30 * lv));
        pg.addColorStop(1, Q(0.34 + 0.44 * lv));
        g2d.fillStyle = pg;
        g2d.fill();
        g2d.strokeStyle = P(0.16 + 0.24 * lv);
        g2d.stroke();
        g2d.restore();
      }
      g2d.fillStyle = Q(0.68 + 0.3 * lv);
      g2d.beginPath(); g2d.arc(hx, hy, rad * 0.40, 0, Math.PI * 2); g2d.fill();
      g2d.fillStyle = P(0.55 + 0.4 * lv);
      g2d.beginPath(); g2d.arc(hx, hy, rad * 0.18, 0, Math.PI * 2); g2d.fill();
    }
    g2d.shadowBlur = 0;

    for (const q of meadowPollen) {
      const lv = bandAt(S.bands, q.b);
      q.y -= S.dt * ambSpeed * q.sp * (0.020 + 0.045 * S.all);
      q.x += S.dt * ambSpeed * (breeze * 0.045 + Math.sin(S.t * q.sp * 1.7 + q.ph) * 0.014);
      if (q.y < -0.06) { q.y = 1.04; q.x = Math.random(); }
      if (q.x > 1.06) q.x = -0.06; else if (q.x < -0.06) q.x = 1.06;
      const tw = 0.55 + 0.45 * Math.sin(S.t * 2.2 * q.sp + q.ph);
      const r = (q.r + 1.6 * lv) * dpr;
      const px = q.x * w, py = q.y * h;
      const P = q.c ? P2 : P1;
      const g = g2d.createRadialGradient(px, py, 0, px, py, r * 3);
      g.addColorStop(0, P((0.18 + 0.4 * lv) * tw));
      g.addColorStop(1, P(0));
      g2d.fillStyle = g;
      g2d.beginPath(); g2d.arc(px, py, r * 3, 0, Math.PI * 2); g2d.fill();
      g2d.fillStyle = P((0.45 + 0.4 * lv) * tw);
      g2d.beginPath(); g2d.arc(px, py, Math.max(0.7 * dpr, r * 0.5), 0, Math.PI * 2); g2d.fill();
    }
    g2d.lineCap = "butt";
  }


  // =====================================================================
  // HIGH-ENERGY FAMILY — 24 scenes in 8 categories
  //
  // All of them run on punchSignals(): fast-attack band groups, a
  // short-release energy envelope and the shared bass-onset detector
  // (`hit` is true on the frame a beat lands, `beat` decays 1 → 0 in
  // ~160 ms). Everything is painted through painter() with --visualizer /
  // --accent, so the Dynamic Album Artwork Theme re-tints them live.
  //
  // Sizing rule: `w` / `h` are already in DEVICE pixels, so only
  // thicknesses and radii get multiplied by dpr — same as every other
  // scene in this file. Every scene is built to read at both a large
  // stage and the default skin's 56 px strip.
  // =====================================================================
  interface WarpStar { x: number; y: number; z: number; pz: number; c: number }
  let warpStars: WarpStar[] = [];

  // ⚡ 1. ENERGETIC — a charged ridge. The spectrum is smoothed into
  // terrain, lightning crawls off the loudest peaks and forks on its way
  // up, embers ride the updraft, and every beat flashes the whole sky.
  // ⚡ 1. ENERGETIC — a warp tunnel: rings rushing out of the vanishing
  // point, stars stretched into streaks, the field turning slowly, and a
  // jump on every beat that pulls the whole sky past you.
  function drawWarp(w: number, h: number) {
    const dpr = dprOf();
    const S = punchSignals(24);
    const P1 = painter(cssVar("--visualizer", "#38bdf8"));
    const P2 = painter(cssVar("--accent", "#0284c7"));
    const cap = Math.round(Math.max(90, Math.min(260, (w / dpr) * 0.35)));
    const cx = w / 2, cy = h / 2;
    const k = Math.max(w, h) * 0.55;
    const ar = h / Math.max(1, w);
    const HOT = hotInk(P1);

    // the deep of it
    const bg = g2d.createRadialGradient(cx, cy, 0, cx, cy, Math.max(0.001, Math.hypot(w, h) * 0.5));
    bg.addColorStop(0, P1(0.06 + 0.08 * S.all));
    bg.addColorStop(0.55, P2(0.03 + 0.03 * S.all));
    bg.addColorStop(1, scrim(0.35));
    g2d.fillStyle = bg; g2d.fillRect(0, 0, w, h);

    // the tunnel: rings coming at you out of the vanishing point
    for (let r = 0; r < 7; r++) {
      const u = (S.t * (0.30 + 0.30 * S.all) + r * 0.143) % 1;
      const z = 1 - u;
      const rr = (1 / Math.max(0.06, z)) * k * 0.32;
      const a = (1 - z) * (0.08 + 0.16 * S.all);
      g2d.strokeStyle = P1(a);
      g2d.lineWidth = Math.max(0.6 * dpr, Math.min(w, h) * 0.006 * (1 - z));
      g2d.beginPath();
      g2d.ellipse(cx, cy, rr, rr * Math.max(0.35, ar) * 1.4, 0, 0, Math.PI * 2);
      g2d.stroke();
    }

    const speed = 0.35 + 2.2 * S.all + (S.hit ? 0.9 : 0);
    const stretch = 1 + 7 * S.beat;      // the beat pulls every streak out
    const roll = S.t * 0.06;             // and the field turns, always
    const cs = Math.cos(roll), sn = Math.sin(roll);
    while (warpStars.length < cap) {
      warpStars.push({
        x: (Math.random() - 0.5) * 2, y: (Math.random() - 0.5) * 2 * ar,
        z: 0.1 + Math.random() * 0.9, pz: 1, c: Math.random() < 0.35 ? 1 : 0,
      });
    }
    g2d.lineCap = "round";
    for (const s of warpStars) {
      s.pz = s.z;
      s.z -= S.dt * speed * (0.35 + 0.75 * s.z);
      if (s.z <= 0.03) {
        s.z = 1; s.pz = 1;
        s.x = (Math.random() - 0.5) * 2; s.y = (Math.random() - 0.5) * 2 * ar;
      }
      const pzLag = Math.max(0.03, s.z + (s.pz - s.z) * 3.4 * stretch);
      const rx = s.x * cs - s.y * sn, ry = s.x * sn + s.y * cs;
      const sx = cx + (rx / s.z) * k, sy = cy + (ry / s.z) * k;
      const px = cx + (rx / pzLag) * k, py = cy + (ry / pzLag) * k;
      if (Math.abs(sx) > w * 3 && Math.abs(sy) > h * 3) continue;
      const near = 1 - s.z;
      const a = Math.min(1, near * 1.3) * (0.35 + 0.65 * S.all);
      if (a < 0.02) continue;
      const P = s.c ? P2 : P1;
      g2d.strokeStyle = P(a * 0.85);
      g2d.lineWidth = Math.max(0.7 * dpr, (0.8 + 2.2 * near) * dpr);
      g2d.beginPath(); g2d.moveTo(px, py); g2d.lineTo(sx, sy); g2d.stroke();
      // the head of it, bright
      g2d.fillStyle = HOT(a * 0.55);
      g2d.beginPath();
      g2d.arc(sx, sy, Math.max(0.5 * dpr, (0.6 + 1.0 * near) * dpr), 0, Math.PI * 2);
      g2d.fill();
    }
    g2d.lineCap = "butt";

    // the point you are falling into
    const cr = Math.min(w, h) * (0.05 + 0.10 * S.beat + 0.05 * S.low);
    const cg = g2d.createRadialGradient(cx, cy, 0, cx, cy, Math.max(0.001, cr));
    cg.addColorStop(0, HOT(0.18 + 0.35 * S.beat));
    cg.addColorStop(0.4, P1((0.16 + 0.25 * S.beat) * (0.4 + 0.8 * S.all)));
    cg.addColorStop(1, P1(0));
    g2d.fillStyle = cg;
    g2d.beginPath(); g2d.arc(cx, cy, Math.max(0.001, cr), 0, Math.PI * 2); g2d.fill();

    // and the scrim at the edges of it — theme-aware, so on the light
    // theme the rim pales out instead of going muddy black
    const vg = g2d.createRadialGradient(cx, cy, Math.min(w, h) * 0.22, cx, cy, Math.max(0.001, Math.hypot(w, h) * 0.55));
    vg.addColorStop(0, scrim(0));
    vg.addColorStop(1, scrim(0.35));
    g2d.fillStyle = vg; g2d.fillRect(0, 0, w, h);
  }

  // ⚡ 1. ENERGETIC — a summit in the dark: three ridges standing in depth,
  // the sky burning along the horizon behind them, stars over the top, dust
  // drifting through the air, and the near crest rimmed with fire on every
  // beat. No sun — the light comes from beyond the ridge.
  function drawTriumph(w: number, h: number) {
    const dpr = dprOf();
    const n = 36;
    const S = punchSignals(n);
    const P1 = painter(cssVar("--visualizer", "#38bdf8"));
    const P2 = painter(cssVar("--accent", "#0284c7"));
    const ridgeLine = h * 0.62;

    // the sky: uniformly dark top to bottom (the old gradient went pale
    // toward the horizon, which read as a washed white lower half on the
    // light theme); one faint uniform tint keeps the colour in both halves
    const dk = isLightTheme() ? 0.15 : 0.44;   // uniform top-to-bottom, lighter on the pale theme
    const sky = g2d.createLinearGradient(0, 0, 0, h);
    sky.addColorStop(0, `rgba(0,0,0,${dk})`);
    sky.addColorStop(0.5, `rgba(0,0,0,${Math.max(0, dk - 0.02)})`);
    sky.addColorStop(1, `rgba(0,0,0,${dk})`);
    g2d.fillStyle = sky; g2d.fillRect(0, 0, w, h);
    g2d.fillStyle = P2(isLightTheme() ? 0.10 + 0.06 * S.all : 0.04 + 0.05 * S.all);
    g2d.fillRect(0, 0, w, h);

    // the stars over the top of it
    for (let k = 0; k < 40; k++) {
      const r1 = ((Math.sin(k * 12.9898) * 43758.5453) % 1 + 1) % 1;
      const r2 = ((Math.sin(k * 78.233) * 12345.6789) % 1 + 1) % 1;
      const x = r1 * w;
      const y = r2 * ridgeLine * 0.85;
      const tw = 0.25 + 0.75 * Math.pow(Math.abs(Math.sin(S.t * 0.9 + k * 2.3)), 3);
      const a = tw * (1 - r2 * 0.7) * (0.25 + 0.45 * (1 - S.all));
      g2d.fillStyle = `rgba(255,255,255,${a})`;
      g2d.beginPath();
      g2d.arc(x, y, Math.max(0.4 * dpr, (0.5 + 0.8 * tw) * dpr), 0, Math.PI * 2);
      g2d.fill();
    }

    // the dust in the air
    for (let k = 0; k < 34; k++) {
      const r1 = ((Math.sin(k * 12.9898) * 43758.5453) % 1 + 1) % 1;
      const r2 = ((Math.sin(k * 78.233) * 12345.6789) % 1 + 1) % 1;
      const x = (((r1 + S.t * (0.01 + 0.03 * r2) * (0.4 + S.all)) % 1) + 1) % 1 * w;
      const y = (((r2 + Math.sin(S.t * 0.35 + k) * 0.02) % 1) + 1) % 1 * h * 0.9;
      const tw = 0.2 + 0.8 * Math.pow(Math.abs(Math.sin(S.t * 1.4 + k * 2.1)), 3);
      g2d.fillStyle = `rgba(255,255,255,${tw * (0.08 + 0.18 * S.all)})`;
      g2d.beginPath();
      g2d.arc(x, y, Math.max(0.5 * dpr, (0.6 + 1.0 * tw) * dpr), 0, Math.PI * 2);
      g2d.fill();
    }

    // three ridges, far to near, each on its own part of the spectrum
    const ridge = (layer: number) => {
      const off = layer * 2;
      const scale = 0.42 + 0.16 * layer;
      const at = (i: number) => h - Math.max(2 * dpr, S.d[Math.max(0, Math.min(n - 1, i + off))] * h * scale);
      g2d.beginPath();
      g2d.moveTo(0, h); g2d.lineTo(0, at(0));
      for (let i = 0; i < n - 1; i++) {
        const x0 = ((i + 0.5) / n) * w, x1 = ((i + 1.5) / n) * w;
        g2d.quadraticCurveTo(x0, at(i), (x0 + x1) / 2, (at(i) + at(i + 1)) / 2);
      }
      g2d.lineTo(w, at(n - 1)); g2d.lineTo(w, h); g2d.closePath();
    };
    const shades: string[][] = [
      [P1(0.16 + 0.10 * S.all), P1(0.28 + 0.12 * S.all)],
      [P2(0.32 + 0.12 * S.all), P2(0.52 + 0.14 * S.all)],
      [P2(0.68 + 0.14 * S.all), P2(0.94)],
    ];
    for (let layer = 0; layer < 3; layer++) {
      ridge(layer);
      const g = g2d.createLinearGradient(0, h * 0.30, 0, h);
      g.addColorStop(0, shades[layer][0]);
      g.addColorStop(1, shades[layer][1]);
      g2d.fillStyle = g;
      g2d.fill();
      if (layer === 2) {
        g2d.lineJoin = "round";
        g2d.strokeStyle = P1(0.16 + 0.28 * S.beat);
        g2d.lineWidth = Math.max(5 * dpr, Math.min(w, h) * 0.04);
        g2d.stroke();
        g2d.strokeStyle = `rgba(255,255,255,${0.50 + 0.40 * S.beat})`;
        g2d.lineWidth = Math.max(1 * dpr, Math.min(w, h) * 0.008);
        g2d.stroke();
        g2d.lineJoin = "miter";
      }
    }

    if (S.beat > 0.05) { g2d.fillStyle = `rgba(255,255,255,${S.beat * 0.10})`; g2d.fillRect(0, 0, w, h); }
  }

  // driven by its own band, with motes riding the updraft and a ground
  // glow that swells with the bass.
  // ⚡ 1. ENERGETIC — an ascension: pillars of light off a wet floor, rings
  // climbing them, a peak marker above each, and embers riding the updraft
  // clean out of the frame.
  // flying out of each blast, and a white flash at the origin. Rings thin
  // and fade as they grow; beats set them off.
  // spinning as they fly, with motion-blur streaks and a flaring core on
  // every beat.
  // tall columns are blown off on every beat and tumble away under
  // gravity, while the column itself snaps back down.
  let chunks: { x: number; y: number; vx: number; vy: number; rot: number; vr: number; s: number; life: number; max: number; c: number }[] = [];
  let detoH: number[] = [];
  // ⚡ 1. ENERGETIC — a demolition. A rig of cells that jumps on the attack
  // and sinks on the release, blown apart on every hit: chunks tumbling
  // under gravity and bouncing off the floor, sparks off the impacts, and a
  // shock ring running out along the ground.
  let detoSparks: { x: number; y: number; vx: number; vy: number; life: number; max: number }[] = [];
  let detoRings: { x: number; life: number; max: number }[] = [];
  // ⚡ 1. ENERGETIC — a mirror ball, in colour. Every facet of it is lit by
  // one fixed light and turns with the ball, cones swing out across the room
  // and pool where they land, and a row of bars stands on the floor, bobbing
  // and kicking on the beat. The room is a colour wheel that turns with the
  // music, but the bars themselves take the album's own two-tone
  // (--visualizer / --accent) so the dance floor still belongs to the cover.
  // (Was two modes — the monochrome "Disco" and "Disco Colour"; the
  // monochrome one was removed on request and this one took its name and id.)
  let discoPeaks: number[] = [];
  function drawDisco(w: number, h: number) {
    const dpr = dprOf();
    const n = 24;
    const S = punchSignals(n);
    const P1 = painter(cssVar("--visualizer", "#38bdf8"));
    const P2 = painter(cssVar("--accent", "#0284c7"));
    const HOT = hotInk(P1);
    // the wheel: one hue per thing, and the whole wheel turns with the music
    const hueOf = (i: number) => (((i / n) * 320) + S.t * 18) % 360;
    const C = (i: number, a: number, l = 58) =>
      `hsla(${hueOf(i)}, 88%, ${l}%, ${Math.max(0, Math.min(1, a))})`;
    const bx = w * 0.5, by = h * 0.17;
    const floor = h * 0.86;
    if (discoPeaks.length !== n) discoPeaks = new Array(n).fill(0);
    g2d.fillStyle = scrim(0.45);
    g2d.fillRect(0, 0, w, h);

    // the cones, swinging
    for (let k = 0; k < 6; k++) {
      const base = S.t * (0.35 + 0.20 * k) + k * 1.9 + (S.hit ? 0.55 : 0);
      const a = Math.PI / 2 + Math.sin(base) * 1.15;
      const spread = 0.075 + 0.035 * Math.sin(base * 1.7);
      const len = Math.hypot(w, h) * 1.1;
      const ex = bx + Math.cos(a) * len, ey = by + Math.sin(a) * len;
      g2d.beginPath();
      g2d.moveTo(bx, by);
      g2d.lineTo(bx + Math.cos(a - spread) * len, by + Math.sin(a - spread) * len);
      g2d.lineTo(bx + Math.cos(a + spread) * len, by + Math.sin(a + spread) * len);
      g2d.closePath();
      const cg = g2d.createLinearGradient(bx, by, ex, ey);
      const ia = (0.05 + 0.12 * S.mid + 0.09 * S.beat) * (0.4 + 0.8 * S.all);
      cg.addColorStop(0, C(k * 4 + 1, ia, 62));
      cg.addColorStop(0.5, C(k * 4 + 1, ia * 0.45, 50));
      cg.addColorStop(1, C(k * 4 + 1, 0, 50));
      g2d.fillStyle = cg; g2d.fill();
      if (ey > floor) {
        const t = (floor - by) / (ey - by);
        const px = bx + (ex - bx) * t;
        const pw = Math.min(w, h) * (0.05 + 0.05 * Math.abs(Math.sin(base)));
        const pg = g2d.createRadialGradient(px, floor, 0, px, floor, Math.max(0.001, pw * 2.4));
        pg.addColorStop(0, HOT(Math.min(1, ia * 1.6)));
        pg.addColorStop(0.4, C(k * 4 + 1, ia * 0.9, 62));
        pg.addColorStop(1, C(k * 4 + 1, 0, 62));
        g2d.fillStyle = pg;
        g2d.beginPath(); g2d.ellipse(px, floor, pw * 2.4, pw * 0.8, 0, 0, Math.PI * 2); g2d.fill();
      }
    }

    // the glitter in the air
    const sparkles = Math.round(Math.max(40, Math.min(160, (w / dpr) * 0.22)));
    for (let k = 0; k < sparkles; k++) {
      const px = Math.abs((Math.sin(k * 12.9898) * 43758.5453) % 1);
      const py = Math.abs((Math.sin(k * 78.233) * 12345.6789) % 1);
      const tw = 0.35 + 0.65 * Math.abs(Math.sin(S.t * (2 + (k % 5)) + k));
      g2d.fillStyle = C(k, tw * (0.15 + 0.55 * S.high), 68);
      g2d.beginPath();
      g2d.arc(px * w, py * floor, (0.5 + 1.3 * ((k % 7) / 7)) * dpr, 0, Math.PI * 2);
      g2d.fill();
    }

    // the wire it hangs from
    g2d.strokeStyle = P2(0.30 + 0.20 * S.all);
    g2d.lineWidth = Math.max(0.7 * dpr, 1.2 * dpr);
    g2d.beginPath(); g2d.moveTo(bx, 0); g2d.lineTo(bx, by - Math.min(w, h) * 0.10); g2d.stroke();

    // the ball
    const rad = Math.max(6 * dpr, Math.min(w, h) * (0.095 + 0.03 * S.low + 0.02 * S.beat));
    const bg = g2d.createRadialGradient(bx - rad * 0.3, by - rad * 0.35, rad * 0.1, bx, by, rad);
    bg.addColorStop(0, HOT(0.75));
    bg.addColorStop(0.5, C(6, 0.50, 56));
    bg.addColorStop(1, C(6, 0.70, 40));
    g2d.fillStyle = bg;
    g2d.beginPath(); g2d.arc(bx, by, rad, 0, Math.PI * 2); g2d.fill();
    const lx = 0.42, ly = -0.72, lz = 0.55;      // one light, for every facet
    const spin = S.t * 0.6;
    const LATS = 10, LONS = 18;
    for (let la = 0; la < LATS; la++) {
      const th = -Math.PI / 2 + ((la + 0.5) / LATS) * Math.PI;
      const ct = Math.cos(th), st = Math.sin(th);
      for (let lo = 0; lo < LONS; lo++) {
        const ph = ((lo + 0.5) / LONS) * Math.PI * 2 + spin;
        const nx = ct * Math.sin(ph), ny = -st, nz = ct * Math.cos(ph);
        if (nz <= 0.05) continue;                // the far side of it
        const diff = Math.max(0, nx * lx + ny * ly + nz * lz);
        const px = bx + nx * rad, py = by + ny * rad;
        const sz = Math.max(0.5 * dpr, rad * 0.13 * (0.5 + 0.5 * nz));
        g2d.fillStyle = C(la * 2 + lo, 0.10 + 0.50 * diff, 64);
        g2d.beginPath(); g2d.arc(px, py, sz, 0, Math.PI * 2); g2d.fill();
        const spec = Math.pow(diff, 26);
        if (spec > 0.15) {
          const sr = Math.max(0.001, sz * 3);
          const sg = g2d.createRadialGradient(px, py, 0, px, py, sr);
          sg.addColorStop(0, HOT(Math.min(1, spec * 1.5)));
          sg.addColorStop(0.4, C(la * 2 + lo, spec * 0.55, 66));
          sg.addColorStop(1, C(la * 2 + lo, 0, 66));
          g2d.fillStyle = sg;
          g2d.beginPath(); g2d.arc(px, py, sr, 0, Math.PI * 2); g2d.fill();
        }
      }
    }
    const hg = g2d.createRadialGradient(bx, by, rad * 0.7, bx, by, Math.max(0.001, rad * 3));
    hg.addColorStop(0, C(3, (0.14 + 0.22 * S.beat) * (0.4 + 0.8 * S.all), 60));
    hg.addColorStop(1, P1(0));
    g2d.fillStyle = hg;
    g2d.beginPath(); g2d.arc(bx, by, Math.max(0.001, rad * 3), 0, Math.PI * 2); g2d.fill();

    // the floor, and the bars dancing on it.
    // BAR_SCALE: 30% shorter than they were, on request. It applies to the
    // level, the bob and the beat kick alike, and the peak marker uses the
    // same factor so it still lands on top of the bar it belongs to.
    const BAR_SCALE = 0.70;
    const slot = w / n, bw = slot * 0.62;
    g2d.strokeStyle = P2(0.35 + 0.20 * S.all);
    g2d.lineWidth = Math.max(0.6 * dpr, 1.2 * dpr);
    g2d.beginPath(); g2d.moveTo(0, floor); g2d.lineTo(w, floor); g2d.stroke();
    for (let i = 0; i < n; i++) {
      const lv = S.d[i];
      discoPeaks[i] = lv > discoPeaks[i] ? lv : Math.max(lv, discoPeaks[i] - S.dt * 0.60);
      // the dance: a bob in its own phase, a lean, and a kick on the beat
      const bob = Math.abs(Math.sin(S.t * 3.1 + i * 0.55)) * h * 0.055 * (0.35 + 0.90 * S.all)
        + S.beat * h * 0.07;
      const lean = Math.sin(S.t * 2.2 + i * 0.8) * bw * 0.18 * (0.30 + 0.80 * S.all);
      const bh = Math.max(2 * dpr, (lv * h * 0.40 + bob) * BAR_SCALE);
      const x = i * slot + (slot - bw) / 2 + lean;
      // its reflection in the floor
      const rh = Math.min(h - floor, bh * 0.45);
      const rg = g2d.createLinearGradient(0, floor, 0, floor + rh);
      rg.addColorStop(0, P1((0.16 + 0.22 * lv) * (0.4 + 0.8 * S.all)));
      rg.addColorStop(1, P1(0));
      g2d.fillStyle = rg;
      g2d.fillRect(x, floor, bw, rh);
      // the bar — cover colours, not the wheel
      const g = g2d.createLinearGradient(0, floor - bh, 0, floor);
      g.addColorStop(0, P1(0.35 + 0.45 * lv));
      g.addColorStop(0.65, P2(0.45 + 0.35 * lv));
      g.addColorStop(1, P2(0.75 + 0.20 * lv));
      g2d.fillStyle = g;
      const rr = Math.max(1 * dpr, bw * 0.30);
      if (g2d.roundRect) {
        g2d.beginPath(); g2d.roundRect(x, floor - bh, bw, bh, [rr, rr, 0, 0]); g2d.fill();
      } else {
        g2d.fillRect(x, floor - bh, bw, bh);
      }
      g2d.fillStyle = HOT(0.10 + 0.22 * lv);
      g2d.fillRect(x + bw * 0.16, floor - bh, Math.max(1 * dpr, bw * 0.16), bh * 0.94);
      g2d.fillStyle = HOT(0.45 + 0.40 * lv);
      g2d.fillRect(x, floor - bh, bw, Math.max(1.5 * dpr, 2.5 * dpr));
      // the glow off the top of it
      const cgr = Math.max(0.001, bw * 1.6);
      const cg = g2d.createRadialGradient(x + bw / 2, floor - bh, 0, x + bw / 2, floor - bh, cgr);
      cg.addColorStop(0, P1((0.16 + 0.30 * lv) * (0.4 + 0.8 * S.all)));
      cg.addColorStop(1, P1(0));
      g2d.fillStyle = cg;
      g2d.beginPath(); g2d.arc(x + bw / 2, floor - bh, cgr, 0, Math.PI * 2); g2d.fill();
      // the marker, holding its height and falling back
      if (discoPeaks[i] > lv + 0.03) {
        g2d.fillStyle = HOT(0.22 + 0.35 * discoPeaks[i]);
        g2d.fillRect(x, floor - (discoPeaks[i] * h * 0.40 + bob) * BAR_SCALE, bw, Math.max(1 * dpr, 2 * dpr));
      }
    }
  }
  // ⚡ 1. ENERGETIC — a fairground tunnel: rings of light turning at their
  // own speeds and in their own directions, spokes flying past radially,
  // bokeh drifting out of focus, and the middle of it flaring white on
  // every kick.
  function drawCarnival(w: number, h: number) {
    const dpr = dprOf();
    const S = punchSignals(24);
    const P1 = painter(cssVar("--visualizer", "#38bdf8"));
    const P2 = painter(cssVar("--accent", "#0284c7"));
    const cx = w / 2 + Math.sin(S.t * 1.7) * w * 0.04 * S.all;
    const cy = h / 2 + Math.cos(S.t * 1.3) * h * 0.05 * S.all;
    const R = Math.hypot(w, h) * 0.62;

    const HOT = hotInk(P1);
    g2d.fillStyle = scrim(0.45);
    g2d.fillRect(0, 0, w, h);
    const bg = g2d.createRadialGradient(cx, cy, 0, cx, cy, Math.max(0.001, R));
    bg.addColorStop(0, P1(0.10 + 0.10 * S.all));
    bg.addColorStop(0.55, P2(0.04 + 0.04 * S.all));
    bg.addColorStop(1, scrim(0.30));
    g2d.fillStyle = bg; g2d.fillRect(0, 0, w, h);

    // the rings, each turning in its own direction at its own speed
    const rings = 15;
    for (let k = rings; k >= 1; k--) {
      const u = k / rings;
      const dir = k % 2 ? 1 : -1;
      const ph = S.t * (0.30 + 0.85 * (1 - u)) * dir + k * 0.6;
      const rr = R * Math.pow(u, 1.5) * (0.72 + 0.32 * S.low) + S.beat * R * 0.05;
      const P = (k % 2) ? P1 : P2;
      const seg = 5 + (k % 3);
      const gap = (Math.PI * 2) / seg;
      const bright = 0.18 + 0.62 * (1 - u) * (0.4 + 0.6 * S.mid);
      g2d.lineCap = "round";
      g2d.lineWidth = Math.max(1 * dpr, (1 + 4 * (1 - u)) * dpr);
      for (let s = 0; s < seg; s++) {
        const a0 = ph + s * gap;
        g2d.beginPath();
        g2d.arc(cx, cy, rr, a0, a0 + gap * 0.62);
        g2d.strokeStyle = P(bright * 0.22);
        g2d.lineWidth = Math.max(2 * dpr, (2 + 8 * (1 - u)) * dpr);
        g2d.stroke();
        g2d.strokeStyle = P(bright);
        g2d.lineWidth = Math.max(1 * dpr, (1 + 4 * (1 - u)) * dpr);
        g2d.stroke();
      }
      g2d.lineCap = "butt";
    }

    // the spokes, flying past
    const spokes = 30;
    for (let k = 0; k < spokes; k++) {
      const a = (k / spokes) * Math.PI * 2 + S.t * (k % 2 ? 0.5 : -0.8);
      const r0 = R * (0.10 + 0.5 * ((k * 7919) % 100) / 100);
      const len = R * (0.04 + 0.20 * S.high);
      const x0 = cx + Math.cos(a) * r0, y0 = cy + Math.sin(a) * r0;
      const x1 = cx + Math.cos(a) * (r0 + len), y1 = cy + Math.sin(a) * (r0 + len);
      g2d.strokeStyle = (k % 2 ? P1 : P2)(0.10 + 0.45 * S.high);
      g2d.lineWidth = Math.max(0.8 * dpr, 1.8 * dpr);
      g2d.lineCap = "round";
      g2d.beginPath(); g2d.moveTo(x0, y0); g2d.lineTo(x1, y1); g2d.stroke();
      g2d.lineCap = "butt";
    }

    // the bokeh: lights out of focus, drifting and breathing
    for (let k = 0; k < 16; k++) {
      const r1 = ((Math.sin(k * 12.9898) * 43758.5453) % 1 + 1) % 1;
      const r2 = ((Math.sin(k * 78.233) * 12345.6789) % 1 + 1) % 1;
      const ang = r1 * Math.PI * 2 + S.t * 0.15 * (r2 > 0.5 ? 1 : -1);
      const rad = R * (0.20 + 0.55 * r2);
      const x = cx + Math.cos(ang) * rad;
      const y = cy + Math.sin(ang) * rad;
      const br = Math.min(w, h) * (0.02 + 0.045 * Math.abs(Math.sin(S.t * 0.8 + k)));
      const a = (0.05 + 0.14 * S.all) * (k % 3 ? 1 : 0.7);
      const g = g2d.createRadialGradient(x, y, 0, x, y, Math.max(0.001, br));
      g.addColorStop(0, (k % 2 ? P1 : P2)(a * 2));
      g.addColorStop(0.55, (k % 2 ? P1 : P2)(a * 0.8));
      g.addColorStop(1, (k % 2 ? P1 : P2)(0));
      g2d.fillStyle = g;
      g2d.beginPath(); g2d.arc(x, y, Math.max(0.001, br), 0, Math.PI * 2); g2d.fill();
    }

    // the flare in the middle of it, and its rays
    const fr = R * (0.05 + 0.16 * S.low + 0.12 * S.beat);
    const fg = g2d.createRadialGradient(cx, cy, 0, cx, cy, Math.max(0.001, fr));
    fg.addColorStop(0, HOT(0.40 + 0.50 * S.beat));
    fg.addColorStop(0.35, P1(0.35 + 0.30 * S.low));
    fg.addColorStop(1, P1(0));
    g2d.fillStyle = fg;
    g2d.beginPath(); g2d.arc(cx, cy, Math.max(0.001, fr), 0, Math.PI * 2); g2d.fill();
    for (let k = 0; k < 8; k++) {
      const a = (k / 8) * Math.PI * 2 + S.t * 0.35;
      const len = R * (0.10 + 0.28 * S.beat);
      g2d.strokeStyle = HOT(0.05 + 0.18 * S.beat);
      g2d.lineWidth = Math.max(0.8 * dpr, Math.min(w, h) * 0.010);
      g2d.lineCap = "round";
      g2d.beginPath();
      g2d.moveTo(cx + Math.cos(a) * fr * 0.7, cy + Math.sin(a) * fr * 0.7);
      g2d.lineTo(cx + Math.cos(a) * (fr * 0.7 + len), cy + Math.sin(a) * (fr * 0.7 + len));
      g2d.stroke();
      g2d.lineCap = "butt";
    }
    if (S.beat > 0.55) { g2d.fillStyle = `rgba(255,255,255,${0.12 * S.beat})`; g2d.fillRect(0, 0, w, h); }
  }


  // ⚡ 2. CALM — velvet: hills of it, one behind the other, a rim of light
  // along every crest and mist lying in the hollows between them.
  // The camera is bolted down — no layer drifts sideways, nothing pans — and
  // every layer runs off ONE integrated phase, so the swell is continuous.
  // The old version multiplied its accumulated time by the current energy
  // (S.t * drift * (0.4 + 0.8 * S.all)); because that factor changes with the
  // music, the phase jumped every time the level moved, which is exactly the
  // "moves, freezes, moves again" lurch. Accumulating the rate per frame
  // instead makes the rate change smoothly and the position never jump.
  let velvetPhase = 0;
  function drawVelvet(w: number, h: number) {
    const dpr = dprOf();
    const S = ambientSignals(true);
    const P1 = painter(cssVar("--visualizer", "#38bdf8"));
    const P2 = painter(cssVar("--accent", "#0284c7"));
    const HOT = hotInk(P1);
    // one clock for the whole scene: a base rate the swell never drops below,
    // plus what the music adds — integrated, never scaled.
    velvetPhase += S.dt * (0.50 + 1.10 * S.all);

    // the sky
    const sky = g2d.createLinearGradient(0, 0, 0, h);
    sky.addColorStop(0, scrim(0.28));
    sky.addColorStop(1, P2(0.10 + 0.08 * S.all));
    g2d.fillStyle = sky; g2d.fillRect(0, 0, w, h);
    // a low light behind the lot of it, breathing with the bass
    const lg = g2d.createRadialGradient(w * 0.5, h * 1.02, 0, w * 0.5, h * 1.02, Math.max(0.001, Math.hypot(w, h) * 0.6));
    lg.addColorStop(0, P1(0.10 + 0.12 * S.all + 0.10 * S.low));
    lg.addColorStop(1, P1(0));
    g2d.fillStyle = lg; g2d.fillRect(0, 0, w, h);

    // far to near: the distant ones pale and faint, the near ones deep
    const layers = [
      { base: 0.30, amp: 0.055, k: 1.2, sp: 0.55, a: 0.22, P: P1 as (a: number) => string },
      { base: 0.46, amp: 0.085, k: 1.8, sp: -0.75, a: 0.34, P: P2 as (a: number) => string },
      { base: 0.62, amp: 0.115, k: 2.4, sp: 0.95, a: 0.48, P: P1 as (a: number) => string },
      { base: 0.78, amp: 0.145, k: 3.1, sp: -1.20, a: 0.64, P: P2 as (a: number) => string },
      { base: 0.94, amp: 0.175, k: 3.9, sp: 1.45, a: 0.82, P: P1 as (a: number) => string },
    ];
    const steps = 96;
    layers.forEach((L, li) => {
      // the far layers ride the treble, the near ones the bass
      const drive = li < 2 ? S.high : li < 4 ? S.mid : S.low;
      const amp = h * L.amp * (0.55 + 0.85 * S.all + 0.35 * drive);
      const ph = velvetPhase * L.sp;
      // x is never time-dependent: the shape travels in place, the camera
      // does not move.
      const yAt = (u: number) => h * L.base
        - amp * Math.sin(u * Math.PI * L.k + ph + li * 1.7)
        - amp * 0.32 * Math.sin(u * Math.PI * L.k * 2.3 - ph * 0.62);
      // the hill
      g2d.beginPath();
      g2d.moveTo(0, h);
      for (let i = 0; i <= steps; i++) g2d.lineTo((i / steps) * w, yAt(i / steps));
      g2d.lineTo(w, h);
      g2d.closePath();
      const top = h * L.base - amp * 1.35;
      const g = g2d.createLinearGradient(0, top, 0, h);
      const a0 = L.a * (0.7 + 0.3 * S.all);
      g.addColorStop(0, L.P(Math.min(1, a0 * 1.2)));
      g.addColorStop(0.45, L.P(a0));
      g.addColorStop(1, L.P(a0 * 0.5));
      g2d.fillStyle = g;
      g2d.fill();
      // the rim of light along its crest
      g2d.beginPath();
      for (let i = 0; i <= steps; i++) {
        const u = i / steps, x = u * w, y = yAt(u);
        if (i === 0) g2d.moveTo(x, y); else g2d.lineTo(x, y);
      }
      g2d.strokeStyle = HOT(0.05 + 0.14 * S.all + 0.10 * L.a + 0.12 * drive);
      g2d.lineWidth = Math.max(0.8 * dpr, 1.3 * dpr);
      g2d.stroke();
      // and the mist gathered in the hollow behind it
      const my = h * L.base;
      const mg = g2d.createLinearGradient(0, my - h * 0.22, 0, my + h * 0.03);
      mg.addColorStop(0, scrim(0));
      mg.addColorStop(1, scrim(0.14 + 0.10 * S.all));
      g2d.fillStyle = mg;
      g2d.fillRect(0, my - h * 0.22, w, h * 0.25);
    });

    // the dust turning over it — same clock, so it can never stutter either
    for (let k = 0; k < 30; k++) {
      const r1 = ((Math.sin(k * 12.9898) * 43758.5453) % 1 + 1) % 1;
      const r2 = ((Math.sin(k * 78.233) * 12345.6789) % 1 + 1) % 1;
      const x = ((r1 + velvetPhase * (0.006 + 0.014 * r2)) % 1) * w;
      const y = ((r2 + Math.sin(velvetPhase * 0.22 + k) * 0.02) % 1) * h;
      const tw = 0.2 + 0.8 * Math.pow(Math.abs(Math.sin(velvetPhase * 0.8 + k * 2.1)), 3);
      g2d.fillStyle = `rgba(255,255,255,${tw * (0.06 + 0.16 * S.all)})`;
      g2d.beginPath();
      g2d.arc(x, y, Math.max(0.5 * dpr, (0.6 + 0.9 * tw) * dpr), 0, Math.PI * 2);
      g2d.fill();
    }
  }






  // into the dark, over the last of a fire's glow.
  let ashFlakes: { x: number; y: number; vy: number; vx: number; r: number; ph: number; a: number }[] = [];
  // ⚡ 2. CALM — the last of a fire: a low glow under everything, flakes
  // turning over on their way down, embers that have not given up yet and
  // still climb, smoke drifting across the light, and the drift already
  // settled along the bottom.
  let ashEmbers: { x: number; y: number; vy: number; vx: number; r: number; life: number; max: number }[] = [];
  function drawAshes(w: number, h: number) {
    const dpr = dprOf();
    const S = ambientSignals(false);
    const P1 = painter(cssVar("--visualizer", "#38bdf8"));
    const P2 = painter(cssVar("--accent", "#0284c7"));
    const HOT = hotInk(P1);
    g2d.fillStyle = scrim(0.34);
    g2d.fillRect(0, 0, w, h);

    // the last of the glow, low and warm
    const gr = Math.max(w, h) * (0.45 + 0.20 * S.low);
    const gg = g2d.createRadialGradient(w * 0.5, h * 1.05, 0, w * 0.5, h * 1.05, gr);
    gg.addColorStop(0, P1(0.16 + 0.14 * S.low));
    gg.addColorStop(0.4, P2(0.06 + 0.06 * S.low));
    gg.addColorStop(1, P2(0));
    g2d.fillStyle = gg; g2d.fillRect(0, 0, w, h);

    // the smoke, crossing the light
    for (let k = 0; k < 6; k++) {
      const u = ((S.t * (0.012 + 0.018 * Math.abs(Math.sin(k * 2.3))) * (0.4 + S.all) + k * 0.167) % 1.3) - 0.15;
      const x = u * w;
      const y = h * (0.28 + 0.42 * Math.abs(Math.sin(k * 1.7))) + Math.sin(S.t * 0.4 + k) * h * 0.05;
      const rr = Math.min(w, h) * (0.20 + 0.22 * Math.abs(Math.sin(k * 3.1)) + 0.08 * S.all);
      const g = g2d.createRadialGradient(x, y, 0, x, y, Math.max(0.001, rr));
      g.addColorStop(0, scrim(0.05 + 0.05 * S.all));
      g.addColorStop(1, scrim(0));
      g2d.fillStyle = g;
      g2d.beginPath(); g2d.arc(x, y, Math.max(0.001, rr), 0, Math.PI * 2); g2d.fill();
    }

    // the flakes, falling
    const N = Math.max(20, Math.min(90, Math.round((w / dpr) / 16)));
    while (ashFlakes.length < N) {
      ashFlakes.push({
        x: Math.random() * w, y: Math.random() * h,
        vy: h * (0.012 + 0.030 * Math.random()), vx: (Math.random() - 0.5) * w * 0.006,
        r: Math.max(0.7 * dpr, (0.8 + 2.0 * Math.random()) * dpr),
        ph: Math.random() * Math.PI * 2, a: 0.15 + 0.45 * Math.random(),
      });
    }
    if (ashFlakes.length > N) ashFlakes.length = N;
    for (const f of ashFlakes) {
      f.ph += S.dt * 0.7;
      f.y += f.vy * S.dt * (0.4 + 1.3 * S.all);
      f.x += (f.vx + Math.sin(f.ph) * w * 0.004) * S.dt;
      if (f.y > h - f.r) { f.y = h - f.r; f.a -= 0.22 * S.dt; }
      if (f.x < 0) f.x = w; else if (f.x > w) f.x = 0;
      if (f.a <= 0) {
        f.y = -4 * dpr; f.x = Math.random() * w;
        f.a = 0.15 + 0.45 * Math.random();
      }
      const flick = 0.6 + 0.4 * Math.sin(f.ph * 2.3);
      g2d.fillStyle = (Math.round(f.ph) % 2 ? P1 : P2)(f.a * flick * (0.4 + 0.7 * S.all));
      g2d.beginPath(); g2d.arc(f.x, f.y, f.r, 0, Math.PI * 2); g2d.fill();
      // the ones still alight, with a little heat in them
      if (f.a > 0.35) {
        const g = g2d.createRadialGradient(f.x, f.y, 0, f.x, f.y, Math.max(0.001, f.r * 4));
        g.addColorStop(0, P1(f.a * 0.30 * flick * (0.4 + 0.7 * S.all)));
        g.addColorStop(1, P1(0));
        g2d.fillStyle = g;
        g2d.beginPath(); g2d.arc(f.x, f.y, Math.max(0.001, f.r * 4), 0, Math.PI * 2); g2d.fill();
      }
    }

    // the embers that have not given up, still climbing
    if (ashEmbers.length < 22 && Math.random() < 0.4 * (0.3 + S.all)) {
      ashEmbers.push({
        x: w * (0.15 + 0.70 * Math.random()), y: h * (0.96 + 0.04 * Math.random()),
        vy: -h * (0.04 + 0.10 * Math.random()) * (0.4 + S.all),
        vx: (Math.random() - 0.5) * w * 0.01,
        r: Math.max(0.6 * dpr, (0.7 + 1.3 * Math.random()) * dpr),
        life: 0, max: 1.2 + 1.6 * Math.random(),
      });
    }
    const alive: typeof ashEmbers = [];
    for (const e of ashEmbers) {
      e.life += S.dt;
      if (e.life >= e.max) continue;
      alive.push(e);
      const u = e.life / e.max;
      e.vy += h * 0.02 * S.dt;
      e.x += (e.vx + Math.sin(e.life * 3 + e.y * 0.02) * w * 0.004) * S.dt;
      e.y += e.vy * S.dt;
      const a = (1 - u) * (0.25 + 0.55 * S.all);
      const g = g2d.createRadialGradient(e.x, e.y, 0, e.x, e.y, Math.max(0.001, e.r * 3));
      g.addColorStop(0, HOT(a * 0.9));
      g.addColorStop(0.35, P1(a * 0.5));
      g.addColorStop(1, P1(0));
      g2d.fillStyle = g;
      g2d.beginPath(); g2d.arc(e.x, e.y, Math.max(0.001, e.r * 3), 0, Math.PI * 2); g2d.fill();
    }
    ashEmbers = alive;

    // the drift that has settled
    const pg = g2d.createLinearGradient(0, h - h * 0.10, 0, h);
    pg.addColorStop(0, P2(0));
    pg.addColorStop(1, P2(0.14 + 0.10 * S.all));
    g2d.fillStyle = pg; g2d.fillRect(0, h - h * 0.10, w, h * 0.10);
  }

  // ⚡ 2. CALM — underwater: light coming down in shafts through the
  // surface, the swell rolling across in bands, caustics playing over it
  // all, and bubbles going up through the lot of it.
  let swimBubbles: { x: number; y: number; r: number; vy: number; ph: number }[] = [];
  let swimPh: number[] = [];
  function drawSwim(w: number, h: number) {
    const dpr = dprOf();
    const S = ambientSignals(false);
    const P1 = painter(cssVar("--visualizer", "#38bdf8"));
    const P2 = painter(cssVar("--accent", "#0284c7"));
    const HOT = hotInk(P1);
    // the water, deep at the bottom
    const bg = g2d.createLinearGradient(0, 0, 0, h);
    bg.addColorStop(0, P1(0.10 + 0.08 * S.all));
    bg.addColorStop(1, P2(0.26 + 0.14 * S.all));
    g2d.fillStyle = bg; g2d.fillRect(0, 0, w, h);

    // the swell, band over band
    // (The five background light shafts that used to sit behind this were
    // removed on request — the water reads cleaner without them.)
    const bands = 9;
    for (let k = 0; k < bands; k++) {
      const u = (k + 0.5) / bands;
      const yb = h * (0.10 + 0.90 * u);
      const amp = h * (0.02 + 0.05 * u) * (0.4 + 1.1 * S.all);
      const kf = 1.2 + k * 0.4;
      // Integrated phase. The old form multiplied the ever-growing clock
      // by the live energy, so every energy change teleported the swell by
      // clock × delta — the stutter the user saw. Stepping the phase by
      // dt × rate keeps the water fluid at any tempo.
      if (swimPh.length <= k) swimPh.push(k * 1.7);
      swimPh[k] += S.dt * (0.35 + 0.25 * u) * (0.4 + 1.0 * S.all) * (0.6 + 1.4 * S.all) * 2.2;
      const sp = swimPh[k];
      const pt = (v: number) => ({
        x: v * w,
        y: yb + amp * Math.sin(v * Math.PI * kf + sp) + amp * 0.4 * Math.sin(v * Math.PI * kf * 2.1 - sp * 1.3),
      });
      // the body of the wave
      g2d.beginPath();
      g2d.moveTo(0, yb + h);
      for (let i = 0; i <= 70; i++) { const p = pt(i / 70); g2d.lineTo(p.x, p.y); }
      g2d.lineTo(w, yb + h);
      g2d.closePath();
      const g = g2d.createLinearGradient(0, yb - amp, 0, h);
      g.addColorStop(0, P1((0.16 + 0.14 * S.all) * (0.5 + 0.5 * u)));
      g.addColorStop(1, P2((0.05 + 0.05 * S.all)));
      g2d.fillStyle = g;
      g2d.fill();
      // the foam on the crest
      g2d.beginPath();
      for (let i = 0; i <= 70; i++) { const p = pt(i / 70); if (i === 0) g2d.moveTo(p.x, p.y); else g2d.lineTo(p.x, p.y); }
      g2d.strokeStyle = HOT((0.16 + 0.26 * u) * (0.4 + 0.8 * S.all));
      g2d.lineWidth = Math.max(0.7 * dpr, (0.6 + 1.6 * u) * dpr);
      g2d.stroke();
      // and the caustics playing over it
      g2d.beginPath();
      for (let i = 0; i <= 70; i++) {
        const v = i / 70;
        const p = pt(v);
        const c = Math.pow(Math.abs(Math.sin(v * Math.PI * kf * 3.3 - sp * 2.1 + k)), 6);
        if (c < 0.25) { g2d.moveTo(p.x, p.y); continue; }
        g2d.moveTo(p.x, p.y);
        g2d.lineTo(p.x, p.y - amp * 2.2 * c * u);
      }
      g2d.strokeStyle = HOT((0.05 + 0.10 * u) * (0.3 + 0.9 * S.all));
      g2d.lineWidth = Math.max(0.5 * dpr, 1.2 * dpr);
      g2d.stroke();
    }

    // the bubbles, going up
    const want = Math.round(Math.max(14, Math.min(50, (w / dpr) * 0.06)));
    while (swimBubbles.length < want) {
      swimBubbles.push({
        x: Math.random() * w, y: Math.random() * h,
        r: Math.max(1 * dpr, Math.min(w, h) * (0.004 + 0.012 * Math.random())),
        vy: -h * (0.02 + 0.05 * Math.random()), ph: Math.random() * Math.PI * 2,
      });
    }
    if (swimBubbles.length > want) swimBubbles.length = want;
    for (const b of swimBubbles) {
      b.ph += S.dt * 1.6;
      b.y += b.vy * S.dt * (0.4 + 1.0 * S.all);
      b.x += Math.sin(b.ph) * w * 0.003 * S.dt;
      if (b.y < -b.r * 2) { b.y = h + b.r * 2; b.x = Math.random() * w; }
      g2d.strokeStyle = HOT(0.14 + 0.16 * S.all);
      g2d.lineWidth = Math.max(0.4 * dpr, b.r * 0.30);
      g2d.beginPath(); g2d.arc(b.x, b.y, b.r, 0, Math.PI * 2); g2d.stroke();
      g2d.fillStyle = HOT(0.06 + 0.08 * S.all);
      g2d.beginPath(); g2d.arc(b.x, b.y, b.r, 0, Math.PI * 2); g2d.fill();
      g2d.fillStyle = HOT(0.20 + 0.20 * S.all);
      g2d.beginPath(); g2d.arc(b.x - b.r * 0.3, b.y - b.r * 0.35, Math.max(0.3 * dpr, b.r * 0.28), 0, Math.PI * 2); g2d.fill();
    }
  }

  // band of the spectrum. Every beat sends a ring out across them.
  // pulled down further each time the music lands.
  // a shadow that disagrees with it.
  // each beat throwing a new one out from the middle.
  // and shrinking, the whole surface breathing under it.
  // and curving long after the source has moved on.
  // music and some of them not coming back.
  // and the beat decides when the next one goes.
  // landing on the beat.
  let chargeStreaks: { x: number; y: number; len: number; sp: number; a: number }[] = [];
  // ⚡ 1. ENERGETIC — a charge: streaks caught in a vortex and flung outward,
  // each with a bright head and a tail that falls away behind it, rings
  // breaking out of the middle on every beat, and the focus it all runs
  // from burning at the centre.
  function drawCharge(w: number, h: number) {
    const dpr = dprOf();
    const S = punchSignals(64);
    const P1 = painter(cssVar("--visualizer", "#38bdf8"));
    const P2 = painter(cssVar("--accent", "#0284c7"));
    const HOT = hotInk(P1);
    const bg = g2d.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, Math.max(0.001, Math.hypot(w, h) * 0.55));
    bg.addColorStop(0, P2(0.10 + 0.10 * S.all));
    bg.addColorStop(1, scrim(0.45));
    g2d.fillStyle = bg; g2d.fillRect(0, 0, w, h);
    const cx = w / 2, cy = h / 2;
    const N = Math.max(50, Math.min(160, Math.round((w / dpr) / 9)));
    while (chargeStreaks.length < N) {
      chargeStreaks.push({
        x: Math.random() * w, y: Math.random() * h,
        len: 0, sp: 0.4 + Math.random(), a: 0.3 + 0.7 * Math.random(),
      });
    }
    if (chargeStreaks.length > N) chargeStreaks.length = N;
    const rush = 0.35 + 1.8 * S.all + 1.2 * S.beat;
    const twist = 0.35 + 0.55 * S.mid;          // how hard the vortex is turning
    g2d.lineCap = "round";
    for (const s of chargeStreaks) {
      const dx = s.x - cx, dy = s.y - cy;
      const d2 = Math.hypot(dx, dy) || 1;
      const ux = dx / d2, uy = dy / d2;
      // outward, and a little sideways, so the whole field turns
      const step = s.sp * rush * Math.min(w, h) * 0.35 * S.dt;
      s.x += (ux - uy * twist * 0.4) * step;
      s.y += (uy + ux * twist * 0.4) * step;
      if (s.x < 0 || s.x > w || s.y < 0 || s.y > h || d2 < Math.min(w, h) * 0.02) {
        const a = Math.random() * Math.PI * 2, rr = Math.min(w, h) * 0.03 * Math.random();
        s.x = cx + Math.cos(a) * rr; s.y = cy + Math.sin(a) * rr;
      }
      s.len = Math.min(w, h) * (0.02 + 0.10 * s.sp) * (0.4 + 1.4 * S.all + 1.0 * S.beat);
      // the tail, falling away behind the head
      const tx = s.x - (ux - uy * twist * 0.4) * s.len;
      const ty = s.y - (uy + ux * twist * 0.4) * s.len;
      const g = g2d.createLinearGradient(s.x, s.y, tx, ty);
      g.addColorStop(0, HOT(s.a * (0.35 + 0.45 * S.all)));
      g.addColorStop(0.35, P1(s.a * (0.30 + 0.45 * S.all)));
      g.addColorStop(1, P1(0));
      g2d.strokeStyle = g;
      g2d.lineWidth = Math.max(0.6 * dpr, 1.5 * dpr);
      g2d.beginPath(); g2d.moveTo(s.x, s.y); g2d.lineTo(tx, ty); g2d.stroke();
    }
    g2d.lineCap = "butt";
    // the rings, breaking out of the middle
    for (let k = 0; k < 3; k++) {
      const u = (((S.t * 0.55) + k * 0.333) % 1);
      const rr = u * Math.hypot(w, h) * 0.5;
      g2d.strokeStyle = P1((1 - u) * (0.10 + 0.20 * S.beat) * (0.4 + 0.8 * S.all));
      g2d.lineWidth = Math.max(0.8 * dpr, Math.min(w, h) * 0.014 * (1 - u));
      g2d.beginPath(); g2d.arc(cx, cy, Math.max(0.001, rr), 0, Math.PI * 2); g2d.stroke();
    }
    // the focus it is all running from
    const fr = Math.max(0.001, Math.min(w, h) * (0.10 + 0.12 * S.beat + 0.06 * S.low));
    const g = g2d.createRadialGradient(cx, cy, 0, cx, cy, fr);
    g.addColorStop(0, HOT(0.45 + 0.40 * S.beat));
    g.addColorStop(0.4, P1((0.25 + 0.25 * S.beat) * (0.4 + 0.8 * S.all)));
    g.addColorStop(1, P1(0));
    g2d.fillStyle = g;
    g2d.beginPath(); g2d.arc(cx, cy, fr, 0, Math.PI * 2); g2d.fill();
    // and the spokes it throws on the beat
    if (S.beat > 0.05) {
      for (let k = 0; k < 10; k++) {
        const ang = (k / 10) * Math.PI * 2 + S.t * 0.4;
        const len = Math.min(w, h) * (0.04 + 0.20 * S.beat);
        g2d.strokeStyle = HOT(S.beat * 0.28);
        g2d.lineWidth = Math.max(0.6 * dpr, Math.min(w, h) * 0.008);
        g2d.beginPath();
        g2d.moveTo(cx + Math.cos(ang) * fr * 0.8, cy + Math.sin(ang) * fr * 0.8);
        g2d.lineTo(cx + Math.cos(ang) * (fr * 0.8 + len), cy + Math.sin(ang) * (fr * 0.8 + len));
        g2d.stroke();
      }
    }
  }

  // 9. STREET — a tag going up: strokes laid down one at a time, in time
  // with the track, the paint still wet and running.

  // =====================================================================
  // RAIN SUITE — six professional scenes around the single idea of rain.
  // All run on punchSignals(), so every one of them hears the beat.
  // =====================================================================



  // RAIN 3 — PUDDLE RIPPLES. A top-down sheet of wet asphalt; raindrops land
  // at a rate that follows the music and throw expanding, interfering rings
  // drawn additively, each ring tinted by its own slice of the spectrum.
  let pudDrops: { x: number; y: number; r: number; v: number; life: number; band: number }[] = [];
  function drawPuddles(w: number, h: number) {
    const dpr = dprOf();
    const S = punchSignals(28);
    const P1 = painter(cssVar("--visualizer", "#38bdf8"));
    const P2 = painter(cssVar("--accent", "#0284c7"));
    const HOT = hotInk(P1);
    const bg = g2d.createLinearGradient(0, 0, 0, h);
    bg.addColorStop(0, scrim(0.5));
    bg.addColorStop(1, P2(0.08 + 0.06 * S.all));
    g2d.fillStyle = bg; g2d.fillRect(0, 0, w, h);
    const sh = g2d.createLinearGradient(0, 0, w, 0);
    sh.addColorStop(0, P1(0));
    sh.addColorStop(0.5, P1(0.05 + 0.08 * S.high));
    sh.addColorStop(1, P1(0));
    g2d.fillStyle = sh; g2d.fillRect(0, 0, w, h);
    const rate = 2 + 14 * S.all;
    if (Math.random() < rate * S.dt) pudDrops.push({ x: Math.random() * w, y: Math.random() * h, r: 0, v: Math.min(w, h) * (0.25 + 0.3 * Math.random()), life: 1, band: Math.random() });
    if (S.hit) pudDrops.push({ x: Math.random() * w, y: Math.random() * h, r: 0, v: Math.min(w, h) * (0.5 + 0.4 * S.low), life: 1, band: S.low });
    if (pudDrops.length > 40) pudDrops.splice(0, pudDrops.length - 40);
    g2d.globalCompositeOperation = "lighter";
    for (let i = pudDrops.length - 1; i >= 0; i--) {
      const d = pudDrops[i];
      d.r += d.v * S.dt;
      d.life -= S.dt * (0.5 + 0.4 * (d.r / Math.min(w, h)));
      if (d.life <= 0) { pudDrops.splice(i, 1); continue; }
      const col = bandAt(S.d, d.band);
      for (let ring = 0; ring < 3; ring++) {
        const rr2 = d.r - ring * Math.min(w, h) * 0.02;
        if (rr2 <= 0) continue;
        const a = d.life * (0.30 - ring * 0.09) * (0.4 + 0.8 * col);
        g2d.strokeStyle = (ring === 0 ? HOT : P1)(a);
        g2d.lineWidth = Math.max(0.5 * dpr, (1.4 - ring * 0.4) * dpr * d.life);
        g2d.beginPath();
        g2d.ellipse(d.x, d.y, rr2, rr2 * 0.42, 0, 0, Math.PI * 2);
        g2d.stroke();
      }
      g2d.fillStyle = HOT(0.4 * d.life * d.life);
      g2d.beginPath(); g2d.arc(d.x, d.y, Math.max(0.4 * dpr, 1.6 * dpr * d.life), 0, Math.PI * 2); g2d.fill();
    }
    g2d.globalCompositeOperation = "source-over";
  }






  function draw() {
    const w = canvas.width, h = canvas.height;
    if (!w || !h) return;
    clearFrame();
    if (mode === "Oscilloscope") {
      drawWave();
      return;
    }
    // Ambient & beat-driven scenes (they manage their own signals/particles).
    if (mode === "Aurora" || mode === "Aurora II") return drawAurora(w, h, mode === "Aurora II");
    if (mode === "Tide" || mode === "Tide II") return drawTide(w, h, mode === "Tide II");
    if (mode === "Ripples") return drawRipples(w, h);
    if (mode === "Petals") return drawPetals(w, h);
    if (mode === "Fireflies") return drawFireflies(w, h);
    if (mode === "Lantern") return drawLantern(w, h);
    if (mode === "Wildflower Meadow") return drawMeadow(w, h);
    if (mode === "Bubbles") return drawBubbles(w, h);
    if (mode === "Sparks") return drawSparks(w, h);
    if (mode === "Glitch") return drawGlitch(w, h);
    if (mode === "Quake") return drawQuake(w, h);
    if (mode === "Shards") return drawShards(w, h);


    if (mode === "Warp Drive") return drawWarp(w, h);

    if (mode === "Triumph") return drawTriumph(w, h);


    if (mode === "Disco") return drawDisco(w, h);



    if (mode === "Carnival") return drawCarnival(w, h);

    if (mode === "Velvet") return drawVelvet(w, h);





    if (mode === "Ashes") return drawAshes(w, h);


    if (mode === "Waves") return drawSwim(w, h);


    if (mode === "Charge") return drawCharge(w, h);

    if (mode === "Puddle Ripples") return drawPuddles(w, h);


    // A skin can override the number of bars/columns via data-bars="N" on the
    // visualizer element; otherwise each mode uses its own sensible default.
    const defaultN = mode === "Classic Bars" ? 16
      : mode === "Thin Bars" ? 56
      : mode === "Spectrum Line" ? 64
      : mode === "Spectrum Wave" ? 72
      : mode === "Block Equalizer" ? 22
      : mode === "Radial Sunburst" ? 30
      : mode === "Dot Matrix" ? 36
      : 24;
    const custom = parseInt(container?.dataset.bars || "", 10);
    const n = Number.isFinite(custom) && custom > 0 ? custom : defaultN;
    const data = getLevels(n);
    if (mode === "Classic Bars") drawBars(data, w, h, 0.34);
    else if (mode === "Thin Bars") drawBars(data, w, h, 0.32);
    else if (mode === "Spectrum Line") drawLine(data, w, h);
    else if (mode === "Mirror Bars") drawMirror(data, w, h);
    else if (mode === "Spectrum Wave") drawSpectrumWave(data, w, h);
    else if (mode === "Block Equalizer") drawBlocks(data, w, h);
    else if (mode === "Radial Sunburst") drawRadial(data, w, h);
    else if (mode === "Dot Matrix") drawDots(data, w, h);
  }

  function loop() {
    raf = requestAnimationFrame(loop);
    draw();
  }
  function startLoop() {
    if (externallyPaused) return;
    if (!raf) loop();
  }

  function setMode(m: VizMode, silent = false) {
    mode = m;
    levels = [];
    peakHold = [];
    localStorage.setItem("melo-viz-mode", m);
  }

  function buildMenu() {
    if (menuEl) return menuEl;
    menuEl = document.createElement("div");
    menuEl.className = "viz-menu";
    menuEl.style.display = "none";
    document.body.appendChild(menuEl);
    return menuEl;
  }
  function renderMenu() {
    const m = buildMenu();
    const enabled = getEnabledVizModes();
    const items = VIZ_MODES.filter((x) => enabled.includes(x.id));
    m.innerHTML =
      `<div class="viz-menu-label">Visualizer type</div>` +
      items.map(
        (x) =>
          `<button class="viz-menu-item ${x.id === mode ? "active" : ""}" data-mode="${x.id}">${x.id === mode ? "✓" : ""}<span>${x.label}</span></button>`
      ).join("") +
      `<div class="viz-menu-hint">Disabled ones can be re-enabled in Settings → Visualizer</div>`;
    m.querySelectorAll("[data-mode]").forEach((b) => {
      (b as HTMLElement).addEventListener("click", (e) => {
        e.stopPropagation();
        setMode((b as HTMLElement).dataset.mode as VizMode);
        hideMenu();
      });
    });
  }
  function showMenu(x: number, y: number) {
    renderMenu();
    const m = menuEl!;
    m.style.display = "block";
    const r = m.getBoundingClientRect();
    m.style.left = Math.max(8, Math.min(x, window.innerWidth - r.width - 8)) + "px";
    m.style.top = Math.max(8, Math.min(y, window.innerHeight - r.height - 8)) + "px";
  }
  function hideMenu() {
    if (menuEl) menuEl.style.display = "none";
  }

  function bindContainer() {
    if (!container) return;
    container.title = "Click: next mode • Right-click: choose mode";
    // Property assignment (NOT addEventListener): skin apply/reset paths
    // re-run bindContainer through rebind() on the very same element, and
    // stacked listeners made every click advance the mode by TWO steps
    // (1 → 3 → 5). Assignment overwrites, so duplicates are impossible.
    container.onclick = () => {
      hideMenu();
      const enabled = getEnabledVizModes();
      const idx = enabled.findIndex((m) => m === mode);
      setMode(enabled[(idx + 1) % enabled.length]);
    };
    container.oncontextmenu = (e) => {
      e.preventDefault();
      e.stopPropagation();
      showMenu(e.clientX, e.clientY);
    };
  }
  document.addEventListener("click", (e) => {
    if (menuEl && menuEl.style.display !== "none" && !menuEl.contains(e.target as Node)) hideMenu();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") hideMenu();
  });

  function start() {
    ensure();
    startLoop();
    if (audioCtx?.state === "suspended") audioCtx.resume().catch(() => {});
  }

  audio.addEventListener("play", start);
  start();
  bindContainer();
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      cancelAnimationFrame(raf);
      raf = 0;
    } else startLoop();
  });

  function rebind() {
    cancelAnimationFrame(raf);
    raf = 0;
    container = getContainer();
    if (!container) return;
    canvas = ensureCanvas(container);
    g2d = canvas.getContext("2d")!;
    new ResizeObserver(resize).observe(canvas);
    resize();
    bindContainer();
    startLoop();
  }
  (window as any).__LUMI_REBIND_VISUALIZER__ = rebind;

  function setExternallyPaused(paused: boolean) {
    externallyPaused = paused;
    if (paused) {
      cancelAnimationFrame(raf);
      raf = 0;
    } else if (!document.hidden) {
      startLoop();
    }
  }
  (window as any).__MELO_VISUALIZER_SET_PAUSED__ = setExternallyPaused;

  busOn("melo:viz-pref-changed", () => {
    fx = fxFromStorage();
    const enabled = getEnabledVizModes();
    if (!enabled.includes(mode)) {
      setMode(enabled[0], true);
      if (!getContainer()?.contains(canvas)) return;
    }
  });
}
