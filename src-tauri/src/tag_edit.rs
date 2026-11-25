//! Tag editor core (round 119): read the editable fields of an audio file and
//! write a partial edit back SAFELY. Pure lofty + std — no Tauri, no database —
//! so it can be compiled and tested on its own (see HANDOFF "tag editor").
//!
//! Writing never touches the original in place: the file is copied next to
//! itself, the tags are written to the COPY, the copy is flushed, and only then
//! renamed over the original. Any failure leaves the original byte-for-byte
//! intact and removes the temp file.

use lofty::config::WriteOptions;
use lofty::file::{AudioFile, TaggedFile, TaggedFileExt};
use lofty::picture::{MimeType, Picture, PictureType};
use lofty::tag::{Accessor, ItemKey, ItemValue, Tag, TagItem, TagType};
use serde::{Deserialize, Serialize};
use std::fs;
use std::path::{Path, PathBuf};

/// Largest cover image accepted (bytes). Bigger images bloat every file.
pub const MAX_COVER_BYTES: usize = 12 * 1024 * 1024;

/// The fields the editor shows. Text fields are empty strings and numbers are
/// 0 when the file has no such value.
#[derive(Debug, Clone, Default, PartialEq, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct TagFields {
    pub title: String,
    pub artist: String,
    pub album_artist: String,
    pub album: String,
    pub genre: String,
    pub composer: String,
    pub comment: String,
    pub year: u32,
    pub track: u32,
    pub track_total: u32,
    pub disc: u32,
    pub disc_total: u32,
    pub has_cover: bool,
    /// Star rating 0..=5 (0 = none).
    pub rating: u8,
}

/// A partial edit: `None` = leave the field alone, `Some("")` / `Some(0)` =
/// clear it, anything else = set it.
#[derive(Debug, Clone, Default, Deserialize)]
#[serde(rename_all = "camelCase", default)]
pub struct TagEdit {
    pub title: Option<String>,
    pub artist: Option<String>,
    pub album_artist: Option<String>,
    pub album: Option<String>,
    pub genre: Option<String>,
    pub composer: Option<String>,
    pub comment: Option<String>,
    pub year: Option<u32>,
    pub track: Option<u32>,
    pub track_total: Option<u32>,
    pub disc: Option<u32>,
    pub disc_total: Option<u32>,
    /// 0 clears the rating, 1..=5 sets it.
    pub rating: Option<u8>,
    pub cover: Option<CoverEdit>,
}

#[derive(Debug, Clone, Deserialize)]
#[serde(tag = "action", rename_all = "camelCase")]
pub enum CoverEdit {
    /// Replace the front cover with the image at `path`.
    Set { path: String },
    /// Remove every embedded picture.
    Remove,
}

impl TagEdit {
    /// True when the edit changes nothing (no field, no cover).
    pub fn is_empty(&self) -> bool {
        self.title.is_none()
            && self.artist.is_none()
            && self.album_artist.is_none()
            && self.album.is_none()
            && self.genre.is_none()
            && self.composer.is_none()
            && self.comment.is_none()
            && self.year.is_none()
            && self.track.is_none()
            && self.track_total.is_none()
            && self.disc.is_none()
            && self.disc_total.is_none()
            && self.rating.is_none()
            && self.cover.is_none()
    }
}

fn text_of(tag: &Tag, key: &ItemKey) -> String {
    tag.get_string(key).map(|s| s.trim().to_string()).unwrap_or_default()
}

/// Reads the editable fields from an already parsed file.
pub fn read_fields(tagged: &TaggedFile) -> TagFields {
    let Some(tag) = tagged.primary_tag().or_else(|| tagged.first_tag()) else {
        return TagFields::default();
    };
    TagFields {
        title: tag.title().map(|s| s.trim().to_string()).unwrap_or_default(),
        artist: tag.artist().map(|s| s.trim().to_string()).unwrap_or_default(),
        album_artist: text_of(tag, &ItemKey::AlbumArtist),
        album: tag.album().map(|s| s.trim().to_string()).unwrap_or_default(),
        genre: tag.genre().map(|s| s.trim().to_string()).unwrap_or_default(),
        composer: text_of(tag, &ItemKey::Composer),
        comment: tag.comment().map(|s| s.trim().to_string()).unwrap_or_default(),
        year: tag.year().unwrap_or(0),
        track: tag.track().unwrap_or(0),
        track_total: tag.track_total().unwrap_or(0),
        disc: tag.disk().unwrap_or(0),
        disc_total: tag.disk_total().unwrap_or(0),
        has_cover: !tag.pictures().is_empty(),
        rating: read_rating(tag),
    }
}

