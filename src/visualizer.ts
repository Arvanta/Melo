import { getAudioGraph } from "./audio-graph";
import { busOn } from "./bus";

export type VizMode = "bars" | "thin" | "line" | "mirror" | "wave" | "spectrumWave" | "blocks" | "radial" | "lissajous" | "dots";

export const VIZ_MODES: { id: VizMode; label: string }[] = [
  { id: "bars", label: "Classic Bars" },
  { id: "thin", label: "Thin Bars" },
  { id: "line", label: "Spectrum Line" },
  { id: "mirror", label: "Mirror Bars" },
  { id: "wave", label: "Oscilloscope" },
  { id: "spectrumWave", label: "Spectrum Wave" },
  { id: "blocks", label: "Block Equalizer" },
  { id: "radial", label: "Radial Sunburst" },
  { id: "lissajous", label: "Lissajous XY" },
  { id: "dots", label: "Dot Matrix" },
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

  function drawPeaks(data: number[], h: number, bw: number, slot: number) {
    if (!fx.peak) return;
    const dpr = dprOf();
    const c1 = cssVar("--visualizer", "#38bdf8");
    g2d.fillStyle = mix(c1, "#ffffff", 0.35);
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
    const c2 = cssVar("--accent", "#0284c7");
    const n = data.length, slot = w / n;
    const bw = Math.max(1.2 * dpr, slot * (1 - gapFrac));
    // Mirror fade reserves a thin zone at the bottom for the reflection.
    const mirH = fx.mirrorFade ? Math.max(6 * dpr, Math.min(h * 0.22, 12 * dpr)) : 0;
    const base = h - mirH - 1 * dpr;
    const topC = fx.pale ? mix(c2, "#ffffff", 0.35) : c2;
    if (fx.bloom) { g2d.shadowColor = c1; g2d.shadowBlur = 6 * dpr; }
    for (let i = 0; i < n; i++) {
      const v = data[i];
      const bh = Math.max(2 * dpr, v * (base - 2 * dpr));
      const x = i * slot + (slot - bw) / 2, y = base - bh;
      const grad = g2d.createLinearGradient(0, y, 0, base);
      grad.addColorStop(0, topC);
      grad.addColorStop(1, c1);
      g2d.fillStyle = grad;
      // Pale tops: bars that reach high fade slightly + shift color.
      if (fx.pale && v > 0.72) g2d.globalAlpha = 1 - (v - 0.72) * 0.8;
      g2d.beginPath();
      rr(x, y, bw, bh, Math.min(bw / 2, 3.5 * dpr));
      g2d.fill();
      if (mirH > 0) {
        // Very subtle inverted reflection below the baseline.
        g2d.globalAlpha = 0.14;
        g2d.beginPath();
        rr(x, base + 1 * dpr, bw, Math.max(1.5 * dpr, bh * 0.24), Math.min(bw / 2, 2 * dpr));
        g2d.fill();
        g2d.globalAlpha = 1;
      }
      g2d.globalAlpha = 1;
    }
    g2d.shadowBlur = 0;
    drawPeaks(data, base, bw, slot);
  }

  function drawMirror(data: number[], w: number, h: number) {
    const dpr = dprOf();
    const c1 = cssVar("--visualizer", "#38bdf8");
    const c2 = cssVar("--accent", "#0284c7");
    const n = data.length, slot = w / n, mid = h / 2;
    const bw = Math.max(1.5 * dpr, slot * 0.62);
    const topC = fx.pale ? mix(c2, "#ffffff", 0.35) : c2;
    if (fx.bloom) { g2d.shadowColor = c1; g2d.shadowBlur = 5 * dpr; }
    for (let i = 0; i < n; i++) {
      const bh = Math.max(1.5 * dpr, data[i] * (h / 2 - 3 * dpr));
      const x = i * slot + (slot - bw) / 2;
      const grad = g2d.createLinearGradient(0, mid - bh, 0, mid + bh);
      grad.addColorStop(0, topC);
      grad.addColorStop(0.5, c1);
      grad.addColorStop(1, topC);
      g2d.fillStyle = grad;
      if (fx.pale && data[i] > 0.72) g2d.globalAlpha = 1 - (data[i] - 0.72) * 0.8;
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
    const c2 = cssVar("--accent", "#0284c7");
    const n = data.length;
    const px: number[] = [], py: number[] = [];
    for (let i = 0; i < n; i++) {
      px.push(((i + 0.5) / n) * w);
      py.push(h - 2 * dpr - data[i] * (h - 8 * dpr));
    }
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
    fill.addColorStop(0, fx.pale ? mix(c1, "#ffffff", 0.4) : c1);
    fill.addColorStop(1, "transparent");
    g2d.globalAlpha = 0.18;
    g2d.fillStyle = fill;
    g2d.fill();
    g2d.globalAlpha = 1;

    if (fx.bloom) { g2d.shadowColor = c2; g2d.shadowBlur = 6 * dpr; }
    g2d.beginPath();
    g2d.moveTo(px[0], py[0]);
    for (let i = 1; i < n; i++) {
      const cx = (px[i - 1] + px[i]) / 2;
      g2d.quadraticCurveTo(px[i - 1], py[i - 1], cx, (py[i - 1] + py[i]) / 2);
    }
    g2d.lineTo(px[n - 1], py[n - 1]);
    g2d.strokeStyle = c2;
    g2d.lineWidth = 2 * dpr;
    g2d.lineJoin = "round";
    g2d.stroke();
    g2d.shadowBlur = 0;
  }

  // Mirrored, connected spectrum around a horizontal centre line.
  // It follows the form of an audio waveform while still reacting to FFT
  // energy, and uses the same accent variables as every other mode.
  function drawSpectrumWave(data: number[], w: number, h: number) {
    const dpr = dprOf();
    const c1 = cssVar("--visualizer", "#38bdf8");
    const c2 = cssVar("--accent", "#0284c7");
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
    fill.addColorStop(0, fx.pale ? mix(c2, "#ffffff", 0.35) : c2);
    fill.addColorStop(0.5, c1);
    fill.addColorStop(1, fx.pale ? mix(c2, "#ffffff", 0.35) : c2);
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
    trace(true); g2d.strokeStyle = c2; g2d.lineWidth = 1.2 * dpr; g2d.stroke();
    trace(false); g2d.stroke();
    g2d.beginPath();
    g2d.moveTo(0, mid); g2d.lineTo(w, mid);
    g2d.strokeStyle = c1; g2d.globalAlpha = 0.45;
    g2d.lineWidth = 0.8 * dpr; g2d.stroke();
    g2d.globalAlpha = 1;
  }

  // Quantized square-cell equalizer. Each frequency column is built from
  // discrete blocks instead of a continuous bar.
  function drawBlocks(data: number[], w: number, h: number) {
    const dpr = dprOf();
    const c1 = cssVar("--visualizer", "#38bdf8");
    const c2 = cssVar("--accent", "#0284c7");
    const cols = data.length;
    const rows = 8;
    const colGap = Math.max(1 * dpr, w * 0.0035);
    const rowGap = Math.max(1 * dpr, h * 0.025);
    const cellW = Math.max(1, (w - colGap * (cols - 1)) / cols);
    const cellH = Math.max(1, (h - rowGap * (rows - 1)) / rows);
    const grad = g2d.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, fx.pale ? mix(c2, "#ffffff", 0.35) : c2);
    grad.addColorStop(1, c1);
    g2d.fillStyle = grad;
    if (fx.bloom) { g2d.shadowColor = c1; g2d.shadowBlur = 4 * dpr; }

    for (let i = 0; i < cols; i++) {
      const lit = Math.max(1, Math.min(rows, Math.round(data[i] * rows)));
      const x = i * (cellW + colGap);
      for (let r = 0; r < lit; r++) {
        const y = h - (r + 1) * cellH - r * rowGap;
        g2d.globalAlpha = 0.58 + 0.42 * ((r + 1) / rows);
        g2d.fillRect(x, y, cellW, cellH);
      }
    }
    g2d.globalAlpha = 1;
    g2d.shadowBlur = 0;
    drawPeaks(data, h, cellW, cellW + colGap);
  }

  function drawWave() {
    const w = canvas.width, h = canvas.height;
    const dpr = dprOf();
    const c2 = cssVar("--accent", "#0284c7");
    let td: Uint8Array;
    if (useFake || !analyser || !timeData) {
      if (!fakeWaveData) fakeWaveData = new Uint8Array(1024);
      fakeWave(fakeWaveData);
      td = fakeWaveData;
    } else {
      analyser.getByteTimeDomainData(timeData as any);
      td = timeData;
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
    if (fx.bloom) { g2d.shadowColor = c2; g2d.shadowBlur = 6 * dpr; }
    path();
    g2d.strokeStyle = c2;
    g2d.globalAlpha = 0.16;
    g2d.lineWidth = 6 * dpr;
    g2d.lineJoin = "round";
    g2d.stroke();
    path();
    g2d.globalAlpha = 1;
    g2d.lineWidth = 1.8 * dpr;
    g2d.stroke();
    g2d.shadowBlur = 0;
  }

  // Radial Sunburst — semicircle of rays rising from the bottom centre.
  function drawRadial(data: number[], w: number, h: number) {
    const dpr = dprOf();
    const c1 = cssVar("--visualizer", "#38bdf8");
    const c2 = cssVar("--accent", "#0284c7");
    const cx = w / 2, cy = h - 2 * dpr;
    const R = h - 8 * dpr;
    const n = data.length;
    const slot = Math.PI / n;
    if (fx.bloom) { g2d.shadowColor = c1; g2d.shadowBlur = 5 * dpr; }
    g2d.lineCap = "round";
    for (let i = 0; i < n; i++) {
      const v = data[i];
      const theta = Math.PI + slot * (i + 0.5);
      const len = Math.max(3 * dpr, v * R);
      const x0 = cx + Math.cos(theta) * 2.5 * dpr;
      const y0 = cy + Math.sin(theta) * 2.5 * dpr;
      const x1 = cx + Math.cos(theta) * len;
      const y1 = cy + Math.sin(theta) * len;
      g2d.strokeStyle = mix(c1, c2, v);
      g2d.globalAlpha = fx.pale && v > 0.72 ? 1 - (v - 0.72) * 0.8 : 1;
      g2d.lineWidth = Math.max(2 * dpr, (Math.PI * R * slot) * 0.62);
      g2d.beginPath();
      g2d.moveTo(x0, y0);
      g2d.lineTo(x1, y1);
      g2d.stroke();
    }
    g2d.globalAlpha = 1;
    g2d.shadowBlur = 0;
    g2d.lineCap = "butt";
  }

  // Lissajous XY — closed loop drawn from the waveform with a delay:
  // x = wave(t), y = wave(t - delay). With Afterglow on it turns into a
  // phosphor-style trace.
  function drawLissajous() {
    const w = canvas.width, h = canvas.height;
    const dpr = dprOf();
    const c1 = cssVar("--visualizer", "#38bdf8");
    const c2 = cssVar("--accent", "#0284c7");
    let td: Uint8Array;
    if (useFake || !analyser || !timeData) {
      if (!fakeWaveData) fakeWaveData = new Uint8Array(1024);
      fakeWave(fakeWaveData);
      td = fakeWaveData;
    } else {
      analyser.getByteTimeDomainData(timeData as any);
      td = timeData;
    }
    const N = td.length;
    const delay = Math.max(16, Math.floor(N * 0.07));
    const pad = 6 * dpr;
    const path = () => {
      g2d.beginPath();
      for (let i = 0; i < N; i += 2) {
        const xS = td[i] / 255;
        const yS = td[(i + delay) % N] / 255;
        const x = pad + xS * (w - pad * 2);
        const y = pad + yS * (h - pad * 2);
        if (i === 0) g2d.moveTo(x, y);
        else g2d.lineTo(x, y);
      }
    };
    if (fx.bloom) { g2d.shadowColor = c1; g2d.shadowBlur = 6 * dpr; }
    path();
    g2d.strokeStyle = c1;
    g2d.globalAlpha = 0.35;
    g2d.lineWidth = 3.5 * dpr;
    g2d.lineJoin = "round";
    g2d.stroke();
    path();
    g2d.strokeStyle = c2;
    g2d.globalAlpha = 1;
    g2d.lineWidth = 1.6 * dpr;
    g2d.stroke();
    g2d.shadowBlur = 0;
  }

  // Dot Matrix — grid of dots lit by spectrum energy.
  function drawDots(data: number[], w: number, h: number) {
    const dpr = dprOf();
    const c1 = cssVar("--visualizer", "#38bdf8");
    const c2 = cssVar("--accent", "#0284c7");
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
        g2d.fillStyle = mix(c1, c2, (r + 1) / rows);
        g2d.globalAlpha = 0.5 + 0.5 * ((r + 1) / rows);
        g2d.beginPath();
        g2d.arc(x, y, rad, 0, Math.PI * 2);
        g2d.fill();
      }
    }
    g2d.globalAlpha = 1;
    g2d.shadowBlur = 0;
  }

  function draw() {
    const w = canvas.width, h = canvas.height;
    if (!w || !h) return;
    clearFrame();
    if (mode === "wave") {
      drawWave();
      return;
    }
    if (mode === "lissajous") {
      drawLissajous();
      return;
    }
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
