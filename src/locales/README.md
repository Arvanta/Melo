# Contributing a translation

Melo ships with English only for now, but the app is built so a new
language can be added without touching any application code.

1. Copy `en.json` to `<code>.json` using the language's
   [ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639_language_codes)
   code (e.g. `fa.json` for Persian, `de.json` for German).
2. Translate every string **value**. Do not change the keys (the
   left-hand side, e.g. `"settings.general.tray.label"`) — those are
   what the app looks up.
3. Fill in `_meta.name` / `_meta.nativeName` / `_meta.authors`.
4. Register the locale in `src/i18n.ts`:
   ```ts
   export const AVAILABLE_LOCALES: LocaleInfo[] = [
     { code: "en", nativeName: "English" },
     { code: "fa", nativeName: "فارسی" }, // <- add your language here
   ];
   ```
5. Open a pull request. Partial translations are welcome — any key
   missing from your file automatically falls back to English, so an
   in-progress translation never breaks the UI.

Only the Settings window is wired up to translated strings today;
more of the app will be converted to use `t()` in a future release.