/// `read_fields` plus the MP3 rating, which needs the file itself.
pub fn read_fields_at(path: &Path, tagged: &TaggedFile) -> TagFields {
    let mut f = read_fields(tagged);
    if is_mpeg(tagged) { f.rating = read_rating_mpeg(path); }
    f
}

/// The embedded cover (front cover preferred, else the first picture) as
/// (mime label, bytes).
pub fn read_cover(tagged: &TaggedFile) -> Option<(String, Vec<u8>)> {
    let tag = tagged.primary_tag().or_else(|| tagged.first_tag())?;
    let pic = tag.pictures().iter().find(|p| p.pic_type() == PictureType::CoverFront).or_else(|| tag.pictures().first())?;
    let mime = pic.mime_type().map(|m| m.to_string()).unwrap_or_else(|| "image/*".into());
    Some((mime, pic.data().to_vec()))
}

/// Sets (non-empty) or removes (empty) the embedded lyrics (USLT / ©lyr / LYRICS).
pub fn set_lyrics(tagged: &mut TaggedFile, text: &str) -> Result<(), String> {
    if tagged.primary_tag().is_none() && tagged.first_tag().is_none() {
        if text.trim().is_empty() { return Ok(()); }
        let ty = tagged.file_type().primary_tag_type();
        tagged.insert_tag(Tag::new(ty));
    }
    let tag = match tagged.primary_tag_mut() {
        Some(t) => t,
        None => tagged.first_tag_mut().ok_or_else(|| "This file has no writable tag".to_string())?,
    };
    if text.trim().is_empty() {
        tag.remove_key(&ItemKey::Lyrics);
    } else {
        tag.insert_text(ItemKey::Lyrics, text.to_string());
    }
    Ok(())
}

/// A validated cover image ready to embed.
pub struct CoverImage {
    pub mime: MimeType,
    pub data: Vec<u8>,
}

/// Loads a cover image from disk. Only JPEG and PNG are accepted (what every
/// player understands); the signature is checked, not the extension.
pub fn load_cover(path: &Path) -> Result<CoverImage, String> {
    let data = fs::read(path).map_err(|e| format!("Cannot read the cover image: {e}"))?;
    if data.is_empty() {
        return Err("The cover image is empty".into());
    }
    if data.len() > MAX_COVER_BYTES {
        return Err(format!("The cover image is larger than {} MB", MAX_COVER_BYTES / 1024 / 1024));
    }
    let mime = if data.starts_with(&[0xFF, 0xD8, 0xFF]) {
        MimeType::Jpeg
    } else if data.starts_with(&[0x89, b'P', b'N', b'G', 0x0D, 0x0A, 0x1A, 0x0A]) {
        MimeType::Png
    } else {
        return Err("Use a JPEG or PNG image for the cover".into());
    };
    Ok(CoverImage { mime, data })
}

fn set_text(tag: &mut Tag, key: ItemKey, value: &str) {
    let v = value.trim();
    if v.is_empty() {
        tag.remove_key(&key);
    } else {
        tag.insert_text(key, v.to_string());
    }
}

