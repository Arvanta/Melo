import "./app.css";
import { setupPlayer } from "./player";
import { setupLibrary } from "./library";
import { setupEqualizer } from "./equalizer";
import { setupVisualizer, VIZ_MODES } from "./visualizer";
import { setupLyrics } from "./lyrics";
import { setupSkinLyricLine } from "./lyric-line";
import { setupSkinEngine, resetSkin, applySkinChoice, listInstalledSkins, openSkinsFolderOnDisk, findHook, readSkinGeometry } from "./skin";
import { withCover } from "./cover";
import { busEmit, busOn, isTauri } from "./bus";
import { t, initLocale, setLocale, AVAILABLE_LOCALES, getLocaleCode } from "./i18n";
import { getAppVersion } from "./version";
import { runSettingsMigrations, resetAllSettings, readSetting, writeSetting } from "./settings";
import type { Track } from "./types";
// Geometry helpers (debounce / persist / resolve+clamp) live in
// Window-geometry.ts.
import { debounceForFlush, persistGeometry, resolveAndClampGeometry } from "./window-geometry";

type ToastFn = (msg: string) => void;

// Upgrades a styled <div> switch into a real one for assistive tech:
// Role/tabindex/aria-checked plus Space/Enter activation. aria-checked is
// Re-synced by the same code paths that toggle the visual .on class.
function makeSwitchAccessible(sw: HTMLElement) {
  if (sw.getAttribute("role") === "switch") return;
  sw.setAttribute("role", "switch");
  sw.tabIndex = 0;
  sw.setAttribute("aria-checked", sw.classList.contains("on") ? "true" : "false");
  sw.addEventListener("keydown", (e) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      sw.click();
    }
  });
}
function syncSwitchAria(sw: HTMLElement) {
  if (sw.getAttribute("role") === "switch") {
    sw.setAttribute("aria-checked", sw.classList.contains("on") ? "true" : "false");
  }
}

// One-time migration from the old "Lumi" localStorage keys to "melo-*"
// Keys. Safe every launch: a no-op once the new key exists.
(function migrateLegacyLumiStorageKeys() {
  const renames: [string, string][] = [
    ["lumi-theme", "melo-theme"],
    ["lumi-custom-skin", "melo-custom-skin"],
    ["lumi-custom-skin-isFull", "melo-custom-skin-isFull"],
  ];
  for (const [oldKey, newKey] of renames) {
    try {
      const oldVal = localStorage.getItem(oldKey);
      if (oldVal !== null && localStorage.getItem(newKey) === null) {
        localStorage.setItem(newKey, oldVal);
      }
      if (oldVal !== null) localStorage.removeItem(oldKey);
    } catch {}
  }
  // Browser-fallback geometry keys used a dynamic "lumiv2-<id>" prefix.
  try {
    const legacyKeys: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith("lumiv2-")) legacyKeys.push(k);
    }
    for (const oldKey of legacyKeys) {
      const newKey = "melo-win-" + oldKey.slice("lumiv2-".length);
      const oldVal = localStorage.getItem(oldKey);
      if (oldVal !== null && localStorage.getItem(newKey) === null) {
        localStorage.setItem(newKey, oldVal);
      }
      localStorage.removeItem(oldKey);
    }
  } catch {}
})();

// Boot diagnostic: one console line per document pinning Tauri detection,
// The URL (?panel=) and the build stamp — makes multi-window reports
// Debuggable.
console.info("[melo] boot", {
  isTauri,
  url: location.href,
  build: document.querySelector('meta[name="melo-build"]')?.getAttribute("content") || "unknown",
});

const app = document.querySelector<HTMLDivElement>("#app")!;

