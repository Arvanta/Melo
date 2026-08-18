import type { Track, RepeatMode } from "./types";
import { busEmit, busOn, isTauri } from "./bus";
import { applyDynamicAmbientTheme } from "./cover";
import { getAudioGraph } from "./audio-graph";

export function setupPlayer(audio: HTMLAudioElement, toast: (m: string) => void) {
  let btnPlay: HTMLButtonElement, iconPlay: HTMLElement, iconPause: HTMLElement;
  let btnPrev: HTMLButtonElement, btnNext: HTMLButtonElement, btnShuffle: HTMLButtonElement, btnRepeat: HTMLButtonElement;
  let btnStop: HTMLButtonElement | null = null;
  let seekBar: HTMLInputElement, volBar: HTMLInputElement, curTime: HTMLElement, durTime: HTMLElement, volPct: HTMLElement, volIcon: HTMLElement;
  let trackTitle: HTMLElement, trackArtist: HTMLElement, trackAlbum: HTMLElement, trackCodec: HTMLElement, trackSpecs: HTMLElement;
  let coverImg: HTMLImageElement, coverFallback: HTMLElement;

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

  (window as any).__MELO_QUEUE__ = queue;
  (window as any).__MELO_SET_QUEUE__ = (q: Track[]) => {
    queue = q;
    (window as any).__MELO_QUEUE__ = q;
  };

  function markPlayingRow(trackId?: string) {
    const id = trackId || queue[currentIndex]?.id;
    document.querySelectorAll(".track-row").forEach(el => {
      const row = el as HTMLElement;
      const rowId = row.dataset.plTrack || row.dataset.trackId;
      row.classList.toggle("active", !!id && rowId === id);
    });
  }

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

  async function loadTrack(idx: number, autoplay = true, seekTo?: number) {
    if (!queue.length) return;
    if (idx < 0) idx = queue.length - 1;
    if (idx >= queue.length) idx = 0;
    currentIndex = idx;
    const t = queue[idx];
    if (!t) return;

    if (!trackTitle) bindDOM();

    audio.src = await resolveSrc(t.path);
    audio.load();
    if (seekTo && seekTo > 0) {
      const onMeta = () => {
        audio.removeEventListener("loadedmetadata", onMeta);
        try { audio.currentTime = seekTo; } catch {}
      };
      audio.addEventListener("loadedmetadata", onMeta);
    }

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

    if (seekBar) {
      seekBar.max = String(t.duration || 240);
      seekBar.value = "0";
      updateSeekBackground();
    }
    if (durTime) durTime.textContent = formatTime(t.duration);
    if (curTime) curTime.textContent = "0:00";

    applyReplayGain();
    applyDynamicAmbientTheme(t.cover || null);

    markPlayingRow(t.id);

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

    if (autoplay) play();

    // Keep a small durable snapshot as a race-free fallback for a Lyrics
    // window created after this event. Cover art is omitted to avoid filling
    // localStorage with a large data URL.
    try {
      const { cover: _cover, ...trackSnapshot } = t as any;
      localStorage.setItem("melo-current-track", JSON.stringify(trackSnapshot));
    } catch {}
    window.dispatchEvent(new CustomEvent("melo:trackChange", { detail: t }));
    busEmit("melo:track-changed", t);
    busEmit("melo:playback-state", { track: t, currentTime: audio.currentTime || 0, paused: audio.paused });
  }

  let pendingPlay = false;
  async function onUnlocked() {
    try { await getAudioGraph(audio).resume(); } catch {}
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
    try { await getAudioGraph(audio).resume(); } catch {}
    const fadeOn = localStorage.getItem("melo-pref-fadePause") !== "0";
    const target = computeTargetVolume();
    if (fadeOn && wasFadedPause) audio.volume = 0;
    audio.play().then(() => {
      pendingPlay = false;
      if (iconPlay) iconPlay.style.display = "none";
      if (iconPause) iconPause.style.display = "block";
      if ("mediaSession" in navigator) navigator.mediaSession.playbackState = "playing";
      if (fadeOn && wasFadedPause) { wasFadedPause = false; fadeVolumeTo(target, 500); }
      else audio.volume = target;
    }).catch(() => {
      if (!pendingPlay) {
        pendingPlay = true;
        toast("Click once inside player to begin audio playback");
      }
    });
  }

  function pause() {
    const fadeOn = localStorage.getItem("melo-pref-fadePause") !== "0";
    if (fadeOn && !audio.paused) {
      wasFadedPause = true;
      fadeVolumeTo(0, 500, () => audio.pause());
    } else {
      wasFadedPause = false;
      audio.pause();
    }
    if (iconPlay) iconPlay.style.display = "block";
    if (iconPause) iconPause.style.display = "none";
    if ("mediaSession" in navigator) navigator.mediaSession.playbackState = "paused";
    persistResume(true);
  }

  function togglePlay() {
    if (audio.paused) play();
    else pause();
  }

  function stop() {
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

  function computeTargetVolume(): number {
    const t = queue[currentIndex];
    if (!volBar) return 1;
    const baseVol = parseInt(volBar.value, 10) / 100;
    const replayGainEnabled = localStorage.getItem("melo-pref-replayGainGlobal") !== "0";
    const gainDb = replayGainEnabled ? t?.replayGain ?? 0 : 0;
    const linear = Math.pow(10, gainDb / 20);
    return Math.min(1, Math.max(0, baseVol * linear));
  }
  function applyReplayGain() {
    if (!queue[currentIndex] || !volBar) return;
    audio.volume = computeTargetVolume();
  }

  function syncStopButtonVisibility(enabled = localStorage.getItem("melo-pref-showStopBtn") === "1") {
    const stop = document.getElementById("btnStop") as HTMLButtonElement | null;
    if (!stop) return;
    // Inline !important wins over all skin rules, including compact skins.
    stop.style.setProperty("display", enabled ? "inline-flex" : "none", "important");
  }

  function bindDOM() {
    btnPlay = document.getElementById("btnPlay") as HTMLButtonElement;
    iconPlay = document.getElementById("iconPlay") as HTMLElement;
    iconPause = document.getElementById("iconPause") as HTMLElement;
    btnPrev = document.getElementById("btnPrev") as HTMLButtonElement;
    btnNext = document.getElementById("btnNext") as HTMLButtonElement;
    btnShuffle = document.getElementById("btnShuffle") as HTMLButtonElement;
    btnRepeat = document.getElementById("btnRepeat") as HTMLButtonElement;
    btnStop = document.getElementById("btnStop") as HTMLButtonElement | null;
    syncStopButtonVisibility();
    seekBar = document.getElementById("seekBar") as HTMLInputElement;
    volBar = document.getElementById("volBar") as HTMLInputElement;
    curTime = document.getElementById("curTime") as HTMLElement;
    durTime = document.getElementById("durTime") as HTMLElement;
    volPct = document.getElementById("volPct") as HTMLElement;
    volIcon = document.getElementById("volIcon") as HTMLElement;
    if (volIcon) volIcon.onclick = () => toggleMute();
    syncMuteUI();
    trackTitle = document.getElementById("trackTitle") as HTMLElement;
    trackArtist = document.getElementById("trackArtist") as HTMLElement;
    trackAlbum = document.getElementById("trackAlbum") as HTMLElement;
    trackCodec = document.getElementById("trackCodec") as HTMLElement;
    trackSpecs = document.getElementById("trackSpecs") as HTMLElement;
    coverImg = document.getElementById("coverImg") as HTMLImageElement;
    coverFallback = document.getElementById("coverFallback") as HTMLElement;

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
        audio.currentTime = parseFloat(seekBar.value);
        isSeeking = false;
      };
    }

    if (volBar) {
      volBar.oninput = () => {
        updateVolBackground();
        if (volPct) volPct.textContent = volBar.value + "%";
        applyReplayGain();
      };
    }

    updateSeekBackground();
    updateVolBackground();

    if (btnShuffle) btnShuffle.classList.toggle("active", isShuffle);
    if (btnRepeat) {
      btnRepeat.classList.toggle("active", repeatMode !== "off");
      const labels: Record<RepeatMode, string> = { off: "Repeat off", all: "Repeat all", one: "Repeat one" };
      btnRepeat.title = labels[repeatMode];
    }

    const playing = !audio.paused && !audio.ended;
    if (iconPlay) iconPlay.style.display = playing ? "none" : "block";
    if (iconPause) iconPause.style.display = playing ? "block" : "none";

    const liveDur = Number.isFinite(audio.duration) && audio.duration > 0
      ? audio.duration
      : (queue[currentIndex]?.duration || 0);
    if (seekBar) {
      seekBar.max = String(Math.max(1, Math.floor(liveDur || 240)));
      seekBar.value = String(Math.floor(audio.currentTime || 0));
      updateSeekBackground();
    }
    if (durTime) durTime.textContent = formatTime(liveDur);
    if (curTime) curTime.textContent = formatTime(audio.currentTime || 0);

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
      }
      markPlayingRow(t.id);
    }
  }

  bindDOM();

  // Mouse wheel over the main player adjusts volume without requiring the
  // pointer to be directly over the slider.
  document.addEventListener("wheel", event => {
    const target = event.target as HTMLElement | null;
    if (!target?.closest("#playerCard") || !volBar) return;
    event.preventDefault();
    const step = event.deltaY < 0 ? 5 : -5;
    volBar.value = String(Math.max(0, Math.min(100, Number(volBar.value) + step)));
    volBar.dispatchEvent(new Event("input"));
  }, { passive: false });

  audio.addEventListener("timeupdate", () => {
    busEmit("melo:playback-position", audio.currentTime || 0);
    if (!isSeeking && seekBar && curTime) {
      seekBar.value = String(Math.floor(audio.currentTime));
      curTime.textContent = formatTime(audio.currentTime);
      updateSeekBackground();
    }
    saveResumeStateThrottled();
  });

  function persistResume(force = false) {
    const t = queue[currentIndex];
    if (!t) return;
    try {
      const lib = (window as any).MeloLibrary;
      localStorage.setItem("melo-resume-state", JSON.stringify({
        trackId: t.id,
        path: t.path,
        title: t.title,
        artist: t.artist,
        album: t.album,
        duration: t.duration,
        codec: t.codec,
        specs: t.specs,
        position: audio.currentTime || 0,
        playlistId: lib?.currentPlaylistId?.() || localStorage.getItem("melo-currentPlaylist") || null,
        index: currentIndex,
        playing: !audio.paused,
      }));
    } catch {}
    if (force) return;
  }

  let resumeSaveTimer: any = null;
  function saveResumeStateThrottled() {
    if (resumeSaveTimer) return;
    resumeSaveTimer = setTimeout(() => {
      resumeSaveTimer = null;
      if (!queue[currentIndex] || audio.paused) return;
      persistResume();
    }, 1500);
  }

  async function tryResume() {
    if (localStorage.getItem("melo-pref-resume") === "0") return;
    if (queue.length) return;
    if (isTauri) {
      try {
        const { invoke } = await import("@tauri-apps/api/core");
        const cli: any[] = await invoke("get_cli_tracks");
        if (Array.isArray(cli) && cli.length) return;
      } catch {}
    }
    let state: any = null;
    try { state = JSON.parse(localStorage.getItem("melo-resume-state") || "null"); } catch {}
    if (!state?.trackId && !state?.path) return;

    const lib = (window as any).MeloLibrary;
    let tracks: Track[] = [];
    let index = 0;
    for (let i = 0; i < 12 && !lib?.getTrack; i++) {
      await new Promise(r => setTimeout(r, 150));
    }
    try {
      if (lib?.getPlaylistTracks) {
        tracks = await lib.getPlaylistTracks(state.playlistId || undefined);
      }
    } catch {}
    if (tracks.length) {
      index = tracks.findIndex(t => t.id === state.trackId || t.path === state.path);
      if (index < 0) index = Math.max(0, Number(state.index) || 0);
      if (index >= tracks.length) index = 0;
    } else {
      let track = null;
      try { track = state.trackId && lib?.getTrack ? await lib.getTrack(state.trackId) : null; } catch {}
      if (!track && state.path) {
        track = {
          id: state.trackId || state.path,
          title: state.title || "Unknown Title",
          artist: state.artist || "Unknown Artist",
          album: state.album || "",
          genre: "",
          year: 0,
          duration: state.duration || 0,
          path: state.path,
          codec: state.codec || "AUDIO",
          specs: state.specs || "",
          source: "scan",
        } as Track;
      }
      if (!track) return;
      tracks = [track];
      index = 0;
    }

    queue = tracks;
    (window as any).__MELO_SET_QUEUE__(queue);
    await loadTrack(index, true, Number(state.position) || 0);
  }

  audio.addEventListener("loadedmetadata", () => {
    if (!seekBar || !durTime) return;
    const dur = Math.floor(audio.duration || queue[currentIndex]?.duration || 240);
    seekBar.max = String(dur);
    durTime.textContent = formatTime(dur);
    updateSeekBackground();
  });

  audio.addEventListener("ended", () => {
    next();
  });

  window.addEventListener("keydown", (e) => {
    if ((e.target as HTMLElement).tagName === "INPUT") return;
    if (e.code === "Space") {
      e.preventDefault();
      togglePlay();
    }
    if (e.code === "ArrowRight") {
      audio.currentTime += 5;
    }
    if (e.code === "ArrowLeft") {
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

  (window as any).MeloPlayer = (window as any).LumiPlayer = {
    get queue() { return queue; },
    set queue(v) { queue = v; (window as any).__MELO_QUEUE__ = v; },
    get currentIndex() { return currentIndex; },
    loadTrack,
    tryResume,
    persistResume,
    play,
    pause,
    stop,
    next,
    prev,
    get audio() { return audio; },
    rebind: bindDOM,
  };
  (window as any).__MELO_REBIND__ = bindDOM;

  busOn("melo:play-tracks", (p: any) => {
    if (!p || !Array.isArray(p.tracks) || !p.tracks.length) return;
    queue = p.tracks;
    (window as any).__MELO_SET_QUEUE__(queue);
    const idx = Math.max(0, Math.min(p.index || 0, queue.length - 1));
    loadTrack(idx, true);
  });

  window.addEventListener("pagehide", () => persistResume(true));
  window.addEventListener("beforeunload", () => persistResume(true));
  setTimeout(() => { tryResume().catch(() => {}); }, 400);
}
