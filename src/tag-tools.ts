// Pure helpers for the tag editor's batch tools (round 120): tag-from-filename,
// track numbering and find/replace. No DOM, no Tauri — unit-tested from node.
//
// Every tool produces PER-FILE values: Map<trackId, Map<field, text>>. The
// editor layers them over the shared form edits and only writes values that
// differ from what the file already has.

export type FieldKey =
  | "title" | "artist" | "albumArtist" | "album" | "genre" | "composer" | "comment"
  | "year" | "track" | "trackTotal" | "disc" | "discTotal";
export type PerFile = Map<string, Map<FieldKey, string>>;
export type FileRef = { id: string; path: string; fileName: string };

export const NUMERIC_FIELDS: FieldKey[] = ["year", "track", "trackTotal", "disc", "discTotal"];
export const TEXT_FIELDS: FieldKey[] = ["title", "artist", "albumArtist", "album", "genre", "composer", "comment"];

const PLACEHOLDERS: Record<string, FieldKey | "ignore"> = {
  track: "track", disc: "disc", title: "title", artist: "artist", albumartist: "albumArtist",
  album: "album", year: "year", genre: "genre", composer: "composer", comment: "comment", ignore: "ignore",
};

/** "07" and "7" are the same number; text is compared as typed (trimmed). */
export function normalizeValue(key: FieldKey, v: string): string {
  const t = v.trim();
  if (NUMERIC_FIELDS.includes(key)) {
    if (t === "") return "";
    return /^\d+$/.test(t) ? String(Number(t) || 0).replace(/^0$/, "") : t;
  }
  return t;
}

export function setPerFile(map: PerFile, id: string, key: FieldKey, value: string) {
  let m = map.get(id);
  if (!m) { m = new Map(); map.set(id, m); }
  m.set(key, value);
}

// ───────────────────────── tag from filename ─────────────────────────

export type CompiledPattern = { segments: { re: RegExp; keys: (FieldKey | "ignore")[] }[] };

/**
 * Compiles a pattern such as `%track% - %title%` (or with folder levels:
 * `%artist%/%album%/%track% - %title%`). Numeric placeholders match digits only;
 * text placeholders are lazy so the literal separators decide the split.
 */
export function compilePattern(pattern: string): CompiledPattern | { error: string } {
  const text = pattern.trim();
  if (!text) return { error: "Enter a pattern, for example %track% - %title%" };
  const segments: CompiledPattern["segments"] = [];
  for (const part of text.split("/")) {
    let src = "^";
    const keys: (FieldKey | "ignore")[] = [];
    let last = 0;
    const re = /%([a-z]+)%/gi;
    let m: RegExpExecArray | null;
    while ((m = re.exec(part))) {
      const key = PLACEHOLDERS[m[1].toLowerCase()];
      if (!key) return { error: `Unknown placeholder %${m[1]}%` };
      src += part.slice(last, m.index).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      src += NUMERIC_FIELDS.includes(key as FieldKey) ? "(\\d+)" : "(.+?)";
      keys.push(key);
      last = m.index + m[0].length;
    }
    src += part.slice(last).replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "$";
    if (!keys.length) return { error: "Each part of the pattern needs at least one %placeholder%" };
    segments.push({ re: new RegExp(src, "i"), keys });
  }
  const seen = new Set<string>();
  for (const s of segments) for (const k of s.keys) {
    if (k === "ignore") continue;
    if (seen.has(k)) return { error: `%${k}% is used twice` };
    seen.add(k);
  }
  return { segments };
}

function pathParts(path: string, count: number): string[] {
  const parts = path.replace(/\\/g, "/").split("/").filter(Boolean);
  const out = parts.slice(-count);
  if (!out.length) return [];
  out[out.length - 1] = out[out.length - 1].replace(/\.[^./]+$/, "");
  return out;
}

export type FromNameOptions = { underscores?: boolean; onlyEmpty?: boolean };

