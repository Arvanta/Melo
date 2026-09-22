import type { Track, RepeatMode } from "./types";
import { busEmit, busOn, isTauri } from "./bus";
import { applyDynamicAmbientTheme } from "./cover";
import { getAudioGraph } from "./audio-graph";
import { findHook } from "./skin";

export function setupPlayer(primaryAudio: HTMLAudioElement, toast: (m: string) => void) {
  let btnPlay: HTMLButtonElement, iconPlay: HTMLElement, iconPause: HTMLElement;
  let btnPrev: HTMLButtonElement, btnNext: HTMLButtonElement, btnShuffle: HTMLButtonElement, btnRepeat: HTMLButtonElement;
  let btnStop: HTMLButtonElement | null = null;
  let seekBar: HTMLInputElement, volBar: HTMLInputElement, curTime: HTMLElement, durTime: HTMLElement, volPct: HTMLElement, volIcon: HTMLElement;
  let trackTitle: HTMLElement, trackArtist: HTMLElement, trackAlbum: HTMLElement, trackCodec: HTMLElement, trackSpecs: HTMLElement;
  let coverImg: HTMLImageElement, coverFallback: HTMLElement;

  // "audio" always points at the currently active / UI-bound physical
  // <audio> deck. Playback normally runs on `primaryAudio`; a second
  // element is created lazily only when Crossfade is used, and `audio` is
  // reassigned the instant a crossfade finishes (finishCrossfade()).
  // Everything below reads/writes through `audio`, so it transparently
  // follows the playing deck.
  let audio: HTMLAudioElement = primaryAudio;
  let secondaryAudio: HTMLAudioElement | null = null;

  // User volume (percent) as tracked by the slider, kept separately from
  // `audio.volume` (which goes to 0 during fade-out-on-pause) so a skin
  // swap restores the real value. PERSISTED (`melo-volume`): every skin
  // template ships the markup default value="60", so without a saved
  // value the player would reset to 60% on every launch.
  const DEFAULT_VOLUME_PCT = 60;
  function readSavedVolumePct(): number {
    const raw = parseInt(localStorage.getItem("melo-volume") ?? "", 10);
    if (!Number.isFinite(raw)) return DEFAULT_VOLUME_PCT;
    return Math.max(0, Math.min(100, raw));
  }
  let userVolumePct = readSavedVolumePct();

  // Dragging the slider fires `input` continuously; coalesce the writes so a
  // drag is one localStorage hit instead of dozens.
  let volumeSaveTimer: ReturnType<typeof setTimeout> | null = null;
  function persistVolume() {
    if (volumeSaveTimer) clearTimeout(volumeSaveTimer);
    volumeSaveTimer = setTimeout(() => {
      volumeSaveTimer = null;
      try { localStorage.setItem("melo-volume", String(userVolumePct)); } catch {}
    }, 180);
  }
  function persistMuted(muted: boolean) {
    try { localStorage.setItem("melo-muted", muted ? "1" : "0"); } catch {}
  }

  // Restore the saved mute state once, before anything binds the UI.
  // (`syncMuteUI()` in bindDOM then paints the correct icon.)
  if (localStorage.getItem("melo-muted") === "1") primaryAudio.muted = true;
  primaryAudio.volume = userVolumePct / 100;

  let queue: Track[] = [];
  let currentIndex = 0;
  // Generation token: any new play-tracks invalidates a pending full-queue
  // hydration from an earlier fromQueue click.
  let queueGen = 0;
  let isShuffle = false;
  let repeatMode: RepeatMode = "off";
  let isSeeking = false;

  function computeNextIndex(): number | null {
    if (!queue.length) return null;
    if (repeatMode === "one") return currentIndex;
    let nxt = currentIndex + 1;
    if (isShuffle) {
      nxt = Math.floor(Math.random() * queue.length);
      if (nxt === currentIndex && queue.length > 1) nxt = (nxt + 1) % queue.length;
    }
    if (nxt >= queue.length) {
      if (repeatMode === "all") nxt = 0;
      else return null;
    }
    return nxt;
  }

  (window as any).__LUMI_QUEUE__ = queue;
  (window as any).__LUMI_SET_QUEUE__ = (q: Track[]) => {
    queue = q;
    (window as any).__LUMI_QUEUE__ = q;
  };

  function formatTime(s: number) {
    if (!isFinite(s)) return "0:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  }

  function updateSeekBackground() {
    if (!seekBar) return;
    const maxVal = parseFloat(seekBar.max) || 100;
    const curVal = parseFloat(seekBar.value) || 0;
    const pct = maxVal > 0 ? (curVal / maxVal) * 100 : 0;
    seekBar.style.setProperty("--progress", pct + "%");
  }

  function updateVolBackground() {
    if (!volBar) return;
    volBar.style.setProperty("--vol", volBar.value + "%");
  }

  function syncMuteUI() {
    if (!volIcon) return;
    volIcon.classList.toggle("muted", audio.muted);
    volIcon.title = audio.muted ? "Unmute" : "Mute";
  }

  function toggleMute(notify = true) {
    audio.muted = !audio.muted;
    if (crossfadeActive && cfIncoming) cfIncoming.muted = audio.muted;
    persistMuted(audio.muted);
    syncMuteUI();
    if (notify) toast(audio.muted ? "Muted" : "Unmuted");
  }

  async function resolveSrc(p: string): Promise<string> {
    if (!p) return "";
    if (/^(https?|data|blob):/.test(p)) return p;
    if (isTauri) {
      try {
        const { convertFileSrc } = await import("@tauri-apps/api/core");
        return convertFileSrc(p);
      } catch {}
    }
    return p;
  }

  // ---------------------------------------------------------------------
  // Full-resolution cover art upgrade (no disk cache)
  // ---------------------------------------------------------------------
  // The Library caches 256×256 thumbnails (fast for lists), but large
  // skin covers render them blurry. For the playing track we ALSO fetch
  // the ORIGINAL embedded artwork: Rust reads the tag bytes and returns
  // a base64 `data:` URL; nothing is written to disk. The thumb shows
  // instantly first (no blank flash). The Map below is a bounded
  // in-memory LRU (cap=200) for this session only — it dies with the
  // app.
  const FULL_ART_CACHE_CAP = 200;
  const fullArtCache = new Map<string, string>();
  function fullArtCacheGet(id: string): string | undefined {
    const hit = fullArtCache.get(id);
    if (hit !== undefined && fullArtCache.size > 1) {
      fullArtCache.delete(id);
      fullArtCache.set(id, hit);
    }
    return hit;
  }
  function fullArtCacheSet(id: string, url: string) {
    fullArtCache.delete(id);
    fullArtCache.set(id, url);
    while (fullArtCache.size > FULL_ART_CACHE_CAP) {
      const oldest = fullArtCache.keys().next().value;
      if (oldest === undefined) break;
      fullArtCache.delete(oldest);
    }
  }
  const fullArtPending = new Set<string>();

  async function upgradeCoverToFull(t: Track) {
    if (!isTauri || !t || !t.id || !coverImg) return;
    const cached = fullArtCacheGet(t.id);
    if (cached) {
      if (coverImg.getAttribute("src") !== cached) {
        coverImg.src = cached;
        coverImg.style.display = "block";
        if (coverFallback) coverFallback.style.display = "none";
      }
      return;
    }
    if (fullArtPending.has(t.id)) return;
    fullArtPending.add(t.id);
    try {
      const { invoke } = await import("@tauri-apps/api/core");
      const dataUrl = await invoke<string | null>("get_track_artwork_full", { id: t.id });
      if (dataUrl) {
        fullArtCacheSet(t.id, dataUrl);
        // Touch the DOM only if this track is STILL current — the user may
        // have switched tracks while the fetch was in flight.
        const cur = queue[currentIndex];
        if (cur && cur.id === t.id && coverImg) {
          coverImg.src = dataUrl;
          coverImg.style.display = "block";
          if (coverFallback) coverFallback.style.display = "none";
        }
      }
    } catch { /* keep the 256px thumb — no functional impact */ }
    finally { fullArtPending.delete(t.id); }
  }

  // ---------------------------------------------------------------------
  // Crossfade engine
  //
  // A second <audio> element ("secondaryAudio") is created lazily. Each
  // deck gets its own GainNode in the shared Web Audio graph
  // (audio-graph.ts): both mix into the same EQ/analyser chain, so the
  // equalizer and visualizer keep working unmodified.
  //
  // The fade curve is scheduled once via native AudioParam automation
  // (setValueCurveAtTime) — the browser's audio thread runs it, not JS,
  // so an active crossfade costs no extra CPU beyond decoding the
  // second stream.
  // ---------------------------------------------------------------------

  let crossfadeActive = false;
  let cfOutgoing: HTMLAudioElement | null = null;
  let cfIncoming: HTMLAudioElement | null = null;
  let cfTargetIndex: number | null = null;
  let cfTimer: number | null = null;

  function crossfadeEnabled(): boolean {
    return localStorage.getItem("melo-pref-crossfade") === "1";
  }

  function crossfadeDurationSec(): number {
    const raw = parseInt(localStorage.getItem("melo-pref-crossfadeDuration") || "4", 10);
    if (!Number.isFinite(raw)) return 4;
    return Math.min(12, Math.max(1, raw));
  }

  function getSecondaryAudio(): HTMLAudioElement {
    if (!secondaryAudio) {
      secondaryAudio = new Audio();
      secondaryAudio.preload = "auto";
      secondaryAudio.crossOrigin = "anonymous";
      attachDeckListeners(secondaryAudio);
    }
    return secondaryAudio;
  }

  function otherDeck(): HTMLAudioElement {
    return audio === primaryAudio ? getSecondaryAudio() : primaryAudio;
  }

  function resetDeckGain(el: HTMLAudioElement, value: number) {
    try {
      const g = getAudioGraph(primaryAudio);
      const deck = g.getDeck(el);
      deck?.gain.gain.cancelScheduledValues(g.ctx.currentTime);
      deck?.gain.gain.setValueAtTime(value, g.ctx.currentTime);
    } catch {}
  }

  function cancelCrossfade() {
    if (cfTimer) {
      clearTimeout(cfTimer);
      cfTimer = null;
    }
    if (!crossfadeActive) {
      cfOutgoing = null;
      cfIncoming = null;
      cfTargetIndex = null;
      return;
    }
    crossfadeActive = false;
    if (cfIncoming) {
      resetDeckGain(cfIncoming, 0);
      try {
        cfIncoming.pause();
        cfIncoming.currentTime = 0;
      } catch {}
    }
    if (cfOutgoing) resetDeckGain(cfOutgoing, 1);
    cfOutgoing = null;
    cfIncoming = null;
    cfTargetIndex = null;
  }

  function computeVolumeFor(t: Track | null | undefined): number {
    if (!volBar) return 1;
    const baseVol = parseInt(volBar.value, 10) / 100;
    const replayGainEnabled = localStorage.getItem("melo-pref-replayGainGlobal") !== "0";
    const gainDb = replayGainEnabled ? t?.replayGain ?? 0 : 0;
    const linear = Math.pow(10, gainDb / 20);
    return Math.min(1, Math.max(0, baseVol * linear));
  }
  function computeTargetVolume(): number {
    return computeVolumeFor(queue[currentIndex]);
  }

  function maybeStartCrossfade() {
    if (crossfadeActive || !crossfadeEnabled()) return;
    if (repeatMode === "one") return; // don't crossfade a track into itself
    if (queue.length <= 1) return;
    const dur = audio.duration;
    if (!isFinite(dur) || dur <= 0) return;
    const nxt = computeNextIndex();
    if (nxt === null) return;
    const remaining = dur - audio.currentTime;
    if (remaining <= 0) return;
    // Never fade for longer than ~90% of the track, so very short tracks
    // still get a (shorter) sensible crossfade instead of a jarring one.
    const effectiveDur = Math.min(crossfadeDurationSec(), Math.max(1, dur * 0.9));
    if (remaining > effectiveDur) return;
    // Clamp to what's actually left to play: a manual seek into the last
    // seconds (with a longer crossfade configured) would otherwise schedule
    // the full fade, and the outgoing deck would go silent before the UI
    // switches to the next track.
    const startDur = Math.max(0.15, Math.min(effectiveDur, remaining));
    startCrossfade(nxt, startDur);
  }

  async function startCrossfade(nxt: number, dur: number) {
    const nextTrack = queue[nxt];
    if (!nextTrack) return;
    crossfadeActive = true;
    const outgoing = audio;
    const incoming = otherDeck();
    cfOutgoing = outgoing;
    cfIncoming = incoming;
    cfTargetIndex = nxt;

    try {
      incoming.pause();
      incoming.src = await resolveSrc(nextTrack.path);
      incoming.load();
    } catch {
      cancelCrossfade();
      return;
    }
    // If cancelCrossfade() ran while we were awaiting resolveSrc (e.g. the
    // user hit Next), don't resurrect a stale transition.
    if (cfIncoming !== incoming || !crossfadeActive) return;

    const onError = () => {
      incoming.removeEventListener("error", onError);
      if (cfIncoming !== incoming) return;
      // The incoming track is unreadable. Cancel the fade and load it
      // through the NORMAL path on the active deck — its error handler
      // reports and auto-skips, exactly like a non-crossfaded broken track.
      cancelCrossfade();
      loadTrack(nxt, true);
    };
    incoming.addEventListener("error", onError, { once: true });

    const graph = getAudioGraph(primaryAudio);
    const deckOut = graph.getDeck(outgoing);
    const deckIn = graph.getDeck(incoming);
    if (!deckOut || !deckIn) {
      cancelCrossfade();
      return;
    }

    incoming.volume = computeVolumeFor(nextTrack);
    incoming.muted = outgoing.muted;

    try {
      await graph.resume();
    } catch {}
    try {
      await incoming.play();
    } catch {
      cancelCrossfade();
      return;
    }
    if (cfIncoming !== incoming || !crossfadeActive) return;

    const ctx = graph.ctx;
    const now = ctx.currentTime;
    // Equal-power curve: perceived loudness stays roughly constant through
    // the transition instead of dipping in the middle (as a plain linear
    // fade would).
    const steps = 40;
    const curveIn = new Float32Array(steps + 1);
    const curveOut = new Float32Array(steps + 1);
    for (let i = 0; i <= steps; i++) {
      const x = i / steps;
      curveIn[i] = Math.sin((x * Math.PI) / 2);
      curveOut[i] = Math.cos((x * Math.PI) / 2);
    }
    deckIn.gain.gain.cancelScheduledValues(now);
    deckIn.gain.gain.setValueCurveAtTime(curveIn, now, dur);
    deckOut.gain.gain.cancelScheduledValues(now);
    deckOut.gain.gain.setValueCurveAtTime(curveOut, now, dur);

    cfTimer = window.setTimeout(() => finishCrossfade(), Math.round(dur * 1000));
  }

  function finishCrossfade() {
    cfTimer = null;
    if (!crossfadeActive || !cfOutgoing || !cfIncoming || cfTargetIndex === null) {
      crossfadeActive = false;
      return;
    }
    const outgoing = cfOutgoing;
    const incoming = cfIncoming;
    const nxt = cfTargetIndex;
    crossfadeActive = false;
    cfOutgoing = null;
    cfIncoming = null;
    cfTargetIndex = null;

    try {
      outgoing.pause();
      outgoing.currentTime = 0;
    } catch {}
    resetDeckGain(outgoing, 1);
    resetDeckGain(incoming, 1);

    audio = incoming;
    currentIndex = nxt;
    applyTrackMetadata(queue[nxt], { resetProgress: false });
  }

  function visibleTrackSpecs(t: Track): string {
    const specs = (t.specs || "").trim();
    const codec = (t.codec || "").trim();
    if (!specs || !codec || specs.slice(0, codec.length).toLowerCase() !== codec.toLowerCase()) return specs;
    // Older database rows stored the codec in specs as well. Strip only a
    // leading codec plus its separator; unrelated values such as "Local File"
    // remain untouched.
    return specs.slice(codec.length).replace(/^\s*(?:[·•-]\s*)?/, "").trim();
  }

  function applyTrackMetadata(t: Track, opts: { resetProgress: boolean }) {
    if (!trackTitle) bindDOM();

    if (trackTitle) trackTitle.textContent = t.title || "Unknown Title";
    if (trackArtist) trackArtist.textContent = t.artist || "Unknown Artist";
    if (trackAlbum) trackAlbum.textContent = t.album || "";
    if (trackCodec) trackCodec.textContent = t.codec || "AUDIO";
    if (trackSpecs) trackSpecs.textContent = visibleTrackSpecs(t);

    if (t.cover && coverImg) {
      coverImg.src = t.cover;
      coverImg.style.display = "block";
      if (coverFallback) coverFallback.style.display = "none";
    } else {
      if (coverImg) coverImg.style.display = "none";
      if (coverFallback) coverFallback.style.display = "grid";
    }
    // Show the thumb instantly, then swap in the original full-resolution
    // artwork for skins that render the cover larger than 256px.
    upgradeCoverToFull(t);

    if (seekBar) {
      seekBar.max = String(t.duration || 240);
      if (opts.resetProgress) seekBar.value = "0";
      else seekBar.value = String(Math.floor(audio.currentTime || 0));
      updateSeekBackground();
    }
    if (durTime) durTime.textContent = formatTime(t.duration);
    if (curTime) curTime.textContent = opts.resetProgress ? "0:00" : formatTime(audio.currentTime || 0);

    applyReplayGain();
    applyDynamicAmbientTheme(t.cover || null);

    document.querySelectorAll(".track-row").forEach((el, i) => {
      el.classList.toggle("active", queue[i]?.id === t.id);
    });

    if ("mediaSession" in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: t.title,
        artist: t.artist,
        album: t.album,
        artwork: t.cover ? [{ src: t.cover, sizes: "512x512", type: "image/jpeg" }] : [],
      });
      navigator.mediaSession.setActionHandler("play", () => play());
      navigator.mediaSession.setActionHandler("pause", () => pause());
      navigator.mediaSession.setActionHandler("previoustrack", () => prev());
      navigator.mediaSession.setActionHandler("nexttrack", () => next());
      navigator.mediaSession.setActionHandler("seekto", (details) => {
        if (details.seekTime) audio.currentTime = details.seekTime;
      });
    }

    // Keep a small durable snapshot as a race-free fallback for a Lyrics
    // window created after this event. Cover art is omitted to avoid filling
    // localStorage with a large data URL.
    try {
      const { cover: _cover, ...trackSnapshot } = t as any;
      localStorage.setItem("melo-current-track", JSON.stringify(trackSnapshot));
    } catch {}
    // Explicit `bubbles: false` — see bus.ts. `lumi:trackChange` is a legacy
    // alias for `melo:track-changed`; only the lyric-line module listens
    // (window-level), so bubbling would not help and could hit
    // document-level handlers outside our namespace.
    window.dispatchEvent(new CustomEvent("lumi:trackChange", { detail: t, bubbles: false }));
    busEmit("melo:track-changed", t);
    busEmit("melo:playback-state", { track: t, currentTime: audio.currentTime || 0, paused: audio.paused });
  }

  async function loadTrack(idx: number, autoplay = true, seekTo?: number) {
    if (!queue.length) return;
    cancelCrossfade();
    if (idx < 0) idx = queue.length - 1;
    if (idx >= queue.length) idx = 0;
    currentIndex = idx;
    const t = queue[idx];
    if (!t) return;

    if (!trackTitle) bindDOM();

    resetDeckGain(audio, 1);
    audio.src = await resolveSrc(t.path);
    audio.load();
    if (seekTo && seekTo > 0) {
      const onMeta = () => {
        audio.removeEventListener("loadedmetadata", onMeta);
        try { audio.currentTime = seekTo; } catch {}
      };
      audio.addEventListener("loadedmetadata", onMeta);
    }

    applyTrackMetadata(t, { resetProgress: true });

    if (autoplay) {
      play();
    } else {
      // loadTrack() with autoplay=false (e.g. resume-on-reopen off) cues the
      // track paused, so the transport icons must reflect that (Play visible,
      // Pause hidden) instead of keeping their last state.
      if (iconPlay) iconPlay.style.display = "block";
      if (iconPause) iconPause.style.display = "none";
      if ("mediaSession" in navigator) navigator.mediaSession.playbackState = "paused";
    }
  }

  let pendingPlay = false;
  async function onUnlocked() {
    try { await getAudioGraph(primaryAudio).resume(); } catch {}
    if (!pendingPlay) return;
    pendingPlay = false;
    audio.play().then(() => {
      if (iconPlay) iconPlay.style.display = "none";
      if (iconPause) iconPause.style.display = "block";
    }).catch(() => {});
  }

  window.addEventListener("pointerdown", onUnlocked);
  window.addEventListener("keydown", onUnlocked);
  busOn("melo:pref-changed", (p: any) => {
    if (p && p.key === "replayGainGlobal") applyReplayGain();
    if (p && p.key === "showStopBtn") syncStopButtonVisibility(!!p.value);
    if (p && p.key === "crossfade" && !p.value) cancelCrossfade();
    // Dynamic theme toggled from any Settings window: apply it from the
    // current track's artwork. applyDynamicAmbientTheme re-reads the stored
    // preference itself and clears the tint when off.
    if (p && p.key === "dynamicTheme") {
      applyDynamicAmbientTheme(queue[currentIndex]?.cover || null);
    }
  });

  // Secondary windows can be opened at any time. Reply with the current
  // track and playback position instead of requiring them to be open when
  // the original track-changed event fires.
  busOn("melo:request-playback-state", () => {
    const track = queue[currentIndex] || null;
    busEmit("melo:playback-state", { track, currentTime: audio.currentTime || 0, paused: audio.paused });
  });
  busOn("melo:seek-playback", (seconds: any) => {
    const value = Number(seconds);
    if (Number.isFinite(value) && value >= 0) audio.currentTime = value;
  });

  let fadeRAF: number | null = null;
  let wasFadedPause = false;
  const FADE_MS = 500; // 0.5s fade-out on pause / fade-in on resume
  function fadeVolumeTo(target: number, ms: number, onDone?: () => void) {
    if (fadeRAF) cancelAnimationFrame(fadeRAF);
    const start = audio.volume;
    const t0 = performance.now();
    const step = (now: number) => {
      const p = Math.min(1, (now - t0) / ms);
      audio.volume = start + (target - start) * p;
      if (p < 1) { fadeRAF = requestAnimationFrame(step); }
      else { fadeRAF = null; onDone?.(); }
    };
    fadeRAF = requestAnimationFrame(step);
  }

  async function play() {
    try { await getAudioGraph(primaryAudio).resume(); } catch {}
    const fadeOn = localStorage.getItem("melo-pref-fadePause") !== "0";
    const target = computeTargetVolume();
    if (fadeOn && wasFadedPause) audio.volume = 0;
    audio.play().then(() => {
      pendingPlay = false;
      if (iconPlay) iconPlay.style.display = "none";
      if (iconPause) iconPause.style.display = "block";
      if ("mediaSession" in navigator) navigator.mediaSession.playbackState = "playing";
      if (fadeOn && wasFadedPause) { wasFadedPause = false; fadeVolumeTo(target, FADE_MS); }
      else audio.volume = target;
    }).catch((err: any) => {
      // Only an autoplay-policy block ("NotAllowedError") is fixed by
      // clicking — the one case this toast is honest for. A load failure
      // (missing/moved file, asset-protocol refusal) rejects differently AND
      // fires the element's `error` event, which reports and auto-skips; a
      // click hint there would be misleading.
      if (err?.name === "NotAllowedError" && !pendingPlay) {
        pendingPlay = true;
        toast("Click once inside player to begin audio playback");
      }
      // Nothing started — the icons must show the PAUSED reality (Play), not
      // the markup's default Pause icon.
      if (iconPlay) iconPlay.style.display = "block";
      if (iconPause) iconPause.style.display = "none";
      if ("mediaSession" in navigator) navigator.mediaSession.playbackState = "paused";
    });
  }

  function pause() {
    cancelCrossfade();
    const fadeOn = localStorage.getItem("melo-pref-fadePause") !== "0";
    if (fadeOn && !audio.paused) {
      wasFadedPause = true;
      fadeVolumeTo(0, FADE_MS, () => audio.pause());
    } else {
      wasFadedPause = false;
      audio.pause();
    }
    if (iconPlay) iconPlay.style.display = "block";
    if (iconPause) iconPause.style.display = "none";
    if ("mediaSession" in navigator) navigator.mediaSession.playbackState = "paused";
    const t = queue[currentIndex];
    if (t) {
      try { localStorage.setItem("melo-resume-state", JSON.stringify({ trackId: t.id, position: audio.currentTime })); } catch {}
    }
  }

  function togglePlay() {
    if (audio.paused) play();
    else pause();
  }

  function stop() {
    cancelCrossfade();
    audio.pause();
    try { audio.currentTime = 0; } catch {}
    if (iconPlay) iconPlay.style.display = "block";
    if (iconPause) iconPause.style.display = "none";
    if (seekBar) {
      seekBar.value = "0";
      updateSeekBackground();
    }
    if (curTime) curTime.textContent = "0:00";
    if ("mediaSession" in navigator) navigator.mediaSession.playbackState = "paused";
  }

  function next() {
    if (!queue.length) return;
    cancelCrossfade();
    if (repeatMode === "one") {
      audio.currentTime = 0;
      play();
      return;
    }
    const nxt = computeNextIndex();
    // Next on the LAST track with repeat OFF is a no-op: the current track
    // keeps playing — no pause, no toast.
    if (nxt === null) return;
    loadTrack(nxt);
  }

  function prev() {
    if (!queue.length) return;
    cancelCrossfade();
    // Smart Previous (default ON): if the track has played a while, the
    // first press restarts it; press again to move to the previous track.
    // OFF: Previous always goes straight to the previous track.
    const smartPrev = localStorage.getItem("melo-pref-smartPrev") !== "0";
    if (smartPrev && audio.currentTime > 3) {
      audio.currentTime = 0;
      return;
    }
    let prv = currentIndex - 1;
    if (isShuffle) prv = Math.floor(Math.random() * queue.length);
    if (prv < 0) {
      if (repeatMode === "all") prv = queue.length - 1;
      else prv = 0;
    }
    loadTrack(prv);
  }

  function applyReplayGain() {
    if (!queue[currentIndex] || !volBar) return;
    audio.volume = computeTargetVolume();
    if (crossfadeActive && cfIncoming && cfTargetIndex !== null) {
      const nextTrack = queue[cfTargetIndex];
      if (nextTrack) cfIncoming.volume = computeVolumeFor(nextTrack);
    }
  }

  function syncStopButtonVisibility(enabled = localStorage.getItem("melo-pref-showStopBtn") === "1") {
    const stop = findHook<HTMLButtonElement>("btnStop", "stop");
    if (!stop) return;
    if (enabled) {
      // Let the skin's OWN CSS take over: Melo button styles center icons with
      // display:grid + place-items:center. Forcing inline-flex !important
      // overrode that (place-items is a grid property) and misaligned the
      // stop icon.
      stop.style.removeProperty("display");
    } else {
      stop.style.setProperty("display", "none", "important");
    }
  }

  // The transport icons must always mirror the audio element, never a
  // stale markup default: skins ship the PAUSE icon visible, so a cold
  // start that never reaches loadTrack() would sit on Pause with nothing
  // playing.
  function syncTransportIcons() {
    const playing = !audio.paused;
    if (iconPlay) iconPlay.style.display = playing ? "none" : "block";
    if (iconPause) iconPause.style.display = playing ? "block" : "none";
    if ("mediaSession" in navigator) navigator.mediaSession.playbackState = playing ? "playing" : "paused";
  }

  function bindDOM() {
    btnPlay = findHook<HTMLButtonElement>("btnPlay", "play")!;
    iconPlay = findHook<HTMLElement>("iconPlay", "play-icon")!;
    iconPause = findHook<HTMLElement>("iconPause", "pause-icon")!;
    syncTransportIcons();
    btnPrev = findHook<HTMLButtonElement>("btnPrev", "prev")!;
    btnNext = findHook<HTMLButtonElement>("btnNext", "next")!;
    btnShuffle = findHook<HTMLButtonElement>("btnShuffle", "shuffle")!;
    btnRepeat = findHook<HTMLButtonElement>("btnRepeat", "repeat")!;
    btnStop = findHook<HTMLButtonElement>("btnStop", "stop");
    syncStopButtonVisibility();
    seekBar = findHook<HTMLInputElement>("seekBar", "seek")!;
    volBar = findHook<HTMLInputElement>("volBar", "volume")!;
    curTime = findHook<HTMLElement>("curTime", "current-time")!;
    durTime = findHook<HTMLElement>("durTime", "duration")!;
    volPct = findHook<HTMLElement>("volPct", "volume-pct")!;
    volIcon = findHook<HTMLElement>("volIcon", "volume-icon")!;
    if (volIcon) volIcon.onclick = () => toggleMute();
    syncMuteUI();
    trackTitle = findHook<HTMLElement>("trackTitle", "title")!;
    trackArtist = findHook<HTMLElement>("trackArtist", "artist")!;
    trackAlbum = findHook<HTMLElement>("trackAlbum", "album")!;
    trackCodec = findHook<HTMLElement>("trackCodec", "codec")!;
    trackSpecs = findHook<HTMLElement>("trackSpecs", "specs")!;
    coverImg = findHook<HTMLImageElement>("coverImg", "cover")!;
    coverFallback = findHook<HTMLElement>("coverFallback", "cover-fallback")!;

    if (btnPlay) btnPlay.onclick = togglePlay;
    if (btnStop) btnStop.onclick = stop;
    if (btnPrev) btnPrev.onclick = prev;
    if (btnNext) btnNext.onclick = next;

    if (btnShuffle) {
      btnShuffle.onclick = () => {
        isShuffle = !isShuffle;
        btnShuffle.classList.toggle("active", isShuffle);
        toast(isShuffle ? "Shuffle on" : "Shuffle off");
      };
    }

    if (btnRepeat) {
      btnRepeat.onclick = () => {
        repeatMode = repeatMode === "off" ? "all" : repeatMode === "all" ? "one" : "off";
        btnRepeat.classList.toggle("active", repeatMode !== "off");
        const labels: Record<RepeatMode, string> = { off: "Repeat off", all: "Repeat all", one: "Repeat one" };
        toast(labels[repeatMode]);
        btnRepeat.title = labels[repeatMode];
      };
    }

    if (seekBar) {
      seekBar.oninput = () => {
        isSeeking = true;
        if (curTime) curTime.textContent = formatTime(parseFloat(seekBar.value));
        updateSeekBackground();
      };
      seekBar.onchange = () => {
        cancelCrossfade();
        audio.currentTime = parseFloat(seekBar.value);
        isSeeking = false;
      };
    }

    if (volBar) {
      volBar.oninput = () => {
        userVolumePct = parseInt(volBar.value, 10) || 0;
        updateVolBackground();
        if (volPct) volPct.textContent = volBar.value + "%";
        applyReplayGain();
        persistVolume();
      };
    }

    updateSeekBackground();
    updateVolBackground();

    // A skin swap replaces every control node with template placeholders
    // (including the volume bar's "60"). Restore the slider from the
    // user-volume tracker (NOT audio.volume, which can be 0 mid-fade); on
    // first bind the tracker comes from localStorage, which is what makes
    // volume survive a restart.
    if (volBar) {
      volBar.value = String(userVolumePct);
      if (volPct) volPct.textContent = volBar.value + "%";
      updateVolBackground();
      // Push the restored level onto the live deck too, unless a fade is
      // currently animating audio.volume (pause fade / crossfade).
      if (fadeRAF === null && !crossfadeActive) audio.volume = computeTargetVolume();
    }

    if (queue[currentIndex]) {
      const t = queue[currentIndex];
      if (trackTitle) trackTitle.textContent = t.title || "Unknown Title";
      if (trackArtist) trackArtist.textContent = t.artist || "Unknown Artist";
      if (trackAlbum) trackAlbum.textContent = t.album || "";
      if (trackCodec) trackCodec.textContent = t.codec || "AUDIO";
      if (trackSpecs) trackSpecs.textContent = visibleTrackSpecs(t);
      if (t.cover && coverImg) {
        coverImg.src = t.cover;
        coverImg.style.display = "block";
        if (coverFallback) coverFallback.style.display = "none";
      } else {
        if (coverImg) coverImg.style.display = "none";
        if (coverFallback) coverFallback.style.display = "grid";
      }
      // A skin swap recreated the <img> — restore full-res art from cache
      // (or fetch it) if this track already had it.
      upgradeCoverToFull(t);

      // Re-sync the full transport UI from live playback state: a skin swap
      // replaces every control node, so the seek bar / time labels would keep
      // template placeholders while a track is playing.
      if (seekBar) {
        const dur = Math.floor(audio.duration || t.duration || 240);
        seekBar.max = String(dur);
        seekBar.value = String(Math.floor(audio.currentTime || 0));
        updateSeekBackground();
      }
      if (durTime) durTime.textContent = formatTime(audio.duration || t.duration);
      if (curTime) curTime.textContent = formatTime(audio.currentTime || 0);
      if (volBar && volPct) {
        volPct.textContent = volBar.value + "%";
        updateVolBackground();
      }
      if (iconPlay && iconPause) {
        const playing = !audio.paused;
        iconPlay.style.display = playing ? "none" : "block";
        iconPause.style.display = playing ? "block" : "none";
      }
      if (btnShuffle) btnShuffle.classList.toggle("active", isShuffle);
      if (btnRepeat) btnRepeat.classList.toggle("active", repeatMode !== "off");
    }
  }

  bindDOM();

  // Mouse wheel over the main player adjusts volume without requiring the
  // pointer to be directly over the slider.
  document.addEventListener("wheel", event => {
    const target = event.target as HTMLElement | null;
    if (!target?.closest("#playerCard") || !volBar) return;
    // Let the embedded playlist / lyrics panel scroll instead of changing volume.
    if (target.closest(".embedded-playlist, .embedded-lyrics, [data-melo=\"embedded-playlist\"], [data-melo=\"embedded-lyrics\"], .player-stage-panel")) return;
    event.preventDefault();
    const step = event.deltaY < 0 ? 5 : -5;
    volBar.value = String(Math.max(0, Math.min(100, Number(volBar.value) + step)));
    volBar.dispatchEvent(new Event("input"));
  }, { passive: false });

  // -------------------------------------------------------------------
  // Broken-track handling: a load/decode failure is reported and
  // skipped; the consecutive-failure counter (reset by any successful
  // start) caps the skip chain, so a queue full of dead files stops with
  // a clear message instead of looping forever. Repeat-one on a broken
  // track also ends at the cap.
  // -------------------------------------------------------------------
  let consecutiveErrors = 0;

  function handlePlaybackError() {
    const t = queue[currentIndex];
    consecutiveErrors++;
    const cap = Math.min(10, Math.max(1, queue.length));
    if (consecutiveErrors >= cap) {
      pause();
      toast(consecutiveErrors > 1
        ? `Stopped — ${consecutiveErrors} tracks in a row couldn't play (files missing or moved)`
        : (t ? `Couldn't play "${t.title}" — file may be missing or moved` : "Couldn't play the selected track"));
      return;
    }
    toast(`Skipping "${t ? t.title : "track"}" — file may be missing or moved`);
    next();
  }

  function attachDeckListeners(el: HTMLAudioElement) {
    el.addEventListener("timeupdate", () => {
      if (el !== audio) return; // only the active deck drives UI + scheduling
      busEmit("melo:playback-position", el.currentTime || 0);
      if (!isSeeking && seekBar && curTime) {
        seekBar.value = String(Math.floor(el.currentTime));
        curTime.textContent = formatTime(el.currentTime);
        updateSeekBackground();
      }
      saveResumeStateThrottled();
      maybeStartCrossfade();
    });

    el.addEventListener("loadedmetadata", () => {
      if (el !== audio || !seekBar || !durTime) return;
      const dur = Math.floor(el.duration || queue[currentIndex]?.duration || 240);
      seekBar.max = String(dur);
      durTime.textContent = formatTime(dur);
      updateSeekBackground();
    });

    el.addEventListener("ended", () => {
      if (el !== audio || crossfadeActive) return; // stray/handled event
      next();
    });

    // A successful start clears the skip chain: only CONSECUTIVE failures
    // count toward the stop cap.
    el.addEventListener("play", () => {
      if (el === audio) consecutiveErrors = 0;
      // The icons follow the REAL element state.
      if (el === audio) {
        if (iconPlay) iconPlay.style.display = "none";
        if (iconPause) iconPause.style.display = "block";
        if ("mediaSession" in navigator) navigator.mediaSession.playbackState = "playing";
      }
    });
    el.addEventListener("pause", () => {
      // Whatever pauses the deck (fade-pause, crossfade swap, stop, a paused
      // restore) re-shows the Play icon.
      if (el !== audio) return;
      if (iconPlay) iconPlay.style.display = "block";
      if (iconPause) iconPause.style.display = "none";
      if ("mediaSession" in navigator) navigator.mediaSession.playbackState = "paused";
    });
    // A failed load (file deleted/moved since the scan) reports and
    // auto-skips to the next track. The crossfade path hands its
    // "incoming" deck failures back here (startCrossfade), so behavior is
    // uniform.
    el.addEventListener("error", () => {
      if (el !== audio) return;
      handlePlaybackError();
    });
  }

  let resumeSaveTimer: any = null;
  function saveResumeStateThrottled() {
    if (resumeSaveTimer) return;
    resumeSaveTimer = setTimeout(() => {
      resumeSaveTimer = null;
      const t = queue[currentIndex];
      if (!t || audio.paused) return;
      try {
        localStorage.setItem("melo-resume-state", JSON.stringify({ trackId: t.id, position: audio.currentTime }));
      } catch {}
    }, 4000);
  }

  attachDeckListeners(primaryAudio);

  window.addEventListener("keydown", (e) => {
    // Space handling is type-aware: text inputs must type the space, but
    // range/checkbox/radio inputs fall through to native handling (Space
    // advances a slider by `step`). Buttons are NOT short-circuited —
    // Enter/Space activate them natively (accessibility).
    const target = e.target as HTMLElement | null;
    if (target && target.tagName === "INPUT") {
      const t = (target as HTMLInputElement).type;
      // Text-like inputs: typing a Space must insert a character, never
      // trigger play/pause.
      if (t === "text" || t === "search" || t === "email" || t === "url" ||
          t === "tel" || t === "password" || t === "number") {
        return;
      }
      // Range, checkbox, radio, etc. fall through and we let the
      // browser's native handling run (Space advances a range slider
      // by `step`, toggles checkboxes/radios).
    }
    if (e.code === "Space") {
      e.preventDefault();
      togglePlay();
    }
    if (e.code === "ArrowRight") {
      cancelCrossfade();
      audio.currentTime += 5;
    }
    if (e.code === "ArrowLeft") {
      cancelCrossfade();
      audio.currentTime -= 5;
    }
    if (e.key === "m" || e.key === "M") {
      toggleMute();
    }
    if (e.key === "s" || e.key === "S") {
      if (btnShuffle) btnShuffle.click();
    }
    if (e.key === "r" || e.key === "R") {
      if (btnRepeat) btnRepeat.click();
    }
    if (e.code === "ArrowUp") {
      if (volBar) {
        volBar.value = String(Math.min(100, parseInt(volBar.value, 10) + 5));
        volBar.dispatchEvent(new Event("input"));
      }
    }
    if (e.code === "ArrowDown") {
      if (volBar) {
        volBar.value = String(Math.max(0, parseInt(volBar.value, 10) - 5));
        volBar.dispatchEvent(new Event("input"));
      }
    }
  });

  busOn("melo:tray-action", (action: any) => {
    if (action === "play_pause") togglePlay();
    else if (action === "next") next();
    else if (action === "prev") prev();
    else if (action === "mute") {
      toggleMute();
    }
  });

  (window as any).LumiPlayer = {
    get queue() { return queue; },
    set queue(v) { queue = v; (window as any).__LUMI_QUEUE__ = v; },
    get currentIndex() { return currentIndex; },
    loadTrack,
    play,
    pause,
    stop,
    next,
    prev,
    get audio() { return audio; },
    rebind: bindDOM,
  };
  (window as any).__LUMI_REBIND__ = bindDOM;

  // The queue can be sorted / drag-reordered from the Playlist window:
  // the backend owns the persisted order and broadcasts the new sequence;
  // the runtime queue must follow, or Next/Previous would play the OLD
  // order. The current track keeps playing; currentIndex re-points at it.
  busOn("melo:queue-reordered", (p: any) => {
    if (!p || !Array.isArray(p.order) || !p.order.length || !queue.length) return;
    // The broadcast carries BOTH sequences: `order` (queue ENTRY ids) and
    // `tracks` (the track id each entry points at). The runtime queue is
    // not always hydrated with entry ids (session imports), so resolution
    // is: entry id first, then track id (first unconsumed match —
    // deterministic even with duplicates). Unmappable runtime-only items
    // keep their relative order at the END — nothing is silently dropped.
    const byEntry = new Map<string, any>();
    const byTrack = new Map<string, any[]>();
    for (const t of queue) {
      if (t?.playlistEntryId != null) byEntry.set(`e${t.playlistEntryId}`, t);
      else if (t?.id != null) {
        const list = byTrack.get(String(t.id)) || [];
        list.push(t);
        byTrack.set(String(t.id), list);
      }
    }
    const next: any[] = [];
    const used = new Set<any>();
    const order: string[] = p.order;
    const tracks: string[] | null = Array.isArray(p.tracks) ? p.tracks : null;
    for (let i = 0; i < order.length; i++) {
      let t = byEntry.get(`e${order[i]}`);
      if (t) { next.push(t); used.add(t); continue; }
      const trackId = tracks ? String(tracks[i] ?? "") : "";
      const candidates = byTrack.get(trackId);
      if (candidates) {
        while (candidates.length) {
          const cand = candidates.shift()!;
          if (!used.has(cand)) { next.push(cand); used.add(cand); break; }
        }
      }
    }
    for (const t of queue) { if (!used.has(t)) next.push(t); }
    // The CURRENT track keeps playing: re-point by OBJECT IDENTITY, which
    // is unambiguous even when the queue contains duplicates.
    const current = queue[currentIndex];
    queue = next;
    currentIndex = current ? Math.max(0, queue.indexOf(current)) : 0;
    try { (window as any).__LUMI_SET_QUEUE__(queue); } catch {}
    busEmit("melo:playback-state", { track: queue[currentIndex] || null, currentTime: audio.currentTime || 0, paused: audio.paused });
  });

  // Removing a track from the QUEUE view also removes it from the
  // player's runtime queue. If it IS the playing track, it keeps playing
  // but leaves the upcoming order; the index re-points at whatever
  // follows.
  busOn("melo:queue-entries-removed", (p: any) => {
    if (!p || !Array.isArray(p.entryIds) || !p.entryIds.length) return;
    const gone = new Set<string>(p.entryIds.map((v: any) => `e${v}`));
    const keyOf = (t: any) => (t?.playlistEntryId != null ? `e${t.playlistEntryId}` : null);
    const current = queue[currentIndex] || null;
    const currentGone = current != null && gone.has(keyOf(current) ?? "");
    const filtered = queue.filter(t => !gone.has(keyOf(t) ?? ""));
    if (filtered.length === queue.length) return; // nothing of ours was removed
    queue = filtered;
    if (currentGone) {
      currentIndex = queue.length ? Math.min(currentIndex, queue.length - 1) : 0;
    } else if (current) {
      const at = queue.indexOf(current);
      currentIndex = at >= 0 ? at : Math.min(currentIndex, Math.max(0, queue.length - 1));
    }
    try { (window as any).__LUMI_SET_QUEUE__(queue); } catch {}
    busEmit("melo:playback-state", { track: queue[currentIndex] || null, currentTime: audio.currentTime || 0, paused: audio.paused });
  });

  // Tracks APPENDED to the DB queue (import-append from the Playlist
  // window) must join the runtime queue too — the queue views re-render
  // from the DB, but Next/Previous/shuffle read this array, so without it
  // the new tracks would never play. Appending never shifts currentIndex;
  // the playing track is untouched. Entry-id dedupe makes a redelivery a
  // no-op.
  busOn("melo:queue-entries-added", (p: any) => {
    if (!p || !Array.isArray(p.tracks) || !p.tracks.length) return;
    const have = new Set(queue.filter((t: any) => t?.playlistEntryId != null).map((t: any) => `e${t.playlistEntryId}`));
    const fresh = p.tracks.filter((t: any) => t?.playlistEntryId == null || !have.has(`e${t.playlistEntryId}`));
    if (!fresh.length) return;
    queue = queue.concat(fresh);
    try { (window as any).__LUMI_SET_QUEUE__(queue); } catch {}
  });

  // "Clear Queue" in the Playlist window must also stop playback and
  // empty the player's queue: this handler resets the whole playback
  // state to the "No track loaded" boot state.
  busOn("melo:queue-cleared", () => {
    cancelCrossfade();
    queue = [];
    currentIndex = 0;
    pendingPlay = false;
    consecutiveErrors = 0;
    try { audio.pause(); } catch {}
    try { audio.removeAttribute("src"); audio.load(); } catch {}
    try { localStorage.removeItem("melo-resume-state"); } catch {}
    if (!trackTitle) bindDOM();
    if (trackTitle) trackTitle.textContent = "No track loaded";
    if (trackArtist) trackArtist.textContent = "Add music to start playing";
    if (trackAlbum) trackAlbum.textContent = "";
    if (trackCodec) trackCodec.textContent = "";
    if (trackSpecs) trackSpecs.textContent = "";
    if (coverImg) { coverImg.style.display = "none"; coverImg.removeAttribute("src"); }
    if (coverFallback) { coverFallback.style.display = "grid"; coverFallback.textContent = "\u266A"; }
    if (seekBar) { seekBar.value = "0"; updateSeekBackground(); }
    if (curTime) curTime.textContent = "0:00";
    if (durTime) durTime.textContent = "0:00";
    if (iconPlay) iconPlay.style.display = "block";
    if (iconPause) iconPause.style.display = "none";
    if ("mediaSession" in navigator) {
      navigator.mediaSession.playbackState = "none";
      navigator.mediaSession.metadata = null;
    }
    try { (window as any).__LUMI_SET_QUEUE__(queue); } catch {}
    busEmit("melo:playback-state", { track: null, currentTime: 0, paused: true });
  });

  busOn("melo:play-tracks", (p: any) => {
    if (!p || !Array.isArray(p.tracks) || !p.tracks.length) return;
    const gen = ++queueGen;
    cancelCrossfade();
    consecutiveErrors = 0;
    queue = p.tracks;
    (window as any).__LUMI_SET_QUEUE__(queue);
    const idx = Math.max(0, Math.min(p.index || 0, queue.length - 1));
    loadTrack(idx, true);
    // A fromQueue click carries only the ONE clicked record (instant
    // start); grow the runtime queue to the full DB queue in place.
    if (p.fromQueue) hydrateFullQueue(gen, p.tracks[0]);
  });

  // Silent in-place upgrade of the runtime queue to the FULL DB play
  // queue (single source of truth). The audio element is never touched
  // — the same track keeps playing; only the array and index change, so
  // Next/Previous/shuffle/crossfade span the real source. Paged in via
  // LumiLibrary. A stale generation (user click-played again
  // mid-hydrate) or an empty result keeps the small queue.
  async function hydrateFullQueue(gen: number, focusTrack: Track) {
    try {
      const lib = (window as any).LumiLibrary;
      const all: Track[] | undefined = await lib?.getQueueTracksAll?.();
      if (gen !== queueGen || !all || !all.length) return;
      // Queue rows are entry-keyed (duplicates allowed): the clicked
      // occurrence is located by entry id; runtime-only items fall back to
      // the track id.
      const focus = focusTrack.playlistEntryId != null
        ? all.findIndex(t => t.playlistEntryId === focusTrack.playlistEntryId)
        : all.findIndex(t => t.id === focusTrack.id);
      queue = all;
      (window as any).__LUMI_SET_QUEUE__(queue);
      if (focus >= 0) currentIndex = focus;
    } catch { /* the small queue stays; playback is unaffected */ }
  }
}
