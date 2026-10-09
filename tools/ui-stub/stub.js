// Browser-side stub of Melo's Tauri backend + the round-73 UI probes.
// Injected via evaluateOnNewDocument (must be a self-contained string).
window.__TAURI__ = true;
const ALBUMS = [
  { name: "Midnight Static", artist: "Nova Kesh", year: 2021, n: 7, plays: [41, 28, 19, 15, 9, 4, 1] },
  { name: "Paper Lanterns", artist: "Aria Vane", year: 2019, n: 4, plays: [12, 7, 2, 0] },
  { name: "Slow Machines", artist: "Nova Kesh", year: 2023, n: 3, plays: [55, 30, 11] },
  { name: "Untitled Demos", artist: "Unknown Artist", year: 0, n: 2, plays: [0, 0] },
];
const TRACKS = [];
for (const a of ALBUMS) for (let i = 0; i < a.n; i++) {
  TRACKS.push({
    id: `${a.name}-${i}`, path: `C:\\music\\${a.name.replace(/\s/g, "_")}\\${String(i + 1).padStart(2, "0")}_t${i + 1}.mp3`,
    title: `${a.name} — track ${i + 1}`, artist: a.artist, albumArtist: a.artist, album: a.name,
    genre: "Electronic", year: a.year, duration: 180 + i * 37, cover: null, codec: "mp3",
    specs: "44.1 kHz · 320 kbps", replayGain: null, playCount: a.plays[i] ?? null,
  });
}
const mkDb = (t) => { const { playCount, playlistEntryId, ...r } = t; return { ...r, ...(playlistEntryId ? { playlistEntryId } : {}), ...(playCount != null ? { playCount } : {}) }; };
const q = {};
window.__TAURI_INTERNALS__ = {
  metadata: { currentWindow: { label: "main", plugins: { window: {} } }, currentWebview: { label: "main" } },
  transformCallback: (cb) => { const id = Math.random(); q[id] = cb; return id; },
  unregisterCallback: (id) => { delete q[id]; },
  convertFileSrc: (p, proto) => `${proto || "asset"}://localhost/${encodeURIComponent(String(p))}`,
  invoke: async (cmd, args) => {
    (window.__calls ||= []).push(cmd);
    if (cmd.startsWith("plugin:")) return cmd.includes("listen") ? 1 : null;
    const a = args || {};
    switch (cmd) {
      case "library_stats": return { tracks: TRACKS.length, artists: 2, albums: 4, genres: 1 };
      case "list_library_roots": return [];
      case "library_tracks": {
        let items = [...TRACKS];
        if (a.album) items = items.filter(t => t.album.toLowerCase() === String(a.album).toLowerCase());
        if (a.sort === "album-asc") items.sort((x, y) => x.album.localeCompare(y.album) || x.title.localeCompare(y.title));
        const off = a.offset || 0, lim = a.limit ?? 5000;
        return { items: items.slice(off, off + lim).map(mkDb), total: items.length, limit: lim, offset: off };
      }
      case "library_groups": {
        const items = ALBUMS.map(al => ({ key: al.artist + "\0" + al.name, name: al.name, subtitle: `${al.n} tracks · ${al.artist}`, count: al.n, cover: null, artworkTrackId: null }));
        return { items, total: items.length, limit: 500, offset: 0 };
      }
      case "list_playlists": return [
        { id: "__auto_most_played__", name: "Most Played", createdAt: 0, trackCount: 8, kind: "auto" },
        { id: "__auto_recently_added__", name: "Recently Added", createdAt: 0, trackCount: 0, kind: "auto" },
        { id: "__auto_recently_played__", name: "Recently Played", createdAt: 0, trackCount: 0, kind: "auto" },
        { id: "pl_1", name: "Road Trip", createdAt: 1, trackCount: 2, kind: "manual" },
      ];
      case "playlist_tracks": {
        const off = a.offset || 0, lim = a.limit ?? 5000;
        const rows = a.playlistId === "__auto_most_played__"
          ? TRACKS.filter(t => t.playCount > 0).sort((x, y) => y.playCount - x.playCount)
          : TRACKS.slice(0, 2);
        return { items: rows.slice(off, off + lim).map((t, i) => ({ ...mkDb(t), playlistEntryId: i + 1 })), total: rows.length, limit: lim, offset: off };
      }
      case "queue_tracks": {
        // Round 80 harness: a LONG queue so the find probe actually scrolls.
        // Every 13th title carries "Nova" -> matches at 0,13,26,39,… (past the first virtual page).
        const rows = Array.from({ length: 180 }, (_, i) => {
          const t = TRACKS[i % TRACKS.length];
          const db = { ...mkDb(t), playlistEntryId: i + 1 };
          if (i % 13 === 0) db.title = `Nova Echo ${i}`;
          return db;
        });
        return { items: rows.slice(a.offset || 0, (a.offset || 0) + (a.limit ?? 5000)), total: rows.length, limit: a.limit ?? 5000, offset: a.offset || 0 };
      }
      default: return null;
    }
  },
};
// view-driven prefs (the app reads these at module init)
localStorage.setItem("melo-lib-view", /tiles/.test(location.search) ? "tiles" : "details");
localStorage.setItem("melo-lib-layout", "albums");
if (/mostplayed/.test(location.search)) localStorage.setItem("melo-currentPlaylist", "__auto_most_played__");

window.run = async (winId) => {
  await new Promise(r => setTimeout(r, 1500));
  for (let i = 0; i < 30 && !document.getElementById(winId); i++) await new Promise(r => setTimeout(r, 200));
  const keep = document.getElementById(winId);
  if (!keep) return;
  for (const child of Array.from(document.body.children)) if (child !== keep) child.style.setProperty("display", "none", "important");
  document.body.appendChild(keep);
  const P = (k, v) => keep.style.setProperty(k, v, "important");
  P("display", "flex"); P("position", "fixed"); P("left", "8px"); P("top", "8px"); P("z-index", "2147483647");
  P("transform", "none"); P("visibility", "visible"); P("opacity", "1");
  if (winId !== "win-settings") { P("width", "760px"); P("height", "640px"); }
  document.body.style.setProperty("background", "#0f1722", "important");
  window.dispatchEvent(new Event("resize"));
};
