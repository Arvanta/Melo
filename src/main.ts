import "./app.css";
import { setupPlayer } from "./player";
import { setupLibrary } from "./library";
import { setupEqualizer } from "./equalizer";
import { setupVisualizer } from "./visualizer";
import { setupSkinEngine } from "./skin";
import { withCover } from "./cover";
import { busEmit, busOn } from "./bus";

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
        <div class="search-wrap">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <input id="searchInput" class="search-input" placeholder="Search artist, album, track…" />
        </div>
        <div class="tabs" id="libraryTabs" style="flex-shrink:0;">
          <button class="tab active" data-libtab="artists">Artists</button>
          <button class="tab" data-libtab="albums">Albums</button>
          <button class="tab" data-libtab="genres">Genres</button>
        </div>
        <div style="padding:8px 12px; display:flex; justify-content:space-between; align-items:center; font-size:11px; color:var(--text-muted); border-bottom:1px solid var(--card-border); flex-shrink:0;">
          <span id="libraryStats">0 tracks • 0 artists • 0 albums</span>
          <label class="row" style="gap:4px; cursor:pointer; font-size:11px;"><input type="checkbox" id="replayGainToggle" checked /><span>ReplayGain</span></label>
        </div>
        <div id="trackList" style="display:flex; flex-direction:column; flex:1; overflow:auto;"></div>
        <div id="tagEditor" style="display:none; margin:8px 10px 0; background:var(--track-bg); border-radius:10px; padding:12px; gap:10px; flex-direction:column; border:1px solid var(--card-border); flex-shrink:0;">
          <div style="font-weight:600; font-size:12px;">Metadata Editor</div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
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
        <div style="padding:10px; border-top:1px solid var(--card-border); display:flex; gap:6px; flex-shrink:0;">
          <button class="btn small block" id="btn-scan">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/><line x1="12" y1="10" x2="12" y2="16"/><line x1="9" y1="13" x2="15" y2="13"/></svg>
            Scan Folder
          </button>
        </div>
      </div>
      <div class="resize-handle" data-resize="win-library">◢</div>
    </div>

    <!-- PLAYLIST WINDOW -->
    <div class="float-win" id="win-playlist" style="left:370px; top:12px; width:340px; height:460px; z-index:3;">
      <div class="float-header" data-drag="win-playlist">
        <div class="float-title">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
          Playlist
        </div>
        <div class="float-actions">
          <select id="playlistSelect" class="settings-select" style="height:24px; font-size:11px; padding:2px 6px; max-width:120px;" title="Current playlist"></select>
          <button class="btn small ghost" id="btn-new-playlist" style="padding:2px 6px; height:22px; font-size:11px;">+ New</button>
          <button class="float-btn" data-close="win-playlist" title="Hide">—</button>
          <button class="float-btn close" data-close="win-playlist">×</button>
        </div>
      </div>
      <div class="float-body" style="padding:8px; display:flex; flex-direction:column; gap:8px;">
        <div id="winPlaylistTracks" class="drop-zone" style="flex:1; overflow:auto; display:flex; flex-direction:column; min-height:140px;"></div>
        <div id="winPlaylistEmpty" style="display:none; border:1px dashed var(--card-border); border-radius:10px; padding:16px 10px; background:var(--track-bg); text-align:center; font-size:11px; color:var(--text-muted); line-height:1.8;">
          Playlist is empty<br/>Drag tracks from the Library and drop them here
        </div>
        <button class="btn small block" id="btn-export-playlist" style="flex-shrink:0;">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Export M3U (current list)
        </button>
      </div>
      <div class="resize-handle" data-resize="win-playlist">◢</div>
    </div>

    <!-- EQUALIZER WINDOW -->
    <div class="float-win" id="win-equalizer" style="left:14px; top:12px; width:520px; height:280px; z-index:2;">
      <div class="float-header" data-drag="win-equalizer">
        <div class="float-title">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 14h3v7H3zM9 10h3v11H9zM15 6h3v15h-3zM21 12h-3v9h3z"/></svg>
          Equalizer
        </div>
        <div class="float-actions">
          <select id="eqPreset" class="settings-select" style="height:24px; font-size:11px; padding:2px 6px;">
            <option value="flat">Flat</option>
            <option value="pop">Pop</option>
            <option value="rock">Rock</option>
            <option value="bass">Bass Boost</option>
            <option value="jazz">Jazz</option>
            <option value="classical">Classical</option>
            <option value="vocal">Vocal Boost</option>
          </select>
          <label class="row" style="gap:4px; font-size:11px; cursor:pointer;"><input type="checkbox" id="eqEnable" checked /> On</label>
          <button class="float-btn" data-close="win-equalizer">—</button>
          <button class="float-btn close" data-close="win-equalizer">×</button>
        </div>
      </div>
      <div class="float-body" style="padding:12px; display:flex; flex-direction:column; gap:10px;">
        <div class="eq-grid" id="eqGrid" style="background:var(--track-bg); border-radius:12px; padding:12px; border:1px solid var(--card-border);">
          <div class="eq-bands" id="eqBands"></div>
          <canvas id="eqCanvas" class="equalizer-canvas"></canvas>
          <div class="row" style="justify-content:space-between; font-size:11px; color:var(--text-muted);">
            <span>31Hz — 16kHz • 10 bands</span>
            <span id="eqHint" style="font-size:10px;">Drag the sliders</span>
          </div>
        </div>
      </div>
      <div class="resize-handle" data-resize="win-equalizer">◢</div>
    </div>

    <!-- SETTINGS WINDOW -->
    <div class="float-win hidden" id="win-settings" style="left:50%; top:50%; width:560px; height:520px; transform:translate(-50%,-50%); z-index:10;">
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
          <button class="settings-tab active" data-stab="general"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>General</button>
          <button class="settings-tab" data-stab="playback"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M10 8l6 4-6 4z"/></svg>Playback</button>
          <button class="settings-tab" data-stab="library"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m16 6 4 14"/><path d="M12 6v14"/><path d="M8 8v12"/><path d="M4 4v16"/></svg>Library</button>
          <button class="settings-tab" data-stab="appearance"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>Appearance</button>
          <button class="settings-tab" data-stab="shortcuts"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M6 14h.01M18 14h.01M9 14h6"/></svg>Shortcuts</button>
          <button class="settings-tab" data-stab="about"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>About</button>
        </div>
        <div class="settings-section active" data-panel="general">
          <div class="settings-row">
            <div><div class="label">Language</div><div class="desc">Interface language</div></div>
            <select class="settings-select" id="setLanguage"><option value="fa">Persian</option><option value="en">English</option><option value="de">Deutsch</option></select>
          </div>
          <div class="settings-row">
            <div><div class="label">Launch at Windows startup</div><div class="desc">Run when the system starts</div></div>
            <div class="switch" id="swAutoStart" data-key="autoStart"></div>
          </div>
          <div class="settings-row">
            <div><div class="label">Close to system tray</div><div class="desc">Send the close button to the tray</div></div>
            <div class="switch on" id="swTray" data-key="tray"></div>
          </div>
          <div class="settings-row">
            <div><div class="label">Resume playback on reopen</div><div class="desc">Continue the previous track</div></div>
            <div class="switch on" id="swResume" data-key="resume"></div>
          </div>
        </div>

        <div class="settings-section" data-panel="playback">
          <div class="settings-row">
            <div><div class="label">Gapless playback</div><div class="desc">No pause between tracks</div></div>
            <div class="switch on" data-key="gapless"></div>
          </div>
          <div class="settings-row">
            <div><div class="label">Crossfade</div><div class="desc">Overlap track ends and starts</div></div>
            <div style="display:flex; align-items:center; gap:8px;">
              <input type="range" min="0" max="12" value="0" id="setCrossfade" style="width:100px;" />
              <span id="crossfadeVal" style="font-size:11px; color:var(--text-muted);">0s</span>
            </div>
          </div>
          <div class="settings-row">
            <div><div class="label">ReplayGain normalization</div><div class="desc">Equalize loudness across all tracks</div></div>
            <div class="switch on" data-key="replayGainGlobal"></div>
          </div>
          <div class="settings-row">
            <div><div class="label">Fade out on pause</div><div class="desc">Pause with a 0.3s fade</div></div>
            <div class="switch" data-key="fadePause"></div>
          </div>
        </div>

        <div class="settings-section" data-panel="library">
          <div class="settings-row">
            <div><div class="label">Auto-scan folders</div><div class="desc">Detect file changes automatically</div></div>
            <div class="switch on" data-key="autoScan"></div>
          </div>
          <div class="settings-row">
            <div><div class="label">Displayed formats</div><div class="desc">Format filter in the library</div></div>
            <div style="font-size:11px; color:var(--text-muted);">MP3, FLAC, WAV, AAC, OGG, ALAC</div>
          </div>
          <div class="settings-row" style="flex-direction:column; align-items:stretch;">
            <div class="label" style="margin-bottom:6px;">Music folders</div>
            <div style="display:flex; gap:6px;">
              <input class="search-input" value="E:\\Music" id="setMusicFolder" style="flex:1; padding-left:10px;" readonly />
              <button class="btn small" id="btnChooseFolder">Browse</button>
            </div>
          </div>
        </div>

        <div class="settings-section" data-panel="appearance">
          <div class="settings-row">
            <div><div class="label">Show Stop button</div><div class="desc">Show a stop button to the left of the play button</div></div>
            <div class="switch" id="swStopBtn" data-key="showStop"></div>
          </div>
          <div class="settings-row">
            <div><div class="label">Theme</div><div class="desc">Light or dark</div></div>
            <div style="display:flex; gap:6px;">
              <button class="btn small primary" id="skinLight">Light — Melo</button>
              <button class="btn small" id="skinDark">Dark — Nocturne</button>
            </div>
          </div>
          <div class="settings-row" style="flex-direction:column; align-items:stretch;">
            <div class="label" style="margin-bottom:6px;">Custom skin (HTML/CSS)</div>
            <div style="font-size:11px; color:var(--text-soft); line-height:1.6; margin-bottom:8px;">
              Provide an HTML file with CSS to control the entire look. <a href="#" id="linkDownloadExample" style="color:var(--accent);">Download example</a>
            </div>
            <label class="btn small block" style="cursor:pointer;">
              Load HTML skin
              <input id="skinUpload" type="file" accept=".html,.htm" style="display:none" />
            </label>
            <div id="skinPreview" style="min-height:90px; margin-top:8px; border:1px dashed var(--card-border); border-radius:10px; overflow:hidden; background:var(--track-bg); display:grid; place-items:center; color:var(--text-muted); font-size:11px;">
              Skin preview here
            </div>
          </div>
          <div class="settings-row">
            <div><div class="label">Window opacity</div><div class="desc">Card transparency</div></div>
            <input type="range" min="0" max="100" value="100" id="setOpacity" style="width:100px;" />
          </div>
        </div>

        <div class="settings-section" data-panel="shortcuts">
          <div style="font-size:11px; color:var(--text-muted); line-height:1.8;">
            Space: play/pause • ←/→: seek 5s • ↑/↓: volume • M: mute • S: shuffle • R: repeat<br/>
            System and media-key shortcuts are active in the Tauri build.
          </div>
        </div>

        <div class="settings-section" data-panel="about">
          <div style="font-size:12px; color:var(--text-soft); line-height:1.7;">
            <b>Melo 0.1 Beta</b> — Tauri + TypeScript + Rust<br/>
            Supports: FLAC, ALAC, MP3, WAV, AAC, OGG • 10-band equalizer • Visualizer • ReplayGain<br/>
            Windows builds via GitHub Actions
          </div>
        </div>
      </div>
      <div class="resize-handle" data-resize="win-settings">◢</div>
    </div>

  </div>

  <!-- PLAYER BAR -->
  <div class="player-card" id="playerCard">
    <div class="player-titlebar" data-tauri-drag-region>
      <div class="app-brand">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12h2l1-7 2 14 3-10 2 6h2l2-9 2 14 2-7h2"/></svg>
        Melo
      </div>
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
          <button class="icon-btn" id="btnStop" title="Stop" style="display:none">
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
          <span class="time" id="curTime">1:24</span>
          <div class="seek-wrap">
            <input type="range" class="seek" id="seekBar" min="0" max="276" value="84" />
          </div>
          <span class="time" id="durTime">4:36</span>
        </div>
      </div>

      <div class="right-panel">
        <div class="right-main">
          <div class="visualizer-bars" id="vizBars"></div>
        </div>
        <div class="side-actions">
          <button class="sbtn active" id="btnToggleLibrary" title="Library (Library)">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m16 6 4 14"/><path d="M12 6v14"/><path d="M8 8v12"/><path d="M4 4v16"/></svg>
          </button>
          <button class="sbtn active" id="btnTogglePlaylist" title="Playlist (Playlist)">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15V6"/><path d="M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"/><path d="M12 12H3"/><path d="M16 6H3"/><path d="M12 18H3"/></svg>
          </button>
          <button class="sbtn active" id="btnToggleEq" title="Equalizer">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 14h3v7H3zM9 10h3v11H9zM15 6h3v15h-3z"/></svg>
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

