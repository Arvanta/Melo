// Waveform peaks for the seek bar.
//
// `get_or_compute` decodes a file once (symphonia, pure Rust) into BINS peak values
// (0..=255) and caches them under AppData/waveform-cache/<hash>.wf. The cache is keyed
// by the file's PATH and validated against its size + mtime, so it works for any file
// the player opens (inside the library or not) and is rebuilt when the file changes.
//
// A column is the RMS (energy) of its part of the track, normalised to the 97th
// percentile of all columns: peak-based columns saturate on loud, modern masters (every
// block touches full scale), RMS keeps loud and quiet passages distinguishable.
// While decoding, finished columns are reported through `on_progress` so the UI can
// reveal the waveform left to right.
//
// Nothing here touches the library database: a cache entry is ~420 bytes, the folder is
// pruned oldest-first past MAX_ENTRIES, and a failed/unsupported file simply yields an
// error so the UI keeps the plain seek bar.

use std::fs;
use std::io::Write;
use std::path::{Path, PathBuf};
use std::sync::atomic::{AtomicU64, Ordering};
use std::sync::Mutex;
use std::time::{Duration, Instant, UNIX_EPOCH};

use sha2::{Digest, Sha256};
use symphonia::core::audio::SampleBuffer;
use symphonia::core::codecs::{DecoderOptions, CODEC_TYPE_NULL};
use symphonia::core::errors::Error as SymError;
use symphonia::core::formats::{FormatOptions, SeekMode, SeekTo};
use symphonia::core::io::MediaSourceStream;
use symphonia::core::meta::MetadataOptions;
use symphonia::core::probe::Hint;
use symphonia::core::units::Time;

/// Number of peak columns stored per track.
pub const BINS: usize = 400;
/// Cache entries kept before the oldest are pruned.
const MAX_ENTRIES: usize = 4000;
const PRUNE_BATCH: usize = 500;
/// One peak per this many frames while decoding (re-binned to BINS at the end).
const BLOCK_FRAMES: usize = 4096;
/// v3: RMS columns with a contrast floor (v1 stored saturated peak columns, v2 sat close
/// to full height on compressed masters; older entries are rebuilt).
const MAGIC: &[u8; 4] = b"MWF3";
/// Progress reports: not more often than this, and only after this many finished columns.
const PROGRESS_EVERY: Duration = Duration::from_millis(120);
const PROGRESS_MIN_COLS: usize = 8;
/// Files at least this long are sampled instead of decoded end to end (full decode of
/// ~10 minutes costs a second or two; an hour costs many seconds).
const LONG_SECS: f64 = 600.0;
/// Sampling: windows per column, their length, and packets dropped after each seek.
const SAMPLE_WINDOWS: usize = 2;
const SAMPLE_WINDOW_SECS: f64 = 0.15;
const SAMPLE_WARMUP_PACKETS: usize = 2;
/// Columns are normalised to this percentile of the loudest-to-quietest ordering.
const NORM_PERCENTILE: f32 = 0.97;
/// Contrast floor: the 10th-percentile column, scaled by this, becomes height 0. Heavily
/// compressed masters keep every column within a few dB of each other, so scaling only
/// from zero leaves them all near full height; subtracting a floor spreads them out.
/// Dynamic tracks (quiet passages near silence) have a floor near 0 and are unaffected.
const FLOOR_PERCENTILE: f32 = 0.10;
const FLOOR_SCALE: f32 = 0.85;

/// Decodes run one at a time: a burst of requests (skipping through a queue) must not
/// pile several full decodes onto the CPU.
static DECODE_LOCK: Mutex<()> = Mutex::new(());
/// Newest request id. Only the newest track matters: skipping through a queue must not
/// leave a line of full decodes behind, so older requests stop as soon as they notice.
static LATEST: AtomicU64 = AtomicU64::new(0);

fn cache_file(dir: &Path, track: &Path) -> PathBuf {
    let mut h = Sha256::new();
    h.update(track.to_string_lossy().as_bytes());
    let hash = format!("{:x}", h.finalize());
    dir.join(format!("{}.wf", &hash[..24]))
}

