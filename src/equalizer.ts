import { getAudioGraph, frequencies } from "./audio-graph";
import { busEmit, busOn } from "./bus";

export { frequencies };

export const presets: Record<string, number[]> = {
  flat: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  pop: [-1, 2, 4, 4, 2, -1, -1, 2, 3, 3],
  rock: [4, 3, 2, -1, -2, -2, 1, 3, 4, 4],
  bass: [6, 5, 4, 2, 1, 0, -1, -1, -2, -3],
  treble: [-3, -2, -1, 0, 1, 2, 3, 5, 6, 6],
  dance: [5, 4, 2, 0, -1, -1, 2, 4, 5, 3],
  jazz: [2, 1, 2, 3, 2, 0, 1, 2, 3, 2],
  classical: [3, 2, 1, 0, 0, 0, -1, 2, 3, 4],
  vocal: [-2, -1, 0, 2, 4, 4, 3, 1, 0, -1],
  acoustic: [3, 2, 1, 1, 2, 2, 3, 3, 2, 1],
  hiphop: [5, 4, 1, 2, -1, -1, 1, -1, 2, 3],
  metal: [4, 2, -1, -2, -1, 1, 3, 4, 5, 4],
};

function matchesPreset(gains: number[]): string {
  for (const [key, pVals] of Object.entries(presets)) {
    if (pVals.every((v, i) => v === gains[i])) {
      return key;
    }
  }
  return "custom";
}