const isTauri = !!(window as any).__TAURI__;
const urlPanel = new URLSearchParams(location.search).get("panel");

// Tauri: secondary OS windows render a single panel full-size (real native windows)
if (isTauri && urlPanel) {
  import("@tauri-apps/api/window").then(({ getCurrentWindow }) => {
    const pw = getCurrentWindow();
    persistGeometry(pw, "melo-geo-panel-" + urlPanel);
    pw.onCloseRequested(()=>{ busEmit("melo:panel-closed", urlPanel); });
    window.addEventListener("beforeunload", ()=>{ busEmit("melo:panel-closed", urlPanel); });
  });
  const winEl = document.getElementById("win-" + urlPanel);
  const titleHtml = winEl?.querySelector(".float-title")?.innerHTML || "";
  const bodyHtml = winEl?.querySelector(".float-body")?.innerHTML || "";
  app.innerHTML = `
<div class="panel-root">
  <div class="panel-titlebar">${titleHtml}</div>
  <div class="panel-body">${bodyHtml}</div>
  <div id="toast" class="toast"></div>
</div>`;
}
if (isTauri && !urlPanel) {
  document.body.classList.add("tauri-main");
  // panels are closed at startup; side buttons must not look "active"
  document.querySelectorAll(".side-actions .sbtn").forEach(b=>b.classList.remove("active"));
  import("@tauri-apps/api/webviewWindow").then(({ WebviewWindow }) => {
    const refresh = async () => {
      for (const p of ["library", "playlist", "equalizer", "settings"]) {
        try {
          const w = await WebviewWindow.getByLabel("panel-" + p);
          document.getElementById(panelBtnMap[p])?.classList.toggle("active", !!w);
        } catch {}
      }
    };
    refresh();
    setInterval(refresh, 1200); // heals X-button closes and any missed events
  });
}

