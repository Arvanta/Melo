import { busEmit, busOn, isTauri } from "./bus";
import { findHook } from "./skin";
import { parseLRC, resolveLyricsForTrack, clearLyricsCache, type LyricLine } from "./lyrics";
import type { Track } from "./types";

// ---------------------------------------------------------------------
// Optional skin slot: the *current* synced-lyric line.
//
// Settings → General → "Show current lyric line in skins"
// (`melo-pref-lyricsSkinLine` = "1", default OFF). When ON and the
// playing track has a timestamped LRC, Melo writes the active line into
// whatever element the active skin declares:
//
//   <div data-melo="current-lyric"></div>    ← live line
//   <div data-melo="next-lyric"></div>       ← the line after it (optional)
//   <div id="skinCurrentLyric"></div>        ← classic-id fallback
//   <div id="skinNextLyric"></div>
//
// Purely opt-in: a skin declaring no slot is completely untouched (no
// lyrics are even fetched for it); a plain (timestamp-less) LRC cannot
// drive a "current" line, so the slots stay hidden for it. The default
// skin doesn't use these hooks — its embedded panel already highlights
// the active line. See skins/README.md §5.7.
//
// What the engine writes into a slot element:
//   * textContent — the lyric line ("♪" for an empty/interlude line)
//   * class `melo-lyric-empty` + inline `display:none` while there is
//     nothing to show (the skin's own inline display is restored as soon
//     as a line appears)
//   * attribute `data-melo-lyric-time` — the line's start time, seconds
//   * CSS variable `--melo-lyric-progress` — 0 → 1 progress through the
//     line (only meaningful while a following line exists)
//   * `title` — the full line text, for hover
//   * clicking a slot seeks to the start of the current line
// On <html>: `melo-lyric-skin-on` marks the setting enabled and
// `melo-has-synced-lyrics` marks a synced LRC loaded, so skins can
// hide/show regions in CSS.
// ---------------------------------------------------------------------

const PREF_KEY = "melo-pref-lyricsSkinLine";

export function isSkinLyricLineEnabled(): boolean {
  return localStorage.getItem(PREF_KEY) === "1";
}