app.innerHTML = `
<div class="app-shell" data-testid="app-shell">
  <!-- DESKTOP FOR FLOATING WINDOWS -->
  <div class="desktop" id="desktop">

    <!-- LIBRARY WINDOW -->
    <div class="float-win" id="win-library" style="left:14px; top:12px; width:340px; height:460px; z-index:2;">
      <div class="float-header" data-drag="win-library">
        <div class="float-title">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m16 6 4 14"/><path d="M12 6v14"/><path d="M8 8v12"/><path d="M4 4v16"/></svg>
          Library
        </div>
        <div class="float-actions">
          <button class="float-btn" data-close="win-library" title="Hide">—</button>
          <button class="float-btn close" data-close="win-library" title="Close">×</button>
        </div>
      </div>
      <div class="float-body" style="padding:0; display:flex; flex-direction:column;">
        <div class="library-search-row">
          <!-- search-field filter: All (default) / Artist / Album / Track -->
          <select id="librarySearchField" class="settings-select library-search-field" title="Limit the search to a field" aria-label="Search field">
            <option value="all">All</option>
            <option value="artist">Artist</option>
            <option value="album">Album</option>
            <option value="title">Track</option>
          </select>
          <div class="search-wrap">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            <input id="searchInput" class="search-input" placeholder="Search artist, album, track…" />
            <button class="search-clear" id="searchClear" type="button" aria-label="Clear search" title="Clear search">×</button>
          </div>
          <button class="btn small library-action manage-action" id="btn-manage-library" title="Manage music folders, scan, or clear the Library">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 21v-7m0-4V3m8 18v-9m0-4V3m8 18v-5m0-4V3"/><circle cx="4" cy="12" r="2"/><circle cx="12" cy="10" r="2"/><circle cx="20" cy="14" r="2"/></svg>
            <span class="manage-label">Manage</span>
          </button>
        </div>
        <div class="tabs" id="libraryTabs" style="flex-shrink:0;">
          <div class="library-artist-mode-picker" id="libraryArtistMode">
            <button type="button" class="tab library-tab-current" id="libraryArtistModeButton" aria-label="Open selected artist grouping">
              <span id="libraryArtistModeLabel">Album Artist</span>
            </button>
            <button type="button" class="tab library-tab-arrow" id="libraryArtistModeArrow" aria-haspopup="listbox" aria-expanded="false" aria-label="Choose artist grouping" title="Choose Artist or Album Artist">
              <svg class="library-artist-mode-arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>
            </button>
            <div class="library-artist-mode-menu" id="libraryArtistModeMenu" role="listbox" aria-label="Artist grouping" hidden>
              <button type="button" role="option" data-libtab="artists">Artists</button>
              <button type="button" role="option" data-libtab="album-artists">Album Artist</button>
            </div>
          </div>
          <button class="tab" data-libtab="albums">Albums</button>
          <button class="tab" data-libtab="genres">Genres</button>
          <button class="tab" data-libtab="playlists">Playlists</button>
          <div class="lib-switches">
          <div class="lib-layout-switch" id="libLayoutSwitch" title="Track display">
            <button type="button" class="lib-view-btn" data-liblayout="list" title="Track List" aria-label="Track List">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="4" height="4" rx="1"/><rect x="3" y="10" width="4" height="4" rx="1"/><rect x="3" y="16" width="4" height="4" rx="1"/><path d="M11 6h10M11 12h10M11 18h10"/></svg>
            </button>
            <button type="button" class="lib-view-btn active" data-liblayout="albums" title="Album Sheets" aria-label="Album Sheets">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="8" height="8" rx="1"/><path d="M14 5h7M14 9h7M3 15h7M14 15h7M3 19h7M14 19h7"/></svg>
            </button>
          </div>
          <div class="lib-view-switch" id="libViewSwitch" title="Library view">
            <button type="button" class="lib-view-btn active" data-libview="details" title="Details">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/></svg>
            </button>
            <button type="button" class="lib-view-btn" data-libview="compact" title="Compact">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 10h16M4 14h16M4 18h16"/></svg>
            </button>
            <button type="button" class="lib-view-btn" data-libview="tiles" title="Tiles">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
            </button>
          </div>
          </div>
        </div>
        <div class="library-stats-row" style="padding:8px 12px; display:flex; justify-content:space-between; align-items:center; font-size:11px; color:var(--text-muted); border-bottom:1px solid var(--card-border); flex-shrink:0;">
          <span id="libraryStats">0 tracks • 0 artists • 0 albums</span>
        </div>
        <div id="trackList" style="display:flex; flex-direction:column; flex:1; overflow:auto;"></div>
        <div id="tagEditor" style="display:none; margin:8px 10px 0; background:var(--track-bg); border-radius:10px; padding:12px; gap:10px; flex-direction:column; border:1px solid var(--card-border); flex-shrink:0;">
          <div style="font-weight:600; font-size:12px;">Metadata Editor</div>
          <div class="tag-editor-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
            <label class="col" style="gap:4px; font-size:11px;">Title<input id="tagTitle" class="search-input" style="padding-left:10px;" /></label>
            <label class="col" style="gap:4px; font-size:11px;">Artist<input id="tagArtist" class="search-input" style="padding-left:10px;" /></label>
            <label class="col" style="gap:4px; font-size:11px;">Album<input id="tagAlbum" class="search-input" style="padding-left:10px;" /></label>
            <label class="col" style="gap:4px; font-size:11px;">Year<input id="tagYear" class="search-input" style="padding-left:10px;" /></label>
          </div>
          <label class="col" style="gap:4px; font-size:11px;">Cover<input id="tagCover" type="file" accept="image/*" /></label>
          <div class="row" style="justify-content:flex-end;">
            <button class="btn small" id="btn-tag-cancel">Cancel</button>
            <button class="btn small primary" id="btn-tag-save">Save</button>
          </div>
        </div>
        <!-- hidden playlistList kept for library.ts internal logic -->
        <div id="playlistList" style="display:none;"></div>
        <div id="queueList" style="display:none;"></div>
      </div>
      <div class="resize-handle" data-resize="win-library">◢</div>
    </div>

    <!-- PLAYLIST WINDOW -->
    <div class="float-win" id="win-playlist" style="left:370px; top:12px; width:360px; height:480px; z-index:3;">
      <div class="float-header" data-drag="win-playlist">
        <div class="float-title">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
          Playlist
        </div>
        <div class="float-actions">
          <button class="float-btn" data-close="win-playlist" title="Hide">—</button>
          <button class="float-btn close" data-close="win-playlist">×</button>
        </div>
      </div>
      <div class="float-body" style="padding:6px 4px 4px; display:flex; flex-direction:column; gap:0px;">
        <div class="playlist-toolbar" style="display:flex; gap:6px; align-items:center; flex-shrink:0; flex-wrap:wrap; padding:0 4px;">
          <select id="playlistSelect" class="settings-select" style="height:28px; font-size:11px; padding:2px 8px; flex:1 1 140px; min-width:80px;" title="Current playlist"></select>
          <button class="btn small ghost" id="btn-new-playlist" title="New playlist" style="height:28px; width:28px; padding:0; font-size:16px; line-height:1; justify-content:center; flex:0 0 auto;">+</button>
          <button class="btn small ghost" id="btn-playlist-menu" title="Playlist actions (rename, duplicate, remove missing, delete)" aria-label="Playlist actions" aria-haspopup="menu" style="height:28px; width:28px; padding:0; font-size:15px; line-height:1; justify-content:center; flex:0 0 auto;">⋯</button>
          <select id="playlistSortSelect" class="settings-select" style="height:28px; font-size:11px; padding:2px 4px; width:92px; min-width:64px; flex:1 1 64px;" title="Sort tracks">
            <option value="default">Sort: Default</option>
            <option value="title-asc">Title (A-Z)</option>
            <option value="artist-asc">Artist (A-Z)</option>
            <option value="album-asc">Album (A-Z)</option>
            <option value="dur-asc">Shortest</option>
            <option value="dur-desc">Longest</option>
          </select>
          <button class="btn small ghost" id="btn-playlist-view" title="Compact row height" aria-pressed="false" style="height:28px; width:28px; padding:0; justify-content:center; flex:0 0 auto;">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="5" x2="21" y2="5"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="19" x2="21" y2="19"/></svg>
          </button>
        </div>
        <div id="winPlaylistTracks" class="drop-zone" role="listbox" aria-label="Playlist tracks" style="flex:1; overflow:auto; display:flex; flex-direction:column; min-height:140px; margin-top:4px;">
          <div id="winPlaylistEmpty" style="display:none; border:1px dashed var(--card-border); border-radius:10px; padding:16px 10px; background:var(--track-bg); text-align:center; font-size:11px; color:var(--text-muted); line-height:1.8; margin:auto 4px;">
            Playlist is empty<br/>Use the Library to add tracks
          </div>
        </div>
        <div class="playlist-footer-actions" style="display:flex; gap:6px; flex-shrink:0; align-items:center; padding:8px 4px 4px;">
          <div class="playlist-search-wrap" style="flex:1 1 auto; position:relative; min-width:100px; height:28px;">
            <input id="playlistSearchInput" class="search-input" placeholder="Search playlist…" style="width:100%; height:100%; font-size:11px; padding:0 28px 0 10px;" />
            <button class="search-clear" id="playlistSearchClear" type="button" aria-label="Clear search" title="Clear search">×</button>
          </div>
          <!-- icon-only Import/Export; the title tooltip keeps it accessible. -->
          <button class="btn small" id="btn-import-playlist" title="Import an M3U/M3U8 playlist as a new playlist" aria-label="Import playlist" style="height:28px; width:28px; padding:0; justify-content:center; gap:0;">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
          </button>
          <button class="btn small" id="btn-export-playlist" title="Export playlist as M3U" aria-label="Export playlist" style="height:28px; width:28px; padding:0; justify-content:center; gap:0;">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          </button>
          <button class="btn small" id="btn-clear-playlist" style="height:28px; padding:0 12px; justify-content:center; color:#e5484d; gap:5px;" title="Remove all tracks from the current playlist">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="m19 6-1 14H6L5 6"/></svg>
            Clear
          </button>
        </div>
      </div>
      <div class="resize-handle" data-resize="win-playlist">◢</div>
    </div>

    <!-- EQUALIZER WINDOW -->
    <div class="float-win" id="win-equalizer" style="left:14px; top:12px; width:540px; height:320px; z-index:2;">
      <div class="float-header" data-drag="win-equalizer">
        <div class="float-title">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 14h3v7H3zM9 10h3v11H9zM15 6h3v15h-3zM21 12h-3v9h3z"/></svg>
          Equalizer
        </div>
        <div class="float-actions">
          <button class="float-btn" data-close="win-equalizer">—</button>
          <button class="float-btn close" data-close="win-equalizer">×</button>
        </div>
      </div>
      <div class="float-body" style="padding:10px 12px; display:flex; flex-direction:column; gap:8px;">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; padding-bottom:2px;">
          <div style="display:flex; align-items:center; gap:8px;">
            <label style="font-size:11px; font-weight:600; color:var(--text-soft);">Preset:</label>
            <select id="eqPreset" class="eq-preset-native" aria-hidden="true" tabindex="-1">
              <option value="flat">Flat</option>
              <option value="pop">Pop</option>
              <option value="rock">Rock</option>
              <option value="bass">Bass Boost</option>
              <option value="treble">Treble Boost</option>
              <option value="dance">Electronic / Dance</option>
              <option value="jazz">Jazz</option>
              <option value="classical">Classical</option>
              <option value="vocal">Vocal Boost</option>
              <option value="acoustic">Acoustic</option>
              <option value="hiphop">Hip Hop</option>
              <option value="metal">Metal</option>
              <option value="custom" disabled>Custom</option>
            </select>
            <div class="eq-preset-picker" id="eqPresetPicker">
              <button type="button" class="eq-preset-trigger" id="eqPresetButton" aria-haspopup="listbox" aria-expanded="false" aria-label="Choose equalizer preset">
                <span id="eqPresetLabel">Flat</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>
              </button>
              <div class="eq-preset-menu" id="eqPresetMenu" role="listbox" aria-label="Equalizer presets" hidden>
                <button type="button" role="option" data-preset="flat">Flat</button>
                <button type="button" role="option" data-preset="pop">Pop</button>
                <button type="button" role="option" data-preset="rock">Rock</button>
                <button type="button" role="option" data-preset="bass">Bass Boost</button>
                <button type="button" role="option" data-preset="treble">Treble Boost</button>
                <button type="button" role="option" data-preset="dance">Electronic / Dance</button>
                <button type="button" role="option" data-preset="jazz">Jazz</button>
                <button type="button" role="option" data-preset="classical">Classical</button>
                <button type="button" role="option" data-preset="vocal">Vocal Boost</button>
                <button type="button" role="option" data-preset="acoustic">Acoustic</button>
                <button type="button" role="option" data-preset="hiphop">Hip Hop</button>
                <button type="button" role="option" data-preset="metal">Metal</button>
              </div>
            </div>
            <button class="btn small" id="btnEqReset" style="height:26px; padding:2px 10px; font-size:11px;" title="Reset EQ to Flat (0dB)">Reset</button>
          </div>
          <label class="row" style="gap:6px; font-size:11px; font-weight:600; cursor:pointer;"><input type="checkbox" id="eqEnable" checked /> Equalizer On</label>
        </div>
        <div class="eq-grid" id="eqGrid" style="background:var(--track-bg); border-radius:12px; padding:10px; border:1px solid var(--card-border);">
          <div class="eq-bands" id="eqBands"></div>
          <canvas id="eqCanvas" class="equalizer-canvas"></canvas>
          <div class="row" style="justify-content:space-between; font-size:11px; color:var(--text-muted); margin-top:4px;">
            <span>31Hz — 16kHz • 10 bands</span>
            <span id="eqHint" style="font-size:10px;">Drag sliders to adjust</span>
          </div>
        </div>
      </div>
      <div class="resize-handle" data-resize="win-equalizer">◢</div>
    </div>

    <!-- LYRICS WINDOW -->
    <div class="float-win" id="win-lyrics" style="left:740px; top:12px; width:340px; height:460px; z-index:3;">
      <div class="float-header" data-drag="win-lyrics">
        <div class="float-title">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          Lyric
        </div>
        <div class="float-actions">
          <button class="float-btn" data-close="win-lyrics" title="Hide">—</button>
          <button class="float-btn close" data-close="win-lyrics">×</button>
        </div>
      </div>
      <div class="float-body" style="padding:10px; display:flex; flex-direction:column;">
        <div id="lyricsTrackTitle" style="font-size:11px; font-weight:700; color:var(--text-soft); padding-bottom:8px; border-bottom:1px solid var(--card-border); margin-bottom:8px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">No track playing</div>
        <div id="lyricsStatus" class="lyrics-status" style="display:none;"></div>
        <div id="lyricsContainer" class="lyrics-scroll-container" style="flex:1; overflow-y:auto; display:flex; flex-direction:column; gap:8px; padding:20px 8px; text-align:center;"></div>
      </div>
      <div class="resize-handle" data-resize="win-lyrics">◢</div>
    </div>

    <!-- SETTINGS WINDOW -->
    <div class="float-win hidden" id="win-settings" style="left:50%; top:50%; width:630px; height:660px; transform:translate(-50%,-50%); z-index:10;">
      <div class="float-header" data-drag="win-settings" style="cursor:move;">
        <div class="float-title">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
          Settings
        </div>
        <div class="float-actions">
          <button class="btn small" id="btn-settings-reset" style="height:22px; padding:2px 8px; font-size:11px;">Reset</button>
          <button class="float-btn close" data-close="win-settings">×</button>
        </div>
      </div>
      <div class="float-body" style="padding:0; overflow:auto;">
        <div class="settings-tabs" id="settingsTabs">
          <button class="settings-tab active" data-stab="general"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>${t("settings.tabs.general")}</button>
          <button class="settings-tab" data-stab="playback"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M10 8l6 4-6 4z"/></svg>${t("settings.tabs.playback")}</button>
          <button class="settings-tab" data-stab="appearance"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>${t("settings.tabs.appearance")}</button>
          <button class="settings-tab" data-stab="visualizer"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 20V10M9 20V4M14 20v-7M19 20V8"/></svg>${t("settings.tabs.visualizer")}</button>
          <button class="settings-tab" data-stab="shortcuts"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M6 14h.01M18 14h.01M9 14h6"/></svg>${t("settings.tabs.shortcuts")}</button>
          <button class="settings-tab" data-stab="about"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>${t("settings.tabs.about")}</button>
        </div>

        <!-- GENERAL TAB -->
        <div class="settings-section active" data-panel="general">
          <div class="settings-row">
            <div><div class="label">${t("settings.general.language.label")}</div><div class="desc">${t("settings.general.language.desc")}</div></div>
            <select class="settings-select" id="setLanguage">${AVAILABLE_LOCALES.map(l => `<option value="${l.code}">${l.nativeName}</option>`).join("")}</select>
          </div>
          <div class="settings-row">
            <div><div class="label">${t("settings.general.tray.label")}</div><div class="desc">${t("settings.general.tray.desc")}</div></div>
            <div class="switch" id="swTray" data-key="tray"></div>
          </div>
          <div class="settings-row" style="flex-direction:column; align-items:stretch; gap:6px;">
            <div style="display:flex; align-items:center; justify-content:space-between; gap:12px;">
              <div><div class="label">Fetch lyrics online</div><div class="desc">Look up missing .lrc files on LRCLIB when a track has no local lyrics</div></div>
              <div class="switch" id="swLyricsOnline" data-key="lyricsOnline"></div>
            </div>
            <div id="lyricsSaveRow" style="margin-left:0; margin-top:2px; display:flex; flex-direction:column; gap:4px; padding-left:4px; border-left:2px solid rgba(127,127,127,0.18); padding-left:10px;">
              <div style="display:flex; align-items:center; gap:14px; flex-wrap:wrap; font-size:12px; color:var(--text-soft);">
                <label style="display:flex; align-items:center; gap:6px; cursor:pointer;">
                  <input type="radio" name="lyricsSaveMode" value="cache" checked /> Save to lyrics cache (AppData)
                </label>
                <label style="display:flex; align-items:center; gap:6px; cursor:pointer;">
                  <input type="radio" name="lyricsSaveMode" value="sidecar" /> Save .lrc next to the music file
                </label>
              </div>
              <div id="lyricsSaveNote" style="font-size:10.5px; color:var(--text-muted); opacity:0.8; display:none;">
                Does <strong>not</strong> work on read-only folders (e.g. Program Files, CD/DVD drives, locked NAS/external drives).
              </div>
            </div>
          </div>
          <div class="settings-row">
            <div><div class="label">${t("settings.general.lyricsSkinLine.label")}</div><div class="desc">${t("settings.general.lyricsSkinLine.desc")}</div></div>
            <div class="switch" id="swLyricsSkinLine" data-key="lyricsSkinLine"></div>
          </div>
        </div>

        <!-- PLAYBACK TAB -->
        <div class="settings-section" data-panel="playback">
          <div class="settings-row">
            <div><div class="label">${t("settings.playback.resume.label")}</div><div class="desc">${t("settings.playback.resume.desc")}</div></div>
            <div class="switch on" id="swResume" data-key="resume"></div>
          </div>
          <div class="settings-row">
            <div><div class="label">${t("settings.playback.replaygain.label")}</div><div class="desc">${t("settings.playback.replaygain.desc")}</div></div>
            <div class="switch on" id="swReplayGain" data-key="replayGainGlobal"></div>
          </div>
          <div class="settings-row">
            <div><div class="label">${t("settings.playback.fadepause.label")}</div><div class="desc">${t("settings.playback.fadepause.desc")}</div></div>
            <div class="switch on" id="swFadePause" data-key="fadePause"></div>
          </div>
          <div class="settings-row">
            <div><div class="label">${t("settings.playback.crossfade.label")}</div><div class="desc">${t("settings.playback.crossfade.desc")}</div></div>
            <div class="switch" id="swCrossfade" data-key="crossfade"></div>
          </div>
          <div class="settings-row" id="crossfadeDurationRow">
            <div><div class="label">${t("settings.playback.crossfadeDuration.label")}</div><div class="desc">${t("settings.playback.crossfadeDuration.desc")}</div></div>
            <div class="stepper-control">
              <button type="button" class="btn small stepper-btn" id="btnCrossfadeDown" aria-label="Decrease crossfade duration">−</button>
              <input type="range" class="crossfade-range" id="crossfadeDurationRange" min="1" max="12" step="1" value="4" />
              <span class="stepper-value" id="crossfadeDurationValue">4s</span>
              <button type="button" class="btn small stepper-btn" id="btnCrossfadeUp" aria-label="Increase crossfade duration">+</button>
            </div>
          </div>
          <div class="settings-row">
            <div><div class="label">${t("settings.playback.smartPrev.label")}</div><div class="desc">${t("settings.playback.smartPrev.desc")}</div></div>
            <div class="switch on" id="swSmartPrev" data-key="smartPrev"></div>
          </div>
        </div>

        <!-- APPEARANCE & SKINS TAB -->
        <div class="settings-section" data-panel="appearance">
          <div class="settings-row" style="flex-direction:column; align-items:stretch; gap:10px;">
            <div>
              <div class="label">Active Skin & Theme</div>
              <div class="desc">Select skin loaded directly from the skins/ folder and toggle theme</div>
            </div>
            <div style="display:flex; gap:6px; align-items:center;">
              <select class="settings-select" id="skinSelect" style="flex:1; height:34px; font-size:12px; padding:4px 10px;">
                <option value="default">Default Melo (Standard)</option>
              </select>
              <button class="btn small" id="btnRefreshSkins" title="Refresh skins from disk" style="height:34px; width:34px; padding:0; display:grid; place-items:center; flex-shrink:0;">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/></svg>
              </button>
              <button class="btn small" id="btnSkinThemeToggle" title="Toggle Light / Dark theme" style="height:34px; padding:0 14px; font-size:12px; display:inline-flex; align-items:center; gap:6px; flex-shrink:0;">
                <span id="skinThemeIcon">🌙</span>
                <span id="skinThemeLabel">Dark</span>
              </button>
            </div>
          </div>

          <div class="settings-row">
            <div><div class="label">Dynamic Album Artwork Theme</div><div class="desc">Automatically adapt accent and visualizer glow colors to matching album art</div></div>
            <div class="switch on" id="swDynamicTheme" data-key="dynamicTheme"></div>
          </div>

          <div class="settings-row">
            <div><div class="label">${t("settings.appearance.showstop.label")}</div><div class="desc">${t("settings.appearance.showstop.desc")}</div></div>
            <div class="switch" id="swShowStop" data-key="showStopBtn"></div>
          </div>

          <div class="settings-row" style="flex-direction:column; align-items:stretch;">
            <div class="label" style="margin-bottom:4px;">Skins Directory (Disk)</div>
            <div style="font-size:11px; color:var(--text-soft); line-height:1.6; margin-bottom:8px;">
              Installed skins live in Melo's skins folder inside your user data — "Open Skins Folder" below takes you there. Skins deleted from that folder stay deleted. Skins are injected into Melo's interface as trusted HTML; install or edit only files you trust (script tags and inline event handlers are removed before a skin is applied).
            </div>
            <div style="display:flex; gap:8px;">
              <button class="btn small" id="btnOpenSkinsFolder" style="flex:1; justify-content:center;">Open Skins Folder 📁</button>
              <label class="btn small" style="cursor:pointer; flex:1; justify-content:center;">
                Import Trusted Skin (.html) 📥
                <input id="skinUpload" type="file" accept=".html,.htm" style="display:none" />
              </label>
              <button class="btn small" id="btn-reset-skin-settings">Reset to Default</button>
            </div>
          </div>
          <div class="settings-row" style="flex-direction:column; align-items:stretch;">
            <div class="label" style="margin-bottom:4px;">${t("settings.appearance.embeddedPlaylist.label")}</div>
            <div style="font-size:11px; color:var(--text-soft); line-height:1.6; margin-bottom:8px;">
              ${t("settings.appearance.embeddedPlaylist.desc")}
            </div>
            <div class="settings-row" style="padding:0;">
              <div><div class="label" style="font-size:12px;">${t("settings.appearance.embeddedPlaylistCover.label")}</div></div>
              <div class="switch on" id="swEmbeddedPlaylistCover" data-key="embeddedPlaylistCover"></div>
            </div>
            <div class="settings-row" style="padding:0;">
              <div><div class="label" style="font-size:12px;">${t("settings.appearance.embeddedPlaylistFontScale.label")}</div></div>
              <div class="stepper-control">
                <button type="button" class="btn small stepper-btn" id="btnEmbeddedFontDown" aria-label="Decrease font size">−</button>
                <input type="range" class="crossfade-range" id="embeddedFontScaleRange" min="70" max="140" step="10" value="100" />
                <span class="stepper-value" id="embeddedFontScaleValue">100%</span>
                <button type="button" class="btn small stepper-btn" id="btnEmbeddedFontUp" aria-label="Increase font size">+</button>
              </div>
            </div>
          </div>
        </div>

        <!-- VISUALIZER TAB -->
        <div class="settings-section" data-panel="visualizer">
          <div class="settings-row">
            <div><div class="label">${t("settings.visualizer.peak.label")}</div><div class="desc">${t("settings.visualizer.peak.desc")}</div></div>
            <div class="switch" id="swVizPeak"></div>
          </div>
          <div class="settings-row">
            <div><div class="label">${t("settings.visualizer.afterglow.label")}</div><div class="desc">${t("settings.visualizer.afterglow.desc")}</div></div>
            <div class="switch" id="swVizAfterglow"></div>
          </div>
          <div class="settings-row">
            <div><div class="label">${t("settings.visualizer.bloom.label")}</div><div class="desc">${t("settings.visualizer.bloom.desc")}</div></div>
            <div class="switch" id="swVizBloom"></div>
          </div>
          <div class="settings-row">
            <div><div class="label">${t("settings.visualizer.mirror.label")}</div><div class="desc">${t("settings.visualizer.mirror.desc")}</div></div>
            <div class="switch" id="swVizMirror"></div>
          </div>
          <div class="settings-row">
            <div><div class="label">${t("settings.visualizer.pale.label")}</div><div class="desc">${t("settings.visualizer.pale.desc")}</div></div>
            <div class="switch" id="swVizPale"></div>
          </div>
          <div class="settings-row">
            <div><div class="label">${t("settings.visualizer.smoothing.label")}</div><div class="desc">${t("settings.visualizer.smoothing.desc")}</div></div>
            <div class="stepper-control">
              <button type="button" class="btn small stepper-btn" id="btnVizSmoothDown" aria-label="Decrease smoothing">−</button>
              <input type="range" class="crossfade-range" id="vizSmoothingRange" min="0" max="100" step="5" value="50" />
              <span class="stepper-value" id="vizSmoothingValue">50</span>
              <button type="button" class="btn small stepper-btn" id="btnVizSmoothUp" aria-label="Increase smoothing">+</button>
            </div>
          </div>
          <div class="settings-row" style="flex-direction:column; align-items:stretch;">
            <div class="label" style="margin-bottom:4px;">${t("settings.visualizer.enabled.label")}</div>
            <div style="font-size:11px; color:var(--text-soft); line-height:1.6; margin-bottom:8px;">${t("settings.visualizer.enabled.desc")}</div>
            <div id="vizEnabledList" class="viz-enabled-list"></div>
          </div>
        </div>

        <!-- SHORTCUTS TAB -->
        <div class="settings-section" data-panel="shortcuts">
          <div style="display:grid; grid-template-columns: 150px 1fr; gap:10px 16px; font-size:12px; line-height:1.6; padding:4px 0;">
            <b>Space</b><span>Play / Pause</span>
            <b>Left / Right</b><span>Seek 5 seconds backward / forward</span>
            <b>Up / Down</b><span>Adjust volume (±5%)</span>
            <b>M</b><span>Mute / Unmute audio</span>
            <b>S</b><span>Toggle Shuffle playback</span>
            <b>R</b><span>Toggle Repeat mode (Off / All / One)</span>
            <b>Ctrl + O</b><span>Add audio files via file dialog</span>
            <b>Ctrl + Shift + O</b><span>Open Library management</span>
            <b>Ctrl + , / F2</b><span>Open / Close Settings window</span>
            <b>Escape</b><span>Close popup menus & visualizer selector</span>
          </div>
        </div>

        <!-- ABOUT TAB -->
        <div class="settings-section" data-panel="about">
          <div style="font-size:12px; color:var(--text-soft); line-height:1.8;">
            <div style="font-size:16px; font-weight:800; color:var(--text); margin-bottom:4px;">Melo <span id="aboutVersion">…</span></div>
            <div style="font-size:11px; color:var(--text-soft);">Build <span id="aboutBuild">…</span></div>
            <b>Tauri 2 + TypeScript + Vite + Rust</b><br/>
            Supports: FLAC, ALAC, MP3, WAV, AAC, OGG, OPUS • 10-band EQ • Real-time FFT Visualizer • Lyric • Dynamic Ambient Theme<br/>
            License: <b>GPL-3.0</b> • Open Source on GitHub:<br/>
            <a href="https://github.com/Arvanta/Melo" data-melo-external="https://github.com/Arvanta/Melo" rel="noopener" style="color:var(--accent); font-weight:600; cursor:pointer;">github.com/Arvanta/Melo ↗</a><br/><br/>
            Support the project:<br/>
            <a href="https://arvanta.github.io" data-melo-external="https://arvanta.github.io" rel="noopener" style="color:var(--accent); font-weight:600; cursor:pointer;">Donate ↗</a>
          </div>
        </div>
      </div>
      <div class="resize-handle" data-resize="win-settings">◢</div>
    </div>

  </div>

  <!-- PLAYER BAR -->
  <div class="player-card" id="playerCard">
    <div class="player-titlebar" data-tauri-drag-region>
      <span class="app-name-static">
        <svg class="app-brand-mark" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true"><path d="M2 12h2l1-7 2 14 3-10 2 6h2l2-9 2 14 2-7h2"/></svg>
        Melo
      </span>
      <div class="titlebar-actions">
        <button class="win-btn" id="btnAddFiles" title="Add files (Ctrl+O)">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M12 12v6"/><path d="M9 15h6"/></svg>
        </button>
        <button class="win-btn" id="btnOpenFolder" title="Open a folder and play its audio files">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/><path d="M12 10v6"/><path d="M9 13h6"/></svg>
        </button>
        <button class="win-btn" id="btnThemeToggle" title="Toggle light / dark theme">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
        </button>
      </div>
      <div class="win-controls">
        <button class="win-btn" data-melo="window-control-minimize" aria-label="minimize">—</button>
        <button class="win-btn close" data-melo="window-control-close" aria-label="close">×</button>
      </div>
    </div>

    <div class="player-main">
      <div class="cover-col">
        <div class="cover-wrap" id="coverWrap">
          <img id="coverImg" src="" alt="cover" style="display:none" />
          <div id="coverFallback" class="cover-fallback">♪</div>
        </div>
        <div class="volume-row volume-under">
          <span class="vol-icon" id="volIcon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.08"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
          </span>
          <input type="range" class="vol" id="volBar" min="0" max="100" value="60" />
          <span class="vol-pct" id="volPct">60%</span>
        </div>
      </div>

      <div class="track-info">
        <div class="track-meta">
          <div class="track-title" id="trackTitle">No track loaded</div>
          <div class="track-artist" id="trackArtist">Add music to start playing</div>
          <div class="track-album" id="trackAlbum"></div>
          <div class="track-format">
            <span class="badge-flac" id="trackCodec">—</span>
            <span id="trackSpecs"></span>
          </div>
        </div>

        <div class="transport" id="transport">
          <button class="icon-btn" id="btnShuffle" title="Shuffle (S)">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M16 3h5v5"/><path d="M4 20l8-8"/><path d="M21 3l-8 8"/><path d="M16 21h5v-5"/><path d="M4 4l5 5"/><path d="M9 15l-5 5"/></svg>
          </button>
          <button class="icon-btn" id="btnPrev" title="Previous">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 20L9 12l10-8z"/><rect x="5" y="4" width="3" height="16" rx="1"/></svg>
          </button>
          <button class="icon-btn" id="btnStop" title="Stop">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="5" y="5" width="14" height="14" rx="2.5"/></svg>
          </button>
          <button class="play-btn" id="btnPlay" title="Play/Pause (Space)">
            <svg id="iconPause" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style="display:none"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>
            <svg id="iconPlay" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style="margin-left:2px;"><path d="M7 4.5L19 12 7 19.5z"/></svg>
          </button>
          <button class="icon-btn" id="btnNext" title="Next">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M5 4l10 8L5 20z"/><rect x="16" y="4" width="3" height="16" rx="1"/></svg>
          </button>
          <button class="icon-btn" id="btnRepeat" title="Repeat (R)">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M17 1l4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><path d="M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>
          </button>
        </div>

        <div class="seek-row">
          <span class="time" id="curTime">0:00</span>
          <div class="seek-wrap">
            <input type="range" class="seek" id="seekBar" min="0" max="276" value="0" />
          </div>
          <span class="time" id="durTime">0:00</span>
        </div>
      </div>

      <div class="right-panel">
        <div class="right-main">
          <div class="stage-switch">
            <button type="button" class="stage-btn active" data-melo="toggle-embedded-viz" title="Visualizer">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 20V10M9 20V4M14 20v-7M19 20V8"/></svg>
            </button>
            <button type="button" class="stage-btn" data-melo="toggle-embedded-lyrics" title="Lyrics">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            </button>
            <button type="button" class="stage-btn" data-melo="toggle-embedded-playlist" title="Playlist">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15V6"/><path d="M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"/><path d="M12 12H3"/><path d="M16 6H3"/><path d="M12 18H3"/></svg>
            </button>
          </div>
          <div class="player-stage">
            <!-- Current synced-lyric line — centred in the free area above
                 the visualizer. Filled by src/lyric-line.ts only when
                 Settings → General → "Show current lyric line in skins" is
                 ON and the track has a synced .lrc, and only while the stage
                 is in visualizer mode (the playlist/lyrics panels hide it).
                 The .stage-lyric-band wrapper defines that free area and
                 centres the line in it; styling + animation in app.css. -->
            <div class="stage-lyric-band">
              <div class="stage-lyric" data-melo="current-lyric"></div>
            </div>
            <div class="visualizer-bars" id="vizBars" data-melo="visualizer"></div>
            <div class="player-stage-panel" data-melo="embedded-lyrics"></div>
            <div class="player-stage-panel" data-melo="embedded-playlist"></div>
          </div>
        </div>
        <div class="side-actions">
          <button class="sbtn active" id="btnToggleLibrary" title="Library">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m16 6 4 14"/><path d="M12 6v14"/><path d="M8 8v12"/><path d="M4 4v16"/></svg>
          </button>
          <button class="sbtn active" id="btnTogglePlaylist" title="Playlist">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15V6"/><path d="M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"/><path d="M12 12H3"/><path d="M16 6H3"/><path d="M12 18H3"/></svg>
          </button>
          <button class="sbtn active" id="btnToggleEq" title="Equalizer">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 14h3v7H3zM9 10h3v11H9zM15 6h3v15h-3z"/></svg>
          </button>
          <button class="sbtn active" id="btnToggleLyrics" title="Lyric">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          </button>
          <button class="sbtn" id="btnOpenSettings" title="Settings">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
          </button>
        </div>
      </div>
    </div>
  </div>

  <div id="toast" class="toast"></div>
</div>
`;

