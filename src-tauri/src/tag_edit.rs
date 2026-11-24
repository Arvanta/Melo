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
use lofty::tag::{Accessor, ItemKey, Tag};
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
    }
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

fn temp_path_for(path: &Path) -> PathBuf {
    let name = path.file_name().map(|n| n.to_string_lossy().to_string()).unwrap_or_else(|| "track".into());
    path.with_file_name(format!(".{name}.melo-tag.tmp"))
}

/// Writes the parsed (and edited) tags to `path` via a temp copy + rename.
/// The original is untouched unless every step succeeded.
pub fn write_safely(path: &Path, tagged: &TaggedFile) -> Result<(), String> {
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
    }
}
