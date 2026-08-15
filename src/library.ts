import type { Track } from "./types";
import { busEmit, busOn, isTauri } from "./bus";

const role = new URLSearchParams(location.search).get("panel") || "main";

type Page<T> = { items: T[]; total: number; limit: number; offset: number };
type GroupRow = { key: string; name: string; subtitle: string; count: number; cover?: string; artworkTrackId?: string };
type PlaylistRow = { id: string; name: string; createdAt: number; trackCount: number };
type Stats = { tracks: number; artists: number; albums: number; genres: number };

const esc = (value: unknown) => String(value ?? "")
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;");

function fmtDur(seconds: number) {
  const s = Number.isFinite(seconds) ? Math.max(0, seconds) : 0;
  return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
}

export function setupLibrary(_audio: HTMLAudioElement, toast: (message: string) => void) {
  const trackList = document.getElementById("trackList") as HTMLElement | null;
  const libraryStats = document.getElementById("libraryStats") as HTMLElement | null;
  const searchInput = document.getElementById("searchInput") as HTMLInputElement | null;
  const tabs = document.getElementById("libraryTabs");
  const scanButton = document.getElementById("btn-scan") as HTMLButtonElement | null;
  const clearLibraryButton = document.getElementById("btn-clear-library") as HTMLButtonElement | null;

  const playlistList = document.getElementById("winPlaylistTracks") as HTMLElement | null;
  const playlistEmpty = document.getElementById("winPlaylistEmpty") as HTMLElement | null;
  const playlistSelect = document.getElementById("playlistSelect") as HTMLSelectElement | null;
  const playlistSearch = document.getElementById("playlistSearchInput") as HTMLInputElement | null;
  const playlistSort = document.getElementById("playlistSortSelect") as HTMLSelectElement | null;
  const clearPlaylistButton = document.getElementById("btn-clear-playlist") as HTMLButtonElement | null;
  const exportButton = document.getElementById("btn-export-playlist") as HTMLButtonElement | null;
  const newPlaylistButton = document.getElementById("btn-new-playlist") as HTMLButtonElement | null;

  let invoke: (<T>(command: string, args?: Record<string, unknown>) => Promise<T>) | null = null;
  let toAsset: ((path: string) => string) | null = null;
  let initialized = false;
  let currentPlaylistId = localStorage.getItem("melo-currentPlaylist") || "p1";
  let playlists: PlaylistRow[] = [];
  let activeScanId: string | null = null;
  let ownedScanId: string | null = null;
  let replacePlaylistAfterScan = false;
  let recentTracks: Track[] = [];

  let libTab: "artists" | "albums" | "genres" = "artists";
  let selectedArtist: string | null = null;
  let selectedAlbum: string | null = null;
  let selectedGenre: string | null = null;
  let librarySearch = "";

  const libraryRowHeight = 54;
  const playlistRowHeight = 52;
  let libraryRequest = 0;
  let playlistRequest = 0;
  let libraryScrollTimer = 0;
  let playlistScrollTimer = 0;
  let contextTrackId: string | null = null;
  const libraryContextMenu = document.createElement("div");
  libraryContextMenu.className = "ctx-menu";
  libraryContextMenu.style.display = "none";
  libraryContextMenu.innerHTML = `<button class="ctx-item danger" id="ctxRemoveLibraryTrack">Remove from Library</button>`;
  document.body.appendChild(libraryContextMenu);
  document.addEventListener("click", event => {
    if (!(event.target as HTMLElement).closest("#ctxRemoveLibraryTrack")) libraryContextMenu.style.display = "none";
  });
  libraryContextMenu.querySelector<HTMLElement>("#ctxRemoveLibraryTrack")!.onclick = async event => {
    event.stopPropagation();
    if (!invoke || !contextTrackId) return;
    await invoke("delete_tracks", { ids: [contextTrackId] });
    libraryContextMenu.style.display = "none";
    contextTrackId = null;
    busEmit("melo:library-changed", { removed: 1 });
  };

  function confirmLibraryClear(): Promise<boolean> {
    return new Promise(resolve => {
      const overlay = document.createElement("div");
      overlay.className = "confirm-overlay";
      overlay.innerHTML = `<div class="confirm-dialog" role="dialog" aria-modal="true" aria-labelledby="clearLibraryTitle">
        <div id="clearLibraryTitle" class="confirm-title">Clear Library?</div>
        <div class="confirm-message">All tracks will be removed from Library browsing. Your playlists and their tracks will remain unchanged.</div>
        <div class="confirm-actions"><button class="btn small" data-confirm="cancel">Cancel</button><button class="btn small danger-confirm" data-confirm="yes">Clear Library</button></div>
      </div>`;
      document.body.appendChild(overlay);
      const finish = (answer: boolean) => { document.removeEventListener("keydown", onKey); overlay.remove(); resolve(answer); };
      overlay.querySelector<HTMLElement>("[data-confirm='cancel']")!.onclick = () => finish(false);
      overlay.querySelector<HTMLElement>("[data-confirm='yes']")!.onclick = () => finish(true);
      overlay.onclick = event => { if (event.target === overlay) finish(false); };
      const onKey = (event: KeyboardEvent) => {
        if (event.key === "Escape") { document.removeEventListener("keydown", onKey); finish(false); }
      };
      document.addEventListener("keydown", onKey);
    });
  }

  function setScanLabel(text: string) {
    const label = scanButton?.querySelector<HTMLElement>(".scan-label");
    if (label) label.textContent = text;
  }

  function artworkUrl(path?: string): string {
    if (!path) return "";
    if (/^(data:|blob:|https?:)/i.test(path)) return path;
    try { return toAsset ? toAsset(path) : ""; } catch { return ""; }
  }

  function normalizeTrack(track: Track): Track {
    return { ...track, cover: artworkUrl(track.cover), source: "scan" };
  }

  const artworkQueue: Array<{ id: string; element: HTMLElement }> = [];
  const artworkPending = new Set<string>();
  let artworkWorkers = 0;
  function enqueueArtwork(id: string | undefined, element: HTMLElement) {
    if (!id || !invoke || artworkPending.has(id)) return;
    artworkPending.add(id);
    artworkQueue.push({ id, element });
    pumpArtworkQueue();
  }
  function pumpArtworkQueue() {
    while (invoke && artworkWorkers < 2 && artworkQueue.length) {
      const item = artworkQueue.shift()!;
      artworkWorkers++;
      invoke<string | null>("ensure_track_artwork", { id: item.id })
        .then(path => {
          if (!path || !item.element.isConnected) return;
          const url = artworkUrl(path);
          const track = recentTracks.find(t => t.id === item.id);
          if (track) track.cover = url;
          item.element.style.backgroundImage = `url("${url.replace(/"/g, "%22")}")`;
          item.element.textContent = "";
        })
        .catch(() => {})
        .finally(() => {
          artworkWorkers--;
          artworkPending.delete(item.id);
          pumpArtworkQueue();
        });
    }
  }
  function bindLazyArtwork(root: HTMLElement) {
    const elements = [...root.querySelectorAll<HTMLElement>("[data-artwork-id]")];
    if (!("IntersectionObserver" in window)) {
      elements.forEach(el => enqueueArtwork(el.dataset.artworkId, el));
      return;
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target as HTMLElement;
        observer.unobserve(el);
        enqueueArtwork(el.dataset.artworkId, el);
      });
    }, { root, rootMargin: "120px" });
    elements.forEach(el => observer.observe(el));
  }

  async function loadCore() {
    if (initialized) return;
    if (!isTauri) {
      initialized = true;
      renderBrowserEmpty();
      return;
    }
    const core = await import("@tauri-apps/api/core");
    invoke = core.invoke as typeof invoke;
    toAsset = core.convertFileSrc;
    initialized = true;
    await Promise.all([refreshStats(), refreshPlaylists()]);
    await renderLibraryVirtual(true);
    await renderPlaylistVirtual(true);
  }

  function renderBrowserEmpty() {
    if (trackList) trackList.innerHTML = `<div style="padding:30px;text-align:center;color:var(--text-muted)">The persistent Library is available in the Tauri desktop build.</div>`;
  }

  async function refreshStats() {
    if (!invoke || !libraryStats) return;
    try {
      const stats = await invoke<Stats>("library_stats");
      libraryStats.textContent = `${stats.tracks} tracks • ${stats.artists} artists • ${stats.albums} albums`;
    } catch {}
  }

  function resetLibrarySelection() {
    selectedArtist = selectedAlbum = selectedGenre = null;
    if (trackList) trackList.scrollTop = 0;
  }

  function libraryMode(): "groups" | "tracks" {
    if (libTab === "artists") return selectedArtist && selectedAlbum ? "tracks" : "groups";
    if (libTab === "albums") return selectedAlbum ? "tracks" : "groups";
    return selectedGenre ? "tracks" : "groups";
  }

  function libraryGroupKind(): "artists" | "albums" | "genres" {
    if (libTab === "artists" && selectedArtist) return "albums";
    return libTab;
  }

  function libraryCrumb(): string {
    if (libTab === "artists" && selectedArtist) {
      return selectedAlbum ? `${selectedArtist} › ${selectedAlbum === "__ALL__" ? "All tracks" : selectedAlbum}` : selectedArtist;
    }
    if (libTab === "albums" && selectedAlbum) return selectedAlbum;
    if (libTab === "genres" && selectedGenre) return selectedGenre;
    return "";
  }

  async function fetchLibraryPage(offset: number, limit: number): Promise<Page<GroupRow | Track>> {
    if (!invoke) return { items: [], total: 0, limit, offset };
    if (libraryMode() === "groups") {
      return invoke<Page<GroupRow>>("library_groups", {
        kind: libraryGroupKind(),
        search: librarySearch || null,
        artist: libTab === "artists" ? selectedArtist : null,
        limit,
        offset,
      });
    }
    const page = await invoke<Page<Track>>("library_tracks", {
      search: librarySearch || null,
      artist: selectedArtist,
      album: selectedAlbum === "__ALL__" ? null : selectedAlbum,
      genre: selectedGenre,
      sort: "title-asc",
      limit,
      offset,
    });
    page.items = page.items.map(normalizeTrack);
    recentTracks = page.items;
    return page;
  }

  async function renderLibraryVirtual(reset = false) {
    if (!trackList || !invoke) return;
    if (reset) trackList.scrollTop = 0;
    trackList.style.display = "block";
    trackList.style.position = "relative";
    trackList.style.overflowY = "auto";
    const viewport = Math.max(300, trackList.clientHeight || 420);
    const visible = Math.ceil(viewport / libraryRowHeight);
    const start = Math.max(0, Math.floor(trackList.scrollTop / libraryRowHeight) - 8);
    const limit = Math.max(40, visible + 16);
    const request = ++libraryRequest;
    try {
      const page = await fetchLibraryPage(start, limit);
      if (request !== libraryRequest) return;
      const crumb = libraryCrumb();
      const crumbHeight = crumb ? 38 : 0;
      const totalHeight = page.total * libraryRowHeight + crumbHeight;
      const rows = page.items.map((item, index) => {
        const absoluteIndex = page.offset + index;
        const top = crumbHeight + absoluteIndex * libraryRowHeight;
        if (libraryMode() === "groups") {
          const group = item as GroupRow;
          const cover = artworkUrl(group.cover);
          const avatarClass = `lib-avatar ${libraryGroupKind() === "albums" ? "lib-avatar-album" : ""}`;
          const fallback = libraryGroupKind() === "albums" ? "💿" : esc((group.name[0] || "?").toUpperCase());
          const avatar = cover
            ? `<div class="${avatarClass}" style="background-image:url('${esc(cover)}')"></div>`
            : `<div class="${avatarClass}" data-artwork-id="${esc(group.artworkTrackId || "")}">${fallback}</div>`;
          return `<div class="lib-item virtual-row" data-group-index="${index}" style="position:absolute;left:0;right:0;top:${top}px;height:${libraryRowHeight}px">${avatar}<div style="flex:1;min-width:0"><div class="t-title">${esc(group.name)}</div><div class="t-artist">${esc(group.subtitle || `${group.count} tracks`)}</div></div><span class="chev-r">›</span></div>`;
        }
        const track = item as Track;
        return `<div class="track-row virtual-row" data-track-id="${esc(track.id)}" data-page-index="${index}" style="position:absolute;left:0;right:0;top:${top}px;height:${libraryRowHeight}px">
          <span class="num">${absoluteIndex + 1}</span>
          ${track.cover ? `<div class="track-cover-mini" style="background-image:url('${esc(track.cover)}');background-size:cover;background-position:center"></div>` : `<div class="track-cover-mini cover-default" data-artwork-id="${esc(track.id)}">♪</div>`}
          <div style="flex:1;min-width:0"><div class="t-title">${esc(track.title)}</div><div class="t-artist">${esc(track.artist)} • ${esc(track.album)}</div></div>
          <span class="t-dur">${fmtDur(track.duration)}</span>
          <button class="btn small ghost" data-add-track="${esc(track.id)}" title="Add to current playlist">+</button>
        </div>`;
      }).join("");
      const crumbHtml = crumb
        ? `<div class="lib-crumb virtual-crumb" style="position:sticky;top:0;height:${crumbHeight}px;z-index:3;background:var(--card)"><button class="btn small" id="virtualBack">‹ Back</button><b>${esc(crumb)}</b>${libTab === "artists" && selectedArtist && !selectedAlbum ? `<button class="btn small" id="virtualAllTracks">All tracks</button>` : ""}</div>`
        : "";
      trackList.innerHTML = `<div class="virtual-list-space" style="position:relative;height:${Math.max(totalHeight, viewport)}px">${crumbHtml}${rows}</div>`;
      bindLibraryRows(page.items);
      bindLazyArtwork(trackList);
    } catch (error) {
      trackList.innerHTML = `<div style="padding:24px;text-align:center;color:var(--text-muted)">Could not read the Library database.</div>`;
    }
  }

  function bindLibraryRows(items: Array<GroupRow | Track>) {
    if (!trackList) return;
    trackList.querySelectorAll<HTMLElement>("[data-group-index]").forEach(row => {
      row.onclick = () => {
        const group = items[Number(row.dataset.groupIndex || 0)] as GroupRow;
        const name = group?.name || "";
        const key = group?.key || name;
        if (libTab === "artists" && !selectedArtist) selectedArtist = name;
        else if ((libTab === "artists" && selectedArtist) || libTab === "albums") {
          const parts = key.split("\0");
          if (libTab === "albums") selectedArtist = parts[0] || null;
          selectedAlbum = parts[1] || name;
        } else if (libTab === "genres") selectedGenre = name;
        renderLibraryVirtual(true);
      };
    });
    trackList.querySelectorAll<HTMLElement>("[data-add-track]").forEach(button => {
      button.onclick = async event => {
        event.stopPropagation();
        if (!invoke || !button.dataset.addTrack) return;
        await invoke("add_tracks_to_playlist", { playlistId: currentPlaylistId, trackIds: [button.dataset.addTrack] });
        busEmit("melo:playlist-changed", { playlistId: currentPlaylistId });
      };
    });
    trackList.querySelectorAll<HTMLElement>("[data-track-id]").forEach(row => {
      row.onclick = async event => {
        if ((event.target as HTMLElement).closest("[data-add-track]")) return;
        const index = Number(row.dataset.pageIndex || 0);
        const list = items.filter((x): x is Track => "path" in x).map(normalizeTrack);
        if (invoke && list.length) {
          await invoke("replace_playlist_tracks", { playlistId: currentPlaylistId, trackIds: list.map(t => t.id) });
          busEmit("melo:playlist-changed", { playlistId: currentPlaylistId });
        }
        busEmit("melo:play-tracks", { tracks: list, index });
      };
      row.oncontextmenu = event => {
        event.preventDefault();
        event.stopPropagation();
        contextTrackId = row.dataset.trackId || null;
        libraryContextMenu.style.display = "block";
        const rect = libraryContextMenu.getBoundingClientRect();
        libraryContextMenu.style.left = `${Math.max(6, Math.min(event.clientX, window.innerWidth - rect.width - 6))}px`;
        libraryContextMenu.style.top = `${Math.max(6, Math.min(event.clientY, window.innerHeight - rect.height - 6))}px`;
      };
    });
    trackList.querySelector<HTMLElement>("#virtualBack")?.addEventListener("click", () => {
      if (selectedAlbum) selectedAlbum = null;
      else if (selectedArtist) selectedArtist = null;
      else selectedGenre = null;
      renderLibraryVirtual(true);
    });
    trackList.querySelector<HTMLElement>("#virtualAllTracks")?.addEventListener("click", () => {
      selectedAlbum = "__ALL__";
      renderLibraryVirtual(true);
    });
  }

  async function refreshPlaylists() {
    if (!invoke) return;
    playlists = await invoke<PlaylistRow[]>("list_playlists");
    if (!playlists.some(p => p.id === currentPlaylistId)) currentPlaylistId = playlists[0]?.id || "p1";
    localStorage.setItem("melo-currentPlaylist", currentPlaylistId);
    if (playlistSelect) {
      playlistSelect.innerHTML = playlists.map(p => `<option value="${esc(p.id)}" ${p.id === currentPlaylistId ? "selected" : ""}>${esc(p.name)} (${p.trackCount})</option>`).join("");
    }
  }

  async function renderPlaylistVirtual(reset = false) {
    if (!playlistList || !invoke) return;
    if (reset) playlistList.scrollTop = 0;
    playlistList.style.display = "block";
    playlistList.style.position = "relative";
    playlistList.style.overflowY = "auto";
    const viewport = Math.max(260, playlistList.clientHeight || 420);
    const start = Math.max(0, Math.floor(playlistList.scrollTop / playlistRowHeight) - 8);
    const limit = Math.max(40, Math.ceil(viewport / playlistRowHeight) + 16);
    const request = ++playlistRequest;
    const page = await invoke<Page<Track>>("playlist_tracks", {
      playlistId: currentPlaylistId,
      search: playlistSearch?.value || null,
      sort: playlistSort?.value || "default",
      limit,
      offset: start,
    });
    if (request !== playlistRequest) return;
    page.items = page.items.map(normalizeTrack);
    recentTracks = page.items;
    if (playlistEmpty) playlistEmpty.style.display = page.total ? "none" : "block";
    playlistList.style.display = page.total ? "block" : "none";
    if (!page.total) { playlistList.innerHTML = ""; return; }
    const rows = page.items.map((track, i) => `<div class="track-row virtual-row" data-pl-track="${esc(track.id)}" data-page-index="${i}" style="position:absolute;left:0;right:0;top:${(page.offset+i)*playlistRowHeight}px;height:${playlistRowHeight}px"><span class="num">${page.offset+i+1}</span>${track.cover?`<div class="track-cover-mini" style="background-image:url('${esc(track.cover)}');background-size:cover;background-position:center"></div>`:`<div class="track-cover-mini cover-default" data-artwork-id="${esc(track.id)}">♪</div>`}<div style="flex:1;min-width:0"><div class="t-title">${esc(track.title)}</div><div class="t-artist">${esc(track.artist)} • ${esc(track.album)}</div></div><span class="t-dur">${fmtDur(track.duration)}</span><button class="btn small ghost" data-remove-track="${esc(track.id)}">×</button></div>`).join("");
    playlistList.innerHTML = `<div style="position:relative;height:${Math.max(viewport,page.total*playlistRowHeight)}px">${rows}</div>`;
    bindLazyArtwork(playlistList);
    playlistList.querySelectorAll<HTMLElement>("[data-pl-track]").forEach(row => {
      row.onclick = event => {
        if ((event.target as HTMLElement).closest("[data-remove-track]")) return;
        busEmit("melo:play-tracks", { tracks: page.items, index: Number(row.dataset.pageIndex || 0) });
      };
    });
    playlistList.querySelectorAll<HTMLElement>("[data-remove-track]").forEach(button => {
      button.onclick = async event => {
        event.stopPropagation();
        await invoke!("remove_track_from_playlist", { playlistId: currentPlaylistId, trackId: button.dataset.removeTrack });
        busEmit("melo:playlist-changed", { playlistId: currentPlaylistId });
      };
    });
  }

  // TypeScript cannot call a nullable function after an await without another
  // guard; this helper centralizes that check for small event handlers.
  async function invokeSafe<T>(command: string, args?: Record<string, unknown>): Promise<T | null> {
    if (!invoke) return null;
    return invoke<T>(command, args);
  }

  async function importPaths(paths: string[], mode: "replace" | "append" | "none" = "replace"): Promise<Track[]> {
    await loadCore();
    if (!invoke || !paths.length) return [];
    const list = await invoke<Track[]>("import_audio_files", {
      paths,
      playlistId: mode === "none" ? null : currentPlaylistId,
      replacePlaylist: mode === "replace",
    });
    const hydrated = list.map(normalizeTrack);
    await Promise.all([refreshStats(), refreshPlaylists(), renderLibraryVirtual(), renderPlaylistVirtual()]);
    busEmit("melo:library-changed", { imported: hydrated.length });
    return hydrated;
  }

  async function scanFolder(path: string, replacePlaylist = false) {
    await loadCore();
    if (!invoke) return null;
    if (activeScanId) return activeScanId;
    const result = await invoke<{ scanId: string }>("start_library_scan", { path });
    activeScanId = result.scanId;
    ownedScanId = result.scanId;
    replacePlaylistAfterScan = replacePlaylist;
    if (scanButton) setScanLabel("Cancel Scan");
    return activeScanId;
  }

  async function chooseAndScanFolder() {
    if (!isTauri) return;
    if (activeScanId && invoke) {
      await invoke("cancel_library_scan", { scanId: activeScanId });
      return;
    }
    const { open } = await import("@tauri-apps/plugin-dialog");
    const selected = await open({ directory: true, multiple: false });
    if (selected) await scanFolder(selected as string);
  }

  async function getTrack(id: string): Promise<Track | null> {
    await loadCore();
    if (!invoke) return null;
    const track = await invoke<Track | null>("get_track_by_id", { id });
    return track ? normalizeTrack(track) : null;
  }

  tabs?.querySelectorAll<HTMLElement>("[data-libtab]").forEach(tab => {
    tab.onclick = () => {
      tabs.querySelectorAll("[data-libtab]").forEach(x => x.classList.remove("active"));
      tab.classList.add("active");
      libTab = (tab.dataset.libtab || "artists") as typeof libTab;
      resetLibrarySelection();
      renderLibraryVirtual(true);
    };
  });
  searchInput?.addEventListener("input", () => {
    librarySearch = searchInput.value.trim();
    window.clearTimeout(libraryScrollTimer);
    libraryScrollTimer = window.setTimeout(() => renderLibraryVirtual(true), 180);
  });
  trackList?.addEventListener("scroll", () => {
    window.clearTimeout(libraryScrollTimer);
    libraryScrollTimer = window.setTimeout(() => renderLibraryVirtual(), 60);
  });
  playlistList?.addEventListener("scroll", () => {
    window.clearTimeout(playlistScrollTimer);
    playlistScrollTimer = window.setTimeout(() => renderPlaylistVirtual(), 60);
  });
  playlistSearch?.addEventListener("input", () => {
    window.clearTimeout(playlistScrollTimer);
    playlistScrollTimer = window.setTimeout(() => renderPlaylistVirtual(true), 180);
  });
  playlistSort?.addEventListener("change", () => renderPlaylistVirtual(true));
  playlistSelect?.addEventListener("change", () => {
    currentPlaylistId = playlistSelect.value;
    localStorage.setItem("melo-currentPlaylist", currentPlaylistId);
    renderPlaylistVirtual(true);
  });
  scanButton?.addEventListener("click", chooseAndScanFolder);
  clearLibraryButton?.addEventListener("click", async () => {
    if (!invoke) return;
    if (activeScanId) {
      alert("Cancel the active scan before clearing the Library database.");
      return;
    }
    if (!await confirmLibraryClear()) return;
    await invoke("clear_library_database");
    recentTracks = [];
    await Promise.all([refreshStats(), refreshPlaylists(), renderLibraryVirtual(true), renderPlaylistVirtual(true)]);
    busEmit("melo:library-changed", { cleared: true });
  });
  clearPlaylistButton?.addEventListener("click", async () => {
    await invokeSafe("clear_playlist", { playlistId: currentPlaylistId });
    await Promise.all([refreshPlaylists(), renderPlaylistVirtual(true)]);
    busEmit("melo:playlist-changed", { playlistId: currentPlaylistId });
  });
  newPlaylistButton?.addEventListener("click", async () => {
    const name = prompt("New playlist name:")?.trim();
    if (!name) return;
    const created = await invokeSafe<PlaylistRow>("create_playlist", { name });
    if (created) currentPlaylistId = created.id;
    await Promise.all([refreshPlaylists(), renderPlaylistVirtual(true)]);
  });
  exportButton?.addEventListener("click", async () => {
    if (!invoke) return;
    const all: Track[] = [];
    let offset = 0;
    while (true) {
      const page = await invoke<Page<Track>>("playlist_tracks", { playlistId: currentPlaylistId, search: null, sort: "default", limit: 500, offset });
      all.push(...page.items);
      offset += page.items.length;
      if (offset >= page.total || !page.items.length) break;
    }
    if (!all.length) return;
    const text = "#EXTM3U\n" + all.map(t => `#EXTINF:${Math.floor(t.duration)},${t.artist} - ${t.title}\n${t.path}`).join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([text], { type: "audio/x-mpegurl" }));
    a.download = `${playlists.find(p => p.id === currentPlaylistId)?.name || "playlist"}.m3u`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  });

  if (isTauri) {
    import("@tauri-apps/api/webviewWindow").then(({ getCurrentWebviewWindow }) => {
      getCurrentWebviewWindow().onDragDropEvent(async event => {
        if (event.payload.type !== "drop") return;
        const paths = event.payload.paths || [];
        if (!paths.length) return;
        const imported = await importPaths(paths, role === "playlist" ? "append" : "replace");
        if (imported.length) {
          if (role !== "playlist") busEmit("melo:play-tracks", { tracks: imported, index: 0 });
        } else {
          for (const path of paths) {
            try { await scanFolder(path, role !== "playlist"); } catch {}
          }
        }
      });
    }).catch(() => {});
  }

  busOn("melo:scan-progress", async (progress: any) => {
    if (!progress) return;
    if (progress.scanId) activeScanId = progress.scanId;
    if (scanButton && !progress.finished) setScanLabel(`Cancel ${progress.done || 0}/${progress.total || "…"}`);
    if (scanButton) {
      const pct = progress.total ? Math.max(0, Math.min(100, (Number(progress.done || 0) / Number(progress.total)) * 100)) : 0;
      scanButton.style.setProperty("--scan-progress", `${pct}%`);
      scanButton.classList.toggle("scanning", !progress.finished);
    }
    if (progress.finished) {
      const shouldReplace = progress.scanId === ownedScanId && replacePlaylistAfterScan && !progress.cancelled;
      if (shouldReplace && invoke) {
        await invoke("replace_playlist_from_scan", { playlistId: currentPlaylistId, scanId: progress.scanId });
        const first = await invoke<Page<Track>>("playlist_tracks", { playlistId: currentPlaylistId, search: null, sort: "default", limit: 100, offset: 0 });
        const list = first.items.map(normalizeTrack);
        if (list.length) busEmit("melo:play-tracks", { tracks: list, index: 0 });
        busEmit("melo:playlist-changed", { playlistId: currentPlaylistId });
      }
      activeScanId = null;
      ownedScanId = null;
      replacePlaylistAfterScan = false;
      if (scanButton) {
        setScanLabel("Scan");
        scanButton.classList.remove("scanning");
        scanButton.style.setProperty("--scan-progress", "0%");
      }
      await Promise.all([refreshStats(), refreshPlaylists(), renderLibraryVirtual(), renderPlaylistVirtual()]);
    }
  });
  let refreshTimer = 0;
  busOn("melo:library-changed", () => {
    window.clearTimeout(refreshTimer);
    refreshTimer = window.setTimeout(() => {
      refreshStats();
      renderLibraryVirtual();
      renderPlaylistVirtual();
    }, 500);
  });
  busOn("melo:playlist-changed", () => {
    refreshPlaylists();
    renderPlaylistVirtual();
  });

  (window as any).LumiLibrary = {
    get tracks() { return recentTracks; },
    get playlists() { return playlists; },
    scanFolder,
    importPaths,
    getTrack,
    render: () => renderLibraryVirtual(),
    addTracks: () => {},
    addToCurrentPlaylist: async (list: Track[]) => {
      if (!invoke || !list.length) return;
      await invoke("add_tracks_to_playlist", { playlistId: currentPlaylistId, trackIds: list.map(t => t.id) });
      busEmit("melo:playlist-changed", { playlistId: currentPlaylistId });
    },
    currentPlaylistName: () => playlists.find(p => p.id === currentPlaylistId)?.name || "Playlist",
  };

  loadCore().catch(() => toast("Could not initialize the Library database"));
}