/// Applies `edit` to the parsed file in memory (nothing is written yet).
/// Creates the format's primary tag when the file has none.
pub fn apply_edit(tagged: &mut TaggedFile, edit: &TagEdit, cover: Option<&CoverImage>) -> Result<(), String> {
    if tagged.primary_tag().is_none() && tagged.first_tag().is_none() {
        let ty = tagged.file_type().primary_tag_type();
        tagged.insert_tag(Tag::new(ty));
    }
    let tag = match tagged.primary_tag_mut() {
        Some(t) => t,
        None => tagged.first_tag_mut().ok_or_else(|| "This file has no writable tag".to_string())?,
    };

    if let Some(v) = &edit.title {
        let v = v.trim();
        if v.is_empty() { tag.remove_title(); } else { tag.set_title(v.to_string()); }
    }
    if let Some(v) = &edit.artist {
        let v = v.trim();
        if v.is_empty() { tag.remove_artist(); } else { tag.set_artist(v.to_string()); }
    }
    if let Some(v) = &edit.album {
        let v = v.trim();
        if v.is_empty() { tag.remove_album(); } else { tag.set_album(v.to_string()); }
    }
    if let Some(v) = &edit.genre {
        let v = v.trim();
        if v.is_empty() { tag.remove_genre(); } else { tag.set_genre(v.to_string()); }
    }
    if let Some(v) = &edit.comment {
        let v = v.trim();
        if v.is_empty() { tag.remove_comment(); } else { tag.set_comment(v.to_string()); }
    }
    if let Some(v) = &edit.album_artist {
        set_text(tag, ItemKey::AlbumArtist, v);
    }
    if let Some(v) = &edit.composer {
        set_text(tag, ItemKey::Composer, v);
    }
    if let Some(n) = edit.year {
        if n == 0 { tag.remove_year(); } else { tag.set_year(n); }
    }
    if let Some(n) = edit.track {
        if n == 0 { tag.remove_track(); } else { tag.set_track(n); }
    }
    if let Some(n) = edit.track_total {
        if n == 0 { tag.remove_track_total(); } else { tag.set_track_total(n); }
    }
    if let Some(n) = edit.disc {
        if n == 0 { tag.remove_disk(); } else { tag.set_disk(n); }
    }
    if let Some(n) = edit.disc_total {
        if n == 0 { tag.remove_disk_total(); } else { tag.set_disk_total(n); }
    }

    if let Some(n) = edit.rating {
        set_rating(tag, n.min(5));
    }

    match (&edit.cover, cover) {
        (Some(CoverEdit::Remove), _) => {
            while !tag.pictures().is_empty() {
                tag.remove_picture(0);
            }
        }
        (Some(CoverEdit::Set { .. }), Some(img)) => {
            // Replace EVERY picture, not just CoverFront: MP4 stores no picture
            // type (reads back as Unknown), so a type-based removal appended a
            // second cover to .m4a files.
            while !tag.pictures().is_empty() {
                tag.remove_picture(0);
            }
            tag.push_picture(Picture::new_unchecked(PictureType::CoverFront, Some(img.mime.clone()), None, img.data.clone()));
        }
        (Some(CoverEdit::Set { .. }), None) => return Err("The cover image was not loaded".into()),
        (None, _) => {}
    }
    Ok(())
}


// ───────────────────────── star rating (round 125) ─────────────────────────
//
// MP3 (ID3v2): POPM frame(s) — email, rating byte 0..255, play counter. The
// byte is mapped to 1..5 stars with the usual ranges (1-31, 32-95, 96-159,
// 160-223, 224-255); 0 = unrated. A star is WRITTEN as 1/64/128/196/255 (the
// Windows Media Player / MusicBee convention). An existing POPM frame keeps its
// email and counter; only its rating byte changes. When the file has none, one
// with the "Windows Media Player 9 Series" email is added (the address the
// widest range of players read).
// Vorbis / MP4 / others: a text value (RATING / rate). 1..5 = stars, larger
// numbers are a 0..100 scale (stars = value / 20, rounded). Written as 0..100.

const WMP_EMAIL: &str = "Windows Media Player 9 Series";

pub fn stars_from_popm(byte: u8) -> u8 {
    match byte {
        0 => 0,
        1..=31 => 1,
        32..=95 => 2,
        96..=159 => 3,
        160..=223 => 4,
        _ => 5,
    }
}

pub fn popm_from_stars(stars: u8) -> u8 {
    [0u8, 1, 64, 128, 196, 255][stars.min(5) as usize]
}

fn stars_from_text(raw: &str) -> u8 {
    let v: f64 = raw.trim().replace(',', ".").parse().unwrap_or(0.0);
    if !v.is_finite() || v <= 0.0 { return 0; }
    if v <= 5.0 { return v.round() as u8; }
    ((v / 20.0).round() as u8).clamp(1, 5)
}

