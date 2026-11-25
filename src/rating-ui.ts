// Star rating in the windows that show tracks (round 125): the player-card
// stars, keys 0-5 for the playing track, and `rateTracks` for the context
// menus / library. The database changes at once; the tag in the file is written
// right away too, except for the track that is playing (Windows will not
// replace an open file) — that one is written when the track changes.
import { busEmit, busOn } from "./bus";
import { findHook } from "./skin";
import { clampStars, nextStars, starsForKey, starsHtml, starsLabel } from "./rating";

export type RatingState = { id: string; rating: number; pending: boolean };
type RatingSetResult = { written: string[]; paths: string[]; pending: string[]; failed: { id: string; path: string; error: string }[] };

let invokeFn: (<T = any>(cmd: string, args?: Record<string, unknown>) => Promise<T>) | null = null;
let toastFn: (m: string) => void = () => {};
let current: { id: string; path: string } | null = null;
let currentRating = 0;
let flushTimer = 0;
let started = false;

async function core() {
  if (!invokeFn) invokeFn = (await import("@tauri-apps/api/core")).invoke as any;
  return invokeFn!;
}

/** The track that is playing: this window's own knowledge, else the snapshot the player keeps. */
function playingPath(): string | null {
  if (current) return current.path;
  try {
    const raw = localStorage.getItem("melo-current-track");
    const t = raw ? JSON.parse(raw) : null;
    return typeof t?.path === "string" ? t.path : null;
  } catch { return null; }
}

export async function ratingsOf(ids: string[]): Promise<Map<string, RatingState>> {
  const out = new Map<string, RatingState>();
  if (!ids.length) return out;
  try {
    const invoke = await core();
    for (const r of await invoke<RatingState[]>("ratings_of", { trackIds: ids })) out.set(r.id, r);
  } catch {}
  return out;
}

export async function rateTracks(ids: string[], stars: number): Promise<void> {
  const unique = Array.from(new Set(ids.filter(Boolean)));
  if (!unique.length) return;
  const value = clampStars(stars);
  // Show it at once; the write below may take a moment.
  if (current && unique.includes(current.id)) { currentRating = value; render(); }
  try {
    const invoke = await core();
    const playing = playingPath();
    const deferPaths = [playing].filter((p): p is string => !!p);
    // Ids are file paths. A queued next track may already be preloaded (open);
    // the player lets go of it before its file is replaced.
    const willWrite = unique.filter(id => id !== playing);
    if (willWrite.length) {
      busEmit("melo:tags-will-write", { paths: willWrite });
      await new Promise(r => window.setTimeout(r, 250));
    }
    const res = await invoke<RatingSetResult>("rating_set", { items: unique.map(trackId => ({ trackId, stars: value })), deferPaths });
    announceWritten(res.paths);
    if (res.failed.length) {
      toastFn(res.failed.length === unique.length
        ? "Rating saved in Melo, but the file couldn't be updated yet (in use?). It will be retried."
        : `Rating saved; ${res.failed.length} file${res.failed.length === 1 ? "" : "s"} couldn't be updated yet and will be retried.`);
    }
  } catch (e) {
    toastFn("Couldn't save the rating — " + String(e));
    return;
  }
  busEmit("melo:ratings-changed", { ids: unique, stars: value });
}

/** The player keeps WebView2 from serving the old bytes of a rewritten file (cache-busting asset URL). */
function announceWritten(paths: string[] | undefined) {
  if (paths && paths.length) busEmit("melo:tags-written", { ids: [], paths, released: [] });
}

function hook(): HTMLElement | null {
  return findHook<HTMLElement>("trackRating", "rating");
}

function render() {
  const el = hook();
  if (!el) return;
  el.hidden = !current;
  el.classList.add("track-rating");
  el.innerHTML = current ? starsHtml(currentRating) : "";
  el.title = current ? starsLabel(currentRating) + " — click a star, or press 0–5" : "";
}

async function refreshCurrent() {
  const t = current;
  if (!t) { currentRating = 0; render(); return; }
  const r = (await ratingsOf([t.id])).get(t.id);
  if (current?.id !== t.id) return; // the track changed meanwhile
  currentRating = r?.rating ?? 0;
  render();
}

function scheduleFlush() {
  window.clearTimeout(flushTimer);
  flushTimer = window.setTimeout(async () => {
    try {
      const invoke = await core();
      const res = await invoke<RatingSetResult>("rating_flush", { avoidPaths: current ? [current.path] : [] });
      announceWritten(res?.paths);
    } catch {}
  }, 1500);
}

function typingTarget(t: EventTarget | null): boolean {
  const el = t as HTMLElement | null;
  if (!el) return false;
  return el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.tagName === "SELECT" || el.isContentEditable;
}

/** `owner` = the window that plays audio (shows the card stars, owns keys and flushing). */
export function setupRating(toast: (m: string) => void, owner: boolean) {
  toastFn = toast;
  if (started) return;
  started = true;
  busOn("melo:track-changed", (t: any) => {
    current = t && t.id ? { id: String(t.id), path: String(t.path || "") } : null;
    void refreshCurrent();
    if (owner) scheduleFlush();
  });
  busOn("melo:tracks-renamed", (p: any) => {
    const m = (Array.isArray(p?.map) ? p.map : []).find((x: any) => x.oldId === current?.id);
    if (m && current) current = { id: m.newId, path: m.newPath };
  });
  busOn("melo:ratings-changed", () => { void refreshCurrent(); });
  busOn("melo:tags-written", () => { void refreshCurrent(); });
  busOn("melo:skin-changed", () => window.setTimeout(render, 50));
  if (!owner) return;
  document.addEventListener("click", e => {
    const b = (e.target as HTMLElement | null)?.closest?.("#trackRating [data-star], [data-melo=\"rating\"] [data-star]") as HTMLElement | null;
    if (!b || !current) return;
    void rateTracks([current.id], nextStars(currentRating, Number(b.dataset.star)));
  });
  window.addEventListener("keydown", e => {
    if (e.ctrlKey || e.altKey || e.metaKey || e.shiftKey || typingTarget(e.target) || !current) return;
    const n = starsForKey(e.key);
    if (n === null) return;
    e.preventDefault();
    toast(n === 0 ? "Rating cleared" : starsLabel(n));
    void rateTracks([current.id], n);
  });
  render();
}
