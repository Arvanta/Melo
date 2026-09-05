// Dev-only visualizer harness — NOT part of the Melo build.
// Renders the real setupVisualizer() from src/visualizer.ts against its
// built-in fake-signal generator so scenes can be eyeballed without audio.
import { setupVisualizer, VIZ_MODES, type VizMode } from "../src/visualizer";

const START: VizMode = (localStorage.getItem("melo-viz-mode") as VizMode) || "meadow";

// --- mode buttons -----------------------------------------------------
const modesEl = document.getElementById("modes")!;
modesEl.innerHTML = VIZ_MODES.map(
  (m) => `<button data-mode="${m.id}" class="${m.id === START ? "on" : ""}">${m.label}</button>`
).join("");
modesEl.addEventListener("click", (e) => {
  const b = (e.target as HTMLElement).closest("[data-mode]") as HTMLElement | null;
  if (!b) return;
  localStorage.setItem("melo-viz-mode", b.dataset.mode!);
  location.reload();
});

// --- cover-colour swatches (simulates cover.ts writing --visualizer/--accent)
const PALETTES: [string, string, string][] = [
  ["default sky", "#38bdf8", "#0284c7"],
  ["warm amber", "rgb(240, 176, 92)", "rgb(190, 116, 40)"],
  ["rose", "rgb(238, 122, 148)", "rgb(178, 66, 96)"],
  ["moss", "rgb(126, 200, 140)", "rgb(58, 132, 82)"],
  ["violet", "rgb(176, 140, 246)", "rgb(108, 74, 190)"],
];
const sw = document.getElementById("swatches")!;
sw.innerHTML = PALETTES.map(
  (p, i) => `<button class="swatch" title="${p[0]}" data-pal="${i}" style="background:${p[1]}"></button>`
).join(" ");
sw.addEventListener("click", (e) => {
  const b = (e.target as HTMLElement).closest("[data-pal]") as HTMLElement | null;
  if (!b) return;
  const [, c1, c2] = PALETTES[+b.dataset.pal!];
  document.documentElement.style.setProperty("--visualizer", c1);
  document.documentElement.style.setProperty("--accent", c2);
});

// --- fx toggles -------------------------------------------------------
const FX_KEYS: Record<string, string> = {
  bloom: "melo-viz-bloom",
  afterglow: "melo-viz-afterglow",
  peak: "melo-viz-peak",
};
document.querySelectorAll<HTMLElement>("[data-fx]").forEach((b) => {
  const key = FX_KEYS[b.dataset.fx!];
  b.classList.toggle("on", localStorage.getItem(key) === "1");
  b.addEventListener("click", () => {
    localStorage.setItem(key, localStorage.getItem(key) === "1" ? "0" : "1");
    location.reload();
  });
});

// --- run the real visualizer -----------------------------------------
// The visualizer only animates when its <audio> element is actually
// playing (otherwise ambientSignals() reports silence and every scene
// freezes). Feed it a looping SILENT wav so the built-in fakeLevels()
// generator drives the scenes without needing real audio.
function silentAudio(): HTMLAudioElement {
  const sec = 1, rate = 8000, n = sec * rate;
  const buf = new ArrayBuffer(44 + n);
  const v = new DataView(buf);
  const str = (o: number, s: string) => { for (let i = 0; i < s.length; i++) v.setUint8(o + i, s.charCodeAt(i)); };
  str(0, "RIFF"); v.setUint32(4, 36 + n, true); str(8, "WAVEfmt ");
  v.setUint32(16, 16, true); v.setUint16(20, 1, true); v.setUint16(22, 1, true);
  v.setUint32(24, rate, true); v.setUint32(28, rate, true);
  v.setUint16(32, 1, true); v.setUint16(34, 8, true);
  str(36, "data"); v.setUint32(40, n, true);
  for (let i = 0; i < n; i++) v.setUint8(44 + i, 128);
  let bin = "";
  const bytes = new Uint8Array(buf);
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  const el = document.createElement("audio");
  el.src = "data:audio/wav;base64," + btoa(bin);
  el.loop = true;
  el.muted = true;
  el.play().catch(() => {
    document.addEventListener("click", () => el.play().catch(() => {}), { once: true });
  });
  return el;
}

setupVisualizer(silentAudio());

// Second instance on the 56px strip: getContainer() prefers #vizBars, so
// swap the id long enough for the second setup call to bind the strip.
const big = document.getElementById("vizBars")!;
const small = document.getElementById("vizSmall")!;
big.id = "vizBarsBig";
small.id = "vizBars";
setupVisualizer(silentAudio());
small.id = "vizSmall";
big.id = "vizBars";
