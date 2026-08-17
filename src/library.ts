import type { Track } from "./types";
import { busEmit, busOn, isTauri } from "./bus";
import {
  populateQueue,
  appendToQueue,
  onQueueState,
  getQueuePage,
  jumpQueue,
  removeFromQueue,
  reorderQueue,
  clearQueue,
  setupQueue,
  type QueueSource,
  type QueueEntry,
} from "./queue";

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

  const queueList = document.getElementById("winPlaylistTracks") as HTMLElement | null;
  const queueEmpty = document.getElementById("winPlaylistEmpty") as HTMLElement | null;
  const queueSearch = document.getElementById("playlistSearchInput") as HTMLInputElement | null;
  const queueCount = document.getElementById("queueCount") as HTMLElement | null;
  const clearQueueButton = document.getElementById("btn-clear-playlist") as HTMLButtonElement | null;

  let invoke: (<T>(command: string, args?: Record<string, unknown>) => Promise<T>) | null = null;
  let toAsset: ((path: string) => string) | null = null;
  let initialized = false;
  let playlists: PlaylistRow[] = [];
  let activeScanId: string | null = null;
  let ownedScanId: string | null = null;
  let replacePlaylistAfterScan = false;
  let recentTracks: Track[] = [];
  let currentTrackId: string | null = null;
  const artistAlbumsCache = new Map<string, GroupRow[]>();

  let libTab: "artists" | "albums" | "genres" = "artists";
  let selectedArtist: string | null = null;
  let selectedAlbum: string | null = null;
  let selectedGenre: string | null = null;
  let librarySearch = "";

  const libraryRowHeight = 54;
  const queueRowHeight = 52;
  let libraryRequest = 0;
  let queueRequest = 0;
  let libraryScrollTimer = 0;
  let queueScrollTimer = 0;
  let queueSearchTimer = 0;
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
  function markActiveTracks() {
    if (!currentTrackId) return;
    document.querySelectorAll(".track-row").forEach((el) => {
      const row = el as HTMLElement;
      const id = row.dataset.trackId || row.dataset.plTrack;
      row.classList.toggle("active", id === currentTrackId);
    });
  }

  function bindLazyArtwork(root: HTMLElement) {
    const elements = [...root.querySelectorAll<HTMLElement>("[data-artwork-id]")];
    if (!("IntersectionObserver" in window)) {
      elements.forEach(el => enqueueArtwork(el.dataset.artworkId, el));
      return;
    }
    // Use the viewport as the observer root with a large pre-load margin so
    // covers visible immediately after a search/filter (no scroll needed).
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target as HTMLElement;
        observer.unobserve(el);
        enqueueArtwork(el.dataset.artworkId, el);
      });
    }, { rootMargin: "600px" });
    elements.forEach(el => observer.observe(el));
    // Eagerly load artwork for elements already in the viewport right now.
    requestAnimationFrame(() => {
      elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.bottom >= 0 && rect.top <= window.innerHeight + 600) {
          observer.unobserve(el);
          enqueueArtwork(el.dataset.artworkId, el);
        }
      });
    });
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
    await renderQueueVirtual(true);
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

  async function refreshPlaylists() {
    if (!invoke) return;
    try { playlists = await invoke<PlaylistRow[]>("list_playlists"); } catch {}
  }

  function resetLibrarySelection() {
    selectedArtist = selectedAlbum = selectedGenre = null;
    if (trackList) trackList.scrollTop = 0;
  }

  function libraryMode(): "groups" | "tracks" {
    if (libTab === "artists") return selectedArtist ? "tracks" : "groups";
    if (libTab === "albums") return selectedAlbum ? "tracks" : "groups";
    return selectedGenre ? "tracks" : "groups";
  }

  function libraryGroupKind(): "artists" | "albums" | "genres" {
    return libTab;
  }

  function libraryCrumb(): string {
    if (libTab === "artists" && selectedArtist) {
      return selectedAlbum ? `${selectedArtist} › ${selectedAlbum}` : selectedArtist;
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
      album: selectedAlbum,
      genre: selectedGenre,
      sort: "title-asc",
      limit,
      offset,
    });
    page.items = page.items.map(normalizeTrack);
    recentTracks = page.items;
    return page;
  }

  async function getArtistAlbums(artist: string): Promise<GroupRow[]> {
    const cached = artistAlbumsCache.get(artist);
    if (cached) return cached;
    if (!invoke) return [];
    const page = await invoke<Page<GroupRow>>("library_groups", { kind: "albums", search: null, artist, limit: 500, offset: 0 });
    artistAlbumsCache.set(artist, page.items);
    return page.items;
  }

  async function renderLibraryVirtual(reset = false) {
    if (!trackList || !invoke) return;
    if (reset) trackList.scrollTop = 0;
    trackList.style.display = "block";
    trackList.style.position = "relative";
    trackList.style.overflowY = "auto";
    const viewport = Math.max(300, trackList.clientHeight || 420);
    const artistDetail = libTab === "artists" && !!selectedArtist;
    const crumb = libraryCrumb();
    const headerHeight = artistDetail ? 84 : (crumb ? 38 : 0);
    const visible = Math.ceil(viewport / libraryRowHeight);
    const effectiveScroll = Math.max(0, trackList.scrollTop - headerHeight);
    const start = Math.max(0, Math.floor(effectiveScroll / libraryRowHeight) - 8);
    const limit = Math.max(40, visible + 16);
    const request = ++libraryRequest;
    try {
      const albumsPromise: Promise<GroupRow[] | null> = artistDetail && selectedArtist
        ? getArtistAlbums(selectedArtist)
        : Promise.resolve(null);
      const [page, artistAlbums] = await Promise.all([fetchLibraryPage(start, limit), albumsPromise]);
      if (request !== libraryRequest) return;
      const totalHeight = page.total * libraryRowHeight + headerHeight;
      const rows = page.items.map((item, index) => {
        const absoluteIndex = page.offset + index;
        const top = headerHeight + absoluteIndex * libraryRowHeight;
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
          <button class="btn small ghost" data-add-track="${esc(track.id)}" title="Add to queue">+</button>
        </div>`;
      }).join("");
      const artistHeader = artistDetail && artistAlbums
        ? `<div class="artist-detail-header" style="position:sticky;top:0;height:${headerHeight}px;z-index:4;background:var(--card)">
            <div class="lib-crumb" style="height:38px"><button class="btn small" id="virtualBack">‹ Artists</button><b>${esc(selectedArtist)}</b></div>
            <div class="chip-row artist-album-chips custom-scrollbar" style="height:46px;padding-top:6px;padding-bottom:6px">
              <button class="chip ${selectedAlbum === null ? "active" : ""}" data-artist-album="all">All Tracks</button>
              ${artistAlbums.map((album, index) => {
                const cover = artworkUrl(album.cover);
                const thumb = cover
                  ? `<span class="chip-thumb" style="background-image:url('${esc(cover)}')"></span>`
                  : `<span class="chip-thumb cover-default" data-artwork-id="${esc(album.artworkTrackId || "")}">♪</span>`;
                return `<button class="chip ${selectedAlbum === album.name ? "active" : ""}" data-artist-album-index="${index}">${thumb}${esc(album.name)}</button>`;
              }).join("")}
            </div>
          </div>`
        : (crumb ? `<div class="lib-crumb virtual-crumb" style="position:sticky;top:0;height:${headerHeight}px;z-index:3;background:var(--card)"><button class="btn small" id="virtualBack">‹ Back</button><b>${esc(crumb)}</b></div>` : "");
      trackList.innerHTML = `<div class="virtual-list-space" style="position:relative;height:${Math.max(totalHeight, viewport)}px">${artistHeader}${rows}</div>`;
      bindLibraryRows(page.items, artistAlbums || []);
      bindLazyArtwork(trackList);
      markActiveTracks();
    } catch (error) {
      trackList.innerHTML = `<div style="padding:24px;text-align:center;color:var(--text-muted)">Could not read the Library database.</div>`;
    }
  }

  function currentLibraryQueueSource(): QueueSource {
    return {
      type: "library",
      search: librarySearch || null,
      artist: selectedArtist,
      album: selectedAlbum,
      genre: selectedGenre,
      sort: "title-asc",
    };
  }

  function bindLibraryRows(items: Array<GroupRow | Track>, artistAlbums: GroupRow[] = []) {
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
        if (!button.dataset.addTrack) return;
        await appendToQueue([button.dataset.addTrack]);
        toast("Added to queue");
      };
    });
    trackList.querySelectorAll<HTMLElement>("[data-track-id]").forEach(row => {
      row.onclick = async event => {
        if ((event.target as HTMLElement).closest("[data-add-track]")) return;
        const trackId = row.dataset.trackId || null;
        const source = currentLibraryQueueSource();
        await populateQueue(source, { autoplay: true, startTrackId: trackId });
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
      if (libTab === "artists" && selectedArtist) { selectedArtist = null; selectedAlbum = null; }
      else if (selectedAlbum) selectedAlbum = null;
      else if (selectedArtist) selectedArtist = null;
      else selectedGenre = null;
      renderLibraryVirtual(true);
    });
    trackList.querySelector<HTMLElement>("[data-artist-album='all']")?.addEventListener("click", () => {
      selectedAlbum = null;
      renderLibraryVirtual(true);
    });
    trackList.querySelectorAll<HTMLElement>("[data-artist-album-index]").forEach(button => {
      button.onclick = () => {
        const album = artistAlbums[Number(button.dataset.artistAlbumIndex || 0)];
        selectedAlbum = album?.name || null;
        renderLibraryVirtual(true);
      };
    });
  }

  // ---- Playing Queue list (virtualized, DB-backed) ----
  let dragFromSeq: number | null = null;

  async function renderQueueVirtual(reset = false) {
    if (!queueList) return;
    if (reset) queueList.scrollTop = 0;
    queueList.style.display = "block";
    queueList.style.position = "relative";
    queueList.style.overflowY = "auto";
    const viewport = Math.max(260, queueList.clientHeight || 420);
    const search = queueSearch?.value?.trim() || "";
    const start = Math.max(0, Math.floor(queueList.scrollTop / queueRowHeight) - 8);
    const limit = Math.max(40, Math.ceil(viewport / queueRowHeight) + 16);
    const request = ++queueRequest;
    let page: Page<QueueEntry>;
    try {
      page = await getQueuePage(limit, start, search);
    } catch {
      return;
    }
    if (request !== queueRequest) return;
    const items = page.items;
    if (queueCount) queueCount.textContent = search ? `${page.total} matches` : `${page.total} track${page.total === 1 ? "" : "s"}`;
    if (queueEmpty) queueEmpty.style.display = page.total ? "none" : "block";
    queueList.style.display = page.total ? "block" : "none";
    if (!page.total) { queueList.innerHTML = ""; return; }

    // Each row must remember its real seq, not its position in the (possibly
    // searched) page. Reorder drag is disabled while a search filter is set.
    const rows = items.map((entry, i) => {
      const track = entry;
      const absoluteIndex = page.offset + i;
      const top = absoluteIndex * queueRowHeight;
      return `<div class="track-row virtual-row queue-row" data-queue-seq="${esc(track.seq)}" data-track-id="${esc(track.id)}" draggable="${search ? "false" : "true"}" style="position:absolute;left:0;right:0;top:${top}px;height:${queueRowHeight}px">
        <span class="num">${absoluteIndex + 1}</span>
        ${track.cover ? `<div class="track-cover-mini" style="background-image:url('${esc(track.cover)}');background-size:cover;background-position:center"></div>` : `<div class="track-cover-mini cover-default" data-artwork-id="${esc(track.id)}">♪</div>`}
        <div style="flex:1;min-width:0"><div class="t-title">${esc(track.title)}</div><div class="t-artist">${esc(track.artist)} • ${esc(track.album)}</div></div>
        <span class="t-dur">${fmtDur(track.duration)}</span>
        <button class="btn small ghost" data-remove-seq="${esc(track.seq)}" title="Remove from queue">×</button>
      </div>`;
    }).join("");
    queueList.innerHTML = `<div style="position:relative;height:${Math.max(viewport, page.total * queueRowHeight)}px">${rows}</div>`;
    bindLazyArtwork(queueList);
    markActiveTracks();

    queueList.querySelectorAll<HTMLElement>(".queue-row").forEach(row => {
      row.onclick = async event => {
        if ((event.target as HTMLElement).closest("[data-remove-seq]")) return;
        const seq = Number(row.dataset.queueSeq);
        if (Number.isFinite(seq)) await jumpQueue(seq, 0);
      };
      row.ondragstart = () => { dragFromSeq = Number(row.dataset.queueSeq); row.classList.add("dragging"); };
      row.ondragend = () => { row.classList.remove("dragging"); dragFromSeq = null; };
      row.ondragover = (event) => { event.preventDefault(); };
      row.ondrop = async (event) => {
        event.preventDefault();
        const toSeq = Number(row.dataset.queueSeq);
        if (Number.isFinite(dragFromSeq) && Number.isFinite(toSeq) && dragFromSeq !== toSeq && !search) {
          await reorderQueue(dragFromSeq!, toSeq);
        }
        dragFromSeq = null;
      };
    });
    queueList.querySelectorAll<HTMLElement>("[data-remove-seq]").forEach(button => {
      button.onclick = async event => {
        event.stopPropagation();
        const seq = Number(button.dataset.removeSeq);
        if (Number.isFinite(seq)) await removeFromQueue(seq);
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
      playlistId: mode === "none" ? null : "p1",
      replacePlaylist: mode === "replace",
    });
    const hydrated = list.map(normalizeTrack);
    await Promise.all([refreshStats(), refreshPlaylists(), renderLibraryVirtual()]);
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
  queueList?.addEventListener("scroll", () => {
    window.clearTimeout(queueScrollTimer);
    queueScrollTimer = window.setTimeout(() => renderQueueVirtual(), 60);
  });
  queueSearch?.addEventListener("input", () => {
    window.clearTimeout(queueSearchTimer);
    queueSearchTimer = window.setTimeout(() => renderQueueVirtual(true), 160);
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
    artistAlbumsCache.clear();
    await Promise.all([refreshStats(), refreshPlaylists(), renderLibraryVirtual(true)]);
    busEmit("melo:library-changed", { cleared: true });
  });
  clearQueueButton?.addEventListener("click", async () => {
    await clearQueue();
  });

  if (isTauri) {
    import("@tauri-apps/api/webviewWindow").then(({ getCurrentWebviewWindow }) => {
      getCurrentWebviewWindow().onDragDropEvent(async event => {
        if (event.payload.type !== "drop") return;
        const paths = event.payload.paths || [];
        if (!paths.length) return;
        const imported = await importPaths(paths, role === "playlist" ? "append" : "none");
        if (imported.length) {
          if (role === "playlist") {
            await appendToQueue(imported.map(t => t.id));
          } else {
            await populateQueue(
              { type: "tracks", ids: imported.map(t => t.id) },
              { autoplay: true },
            );
          }
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
      if (shouldReplace) {
        await populateQueue({ type: "scan", scanId: progress.scanId }, { autoplay: true });
      }
      activeScanId = null;
      ownedScanId = null;
      replacePlaylistAfterScan = false;
      if (scanButton) {
        setScanLabel("Scan");
        scanButton.classList.remove("scanning");
        scanButton.style.setProperty("--scan-progress", "0%");
      }
      await Promise.all([refreshStats(), refreshPlaylists(), renderLibraryVirtual()]);
    }
  });
  let refreshTimer = 0;
  busOn("melo:library-changed", () => {
    artistAlbumsCache.clear();
    window.clearTimeout(refreshTimer);
    refreshTimer = window.setTimeout(() => {
      refreshStats();
      renderLibraryVirtual();
    }, 500);
  });

  // Re-render the queue whenever it changes (adds, removes, reorders,
  // track changes). The queue window is a separate OS webview, so it listens
  // to the same cross-window event bus as the main window.
  busOn("melo:queue-changed", () => renderQueueVirtual());
  busOn("melo:queue-cleared", () => renderQueueVirtual(true));

  (window as any).MeloLibrary = {
    get tracks() { return recentTracks; },
    get playlists() { return playlists; },
    scanFolder,
    importPaths,
    getTrack,
    render: () => renderLibraryVirtual(),
    addToCurrentPlaylist: async (list: Track[]) => {
      if (!list.length) return;
      await appendToQueue(list.map(t => t.id));
    },
    currentPlaylistName: () => "Playing Queue",
  };

  onQueueState((s) => {
    currentTrackId = s.currentTrack?.id || null;
    markActiveTracks();
    if (queueCount) {
      queueCount.textContent = `${s.total} track${s.total === 1 ? "" : "s"}`;
    }
  });

  // The queue panel runs in its own webview and must bootstrap the queue
  // state itself (the player window normally does this via setupPlayer).
  // Without it, currentTrackId stays null until a track changes and the
  // active row isn't highlighted when the panel is (re)opened.
  if (role === "playlist") {
    setupQueue()
      .then(() => loadCore())
      .then(() => renderQueueVirtual(true))
      .then(() => markActiveTracks())
      .catch(() => toast("Could not initialize the Playing Queue"));
  } else {
    loadCore().catch(() => toast("Could not initialize the Library database"));
  }
}