// Desktop: closing the player closes the whole app (panels included)
if (isTauri && !urlPanel) {
  import("@tauri-apps/api/window").then(async ({ getCurrentWindow }) => {
    const mainWin = getCurrentWindow();
    // restore last geometry of the main window
    try {
      const g = JSON.parse(localStorage.getItem("melo-geo-main") || "null");
      if (g?.w) {
        const { PhysicalPosition, PhysicalSize } = await import("@tauri-apps/api/dpi");
        await mainWin.setSize(new PhysicalSize(g.w, g.h));
        await mainWin.setPosition(new PhysicalPosition(g.x, g.y));
      }
    } catch {}
    persistGeometry(mainWin, "melo-geo-main");
    // safety net: never allow the frameless window below the usable width
    mainWin.onResized(async () => {
      try {
        const sz = await mainWin.innerSize();
        if (sz.width < 650) {
          const { PhysicalSize } = await import("@tauri-apps/api/dpi");
          await mainWin.setSize(new PhysicalSize(650, sz.height));
        }
      } catch {}
    });
    mainWin.onCloseRequested(async (event) => {
      event.preventDefault();
      const { WebviewWindow } = await import("@tauri-apps/api/webviewWindow");
      for (const p of ["library", "playlist", "equalizer", "settings"]) {
        try {
          const w = await WebviewWindow.getByLabel("panel-" + p);
          if (w) await w.close();
        } catch {}
      }
      try { await mainWin.destroy(); } catch { window.close(); }
    });
  });
}

