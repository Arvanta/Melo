export type Track = {
  id: string;
  title: string;
  artist: string;
  /** Album-level grouping artist; falls back to artist when the tag is absent. */
  albumArtist?: string;
  album: string;
  genre: string;
  year: number;
  duration: number; // seconds
  path: string; // file path or object URL
  cover?: string; // asset URL or cached artwork file path
  codec: string; // FLAC, MP3 etc
  specs: string; // 44.1 kHz...
  source?: "scan" | "import";
  replayGain?: number; // dB
  lyrics?: string;
  // Identity of one occurrence in a duplicate-capable playlist / queue.
  playlistEntryId?: number;
  playCount?: number;
  lastPlayedAt?: number | null;
};

export type Playlist = {
  id: string;
  name: string;
  tracks: string[]; // track ids
  createdAt: number;
};

export type RepeatMode = "off" | "all" | "one";
