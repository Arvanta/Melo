// Cross-window event bus:
// - inside Tauri: app-wide events via @tauri-apps/api/event
// - in the browser: CustomEvents on window

export const isTauri = typeof (window as any).__TAURI_INTERNALS__ !== "undefined" || typeof (window as any).__TAURI__ !== "undefined";

export async function busEmit(name: string, payload?: any) {
  if (isTauri) {
    try {
      const { emit } = await import("@tauri-apps/api/event");
      await emit(name, payload);
      return;
    } catch {}
  }
  // Explicit `bubbles: false`: `busOn` listeners attach to `window` (the top
  // of the target tree), so bubbling is pure overhead and a footgun — an
  // unrelated document-level handler could pick the event up. Don't
  // "fix" a missed event with `{ bubbles: true }`.
  window.dispatchEvent(new CustomEvent(name, { detail: payload, bubbles: false }));
}

export function busOn(name: string, cb: (payload: any) => void) {
  if (isTauri) {
    import("@tauri-apps/api/event").then(({ listen }) => {
      listen(name, (e: any) => {
        cb(e.payload);
      });
    }).catch(() => {});
  }
  window.addEventListener(name, (e) => cb((e as CustomEvent).detail));
}
