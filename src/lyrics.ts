import { busEmit, busOn } from "./bus";
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

export function setupLyrics(audio: HTMLAudioElement, toast: (m: string) => void) {
  const lyricsContainer = document.getElementById("lyricsContainer") as HTMLElement | null;
  const lyricsStatus = document.getElementById("lyricsStatus") as HTMLElement | null;
  const lyricsTitle = document.getElementById("lyricsTrackTitle") as HTMLElement | null;

  let currentParsed: { isSynced: boolean; lines: LyricLine[]; raw: string } = { isSynced: false, lines: [], raw: "" };
  let currentTrackId: string | null = null;
  let activeIndex = -1;
  let playbackTime = 0;

  async function fetchLyricsForTrack(track: Track): Promise<string | null> {
    if (track.lyrics && track.lyrics.trim().length > 0) {
      return track.lyrics;
    }
    if ((window as any).__TAURI__) {
      try {
        const { invoke } = await import("@tauri-apps/api/core");
        const lrc: string | null = await invoke("get_track_lyrics", { path: track.path });
        if (lrc) return lrc;
      } catch {}
    }
    return null;
  }

  async function loadTrackLyrics(track: Track | null) {
    if (!track) {
      currentTrackId = null;
      currentParsed = { isSynced: false, lines: [], raw: "" };
      if (lyricsTitle) lyricsTitle.textContent = "No track playing";
      renderLyrics();
      return;
    }
    currentTrackId = track.id;
    if (lyricsTitle) lyricsTitle.textContent = `${track.title} — ${track.artist}`;

    const text = await fetchLyricsForTrack(track);
    currentParsed = parseLRC(text || "");
    renderLyrics();
  }

  function renderLyrics() {
    if (!lyricsContainer) return;
    lyricsContainer.innerHTML = "";
    activeIndex = -1;

    if (!currentParsed.lines.length) {
      if (lyricsStatus) {
        lyricsStatus.style.display = "block";
        lyricsStatus.innerHTML = `No synced lyrics found (.lrc)<br/><span style="font-size:10.5px; opacity:0.7;">Place a matching .lrc file in the song folder or add lyrics in the tag editor.</span>`;
      }
      return;
    }

    if (lyricsStatus) lyricsStatus.style.display = "none";

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

  window.addEventListener("melo:trackChange", (e: any) => {
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
  const current = (window as any).MeloPlayer?.currentTrack || null;
  if (current) {
    loadTrackLyrics(current);
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

  (window as any).MeloLyrics = { loadTrackLyrics, parseLRC };
}
