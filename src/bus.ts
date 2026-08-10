// Cross-window event bus:
// - inside Tauri: app-wide events (all OS windows receive them)
// - in the browser: CustomEvents on the same window (single-window demo mode)
const hasTauri = () => !!(window as any).__TAURI__;

export async function busEmit(name: string, payload?: any) {
  if (hasTauri()) {
    const { emit } = await import("@tauri-apps/api/event");
    await emit(name, payload);
  } else {
    window.dispatchEvent(new CustomEvent(name, { detail: payload }));
  }
}

export function busOn(name: string, cb: (payload: any) => void) {
  if (hasTauri()) {
    import("@tauri-apps/api/event").then(({ listen }) => {
      listen(name, (e: any) => cb(e.payload));
    });
  } else {
    window.addEventListener(name, (e) => cb((e as CustomEvent).detail));
  }
}
