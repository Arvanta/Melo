import type { Track, Playlist } from "./types";
import { withCover } from "./cover";
import { busEmit, busOn } from "./bus";

const isTauriEnv = !!(window as any).__TAURI__;
// window role derived from the URL: main player window or one of the panels
const myRole: string = new URLSearchParams(location.search).get("panel") || "main";

let tracks: Track[] = [];
let playlists: Playlist[] = [];
// restore playlists shared across all windows of this app
try {
  const saved = localStorage.getItem("melo-playlists");
  if (saved) { const p = JSON.parse(saved); if (Array.isArray(p) && p.length) playlists = p; }
} catch {}
if (!playlists.length) {
  playlists = [{ id: "p1", name: "Favorites", tracks: [], createdAt: Date.now() }];
}
// restore the library itself (tracks survive closing a window / restarting the app)
try {
  const savedTracks = localStorage.getItem("melo-tracks");
  if (savedTracks) { const t = JSON.parse(savedTracks); if (Array.isArray(t)) tracks = t; }
} catch {}

export function setupLibrary(audio: HTMLAudioElement, toast: (m:string)=>void){
  const trackListEl = document.getElementById("trackList") as HTMLElement;
  const playlistListEl = document.getElementById("playlistList") as HTMLElement;
  const winPlaylistTracks = document.getElementById("winPlaylistTracks") as HTMLElement | null;
  const winPlaylistEmpty = document.getElementById("winPlaylistEmpty") as HTMLElement | null;
  const playlistSelect = document.getElementById("playlistSelect") as HTMLSelectElement | null;
  const searchInput = document.getElementById("searchInput") as HTMLInputElement;
  const libraryStats = document.getElementById("libraryStats") as HTMLElement;
  const btnScan = document.getElementById("btn-scan") as HTMLButtonElement;
  const btnExport = document.getElementById("btn-export-playlist") as HTMLButtonElement;
  const btnNewPlaylist = document.getElementById("btn-new-playlist") as HTMLButtonElement;
  const queueListEl = document.getElementById("queueList") as HTMLElement;
  const tagEditor = document.getElementById("tagEditor") as HTMLElement;

  // Tag inputs
  const tagTitle = document.getElementById("tagTitle") as HTMLInputElement;
  const tagArtist = document.getElementById("tagArtist") as HTMLInputElement;
  const tagAlbum = document.getElementById("tagAlbum") as HTMLInputElement;
  const tagYear = document.getElementById("tagYear") as HTMLInputElement;
  const tagCover = document.getElementById("tagCover") as HTMLInputElement;

  let filter: "all"|"artist"|"album"|"genre" = "all";
  let tab: "tracks"|"playlists"|"recent" = "tracks";
  let search = "";
  let currentPlaylistId: string = localStorage.getItem("melo-currentPlaylist") || playlists[0]?.id || "";

  // ----- library browsing state (Artists / Albums / Genres) -----
  let libTab: "artists"|"albums"|"genres" = "artists";
  let selArtist: string | null = null;
  let selAlbum: string | null = null;    // album chosen inside an artist
  let selAlbumKey: string | null = null; // "artist\x00album" in Albums tab
  let selGenre: string | null = null;
  let viewList: Track[] = [];            // tracks currently shown (used for playback)

  document.getElementById("libraryTabs")?.querySelectorAll(".tab").forEach(t=>{
    t.addEventListener("click", ()=>{
      document.querySelectorAll("#libraryTabs .tab").forEach(x=>x.classList.remove("active"));
      t.classList.add("active");
      libTab = (t as HTMLElement).dataset.libtab as any;
      selArtist = selAlbum = selAlbumKey = selGenre = null;
      render();
    });
  });

  searchInput?.addEventListener("input", ()=>{ search = searchInput.value.toLowerCase(); render(); });

  // initial paint (must run after the browsing-state declarations above)
  render();
  renderQueue();

  btnScan?.addEventListener("click", async ()=>{
    if((window as any).__TAURI__){
      try{
        const { open } = await import("@tauri-apps/plugin-dialog");
        const selected = await open({ directory:true, multiple:false });
        if(selected){
          toast("Scanning folder in the background…");
          // Call Rust command to scan (batches stream in via events; the final
          // list is merged with dedup as a safety net)
          const { invoke } = await import("@tauri-apps/api/core");
          const scanned: Track[] = await invoke("scan_library", { path: selected });
          scanned.forEach(t=> (t as any).source = "scan");
          addTracks(scanned, true);
          addToCurrentPlaylist(scanned);
          render();
        }
      } catch(e){ toast("Scanning requires the Tauri build"); }
    } else {
      // Browser fallback: file input
      const input = document.createElement("input");
      input.type="file"; input.multiple=true; input.accept="audio/*";
      input.onchange = async ()=>{
        const files = Array.from(input.files||[]);
        for(const file of files){
          const url = URL.createObjectURL(file);
          const id = Math.random().toString(36).slice(2);
          const ext = file.name.split(".").pop()?.toUpperCase() || "MP3";
          const t: Track = {
            id, title: file.name.replace(/\.[^/.]+$/,""), artist:"Unknown", album:"Imported",
            genre:"Unknown", year: new Date().getFullYear(),
            duration: 180, path:url, codec: ext, specs:"Imported · Stereo",
            replayGain: 0
          };
          // try to read duration
          const a = new Audio(url);
          await new Promise(res=>{ a.addEventListener("loadedmetadata", ()=>{ t.duration = Math.floor(a.duration)||180; res(null)}, {once:true}); a.load(); setTimeout(()=>res(null),1500); });
          // try to extract embedded cover
          await withCover(file, t as any);
          tracks.push(t);
        }
        toast(`${files.length} file(s) added`);
        render(); renderQueue();
      };
      input.click();
    }
  });

  // Drag & Drop
  document.addEventListener("dragover", e=>{ e.preventDefault(); });
  document.addEventListener("drop", async e=>{
    e.preventDefault();
    const files = Array.from(e.dataTransfer?.files||[]).filter(f=>f.type.startsWith("audio/") || /\.(mp3|flac|wav|ogg|aac|m4a|alac)$/i.test(f.name));
    if(!files.length) return;
    const list0: Track[] = [];
    for(const file of files){
      const url = URL.createObjectURL(file);
      const id = Math.random().toString(36).slice(2);
      const ext = file.name.split(".").pop()?.toUpperCase() || "MP3";
      const t: Track = { id, title: file.name.replace(/\.[^/.]+$/,""), artist:"Imported", album:"Drop", genre:"Unknown", year: new Date().getFullYear(), duration: 200, path:url, codec:ext, specs:"Drag & Drop" } as any;
      await withCover(file, t as any);
      // try duration
      const a2 = new Audio(url);
      await new Promise(res=>{ a2.addEventListener("loadedmetadata", ()=>{ (t as any).duration = Math.floor(a2.duration)||200; res(null)}, {once:true}); a2.load(); setTimeout(()=>res(null),800); });
      tracks.push(t as any);
    }
    toast(`${files.length} File added via drag & drop`);
    render();
  });

  // === current playlist + cross-window sync ===
  function currentPlaylist(): Playlist | undefined {
    return playlists.find(p=>p.id===currentPlaylistId) || playlists[0];
  }
  function savePlaylists(){
    localStorage.setItem("melo-rev", String(Date.now()));
    localStorage.setItem("melo-playlists", JSON.stringify(playlists));
  }
  function broadcastPlaylists(){
    if (isTauriEnv) busEmit("melo:playlists-sync", { src: myRole, playlists });
  }
  function setCurrentPlaylist(id: string){
    currentPlaylistId = id;
    localStorage.setItem("melo-currentPlaylist", id);
    renderPlaylistWindow();
  }
  busOn("melo:playlists-sync", (p: any)=>{
    if (p && p.src !== myRole && Array.isArray(p.playlists)) {
      playlists = p.playlists;
      renderPlaylistWindow();
      render();
    }
  });

  /** persist the library; if the quota is exceeded, retry without covers */
  function saveTracks(){
    localStorage.setItem("melo-rev", String(Date.now()));
    try { localStorage.setItem("melo-tracks", JSON.stringify(tracks)); }
    catch {
      try {
        localStorage.setItem("melo-tracks", JSON.stringify(tracks.map(({ cover, ...rest }) => rest)));
      } catch {}
    }
  }

  /** add tracks locally (+ optionally broadcast to the other windows) */
  function addTracks(list: Track[], broadcast = false){
    let changed = false;
    list.forEach(t=>{ if(!tracks.some(x=>x.id===t.id)){ tracks.push(t); changed = true; } });
    if (changed) { saveTracks(); render(); renderPlaylistWindow(); }
    if (broadcast && isTauriEnv) busEmit("melo:tracks-add", { src: myRole, list });
  }
  busOn("melo:tracks-add", (p: any)=>{
    if (p && p.src !== myRole && Array.isArray(p.list)) addTracks(p.list);
  });

  /** append tracks to the current playlist (and tell the other windows) */
  function addToCurrentPlaylist(list: Track[]){
    const pl = currentPlaylist();
    if (!pl) return;
    let changed = false;
    list.forEach(t=>{ if(!pl.tracks.includes(t.id)){ pl.tracks.push(t.id); changed = true; } });
    if (changed) { savePlaylists(); broadcastPlaylists(); renderPlaylistWindow(); render(); }
  }

  /** read full metadata + cover natively (Rust/lofty) for dropped/selected paths */
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

  // Native OS drag & drop (Tauri): dropping files anywhere in this window
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
          if (myRole === "main") {
            addToCurrentPlaylist(list);
            busEmit("melo:play-tracks", { tracks: list, index: 0 });
          } else if (myRole === "playlist") {
            addToCurrentPlaylist(list);
            toast(`Added ${list.length} track(s) to "${currentPlaylist()?.name}"`);
          } else {
            toast(`Added ${list.length} file(s) to library`);
          }
        }
      });
    }).catch(() => {});

    import("@tauri-apps/api/event").then(({ listen }) => {
      listen("tauri://drag-drop", async (e: any) => {
        const paths: string[] = e?.payload?.paths || [];
        if (!paths.length) return;
        const list = await importPaths(paths);
        if (!list.length) return;
        list.forEach(t=> (t as any).source = "import");
        addTracks(list, true);
        if (myRole === "main") {
          addToCurrentPlaylist(list);
          busEmit("melo:play-tracks", { tracks: list, index: 0 });
        } else if (myRole === "playlist") {
          addToCurrentPlaylist(list);
          toast(`Added ${list.length} track(s) to "${currentPlaylist()?.name}"`);
        } else {
          toast(`Added ${list.length} file(s) to the library`);
        }
      });
    }).catch(() => {});
  }
  function fmtDur(d:number){ return `${Math.floor(d/60)}:${String(Math.floor(d%60)).padStart(2,"0")}`; }
  function isAudioFile(f: File){ return f.type.startsWith("audio/") || /\.(mp3|flac|wav|ogg|aac|m4a|alac|opus)$/i.test(f.name); }

  // import a dropped File into a Track (library-friendly)
  async function fileToTrack(file: File): Promise<Track>{
    const nativePath = (file as any).path;
    if (nativePath && isTauriEnv) {
      const scanned = await importPaths([nativePath]);
      if (scanned.length) {
        (scanned[0] as any).source = "import";
        return scanned[0];
      }
    }
    const url = nativePath || URL.createObjectURL(file);
    const id = nativePath || Math.random().toString(36).slice(2);
    const ext = file.name.split(".").pop()?.toUpperCase() || "MP3";
    const stem = file.name.replace(/\.[^/.]+$/,"");
    const t: Track = {
      id, title: stem, artist:"Unknown Artist", album:"Single",
      genre:"Unknown", year: new Date().getFullYear(), duration: 180, path: url,
      codec: ext, specs:"Local File", replayGain: 0, source: "import"
    } as any;
    try {
      const a = new Audio(URL.createObjectURL(file));
      await new Promise(res=>{ a.addEventListener("loadedmetadata", ()=>{ (t as any).duration = Math.floor(a.duration)||180; res(null); }, {once:true}); a.load(); setTimeout(()=>res(null), 800); });
    } catch {}
    await withCover(file, t as any);
    return t;
  }

  let playlistSearchQuery = "";

  // render only the song list of the current playlist into the playlist window
  function renderPlaylistWindow(){
    if(!winPlaylistTracks) return;
    const pl = currentPlaylist();
    if(playlistSelect){
      playlistSelect.innerHTML = playlists.map(p=>`<option value="${p.id}" ${pl && p.id===pl.id ? "selected":""}>${p.name}</option>`).join("");
    }
    if(!pl){
      winPlaylistTracks.innerHTML = "";
      winPlaylistTracks.style.display = "none";
      if(winPlaylistEmpty) winPlaylistEmpty.style.display = "block";
      return;
    }

    let allList = pl.tracks.map(tid=> tracks.find(t=>t.id===tid)).filter(Boolean) as Track[];
    let list = allList;
    if(playlistSearchQuery.trim()){
      const q = playlistSearchQuery.toLowerCase().trim();
      list = allList.filter(t=> t.title.toLowerCase().includes(q) || t.artist.toLowerCase().includes(q) || t.album.toLowerCase().includes(q));
    }

    if(winPlaylistEmpty) winPlaylistEmpty.style.display = allList.length ? "none" : "block";
    winPlaylistTracks.style.display = allList.length ? "flex" : "none";

    if(!list.length && allList.length){
      winPlaylistTracks.innerHTML = `<div style="padding:16px;text-align:center;color:var(--text-muted);font-size:11px;">No tracks match "${playlistSearchQuery}"</div>`;
      return;
    }

    winPlaylistTracks.innerHTML = list.map((t, i)=>{
      const originalIndex = pl.tracks.indexOf(t.id);
      return `
      <div class="track-row" draggable="true" data-id="${t.id}" data-pl-idx="${originalIndex >= 0 ? originalIndex : i}">
        <span class="num">${i+1}</span>
        ${t.cover ? `<img class="track-cover-mini" src="${t.cover}" onerror="this.style.display='none'"/>` : `<div class="track-cover-mini cover-default">♪</div>`}
        <div style="flex:1;min-width:0;">
          <div class="t-title">${t.title}</div>
          <div class="t-artist">${t.artist} • ${t.album}</div>
        </div>
        <span class="t-dur">${fmtDur(t.duration)}</span>
        <button class="btn small ghost" data-action="pl-remove" data-idx="${originalIndex >= 0 ? originalIndex : i}" title="Remove from playlist">×</button>
      </div>
    `;}).join("");

    let draggedPlIdx: number | null = null;

    winPlaylistTracks.querySelectorAll(".track-row").forEach(el=>{
      const row = el as HTMLElement;
      row.addEventListener("dragstart", (e:any)=>{
        draggedPlIdx = parseInt(row.dataset.plIdx!);
        e.dataTransfer.setData("application/x-melo-ids", row.dataset.id!);
        e.dataTransfer.setData("application/x-melo-pl-idx", String(draggedPlIdx));
        e.dataTransfer.effectAllowed = "move";
        row.style.opacity = "0.4";
      });

      row.addEventListener("dragend", ()=>{
        row.style.opacity = "1";
        draggedPlIdx = null;
        winPlaylistTracks?.querySelectorAll(".track-row").forEach(r=> r.classList.remove("drag-over-target"));
      });

      row.addEventListener("dragover", (e)=>{
        e.preventDefault();
        e.stopPropagation();
        row.classList.add("drag-over-target");
      });

      row.addEventListener("dragleave", ()=>{
        row.classList.remove("drag-over-target");
      });

      row.addEventListener("drop", (e:any)=>{
        e.preventDefault();
        e.stopPropagation();
        row.classList.remove("drag-over-target");
        const targetPlIdx = parseInt(row.dataset.plIdx!);
        const sourceIdxStr = e.dataTransfer?.getData("application/x-melo-pl-idx");

        if(sourceIdxStr !== undefined && sourceIdxStr !== "" && !isNaN(parseInt(sourceIdxStr))){
          const fromIdx = parseInt(sourceIdxStr);
          if(fromIdx !== targetPlIdx && fromIdx >= 0 && targetPlIdx >= 0 && fromIdx < pl.tracks.length && targetPlIdx < pl.tracks.length){
            const movedId = pl.tracks.splice(fromIdx, 1)[0];
            pl.tracks.splice(targetPlIdx, 0, movedId);
            savePlaylists(); broadcastPlaylists();
            renderPlaylistWindow(); render();
            toast("Track reordered in playlist");
            return;
          }
        }
      });

      row.addEventListener("click", (e)=>{
        const target = e.target as HTMLElement;
        if(target.closest("[data-action='pl-remove']")){
          const idx = parseInt((target.closest("[data-action='pl-remove']") as HTMLElement).dataset.idx!);
          pl.tracks.splice(idx, 1);
          savePlaylists(); broadcastPlaylists();
          renderPlaylistWindow(); render();
          return;
        }
        const clickedId = row.dataset.id!;
        const playIdx = list.findIndex(t=> t.id === clickedId);
        busEmit("melo:play-tracks", { tracks: list, index: playIdx >= 0 ? playIdx : 0 });
      });
    });
  }

  // Playlist search and sort controls
  const playlistSearch = document.getElementById("playlistSearchInput") as HTMLInputElement | null;
  if(playlistSearch){
    playlistSearch.addEventListener("input", ()=>{
      playlistSearchQuery = playlistSearch.value;
      renderPlaylistWindow();
    });
  }

  const playlistSort = document.getElementById("playlistSortSelect") as HTMLSelectElement | null;
  if(playlistSort){
    playlistSort.addEventListener("change", ()=>{
      const pl = currentPlaylist();
      if(!pl || !pl.tracks.length) return;
      const order = playlistSort.value;
      const plTracks = pl.tracks.map(tid=> tracks.find(t=>t.id===tid)).filter(Boolean) as Track[];

      if(order === "title-asc") plTracks.sort((a,b)=> a.title.localeCompare(b.title));
      else if(order === "artist-asc") plTracks.sort((a,b)=> a.artist.localeCompare(b.artist));
      else if(order === "album-asc") plTracks.sort((a,b)=> a.album.localeCompare(b.album));
      else if(order === "dur-asc") plTracks.sort((a,b)=> a.duration - b.duration);
      else if(order === "dur-desc") plTracks.sort((a,b)=> b.duration - a.duration);

      pl.tracks = plTracks.map(t=> t.id);
      savePlaylists(); broadcastPlaylists();
      renderPlaylistWindow();
      toast(`Playlist sorted by ${playlistSort.options[playlistSort.selectedIndex].text}`);
    });
  }

  playlistSelect?.addEventListener("change", ()=> setCurrentPlaylist(playlistSelect.value));

  btnExport?.addEventListener("click", ()=>{
    const pl = currentPlaylist();
    if(!pl) return toast("No playlist available");
    const list = pl.tracks.map(tid=> tracks.find(t=>t.id===tid)).filter(Boolean) as Track[];
    if(!list.length) return toast("Current list is empty");
    let m3u = "#EXTM3U\n";
    list.forEach(t=>{ m3u += `#EXTINF:${Math.floor(t.duration)},${t.artist} - ${t.title}\n${t.path}\n`; });
    const blob = new Blob([m3u], {type:"audio/x-mpegurl"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href=url; a.download=`${pl.name}.m3u`; a.click();
    URL.revokeObjectURL(url);
    toast(`M3U exported for "${pl.name}"`);
  });

  btnNewPlaylist?.addEventListener("click", ()=>{
    const name = prompt("New playlist name:");
    if(!name) return;
    const id = Math.random().toString(36).slice(2,8);
    playlists.push({ id, name, tracks: [], createdAt: Date.now() });
    setCurrentPlaylist(id);
    savePlaylists(); broadcastPlaylists();
    render();
    toast(`Playlist "${name}" created`);
  });

  // === Drag & Drop onto the playlist window: add songs to the current playlist ===
  if(winPlaylistTracks){
    const zone = winPlaylistTracks.parentElement!; // float-body
    ["dragover","dragenter"].forEach(ev=> zone.addEventListener(ev, (e)=>{
      e.preventDefault(); e.stopPropagation();
      winPlaylistTracks.classList.add("drag-over");
    }));
    zone.addEventListener("dragleave", (e)=>{
      if(!zone.contains(e.relatedTarget as Node)) winPlaylistTracks.classList.remove("drag-over");
    });
    zone.addEventListener("drop", async (e)=>{
      e.preventDefault(); e.stopPropagation();
      winPlaylistTracks.classList.remove("drag-over");
      const pl = currentPlaylist();
      if(!pl) return toast("Create a playlist first (+ New)");
      const ids = (e.dataTransfer?.getData("application/x-melo-ids")||"").split(",").filter(Boolean);
      let added = 0;
      if(ids.length){
        ids.forEach(id=>{ if(!pl.tracks.includes(id)){ pl.tracks.push(id); added++; } });
      } else {
        const files = Array.from(e.dataTransfer?.files||[]).filter(isAudioFile);
        for(const f of files){
          const t = await fileToTrack(f);
          tracks.push(t);
          if(!pl.tracks.includes(t.id)){ pl.tracks.push(t.id); added++; }
        }
      }
      if(added) toast(`${added} track(s) added to "${pl.name}"`);
      saveTracks(); savePlaylists(); broadcastPlaylists();
      render(); renderPlaylistWindow();
    });
  }

  // === Drag & Drop onto the player card: start playing immediately ===
  const playerCard = document.getElementById("playerCard");
  if(playerCard){
    ["dragover","dragenter"].forEach(ev=> playerCard.addEventListener(ev, (e)=>{
      e.preventDefault(); e.stopPropagation();
      playerCard.classList.add("drag-over");
    }));
    playerCard.addEventListener("dragleave", (e)=>{
      if(!playerCard.contains(e.relatedTarget as Node)) playerCard.classList.remove("drag-over");
    });
    playerCard.addEventListener("drop", async (e)=>{
      e.preventDefault(); e.stopPropagation();
      playerCard.classList.remove("drag-over");
      const lumi = (window as any).LumiPlayer;
      const ids = (e.dataTransfer?.getData("application/x-melo-ids")||"").split(",").filter(Boolean);
      let list: Track[] = [];
      if(ids.length){
        list = ids.map(id=> tracks.find(t=>t.id===id)).filter(Boolean) as Track[];
        if(lumi && list.length) toast(`Playback ${list.length} track(s)`);
      } else {
        const files = Array.from(e.dataTransfer?.files||[]).filter(isAudioFile);
        const pl = currentPlaylist();
        let addedToPlaylist = false;
        for(const f of files){
          const t = await fileToTrack(f);
          tracks.push(t); list.push(t);
          if(pl && !pl.tracks.includes(t.id)){ pl.tracks.push(t.id); addedToPlaylist = true; }
        }
        if(files.length){
          saveTracks(); savePlaylists(); broadcastPlaylists();
          render(); renderPlaylistWindow();
        }
        if(lumi && list.length){
          toast(addedToPlaylist && pl ? `Playback ${list.length} track(s) + added to "${pl.name}"` : `Playback ${list.length} track(s)`);
        }
      }
      if(!list.length) return;
      busEmit("melo:play-tracks", { tracks: list, index: 0 });
    });
  }

  let editingTrack: Track | null = null;
  function openTagEditor(track: Track | null){
    editingTrack = track;
    if(!editingTrack) return toast("No track to edit");
    tagEditor.style.display = "flex";
    tagTitle.value = editingTrack.title;
    tagArtist.value = editingTrack.artist;
    tagAlbum.value = editingTrack.album;
    tagYear.value = String(editingTrack.year);
  }

  // ----- remove items from the library (synced across windows) -----
  function removeFromLibrary(pred: (t: Track)=>boolean){
    const removed = tracks.filter(pred).map(t=>t.id);
    if(!removed.length) return;
    tracks = tracks.filter(t=>!pred(t));
    playlists.forEach(p=>{ p.tracks = p.tracks.filter(id=>!removed.includes(id)); });
    saveTracks(); savePlaylists(); broadcastPlaylists();
    if (isTauriEnv) busEmit("melo:tracks-remove", { src: myRole, ids: removed });
    render(); renderPlaylistWindow();
  }
  busOn("melo:tracks-remove", (p: any)=>{
    if (p && p.src !== myRole && Array.isArray(p.ids)) {
      const ids: string[] = p.ids;
      tracks = tracks.filter(t=>!ids.includes(t.id));
      playlists.forEach(pl=>{ pl.tracks = pl.tracks.filter(id=>!ids.includes(id)); });
      render(); renderPlaylistWindow();
    }
  });

  // ----- custom right-click menu (only our items, no browser menu) -----
  const ctxMenu = document.createElement("div");
  ctxMenu.className = "ctx-menu";
  ctxMenu.style.display = "none";
  document.body.appendChild(ctxMenu);
  let ctxTarget: any = null;
  function hideCtx(){ ctxMenu.style.display = "none"; }
  document.addEventListener("click", hideCtx);
  document.addEventListener("keydown", (e)=>{ if(e.key==="Escape") hideCtx(); });
  ctxMenu.addEventListener("click", (e)=>{
    const btn = (e.target as HTMLElement).closest("[data-act]") as HTMLElement | null;
    if(!btn || !ctxTarget) return;
    e.stopPropagation();
    const act = btn.dataset.act;
    if (act === "edit") openTagEditor(ctxTarget.track);
    if (act === "remove") {
      if (ctxTarget.type === "track") removeFromLibrary(t=>t.id===ctxTarget.track.id);
      else if (ctxTarget.type === "artist") removeFromLibrary(t=>t.artist===ctxTarget.name);
      else if (ctxTarget.type === "album") removeFromLibrary(t=>t.artist===ctxTarget.artist && t.album===ctxTarget.album);
      else if (ctxTarget.type === "genre") removeFromLibrary(t=>t.genre===ctxTarget.name);
    }
    hideCtx();
  });
  // ----- playlist right-click: single "Remove from Playlist" menu -----
  const plCtx = document.createElement("div");
  plCtx.className = "ctx-menu";
  plCtx.style.display = "none";
  document.body.appendChild(plCtx);
  let plCtxIdx = -1;
  document.addEventListener("click", ()=>{ plCtx.style.display = "none"; });
  plCtx.addEventListener("click", (e)=>{
    if(!(e.target as HTMLElement).closest("[data-act='plremove']")) return;
    e.stopPropagation();
    const pl = currentPlaylist();
    if (pl && plCtxIdx >= 0 && plCtxIdx < pl.tracks.length) {
      pl.tracks.splice(plCtxIdx, 1);
      savePlaylists(); broadcastPlaylists();
      renderPlaylistWindow(); render();
    }
    plCtx.style.display = "none";
  });

  // ----- right-click routing: playlist menu / library menu / nothing elsewhere -----
  document.addEventListener("contextmenu", (e)=>{
    hideCtx();
    plCtx.style.display = "none";
    const target = e.target as HTMLElement;
    const plRow = target.closest("#winPlaylistTracks .track-row");
    if (plRow) {
      e.preventDefault();
      plCtxIdx = parseInt((plRow as HTMLElement).dataset.plIdx || "-1");
      plCtx.innerHTML = `<button class="ctx-item danger" data-act="plremove">Remove from Playlist</button>`;
      plCtx.style.display = "block";
      const rr = plCtx.getBoundingClientRect();
      plCtx.style.left = Math.max(4, Math.min(e.clientX, window.innerWidth - rr.width - 6)) + "px";
      plCtx.style.top = Math.max(4, Math.min(e.clientY, window.innerHeight - rr.height - 6)) + "px";
      return;
    }
    const inLibrary = myRole === "library" ? true : !!target.closest("#win-library");
    if (!inLibrary) { e.preventDefault(); return; } // no context menu anywhere else
    e.preventDefault();
    const el = target.closest(".track-row, [data-artist], [data-albumkey], [data-genre]");
    if(!el){ hideCtx(); return; }
    if (el.classList.contains("track-row")) {
      const t = viewList[parseInt((el as HTMLElement).dataset.viewIdx!)];
      if(!t){ hideCtx(); return; }
      ctxTarget = { type: "track", track: t };
      ctxMenu.innerHTML = `<button class="ctx-item" data-act="edit">Edit tags</button><button class="ctx-item danger" data-act="remove">Remove track from library</button>`;
    } else if ((el as HTMLElement).dataset.artist) {
      ctxTarget = { type: "artist", name: (el as HTMLElement).dataset.artist };
      ctxMenu.innerHTML = `<button class="ctx-item danger" data-act="remove">Remove artist from library</button>`;
    } else if ((el as HTMLElement).dataset.albumkey) {
      const [a, al] = ((el as HTMLElement).dataset.albumkey || "").split("\x00");
      ctxTarget = { type: "album", artist: a, album: al };
      ctxMenu.innerHTML = `<button class="ctx-item danger" data-act="remove">Remove album from library</button>`;
    } else {
      ctxTarget = { type: "genre", name: (el as HTMLElement).dataset.genre };
      ctxMenu.innerHTML = `<button class="ctx-item danger" data-act="remove">Remove genre from library</button>`;
    }
    ctxMenu.style.display = "block";
    const r = ctxMenu.getBoundingClientRect();
    ctxMenu.style.left = Math.max(4, Math.min(e.clientX, window.innerWidth - r.width - 6)) + "px";
    ctxMenu.style.top = Math.max(4, Math.min(e.clientY, window.innerHeight - r.height - 6)) + "px";
  });
  document.getElementById("btn-tag-cancel")?.addEventListener("click", ()=> tagEditor.style.display="none");
  document.getElementById("btn-tag-save")?.addEventListener("click", async ()=>{
    if(!editingTrack) return;
    editingTrack.title = tagTitle.value;
    editingTrack.artist = tagArtist.value;
    editingTrack.album = tagAlbum.value;
    editingTrack.year = parseInt(tagYear.value)||editingTrack.year;
    if(tagCover.files && tagCover.files[0]){
      const file = tagCover.files[0];
      const url = URL.createObjectURL(file);
      // also convert to dataURL for persistence preview
      const reader = new FileReader();
      reader.onload = ()=>{
        editingTrack!.cover = reader.result as string;
        render(); renderQueue();
        busEmit("melo:tag-updated", editingTrack);
      };
      reader.readAsDataURL(file);
      // fallback object url
      editingTrack.cover = url;
    }
    // If Tauri, invoke Rust tag writer
    if((window as any).__TAURI__){
      try{
        const { invoke } = await import("@tauri-apps/api/core");
        await invoke("write_tags", { path: editingTrack.path, tags: { title: editingTrack.title, artist: editingTrack.artist, album: editingTrack.album } });
      } catch {}
    }
    tagEditor.style.display="none";
    saveTracks();
    render(); renderQueue();
    busEmit("melo:tag-updated", editingTrack);
    toast("Metadata saved");
  });

  function esc(x: any): string {
    return String(x ?? "").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
  }
  /** only scanned folders belong to the library */
  function libraryTracks(): Track[] { return tracks.filter(t => (t as any).source === "scan"); }

  function trackRows(list: Track[]): string {
    viewList = list;
    if(!list.length) return `<div style="padding:30px;text-align:center;color:var(--text-muted);">Nothing here yet.<br/><span style="font-size:12px;">Use "Scan Folder" to build your library</span></div>`;
    return list.map((t, i)=>{
      const dur = `${Math.floor(t.duration/60)}:${String(Math.floor(t.duration%60)).padStart(2,"0")}`;
      return `
      <div class="track-row" draggable="true" data-view-idx="${i}" data-id="${esc(t.id)}">
        <span class="num">${i+1}</span>
        <img class="track-cover-mini" src="${t.cover||''}" style="${t.cover?'':'display:none'}" onerror="this.style.display='none'"/>
        <div style="flex:1;min-width:0;">
          <div class="t-title">${esc(t.title)}</div>
          <div class="t-artist">${esc(t.artist)} • ${esc(t.album)}${t.year? ' • '+t.year:''}</div>
        </div>
        <span style="font-size:10px;padding:3px 6px;border-radius:6px;background:var(--badge-bg);color:var(--badge-text);border:1px solid var(--card-border);">${esc(t.codec)}</span>
        <span class="t-dur">${dur}</span>
        <button class="btn small ghost" data-action="add-queue" data-view-idx="${i}">+</button>
      </div>`;
    }).join("");
  }

  function render(){
    // windows without the library UI (e.g. the playlist panel) only need the playlist list
    if (!trackListEl) { renderPlaylistWindow(); return; }
    const LT = libraryTracks();
    const artistCount = new Set(LT.map(t=>t.artist)).size;
    const albumCount = new Set(LT.map(t=>t.artist+"\x00"+t.album)).size;
    if (libraryStats) libraryStats.textContent = `${LT.length} tracks • ${artistCount} artists • ${albumCount} albums`;

    const q = search.trim().toLowerCase();
    let html = "";

    if (libTab === "artists") {
      if (!selArtist) {
        viewList = [];
        const names = [...new Set(LT.map(t=>t.artist))].sort((a,b)=>a.localeCompare(b));
        const shown = q ? names.filter(n=>n.toLowerCase().includes(q)) : names;
        html = shown.map(n=>{
          const c = LT.filter(t=>t.artist===n).length;
          return `<div class="lib-item" data-artist="${esc(n)}"><div class="lib-avatar">${esc((n[0]||"?").toUpperCase())}</div><div style="flex:1;min-width:0;"><div class="t-title">${esc(n)}</div><div class="t-artist">${c} track(s)</div></div><span class="chev-r">›</span></div>`;
        }).join("") || `<div style="padding:30px;text-align:center;color:var(--text-muted);">No artists found.</div>`;
      } else {
        const at = LT.filter(t=>t.artist===selArtist);
        const albums = [...new Set(at.map(t=>t.album))].sort((a,b)=>a.localeCompare(b));
        const list = selAlbum ? at.filter(t=>t.album===selAlbum) : at;
        html = `<div class="lib-crumb"><button class="btn small" data-back="artists">‹ Artists</button><b>${esc(selArtist)}</b></div>
          <div class="chip-row"><button class="chip ${!selAlbum?"active":""}" data-album="">All albums</button>` +
          albums.map(a=>`<button class="chip ${selAlbum===a?"active":""}" data-album="${esc(a)}">${esc(a)}</button>`).join("") +
          `</div>` + trackRows(q ? list.filter(t=>(t.title+t.album).toLowerCase().includes(q)) : list);
      }
    } else if (libTab === "albums") {
      if (!selAlbumKey) {
        viewList = [];
        const keys = [...new Set(LT.map(t=>t.artist+"\x00"+t.album))].sort((a,b)=>a.localeCompare(b));
        const shown = q ? keys.filter(k=>k.toLowerCase().includes(q)) : keys;
        html = shown.map(k=>{
          const [a, al] = k.split("\x00");
          const c = LT.filter(t=>t.artist===a&&t.album===al).length;
          return `<div class="lib-item" data-albumkey="${esc(k)}"><div class="lib-avatar">💿</div><div style="flex:1;min-width:0;"><div class="t-title">${esc(al)}</div><div class="t-artist">${esc(a)} • ${c} track(s)</div></div><span class="chev-r">›</span></div>`;
        }).join("") || `<div style="padding:30px;text-align:center;color:var(--text-muted);">No albums found.</div>`;
      } else {
        const [a, al] = selAlbumKey.split("\x00");
        const list = LT.filter(t=>t.artist===a&&t.album===al);
        html = `<div class="lib-crumb"><button class="btn small" data-back="albums">‹ Albums</button><b>${esc(al)}</b><span class="t-artist" style="margin-left:8px;">${esc(a)}</span></div>` +
          trackRows(q ? list.filter(t=>t.title.toLowerCase().includes(q)) : list);
      }
    } else { // genres
      if (!selGenre) {
        viewList = [];
        const gs = [...new Set(LT.map(t=>t.genre))].sort((a,b)=>a.localeCompare(b));
        const shown = q ? gs.filter(g=>g.toLowerCase().includes(q)) : gs;
        html = shown.map(g=>{
          const c = LT.filter(t=>t.genre===g).length;
          return `<div class="lib-item" data-genre="${esc(g)}"><div class="lib-avatar">🎼</div><div style="flex:1;min-width:0;"><div class="t-title">${esc(g)}</div><div class="t-artist">${c} track(s)</div></div><span class="chev-r">›</span></div>`;
        }).join("") || `<div style="padding:30px;text-align:center;color:var(--text-muted);">No genres found.</div>`;
      } else {
        const list = LT.filter(t=>t.genre===selGenre);
        html = `<div class="lib-crumb"><button class="btn small" data-back="genres">‹ Genres</button><b>${esc(selGenre)}</b></div>` +
          trackRows(q ? list.filter(t=>(t.title+t.artist).toLowerCase().includes(q)) : list);
      }
    }

    trackListEl.innerHTML = html;

    // master-detail navigation
    trackListEl.querySelectorAll("[data-artist]").forEach(el=> el.addEventListener("click", ()=>{ selArtist = (el as HTMLElement).dataset.artist!; selAlbum = null; render(); }));
    trackListEl.querySelectorAll("[data-albumkey]").forEach(el=> el.addEventListener("click", ()=>{ selAlbumKey = (el as HTMLElement).dataset.albumkey!; render(); }));
    trackListEl.querySelectorAll("[data-genre]").forEach(el=> el.addEventListener("click", ()=>{ selGenre = (el as HTMLElement).dataset.genre!; render(); }));
    trackListEl.querySelectorAll("[data-back]").forEach(el=> el.addEventListener("click", ()=>{
      const k = (el as HTMLElement).dataset.back!;
      if (k==="artists") { selArtist = null; selAlbum = null; }
      else if (k==="albums") { selAlbumKey = null; }
      else { selGenre = null; }
      render();
    }));
    trackListEl.querySelectorAll(".chip[data-album]").forEach(el=> el.addEventListener("click", ()=>{ selAlbum = ((el as HTMLElement).dataset.album || null); render(); }));

    // track rows: play the visible list / queue one / drag out
    trackListEl.querySelectorAll(".track-row").forEach(el=>{
      el.addEventListener("dragstart", (e:any)=>{
        e.dataTransfer.setData("application/x-melo-ids", (el as HTMLElement).dataset.id!);
        e.dataTransfer.effectAllowed = "copy";
      });
      el.addEventListener("click", (e)=>{
        const target = e.target as HTMLElement;
        const idx = parseInt((el as HTMLElement).dataset.viewIdx!);
        if(target.closest("[data-action='add-queue']")){ addToQueue(viewList[idx]); return; }
        busEmit("melo:play-tracks", { tracks: viewList, index: idx });
      });
    });

    renderPlaylistWindow();
  }

  function addToQueue(t:Track){
    busEmit("melo:add-queue", t);
    toast(`Queued: ${t.title}`);
  }

  function renderQueue(){
    if (!queueListEl) return;
    const lumi = (window as any).LumiPlayer;
    const q: Track[] = lumi?.queue || tracks.slice(0,4);
    if(!q.length){
      queueListEl.innerHTML = `<div style="text-align:center;color:var(--text-muted);font-size:12px;padding:12px;">Queue is empty</div>`;
      return;
    }
    queueListEl.innerHTML = q.map((t, i)=>`
      <div class="track-row" data-id="${t.id}" data-queue-idx="${i}" style="padding:6px 8px;border-radius:8px;border:1px solid ${i===(lumi?.currentIndex ?? 0) ? 'var(--accent)' : 'transparent'};">
        <img class="track-cover-mini" src="${t.cover||''}" style="width:24px;height:24px;${t.cover?'':'display:none'}" />
        <div style="flex:1;min-width:0;">
          <div class="t-title" style="font-size:12px;">${t.title}</div>
          <div class="t-artist" style="font-size:11px;">${t.artist}</div>
        </div>
        <button class="btn small ghost" data-remove="${i}" style="padding:2px 6px;">×</button>
      </div>
    `).join("");
    queueListEl.querySelectorAll("[data-remove]").forEach(btn=>{
      btn.addEventListener("click", ()=>{
        const idx = parseInt((btn as HTMLElement).dataset.remove!);
        q.splice(idx,1);
        renderQueue();
      });
    });
    queueListEl.querySelectorAll(".track-row").forEach(el=>{
      el.addEventListener("click", e=>{
        if((e.target as HTMLElement).closest("[data-remove]")) return;
        const idx = parseInt((el as HTMLElement).dataset.queueIdx!);
        const lumi = (window as any).LumiPlayer;
        if(lumi) lumi.loadTrack(idx);
      });
    });
  }

  // react to track changes coming from the player (any window)
  busOn("melo:track-changed", (t: Track)=>{
    renderQueue();
    const box = document.getElementById("lyricsBox");
    if(box && t) box.textContent = t.lyrics || "No lyrics found for this track. You can add it via the tag editor.";
    document.querySelectorAll(".track-row").forEach(el=>{
      el.classList.toggle("active", (el as HTMLElement).dataset.id === t?.id);
    });
  });
  setInterval(()=> renderQueue(), 2000);

  // event-independent sync: poll the shared storage revision (covers any
  // environment where Tauri events misbehave)
  let lastRev = localStorage.getItem("melo-rev") || "";
  setInterval(()=>{
    const rev = localStorage.getItem("melo-rev") || "";
    if (rev !== lastRev) {
      lastRev = rev;
      try { const t = JSON.parse(localStorage.getItem("melo-tracks") || "null"); if (Array.isArray(t)) tracks = t; } catch {}
      try { const p = JSON.parse(localStorage.getItem("melo-playlists") || "null"); if (Array.isArray(p) && p.length) playlists = p; } catch {}
      render(); renderPlaylistWindow();
    }
  }, 1200);

  // expose
  (window as any).LumiLibrary = {
    get tracks(){return tracks}, get playlists(){return playlists}, render,
    addTracks, addToCurrentPlaylist, importPaths,
    currentPlaylistName: ()=> currentPlaylist()?.name || "Playlist"
  };
}