fn file_stamp(path: &Path) -> Result<(u64, u64), String> {
    let md = fs::metadata(path).map_err(|e| e.to_string())?;
    if !md.is_file() {
        return Err("not a file".into());
    }
    let mtime = md
        .modified()
        .ok()
        .and_then(|t| t.duration_since(UNIX_EPOCH).ok())
        .map(|d| d.as_secs())
        .unwrap_or(0);
    Ok((md.len(), mtime))
}

fn read_cache(file: &Path, stamp: (u64, u64)) -> Option<Vec<u8>> {
    let b = fs::read(file).ok()?;
    if b.len() < 22 || &b[0..4] != MAGIC {
        return None;
    }
    let size = u64::from_le_bytes(b[4..12].try_into().ok()?);
    let mtime = u64::from_le_bytes(b[12..20].try_into().ok()?);
    let bins = u16::from_le_bytes(b[20..22].try_into().ok()?) as usize;
    if (size, mtime) != stamp || bins == 0 || b.len() != 22 + bins {
        return None;
    }
    Some(b[22..].to_vec())
}

fn write_cache(dir: &Path, file: &Path, stamp: (u64, u64), peaks: &[u8]) {
    if fs::create_dir_all(dir).is_err() {
        return;
    }
    let mut out = Vec::with_capacity(22 + peaks.len());
    out.extend_from_slice(MAGIC);
    out.extend_from_slice(&stamp.0.to_le_bytes());
    out.extend_from_slice(&stamp.1.to_le_bytes());
    out.extend_from_slice(&(peaks.len() as u16).to_le_bytes());
    out.extend_from_slice(peaks);
    // Write-then-rename so a crash never leaves a truncated entry that parses.
    let tmp = file.with_extension("tmp");
    if let Ok(mut f) = fs::File::create(&tmp) {
        if f.write_all(&out).is_ok() && f.flush().is_ok() {
            drop(f);
            let _ = fs::rename(&tmp, file);
        } else {
            let _ = fs::remove_file(&tmp);
        }
    }
    prune(dir);
}

fn prune(dir: &Path) {
    let Ok(rd) = fs::read_dir(dir) else { return };
    let mut entries: Vec<(std::time::SystemTime, PathBuf)> = rd
        .filter_map(|e| e.ok())
        .filter(|e| e.path().extension().and_then(|x| x.to_str()) == Some("wf"))
        .filter_map(|e| Some((e.metadata().ok()?.modified().ok()?, e.path())))
        .collect();
    if entries.len() <= MAX_ENTRIES {
        return;
    }
    entries.sort_by_key(|(t, _)| *t);
    for (_, p) in entries.into_iter().take(PRUNE_BATCH) {
        let _ = fs::remove_file(p);
    }
}

/// RMS of blocks[a..b] (each block value is already an RMS over equal frame counts).
fn col_rms(blocks: &[f32], a: usize, b: usize) -> f32 {
    let slice = &blocks[a..b.min(blocks.len())];
    if slice.is_empty() {
        return 0.0;
    }
    (slice.iter().map(|v| v * v).sum::<f32>() / slice.len() as f32).sqrt()
}

/// Scales columns to 0..=255: the top is their 97th percentile (a few loud spikes must
/// not flatten everything else), the bottom a fraction of the 10th percentile (contrast
/// for compressed masters, see FLOOR_SCALE), with a mild curve so quiet passages stay visible.
fn normalise(cols: &[f32]) -> Vec<u8> {
    if cols.is_empty() {
        return Vec::new();
    }
    let mut sorted = cols.to_vec();
    sorted.sort_by(|x, y| x.partial_cmp(y).unwrap_or(std::cmp::Ordering::Equal));
    let mut norm = sorted[(((sorted.len() - 1) as f32) * NORM_PERCENTILE) as usize];
    if norm <= 1e-6 {
        norm = *sorted.last().unwrap();
    }
    if norm <= 1e-6 {
        return vec![0; cols.len()];
    }
    let at = |p: f32| sorted[(((sorted.len() - 1) as f32) * p) as usize];
    let floor = (at(FLOOR_PERCENTILE) * FLOOR_SCALE).min(norm * 0.9);
    let span = (norm - floor).max(1e-6);
    cols.iter()
        .map(|v| (((v - floor) / span).clamp(0.0, 1.0).powf(0.9) * 255.0).round() as u8)
        .collect()
}

