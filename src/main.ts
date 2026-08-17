import "./app.css";
import { populateQueue } from "./queue";
import { setupPlayer } from "./player";
import { setupLibrary } from "./library";
import { setupEqualizer } from "./equalizer";
import { setupVisualizer } from "./visualizer";
import { setupLyrics } from "./lyrics";
import { setupSkinEngine, applyCustomSkin, resetSkin, applySkinChoice, listInstalledSkins, openSkinsFolderOnDisk } from "./skin";
import { withCover, applyDynamicAmbientTheme } from "./cover";
import { busEmit, busOn, isTauri } from "./bus";
import { t, initLocale, setLocale, AVAILABLE_LOCALES, getLocaleCode } from "./i18n";
import type { Track } from "./types";

type ToastFn = (msg: string) => void;

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
          <div class="search-wrap">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            <input id="searchInput" class="search-input" placeholder="Search artist, album, track…" />
          </div>
          <button class="btn small library-action scan-action" id="btn-scan" title="Scan a music folder">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/><path d="M12 10v6M9 13h6"/></svg>
            <span class="scan-label">Scan</span>
          </button>
          <button class="btn small library-action danger" id="btn-clear-library" title="Clear the entire Library database">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/></svg>
            <span>Clear</span>
          </button>
        </div>
        <div class="tabs" id="libraryTabs" style="flex-shrink:0;">
          <button class="tab active" data-libtab="artists">Artists</button>
          <button class="tab" data-libtab="albums">Albums</button>
          <button class="tab" data-libtab="genres">Genres</button>
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
      <div class="float-body" style="padding:8px; display:flex; flex-direction:column; gap:6px;">
        <div class="playlist-toolbar" style="display:flex; gap:6px; align-items:center; flex-shrink:0; flex-wrap:wrap;">
          <select id="playlistSelect" class="settings-select" style="height:26px; font-size:11px; padding:2px 6px; flex:1 1 140px;" title="Current playlist"></select>
          <button class="btn small ghost" id="btn-new-playlist" style="height:26px; font-size:11px;">+ New</button>
          <input id="playlistSearchInput" class="search-input" placeholder="Search playlist..." style="flex:1; height:26px; font-size:11px; padding-left:8px;" />
          <select id="playlistSortSelect" class="settings-select" style="height:26px; font-size:11px; padding:2px 6px; width:110px;" title="Sort tracks">
            <option value="default">Sort: Default</option>
            <option value="title-asc">Title (A-Z)</option>
            <option value="artist-asc">Artist (A-Z)</option>
            <option value="album-asc">Album (A-Z)</option>
            <option value="dur-asc">Duration (Shortest)</option>
            <option value="dur-desc">Duration (Longest)</option>
          </select>
        </div>
        <div id="winPlaylistTracks" class="drop-zone" style="flex:1; overflow:auto; display:flex; flex-direction:column; min-height:140px;"></div>
        <div id="winPlaylistEmpty" style="display:none; border:1px dashed var(--card-border); border-radius:10px; padding:16px 10px; background:var(--track-bg); text-align:center; font-size:11px; color:var(--text-muted); line-height:1.8;">
          Playlist is empty<br/>Drag tracks from Library or drop audio files here
        </div>
        <div class="playlist-footer-actions" style="display:flex; gap:6px; flex-shrink:0;">
          <button class="btn small" id="btn-clear-playlist" style="justify-content:center; color:#e5484d;" title="Remove all tracks from the current playlist">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="m19 6-1 14H6L5 6"/></svg>
            Clear
          </button>
          <button class="btn small block" id="btn-export-playlist">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Export M3U
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
            <select id="eqPreset" class="settings-select" style="height:26px; font-size:11px; padding:2px 8px; min-width:130px;">
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
        <div id="lyricsStatus" style="display:none; text-align:center; padding:20px 10px; font-size:12px; color:var(--text-muted); line-height:1.6;"></div>
        <div id="lyricsContainer" class="lyrics-scroll-container" style="flex:1; overflow-y:auto; display:flex; flex-direction:column; gap:8px; padding:20px 8px; text-align:center;"></div>
      </div>
      <div class="resize-handle" data-resize="win-lyrics">◢</div>
    </div>

    <!-- SETTINGS WINDOW -->
    <div class="float-win hidden" id="win-settings" style="left:50%; top:50%; width:600px; height:540px; transform:translate(-50%,-50%); z-index:10;">
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
            <div class="switch on" id="swTray" data-key="tray"></div>
          </div>
          <div class="settings-row">
            <div><div class="label">${t("settings.general.resume.label")}</div><div class="desc">${t("settings.general.resume.desc")}</div></div>
            <div class="switch on" id="swResume" data-key="resume"></div>
          </div>
        </div>

        <!-- PLAYBACK TAB -->
        <div class="settings-section" data-panel="playback">
          <div class="settings-row">
            <div><div class="label">${t("settings.playback.replaygain.label")}</div><div class="desc">${t("settings.playback.replaygain.desc")}</div></div>
            <div class="switch on" id="swReplayGain" data-key="replayGainGlobal"></div>
          </div>
          <div class="settings-row">
            <div><div class="label">${t("settings.playback.fadepause.label")}</div><div class="desc">${t("settings.playback.fadepause.desc")}</div></div>
            <div class="switch" id="swFadePause" data-key="fadePause"></div>
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
                <option value="compact-pill">Minimal Compact (Pill Bar)</option>
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
              Files in the <code>skins/</code> installation folder are loaded dynamically. You can modify CSS/HTML files with any editor.
            </div>
            <div style="display:flex; gap:8px;">
              <button class="btn small" id="btnOpenSkinsFolder" style="flex:1; justify-content:center;">Open Skins Folder 📁</button>
              <label class="btn small" style="cursor:pointer; flex:1; justify-content:center;">
                Import Skin (.html) 📥
                <input id="skinUpload" type="file" accept=".html,.htm" style="display:none" />
              </label>
              <button class="btn small" id="btn-reset-skin-settings">Reset to Default</button>
            </div>
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
            <b>Ctrl + Shift + O</b><span>Scan folder via folder dialog</span>
            <b>Ctrl + , / F2</b><span>Open / Close Settings window</span>
            <b>Escape</b><span>Close popup menus & visualizer selector</span>
          </div>
        </div>

        <!-- ABOUT TAB -->
        <div class="settings-section" data-panel="about">
          <div style="font-size:12px; color:var(--text-soft); line-height:1.8;">
            <div style="font-size:16px; font-weight:800; color:var(--text); margin-bottom:4px;">Melo 0.5.0 Beta</div>
            <b>Tauri 2 + TypeScript + Vite + Rust</b><br/>
            Supports: FLAC, ALAC, MP3, WAV, AAC, OGG, OPUS • 10-band EQ • Real-time FFT Visualizer • Lyric • Dynamic Ambient Theme<br/>
            License: <b>GPL-3.0</b> • Open Source on GitHub:<br/>
            <a href="https://github.com/Arvanta/Melo" target="_blank" rel="noopener" style="color:var(--accent); font-weight:600;">github.com/Arvanta/Melo ↗</a>
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
        <button class="win-btn" id="btnAddFolder" title="Add folder (Ctrl+Shift+O)">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/><path d="M12 10v6"/><path d="M9 13h6"/></svg>
        </button>
        <button class="win-btn" id="btnAbout" title="About Melo">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
        </button>
        <button class="win-btn" id="btnThemeToggle" title="Toggle light / dark theme">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
        </button>
      </div>
      <div class="win-controls">
        <button class="win-btn" aria-label="minimize">—</button>
        <button class="win-btn close" aria-label="close">×</button>
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
            <svg id="iconPause" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>
            <svg id="iconPlay" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style="display:none; margin-left:2px;"><path d="M7 4.5L19 12 7 19.5z"/></svg>
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
          <div class="visualizer-bars" id="vizBars"></div>
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

