import type { Track, RepeatMode } from "./types";
import { busEmit, busOn, isTauri } from "./bus";

export type QueueSource =
  | { type: "tracks"; ids: string[] }
  | { type: "playlist"; id: string }
  | {
      type: "library";
      search?: string | null;
      artist?: string | null;
      album?: string | null;
      genre?: string | null;
      sort?: string | null;
    }
  | { type: "scan"; scanId: string }
  | { type: "folder"; path: string };

export type QueueState = {
  total: number;
  currentSeq: number | null;
  currentTrack: Track | null;
  currentPosition: number;
  shuffle: boolean;
  repeat: RepeatMode;
  currentOrderIndex: number | null;
};

export type QueuePage<T> = {
  items: T[];
  total: number;
  limit: number;
  offset: number;
  currentSeq: number | null;
};

export type QueueEntry = { seq: number } & Track;
type HistoryRow = {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  cover?: string;
  playedAt: number;
};

let invoke: (<T>(cmd: string, args?: Record<string, unknown>) => Promise<T>) | null =
  null;
let toAsset: ((path: string) => string) | null = null;
let initialized = false;
let state: QueueState = {
  total: 0,
  currentSeq: null,
  currentTrack: null,
  currentPosition: 0,
  shuffle: false,
  repeat: "off",
  currentOrderIndex: null,
};
const listeners = new Set<(s: QueueState) => void>();

function normalizeTrack(track: Track | null | undefined): Track | null {
  if (!track) return null;
  let cover = track.cover;
  if (cover && toAsset && !/^(data:|blob:|https?:)/i.test(cover)) {
    cover = toAsset(cover);
  }
  return { ...track, cover, source: "scan" };
}

function normalizeState(input: any): QueueState {
  const track = normalizeTrack(input?.currentTrack ?? null);
  const repeat: RepeatMode =
    input?.repeat === "all" ? "all" : input?.repeat === "one" ? "one" : "off";
  return {
    total: Number(input?.total ?? 0),
    currentSeq: input?.currentSeq ?? null,
    currentTrack: track,
    currentPosition: Number(input?.currentPosition ?? 0),
    shuffle: !!input?.shuffle,
    repeat,
    currentOrderIndex: input?.currentOrderIndex ?? null,
  };
}

async function loadCore() {
  if (initialized) return;
  if (isTauri) {
    const core = await import("@tauri-apps/api/core");
    invoke = core.invoke as typeof invoke;
    toAsset = core.convertFileSrc;
  }
  initialized = true;
}

function setInternalState(next: QueueState, notify = true) {
  state = next;
  if (notify) listeners.forEach((fn) => {
    try { fn(state); } catch {}
  });
}

async function fetchInitialState() {
  if (!isTauri || !invoke) return;
  try {
    const fetched = await invoke<QueueState>("queue_get_state");
    setInternalState(normalizeState(fetched));
  } catch {}
}

export async function setupQueue(): Promise<QueueState> {
  await loadCore();
  if (isTauri) {
    await fetchInitialState();
  }
  return state;
}

export function onQueueState(fn: (s: QueueState) => void): () => void {
  listeners.add(fn);
  try { fn(state); } catch {}
  return () => listeners.delete(fn);
}

export function getQueueState(): QueueState {
  return state;
}

export function getCurrentTrack(): Track | null {
  return state.currentTrack;
}

export async function getQueuePage(
  limit: number,
  offset: number,
): Promise<QueuePage<QueueEntry>> {
  await loadCore();
  if (isTauri && invoke) {
    const page = await invoke<QueuePage<any>>("queue_get_page", {
      limit,
      offset,
    });
    return {
      ...page,
      items: (page.items || [])
        .map((entry: any) => {
          const track = normalizeTrack(entry);
          if (!track) return null;
          return { ...track, seq: Number(entry.seq) };
        })
        .filter(Boolean) as QueueEntry[],
    };
  }
  return { items: [], total: 0, limit, offset, currentSeq: null };
}

async function callState(command: string, args?: Record<string, unknown>) {
  if (!invoke) return state;
  const result = await invoke<QueueState>(command, args);
  setInternalState(normalizeState(result));
  return state;
}

export async function populateQueue(
  source: QueueSource,
  opts: {
    startSeq?: number | null;
    startTrackId?: string | null;
    autoplay?: boolean;
  } = {},
): Promise<QueueState> {
  await loadCore();
  if (!invoke) return state;
  return callState("queue_populate", {
    source,
    startSeq: opts.startSeq ?? null,
    startTrackId: opts.startTrackId ?? null,
    autoplay: opts.autoplay ?? true,
  });
}

export async function appendToQueue(trackIds: string[]): Promise<QueueState> {
  await loadCore();
  if (!invoke || !trackIds.length) return state;
  return callState("queue_append", { trackIds });
}

export async function playNextInQueue(
  trackIds: string[],
): Promise<QueueState> {
  await loadCore();
  if (!invoke || !trackIds.length) return state;
  return callState("queue_play_next", { trackIds });
}

export async function removeFromQueue(seq: number): Promise<QueueState> {
  await loadCore();
  if (!invoke) return state;
  return callState("queue_remove", { seq });
}

export async function reorderQueue(
  fromSeq: number,
  toSeq: number,
): Promise<QueueState> {
  await loadCore();
  if (!invoke) return state;
  return callState("queue_reorder", { fromSeq, toSeq });
}

export async function clearQueue(): Promise<QueueState> {
  await loadCore();
  if (!invoke) return state;
  return callState("queue_clear");
}

export async function queueNext(): Promise<QueueState> {
  await loadCore();
  if (!invoke) return state;
  return callState("queue_next");
}

export async function queuePrev(): Promise<QueueState> {
  await loadCore();
  if (!invoke) return state;
  return callState("queue_prev");
}

export async function jumpQueue(
  seq: number,
  position = 0,
): Promise<QueueState> {
  await loadCore();
  if (!invoke) return state;
  return callState("queue_jump", { seq, position });
}

export async function setQueuePosition(position: number): Promise<void> {
  await loadCore();
  if (!invoke) return;
  state.currentPosition = position;
  try {
    await invoke("queue_set_position", { position });
  } catch {}
}

export async function setQueueShuffle(enabled: boolean): Promise<QueueState> {
  await loadCore();
  if (!invoke) return state;
  return callState("queue_set_shuffle", { enabled });
}

export async function setQueueRepeat(mode: RepeatMode): Promise<QueueState> {
  await loadCore();
  if (!invoke) return state;
  return callState("queue_set_repeat", { mode });
}

export async function getQueueHistory(limit = 100): Promise<HistoryRow[]> {
  await loadCore();
  if (!invoke) return [];
  return invoke<HistoryRow[]>("queue_history", { limit });
}

// Tauri emits this after every backend mutation.
busOn("melo:queue-state", (payload: any) => {
  setInternalState(normalizeState(payload));
});

// Convenience: other modules can also force a refresh when they know the
// database changed outside the queue commands (e.g. external edits).
busOn("melo:queue-refresh", () => {
  fetchInitialState();
});

// Expose for debugging and non-module callers.
(window as any).MeloQueue = {
  get state() {
    return state;
  },
  populate: populateQueue,
  append: appendToQueue,
  playNext: playNextInQueue,
  remove: removeFromQueue,
  reorder: reorderQueue,
  clear: clearQueue,
  next: queueNext,
  prev: queuePrev,
  jump: jumpQueue,
  setShuffle: setQueueShuffle,
  setRepeat: setQueueRepeat,
  page: getQueuePage,
  history: getQueueHistory,
};