/// Rating of the generic (non-ID3) tag: Vorbis RATING, MP4 rate, ...
/// lofty does not hand POPM frames to the generic tag, so MP3 goes through
/// `read_rating_mpeg`.
pub fn read_rating(tag: &Tag) -> u8 {
    if tag.tag_type() == TagType::Id3v2 { return 0; }
    tag.get_string(&ItemKey::Popularimeter).map(stars_from_text).unwrap_or(0)
}

/// Sets the rating on a generic non-ID3 tag. ID3 is written by
/// `set_rating_mpeg` after the main save (typed POPM frame).
pub fn set_rating(tag: &mut Tag, stars: u8) {
    if tag.tag_type() == TagType::Id3v2 { return; }
    let stars = stars.min(5);
    tag.remove_key(&ItemKey::Popularimeter);
    if stars > 0 {
        tag.push(TagItem::new(ItemKey::Popularimeter, ItemValue::Text((stars as u32 * 20).to_string())));
    }
}

pub fn is_mpeg(tagged: &TaggedFile) -> bool {
    tagged.file_type() == lofty::file::FileType::Mpeg
}

fn preferred_popm(frames: &[&lofty::id3::v2::PopularimeterFrame<'_>]) -> Option<usize> {
    frames.iter().position(|f| f.email.is_empty() || f.email == WMP_EMAIL).or(if frames.is_empty() { None } else { Some(0) })
}

/// Reads the star rating of an MP3's ID3v2 tag (POPM). Missing tag = 0.
pub fn read_rating_mpeg(path: &Path) -> u8 {
    use lofty::config::ParseOptions;
    use lofty::id3::v2::Frame;
    use lofty::mpeg::MpegFile;
    let Ok(mut f) = fs::File::open(path) else { return 0 };
    let Ok(file) = MpegFile::read_from(&mut f, ParseOptions::new().read_properties(false)) else { return 0 };
    let Some(tag) = file.id3v2() else { return 0 };
    let frames: Vec<&lofty::id3::v2::PopularimeterFrame<'_>> = (&*tag).into_iter().filter_map(|fr| match fr { Frame::Popularimeter(p) => Some(p), _ => None }).collect();
    preferred_popm(&frames).map(|i| stars_from_popm(frames[i].rating)).unwrap_or(0)
}

/// Writes the star rating into an MP3's ID3v2 POPM frame, keeping the frame's
/// email and play counter. 0 sets the rating byte to 0 (unrated) and never
/// creates a frame.
pub fn set_rating_mpeg(path: &Path, stars: u8) -> Result<(), String> {
    use lofty::config::ParseOptions;
    use lofty::id3::v2::{Frame, Id3v2Tag, PopularimeterFrame};
    use lofty::mpeg::MpegFile;
    let stars = stars.min(5);
    let mut f = fs::File::open(path).map_err(|e| format!("Cannot open the file: {e}"))?;
    let mut file = MpegFile::read_from(&mut f, ParseOptions::new()).map_err(|e| format!("Cannot read the file: {e}"))?;
    drop(f);
    if file.id3v2().is_none() {
        if stars == 0 { return Ok(()); }
        file.set_id3v2(Id3v2Tag::new());
    }
    let tag = file.id3v2_mut().ok_or_else(|| "This file has no ID3v2 tag".to_string())?;
    let existing: Vec<PopularimeterFrame<'static>> = (&*tag).into_iter().filter_map(|fr| match fr { Frame::Popularimeter(p) => Some(p.clone()), _ => None }).collect();
    let refs: Vec<&PopularimeterFrame<'_>> = existing.iter().collect();
    match preferred_popm(&refs) {
        Some(i) => {
            let mut p = existing[i].clone();
            p.rating = popm_from_stars(stars);
            tag.insert(Frame::Popularimeter(p));
        }
        None if stars == 0 => return Ok(()),
        None => {
            tag.insert(Frame::Popularimeter(PopularimeterFrame::new(WMP_EMAIL.to_string(), popm_from_stars(stars), 0)));
        }
    }
    use lofty::file::AudioFile as _;
    file.save_to_path(path, WriteOptions::default()).map_err(|e| format!("Writing the rating failed: {e}"))
}

fn temp_path_for(path: &Path) -> PathBuf {
    let name = path.file_name().map(|n| n.to_string_lossy().to_string()).unwrap_or_else(|| "track".into());
    path.with_file_name(format!(".{name}.melo-tag.tmp"))
}

/// Writes the parsed (and edited) tags to `path` via a temp copy + rename.
/// The original is untouched unless every step succeeded.
pub fn write_safely(path: &Path, tagged: &TaggedFile) -> Result<(), String> {
    write_safely_rated(path, tagged, None)
}

/// Like `write_safely`; `mp3_rating` is applied to the temp copy of an MP3
/// before it replaces the original (one atomic replace).
pub fn write_safely_rated(path: &Path, tagged: &TaggedFile, mp3_rating: Option<u8>) -> Result<(), String> {
    let meta = fs::metadata(path).map_err(|e| format!("Cannot open the file: {e}"))?;
    if meta.permissions().readonly() {
        return Err("The file is read-only".into());
    }
    let tmp = temp_path_for(path);
    let _ = fs::remove_file(&tmp);
    fs::copy(path, &tmp).map_err(|e| format!("Cannot create a temporary copy (disk full or folder read-only?): {e}"))?;
    let cleanup = |msg: String| {
        let _ = fs::remove_file(&tmp);
        Err(msg)
    };
    if let Err(e) = tagged.save_to_path(&tmp, WriteOptions::default()) {
        return cleanup(format!("Writing the tags failed: {e}"));
    }
    if let (Some(stars), true) = (mp3_rating, is_mpeg(tagged)) {
        if let Err(e) = set_rating_mpeg(&tmp, stars) {
            return cleanup(e);
        }
    }
    // Flush the copy to disk before it replaces the original.
    match fs::OpenOptions::new().write(true).open(&tmp) {
        Ok(f) => {
            if let Err(e) = f.sync_all() {
                return cleanup(format!("Flushing the temporary copy failed: {e}"));
            }
        }
        Err(e) => return cleanup(format!("Cannot reopen the temporary copy: {e}")),
    }
    if let Err(e) = fs::rename(&tmp, path) {
        return cleanup(format!("Cannot replace the file — is it open in another program or being played? ({e})"));
    }
    Ok(())
}

/// What every selected file has in common: a field is `Some(value)` when all
/// files agree, `None` ("mixed") when they differ.
#[derive(Debug, Clone, Default, PartialEq, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct CommonFields {
    pub title: Option<String>,
    pub artist: Option<String>,
    pub album_artist: Option<String>,
    pub album: Option<String>,
    pub genre: Option<String>,
    pub composer: Option<String>,
    pub comment: Option<String>,
    pub year: Option<u32>,
    pub track: Option<u32>,
    pub track_total: Option<u32>,
    pub disc: Option<u32>,
    pub disc_total: Option<u32>,
    /// true = every file has a cover, false = none has, None = mixed.
    pub has_cover: Option<bool>,
    pub rating: Option<u8>,
}

fn common<T: PartialEq + Clone>(values: impl Iterator<Item = T>) -> Option<T> {
    let mut it = values;
    let first = it.next()?;
    if it.all(|v| v == first) { Some(first) } else { None }
}

pub fn common_fields(all: &[TagFields]) -> CommonFields {
    CommonFields {
        title: common(all.iter().map(|f| f.title.clone())),
        artist: common(all.iter().map(|f| f.artist.clone())),
        album_artist: common(all.iter().map(|f| f.album_artist.clone())),
        album: common(all.iter().map(|f| f.album.clone())),
        genre: common(all.iter().map(|f| f.genre.clone())),
        composer: common(all.iter().map(|f| f.composer.clone())),
        comment: common(all.iter().map(|f| f.comment.clone())),
        year: common(all.iter().map(|f| f.year)),
        track: common(all.iter().map(|f| f.track)),
        track_total: common(all.iter().map(|f| f.track_total)),
        disc: common(all.iter().map(|f| f.disc)),
        disc_total: common(all.iter().map(|f| f.disc_total)),
        has_cover: common(all.iter().map(|f| f.has_cover)),
        rating: common(all.iter().map(|f| f.rating)),
    }
}
