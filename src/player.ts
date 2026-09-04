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

  // "audio" always points at whichever physical <audio> element is the
  // currently active / UI-bound deck. Playback normally happens on
  // `primaryAudio`; a second element is created lazily, only if/when
  // Crossfade is actually used, and `audio` is reassigned to it the
  // instant a crossfade finishes (see finishCrossfade()). Everything below
  // (seek bar, volume, mute, keyboard shortcuts, media session, etc.)
  // reads/writes through the `audio` variable, so it transparently follows
  // whichever deck is currently playing.
  let audio: HTMLAudioElement = primaryAudio;
  let secondaryAudio: HTMLAudioElement | null = null;

  // User volume (percent) as tracked by the slider. Kept separately from
  // `audio.volume` (which goes to 0 during fade-out-on-pause) so a skin
  // swap can restore the slider to the real value, not 0 or the template's 60.
  let userVolumePct = 60;

  let queue: Track[] = [];
  let currentIndex = 0;
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
  // The Library caches a 256×256 thumbnail per track (fast for lists), but
  // skins with large cover art render it blurry. For the playing track we
  // ALSO fetch the ORIGINAL embedded artwork — Rust reads the full bytes
  // straight from the file's tags every time and returns them as a base64
  // `data:` URL; nothing is written to disk, so no cache ever grows or
  // leaves orphaned files behind. The thumb is shown instantly first, so
  // there is no blank/fallback flash. The Map below is ONLY an in-memory
  // cache for this session (re-fetching on a skin swap / track return
  // would be a wasted IPC + tag parse); it dies with the app.
  const fullArtCache = new Map<string, string>();
  const fullArtPending = new Set<string>();

  async function upgradeCoverToFull(t: Track) {
    if (!isTauri || !t || !t.id || !coverImg) return;
    const cached = fullArtCache.get(t.id);
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
        fullArtCache.set(t.id, dataUrl);
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
  // A second <audio> element ("secondaryAudio") is created lazily the
  // first time it's needed. Each element gets its own per-deck GainNode
  // in the shared Web Audio graph (audio-graph.ts): both decks mix into
  // the same EQ/analyser chain, so the equalizer and visualizer keep
  // working unmodified and reflect whatever is actually audible.
  //
  // The fade curve itself is scheduled once via native AudioParam
  // automation (setValueCurveAtTime) — the browser's audio thread runs it,
  // not JS on every frame — so an active crossfade costs effectively zero
  // extra CPU beyond decoding the second stream, which is unavoidable for
  // any true crossfade.
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
    // Clamp to what's actually left to play right now. Without this, a
    // manual seek into the last few seconds of a track (with a longer
    // crossfade duration configured) would still schedule the fade/handoff
    // for the full configured duration, so the outgoing deck would run out
    // of audio and go silent seconds before the track info / UI actually
    // switches over to the next track.
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
      if (cfIncoming === incoming) cancelCrossfade();
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

  function applyTrackMetadata(t: Track, opts: { resetProgress: boolean }) {
    if (!trackTitle) bindDOM();

    if (trackTitle) trackTitle.textContent = t.title || "Unknown Title";
    if (trackArtist) trackArtist.textContent = t.artist || "Unknown Artist";
    if (trackAlbum) trackAlbum.textContent = t.album || "";
    if (trackCodec) trackCodec.textContent = t.codec || "AUDIO";
    if (trackSpecs) trackSpecs.textContent = t.specs || "";

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
    window.dispatchEvent(new CustomEvent("lumi:trackChange", { detail: t }));
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
      // loadTrack() can be called with autoplay=false (e.g. "Resume
      // playback on reopen" turned off) — the track is cued up paused, so
      // the transport icons must reflect that (Play visible, Pause
      // hidden). Without this, the icons keep whatever state they were
      // last in (e.g. still showing Pause from before the app closed).
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
    }).catch(() => {
      if (!pendingPlay) {
        pendingPlay = true;
        toast("Click once inside player to begin audio playback");
      }
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
    if (nxt === null) {
      pause();
      return;
    }
    loadTrack(nxt);
  }

  function prev() {
    if (!queue.length) return;
    cancelCrossfade();
    if (audio.currentTime > 3) {
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
    // Inline !important wins over all skin rules, including custom skins.
    stop.style.setProperty("display", enabled ? "inline-flex" : "none", "important");
  }

  function bindDOM() {
    btnPlay = findHook<HTMLButtonElement>("btnPlay", "play")!;
    iconPlay = findHook<HTMLElement>("iconPlay", "play-icon")!;
    iconPause = findHook<HTMLElement>("iconPause", "pause-icon")!;
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
      };
    }

    updateSeekBackground();
    updateVolBackground();

    // A skin swap replaces every control node with the skin template's
    // placeholder values — including the volume bar's default "60". Restore
    // the slider from the user-volume tracker (NOT audio.volume, which can
    // be 0 mid fade-out-on-pause) so the volume never jumps back to 60%
    // when the skin changes.
    if (volBar) {
      volBar.value = String(userVolumePct);
      if (volPct) volPct.textContent = volBar.value + "%";
      updateVolBackground();
    }

    if (queue[currentIndex]) {
      const t = queue[currentIndex];
      if (trackTitle) trackTitle.textContent = t.title || "Unknown Title";
      if (trackArtist) trackArtist.textContent = t.artist || "Unknown Artist";
      if (trackAlbum) trackAlbum.textContent = t.album || "";
      if (trackCodec) trackCodec.textContent = t.codec || "AUDIO";
      if (trackSpecs) trackSpecs.textContent = t.specs || "";
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

      // Re-sync the full transport UI from live playback state. A skin swap
      // replaces every control node, so without this the seek bar / time
      // labels keep the skin template's placeholder values (wrong total
      // duration and wrong progress position) while a track is playing.
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
    if ((e.target as HTMLElement).tagName === "INPUT") return;
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

  busOn("melo:play-tracks", (p: any) => {
    if (!p || !Array.isArray(p.tracks) || !p.tracks.length) return;
    cancelCrossfade();
    queue = p.tracks;
    (window as any).__LUMI_SET_QUEUE__(queue);
    const idx = Math.max(0, Math.min(p.index || 0, queue.length - 1));
    loadTrack(idx, true);
  });
}