export function tagsFromFilenames(
  files: FileRef[],
  pattern: string,
  current: (id: string, key: FieldKey) => string,
  opts: FromNameOptions = {},
): { values: PerFile; matched: number; unmatched: string[]; error?: string } {
  const compiled = compilePattern(pattern);
  if ("error" in compiled) return { values: new Map(), matched: 0, unmatched: [], error: compiled.error };
  const values: PerFile = new Map();
  const unmatched: string[] = [];
  let matched = 0;
  for (const f of files) {
    const parts = pathParts(f.path || f.fileName, compiled.segments.length);
    if (parts.length < compiled.segments.length) { unmatched.push(f.id); continue; }
    const found: [FieldKey, string][] = [];
    let ok = true;
    compiled.segments.forEach((seg, i) => {
      if (!ok) return;
      const m = seg.re.exec(parts[i]);
      if (!m) { ok = false; return; }
      seg.keys.forEach((k, j) => {
        if (k === "ignore") return;
        let v = m[j + 1].trim();
        if (opts.underscores) v = v.replace(/_/g, " ").replace(/\s+/g, " ").trim();
        found.push([k, v]);
      });
    });
    if (!ok) { unmatched.push(f.id); continue; }
    matched++;
    for (const [k, v] of found) {
      if (opts.onlyEmpty && current(f.id, k).trim() !== "") continue;
      setPerFile(values, f.id, k, v);
    }
  }
  return { values, matched, unmatched };
}

// ───────────────────────── numbering ─────────────────────────

const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: "base" });
export const baseName = (f: FileRef) => (f.fileName || f.path.replace(/\\/g, "/").split("/").pop() || "");

export function orderFiles(files: FileRef[], by: "list" | "filename"): FileRef[] {
  if (by === "list") return files.slice();
  return files.slice().sort((a, b) => collator.compare(baseName(a), baseName(b)) || (a.id < b.id ? -1 : 1));
}

export function numberTracks(
  files: FileRef[],
  opts: { start: number; setTotal: boolean; order: "list" | "filename" },
): PerFile {
  const out: PerFile = new Map();
  const ordered = orderFiles(files, opts.order);
  const start = Math.max(0, Math.floor(opts.start) || 0);
  ordered.forEach((f, i) => {
    setPerFile(out, f.id, "track", String(start + i));
    if (opts.setTotal) setPerFile(out, f.id, "trackTotal", String(start + ordered.length - 1));
  });
  return out;
}

// ───────────────────────── find & replace ─────────────────────────

export type FindOptions = { matchCase: boolean; regex: boolean };

/** Returns the new text, or null when `find` is empty / the regex is invalid. */
export function replaceText(value: string, find: string, replace: string, opts: FindOptions): string | null {
  if (!find) return null;
  try {
    if (opts.regex) {
      return value.replace(new RegExp(find, opts.matchCase ? "g" : "gi"), replace);
    }
    const esc = find.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    // A function replacer keeps "$&"-style sequences in the replacement literal.
    return value.replace(new RegExp(esc, opts.matchCase ? "g" : "gi"), () => replace);
  } catch {
    return null;
  }
}

export function findReplaceAll(
  files: FileRef[],
  fields: FieldKey[],
  current: (id: string, key: FieldKey) => string,
  find: string,
  replace: string,
  opts: FindOptions,
): { values: PerFile; changed: number; error?: string } {
  const values: PerFile = new Map();
  if (!find) return { values, changed: 0, error: "Enter the text to find" };
  if (opts.regex) { try { new RegExp(find); } catch (e) { return { values, changed: 0, error: "Invalid regular expression" }; } }
  let changed = 0;
  for (const f of files) {
    let touched = false;
    for (const k of fields) {
      const before = current(f.id, k);
      const after = replaceText(before, find, replace, opts);
      if (after === null || after === before) continue;
      setPerFile(values, f.id, k, after.trim());
      touched = true;
    }
    if (touched) changed++;
  }
  return { values, changed };
}