export function setupEqualizer(audio: HTMLAudioElement, toast: (m: string) => void, opts: { remote?: boolean } = {}) {
  const remote = !!opts.remote;

  const eqEnable = document.getElementById("eqEnable") as HTMLInputElement | null;
  const eqPreset = document.getElementById("eqPreset") as HTMLSelectElement | null;
  const btnEqReset = document.getElementById("btnEqReset") as HTMLButtonElement | null;
  const eqBandsEl = document.getElementById("eqBands") as HTMLElement | null;
  const eqCanvas = document.getElementById("eqCanvas") as HTMLCanvasElement | null;
  const ctx = eqCanvas ? eqCanvas.getContext("2d") : null;

  let audioCtx: AudioContext | null = null;
  let filters: BiquadFilterNode[] = [];
  let sliders: HTMLInputElement[] = [];

  // Load persisted settings
  let displayGains: number[] = new Array(frequencies.length).fill(0);
  try {
    const saved = JSON.parse(localStorage.getItem("melo-eq-gains") || "null");
    if (Array.isArray(saved) && saved.length === frequencies.length) {
      displayGains = saved.map(v => typeof v === "number" ? Math.max(-12, Math.min(12, v)) : 0);
    }
  } catch {}

  let savedPreset = localStorage.getItem("melo-eq-preset") || matchesPreset(displayGains);
  let enabled = localStorage.getItem("melo-eq-enabled") !== "0";

  // ---------- ENGINE (main window only) ----------
  function ensureContext() {
    if (audioCtx) return;
    try {
      const g = getAudioGraph(audio);
      audioCtx = g.ctx;
      filters = g.filters;
      filters.forEach((f, i) => {
        f.gain.value = enabled ? displayGains[i] : 0;
      });
    } catch { /* graph unavailable */ }
  }

  function engineGain(idx: number, val: number) {
    ensureContext();
    if (filters[idx] && enabled) filters[idx].gain.value = val;
  }

  function engineGains(vals: number[]) {
    ensureContext();
    displayGains = [...vals];
    if (enabled) {
      vals.forEach((v, i) => {
        if (filters[i]) filters[i].gain.value = v;
      });
    }
    drawCurve();
  }

  function engineEnable(on: boolean) {
    ensureContext();
    enabled = on;
    if (!on) {
      filters.forEach(f => { f.gain.value = 0; });
    } else {
      displayGains.forEach((v, i) => {
        if (filters[i]) filters[i].gain.value = v;
      });
    }
    drawCurve();
  }

  if (!remote) {
    if (audio) {
      audio.addEventListener("play", () => {
        ensureContext();
        if (audioCtx?.state === "suspended") audioCtx.resume().catch(() => {});
      });
    }
  }

  // Cross-window event bus sync
  busOn("melo:eq", (p: any) => {
    if (!p) return;
    if (p.type === "gain") {
      if (!remote) engineGain(p.idx, p.val);
      displayGains[p.idx] = p.val;
      if (sliders[p.idx]) {
        sliders[p.idx].value = String(p.val);
        updateValLabel(sliders[p.idx]);
      }
      if (eqPreset) {
        eqPreset.value = matchesPreset(displayGains);
      }
      drawCurve();
    } else if (p.type === "gains") {
      if (!remote) engineGains(p.values);
      displayGains = [...p.values];
      if (sliders.length) {
        sliders.forEach((s, i) => {
          s.value = String(displayGains[i]);
          updateValLabel(s);
        });
      }
      if (eqPreset && p.preset) {
        eqPreset.value = p.preset;
      }
      drawCurve();
    } else if (p.type === "enable") {
      enabled = !!p.on;
      if (!remote) engineEnable(enabled);
      if (eqEnable) eqEnable.checked = enabled;
      drawCurve();
    }
  });

  // ---------- UI ----------
  function updateValLabel(s: HTMLInputElement) {
    const val = parseInt(s.value);
    const el = s.parentElement?.querySelector(".val") as HTMLElement | null;
    if (el) el.textContent = (val > 0 ? "+" : "") + val + "dB";
  }

  function drawCurve() {
    if (!eqCanvas || !ctx) return;
    const dpr = window.devicePixelRatio || 1;
    const w = eqCanvas.clientWidth * dpr;
    const h = eqCanvas.clientHeight * dpr;
    if (w <= 0 || h <= 0) return;
    eqCanvas.width = w; eqCanvas.height = h;
    ctx.clearRect(0, 0, w, h);
    const accent = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || "#2a7bd6";
    const gains = displayGains;

    if (!enabled) {
      ctx.strokeStyle = "rgba(100,120,150,0.25)";
      ctx.lineWidth = 2 * dpr;
      ctx.beginPath(); ctx.moveTo(0, h / 2); ctx.lineTo(w, h / 2); ctx.stroke();
      return;
    }

    ctx.strokeStyle = accent;
    ctx.lineWidth = 2.5 * dpr;
    ctx.lineJoin = "round";
    ctx.beginPath();
    gains.forEach((g, i) => {
      const x = (i / (gains.length - 1)) * w;
      const y = h / 2 - (g / 12) * (h / 2 - 10 * dpr);
      if (i === 0) ctx.moveTo(x, y);
      else {
        const prevX = ((i - 1) / (gains.length - 1)) * w;
        const prevY = h / 2 - (gains[i - 1] / 12) * (h / 2 - 10 * dpr);
        ctx.quadraticCurveTo((prevX + x) / 2, prevY, x, y);
      }
    });
    ctx.stroke();

    gains.forEach((g, i) => {
      const x = (i / (gains.length - 1)) * w;
      const y = h / 2 - (g / 12) * (h / 2 - 10 * dpr);
      ctx.fillStyle = accent;
      ctx.beginPath(); ctx.arc(x, y, 4 * dpr, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "white"; ctx.beginPath(); ctx.arc(x, y, 2 * dpr, 0, Math.PI * 2); ctx.fill();
    });

    ctx.strokeStyle = "rgba(100,120,150,0.3)";
    ctx.lineWidth = 1 * dpr;
    ctx.setLineDash([4 * dpr, 4 * dpr]);
    ctx.beginPath(); ctx.moveTo(0, h / 2); ctx.lineTo(w, h / 2); ctx.stroke();
    ctx.setLineDash([]);
  }

  // Populate band sliders with initial restored values
  if (eqBandsEl) {
    eqBandsEl.innerHTML = "";
    frequencies.forEach((freq, i) => {
      const val = displayGains[i] || 0;
      const band = document.createElement("div");
      band.className = "eq-band";
      band.innerHTML = `
        <input type="range" min="-12" max="12" value="${val}" step="1" data-idx="${i}" orient="vertical" />
        <label>${freq >= 1000 ? (freq / 1000) + "k" : freq}</label>
        <span style="font-size:10px;color:var(--text-muted);min-height:12px;" class="val">${(val > 0 ? "+" : "") + val + "dB"}</span>
      `;
      eqBandsEl.appendChild(band);
    });

    sliders = Array.from(eqBandsEl.querySelectorAll("input")) as HTMLInputElement[];
    sliders.forEach(s => {
      s.addEventListener("input", () => {
        const idx = parseInt(s.dataset.idx!);
        const val = parseInt(s.value);
        updateValLabel(s);
        displayGains[idx] = val;
        drawCurve();

        const matched = matchesPreset(displayGains);
        if (eqPreset) eqPreset.value = matched;

        localStorage.setItem("melo-eq-gains", JSON.stringify(displayGains));
        localStorage.setItem("melo-eq-preset", matched);

        if (!remote) engineGain(idx, val);
        busEmit("melo:eq", { type: "gain", idx, val, values: displayGains });
      });
    });
  }

  if (eqPreset) {
    eqPreset.value = savedPreset;
    eqPreset.addEventListener("change", () => {
      const vals = presets[eqPreset.value] || presets.flat;
      if (sliders.length) {
        sliders.forEach((s, i) => {
          s.value = String(vals[i]);
          updateValLabel(s);
        });
      }
      displayGains = [...vals];
      drawCurve();

      localStorage.setItem("melo-eq-gains", JSON.stringify(displayGains));
      localStorage.setItem("melo-eq-preset", eqPreset.value);

      if (!remote) engineGains(vals);
      busEmit("melo:eq", { type: "gains", values: vals, preset: eqPreset.value });
      toast(`Preset: ${eqPreset.options[eqPreset.selectedIndex].text}`);
    });
  }

  if (btnEqReset) {
    btnEqReset.addEventListener("click", () => {
      const flatVals = presets.flat;
      if (sliders.length) {
        sliders.forEach((s, i) => {
          s.value = "0";
          updateValLabel(s);
        });
      }
      displayGains = [...flatVals];
      if (eqPreset) eqPreset.value = "flat";

      localStorage.setItem("melo-eq-gains", JSON.stringify(displayGains));
      localStorage.setItem("melo-eq-preset", "flat");

      if (!remote) engineGains(flatVals);
      busEmit("melo:eq", { type: "gains", values: flatVals, preset: "flat" });
      drawCurve();
      toast("Equalizer reset to Flat (0dB)");
    });
  }

  if (eqEnable) {
    eqEnable.checked = enabled;
    eqEnable.addEventListener("change", () => {
      enabled = eqEnable.checked;
      localStorage.setItem("melo-eq-enabled", enabled ? "1" : "0");
      if (!remote) engineEnable(enabled);
      busEmit("melo:eq", { type: "enable", on: enabled });
      drawCurve();
      toast(enabled ? "Equalizer On" : "Equalizer off — Flat");
    });
  }

  if (eqCanvas) new ResizeObserver(() => drawCurve()).observe(eqCanvas);
  drawCurve();

  (window as any).MeloEqualizer = (window as any).LumiEqualizer = { presets, frequencies, displayGains, reset: () => btnEqReset?.click() };
}
