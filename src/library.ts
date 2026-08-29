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
  const searchClear = document.getElementById("searchClear") as HTMLButtonElement | null;
  const tabs = document.getElementById("libraryTabs");
  const scanButton = document.getElementById("btn-scan") as HTMLButtonElement | null;
  const clearLibraryButton = document.getElementById("btn-clear-library") as HTMLButtonElement | null;

  const playlistList = document.getElementById("winPlaylistTracks") as HTMLElement | null;
  const playlistEmpty = document.getElementById("winPlaylistEmpty") as HTMLElement | null;
  const playlistSelect = document.getElementById("playlistSelect") as HTMLSelectElement | null;
  const playlistSearch = document.getElementById("playlistSearchInput") as HTMLInputElement | null;
  const playlistSearchClear = document.getElementById("playlistSearchClear") as HTMLButtonElement | null;
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

  let libTab: "artists" | "albums" | "genres" | "recent" = "artists";
  let selectedArtist: string | null = null;
  let selectedAlbum: string | null = null;
  let selectedGenre: string | null = null;
  let librarySearch = "";
  let currentTrackId: string | null = null;

  const playlistRowHeight = 52;
  type LibView = "details" | "compact" | "tiles";
  const LIB_VIEWS: LibView[] = ["details", "compact", "tiles"];
  let libView: LibView = ((): LibView => {
    const saved = localStorage.getItem("melo-lib-view") || "details";
    if (saved === "mosaic") return "tiles";
    return (LIB_VIEWS as string[]).includes(saved) ? saved as LibView : "details";
  })();
  function libraryRowHeight(): number {
    if (libView === "compact") return 36;
    if (libView === "tiles" && libraryMode() === "groups") return 148;
    return 54;
  }
  let libraryRequest = 0;
  // Scroll position of the groups list (artists/albums/genres) right
  // before drilling into a group, so pressing "Back" restores the user to
  // where they were instead of jumping to the top of the list.
  let savedGroupsScrollTop = 0;
  // Tracks how many grid columns the track list last rendered with, so a
  // ResizeObserver can tell when the column count actually needs to change
  // (and only re-render then, not on every pixel of a resize drag).
  let lastLibraryColumns = 1;
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

  // ---------------------------------------------------------------------
  // Multi-select (Ctrl+click to toggle one, Shift+click to select a range)
  // + bulk actions, for both the Library track list and the Playlist.
  // A plain click (no modifier) always clears the selection and performs
  // the normal single-item action (play / drill-in) — multi-select only
  // ever starts via Ctrl or Shift.
  // ---------------------------------------------------------------------
  const librarySelectedIds = new Set<string>();
  let libraryAnchorIndex: number | null = null;
  const playlistSelectedIds = new Set<string>();
  let playlistAnchorIndex: number | null = null;

  function applySelectionRange(
    selected: Set<string>,
    id: string,
    index: number,
    renderedIds: string[],
    anchor: number | null,
    event: MouseEvent
  ): number | null {
    if (event.shiftKey && anchor !== null) {
      const from = Math.min(anchor, index);
      const to = Math.max(anchor, index);
      for (let i = from; i <= to; i++) if (renderedIds[i]) selected.add(renderedIds[i]);
      return anchor;
    }
    if (selected.has(id)) selected.delete(id);
    else selected.add(id);
    return index;
  }

  function createBulkBar(actions: { label: string; danger?: boolean; onClick: () => void }[]) {
    const bar = document.createElement("div");
    bar.className = "bulk-action-bar";
    bar.style.display = "none";
    const countEl = document.createElement("span");
    countEl.className = "bulk-count";
    bar.appendChild(countEl);
    for (const action of actions) {
      const btn = document.createElement("button");
      btn.className = `btn small ${action.danger ? "danger" : ""}`;
      btn.textContent = action.label;
      btn.onclick = action.onClick;
      bar.appendChild(btn);
    }
    const clearBtn = document.createElement("button");
    clearBtn.className = "btn small ghost";
    clearBtn.textContent = "Clear";
    bar.appendChild(clearBtn);
    document.body.appendChild(bar);
    return { bar, countEl, clearBtn };
  }

  const libraryBulk = createBulkBar([
    {
      label: "Add to Playlist",
      onClick: async () => {
        if (!invoke || !librarySelectedIds.size) return;
        await invoke("add_tracks_to_playlist", { playlistId: currentPlaylistId, trackIds: Array.from(librarySelectedIds) });
        busEmit("melo:playlist-changed", { playlistId: currentPlaylistId });
        toast(`Added ${librarySelectedIds.size} track(s) to playlist`);
        librarySelectedIds.clear();
        updateLibrarySelectionUI();
      },
    },
    {
      label: "Remove from Library",
      danger: true,
      onClick: async () => {
        if (!invoke || !librarySelectedIds.size) return;
        const ids = Array.from(librarySelectedIds);
        await invoke("delete_tracks", { ids });
        librarySelectedIds.clear();
        updateLibrarySelectionUI();
        busEmit("melo:library-changed", { removed: ids.length });
      },
    },
  ]);
  libraryBulk.clearBtn.onclick = () => {
    librarySelectedIds.clear();
    updateLibrarySelectionUI();
  };

  const playlistBulk = createBulkBar([
    {
      label: "Remove from Playlist",
      danger: true,
      onClick: async () => {
        if (!invoke || !playlistSelectedIds.size) return;
        const ids = Array.from(playlistSelectedIds);
        for (const id of ids) {
          await invoke("remove_track_from_playlist", { playlistId: currentPlaylistId, trackId: id });
        }
        playlistSelectedIds.clear();
        updatePlaylistSelectionUI();
        busEmit("melo:playlist-changed", { playlistId: currentPlaylistId });
      },
    },
  ]);
  playlistBulk.clearBtn.onclick = () => {
    playlistSelectedIds.clear();
    updatePlaylistSelectionUI();
  };

  function updateLibrarySelectionUI() {
    if (!trackList) return;
    trackList.querySelectorAll<HTMLElement>("[data-track-id]").forEach(row => {
      row.classList.toggle("row-selected", librarySelectedIds.has(row.dataset.trackId || ""));
    });
    libraryBulk.bar.style.display = librarySelectedIds.size ? "flex" : "none";
    libraryBulk.countEl.textContent = `${librarySelectedIds.size} selected`;
  }

  function updatePlaylistSelectionUI() {
    if (!playlistList) return;
    playlistList.querySelectorAll<HTMLElement>("[data-pl-track]").forEach(row => {
      row.classList.toggle("row-selected", playlistSelectedIds.has(row.dataset.plTrack || ""));
    });
    playlistBulk.bar.style.display = playlistSelectedIds.size ? "flex" : "none";
    playlistBulk.countEl.textContent = `${playlistSelectedIds.size} selected`;
  }

  function clearLibrarySelection() {
    if (!librarySelectedIds.size) return;
    librarySelectedIds.clear();
    libraryAnchorIndex = null;
    updateLibrarySelectionUI();
  }
  function clearPlaylistSelection() {
    if (!playlistSelectedIds.size) return;
    playlistSelectedIds.clear();
    playlistAnchorIndex = null;
    updatePlaylistSelectionUI();
  }

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

  function updateSearchClear() {
    searchClear?.classList.toggle("show", !!searchInput?.value);
  }

  function updatePlaylistSearchClear() {
    playlistSearchClear?.classList.toggle("show", !!playlistSearch?.value);
  }

  // Highlight the row that is currently playing in the Playlist window.
  function applyActiveTrackHighlight() {
    playlistList?.querySelectorAll<HTMLElement>("[data-pl-track]").forEach(row => {
      row.classList.toggle("active", row.dataset.plTrack === currentTrackId);
    });
  }

  function setActiveTrack(id: string | null) {
    currentTrackId = id;
    applyActiveTrackHighlight();
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
    savedGroupsScrollTop = 0;
    clearLibrarySelection();
    if (trackList) trackList.scrollTop = 0;
  }

  // Artists tab: click an artist → albums with their tracks listed under
  // each album (no extra drill). Albums/Genres tabs still drill one level
  // into a flat track list.
  function libraryMode(): "groups" | "tracks" {
    if (libTab === "artists") return "groups";
    if (libTab === "albums") return selectedAlbum ? "tracks" : "groups";
    return selectedGenre ? "tracks" : "groups";
  }

  function libraryGroupKind(): "artists" | "albums" | "genres" {
    return libTab === "recent" ? "artists" : libTab;
  }

  function libraryCrumb(): string {
    if (libTab === "artists" && selectedArtist) return selectedArtist;
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

  // How many track-row columns fit the current panel width. Only the flat
  // track list uses multiple columns (grid layout); group rows (artists /
  // albums / genres) always stay single-column.
  const GRID_MIN_COLUMN_WIDTH = 300;
  const GRID_GAP = 8;
  function libraryColumns(): number {
    if (!trackList) return 1;
    const width = trackList.clientWidth || 0;
    if (libView === "compact") return 1;
    const trackLike = libraryMode() === "tracks" || (libTab === "artists" && !!selectedArtist);
    if (trackLike) return width >= 400 ? 2 : 1;
    if (libView === "tiles") return Math.max(2, Math.min(6, Math.floor((width + GRID_GAP) / 118)));
    return width >= GRID_MIN_COLUMN_WIDTH * 2 + GRID_GAP ? 2 : 1;
  }

  function syncLibViewButtons() {
    document.querySelectorAll<HTMLElement>("[data-libview]").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.libview === libView);
    });
    trackList?.setAttribute("data-lib-view", libView);
  }

  async function renderLibraryVirtual(reset = false, restoreScroll?: number) {
    if (!trackList || !invoke) return;
    if (libTab === "recent") {
      if (reset) trackList.scrollTop = 0;
      return renderRecentlyPlayed();
    }
    if (libTab === "artists" && selectedArtist) {
      return renderArtistDiscography(reset);
    }
    if (reset) trackList.scrollTop = 0;
    else if (restoreScroll != null) trackList.scrollTop = restoreScroll;
    const keepScroll = reset ? 0 : (restoreScroll ?? trackList.scrollTop);
    trackList.style.display = "block";
    trackList.style.position = "relative";
    trackList.style.overflowY = "auto";
    const viewport = Math.max(300, trackList.clientHeight || 420);
    const crumb = libraryCrumb();
    const headerHeight = crumb ? 38 : 0;
    const rowH = libraryRowHeight();
    const columns = libraryColumns();
    lastLibraryColumns = columns;
    syncLibViewButtons();
    const rowsVisible = Math.ceil(viewport / rowH);
    const effectiveScroll = Math.max(0, trackList.scrollTop - headerHeight);
    const startRow = Math.max(0, Math.floor(effectiveScroll / rowH) - 4);
    const start = startRow * columns;
    const limit = Math.max(40, (rowsVisible + 8) * columns);
    const request = ++libraryRequest;
    try {
      const page = await fetchLibraryPage(start, limit);
      if (request !== libraryRequest) return;
      const totalRows = Math.max(1, Math.ceil(page.total / columns));
      const totalHeight = totalRows * rowH + headerHeight;
      const colWidthPct = 100 / columns;
      const card = libView === "tiles" && libraryMode() === "groups";
      const rows = page.items.map((item, index) => {
        const absoluteIndex = page.offset + index;
        const rowIdx = Math.floor(absoluteIndex / columns);
        const col = absoluteIndex % columns;
        const top = headerHeight + rowIdx * rowH;
        const posStyle = columns > 1
          ? `position:absolute;top:${top}px;height:${rowH}px;left:calc(${col * colWidthPct}% + ${col === 0 ? 0 : GRID_GAP / 2}px);width:calc(${colWidthPct}% - ${GRID_GAP / 2}px)`
          : `position:absolute;left:0;right:0;top:${top}px;height:${rowH}px`;
        if (libraryMode() === "groups") {
          const group = item as GroupRow;
          const cover = artworkUrl(group.cover);
          const avatarClass = `lib-avatar ${libraryGroupKind() === "albums" ? "lib-avatar-album" : ""}`;
          const fallback = libraryGroupKind() === "albums" ? "💿" : esc((group.name[0] || "?").toUpperCase());
          const avatar = cover
            ? `<div class="${avatarClass}" style="background-image:url('${esc(cover)}')"></div>`
            : `<div class="${avatarClass}" data-artwork-id="${esc(group.artworkTrackId || "")}">${fallback}</div>`;
          const sub = esc(group.subtitle || `${group.count} tracks`);
          if (card) {
            return `<div class="lib-item lib-card virtual-row" data-group-index="${index}" style="${posStyle}">${avatar}<div class="t-title">${esc(group.name)}</div><div class="t-artist">${sub}</div></div>`;
          }
          if (libView === "compact") {
            return `<div class="lib-item virtual-row" data-group-index="${index}" style="${posStyle}">${avatar}<div class="t-title" style="flex:1;min-width:0">${esc(group.name)}</div><div class="t-artist" style="flex-shrink:0">${sub}</div><span class="chev-r">›</span></div>`;
          }
          return `<div class="lib-item virtual-row" data-group-index="${index}" style="${posStyle}">${avatar}<div style="flex:1;min-width:0"><div class="t-title">${esc(group.name)}</div><div class="t-artist">${sub}</div></div><span class="chev-r">›</span></div>`;
        }
        const track = item as Track;
        const coverEl = track.cover
          ? `<div class="track-cover-mini" style="background-image:url('${esc(track.cover)}');background-size:cover;background-position:center"></div>`
          : `<div class="track-cover-mini cover-default" data-artwork-id="${esc(track.id)}">♪</div>`;
        if (card) {
          return `<div class="track-row lib-card virtual-row" data-track-id="${esc(track.id)}" data-page-index="${index}" style="${posStyle}">
            ${coverEl}
            <div class="t-title">${esc(track.title)}</div>
            <div class="t-artist">${esc(track.artist)}${track.album ? ` · ${esc(track.album)}` : ""}</div>
          </div>`;
        }
        return `<div class="track-row virtual-row" data-track-id="${esc(track.id)}" data-page-index="${index}" style="${posStyle}">
          <span class="num">${absoluteIndex + 1}</span>
          ${coverEl}
          <div style="flex:1;min-width:0"><div class="t-title">${esc(track.title)}</div><div class="t-artist">${esc(track.artist)} • ${esc(track.album)}</div></div>
          <span class="t-dur">${fmtDur(track.duration)}</span>
          <button class="btn small ghost" data-add-track="${esc(track.id)}" title="Add to current playlist">+</button>
        </div>`;
      }).join("");
      const header = crumb
        ? `<div class="lib-crumb virtual-crumb" style="position:sticky;top:0;height:${headerHeight}px;z-index:3;background:var(--card)"><button class="btn small" id="virtualBack">‹ Back</button><b>${esc(crumb)}</b></div>`
        : "";
      trackList.innerHTML = `<div class="virtual-list-space" style="position:relative;height:${Math.max(totalHeight, viewport)}px">${header}${rows}</div>`;
      bindLibraryRows(page.items);
      bindLazyArtwork(trackList);
      if (!reset) trackList.scrollTop = keepScroll;
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
        savedGroupsScrollTop = trackList!.scrollTop;
        clearLibrarySelection();
        if (libTab === "artists" && !selectedArtist) {
          selectedArtist = name;
        } else if (libTab === "artists" && selectedArtist && !selectedAlbum) {
          const parts = key.split("\0");
          selectedAlbum = parts[1] || name;
        } else if (libTab === "albums") {
          const parts = key.split("\0");
          selectedArtist = parts[0] || null;
          selectedAlbum = parts[1] || name;
        } else if (libTab === "genres") {
          selectedGenre = name;
        }
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
        const id = row.dataset.trackId || "";
        const mouseEvent = event as MouseEvent;
        if (mouseEvent.shiftKey || mouseEvent.ctrlKey || mouseEvent.metaKey) {
          const renderedIds = items.filter((x): x is Track => "path" in x).map(t => t.id);
          libraryAnchorIndex = applySelectionRange(librarySelectedIds, id, index, renderedIds, libraryAnchorIndex, mouseEvent);
          updateLibrarySelectionUI();
          return;
        }
        if (librarySelectedIds.size) clearLibrarySelection();
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
      if (libTab === "artists" && selectedArtist) selectedArtist = null;
      else if (libTab === "albums" && selectedAlbum) { selectedArtist = null; selectedAlbum = null; }
      else if (libTab === "genres" && selectedGenre) selectedGenre = null;
      clearLibrarySelection();
      renderLibraryVirtual(false, savedGroupsScrollTop);
    });
    updateLibrarySelectionUI();
  }

  async function renderArtistDiscography(reset = false) {
    if (!trackList || !invoke || !selectedArtist) return;
    const keepScroll = reset ? 0 : trackList.scrollTop;
    if (reset) trackList.scrollTop = 0;
    trackList.style.display = "block";
    trackList.style.position = "relative";
    trackList.style.overflowY = "auto";
    const request = ++libraryRequest;
    try {
      const page = await invoke<Page<Track>>("library_tracks", {
        search: librarySearch || null,
        artist: selectedArtist,
        album: null,
        genre: null,
        sort: "album-asc",
        limit: 5000,
        offset: 0,
      });
      if (request !== libraryRequest) return;
      const items = page.items.map(normalizeTrack);
      recentTracks = items;
      const albums: { name: string; cover?: string; tracks: Track[] }[] = [];
      const byName = new Map<string, { name: string; cover?: string; tracks: Track[] }>();
      for (const track of items) {
        const name = track.album || "Unknown Album";
        let block = byName.get(name.toLowerCase());
        if (!block) {
          block = { name, cover: track.cover, tracks: [] };
          byName.set(name.toLowerCase(), block);
          albums.push(block);
        }
        if (!block.cover && track.cover) block.cover = track.cover;
        block.tracks.push(track);
      }
      const columns = libraryColumns();
      lastLibraryColumns = columns;
      const header = `<div class="lib-crumb virtual-crumb" style="position:sticky;top:0;z-index:3;background:var(--card)"><button class="btn small" id="virtualBack">‹ Back</button><b>${esc(selectedArtist)}</b></div>`;
      const body = albums.map((album, ai) => {
        const cover = artworkUrl(album.cover);
        const avatar = cover
          ? `<div class="lib-avatar lib-avatar-album" style="background-image:url('${esc(cover)}')"></div>`
          : `<div class="lib-avatar lib-avatar-album">💿</div>`;
        const rows = album.tracks.map((track, ti) => `<div class="track-row" data-track-id="${esc(track.id)}" data-album-index="${ai}" data-track-index="${ti}">
          <span class="num">${ti + 1}</span>
          ${track.cover ? `<div class="track-cover-mini" style="background-image:url('${esc(track.cover)}');background-size:cover;background-position:center"></div>` : `<div class="track-cover-mini cover-default" data-artwork-id="${esc(track.id)}">♪</div>`}
          <div style="flex:1;min-width:0"><div class="t-title">${esc(track.title)}</div><div class="t-artist">${esc(track.artist)}</div></div>
          <span class="t-dur">${fmtDur(track.duration)}</span>
          <button class="btn small ghost" data-add-track="${esc(track.id)}" title="Add to current playlist">+</button>
        </div>`).join("");
        const twoCol = columns > 1 && libView !== "compact";
        const rowCount = twoCol ? Math.max(1, Math.ceil(album.tracks.length / 2)) : album.tracks.length;
        const gridClass = twoCol ? "lib-album-tracks two-col" : "lib-album-tracks";
        const gridStyle = twoCol ? `grid-template-rows:repeat(${rowCount},auto)` : "";
        return `<section class="lib-album-block">
          <div class="lib-album-head">${avatar}<div style="flex:1;min-width:0"><div class="t-title">${esc(album.name)}</div><div class="t-artist">${album.tracks.length} track${album.tracks.length === 1 ? "" : "s"}</div></div></div>
          <div class="${gridClass}" style="${gridStyle}">${rows}</div>
        </section>`;
      }).join("");
      trackList.innerHTML = `${header}${body || `<div style="padding:24px;text-align:center;color:var(--text-muted)">No tracks for this artist.</div>`}`;
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
          const ai = Number(row.dataset.albumIndex || 0);
          const ti = Number(row.dataset.trackIndex || 0);
          const list = albums[ai]?.tracks || [];
          if (invoke && list.length) {
            await invoke("replace_playlist_tracks", { playlistId: currentPlaylistId, trackIds: list.map(t => t.id) });
            busEmit("melo:playlist-changed", { playlistId: currentPlaylistId });
          }
          busEmit("melo:play-tracks", { tracks: list, index: ti });
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
        selectedArtist = null;
        selectedAlbum = null;
        clearLibrarySelection();
        renderLibraryVirtual(false, savedGroupsScrollTop);
      });
      bindLazyArtwork(trackList);
      if (!reset) trackList.scrollTop = keepScroll;
    } catch {
      trackList.innerHTML = `<div style="padding:24px;text-align:center;color:var(--text-muted)">Could not read the Library database.</div>`;
    }
  }

  // Re-render (only) when a resize actually crosses the 1-col/2-col
  // breakpoint — not on every pixel of a resize drag — so widening the
  // Library window reflows the track list into a grid once there's room.
  function maybeReflowLibrary() {
    const cols = libraryColumns();
    if (cols !== lastLibraryColumns) renderLibraryVirtual(false);
  }
  if (trackList && typeof ResizeObserver !== "undefined") {
    let resizeDebounce: number | null = null;
    const ro = new ResizeObserver(() => {
      if (resizeDebounce) window.clearTimeout(resizeDebounce);
      resizeDebounce = window.setTimeout(() => {
        resizeDebounce = null;
        maybeReflowLibrary();
      }, 80);
    });
    ro.observe(trackList);
  }
  window.addEventListener("resize", () => {
    window.clearTimeout(libraryScrollTimer);
    libraryScrollTimer = window.setTimeout(maybeReflowLibrary, 80);
  });

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
    const rows = page.items.map((track, i) => `<div class="track-row virtual-row ${track.id === currentTrackId ? "active" : ""}" data-pl-track="${esc(track.id)}" data-page-index="${i}" style="position:absolute;left:0;right:0;top:${(page.offset+i)*playlistRowHeight}px;height:${playlistRowHeight}px"><span class="num">${page.offset+i+1}</span>${track.cover?`<div class="track-cover-mini" style="background-image:url('${esc(track.cover)}');background-size:cover;background-position:center"></div>`:`<div class="track-cover-mini cover-default" data-artwork-id="${esc(track.id)}">♪</div>`}<div style="flex:1;min-width:0"><div class="t-title">${esc(track.title)}</div><div class="t-artist">${esc(track.artist)} • ${esc(track.album)}</div></div><span class="t-dur">${fmtDur(track.duration)}</span><button class="btn small ghost" data-remove-track="${esc(track.id)}">×</button></div>`).join("");
    playlistList.innerHTML = `<div style="position:relative;height:${Math.max(viewport,page.total*playlistRowHeight)}px">${rows}</div>`;
    bindLazyArtwork(playlistList);
    playlistList.querySelectorAll<HTMLElement>("[data-pl-track]").forEach(row => {
      row.onclick = event => {
        if ((event.target as HTMLElement).closest("[data-remove-track]")) return;
        const index = Number(row.dataset.pageIndex || 0);
        const id = row.dataset.plTrack || "";
        const mouseEvent = event as MouseEvent;
        if (mouseEvent.shiftKey || mouseEvent.ctrlKey || mouseEvent.metaKey) {
          const renderedIds = page.items.map(t => t.id);
          playlistAnchorIndex = applySelectionRange(playlistSelectedIds, id, index, renderedIds, playlistAnchorIndex, mouseEvent);
          updatePlaylistSelectionUI();
          return;
        }
        if (playlistSelectedIds.size) clearPlaylistSelection();
        busEmit("melo:play-tracks", { tracks: page.items, index });
      };
    });
    updatePlaylistSelectionUI();
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

  // Recently Played is tracked client-side (localStorage), not in the
  // SQLite database — it doesn't need to be queryable/sortable, survive a
  // full library rescan, or be shared across machines, so a small rolling
  // list here avoids a schema migration for something this simple.
  const RECENTLY_PLAYED_KEY = "melo-recently-played";
  const RECENTLY_PLAYED_MAX = 50;

  function recordRecentlyPlayed(trackId: string) {
    if (!trackId) return;
    try {
      const raw = localStorage.getItem(RECENTLY_PLAYED_KEY);
      let list: { id: string; playedAt: number }[] = raw ? JSON.parse(raw) : [];
      list = list.filter(entry => entry.id !== trackId);
      list.unshift({ id: trackId, playedAt: Date.now() });
      if (list.length > RECENTLY_PLAYED_MAX) list = list.slice(0, RECENTLY_PLAYED_MAX);
      localStorage.setItem(RECENTLY_PLAYED_KEY, JSON.stringify(list));
      if (libTab === "recent") renderRecentlyPlayed();
    } catch {}
  }

  function getRecentlyPlayedIds(): string[] {
    try {
      const raw = localStorage.getItem(RECENTLY_PLAYED_KEY);
      const list: { id: string; playedAt: number }[] = raw ? JSON.parse(raw) : [];
      return list.map(entry => entry.id);
    } catch {
      return [];
    }
  }

  // Recently Played is a small, bounded list (<= 50 items) so it's
  // rendered directly, without the virtualization/paging machinery the
  // main track list uses for potentially huge libraries.
  async function renderRecentlyPlayed() {
    if (!trackList) return;
    trackList.style.display = "block";
    trackList.style.position = "relative";
    trackList.style.overflowY = "auto";
    const ids = getRecentlyPlayedIds();
    if (!ids.length) {
      trackList.innerHTML = `<div style="padding:32px 16px;text-align:center;color:var(--text-muted)">No recently played tracks yet.</div>`;
      return;
    }
    const resolved = (await Promise.all(ids.map(id => getTrack(id)))).filter((t): t is Track => !!t);
    if (!resolved.length) {
      trackList.innerHTML = `<div style="padding:32px 16px;text-align:center;color:var(--text-muted)">No recently played tracks yet.</div>`;
      return;
    }
    const rows = resolved.map((track, index) => `<div class="track-row" data-track-id="${esc(track.id)}" data-recent-index="${index}">
      <span class="num">${index + 1}</span>
      ${track.cover ? `<div class="track-cover-mini" style="background-image:url('${esc(track.cover)}');background-size:cover;background-position:center"></div>` : `<div class="track-cover-mini cover-default" data-artwork-id="${esc(track.id)}">♪</div>`}
      <div style="flex:1;min-width:0"><div class="t-title">${esc(track.title)}</div><div class="t-artist">${esc(track.artist)} • ${esc(track.album)}</div></div>
      <span class="t-dur">${fmtDur(track.duration)}</span>
      <button class="btn small ghost" data-add-track="${esc(track.id)}" title="Add to current playlist">+</button>
    </div>`).join("");
    trackList.innerHTML = `<div class="virtual-list-space" style="position:relative">${rows}</div>`;
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
        const index = Number(row.dataset.recentIndex || 0);
        if (invoke && resolved.length) {
          await invoke("replace_playlist_tracks", { playlistId: currentPlaylistId, trackIds: resolved.map(t => t.id) });
          busEmit("melo:playlist-changed", { playlistId: currentPlaylistId });
        }
        busEmit("melo:play-tracks", { tracks: resolved, index });
      };
    });
    bindLazyArtwork(trackList);
  }

  // -----------------------------------------------------------------------
  // Embedded Playlist (optional, skin-provided slot)
  //
  // A deliberately lightweight, non-virtualized view of the current
  // playlist meant to live inside a skin's own layout (see skins/README.md
  // "embedded-playlist" hook). It intentionally does NOT include the
  // standalone Playlist window's search box, sort control, drag-reorder,
  // per-row remove button, or M3U export — those add real interactive/
  // rendering weight that isn't worth it for a compact, glanceable, skin-
  // embedded view. It reuses the same "playlist_tracks" backend query as
  // the standalone window, capped to a fixed batch since an embedded skin
  // panel is not the place for scrolling through a 5,000-track playlist.
  // -----------------------------------------------------------------------
  const EMBEDDED_PLAYLIST_LIMIT = 150;
  const embeddedPlaylistContainer = document.createElement("div");
  embeddedPlaylistContainer.className = "embedded-playlist embedded-playlist-mini";

  function embeddedPlaylistShowCover(): boolean {
    return localStorage.getItem("melo-pref-embeddedPlaylistCover") !== "0";
  }
  function embeddedPlaylistFontScale(): number {
    const raw = parseInt(localStorage.getItem("melo-pref-embeddedPlaylistFontScale") || "100", 10);
    return Math.min(140, Math.max(70, Number.isFinite(raw) ? raw : 100));
  }

  async function renderEmbeddedPlaylist() {
    // Only do the work (query + render) while the container is actually
    // attached inside a skin's hook — if no active skin declares the
    // embedded-playlist slot, this container just sits detached and idle.
    if (!embeddedPlaylistContainer.isConnected || !invoke) return;
    embeddedPlaylistContainer.style.fontSize = `${embeddedPlaylistFontScale()}%`;
    const page = await invoke<Page<Track>>("playlist_tracks", {
      playlistId: currentPlaylistId,
      search: null,
      sort: "default",
      limit: EMBEDDED_PLAYLIST_LIMIT,
      offset: 0,
    }).catch(() => null);
    if (!page) return;
    const items = page.items.map(normalizeTrack);
    const showCover = embeddedPlaylistShowCover();
    if (!items.length) {
      embeddedPlaylistContainer.innerHTML = `<div class="embedded-playlist-empty">Playlist is empty</div>`;
      return;
    }
    embeddedPlaylistContainer.innerHTML = items.map((track, index) => `
      <div class="embedded-playlist-row ${track.id === currentTrackId ? "active" : ""}" data-ep-track="${esc(track.id)}" data-ep-index="${index}">
        ${showCover ? (track.cover
          ? `<div class="track-cover-mini" style="background-image:url('${esc(track.cover)}');background-size:cover;background-position:center"></div>`
          : `<div class="track-cover-mini cover-default" data-artwork-id="${esc(track.id)}">♪</div>`) : ""}
        <div class="ep-meta"><div class="t-title">${esc(track.title)}</div></div>
      </div>`).join("");
    embeddedPlaylistContainer.querySelectorAll<HTMLElement>("[data-ep-track]").forEach(row => {
      row.onclick = () => {
        busEmit("melo:play-tracks", { tracks: items, index: Number(row.dataset.epIndex || 0) });
      };
    });
    if (showCover) bindLazyArtwork(embeddedPlaylistContainer);
  }

  (window as any).__MELO_EMBEDDED_PLAYLIST__ = {
    container: embeddedPlaylistContainer,
    refresh: renderEmbeddedPlaylist,
  };

  document.querySelectorAll<HTMLElement>("[data-libview]").forEach(btn => {
    btn.onclick = event => {
      event.stopPropagation();
      const next = btn.dataset.libview as LibView;
      if (!LIB_VIEWS.includes(next) || next === libView) return;
      libView = next;
      localStorage.setItem("melo-lib-view", libView);
      syncLibViewButtons();
      renderLibraryVirtual(true);
    };
  });
  syncLibViewButtons();
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
    updateSearchClear();
    librarySearch = searchInput.value.trim();
    window.clearTimeout(libraryScrollTimer);
    libraryScrollTimer = window.setTimeout(() => renderLibraryVirtual(true), 180);
  });
  searchClear?.addEventListener("click", () => {
    if (!searchInput) return;
    searchInput.value = "";
    searchInput.focus();
    updateSearchClear();
    librarySearch = "";
    window.clearTimeout(libraryScrollTimer);
    renderLibraryVirtual(true);
  });
  trackList?.addEventListener("scroll", () => {
    if (libTab === "artists" && selectedArtist) return;
    window.clearTimeout(libraryScrollTimer);
    libraryScrollTimer = window.setTimeout(() => renderLibraryVirtual(), 60);
  });
  playlistList?.addEventListener("scroll", () => {
    window.clearTimeout(playlistScrollTimer);
    playlistScrollTimer = window.setTimeout(() => renderPlaylistVirtual(), 60);
  });
  playlistSearch?.addEventListener("input", () => {
    updatePlaylistSearchClear();
    window.clearTimeout(playlistScrollTimer);
    playlistScrollTimer = window.setTimeout(() => renderPlaylistVirtual(true), 180);
  });
  playlistSearchClear?.addEventListener("click", () => {
    if (!playlistSearch) return;
    playlistSearch.value = "";
    playlistSearch.focus();
    updatePlaylistSearchClear();
    window.clearTimeout(playlistScrollTimer);
    clearPlaylistSelection();
    renderPlaylistVirtual(true);
  });
  playlistSort?.addEventListener("change", () => { clearPlaylistSelection(); renderPlaylistVirtual(true); });
  playlistSelect?.addEventListener("change", () => {
    currentPlaylistId = playlistSelect.value;
    localStorage.setItem("melo-currentPlaylist", currentPlaylistId);
    clearPlaylistSelection();
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
    renderEmbeddedPlaylist();
  });

  // Keep the "now playing" row highlighted in the Playlist window.
  busOn("melo:track-changed", (t: any) => {
    setActiveTrack(t?.id || null);
    if (t?.id) recordRecentlyPlayed(t.id);
    embeddedPlaylistContainer.querySelectorAll<HTMLElement>("[data-ep-track]").forEach(row => {
      row.classList.toggle("active", row.dataset.epTrack === (t?.id || null));
    });
  });
  busOn("melo:playback-state", (s: any) => setActiveTrack(s?.track?.id || null));

  // When this window (re)opens, restore the active-track highlight from the
  // player's current state instead of waiting for the next track change.
  try {
    const saved = JSON.parse(localStorage.getItem("melo-current-track") || "null");
    if (saved?.id) setActiveTrack(saved.id);
  } catch {}
  busEmit("melo:request-playback-state");
  setTimeout(() => busEmit("melo:request-playback-state"), 250);

  function getCurrentPlaylistId(): string {
    return currentPlaylistId;
  }

  async function getPlaylistTracksAll(playlistId: string): Promise<Track[]> {
    if (!invoke || !playlistId) return [];
    try {
      // playlist_tracks joins on playlist membership, not library_owned, so
      // this correctly includes tracks that only live inside a playlist
      // and were never scanned into the Library.
      const page = await invoke<Page<Track>>("playlist_tracks", {
        playlistId,
        search: null,
        sort: "default",
        limit: 20000,
        offset: 0,
      });
      return page.items.map(normalizeTrack);
    } catch {
      return [];
    }
  }

  async function getAllTracks(): Promise<Track[]> {
    if (!invoke) return [];
    try {
      const page = await invoke<Page<Track>>("library_tracks", {
        search: null,
        artist: null,
        album: null,
        genre: null,
        sort: "title-asc",
        limit: 20000,
        offset: 0,
      });
      return page.items.map(normalizeTrack);
    } catch {
      return [];
    }
  }

  (window as any).LumiLibrary = {
    get tracks() { return recentTracks; },
    get playlists() { return playlists; },
    scanFolder,
    importPaths,
    getTrack,
    getCurrentPlaylistId,
    getPlaylistTracksAll,
    getAllTracks,
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