const urlPanel = new URLSearchParams(location.search).get("panel");
if (urlPanel) {
  document.documentElement.classList.add("panel-window", `panel-${urlPanel}`);
  document.body.classList.add("panel-window", `panel-${urlPanel}`);
}

// Tauri: secondary OS windows render a single panel full-size (real native windows)
if (isTauri && urlPanel) {
  import("@tauri-apps/api/window").then(({ getCurrentWindow }) => {
    const pw = getCurrentWindow();
    persistGeometry(pw, "melo-geo-panel-" + urlPanel);
    pw.onCloseRequested(() => { busEmit("melo:panel-closed", urlPanel); });
    window.addEventListener("beforeunload", () => { busEmit("melo:panel-closed", urlPanel); });
  });
  const winEl = document.getElementById("win-" + urlPanel);
  const titleHtml = winEl?.querySelector(".float-title")?.innerHTML || "";
  const bodyHtml = winEl?.querySelector(".float-body")?.innerHTML || "";
  app.innerHTML = `
<div class="panel-root">
  <div class="panel-titlebar" data-tauri-drag-region>
    <div class="panel-title" data-tauri-drag-region>${titleHtml}</div>
    <div class="win-controls">
      <button class="win-btn" aria-label="minimize" title="Minimize">—</button>
      <button class="win-btn close" aria-label="close" title="Close">×</button>
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
  import("@tauri-apps/api/webviewWindow").then(({ WebviewWindow }) => {
    const refresh = async () => {
      for (const p of ["library", "playlist", "equalizer", "lyrics", "settings"]) {
        try {
          const w = await WebviewWindow.getByLabel("panel-" + p);
          document.getElementById(panelBtnMap[p])?.classList.toggle("active", !!w);
        } catch {}
      }
    };
    refresh();
    setInterval(refresh, 1200);
  });
}

// Desktop: closing the player closes the whole app (panels included)
if (isTauri && !urlPanel) {
  import("@tauri-apps/api/window").then(async ({ getCurrentWindow }) => {
    const mainWin = getCurrentWindow();
    
    const getTargetSize = () => {
      const activeSkin = localStorage.getItem("melo-active-skin-id");
      const isCompact = activeSkin === "compact-pill" || (typeof activeSkin === "string" && activeSkin.startsWith("compact-pill"));
      return { w: isCompact ? 780 : 960, h: isCompact ? 138 : 240 };
    };

    try {
      const g = JSON.parse(localStorage.getItem("melo-geo-main") || "null");
      const { LogicalPosition, LogicalSize } = await import("@tauri-apps/api/dpi");
      const sz = getTargetSize();
      const isCompactStartup = sz.w === 780;
      const startupW = isCompactStartup ? sz.w : (g?.w ? Math.max(650, g.w) : sz.w);
      await mainWin.setSize(new LogicalSize(startupW, sz.h));
      await mainWin.setResizable(!isCompactStartup);
      if (g?.x != null && g?.y != null) {
        await mainWin.setPosition(new LogicalPosition(g.x, g.y));
      }
    } catch {}

    const saveGeo = async () => {
      try {
        const pos = await mainWin.outerPosition();
        const size = await mainWin.innerSize();
        const sz = getTargetSize();
        localStorage.setItem("melo-geo-main", JSON.stringify({ x: pos.x, y: pos.y, w: size.width, h: sz.h }));
      } catch {}
    };
    mainWin.onMoved(saveGeo);
    mainWin.onResized(async () => {
      try {
        const sz = await mainWin.innerSize();
        const target = getTargetSize();
        const isCompact = target.w === 780;
        const { LogicalSize } = await import("@tauri-apps/api/dpi");
        if (!isCompact) {
          const logical = sz.toLogical(await mainWin.scaleFactor());
          if (logical.width < 650 || logical.height !== target.h) {
            await mainWin.setSize(new LogicalSize(Math.max(650, logical.width), target.h));
          }
        }
      } catch {}
      saveGeo();
    });

    busOn("melo:skin-changed", async (skinId: any) => {
      try {
        if (!urlPanel && skinId) {
          await applySkinChoice(skinId, theme, undefined, false);
        }
        const isCompact = skinId === "compact-pill" || (typeof skinId === "string" && skinId.startsWith("compact-pill"));
        const targetW = isCompact ? 780 : 960;
        const targetH = isCompact ? 138 : 240;
        const { LogicalSize } = await import("@tauri-apps/api/dpi");
        await mainWin.setSize(new LogicalSize(targetW, targetH));
        // Compact Pill is a fixed-size design; lock resizing so the window
        // can't be dragged wider/taller than the skin's actual artwork,
        // which previously showed as a visible transparent strip around it.
        await mainWin.setResizable(!isCompact);
        saveGeo();
      } catch {}
    });

    mainWin.onCloseRequested(async (event) => {
      event.preventDefault();
      const trayEnabled = localStorage.getItem("melo-pref-tray") !== "0";
      if (trayEnabled) {
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
  });

  // Handle Windows Explorer "Open With" / CLI file arguments & single-instance file opening
  import("@tauri-apps/api/core").then(async ({ invoke }) => {
    try {
      const cliTracks: any[] = await invoke("get_cli_tracks");
      if (Array.isArray(cliTracks) && cliTracks.length > 0) {
        setTimeout(async () => {
          const lib = (window as any).MeloLibrary;
      const paths = cliTracks.map((t: any) => t.path).filter(Boolean);
      const imported = await lib?.importPaths(paths, "replace") || [];
      if (imported.length) {
        await populateQueue({ type: "tracks", ids: imported.map((t: Track) => t.id) }, { autoplay: true });
      }
        }, 350);
      }
    } catch {}
  });

  busOn("melo:open-files", (cliTracks: any) => {
    if (Array.isArray(cliTracks) && cliTracks.length > 0) {
      const paths = cliTracks.map((t: any) => t.path).filter(Boolean);
      setTimeout(async () => {
        const lib = (window as any).MeloLibrary;
        const imported = await lib?.importPaths(paths, "replace") || [];
        if (imported.length) {
          await populateQueue({ type: "tracks", ids: imported.map((t: Track) => t.id) }, { autoplay: true });
        }
      }, 100);
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
(window as any).__MELO_AUDIO__ = audio;
(window as any).__TOAST__ = showToast;

// Theme logic
// Dynamic Album Artwork Theme is enabled by default on fresh installs and
// after resetting settings. An explicit user choice of "0" is still honored.
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

async function persistGeometry(win: any, key: string) {
  const save = async () => {
    try {
      const pos = await win.outerPosition();
      const size = await win.outerSize();
      localStorage.setItem(key, JSON.stringify({ x: pos.x, y: pos.y, w: size.width, h: size.height }));
    } catch {}
  };
  win.onMoved(save);
  win.onResized(save);
}

async function openPanelWindow(panel: string) {
  const { WebviewWindow } = await import("@tauri-apps/api/webviewWindow");
  const label = "panel-" + panel;
  const btn = document.getElementById(panelBtnMap[panel]);
  const existing = await WebviewWindow.getByLabel(label);
  if (existing) { await existing.close(); btn?.classList.remove("active"); return; }
  const sizes: Record<string, [number, number]> = { library: [430, 620], playlist: [440, 560], equalizer: [700, 440], lyrics: [380, 520], settings: [600, 540] };
  const mins: Record<string, [number, number]> = { library: [360, 400], playlist: [360, 360], equalizer: [620, 400], lyrics: [320, 360], settings: [500, 400] };
  const titles: Record<string, string> = { library: "Library", playlist: "Playlist", equalizer: "Equalizer", lyrics: "Lyric", settings: "Settings" };
  const sz = sizes[panel] || [420, 520];
  let geo: any = null;
  try { geo = JSON.parse(localStorage.getItem("melo-geo-panel-" + panel) || "null"); } catch {}
  new WebviewWindow(label, {
    url: `/?panel=${panel}`,
    title: titles[panel] || panel,
    width: geo?.w || sz[0], height: geo?.h || sz[1], minWidth: (mins[panel] || [360, 360])[0], minHeight: (mins[panel] || [360, 360])[1],
    ...(geo?.x != null ? { x: geo.x, y: geo.y } : { center: true }),
    decorations: false,
    transparent: true,
    shadow: false,
    skipTaskbar: true
  });
  btn?.classList.add("active");
}

busOn("melo:panel-closed", (role: any) => {
  const id = panelBtnMap[role as string];
  if (id) document.getElementById(id)?.classList.remove("active");
});

function toggleWin(winId: string) {
  if (isTauri) { openPanelWindow(winId.replace(/^win-/, "")); return; }
  const vis = isVisible(winId);
  setVisible(winId, !vis);
  if (!vis) bringToFront(document.getElementById(winId)!);
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
  localStorage.setItem("melov2-" + id, visible ? "1" : "0");
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

if (!urlPanel) {
  winIds.forEach(id => {
    const saved = localStorage.getItem("melov2-" + id);
    if (saved !== null) {
      setVisible(id, saved === "1");
    } else {
      if (id === "win-settings") setVisible(id, false);
      else setVisible(id, true);
    }
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
    dragState = { id, startX: e.clientX, startY: e.clientY, initX: r.left, initY: r.top, width: r.width, height: r.height };
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
    if (desktop && !window.matchMedia("(max-width: 860px)").matches) {
      const dr = desktop.getBoundingClientRect();
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
    nw = Math.max(260, nw);
    nh = Math.max(160, nh);
    win.style.width = nw + "px";
    win.style.height = nh + "px";
  }
});
window.addEventListener("mouseup", () => {
  if (dragState) {
    const win = document.getElementById(dragState.id);
    if (win) {
      win.classList.remove("dragging");
      localStorage.setItem("melov2-pos-" + dragState.id, JSON.stringify({ left: win.style.left, top: win.style.top }));
    }
    dragState = null;
  }
  if (resizeState) {
    const win = document.getElementById(resizeState.id);
    if (win) {
      win.classList.remove("resizing");
      localStorage.setItem("melov2-size-" + resizeState.id, JSON.stringify({ width: win.style.width, height: win.style.height }));
    }
    resizeState = null;
  }
});

// Add files / folder dialogs
async function addFilesViaDialog() {
  const lib = (window as any).MeloLibrary;
  if (isTauri) {
    try {
      const { open } = await import("@tauri-apps/plugin-dialog");
      const sel = await open({ multiple: true, filters: [{ name: "Audio", extensions: ["mp3", "flac", "wav", "aac", "ogg", "m4a", "alac", "opus", "wma", "aiff"] }] });
      if (!sel) return;
      const paths = Array.isArray(sel) ? sel : [sel];
      const list: any[] = await lib?.importPaths(paths, "none") || [];
      if (list.length) {
        await populateQueue({ type: "tracks", ids: list.map((t: Track) => t.id) }, { autoplay: true });
        showToast(`${list.length} file(s) added`);
      }
    } catch { showToast("Error opening files"); }
    return;
  }
  const input = document.createElement("input");
  input.type = "file"; input.multiple = true; input.accept = "audio/*,.mp3,.flac,.wav,.aac,.ogg,.m4a,.alac,.opus,.wma,.aiff";
  input.onchange = async () => {
    const files = Array.from(input.files || []);
    if (!files.length) return;
    const list: any[] = [];
    for (const f of files) {
      const nativePath = (f as any).path;
      const url = nativePath || URL.createObjectURL(f);
      const leaf = f.name;
      const dot = leaf.lastIndexOf(".");
      const stem = dot > 0 ? leaf.slice(0, dot) : leaf;
      const ext = dot > 0 ? leaf.slice(dot + 1).toUpperCase() : "AUDIO";
      const t: any = { id: nativePath || ("imp_" + Math.random().toString(36).slice(2, 9)), title: stem, artist: "Unknown Artist", album: "Single", duration: 0, path: url, codec: ext, specs: "Local File", source: "import" };
      await withCover(f, t);
      list.push(t);
    }
    showToast("Direct browser file playback is not used in desktop builds.");
  };
  input.click();
}

async function addFolderViaDialog() {
  const lib = (window as any).MeloLibrary;
  if (isTauri) {
    try {
      const { open } = await import("@tauri-apps/plugin-dialog");
      const sel = await open({ directory: true });
      if (!sel) return;
      const folder = sel as string;
      await lib?.scanFolder(folder, true);
      await populateQueue({ type: "folder", path: folder }, { autoplay: true });
    } catch { showToast("Error scanning folder"); }
    return;
  }
  const input = document.createElement("input");
  input.type = "file"; (input as any).webkitdirectory = true; input.multiple = true; input.accept = "audio/*";
  input.onchange = async () => {
    const files = Array.from(input.files || []).filter(f => /\.(mp3|flac|wav|aac|ogg|m4a|alac|opus|wma|aiff)$/i.test(f.name));
    if (!files.length) return;
    const list: any[] = [];
    for (const f of files) {
      const nativePath = (f as any).path;
      const url = nativePath || URL.createObjectURL(f);
      const leaf = f.name;
      const dot = leaf.lastIndexOf(".");
      const stem = dot > 0 ? leaf.slice(0, dot) : leaf;
      const ext = dot > 0 ? leaf.slice(dot + 1).toUpperCase() : "AUDIO";
      const t: any = { id: nativePath || ("imp_" + Math.random().toString(36).slice(2, 9)), title: stem, artist: "Unknown Artist", album: "Folder Import", duration: 0, path: url, codec: ext, specs: "Local File", source: "import" };
      await withCover(f, t);
      list.push(t);
    }
    showToast("Direct browser folder playback is not used in desktop builds.");
  };
  input.click();
}

document.addEventListener("click", (e) => {
  const target = (e.target as HTMLElement)?.closest("#btnAddFiles, #btnAddFolder, #btnThemeToggle");
  if (!target) return;
  if (target.id === "btnAddFiles") addFilesViaDialog();
  else if (target.id === "btnAddFolder") addFolderViaDialog();
  else if (target.id === "btnThemeToggle") applyTheme(theme === "light" ? "dark" : "light");
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
    document.querySelectorAll(".settings-tab").forEach(t => {
      (t as HTMLElement).classList.toggle("active", (t as HTMLElement).dataset.stab === name);
    });
    document.querySelectorAll(".settings-section[data-panel]").forEach(s => {
      (s as HTMLElement).classList.toggle("active", (s as HTMLElement).dataset.panel === name);
    });
    localStorage.setItem("melo-settings-tab", name);
  }
  document.querySelectorAll(".settings-tab").forEach(t => {
    (t as HTMLElement).addEventListener("click", () => activateSettingsTab((t as HTMLElement).dataset.stab!));
  });
  activateSettingsTab(localStorage.getItem("melo-settings-tab") || "general");

  document.querySelectorAll(".switch[data-key]").forEach(sw => {
    const key = (sw as HTMLElement).dataset.key!;
    const saved = localStorage.getItem("melo-pref-" + key);
    if (saved !== null) sw.classList.toggle("on", saved === "1");
    (sw as HTMLElement).onclick = () => {
      sw.classList.toggle("on");
      const on = sw.classList.contains("on");
      localStorage.setItem("melo-pref-" + key, on ? "1" : "0");
      busEmit("melo:pref-changed", { key, value: on });
    };
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
    swDynamic.onclick = () => {
      const isNowOn = !swDynamic.classList.contains("on");
      swDynamic.classList.toggle("on", isNowOn);
      localStorage.setItem("melo-dynamic-theme", isNowOn ? "1" : "0");
      const currentTrack = (window as any).MeloPlayer?.currentTrack || null;
      if (currentTrack) {
        applyDynamicAmbientTheme(isNowOn ? currentTrack.cover : null);
      }
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
    skinSelect.innerHTML = `
      <option value="default">Default Melo (Standard)</option>
      <option value="compact-pill">Minimal Compact (Pill Bar)</option>
    `;
    installed.forEach(item => {
      if (item.filename !== "compact-pill-light.html" && item.filename !== "compact-pill-dark.html") {
        const opt = document.createElement("option");
        opt.value = item.filename;
        opt.textContent = `${item.name} (${item.filename})`;
        skinSelect.appendChild(opt);
      }
    });
    skinSelect.value = currentVal;
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
    applySkinChoice(active, theme, toast);
    toast("Skins reloaded from disk");
  });

  btnOpenSkinsFolder?.addEventListener("click", () => {
    openSkinsFolderOnDisk(toast);
  });

  document.getElementById("btn-reset-skin-settings")?.addEventListener("click", () => {
    resetSkin(toast);
    if (skinSelect) skinSelect.value = "default";
  });

  document.getElementById("btn-settings-reset")?.addEventListener("click", () => {
    localStorage.clear();
    toast("Settings reset — reloading...");
    setTimeout(() => location.reload(), 600);
  });
}

function bindWinControls() {
  document.querySelectorAll(".win-btn").forEach(btn => {
    (btn as HTMLElement).onclick = async () => {
      const label = btn.getAttribute("aria-label");
      if ((window as any).__TAURI__) {
        const { getCurrentWindow } = await import("@tauri-apps/api/window");
        const w = getCurrentWindow();
        if (label === "minimize") w.minimize();
        else if (label === "close") w.close();
      } else {
        if (label === "close") showToast("Window close requires the Tauri desktop build");
      }
    };
  });
}
bindWinControls();

(window as any).__MELO_REBIND_MAIN__ = () => {
  bindWinControls();
  Object.entries(toggleMap).forEach(([btnId, winId]) => {
    const b = document.getElementById(btnId);
    if (b) {
      (b as HTMLElement).onclick = () => toggleWin(winId);
    }
  });
};

// About popup
const aboutPop = document.createElement("div");
aboutPop.id = "aboutPop";
aboutPop.style.display = "none";
document.body.appendChild(aboutPop);
document.addEventListener("click", (e) => {
  if (!(e.target as HTMLElement)?.closest("#btnAbout")) return;
  e.stopPropagation();
  aboutPop.innerHTML = `
    <div class="about-head">Melo <b>0.5.0 Beta</b></div>
    <div style="font-size:11.5px; color:var(--text-soft); margin:6px 0 10px;">
      Modern Windows Music Player<br/>
      Tauri 2 + TypeScript + Rust
    </div>
    <a class="about-link" id="aboutLink" href="https://github.com/Arvanta/Melo" rel="noopener">github.com/Arvanta/Melo ↗</a>`;
  aboutPop.style.display = aboutPop.style.display === "none" ? "block" : "none";
  document.getElementById("aboutLink")?.addEventListener("click", (ev) => {
    ev.preventDefault();
    const url = "https://github.com/Arvanta/Melo";
    if (isTauri) {
      import("@tauri-apps/api/core").then((m: any) => m.invoke("open_url", { url })).catch(() => window.open(url, "_blank"));
    } else {
      window.open(url, "_blank");
    }
  });
});
document.addEventListener("click", (e) => {
  if (!(e.target as HTMLElement).closest("#aboutPop") && !(e.target as HTMLElement).closest("#btnAbout")) aboutPop.style.display = "none";
});

// App Initialization
if (isTauri && urlPanel) {
  if (urlPanel === "library" || urlPanel === "playlist") setupLibrary(audio, showToast);
  else if (urlPanel === "equalizer") setupEqualizer(audio, showToast, { remote: true });
  else if (urlPanel === "lyrics") setupLyrics(audio, showToast);
  else if (urlPanel === "settings") { initLocale(); setupSettings(showToast); }
} else {
  setupPlayer(audio, showToast);
  setupLibrary(audio, showToast);
  setupEqualizer(audio, showToast);
  setupVisualizer(audio);
  setupLyrics(audio, showToast);
  setupSkinEngine(showToast);
  setupSettings(showToast);
  initLocale();
  // Resume-on-reopen is handled inside setupPlayer by reading queue_get_state
  // from the SQLite-backed playing queue. The localStorage resume key is kept
  // only as a diagnostic snapshot and is no longer the source of truth.
}


