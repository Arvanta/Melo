import { getAudioGraph } from "./audio-graph";

type VizMode = "bars" | "thin" | "line" | "mirror" | "wave" | "spectrumWave" | "blocks";

export const VIZ_MODES: { id: VizMode; label: string }[] = [
  { id: "bars", label: "Classic Bars" },
  { id: "thin", label: "Thin Bars" },
  { id: "line", label: "Spectrum Line" },
  { id: "mirror", label: "Mirror Bars" },
  { id: "wave", label: "Oscilloscope" },
  { id: "spectrumWave", label: "Spectrum Wave" },
  { id: "blocks", label: "Block Equalizer" },
];

function getContainer(): HTMLElement | null {
  return (
    (document.getElementById("vizBars") as HTMLElement | null) ||
    document.querySelector<HTMLElement>('[data-melo="visualizer"]')
  );
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
  if (!VIZ_MODES.some((m) => m.id === mode)) mode = "bars";

  let raf = 0;
  let levels: number[] = [];
  let slowMax = 0.45;
  let menuEl: HTMLElement | null = null;

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
    for (let i = 0; i < n; i++) {
      const target = Math.min(1, raw[i] / slowMax);
      const a = target > levels[i] ? 0.55 : 0.16;
      levels[i] += (target - levels[i]) * a;
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

  function drawBars(data: number[], w: number, h: number, gapFrac: number) {
    const dpr = dprOf();
    const c1 = cssVar("--visualizer", "#38bdf8");
    const c2 = cssVar("--accent", "#0284c7");
    const n = data.length, slot = w / n;
    const bw = Math.max(1.2 * dpr, slot * (1 - gapFrac));
    for (let i = 0; i < n; i++) {
      const v = data[i];
      const bh = Math.max(2 * dpr, v * (h - 4 * dpr));
      const x = i * slot + (slot - bw) / 2, y = h - bh - 1 * dpr;
      const grad = g2d.createLinearGradient(0, y, 0, h);
      grad.addColorStop(0, c2);
      grad.addColorStop(1, c1);
      g2d.fillStyle = grad;
      g2d.beginPath();
      rr(x, y, bw, bh, Math.min(bw / 2, 3.5 * dpr));
      g2d.fill();
    }
  }

  function drawMirror(data: number[], w: number, h: number) {
    const dpr = dprOf();
    const c1 = cssVar("--visualizer", "#38bdf8");
    const c2 = cssVar("--accent", "#0284c7");
    const n = data.length, slot = w / n, mid = h / 2;
    const bw = Math.max(1.5 * dpr, slot * 0.62);
    for (let i = 0; i < n; i++) {
      const bh = Math.max(1.5 * dpr, data[i] * (h / 2 - 3 * dpr));
      const x = i * slot + (slot - bw) / 2;
      const grad = g2d.createLinearGradient(0, mid - bh, 0, mid + bh);
      grad.addColorStop(0, c2);
      grad.addColorStop(0.5, c1);
      grad.addColorStop(1, c2);
      g2d.fillStyle = grad;
      g2d.beginPath();
      rr(x, mid - bh, bw, bh * 2, Math.min(bw / 2, 3 * dpr));
      g2d.fill();
    }
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
    fill.addColorStop(0, c1);
    fill.addColorStop(1, "transparent");
    g2d.globalAlpha = 0.18;
    g2d.fillStyle = fill;
    g2d.fill();
    g2d.globalAlpha = 1;

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
    fill.addColorStop(0, c2);
    fill.addColorStop(0.5, c1);
    fill.addColorStop(1, c2);
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
    grad.addColorStop(0, c2);
    grad.addColorStop(1, c1);
    g2d.fillStyle = grad;

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
  }

  function draw() {
    const w = canvas.width, h = canvas.height;
    if (!w || !h) return;
    g2d.clearRect(0, 0, w, h);
    if (mode === "wave") {
      drawWave();
      return;
    }
    // A skin can override the number of bars/columns via data-bars="N" on the
    // visualizer element; otherwise each mode uses its own sensible default.
    const defaultN = mode === "bars" ? 16
      : mode === "thin" ? 56
      : mode === "line" ? 64
      : mode === "spectrumWave" ? 72
      : mode === "blocks" ? 22
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
  }

  function loop() {
    raf = requestAnimationFrame(loop);
    draw();
  }
  function startLoop() {
    if (!raf) loop();
  }

  function setMode(m: VizMode, silent = false) {
    mode = m;
    levels = [];
    localStorage.setItem("melo-viz-mode", m);
    // Mode changes are intentionally silent; the selected item is already
    // indicated in the visualizer menu.
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
    m.innerHTML =
      `<div class="viz-menu-label">Visualizer type</div>` +
      VIZ_MODES.map(
        (x) =>
          `<button class="viz-menu-item ${x.id === mode ? "active" : ""}" data-mode="${x.id}">${x.id === mode ? "✓" : ""}<span>${x.label}</span></button>`
      ).join("");
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
    container.addEventListener("click", () => {
      hideMenu();
      const idx = VIZ_MODES.findIndex((m) => m.id === mode);
      setMode(VIZ_MODES[(idx + 1) % VIZ_MODES.length].id);
    });
    container.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      e.stopPropagation();
      showMenu(e.clientX, e.clientY);
    });
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
}