/// Re-bins the per-block RMS values into exactly `bins` columns and normalises them.
fn finish(blocks: &[f32], bins: usize) -> Vec<u8> {
    if blocks.is_empty() {
        return vec![0; bins];
    }
    let n = blocks.len();
    let cols: Vec<f32> = (0..bins)
        .map(|i| {
            let a = i * n / bins;
            let b = (((i + 1) * n) / bins).max(a + 1).min(n);
            col_rms(blocks, a, b)
        })
        .collect();
    normalise(&cols)
}

/// Columns already complete given `blocks` decoded so far out of `total` expected.
/// Returns None when too few are finished to be worth reporting.
fn partial_columns(blocks: &[f32], total: usize, bins: usize) -> Option<Vec<u8>> {
    if total == 0 {
        return None;
    }
    let mut cols = Vec::new();
    for i in 0..bins {
        let a = i * total / bins;
        let b = (((i + 1) * total) / bins).max(a + 1);
        if b > blocks.len() {
            break;
        }
        cols.push(col_rms(blocks, a, b));
    }
    if cols.len() < PROGRESS_MIN_COLS {
        return None;
    }
    Some(normalise(&cols))
}

/// An opened audio file ready to decode.
struct Opened {
    format: Box<dyn symphonia::core::formats::FormatReader>,
    decoder: Box<dyn symphonia::core::codecs::Decoder>,
    track_id: u32,
    /// Total frames / sample rate when the container knows them.
    n_frames: Option<u64>,
    sample_rate: Option<u32>,
}

fn open(path: &Path) -> Result<Opened, String> {
    let file = fs::File::open(path).map_err(|e| e.to_string())?;
    let mss = MediaSourceStream::new(Box::new(file), Default::default());
    let mut hint = Hint::new();
    if let Some(ext) = path.extension().and_then(|e| e.to_str()) {
        hint.with_extension(ext);
    }
    let probed = symphonia::default::get_probe()
        .format(&hint, mss, &FormatOptions::default(), &MetadataOptions::default())
        .map_err(|e| format!("unsupported format: {e}"))?;
    let format = probed.format;
    let track = format
        .tracks()
        .iter()
        .find(|t| t.codec_params.codec != CODEC_TYPE_NULL)
        .ok_or_else(|| "no audio track".to_string())?;
    let decoder = symphonia::default::get_codecs()
        .make(&track.codec_params, &DecoderOptions::default())
        .map_err(|e| format!("unsupported codec: {e}"))?;
    Ok(Opened {
        track_id: track.id,
        n_frames: track.codec_params.n_frames,
        sample_rate: track.codec_params.sample_rate,
        format,
        decoder,
    })
}

/// Columns for `path`: files known to be longer than LONG_SECS are SAMPLED (a few short
/// windows per column, found by seeking) instead of decoded end to end; anything that
/// cannot be sampled falls back to the full decode.
pub fn compute_peaks(path: &Path, my_id: u64, on_progress: &mut dyn FnMut(&[u8])) -> Result<Vec<u8>, String> {
    let opened = open(path)?;
    let secs = match (opened.n_frames, opened.sample_rate) {
        (Some(n), Some(r)) if r > 0 => n as f64 / r as f64,
        _ => 0.0,
    };
    if secs >= LONG_SECS {
        match sample_columns(opened, secs, my_id, on_progress) {
            Ok(cols) => return Ok(cols),
            Err(e) if e == "superseded" => return Err(e),
            Err(_) => {} // seeking not possible: decode the whole file instead
        }
    } else {
        drop(opened);
    }
    full_decode(path, my_id, on_progress)
}

