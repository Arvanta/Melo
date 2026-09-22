// Window geometry helpers, split out of main.ts. This module owns:
//  - the trailing-edge debounce helper;
//  - the flush-on-pagehide/beforeunload plumbing (survives a
//    resize-then-quit gesture);
//  - `persistGeometry(win, key)` — used by every Tauri panel;
//  - `resolveAndClampGeometry(panel, fallbackSize, mins)` — the shared
//    monitor-clamp + DPI-aware restore for main and panels.
//
// Pure: lazy-imports only `@tauri-apps/api/window` and `/dpi`, and
// reads/writes localStorage directly. The listener setup runs on first
// import; main.ts just calls the helpers.

export type PanelSizeFallback = [number, number];

/**
 * Trailing-edge debounce. Each call cancels the pending timer and
 * schedules a fresh fire `ms` milliseconds later. The returned function
 * exposes `.flush()` for the pagehide / beforeunload path.
 */
export function debounce<T extends (...args: any[]) => any>(fn: T, ms: number): T & { flush: () => void } {
  let timer: number | undefined;
  const wrapped = ((...args: Parameters<T>) => {
    if (timer != null) window.clearTimeout(timer);
    timer = window.setTimeout(() => { timer = undefined; fn(...args); }, ms);
  }) as T & { flush: () => void };
  wrapped.flush = () => {
    if (timer != null) { window.clearTimeout(timer); timer = undefined; }
  };
  return wrapped;
}

/**
 * Same debounce, but additionally registers the wrapped function with
 * the pagehide / beforeunload flush list. Use this for any geometry
 * writer main.ts owns so a resize-then-quit can still hit storage.
 */
export function debounceForFlush<T extends (...args: any[]) => any>(fn: T, ms: number): T & { flush: () => void } {
  const wrapped = debounce(fn, ms);
  debouncedGeometryFlushers.push(() => wrapped.flush());
  return wrapped;
}

const debouncedGeometryFlushers: Array<() => void> = [];
function flushDebouncedSaves() {
  for (const flush of debouncedGeometryFlushers) {
    try { flush(); } catch {}
  }
}

// `pagehide` covers close and reload on Chromium; `beforeunload` covers
// Tauri window closes. Both run synchronously enough to flush the pending
// timer and write localStorage before the renderer goes away.
if (typeof window !== "undefined") {
  window.addEventListener("pagehide", flushDebouncedSaves);
  window.addEventListener("beforeunload", flushDebouncedSaves);
}

/**
 * Wire up debounced-300ms move/resize persistence for a Tauri window.
 * Saves logical-pixel position+size to localStorage under `key`. Survives
 * a gesture-then-quit because the pagehide/beforeunload listeners above
 * flush the pending write before the renderer goes away.
 */
export async function persistGeometry(win: any, key: string) {
  const save = async () => {
    try {
      // Save in logical pixels to match the restore path; otherwise the window
      // drifts on every reopen under multi-DPI.
      const sf = await win.scaleFactor();
      const pos = (await win.outerPosition()).toLogical(sf);
      const size = (await win.outerSize()).toLogical(sf);
      localStorage.setItem(key, JSON.stringify({ x: pos.x, y: pos.y, w: size.width, h: size.height }));
    } catch {}
  };
  const debouncedSave = debounceForFlush(save, 300);
  win.onMoved(debouncedSave);
  win.onResized(debouncedSave);
}

export interface ClampedGeometry {
  x?: number;
  y?: number;
  width: number;
  height: number;
}

/**
 * Shared geometry restore for the main player window and every Tauri
 * panel window:
 *  - reads the saved entry from localStorage (`melo-geo-panel-<panel>`);
 *  - converts to logical pixels by dividing by the active monitor's
 *    scale factor (Tauri 2 DPI handling — matches setSize/setPosition);
 *  - clamps the rectangle to the work area of a connected monitor; if
 *    none contains it (unplugged / resolution changed), falls back to
 *    the primary monitor, centered, with the safe fallback size.
 * Best-effort: any IPC failure returns the fallback so the window opens.
 */
export async function resolveAndClampGeometry(
  panel: string,
  fallbackSize: PanelSizeFallback,
  mins: PanelSizeFallback
): Promise<ClampedGeometry> {
  const fallbackW = Math.max(mins[0], fallbackSize[0]);
  const fallbackH = Math.max(mins[1], fallbackSize[1]);
  try {
    const { availableMonitors, currentMonitor } = await import("@tauri-apps/api/window");

    let saved: any = null;
    try { saved = JSON.parse(localStorage.getItem("melo-geo-panel-" + panel) || "null"); } catch {}

    if (!saved || saved.w == null || saved.h == null) {
      return { width: fallbackW, height: fallbackH };
    }

    const monitors = await availableMonitors();
    const primary = await currentMonitor();
    const sf = (primary?.scaleFactor ?? 1) || 1;

    // A saved size from an older build can violate the panel's CURRENT
    // minimums (e.g. Library min-height was raised) — clamp so the restored
    // window always satisfies them.
    const w = Math.max(mins[0], saved.w / sf);
    const h = Math.max(mins[1], saved.h / sf);
    const x = saved.x != null ? saved.x / sf : undefined;
    const y = saved.y != null ? saved.y / sf : undefined;

    const fitsMonitor = (mx: number, my: number, mw: number, mh: number): boolean => {
      if (x == null || y == null) return false;
      const right = x + w;
      const bottom = y + h;
      return right > mx + 80 && bottom > my + 80 && x < mx + mw - 80 && y < my + mh - 80;
    };

    const targetMonitor = monitors.find((m: any) => {
      const pos = m.position;
      const sf2 = m.scaleFactor || 1;
      const mx = pos.x / sf2;
      const my = pos.y / sf2;
      const mw = (m.size?.width ?? 0) / sf2;
      const mh = (m.size?.height ?? 0) / sf2;
      return fitsMonitor(mx, my, mw, mh);
    });

    if (!targetMonitor) {
      const ppos = primary?.position ?? { x: 0, y: 0 };
      const psize = primary?.size ?? { width: fallbackW * sf, height: fallbackH * sf };
      const pmx = ppos.x / sf;
      const pmy = ppos.y / sf;
      const pmw = (psize.width ?? fallbackW * sf) / sf;
      const pmh = (psize.height ?? fallbackH * sf) / sf;
      return {
        x: Math.round(pmx + (pmw - fallbackW) / 2),
        y: Math.round(pmy + (pmh - fallbackH) / 2),
        width: fallbackW,
        height: fallbackH
      };
    }

    const tpos = targetMonitor.position;
    const tsize = targetMonitor.size;
    const tsf = targetMonitor.scaleFactor || 1;
    const tmx = tpos.x / tsf;
    const tmy = tpos.y / tsf;
    const tmw = (tsize?.width ?? w) / tsf;
    const tmh = (tsize?.height ?? h) / tsf;
    const clampedW = Math.min(Math.max(mins[0], w), tmw);
    const clampedH = Math.min(Math.max(mins[1], h), tmh);

    return { x: Math.round(x!), y: Math.round(y!), width: Math.round(clampedW), height: Math.round(clampedH) };
  } catch (err) {
    console.warn("[melo] resolveAndClampGeometry fallback", panel, err);
    return { width: fallbackW, height: fallbackH };
  }
}
