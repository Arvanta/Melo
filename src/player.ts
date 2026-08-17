import type { Track, RepeatMode } from "./types";
import { busEmit, busOn, isTauri } from "./bus";
import { applyDynamicAmbientTheme } from "./cover";
import { getAudioGraph } from "./audio-graph";
import {
  setupQueue,
  getQueueState,
  queueNext as backendNext,
  queuePrev as backendPrev,
  jumpQueue,
  setQueuePosition,
  setQueueShuffle,
  setQueueRepeat,
  onQueueState,
  type QueueState,
} from "./queue";

export async function setupPlayer(
  audio: HTMLAudioElement,
  toast: (m: string) => void,
) {
  let btnPlay: HTMLButtonElement,
    iconPlay: HTMLElement,
    iconPause: HTMLElement;
  let btnPrev: HTMLButtonElement,
    btnNext: HTMLButtonElement,
    btnShuffle: HTMLButtonElement,
    btnRepeat: HTMLButtonElement;
  let btnStop: HTMLButtonElement | null = null;
  let seekBar: HTMLInputElement,
    volBar: HTMLInputElement,
    curTime: HTMLElement,
    durTime: HTMLElement,
    volPct: HTMLElement,
    volIcon: HTMLElement;
  let trackTitle: HTMLElement,
    trackArtist: HTMLElement,
    trackAlbum: HTMLElement,
    trackCodec: HTMLElement,
    trackSpecs: HTMLElement;
  let coverImg: HTMLImageElement, coverFallback: HTMLElement;

  let currentTrack: Track | null = null;
  let isSeeking = false;
  let lastSavedPosition = -1;

  await setupQueue();

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

  function saveCurrentTrackSnapshot(t: Track | null) {
    try {
      if (!t) {
        localStorage.removeItem("melo-current-track");
        return;
      }
      const { cover: _cover, ...trackSnapshot } = t as any;
      localStorage.setItem(
        "melo-current-track",
        JSON.stringify(trackSnapshot),
      );
    } catch {}
  }

  function updateActiveRows(trackId?: string) {
    if (!trackId) {
      document.querySelectorAll(".track-row.active").forEach((el) =>
        el.classList.remove("active")
      );
      return;
    }
    document.querySelectorAll(".track-row").forEach((el) => {
      el.classList.toggle(
        "active",
        (el as HTMLElement).getAttribute("data-track-id") === trackId ||
          (el as HTMLElement).getAttribute("data-pl-track") === trackId,
      );
    });
  }

  async function applyTrack(t: Track | null, autoplay: boolean, seekTo?: number) {
    currentTrack = t;
    if (!trackTitle) bindDOM();

    if (!t) {
      audio.pause();
      audio.removeAttribute("src");
      audio.load();
      if (trackTitle) trackTitle.textContent = "No track loaded";
      if (trackArtist) trackArtist.textContent = "Add music to start playing";
      if (trackAlbum) trackAlbum.textContent = "";
      if (trackCodec) trackCodec.textContent = "—";
      if (trackSpecs) trackSpecs.textContent = "";
      if (coverImg) coverImg.style.display = "none";
      if (coverFallback) coverFallback.style.display = "grid";
      if (seekBar) {
        seekBar.max = "240";
        seekBar.value = "0";
        updateSeekBackground();
      }
      if (durTime) durTime.textContent = "0:00";
      if (curTime) curTime.textContent = "0:00";
      if (iconPlay) iconPlay.style.display = "block";
      if (iconPause) iconPause.style.display = "none";
      if ("mediaSession" in navigator) navigator.mediaSession.playbackState = "none";
      updateActiveRows();
      saveCurrentTrackSnapshot(null);
      window.dispatchEvent(
        new CustomEvent("melo:trackChange", { detail: null }),
      );
      busEmit("melo:track-changed", null);
      busEmit("melo:playback-state", {
        track: null,
        currentTime: 0,
        paused: true,
      });
      return;
    }

    audio.src = await resolveSrc(t.path);
    audio.load();
    if (seekTo && seekTo > 0) {
      const onMeta = () => {
        audio.removeEventListener("loadedmetadata", onMeta);
        try {
          audio.currentTime = seekTo;
        } catch {}
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
    updateActiveRows(t.id);

    if ("mediaSession" in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: t.title,
        artist: t.artist,
        album: t.album,
        artwork: t.cover
          ? [{ src: t.cover, sizes: "512x512", type: "image/jpeg" }]
          : [],
      });
      navigator.mediaSession.setActionHandler("play", () => play());
      navigator.mediaSession.setActionHandler("pause", () => pause());
      navigator.mediaSession.setActionHandler("previoustrack", () => prev());
      navigator.mediaSession.setActionHandler("nexttrack", () => next());
      navigator.mediaSession.setActionHandler("seekto", (details) => {
        if (details.seekTime) audio.currentTime = details.seekTime;
      });
    }

    saveCurrentTrackSnapshot(t);
    window.dispatchEvent(new CustomEvent("melo:trackChange", { detail: t }));
    busEmit("melo:track-changed", t);
    busEmit("melo:playback-state", {
      track: t,
      currentTime: audio.currentTime || seekTo || 0,
      paused: audio.paused,
    });

    if (autoplay) {
      void play();
    } else {
      if (iconPlay) iconPlay.style.display = "block";
      if (iconPause) iconPause.style.display = "none";
    }
  }

  let pendingPlay = false;
  async function onUnlocked() {
    try {
      await getAudioGraph(audio).resume();
    } catch {}
    if (!pendingPlay) return;
    pendingPlay = false;
    audio
      .play()
      .then(() => {
        if (iconPlay) iconPlay.style.display = "none";
        if (iconPause) iconPause.style.display = "block";
      })
      .catch(() => {});
  }

  window.addEventListener("pointerdown", onUnlocked);
  window.addEventListener("keydown", onUnlocked);
  busOn("melo:pref-changed", (p: any) => {
    if (p && p.key === "replayGainGlobal") applyReplayGain();
    if (p && p.key === "showStopBtn")
      syncStopButtonVisibility(!!p.value);
  });

  busOn("melo:request-playback-state", () => {
    busEmit("melo:playback-state", {
      track: currentTrack,
      currentTime: audio.currentTime || 0,
      paused: audio.paused,
    });
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
      if (p < 1) {
        fadeRAF = requestAnimationFrame(step);
      } else {
        fadeRAF = null;
        onDone?.();
      }
    };
    fadeRAF = requestAnimationFrame(step);
  }

  async function play() {
    try {
      await getAudioGraph(audio).resume();
    } catch {}
    // Fade-on-pause is ON by default; only an explicit "0" disables it.
    const fadeOn = localStorage.getItem("melo-pref-fadePause") !== "0";
    const target = computeTargetVolume();
    if (fadeOn && wasFadedPause) audio.volume = 0;
    audio
      .play()
      .then(() => {
        pendingPlay = false;
        if (iconPlay) iconPlay.style.display = "none";
        if (iconPause) iconPause.style.display = "block";
        if ("mediaSession" in navigator)
          navigator.mediaSession.playbackState = "playing";
        if (fadeOn && wasFadedPause) {
          wasFadedPause = false;
          fadeVolumeTo(target, 300);
        } else audio.volume = target;
      })
      .catch(() => {
        if (!pendingPlay) {
          pendingPlay = true;
          toast("Click once inside player to begin audio playback");
        }
      });
  }

  function pause() {
    // Fade-on-pause is ON by default; only an explicit "0" disables it.
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
    if ("mediaSession" in navigator)
      navigator.mediaSession.playbackState = "paused";
  }

  function togglePlay() {
    if (!currentTrack) {
      const qs = getQueueState();
      if (qs.currentSeq != null) {
        void jumpQueue(qs.currentSeq, 0);
        return;
      }
      return;
    }
    if (audio.paused) play();
    else pause();
  }

  function stop() {
    audio.pause();
    try {
      audio.currentTime = 0;
    } catch {}
    if (iconPlay) iconPlay.style.display = "block";
    if (iconPause) iconPause.style.display = "none";
    if (seekBar) {
      seekBar.value = "0";
      updateSeekBackground();
    }
    if (curTime) curTime.textContent = "0:00";
    if ("mediaSession" in navigator)
      navigator.mediaSession.playbackState = "paused";
  }

  async function next() {
    if (!currentTrack) return;
    const qs = getQueueState();
    if (qs.repeat === "one") {
      try {
        audio.currentTime = 0;
      } catch {}
      void play();
      return;
    }
    await backendNext();
  }

  async function prev() {
    if (!currentTrack) return;
    if (audio.currentTime > 3) {
      audio.currentTime = 0;
      return;
    }
    await backendPrev();
  }

  function computeTargetVolume(): number {
    if (!volBar) return 1;
    const baseVol = parseInt(volBar.value, 10) / 100;
    const replayGainEnabled =
      localStorage.getItem("melo-pref-replayGainGlobal") !== "0";
    const gainDb = replayGainEnabled ? currentTrack?.replayGain ?? 0 : 0;
    const linear = Math.pow(10, gainDb / 20);
    return Math.min(1, Math.max(0, baseVol * linear));
  }
  function applyReplayGain() {
    if (!currentTrack || !volBar) return;
    audio.volume = computeTargetVolume();
  }

  function syncStopButtonVisibility(
    enabled = localStorage.getItem("melo-pref-showStopBtn") === "1",
  ) {
    const stop = document.getElementById("btnStop") as HTMLButtonElement | null;
    if (!stop) return;
    stop.style.setProperty(
      "display",
      enabled ? "inline-flex" : "none",
      "important",
    );
  }

  function syncTransportButtons(qs: QueueState) {
    if (btnShuffle) btnShuffle.classList.toggle("active", qs.shuffle);
    if (btnRepeat) {
      btnRepeat.classList.toggle("active", qs.repeat !== "off");
      const labels: Record<RepeatMode, string> = {
        off: "Repeat off",
        all: "Repeat all",
        one: "Repeat one",
      };
      btnRepeat.title = labels[qs.repeat];
    }
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
      btnShuffle.onclick = async () => {
        const qs = getQueueState();
        const next = !qs.shuffle;
        await setQueueShuffle(next);
        toast(next ? "Shuffle on" : "Shuffle off");
      };
    }

    if (btnRepeat) {
      btnRepeat.onclick = async () => {
        const qs = getQueueState();
        const nextMode: RepeatMode =
          qs.repeat === "off"
            ? "all"
            : qs.repeat === "all"
              ? "one"
              : "off";
        await setQueueRepeat(nextMode);
        const labels: Record<RepeatMode, string> = {
          off: "Repeat off",
          all: "Repeat all",
          one: "Repeat one",
        };
        toast(labels[nextMode]);
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
    syncTransportButtons(getQueueState());

    // After a full-HTML skin swap the seek bar/duration elements are
    // replaced with fresh DOM whose max/value come from the skin's static
    // HTML (often 276). Re-sync them from the live audio/currentTrack so
    // the total time and progress position are correct immediately.
    const liveDur = Number.isFinite(audio.duration) && audio.duration > 0
      ? Math.floor(audio.duration)
      : (currentTrack?.duration || 0);
    if (seekBar) {
      if (liveDur > 0) seekBar.max = String(liveDur);
      seekBar.value = String(Math.floor(audio.currentTime || 0));
      updateSeekBackground();
    }
    if (durTime) durTime.textContent = formatTime(liveDur);
    if (curTime) curTime.textContent = formatTime(audio.currentTime || 0);

    if (currentTrack) {
      if (trackTitle) trackTitle.textContent = currentTrack.title || "Unknown Title";
      if (trackArtist)
        trackArtist.textContent = currentTrack.artist || "Unknown Artist";
      if (trackAlbum) trackAlbum.textContent = currentTrack.album || "";
      if (trackCodec) trackCodec.textContent = currentTrack.codec || "AUDIO";
      if (trackSpecs) trackSpecs.textContent = currentTrack.specs || "";
      if (currentTrack.cover && coverImg) {
        coverImg.src = currentTrack.cover;
        coverImg.style.display = "block";
        if (coverFallback) coverFallback.style.display = "none";
      }
    }
  }

  bindDOM();

  onQueueState((qs) => {
    syncTransportButtons(qs);
    const previousId = currentTrack?.id;
    const nextTrack = qs.currentTrack;
    if (nextTrack?.id !== previousId) {
      const shouldAutoplay = qs.currentSeq != null && (
        qs.currentTrack != null && (
          // When the current player had no track, initial restore is paused.
          previousId == null ? false : true
        )
      );
      void applyTrack(nextTrack, shouldAutoplay);
      return;
    }
    if (
      nextTrack &&
      Number.isFinite(qs.currentPosition) &&
      Math.abs(qs.currentPosition - (audio.currentTime || 0)) > 1.5
    ) {
      try {
        audio.currentTime = qs.currentPosition;
      } catch {}
    }
  });

  // React to populate events from other windows. Backend already updated DB;
  // queue-state will follow, but this provides the autoplay hint.
  busOn("melo:queue-populated", (payload: any) => {
    const qs = getQueueState();
    if (!qs.currentTrack) return;
    const autoplay = payload?.autoplay !== false;
    if (currentTrack?.id === qs.currentTrack.id) return;
    void applyTrack(qs.currentTrack, autoplay, qs.currentPosition || 0);
  });

  document.addEventListener("wheel", (event) => {
    const target = event.target as HTMLElement | null;
    if (!target?.closest("#playerCard") || !volBar) return;
    event.preventDefault();
    const step = event.deltaY < 0 ? 5 : -5;
    volBar.value = String(
      Math.max(0, Math.min(100, Number(volBar.value) + step)),
    );
    volBar.dispatchEvent(new Event("input"));
  }, { passive: false });

  async function persistPosition(force = false) {
    const pos = audio.currentTime || 0;
    if (!force && Math.abs(pos - lastSavedPosition) < 5) return;
    lastSavedPosition = pos;
    try {
      localStorage.setItem(
        "melo-resume-state",
        JSON.stringify({
          trackId: currentTrack?.id || null,
          position: pos,
        }),
      );
    } catch {}
    await setQueuePosition(pos);
  }

  audio.addEventListener("timeupdate", () => {
    busEmit("melo:playback-position", audio.currentTime || 0);
    if (!isSeeking && seekBar && curTime) {
      seekBar.value = String(Math.floor(audio.currentTime));
      curTime.textContent = formatTime(audio.currentTime);
      updateSeekBackground();
    }
    void persistPosition(false);
  });

  audio.addEventListener("loadedmetadata", () => {
    if (!seekBar || !durTime) return;
    const dur = Math.floor(
      audio.duration || currentTrack?.duration || 240,
    );
    seekBar.max = String(dur);
    durTime.textContent = formatTime(dur);
    updateSeekBackground();
  });

  audio.addEventListener("ended", () => {
    void next();
  });

  audio.addEventListener("pause", () => {
    if (iconPlay) iconPlay.style.display = "block";
    if (iconPause) iconPause.style.display = "none";
    if ("mediaSession" in navigator)
      navigator.mediaSession.playbackState = "paused";
    if (currentTrack) {
      void persistPosition(true);
    }
  });

  audio.addEventListener("error", () => {
    if (currentTrack) {
      toast("Could not play this track — skipping");
      void next();
    }
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
    else if (action === "mute") toggleMute();
  });

  (window as any).MeloPlayer = {
    get currentTrack() {
      return currentTrack;
    },
    get currentIndex() {
      return getQueueState().currentOrderIndex ?? 0;
    },
    loadTrack: async (seq: number, autoplay = true, seekTo?: number) => {
      await jumpQueue(seq, seekTo || 0);
    },
    play,
    pause,
    stop,
    next,
    prev,
    get audio() {
      return audio;
    },
    rebind: bindDOM,
  };
  (window as any).__MELO_REBIND__ = bindDOM;

  // Restore the last track/position on cold start. "Resume playback on
  // reopen" is ON by default; only an explicit "0" turns it off.
  const resumeOnReopen =
    localStorage.getItem("melo-pref-resume") !== "0";
  const restored = getQueueState();
  if (restored.currentTrack && restored.currentPosition > 1) {
    void applyTrack(
      restored.currentTrack,
      resumeOnReopen,
      restored.currentPosition,
    );
  } else if (restored.currentTrack) {
    void applyTrack(restored.currentTrack, resumeOnReopen);
  }
}
