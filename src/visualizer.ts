import { getAudioGraph } from "./audio-graph";
import { busOn } from "./bus";

export type VizMode =
  | "bars" | "thin" | "line" | "mirror" | "wave" | "spectrumWave" | "blocks" | "radial" | "dots"
  | "aurora" | "aurora2" | "bubbles" | "fireflies" | "glitch" | "lantern" | "meadow"
  | "petals" | "quake" | "ripples" | "shards" | "sparks" | "tide" | "tide2";

export const VIZ_MODES: { id: VizMode; label: string }[] = [
  { id: "bars", label: "Classic Bars" },
  { id: "thin", label: "Thin Bars" },
  { id: "line", label: "Spectrum Line" },
  { id: "mirror", label: "Mirror Bars" },
  { id: "wave", label: "Oscilloscope" },
  { id: "spectrumWave", label: "Spectrum Wave" },
  { id: "blocks", label: "Block Equalizer" },
  { id: "radial", label: "Radial Sunburst" },
  { id: "dots", label: "Dot Matrix" },
  // Ambient / beat-driven family.
  { id: "aurora", label: "Aurora" },
  { id: "aurora2", label: "Aurora II" },
  { id: "bubbles", label: "Bubbles" },
  { id: "fireflies", label: "Fireflies" },
  { id: "glitch", label: "Glitch" },
  { id: "lantern", label: "Lantern" },
  { id: "meadow", label: "Wildflower Meadow" },
  { id: "petals", label: "Petals" },
  { id: "quake", label: "Quake" },
  { id: "ripples", label: "Ripples" },
  { id: "shards", label: "Shards" },
  { id: "sparks", label: "Sparks" },
  { id: "tide", label: "Tide" },
  { id: "tide2", label: "Tide II" },
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

  let mode: VizMode = (localStorage.getItem("melo-viz-mode") as VizMode) || "bars";
  // If the saved mode was disabled in Settings, fall back to the first enabled one.
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

  // ---------------------------------------------------------------------

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
      g2d.moveTo(shift - slot, edge);
      for (let i = 0; i < n; i++) {
        const j = fromTop ? n - 1 - i : i;                  // bass on opposite sides so the jaws interlock
        const tipX = (i + (fromTop ? 1 : 0.5)) * slot + shift; // half-slot offset so the teeth interleave
        const tipY = edge + sign * Math.max(2 * dpr, S.d[j] * H + (Math.random() - 0.5) * jit);
        g2d.lineTo(tipX, tipY);
        g2d.lineTo(tipX + slot / 2, edge);
      }
      g2d.lineTo(w + slot, edge);
      g2d.closePath();
      const g = g2d.createLinearGradient(0, edge, 0, edge + sign * H);
      g.addColorStop(0, P2(0.95)); g.addColorStop(0.55, P2(0.8)); g.addColorStop(1, P1(0.5));
      g2d.fillStyle = g; g2d.fill();
      g2d.strokeStyle = P1(0.85); g2d.lineWidth = 1 * dpr; g2d.stroke();

      // Crystal facets: one lit flank per tooth. Without this the jaws are
      // a perfectly uniform sawtooth — geometric, but not a shard.
      for (let i = 0; i < n; i++) {
        const j = fromTop ? n - 1 - i : i;
        const tipX = (i + (fromTop ? 1 : 0.5)) * slot + shift;
        const len = Math.max(2 * dpr, S.d[j] * H);
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

  function draw() {
    const w = canvas.width, h = canvas.height;
    if (!w || !h) return;
    clearFrame();
    if (mode === "wave") {
      drawWave();
      return;
    }
    // Ambient & beat-driven scenes (they manage their own signals/particles).
    if (mode === "aurora" || mode === "aurora2") return drawAurora(w, h, mode === "aurora2");
    if (mode === "tide" || mode === "tide2") return drawTide(w, h, mode === "tide2");
    if (mode === "ripples") return drawRipples(w, h);
    if (mode === "petals") return drawPetals(w, h);
    if (mode === "fireflies") return drawFireflies(w, h);
    if (mode === "lantern") return drawLantern(w, h);
    if (mode === "meadow") return drawMeadow(w, h);
    if (mode === "bubbles") return drawBubbles(w, h);
    if (mode === "sparks") return drawSparks(w, h);
    if (mode === "glitch") return drawGlitch(w, h);
    if (mode === "quake") return drawQuake(w, h);
    if (mode === "shards") return drawShards(w, h);
    // A skin can override the number of bars/columns via data-bars="N" on the
    // visualizer element; otherwise each mode uses its own sensible default.
    const defaultN = mode === "bars" ? 16
      : mode === "thin" ? 56
      : mode === "line" ? 64
      : mode === "spectrumWave" ? 72
      : mode === "blocks" ? 22
      : mode === "radial" ? 30
      : mode === "dots" ? 36
      : 24;
    const custom = parseInt(container?.dataset.bars || "", 10);
    const n = Number.isFinite(custom) && custom > 0 ? custom : defaultN;
    const data = getLevels(n);
    if (mode === "bars") drawBars(data, w, h, 0.34);
    else if (mode === "thin") drawBars(data, w, h, 0.32);
    else if (mode === "line") drawLine(data, w, h);
    else if (mode === "mirror") drawMirror(data, w, h);
    else if (mode === "spectrumWave") drawSpectrumWave(data, w, h);
    else if (mode === "blocks") drawBlocks(data, w, h);
    else if (mode === "radial") drawRadial(data, w, h);
    else if (mode === "dots") drawDots(data, w, h);
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

  // Live-update from the Settings → Visualizer tab.
  busOn("melo:viz-pref-changed", () => {
    fx = fxFromStorage();
    const enabled = getEnabledVizModes();
    if (!enabled.includes(mode)) {
      setMode(enabled[0], true);
      if (!getContainer()?.contains(canvas)) return;
    }
  });
}
