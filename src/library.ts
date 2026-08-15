import type { Track, Playlist } from "./types";
import { withCover } from "./cover";
import { busEmit, busOn, isTauri } from "./bus";
import { dbGetTracks, dbSaveTracks, dbGetPlaylists, dbSavePlaylists } from "./db";

const isTauriEnv = isTauri;
const myRole: string = new URLSearchParams(location.search).get("panel") || "main";

let tracks: Track[] = [];
let playlists: Playlist[] = [{ id: "p1", name: "Favorites", tracks: [], createdAt: Date.now() }];

// Initialize data from IndexedDB
dbGetPlaylists().then(p => {
  if (Array.isArray(p) && p.length) playlists = p;
});
dbGetTracks().then(t => {
  if (Array.isArray(t) && t.length) tracks = t;
});

function esc(x: any): string {
  return String(x ?? "").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
}

function fmtDur(d: number): string {
  const m = Math.floor(d / 60);
  const s = Math.floor(d % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

export function setupLibrary(audio: HTMLAudioElement, toast: (m: string) => void) {
  const trackListEl = document.getElementById("trackList") as HTMLElement | null;
  const playlistListEl = document.getElementById("playlistList") as HTMLElement | null;
  const winPlaylistTracks = document.getElementById("winPlaylistTracks") as HTMLElement | null;
  const winPlaylistEmpty = document.getElementById("winPlaylistEmpty") as HTMLElement | null;
  const playlistSelect = document.getElementById("playlistSelect") as HTMLSelectElement | null;
  const playlistSortSelect = document.getElementById("playlistSortSelect") as HTMLSelectElement | null;
  const searchInput = document.getElementById("searchInput") as HTMLInputElement | null;
  const playlistSearchInput = document.getElementById("playlistSearchInput") as HTMLInputElement | null;
  const libraryStats = document.getElementById("libraryStats") as HTMLElement | null;
  const btnScan = document.getElementById("btn-scan") as HTMLButtonElement | null;
  const btnExport = document.getElementById("btn-export-playlist") as HTMLButtonElement | null;
  const btnNewPlaylist = document.getElementById("btn-new-playlist") as HTMLButtonElement | null;
  const queueListEl = document.getElementById("queueList") as HTMLElement | null;
  const tagEditor = document.getElementById("tagEditor") as HTMLElement | null;

  // Scan progress UI inside Library window
  const libScanProgressWrap = document.getElementById("libScanProgressWrap");
  const libScanStatusText = document.getElementById("libScanStatusText");
  const libScanStatusPct = document.getElementById("libScanStatusPct");
  const libScanProgressBar = document.getElementById("libScanProgressBar");

  // Tag inputs
  const tagTitle = document.getElementById("tagTitle") as HTMLInputElement | null;
  const tagArtist = document.getElementById("tagArtist") as HTMLInputElement | null;
  const tagAlbum = document.getElementById("tagAlbum") as HTMLInputElement | null;
  const tagYear = document.getElementById("tagYear") as HTMLInputElement | null;
  const tagCover = document.getElementById("tagCover") as HTMLInputElement | null;

  let search = "";
  let playlistSearchQuery = "";
  let playlistSortMode = "default";
  let currentPlaylistId: string = localStorage.getItem("melo-currentPlaylist") || playlists[0]?.id || "";

  // Library browsing state
  let libTab: "artists" | "albums" | "genres" = "artists";
  let selArtist: string | null = null;
  let selAlbum: string | null = null;
  let selAlbumKey: string | null = null;
  let selGenre: string | null = null;
  let viewList: Track[] = [];

  // ReplayGain toggle
  const replayGainToggle = document.getElementById("replayGainToggle") as HTMLInputElement | null;
  if (replayGainToggle) {
    const savedRg = localStorage.getItem("melo-pref-rg");
    if (savedRg !== null) replayGainToggle.checked = savedRg === "1";
    replayGainToggle.addEventListener("change", () => {
      localStorage.setItem("melo-pref-rg", replayGainToggle.checked ? "1" : "0");
    });
  }

  document.getElementById("libraryTabs")?.querySelectorAll(".tab").forEach(t => {
    t.addEventListener("click", () => {
      document.querySelectorAll("#libraryTabs .tab").forEach(x => x.classList.remove("active"));
      t.classList.add("active");
      libTab = (t as HTMLElement).dataset.libtab as any;
      selArtist = selAlbum = selAlbumKey = selGenre = null;
      render();
    });
  });

  searchInput?.addEventListener("input", () => {
    search = (searchInput?.value || "").toLowerCase();
    render();
  });

  if (playlistSearchInput) {
    playlistSearchInput.addEventListener("input", () => {
      playlistSearchQuery = playlistSearchInput.value || "";
      renderPlaylistWindow();
    });
  }

  if (playlistSortSelect) {
    playlistSortSelect.addEventListener("change", () => {
      playlistSortMode = playlistSortSelect.value || "default";
      renderPlaylistWindow();
    });
  }

  // Load initial data from IndexedDB and paint
  Promise.all([dbGetTracks(), dbGetPlaylists()]).then(([tList, pList]) => {
    if (Array.isArray(tList) && tList.length) tracks = tList;
    if (Array.isArray(pList) && pList.length) playlists = pList;
    render();
    renderPlaylistWindow();
    renderQueue();
  });

  // Context Menu for Tracks
  const ctxMenu = document.createElement("div");
  ctxMenu.className = "ctx-menu";
  ctxMenu.style.cssText = "position:fixed; z-index:99999; background:var(--card-bg, #1a1a1a); border:1px solid var(--card-border, #333); border-radius:8px; padding:4px 0; box-shadow:0 8px 24px rgba(0,0,0,0.5); min-width:140px; display:none;";
  document.body.appendChild(ctxMenu);

  let ctxTrack: Track | null = null;
  const hideCtx = () => { ctxMenu.style.display = "none"; ctxTrack = null; };
  document.addEventListener("click", hideCtx);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") hideCtx(); });

  ctxMenu.addEventListener("click", (e) => {
    e.stopPropagation();
    const act = (e.target as HTMLElement).closest("[data-act]")?.getAttribute("data-act");
    if (act === "edit" && ctxTrack) {
      openTagEditor(ctxTrack);
    } else if (act === "add-pl" && ctxTrack) {
      addToCurrentPlaylist([ctxTrack]);
      toast("Added to playlist");
    } else if (act === "remove" && ctxTrack) {
      const tid = ctxTrack.id;
      tracks = tracks.filter(t => t.id !== tid);
      playlists.forEach(p => { p.tracks = p.tracks.filter(id => id !== tid); });
      dbSaveTracks(tracks);
      savePlaylists();
      render();
      renderPlaylistWindow();
      toast("Removed from library");
    }
    hideCtx();
  });

  // Current Playlist helpers
  function currentPlaylist(): Playlist | undefined {
    return playlists.find(p => p.id === currentPlaylistId) || playlists[0];
  }

  function savePlaylists() {
    dbSavePlaylists(playlists);
    if (isTauriEnv) busEmit("melo:playlists-sync", { src: myRole, playlists });
  }

  function broadcastPlaylists() {
    if (isTauriEnv) busEmit("melo:playlists-sync", { src: myRole, playlists });
  }

  function setCurrentPlaylist(id: string) {
    currentPlaylistId = id;
    localStorage.setItem("melo-currentPlaylist", id);
    renderPlaylistWindow();
  }

  busOn("melo:playlists-sync", (p: any) => {
    if (p && p.src !== myRole && Array.isArray(p.playlists)) {
      playlists = p.playlists;
      renderPlaylistWindow();
      render();
    }
  });

  function saveTracks() {
    dbSaveTracks(tracks);
  }

  function replaceCurrentPlaylist(list: Track[]) {
    const pl = currentPlaylist();
    if (!pl) return;
    pl.tracks = list.map(t => t.id);
    savePlaylists();
    broadcastPlaylists();
    renderPlaylistWindow();
  }

  busOn("melo:play-tracks", (p: any) => {
    if (!p || !Array.isArray(p.tracks) || !p.tracks.length) return;
    if (p.fromPlaylist) return;
    replaceCurrentPlaylist(p.tracks);
  });

  busOn("melo:cover-loaded", (p: any) => {
    if (p && (p.id || p.path) && p.cover) {
      const found = tracks.find(t => t.id === p.id || t.path === p.path);
      if (found) {
        found.cover = p.cover;
        renderPlaylistWindow();
      }
    }
  });

  function addTracks(list: Track[], broadcast = false) {
    let changed = false;
    const existingIds = new Set(tracks.map(x => x.id));
    for (const t of list) {
      if (!existingIds.has(t.id)) {
        tracks.push(t);
        existingIds.add(t.id);
        changed = true;
      }
    }
    if (changed) {
      saveTracks();
      render();
      renderPlaylistWindow();
    }
    if (broadcast && isTauriEnv) busEmit("melo:tracks-add", { src: myRole, list });
  }

  busOn("melo:tracks-add", (p: any) => {
    if (p && p.src !== myRole && Array.isArray(p.list)) addTracks(p.list);
  });

  busOn("melo:tracks-sync", (p: any) => {
    if (p && p.src !== myRole) {
      dbGetTracks().then(t => {
        if (Array.isArray(t)) {
          tracks = t;
          render();
          renderPlaylistWindow();
        }
      });
    }
  });

  function addToCurrentPlaylist(list: Track[]) {
    const pl = currentPlaylist();
    if (!pl) return;
    let changed = false;
    const set = new Set(pl.tracks);
    for (const t of list) {
      if (!set.has(t.id)) {
        pl.tracks.push(t.id);
        set.add(t.id);
        changed = true;
      }
    }
    if (changed) {
      savePlaylists();
      broadcastPlaylists();
      renderPlaylistWindow();
      render();
    }
  }

  // Background Scanning logic with debouncing and memory safety
  let scanHideTimer: any = 0;
  let scanBatchQueue: Track[] = [];
  let scanUpdateTimer: any = 0;

  busOn("melo:scan-progress", (p: any) => {
    if (!p) return;
    if (libScanProgressWrap && libScanStatusText && libScanStatusPct && libScanProgressBar) {
      libScanProgressWrap.style.display = "flex";
      const done = p.done || 0;
      const total = p.total || 0;
      const pct = total ? Math.min(100, Math.round((done / total) * 100)) : 0;
      libScanStatusText.textContent = `Scanning: ${done.toLocaleString()} / ${total.toLocaleString()} files`;
      libScanStatusPct.textContent = `${pct}%`;
      libScanProgressBar.style.width = `${pct}%`;

      clearTimeout(scanHideTimer);
      if (p.finished || (total > 0 && done >= total)) {
        libScanStatusText.textContent = `Scan complete: ${total.toLocaleString()} tracks`;
        libScanStatusPct.textContent = "100%";
        libScanProgressBar.style.width = "100%";
        scanHideTimer = setTimeout(() => {
          if (libScanProgressWrap) libScanProgressWrap.style.display = "none";
        }, 2000);
      }
    }
  });

  busOn("melo:scan-batch", (batch: any) => {
    if (Array.isArray(batch) && batch.length) {
      for (const t of batch) {
        t.source = "scan";
        scanBatchQueue.push(t);
      }
      if (!scanUpdateTimer) {
        scanUpdateTimer = setTimeout(() => {
          scanUpdateTimer = 0;
          if (scanBatchQueue.length) {
            const incoming = scanBatchQueue;
            scanBatchQueue = [];
            const existingIds = new Set(tracks.map(x => x.id));
            let changed = false;
            for (const t of incoming) {
              if (!existingIds.has(t.id)) {
                tracks.push(t);
                existingIds.add(t.id);
                changed = true;
              }
            }
            if (changed) {
              const LT = tracks.filter(t => (t as any).source === "scan");
              const artistCount = new Set(LT.map(t => t.artist)).size;
              const albumCount = new Set(LT.map(t => t.artist + "\x00" + t.album)).size;
              if (libraryStats) {
                libraryStats.textContent = `${LT.length.toLocaleString()} tracks • ${artistCount.toLocaleString()} artists • ${albumCount.toLocaleString()} albums`;
              }
            }
          }
        }, 400);
      }
    }
  });

  btnScan?.addEventListener("click", async () => {
    if (isTauriEnv) {
      try {
        const { open } = await import("@tauri-apps/plugin-dialog");
        const selected = await open({ directory: true, multiple: false });
        if (selected) {
          toast("Scanning folder in the background…");
          if (libScanProgressWrap) libScanProgressWrap.style.display = "flex";
          const { invoke } = await import("@tauri-apps/api/core");
          const scanned: Track[] = await invoke("scan_library", { path: selected });
          if (Array.isArray(scanned)) {
            scanned.forEach(t => (t as any).source = "scan");
            addTracks(scanned, true);
            addToCurrentPlaylist(scanned);
            await dbSaveTracks(tracks);
            await dbSavePlaylists(playlists);
            busEmit("melo:tracks-sync", { src: myRole });
            render();
            renderPlaylistWindow();
            toast(`Library updated: ${scanned.length.toLocaleString()} tracks`);
          }
        }
      } catch (e) {
        toast("Scanning requires the Tauri build");
      }
    } else {
      const input = document.createElement("input");
      input.type = "file";
      input.multiple = true;
      input.accept = "audio/*";
      input.onchange = async () => {
        const files = Array.from(input.files || []);
        for (const file of files) {
          const url = URL.createObjectURL(file);
          const id = Math.random().toString(36).slice(2);
          const ext = file.name.split(".").pop()?.toUpperCase() || "MP3";
          const t: Track = {
            id,
            title: file.name.replace(/\.[^/.]+$/, ""),
            artist: "Unknown",
            album: "Imported",
            genre: "Unknown",
            year: new Date().getFullYear(),
            duration: 180,
            path: url,
            codec: ext,
            specs: "Imported · Stereo",
            replayGain: 0,
            source: "scan"
          } as any;
          await withCover(file, t as any);
          tracks.push(t);
        }
        await dbSaveTracks(tracks);
        toast(`${files.length} file(s) added`);
        render();
        renderQueue();
      };
      input.click();
    }
  });

  async function importPaths(paths: string[]): Promise<Track[]> {
    if (!isTauriEnv) return [];
    const { invoke } = await import("@tauri-apps/api/core");
    const out: Track[] = [];
    for (const p of paths) {
      try {
        const scanned: Track[] = await invoke("scan_library", { path: p });
        if (scanned) out.push(...scanned);
      } catch {}
    }
    return out;
  }

  if (isTauriEnv) {
    import("@tauri-apps/api/webviewWindow").then(({ getCurrentWebviewWindow }) => {
      const win = getCurrentWebviewWindow();
      win.onDragDropEvent(async (e: any) => {
        if (e.payload.type === "drop") {
          const paths: string[] = e.payload.paths || [];
          if (!paths.length) return;
          const list = await importPaths(paths);
          if (!list.length) return;
          list.forEach(t => (t as any).source = "import");
          addTracks(list, true);
          if (myRole === "playlist") {
            addToCurrentPlaylist(list);
            toast(`${list.length} track(s) added to playlist`);
          } else {
            replaceCurrentPlaylist(list);
            busEmit("melo:play-tracks", { tracks: list, index: 0 });
            toast(`Playing ${list[0]?.title || "track"}`);
          }
        }
      });
    }).catch(() => {});
  }

  function libraryTracks(): Track[] {
    return tracks.filter(t => (t as any).source === "scan");
  }

  // ==========================================
  // VIRTUAL SCROLLING ENGINE (Lightweight & 60FPS)
  // ==========================================
  const ROW_HEIGHT = 44;

  function renderVirtualList(
    container: HTMLElement,
    items: Track[],
    type: "library" | "playlist",
    onRowClick: (index: number, e: MouseEvent) => void
  ) {
    if (!items.length) {
      container.innerHTML = `<div style="padding:30px; text-align:center; color:var(--text-muted); font-size:12px;">No tracks found</div>`;
      return;
    }

    container.style.position = "relative";
    container.style.overflowY = "auto";

    const updateView = () => {
      const scrollTop = container.scrollTop;
      const clientHeight = container.clientHeight || 400;
      const totalItems = items.length;

      const startIndex = Math.max(0, Math.floor(scrollTop / ROW_HEIGHT) - 4);
      const endIndex = Math.min(totalItems, Math.ceil((scrollTop + clientHeight) / ROW_HEIGHT) + 4);

      const topPadding = startIndex * ROW_HEIGHT;
      const bottomPadding = Math.max(0, (totalItems - endIndex) * ROW_HEIGHT);

      const visibleSlice = items.slice(startIndex, endIndex);

      const rowsHtml = visibleSlice.map((t, idx) => {
        const i = startIndex + idx;
        const dur = fmtDur(t.duration || 0);
        const coverHtml = t.cover
          ? `<img class="track-cover-mini" src="${t.cover}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" /><div class="track-cover-fallback" style="display:none;"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg></div>`
          : `<div class="track-cover-fallback"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg></div>`;

        if (type === "library") {
          return `
          <div class="track-row" draggable="true" data-vidx="${i}" data-id="${esc(t.id)}" style="height:${ROW_HEIGHT}px; box-sizing:border-box;">
            <span class="num">${i + 1}</span>
            ${coverHtml}
            <div style="flex:1; min-width:0;">
              <div class="t-title">${esc(t.title)}</div>
              <div class="t-artist">${esc(t.artist)} • ${esc(t.album)}${t.year ? ' • ' + t.year : ''}</div>
            </div>
            <span style="font-size:10px; padding:2px 6px; border-radius:6px; background:var(--badge-bg); color:var(--badge-text); border:1px solid var(--card-border);">${esc(t.codec || "AUDIO")}</span>
            <span class="t-dur">${dur}</span>
            <button class="btn small ghost" data-action="add-queue" data-vidx="${i}">+</button>
          </div>`;
        } else {
          return `
          <div class="track-row" draggable="true" data-vidx="${i}" data-id="${esc(t.id)}" style="height:${ROW_HEIGHT}px; box-sizing:border-box;">
            <span class="num">${i + 1}</span>
            ${coverHtml}
            <div style="flex:1; min-width:0;">
              <div class="t-title">${esc(t.title)}</div>
              <div class="t-artist">${esc(t.artist)} • ${esc(t.album)}</div>
            </div>
            <span class="t-dur">${dur}</span>
            <button class="btn small ghost" data-action="pl-remove" data-vidx="${i}" title="Remove from playlist">×</button>
          </div>`;
        }
      }).join("");

      container.innerHTML = `
        <div class="vscroll-wrapper" style="padding-top:${topPadding}px; padding-bottom:${bottomPadding}px; display:flex; flex-direction:column;">
          ${rowsHtml}
        </div>
      `;
    };

    // Attach scroll listener once
    if (!(container as any).__vscrollAttached) {
      (container as any).__vscrollAttached = true;
      let rafId = 0;
      container.addEventListener("scroll", () => {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
          if ((container as any).__vscrollUpdate) {
            (container as any).__vscrollUpdate();
          }
        });
      });

      // Context menu for track rows
      container.addEventListener("contextmenu", (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const row = target.closest(".track-row") as HTMLElement | null;
        if (!row) return;
        e.preventDefault();
        e.stopPropagation();
        const vidx = parseInt(row.dataset.vidx || "0", 10);
        const currentList = (container as any).__vscrollItems || [];
        ctxTrack = currentList[vidx] || null;
        if (!ctxTrack) return;
        ctxMenu.innerHTML = `
          <button class="ctx-item" data-act="edit" style="width:100%; text-align:left; background:transparent; border:none; color:var(--text, #fff); padding:6px 12px; font-size:11px; cursor:pointer; display:flex; align-items:center; gap:8px;">✏️ Edit Metadata</button>
          <button class="ctx-item" data-act="add-pl" style="width:100%; text-align:left; background:transparent; border:none; color:var(--text, #fff); padding:6px 12px; font-size:11px; cursor:pointer; display:flex; align-items:center; gap:8px;">➕ Add to Playlist</button>
          <button class="ctx-item" data-act="remove" style="width:100%; text-align:left; background:transparent; border:none; color:#ff5c5c; padding:6px 12px; font-size:11px; cursor:pointer; display:flex; align-items:center; gap:8px;">🗑️ Remove</button>
        `;
        ctxMenu.style.left = `${Math.min(window.innerWidth - 160, e.clientX)}px`;
        ctxMenu.style.top = `${Math.min(window.innerHeight - 130, e.clientY)}px`;
        ctxMenu.style.display = "block";
      });

      // Event delegation for clicks & buttons
      container.addEventListener("click", (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const row = target.closest(".track-row") as HTMLElement | null;
        if (!row) return;
        const vidx = parseInt(row.dataset.vidx || "0", 10);
        if (target.closest("[data-action='add-queue']")) {
          e.stopPropagation();
          const currentList = (container as any).__vscrollItems || [];
          if (currentList[vidx]) addToQueue(currentList[vidx]);
          return;
        }
        if (target.closest("[data-action='pl-remove']")) {
          e.stopPropagation();
          const pl = currentPlaylist();
          if (pl) {
            const currentList = (container as any).__vscrollItems || [];
            const trackToRemove = currentList[vidx];
            if (trackToRemove) {
              const idxInPl = pl.tracks.indexOf(trackToRemove.id);
              if (idxInPl >= 0) {
                pl.tracks.splice(idxInPl, 1);
                savePlaylists();
                renderPlaylistWindow();
                toast("Removed from playlist");
              }
            }
          }
          return;
        }
        onRowClick(vidx, e);
      });
    }

    (container as any).__vscrollItems = items;
    (container as any).__vscrollUpdate = updateView;
    updateView();
  }

  // ==========================================
  // PLAYLIST WINDOW RENDERING
  // ==========================================
  function renderPlaylistWindow() {
    if (!winPlaylistTracks) return;

    const pl = currentPlaylist();
    if (playlistSelect) {
      playlistSelect.innerHTML = playlists.map(p => `<option value="${p.id}" ${pl && p.id === pl.id ? "selected" : ""}>${esc(p.name)}</option>`).join("");
    }
    if (!pl) {
      winPlaylistTracks.innerHTML = "";
      winPlaylistTracks.style.display = "none";
      if (winPlaylistEmpty) winPlaylistEmpty.style.display = "block";
      return;
    }

    const trackMap = new Map<string, Track>();
    for (const t of tracks) {
      trackMap.set(t.id, t);
      trackMap.set(t.path, t);
    }

    let allList: Track[] = pl.tracks.map((tid, idx) => {
      const found = trackMap.get(tid);
      if (found) return found;
      const leaf = tid.replace(/^.*[\\/]/, "");
      const dot = leaf.lastIndexOf(".");
      const stem = dot > 0 ? leaf.slice(0, dot) : leaf;
      return {
        id: tid,
        title: stem || `Track ${idx + 1}`,
        artist: "Audio Track",
        album: pl.name,
        duration: 0,
        path: tid,
        codec: "AUDIO",
        specs: "Local File",
        source: "import"
      } as Track;
    });

    if (playlistSearchQuery.trim()) {
      const q = playlistSearchQuery.toLowerCase().trim();
      allList = allList.filter(t => (t.title || "").toLowerCase().includes(q) || (t.artist || "").toLowerCase().includes(q) || (t.album || "").toLowerCase().includes(q));
    }

    if (playlistSortMode === "title-asc") allList.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
    else if (playlistSortMode === "artist-asc") allList.sort((a, b) => (a.artist || "").localeCompare(b.artist || ""));
    else if (playlistSortMode === "album-asc") allList.sort((a, b) => (a.album || "").localeCompare(b.album || ""));
    else if (playlistSortMode === "dur-asc") allList.sort((a, b) => (a.duration || 0) - (b.duration || 0));
    else if (playlistSortMode === "dur-desc") allList.sort((a, b) => (b.duration || 0) - (a.duration || 0));

    if (winPlaylistEmpty) winPlaylistEmpty.style.display = allList.length ? "none" : "block";
    winPlaylistTracks.style.display = allList.length ? "flex" : "none";

    renderVirtualList(winPlaylistTracks, allList, "playlist", (vidx) => {
      const t = allList[vidx];
      if (t) {
        busEmit("melo:play-tracks", { tracks: allList, index: vidx, fromPlaylist: true });
      }
    });
  }

  // ==========================================
  // MAIN LIBRARY RENDERING
  // ==========================================
  function render() {
    if (!trackListEl) {
      renderPlaylistWindow();
      return;
    }

    const LT = libraryTracks();
    const artistCount = new Set(LT.map(t => t.artist)).size;
    const albumCount = new Set(LT.map(t => t.artist + "\x00" + t.album)).size;
    if (libraryStats) {
      libraryStats.textContent = `${LT.length.toLocaleString()} tracks • ${artistCount.toLocaleString()} artists • ${albumCount.toLocaleString()} albums`;
    }

    const q = search.trim().toLowerCase();

    if (libTab === "artists") {
      if (!selArtist) {
        viewList = [];
        const names = [...new Set(LT.map(t => t.artist))].sort((a, b) => a.localeCompare(b));
        const shown = q ? names.filter(n => n.toLowerCase().includes(q)) : names;
        trackListEl.innerHTML = shown.map(n => {
          const c = LT.filter(t => t.artist === n).length;
          return `<div class="lib-item" data-artist="${esc(n)}"><div class="lib-avatar">${esc((n[0] || "?").toUpperCase())}</div><div style="flex:1;min-width:0;"><div class="t-title">${esc(n)}</div><div class="t-artist">${c} track(s)</div></div><span class="chev-r">›</span></div>`;
        }).join("") || `<div style="padding:30px;text-align:center;color:var(--text-muted);">No artists found.</div>`;

        trackListEl.querySelectorAll("[data-artist]").forEach(el => {
          el.addEventListener("click", () => {
            selArtist = (el as HTMLElement).dataset.artist!;
            selAlbum = null;
            render();
          });
        });
      } else {
        const artistTracks = LT.filter(t => t.artist === selArtist);
        const albums = [...new Set(artistTracks.map(t => t.album))].sort((a, b) => a.localeCompare(b));
        if (!selAlbum) {
          viewList = artistTracks;
          let html = `
            <div class="breadcrumb">
              <span class="crumb-link" id="crumbBackArtists">‹ All Artists</span>
              <span class="crumb-sep">/</span>
              <span class="crumb-cur">${esc(selArtist)}</span>
              <button class="btn small primary play-all-btn" id="btnPlayArtistAll">▶ Play All (${artistTracks.length})</button>
            </div>
          `;
          html += albums.map(alb => {
            const albTracks = artistTracks.filter(t => t.album === alb);
            return `<div class="lib-item" data-album="${esc(alb)}"><div class="lib-avatar alb">💿</div><div style="flex:1;min-width:0;"><div class="t-title">${esc(alb)}</div><div class="t-artist">${albTracks.length} track(s)${albTracks[0]?.year ? ' • ' + albTracks[0].year : ''}</div></div><span class="chev-r">›</span></div>`;
          }).join("");

          trackListEl.innerHTML = html;
          document.getElementById("crumbBackArtists")?.addEventListener("click", () => { selArtist = null; render(); });
          document.getElementById("btnPlayArtistAll")?.addEventListener("click", () => {
            busEmit("melo:play-tracks", { tracks: artistTracks, index: 0 });
          });
          trackListEl.querySelectorAll("[data-album]").forEach(el => {
            el.addEventListener("click", () => {
              selAlbum = (el as HTMLElement).dataset.album!;
              render();
            });
          });
        } else {
          const albTracks = artistTracks.filter(t => t.album === selAlbum);
          viewList = albTracks;
          trackListEl.innerHTML = `
            <div class="breadcrumb">
              <span class="crumb-link" id="crumbBackArtist">‹ ${esc(selArtist)}</span>
              <span class="crumb-sep">/</span>
              <span class="crumb-cur">${esc(selAlbum)}</span>
              <button class="btn small primary play-all-btn" id="btnPlayAlbAll">▶ Play Album (${albTracks.length})</button>
            </div>
            <div id="innerVirtualTrackList" style="flex:1; overflow-y:auto;"></div>
          `;
          document.getElementById("crumbBackArtist")?.addEventListener("click", () => { selAlbum = null; render(); });
          document.getElementById("btnPlayAlbAll")?.addEventListener("click", () => {
            busEmit("melo:play-tracks", { tracks: albTracks, index: 0 });
          });
          const innerListEl = document.getElementById("innerVirtualTrackList");
          if (innerListEl) {
            renderVirtualList(innerListEl, albTracks, "library", (vidx) => {
              busEmit("melo:play-tracks", { tracks: albTracks, index: vidx });
            });
          }
        }
      }
    } else if (libTab === "albums") {
      if (!selAlbumKey) {
        viewList = [];
        const albumMap = new Map<string, { artist: string; album: string; count: number; year: number }>();
        LT.forEach(t => {
          const k = t.artist + "\x00" + t.album;
          if (!albumMap.has(k)) {
            albumMap.set(k, { artist: t.artist, album: t.album, count: 1, year: t.year || 0 });
          } else {
            albumMap.get(k)!.count++;
          }
        });
        const list = Array.from(albumMap.values()).sort((a, b) => a.album.localeCompare(b.album));
        const shown = q ? list.filter(x => x.album.toLowerCase().includes(q) || x.artist.toLowerCase().includes(q)) : list;
        trackListEl.innerHTML = shown.map(x => `
          <div class="lib-item" data-albkey="${esc(x.artist + '\x00' + x.album)}">
            <div class="lib-avatar alb">💿</div>
            <div style="flex:1;min-width:0;">
              <div class="t-title">${esc(x.album)}</div>
              <div class="t-artist">${esc(x.artist)} • ${x.count} track(s)${x.year ? ' • ' + x.year : ''}</div>
            </div>
            <span class="chev-r">›</span>
          </div>
        `).join("") || `<div style="padding:30px;text-align:center;color:var(--text-muted);">No albums found.</div>`;

        trackListEl.querySelectorAll("[data-albkey]").forEach(el => {
          el.addEventListener("click", () => {
            selAlbumKey = (el as HTMLElement).dataset.albkey!;
            render();
          });
        });
      } else {
        const [a, alb] = selAlbumKey.split("\x00");
        const albTracks = LT.filter(t => t.artist === a && t.album === alb);
        viewList = albTracks;
        trackListEl.innerHTML = `
          <div class="breadcrumb">
            <span class="crumb-link" id="crumbBackAlbums">‹ All Albums</span>
            <span class="crumb-sep">/</span>
            <span class="crumb-cur">${esc(alb)}</span>
            <button class="btn small primary play-all-btn" id="btnPlayAlbumKey">▶ Play (${albTracks.length})</button>
          </div>
          <div id="innerVirtualTrackList" style="flex:1; overflow-y:auto;"></div>
        `;
        document.getElementById("crumbBackAlbums")?.addEventListener("click", () => { selAlbumKey = null; render(); });
        document.getElementById("btnPlayAlbumKey")?.addEventListener("click", () => {
          busEmit("melo:play-tracks", { tracks: albTracks, index: 0 });
        });
        const innerListEl = document.getElementById("innerVirtualTrackList");
        if (innerListEl) {
          renderVirtualList(innerListEl, albTracks, "library", (vidx) => {
            busEmit("melo:play-tracks", { tracks: albTracks, index: vidx });
          });
        }
      }
    } else if (libTab === "genres") {
      if (!selGenre) {
        viewList = [];
        const names = [...new Set(LT.map(t => t.genre || "Unknown"))].sort((a, b) => a.localeCompare(b));
        const shown = q ? names.filter(n => n.toLowerCase().includes(q)) : names;
        trackListEl.innerHTML = shown.map(g => {
          const c = LT.filter(t => (t.genre || "Unknown") === g).length;
          return `<div class="lib-item" data-genre="${esc(g)}"><div class="lib-avatar gen">🏷️</div><div style="flex:1;min-width:0;"><div class="t-title">${esc(g)}</div><div class="t-artist">${c} track(s)</div></div><span class="chev-r">›</span></div>`;
        }).join("") || `<div style="padding:30px;text-align:center;color:var(--text-muted);">No genres found.</div>`;

        trackListEl.querySelectorAll("[data-genre]").forEach(el => {
          el.addEventListener("click", () => {
            selGenre = (el as HTMLElement).dataset.genre!;
            render();
          });
        });
      } else {
        const genreTracks = LT.filter(t => (t.genre || "Unknown") === selGenre);
        viewList = genreTracks;
        trackListEl.innerHTML = `
          <div class="breadcrumb">
            <span class="crumb-link" id="crumbBackGenres">‹ All Genres</span>
            <span class="crumb-sep">/</span>
            <span class="crumb-cur">${esc(selGenre)}</span>
            <button class="btn small primary play-all-btn" id="btnPlayGenreAll">▶ Play (${genreTracks.length})</button>
          </div>
          <div id="innerVirtualTrackList" style="flex:1; overflow-y:auto;"></div>
        `;
        document.getElementById("crumbBackGenres")?.addEventListener("click", () => { selGenre = null; render(); });
        document.getElementById("btnPlayGenreAll")?.addEventListener("click", () => {
          busEmit("melo:play-tracks", { tracks: genreTracks, index: 0 });
        });
        const innerListEl = document.getElementById("innerVirtualTrackList");
        if (innerListEl) {
          renderVirtualList(innerListEl, genreTracks, "library", (vidx) => {
            busEmit("melo:play-tracks", { tracks: genreTracks, index: vidx });
          });
        }
      }
    }

    renderPlaylistWindow();
  }

  function addToQueue(t: Track) {
    busEmit("melo:add-queue", t);
    toast(`Queued: ${t.title}`);
  }

  function renderQueue() {
    if (!queueListEl) return;
    const lumi = (window as any).LumiPlayer;
    const q: Track[] = lumi?.queue || tracks.slice(0, 4);
    if (!q.length) {
      queueListEl.innerHTML = `<div style="text-align:center;color:var(--text-muted);font-size:12px;padding:12px;">Queue is empty</div>`;
      return;
    }
    queueListEl.innerHTML = q.map((t, i) => `
      <div class="track-row" data-id="${t.id}" data-queue-idx="${i}" style="padding:6px 8px;border-radius:8px;border:1px solid ${i === (lumi?.currentIndex ?? 0) ? 'var(--accent)' : 'transparent'};">
        <img class="track-cover-mini" src="${t.cover || ''}" style="width:24px;height:24px;${t.cover ? '' : 'display:none'}" />
        <div style="flex:1;min-width:0;">
          <div class="t-title" style="font-size:11.5px;">${esc(t.title)}</div>
          <div class="t-artist" style="font-size:10px;">${esc(t.artist)}</div>
        </div>
      </div>
    `).join("");
  }

  // Playlist management
  btnNewPlaylist?.addEventListener("click", () => {
    const name = prompt("New playlist name:");
    if (!name) return;
    const newPl: Playlist = {
      id: "pl_" + Math.random().toString(36).slice(2, 9),
      name: name.trim(),
      tracks: [],
      createdAt: Date.now()
    };
    playlists.push(newPl);
    savePlaylists();
    setCurrentPlaylist(newPl.id);
    toast(`Playlist "${newPl.name}" created`);
  });

  if (playlistSelect) {
    playlistSelect.addEventListener("change", () => {
      setCurrentPlaylist(playlistSelect.value);
    });
  }

  btnExport?.addEventListener("click", () => {
    const pl = currentPlaylist();
    if (!pl || !pl.tracks.length) return toast("Current playlist is empty");
    const m3uContent = ["#EXTM3U", ...pl.tracks.map(tid => {
      const found = tracks.find(x => x.id === tid);
      return found ? found.path : tid;
    })].join("\n");

    const blob = new Blob([m3uContent], { type: "audio/x-mpegurl" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${pl.name || "playlist"}.m3u`;
    a.click();
    URL.revokeObjectURL(url);
    toast("M3U Playlist exported");
  });

  // Metadata Tag Editor
  let editingTrack: Track | null = null;

  function openTagEditor(track: Track | null) {
    editingTrack = track;
    if (!editingTrack || !tagEditor) return toast("No track to edit");
    tagEditor.style.display = "flex";
    if (tagTitle) tagTitle.value = editingTrack.title || "";
    if (tagArtist) tagArtist.value = editingTrack.artist || "";
    if (tagAlbum) tagAlbum.value = editingTrack.album || "";
    if (tagYear) tagYear.value = String(editingTrack.year || "");
  }

  document.getElementById("btn-tag-cancel")?.addEventListener("click", () => {
    if (tagEditor) tagEditor.style.display = "none";
  });
  document.getElementById("btn-tag-save")?.addEventListener("click", async () => {
    const cur = editingTrack;
    if (!cur || !tagEditor) return;
    cur.title = tagTitle?.value.trim() || cur.title;
    cur.artist = tagArtist?.value.trim() || cur.artist;
    cur.album = tagAlbum?.value.trim() || cur.album;
    cur.year = parseInt(tagYear?.value || "0", 10) || 0;

    if (isTauriEnv && cur.path) {
      try {
        const { invoke } = await import("@tauri-apps/api/core");
        await invoke("write_tags", {
          path: cur.path,
          tags: { title: cur.title, artist: cur.artist, album: cur.album }
        });
      } catch {}
    }

    tagEditor.style.display = "none";
    await dbSaveTracks(tracks);
    render();
    renderPlaylistWindow();
    busEmit("melo:tag-updated", cur);
    toast("Metadata saved");
  });

  // Clear Library database button
  document.getElementById("btn-clear-library")?.addEventListener("click", async () => {
    if (confirm("Are you sure you want to clear the entire library database? This cannot be undone.")) {
      tracks = [];
      playlists.forEach(p => p.tracks = []);
      await dbSaveTracks([]);
      await dbSavePlaylists(playlists);
      busEmit("melo:tracks-sync", { src: myRole });
      busEmit("melo:playlists-sync", { src: myRole, playlists });
      render();
      renderPlaylistWindow();
      renderQueue();
      toast("Library database cleared");
    }
  });

  // Expose to window
  (window as any).LumiLibrary = {
    get tracks() { return tracks; },
    get playlists() { return playlists; },
    render,
    addTracks,
    replaceCurrentPlaylist,
    addToCurrentPlaylist,
    importPaths,
    currentPlaylistName: () => currentPlaylist()?.name || "Playlist"
  };
}