// CRITICAL: these declarations MUST live above their first runtime call
// Site. In a panel window `isAllowedPanel(...)` runs during module
// Evaluation; if ALLOWED_PANELS were still in its temporal dead zone the
// Whole document would die (tsc cannot see runtime TDZ errors; a static
// Ordering test guards this).
// Allowlisted panel ids: anything else is silently dropped from ?panel=
// And toggle calls. KEEP IN SYNC with the panel-btn map below.
const ALLOWED_PANELS = ["library", "playlist", "equalizer", "lyrics", "settings"] as const;
type PanelId = typeof ALLOWED_PANELS[number];

function isAllowedPanel(id: string): id is PanelId {
  return (ALLOWED_PANELS as readonly string[]).includes(id);
}

const rawUrlPanel = new URLSearchParams(location.search).get("panel");
// Allowlist the URL panel id — malformed values must never reach
// ClassList. Fallback: if ?panel= is ever lost, recover the id from the
// Webview LABEL ("panel-<id>"). Synchronous on purpose: needed before
// The layout replacement below.
const urlPanel: PanelId | null = (() => {
  if (rawUrlPanel && isAllowedPanel(rawUrlPanel)) return rawUrlPanel;
  if (isTauri) {
    try {
      const internals = (window as any).__TAURI_INTERNALS__ as any;
      const label: unknown = internals?.metadata?.currentWindow?.label ?? internals?.metadata?.currentWebview?.label;
      if (typeof label === "string" && label.startsWith("panel-")) {
        const p = label.slice("panel-".length);
        if (isAllowedPanel(p)) return p as PanelId;
      }
    } catch { /* no internals — not a panel window */ }
  }
  return null;
})();
if (urlPanel) {
  document.documentElement.classList.add("panel-window", `panel-${urlPanel}`);
  document.body.classList.add("panel-window", `panel-${urlPanel}`);
}

// Secondary windows render a single panel full-size. This keys on the
// ?panel= URL contract ALONE, not runtime Tauri detection, so the
// Structural replacement happens unconditionally. Only the native wiring
// (geometry persist + close-requested) stays behind isTauri.
if (urlPanel) {
  if (isTauri) {
    import("@tauri-apps/api/window").then(({ getCurrentWindow }) => {
      const pw = getCurrentWindow();
      persistGeometry(pw, "melo-geo-panel-" + urlPanel);
      pw.onCloseRequested(() => { busEmit("melo:panel-closed", urlPanel); });
      window.addEventListener("beforeunload", () => { busEmit("melo:panel-closed", urlPanel); });
    }).catch((err) => { console.warn("[melo] panel: native window wiring unavailable", err); });
  }
  const winEl = document.getElementById("win-" + urlPanel);
  // Move the WHOLE header (title + actions) into the native panel window so
  // Float-header actions survive; data-* attributes and ids are preserved
  // For rebinding. Strip every data-close button from the copy — the native
  // Minimize/close pair is the only window-control set; an actions container
  // Left empty by the strip is removed.
  const headerCopy = document.createElement("div");
  headerCopy.innerHTML = winEl?.querySelector(".float-header")?.innerHTML || "";
  headerCopy.querySelectorAll("[data-close]").forEach((el) => el.remove());
  headerCopy.querySelectorAll(".float-actions").forEach((el) => { if (!el.querySelector("button")) el.remove(); });
  const headerHtml = headerCopy.innerHTML;
  const bodyHtml = winEl?.querySelector(".float-body")?.innerHTML || "";
  app.innerHTML = `
<div class="panel-root">
  <div class="panel-titlebar" data-tauri-drag-region>
    <div class="panel-header" data-tauri-drag-region>${headerHtml}</div>
    <div class="win-controls">
      <button class="win-btn" data-melo="window-control-minimize" aria-label="minimize" title="Minimize">—</button>
      <button class="win-btn close" data-melo="window-control-close" aria-label="close" title="Close">×</button>
    </div>
  </div>
  <div class="panel-body">${bodyHtml}</div>
  <div id="toast" class="toast"></div>
</div>`;
}

if (isTauri && !urlPanel) {
  document.documentElement.classList.add("tauri-main");
  document.body.classList.add("tauri-main");
  document.querySelectorAll(".side-actions .sbtn").forEach(b => b.classList.remove("active"));

  // Tray toggle: the frontend owns per-panel visibility and saved geometry,
  // So it decides. Visible main → hide main + every visible panel and
  // Snapshot which were open; hidden main → restore main + the snapshotted
  // Panels via openPanelWindow (which clamps geometry to a monitor).
  busOn("melo:tray-toggle-all", async () => {
    try {
      const { getCurrentWindow } = await import("@tauri-apps/api/window");
      const mainWin = getCurrentWindow();
      const visible = await mainWin.isVisible();
      if (visible) {
        // Remember which panels were open so we can restore them.
        const snapshot = Array.from(visiblePanels);
        try { localStorage.setItem("melo-tray-snapshot", JSON.stringify(snapshot)); } catch {}
        // Hide every panel + main.
        for (const p of snapshot) {
          try {
            const { WebviewWindow } = await import("@tauri-apps/api/webviewWindow");
            const w = await WebviewWindow.getByLabel("panel-" + p);
            if (w) { await w.hide(); }
            // Mark hidden in our in-memory map and broadcast (so other
            // Windows drop their badges) without touching localStorage
            // Flags — those reflect user intent, not tray state.
            setPanelVisible(p, false);
          } catch {}
        }
        try { await mainWin.hide(); } catch {}
      } else {
        // Restore from snapshot, then show main.
        let snapshot: PanelId[] = [];
        try {
          const raw = JSON.parse(localStorage.getItem("melo-tray-snapshot") || "[]");
          if (Array.isArray(raw)) snapshot = raw.filter((x): x is PanelId => isAllowedPanel(x));
        } catch {}
        // No saved snapshot (nothing was open) → only main comes back; correct.
        for (const p of snapshot) {
          try {
            const { WebviewWindow } = await import("@tauri-apps/api/webviewWindow");
            const existing = await WebviewWindow.getByLabel("panel-" + p);
            if (existing) {
              // Already open in the OS — just unhide and bring forward.
              await existing.show();
              await existing.unminimize();
              await existing.setFocus();
            } else {
              // Re-create from saved geometry; openPanelWindow applies the monitor
              // Clamp.
              openPanelWindow(p);
            }
            setPanelVisible(p, true);
          } catch (err) {
            console.warn("[melo] tray restore: failed to restore panel", p, err);
          }
        }
        try { await mainWin.show(); } catch {}
        try { await mainWin.unminimize(); } catch {}
        try { await mainWin.setFocus(); } catch {}
      }
    } catch (err) {
      console.error("[melo] melo:tray-toggle-all handler failed", err);
    }
  });

  busOn("melo:tray-action", (action: any) => {
    // Forwarded tray player-control events (play_pause / next / prev / mute).
    // The player module handles them itself; this listener only exists for
    // The toast/log hook when the player isn't ready.
    if (typeof action !== "string") return;
    if (!["play_pause", "next", "prev", "mute"].includes(action)) return;
    // No-op: the real player state lives in the main document's own busOn
    // Handlers; this keeps the tray path working end-to-end.
  });
}

// True once files were opened from Explorer / CLI this session: the resume
// Restore must skip, so explicitly opened files play instead of the
// Previous session's track/position.
let cliOpenSeen = false;
// Dedup map for paths that can arrive twice at boot (get_cli_tracks poll +
// Melo:open-files event): cross-source duplicates within 6s drop. A
// 5-minute sweeper drops entries older than 60s even when idle.
const RECENT_OPEN_TTL_MS = 60_000;
const recentOpenPaths = new Map<string, { t: number; src: "event" | "poll" }>();
setInterval(() => {
  const cutoff = Date.now() - RECENT_OPEN_TTL_MS;
  for (const [p, r] of recentOpenPaths) {
    if (r.t < cutoff) recentOpenPaths.delete(p);
  }
}, 5 * 60 * 1000);

