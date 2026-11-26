// Pure helpers for the tag editor's Info and Lyrics tabs (round 121).
// No DOM, no Tauri — unit-tested from node.

export type Info = {
  id: string; path: string; error: string | null; format: string; tagTypes: string[];
  id3Version: string | null; size: number; modified: number | null; durationMs: number;
  overallBitrate: number | null; audioBitrate: number | null; sampleRate: number | null;
  channels: number | null; bitDepth: number | null; encoder: string;
  addedAt: number | null; playCount: number | null; lastPlayedAt: number | null;
};

export function fmtSize(bytes: number): string {
  if (bytes >= 1073741824) return (bytes / 1073741824).toFixed(2) + " GB";
  if (bytes >= 1048576) return (bytes / 1048576).toFixed(1) + " MB";
  if (bytes >= 1024) return Math.round(bytes / 1024) + " KB";
  return bytes + " B";
}

export function fmtDuration(ms: number): string {
  const total = Math.round(ms / 1000);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const ss = String(s).padStart(2, "0");
  return h ? `${h}:${String(m).padStart(2, "0")}:${ss}` : `${m}:${ss}`;
}

export const fmtBitrate = (kbps: number) => `${kbps} kbps`;
export const fmtSampleRate = (hz: number) => `${(hz / 1000).toFixed(hz % 1000 === 0 ? 0 : 1)} kHz`;
export const fmtChannels = (n: number) => (n === 1 ? "Mono" : n === 2 ? "Stereo" : `${n} channels`);
export const fmtDate = (secs: number | null) => (secs ? new Date(secs * 1000).toLocaleString() : "—");

function common<T>(values: T[]): T | null | undefined {
  // undefined = no values, null = mixed
  if (!values.length) return undefined;
  return values.every(v => v === values[0]) ? values[0] : null;
}

/** Windows' extended-length prefix (\\?\ and \\?\UNC\) is an API artifact — never show it. */
export function cleanPath(path: string): string {
  let p = path;
  for (;;) {
    if (p.startsWith("\\\\?\\UNC\\")) { p = "\\" + p.slice(7); break; }
    if (p.startsWith("\\\\?\\")) { p = p.slice(4); continue; }
    if (p.startsWith("\\?\\")) { p = p.slice(3); continue; }
    break;
  }
  return p;
}

function folderOf(path: string): string {
  const clean = cleanPath(path);
  const p = clean.replace(/\\/g, "/");
  const i = p.lastIndexOf("/");
  return i < 0 ? "" : clean.slice(0, i);
}

/** Rows for the Info tab. One file: every fact. Several: totals + shared values. */
export function infoRows(all: Info[]): [string, string][] {
  const infos = all.filter(i => !i.error);
  if (!infos.length) return [];
  const rows: [string, string][] = [];
  if (infos.length === 1) {
    const i = infos[0];
    rows.push(["Type", i.format || "—"]);
    const tagLine = i.id3Version ? [i.id3Version, ...i.tagTypes.filter(t => t !== "ID3v2")].join(", ") : i.tagTypes.join(", ");
    rows.push(["Tag version", tagLine || "No tags"]);
    rows.push(["Size", fmtSize(i.size)]);
    rows.push(["Duration", fmtDuration(i.durationMs)]);
    const br = i.audioBitrate ?? i.overallBitrate;
    if (br) rows.push(["Bitrate", fmtBitrate(br)]);
    if (i.sampleRate) rows.push(["Sample rate", fmtSampleRate(i.sampleRate)]);
    if (i.bitDepth) rows.push(["Bit depth", `${i.bitDepth}-bit`]);
    if (i.channels) rows.push(["Channels", fmtChannels(i.channels)]);
    if (i.encoder) rows.push(["Encoded with", i.encoder]);
    rows.push(["Date added", fmtDate(i.addedAt)]);
    rows.push(["Date modified", fmtDate(i.modified)]);
    rows.push(["Last played", i.lastPlayedAt ? fmtDate(i.lastPlayedAt) : "Never"]);
    rows.push(["Play count", String(i.playCount ?? 0)]);
    rows.push(["Location", cleanPath(i.path)]);
    return rows;
  }
  rows.push(["Files", String(infos.length)]);
  rows.push(["Total size", fmtSize(infos.reduce((a, i) => a + i.size, 0))]);
  rows.push(["Total duration", fmtDuration(infos.reduce((a, i) => a + i.durationMs, 0))]);
  const mixedLabel = (key: (i: Info) => string) => {
    const counts = new Map<string, number>();
    for (const i of infos) counts.set(key(i), (counts.get(key(i)) || 0) + 1);
    return "Mixed — " + Array.from(counts, ([k, n]) => `${k || "unknown"} ×${n}`).join(", ");
  };
  const fmt = common(infos.map(i => i.format));
  rows.push(["Type", fmt === null ? mixedLabel(i => i.format) : fmt || "—"]);
  const brs = infos.map(i => i.audioBitrate ?? i.overallBitrate).filter((b): b is number => !!b);
  if (brs.length) {
    const lo = Math.min(...brs), hi = Math.max(...brs);
    rows.push(["Bitrate", lo === hi ? fmtBitrate(lo) : `${lo}–${hi} kbps`]);
  }
  const sr = common(infos.map(i => i.sampleRate ?? 0));
  rows.push(["Sample rate", sr === null ? "Mixed" : sr ? fmtSampleRate(sr as number) : "—"]);
  const ch = common(infos.map(i => i.channels ?? 0));
  rows.push(["Channels", ch === null ? "Mixed" : ch ? fmtChannels(ch as number) : "—"]);
  rows.push(["Play count", String(infos.reduce((a, i) => a + (i.playCount ?? 0), 0)) + " in total"]);
  const folder = common(infos.map(i => folderOf(i.path)));
  rows.push(["Location", folder === null ? "Several folders" : (folder as string) || "—"]);
  return rows;
}