/// Decodes `path` end to end (RMS per block, re-binned at the end).
pub fn full_decode(path: &Path, my_id: u64, on_progress: &mut dyn FnMut(&[u8])) -> Result<Vec<u8>, String> {
    let Opened { mut format, mut decoder, track_id, n_frames, .. } = open(path)?;
    // Expected block count (None when the container does not know its length): only
    // used to place the columns reported while decoding.
    let total_blocks = n_frames.map(|n| (n as usize / BLOCK_FRAMES).max(1)).unwrap_or(0);

    let mut blocks: Vec<f32> = Vec::new();
    let mut cur_sq = 0f64;
    let mut cur_frames = 0usize;
    let mut last_emit = Instant::now();
    let mut last_cols = 0usize;
    let mut buf: Option<SampleBuffer<f32>> = None;

    loop {
        let packet = match format.next_packet() {
            Ok(p) => p,
            Err(SymError::IoError(_)) | Err(SymError::ResetRequired) => break, // end of stream
            Err(e) => return Err(e.to_string()),
        };
        if packet.track_id() != track_id {
            continue;
        }
        if LATEST.load(Ordering::Relaxed) != my_id {
            return Err("superseded".into()); // a newer track was requested
        }
        let decoded = match decoder.decode(&packet) {
            Ok(d) => d,
            Err(SymError::DecodeError(_)) => continue, // one bad frame: skip it
            Err(SymError::IoError(_)) => break,
            Err(e) => return Err(e.to_string()),
        };
        let spec = *decoded.spec();
        let channels = spec.channels.count().max(1);
        let need = decoded.capacity() as u64;
        if buf.as_ref().map(|b| (b.capacity() as u64) < need * channels as u64).unwrap_or(true) {
            buf = Some(SampleBuffer::<f32>::new(need, spec));
        }
        let sb = buf.as_mut().unwrap();
        sb.copy_interleaved_ref(decoded);
        for frame in sb.samples().chunks(channels) {
            let mut e = 0f32;
            for s in frame {
                e += s * s;
            }
            cur_sq += (e / channels as f32) as f64;
            cur_frames += 1;
            if cur_frames >= BLOCK_FRAMES {
                blocks.push((cur_sq / cur_frames as f64).sqrt() as f32);
                cur_sq = 0.0;
                cur_frames = 0;
            }
        }
        if total_blocks > 0 && last_emit.elapsed() >= PROGRESS_EVERY {
            if let Some(cols) = partial_columns(&blocks, total_blocks, BINS) {
                if cols.len() > last_cols {
                    last_cols = cols.len();
                    on_progress(&cols);
                }
            }
            last_emit = Instant::now();
        }
    }
    if cur_frames > 0 {
        blocks.push((cur_sq / cur_frames as f64).sqrt() as f32);
    }
    if blocks.is_empty() {
        return Err("no audio decoded".into());
    }
    Ok(finish(&blocks, BINS))
}

