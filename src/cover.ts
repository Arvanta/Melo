let nodePolyfilled = false;
async function polyfillNode(){
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

// Extract full metadata (title, artist, album, genre, year, cover) from File
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
      // limit cover size to 500KB to avoid huge data URLs
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
    // also try to get duration from format if not set
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