// Desktop: closing the player closes the whole app (panels included)
if (isTauri && !urlPanel) {
  import("@tauri-apps/api/window").then(async ({ getCurrentWindow }) => {
    const mainWin = getCurrentWindow();

    // Register the geometry re-apply listener BEFORE anything async runs: the
    // Deleted-skin fallback in skin.ts emits melo:skin-geometry early and the
    // Event would otherwise be lost.
    busOn("melo:skin-geometry", async () => {
      try {
        const sz = getTargetSize();
        if (sz.force) {
          const { LogicalSize } = await import("@tauri-apps/api/dpi");
          await mainWin.setSize(new LogicalSize(sz.w, sz.h));
        }
        await applySizeConstraints(sz);
        saveGeo();
      } catch {}
    });

    // deleted-skin boot check: verify the saved skin file exists BEFORE its
    // Geometry is applied, or the player boots with the default skin's content
    // At the deleted skin's window size.
    const bootSkinId = localStorage.getItem("melo-active-skin-id") || "default";
    if (bootSkinId !== "default") {
      try {
        const installed = await listInstalledSkins();
        const exists = installed.some(it =>
          it.filename === bootSkinId ||
          it.id === bootSkinId ||
          `${it.filename}` === `${bootSkinId}.html` ||
          bootSkinId === `${it.filename}`.replace(/\.html$/, "")
        );
        if (!exists) resetSkin(undefined, false);
      } catch { /* the 150ms re-apply fallback still covers this */ }
    }

    // Resolve the native window size a skin wants:
    // - custom skin with a declared target size: resize to it, then apply bounds
    // - custom skin with only min/max bounds: keep current size, apply bounds
    // - custom skin without geometry: keep current size, free to resize
    // - default skin: 960×245, resizable (650 floor, 260 max height)
    const getTargetSize = () => {
      const activeSkin = localStorage.getItem("melo-active-skin-id") || "default";
      if (activeSkin !== "default") {
        const geo = readSkinGeometry();
        if (geo) {
          const hasSize = Number.isFinite(geo.width) && Number.isFinite(geo.height) && (geo.width || 0) > 0 && (geo.height || 0) > 0;
          return {
            w: geo.width || 0,
            h: geo.height || 0,
            resizable: geo.resizable !== false,
            fixed: false,
            custom: true,
            force: hasSize,
            minW: geo.minWidth,
            minH: geo.minHeight,
            maxW: geo.maxWidth,
            maxH: geo.maxHeight,
          };
        }
        return { w: 0, h: 0, resizable: true, fixed: false, custom: true, force: false, minW: undefined, minH: undefined, maxW: undefined, maxH: undefined };
      }
      return { w: 960, h: 245, resizable: true, fixed: false, custom: false, force: true, minW: 650, minH: 135, maxW: 10000, maxH: 260 }; // +5 bottom space
    };

    const applySizeConstraints = async (sz: { fixed: boolean; custom: boolean; resizable: boolean; minW?: number; minH?: number; maxW?: number; maxH?: number; w: number; h: number }) => {
      try {
        const { LogicalSize } = await import("@tauri-apps/api/dpi");
        if (sz.custom) {
          // Custom skins: a skin may declare min and/or max bounds (or none).
          const minW = sz.minW || 240;
          const minH = sz.minH || 120;
          const maxW = Math.max(minW, sz.maxW || 10000);
          const maxH = Math.max(minH, sz.maxH || 10000);
          await mainWin.setMinSize(new LogicalSize(minW, minH));
          await mainWin.setMaxSize(new LogicalSize(maxW, maxH));
        } else {
          // Default skin keeps its historical floor and max height.
          await mainWin.setMinSize(new LogicalSize(650, 135));
          await mainWin.setMaxSize(new LogicalSize(10000, 260));
        }
        await mainWin.setResizable(sz.resizable);
      } catch {}
    };

    // Clamp a saved window size to the active skin's declared bounds.
    const clampToBounds = (v: number, fallback: number, min?: number, max?: number) => {
      let out = Number.isFinite(v) && v > 0 ? v : fallback;
      if (min != null && out < min) out = min;
      if (max != null && out > max) out = max;
      return out;
    };

    try {
      const g = JSON.parse(localStorage.getItem("melo-geo-main") || "null");
      const { LogicalPosition, LogicalSize } = await import("@tauri-apps/api/dpi");
      const sz = getTargetSize();
      if (sz.force) {
        let startupW = sz.w;
        let startupH = sz.h;
        if (g && !sz.fixed) {
          if (sz.custom) {
            // Custom (resizable) skins keep the user's saved size across
            // Restarts, clamped to the skin's declared min/max bounds.
            startupW = clampToBounds(g.w, sz.w, sz.minW, sz.maxW);
            startupH = clampToBounds(g.h, sz.h, sz.minH, sz.maxH);
          } else {
            // Default skin: keep the saved width, fixed height.
            startupW = Math.max(650, g.w);
            startupH = sz.h;
          }
        }
        await mainWin.setSize(new LogicalSize(startupW, startupH));
      }
      await applySizeConstraints(sz);
      // Shared geometry helper: clamp the saved position to a connected monitor
      // (an unplugged second monitor would leave the player off-screen).
      if (g?.x != null && g?.y != null) {
        const { availableMonitors, currentMonitor } = await import("@tauri-apps/api/window");
        let fallbackUsed = false;
        try {
          const monitors = await availableMonitors();
          const primary = await currentMonitor();
          const sf = (primary?.scaleFactor ?? 1) || 1;
          const lx = g.x / sf;
          const ly = g.y / sf;
          const fits = monitors.some(m => {
            const pos = m.position;
            const msf = m.scaleFactor || 1;
            const mx = pos.x / msf;
            const my = pos.y / msf;
            const mw = (m.size?.width ?? 0) / msf;
            const mh = (m.size?.height ?? 0) / msf;
            return lx + 80 < mx + mw && ly + 80 < my + mh && lx > mx - 80 && ly > my - 80;
          });
          if (fits) {
            await mainWin.setPosition(new LogicalPosition(lx, ly));
          } else {
            fallbackUsed = true;
          }
        } catch {
          fallbackUsed = true;
        }
        if (fallbackUsed) {
          try {
            const { LogicalSize } = await import("@tauri-apps/api/dpi");
            await mainWin.setSize(new LogicalSize(sz.w, sz.h));
            await mainWin.center();
          } catch {}
        }
      }
      // Skin-size self-heal: if a custom skin had NO saved geometry at boot
      // (e.g. app-data cleanup), snap once to the geometry skin.ts re-saves
      // Shortly after. A user's own resize is never touched.
      if (sz.custom && !sz.force) {
        window.setTimeout(async () => {
          try {
            const geo = readSkinGeometry();
            if (geo?.width && geo?.height) {
              const { LogicalSize } = await import("@tauri-apps/api/dpi");
              await mainWin.setSize(new LogicalSize(geo.width, geo.height));
            }
          } catch {}
        }, 2500);
      }
    } catch {}

    const saveGeo = async () => {
      try {
        const pos = await mainWin.outerPosition();
        const size = await mainWin.innerSize();
        const sf = await mainWin.scaleFactor();
        // Persist logical pixels so reopens under a different DPI don't drift.
        const lp = pos.toLogical(sf);
        const ls = size.toLogical(sf);
        localStorage.setItem("melo-geo-main", JSON.stringify({ x: lp.x, y: lp.y, w: ls.width, h: ls.height }));
      } catch {}
    };
    // Coalesce resize bursts into one write ~300ms after the gesture stops.
    // The default skin's height self-correction stays leading-edge (inline);
    // Only the localStorage write is debounced.
    const debouncedSaveGeo = debounceForFlush(saveGeo, 300);
    mainWin.onMoved(debouncedSaveGeo);
    mainWin.onResized(async () => {
      try {
        const target = getTargetSize();
        const { LogicalSize } = await import("@tauri-apps/api/dpi");
        if (!target.custom) {
          // Default skin: keep its height and don't shrink below its floor.
          const sz = await mainWin.innerSize();
          const logical = sz.toLogical(await mainWin.scaleFactor());
          if (logical.width < 650 || logical.height !== target.h) {
            await mainWin.setSize(new LogicalSize(Math.max(650, logical.width), target.h));
          }
        }
        // Custom skins are left completely free to resize.
      } catch {}
      debouncedSaveGeo();
    });

    busOn("melo:skin-changed", async (skinId: any) => {
      try {
        if (!urlPanel && skinId) {
          await applySkinChoice(skinId, theme, undefined, false, false);
        }
        const sz = getTargetSize();
        if (sz.force) {
          const { LogicalSize } = await import("@tauri-apps/api/dpi");
          await mainWin.setSize(new LogicalSize(sz.w, sz.h));
        }
        await applySizeConstraints(sz);
        saveGeo();
      } catch {}
    });

    mainWin.onCloseRequested(async (event) => {
      event.preventDefault();
      const trayEnabled = localStorage.getItem("melo-pref-tray") === "1";
      if (trayEnabled) {
        // Close-to-tray hides EVERYTHING: every visible panel first, then main.
        // The tray icon (or a relaunch via the persisted snapshot) restores them.
        try {
          for (const p of Array.from(visiblePanels)) {
            try {
              const { WebviewWindow } = await import("@tauri-apps/api/webviewWindow");
              const w = await WebviewWindow.getByLabel("panel-" + p);
              if (w) await w.hide();
            } catch {}
          }
          await mainWin.hide();
          return;
        } catch { /* fall through to the plain hide below */ }
        try { await mainWin.hide(); return; } catch {}
      }
      const { WebviewWindow } = await import("@tauri-apps/api/webviewWindow");
      for (const p of ["library", "playlist", "equalizer", "lyrics", "settings"]) {
        try {
          const w = await WebviewWindow.getByLabel("panel-" + p);
          if (w) await w.close();
        } catch {}
      }
      try { await mainWin.destroy(); } catch { window.close(); }
    });

    // Relaunch restores the panels that were open at last exit through
    // OpenPanelWindow (saved position/size + monitor clamp); setPanelVisible
    // Keeps the snapshot in sync.
    window.setTimeout(async () => {
      try {
        const raw = JSON.parse(localStorage.getItem("melo-tray-snapshot") || "[]");
        if (!Array.isArray(raw)) return;
        for (const p of raw) {
          if (typeof p === "string" && isAllowedPanel(p)) openPanelWindow(p);
        }
      } catch {}
    }, 700);
  });

  // Explorer "Open With" / CLI / single-instance file opening. Explorer
  // Launches one process per selected file, so arrivals are coalesced for a
  // Short window and imported once (immediate replace would keep only the
  // Last file). Boot robustness: Tauri does not buffer events, so the Rust
  // Side also buffers forwarded paths and we drain that buffer by polling
  // Get_cli_tracks during the first seconds; recentOpenPaths dedups the
  // Buffer drain against the event.
  const pendingOpenPaths: string[] = [];
  let pendingOpenTimer = 0;
  const queueOpenPaths = (paths: string[], src: "event" | "poll" = "poll") => {
    const now = Date.now();
    for (const [p, r] of recentOpenPaths) {
      if (now - r.t > 60000) recentOpenPaths.delete(p);
    }
    for (const p of paths) {
      if (!p) continue;
      const seen = recentOpenPaths.get(p);
      // Same path from both the buffered poll and the event = one delivery.
      if (seen && seen.src !== src && now - seen.t < 6000) continue;
      recentOpenPaths.set(p, { t: now, src });
      if (!pendingOpenPaths.includes(p)) pendingOpenPaths.push(p);
    }
    if (pendingOpenPaths.length) cliOpenSeen = true;
    window.clearTimeout(pendingOpenTimer);
    pendingOpenTimer = window.setTimeout(async () => {
      const batch = pendingOpenPaths.splice(0, pendingOpenPaths.length);
      if (!batch.length) return;
      const lib = window.LumiLibrary;
      const imported = await lib?.importPaths?.(batch, "replace") || [];
      if (imported.length) busEmit("melo:play-tracks", { tracks: imported, index: 0 });
    }, 450);
  };

  // Drains the Rust CLI buffer (own argv + companion forwards). Polled a few
  // Times because cold-start WebView2 and companion handshakes are slow;
  // Get_cli_tracks clears the buffer, so polls never duplicate.
  const pollCliTracks = async () => {
    try {
      const { invoke } = await import("@tauri-apps/api/core");
      const cliTracks: any[] = await invoke("get_cli_tracks");
      if (Array.isArray(cliTracks) && cliTracks.length > 0) {
        queueOpenPaths(cliTracks.map((t: any) => t.path).filter(Boolean), "poll");
      }
    } catch {}
  };
  // Boot-time CLI drain: three polls (immediate, ~700ms, ~2s) cover the
  // Cold-start window; later arrivals come through melo:open-files.
  const scheduleCliPoll = (delayMs: number) => {
    window.setTimeout(async () => {
      await pollCliTracks();
    }, delayMs);
  };
  scheduleCliPoll(0);
  scheduleCliPoll(700);
  scheduleCliPoll(2000);

  busOn("melo:open-files", (cliTracks: any) => {
    if (Array.isArray(cliTracks) && cliTracks.length > 0) {
      queueOpenPaths(cliTracks.map((t: any) => t.path).filter(Boolean), "event");
    }
  });
}

document.addEventListener("contextmenu", (e) => { e.preventDefault(); });

const toastEl = document.getElementById("toast") as HTMLDivElement;
const showToast: ToastFn = (msg) => {
  if (!toastEl) return;
  toastEl.textContent = msg;
  toastEl.classList.add("show");
  setTimeout(() => toastEl.classList.remove("show"), 2200);
};

const audio = new Audio();
audio.preload = "metadata";
audio.crossOrigin = "anonymous";
window.__LUMI_AUDIO__ = audio;
window.__TOAST__ = showToast;

// ─── OS drag & drop ───
// Drop-to-import-and-play through the SAME path as Open Files, keeping the
// Manage-only scan architecture: dropped files import, but a dropped
// FOLDER never scans (the toast points at Library → Manage). The native
// OnDragDropEvent gives real filesystem paths (HTML5 drop events never
// Fire while Tauri's handler is enabled — no double import). m3u/m3u8
// Drops expand to their tracks: REPLACE the queue on the player, APPEND
// On the Playlist window.
const AUDIO_DROP_EXTENSIONS = ["mp3", "flac", "wav", "ogg", "aac", "m4a", "alac", "opus", "wma", "aiff", "mka", "m3u", "m3u8"];
function isSupportedAudioFilename(name: string): boolean {
  const dot = name.lastIndexOf(".");
  if (dot < 0) return false;
  return AUDIO_DROP_EXTENSIONS.includes(name.slice(dot + 1).toLowerCase());
}

async function importAndPlayDroppedPaths(paths: string[]) {
  if (!Array.isArray(paths) || !paths.length) return;
  const audio = paths.filter((p) => isSupportedAudioFilename(p));
  if (!audio.length) {
    showToast("No supported audio files in the dropped items — music folders are added via Library → Manage");
    return;
  }
  const lib = window.LumiLibrary;
  if (typeof lib?.importPaths !== "function") return;
  try {
    const list = await lib.importPaths(audio, "replace");
    if (list.length) {
      busEmit("melo:play-tracks", { tracks: list, index: 0 });
      showToast(`${list.length} file(s) added`);
    } else {
      showToast("None of the dropped files could be imported");
    }
  } catch (err) {
    showToast(`Couldn't import the dropped file(s) — ${err}`);
  }
}

