import type { Track } from "./types";
import { busEmit, busOn, isTauri } from "./bus";

const role = new URLSearchParams(location.search).get("panel") || "main";

type Page<T> = { items: T[]; total: number; limit: number; offset: number };
type GroupRow = { key: string; name: string; subtitle: string; count: number; cover?: string; artworkTrackId?: string };
type PlaylistRow = { id: string; name: string; createdAt: number; trackCount: number; kind: "manual" | "auto" };
type LibraryRoot = { path: string; addedAt: number };
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
  const librarySearchFieldSelect = document.getElementById("librarySearchField") as HTMLSelectElement | null;
  const searchClear = document.getElementById("searchClear") as HTMLButtonElement | null;
  const tabs = document.getElementById("libraryTabs");
  const artistModePicker = document.getElementById("libraryArtistMode");
  const artistModeButton = document.getElementById("libraryArtistModeButton") as HTMLButtonElement | null;
  const artistModeArrowButton = document.getElementById("libraryArtistModeArrow") as HTMLButtonElement | null;
  const artistModeLabel = document.getElementById("libraryArtistModeLabel");
  const artistModeMenu = document.getElementById("libraryArtistModeMenu");
  // One entry point for roots, scan progress and Clear Library.
  const manageButton = document.getElementById("btn-manage-library") as HTMLButtonElement | null;

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
  // The playback QUEUE is separate from playlists: it is addressed through
  // This pseudo-ID everywhere a "current playlist" is expected. Installs
  // Start with ZERO real playlists.
  const QUEUE_ID = "__queue__";
  let currentPlaylistId = localStorage.getItem("melo-currentPlaylist") || QUEUE_ID;
  // Monotonic revision for the cross-window active-playlist sync: a later
  // Decision always beats an earlier one, so a LATE stale event can never
  // Overwrite a newer local selection. Updated on every local switch we
  // Broadcast and on every remote decision we apply.
  let playlistSyncRev = 0;
  let playlists: PlaylistRow[] = [];
  let activeScanId: string | null = null;
  let ownedScanId: string | null = null;
  // Guards the explicit orphan-data cleanup against double-triggering.
  let cleanupRunning = false;
  let libraryRoots: LibraryRoot[] = [];
  let manageOverlay: HTMLElement | null = null;
  let scanProgress: { done: number; total: number; errors: number; removed?: number; phase?: string } | null = null;
  // The backend reports the FAILED PATHS with each progress tick; Manage
  // Shows the latest ones and the final toast names the first few.
  const SCAN_ERROR_LIST_CAP = 50;
  let scanErrorPaths: string[] = [];
  let scanErrorCount = 0; // survives completion (scanProgress is nulled)
  // The completed scan stays visible as a banner at the BOTTOM of Manage
  // Until dismissed — a transient toast was too easy to miss.
  let scanResultSummary: { text: string; ok: boolean } | null = null;
  // A playlist row is an occurrence, not merely a track id — duplicate
  // Entries stay independently selectable and reorderable.

  const LIBRARY_NAVIGATION_KEY = "melo-library-navigation";
  const LIBRARY_ARTIST_MODE_KEY = "melo-library-artist-mode";
  let savedArtistMode: "artists" | "album-artists" = localStorage.getItem(LIBRARY_ARTIST_MODE_KEY) === "artists" ? "artists" : "album-artists";
  type LibraryNavigation = {
    tab: "artists" | "album-artists" | "albums" | "genres" | "playlists";
    artist: string | null;
    album: string | null;
    genre: string | null;
    playlist: string | null;
    scrollTop?: number;
  };
  function readLibraryNavigation(): LibraryNavigation | null {
    try {
      const value = JSON.parse(localStorage.getItem(LIBRARY_NAVIGATION_KEY) || "null");
      if (!value || !["artists", "album-artists", "albums", "genres", "playlists"].includes(value.tab)) return null;
      return {
        tab: value.tab,
        artist: typeof value.artist === "string" ? value.artist : null,
        album: typeof value.album === "string" ? value.album : null,
        genre: typeof value.genre === "string" ? value.genre : null,
        playlist: typeof value.playlist === "string" ? value.playlist : null,
        scrollTop: Number.isFinite(Number(value.scrollTop)) ? Math.max(0, Number(value.scrollTop)) : 0,
      };
    } catch {
      return null;
    }
  }
  const initialLibraryNavigation = readLibraryNavigation();
  let libTab: "artists" | "album-artists" | "albums" | "genres" | "playlists" = initialLibraryNavigation?.tab || savedArtistMode;
  let selectedArtist: string | null = initialLibraryNavigation?.artist || null;
  let selectedAlbum: string | null = initialLibraryNavigation?.album || null;
  let selectedGenre: string | null = initialLibraryNavigation?.genre || null;
  let librarySearch = "";
  // Which column the free-text search matches: "all" (default) | "artist"
  // | "album" | "title".
  let librarySearchField: "all" | "artist" | "album" | "title" = "all";
  let currentTrackId: string | null = null;
  let selectedLibraryPlaylistId: string | null = initialLibraryNavigation?.playlist || null;

  const playlistRowHeight = 52;
  // Compact playlist view: same virtual list, shorter rows — toggled from
  // The playlist toolbar and persisted like the Library's view preference.
  const playlistRowHeightCompact = 36;
  let playlistView: "normal" | "compact" = localStorage.getItem("melo-playlist-view") === "compact" ? "compact" : "normal";
  // Search queries shorter than this never reach the backend: a single
  // Character triggers a full LIKE scan for little value — the view stays
  // Unfiltered until the second character is typed.
  const MIN_SEARCH_LEN = 2;
  type LibView = "details" | "compact" | "tiles";
  const LIB_VIEWS: LibView[] = ["details", "compact", "tiles"];
  let libView: LibView = ((): LibView => {
    const saved = localStorage.getItem("melo-lib-view") || "details";
    if (saved === "mosaic") return "tiles";
    return (LIB_VIEWS as string[]).includes(saved) ? saved as LibView : "details";
  })();
  // Track-display layout: "list" is the classic rows view; "albums" groups the
  // tracks into album sheets (180×180 cover + two-column track list). It only
  // applies to Details/Tiles and only where TRACKS are shown (artist/album/
  // genre drill-ins and search results) — never to the root group tabs.
  type LibLayout = "list" | "albums";
  let libLayout: LibLayout = localStorage.getItem("melo-lib-layout") === "albums" ? "albums" : "list";
  const SHEET_TRACK_LIMIT = 5000;
  function isLibraryTrackDisplay(): boolean {
    if (libTab === "playlists") return false;
    return libraryMode() === "tracks" || !!librarySearch || ((libTab === "artists" || libTab === "album-artists") && !!selectedArtist);
  }
  function sheetModeActive(): boolean {
    return libLayout === "albums" && libView !== "compact" && isLibraryTrackDisplay();
  }
  function libraryRowHeight(): number {
    if (libView === "compact") return 36;
    if (libView === "tiles" && libraryMode() === "groups") return 148;
    return 54;
  }
  let libraryRequest = 0;
  // The row window the virtual list currently holds in the DOM. Scrolling
  // only goes back to the backend when the visible rows approach its edge
  // (see libraryWindowCovers) — every scroll tick used to refetch and rebuild
  // the whole list, re-decoding every cover each time.
  type LibraryWindow = {
    sig: string;
    startRow: number;
    endRow: number;
    totalRows: number;
    headerHeight: number;
    rowH: number;
    columns: number;
    card: boolean;
  };
  let libraryWindow: LibraryWindow | null = null;
  // Bumped by every invalidation so a render that was already in flight
  // when the data changed cannot register its (stale) window afterwards.
  let libraryWindowGen = 0;
  function invalidateLibraryWindow() {
    libraryWindow = null;
    libraryWindowGen++;
  }
  // Scroll position of the groups list right before drilling in, so "Back"
  // Restores the user to where they were.
  let savedGroupsScrollTop = 0;
  // Last rendered column count, so the ResizeObserver re-renders only when
  // The count actually changes (not per pixel of a resize drag).
  let lastLibraryColumns = 1;
  let playlistRequest = 0;
  // Each interaction (search debounce, scroll render, resize reflow) owns
  // Its own timer id — a shared one let them cancel each other's pending
  // Renders.
  let librarySearchTimer = 0;
  let libraryScrollTimer = 0;
  let libraryResizeTimer = 0;
  let playlistSearchTimer = 0;
  let playlistScrollTimer = 0;
  let contextTrackId: string | null = null;
  type ContextLibraryGroup = { artist: string; albumArtist?: string; album?: string; name: string; count: number };
  let contextLibraryGroup: ContextLibraryGroup | null = null;
  const libraryContextMenu = document.createElement("div");
  libraryContextMenu.className = "ctx-menu";
  libraryContextMenu.style.display = "none";
  libraryContextMenu.innerHTML = `
    <button class="ctx-item" id="ctxOpenTrackFolder">Open containing folder</button>
    <button class="ctx-item danger" id="ctxRemoveLibraryTrack">Remove from Library</button>
    <button class="ctx-item danger" id="ctxRemoveLibraryGroup">Remove from Library</button>`;
  document.body.appendChild(libraryContextMenu);
  // Playlist management menu: rename / duplicate / remove missing files /
  // Delete, targeting the ACTIVE playlist; hidden entirely while the queue
  // Pseudo-playlist is selected.
  const playlistContextMenu = document.createElement("div");
  playlistContextMenu.className = "ctx-menu";
  playlistContextMenu.style.display = "none";
  playlistContextMenu.setAttribute("role", "menu");
  playlistContextMenu.innerHTML = `
    <div class="pl-ctx-title" style="padding:6px 10px 4px; font-size:11px; color:var(--text-muted); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width:240px;"></div>
    <button class="ctx-item" id="plCtxRename" role="menuitem">Rename…</button>
    <button class="ctx-item" id="plCtxDuplicate" role="menuitem">Duplicate</button>
    <button class="ctx-item" id="plCtxSweep" role="menuitem">Remove missing files…</button>
    <div style="height:1px; margin:4px 6px; background:var(--card-border);"></div>
    <button class="ctx-item danger" id="plCtxDelete" role="menuitem">Delete playlist…</button>`;
  document.body.appendChild(playlistContextMenu);
  const contextOpenFolder = libraryContextMenu.querySelector<HTMLButtonElement>("#ctxOpenTrackFolder")!;
  const contextRemoveTrack = libraryContextMenu.querySelector<HTMLButtonElement>("#ctxRemoveLibraryTrack")!;
  const contextRemoveGroup = libraryContextMenu.querySelector<HTMLButtonElement>("#ctxRemoveLibraryGroup")!;
  document.addEventListener("click", event => {
    if (!(event.target as HTMLElement).closest(".ctx-menu")) {
      libraryContextMenu.style.display = "none";
      playlistContextMenu.style.display = "none";
    }
  });

  function positionLibraryContextMenu(event: MouseEvent) {
    libraryContextMenu.style.display = "block";
    const rect = libraryContextMenu.getBoundingClientRect();
    libraryContextMenu.style.left = `${Math.max(6, Math.min(event.clientX, window.innerWidth - rect.width - 6))}px`;
    libraryContextMenu.style.top = `${Math.max(6, Math.min(event.clientY, window.innerHeight - rect.height - 6))}px`;
  }
  function showTrackContextMenu(event: MouseEvent, id: string) {
    contextTrackId = id;
    contextLibraryGroup = null;
    contextOpenFolder.hidden = false;
    contextRemoveTrack.hidden = false;
    contextRemoveGroup.hidden = true;
    positionLibraryContextMenu(event);
  }
  function showGroupContextMenu(event: MouseEvent, group: ContextLibraryGroup) {
    contextTrackId = null;
    contextLibraryGroup = group;
    contextOpenFolder.hidden = true;
    contextRemoveTrack.hidden = true;
    contextRemoveGroup.hidden = false;
    contextRemoveGroup.textContent = `Remove ${group.album ? "Album" : group.albumArtist ? "Album Artist" : "Artist"} from Library`;
    positionLibraryContextMenu(event);
  }

  // Destructive removal deletes the DB record and its foreign-key
  // Playlist/queue references; audio files on disk are never touched. A
  // Scan treats a renamed/moved path as a deletion plus a new Track.
  //
  // Product policy: "Remove from Library" is GLOBAL — the track leaves
  // Every playlist (playlists reference Track records, not paths). This
  // Differs BY DESIGN from Clear Library / root removal, which are soft
  // (library_owned=0) and keep playlist membership. The confirmation
  // Wording discloses the playlist impact; that disclosure is the safety
  // Mechanism.
  function confirmRemoveFromLibrary(count: number, subject?: string): Promise<boolean> {
    return new Promise(resolve => {
      const overlay = document.createElement("div");
      overlay.className = "confirm-overlay";
      const noun = subject || (count === 1 ? "this track" : `these ${count} tracks`);
      const title = subject ? `Remove ${subject} from Library?` : "Remove from Library?";
      overlay.innerHTML = `<div class="confirm-dialog" role="dialog" aria-modal="true" aria-labelledby="removeTracksTitle">
        <div id="removeTracksTitle" class="confirm-title">${esc(title)}</div>
        <div class="confirm-message">${esc(noun.charAt(0).toUpperCase() + noun.slice(1))} will be removed from the Library database and from any playlist that contains ${count === 1 ? "it" : "these tracks"}. The audio file(s) on disk are not affected.</div>
        <div class="confirm-actions"><button class="btn small" data-confirm="cancel">Cancel</button><button class="btn small danger-confirm" data-confirm="yes">Remove</button></div>
      </div>`;
      document.body.appendChild(overlay);
      const finish = (answer: boolean) => { document.removeEventListener("keydown", onKey); overlay.remove(); resolve(answer); };
      overlay.querySelector<HTMLElement>("[data-confirm='cancel']")!.onclick = () => finish(false);
      overlay.querySelector<HTMLElement>("[data-confirm='yes']")!.onclick = () => finish(true);
      overlay.onclick = event => { if (event.target === overlay) finish(false); };
      const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") finish(false); };
      document.addEventListener("keydown", onKey);
    });
  }

  contextOpenFolder.onclick = async event => {
    event.stopPropagation();
    libraryContextMenu.style.display = "none";
    const id = contextTrackId;
    contextTrackId = null;
    if (!invoke || !id) return;
    try { await invoke("open_track_folder", { id }); }
    catch (e) { toast("Couldn't open the track folder — " + String(e)); }
  };
  contextRemoveTrack.onclick = async event => {
    event.stopPropagation();
    libraryContextMenu.style.display = "none";
    const id = contextTrackId;
    contextTrackId = null;
    if (!invoke || !id || !await confirmRemoveFromLibrary(1)) return;
    try { await invoke("delete_tracks", { ids: [id] }); }
    catch (e) { toast("Couldn't remove the track — " + String(e)); return; }
    busEmit("melo:library-changed", { removed: 1 });
  };
  contextRemoveGroup.onclick = async event => {
    event.stopPropagation();
    libraryContextMenu.style.display = "none";
    const group = contextLibraryGroup;
    contextLibraryGroup = null;
    if (!invoke || !group || !await confirmRemoveFromLibrary(group.count, group.name)) return;
    try {
      const removed = await invoke<number>("delete_library_group", { artist: group.artist, albumArtist: group.albumArtist || null, album: group.album || null });
      busEmit("melo:library-changed", { removed });
    } catch (e) { toast("Couldn't remove the library group — " + String(e)); }
  };

  // ---------------------------------------------------------------------
  // Multi-select (Ctrl+click toggles one, Shift+click selects a range) +
  // Bulk actions for the Library track list and the Playlist. A plain
  // Click always clears the selection and performs the normal single-item
  // Action — multi-select only starts via Ctrl or Shift.
  // ---------------------------------------------------------------------
  const librarySelectedIds = new Set<string>();
  let libraryAnchorIndex: number | null = null;
  const playlistSelectedEntryIds = new Set<string>();
  let playlistAnchorIndex: number | null = null;

  // Shift-range selection uses ABSOLUTE result-set indices (page.offset +
  // Position), not page-local row indices, so the selected range stays
  // Semantically correct after scrolling swaps the rendered slice. Only
  // Rendered rows are in the map, so distant parts of a huge range still
  // Require scrolling through them — intentional.
  function applySelectionRange(
    selected: Set<string>,
    id: string,
    absIndex: number,
    idByAbsIndex: Map<number, string>,
    anchor: number | null,
    event: MouseEvent
  ): number | null {
    if (event.shiftKey && anchor !== null) {
      const from = Math.min(anchor, absIndex);
      const to = Math.max(anchor, absIndex);
      idByAbsIndex.forEach((rid, idx) => {
        if (idx >= from && idx <= to) selected.add(rid);
      });
      return anchor;
    }
    if (selected.has(id)) selected.delete(id);
    else selected.add(id);
    return absIndex;
  }

  function createBulkBar(actions: { label: string; danger?: boolean; onClick: () => void }[]) {
    const bar = document.createElement("div");
    bar.className = "bulk-action-bar";
    bar.style.display = "none";
    const countEl = document.createElement("span");
    countEl.className = "bulk-count";
    bar.appendChild(countEl);
    let actionBtn: HTMLButtonElement | null = null;
    for (const action of actions) {
      const btn = document.createElement("button");
      btn.className = `btn small ${action.danger ? "danger" : ""}`;
      btn.textContent = action.label;
      btn.onclick = action.onClick;
      bar.appendChild(btn);
      if (!actionBtn) actionBtn = btn;
    }
    const clearBtn = document.createElement("button");
    clearBtn.className = "btn small ghost";
    clearBtn.textContent = "Clear";
    bar.appendChild(clearBtn);
    document.body.appendChild(bar);
    return { bar, countEl, clearBtn, actionBtn: actionBtn as HTMLButtonElement };
  }

  const libraryBulk = createBulkBar([
    {
      label: "Add to Playlist",
      onClick: async () => {
        if (!invoke || !librarySelectedIds.size) return;
        if (currentPlaylistId === QUEUE_ID) {
          toast("Select a playlist in the Playlist window first — the play queue takes tracks via Play, not Add");
          return;
        }
        if (playlists.find(p => p.id === currentPlaylistId)?.kind === "auto") {
          toast("Automatic playlists are read-only");
          return;
        }
        try {
          await invoke("add_tracks_to_playlist", { playlistId: currentPlaylistId, trackIds: Array.from(librarySelectedIds) });
        } catch (e) {
          toast(`Couldn't add tracks to the playlist — ${String(e)}`);
          return;
        }
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
        if (!await confirmRemoveFromLibrary(ids.length)) return;
        try {
          await invoke("delete_tracks", { ids });
        } catch (e) {
          toast(`Couldn't remove track(s) from Library — ${String(e)}`);
          return;
        }
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
        if (!invoke || !playlistSelectedEntryIds.size) return;
        const ids = Array.from(playlistSelectedEntryIds);
        if (playlists.find(p => p.id === currentPlaylistId)?.kind === "auto") {
          toast("Automatic playlists are read-only");
          return;
        }
        // In the QUEUE view the selection removes QUEUE ENTRIES instead: one bulk
        // Command + the two broadcasts the player already consumes.
        if (currentPlaylistId === QUEUE_ID) {
          try {
            const rows = await invoke<Array<{ entryId: number; trackId: string }>>("remove_queue_entries", { entryIds: ids.map(Number) });
            busEmit("melo:queue-reordered", { order: rows.map(r => String(r.entryId)), tracks: rows.map(r => r.trackId) });
            busEmit("melo:queue-entries-removed", { entryIds: ids.map(Number) });
            busEmit("melo:queue-changed", {});
          } catch (e) {
            toast(`Couldn't remove the selected tracks from the queue — ${String(e)}`);
            return;
          }
          playlistSelectedEntryIds.clear();
          updatePlaylistSelectionUI();
          await renderPlaylistVirtual(false);
          return;
        }
        // One transactional bulk command — a per-track loop meant N IPC
        // Round-trips and a real chance of PARTIAL removal on mid-loop failure.
        try {
          await invoke("remove_playlist_entries", { playlistId: currentPlaylistId, entryIds: ids.map(Number) });
        } catch (e) {
          toast(`Couldn't remove the selected tracks — ${String(e)}`);
          return;
        }
        playlistSelectedEntryIds.clear();
        updatePlaylistSelectionUI();
        busEmit("melo:playlist-changed", { playlistId: currentPlaylistId });
      },
    },
  ]);
  playlistBulk.clearBtn.onclick = () => {
    playlistSelectedEntryIds.clear();
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
    playlistList.querySelectorAll<HTMLElement>("[data-pl-entry]").forEach(row => {
      const selected = playlistSelectedEntryIds.has(row.dataset.plEntry || "");
      row.classList.toggle("row-selected", selected);
      // Keep the ARIA state in lockstep with the visual one.
      row.setAttribute("aria-selected", selected ? "true" : "false");
    });
    // The bulk bar works for the QUEUE view too.
    playlistBulk.bar.style.display = playlistSelectedEntryIds.size ? "flex" : "none";
    playlistBulk.actionBtn.textContent = currentPlaylistId === QUEUE_ID ? "Remove from Queue" : "Remove from Playlist";
    playlistBulk.countEl.textContent = `${playlistSelectedEntryIds.size} selected`;
  }

  function clearLibrarySelection() {
    if (!librarySelectedIds.size) return;
    librarySelectedIds.clear();
    libraryAnchorIndex = null;
    updateLibrarySelectionUI();
  }
  function clearPlaylistSelection() {
    if (!playlistSelectedEntryIds.size) return;
    playlistSelectedEntryIds.clear();
    playlistAnchorIndex = null;
    updatePlaylistSelectionUI();
  }

  function confirmLibraryClear(): Promise<boolean> {
    return new Promise(resolve => {
      const overlay = document.createElement("div");
      // Opened FROM the Manage dialog: without the stacking class (z 10000 vs
      // Manage 10001) it rendered BEHIND the Manage window.
      overlay.className = "confirm-overlay inside-manage";
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

  // In-app replacement for the native alert() dialog — same confirm-overlay
  // Styling as the other dialogs.
  function showAlertDialog(title: string, message: string, okLabel = "OK"): Promise<void> {
    return new Promise(resolve => {
      const overlay = document.createElement("div");
      overlay.className = "confirm-overlay";
      overlay.innerHTML = `<div class="confirm-dialog" role="alertdialog" aria-modal="true" aria-labelledby="alertDialogTitle">
        <div id="alertDialogTitle" class="confirm-title">${esc(title)}</div>
        <div class="confirm-message">${esc(message)}</div>
        <div class="confirm-actions"><button class="btn small" data-confirm="ok">${esc(okLabel)}</button></div>
      </div>`;
      document.body.appendChild(overlay);
      const finish = () => { document.removeEventListener("keydown", onKey); overlay.remove(); resolve(); };
      overlay.querySelector<HTMLElement>("[data-confirm='ok']")!.onclick = finish;
      overlay.onclick = event => { if (event.target === overlay) finish(); };
      const onKey = (event: KeyboardEvent) => {
        if (event.key === "Escape" || event.key === "Enter") { finish(); }
      };
      document.addEventListener("keydown", onKey);
      overlay.querySelector<HTMLElement>("[data-confirm='ok']")!.focus();
    });
  }

  // Generic destructive-action confirmation (playlist clear/delete/sweep),
  // Same confirm-overlay styling.
  function confirmDanger(title: string, message: string, okLabel: string, insideManage = false): Promise<boolean> {
    return new Promise(resolve => {
      const overlay = document.createElement("div");
      overlay.className = insideManage ? "confirm-overlay inside-manage" : "confirm-overlay";
      overlay.innerHTML = `<div class="confirm-dialog" role="dialog" aria-modal="true" aria-labelledby="confirmDangerTitle">
        <div id="confirmDangerTitle" class="confirm-title">${esc(title)}</div>
        <div class="confirm-message">${esc(message)}</div>
        <div class="confirm-actions"><button class="btn small" data-confirm="cancel">Cancel</button><button class="btn small danger-confirm" data-confirm="yes">${esc(okLabel)}</button></div>
      </div>`;
      document.body.appendChild(overlay);
      const finish = (answer: boolean) => { document.removeEventListener("keydown", onKey); overlay.remove(); resolve(answer); };
      overlay.querySelector<HTMLElement>("[data-confirm='cancel']")!.onclick = () => finish(false);
      overlay.querySelector<HTMLElement>("[data-confirm='yes']")!.onclick = () => finish(true);
      overlay.onclick = event => { if (event.target === overlay) finish(false); };
      const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") finish(false); };
      document.addEventListener("keydown", onKey);
      overlay.querySelector<HTMLElement>("[data-confirm='cancel']")!.focus();
    });
  }

  // In-app replacement for the native prompt() dialog: resolves null on
  // Cancel/Escape, or the trimmed text on submit — Enter submits, as users
  // Expect from a single-line prompt.
  function showPromptDialog(title: string, message: string, defaultValue = "", okLabel = "Create"): Promise<string | null> {
    return new Promise(resolve => {
      const overlay = document.createElement("div");
      overlay.className = "confirm-overlay";
      overlay.innerHTML = `<div class="confirm-dialog" role="dialog" aria-modal="true" aria-labelledby="promptDialogTitle">
        <div id="promptDialogTitle" class="confirm-title">${esc(title)}</div>
        <div class="confirm-message">${esc(message)}</div>
        <input class="confirm-input" type="text" />
        <div class="confirm-actions"><button class="btn small" data-confirm="cancel">Cancel</button><button class="btn small primary" data-confirm="ok">${esc(okLabel)}</button></div>
      </div>`;
      document.body.appendChild(overlay);
      const input = overlay.querySelector<HTMLInputElement>(".confirm-input")!;
      input.value = defaultValue;
      const finish = (value: string | null) => { document.removeEventListener("keydown", onKey); overlay.remove(); resolve(value); };
      overlay.querySelector<HTMLElement>("[data-confirm='cancel']")!.onclick = () => finish(null);
      overlay.querySelector<HTMLElement>("[data-confirm='ok']")!.onclick = () => finish(input.value.trim() || null);
      overlay.onclick = event => { if (event.target === overlay) finish(null); };
      const onKey = (event: KeyboardEvent) => {
        if (event.key === "Escape") finish(null);
        else if (event.key === "Enter") finish(input.value.trim() || null);
      };
      document.addEventListener("keydown", onKey);
      input.focus();
      input.select();
    });
  }

  function setManageLabel(text = "Manage") {
    const label = manageButton?.querySelector<HTMLElement>(".manage-label");
    if (label) label.textContent = text;
  }

  function scanStatusText() {
    if (!activeScanId || !scanProgress) return "Ready to scan the configured folders.";
    const { done, total, errors } = scanProgress;
    // Enumeration phase: the backend walks first and only then ingests, so
    // Show a dedicated line instead of 0/0.
    if (scanProgress.phase === "count") return "Counting files…";
    const errorText = errors ? ` · ${errors} error${errors === 1 ? "" : "s"}${scanErrorPaths.length ? " (listed above)" : ""}` : "";
    return `Scanning ${done}/${total || "…"}${errorText}`;
  }

  // Windows' extended-length prefix (\\?\) is an API artifact: show the
  // Clean form to the user, but keep the full canonical path for the
  // Remove action and the tooltip.
  function displayPath(path: string): string {
    // Strip EVERY known prefix variant, repeatedly (older builds stored
    // Single-backslash `\?\` forms and prefixes could stack);
    // `\\?\UNC\server\share` maps back to `\\server\share`.
    let p = path;
    for (;;) {
      if (p.startsWith("\\\\?\\UNC\\")) { p = "\\" + p.slice(8); break; }
      if (p.startsWith("\\\\?\\")) { p = p.slice(4); continue; }
      if (p.startsWith("\\?\\")) { p = p.slice(3); continue; }
      break;
    }
    return p;
  }

  function refreshManageDialog() {
    if (!manageOverlay) return;
    const rootsEl = manageOverlay.querySelector<HTMLElement>("[data-manage-roots]");
    const statusEl = manageOverlay.querySelector<HTMLElement>("[data-manage-scan-status]");
    const scanEl = manageOverlay.querySelector<HTMLButtonElement>("[data-manage-scan]");
    const addEl = manageOverlay.querySelector<HTMLButtonElement>("[data-manage-add]");
    const clearEl = manageOverlay.querySelector<HTMLButtonElement>("[data-manage-clear]");
    const cleanupEl = manageOverlay.querySelector<HTMLButtonElement>("[data-manage-cleanup]");
    const busy = !!activeScanId || cleanupRunning;
    // Show WHICH files failed during the scan, right in Manage.
    const errorsEl = manageOverlay.querySelector<HTMLElement>("[data-manage-errors]");
    if (errorsEl) {
      // the list no longer depends on an ACTIVE scan: the completion banner
      // Says "(listed above)", so the list stays up and leaves together with
      // The banner (its dismiss clears it).
      if (scanErrorPaths.length) {
        // List the paths WITHOUT the \\?\ extended-length prefix.
        const items = scanErrorPaths.slice(0, SCAN_ERROR_LIST_CAP).map(p => `<div class="library-scan-error-row" title="${esc(displayPath(p))}">${esc(displayPath(p))}</div>`).join("");
        errorsEl.innerHTML = `<div class="library-scan-errors-title">Files that couldn't be read (${scanProgress?.errors ?? scanErrorCount ?? scanErrorPaths.length}):</div>${items}`;
        errorsEl.style.display = "block";
      } else {
        errorsEl.innerHTML = "";
        errorsEl.style.display = "none";
      }
    }
    const resultEl = manageOverlay.querySelector<HTMLElement>("[data-manage-scan-result]");
    if (resultEl) {
      // Show the completed-scan summary until dismissed.
      const textEl = resultEl.querySelector<HTMLElement>("[data-manage-scan-result-text]");
      if (textEl) textEl.textContent = scanResultSummary?.text || "";
      resultEl.hidden = !scanResultSummary;
      resultEl.classList.toggle("error", scanResultSummary?.ok === false);
      resultEl.querySelector<HTMLElement>("[data-manage-scan-dismiss]")!.onclick = () => {
        scanResultSummary = null;
        resultEl.hidden = true;
        // The "(listed above)" list leaves WITH the banner.
        scanErrorPaths = []; scanErrorCount = 0;
        refreshManageDialog();
      };
    }
    if (rootsEl) {
      rootsEl.innerHTML = libraryRoots.length
        ? libraryRoots.map(root => `<div class="library-root-row"><span class="library-root-path" title="${esc(displayPath(root.path))}">${esc(displayPath(root.path))}</span><button type="button" class="btn small ghost root-remove" data-manage-remove="${esc(root.path)}" ${busy ? "disabled" : ""} aria-label="Remove folder" title="Remove this folder">×</button></div>`).join("")
        : `<div class="library-roots-empty">No music folders added yet.</div>`;
      rootsEl.querySelectorAll<HTMLButtonElement>("[data-manage-remove]").forEach(button => {
        button.onclick = async () => {
          if (!invoke || activeScanId) return;
          const path = button.dataset.manageRemove || "";
          try {
            libraryRoots = await invoke<LibraryRoot[]>("remove_library_root", { path });
            refreshManageDialog();
            await Promise.all([refreshStats(), renderLibraryVirtual(true)]);
            busEmit("melo:library-roots-changed", {});
            busEmit("melo:library-changed", { rootRemoved: path });
          } catch (e) { toast("Couldn't remove the music folder — " + String(e)); }
        };
      });
    }
    if (statusEl) statusEl.textContent = scanStatusText();
    if (scanEl) { scanEl.disabled = !busy && !libraryRoots.length; scanEl.textContent = busy ? "Cancel Scan" : "Scan Folders"; }
    if (addEl) addEl.disabled = busy;
    if (clearEl) clearEl.disabled = busy;
    if (cleanupEl) {
      cleanupEl.disabled = busy;
      cleanupEl.onclick = async () => {
        if (!invoke || activeScanId || cleanupRunning) return;
        cleanupRunning = true;
        refreshManageDialog();
        try {
          const res = await invoke<{ tracksRemoved: number; artworkRemoved: number }>("cleanup_orphan_data");
          toast(`Cleanup done — removed ${res.tracksRemoved} unused track record(s) and ${res.artworkRemoved} orphaned artwork file(s)`);
        } catch (e) {
          toast("Couldn't clean up unused data — " + String(e));
        } finally {
          cleanupRunning = false;
          refreshManageDialog();
        }
      };
    }
  }

  function closeManageDialog() { manageOverlay?.remove(); manageOverlay = null; }

  function openManageDialog() {
    if (manageOverlay) { refreshManageDialog(); return; }
    manageOverlay = document.createElement("div");
    manageOverlay.className = "library-manage-overlay";
    manageOverlay.innerHTML = `<section class="library-manage-dialog" role="dialog" aria-modal="true" aria-labelledby="libraryManageTitle">
      <div class="library-manage-head"><div><div id="libraryManageTitle" class="confirm-title">Manage Library</div><div class="library-manage-note">Add the music folders Melo may scan. Folders are read in order with one bounded scan job; drag-and-drop never imports into the Library.</div>
        <div class="library-scan-errors" data-manage-errors style="display:none; max-height:110px; overflow:auto;"></div></div><button class="btn small ghost" type="button" data-manage-close aria-label="Close">×</button></div>
      <div class="library-roots-list" data-manage-roots></div>
      <div class="library-manage-status" data-manage-scan-status></div>
      <div class="library-manage-actions"><button type="button" class="btn small" data-manage-add>Add Folder</button><button type="button" class="btn small primary" data-manage-scan>Scan Folders</button><span></span><button type="button" class="btn small ghost" data-manage-cleanup title="Remove unreferenced imported tracks and orphaned artwork cache files">Clean Up Data</button><button type="button" class="btn small danger-confirm" data-manage-clear>Clear Library</button></div>
          <!-- completed-scan banner: stays at the bottom until confirmed. -->
          <div class="library-scan-result" data-manage-scan-result hidden>
            <span class="library-scan-result-text" data-manage-scan-result-text></span>
            <button type="button" class="btn small" data-manage-scan-dismiss>OK</button>
          </div>
    </section>`;
    document.body.appendChild(manageOverlay);
    manageOverlay.querySelector<HTMLElement>("[data-manage-close]")!.onclick = closeManageDialog;
    manageOverlay.onclick = event => { if (event.target === manageOverlay) closeManageDialog(); };
    manageOverlay.querySelector<HTMLButtonElement>("[data-manage-add]")!.onclick = addLibraryFolders;
    manageOverlay.querySelector<HTMLButtonElement>("[data-manage-scan]")!.onclick = async () => {
      if (!invoke) return;
      if (activeScanId) { await invoke("cancel_library_scan", { scanId: activeScanId }); return; }
      await startManagedScan();
    };
    manageOverlay.querySelector<HTMLButtonElement>("[data-manage-clear]")!.onclick = clearLibrary;
    refreshManageDialog();
  }

  function updateSearchClear() {
    searchClear?.classList.toggle("show", !!searchInput?.value);
  }

  function updatePlaylistSearchClear() {
    playlistSearchClear?.classList.toggle("show", !!playlistSearch?.value);
  }

  // Highlight the row that is currently playing in the Playlist window.
  function applyActiveTrackHighlight() {
    // Library browser: mark the row of the track that is playing right now
    // (flat rows, album sheets, artist discography, Playlists pane).
    trackList?.querySelectorAll<HTMLElement>("[data-track-id], [data-playlist-track]").forEach(row => {
      const id = row.dataset.trackId ?? row.dataset.playlistTrack;
      const playing = !!currentTrackId && id === currentTrackId;
      row.classList.toggle("now-playing", playing);
      if (playing) row.setAttribute("aria-current", "true");
      else row.removeAttribute("aria-current");
    });
    playlistList?.querySelectorAll<HTMLElement>("[data-pl-track]").forEach(row => {
      const active = row.dataset.plTrack === currentTrackId;
      row.classList.toggle("active", active);
      // Expose the playing row to assistive tech too.
      if (active) row.setAttribute("aria-current", "true");
      else row.removeAttribute("aria-current");
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
    const artist = String(track.artist || "Unknown Artist").trim() || "Unknown Artist";
    const albumArtist = String(track.albumArtist || artist).trim() || artist;
    return { ...track, artist, albumArtist, cover: artworkUrl(track.cover), source: "scan" };
  }

  const artworkQueue: Array<{ id: string }> = [];
  const artworkPending = new Set<string>();
  const artworkCache = new Map<string, string>();
  // Bounded LRU (2000 entries ≈ 200 KB of short URL strings) instead of an
  // Unbounded map. JS Maps iterate in insertion order, so delete+set gives
  // O(1) touch and eviction drops the insertion-oldest entry. Eviction only
  // Affects future re-renders: the row re-joins the fetch queue; painted
  // Rows keep their inline style.
  const ARTWORK_CACHE_CAP = 2000;
  function artworkCacheGet(id: string): string | undefined {
    const hit = artworkCache.get(id);
    if (hit !== undefined && artworkCache.size > 1) {
      artworkCache.delete(id);
      artworkCache.set(id, hit);
    }
    return hit;
  }
  function artworkCacheSet(id: string, url: string) {
    artworkCache.delete(id);
    artworkCache.set(id, url);
    while (artworkCache.size > ARTWORK_CACHE_CAP) {
      const oldest = artworkCache.keys().next().value;
      if (oldest === undefined) break;
      artworkCache.delete(oldest);
    }
  }
  const artworkWaiters = new Map<string, Set<HTMLElement>>();
  // Negative cache: a track with NO embedded artwork used to re-issue the
  // Same IPC on every re-render. A bounded-TTL negative entry stops the
  // Repeat storm while still noticing art added mid-session. Errors get a
  // Shorter TTL so transient failures retry sooner.
  const ARTWORK_NEGATIVE_TTL_MS = 5 * 60 * 1000;
  const ARTWORK_ERROR_TTL_MS = 30 * 1000;
  const artworkNegative = new Map<string, { at: number; ttl: number }>();
  function artworkNegativelyCached(id: string): boolean {
    const hit = artworkNegative.get(id);
    if (!hit) return false;
    if (Date.now() - hit.at < hit.ttl) return true;
    artworkNegative.delete(id);
    return false;
  }
  // Also bounded: expiry is lazy (checked on read), so without a cap the
  // Map would grow as fast as art-less tracks scroll into view.
  const ARTWORK_NEGATIVE_CAP = 4000;
  function artworkNegativeSet(id: string, ttl: number) {
    artworkNegative.delete(id);
    artworkNegative.set(id, { at: Date.now(), ttl });
    while (artworkNegative.size > ARTWORK_NEGATIVE_CAP) {
      const oldest = artworkNegative.keys().next().value;
      if (oldest === undefined) break;
      artworkNegative.delete(oldest);
    }
  }
  let artworkWorkers = 0;
  // One IntersectionObserver per scroll root, created lazily and reused
  // Across renders: innerHTML swaps wipe the observed elements, so
  // Disconnect() clears the stale set without re-allocating the observer
  // (and its callback closure) on every render.
  const artworkObservers = new Map<HTMLElement, IntersectionObserver>();

  function paintArtwork(el: HTMLElement, url: string) {
    el.style.backgroundImage = `url("${url.replace(/"/g, "%22")}")`;
    el.style.backgroundSize = "cover";
    el.style.backgroundPosition = "center";
    el.textContent = "";
  }
  function applyArtwork(id: string, url: string) {
    if (!id || !url) return;
    artworkCacheSet(id, url);
    const waiters = artworkWaiters.get(id);
    if (waiters) {
      waiters.forEach(el => { if (el.isConnected) paintArtwork(el, url); });
      artworkWaiters.delete(id);
    }
    document.querySelectorAll<HTMLElement>("[data-artwork-id]").forEach(el => {
      if (el.dataset.artworkId === id) paintArtwork(el, url);
    });
  }
  function resolvedCover(id?: string, cover?: string): string {
    if (cover) return cover;
    return (id && artworkCacheGet(id)) || "";
  }
  function enqueueArtwork(id: string | undefined, element: HTMLElement) {
    if (!id || !invoke) return;
    const cached = artworkCacheGet(id);
    if (cached) {
      paintArtwork(element, cached);
      return;
    }
    if (artworkNegativelyCached(id)) return;
    let waiters = artworkWaiters.get(id);
    if (!waiters) {
      waiters = new Set();
      artworkWaiters.set(id, waiters);
    }
    // Prune detached elements: waiters whose element was replaced by a
    // Virtualized re-render can never be painted, and an art-less track's
    // Waiter set used to grow forever.
    waiters.forEach(el => { if (!el.isConnected) waiters.delete(el); });
    waiters.add(element);
    if (artworkPending.has(id)) return;
    artworkPending.add(id);
    artworkQueue.push({ id });
    pumpArtworkQueue();
  }
  // Drain the queue in BATCHES of 24 through ensure_track_artwork_batch —
  // One IPC round-trip and ONE SQLite connection per batch instead of one
  // Per album, which stalled large Albums tabs for seconds per page.
  const ARTWORK_BATCH = 24;
  function pumpArtworkQueue() {
    while (invoke && artworkWorkers < 2 && artworkQueue.length) {
      const batch = artworkQueue.splice(0, ARTWORK_BATCH);
      const ids = batch.map(item => item.id);
      artworkWorkers++;
      // The command returns a plain array aligned with `ids` (None = no art).
      invoke<(string | null)[]>("ensure_track_artwork_batch", { ids })
        .then(res => {
          const paths = Array.isArray(res) ? res : [];
          ids.forEach((id, i) => {
            const path = paths[i] ?? null;
            if (!path) {
              artworkNegativeSet(id, ARTWORK_NEGATIVE_TTL_MS);
              artworkWaiters.delete(id);
              return;
            }
            applyArtwork(id, artworkUrl(path));
          });
        })
        .catch(() => {
          ids.forEach(id => {
            artworkNegativeSet(id, ARTWORK_ERROR_TTL_MS);
            artworkWaiters.delete(id);
          });
        })
        .finally(() => {
          artworkWorkers--;
          batch.forEach(item => artworkPending.delete(item.id));
          pumpArtworkQueue();
        });
    }
  }
  function bindLazyArtwork(root: HTMLElement) {
    const elements = [...root.querySelectorAll<HTMLElement>("[data-artwork-id]")];
    elements.forEach(el => {
      const cached = el.dataset.artworkId ? artworkCacheGet(el.dataset.artworkId) : undefined;
      if (cached) paintArtwork(el, cached);
    });
    // Elements the renderer already painted from the page data (group rows
    // carry their cover) need no lookup: requesting them cost an IPC round
    // trip + SQLite open + stat per album on every page.
    const pending = elements.filter(el => el.dataset.artworkId && !el.style.backgroundImage && !artworkCache.has(el.dataset.artworkId) && !artworkNegativelyCached(el.dataset.artworkId));
    if (!("IntersectionObserver" in window)) {
      pending.forEach(el => enqueueArtwork(el.dataset.artworkId, el));
      return;
    }
    let observer = artworkObservers.get(root);
    if (!observer) {
      observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          observer!.unobserve(el);
          enqueueArtwork(el.dataset.artworkId, el);
        });
      }, { root, rootMargin: "240px" });
      artworkObservers.set(root, observer);
    } else {
      // Drop observations left from the previous render (their elements were
      // Just wiped by innerHTML) without discarding the observer instance.
      observer.disconnect();
    }
    if (!pending.length) return;
    pending.forEach(el => observer!.observe(el));
    // Drill-in replaces innerHTML before layout; IO can miss the first frame.
    requestAnimationFrame(() => {
      pending.forEach(el => {
        if (!el.isConnected || !el.dataset.artworkId || artworkCache.has(el.dataset.artworkId)) return;
        const r = el.getBoundingClientRect();
        const rr = root.getBoundingClientRect();
        if (r.bottom >= rr.top - 240 && r.top <= rr.bottom + 240) enqueueArtwork(el.dataset.artworkId, el);
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
    await Promise.all([refreshStats(), refreshPlaylists(), refreshLibraryRoots()]);
    await renderLibraryVirtual(true);
    if (initialLibraryNavigation?.scrollTop) {
      await renderLibraryVirtual(false, initialLibraryNavigation.scrollTop);
    }
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

  function persistLibraryNavigation() {
    try {
      localStorage.setItem(LIBRARY_NAVIGATION_KEY, JSON.stringify({
        tab: libTab,
        artist: selectedArtist,
        album: selectedAlbum,
        genre: selectedGenre,
        playlist: selectedLibraryPlaylistId,
        scrollTop: trackList?.scrollTop || 0,
      } satisfies LibraryNavigation));
    } catch {}
  }

  function resetLibrarySelection() {
    selectedArtist = selectedAlbum = selectedGenre = null;
    savedGroupsScrollTop = 0;
    clearLibrarySelection();
    if (trackList) trackList.scrollTop = 0;
  }

  // Artists tab: click an artist → albums with their tracks listed under
  // Each album (no extra drill). Albums/Genres tabs still drill one level
  // Into a flat track list.
  function libraryMode(): "groups" | "tracks" {
    if (libTab === "artists" || libTab === "album-artists") return "groups";
    if (libTab === "albums") return selectedAlbum ? "tracks" : "groups";
    return selectedGenre ? "tracks" : "groups";
  }

  function libraryGroupKind(): "artists" | "album-artists" | "albums" | "genres" {
    return libTab === "playlists" ? "artists" : libTab;
  }

  function libraryCrumb(): string {
    if ((libTab === "artists" || libTab === "album-artists") && selectedArtist) return selectedArtist;
    if (libTab === "albums" && selectedAlbum) return selectedAlbum;
    if (libTab === "genres" && selectedGenre) return selectedGenre;
    return "";
  }

  // The group COUNT (needed for the virtual list's total scroll height)
  // Aggregates the WHOLE tracks table; recomputing it on every scroll render
  // Grew with library size. Cache the per-view total and recompute only
  // When the view identity or the library contents change (see the
  // Invalidation points).
  type GroupsTotalKey = string;
  let groupsTotalCache = new Map<GroupsTotalKey, number>();
  function groupsTotalKey(): GroupsTotalKey {
    return JSON.stringify([
      libTab,
      libView,
      libraryGroupKind(),
      librarySearch || "",
      (libTab === "artists" || libTab === "album-artists") ? selectedArtist : null,
      selectedAlbum,
      selectedGenre,
    ]);
  }
  // Bumped on every invalidation: a fetch that started BEFORE the change must
  // not seed the cache with its (now stale) total when it lands.
  let groupsTotalGeneration = 0;
  function invalidateGroupsTotalCache() {
    groupsTotalCache = new Map();
    groupsTotalGeneration++;
    // The loaded scroll window shows pre-change data too.
    invalidateLibraryWindow();
  }

  async function fetchLibraryPage(offset: number, limit: number): Promise<Page<GroupRow | Track>> {
    if (!invoke) return { items: [], total: 0, limit, offset };
    // While a search query is active the browser switches to a flat TRACK
    // List (title / artist / album all match) — the group headers are
    // Useless when the user is looking for a specific song.
    if (libraryMode() === "groups" && !librarySearch) {
      // The group COUNT aggregates the whole tracks table, so it is requested
      // only when this view has no cached total (first render of the view, or
      // after a library change) — scroll pages skip it entirely.
      const key = groupsTotalKey();
      const generation = groupsTotalGeneration;
      const cached = groupsTotalCache.get(key);
      const page = await invoke<Page<GroupRow>>("library_groups", {
        kind: libraryGroupKind(),
        search: librarySearch || null,
        artist: libTab === "artists" ? selectedArtist : null,
        limit,
        offset,
        includeTotal: cached == null,
      });
      if (cached != null) page.total = cached;
      else if (generation === groupsTotalGeneration) groupsTotalCache.set(key, page.total);
      return page;
    }
    const page = await invoke<Page<Track>>("library_tracks", {
      search: librarySearch || null,
      field: librarySearchField === "all" ? null : librarySearchField,
      // Keep the drill-in scope ACTIVE while searching: dropping the filters
      // Returned library-wide results while the breadcrumb still claimed the
      // Scope. The backend ANDs the search clause with these filters.
      artist: libTab === "artists" ? selectedArtist : null,
      albumArtist: libTab === "album-artists" || libTab === "albums" ? selectedArtist : null,
      album: selectedAlbum,
      genre: selectedGenre,
      sort: "title-asc",
      limit,
      offset,
    });
    page.items = page.items.map(normalizeTrack);
    return page;
  }

  // How many track-row columns fit the current panel width. Only the flat
  // Track list uses multiple columns (grid layout); group rows (artists /
  // Albums / genres) always stay single-column.
  const TWO_COLUMN_THRESHOLD = 600;
  const GRID_GAP = 8;
  function libraryColumns(): number {
    if (!trackList) return 1;
    const width = trackList.clientWidth || 0;
    if (libView === "compact") return 1;
    // Album sheets lay their own two-column track grid out with CSS.
    if (sheetModeActive()) return 1;
    const trackLike = libraryMode() === "tracks" || !!librarySearch || ((libTab === "artists" || libTab === "album-artists") && !!selectedArtist);
    // Threshold consistent across ALL track-like views (flat search results,
    // Artist discography, album drill, genre drill, tiles-view tracks):
    // Single column below 600 px, two columns at 600 px and above.
    if (trackLike) return width >= TWO_COLUMN_THRESHOLD ? 2 : 1;
    if (libView === "tiles") return Math.max(2, Math.min(6, Math.floor((width + GRID_GAP) / 118)));
    // Group rows in Details view use the same 600 px threshold (they used a
    // Near-identical but different computed value before).
    return width >= TWO_COLUMN_THRESHOLD ? 2 : 1;
  }

  // Absolute position of one item of the virtual list (shared by real rows
  // and placeholders so both always land on the same slot).
  function libraryRowPosStyle(rowIdx: number, col: number, columns: number, rowH: number, headerHeight: number): string {
    const top = headerHeight + rowIdx * rowH;
    if (columns > 1) {
      const colWidthPct = 100 / columns;
      return `position:absolute;top:${top}px;height:${rowH}px;left:calc(${col * colWidthPct}% + ${col === 0 ? 0 : GRID_GAP / 2}px);width:calc(${colWidthPct}% - ${GRID_GAP / 2}px)`;
    }
    return `position:absolute;left:0;right:0;top:${top}px;height:${rowH}px`;
  }

  // Identity of what the loaded window shows; any change forces a refetch.
  function libraryWindowSig(columns: number, rowH: number): string {
    return JSON.stringify([groupsTotalKey(), librarySearchField, columns, rowH]);
  }

  // True while the visible rows (plus a prefetch margin) are still inside the
  // window already rendered — then a scroll tick needs no work at all.
  function libraryWindowCovers(): boolean {
    const w = libraryWindow;
    if (!w || !trackList) return false;
    if (w.sig !== libraryWindowSig(libraryColumns(), libraryRowHeight())) return false;
    const viewport = Math.max(300, trackList.clientHeight || 420);
    const body = trackList.scrollTop - w.headerHeight;
    const firstVisible = Math.max(0, Math.floor(body / w.rowH));
    const lastVisible = Math.max(0, Math.ceil((body + viewport) / w.rowH));
    const margin = Math.max(2, Math.floor(Math.ceil(viewport / w.rowH) / 2));
    const needAbove = w.startRow > 0 && firstVisible - margin < w.startRow;
    const needBelow = w.endRow < w.totalRows && lastVisible + margin > w.endRow;
    return !needAbove && !needBelow;
  }

  // When the list is scrolled faster than the next page arrives, fill the
  // uncovered visible slots with placeholders immediately (pure DOM, no IPC)
  // instead of showing an empty area; the real render replaces them.
  function paintLibrarySkeleton() {
    const w = libraryWindow;
    const space = trackList?.querySelector<HTMLElement>(".virtual-list-space");
    if (!w || !trackList || !space) return;
    // Only for the view the window was loaded for (a tab/view switch that is
    // still fetching would otherwise get placeholders from the old geometry).
    if (w.sig !== libraryWindowSig(libraryColumns(), libraryRowHeight())) return;
    const viewport = Math.max(300, trackList.clientHeight || 420);
    const body = trackList.scrollTop - w.headerHeight;
    const first = Math.max(0, Math.floor(body / w.rowH) - 1);
    const last = Math.min(w.totalRows, Math.ceil((body + viewport) / w.rowH) + 1);
    let html = "";
    for (let row = first; row < last; row++) {
      if (row >= w.startRow && row < w.endRow) continue;
      for (let col = 0; col < w.columns; col++) {
        const tag = `${row}:${col}`;
        if (space.querySelector(`[data-skel="${tag}"]`)) continue;
        html += `<div class="lib-item lib-skeleton virtual-row${w.card ? " lib-card" : ""}" data-skel="${tag}" aria-hidden="true" style="${libraryRowPosStyle(row, col, w.columns, w.rowH, w.headerHeight)}"><div class="lib-avatar"></div><div class="lib-skel-lines"><i></i><i></i></div></div>`;
      }
    }
    if (html) space.insertAdjacentHTML("beforeend", html);
  }

  function syncLibViewButtons() {
    document.querySelectorAll<HTMLElement>("[data-libview]").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.libview === libView);
    });
    trackList?.setAttribute("data-lib-view", libView);
    syncLibLayoutButtons();
  }
  function syncLibLayoutButtons() {
    const unavailable = libView === "compact";
    document.querySelectorAll<HTMLButtonElement>("[data-liblayout]").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.liblayout === libLayout);
      btn.disabled = unavailable;
      btn.classList.toggle("disabled", unavailable);
    });
    document.getElementById("libLayoutSwitch")?.setAttribute("title", unavailable ? "Album layout is available in Details and Tiles views" : "Track display");
    trackList?.setAttribute("data-lib-layout", sheetModeActive() ? "albums" : "list");
  }

  // Coalesce renders: while one async render is in flight, further
  // Scroll-driven requests only set a flag; at most ONE trailing render
  // Runs with the settled position. Fast scrolling used to stack full
  // Aggregate queries — blank space + CPU spikes.
  let libraryRenderBusy = false;
  let libraryRenderQueued = false;
  async function renderLibraryVirtual(reset = false, restoreScroll?: number) {
    if (libraryRenderBusy) {
      if (reset || restoreScroll != null) libraryRenderQueued = false;
      else libraryRenderQueued = true;
      return;
    }
    libraryRenderBusy = true;
    try {
      await renderLibraryVirtualInner(reset, restoreScroll);
    } finally {
      libraryRenderBusy = false;
      if (libraryRenderQueued) {
        libraryRenderQueued = false;
        await renderLibraryVirtual();
      }
    }
  }

  async function renderLibraryPlaylists(reset = false) {
    if (!trackList || !invoke) return;
    try {
      await refreshPlaylists();
      if (!playlists.length) {
        trackList.innerHTML = `<div class="library-playlists-empty">No playlists yet.</div>`;
        return;
      }
      if (!selectedLibraryPlaylistId || !playlists.some(p => p.id === selectedLibraryPlaylistId)) {
        selectedLibraryPlaylistId = playlists[0].id;
      }
      const selected = playlists.find(p => p.id === selectedLibraryPlaylistId) || playlists[0];
      const page = await invoke<Page<Track>>("playlist_tracks", {
        playlistId: selected.id,
        search: librarySearch || null,
        sort: "default",
        limit: 5000,
        offset: 0,
      });
      page.items = page.items.map(normalizeTrack);
      const rows = page.items.map((track, index) => {
        const cover = resolvedCover(track.id, track.cover);
        const coverEl = cover
          ? `<div class="track-cover-mini" style="background-image:url('${esc(cover)}');background-size:cover;background-position:center" data-artwork-id="${esc(track.id)}"></div>`
          : `<div class="track-cover-mini cover-default" data-artwork-id="${esc(track.id)}">♪</div>`;
        return `<div class="track-row library-playlist-track" data-playlist-track="${esc(track.id)}" data-playlist-index="${index}">
          <span class="num">${index + 1}</span>${coverEl}
          <div style="flex:1;min-width:0"><div class="t-title">${esc(track.title)}</div><div class="t-artist">${esc(track.artist)} • ${esc(track.album)}</div></div>
          <span class="t-dur">${fmtDur(track.duration)}</span>
        </div>`;
      }).join("");
      const left = playlists.map(p => `<button type="button" class="library-playlist-item ${p.id === selected.id ? "active" : ""}" data-library-playlist="${esc(p.id)}" aria-selected="${p.id === selected.id}">
        <span class="library-playlist-item-name">${esc(p.name)}</span><span class="library-playlist-item-count">${p.trackCount}</span>${p.kind === "auto" ? `<span class="library-playlist-auto">AUTO</span>` : ""}
      </button>`).join("");
      trackList.style.display = "block";
      trackList.style.position = "relative";
      trackList.style.overflow = "hidden";
      trackList.innerHTML = `<div class="library-playlist-split">
        <aside class="library-playlist-sidebar" aria-label="Playlists"><div class="library-playlist-sidebar-title">PLAYLISTS</div>${left}</aside>
        <section class="library-playlist-content"><div class="library-playlist-content-head"><b>${esc(selected.name)}</b><span>${page.total} track${page.total === 1 ? "" : "s"}${librarySearch ? ` · ${esc(librarySearch)}` : ""}</span></div><div class="library-playlist-track-list">${page.total ? rows : `<div class="library-playlists-empty">${librarySearch ? "No matching tracks." : "This playlist is empty."}</div>`}</div></section>
      </div>`;
      trackList.querySelectorAll<HTMLButtonElement>("[data-library-playlist]").forEach(button => {
        button.onclick = () => {
          selectedLibraryPlaylistId = button.dataset.libraryPlaylist || null;
          clearLibrarySelection();
          persistLibraryNavigation();
          renderLibraryPlaylists(true);
        };
      });
      trackList.querySelectorAll<HTMLElement>("[data-playlist-track]").forEach(row => {
        row.onclick = async () => {
          const index = Number(row.dataset.playlistIndex || 0);
          const focus = page.items[index];
          if (!focus) return;
          try {
            await invoke!("replace_queue_from_playlist", { playlistId: selected.id, search: librarySearch || null, sort: "default" });
            await playFromDbQueue(focus);
          } catch (error) {
            await replaceQueueWith(page.items);
            busEmit("melo:play-tracks", { tracks: [focus], index: 0 });
          }
        };
      });
      bindLazyArtwork(trackList);
      applyActiveTrackHighlight();
      if (reset) trackList.scrollTop = 0;
    } catch (error) {
      trackList.innerHTML = `<div class="library-playlists-empty">Could not read the Playlist database.</div>`;
    }
  }

  async function renderLibraryVirtualInner(reset = false, restoreScroll?: number) {
    if (!trackList || !invoke) return;
    if (libTab === "playlists") {
      libraryRequest++;
      invalidateLibraryWindow();
      return renderLibraryPlaylists(reset);
    }
    if (sheetModeActive()) {
      invalidateLibraryWindow();
      return renderAlbumSheets(reset, restoreScroll);
    }
    // Searching while an artist is open: show the flat matching-track
    // Result list instead of the discography (which doesn't filter).
    if ((libTab === "artists" || libTab === "album-artists") && selectedArtist && !librarySearch) {
      invalidateLibraryWindow();
      return renderArtistDiscography(reset, restoreScroll);
    }
    if (reset) trackList.scrollTop = 0;
    else if (restoreScroll != null) trackList.scrollTop = restoreScroll;
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
    // One viewport of rows above and below the visible ones: a normal scroll
    // stays inside this window (no fetch), and the prefetch margin in
    // libraryWindowCovers refills it before the edge is reached.
    const overscanRows = Math.max(6, rowsVisible);
    const effectiveScroll = Math.max(0, trackList.scrollTop - headerHeight);
    const startRow = Math.max(0, Math.floor(effectiveScroll / rowH) - overscanRows);
    const start = startRow * columns;
    const limit = Math.min(400, Math.max(40, (rowsVisible + 2 * overscanRows) * columns));
    const request = ++libraryRequest;
    const windowGen = libraryWindowGen;
    try {
      const page = await fetchLibraryPage(start, limit);
      if (request !== libraryRequest) return;
      const totalRows = Math.max(1, Math.ceil(page.total / columns));
      const totalHeight = totalRows * rowH + headerHeight;
      const card = libView === "tiles" && libraryMode() === "groups" && !librarySearch;
      const rows = page.items.map((item, index) => {
        const absoluteIndex = page.offset + index;
        const rowIdx = Math.floor(absoluteIndex / columns);
        const col = absoluteIndex % columns;
        const posStyle = libraryRowPosStyle(rowIdx, col, columns, rowH, headerHeight);
        // IMPORTANT: while a search query is active the fetched items are flat
        // TRACKS (groups are bypassed) but libraryMode() still reports "groups"
        // — the group branch below must be skipped while searching, otherwise
        // Tracks render as groups and `group.name[0]` throws.
        if (libraryMode() === "groups" && !librarySearch) {
          const group = item as GroupRow;
          const cover = resolvedCover(group.artworkTrackId, artworkUrl(group.cover));
          const avatarClass = `lib-avatar ${libraryGroupKind() === "albums" ? "lib-avatar-album" : ""}`;
          const fallback = libraryGroupKind() === "albums" ? "💿" : esc(((group.name || "")[0] || "?").toUpperCase());
          const avatar = cover
            ? `<div class="${avatarClass}" style="background-image:url('${esc(cover)}');background-size:cover;background-position:center" data-artwork-id="${esc(group.artworkTrackId || "")}"></div>`
            : `<div class="${avatarClass}" data-artwork-id="${esc(group.artworkTrackId || "")}">${fallback}</div>`;
          const sub = esc(group.subtitle || `${group.count} tracks`);
          if (card) {
            return `<div class="lib-item lib-card virtual-row" data-group-index="${index}" style="${posStyle}">${avatar}<div class="t-title">${esc(group.name)}</div><div class="t-artist">${sub}</div></div>`;
          }
          if (libView === "compact") {
            return `<div class="lib-item virtual-row" data-group-index="${index}" style="${posStyle}">${avatar}<div class="t-title" style="flex:1;min-width:0">${esc(group.name)}</div><div class="t-artist lib-count" style="flex-shrink:0">${sub}</div><span class="chev-r">›</span></div>`;
          }
          return `<div class="lib-item virtual-row" data-group-index="${index}" style="${posStyle}">${avatar}<div style="flex:1;min-width:0"><div class="t-title">${esc(group.name)}</div><div class="t-artist lib-count">${sub}</div></div><span class="chev-r">›</span></div>`;
        }
        const track = item as Track;
        const tCover = resolvedCover(track.id, track.cover);
        const coverEl = tCover
          ? `<div class="track-cover-mini" style="background-image:url('${esc(tCover)}');background-size:cover;background-position:center" data-artwork-id="${esc(track.id)}"></div>`
          : `<div class="track-cover-mini cover-default" data-artwork-id="${esc(track.id)}">♪</div>`;
        if (card) {
          return `<div class="track-row lib-card virtual-row" data-track-id="${esc(track.id)}" data-page-index="${index}" data-abs-index="${absoluteIndex}" style="${posStyle}">
            ${coverEl}
            <div class="t-title">${esc(track.title)}</div>
            <div class="t-artist">${esc(track.artist)}${track.album ? ` · ${esc(track.album)}` : ""}</div>
          </div>`;
        }
        return `<div class="track-row virtual-row" data-track-id="${esc(track.id)}" data-page-index="${index}" data-abs-index="${absoluteIndex}" style="${posStyle}">
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
      // Read the position HERE — immediately before the swap, not at render
      // Start: the list keeps scrolling in between (middle-button auto-scroll
      // Is continuous) and restoring the STALE start position yanked the
      // Viewport backwards.
      const keepScroll = reset ? 0 : (restoreScroll ?? trackList.scrollTop);
      trackList.innerHTML = `<div class="virtual-list-space" style="position:relative;height:${Math.max(totalHeight, viewport)}px">${header}${rows}</div>`;
      bindLibraryRows(page.items);
      bindLazyArtwork(trackList);
      if (!reset) trackList.scrollTop = keepScroll;
      libraryWindow = windowGen === libraryWindowGen
        ? {
            sig: libraryWindowSig(columns, rowH),
            startRow: Math.floor(page.offset / columns),
            endRow: Math.ceil((page.offset + page.items.length) / columns),
            totalRows,
            headerHeight,
            rowH,
            columns,
            card,
          }
        : null;
    } catch (error) {
      invalidateLibraryWindow();
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
        if ((libTab === "artists" || libTab === "album-artists") && !selectedArtist) {
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
        persistLibraryNavigation();
        renderLibraryVirtual(true);
      };
      row.oncontextmenu = event => {
        event.preventDefault();
        event.stopPropagation();
        const group = items[Number(row.dataset.groupIndex || 0)] as GroupRow;
        if (!group) return;
        const key = group.key || group.name;
        let artist = "";
        let albumArtist: string | undefined;
        let album: string | undefined;
        if (libTab === "artists" && !selectedArtist) {
          artist = group.name;
        } else if (libTab === "album-artists" && !selectedArtist) {
          albumArtist = group.name;
        } else if ((libTab === "artists" && selectedArtist) || libTab === "albums") {
          const parts = key.split("\0");
          if (libTab === "albums") albumArtist = selectedArtist || parts[0] || "";
          else artist = selectedArtist || parts[0] || "";
          album = parts[1] || group.name;
        }
        // Genre groups do not identify one artist/album set, so they retain
        // Drill-in behavior but deliberately have no destructive group item.
        if (!artist && !albumArtist) return;
        const subject = album
          ? `album “${album}”`
          : albumArtist
            ? `album artist “${albumArtist}”`
            : `artist “${artist}”`;
        showGroupContextMenu(event, { artist, albumArtist, album, name: subject, count: group.count || 0 });
      };
    });
    trackList.querySelectorAll<HTMLElement>("[data-add-track]").forEach(button => {
      button.onclick = async event => {
        event.stopPropagation();
        if (!invoke || !button.dataset.addTrack) return;
        if (currentPlaylistId === QUEUE_ID) {
          toast("Select a playlist in the Playlist window first — the play queue takes tracks via Play, not Add");
          return;
        }
        try {
          await invoke("add_tracks_to_playlist", { playlistId: currentPlaylistId, trackIds: [button.dataset.addTrack] });
        } catch (e) {
          toast("Couldn't add the track to the playlist — " + String(e));
          return;
        }
        busEmit("melo:playlist-changed", { playlistId: currentPlaylistId });
      };
    });
    trackList.querySelectorAll<HTMLElement>("[data-track-id]").forEach(row => {
      row.onclick = async event => {
        if ((event.target as HTMLElement).closest("[data-add-track]")) return;
        const index = Number(row.dataset.pageIndex || 0);
        const absIndex = Number.isFinite(Number(row.dataset.absIndex)) ? Number(row.dataset.absIndex) : index;
        const id = row.dataset.trackId || "";
        const mouseEvent = event as MouseEvent;
        if (mouseEvent.shiftKey || mouseEvent.ctrlKey || mouseEvent.metaKey) {
          const idByAbsIndex = new Map<number, string>();
          trackList!.querySelectorAll<HTMLElement>("[data-abs-index]").forEach(r2 => {
            const a = Number(r2.dataset.absIndex);
            const rid = r2.dataset.trackId || "";
            if (Number.isFinite(a) && rid) idByAbsIndex.set(a, rid);
          });
          libraryAnchorIndex = applySelectionRange(librarySelectedIds, id, absIndex, idByAbsIndex, libraryAnchorIndex, mouseEvent);
          updateLibrarySelectionUI();
          return;
        }
        if (librarySelectedIds.size) clearLibrarySelection();
        const list = items.filter((x): x is Track => "path" in x).map(normalizeTrack);
        const focus = list[index];
        if (!focus) return;
        try {
          // The WHOLE filtered+scoped source (the exact parameters fetchLibraryPage
          // Uses) goes into the queue server-side — not just the rendered page.
          await invoke!("replace_queue_from_library", { search: librarySearch || null, artist: selectedArtist, album: selectedAlbum, genre: selectedGenre, sort: "title-asc" });
        } catch (e) {
          // A queue-build failure must never cost playback — but must not silently
          // Substitute the RENDERED PAGE as the queue either: play only the
          // Clicked track and leave the stored queue untouched.
          toast("Couldn't build the play queue from the Library — playing this track only. " + String(e));
          busEmit("melo:play-tracks", { tracks: [focus], index: 0 });
          return;
        }
        await playFromDbQueue(focus);
      };
      row.oncontextmenu = event => {
        event.preventDefault();
        event.stopPropagation();
        const id = row.dataset.trackId || "";
        if (id) showTrackContextMenu(event, id);
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
    applyActiveTrackHighlight();
  }

  async function renderArtistDiscography(reset = false, restoreScroll?: number) {
    if (!trackList || !invoke || !selectedArtist) return;
    if (reset) trackList.scrollTop = 0;
    else if (restoreScroll != null) trackList.scrollTop = restoreScroll;
    trackList.style.display = "block";
    trackList.style.position = "relative";
    trackList.style.overflowY = "auto";
    const request = ++libraryRequest;
    try {
      const page = await invoke<Page<Track>>("library_tracks", {
        search: librarySearch || null,
        artist: libTab === "artists" ? selectedArtist : null,
        albumArtist: libTab === "album-artists" ? selectedArtist : null,
        album: null,
        genre: null,
        sort: "album-asc",
        limit: 5000,
        offset: 0,
      });
      if (request !== libraryRequest) return;
      const items = page.items.map(normalizeTrack);
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
        const artId = album.tracks[0]?.id || "";
        const cover = resolvedCover(artId, artworkUrl(album.cover));
        const avatar = cover
          ? `<div class="lib-avatar lib-avatar-album" style="background-image:url('${esc(cover)}');background-size:cover;background-position:center" data-artwork-id="${esc(artId)}"></div>`
          : `<div class="lib-avatar lib-avatar-album" data-artwork-id="${esc(artId)}">💿</div>`;
        const rows = album.tracks.map((track, ti) => {
          const tCover = resolvedCover(track.id, track.cover);
          return `<div class="track-row" data-track-id="${esc(track.id)}" data-album-index="${ai}" data-track-index="${ti}">
          <span class="num">${ti + 1}</span>
          ${tCover ? `<div class="track-cover-mini" style="background-image:url('${esc(tCover)}');background-size:cover;background-position:center" data-artwork-id="${esc(track.id)}"></div>` : `<div class="track-cover-mini cover-default" data-artwork-id="${esc(track.id)}">♪</div>`}
          <div style="flex:1;min-width:0"><div class="t-title">${esc(track.title)}</div><div class="t-artist">${esc(track.artist)}</div></div>
          <span class="t-dur">${fmtDur(track.duration)}</span>
          <button class="btn small ghost" data-add-track="${esc(track.id)}" title="Add to current playlist">+</button>
        </div>`;
        }).join("");
        const twoCol = columns > 1 && libView !== "compact";
        const rowCount = twoCol ? Math.max(1, Math.ceil(album.tracks.length / 2)) : album.tracks.length;
        const gridClass = twoCol ? "lib-album-tracks two-col" : "lib-album-tracks";
        const gridStyle = twoCol ? `grid-template-rows:repeat(${rowCount},auto)` : "";
        return `<section class="lib-album-block">
          <div class="lib-album-head" data-album-context="${ai}">${avatar}<div style="flex:1;min-width:0"><div class="t-title">${esc(album.name)}</div><div class="t-artist">${album.tracks.length} track${album.tracks.length === 1 ? "" : "s"}</div></div></div>
          <div class="${gridClass}" style="${gridStyle}">${rows}</div>
        </section>`;
      }).join("");
      trackList.innerHTML = `${header}${body || `<div style="padding:24px;text-align:center;color:var(--text-muted)">No tracks for this artist.</div>`}`;
      trackList.querySelectorAll<HTMLElement>("[data-album-context]").forEach(head => {
        head.oncontextmenu = event => {
          event.preventDefault();
          event.stopPropagation();
          const album = albums[Number(head.dataset.albumContext || 0)];
          if (!album || !selectedArtist) return;
          showGroupContextMenu(event, {
            artist: libTab === "artists" ? selectedArtist : "",
            albumArtist: libTab === "album-artists" ? selectedArtist : undefined,
            album: album.name,
            name: `album “${album.name}”`,
            count: album.tracks.length,
          });
        };
      });
      trackList.querySelectorAll<HTMLElement>("[data-add-track]").forEach(button => {
        button.onclick = async event => {
          event.stopPropagation();
          if (!invoke || !button.dataset.addTrack) return;
          if (currentPlaylistId === QUEUE_ID) {
            toast("Select a playlist in the Playlist window first — the play queue takes tracks via Play, not Add");
            return;
          }
          try {
            await invoke("add_tracks_to_playlist", { playlistId: currentPlaylistId, trackIds: [button.dataset.addTrack] });
          } catch (e) {
            toast("Couldn't add the track to the playlist — " + String(e));
            return;
          }
          busEmit("melo:playlist-changed", { playlistId: currentPlaylistId });
        };
      });
      trackList.querySelectorAll<HTMLElement>("[data-track-id]").forEach(row => {
        row.onclick = async event => {
          if ((event.target as HTMLElement).closest("[data-add-track]")) return;
          const ai = Number(row.dataset.albumIndex || 0);
          const ti = Number(row.dataset.trackIndex || 0);
          const list = albums[ai]?.tracks || [];
          await replaceQueueWith(list);
          busEmit("melo:play-tracks", { tracks: list, index: ti });
        };
      row.oncontextmenu = event => {
        event.preventDefault();
        event.stopPropagation();
        const id = row.dataset.trackId || "";
        if (id) showTrackContextMenu(event, id);
      };
      });
      trackList.querySelector<HTMLElement>("#virtualBack")?.addEventListener("click", () => {
        selectedArtist = null;
        selectedAlbum = null;
        clearLibrarySelection();
        persistLibraryNavigation();
        renderLibraryVirtual(false, savedGroupsScrollTop);
      });
      bindLazyArtwork(trackList);
      applyActiveTrackHighlight();
      // Fresh-read the scroll position like the main virtual list above.
      const keepScroll = reset ? 0 : trackList.scrollTop;
      if (!reset) trackList.scrollTop = keepScroll;
    } catch {
      trackList.innerHTML = `<div style="padding:24px;text-align:center;color:var(--text-muted)">Could not read the Library database.</div>`;
    }
  }

  // Album-sheet layout (Details/Tiles → "albums"): every album of the current
  // track source is one sheet — a 180×180 cover slot on the left, the album
  // title / year / length above a two-column (or one-column, when narrow) track
  // list on the right. The columns are pure CSS (container query), so a resize
  // never needs a re-render.
  async function renderAlbumSheets(reset = false, restoreScroll?: number) {
    if (!trackList || !invoke) return;
    if (reset) trackList.scrollTop = 0;
    else if (restoreScroll != null) trackList.scrollTop = restoreScroll;
    trackList.style.display = "block";
    trackList.style.position = "relative";
    trackList.style.overflowY = "auto";
    lastLibraryColumns = 1;
    syncLibViewButtons();
    const request = ++libraryRequest;
    try {
      const page = await invoke<Page<Track>>("library_tracks", {
        search: librarySearch || null,
        field: librarySearchField === "all" ? null : librarySearchField,
        artist: libTab === "artists" ? selectedArtist : null,
        albumArtist: libTab === "album-artists" || libTab === "albums" ? selectedArtist : null,
        album: selectedAlbum,
        genre: selectedGenre,
        sort: "album-asc",
        limit: SHEET_TRACK_LIMIT,
        offset: 0,
      });
      if (request !== libraryRequest) return;
      const items = page.items.map(normalizeTrack);
      type Sheet = { name: string; albumArtist: string; year: number; cover?: string; artId: string; tracks: Track[]; seconds: number };
      const sheets: Sheet[] = [];
      const byKey = new Map<string, Sheet>();
      for (const track of items) {
        const name = track.album || "Unknown Album";
        const albumArtist = track.albumArtist || track.artist;
        const key = `${albumArtist.toLowerCase()}\0${name.toLowerCase()}`;
        let sheet = byKey.get(key);
        if (!sheet) {
          sheet = { name, albumArtist, year: 0, cover: undefined, artId: track.id, tracks: [], seconds: 0 };
          byKey.set(key, sheet);
          sheets.push(sheet);
        }
        if (!sheet.year && track.year) sheet.year = track.year;
        if (!sheet.cover && track.cover) { sheet.cover = track.cover; sheet.artId = track.id; }
        sheet.tracks.push(track);
        sheet.seconds += Number.isFinite(track.duration) ? Math.max(0, track.duration) : 0;
      }
      // Files are normally named "01 …", "02 …": natural filename order gives
      // the album's track order (the backend sort is by title).
      const fileName = (path: string) => (path || "").split(/[\\/]/).pop() || "";
      for (const sheet of sheets) {
        sheet.tracks.sort((a, b) => fileName(a.path).localeCompare(fileName(b.path), undefined, { numeric: true, sensitivity: "base" }));
      }
      const artistScope = (libTab === "artists" || libTab === "album-artists") && !!selectedArtist && !librarySearch;
      const crumb = libraryCrumb();
      const header = crumb
        ? `<div class="lib-crumb virtual-crumb" style="position:sticky;top:0;z-index:3;background:var(--card)"><button class="btn small" id="virtualBack">‹ Back</button><b>${esc(crumb)}</b></div>`
        : "";
      let abs = 0;
      const body = sheets.map((sheet, si) => {
        const cover = resolvedCover(sheet.artId, sheet.cover);
        const coverEl = cover
          ? `<div class="lib-sheet-cover" style="background-image:url('${esc(cover)}')" data-artwork-id="${esc(sheet.artId)}"></div>`
          : `<div class="lib-sheet-cover" data-artwork-id="${esc(sheet.artId)}">💿</div>`;
        const rows = sheet.tracks.map((track, ti) => {
          const row = `<div class="lib-sheet-row" data-track-id="${esc(track.id)}" data-abs-index="${abs}" data-sheet-index="${si}" data-track-index="${ti}" title="${esc(track.title)} — ${esc(track.artist)}">
            <span class="ls-num">${String(ti + 1).padStart(2, "0")}</span>
            <span class="ls-title">${esc(track.title)}</span>
            <span class="ls-artist">[${esc(track.artist)}]</span>
            <button class="ls-add" data-add-track="${esc(track.id)}" title="Add to current playlist" aria-label="Add to current playlist">+</button>
            <span class="ls-dur">${fmtDur(track.duration)}</span>
          </div>`;
          abs++;
          return row;
        }).join("");
        const mins = Math.round(sheet.seconds / 60);
        const minsText = sheet.seconds > 0 && mins < 1 ? "<1 min" : `${mins} min${mins === 1 ? "" : "s"}`;
        const metaLeft = [sheet.year ? String(sheet.year) : "", artistScope ? "" : sheet.albumArtist].filter(Boolean).join(" · ");
        return `<section class="lib-sheet" data-sheet-context="${si}">
          ${coverEl}
          <div class="lib-sheet-main">
            <div class="lib-sheet-title" title="${esc(sheet.name)}">${esc(sheet.name)}</div>
            <div class="lib-sheet-meta"><span class="lib-sheet-sub">${esc(metaLeft)}</span><span class="lib-sheet-mins">${minsText}</span></div>
            <div class="lib-sheet-tracks" style="--rows:${Math.max(1, Math.ceil(sheet.tracks.length / 2))}">${rows}</div>
          </div>
        </section>`;
      }).join("");
      const note = page.total > items.length
        ? `<div class="lib-sheet-note">Showing the first ${items.length} of ${page.total} tracks — narrow the search to see the rest.</div>`
        : "";
      const empty = `<div style="padding:24px;text-align:center;color:var(--text-muted)">${librarySearch ? "No matching tracks." : "No tracks here."}</div>`;
      const keepScroll = reset ? 0 : (restoreScroll ?? trackList.scrollTop);
      trackList.innerHTML = `${header}<div class="lib-sheets">${body || empty}${note}</div>`;

      trackList.querySelectorAll<HTMLElement>("[data-sheet-context]").forEach(head => {
        head.oncontextmenu = event => {
          if ((event.target as HTMLElement).closest("[data-track-id]")) return;
          event.preventDefault();
          event.stopPropagation();
          const sheet = sheets[Number(head.dataset.sheetContext || 0)];
          if (!sheet) return;
          const byTrackArtist = libTab === "artists" && !!selectedArtist;
          showGroupContextMenu(event, {
            artist: byTrackArtist ? selectedArtist! : "",
            albumArtist: byTrackArtist ? undefined : sheet.albumArtist,
            album: sheet.name,
            name: `album “${sheet.name}”`,
            count: sheet.tracks.length,
          });
        };
      });
      trackList.querySelectorAll<HTMLElement>("[data-add-track]").forEach(button => {
        button.onclick = async event => {
          event.stopPropagation();
          if (!invoke || !button.dataset.addTrack) return;
          if (currentPlaylistId === QUEUE_ID) {
            toast("Select a playlist in the Playlist window first — the play queue takes tracks via Play, not Add");
            return;
          }
          try {
            await invoke("add_tracks_to_playlist", { playlistId: currentPlaylistId, trackIds: [button.dataset.addTrack] });
          } catch (e) {
            toast("Couldn't add the track to the playlist — " + String(e));
            return;
          }
          busEmit("melo:playlist-changed", { playlistId: currentPlaylistId });
        };
      });
      trackList.querySelectorAll<HTMLElement>("[data-track-id]").forEach(row => {
        row.onclick = async event => {
          if ((event.target as HTMLElement).closest("[data-add-track]")) return;
          const id = row.dataset.trackId || "";
          const absIndex = Number(row.dataset.absIndex || 0);
          const mouseEvent = event as MouseEvent;
          if (mouseEvent.shiftKey || mouseEvent.ctrlKey || mouseEvent.metaKey) {
            const idByAbsIndex = new Map<number, string>();
            trackList!.querySelectorAll<HTMLElement>("[data-abs-index]").forEach(r2 => {
              const a = Number(r2.dataset.absIndex);
              const rid = r2.dataset.trackId || "";
              if (Number.isFinite(a) && rid) idByAbsIndex.set(a, rid);
            });
            libraryAnchorIndex = applySelectionRange(librarySelectedIds, id, absIndex, idByAbsIndex, libraryAnchorIndex, mouseEvent);
            updateLibrarySelectionUI();
            return;
          }
          if (librarySelectedIds.size) clearLibrarySelection();
          const list = sheets[Number(row.dataset.sheetIndex || 0)]?.tracks || [];
          const index = Number(row.dataset.trackIndex || 0);
          if (!list[index]) return;
          await replaceQueueWith(list);
          busEmit("melo:play-tracks", { tracks: list, index });
        };
        row.oncontextmenu = event => {
          event.preventDefault();
          event.stopPropagation();
          const id = row.dataset.trackId || "";
          if (id) showTrackContextMenu(event, id);
        };
      });
      trackList.querySelector<HTMLElement>("#virtualBack")?.addEventListener("click", () => {
        if ((libTab === "artists" || libTab === "album-artists") && selectedArtist) { selectedArtist = null; selectedAlbum = null; }
        else if (libTab === "albums" && selectedAlbum) { selectedArtist = null; selectedAlbum = null; }
        else if (libTab === "genres" && selectedGenre) selectedGenre = null;
        clearLibrarySelection();
        persistLibraryNavigation();
        renderLibraryVirtual(false, savedGroupsScrollTop);
      });
      bindLazyArtwork(trackList);
      updateLibrarySelectionUI();
      applyActiveTrackHighlight();
      if (!reset) trackList.scrollTop = keepScroll;
    } catch {
      trackList.innerHTML = `<div style="padding:24px;text-align:center;color:var(--text-muted)">Could not read the Library database.</div>`;
    }
  }

  // Re-render (only) when a resize actually crosses the 1-col/2-col
  // Breakpoint — not on every pixel of a resize drag — so widening the
  // Library window reflows the track list into a grid once there's room.
  function maybeReflowLibrary() {
    const cols = libraryColumns();
    if (cols === lastLibraryColumns || !trackList) return;
    // Preserve the LIST POSITION, not the pixel offset: after a 1↔2 column
    // Reflow the same offset points at a track ~2× further down. Convert
    // ScrollTop → first visible index (old columns) → offset (new columns)
    // And restore through renderLibraryVirtual's restore path.
    const rowH = libraryRowHeight();
    const headerHeight = libraryCrumb() ? 38 : 0;
    const bodyScroll = Math.max(0, trackList.scrollTop - headerHeight);
    const firstRow = Math.max(0, Math.floor(bodyScroll / rowH));
    const rowOffset = bodyScroll - firstRow * rowH;
    const firstItem = firstRow * lastLibraryColumns;
    const newRow = Math.floor(firstItem / cols);
    const restore = headerHeight + newRow * rowH + rowOffset;
    renderLibraryVirtual(false, restore);
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
    window.clearTimeout(libraryResizeTimer);
    libraryResizeTimer = window.setTimeout(maybeReflowLibrary, 80);
  });

  async function refreshPlaylists() {
    if (!invoke) return;
    playlists = await invoke<PlaylistRow[]>("list_playlists");
    // The dropdown always offers "▶ Now Playing" first (the queue's
    // Pseudo-playlist). A stored id that no longer exists — including the
    // Retired factory "Favorites" (p1) — falls back to it.
    if (currentPlaylistId !== QUEUE_ID && !playlists.some(p => p.id === currentPlaylistId)) {
      currentPlaylistId = QUEUE_ID;
      localStorage.setItem("melo-currentPlaylist", currentPlaylistId);
      // The active playlist just vanished under us (deleted in another
      // Window or by an older build). Other windows must also drop it —
      // A purely local fallback would leave them targeting a dead id.
      // (Receivers apply QUEUE_ID without re-broadcasting: no loop.)
      broadcastCurrentPlaylist();
    }
    if (playlistSelect) {
      playlistSelect.innerHTML =
        `<option value="${QUEUE_ID}" ${currentPlaylistId === QUEUE_ID ? "selected" : ""}>▶ Now Playing (queue)</option>` +
        playlists.map(p => `<option value="${esc(p.id)}" ${p.id === currentPlaylistId ? "selected" : ""}>${esc(p.name)} (${p.trackCount})</option>`).join("");
    }
    syncPlaylistChrome();
  }

  // Edit-while-playing policy: the play queue and stored playlists are
  // Independent tables and the player owns the queue at runtime. Edits to
  // A stored playlist NEVER touch the active playback queue; new contents
  // Take effect the next time that playlist is played (the player
  // Intentionally does not listen for melo:playlist-changed).

  // The queue view supports SORT and DRAG-REORDER: both rewrite the DB
  // Queue positions AND broadcast melo:queue-reordered so the player's
  // Runtime queue follows (the playing track keeps playing). Search stays
  // Disabled.
  function syncPlaylistChrome() {
    const viewingQueue = currentPlaylistId === QUEUE_ID;
    const viewingAutoPlaylist = !!playlists.find(p => p.id === currentPlaylistId && p.kind === "auto");
    if (playlistSort) {
      // Sorting the QUEUE persists the new play order (DB + player stay in
      // Sync via melo:queue-reordered), unlike stored playlists where sort is
      // Only a view projection.
      playlistSort.disabled = false;
      playlistSort.title = viewingQueue ? "Sort the play queue (re-orders playback)" : "Sort tracks";
    }
    if (playlistSearch) {
      playlistSearch.disabled = viewingQueue;
      playlistSearch.placeholder = viewingQueue ? "Search isn't available for the play queue" : "Search playlist…";
      // Search never applies to the queue view (queue_tracks ignores it), so a
      // leftover query typed while browsing a REAL playlist must not survive
      // into the queue: renderPlaylistVirtual's hasSearch check reads this
      // input's raw .value regardless of .disabled, and a stale non-empty
      // value there permanently killed drag-reorder for the queue (hasSearch
      // stuck true) until the box was manually cleared, which is impossible
      // while it's disabled.
      if (viewingQueue) { playlistSearch.value = ""; updatePlaylistSearchClear(); }
    }
    if (clearPlaylistButton) {
      clearPlaylistButton.disabled = viewingAutoPlaylist;
      const svg = clearPlaylistButton.querySelector("svg");
      clearPlaylistButton.textContent = "";
      if (svg) clearPlaylistButton.appendChild(svg);
      // The icon already says trash; both modes read simply as "Clear" (the
      // Title spells out what is cleared).
      clearPlaylistButton.append(" Clear");
      clearPlaylistButton.title = viewingQueue
        ? "Remove all tracks from the play queue"
        : "Remove all tracks from the current playlist";
    }
  }

  // Cross-window sync of the ACTIVE playlist: explicit switches (dropdown,
  // New playlist) are broadcast with this window's role as `source`;
  // Receivers apply the id without re-broadcasting (no event loop).
  // Without this, "Add to playlist" from one window could target a
  // DIFFERENT playlist than the one the user is looking at.
  function broadcastCurrentPlaylist() {
    playlistSyncRev = Date.now();
    busEmit("melo:current-playlist-changed", { playlistId: currentPlaylistId, source: role, rev: playlistSyncRev });
  }
  async function applySyncedPlaylist(id: string) {
    currentPlaylistId = id;
    localStorage.setItem("melo-currentPlaylist", id);
    // The id may refer to a playlist this window has never seen (created
    // In another window moments ago) — refresh before touching the
    // Dropdown, otherwise <select>.value silently refuses the unknown id.
    // The queue's pseudo-ID is always valid and needs no refresh.
    if (id !== QUEUE_ID && !playlists.some(p => p.id === id)) await refreshPlaylists();
    if (playlistSelect) playlistSelect.value = id;
    syncPlaylistChrome();
    clearPlaylistSelection();
    renderPlaylistVirtual(true);
    renderEmbeddedPlaylist();
  }

  // ---------------------------------------------------------------------
  // Playlist management menu: Rename / Duplicate / Remove missing files /
  // Delete for the ACTIVE playlist. Rename and delete surface everywhere
  // Through melo:playlist-changed; delete additionally retargets windows
  // Still looking at the removed id. The queue pseudo-playlist is exempt.
  // ---------------------------------------------------------------------
  const plCtxTitle = playlistContextMenu.querySelector<HTMLElement>(".pl-ctx-title")!;
  const plCtxRename = playlistContextMenu.querySelector<HTMLButtonElement>("#plCtxRename")!;
  const plCtxDuplicate = playlistContextMenu.querySelector<HTMLButtonElement>("#plCtxDuplicate")!;
  const plCtxSweep = playlistContextMenu.querySelector<HTMLButtonElement>("#plCtxSweep")!;
  const plCtxDelete = playlistContextMenu.querySelector<HTMLButtonElement>("#plCtxDelete")!;

  function closePlaylistMenu() { playlistContextMenu.style.display = "none"; }

  function openPlaylistMenu(x: number, y: number) {
    if (currentPlaylistId === QUEUE_ID) {
      toast("Playlist actions aren't available for the play queue");
      return;
    }
    const pl = playlists.find(p => p.id === currentPlaylistId);
    if (pl?.kind === "auto") {
      toast("Automatic playlists are read-only");
      return;
    }
    if (!pl) return;
    plCtxTitle.textContent = pl.name;
    playlistContextMenu.style.display = "block";
    const rect = playlistContextMenu.getBoundingClientRect();
    playlistContextMenu.style.left = `${Math.max(6, Math.min(x, window.innerWidth - rect.width - 6))}px`;
    playlistContextMenu.style.top = `${Math.max(6, Math.min(y, window.innerHeight - rect.height - 6))}px`;
  }

  plCtxRename.onclick = async () => {
    closePlaylistMenu();
    const pl = playlists.find(p => p.id === currentPlaylistId);
    if (!invoke || !pl) return;
    const name = (await showPromptDialog("Rename Playlist", "New name:", pl.name, "Rename"))?.trim();
    if (!name || name === pl.name) return;
    try { await invoke("rename_playlist", { playlistId: pl.id, name }); }
    catch (e) { toast(`Couldn't rename the playlist — ${String(e)}`); return; }
    busEmit("melo:playlist-changed", { playlistId: pl.id });
  };

  plCtxDuplicate.onclick = async () => {
    closePlaylistMenu();
    if (!invoke || currentPlaylistId === QUEUE_ID) return;
    let created: PlaylistRow | null = null;
    try { created = await invoke<PlaylistRow>("duplicate_playlist", { playlistId: currentPlaylistId, name: null }); }
    catch (e) { toast(`Couldn't duplicate the playlist — ${String(e)}`); return; }
    if (!created) return;
    currentPlaylistId = created.id;
    broadcastCurrentPlaylist();
    await Promise.all([refreshPlaylists(), renderPlaylistVirtual(true)]);
  };

  plCtxSweep.onclick = async () => {
    closePlaylistMenu();
    const pl = playlists.find(p => p.id === currentPlaylistId);
    if (!invoke || !pl) return;
    if (!await confirmDanger(
      "Remove Missing Files?",
      `Melo will check all ${pl.trackCount} file(s) of “${pl.name}” on disk and remove the entries whose audio file is gone. Audio files themselves are never deleted.`,
      "Check & Remove"
    )) return;
    let result: { checked: number; removed: number } | null = null;
    try { result = await invoke<{ checked: number; removed: number }>("sweep_missing_playlist_tracks", { playlistId: pl.id }); }
    catch (e) { toast(`Couldn't check the playlist files — ${String(e)}`); return; }
    if (!result) return;
    toast(result.removed
      ? `Removed ${result.removed} broken entr${result.removed === 1 ? "y" : "ies"} (${result.checked} file(s) checked)`
      : `All ${result.checked} file(s) of the playlist are present`);
    if (result.removed) busEmit("melo:playlist-changed", { playlistId: pl.id });
  };

  plCtxDelete.onclick = async () => {
    closePlaylistMenu();
    const pl = playlists.find(p => p.id === currentPlaylistId);
    if (!invoke || !pl) return;
    if (!await confirmDanger(
      "Delete Playlist?",
      `“${pl.name}” and its ${pl.trackCount} track entr${pl.trackCount === 1 ? "y" : "ies"} will be permanently deleted. The audio files on disk are not affected.`,
      "Delete Playlist"
    )) return;
    try { await invoke("delete_playlist", { playlistId: pl.id }); }
    catch (e) { toast(`Couldn't delete the playlist — ${String(e)}`); return; }
    if (currentPlaylistId === pl.id) {
      currentPlaylistId = QUEUE_ID;
      localStorage.setItem("melo-currentPlaylist", currentPlaylistId);
      syncPlaylistChrome();
      clearPlaylistSelection();
      broadcastCurrentPlaylist();
      renderPlaylistVirtual(true);
    }
    busEmit("melo:playlist-changed", { playlistId: pl.id });
  };

  // Any click-to-PLAY anywhere updates the DB queue and tells every
  // Window — playlists are only ever ADDED to explicitly (the "+", the
  // Bulk bar, import-append). Failures must never block playback.
  async function replaceQueueWith(tracks: Track[]) {
    if (!invoke || !tracks.length) return;
    try {
      await invoke("replace_queue_tracks", { trackIds: tracks.map(t => t.id) });
      busEmit("melo:queue-changed", {});
    } catch (e) {
      toast("Couldn't update the play queue — playback continues anyway. " + String(e));
    }
  }

  // Play from the DB QUEUE (single source of truth) instead of handing the
  // Player the ~60-row page on screen. The clicked record rides the bus
  // Message so playback starts INSTANTLY; the player then silently grows
  // Its runtime queue to the full DB list (paged). `announce` emits
  // Queue-changed for flows that just rewrote the queue.
  async function playFromDbQueue(focus: Track, announce = true) {
    if (!invoke) return;
    busEmit("melo:play-tracks", { tracks: [focus], index: 0, fromQueue: true });
    if (announce) busEmit("melo:queue-changed", {});
  }

  // The effective playlist search query — null below the minimum length,
  // So neither the list render nor the queue build filters on a 1-char
  // Query.
  function playlistSearchQuery(): string | null {
    const v = playlistSearch?.value.trim() || "";
    return v.length >= MIN_SEARCH_LEN ? v : null;
  }

  async function renderPlaylistVirtual(reset = false) {
    if (!playlistList || !invoke) return;
    if (reset) playlistList.scrollTop = 0;
    // Row height for THIS render pass — the compact toggle changes it, and
    // Every measurement below (windowing math, absolute tops, total height)
    // Must agree with what the CSS paints.
    const rowH = playlistView === "compact" ? playlistRowHeightCompact : playlistRowHeight;
    playlistList.style.display = "block";
    playlistList.style.position = "relative";
    playlistList.style.overflowY = "auto";
    const viewport = Math.max(260, playlistList.clientHeight || 420);
    const start = Math.max(0, Math.floor(playlistList.scrollTop / rowH) - 8);
    const limit = Math.max(40, Math.ceil(viewport / rowH) + 16);
    const request = ++playlistRequest;
    // The queue pseudo-playlist has its own backend table. Its search control
    // Stays disabled (syncPlaylistChrome); sort, per-row remove and
    // Drag-reorder all work on it.
    const viewingQueue = currentPlaylistId === QUEUE_ID;
    const page = viewingQueue
      ? await invoke<Page<Track>>("queue_tracks", { limit, offset: start })
      : await invoke<Page<Track>>("playlist_tracks", {
          playlistId: currentPlaylistId,
          search: playlistSearchQuery(),
          sort: playlistSort?.value || "default",
          limit,
          offset: start,
        });
    if (request !== playlistRequest) return;
    page.items = page.items.map(normalizeTrack);
    // Same minimum-length rule as the Library search: a 1-char playlist
    // Query stays a plain browse view.
    const hasSearch = !viewingQueue && !!playlistSearchQuery();
    // Manual reorder is only meaningful in the DEFAULT (position) order with
    // No active search: under a metadata sort or filter the visible rows are
    // A projection, so a drop target's index would not map to a real
    // Position — drag is disabled there. Covers the QUEUE view too (moves go
    // Through move_queue_track; the player follows via
    // Melo:queue-reordered).
    const viewingAutoPlaylist = !!playlists.find(p => p.id === currentPlaylistId && p.kind === "auto");
    const reorderAllowed = !viewingAutoPlaylist && !hasSearch
      && (playlistSort?.value || "default") === "default";
    // Detach the empty-state element before we wipe innerHTML so it isn't
    // Destroyed — then re-append it in the right place afterwards. This lets
    // The empty/no-results message live *inside* the flex:1 scroller, which
    // Keeps the footer pinned to the bottom regardless of content state.
    if (playlistEmpty) playlistEmpty.remove();
    if (playlistEmpty) {
      if (page.total) {
        playlistEmpty.style.display = "none";
      } else {
        playlistEmpty.style.display = "block";
        playlistEmpty.innerHTML = hasSearch
          ? "No matching tracks<br/>Try a different search term"
          : viewingQueue
            ? "Play queue is empty<br/>Click any track to start listening"
            : playlists.length
              ? "Playlist is empty<br/>Use the Library to add tracks"
              : "No playlist yet<br/>Click ✚ to create one, then add tracks from Library";
      }
    }
    playlistList.style.display = "block";
    if (!page.total) {
      playlistList.innerHTML = "";
      if (playlistEmpty) playlistList.appendChild(playlistEmpty);
      updatePlaylistSelectionUI();
      return;
    }
    const rows = page.items.map((track, i) => {
      // QUEUE rows carry their entry ids too — the queue allows duplicate
      // Tracks, so drag/selection identity needs the entry.
      const entryId = track.playlistEntryId;
      return `<div class="track-row virtual-row ${track.id === currentTrackId ? "active" : ""}" role="option" tabindex="0" aria-selected="${entryId != null && playlistSelectedEntryIds.has(String(entryId))}"${track.id === currentTrackId ? ` aria-current="true"` : ""} ${reorderAllowed ? `draggable="true" ` : ""}data-pl-track="${esc(track.id)}" ${entryId != null ? `data-pl-entry="${entryId}"` : ""} data-page-index="${i}" data-pl-index="${page.offset + i}" style="position:absolute;left:0;right:0;top:${(page.offset+i)*rowH}px;height:${rowH}px"><span class="num">${page.offset+i+1}</span>${track.cover?`<div class="track-cover-mini" style="background-image:url('${esc(track.cover)}');background-size:cover;background-position:center"></div>`:`<div class="track-cover-mini cover-default" data-artwork-id="${esc(track.id)}">♪</div>`}<div style="flex:1;min-width:0"><div class="t-title">${esc(track.title)}</div><div class="t-artist">${esc(track.artist)} • ${esc(track.album)}</div></div><span class="t-dur">${fmtDur(track.duration)}</span>${viewingQueue
          // The queue view gets the same × as playlists.
          ? `<button class="btn small ghost" data-remove-queue-entry="${entryId ?? ""}" aria-label="Remove ${esc(track.title)} from the play queue">×</button>`
          : (!viewingAutoPlaylist ? `<button class="btn small ghost" data-remove-entry="${entryId ?? ""}" aria-label="Remove ${esc(track.title)} from playlist">×</button>` : "")}</div>`;
    }).join("");
    playlistList.innerHTML = `<div style="position:relative;height:${Math.max(viewport,page.total*rowH)}px">${rows}</div>`;
    if (playlistEmpty) playlistList.appendChild(playlistEmpty);
    bindLazyArtwork(playlistList);
    playlistList.querySelectorAll<HTMLElement>("[data-pl-track]").forEach(row => {
      row.onclick = async event => {
        if ((event.target as HTMLElement).closest("[data-remove-entry], [data-remove-queue-entry]")) return;
        const index = Number(row.dataset.pageIndex || 0);
        const absIndex = Number.isFinite(Number(row.dataset.plIndex)) ? Number(row.dataset.plIndex) : index;
        const trackId = row.dataset.plTrack || "";
        const entryId = row.dataset.plEntry || "";
        const mouseEvent = event as MouseEvent;
        if (!trackId) return;
        // Multi-select works in the QUEUE view too: queue rows carry entry ids,
        // So ctrl/shift selection is safe there.
        if (mouseEvent.shiftKey || mouseEvent.ctrlKey || mouseEvent.metaKey) {
          const idByAbsIndex = new Map<number, string>();
          playlistList!.querySelectorAll<HTMLElement>("[data-pl-entry]").forEach(r2 => {
            const i = Number(r2.dataset.plIndex); const id = r2.dataset.plEntry || "";
            if (Number.isFinite(i) && id) idByAbsIndex.set(i, id);
          });
          playlistAnchorIndex = applySelectionRange(playlistSelectedEntryIds, entryId, absIndex, idByAbsIndex, playlistAnchorIndex, mouseEvent);
          updatePlaylistSelectionUI();
          return;
        }
        if (playlistSelectedEntryIds.size) clearPlaylistSelection();
        const focus = page.items[index];
        if (!focus) return;
        if (currentPlaylistId === QUEUE_ID) {
          busEmit("melo:play-tracks", { tracks: [focus], index: 0, fromQueue: true });
          return;
        }
        try {
          await invoke!("replace_queue_from_playlist", { playlistId: currentPlaylistId, search: playlistSearchQuery(), sort: playlistSort?.value || "default" });
        } catch (e) {
          // Same rule as the Library play path: never fall back to the
          // Rendered page as a partial queue — play the clicked track only
          // And keep the stored queue intact.
          toast("Couldn't build the play queue from the playlist — playing this track only. " + String(e));
          busEmit("melo:play-tracks", { tracks: [focus], index: 0 });
          return;
        }
        // The queue is entry-keyed (duplicate occurrences of one track are each
        // Queued). Playlist rows retain their own occurrence ids for
        // Edit/reorder.
        await playFromDbQueue(focus);
      };
    });
    updatePlaylistSelectionUI();
    playlistList.querySelectorAll<HTMLElement>("[data-remove-entry]").forEach(button => {
      button.onclick = async event => {
        event.stopPropagation();
        try { await invoke!("remove_playlist_entry", { playlistId: currentPlaylistId, entryId: Number(button.dataset.removeEntry) }); }
        catch (e) { toast("Couldn't remove the playlist entry — " + String(e)); return; }
        busEmit("melo:playlist-changed", { playlistId: currentPlaylistId });
      };
    });
    playlistList.querySelectorAll<HTMLElement>("[data-remove-queue-entry]").forEach(button => {
      button.onclick = async event => {
        event.stopPropagation();
        if (!invoke) return;
        const entryId = Number(button.dataset.removeQueueEntry || 0);
        if (!Number.isFinite(entryId) || entryId <= 0) return;
        try {
          const rows = await invoke<Array<{ entryId: number; trackId: string }>>("remove_queue_entries", { entryIds: [entryId] });
          // The player learns TWICE, deliberately: the reorder broadcast re-points
          // What it can resolve, then the removal event drops the deleted
          // Occurrence (the removed track keeps playing if it was the current one).
          busEmit("melo:queue-reordered", { order: rows.map(r => String(r.entryId)), tracks: rows.map(r => r.trackId) });
          busEmit("melo:queue-entries-removed", { entryIds: [entryId] });
          busEmit("melo:queue-changed", {});
        } catch (e) { toast("Couldn't remove the track from the play queue — " + String(e)); return; }
        await renderPlaylistVirtual(false);
      };
    });
    // Row reorder is POINTER-based (mousedown → mousemove → mouseup):
    // WebView2 runs with Tauri's native drag-drop handler enabled (file
    // Drops depend on it) and that handler swallows HTML5 drag events.
    // Pointer capture bypasses the DnD machinery and coexists with native
    // Drops. Grabbing a selected row moves the WHOLE selection (relative
    // Order preserved) in both views.
    function beginRowDrag(event: MouseEvent, row: HTMLElement) {
      if (event.button !== 0) return;
      if ((event.target as HTMLElement).closest("button, input, select, a")) return;
      const isQueue = viewingQueue;
      // Queue rows carry their own entry ids (duplicates allowed), so BOTH
      // Views key the drag on plEntry.
      const grabId = row.dataset.plEntry || null;
      if (!grabId) return;
      event.preventDefault();
      const ids: string[] = (!playlistSelectedEntryIds.has(grabId) || playlistSelectedEntryIds.size < 2)
        ? [grabId]
        : [...playlistSelectedEntryIds];
      let armed = false;
      const startY = event.clientY;
      const clearHighlights = () =>
        playlistList!.querySelectorAll<HTMLElement>(".drop-target").forEach(r => r.classList.remove("drop-target"));
      const rowIdOf = (el: HTMLElement) => el.dataset.plEntry || "";
      const targetAt = (x: number, y: number): HTMLElement | null => {
        const el = document.elementFromPoint(x, y) as HTMLElement | null;
        const target = el?.closest<HTMLElement>("[data-pl-track]") || null;
        if (!target || target === row) return null;
        if (ids.includes(rowIdOf(target))) return null;
        return target;
      };
      const onMove = (ev: MouseEvent) => {
        if (!armed && Math.abs(ev.clientY - startY) > 4) {
          armed = true;
          row.classList.add("dragging");
          row.style.pointerEvents = "none"; // elementFromPoint must see THROUGH the grabbed row
          document.body.classList.add("row-reordering");
        }
        if (!armed) return;
        ev.preventDefault();
        clearHighlights();
        targetAt(ev.clientX, ev.clientY)?.classList.add("drop-target");
      };
      const onUp = async (ev: MouseEvent) => {
        document.removeEventListener("mousemove", onMove);
        document.removeEventListener("mouseup", onUp);
        document.body.classList.remove("row-reordering");
        row.classList.remove("dragging");
        row.style.pointerEvents = "";
        const target = armed ? targetAt(ev.clientX, ev.clientY) : null;
        clearHighlights();
        const wasArmed = armed;
        const moving = ids.slice();
        armed = false;
        if (!wasArmed || !target || !invoke) return;
        const targetId = rowIdOf(target);
        if (!targetId || moving.includes(targetId)) return;
        const targetIndex = Number(target.dataset.plIndex || 0);
        if (isQueue) {
          try {
            const rows = await invoke<Array<{ entryId: number; trackId: string }>>("move_queue_entries", { entryIds: moving.map(Number), targetIndex });
            if (Array.isArray(rows)) {
              // Entry ids AND track ids — see the player handler.
              busEmit("melo:queue-reordered", { order: rows.map(r => String(r.entryId)), tracks: rows.map(r => r.trackId) });
            }
            busEmit("melo:queue-changed", {});
          } catch (e) { toast("Couldn't reorder the play queue — " + String(e)); }
        } else {
          try {
            await invoke("move_playlist_entries", { playlistId: currentPlaylistId, entryIds: moving.map(Number), targetIndex });
            busEmit("melo:playlist-changed", { playlistId: currentPlaylistId });
          } catch (e) { toast("Couldn't reorder the playlist — " + String(e)); }
        }
      };
      document.addEventListener("mousemove", onMove);
      document.addEventListener("mouseup", onUp);
    }
    if (reorderAllowed) playlistList.querySelectorAll<HTMLElement>("[data-pl-track]").forEach(row => {
      row.addEventListener("mousedown", event => beginRowDrag(event, row));
    });
  }

  // TypeScript cannot call a nullable function after an await without another
  // Guard; this helper centralizes that check for small event handlers.
  async function invokeSafe<T>(command: string, args?: Record<string, unknown>): Promise<T | null> {
    if (!invoke) return null;
    return invoke<T>(command, args);
  }

  async function importPaths(paths: string[], mode: "replace" | "append" | "none" = "replace"): Promise<Track[]> {
    await loadCore();
    if (!invoke || !paths.length) return [];
    let list: Track[];
    try {
      list = await invoke<Track[]>("import_audio_files", {
        paths,
        // "replace" targets the QUEUE, not a playlist: the backend only receives
        // A playlist id when genuinely appending to a real playlist. Import is
        // Append-only on the backend; no playlist replace path remains.
        playlistId: mode === "append" && currentPlaylistId !== QUEUE_ID ? currentPlaylistId : null,
      });
    } catch (e) {
      toast("Couldn't import the selected file(s) — " + String(e));
      return [];
    }
    const hydrated = list.map(normalizeTrack);
    if (hydrated.length && (mode === "replace" || (mode === "append" && currentPlaylistId === QUEUE_ID))) {
      try {
        if (mode === "replace") {
          await invoke("replace_queue_tracks", { trackIds: hydrated.map(t => t.id) });
        } else {
          // The backend returns the new entry ids; stamping them keeps the
          // appended items resolvable for later reorder/removal broadcasts.
          // Queue-changed alone only re-renders views — the player grows its
          // runtime queue from queue-entries-added.
          const entryIds = await invoke<number[]>("append_queue_tracks", { trackIds: hydrated.map(t => t.id) });
          const added = hydrated.map((t, i) => (Array.isArray(entryIds) && entryIds[i] != null ? { ...t, playlistEntryId: Number(entryIds[i]) } : t));
          busEmit("melo:queue-entries-added", { tracks: added });
        }
        busEmit("melo:queue-changed", {});
      } catch (e) {
        toast("Couldn't update the play queue — " + String(e));
      }
    }
    await Promise.all([refreshStats(), refreshPlaylists(), renderLibraryVirtual(), renderPlaylistVirtual()]);
    busEmit("melo:library-changed", { imported: hydrated.length });
    // Announce the playlist change only when a real playlist was touched —
    // Queue writes already announced themselves above.
    if (mode === "append" && currentPlaylistId !== QUEUE_ID) busEmit("melo:playlist-changed", { playlistId: currentPlaylistId });
    return hydrated;
  }

  async function refreshLibraryRoots() {
    await loadCore();
    if (!invoke) return;
    try { libraryRoots = await invoke<LibraryRoot[]>("list_library_roots"); refreshManageDialog(); } catch {}
  }

  async function addLibraryFolders() {
    if (!isTauri || !invoke || activeScanId) return;
    try {
      const { open } = await import("@tauri-apps/plugin-dialog");
      const selected = await open({ directory: true, multiple: true, title: "Add music folders" });
      const paths = Array.isArray(selected) ? selected : (selected ? [selected] : []);
      if (!paths.length) return;
      libraryRoots = await invoke<LibraryRoot[]>("add_library_roots", { paths });
      refreshManageDialog(); busEmit("melo:library-roots-changed", {});
    } catch (e) { toast("Couldn't add the music folder — " + String(e)); }
  }

  async function startManagedScan() {
    await loadCore();
    if (!invoke || activeScanId) return null;
    try {
      const result = await invoke<{ scanId: string }>("start_managed_library_scan");
      activeScanId = result.scanId; ownedScanId = result.scanId; scanProgress = { done: 0, total: 0, errors: 0, phase: "count" }; scanErrorPaths = []; scanErrorCount = 0; scanResultSummary = null;
      invalidateGroupsTotalCache(); // totals go stale the moment a scan starts
      manageButton?.classList.add("scanning"); refreshManageDialog();
      return activeScanId;
    } catch (e) { toast("Couldn't start the Library scan — " + String(e)); return null; }
  }

  async function clearLibrary() {
    if (!invoke) return;
    if (activeScanId) { await showAlertDialog("Scan in progress", "Cancel the active scan before clearing the Library database."); return; }
    if (!await confirmLibraryClear()) return;
    try { await invoke("clear_library_database"); }
    catch (e) { toast("Couldn't clear the Library — " + String(e)); return; }
    await Promise.all([refreshStats(), refreshPlaylists(), renderLibraryVirtual(true), renderPlaylistVirtual(true)]);
    busEmit("melo:library-changed", { cleared: true });
  }

  async function getTrack(id: string): Promise<Track | null> {
    await loadCore();
    if (!invoke) return null;
    const track = await invoke<Track | null>("get_track_by_id", { id });
    return track ? normalizeTrack(track) : null;
  }

  // Batch resolver: one IPC round-trip (one chunked `WHERE id IN` query)
  // For a whole list of ids — Recently Played used to fire up to 50
  // Get_track_by_id calls + SQLite opens per tab open.
  async function getTracksByIds(ids: string[]): Promise<Track[]> {
    await loadCore();
    if (!invoke || !ids.length) return [];
    try {
      const tracks = await invoke<Track[]>("get_tracks_by_ids", { ids });
      const byId = new Map(tracks.map(t => [t.id, t]));
      // IN (...) doesn't preserve order; rebuild it from the id list
      // (Recently Played is most-recent-first). Ids that no longer exist
      // In the library are silently dropped, same as before.
      return ids
        .map(id => byId.get(id))
        .filter((t): t is Track => !!t)
        .map(normalizeTrack);
    } catch {
      return [];
    }
  }

  // Playback history is persisted in SQLite. Only the main/player window
  // records the event so the Library and Playlist windows cannot double-count.
  async function recordTrackPlayed(trackId: string) {
    if (!trackId || role !== "main" || !invoke) return;
    try {
      await invoke("record_track_play", { trackId });
      busEmit("melo:playlist-changed", { playlistId: "__auto_playlists__" });
    } catch {
      // Playback must never be blocked by a statistics write.
    }
  }

  // -----------------------------------------------------------------------
  // Embedded Playlist (optional, skin-provided slot)
  //
  // A lightweight, non-virtualized view of the current playlist for a
  // Skin's layout (skins/README.md "embedded-playlist" hook). No search,
  // Sort, drag-reorder, per-row remove, or M3U export — too much weight
  // For a compact, glanceable strip. Reuses the "queue_tracks" query,
  // Capped to a fixed batch; when the cap truncates, an honest
  // "Showing X of N" footer links to the full Playlist window.
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

  let embeddedRequest = 0;
  async function renderEmbeddedPlaylist() {
    // Only do the work (query + render) while the container is actually
    // Attached inside a skin's hook — if no active skin declares the
    // Embedded-playlist slot, this container just sits detached and idle.
    if (!embeddedPlaylistContainer.isConnected || !invoke) return;
    embeddedPlaylistContainer.style.fontSize = `${embeddedPlaylistFontScale()}%`;
    // Stale-response guard: playlist switches / playlist-changed bursts can
    // Fire several of these in quick succession; only the newest may paint.
    const request = ++embeddedRequest;
    // The embedded strip is the "now playing" surface — it shows the QUEUE,
    // Not whichever playlist is selected elsewhere.
    const page = await invoke<Page<Track>>("queue_tracks", {
      limit: EMBEDDED_PLAYLIST_LIMIT,
      offset: 0,
    }).catch(() => null);
    if (!page || request !== embeddedRequest) return;
    const items = page.items.map(normalizeTrack);
    const showCover = embeddedPlaylistShowCover();
    if (!items.length) {
      embeddedPlaylistContainer.innerHTML = `<div class="embedded-playlist-empty">Play queue is empty</div>`;
      return;
    }
    // The cap must never LOOK complete: when the queue is longer than the
    // Strip, say exactly how much is shown and offer the full window.
    const truncated = page.total > items.length;
    embeddedPlaylistContainer.innerHTML = items.map((track, index) => `
      <div class="embedded-playlist-row ${track.id === currentTrackId ? "active" : ""}" data-ep-track="${esc(track.id)}" data-ep-index="${index}">
        ${showCover ? (track.cover
          ? `<div class="track-cover-mini" style="background-image:url('${esc(track.cover)}');background-size:cover;background-position:center"></div>`
          : `<div class="track-cover-mini cover-default" data-artwork-id="${esc(track.id)}">♪</div>`) : ""}
        <div class="ep-meta"><div class="t-title">${esc(track.title)}</div></div>
      </div>`).join("") + (truncated
        ? `<button type="button" class="embedded-playlist-more" data-ep-more>Showing ${items.length} of ${page.total} — open the Playlist window</button>`
        : "");
    embeddedPlaylistContainer.querySelector<HTMLElement>("[data-ep-more]")?.addEventListener("click", () => {
      // Only the main window hosts the floating panels; in a secondary
      // Panel document the elements simply don't exist and this no-ops.
      const win = document.getElementById("win-playlist");
      if (win && win.classList.contains("hidden")) {
        document.getElementById("btnTogglePlaylist")?.click();
      }
    });
    embeddedPlaylistContainer.querySelectorAll<HTMLElement>("[data-ep-track]").forEach(row => {
      row.onclick = () => {
        // The strip is a WINDOW onto the play queue — the runtime queue must
        // Hydrate to the full DB queue, not just these rows.
        const idx = Number(row.dataset.epIndex || 0);
        const focus = items[idx];
        if (!focus) return;
        busEmit("melo:play-tracks", { tracks: [focus], index: 0, fromQueue: true });
      };
    });
    if (showCover) bindLazyArtwork(embeddedPlaylistContainer);
  }

  (window as any).__MELO_EMBEDDED_PLAYLIST__ = {
    container: embeddedPlaylistContainer,
    refresh: renderEmbeddedPlaylist,
  };

  // Settings propagation: the embedded strip live-re-renders when its
  // Settings change in ANY window, rebuilding from the in-memory queue and
  // Artwork cache (no network, no disk scans). The debounce absorbs
  // Range-slider input storms.
  let embeddedPrefsDebounce: ReturnType<typeof setTimeout> | 0 = 0;
  busOn("melo:pref-changed", (p: any) => {
    if (!p || (p.key !== "embeddedPlaylistCover" && p.key !== "embeddedPlaylistFontScale")) return;
    if (embeddedPrefsDebounce) clearTimeout(embeddedPrefsDebounce);
    embeddedPrefsDebounce = setTimeout(() => {
      embeddedPrefsDebounce = 0;
      renderEmbeddedPlaylist();
    }, 120);
  });

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
  document.querySelectorAll<HTMLButtonElement>("[data-liblayout]").forEach(btn => {
    btn.onclick = event => {
      event.stopPropagation();
      const next = btn.dataset.liblayout === "albums" ? "albums" : "list";
      if (next === libLayout) return;
      libLayout = next;
      try { localStorage.setItem("melo-lib-layout", libLayout); } catch {}
      syncLibViewButtons();
      // At the root group tabs the layout has nothing to change yet — it takes
      // effect on the next drill-in / search.
      if (isLibraryTrackDisplay()) {
        clearLibrarySelection();
        renderLibraryVirtual(true);
      }
    };
  });
  syncLibViewButtons();
  function syncLibraryTabButton() {
    tabs?.querySelectorAll<HTMLElement>("button[data-libtab]").forEach(button => {
      button.classList.toggle("active", button.dataset.libtab === libTab);
    });
    if (artistModeButton && artistModeLabel && artistModeMenu) {
      const mode = libTab === "album-artists" ? "album-artists" : libTab === "artists" ? "artists" : savedArtistMode;
      const option = artistModeMenu.querySelector<HTMLElement>(`[data-libtab="${mode}"]`);
      artistModeLabel.textContent = option?.textContent?.trim() || "Album Artist";
      artistModeMenu.querySelectorAll<HTMLElement>("[data-libtab]").forEach(item => {
        item.setAttribute("aria-selected", item.dataset.libtab === mode ? "true" : "false");
        item.classList.toggle("selected", item.dataset.libtab === mode);
      });
    }
  }
  syncLibraryTabButton();
  tabs?.querySelectorAll<HTMLButtonElement>("button[data-libtab]").forEach(tab => {
    tab.onclick = () => {
      tabs.querySelectorAll("button[data-libtab]").forEach(x => x.classList.remove("active"));
      tab.classList.add("active");
      libTab = (tab.dataset.libtab || "artists") as typeof libTab;
      resetLibrarySelection();
      persistLibraryNavigation();
      renderLibraryVirtual(true);
    };
  });
  function closeArtistModeMenu() {
    if (!artistModeMenu || !artistModeArrowButton) return;
    artistModeMenu.hidden = true;
    artistModeArrowButton.setAttribute("aria-expanded", "false");
    artistModePicker?.classList.remove("open");
  }
  // The label is a normal tab trigger: when the user is on Albums, Genres,
  // or Playlists, clicking it returns to the currently selected grouping.
  artistModeButton?.addEventListener("click", event => {
    event.stopPropagation();
    if (libTab === savedArtistMode) return;
    libTab = savedArtistMode;
    resetLibrarySelection();
    persistLibraryNavigation();
    syncLibraryTabButton();
    renderLibraryVirtual(true);
  });
  // Only the small arrow opens the choice menu.
  artistModeArrowButton?.addEventListener("click", event => {
    event.stopPropagation();
    if (!artistModeMenu) return;
    const opening = artistModeMenu.hidden;
    artistModeMenu.hidden = !opening;
    artistModeArrowButton.setAttribute("aria-expanded", String(opening));
    artistModePicker?.classList.toggle("open", opening);
  });
  artistModeMenu?.querySelectorAll<HTMLButtonElement>("[data-libtab]").forEach(option => {
    option.addEventListener("click", event => {
      event.stopPropagation();
      const mode = option.dataset.libtab;
      if (mode !== "artists" && mode !== "album-artists") return;
      localStorage.setItem(LIBRARY_ARTIST_MODE_KEY, mode);
      savedArtistMode = mode;
      libTab = mode;
      resetLibrarySelection();
      persistLibraryNavigation();
      closeArtistModeMenu();
      syncLibraryTabButton();
      renderLibraryVirtual(true);
    });
  });
  document.addEventListener("click", event => {
    if (!(event.target as HTMLElement).closest("#libraryArtistMode")) closeArtistModeMenu();
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeArtistModeMenu();
  });
  librarySearchFieldSelect?.addEventListener("change", () => {
    // Narrowing the field re-runs the current query immediately;
    // The placeholder hints what the query will match.
    const v = librarySearchFieldSelect.value;
    librarySearchField = v === "artist" || v === "album" || v === "title" ? v : "all";
    if (searchInput) {
      searchInput.placeholder = librarySearchField === "artist" ? "Search by artist…"
        : librarySearchField === "album" ? "Search by album…"
        : librarySearchField === "title" ? "Search by track…"
        : "Search artist, album, track…";
    }
    clearLibrarySelection();
    window.clearTimeout(librarySearchTimer);
    librarySearchTimer = window.setTimeout(() => renderLibraryVirtual(true), 120);
  });
  searchInput?.addEventListener("input", () => {
    updateSearchClear();
    const raw = searchInput.value.trim();
    // Minimum query length — see MIN_SEARCH_LEN.
    librarySearch = raw.length >= MIN_SEARCH_LEN ? raw : "";
    // The result set is about to change — any rows still selected belong
    // To the OLD query and may not even be visible after this re-render,
    // While a later bulk action would still apply to them. Clear first.
    clearLibrarySelection();
    window.clearTimeout(librarySearchTimer);
    librarySearchTimer = window.setTimeout(() => renderLibraryVirtual(true), 180);
  });
  searchClear?.addEventListener("click", () => {
    if (!searchInput) return;
    searchInput.value = "";
    searchInput.focus();
    updateSearchClear();
    librarySearch = "";
    clearLibrarySelection();
    window.clearTimeout(librarySearchTimer);
    renderLibraryVirtual(true);
  });
  // Scrolling inside the loaded window costs nothing. Past its prefetch
  // margin: placeholders fill the gap at once and at most ONE render per
  // interval fetches the next window — throttled (not debounced), so rows
  // keep arriving while the scrollbar is still being dragged.
  const LIBRARY_SCROLL_RENDER_MS = 50;
  let libraryLastScrollRender = 0;
  trackList?.addEventListener("scroll", () => {
    // The removed Recent tab (libTab === "recent") was also a complete list;
    // its durable replacement is the non-virtualized auto playlist pane.
    if (libTab === "playlists" || ((libTab === "artists" || libTab === "album-artists") && selectedArtist && !librarySearch)) return;
    // Album sheets are one complete, non-virtualized render.
    if (sheetModeActive()) return;
    if (libraryWindowCovers()) return;
    paintLibrarySkeleton();
    if (libraryScrollTimer) return;
    const wait = Math.max(0, LIBRARY_SCROLL_RENDER_MS - (performance.now() - libraryLastScrollRender));
    libraryScrollTimer = window.setTimeout(() => {
      libraryScrollTimer = 0;
      libraryLastScrollRender = performance.now();
      if (!libraryWindowCovers()) renderLibraryVirtual();
    }, wait);
  }, { passive: true });
  playlistList?.addEventListener("scroll", () => {
    window.clearTimeout(playlistScrollTimer);
    playlistScrollTimer = window.setTimeout(() => renderPlaylistVirtual(), 60);
  });
  // Keyboard access for playlist rows: delegated ONCE (innerHTML swaps
  // Never detach it) and routed through the same click handlers the mouse
  // Uses, so behavior can't diverge. Arrows navigate RENDERED rows
  // (virtualized) — the same boundary shift-selection has.
  playlistList?.addEventListener("keydown", event => {
    if (!playlistList) return;
    const row = (event.target as HTMLElement).closest?.("[data-pl-track]") as HTMLElement | null;
    if (!row) return;
    const rows = [...playlistList.querySelectorAll<HTMLElement>("[data-pl-track]")];
    const idx = rows.indexOf(row);
    switch (event.key) {
      case "Enter":
      case " ":
        event.preventDefault();
        row.click();
        break;
      case "Delete":
        event.preventDefault();
        if (currentPlaylistId === QUEUE_ID) {
          row.querySelector<HTMLButtonElement>("[data-remove-queue-entry]")?.click();
        } else {
          row.querySelector<HTMLButtonElement>("[data-remove-entry]")?.click();
        }
        break;
      case "ArrowDown":
      case "ArrowUp": {
        event.preventDefault();
        const target = rows[idx + (event.key === "ArrowDown" ? 1 : -1)];
        target?.focus();
        break;
      }
    }
  });
  playlistSearch?.addEventListener("input", () => {
    updatePlaylistSearchClear();
    // Same rule as the Library search: changing the query invalidates the
    // Current selection (rows may leave the visible result set).
    clearPlaylistSelection();
    window.clearTimeout(playlistSearchTimer);
    playlistSearchTimer = window.setTimeout(() => renderPlaylistVirtual(true), 180);
  });
  playlistSearchClear?.addEventListener("click", () => {
    if (!playlistSearch) return;
    playlistSearch.value = "";
    playlistSearch.focus();
    updatePlaylistSearchClear();
    window.clearTimeout(playlistSearchTimer);
    clearPlaylistSelection();
    renderPlaylistVirtual(true);
  });
  playlistSort?.addEventListener("change", async () => {
    clearPlaylistSelection();
    // Sorting the QUEUE persists a new play order (backend rewrite +
    // Broadcast); stored playlists keep projection-only sorting.
    if (currentPlaylistId === QUEUE_ID && (playlistSort?.value || "default") !== "default") {
      try {
        // The payload carries each entry's TRACK id too, so the player can
        // Follow the reorder before its runtime queue is hydrated with entries.
        const rows = await invokeSafe<Array<{ entryId: number; trackId: string }>>("sort_queue", { sort: playlistSort?.value });
        if (rows && Array.isArray(rows)) {
          busEmit("melo:queue-reordered", { order: rows.map(r => String(r.entryId)), tracks: rows.map(r => r.trackId) });
        }
      } catch (e) {
        toast("Couldn't sort the play queue — " + String(e));
      }
      busEmit("melo:queue-changed", {});
    }
    renderPlaylistVirtual(true);
  });
  playlistSelect?.addEventListener("change", () => {
    currentPlaylistId = playlistSelect.value;
    localStorage.setItem("melo-currentPlaylist", currentPlaylistId);
    syncPlaylistChrome();
    clearPlaylistSelection();
    broadcastCurrentPlaylist();
    renderPlaylistVirtual(true);
    renderEmbeddedPlaylist();
  });
  // Playlist menu triggers: the toolbar "⋯" button and right-clicking the
  // Selector. The button stops propagation so the document-level
  // "click closes menus" handler doesn't instantly hide it.
  const playlistMenuButton = document.getElementById("btn-playlist-menu") as HTMLButtonElement | null;
  playlistMenuButton?.addEventListener("click", event => {
    event.stopPropagation();
    if (playlistContextMenu.style.display === "block") { closePlaylistMenu(); return; }
    const rect = playlistMenuButton.getBoundingClientRect();
    openPlaylistMenu(rect.left, rect.bottom + 4);
  });
  playlistSelect?.addEventListener("contextmenu", event => {
    event.preventDefault();
    openPlaylistMenu(event.clientX, event.clientY);
  });
  // Compact view toggle (toolbar): swaps the virtual list's row height,
  // Persists the choice, and re-renders WITHOUT a scroll reset so the user
  // Stays where they were.
  const playlistViewButton = document.getElementById("btn-playlist-view") as HTMLButtonElement | null;
  function syncPlaylistViewButton() {
    if (!playlistViewButton) return;
    const compact = playlistView === "compact";
    playlistViewButton.classList.toggle("active", compact);
    playlistViewButton.setAttribute("aria-pressed", String(compact));
    playlistViewButton.title = compact ? "Normal row height" : "Compact row height";
  }
  playlistViewButton?.addEventListener("click", () => {
    playlistView = playlistView === "compact" ? "normal" : "compact";
    localStorage.setItem("melo-playlist-view", playlistView);
    playlistList?.setAttribute("data-pl-view", playlistView);
    syncPlaylistViewButton();
    renderPlaylistVirtual();
  });
  playlistList?.setAttribute("data-pl-view", playlistView);
  syncPlaylistViewButton();
  manageButton?.addEventListener("click", openManageDialog);
  clearPlaylistButton?.addEventListener("click", async () => {
    if (currentPlaylistId === QUEUE_ID) {
      try {
        await invokeSafe("clear_queue", {});
      } catch (e) {
        toast("Couldn't clear the play queue — " + String(e));
        return;
      }
      await renderPlaylistVirtual(true);
      // The player must STOP and drop its in-memory queue when the queue is
      // Cleared from the Playlist window; this dedicated event tells the
      // Player document the queue is now EMPTY.
      busEmit("melo:queue-cleared", {});
      busEmit("melo:queue-changed", {});
      return;
    }
    // Clearing a stored playlist is irreversible: explicit confirmation
    // Naming the playlist and its size (no undo by design — the dialog is
    // The safety net).
    const pl = playlists.find(p => p.id === currentPlaylistId);
    if (pl?.kind === "auto") {
      toast("Automatic playlists are read-only");
      return;
    }
    if (!await confirmDanger(
      "Clear Playlist?",
      `All ${pl?.trackCount ?? 0} track(s) will be removed from “${pl?.name || "playlist"}”. The audio files on disk are not affected.`,
      "Clear Playlist"
    )) return;
    try {
      await invokeSafe("clear_playlist", { playlistId: currentPlaylistId });
    } catch (e) {
      toast("Couldn't clear the playlist — " + String(e));
      return;
    }
    await Promise.all([refreshPlaylists(), renderPlaylistVirtual(true)]);
    busEmit("melo:playlist-changed", { playlistId: currentPlaylistId });
  });
  newPlaylistButton?.addEventListener("click", async () => {
    const name = (await showPromptDialog("New Playlist", "Playlist name:", "New Playlist"))?.trim();
    if (!name) return;
    let created: PlaylistRow | null = null;
    try {
      created = await invokeSafe<PlaylistRow>("create_playlist", { name });
    } catch (e) {
      toast(`Couldn't create the playlist — ${String(e)}`);
    }
    if (created) {
      currentPlaylistId = created.id;
      broadcastCurrentPlaylist();
    }
    await Promise.all([refreshPlaylists(), renderPlaylistVirtual(true)]);
  });
  // Relative M3U entries must resolve from the folder the playlist file is
  // SAVED INTO — the backend joins base_dir (the .m3u's folder) with each
  // Entry on re-import. These helpers split Windows/POSIX paths into
  // Components (case-insensitive) and build a relative path, or null when
  // No prefix is shared (different drives) so callers fall back to
  // Absolute paths.
  function splitPathComponents(p: string): string[] {
    return p.replace(/[\\/]+$/, "").split(/[\\/]/);
  }
  function dirnameOf(p: string): string {
    const parts = splitPathComponents(p);
    parts.pop();
    return parts.join("\\") + "\\";
  }
  function relativeFromDir(fromDir: string, toPath: string): string | null {
    const from = splitPathComponents(fromDir);
    const to = splitPathComponents(toPath);
    let shared = 0;
    while (shared < from.length && shared < to.length && from[shared].toLowerCase() === to[shared].toLowerCase()) shared++;
    if (shared === 0) return null;
    const sep = toPath.includes("\\") ? "\\" : "/";
    return Array.from({ length: from.length - shared }, () => "..").concat(to.slice(shared)).join(sep);
  }

  function chooseExportPathStyle(): Promise<"absolute" | "relative" | null> {
    return new Promise(resolve => {
      const overlay = document.createElement("div");
      overlay.className = "confirm-overlay";
      overlay.innerHTML = `<div class="confirm-dialog" role="dialog" aria-modal="true" aria-labelledby="exportStyleTitle">
        <div id="exportStyleTitle" class="confirm-title">Export Playlist</div>
        <div class="confirm-message">Relative paths are stored relative to the exported file\u2019s own folder, so the playlist keeps working when that folder is moved together with your music (e.g. to another PC). Absolute paths only work on this computer.</div>
        <div class="confirm-actions"><button class="btn small" data-confirm="cancel">Cancel</button><button class="btn small" data-confirm="absolute">Absolute Paths</button><button class="btn small" data-confirm="relative">Relative Paths</button></div>
      </div>`;
      document.body.appendChild(overlay);
      const finish = (v: "absolute" | "relative" | null) => { document.removeEventListener("keydown", onKey); overlay.remove(); resolve(v); };
      overlay.querySelector<HTMLElement>("[data-confirm='cancel']")!.onclick = () => finish(null);
      overlay.querySelector<HTMLElement>("[data-confirm='absolute']")!.onclick = () => finish("absolute");
      overlay.querySelector<HTMLElement>("[data-confirm='relative']")!.onclick = () => finish("relative");
      overlay.onclick = event => { if (event.target === overlay) finish(null); };
      const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") finish(null); };
      document.addEventListener("keydown", onKey);
    });
  }

  // Free-form playlist names must not flow unchecked into an export file
  // Name: invalid Windows characters and control codes become "_",
  // Trailing dots go away, length is capped.
  function sanitizeFileName(name: string): string {
    const cleaned = name.replace(/[<>:"/\\|?*\u0000-\u001f]/g, "_").trim();
    // Re-strip after the length cut: truncation can re-expose a trailing dot.
    const capped = cleaned.slice(0, 80).trim().replace(/\.+$/, "").trim();
    return capped || "playlist";
  }

  // M3U import: a chosen .m3u/.m3u8 becomes a NEW playlist (the backend
  // Parses, imports existing files, reports missing ones). Never touches
  // The queue or existing playlists.
  const importButton = document.getElementById("btn-import-playlist") as HTMLButtonElement | null;
  importButton?.addEventListener("click", async () => {
    if (!isTauri || !invoke) { toast("Importing playlists is available in the desktop build"); return; }
    let chosen: string | null = null;
    try {
      const { open } = await import("@tauri-apps/plugin-dialog");
      const sel = await open({ multiple: false, title: "Import M3U playlist", filters: [{ name: "M3U Playlist", extensions: ["m3u", "m3u8"] }] });
      if (!sel || Array.isArray(sel)) return; // cancelled
      chosen = sel;
    } catch (e) { toast(`Couldn't choose the playlist file — ${String(e)}`); return; }
    type M3uImportResult = { playlistId: string; playlistName: string; imported: number; missing: string[]; total: number };
    let res: M3uImportResult | null = null;
    try { res = await invoke<M3uImportResult>("import_m3u_file", { path: chosen }); }
    catch (e) { toast(`Couldn't import the playlist — ${String(e)}`); return; }
    if (!res) return;
    await refreshPlaylists(); // include the new playlist BEFORE selecting it
    currentPlaylistId = res.playlistId;
    broadcastCurrentPlaylist();
    await renderPlaylistVirtual(true);
    const missingCount = res.total - res.imported;
    if (missingCount > 0) {
      const shown = res.missing.slice(0, 5).join(", ");
      const more = res.missing.length > 5 ? ` (+${res.missing.length - 5} more)` : "";
      await showAlertDialog(
        "Import finished with missing files",
        `Imported ${res.imported} of ${res.total} track(s) into “${res.playlistName}”. ${missingCount} file(s) listed in the playlist were not found or couldn't be read: ${shown}${more}`
      );
    } else {
      toast(`Imported ${res.imported} track(s) into “${res.playlistName}”`);
    }
  });

  exportButton?.addEventListener("click", async () => {
    if (!invoke) return;
    const all: Track[] = [];
    let offset = 0;
    try {
      while (true) {
        const page = currentPlaylistId === QUEUE_ID
          ? await invoke<Page<Track>>("queue_tracks", { limit: 500, offset })
          : await invoke<Page<Track>>("playlist_tracks", { playlistId: currentPlaylistId, search: null, sort: "default", limit: 500, offset });
        all.push(...page.items);
        offset += page.items.length;
        if (offset >= page.total || !page.items.length) break;
      }
    } catch (e) {
      toast("Couldn't read the playlist for export — " + String(e));
      return;
    }
    if (!all.length) return;
    const style = await chooseExportPathStyle();
    if (!style) return;
    // Keep the EXTINF line single-line — a raw tag containing CR/LF would
    // Corrupt the M3U structure.
    const oneLine = (s: string) => s.replace(/[\r\n]+/g, " ").trim();
    // Stored paths are canonicalized with the Windows extended-length
    // Prefix; entries must be written prefix-free.
    const stripExtPrefix = (p: string) => p.startsWith("\\\\?\\") ? p.slice(4) : p; // \\?\ prefix (4 chars)
    const baseName = currentPlaylistId === QUEUE_ID ? "Now Playing" : (playlists.find(p => p.id === currentPlaylistId)?.name || "playlist");
    const fileName = `${sanitizeFileName(baseName)}.m3u8`;
    const buildText = (pathFor: (p: string) => string) =>
      "#EXTM3U\n" + all.map(t => `#EXTINF:${Math.floor(t.duration)},${oneLine(`${t.artist} - ${t.title}`)}\n${pathFor(stripExtPrefix(t.path))}`).join("\n");
    if (isTauri) {
      // Native save dialog + write where the USER chose (the <a download> Blob
      // Flow is unreliable inside the Tauri webview; it stays as the browser
      // Fallback). The dialog runs BEFORE the text is built so relative
      // Entries resolve against the actual save folder — the same base the
      // Import side uses.
      try {
        const { save } = await import("@tauri-apps/plugin-dialog");
        const target = await save({ defaultPath: fileName, filters: [{ name: "M3U Playlist", extensions: ["m3u", "m3u8"] }] });
        if (!target) return; // user cancelled the dialog
        let text: string;
        if (style === "relative") {
          const baseDir = dirnameOf(target);
          const relatives = all.map(t => relativeFromDir(baseDir, stripExtPrefix(t.path)));
          if (relatives.some(r => r === null)) {
            toast("Tracks span different drives — used absolute paths instead");
            text = buildText(p => p);
          } else {
            text = buildText(p => relativeFromDir(baseDir, stripExtPrefix(p)) || p);
          }
        } else {
          text = buildText(p => p);
        }
        await invokeSafe("write_text_file", { path: target, contents: text });
        toast(`Playlist exported to ${target}`);
      } catch (e) {
        toast("Couldn't export the playlist — " + String(e));
      }
      return;
    }
    const text = buildText(p => p);
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([text], { type: "audio/x-mpegurl" }));
    a.download = fileName;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  });

  // Native OS drag-and-drop intentionally has no Library import handler.
  // Music becomes Library-owned only through Manage → Add Folder → Scan.

  // Backend-level scan failure: clear transient UI state in every Library
  // View. Only the window that launched it receives the explanatory toast.
  busOn("melo:scan-error", (payload: any) => {
    const ours = payload?.scanId === ownedScanId;
    activeScanId = null; ownedScanId = null; scanProgress = null; scanErrorPaths = []; scanResultSummary = null; scanErrorCount = 0;
    manageButton?.classList.remove("scanning"); setManageLabel(); refreshManageDialog();
    if (ours) toast("Library scan failed" + (payload?.error ? ` — ${payload.error}` : ""));
  });
  // Rows are added/removed while a scan runs. Marking the browse caches stale
  // (at most every 2s, and always at the end) lets the next scroll refetch
  // fresh data and a fresh total; it costs nothing until then.
  let lastScanInvalidate = 0;
  busOn("melo:scan-progress", async (progress: any) => {
    if (!progress) return;
    if (progress.finished || Date.now() - lastScanInvalidate > 2000) {
      lastScanInvalidate = Date.now();
      invalidateGroupsTotalCache();
    }
    if (progress.scanId) activeScanId = progress.scanId;
    scanProgress = { done: Number(progress.done || 0), total: Number(progress.total || 0), errors: Number(progress.errors || 0), removed: Number(progress.removed || 0), phase: String(progress.phase || "scan") };
    scanErrorCount = Number(progress.errors || 0);
    if (Array.isArray(progress.errorPaths) && progress.errorPaths.length) {
      // Merge per-tick lists, dedupe, cap — a 10k-file scan with 500
      // Broken files must not balloon the dialog.
      const merged = new Set(scanErrorPaths);
      for (const p of progress.errorPaths) { if (typeof p === "string") merged.add(p); }
      scanErrorPaths = Array.from(merged).slice(0, SCAN_ERROR_LIST_CAP);
    }
    if (progress.finished) { /* keep the list for the completion toast below */ }
    if (manageButton) {
      const pct = progress.total ? Math.max(0, Math.min(100, (Number(progress.done || 0) / Number(progress.total)) * 100)) : 0;
      manageButton.style.setProperty("--scan-progress", `${pct}%`);
      manageButton.classList.toggle("scanning", !progress.finished);
    }
    refreshManageDialog();
    if (!progress.finished) return;
    // Persistent completion banner in Manage.
      scanResultSummary = {
      text: progress.cancelled
        ? `Scan cancelled — ${scanProgress?.done ?? 0} track(s) processed, ${scanProgress?.errors ?? 0} error(s)`
        : `Scan complete — ${scanProgress?.total ?? 0} track(s) found, ${progress.added ?? 0} added, ${progress.removed ?? 0} removed from Library, ${scanProgress?.errors ?? 0} unreadable file(s)${scanErrorPaths.length ? " (listed above)" : ""}`,
      ok: !progress.cancelled,
    };
    const ours = progress.scanId === ownedScanId;
    if (Number(progress.errors || 0) > 0 && ours) {
      const names = scanErrorPaths.slice(0, 3).map(p => p.split(/[\\/]/).pop() || p);
      const more = scanErrorPaths.length > 3 ? ` +${scanErrorPaths.length - 3} more (see Manage)` : (Number(progress.errors) > scanErrorPaths.length ? ` (see Manage)` : "");
      toast(progress.cancelled
        ? `Scan cancelled — ${progress.errors} file(s) couldn't be read: ${names.join(", ")}${more}`
        : `Scan finished — ${progress.errors} file(s) couldn't be read: ${names.join(", ")}${more}`);
    }
    // The unreadable-file list STAYS while the banner ("(listed above)") is
    // Visible — wiping it here made the final refreshManageDialog() hide the
    // List the banner promises.
    activeScanId = null; ownedScanId = null; scanProgress = null;
    if (manageButton) { setManageLabel(); manageButton.classList.remove("scanning"); manageButton.style.setProperty("--scan-progress", "0%"); }
    refreshManageDialog();
    await Promise.all([refreshStats(), refreshPlaylists(), renderLibraryVirtual(), renderPlaylistVirtual()]);
  });
  busOn("melo:library-roots-changed", () => { refreshLibraryRoots(); });
  busOn("melo:open-library-manager", () => { openManageDialog(); });
  let refreshTimer = 0;
  busOn("melo:library-changed", () => {
    window.clearTimeout(refreshTimer);
    refreshTimer = window.setTimeout(() => {
      // Library contents changed — the per-view group totals must be
      // Re-counted on the next render.
      invalidateGroupsTotalCache();
      refreshStats();
      // Library deletions cascade into playlist membership, so the selector's
      // Per-playlist counters refresh on the same debounced pass.
      refreshPlaylists();
      renderLibraryVirtual();
      renderPlaylistVirtual();
    }, 500);
  });
  busOn("melo:playlist-changed", () => {
    refreshPlaylists();
    renderPlaylistVirtual();
    renderEmbeddedPlaylist();
  });
  busOn("melo:queue-changed", () => {
    if (currentPlaylistId === QUEUE_ID) renderPlaylistVirtual();
    renderEmbeddedPlaylist();
  });
  busOn("melo:current-playlist-changed", (payload: any) => {
    // Ignore our own broadcast (the bus delivers emits back to the sender
    // Too), anything carrying a foreign/unknown identity, and stale
    // Revisions (an event that crossed windows AFTER the user already made
    // A newer local choice must not undo it).
    if (!payload || payload.source === role) return;
    const id = String(payload.playlistId || "");
    if (!id || id === currentPlaylistId) return;
    const rev = Number(payload.rev || 0);
    if (rev && playlistSyncRev && rev < playlistSyncRev) return;
    if (rev) playlistSyncRev = rev;
    applySyncedPlaylist(id);
  });

  // Keep the "now playing" row highlighted in the Playlist window.
  busOn("melo:track-changed", (t: any) => {
    setActiveTrack(t?.id || null);
    if (t?.id) recordTrackPlayed(t.id);
    embeddedPlaylistContainer.querySelectorAll<HTMLElement>("[data-ep-track]").forEach(row => {
      row.classList.toggle("active", row.dataset.epTrack === (t?.id || null));
    });
  });
  busOn("melo:playback-state", (s: any) => setActiveTrack(s?.track?.id || null));

  // When this window (re)opens, restore the active-track highlight from the
  // Player's current state instead of waiting for the next track change.
  try {
    const saved = JSON.parse(localStorage.getItem("melo-current-track") || "null");
    if (saved?.id) setActiveTrack(saved.id);
  } catch {}
  busEmit("melo:request-playback-state");
  setTimeout(() => busEmit("melo:request-playback-state"), 250);

  function getCurrentPlaylistId(): string {
    return currentPlaylistId;
  }

  // Paged read of the whole queue (no silent cap): the main player's
  // Resume path uses it to rebuild "what was playing".
  async function getQueueTracksAll(): Promise<Track[]> {
    if (!invoke) return [];
    try {
      const out: Track[] = [];
      let offset = 0;
      while (true) {
        const page = await invoke<Page<Track>>("queue_tracks", { limit: 2000, offset });
        out.push(...page.items.map(normalizeTrack));
        offset += page.items.length;
        if (offset >= page.total || !page.items.length) break;
      }
      return out;
    } catch {
      return [];
    }
  }

  async function getPlaylistTracksAll(playlistId: string): Promise<Track[]> {
    if (!invoke || !playlistId) return [];
    try {
      // Playlist_tracks joins on membership, not library_owned, so this
      // Includes tracks that only live inside a playlist and were never
      // Scanned. Paged like getQueueTracksAll: a one-shot limit=20000 fetch
      // Silently truncated bigger playlists (the server clamp caps at 5000),
      // So pages of 2000 walk the real total.
      const out: Track[] = [];
      let offset = 0;
      while (true) {
        const page = await invoke<Page<Track>>("playlist_tracks", { playlistId, search: null, sort: "default", limit: 2000, offset });
        out.push(...page.items.map(normalizeTrack));
        offset += page.items.length;
        if (offset >= page.total || !page.items.length) break;
      }
      return out;
    } catch {
      return [];
    }
  }

  async function getAllTracks(): Promise<Track[]> {
    if (!invoke) return [];
    try {
      // Paged (2000/shot, under the server clamp of 5000) — a one-shot
      // Limit=20000 fetch silently truncated libraries past the cap.
      const out: Track[] = [];
      let offset = 0;
      while (true) {
        const page = await invoke<Page<Track>>("library_tracks", { search: null, field: null, artist: null, albumArtist: null, album: null, genre: null, sort: "title-asc", limit: 2000, offset });
        out.push(...page.items.map(normalizeTrack));
        offset += page.items.length;
        if (offset >= page.total || !page.items.length) break;
      }
      return out;
    } catch {
      return [];
    }
  }

  (window as any).LumiLibrary = {
    get playlists() { return playlists; },
    openManage: openManageDialog,
    startManagedScan,
    importPaths,
    getTrack,
    getCurrentPlaylistId,
    getQueueTracksAll,
    getPlaylistTracksAll,
    getAllTracks,
    render: () => renderLibraryVirtual(),
    addTracks: () => {},
    addToCurrentPlaylist: async (list: Track[]) => {
      if (!invoke || !list.length) return;
      if (currentPlaylistId === QUEUE_ID) {
        toast("Select a playlist in the Playlist window first");
        return;
      }
      await invoke("add_tracks_to_playlist", { playlistId: currentPlaylistId, trackIds: list.map(t => t.id) });
      busEmit("melo:playlist-changed", { playlistId: currentPlaylistId });
    },
    currentPlaylistName: () => playlists.find(p => p.id === currentPlaylistId)?.name || "Playlist",
  };

  window.addEventListener("pagehide", persistLibraryNavigation);
  window.addEventListener("beforeunload", persistLibraryNavigation);
  loadCore().catch(() => toast("Could not initialize the Library database"));
}
