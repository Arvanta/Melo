import { getAudioGraph } from "./audio-graph";
import { busEmit, busOn } from "./bus";

const frequencies = [31, 62, 125, 250, 500, 1000, 2000, 4000, 8000, 16000];
const presets: Record<string, number[]> = {
  flat: [0,0,0,0,0,0,0,0,0,0],
  pop: [-1,2,4,4,2,-1,-1,2,3,3],
  rock: [4,3,2,-1,-2,-2,1,3,4,4],
  bass: [6,5,4,2,1,0,-1,-1,-2,-3],
  jazz: [2,1,2,3,2,0,1,2,3,2],
  classical: [3,2,1,0,0,0,-1,2,3,4],
  vocal: [-2,-1,0,2,4,4,3,1,0,-1],
};

/**
 * Equalizer with a split architecture:
 * - the ENGINE (WebAudio filters) always lives in the MAIN window (it owns the audio element)
 * - the UI (sliders/preset) can live in the same window (web demo) or in a separate
 *   OS window (Tauri) — in that case it only sends commands over the event bus.
 */
export function setupEqualizer(audio: HTMLAudioElement, toast: (m:string)=>void, opts: { remote?: boolean } = {}){
  const remote = !!opts.remote;

  const eqEnable = document.getElementById("eqEnable") as HTMLInputElement | null;
  const eqPreset = document.getElementById("eqPreset") as HTMLSelectElement | null;
  const eqBandsEl = document.getElementById("eqBands") as HTMLElement | null;
  const eqCanvas = document.getElementById("eqCanvas") as HTMLCanvasElement | null;
  const ctx = eqCanvas ? eqCanvas.getContext("2d") : null;

  let audioCtx: AudioContext | null = null;
  let filters: BiquadFilterNode[] = [];
  let gainNode: GainNode | null = null;
  let sliders: HTMLInputElement[] = [];
  let displayGains: number[] = new Array(frequencies.length).fill(0);
  let enabled = true;

  // ---------- ENGINE (main window only) ----------
  function ensureContext(){
    if(audioCtx) return;
    try{
      const g = getAudioGraph(audio);
      audioCtx = g.ctx;
      gainNode = audioCtx.createGain();
      filters = frequencies.map(freq=>{
        const f = audioCtx!.createBiquadFilter();
        f.type = "peaking";
        f.frequency.value = freq;
        f.Q.value = 1.4;
        f.gain.value = 0;
        return f;
      });
      g.append(filters);
      g.append([gainNode]);
      g.toDestination();
    }catch{ /* graph unavailable */ }
  }
  function engineGain(idx:number, val:number){
    if(filters[idx]) filters[idx].gain.value = val;
  }
  function engineGains(vals:number[]){
    ensureContext();
    vals.forEach((v,i)=> engineGain(i, v));
    displayGains = [...vals];
    drawCurve();
  }
  function engineEnable(on:boolean){
    ensureContext();
    enabled = on;
    if(!on) filters.forEach(f=> f.gain.value = 0);
    else displayGains.forEach((v,i)=> engineGain(i, v));
    drawCurve();
  }

  // main window listens for commands coming from the (possibly remote) EQ UI
  if(!remote){
    busOn("melo:eq", (p:any)=>{
      if(!p) return;
      if(p.type==="gain"){ ensureContext(); engineGain(p.idx, p.val); displayGains[p.idx]=p.val; drawCurve(); }
      else if(p.type==="gains"){ engineGains(p.values); }
      else if(p.type==="enable"){ engineEnable(!!p.on); }
    });
    audio.addEventListener("play", ()=>{ ensureContext(); if(audioCtx?.state==="suspended") audioCtx.resume(); });
  }

  // ---------- UI ----------
  function updateValLabel(s: HTMLInputElement){
    const val = parseInt(s.value);
    const el = s.parentElement?.querySelector(".val") as HTMLElement | null;
    if(el) el.textContent = (val>0?"+":"")+val+"dB";
  }

  function drawCurve(){
    if(!eqCanvas || !ctx) return;
    const dpr = window.devicePixelRatio || 1;
    const w = eqCanvas.clientWidth * dpr;
    const h = eqCanvas.clientHeight * dpr;
    if(w<=0||h<=0) return;
    eqCanvas.width = w; eqCanvas.height = h;
    ctx.clearRect(0,0,w,h);
    const accent = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || "#2a7bd6";
    const gains = displayGains;
    if(!enabled){
      ctx.strokeStyle = "rgba(100,120,150,0.25)";
      ctx.lineWidth = 2 * dpr;
      ctx.beginPath(); ctx.moveTo(0, h/2); ctx.lineTo(w, h/2); ctx.stroke();
      return;
    }
    ctx.strokeStyle = accent;
    ctx.lineWidth = 2.5 * dpr;
    ctx.lineJoin = "round";
    ctx.beginPath();
    gains.forEach((g,i)=>{
      const x = (i/(gains.length-1))*w;
      const y = h/2 - (g/12)*(h/2 - 10*dpr);
      if(i===0) ctx.moveTo(x,y);
      else {
        const prevX = ((i-1)/(gains.length-1))*w;
        const prevY = h/2 - (gains[i-1]/12)*(h/2 - 10*dpr);
        ctx.quadraticCurveTo((prevX+x)/2, prevY, x, y);
      }
    });
    ctx.stroke();
    gains.forEach((g,i)=>{
      const x = (i/(gains.length-1))*w;
      const y = h/2 - (g/12)*(h/2 - 10*dpr);
      ctx.fillStyle = accent;
      ctx.beginPath(); ctx.arc(x,y,4*dpr,0,Math.PI*2); ctx.fill();
      ctx.fillStyle = "white"; ctx.beginPath(); ctx.arc(x,y,2*dpr,0,Math.PI*2); ctx.fill();
    });
    ctx.strokeStyle = "rgba(100,120,150,0.3)";
    ctx.lineWidth = 1 * dpr;
    ctx.setLineDash([4*dpr,4*dpr]);
    ctx.beginPath(); ctx.moveTo(0,h/2); ctx.lineTo(w,h/2); ctx.stroke();
    ctx.setLineDash([]);
  }

  if(eqBandsEl){
    frequencies.forEach((freq, i)=>{
      const band = document.createElement("div");
      band.className = "eq-band";
      band.innerHTML = `
        <input type="range" min="-12" max="12" value="0" step="1" data-idx="${i}" orient="vertical" />
        <label>${freq>=1000? (freq/1000)+'k' : freq}</label>
        <span style="font-size:10px;color:var(--text-muted);min-height:12px;" class="val">0dB</span>
      `;
      eqBandsEl.appendChild(band);
    });
    sliders = Array.from(eqBandsEl.querySelectorAll("input")) as HTMLInputElement[];
    sliders.forEach(s=>{
      s.addEventListener("input", ()=>{
        const idx = parseInt(s.dataset.idx!);
        const val = parseInt(s.value);
        updateValLabel(s);
        displayGains[idx] = val;
        drawCurve();
        busEmit("melo:eq", { type:"gain", idx, val });
      });
    });
  }

  eqPreset?.addEventListener("change", ()=>{
    const vals = presets[eqPreset.value] || presets.flat;
    if(sliders.length) sliders.forEach((s,i)=>{ s.value = String(vals[i]); updateValLabel(s); });
    displayGains = [...vals];
    drawCurve();
    busEmit("melo:eq", { type:"gains", values: vals });
    toast(`Preset: ${eqPreset.options[eqPreset.selectedIndex].text}`);
  });

  eqEnable?.addEventListener("change", ()=>{
    enabled = eqEnable.checked;
    drawCurve();
    busEmit("melo:eq", { type:"enable", on: enabled });
    toast(enabled ? "Equalizer On" : "Equalizer off — Flat");
  });

  if(eqCanvas) new ResizeObserver(()=> drawCurve()).observe(eqCanvas);
  drawCurve();

  (window as any).LumiEqualizer = { presets, frequencies };
}