// ExpandAndImportDroppedPaths: dropped FOLDERS queue their TOP-LEVEL audio
// Files via the Rust expand_drop_paths command (recursive scans stay
// Manage-only); falls back to raw paths on an older backend.
// Mode "replace" (default, player): replace the queue and play.
// Mode "append" (Playlist window): add to the end of queue/playlist.
async function expandAndImportDroppedPaths(paths: string[], mode: "replace" | "append" = "replace") {
  if (!Array.isArray(paths) || !paths.length) return;
  let expanded: string[] = paths;
  try {
    const { invoke } = await import("@tauri-apps/api/core");
    const res = await invoke<string[]>("expand_drop_paths", { paths });
    if (Array.isArray(res)) expanded = res;
  } catch (err) {
    console.warn("[melo] expand_drop_paths unavailable — treating drop as plain file list", err);
  }
  if (mode === "append") {
    const lib = window.LumiLibrary;
    if (typeof lib?.importPaths !== "function") return;
    try {
      const list = await lib.importPaths(expanded, "append");
      if (list.length) showToast(`${list.length} file(s) added to the playlist`);
      else showToast("None of the dropped files could be imported");
    } catch (err) {
      showToast(`Couldn't add the dropped file(s) — ${err}`);
    }
    return;
  }
  await importAndPlayDroppedPaths(expanded);
}

if (isTauri && !urlPanel) {
  import("@tauri-apps/api/window").then(async ({ getCurrentWindow }) => {
    try {
      await getCurrentWindow().onDragDropEvent((ev: any) => {
        const p = ev?.payload;
        if (!p || typeof p.type !== "string") return;
        // No visual drag feedback by design: enter/over/leave are ignored; only
        // Drop does anything.
        if (p.type !== "drop") return;
        const paths: string[] = Array.isArray(p.paths) ? p.paths.filter((x: any) => typeof x === "string") : [];
        void expandAndImportDroppedPaths(paths);
      });
    } catch (err) {
      console.error("[melo] native drag-drop setup failed", err);
    }
  });
}

// The PLAYLIST panel window gets its own drop handler in APPEND mode;
// Only drops on the PLAYER replace the queue.
if (isTauri && urlPanel === "playlist") {
  import("@tauri-apps/api/window").then(async ({ getCurrentWindow }) => {
    try {
      await getCurrentWindow().onDragDropEvent((ev: any) => {
        const p = ev?.payload;
        if (!p || p.type !== "drop") return;
        const paths: string[] = Array.isArray(p.paths) ? p.paths.filter((x: any) => typeof x === "string") : [];
        void expandAndImportDroppedPaths(paths, "append");
      });
    } catch (err) {
      console.error("[melo] playlist drag-drop setup failed", err);
    }
  });
}

// Web demo fallback: dropping audio files imports them like Open Files
// (same caps, same blob-URL bookkeeping); skin drops stay with skin.ts.
// Without preventDefault a drop navigated the tab to the raw file.
if (!isTauri) {
  window.addEventListener("dragover", (e) => {
    if (![...(e.dataTransfer?.types || [])].includes("Files")) return;
    e.preventDefault(); // no visual highlight — just block navigation
  });
  window.addEventListener("drop", async (e) => {
    const files = Array.from(e.dataTransfer?.files || []);
    const hasHtml = files.some((f) => /\.html?$/i.test(f.name));
    const audio = files.filter((f) => isSupportedAudioFilename(f.name));
    if (hasHtml && !audio.length) return; // skin.ts owns this drop
    e.preventDefault();
    if (!audio.length) {
      if (files.length) showToast("No supported audio files in the dropped items — music folders are added via Library → Manage");
      return;
    }
    // Web-demo parity: a drop inside the playlist float appends.
    const onPlaylist = !!(e.target as HTMLElement | null)?.closest?.("#win-playlist");
    await importBrowserAudioFiles(audio, onPlaylist ? "append" : "play");
  });
}

// Settings schema migrations: run once per version bump before anything
// Reads a preference. No-op today; infrastructure for future renames.
runSettingsMigrations();

// Theme logic
// Dynamic Album Artwork Theme defaults to ON for fresh installs and
// Resets (registry default in settings.ts); an explicit "0" is honored.
if (localStorage.getItem("melo-dynamic-theme") === null) {
  localStorage.setItem("melo-dynamic-theme", "1");
}
let theme: "light" | "dark" = (localStorage.getItem("melo-theme") as any) || "dark";
function applyThemeLocal(t: "light" | "dark") {
  document.documentElement.setAttribute("data-theme", t);
  localStorage.setItem("melo-theme", t);
  theme = t;
}
function applyTheme(t: "light" | "dark") {
  applyThemeLocal(t);
  busEmit("melo:theme", t);
}
applyThemeLocal(theme);
busOn("melo:theme", (t: any) => { if (t === "light" || t === "dark") applyThemeLocal(t); });

// Settings reset: every window reloads so each document rebuilds its state
// From the cleared storage; the short delay lets the toast show first.
busOn("melo:reset", () => {
  setTimeout(() => location.reload(), 450);
});

// An online lyric was found but could not be stored (e.g. read-only music
// Folder): it still displays — say honestly that nothing was saved.
busOn("melo:lyrics-save-failed", (p: any) => {
  if (p && p.error) showToast(`Lyrics found but could not be saved (${p.error})`);
});
setInterval(() => {
  const t = localStorage.getItem("melo-theme");
  if ((t === "light" || t === "dark") && t !== theme) applyThemeLocal(t);
}, 1000);

// Show/hide the Stop transport button (persists across skin swaps via a body class)
document.body.classList.toggle("show-stop-btn", localStorage.getItem("melo-pref-showStopBtn") === "1");
busOn("melo:pref-changed", (p: any) => {
  if (p && p.key === "showStopBtn") document.body.classList.toggle("show-stop-btn", !!p.value);
});

// Floating windows toggle & drag/resize
const winIds = ["win-library", "win-playlist", "win-equalizer", "win-lyrics", "win-settings"];
// Minimum size per floating window (browser mode). Keep in sync with
// `mins` in openPanelWindow(), which does the same for Tauri windows.
const FLOAT_MIN_SIZE: Record<string, [number, number]> = { "win-settings": [630, 400] };
const FLOAT_MIN_DEFAULT: [number, number] = [260, 160];
const floatMin = (id: string): [number, number] => FLOAT_MIN_SIZE[id] || FLOAT_MIN_DEFAULT;
const desktop = document.getElementById("desktop") as HTMLElement;
const toggleMap: Record<string, string> = {
  "btnToggleLibrary": "win-library",
  "btnTogglePlaylist": "win-playlist",
  "btnToggleEq": "win-equalizer",
  "btnToggleLyrics": "win-lyrics",
  "btnOpenSettings": "win-settings",
  "menuToggleLibrary": "win-library",
  "menuTogglePlaylist": "win-playlist",
  "menuToggleEq": "win-equalizer",
  "menuToggleLyrics": "win-lyrics",
  "menuToggleSettings": "win-settings"
};
function isVisible(id: string) { const el = document.getElementById(id); return !!el && !el.classList.contains("hidden"); }
const panelBtnMap: Record<string, string> = { library: "btnToggleLibrary", playlist: "btnTogglePlaylist", equalizer: "btnToggleEq", lyrics: "btnToggleLyrics", settings: "btnOpenSettings" };

// Authoritative in-memory map of which Tauri panels are visible (replaces
// The old polling loop). Every open/close flows through it; UI badges
// Subscribe to melo:panel-state-changed. Also the source of truth for
// Close-to-tray. In-memory is fine: tray-hide is session-level, and on
// Restart visibility comes from the melo-win-* keys.
const visiblePanels = new Set<PanelId>();
function setPanelVisible(panel: PanelId, visible: boolean) {
  const had = visiblePanels.has(panel);
  if (visible && !had) visiblePanels.add(panel);
  else if (!visible && had) visiblePanels.delete(panel);
  if (had !== visible) {
    busEmit("melo:panel-state-changed", { panel, visible });
  }
  // Persist the OPEN-panel set after every change so a close-to-tray /
  // Relaunch cycle restores panels at their saved geometry. The tray
  // Snapshot key doubles as this set.
  try { localStorage.setItem("melo-tray-snapshot", JSON.stringify(Array.from(visiblePanels))); } catch {}
}

// Trailing-edge debounce: collapse move/resize bursts into one write
// ~300ms after the drag stops (per-tick writes flooded Tauri's IPC).
// Debounce/persistGeometry live in window-geometry.ts; the pagehide/
// Beforeunload flush is wired there once on import.

// Per-panel creation lock: two rapid clicks could both see "no window"
// And create duplicate WebviewWindows with the same label. Locks are keyed
// By panel, held for one create/check cycle, never chained across panels.
const panelCreationLocks = new Map<string, Promise<void>>();

async function openPanelWindow(panel: string) {
  // Allowlist gate: openPanelWindow is reachable from custom-skin hook
  // Strings, so a malformed panel name must never reach WebviewWindow.
  // Type-narrows `panel` to PanelId for setPanelVisible.
  if (!isAllowedPanel(panel)) {
    console.warn("[melo] openPanelWindow: panel not allowed", panel);
    return;
  }
  const pPanel = panel;
  const label = "panel-" + panel;
  // Wait for any in-flight operation on this exact panel; never block
  // Unrelated panels.
  const previous = panelCreationLocks.get(label);
  if (previous) {
    try { await previous; } catch { /* previous failure shouldn't poison this attempt */ }
  }
  let release!: () => void;
  const current = new Promise<void>(resolve => { release = resolve; });
  panelCreationLocks.set(label, current);
  try {
    const { WebviewWindow } = await import("@tauri-apps/api/webviewWindow");
    const btn = document.getElementById(panelBtnMap[panel]);
    const existing = await WebviewWindow.getByLabel(label);
    if (existing) {
      // Toggle semantics: a MINIMIZED panel is restored (show + unminimize +
      // Focus); a visible one closes.
      let minimized = false;
      try { minimized = await existing.isMinimized(); } catch { minimized = false; }
      if (minimized) {
        try { await existing.show(); await existing.unminimize(); await existing.setFocus(); } catch {}
        btn?.classList.add("active");
        return;
      }
      await existing.close();
      btn?.classList.remove("active");
      return;
    }
    const sizes: Record<string, [number, number]> = { library: [430, 620], playlist: [440, 560], equalizer: [700, 440], lyrics: [380, 520], settings: [630, 660] };
    // Per-panel minimums: Library 400×550; Settings min width 650.
const mins: Record<string, [number, number]> = { library: [400, 550], playlist: [360, 360], equalizer: [620, 400], lyrics: [320, 360], settings: [650, 400] };
    const titles: Record<string, string> = { library: "Library", playlist: "Playlist", equalizer: "Equalizer", lyrics: "Lyric", settings: "Settings" };
    const sz = sizes[panel] || [420, 520];
    const mn = mins[panel] || [360, 360];
    // Saved geometry is logical and clamped to a still-connected monitor
    // (resolveAndClampGeometry below).
    const safe = await resolveAndClampGeometry(panel, sz, mn);
    new WebviewWindow(label, {
      url: `/?panel=${panel}`,
      title: titles[panel] || panel,
      width: safe.width, height: safe.height, minWidth: mn[0], minHeight: mn[1],
      ...(safe.x != null && safe.y != null ? { x: safe.x, y: safe.y } : { center: true }),
      decorations: false,
      transparent: true,
      shadow: false,
      skipTaskbar: true
    });
    btn?.classList.add("active");
    // Mark the panel visible in the in-memory map and broadcast; closes route
    // Back through setPanelVisible from the melo:panel-closed handler.
    setPanelVisible(pPanel, true);
    busEmit("melo:panel-opened", { panel });
  } catch (err) {
    // Surface creation failures (an empty catch would swallow them).
    console.error("[melo] failed to open panel", panel, err);
    const btn = document.getElementById(panelBtnMap[panel]);
    btn?.classList.remove("active");
  } finally {
    panelCreationLocks.delete(label);
    release();
  }
}

busOn("melo:panel-closed", (role: any) => {
  if (typeof role !== "string" || !isAllowedPanel(role)) return;
  const id = panelBtnMap[role as PanelId];
  if (id) document.getElementById(id)?.classList.remove("active");
  // Sync the in-memory map so tray-hide sees a consistent view and other
  // Windows pick the change up via melo:panel-state-changed.
  setPanelVisible(role as PanelId, false);
});

// Reconciliation sweep: panel buttons must never stay lit for a dead
// Window (own X, Alt+F4, crash). Once-a-second safety net; two consecutive
// Misses are required so a mid-creation window is never mistaken for dead.
if (isTauri) {
  const panelButtonMisses = new Map<string, number>();
  const reconcilePanelButtons = async () => {
    try {
      const { WebviewWindow } = await import("@tauri-apps/api/webviewWindow");
      for (const [panel, btnId] of Object.entries(panelBtnMap)) {
        const btn = document.getElementById(btnId);
        if (!btn || !btn.classList.contains("active")) continue;
        const existing = await WebviewWindow.getByLabel("panel-" + panel);
        if (existing) { panelButtonMisses.delete(panel); continue; }
        const misses = (panelButtonMisses.get(panel) || 0) + 1;
        if (misses >= 2) {
          panelButtonMisses.delete(panel);
          btn.classList.remove("active");
          setPanelVisible(panel as PanelId, false);
        } else {
          panelButtonMisses.set(panel, misses);
        }
      }
    } catch { /* the sweep must never throw */ }
  };
  window.setInterval(reconcilePanelButtons, 1200);
}


function toggleWin(winId: string) {
  // Strip the "win-" prefix, then allowlist before dispatching — no caller
  // (skins, shortcuts, hooks) can open an unknown webview via a bad id.
  const panel = winId.replace(/^win-/, "");
  if (!isAllowedPanel(panel)) {
    console.warn("[melo] toggleWin: panel not allowed", panel);
    return;
  }
  if (isTauri) { openPanelWindow(panel); return; }
  const el = document.getElementById(winId);
  if (!el) return;
  const vis = isVisible(winId);
  setVisible(winId, !vis);
  if (!vis) bringToFront(el);
}

function clampIntoDesktop(win: HTMLElement) {
  if (win.classList.contains("hidden")) return;
  if (!desktop) return;
  if (window.matchMedia("(max-width: 860px)").matches) return;
  const dr = desktop.getBoundingClientRect();
  if (dr.width <= 0 || dr.height <= 0) return;
  const r = win.getBoundingClientRect();
  const w = Math.min(r.width, dr.width);
  const h = Math.min(r.height, dr.height);
  let nl = r.left - dr.left;
  let nt = r.top - dr.top;
  nl = Math.max(0, Math.min(dr.width - w, nl));
  nt = Math.max(0, Math.min(dr.height - h, nt));
  win.style.left = nl + "px";
  win.style.top = nt + "px";
  win.style.right = "auto";
  win.style.bottom = "auto";
  win.style.transform = "none";
}

function setVisible(id: string, visible: boolean) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.toggle("hidden", !visible);
  localStorage.setItem("melo-win-" + id, visible ? "1" : "0");
  if (visible) clampIntoDesktop(el);
  const active = visible;
  if (id === "win-library") {
    document.getElementById("btnToggleLibrary")?.classList.toggle("active", active);
    document.getElementById("menuToggleLibrary")?.classList.toggle("active", active);
  }
  if (id === "win-playlist") {
    document.getElementById("btnTogglePlaylist")?.classList.toggle("active", active);
    document.getElementById("menuTogglePlaylist")?.classList.toggle("active", active);
  }
  if (id === "win-equalizer") {
    document.getElementById("btnToggleEq")?.classList.toggle("active", active);
    document.getElementById("menuToggleEq")?.classList.toggle("active", active);
  }
  if (id === "win-lyrics") {
    document.getElementById("btnToggleLyrics")?.classList.toggle("active", active);
    document.getElementById("menuToggleLyrics")?.classList.toggle("active", active);
  }
  if (id === "win-settings") {
    document.getElementById("btnOpenSettings")?.classList.toggle("active", active);
    document.getElementById("menuToggleSettings")?.classList.toggle("active", active);
  }
}

