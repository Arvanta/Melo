let nodePolyfilled = false;
async function polyfillNode() {
  if (nodePolyfilled) return;
  nodePolyfilled = true;
  try {
    const g: any = globalThis as any;
    if (typeof g.Buffer === "undefined") {
      const b: any = await import("buffer");
      g.Buffer = b.Buffer;
    }
    if (typeof g.process === "undefined") {
      g.process = { env: {}, browser: true, nextTick: (cb: any) => setTimeout(cb, 0) };
    }
  } catch {}
}

export async function extractCoverFromFile(file: File): Promise<string | null> {
  try {
    await polyfillNode();
    const mod: any = await import("music-metadata-browser");
    const mm: any = (mod && typeof mod.parseBlob === "function") ? mod : (mod.default || mod);
    const metadata = await mm.parseBlob(file);
    const picture = (metadata as any)?.common?.picture?.[0];
    if (picture && picture.data) {
      const mime: string = picture.format || "image/jpeg";
      const data: Uint8Array = picture.data;
      let binary = "";
      const chunk = 8192;
      for (let i = 0; i < data.length; i += chunk) {
        const sub = data.subarray(i, i + chunk);
        // @ts-ignore
        binary += String.fromCharCode.apply(null, sub as any);
      }
      const base64 = btoa(binary);
      return `data:${mime};base64,${base64}`;
    }
  } catch {}
  return null;
}

export async function enrichTrackFromFile(file: File, track: any): Promise<void> {
  try {
    await polyfillNode();
    const mod2: any = await import("music-metadata-browser");
    const mm: any = (mod2 && typeof mod2.parseBlob === "function") ? mod2 : (mod2.default || mod2);
    const metadata = await Promise.race([
      mm.parseBlob(file),
      new Promise((_, rej) => setTimeout(() => rej(new Error("timeout")), 1800)) as any,
    ]);
    const common = (metadata as any)?.common;
    if (!common) return;
    if (common.title) track.title = common.title;
    if (common.artist) track.artist = common.artist;
    else if (common.artists && common.artists[0]) track.artist = common.artists[0];
    if (common.album) track.album = common.album;
    if (common.genre && common.genre[0]) track.genre = common.genre[0];
    if (common.year) track.year = common.year;
    // cover
    const pic = common.picture?.[0];
    if (pic && pic.data) {
      const mime: string = pic.format || "image/jpeg";
      const data: Uint8Array = pic.data;
      if (data.length > 600000) return;
      let binary = "";
      const chunk = 8192;
      for (let i = 0; i < data.length; i += chunk) {
        const sub = data.subarray(i, i + chunk);
        // @ts-ignore
        binary += String.fromCharCode.apply(null, sub as any);
      }
      track.cover = `data:${mime};base64,${btoa(binary)}`;
    }
    const fmt = (metadata as any)?.format;
    if (fmt && fmt.duration && !track.duration) {
      track.duration = Math.floor(fmt.duration);
    }
  } catch {}
}

export async function withCover<T extends { cover?: string | null }>(
  file: File,
  track: T,
  timeoutMs = 1800
): Promise<T> {
  await enrichTrackFromFile(file, track as any);
  return track;
}

// ---------- Dynamic Ambient Palette Color Extraction ----------

export async function extractDominantColor(coverSrc: string): Promise<{ r: number; g: number; b: number } | null> {
  return new Promise((resolve) => {
    if (!coverSrc) return resolve(null);
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) return resolve(null);
        canvas.width = 40;
        canvas.height = 40;
        ctx.drawImage(img, 0, 0, 40, 40);
        const data = ctx.getImageData(0, 0, 40, 40).data;

        let bestColor = { r: 42, g: 123, b: 214 };
        let maxScore = -1;

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i], g = data[i + 1], b = data[i + 2], a = data[i + 3];
          if (a < 128) continue;

          // Convert RGB to HSL
          const max = Math.max(r, g, b), min = Math.min(r, g, b);
          const l = (max + min) / 510;
          const d = max - min;
          const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));

          // Favor rich colors (saturation > 0.35, lightness 0.35 to 0.75)
          if (s > 0.25 && l > 0.25 && l < 0.82) {
            const score = s * 1.5 + (1 - Math.abs(l - 0.5));
            if (score > maxScore) {
              maxScore = score;
              bestColor = { r, g, b };
            }
          }
        }

        if (maxScore > 0) resolve(bestColor);
        else resolve(null);
      } catch {
        resolve(null);
      }
    };
    img.onerror = () => resolve(null);
    img.src = coverSrc;
  });
}

export async function applyDynamicAmbientTheme(coverSrc: string | null) {
  const enabled = localStorage.getItem("melo-dynamic-theme") !== "0";
  const doc = document.documentElement;

  if (!enabled || !coverSrc) {
    doc.style.removeProperty("--accent");
    doc.style.removeProperty("--visualizer");
    doc.style.removeProperty("--accent-glow");
    return;
  }

  const col = await extractDominantColor(coverSrc);
  if (col) {
    const rgbStr = `rgb(${col.r}, ${col.g}, ${col.b})`;
    doc.style.setProperty("--accent", rgbStr);
    doc.style.setProperty("--visualizer", rgbStr);
    doc.style.setProperty("--accent-glow", `rgba(${col.r}, ${col.g}, ${col.b}, 0.35)`);
  } else {
    doc.style.removeProperty("--accent");
    doc.style.removeProperty("--visualizer");
    doc.style.removeProperty("--accent-glow");
  }
}
