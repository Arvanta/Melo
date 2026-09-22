// Central settings registry.
//
// Every Melo *preference* is declared here exactly once: storage key,
// type, default, and (for numbers) a valid range. The registry is the
// single source of truth for:
//   1. Defaults — a value with no stored entry resolves here, not at
//      scattered `|| "50"` fallbacks.
//   2. Validation — out-of-range or wrong-typed stored values are
//      clamped or discarded on read, so corrupt entries can't propagate.
//   3. Reset — "Reset all settings" deletes exactly the keys this
//      registry owns (plus RESET_EXTRA_KEYS) and nothing else.
//
// Storage format is unchanged (same melo-pref-* / melo-viz-* keys), so
// nothing migrates. The setters add typed clamping and diff-only event
// emission on top of raw localStorage.

import { busEmit } from "./bus";

export type SettingValue = boolean | number | string;

export interface SettingDef {
  /** Logical name, also used as the `key` in melo:pref-changed events. */
  name: string;
  /** Physical localStorage key. */
  storage: string;
  type: "bool" | "int" | "string";
  def: SettingValue;
  min?: number;
  max?: number;
  step?: number;
}

export const SETTINGS: SettingDef[] = [
  // --- General ---------------------------------------------------------
  { name: "tray",           storage: "melo-pref-tray",           type: "bool", def: false },
  { name: "resume",         storage: "melo-pref-resume",         type: "bool", def: true },
  { name: "lyricsOnline",   storage: "melo-pref-lyricsOnline",   type: "bool", def: false },
  { name: "lyricsSaveMode", storage: "melo-pref-lyricsSaveMode", type: "string", def: "cache" },
  { name: "lyricsSkinLine", storage: "melo-pref-lyricsSkinLine", type: "bool", def: false },
  { name: "language",       storage: "melo-pref-language",       type: "string", def: "en" },
  // --- Playback --------------------------------------------------------
  { name: "replayGainGlobal", storage: "melo-pref-replayGainGlobal", type: "bool", def: true },
  { name: "fadePause",        storage: "melo-pref-fadePause",        type: "bool", def: true },
  { name: "crossfade",        storage: "melo-pref-crossfade",        type: "bool", def: false },
  { name: "crossfadeDuration", storage: "melo-pref-crossfadeDuration", type: "int", def: 4, min: 1, max: 12 },
  { name: "smartPrev",        storage: "melo-pref-smartPrev",        type: "bool", def: true },
  // --- Appearance --------------------------------------------------------
  { name: "dynamicTheme",             storage: "melo-dynamic-theme",                    type: "bool", def: true },
  { name: "showStopBtn",              storage: "melo-pref-showStopBtn",                 type: "bool", def: false },
  { name: "embeddedPlaylistCover",    storage: "melo-pref-embeddedPlaylistCover",       type: "bool", def: true },
  { name: "embeddedPlaylistFontScale", storage: "melo-pref-embeddedPlaylistFontScale",  type: "int", def: 100, min: 70, max: 140, step: 10 },
  { name: "theme",                    storage: "melo-theme",                            type: "string", def: "dark" },
  // --- Visualizer ------------------------------------------------------
  { name: "vizPeak",     storage: "melo-viz-peak",     type: "bool", def: false },
  { name: "vizAfterglow", storage: "melo-viz-afterglow", type: "bool", def: false },
  { name: "vizBloom",    storage: "melo-viz-bloom",    type: "bool", def: false },
  { name: "vizMirror",   storage: "melo-viz-mirror",   type: "bool", def: false },
  { name: "vizPale",     storage: "melo-viz-pale",     type: "bool", def: false },
  // 0 is a legal value — readers must not collapse it into the default.
  { name: "vizSmoothing", storage: "melo-viz-smoothing", type: "int", def: 50, min: 0, max: 100, step: 5 },
];

const byName = new Map<string, SettingDef>(SETTINGS.map(s => [s.name, s]));

export function settingDef(name: string): SettingDef | undefined {
  return byName.get(name);
}

/** Clamped, typed read; falls back to the registry default. */
export function readSetting(name: string): SettingValue {
  const def = byName.get(name);
  if (!def) throw new Error(`Unknown setting: ${name}`);
  const raw = localStorage.getItem(def.storage);
  if (raw === null) return def.def;
  if (def.type === "bool") return raw === "1";
  if (def.type === "int") {
    const n = parseInt(raw, 10);
    if (Number.isNaN(n)) return def.def;
    return clampInt(n, def);
  }
  return raw;
}

function clampInt(n: number, def: SettingDef): number {
  let v = Math.round(n);
  if (def.min !== undefined) v = Math.max(def.min, v);
  if (def.max !== undefined) v = Math.min(def.max, v);
  if (def.step && def.min !== undefined) v = def.min + Math.round((v - def.min) / def.step) * def.step;
  else if (def.step) v = Math.round(v / def.step) * def.step;
  return v;
}

