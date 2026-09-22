import { busEmit, busOn } from "./bus";
import { getAppVersion } from "./version";
import type { Track } from "./types";

export interface LyricLine {
  time: number; // in seconds
  text: string;
}

export function parseLRC(lrcText: string): { isSynced: boolean; lines: LyricLine[]; raw: string } {
  if (!lrcText || !lrcText.trim()) {
    return { isSynced: false, lines: [], raw: "" };
  }

  const lines: LyricLine[] = [];
  const rawLines = lrcText.split(/\r?\n/);
  const timeRegex = /\[(\d{1,2}):(\d{2})(?:\.(\d{1,3}))?\]/g;

  let hasTimestamp = false;

  for (const line of rawLines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    // Check for ID tags like [ar:Artist], [ti:Title]
    if (/^\[[a-z]{2,8}:/i.test(trimmed)) {
      continue;
    }

    const matches = [...trimmed.matchAll(timeRegex)];
    if (matches.length > 0) {
      hasTimestamp = true;
      const text = trimmed.replace(timeRegex, "").trim();
      for (const m of matches) {
        const min = parseInt(m[1], 10);
        const sec = parseInt(m[2], 10);
        const msStr = m[3] || "0";
        const ms = msStr.length === 2 ? parseInt(msStr, 10) * 10 : msStr.length === 1 ? parseInt(msStr, 10) * 100 : parseInt(msStr.slice(0, 3), 10);
        const time = min * 60 + sec + ms / 1000;
        lines.push({ time, text });
      }
    } else {
      lines.push({ time: -1, text: trimmed });
    }
  }

  lines.sort((a, b) => a.time - b.time);
  return { isSynced: hasTimestamp, lines, raw: lrcText };
}

// ---------------------------------------------------------------------
// Shared lyrics resolution.
//
// Up to three consumers can ask for the same track's lyrics inside one
// window (Lyrics window, skin-embedded panel, skin current-line slot);
// all go through resolveLyricsForTrack(), which memoizes results and
// de-duplicates in-flight lookups — one track never triggers two
// identical Rust lookups or LRCLIB requests.
//
// The cache key includes both lyrics preferences, so flipping a toggle
// re-resolves instead of replaying a cached "no lyrics found". Negative
// results expire after NEGATIVE_TTL_MS, so a .lrc dropped next to a
// track mid-session is picked up without a restart.
// ---------------------------------------------------------------------
export interface LyricsLookupResult {
  text: string | null;
  status: string;
  statusNote?: string;
}

const NEGATIVE_TTL_MS = 5 * 60 * 1000;
// Hard per-request timeout so a hung connection can't leave the UI stuck
// on "Searching online…" indefinitely.
const LYRICS_REQUEST_TIMEOUT_MS = 8000;
// Bounded LRU so a long-running session with many distinct tracks (or
// frequent mode flips) can't grow this map without ceiling.
const LYRICS_CACHE_CAP = 2000;
const lyricsCache = new Map<string, { at: number; res: LyricsLookupResult }>();
function lyricsCacheSet(key: string, value: { at: number; res: LyricsLookupResult }) {
  lyricsCache.delete(key);
  lyricsCache.set(key, value);
  while (lyricsCache.size > LYRICS_CACHE_CAP) {
    const oldest = lyricsCache.keys().next().value;
    if (oldest === undefined) break;
    lyricsCache.delete(oldest);
  }
}
function lyricsCacheGet(key: string): { at: number; res: LyricsLookupResult } | undefined {
  const hit = lyricsCache.get(key);
  if (hit && lyricsCache.size > 1) {
    lyricsCache.delete(key);
    lyricsCache.set(key, hit);
  }
  return hit;
}
const lyricsInFlight = new Map<string, Promise<LyricsLookupResult>>();

function lyricsCacheKey(track: Track): string {
  const online = localStorage.getItem("melo-pref-lyricsOnline") === "1" ? "online" : "offline";
  const mode = localStorage.getItem("melo-pref-lyricsSaveMode") || "cache";
  return `${track.path || track.id}::${online}:${mode}`;
}

/** Drop cached lookups — all of them, or just one track (by path or id). */
export function clearLyricsCache(trackPathOrId?: string) {
  if (!trackPathOrId) {
    lyricsCache.clear();
    lyricsInFlight.clear();
    return;
  }
  for (const key of [...lyricsCache.keys()]) {
    if (key.startsWith(trackPathOrId + "::")) lyricsCache.delete(key);
  }
}

export async function resolveLyricsForTrack(track: Track | null | undefined): Promise<LyricsLookupResult> {
  if (!track) {
    return { text: null, status: "No track playing", statusNote: "Open a song to see its lyrics here." };
  }
  // In-memory lyrics (already read from the tags) win without any lookup.
  if (track.lyrics && track.lyrics.trim().length > 0) return { text: track.lyrics, status: "" };

  const key = lyricsCacheKey(track);
  const hit = lyricsCacheGet(key);
  if (hit && (hit.res.text || Date.now() - hit.at < NEGATIVE_TTL_MS)) return hit.res;

  const pending = lyricsInFlight.get(key);
  if (pending) return pending;

  const job = fetchLyricsUncached(track)
    .then((res) => {
      lyricsCacheSet(key, { at: Date.now(), res });
      return res;
    })
    .finally(() => {
      lyricsInFlight.delete(key);
    });
  lyricsInFlight.set(key, job);
  return job;
}

async function fetchLyricsUncached(track: Track): Promise<LyricsLookupResult> {
  if ((window as any).__TAURI__) {
    try {
      const { invoke } = await import("@tauri-apps/api/core");
      // Sidecar .lrc + embedded lyrics
      const local: string | null = await invoke("get_track_lyrics", { path: track.path });
      if (local && local.trim().length > 0) return { text: local, status: "" };
      // Central cache
      const cached: string | null = await invoke("get_cached_lyrics", { trackPath: track.path });
      if (cached && cached.trim().length > 0) return { text: cached, status: "" };
    } catch {}

    // Online lookup (only if user opted in via Settings)
    const onlineEnabled = localStorage.getItem("melo-pref-lyricsOnline") === "1";
    if (onlineEnabled) {
      const res = await fetchOnlineLyrics(track);
      if (res.text && res.text.trim().length > 0) {
        const mode = localStorage.getItem("melo-pref-lyricsSaveMode") || "cache";
        try {
          const { invoke } = await import("@tauri-apps/api/core");
          await invoke("save_lyrics_lrc", { trackPath: track.path, content: res.text, mode });
          // Cross-window de-duplication: the lyrics are on disk now, so any other
          // window can drop its cached/negative result and read them locally
          // instead of re-asking the network.
          busEmit("melo:lyrics-resolved", { trackPath: track.path });
        } catch (err) {
          // Surface the save failure instead of swallowing it — the lyrics still
          // display, but the user learns nothing was stored (e.g. read-only music
          // folder in sidecar mode).
          busEmit("melo:lyrics-save-failed", { trackPath: track.path, error: String(err) });
        }
        return { text: res.text, status: "" };
      }
      return res;
    }
  }
  return { text: null, status: "No lyrics found", statusNote: "Place a matching .lrc file next to the song, or enable online lyrics in Settings." };
}

async function fetchOnlineLyrics(track: Track): Promise<LyricsLookupResult> {
  if (!track || !track.title) {
    return { text: null, status: "No metadata", statusNote: "Track is missing a title tag — can't search online." };
  }

  // Try up to five times with a widening duration window, matching how
  // other LRCLIB clients (LRCGET, MusicBee, etc.) handle it:
  //   1. exact duration (rounded to nearest second)
  //   2. duration +2s, then duration -2s
  //   3. duration +4s, then duration -4s
  // A final 404 after all five = genuinely not in LRCLIB (or duration so
  // far off that we shouldn't risk pulling the wrong lyrics).
  const baseDur = track.duration && track.duration > 0 ? Math.round(track.duration) : 0;
  const attempts: Array<{ label: string; dur: number | null }> = [
    { label: "exact", dur: baseDur > 0 ? baseDur : null },
    { label: "+2s",   dur: baseDur > 0 ? baseDur + 2 : null },
    { label: "-2s",   dur: baseDur > 2 ? baseDur - 2 : null },
    { label: "+4s",   dur: baseDur > 0 ? baseDur + 4 : null },
    { label: "-4s",   dur: baseDur > 4 ? baseDur - 4 : null },
  ];

  let lastStatus: string = "Not on LRCLIB";
  let lastNote: string = "No lyrics were submitted for this track yet. You can add one at lrclib.net.";

  // Identify ourselves with the real runtime version, cached so this never
  // adds per-request latency.
  const version = await getAppVersion();
  const userAgent = `Melo/${version} (https://github.com/Arvanta/Melo)`;

  for (const attempt of attempts) {
    const params = new URLSearchParams();
    if (track.artist) params.set("artist_name", track.artist);
    params.set("track_name", track.title);
    if (track.album) params.set("album_name", track.album);
    if (attempt.dur != null) params.set("duration", String(attempt.dur));
    const url = `https://lrclib.net/api/get?${params.toString()}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), LYRICS_REQUEST_TIMEOUT_MS);
    let resp: Response;
    try {
      resp = await fetch(url, {
        signal: controller.signal,
        headers: {
          "User-Agent": userAgent,
          "Lrclib-Client": userAgent,
        },
      });
    } catch {
      return { text: null, status: "No connection", statusNote: "Could not reach LRCLIB — check your internet connection." };
    } finally {
      clearTimeout(timeoutId);
    }

    if (resp.ok) {
      let data: any;
      try {
        data = await resp.json();
      } catch {
        return { text: null, status: "Invalid response", statusNote: "LRCLIB returned unreadable data." };
      }
      if (data && typeof data === "object") {
        const synced: string | undefined = data.syncedLyrics;
        if (synced && typeof synced === "string" && synced.trim().length > 0) return { text: synced.trim(), status: "" };
        const plain: string | undefined = data.plainLyrics;
        if (plain && typeof plain === "string" && plain.trim().length > 0) return { text: plain.trim(), status: "" };
        // Track exists but no lyrics submitted — no point retrying with a
        // different duration; this is a definitive answer.
        return { text: null, status: "No lyrics available", statusNote: "LRCLIB has this track in its database but no lyrics were submitted for it." };
      }
      return { text: null, status: "Empty response", statusNote: "LRCLIB returned no data for this track." };
    }

    if (resp.status === 429) {
      return { text: null, status: "Rate limited", statusNote: "LRCLIB is rate-limiting requests. Wait a moment and try again." };
    }
    if (resp.status >= 500) {
      return { text: null, status: `Server error (${resp.status})`, statusNote: "LRCLIB returned an error. Try again later." };
    }
    // 404 / other client error → fall through to next looser attempt
    if (resp.status === 404) {
      lastStatus = "Not on LRCLIB";
      lastNote = "No lyrics were submitted for this track yet. You can add one at lrclib.net.";
      continue;
    }
    lastStatus = `Server error (${resp.status})`;
    lastNote = "LRCLIB returned an error. Try again later.";
  }
  return { text: null, status: lastStatus, statusNote: lastNote };
}

export function setupLyrics(
  audio: HTMLAudioElement,
  toast: (m: string) => void,
  elements?: { container: HTMLElement; status?: HTMLElement | null; title?: HTMLElement | null }
) {
  const lyricsContainer = elements ? elements.container : (document.getElementById("lyricsContainer") as HTMLElement | null);
  const lyricsStatus = elements ? (elements.status ?? null) : (document.getElementById("lyricsStatus") as HTMLElement | null);
  const lyricsTitle = elements ? (elements.title ?? null) : (document.getElementById("lyricsTrackTitle") as HTMLElement | null);
  // Nothing to render into (e.g. the current document/skin doesn't have a
  // lyrics container at all) — bail out before subscribing to any events.
  if (!lyricsContainer) return;

  let currentParsed: { isSynced: boolean; lines: LyricLine[]; raw: string } = { isSynced: false, lines: [], raw: "" };
  let currentTrackId: string | null = null;
  let activeIndex = -1;
  let playbackTime = 0;
  let loadToken = 0;

  async function loadTrackLyrics(track: Track | null) {
    // Every load claims a token; a slow lookup (Rust round-trip, LRCLIB, …)
    // from a track the user already skipped past must not overwrite the
    // lyrics of the track that is playing now.
    const token = ++loadToken;
    if (!track) {
      currentTrackId = null;
      currentParsed = { isSynced: false, lines: [], raw: "" };
      if (lyricsTitle) lyricsTitle.textContent = "No track playing";
      setStatus("No track playing", "Open a song to see its lyrics here.", false);
      renderLyrics();
      return;
    }
    currentTrackId = track.id;
    if (lyricsTitle) lyricsTitle.textContent = `${track.title} — ${track.artist}`;

    // Show a loading state while the online lookup (if enabled) is in flight.
    const onlineEnabled = localStorage.getItem("melo-pref-lyricsOnline") === "1";
    if (onlineEnabled) {
      setStatus("Searching online…", "Looking up lyrics on LRCLIB…", true);
    } else {
      setStatus("Searching…", "Looking for local lyrics…", false);
    }

    const res = await resolveLyricsForTrack(track);
    if (token !== loadToken) return; // a newer track took over while we waited
    currentParsed = parseLRC(res.text || "");
    if (!currentParsed.lines.length) {
      setStatus(res.status || "No synced lyrics found", res.statusNote || "Place a matching .lrc file next to the song, or enable online lyrics in Settings.");
    } else {
      clearStatus();
    }
    renderLyrics();
  }

  function setStatus(title: string, note?: string, searching = false) {
    if (!lyricsStatus) return;
    lyricsStatus.style.display = "flex";
    lyricsStatus.classList.toggle("searching", searching);
    lyricsStatus.innerHTML = `<div class="lyrics-status-title">${escapeHtml(title)}</div>${note ? `<div class="lyrics-status-note">${escapeHtml(note)}</div>` : ""}`;
  }
  function clearStatus() {
    if (lyricsStatus) lyricsStatus.style.display = "none";
  }
  function escapeHtml(s: string): string {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  function renderLyrics() {
    if (!lyricsContainer) return;
    lyricsContainer.innerHTML = "";
    activeIndex = -1;

    if (!currentParsed.lines.length) {
      return; // status block is already shown by loadTrackLyrics
    }

    clearStatus();

    currentParsed.lines.forEach((line, idx) => {
      const el = document.createElement("div");
      el.className = "lyric-line";
      el.dataset.idx = String(idx);
      el.dataset.time = String(line.time);
      el.textContent = line.text || "♪";

      if (line.time >= 0) {
        el.style.cursor = "pointer";
        el.title = `Seek to ${Math.floor(line.time / 60)}:${Math.floor(line.time % 60).toString().padStart(2, "0")}`;
        el.addEventListener("click", () => {
          busEmit("melo:seek-playback", line.time);
          // Browser/demo mode shares the actual audio element.
          if (!(window as any).__TAURI__) {
            audio.currentTime = line.time;
            audio.play().catch(() => {});
          }
        });
      }

      lyricsContainer.appendChild(el);
    });
  }

  function updateActiveLine() {
    if (!lyricsContainer || !currentParsed.isSynced || !currentParsed.lines.length) return;
    const curTime = (window as any).__TAURI__ ? playbackTime : audio.currentTime;

    let targetIndex = -1;
    for (let i = 0; i < currentParsed.lines.length; i++) {
      if (currentParsed.lines[i].time <= curTime) {
        targetIndex = i;
      } else {
        break;
      }
    }

    if (targetIndex !== activeIndex) {
      activeIndex = targetIndex;
      const allLines = lyricsContainer.querySelectorAll(".lyric-line");
      allLines.forEach((el, i) => {
        el.classList.toggle("active", i === activeIndex);
        el.classList.toggle("passed", i < activeIndex);
      });

      if (activeIndex >= 0 && allLines[activeIndex]) {
        const activeEl = allLines[activeIndex] as HTMLElement;
        const containerHeight = lyricsContainer.clientHeight;
        const lineTop = activeEl.offsetTop - lyricsContainer.offsetTop;
        const targetScroll = lineTop - containerHeight / 2 + activeEl.clientHeight / 2;
        lyricsContainer.scrollTo({ top: Math.max(0, targetScroll), behavior: "smooth" });
      }
    }
  }

  audio.addEventListener("timeupdate", updateActiveLine);

  // Settings propagation: when "fetch lyrics online" or the save mode
  // changes in any window, drop cached lookups so the NEXT resolution
  // runs under the new preferences. Cache-invalidation only — flipping a
  // toggle never fires a network request by itself. Cache keys already
  // embed both prefs, so this is belt-and-braces.
  busOn("melo:pref-changed", (p: any) => {
    if (p && (p.key === "lyricsOnline" || p.key === "lyricsSaveMode")) {
      clearLyricsCache();
    }
  });
  // Another window saved online lyrics for this track: forget our cached
  // (possibly "not found") result so the next display hits disk.
  busOn("melo:lyrics-resolved", (p: any) => {
    if (p && typeof p.trackPath === "string") clearLyricsCache(p.trackPath);
  });

  window.addEventListener("lumi:trackChange", (e: any) => {
    loadTrackLyrics(e.detail);
  });
  busOn("melo:track-changed", (t: any) => {
    loadTrackLyrics(t);
  });
  busOn("melo:playback-state", (state: any) => {
    if (!state) return;
    playbackTime = Number(state.currentTime) || 0;
    if (state.track && state.track.id !== currentTrackId) loadTrackLyrics(state.track);
    else updateActiveLine();
  });
  busOn("melo:playback-position", (seconds: any) => {
    playbackTime = Number(seconds) || 0;
    updateActiveLine();
  });

  // Initial load works even when this window was closed during track import.
  const queue = (window as any).__LUMI_QUEUE__;
  if (Array.isArray(queue) && queue.length > 0) {
    loadTrackLyrics(queue[(window as any).LumiPlayer?.currentIndex || 0]);
  } else {
    try {
      const saved = JSON.parse(localStorage.getItem("melo-current-track") || "null");
      if (saved) loadTrackLyrics(saved);
    } catch {}
  }
  // Tauri event listeners are registered asynchronously, so request twice
  // to eliminate a creation-time race without polling continuously.
  busEmit("melo:request-playback-state");
  setTimeout(() => busEmit("melo:request-playback-state"), 250);

  (window as any).LumiLyrics = { loadTrackLyrics, parseLRC };
}
