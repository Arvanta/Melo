export type Track = {
  id: string;
  title: string;
  artist: string;
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
};

export type Playlist = {
  id: string;
  name: string;
  tracks: string[]; // track ids
  createdAt: number;
};

export type RepeatMode = "off" | "all" | "one";
