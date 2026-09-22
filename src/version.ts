// Single source of truth for the displayed app version.
// In Tauri the version comes from tauri.conf.json via the runtime, so the
// About panel and User-Agent never drift from the actual release; in the
// browser build the lookup fails and the compile-time fallback is used.
// Cached for the process lifetime.

const FALLBACK_VERSION = "1.0.0";

let cachedVersion: string | null = null;
let pending: Promise<string> | null = null;

export function getAppVersion(): Promise<string> {
  if (cachedVersion) return Promise.resolve(cachedVersion);
  if (pending) return pending;
  pending = (async () => {
    try {
      const { getVersion } = await import("@tauri-apps/api/app");
      const v = await getVersion();
      if (v && v.trim()) {
        cachedVersion = v.trim();
        return cachedVersion;
      }
    } catch { /* non-Tauri context or missing permission — use fallback */ }
    cachedVersion = FALLBACK_VERSION;
    return cachedVersion;
  })();
  return pending;
}
