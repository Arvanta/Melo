// File-name rules for the tag editor's Rename box (round 123). Mirrors
// src-tauri/src/file_rename.rs::validate_stem so the UI can explain a problem
// before anything is sent; the backend re-checks everything.

const RESERVED = new Set(["CON", "PRN", "AUX", "NUL", "COM1", "COM2", "COM3", "COM4", "COM5", "COM6", "COM7", "COM8", "COM9",
  "LPT1", "LPT2", "LPT3", "LPT4", "LPT5", "LPT6", "LPT7", "LPT8", "LPT9"]);
export const MAX_STEM_CHARS = 200;

/** null = fine, otherwise the reason. */
export function stemProblem(stem: string): string | null {
  const s = stem.trim();
  if (!s) return "The file name is empty";
  if ([...s].length > MAX_STEM_CHARS) return `The file name is longer than ${MAX_STEM_CHARS} characters`;
  const bad = [...s].find(c => "<>:\"/\\|?*".includes(c) || c.charCodeAt(0) < 0x20);
  if (bad) return bad.charCodeAt(0) < 0x20 ? "A file name cannot contain a control character" : `A file name cannot contain "${bad}"`;
  if (s.endsWith(".") || s.endsWith(" ")) return "A file name cannot end with a dot or a space";
  const first = s.split(".")[0].trimEnd().toUpperCase();
  if (RESERVED.has(first)) return `"${first}" is a reserved name on Windows`;
  return null;
}

/** "01 - Song.mp3" -> { stem: "01 - Song", ext: ".mp3" } (a leading dot is not an extension). */
export function splitFileName(name: string): { stem: string; ext: string } {
  const i = name.lastIndexOf(".");
  if (i <= 0) return { stem: name, ext: "" };
  return { stem: name.slice(0, i), ext: name.slice(i) };
}
