// Cross-window event bus:
// - inside Tauri: app-wide events via @tauri-apps/api/event
// - in the browser: CustomEvents on window

export const isTauri = typeof (window as any).__TAURI_INTERNALS__ !== "undefined" || typeof (window as any).__TAURI__ !== "undefined";

// The event module is imported ONCE and reused: busEmit used to run a dynamic
// import() per call, which at playback-position rate (~4/s) was pure overhead.
let tauriEmit: Promise<((name: string, payload?: any) => Promise<void>) | null> | null = null;
function getTauriEmit() {
  if (!tauriEmit) {
    tauriEmit = import("@tauri-apps/api/event").then((m) => m.emit as any).catch(() => null);
  }
  return tauriEmit;
}

export async function busEmit(name: string, payload?: any) {
  if (isTauri) {
    try {
      const emit = await getTauriEmit();
      if (emit) {
        await emit(name, payload);
        return;
      }
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

// ─── playback-position fan-out ───
// melo:playback-position fires ~4x/s while playing. Over Tauri every emit is an
// IPC round-trip broadcast to ALL windows, but only the lyrics panel and the
// library mini player read it (the playlist/EQ/settings windows never do). The
// main window therefore registers which of those panels are open: with none open
// the event stays inside the player window (a free CustomEvent, which is all the
// in-window lyric line needs); with one open it goes over IPC as before (the
// player window still receives its own emit through its Tauri listener, so it is
// delivered exactly once either way).
const POSITION_CONSUMERS = new Set(["lyrics", "library"]);
const openPositionConsumers = new Set<string>();

export function setPositionConsumer(panel: string, open: boolean) {
  if (!POSITION_CONSUMERS.has(panel)) return;
  if (open) openPositionConsumers.add(panel);
  else openPositionConsumers.delete(panel);
}

export function busEmitPosition(seconds: number) {
  if (isTauri && openPositionConsumers.size > 0) {
    void busEmit("melo:playback-position", seconds);
    return;
  }
  window.dispatchEvent(new CustomEvent("melo:playback-position", { detail: seconds, bubbles: false }));
}