if (!urlPanel && !isTauri) {
  // WEB DEMO ONLY: in the desktop build panels are real OS windows and the
  // Side buttons must start OFF — without the !isTauri guard the "active"
  // Class was re-added at every exe boot, forcing a double toggle.
  winIds.forEach(id => {
    const saved = localStorage.getItem("melo-win-" + id);
    if (saved !== null) {
      setVisible(id, saved === "1");
    } else {
      if (id === "win-settings") setVisible(id, false);
      else setVisible(id, true);
    }
  });
  // Restore the user's own resizes/drags; otherwise the DEFAULT sizes apply.
  winIds.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    try {
      const sz = JSON.parse(localStorage.getItem("melo-win-size-" + id) || "null");
      if (sz && typeof sz.width === "string" && typeof sz.height === "string") {
        // Clamp to the current minimum: a size saved before the minimum was
        // Raised would otherwise be restored at the old, too-small value.
        const [mnW, mnH] = floatMin(id);
        const pw = parseFloat(sz.width), ph = parseFloat(sz.height);
        el.style.width = Number.isFinite(pw) ? Math.max(mnW, pw) + "px" : sz.width;
        el.style.height = Number.isFinite(ph) ? Math.max(mnH, ph) + "px" : sz.height;
      }
      const pos = JSON.parse(localStorage.getItem("melo-win-pos-" + id) || "null");
      if (pos && typeof pos.left === "string" && typeof pos.top === "string") {
        el.style.left = pos.left;
        el.style.top = pos.top;
        el.style.right = "auto";
        el.style.bottom = "auto";
        el.style.transform = "none";
      }
    } catch { /* corrupted saved geometry — keep the default */ }
  });
}

Object.entries(toggleMap).forEach(([btnId, winId]) => {
  document.getElementById(btnId)?.addEventListener("click", () => toggleWin(winId));
});

document.querySelectorAll("[data-close]").forEach(btn => {
  btn.addEventListener("click", () => {
    const id = (btn as HTMLElement).dataset.close!;
    setVisible(id, false);
  });
});

// Drag & Resize logic for floating windows
let dragState: any = null;
let resizeState: any = null;
let zCounter = 10;
function bringToFront(win: HTMLElement) {
  zCounter++;
  win.style.zIndex = String(zCounter);
  document.querySelectorAll(".float-win").forEach(w => w.classList.remove("active"));
  win.classList.add("active");
}
document.querySelectorAll(".float-win").forEach(win => {
  win.addEventListener("mousedown", () => bringToFront(win as HTMLElement));
});
document.querySelectorAll("[data-drag]").forEach(h => {
  h.addEventListener("mousedown", (e: any) => {
    if (e.target.closest("button") || e.target.closest("input") || e.target.closest("select")) return;
    const id = (h as HTMLElement).dataset.drag!;
    const win = document.getElementById(id)!;
    bringToFront(win);
    win.classList.add("dragging");
    const r = win.getBoundingClientRect();
    // Capture the desktop rect ONCE at mousedown so the per-frame mousemove
    // Handler never pays for getBoundingClientRect().
    const isWide = desktop && !window.matchMedia("(max-width: 860px)").matches;
    const desktopRect = isWide && desktop ? desktop.getBoundingClientRect() : null;
    dragState = {
      id, startX: e.clientX, startY: e.clientY,
      initX: r.left, initY: r.top,
      width: r.width, height: r.height,
      desktopRect,
    };
  });
});
document.querySelectorAll("[data-resize]").forEach(r => {
  r.addEventListener("mousedown", (e: any) => {
    e.stopPropagation();
    const id = (r as HTMLElement).dataset.resize!;
    const win = document.getElementById(id)!;
    bringToFront(win);
    win.classList.add("resizing");
    const rect = win.getBoundingClientRect();
    resizeState = { id, startX: e.clientX, startY: e.clientY, initW: rect.width, initH: rect.height };
  });
});
window.addEventListener("mousemove", (e: MouseEvent) => {
  if (dragState) {
    const win = document.getElementById(dragState.id)!;
    let dx = e.clientX - dragState.startX;
    let dy = e.clientY - dragState.startY;
    let nl = dragState.initX + dx;
    let nt = dragState.initY + dy;
    if (dragState.desktopRect) {
      // Uses the rect captured at mousedown — one number comparison per axis,
      // No layout flush.
      const dr = dragState.desktopRect;
      const minX = dr.left, maxX = dr.right - dragState.width;
      const minY = dr.top, maxY = dr.bottom - dragState.height;
      nl = Math.max(minX, Math.min(maxX, nl)) - dr.left;
      nt = Math.max(minY, Math.min(maxY, nt)) - dr.top;
    }
    win.style.left = nl + "px";
    win.style.top = nt + "px";
    win.style.right = "auto";
    win.style.bottom = "auto";
    win.style.transform = "none";
  }
  if (resizeState) {
    const win = document.getElementById(resizeState.id)!;
    let nw = resizeState.initW + (e.clientX - resizeState.startX);
    let nh = resizeState.initH + (e.clientY - resizeState.startY);
    const [mnW, mnH] = floatMin(resizeState.id);
    nw = Math.max(mnW, nw);
    nh = Math.max(mnH, nh);
    win.style.width = nw + "px";
    win.style.height = nh + "px";
  }
});
window.addEventListener("mouseup", () => {
  if (dragState) {
    const win = document.getElementById(dragState.id);
    if (win) {
      win.classList.remove("dragging");
      localStorage.setItem("melo-win-pos-" + dragState.id, JSON.stringify({ left: win.style.left, top: win.style.top }));
    }
    dragState = null;
  }
  if (resizeState) {
    const win = document.getElementById(resizeState.id);
    if (win) {
      win.classList.remove("resizing");
      localStorage.setItem("melo-win-size-" + resizeState.id, JSON.stringify({ width: win.style.width, height: win.style.height }));
    }
    resizeState = null;
  }
});

// Add files / folder dialogs
// The browser fallback bounds count + bytes BEFORE per-file work so a huge
// Drop can't OOM the tab; the Tauri path is bounded by the native picker.
const BROWSER_IMPORT_MAX_FILES = 200;
const BROWSER_IMPORT_MAX_BYTES = 200 * 1024 * 1024;

async function addFilesViaDialog() {
  const lib = window.LumiLibrary;
  if (isTauri) {
    try {
      const { open } = await import("@tauri-apps/plugin-dialog");
      const sel = await open({ multiple: true, filters: [{ name: "Audio", extensions: ["mp3", "flac", "wav", "aac", "ogg", "m4a", "alac", "opus", "wma", "aiff", "mka"] }] });
      if (!sel) return;
      const paths = Array.isArray(sel) ? sel : [sel];
      const list: any[] = await lib?.importPaths?.(paths, "replace") || [];
      if (list.length) {
        busEmit("melo:play-tracks", { tracks: list, index: 0 });
        showToast(`${list.length} file(s) added`);
      }
    } catch { showToast("Error opening files"); }
    return;
  }
  // Cap the browser selection before consuming it; the explicit cap toast
  // Still fires so the preview can't pretend the batch went through.
  const input = document.createElement("input");
  input.type = "file"; input.multiple = true; input.accept = "audio/*,.mp3,.flac,.wav,.aac,.ogg,.m4a,.alac,.opus,.wma,.aiff,.mka";
  input.onchange = async () => {
    const files = Array.from(input.files || []);
    if (!files.length) return;
    await importBrowserAudioFiles(files);
  };
  input.click();
}

// Shared browser-fallback import body for BOTH the Open Files input and
// The OS drag-drop handler, so caps / blob-URL bookkeeping / toast can't
// Drift apart.
// Mode "play" (default): replace queue + start. mode "append": join the
// Queue/playlist without touching playback.
async function importBrowserAudioFiles(files: File[], mode: "play" | "append" = "play") {
  {
    const lib = window.LumiLibrary;
    const player = window.LumiPlayer;
    if (!files.length) return;
    if (files.length > BROWSER_IMPORT_MAX_FILES) {
      showToast(`Browser preview: only the first ${BROWSER_IMPORT_MAX_FILES} of ${files.length} files are imported`);
      files.length = BROWSER_IMPORT_MAX_FILES;
    }
    let totalBytes = 0;
    for (const f of files) totalBytes += (f as any).size || 0;
    if (totalBytes > BROWSER_IMPORT_MAX_BYTES) {
      showToast(`Browser preview: import capped at ${BROWSER_IMPORT_MAX_BYTES / 1024 / 1024} MB`);
      return;
    }
    const list: any[] = [];
    // Object URLs must be revoked or Chromium keeps the Blob alive for the
    // Page's lifetime: an audio-error hook plus a 10-minute safety net.
    // Tracks with a real native path never create object URLs.
    const objectUrlRevokeTimers = new Map<string, number>();
    const armRevoke = (track: any) => {
      const url = track?.path;
      if (!url || typeof url !== "string" || !url.startsWith("blob:")) return;
      // Best-effort revoke: immediately if metadata can't parse, else within 10
      // Minutes; pagehide revokes anything still pending.
      const earlyRevoke = () => {
        const t = objectUrlRevokeTimers.get(track.id);
        if (t != null) { window.clearTimeout(t); objectUrlRevokeTimers.delete(track.id); }
        try { URL.revokeObjectURL(url); } catch {}
      };
      audio.addEventListener("error", earlyRevoke, { once: true });
      objectUrlRevokeTimers.set(track.id, window.setTimeout(earlyRevoke, 10 * 60 * 1000));
    };
    const flushPendingRevokes = () => {
      for (const t of objectUrlRevokeTimers.values()) window.clearTimeout(t);
      for (const track of list) {
        const url = track?.path;
        if (typeof url === "string" && url.startsWith("blob:")) {
          try { URL.revokeObjectURL(url); } catch {}
        }
      }
      objectUrlRevokeTimers.clear();
    };
    window.addEventListener("pagehide", flushPendingRevokes, { once: true });

    let imported = 0;
    for (const f of files) {
      const nativePath = (f as any).path;
      const url = nativePath || URL.createObjectURL(f);
      const leaf = f.name;
      const dot = leaf.lastIndexOf(".");
      const stem = dot > 0 ? leaf.slice(0, dot) : leaf;
      const ext = dot > 0 ? leaf.slice(dot + 1).toUpperCase() : "AUDIO";
      const t: any = { id: nativePath || ("imp_" + Math.random().toString(36).slice(2, 9)), title: stem, artist: "Unknown Artist", albumArtist: "Unknown Artist", album: "Single", duration: 0, path: url, codec: ext, specs: "Local File", source: "import" };
      try {
        await withCover(f, t);
      } catch { /* metadata extraction failed — track is still usable */ }
      list.push(t);
      if (!nativePath) armRevoke(t);
      imported++;
    }
    const addOk = typeof lib?.addTracks === "function";
    lib?.addTracks?.(list, mode === "play");
    lib?.addToCurrentPlaylist?.(list);
    list.forEach(t => player?.queue.push(t));
    if (list.length && mode === "append") {
      showToast(`${list.length} file(s) added to the playlist`);
      return;
    }
    if (list.length) {
      busEmit("melo:play-tracks", { tracks: list, index: 0 });
      // Honest toast: success only when the library actually accepted the batch
      // (addTracks can be a no-op in browser mode).
      const msg = addOk
        ? `${list.length} file(s) added (browser preview)`
        : `Browser preview: no in-memory library available — ${list.length} track(s) queued for one session only`;
      showToast(msg);
    }
  }
}

async function addFolderViaDialog() {
  // Legacy custom-skin hook / shortcut: it now opens the Library manager,
  // Never a direct folder picker. Scans only start from Manage.
  if (isTauri) {
    try {
      const { WebviewWindow } = await import("@tauri-apps/api/webviewWindow");
      const existing = await WebviewWindow.getByLabel("panel-library");
      if (existing) { await existing.show(); await existing.setFocus(); }
      else { await openPanelWindow("library"); }
      window.setTimeout(() => busEmit("melo:open-library-manager", {}), 260);
      return;
    } catch {}
  }
  setVisible("win-library", true);
  const library = document.getElementById("win-library");
  if (library) bringToFront(library);
  busEmit("melo:open-library-manager", {});
}

// Player titlebar "Open Folder": pick a folder, list its TOP-LEVEL audio
// Files (Rust), import through the SAME path as Open Files / drag-drop
// And play. Recursive library scans stay Manage-only by design.
async function openFolderAndPlay() {
  if (isTauri) {
    try {
      const { open } = await import("@tauri-apps/plugin-dialog");
      const dir = await open({ directory: true, multiple: false });
      if (!dir || typeof dir !== "string") return;
      const { invoke } = await import("@tauri-apps/api/core");
      const files = await invoke<string[]>("list_dir_audio_files", { path: dir });
      if (!files.length) { showToast("No supported audio files in that folder"); return; }
      await importAndPlayDroppedPaths(files);
    } catch (err) {
      showToast(`Couldn't open the folder — ${err}`);
    }
    return;
  }
  // Web demo: directory picker via webkitdirectory, then the shared import.
  const input = document.createElement("input");
  input.type = "file";
  input.setAttribute("webkitdirectory", "");
  input.onchange = async () => {
    const files = Array.from(input.files || []).filter((f) => isSupportedAudioFilename(f.name));
    if (!files.length) { showToast("No supported audio files in that folder"); return; }
    await importBrowserAudioFiles(files);
  };
  input.click();
}

document.addEventListener("click", (e) => {
  const target = (e.target as HTMLElement)?.closest('#btnAddFiles, #btnOpenFolder, #btnThemeToggle, [data-melo="add-files"], [data-melo="add-folder"], [data-melo="theme-toggle"]');
  if (!target) return;
  const role = target.getAttribute("data-melo") || target.id;
  if (role === "btnAddFiles" || role === "add-files") addFilesViaDialog();
  else if (role === "btnOpenFolder") openFolderAndPlay();
  else if (role === "btnAddFolder" || role === "add-folder") addFolderViaDialog();
  else if (role === "btnThemeToggle" || role === "theme-toggle") applyTheme(theme === "light" ? "dark" : "light");
});

window.addEventListener("keydown", (e: KeyboardEvent) => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "o") {
    if (e.shiftKey) { e.preventDefault(); addFolderViaDialog(); }
    else { e.preventDefault(); addFilesViaDialog(); }
  }
  if (((e.ctrlKey || e.metaKey) && e.key === ",") || e.key === "F2") {
    e.preventDefault();
    toggleWin("win-settings");
  }
});