/// Sampled analysis for long files (mixes, podcasts, audiobooks): for each of BINS columns
/// seek into it SAMPLE_WINDOWS times and decode ~SAMPLE_WINDOW_SECS of audio, so the cost
/// is a small fraction of the file (an hour-long file is analysed in well under a second
/// instead of decoding all of it). The column is the RMS over its windows. Transients that
/// fall between windows are not seen - irrelevant at 400 columns over an hour. Any seek
/// failure aborts with Err and the caller decodes the whole file.
fn sample_columns(mut o: Opened, secs: f64, my_id: u64, on_progress: &mut dyn FnMut(&[u8])) -> Result<Vec<u8>, String> {
    let rate = o.sample_rate.unwrap_or(44100) as f64;
    let want_frames = (SAMPLE_WINDOW_SECS * rate) as usize;
    let mut cols: Vec<f32> = Vec::with_capacity(BINS);
    let mut buf: Option<SampleBuffer<f32>> = None;
    let mut last_emit = Instant::now();
    for i in 0..BINS {
        if LATEST.load(Ordering::Relaxed) != my_id {
            return Err("superseded".into());
        }
        let (mut sq, mut n) = (0f64, 0usize);
        for w in 0..SAMPLE_WINDOWS {
            let frac = (i as f64 + (w as f64 + 0.5) / SAMPLE_WINDOWS as f64) / BINS as f64;
            let t = (frac * secs).min((secs - SAMPLE_WINDOW_SECS - 0.5).max(0.0));
            o.format
                .seek(
                    SeekMode::Coarse,
                    SeekTo::Time { time: Time::new(t.floor() as u64, t.fract()), track_id: Some(o.track_id) },
                )
                .map_err(|e| format!("seek failed: {e}"))?;
            o.decoder.reset();
            let (mut got, mut decoded_packets, mut tries) = (0usize, 0usize, 0usize);
            while got < want_frames && tries < 64 {
                tries += 1;
                let packet = match o.format.next_packet() {
                    Ok(p) => p,
                    Err(_) => break, // end of stream (or a read error): use what we have
                };
                if packet.track_id() != o.track_id {
                    continue;
                }
                let decoded = match o.decoder.decode(&packet) {
                    Ok(d) => d,
                    Err(SymError::DecodeError(_)) => continue,
                    Err(_) => break,
                };
                decoded_packets += 1;
                if decoded_packets <= SAMPLE_WARMUP_PACKETS {
                    continue; // the first packets after a seek lack their history (bit reservoir/overlap)
                }
                let spec = *decoded.spec();
                let channels = spec.channels.count().max(1);
                let need = decoded.capacity() as u64;
                if buf.as_ref().map(|b| (b.capacity() as u64) < need * channels as u64).unwrap_or(true) {
                    buf = Some(SampleBuffer::<f32>::new(need, spec));
                }
                let sb = buf.as_mut().unwrap();
                sb.copy_interleaved_ref(decoded);
                for frame in sb.samples().chunks(channels) {
                    let mut e = 0f32;
                    for s in frame {
                        e += s * s;
                    }
                    sq += (e / channels as f32) as f64;
                    n += 1;
                }
                got += sb.samples().len() / channels;
            }
        }
        cols.push(if n > 0 { (sq / n as f64).sqrt() as f32 } else { 0.0 });
        if last_emit.elapsed() >= PROGRESS_EVERY && cols.len() >= PROGRESS_MIN_COLS {
            on_progress(&normalise(&cols));
            last_emit = Instant::now();
        }
    }
    if cols.iter().all(|v| *v == 0.0) {
        return Err("sampling found no audio".into()); // let the full decode try
    }
    Ok(normalise(&cols))
}

/// Registers a new request: every older one stops at its next check.
pub fn new_request_id() -> u64 {
    LATEST.fetch_add(1, Ordering::SeqCst) + 1
}