// no native right-click menu anywhere; library & playlist render their own menus
document.addEventListener("contextmenu", (e)=>{ e.preventDefault(); });

const toastEl = document.getElementById("toast") as HTMLDivElement;
const showToast: ToastFn = (msg) => {
  toastEl.textContent = msg;
  toastEl.classList.add("show");
  setTimeout(() => toastEl.classList.remove("show"), 2200);
};

const audio = new Audio();
audio.crossOrigin = "anonymous";
audio.preload = "metadata";
(window as any).__LUMI_AUDIO__ = audio;
(window as any).__TOAST__ = showToast;

if (isTauri && urlPanel) {
  // secondary OS window: UI only — player commands travel over the event bus
  if (urlPanel === "library" || urlPanel === "playlist") setupLibrary(audio, showToast);
  else if (urlPanel === "equalizer") setupEqualizer(audio, showToast, { remote: true });
} else {
  setupPlayer(audio, showToast);
  setupLibrary(audio, showToast);
  setupEqualizer(audio, showToast);
  setupVisualizer(audio);
  setupSkinEngine(showToast);
}

// playlist window content (current playlist song list) is rendered by library.ts

// Theme
let theme: "light" | "dark" = (localStorage.getItem("lumi-theme") as any) || "light";
function applyThemeLocal(t: "light"|"dark"){
  document.documentElement.setAttribute("data-theme", t);
  localStorage.setItem("lumi-theme", t);
  theme = t;
}
function applyTheme(t: "light"|"dark"){
  applyThemeLocal(t);
  busEmit("melo:theme", t); // keep every open window in sync
}
applyThemeLocal(theme);
busOn("melo:theme", (t:any)=>{ if(t==="light"||t==="dark") applyThemeLocal(t); });
setInterval(()=>{ const t = localStorage.getItem("lumi-theme"); if ((t==="light"||t==="dark") && t!==theme) applyThemeLocal(t); }, 1000);
document.getElementById("skinLight")?.addEventListener("click", ()=> applyTheme("light"));
document.getElementById("skinDark")?.addEventListener("click", ()=> applyTheme("dark"));
document.getElementById("menuSkinLight")?.addEventListener("click", ()=> { applyTheme("light"); showToast("Light theme"); });
document.getElementById("menuSkinDark")?.addEventListener("click", ()=> { applyTheme("dark"); showToast("Dark theme"); });

// Floating windows toggle & drag/resize
const winIds = ["win-library","win-playlist","win-equalizer","win-settings"];
const desktop = document.getElementById("desktop") as HTMLElement;
const toggleMap: Record<string,string> = {
  "btnToggleLibrary":"win-library",
  "btnTogglePlaylist":"win-playlist",
  "btnToggleEq":"win-equalizer",
  "btnOpenSettings":"win-settings",
  "menuToggleLibrary":"win-library",
  "menuTogglePlaylist":"win-playlist",
  "menuToggleEq":"win-equalizer",
  "menuToggleSettings":"win-settings"
};
function isVisible(id:string){ const el = document.getElementById(id); return !!el && !el.classList.contains("hidden"); }
// Open a panel as a REAL independent OS window (Tauri multi-window)
const panelBtnMap: Record<string,string> = { library:"btnToggleLibrary", playlist:"btnTogglePlaylist", equalizer:"btnToggleEq", settings:"btnOpenSettings" };