// Setup Settings panel handlers (works in floating window and Tauri secondary window)
function setupSettings(toast: ToastFn) {
  function activateSettingsTab(name: string) {
    // The visual .active class and the ARIA tab state update together so
    // Screen readers and sighted users agree.
    document.querySelectorAll(".settings-tab").forEach(t => {
      const el = t as HTMLElement;
      const active = el.dataset.stab === name;
      el.classList.toggle("active", active);
      el.setAttribute("aria-selected", String(active));
      el.tabIndex = active ? 0 : -1;
    });
    document.querySelectorAll(".settings-section[data-panel]").forEach(s => {
      (s as HTMLElement).classList.toggle("active", (s as HTMLElement).dataset.panel === name);
    });
    localStorage.setItem("melo-settings-tab", name);
  }

  // Proper tab semantics: tablist/tab/tabpanel wiring plus roving
  // Focus with arrow-key navigation (activation follows focus).
  const tabListEl = document.getElementById("settingsTabs");
  const tabButtons = [...document.querySelectorAll<HTMLElement>(".settings-tab")];
  tabListEl?.setAttribute("role", "tablist");
  tabButtons.forEach(tab => {
    const name = tab.dataset.stab!;
    tab.setAttribute("role", "tab");
    tab.id = `settings-tab-${name}`;
    tab.setAttribute("aria-controls", `settings-panel-${name}`);
    const panel = document.querySelector<HTMLElement>(`.settings-section[data-panel="${name}"]`);
    if (panel) {
      panel.setAttribute("role", "tabpanel");
      panel.id = `settings-panel-${name}`;
      panel.setAttribute("aria-labelledby", tab.id);
      panel.tabIndex = 0;
    }
  });
  tabButtons.forEach(tab => {
    tab.addEventListener("click", () => activateSettingsTab(tab.dataset.stab!));
  });
  tabListEl?.addEventListener("keydown", (e) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)) return;
    const current = tabButtons.findIndex(tb => tb.getAttribute("aria-selected") === "true");
    let next = Math.max(0, current);
    if (e.key === "ArrowRight") next = (next + 1) % tabButtons.length;
    else if (e.key === "ArrowLeft") next = (next - 1 + tabButtons.length) % tabButtons.length;
    else if (e.key === "Home") next = 0;
    else next = tabButtons.length - 1;
    e.preventDefault();
    activateSettingsTab(tabButtons[next].dataset.stab!);
    tabButtons[next].focus();
  });

  activateSettingsTab(localStorage.getItem("melo-settings-tab") || "general");

  document.querySelectorAll(".switch[data-key]").forEach(sw => {
    const key = (sw as HTMLElement).dataset.key!;
    const saved = localStorage.getItem("melo-pref-" + key);
    if (saved !== null) sw.classList.toggle("on", saved === "1");
    makeSwitchAccessible(sw as HTMLElement);
    (sw as HTMLElement).onclick = () => {
      sw.classList.toggle("on");
      const on = sw.classList.contains("on");
      syncSwitchAria(sw as HTMLElement);
      localStorage.setItem("melo-pref-" + key, on ? "1" : "0");
      busEmit("melo:pref-changed", { key, value: on });
    };
  });

  // Online lyrics: when the main switch is off the save-mode radios and
  // The sidecar warning are dimmed/disabled. The sidecar "read-only folders"
  // Note only appears when "save next to the music file" is selected.
  const swLyricsOnline = document.getElementById("swLyricsOnline");
  const lyricsSaveRow = document.getElementById("lyricsSaveRow");
  const lyricsSaveNote = document.getElementById("lyricsSaveNote");
  function syncLyricsSaveRow() {
    const on = localStorage.getItem("melo-pref-lyricsOnline") === "1";
    if (lyricsSaveRow) {
      lyricsSaveRow.style.setProperty("opacity", on ? "1" : "0.45");
      lyricsSaveRow.style.setProperty("pointer-events", on ? "auto" : "none");
    }
    lyricsSaveRow?.querySelectorAll<HTMLInputElement>("input[type=radio]").forEach(r => { r.disabled = !on; });
    const sidecarChecked = !!lyricsSaveRow?.querySelector<HTMLInputElement>("input[value=sidecar]")?.checked;
    if (lyricsSaveNote) lyricsSaveNote.style.display = (on && sidecarChecked) ? "block" : "none";
  }
  {
    const saved = localStorage.getItem("melo-pref-lyricsSaveMode") || "cache";
    const radios = lyricsSaveRow?.querySelectorAll<HTMLInputElement>("input[type=radio]");
    radios?.forEach(r => {
      r.checked = (r.value === saved);
      r.addEventListener("change", () => {
        if (r.checked) {
          localStorage.setItem("melo-pref-lyricsSaveMode", r.value);
          // Let open lyrics windows drop stale cached lookups so the new
          // Save mode applies to the current track without a restart .
          busEmit("melo:pref-changed", { key: "lyricsSaveMode", value: r.value });
          syncLyricsSaveRow();
        }
      });
    });
  }
  syncLyricsSaveRow();
  swLyricsOnline?.addEventListener("click", () => setTimeout(syncLyricsSaveRow, 0));

  // Crossfade: the generic .switch[data-key] handler persists + broadcasts;
  // Here we only dim the duration row when off and wire the stepper.
  const swCrossfade = document.getElementById("swCrossfade");
  const crossfadeRow = document.getElementById("crossfadeDurationRow");
  const crossfadeRange = document.getElementById("crossfadeDurationRange") as HTMLInputElement | null;
  const crossfadeValue = document.getElementById("crossfadeDurationValue");
  const btnCrossfadeDown = document.getElementById("btnCrossfadeDown");
  const btnCrossfadeUp = document.getElementById("btnCrossfadeUp");

  function syncCrossfadeRowState() {
    const on = localStorage.getItem("melo-pref-crossfade") === "1";
    crossfadeRow?.classList.toggle("disabled-row", !on);
  }
  syncCrossfadeRowState();
  swCrossfade?.addEventListener("click", () => setTimeout(syncCrossfadeRowState, 0));

  function updateCrossfadeRangeBackground() {
    if (!crossfadeRange) return;
    const v = parseInt(crossfadeRange.value, 10) || 1;
    const pct = ((v - 1) / (12 - 1)) * 100;
    crossfadeRange.style.setProperty("--progress", pct + "%");
  }
  function setCrossfadeDuration(seconds: number) {
    // Clamping, persistence and the diff-only melo:pref-changed event
    // All come from the central registry now.
    const clamped = writeSetting("crossfadeDuration", seconds) as number;
    if (crossfadeRange) {
      crossfadeRange.value = String(clamped);
      crossfadeRange.setAttribute("aria-valuetext", `${clamped} seconds`);
    }
    if (crossfadeValue) crossfadeValue.textContent = clamped + "s";
    updateCrossfadeRangeBackground();
  }
  crossfadeRange?.setAttribute("aria-label", "Crossfade duration");
  {
    const clamped = readSetting("crossfadeDuration") as number;
    if (crossfadeRange) {
      crossfadeRange.value = String(clamped);
      crossfadeRange.setAttribute("aria-valuetext", `${clamped} seconds`);
    }
    if (crossfadeValue) crossfadeValue.textContent = clamped + "s";
    updateCrossfadeRangeBackground();
  }
  if (crossfadeRange) crossfadeRange.oninput = () => setCrossfadeDuration(parseInt(crossfadeRange.value, 10));
  btnCrossfadeDown?.addEventListener("click", () => setCrossfadeDuration(parseInt(crossfadeRange?.value || "4", 10) - 1));
  btnCrossfadeUp?.addEventListener("click", () => setCrossfadeDuration(parseInt(crossfadeRange?.value || "4", 10) + 1));

  // Embedded Playlist (skins) customization — cover toggle reuses the
  // Generic .switch[data-key] handler for persistence; the font-scale
  // Stepper follows the same pattern as the crossfade duration stepper.
  const swEmbeddedPlaylistCover = document.getElementById("swEmbeddedPlaylistCover");
  const embeddedFontRange = document.getElementById("embeddedFontScaleRange") as HTMLInputElement | null;
  const embeddedFontValue = document.getElementById("embeddedFontScaleValue");
  const btnEmbeddedFontDown = document.getElementById("btnEmbeddedFontDown");
  const btnEmbeddedFontUp = document.getElementById("btnEmbeddedFontUp");

  function refreshEmbeddedPlaylist() {
    window.__MELO_EMBEDDED_PLAYLIST__?.refresh?.();
  }
  swEmbeddedPlaylistCover?.addEventListener("click", () => setTimeout(refreshEmbeddedPlaylist, 0));

  function updateEmbeddedFontRangeBackground(value: number) {
    if (!embeddedFontRange) return;
    const pct = ((value - 70) / (140 - 70)) * 100;
    embeddedFontRange.style.setProperty("--progress", pct + "%");
  }
  function setEmbeddedFontScale(percent: number) {
    // Registry handles clamp/step (70..140, ×10), persistence and the
    // Diff-only broadcast that notifies other windows.
    const clamped = writeSetting("embeddedPlaylistFontScale", percent) as number;
    if (embeddedFontRange) {
      embeddedFontRange.value = String(clamped);
      embeddedFontRange.setAttribute("aria-valuetext", `${clamped}%`);
    }
    if (embeddedFontValue) embeddedFontValue.textContent = clamped + "%";
    updateEmbeddedFontRangeBackground(clamped);
    refreshEmbeddedPlaylist();
  }
  embeddedFontRange?.setAttribute("aria-label", "Embedded playlist font scale");
  {
    const clamped = readSetting("embeddedPlaylistFontScale") as number;
    if (embeddedFontRange) {
      embeddedFontRange.value = String(clamped);
      embeddedFontRange.setAttribute("aria-valuetext", `${clamped}%`);
    }
    if (embeddedFontValue) embeddedFontValue.textContent = clamped + "%";
    updateEmbeddedFontRangeBackground(clamped);
  }
  if (embeddedFontRange) embeddedFontRange.oninput = () => setEmbeddedFontScale(parseInt(embeddedFontRange.value, 10));
  btnEmbeddedFontDown?.addEventListener("click", () => setEmbeddedFontScale(parseInt(embeddedFontRange?.value || "100", 10) - 10));
  btnEmbeddedFontUp?.addEventListener("click", () => setEmbeddedFontScale(parseInt(embeddedFontRange?.value || "100", 10) + 10));

  // ---------------------------------------------------------------------
  // Visualizer effects + enabled-modes list: written to localStorage
  // ("melo-viz-*") and broadcast as "melo:viz-pref-changed" so the
  // Running visualizer picks changes up live.
  // ---------------------------------------------------------------------
  function vizSet(key: string, on: boolean) {
    localStorage.setItem("melo-viz-" + key, on ? "1" : "0");
    busEmit("melo:viz-pref-changed", {});
  }
  function vizToggleSwitch(sw: HTMLElement | null, key: string) {
    if (!sw) return;
    sw.classList.toggle("on", localStorage.getItem("melo-viz-" + key) === "1");
    makeSwitchAccessible(sw);
    sw.onclick = () => {
      const on = !sw.classList.contains("on");
      sw.classList.toggle("on", on);
      syncSwitchAria(sw);
      vizSet(key, on);
    };
  }
  vizToggleSwitch(document.getElementById("swVizPeak"), "peak");
  vizToggleSwitch(document.getElementById("swVizAfterglow"), "afterglow");
  vizToggleSwitch(document.getElementById("swVizBloom"), "bloom");
  vizToggleSwitch(document.getElementById("swVizMirror"), "mirror");
  vizToggleSwitch(document.getElementById("swVizPale"), "pale");

  const vizSmoothRange = document.getElementById("vizSmoothingRange") as HTMLInputElement | null;
  const vizSmoothValue = document.getElementById("vizSmoothingValue");
  const btnVizSmoothDown = document.getElementById("btnVizSmoothDown");
  const btnVizSmoothUp = document.getElementById("btnVizSmoothUp");
  function updateVizSmoothBackground(v: number) {
    if (!vizSmoothRange) return;
    vizSmoothRange.style.setProperty("--progress", v + "%");
  }
  function setVizSmoothing(v: number) {
    // Registry clamp keeps 0 a legal value; the separate
    // Viz-pref-changed ping is what the running visualizer listens to.
    const clamped = writeSetting("vizSmoothing", v) as number;
    if (vizSmoothRange) {
      vizSmoothRange.value = String(clamped);
      vizSmoothRange.setAttribute("aria-valuetext", String(clamped));
    }
    if (vizSmoothValue) vizSmoothValue.textContent = String(clamped);
    updateVizSmoothBackground(clamped);
    busEmit("melo:viz-pref-changed", {});
  }
  vizSmoothRange?.setAttribute("aria-label", "Visualizer smoothing");
  {
    const saved = readSetting("vizSmoothing") as number;
    if (vizSmoothRange) {
      vizSmoothRange.value = String(saved);
      vizSmoothRange.setAttribute("aria-valuetext", String(saved));
    }
    if (vizSmoothValue) vizSmoothValue.textContent = String(saved);
    updateVizSmoothBackground(saved);
  }
  if (vizSmoothRange) vizSmoothRange.oninput = () => setVizSmoothing(parseInt(vizSmoothRange.value, 10));
  btnVizSmoothDown?.addEventListener("click", () => setVizSmoothing(parseInt(vizSmoothRange?.value || "50", 10) - 5));
  btnVizSmoothUp?.addEventListener("click", () => setVizSmoothing(parseInt(vizSmoothRange?.value || "50", 10) + 5));

  // Scrollable enable/disable list of visualizer modes.
  const vizList = document.getElementById("vizEnabledList");
  function renderVizEnabledList() {
    if (!vizList) return;
    const raw: string[] = [];
    try { raw.push(...(JSON.parse(localStorage.getItem("melo-viz-disabled") || "[]") as string[])); } catch {}
    const disabledSet = new Set(raw.filter((x) => typeof x === "string"));
    vizList.innerHTML = VIZ_MODES.map((m) => {
      const on = !disabledSet.has(m.id);
      return `<label class="viz-enabled-item"><input type="checkbox" data-vizid="${m.id}" ${on ? "checked" : ""} /><span>${m.label}</span></label>`;
    }).join("");
    vizList.querySelectorAll<HTMLInputElement>("input[data-vizid]").forEach((cb) => {
      cb.onchange = () => {
        const s: string[] = [];
        try { s.push(...(JSON.parse(localStorage.getItem("melo-viz-disabled") || "[]") as string[])); } catch {}
        const set = new Set(s.filter((x) => typeof x === "string"));
        if (cb.checked) {
          set.delete(cb.dataset.vizid!);
        } else {
          // Keep the UI honest: the runtime refuses to run mode-less (it re-enables
          // Everything), so unchecking the LAST mode is reverted with an explanation.
          if (set.size + 1 >= VIZ_MODES.length) {
            cb.checked = true;
            toast("At least one visualizer mode must stay enabled");
            return;
          }
          set.add(cb.dataset.vizid!);
        }
        localStorage.setItem("melo-viz-disabled", JSON.stringify([...set]));
        busEmit("melo:viz-pref-changed", {});
      };
    });
  }
  renderVizEnabledList();

  // About panel: fill the version from the runtime instead of hard-coding
  // It — the number now tracks the actual release automatically.
  getAppVersion().then(v => {
    const el = document.getElementById("aboutVersion");
    if (el) el.textContent = v;
  });
  // Build stamp (vite-injected): makes the running build unambiguous in bug
  // Reports.
  const buildEl = document.getElementById("aboutBuild");
  if (buildEl) buildEl.textContent = document.querySelector('meta[name="melo-build"]')?.getAttribute("content") || "unknown";

  // About external links: WebView2 ignores target=_blank under our CSP, so
  // open http(s) URLs via the Rust open_external_url command (default browser).
  // Browser/demo fallback uses window.open. href stays on the anchor for
  // accessibility / copy-link, but the click is always intercepted.
  document.querySelectorAll<HTMLAnchorElement>("[data-melo-external]").forEach(a => {
    a.addEventListener("click", async event => {
      event.preventDefault();
      const url = (a.dataset.meloExternal || a.getAttribute("href") || "").trim();
      if (!/^https?:\/\//i.test(url)) return;
      if (isTauri) {
        try {
          const { invoke } = await import("@tauri-apps/api/core");
          await invoke("open_external_url", { url });
        } catch (e) {
          toast(`Couldn't open link — ${String(e)}`);
        }
        return;
      }
      try { window.open(url, "_blank", "noopener,noreferrer"); } catch {}
    });
  });

  const langSelect = document.getElementById("setLanguage") as HTMLSelectElement | null;
  if (langSelect) {
    langSelect.value = getLocaleCode();
    langSelect.onchange = async () => {
      await setLocale(langSelect.value);
      toast(`Language set to ${langSelect.options[langSelect.selectedIndex].text} — restart Melo to fully apply`);
    };
  }

  // Dynamic Album Artwork Theme
  const swDynamic = document.getElementById("swDynamicTheme");
  if (swDynamic) {
    const on = localStorage.getItem("melo-dynamic-theme") !== "0";
    swDynamic.classList.toggle("on", on);
    syncSwitchAria(swDynamic); // markup may disagree with the stored pref
    makeSwitchAccessible(swDynamic);
    swDynamic.onclick = () => {
      const isNowOn = !swDynamic.classList.contains("on");
      swDynamic.classList.toggle("on", isNowOn);
      syncSwitchAria(swDynamic);
      // Registry write emits the diff-only pref-changed event, which
      // Is what live-applies the theme in every window : the player
      // Owns the queue and applies it from the current track's artwork
      // (extraction cached per artwork, no redundant pixel decoding).
      writeSetting("dynamicTheme", isNowOn);
    };
  }

  // Active Skin Select dropdown & Theme toggle button
  const skinSelect = document.getElementById("skinSelect") as HTMLSelectElement | null;
  const btnSkinThemeToggle = document.getElementById("btnSkinThemeToggle");
  const btnRefreshSkins = document.getElementById("btnRefreshSkins");
  const btnOpenSkinsFolder = document.getElementById("btnOpenSkinsFolder");
  const skinThemeIcon = document.getElementById("skinThemeIcon");
  const skinThemeLabel = document.getElementById("skinThemeLabel");

  function updateThemeUI(t: "light" | "dark") {
    if (skinThemeIcon) skinThemeIcon.textContent = t === "dark" ? "🌙" : "☀️";
    if (skinThemeLabel) skinThemeLabel.textContent = t === "dark" ? "Dark" : "Light";
  }
  updateThemeUI(theme);

  btnSkinThemeToggle?.addEventListener("click", () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
    updateThemeUI(nextTheme);
    toast(nextTheme === "dark" ? "Dark theme" : "Light theme");
  });

  busOn("melo:theme", (t: any) => {
    if (t === "light" || t === "dark") updateThemeUI(t);
  });

  async function populateSkinsDropdown() {
    if (!skinSelect) return;
    const currentVal = localStorage.getItem("melo-active-skin-id") || "default";
    const installed = await listInstalledSkins();
    skinSelect.innerHTML = `<option value="default">Default Melo (Standard)</option>`;
    installed.forEach(item => {
      const opt = document.createElement("option");
      opt.value = item.filename;
      opt.textContent = `${item.name} (${item.filename})`;
      skinSelect.appendChild(opt);
    });
    skinSelect.value = currentVal;
    // The saved skin may have been deleted from the folder meanwhile — the
    // Dropdown must never show a selection that doesn't exist on disk.
    if (skinSelect.value !== currentVal) skinSelect.value = "default";
  }

  populateSkinsDropdown();

  if (skinSelect) {
    skinSelect.onchange = () => {
      const selected = skinSelect.value;
      applySkinChoice(selected, theme, toast);
    };
  }

  btnRefreshSkins?.addEventListener("click", async () => {
    await populateSkinsDropdown();
    const active = localStorage.getItem("melo-active-skin-id") || "default";
    // Honest toast: success is reported only when re-applying the
    // Active skin actually worked. On failure applySkinChoice itself shows
    // Which skin failed and that the Default skin took over.
    const ok = await applySkinChoice(active, theme, toast);
    if (ok) toast("Skins reloaded from disk");
  });

  btnOpenSkinsFolder?.addEventListener("click", () => {
    openSkinsFolderOnDisk(toast);
  });

  document.getElementById("btn-reset-skin-settings")?.addEventListener("click", () => {
    resetSkin(toast);
    if (skinSelect) skinSelect.value = "default";
  });

  // ---------------------------------------------------------------------
  // Reset all settings: confirmation dialog, then registry-driven deletion
  // (resetAllSettings in src/settings.ts) so the scope can never drift from
  // The real preference keys. Session state (current track/playlist,
  // Resume state, window geometry) survives; one "melo:reset" broadcast
  // Reloads every window.
  // ---------------------------------------------------------------------
  function confirmSettingsReset(): Promise<boolean> {
    return new Promise(resolve => {
      const overlay = document.createElement("div");
      overlay.className = "confirm-overlay";
      overlay.innerHTML = `<div class="confirm-dialog" role="dialog" aria-modal="true" aria-labelledby="settingsResetTitle">
        <div id="settingsResetTitle" class="confirm-title">${t("settings.reset.confirm.title")}</div>
        <div class="confirm-message">${t("settings.reset.confirm.message")}</div>
        <div class="confirm-actions"><button class="btn small" data-confirm="cancel">${t("settings.reset.cancel")}</button><button class="btn small danger-confirm" data-confirm="yes">${t("settings.reset.confirm.ok")}</button></div>
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

  document.getElementById("btn-settings-reset")?.addEventListener("click", async () => {
    const ok = await confirmSettingsReset();
    if (!ok) return;
    resetAllSettings();
    await busEmit("melo:reset");
    toast(t("settings.reset.done"));
  });
}

function bindWinControls() {
  // Only buttons tagged data-melo="window-control-*" are bound as window
  // Controls (the shared class is for CSS only). Custom skins may declare
  // Data-melo="close" / "minimize" instead — both spellings are the SAME
  // Action.
  document.querySelectorAll(
    '[data-melo="window-control-minimize"], [data-melo="window-control-close"], [data-melo="minimize"], [data-melo="close"]'
  ).forEach(btn => {
    (btn as HTMLElement).onclick = async () => {
      const role = btn.getAttribute("data-melo");
      const wantsMinimize = role === "window-control-minimize" || role === "minimize";
      const wantsClose = role === "window-control-close" || role === "close";
      if (wantsMinimize && isTauri) {
        const { getCurrentWindow } = await import("@tauri-apps/api/window");
        await getCurrentWindow().minimize();
      } else if (wantsClose && isTauri) {
        // Panel windows announce their own close FIRST so the player's toggle
        // Button un-lights even if the broadcast never crosses back.
        if (urlPanel) busEmit("melo:panel-closed", urlPanel);
        const { getCurrentWindow } = await import("@tauri-apps/api/window");
        await getCurrentWindow().close();
      } else if (wantsClose) {
        showToast("Window close requires the Tauri desktop build");
      }
    };
  });
}
bindWinControls();

// Panel toggles — bound by id in the default skin and by data-melo in custom skins.
const panelHookMap: Array<[string, string, string]> = [
  ["btnToggleLibrary", "toggle-library", "win-library"],
  ["btnTogglePlaylist", "toggle-playlist", "win-playlist"],
  ["btnToggleEq", "toggle-eq", "win-equalizer"],
  ["btnToggleLyrics", "toggle-lyrics", "win-lyrics"],
  ["btnOpenSettings", "toggle-settings", "win-settings"],
];

window.__LUMI_REBIND_MAIN__ = () => {
  bindWinControls();
  panelHookMap.forEach(([id, role, winId]) => {
    const b = findHook<HTMLElement>(id, role);
    if (b) {
      (b as HTMLElement).onclick = () => toggleWin(winId);
    }
  });
  attachEmbeddedPanels();
};

// ---------------------------------------------------------------------
// Optional skin-embedded Playlist / Lyrics: a skin opts in with
// Data-melo="embedded-playlist" / "embedded-lyrics" containers plus
// Optional toggle buttons; skins without the hooks are unaffected.
// Containers are created ONCE and reparented across skin swaps so their
// Listeners never leak.
// ---------------------------------------------------------------------
const embeddedLyricsContainer = document.createElement("div");
embeddedLyricsContainer.className = "embedded-lyrics";
const embeddedLyricsTitle = document.createElement("div");
embeddedLyricsTitle.className = "embedded-lyrics-title";
let embeddedLyricsInitialized = false;

function resolveVisualizerHost(): HTMLElement | null {
  // Skins historically use #vizBars; data-melo="visualizer" is the newer
  // Hook. findHook("visualizer") would miss #vizBars and treat the viz as
  // Missing → pause the render loop forever after a skin swap.
  return (
    document.getElementById("vizBars") ||
    findHook<HTMLElement>("visualizer", "visualizer") ||
    document.querySelector<HTMLElement>(".visualizer-bars")
  );
}

function syncVisualizerPauseState() {
  // Pause only when the slot is actually hidden (display:none / not in
  // Layout). Missing host is treated as "no visualizer in this skin"
  // (compact pill hides it on purpose) — but a visible #vizBars must
  // Never be paused just because it lacks data-melo="visualizer".
  const vizEl = resolveVisualizerHost();
  if (!vizEl) {
    window.__MELO_VISUALIZER_SET_PAUSED__?.(true);
    return;
  }
  const hidden = vizEl.offsetParent === null && getComputedStyle(vizEl).display === "none";
  window.__MELO_VISUALIZER_SET_PAUSED__?.(hidden);
}

function attachEmbeddedPanels() {
  const embeddedPlaylist = window.__MELO_EMBEDDED_PLAYLIST__;
  const playlistHook = findHook<HTMLElement>("embedded-playlist", "embedded-playlist");
  if (playlistHook && embeddedPlaylist?.container) {
    // Skin swaps rebuild the player HTML. If the previous live playlist
    // Was serialized into the template, a static copy stays in the hook
    // And appendChild would add a second list. Keep only the live node.
    [...playlistHook.querySelectorAll(".embedded-playlist")].forEach(el => {
      if (el !== embeddedPlaylist.container) el.remove();
    });
    if (embeddedPlaylist.container.parentElement !== playlistHook) {
      playlistHook.replaceChildren(embeddedPlaylist.container);
    }
    embeddedPlaylist.refresh?.();
  }

  const lyricsHook = findHook<HTMLElement>("embedded-lyrics", "embedded-lyrics");
  if (lyricsHook) {
    // Same guard as the playlist: strip serialized static copies a skin swap
    // May leave in the hook, then place the live node exactly once.
    [...lyricsHook.querySelectorAll(".embedded-lyrics, .embedded-lyrics-title")].forEach((el) => {
      if (el !== embeddedLyricsContainer && el !== embeddedLyricsTitle) el.remove();
    });
    const placedOk =
      embeddedLyricsTitle.parentElement === lyricsHook &&
      embeddedLyricsContainer.parentElement === lyricsHook &&
      embeddedLyricsContainer.previousElementSibling === embeddedLyricsTitle &&
      embeddedLyricsTitle.nextElementSibling === embeddedLyricsContainer;
    if (!placedOk) {
      lyricsHook.replaceChildren(embeddedLyricsTitle, embeddedLyricsContainer);
    }
    if (!embeddedLyricsInitialized) {
      embeddedLyricsInitialized = true;
      setupLyrics(audio, showToast, { container: embeddedLyricsContainer, title: embeddedLyricsTitle });
    }
  }

  function setStageMode(mode: "viz" | "playlist" | "lyrics") {
    document.documentElement.classList.toggle("melo-show-playlist", mode === "playlist");
    document.documentElement.classList.toggle("melo-show-lyrics", mode === "lyrics");
    document.querySelectorAll(".stage-btn").forEach(btn => {
      const role = btn.getAttribute("data-melo");
      const on = (mode === "viz" && role === "toggle-embedded-viz")
        || (mode === "playlist" && role === "toggle-embedded-playlist")
        || (mode === "lyrics" && role === "toggle-embedded-lyrics");
      btn.classList.toggle("active", on);
    });
    if (mode === "playlist") embeddedPlaylist?.refresh?.();
    syncVisualizerPauseState();
  }

  const toggleViz = findHook<HTMLElement>("toggle-embedded-viz", "toggle-embedded-viz");
  if (toggleViz) toggleViz.onclick = () => setStageMode("viz");
  // The playlist / lyrics stage buttons behave as TOGGLES: clicking the
  // Active one hides the panel and returns to the visualizer; clicking the
  // Other one switches the panel; clicking viz always returns to viz.
  const toggleP = findHook<HTMLElement>("toggle-embedded-playlist", "toggle-embedded-playlist");
  if (toggleP) toggleP.onclick = () => {
    const isOn = document.documentElement.classList.contains("melo-show-playlist");
    setStageMode(isOn ? "viz" : "playlist");
  };
  const toggleL = findHook<HTMLElement>("toggle-embedded-lyrics", "toggle-embedded-lyrics");
  if (toggleL) toggleL.onclick = () => {
    const isOn = document.documentElement.classList.contains("melo-show-lyrics");
    setStageMode(isOn ? "viz" : "lyrics");
  };
  if (document.documentElement.classList.contains("melo-show-playlist")) setStageMode("playlist");
  else if (document.documentElement.classList.contains("melo-show-lyrics")) setStageMode("lyrics");
  else setStageMode("viz");
}

// App Initialization
// Keyed on the ?panel= contract alone: a panel document initializes ONLY
// Its own panel, regardless of runtime Tauri detection.
if (urlPanel) {
  if (urlPanel === "library" || urlPanel === "playlist") setupLibrary(audio, showToast);
  else if (urlPanel === "equalizer") setupEqualizer(audio, showToast, { remote: true });
  else if (urlPanel === "lyrics") setupLyrics(audio, showToast);
  else if (urlPanel === "settings") { initLocale(); setupSettings(showToast); setupSkinEngine(showToast); }
} else {
  // Navigation is remembered while this app process remains alive, but a
  // fresh launch must always start Library at its first page.
  try { localStorage.removeItem("melo-library-navigation"); } catch {}
  setupPlayer(audio, showToast);
  setupLibrary(audio, showToast);
  setupEqualizer(audio, showToast);
  setupVisualizer(audio);
  setupLyrics(audio, showToast);
  setupSkinEngine(showToast);
  setupSettings(showToast);
  initLocale();
  attachEmbeddedPanels();
  // Optional skin slot for the *current* synced-lyric line (Settings →
  // General → "Show current lyric line in skins"). No-op for skins that
  // Don't declare a current-lyric / next-lyric slot; see src/lyric-line.ts.
  setupSkinLyricLine(audio, showToast);

  // Resume playback on reopen: restore the last track paused at its saved
  // Position, once shortly after boot (localStorage must load first).
  // The queue must be rebuilt as a real multi-track list — a single-item
  // Queue has no next/previous. Lookup order: the stored playlist first
  // (it joins membership, not library ownership — playlists can hold
  // Unscanned tracks), then the Library, then a single-track queue.
  // The setting only controls auto-START: even when off, the last
  // Track/queue is loaded paused so Play works immediately.
  setTimeout(async () => {
    try {
      // Explorer/CLI-opened files take priority over session resume: without
      // This guard the restore re-loaded the OLD track/position ~500ms after
      // Boot, on top of the freshly imported file.
      if (cliOpenSeen) return;
      const autoplay = localStorage.getItem("melo-pref-resume") !== "0";
      const state = JSON.parse(localStorage.getItem("melo-resume-state") || "null");
      const lib = window.LumiLibrary;
      const p = window.LumiPlayer;
      if (!state?.trackId || !lib || !p) return;
      const track = await lib.getTrack?.(state.trackId);
      if (!track) return;

      let queue: Track[] = [track];
      let idx = 0;

      if (typeof lib.getQueueTracksAll === "function") {
        // The DB queue is the canonical "what was playing".
        const qTracks: Track[] = await lib.getQueueTracksAll();
        const foundIdx = qTracks.findIndex((x) => x.id === track.id);
        if (foundIdx >= 0) {
          queue = qTracks;
          idx = foundIdx;
        }
      }

      if (queue.length === 1 && typeof lib.getAllTracks === "function") {
        const all: Track[] = await lib.getAllTracks();
        const foundIdx = all.findIndex((x) => x.id === track.id);
        if (foundIdx >= 0) {
          queue = all;
          idx = foundIdx;
        }
      }

      p.queue = queue;
      p.loadTrack(idx, autoplay, state.position || 0);
    } catch {}
  }, 500);
}


