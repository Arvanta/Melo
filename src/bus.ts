// Cross-window event bus:
// - inside Tauri: app-wide events via @tauri-apps/api/event (all OS windows receive them)
// - in the browser: CustomEvents on the same window (single-window demo mode)

export const isTauri = typeof (window as any).__TAURI_INTERNALS__ !== "undefined" || typeof (window as any).__TAURI__ !== "undefined";

export async function busEmit(name: string, payload?: any) {
  if (isTauri) {
    try {
      const { emit } = await import("@tauri-apps/api/event");
      await emit(name, payload);
    } catch {
      window.dispatchEvent(new CustomEvent(name, { detail: payload }));
    }
  } else {
    window.dispatchEvent(new CustomEvent(name, { detail: payload }));
  }
}

export function busOn(name: string, cb: (payload: any) => void) {
  if (isTauri) {
    import("@tauri-apps/api/event").then(({ listen }) => {
      listen(name, (e: any) => cb(e.payload));
    }).catch(() => {
      window.addEventListener(name, (e) => cb((e as CustomEvent).detail));
    });
  } else {
    window.addEventListener(name, (e) => cb((e as CustomEvent).detail));
  }
}