/// Cached columns for `track`, decoding (once, serialised) when missing or stale.
/// `on_progress` receives the finished leading columns while a decode runs; it is never
/// called for a cache hit. A request is abandoned with Err("superseded") as soon as a
/// newer one arrives.
pub fn get_or_compute(cache_dir: &Path, track: &Path, on_progress: &mut dyn FnMut(&[u8])) -> Result<Vec<u8>, String> {
    let my_id = new_request_id();
    let stamp = file_stamp(track)?;
    let cf = cache_file(cache_dir, track);
    if let Some(p) = read_cache(&cf, stamp) {
        return Ok(p);
    }
    let _guard = DECODE_LOCK.lock().unwrap_or_else(|e| e.into_inner());
    if LATEST.load(Ordering::SeqCst) != my_id {
        return Err("superseded".into());
    }
    // Another request may have produced it while we waited for the lock.
    if let Some(p) = read_cache(&cf, stamp) {
        return Ok(p);
    }
    let peaks = compute_peaks(track, my_id, on_progress)?;
    write_cache(cache_dir, &cf, stamp, &peaks);
    Ok(peaks)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn finish_normalises_and_bins() {
        let blocks: Vec<f32> = (0..1000).map(|i| if i < 500 { 0.1 } else { 0.5 }).collect();
        let p = finish(&blocks, BINS);
        assert_eq!(p.len(), BINS);
        assert_eq!(*p.iter().max().unwrap(), 255);
        assert!(p[0] < p[BINS - 1], "quiet half is lower than the loud half");
    }

    #[test]
    fn finish_handles_silence_and_short_input() {
        assert_eq!(finish(&[], BINS), vec![0; BINS]);
        assert_eq!(finish(&[0.0, 0.0], BINS), vec![0; BINS]);
        let p = finish(&[0.3], BINS);
        assert_eq!(p.len(), BINS);
        assert!(p.iter().all(|v| *v == 255));
    }

    #[test]
    fn loud_master_with_dynamics_does_not_saturate() {
        // Typical loud track: RMS wobbles 0.18..0.32 with a quiet intro; a few spikes.
        let mut blocks: Vec<f32> = Vec::new();
        for i in 0..2000 {
            let v = if i < 200 { 0.05 } else { 0.18 + 0.14 * ((i as f32 / 37.0).sin().abs()) };
            blocks.push(v);
        }
        blocks[1000] = 1.0; // one outlier must not flatten the rest
        let p = finish(&blocks, BINS);
        let at_full = p.iter().filter(|v| **v >= 250).count();
        assert!(at_full < BINS / 4, "most columns stay below full scale (got {at_full})");
        let spread = *p.iter().max().unwrap() as i32 - *p.iter().skip(60).min().unwrap() as i32;
        assert!(spread > 60, "loud and quiet columns stay distinguishable (spread {spread})");
        assert!(p[0] < 120, "the quiet intro is clearly lower");
    }

    #[test]
    fn compressed_master_spreads_out() {
        // Brickwalled track: every column within ~4 dB (0.60..0.95 of full RMS).
        let blocks: Vec<f32> = (0..2000).map(|i| 0.60 + 0.35 * ((i as f32 / 53.0).sin() * 0.5 + 0.5)).collect();
        let p = finish(&blocks, BINS);
        let near_full = p.iter().filter(|v| **v >= 240).count();
        assert!(near_full < BINS / 4, "few columns at full height (got {near_full})");
        let (lo, hi) = (*p.iter().min().unwrap() as i32, *p.iter().max().unwrap() as i32);
        assert!(hi - lo > 150, "loud and quieter passages clearly differ (spread {})", hi - lo);
    }

    #[test]
    fn partial_columns_waits_then_reports_finished_prefix() {
        let blocks = vec![0.2f32; 10];
        assert!(partial_columns(&blocks, 1000, BINS).is_none(), "too few finished columns");
        let mut more = vec![0.2f32; 500];
        more.extend(vec![0.4f32; 100]);
        let cols = partial_columns(&more, 1000, BINS).unwrap();
        assert!(cols.len() >= 200 && cols.len() <= 240, "about 60% of columns finished, got {}", cols.len());
        assert!(partial_columns(&more, 0, BINS).is_none(), "unknown length: no progress");
    }

    #[test]
    fn cache_roundtrip_and_staleness() {
        let dir = std::env::temp_dir().join(format!("melo-wf-test-{}", std::process::id()));
        let _ = fs::remove_dir_all(&dir);
        let f = dir.join("x.wf");
        let peaks: Vec<u8> = (0..BINS).map(|i| (i % 256) as u8).collect();
        write_cache(&dir, &f, (10, 20), &peaks);
        assert_eq!(read_cache(&f, (10, 20)), Some(peaks));
        assert_eq!(read_cache(&f, (11, 20)), None, "size change invalidates");
        assert_eq!(read_cache(&f, (10, 21)), None, "mtime change invalidates");
        let _ = fs::remove_dir_all(&dir);
    }
}
