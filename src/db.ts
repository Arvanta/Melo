import type { Track, Playlist } from "./types";

const DB_NAME = "MeloDB";
const DB_VERSION = 1;

let dbPromise: Promise<IDBDatabase> | null = null;

export function getDB(): Promise<IDBDatabase> {
  if (!dbPromise) {
    dbPromise = new Promise((resolve, reject) => {
      if (typeof indexedDB === "undefined") {
        return reject(new Error("IndexedDB not supported"));
      }
      const req = indexedDB.open(DB_NAME, DB_VERSION);
      req.onupgradeneeded = () => {
        const db = req.result;
        if (!db.objectStoreNames.contains("tracks")) {
          db.createObjectStore("tracks", { keyPath: "id" });
        }
        if (!db.objectStoreNames.contains("playlists")) {
          db.createObjectStore("playlists", { keyPath: "id" });
        }
        if (!db.objectStoreNames.contains("kv")) {
          db.createObjectStore("kv", { keyPath: "key" });
        }
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }
  return dbPromise;
}

export async function dbSaveTracks(tracks: Track[]): Promise<void> {
  try {
    const db = await getDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction("tracks", "readwrite");
      const store = tx.objectStore("tracks");
      store.clear();
      for (const t of tracks) {
        store.put(t);
      }
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } catch (e) {
    try {
      localStorage.setItem("melo-tracks", JSON.stringify(tracks.map(({ cover, ...rest }) => rest)));
    } catch {}
  }
}

export async function dbGetTracks(): Promise<Track[]> {
  try {
    const db = await getDB();
    return new Promise((resolve) => {
      const tx = db.transaction("tracks", "readonly");
      const store = tx.objectStore("tracks");
      const req = store.getAll();
      req.onsuccess = () => {
        if (Array.isArray(req.result) && req.result.length > 0) {
          resolve(req.result);
        } else {
          try {
            const raw = localStorage.getItem("melo-tracks");
            resolve(raw ? JSON.parse(raw) : []);
          } catch {
            resolve([]);
          }
        }
      };
      req.onerror = () => {
        try {
          const raw = localStorage.getItem("melo-tracks");
          resolve(raw ? JSON.parse(raw) : []);
        } catch {
          resolve([]);
        }
      };
    });
  } catch {
    try {
      const raw = localStorage.getItem("melo-tracks");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }
}

export async function dbSavePlaylists(playlists: Playlist[]): Promise<void> {
  try {
    const db = await getDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction("playlists", "readwrite");
      const store = tx.objectStore("playlists");
      store.clear();
      for (const p of playlists) {
        store.put(p);
      }
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } catch {
    try {
      localStorage.setItem("melo-playlists", JSON.stringify(playlists));
    } catch {}
  }
}

export async function dbGetPlaylists(): Promise<Playlist[]> {
  try {
    const db = await getDB();
    return new Promise((resolve) => {
      const tx = db.transaction("playlists", "readonly");
      const store = tx.objectStore("playlists");
      const req = store.getAll();
      req.onsuccess = () => {
        if (Array.isArray(req.result) && req.result.length > 0) {
          resolve(req.result);
        } else {
          try {
            const raw = localStorage.getItem("melo-playlists");
            resolve(raw ? JSON.parse(raw) : []);
          } catch {
            resolve([]);
          }
        }
      };
      req.onerror = () => {
        try {
          const raw = localStorage.getItem("melo-playlists");
          resolve(raw ? JSON.parse(raw) : []);
        } catch {
          resolve([]);
        }
      };
    });
  } catch {
    try {
      const raw = localStorage.getItem("melo-playlists");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }
}
