// Minimal i18n scaffold.
//
// Only English ships today, but the app is structured so a community
// translation can be dropped in without touching application code:
//
//   1. Copy src/locales/en.json to src/locales/<code>.json (e.g. fa.json,
//      de.json) and translate the string values (keep the keys as-is).
//   2. Add your locale to AVAILABLE_LOCALES below, e.g.
//        { code: "fa", nativeName: "فارسی" }
//   3. Add a matching <option> to the #setLanguage <select> in main.ts.
//
// Strings are looked up by a flat dotted key, e.g. t("settings.general.tray.label").
// Any string not translated in a given locale silently falls back to English,
// so partial/in-progress translations never break the UI.

import enLocale from "./locales/en.json";

export interface LocaleInfo { code: string; nativeName: string; }

// Add new entries here once src/locales/<code>.json exists.
export const AVAILABLE_LOCALES: LocaleInfo[] = [
  { code: "en", nativeName: "English" },
];

type LocaleTable = Record<string, string>;

const cache: Record<string, LocaleTable> = { en: enLocale as unknown as LocaleTable };
let current: LocaleTable = cache.en;
let currentCode = "en";

export function getLocaleCode(): string { return currentCode; }

export async function setLocale(code: string): Promise<void> {
  if (!AVAILABLE_LOCALES.some(l => l.code === code)) code = "en";
  if (!cache[code]) {
    if (code === "en") {
      cache.en = enLocale as unknown as LocaleTable;
    } else {
      try {
        // Locales beyond "en" are loaded on demand so unused translations
        // never bloat the initial bundle.
        const mod = await import(`./locales/${code}.json`);
        cache[code] = (mod.default || mod) as LocaleTable;
      } catch {
        code = "en";
      }
    }
  }
  currentCode = code;
  current = cache[code] || cache.en;
  localStorage.setItem("melo-pref-language", code);
  document.dispatchEvent(new CustomEvent("melo:locale-changed", { detail: code }));
}

/** Translate a dotted key; falls back to English, then to the key itself. */
export function t(key: string): string {
  return current[key] ?? cache.en[key] ?? key;
}

export function initLocale(): void {
  const saved = localStorage.getItem("melo-pref-language") || "en";
  setLocale(saved);
}