/** remember window position/size across restarts */
async function persistGeometry(win: any, key: string){
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

async function openPanelWindow(panel: string){
  const { WebviewWindow } = await import("@tauri-apps/api/webviewWindow");
  const label = "panel-" + panel;
  const btn = document.getElementById(panelBtnMap[panel]);
  const existing = await WebviewWindow.getByLabel(label);
  if (existing) { await existing.close(); btn?.classList.remove("active"); return; } // second click closes the panel
  const sizes: Record<string, [number, number]> = { library: [430, 620], playlist: [440, 560], equalizer: [700, 440], settings: [680, 620] };
  const mins: Record<string, [number, number]> = { library: [360, 400], playlist: [360, 360], equalizer: [620, 400], settings: [600, 480] };
  const titles: Record<string, string> = { library: "Library", playlist: "Playlist", equalizer: "Equalizer", settings: "Settings" };
  const sz = sizes[panel] || [420, 520];
  let geo: any = null;
  try { geo = JSON.parse(localStorage.getItem("melo-geo-panel-" + panel) || "null"); } catch {}
  new WebviewWindow(label, {
    url: `/?panel=${panel}`,
    title: titles[panel] || panel,
    width: geo?.w || sz[0], height: geo?.h || sz[1], minWidth: (mins[panel] || [360, 360])[0], minHeight: (mins[panel] || [360, 360])[1],
    ...(geo?.x != null ? { x: geo.x, y: geo.y } : { center: true }),
    decorations: true,
    skipTaskbar: true // auxiliary panels: one single taskbar button (the player)
  });
  btn?.classList.add("active");
  busEmit("melo:theme", theme); // make sure the new window starts with the live theme
}

// panels report their closing so the side buttons return to the inactive state
busOn("melo:panel-closed", (role: any)=>{
  const id = panelBtnMap[role as string];
  if (id) document.getElementById(id)?.classList.remove("active");
});
function toggleWin(winId: string){
  if (winId === "win-settings") { showToast("Settings is under construction — coming soon!"); return; }
  if (isTauri) { openPanelWindow(winId.replace(/^win-/, "")); return; }
  const vis = isVisible(winId);
  setVisible(winId, !vis);
  if (!vis) bringToFront(document.getElementById(winId)!);
}
// Keep floating windows inside the visible desktop area (fixes off-screen windows like the old equalizer position)
function clampIntoDesktop(win: HTMLElement){
  if(win.classList.contains("hidden")) return;
  if(!desktop) return;
  if(window.matchMedia("(max-width: 860px)").matches) return; // mobile: windows stack in normal flow
  const dr = desktop.getBoundingClientRect();
  if(dr.width <= 0 || dr.height <= 0) return;
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
function setVisible(id:string, visible:boolean){
  const el = document.getElementById(id);
  if(!el) return;
  el.classList.toggle("hidden", !visible);
  localStorage.setItem("lumiv2-"+id, visible ? "1" : "0");
  if(visible) clampIntoDesktop(el);
  // update side buttons & menu checks
  const active = visible;
  if(id==="win-library"){
    document.getElementById("btnToggleLibrary")?.classList.toggle("active", active);
    document.getElementById("menuToggleLibrary")?.classList.toggle("active", active);
  }
  if(id==="win-playlist"){
    document.getElementById("btnTogglePlaylist")?.classList.toggle("active", active);
    document.getElementById("menuTogglePlaylist")?.classList.toggle("active", active);
  }
  if(id==="win-equalizer"){
    document.getElementById("btnToggleEq")?.classList.toggle("active", active);
    document.getElementById("menuToggleEq")?.classList.toggle("active", active);
  }
  if(id==="win-settings"){
    document.getElementById("btnOpenSettings")?.classList.toggle("active", active);
  }
}
// init visibility (floating demo windows are web-mode only)
if (!urlPanel) {
  winIds.forEach(id=>{
    const saved = localStorage.getItem("lumiv2-"+id);
    if(saved !== null){
      setVisible(id, saved==="1");
    } else {
      // default: settings hidden, others visible
      if(id==="win-settings") setVisible(id,false);
      else setVisible(id,true);
    }
  });
}
// button handlers (web: toggle floating windows / Tauri: open real OS windows)
Object.entries(toggleMap).forEach(([btnId, winId])=>{
  document.getElementById(btnId)?.addEventListener("click", ()=> toggleWin(winId));
});
// close buttons
document.querySelectorAll("[data-close]").forEach(btn=>{
  btn.addEventListener("click", ()=>{
    const id = (btn as HTMLElement).dataset.close!;
    setVisible(id,false);
  });
});

// Drag & Resize logic
let dragState: any = null;
let resizeState: any = null;
let zCounter = 10;
function bringToFront(win: HTMLElement){
  if(!win) return;
  zCounter++;
  win.style.zIndex = String(zCounter);
  document.querySelectorAll(".float-win").forEach(w=>w.classList.remove("active"));
  win.classList.add("active");
}
document.querySelectorAll(".float-win").forEach(win=>{
  win.addEventListener("mousedown", ()=> bringToFront(win as HTMLElement));
});

// drag
document.querySelectorAll("[data-drag]").forEach(header=>{
  (header as HTMLElement).addEventListener("mousedown", (e: any)=>{
    const ev = e as MouseEvent;
    // don't hijack interactive controls inside headers (fixes the EQ preset dropdown not opening)
    if((ev.target as HTMLElement).closest("button, select, input, textarea, a, label")) return;
    const winId = (header as HTMLElement).dataset.drag!;
    const win = document.getElementById(winId)!;
    bringToFront(win);
    const rect = win.getBoundingClientRect();
    const desktopRect = desktop.getBoundingClientRect();
    dragState = {
      win, startX: ev.clientX, startY: ev.clientY,
      origLeft: rect.left - desktopRect.left,
      origTop: rect.top - desktopRect.top
    };
    win.classList.add("dragging");
    e.preventDefault();
  });
});
// resize
document.querySelectorAll("[data-resize]").forEach(handle=>{
  (handle as HTMLElement).addEventListener("mousedown", (e: any)=>{
    const ev = e as MouseEvent;
    const winId = (handle as HTMLElement).dataset.resize!;
    const win = document.getElementById(winId)!;
    bringToFront(win);
    const rect = win.getBoundingClientRect();
    resizeState = {
      win, startX: ev.clientX, startY: ev.clientY,
      startW: rect.width, startH: rect.height
    };
    win.classList.add("resizing");
    e.preventDefault();
    e.stopPropagation();
  });
});
window.addEventListener("mousemove", (e: any)=>{
  const ev = e as MouseEvent;
  if(dragState){
    const dx = ev.clientX - dragState.startX;
    const dy = ev.clientY - dragState.startY;
    let nl = dragState.origLeft + dx;
    let nt = dragState.origTop + dy;
    // constrain
    const maxL = desktop.clientWidth - dragState.win.offsetWidth;
    const maxT = desktop.clientHeight - dragState.win.offsetHeight;
    nl = Math.max(0, Math.min(maxL, nl));
    nt = Math.max(0, Math.min(maxT, nt));
    dragState.win.style.left = nl+"px";
    dragState.win.style.top = nt+"px";
    dragState.win.style.right = "auto";
    dragState.win.style.bottom = "auto";
    dragState.win.style.transform = "none";
  }
  if(resizeState){
    const dx = ev.clientX - resizeState.startX;
    const dy = ev.clientY - resizeState.startY;
    let nw = resizeState.startW + dx;
    let nh = resizeState.startH + dy;
    nw = Math.max(260, Math.min(desktop.clientWidth - resizeState.win.offsetLeft, nw));
    nh = Math.max(180, Math.min(desktop.clientHeight - resizeState.win.offsetTop, nh));
    resizeState.win.style.width = nw+"px";
    resizeState.win.style.height = nh+"px";
  }
});
window.addEventListener("mouseup", ()=>{
  if(dragState){ dragState.win.classList.remove("dragging"); saveWinPos(dragState.win); dragState=null; }
  if(resizeState){ resizeState.win.classList.remove("resizing"); saveWinPos(resizeState.win); resizeState=null; }
});
function saveWinPos(win: HTMLElement){
  const id = win.id;
  const data = { left: win.style.left, top: win.style.top, width: win.style.width, height: win.style.height };
  localStorage.setItem("lumiv2-pos-"+id, JSON.stringify(data));
}
// restore positions
winIds.forEach(id=>{
  const saved = localStorage.getItem("lumiv2-pos-"+id);
  if(saved){
    try{
      const d = JSON.parse(saved);
      const el = document.getElementById(id);
      if(!el) return;
      if(d.left) el.style.left = d.left;
      if(d.top) el.style.top = d.top;
      if(d.width) el.style.width = d.width;
      if(d.height) el.style.height = d.height;
      if(d.left && d.top){ el.style.transform="none"; el.style.right="auto"; el.style.bottom="auto"; }
    }catch{}
  }
});
// clamp restored/default positions into view + keep windows inside when app is resized
function clampAll(){ winIds.forEach(id=>{ const el = document.getElementById(id); if(el) clampIntoDesktop(el); }); }
clampAll();
if (desktop) new ResizeObserver(()=> clampAll()).observe(desktop);
window.addEventListener("resize", clampAll);

// App menu
let appMenuBtn = document.getElementById("appMenuBtn") as HTMLButtonElement | null;
let appMenu = document.getElementById("appMenu") as HTMLElement | null;
function toggleMenu(){
  const open = appMenu?.classList.toggle("open");
  appMenuBtn?.classList.toggle("open", !!open);
}
appMenuBtn?.addEventListener("click", (e)=>{ e.stopPropagation(); toggleMenu(); });
document.addEventListener("click", (e)=>{
  if(appMenu && !appMenu.contains(e.target as Node) && e.target !== appMenuBtn){
    appMenu?.classList.remove("open");
    appMenuBtn?.classList.remove("open");
  }
});
document.addEventListener("keydown", (e)=>{ if(e.key==="Escape"){ appMenu?.classList.remove("open"); appMenuBtn?.classList.remove("open"); }});
document.getElementById("menuCustomSkin")?.addEventListener("click", ()=>{
  (document.getElementById("skinUpload") as HTMLInputElement)?.click();
  appMenu?.classList.remove("open");
});
document.getElementById("menuAbout")?.addEventListener("click", ()=>{
  showToast("Melo v1.0 — Tauri + TypeScript + Rust • made with ❤️");
  appMenu?.classList.remove("open");
});
document.getElementById("menuToggleSettings")?.addEventListener("click", ()=>{
  toggleWin("win-settings");
  appMenu?.classList.remove("open");
});

// === Add files / folder from the menu ===
async function addFilesViaDialog(){
  const lib = (window as any).LumiLibrary;
  const player = (window as any).LumiPlayer;
  if((window as any).__TAURI__){
    try{
      const { open } = await import("@tauri-apps/plugin-dialog");
      const selected = await open({ multiple:true, filters:[{name:"Audio", extensions:["mp3","flac","wav","aac","ogg","m4a","alac","opus","wma"]}] }) as string[] | string | null;
      if(!selected) return;
      const files = Array.isArray(selected) ? selected : [selected];
      const list: any[] = await lib.importPaths(files);
      list.forEach(t=> t.source = "import");
      for(const p of files){
        if(!list.some((t:any)=>t.path===p)){
          const name = p.split(/[/\\]/).pop() || "Unknown";
          const ext = name.split(".").pop()?.toUpperCase() || "MP3";
          list.push({ id: p, title: name.replace(/\.[^/.]+$/,""), artist:"Unknown", album:"Imported", genre:"Unknown", year:new Date().getFullYear(), duration:180, path:p, codec:ext, specs:ext+" · Stereo", replayGain:0 });
        }
      }
      lib.addTracks(list, true);
      lib.addToCurrentPlaylist(list);
      list.forEach(t=> player?.queue.push(t));
      busEmit("melo:play-tracks", { tracks: list, index: 0 });
      showToast(`${list.length} file(s) added to library & "${(window as any).LumiLibrary?.currentPlaylistName?.() || "playlist"}`);
    }catch{ showToast("Add files requires the desktop build"); }
    appMenu?.classList.remove("open");
    return;
  }
  // Web fallback
  const input = document.createElement("input");
  input.type="file"; input.multiple=true; input.accept="audio/*,.mp3,.flac,.wav,.aac,.ogg,.m4a,.alac,.opus";
  input.onchange = async ()=>{
    const files = Array.from(input.files||[]);
    if(!files.length) return;
    const list: any[] = [];
    for(const file of files){
      const url = URL.createObjectURL(file);
      const id = Math.random().toString(36).slice(2);
      const ext = file.name.split(".").pop()?.toUpperCase() || "MP3";
      const track: any = { id, title: file.name.replace(/\.[^/.]+$/,""), artist:"Unknown", album:"Imported", genre:"Unknown", year:new Date().getFullYear(), duration:180, path:url, codec:ext, specs:"Imported · Stereo", replayGain:0, source:"import" };
      await withCover(file, track);
      const a = new Audio(url);
      await new Promise(res=>{ a.addEventListener("loadedmetadata", ()=>{ track.duration = Math.floor(a.duration)||180; res(null)}, {once:true}); a.load(); setTimeout(()=>res(null),1200); });
      list.push(track);
    }
    lib.addTracks(list);
    lib.addToCurrentPlaylist(list);
    list.forEach(t=> player?.queue.push(t));
    busEmit("melo:play-tracks", { tracks: list, index: 0 });
    showToast(`${list.length} file(s) added`);
  };
  input.click();
  appMenu?.classList.remove("open");
}
async function addFolderViaDialog(){
  const lib = (window as any).LumiLibrary;
  const player = (window as any).LumiPlayer;
  if((window as any).__TAURI__){
    try{
      const { open } = await import("@tauri-apps/plugin-dialog");
      const selected = await open({ directory:true, multiple:false }) as string | null;
      if(!selected) return;
      showToast("Scanning folder…");
      const list: any[] = await lib.importPaths([selected]);
      list.forEach(t=> t.source = "import");
      lib.addTracks(list, true);
      lib.addToCurrentPlaylist(list);
      list.forEach(t=> player?.queue.push(t));
      busEmit("melo:play-tracks", { tracks: list, index: 0 });
      showToast(`${list.length} track(s) added from folder`);
    }catch{ showToast("Add folder requires the desktop build"); }
    appMenu?.classList.remove("open");
    return;
  }
  // Web fallback: webkitdirectory
  const input = document.createElement("input");
  input.type="file"; (input as any).webkitdirectory = true; input.multiple=true; input.accept="audio/*";
  input.onchange = async ()=>{
    const files = Array.from(input.files||[]).filter(f=>f.type.startsWith("audio/") || /\.(mp3|flac|wav|aac|ogg|m4a|alac)$/i.test(f.name));
    if(!files.length) return showToast("No files found");
    const list: any[] = [];
    for(const file of files){
      const url = URL.createObjectURL(file);
      const id = Math.random().toString(36).slice(2);
      const ext = file.name.split(".").pop()?.toUpperCase() || "MP3";
      const track: any = { id, title: file.name.replace(/\.[^/.]+$/,""), artist:"Imported", album: (file as any).webkitRelativePath.split("/")[0] || "Folder", genre:"Unknown", year:new Date().getFullYear(), duration:180, path:url, codec:ext, specs:"Folder · Stereo", source:"import" };
      await withCover(file, track);
      const a = new Audio(url);
      await new Promise(res=>{ a.addEventListener("loadedmetadata", ()=>{ track.duration = Math.floor(a.duration)||180; res(null)}, {once:true}); a.load(); setTimeout(()=>res(null),800); });
      list.push(track);
    }
    lib.addTracks(list);
    lib.addToCurrentPlaylist(list);
    list.forEach(t=> player?.queue.push(t));
    busEmit("melo:play-tracks", { tracks: list, index: 0 });
    showToast(`${list.length} file(s) added from folder`);
  };
  input.click();
  appMenu?.classList.remove("open");
}
document.getElementById("btnAddFiles")?.addEventListener("click", addFilesViaDialog);
document.getElementById("btnAddFolder")?.addEventListener("click", addFolderViaDialog);
document.getElementById("btnThemeToggle")?.addEventListener("click", ()=>{
  applyTheme(theme === "light" ? "dark" : "light");
});
// Ctrl+O / Ctrl+Shift+O shortcuts
window.addEventListener("keydown", (e: KeyboardEvent)=>{
  if((e.ctrlKey || e.metaKey) && e.key.toLowerCase()==="o"){
    if(e.shiftKey){ e.preventDefault(); addFolderViaDialog(); }
    else { e.preventDefault(); addFilesViaDialog(); }
  }
});

// Settings extra handlers
document.getElementById("setCrossfade")?.addEventListener("input", (e)=>{
  const v = (e.target as HTMLInputElement).value;
  document.getElementById("crossfadeVal")!.textContent = v+"s";
});
// === Settings tabs (General / Playback / Library / ...) ===
function activateSettingsTab(name: string){
  document.querySelectorAll(".settings-tab").forEach(t=>{
    (t as HTMLElement).classList.toggle("active", (t as HTMLElement).dataset.stab===name);
  });
  document.querySelectorAll(".settings-section[data-panel]").forEach(s=>{
    (s as HTMLElement).classList.toggle("active", (s as HTMLElement).dataset.panel===name);
  });
  localStorage.setItem("melo-settings-tab", name);
}
document.querySelectorAll(".settings-tab").forEach(t=>{
  (t as HTMLElement).addEventListener("click", ()=> activateSettingsTab((t as HTMLElement).dataset.stab!));
});
activateSettingsTab(localStorage.getItem("melo-settings-tab") || "general");
document.querySelectorAll(".switch").forEach(sw=>{
  sw.addEventListener("click", ()=>{ sw.classList.toggle("on"); showToast(sw.classList.contains("on") ? "Enabled" : "Disabled"); });
});
// === Show Stop button (Settings > Appearance) ===
const swStopBtn = document.getElementById("swStopBtn");
function applyStopVisibility(){
  const on = localStorage.getItem("lumiv2-showStop")==="1";
  if(swStopBtn) swStopBtn.classList.toggle("on", on);
  const b = document.getElementById("btnStop");
  if(b) b.style.display = on ? "" : "none";
}
swStopBtn?.addEventListener("click", ()=>{
  // the generic switch handler already toggled the class; persist the new state
  const on = swStopBtn.classList.contains("on");
  localStorage.setItem("lumiv2-showStop", on ? "1" : "0");
  applyStopVisibility();
  showToast(on ? "Stop button shown" : "Stop button hidden");
});
applyStopVisibility();
document.getElementById("btn-settings-reset")?.addEventListener("click", ()=>{
  localStorage.clear(); showToast("Settings reset — refresh the page"); 
});
document.getElementById("btnChooseFolder")?.addEventListener("click", async ()=>{
  if((window as any).__TAURI__){
    const {open} = await import("@tauri-apps/plugin-dialog");
    const sel = await open({directory:true});
    if(sel) (document.getElementById("setMusicFolder") as HTMLInputElement).value = sel as string;
  } else {
    showToast("Folder selection requires the Tauri build");
  }
});

// Window controls mock (Tauri)
function bindWinControls(){
  document.querySelectorAll(".win-btn").forEach(btn=>{
    (btn as HTMLElement).onclick = async ()=>{
      const label = btn.getAttribute("aria-label");
      if((window as any).__TAURI__){
        const { getCurrentWindow } = await import("@tauri-apps/api/window");
        const w = getCurrentWindow();
        if(label==="minimize") w.minimize();
        else if(label==="maximize") w.toggleMaximize();
        else if(label==="close") w.close();
      } else {
        if(label==="close") showToast("Closing the window requires the Tauri build");
        if(label==="maximize") showToast("Resize — drag the corner");
      }
    };
  });
}
bindWinControls();

// Rebind for full HTML skins - called from skin.ts after replacing playerCard
(window as any).__LUMI_REBIND_MAIN__ = ()=>{
  const nb = document.getElementById("appMenuBtn") as HTMLButtonElement | null;
  const nm = document.getElementById("appMenu") as HTMLElement | null;
  if(nb && nm){
    appMenuBtn = nb;
    appMenu = nm;
    nb.onclick = (e: any)=>{ e.stopPropagation(); nm.classList.toggle("open"); nb.classList.toggle("open", nm.classList.contains("open")); };
  }
  bindWinControls();
  Object.entries(toggleMap).forEach(([btnId, winId])=>{
    const b = document.getElementById(btnId);
    if(b){
      (b as HTMLElement).onclick = ()=> toggleWin(winId);
    }
  });
};

// background scan progress bar (non-blocking) + incremental file ingestion
const scanBar = document.createElement("div");
scanBar.id = "scanBar";
document.body.appendChild(scanBar);
let scanHideTimer: any = 0;
busOn("melo:scan-progress", (p: any)=>{
  if(!p) return;
  const pct = p.total ? Math.round((p.done / p.total) * 100) : 100;
  scanBar.style.opacity = "1";
  scanBar.style.width = pct + "%";
  clearTimeout(scanHideTimer);
  if (p.finished || (p.total && p.done >= p.total)) {
    scanHideTimer = setTimeout(()=>{ scanBar.style.opacity = "0"; scanBar.style.width = "0"; }, 800);
  }
});
if (isTauri && !urlPanel) {
  // the main window ingests scan batches and shares them with the other windows
  busOn("melo:scan-batch", (list: any)=>{
    const lib = (window as any).LumiLibrary;
    if (lib && Array.isArray(list) && list.length) {
      list.forEach((t: any) => t.source = "scan");
      lib.addTracks(list, true);
      lib.addToCurrentPlaylist(list);
    }
  });
}

// ----- About popup (version + link + runtime diagnostics) -----
const aboutPop = document.createElement("div");
aboutPop.id = "aboutPop";
aboutPop.style.display = "none";
document.body.appendChild(aboutPop);
document.getElementById("btnAbout")?.addEventListener("click", (e)=>{
  e.stopPropagation();
  aboutPop.innerHTML = `
    <div class="about-head">Melo <b>0.1 Beta</b></div>
    <a class="about-link" id="aboutLink" href="https://github.com/Arvanta/Melo" rel="noopener">github.com/Arvanta/Melo</a>`;
  aboutPop.style.display = aboutPop.style.display === "none" ? "block" : "none";
  document.getElementById("aboutLink")?.addEventListener("click", (ev)=>{
    ev.preventDefault();
    const url = "https://github.com/Arvanta/Melo";
    if (isTauri) {
      import("@tauri-apps/api/core").then((m: any)=> m.invoke("open_url", { url })).catch(()=> window.open(url, "_blank"));
    } else {
      window.open(url, "_blank");
    }
  });
});
document.addEventListener("click", (e)=>{ if(!(e.target as HTMLElement).closest("#aboutPop") && !(e.target as HTMLElement).closest("#btnAbout")) aboutPop.style.display="none"; });


showToast("Melo is ready");
