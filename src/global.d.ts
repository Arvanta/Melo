// Global typing cross-wires the contract between main.ts and the modules
// that mount into it (library, player, skin, visualizer):
// `window.LumiLibrary` etc. are typed at every use site without casts.
//
// Shapes are deliberately loose — only the methods main.ts actually
// calls are pinned; the rest stay `any` so modules can evolve freely.
//
// `__TAURI__` is exposed here (Tauri injects it in production builds;
// main.ts reads it to decide native API use). Optional because browser
// previews never set it.
//
// NOTE: this file is intentionally a SCRIPT (no top-level `export`), so
// `interface Window` merges into the global Window type across src/.

interface LumiLibraryShim {
  importPaths?: (paths: string[], mode: "replace" | "append") => Promise<any[]>;
  addTracks?: (tracks: any[], makeCurrent?: boolean) => void;
  addToCurrentPlaylist?: (tracks: any[]) => void;
  getTrack?: (id: string) => Promise<any>;
  getQueueTracksAll: () => Promise<any[]>;
  getAllTracks?: () => Promise<any[]>;
  openLibraryManager?: () => void;
}

interface LumiPlayerShim {
  queue: any[];
  loadTrack: (index: number, autoplay: boolean, positionSec?: number) => void;
}

interface EmbeddedPlaylistShim {
  container: HTMLElement;
  refresh?: () => void;
}

interface Window {
  LumiLibrary?: LumiLibraryShim;
  LumiPlayer?: LumiPlayerShim;
  /** Cross-window bus in Tauri 2 (`@tauri-apps/api/event`'s `emit`/`listen`). */
  __TAURI__?: unknown;
  /** Internal cross-channel: main.ts exposes the shared `Audio` so other modules can wire its events. */
  __LUMI_AUDIO__?: HTMLAudioElement;
  /** Internal cross-channel: main.ts exposes the toast helper. */
  __TOAST__?: (msg: string) => void;
  /** Internal cross-channel: a rebind hook skins call after `applySkinChoice` so we re-wire controls. */
  __LUMI_REBIND_MAIN__?: () => void;
  /** Internal cross-channel: the live embedded-playlist controller (only set on window where skin opts in). */
  __MELO_EMBEDDED_PLAYLIST__?: EmbeddedPlaylistShim;
  /** Internal cross-channel: visualizer pause/resume from layout changes. */
  __MELO_VISUALIZER_SET_PAUSED__?: (paused: boolean) => void;
}