export function setupSkinLyricLine(audio: HTMLAudioElement, _toast?: (m: string) => void) {
  let enabled = isSkinLyricLineEnabled();

  // Playback / lyrics state
  let track: Track | null = null;
  let lines: LyricLine[] = [];
  let synced = false;
  let activeIdx = -1;
  let lastProgress = -1;
  let busTime = 0;
  let busTimeAt = 0;
  let loadToken = 0;

  // Hook elements — re-resolved lazily because a skin swap replaces the
  // whole player markup (and a later skin may or may not have the slots).
  let currentEl: HTMLElement | null = null;
  let nextEl: HTMLElement | null = null;
  let resolvedOnce = false;

  function resolveHooks() {
    const stale =
      !resolvedOnce ||
      (!currentEl && !nextEl) ||
      (currentEl ? !currentEl.isConnected : false) ||
      (nextEl ? !nextEl.isConnected : false);
    if (!stale) return;
    currentEl = findHook<HTMLElement>("skinCurrentLyric", "current-lyric");
    nextEl = findHook<HTMLElement>("skinNextLyric", "next-lyric");
    resolvedOnce = true;
    // Clicking the line seeks to its start (same action as clicking a line
    // in the Lyrics window).
    if (currentEl) currentEl.onclick = seekToActiveLine;
    if (nextEl) nextEl.onclick = seekToActiveLine;
  }

  function activeLineTime(): number {
    if (activeIdx < 0 || !lines[activeIdx]) return -1;
    return lines[activeIdx].time;
  }

  function seekToActiveLine() {
    const t = activeLineTime();
    if (t < 0) return;
    busEmit("melo:seek-playback", t);
    // Browser/demo mode shares the actual audio element.
    if (!isTauri) {
      audio.currentTime = t;
      audio.play().catch(() => {});
    }
  }

  function currentTime(): number {
    // Clock-source races are bounded, not eliminated.
    //
    // Two clocks feed this function:
    //   * `busTime` — the authoritative position from the player over the
    //     bus (`melo:playback-state` / `melo:playback-position`); the truth
    //     during crossfades, when the local <audio> may be the outgoing deck.
    //   * `audio.currentTime` — local fallback when no bus update arrived
    //     recently.
    //
    // The 1500ms freshness window is intentional: the player emits position
    // every ~250ms while playing; paused fires nothing but busTime stays
    // frozen at the pause position (exactly what the active-line calc wants);
    // on stop a final bus event fires, so a stale busTime never sticks.
    //
    // Accepted residual races (do not "fix"):
    //   1. Background-tab throttling: on return, busTime can be seconds
    //      stale; the next visible timeupdate/bus event catches up. A
    //      visibilitychange reset is deliberately absent — it would show the
    //      local clock for a frame while the bus is still recovering.
    //   2. Crossfade: the local <audio> is the outgoing deck — busTime is
    //      the correct source, not a race.
    //   3. Deck clock skew mid-crossfade: busTime snaps to the incoming deck
    //      when the bus emits; a one-frame jump is preferred over rendering
    //      the previous track's last line.
    if (isTauri && performance.now() - busTimeAt < 1500) return busTime;
    return audio.currentTime || busTime;
  }

  /** Show/hide a slot without clobbering a display value the skin set itself. */
  function setSlot(el: HTMLElement | null, text: string | null, time: number) {
    if (!el) return;
    if (!text) {
      if (el.dataset.meloLyricHidden !== "1") {
        el.dataset.meloLyricHidden = "1";
        el.dataset.meloLyricPrevDisplay = el.style.display || "";
      }
      el.style.display = "none";
      el.classList.add("melo-lyric-empty");
      if (el.textContent !== "") el.textContent = "";
      el.removeAttribute("data-melo-lyric-time");
      el.removeAttribute("title");
      return;
    }
    if (el.dataset.meloLyricHidden === "1") {
      el.style.display = el.dataset.meloLyricPrevDisplay || "";
      delete el.dataset.meloLyricHidden;
      delete el.dataset.meloLyricPrevDisplay;
    }
    el.classList.remove("melo-lyric-empty");
    if (el.textContent !== text) {
      el.textContent = text;
      // Re-arm the skin's per-line animation: remove the class, force a reflow
      // (so the CSS animation replays on back-to-back line changes) and re-add
      // it. Skins style it as `.melo-lyric-tick`.
      el.classList.remove("melo-lyric-tick");
      void el.offsetWidth;
      el.classList.add("melo-lyric-tick");
    }
    if (el.title !== text) el.title = text;
    if (time >= 0) el.setAttribute("data-melo-lyric-time", String(time));
  }

  function updateProgress(now: number) {
    if (!currentEl || activeIdx < 0) return;
    const cur = lines[activeIdx];
    const next = lines[activeIdx + 1];
    let p: number;
    if (cur && next && next.time > cur.time) {
      p = Math.min(1, Math.max(0, (now - cur.time) / (next.time - cur.time)));
    } else {
      // Last line of the track: there is no following timestamp to
      // interpolate towards, so report it as complete instead of leaving the
      // previous line's partially-filled bar frozen on screen.
      p = 1;
    }
    // 0.01 quantization + ~4Hz timeupdate made the underline visibly chunky;
    // rAF-driven frames can afford 0.0015.
    if (Math.abs(p - lastProgress) < 0.0015) return;
    lastProgress = p;
    currentEl.style.setProperty("--melo-lyric-progress", p.toFixed(3));
  }

  function computeActiveIndex(t: number): number {
    // Binary search for the last line whose timestamp has passed.
    let lo = 0;
    let hi = lines.length - 1;
    let found = -1;
    while (lo <= hi) {
      const mid = (lo + hi) >> 1;
      if (lines[mid].time <= t) {
        found = mid;
        lo = mid + 1;
      } else {
        hi = mid - 1;
      }
    }
    return found;
  }

  function update(force = false) {
    document.documentElement.classList.toggle("melo-lyric-skin-on", enabled);
    resolveHooks();
    if (!enabled) {
      // Off: the slot must not keep a stale line (or the skin's static
      // placeholder text) on screen.
      setSlot(currentEl, null, -1);
      setSlot(nextEl, null, -1);
      document.documentElement.classList.remove("melo-has-synced-lyrics");
      if (currentEl) currentEl.style.removeProperty("--melo-lyric-progress");
      return;
    }
    if (!currentEl && !nextEl) {
      // This skin has no slot — nothing to render (and nothing was fetched).
      document.documentElement.classList.remove("melo-has-synced-lyrics");
      return;
    }

    const t = currentTime();
    const idx = synced ? computeActiveIndex(t) : -1;
    const lineChanged = idx !== activeIdx;
    activeIdx = idx;

    const currentLine = idx >= 0 ? lines[idx] : null;
    // Before the first timestamp (intro) there is no *current* line yet, but
    // the upcoming one is still useful as the "next" line.
    const nextLine = synced && lines.length
      ? (idx >= 0 ? lines[idx + 1] || null : lines[0])
      : null;

    setSlot(currentEl, currentLine ? currentLine.text || "♪" : null, currentLine ? currentLine.time : -1);
    setSlot(nextEl, nextLine ? nextLine.text || "♪" : null, nextLine ? nextLine.time : -1);
    document.documentElement.classList.toggle("melo-has-synced-lyrics", !!synced && lines.length > 0);
    updateProgress(t);

    if (lineChanged || force) {
      busEmit("melo:lyric-line", {
        trackId: track?.id ?? null,
        index: idx,
        text: currentLine ? currentLine.text : null,
        time: currentLine ? currentLine.time : -1,
        next: nextLine ? nextLine.text : null,
        nextTime: nextLine ? nextLine.time : -1,
      });
    }
  }

  function onPosition() {
    if (!enabled || !synced) return;
    update();
  }

  async function loadTrack(next: Track | null) {
    track = next;
    resolveHooks();
    const hasHook = !!currentEl || !!nextEl;
    const token = ++loadToken;

    if (!next || !enabled || !hasHook) {
      // No slot / feature off / nothing playing: drop any previous line.
      lines = [];
      synced = false;
      activeIdx = -1;
      lastProgress = -1;
      if (currentEl) currentEl.style.removeProperty("--melo-lyric-progress");
      update(true);
      return;
    }

    const res = await resolveLyricsForTrack(next);
    if (token !== loadToken) return; // a newer track took over while we waited
    const parsed = parseLRC(res.text || "");
    // Only a *synced* LRC can drive a "current line"; plain lyrics have no
    // timestamps to follow, so the slots stay hidden for them.
    lines = parsed.isSynced ? parsed.lines.filter((l) => l.time >= 0) : [];
    synced = parsed.isSynced && lines.length > 0;
    activeIdx = -1;
    lastProgress = -1;
    if (currentEl) currentEl.style.removeProperty("--melo-lyric-progress");
    update(true);
  }

  // ---- wiring ----
  document.documentElement.classList.toggle("melo-lyric-skin-on", enabled);

  // timeupdate fires only ~4×/second, so the progress underline moved in
  // visible chunks. The persistent, self-sufficient rAF ticker fixes this:
  // it no-ops while paused/unsynced and feeds audio.currentTime (the
  // smooth media clock) into --melo-lyric-progress while playing. No
  // start/stop coupling — a loop started from play events starved when
  // playback began before the LRC finished loading.
  const progressFrame = () => {
    requestAnimationFrame(progressFrame);
    try {
      if (!enabled || !synced || audio.paused || activeIdx < 0) return;
      updateProgress(audio.currentTime);
    } catch { /* the ticker must never die */ }
  };
  requestAnimationFrame(progressFrame);

  audio.addEventListener("timeupdate", () => {
    // A local fallback clock for the (browser) case where no bus position
    // has arrived yet — in Tauri the bus value stays authoritative, because
    // during a crossfade this window's own <audio> element may be the deck
    // that is being faded out.
    onPosition();
  });

  window.addEventListener("lumi:trackChange", (e: any) => loadTrack(e.detail || null));
  busOn("melo:track-changed", (t: any) => loadTrack(t || null));
  busOn("melo:playback-state", (state: any) => {
    if (!state) return;
    busTime = Number(state.currentTime) || 0;
    busTimeAt = performance.now();
    if (state.track && state.track.id !== (track?.id ?? null)) loadTrack(state.track);
    else update();
  });
  busOn("melo:playback-position", (seconds: any) => {
    busTime = Number(seconds) || 0;
    busTimeAt = performance.now();
    update();
  });
  busOn("melo:pref-changed", (p: any) => {
    if (!p) return;
    if (p.key === "lyricsSkinLine") {
      enabled = !!p.value;
      lastProgress = -1;
      if (!enabled) {
        lines = [];
        synced = false;
        activeIdx = -1;
        if (currentEl) currentEl.style.removeProperty("--melo-lyric-progress");
        update(true);
      } else {
        loadTrack(track);
      }
    } else if (p.key === "lyricsOnline" || p.key === "lyricsSaveMode") {
      // The resolver cache is preference-aware, but the entry written by the
      // *old* preference is now unreachable anyway — re-resolve so a track
      // that had "no lyrics" can be found online right away.
      clearLyricsCache(track?.path || track?.id);
      if (enabled) loadTrack(track);
    }
  });
  function onSkinSwap() {
    // A new skin may (not) declare the slots — re-resolve and repaint.
    resolvedOnce = false;
    lastProgress = -1;
    loadTrack(track);
  }

  busOn("melo:skin-changed", onSkinSwap);

  // Belt and braces for the same event: a custom skin loads asynchronously
  // and the default skin re-installs by re-serialising the player card, so
  // the new markup may not exist yet when `melo:skin-changed` arrives (in
  // either direction). Watching the card's childList is immune to listener
  // ordering — whichever happens last triggers the repaint. The observer
  // watches only direct children: the engine's own writes happen deep
  // inside the slot, so a repaint can never re-trigger it.
  const playerCard = document.getElementById("playerCard");
  // `window.MutationObserver` rather than the bare global: same object in a
  // browser/WebView, but it also works when the module is bundled and run
  // somewhere the bare identifier is not defined (test harnesses, jsdom).
  const MO = (window as any).MutationObserver as typeof MutationObserver | undefined;
  if (playerCard && MO) {
    new MO(() => onSkinSwap()).observe(playerCard, { childList: true });
  }

  // Initial load — mirrors lyrics.ts so the slot fills even when this
  // window/track was set up before the tracker existed.
  const queue = (window as any).__LUMI_QUEUE__;
  if (Array.isArray(queue) && queue.length > 0) {
    loadTrack(queue[(window as any).LumiPlayer?.currentIndex || 0] || null);
  } else {
    try {
      const saved = JSON.parse(localStorage.getItem("melo-current-track") || "null");
      if (saved) loadTrack(saved);
    } catch {}
  }
  busEmit("melo:request-playback-state");
  setTimeout(() => busEmit("melo:request-playback-state"), 250);

  (window as any).MeloLyricLine = {
    isEnabled: () => enabled,
    refresh: () => loadTrack(track),
  };
}