function serialize(def: SettingDef, value: SettingValue): string {
  if (def.type === "bool") return value ? "1" : "0";
  return String(value);
}

/**
 * Typed write. Normalizes to the setting's range, persists, and broadcasts
 * melo:pref-changed ONLY when the stored value actually changed (diff-only
 * events keep slider storms off the bus).
 * Returns the value that was stored (post-clamp), so callers can reflect it
 * back into their UI.
 */
export function writeSetting(name: string, value: SettingValue): SettingValue {
  const def = byName.get(name);
  if (!def) throw new Error(`Unknown setting: ${name}`);
  let v = value;
  if (def.type === "bool") v = !!value;
  if (def.type === "int") {
    const n = typeof value === "number" ? value : parseInt(String(value), 10);
    v = Number.isNaN(n) ? def.def : clampInt(n, def);
  }
  const text = serialize(def, v);
  const prev = localStorage.getItem(def.storage);
  localStorage.setItem(def.storage, text);
  if (prev !== text) busEmit("melo:pref-changed", { key: def.name, value: v });
  return v;
}

// Debounced variant for range sliders: intermediate ticks land in the same
// 150ms window, so dragging writes at most ~7 times/second instead of once
// per input event. The final value is always written.
const debounceTimers = new Map<string, ReturnType<typeof setTimeout>>();
const pendingWrites = new Map<string, () => void>();

export function writeSettingDebounced(name: string, value: SettingValue, ms = 150): SettingValue {
  const existing = debounceTimers.get(name);
  if (existing) clearTimeout(existing);
  const run = () => writeSetting(name, value);
  pendingWrites.set(name, run);
  debounceTimers.set(name, setTimeout(() => {
    debounceTimers.delete(name);
    pendingWrites.delete(name);
    run();
  }, ms));
  return value;
}

/** Execute any pending debounced write immediately (e.g. on pointerup). */
export function flushSetting(name: string) {
  const t = debounceTimers.get(name);
  if (t) clearTimeout(t);
  debounceTimers.delete(name);
  const run = pendingWrites.get(name);
  pendingWrites.delete(name);
  if (run) run();
}

// ---------------------------------------------------------------------
// Reset manifest: everything the registry owns plus the non-registry
// preference keys. Session state (current track, playlist, resume
// position, window geometry) is intentionally NOT here.
// ---------------------------------------------------------------------
export const RESET_EXTRA_KEYS = [
  "melo-active-skin-id",
  "melo-custom-skin",
  "melo-custom-skin-isFull",
  "melo-skin-geometry",
  "melo-settings-tab",
  "melo-playlist-view",
  "melo-lib-view",
  "melo-lib-layout",
  "melo-volume",
  "melo-muted",
  "melo-eq-enabled",
  "melo-eq-gains",
  "melo-eq-preset",
  "melo-viz-mode",
  "melo-viz-disabled",
];

/** Keys (and prefixes) that "Reset all settings" removes. */
export function resetManifest(): { exact: Set<string>; prefixes: string[] } {
  const exact = new Set<string>(RESET_EXTRA_KEYS);
  for (const s of SETTINGS) exact.add(s.storage);
  // Catch anything sharing the namespaces even if not individually listed
  // (e.g. future melo-pref-* keys).
  return { exact, prefixes: ["melo-pref-", "melo-viz-"] };
}

/** Delete every registered preference key. */
export function resetAllSettings() {
  const { exact, prefixes } = resetManifest();
  for (const key of Object.keys(localStorage)) {
    if (exact.has(key) || prefixes.some(p => key.startsWith(p))) localStorage.removeItem(key);
  }
}

// ---------------------------------------------------------------------
// Schema versioning: migration hooks run once per stored version bump.
// No migrations exist yet — this is the infrastructure so future renames /
// default changes have a safe, ordered place to live.
// ---------------------------------------------------------------------
const SCHEMA_KEY = "melo-settings-schema-version";
export const SETTINGS_SCHEMA_VERSION = 1;

type Migration = { toVersion: number; run: () => void };
const MIGRATIONS: Migration[] = [];

export function runSettingsMigrations() {
  const stored = parseInt(localStorage.getItem(SCHEMA_KEY) || "0", 10);
  let version = Number.isNaN(stored) ? 0 : stored;
  for (const m of MIGRATIONS) {
    if (m.toVersion > version) {
      try { m.run(); } catch { /* a broken migration must never block boot */ }
      version = m.toVersion;
    }
  }
  if (version !== SETTINGS_SCHEMA_VERSION) {
    localStorage.setItem(SCHEMA_KEY, String(SETTINGS_SCHEMA_VERSION));
  }
}