// ───────────────────────── lyrics ─────────────────────────

export type LyricKind = "sidecar" | "cache" | "embedded";
export type LyricSource = { kind: LyricKind; text: string; path: string | null };
export type LyricSlot = "plain" | "synced";

/** True when the text has [mm:ss] / [mm:ss.xx] timestamps on at least one line. */
export function looksSynced(text: string): boolean {
  return /^\s*\[\d{1,3}:\d{2}(?:[.:]\d{1,3})?\]/m.test(text);
}

export const slotOf = (text: string): LyricSlot => (looksSynced(text) ? "synced" : "plain");

export const KIND_LABEL: Record<LyricKind, string> = {
  sidecar: ".lrc file next to the song",
  cache: "Melo's lyrics cache",
  embedded: "Tag inside the file",
};

/** Where a slot is saved when nothing exists yet. */
export const defaultTarget = (slot: LyricSlot): LyricKind => (slot === "plain" ? "embedded" : "sidecar");

/** Targets the user may pick: timestamps cannot live in the tag's lyrics field. */
export const allowedTargets = (slot: LyricSlot): LyricKind[] =>
  slot === "plain" ? ["embedded", "sidecar", "cache"] : ["sidecar", "cache"];

export type LyricDraft = { text: string; target: LyricKind };

/**
 * Validates the drafts of both slots. Returns the writes to perform and the
 * problems that must be fixed first.
 */
export function planLyricWrites(
  sources: LyricSource[],
  drafts: Partial<Record<LyricSlot, LyricDraft>>,
  chosen: Partial<Record<LyricSlot, LyricKind | null>>,
): { writes: { slot: LyricSlot; kind: LyricKind; text: string }[]; errors: string[] } {
  const writes: { slot: LyricSlot; kind: LyricKind; text: string }[] = [];
  const errors: string[] = [];
  const used = new Map<LyricKind, LyricSlot>();
  for (const slot of ["plain", "synced"] as LyricSlot[]) {
    const d = drafts[slot];
    if (!d) continue;
    const text = d.text.replace(/\r\n/g, "\n").trimEnd();
    const empty = text.trim() === "";
    if (!empty) {
      if (slot === "plain" && looksSynced(text)) errors.push("These lyrics have timestamps — use the Synchronised view");
      if (slot === "synced" && !looksSynced(text)) errors.push("Synchronised lyrics need [mm:ss.xx] timestamps");
      if (!allowedTargets(slot).includes(d.target)) errors.push("Synchronised lyrics can't be stored in the tag — choose the .lrc file or the cache");
    }
    if (used.has(d.target)) errors.push(`The plain and synchronised lyrics can't both be saved to the same place (${KIND_LABEL[d.target]})`);
    used.set(d.target, slot);
    if (!empty && d.target !== "embedded") {
      // Never silently overwrite the other kind of lyrics living in that file.
      const clash = sources.find(s => s.kind === d.target && slotOf(s.text) !== slot && chosen[slot] !== d.target);
      if (clash && !drafts[slot === "plain" ? "synced" : "plain"]) {
        errors.push(`${slot === "plain" ? "Synchronised" : "Plain"} lyrics already exist in the ${KIND_LABEL[d.target]} — pick another place`);
      }
    }
    writes.push({ slot, kind: d.target, text: empty ? "" : d.target === "embedded" ? text : text + "\n" });
  }
  return { writes, errors: Array.from(new Set(errors)) };
}
