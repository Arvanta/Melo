use lofty::file::{AudioFile, TaggedFileExt};
use lofty::probe::Probe;
use std::fs;
use std::path::{Path, PathBuf};
use tagtest::tag_edit::*;

fn fixture(name: &str, tag: &str) -> PathBuf {
    let src = Path::new("fixtures").join(name);
    let dir = std::env::temp_dir().join(format!("melo-tagtest-{tag}"));
    fs::create_dir_all(&dir).unwrap();
    let dst = dir.join(name);
    fs::copy(src, &dst).unwrap();
    dst
}
fn parse(p: &Path) -> lofty::file::TaggedFile { Probe::open(p).unwrap().read().unwrap() }

fn edit_file(p: &Path, e: &TagEdit) -> Result<(), String> {
    let cover = match &e.cover { Some(CoverEdit::Set { path }) => Some(load_cover(Path::new(path))?), _ => None };
    let mut t = parse(p);
    apply_edit(&mut t, e, cover.as_ref())?;
    write_safely(p, &t)
}

#[test]
fn reads_original_fields() {
    for ext in ["mp3", "flac", "m4a", "ogg"] {
        let f = read_fields(&parse(&fixture(&format!("base.{ext}"), &format!("read-{ext}"))));
        assert_eq!(f.title, "Old Title", "{ext}");
        assert_eq!(f.artist, "Old Artist", "{ext}");
        assert_eq!(f.album, "Old Album", "{ext}");
        assert_eq!(f.genre, "Rock", "{ext}");
        assert_eq!(f.year, 1999, "{ext}");
        assert_eq!(f.track, 3, "{ext}");
        assert_eq!(f.track_total, 12, "{ext}");
        assert!(!f.has_cover, "{ext}");
    }
}

#[test]
fn partial_edit_changes_only_given_fields_incl_persian() {
    for ext in ["mp3", "flac", "m4a", "ogg"] {
        let p = fixture(&format!("base.{ext}"), &format!("edit-{ext}"));
        let e = TagEdit {
            title: Some("عنوان جدید ي ك".into()),
            album_artist: Some("Various".into()),
            composer: Some("J. S. Bach".into()),
            disc: Some(2), disc_total: Some(3), year: Some(2024),
            ..Default::default()
        };
        edit_file(&p, &e).unwrap();
        let f = read_fields(&parse(&p));
        assert_eq!(f.title, "عنوان جدید ي ك", "{ext}");
        assert_eq!(f.artist, "Old Artist", "{ext} untouched");
        assert_eq!(f.album, "Old Album", "{ext} untouched");
        assert_eq!(f.album_artist, "Various", "{ext}");
        assert_eq!(f.composer, "J. S. Bach", "{ext}");
        assert_eq!((f.disc, f.disc_total, f.year), (2, 3, 2024), "{ext}");
        assert_eq!((f.track, f.track_total), (3, 12), "{ext} untouched");
        assert!(!temp_exists(&p), "temp removed");
    }
}

fn temp_exists(p: &Path) -> bool {
    let name = p.file_name().unwrap().to_string_lossy().to_string();
    p.with_file_name(format!(".{name}.melo-tag.tmp")).exists()
}

#[test]
fn empty_string_and_zero_clear_fields() {
    let p = fixture("base.mp3", "clear");
    edit_file(&p, &TagEdit { genre: Some("".into()), year: Some(0), track_total: Some(0), ..Default::default() }).unwrap();
    let f = read_fields(&parse(&p));
    assert_eq!(f.genre, "");
    assert_eq!(f.year, 0);
    assert_eq!(f.track_total, 0);
    assert_eq!(f.track, 3);
}

#[test]
fn cover_set_png_jpeg_and_remove() {
    for ext in ["mp3", "flac", "m4a"] {
        let p = fixture(&format!("base.{ext}"), &format!("cover-{ext}"));
        edit_file(&p, &TagEdit { cover: Some(CoverEdit::Set { path: "fixtures/c.jpg".into() }), ..Default::default() }).unwrap();
        assert!(read_fields(&parse(&p)).has_cover, "{ext} jpeg");
        edit_file(&p, &TagEdit { cover: Some(CoverEdit::Set { path: "fixtures/c.png".into() }), ..Default::default() }).unwrap();
        let t = parse(&p);
        let pics = t.primary_tag().unwrap().pictures().len();
        assert_eq!(pics, 1, "{ext}: replace, not append");
        edit_file(&p, &TagEdit { cover: Some(CoverEdit::Remove), ..Default::default() }).unwrap();
        assert!(!read_fields(&parse(&p)).has_cover, "{ext} removed");
    }
}

#[test]
fn bad_cover_is_rejected_and_file_untouched() {
    let p = fixture("base.mp3", "badcover");
    let before = fs::read(&p).unwrap();
    fs::write("/tmp/not-an-image.txt", b"hello").unwrap();
    let r = edit_file(&p, &TagEdit { title: Some("X".into()), cover: Some(CoverEdit::Set { path: "/tmp/not-an-image.txt".into() }), ..Default::default() });
    assert!(r.is_err());
    assert_eq!(fs::read(&p).unwrap(), before, "original untouched");
}

#[test]
fn readonly_file_fails_cleanly() {
    let p = fixture("base.flac", "ro");
    let mut perm = fs::metadata(&p).unwrap().permissions();
    perm.set_readonly(true);
    fs::set_permissions(&p, perm).unwrap();
    let before = fs::read(&p).unwrap();
    // root ignores the read-only bit for writes, but our own check must trip first.
    let r = edit_file(&p, &TagEdit { title: Some("Nope".into()), ..Default::default() });
    assert!(r.unwrap_err().contains("read-only"));
    assert_eq!(fs::read(&p).unwrap(), before);
    assert!(!temp_exists(&p));
}

#[test]
fn audio_stream_is_preserved() {
    let p = fixture("base.mp3", "audio");
    let before = parse(&p).properties().duration();
    edit_file(&p, &TagEdit { title: Some("Same Audio".into()), cover: Some(CoverEdit::Set { path: "fixtures/c.jpg".into() }), ..Default::default() }).unwrap();
    let after = parse(&p).properties().duration();
    assert_eq!(before.as_millis() / 10, after.as_millis() / 10);
}

#[test]
fn common_fields_mark_mixed() {
    let a = fixture("base.mp3", "c1");
    let b = fixture("base.flac", "c2");
    edit_file(&b, &TagEdit { artist: Some("Other".into()), ..Default::default() }).unwrap();
    let all = vec![read_fields(&parse(&a)), read_fields(&parse(&b))];
    let c = common_fields(&all);
    assert_eq!(c.album.as_deref(), Some("Old Album"));
    assert_eq!(c.artist, None, "differs -> mixed");
    assert_eq!(c.has_cover, Some(false));
    assert!(TagEdit::default().is_empty());
}

// ───────── star rating (round 125) ─────────

fn rating_of(p: &Path) -> u8 { read_fields_at(p, &parse(p)).rating }
fn set_stars(p: &Path, n: u8) {
    let e = TagEdit { rating: Some(n), ..Default::default() };
    let mut t = parse(p);
    apply_edit(&mut t, &e, None).unwrap();
    write_safely_rated(p, &t, e.rating).unwrap();
}

#[test]
fn rating_roundtrips_in_every_format_and_keeps_other_fields() {
    for ext in ["mp3", "flac", "m4a", "ogg"] {
        let p = fixture(&format!("base.{ext}"), &format!("rate-{ext}"));
        assert_eq!(rating_of(&p), 0, "{ext}");
        for n in [4u8, 1, 5, 2, 3] {
            set_stars(&p, n);
            assert_eq!(rating_of(&p), n, "{ext} {n}");
        }
        let f = read_fields_at(&p, &parse(&p));
        assert_eq!(f.title, "Old Title", "{ext}");
        assert_eq!(f.album, "Old Album", "{ext}");
        assert_eq!(f.track, 3, "{ext}");
        set_stars(&p, 0);
        assert_eq!(rating_of(&p), 0, "{ext} cleared");
    }
}

#[test]
fn rating_edit_together_with_other_fields_in_one_write() {
    let p = fixture("base.mp3", "rate-combo");
    let e = TagEdit { rating: Some(4), title: Some("Combo".into()), ..Default::default() };
    let mut t = parse(&p);
    apply_edit(&mut t, &e, None).unwrap();
    write_safely_rated(&p, &t, e.rating).unwrap();
    let f = read_fields_at(&p, &parse(&p));
    assert_eq!((f.title.as_str(), f.rating), ("Combo", 4));
}

fn popm_frames(p: &Path) -> Vec<(String, u8, u64)> {
    use lofty::config::ParseOptions;
    use lofty::id3::v2::Frame;
    use lofty::mpeg::MpegFile;
    let mut f = fs::File::open(p).unwrap();
    let file = MpegFile::read_from(&mut f, ParseOptions::new()).unwrap();
    (&*file.id3v2().unwrap()).into_iter().filter_map(|fr| match fr { Frame::Popularimeter(x) => Some((x.email.clone(), x.rating, x.counter)), _ => None }).collect()
}

#[test]
fn id3_keeps_the_existing_popm_email_and_counter() {
    use lofty::config::{ParseOptions, WriteOptions};
    use lofty::id3::v2::{Frame, PopularimeterFrame};
    use lofty::mpeg::MpegFile;
    let p = fixture("base.mp3", "rate-popm");
    // 1. A frame like the one JRiver wrote: no email, rating 192, no counter.
    let mut f = fs::File::open(&p).unwrap();
    let mut file = MpegFile::read_from(&mut f, ParseOptions::new()).unwrap();
    drop(f);
    file.id3v2_mut().unwrap().insert(Frame::Popularimeter(PopularimeterFrame::new(String::new(), 192, 0)));
    file.save_to_path(&p, WriteOptions::default()).unwrap();
    assert_eq!(rating_of(&p), 4);
    set_stars(&p, 5);
    assert_eq!(popm_frames(&p), vec![(String::new(), 255, 0)]);
    // 2. A frame with an email and a counter keeps both.
    let mut f = fs::File::open(&p).unwrap();
    let mut file = MpegFile::read_from(&mut f, ParseOptions::new()).unwrap();
    drop(f);
    let tag = file.id3v2_mut().unwrap();
    tag.retain(|fr| !matches!(fr, Frame::Popularimeter(_)));
    tag.insert(Frame::Popularimeter(PopularimeterFrame::new("someone@example.com".into(), 255, 7)));
    file.save_to_path(&p, WriteOptions::default()).unwrap();
    assert_eq!(rating_of(&p), 5);
    set_stars(&p, 2);
    assert_eq!(popm_frames(&p), vec![("someone@example.com".to_string(), 64, 7)]);
    // 3. Clearing keeps the frame (rating byte 0) and reads as no rating.
    set_stars(&p, 0);
    assert_eq!(rating_of(&p), 0);
    assert_eq!(popm_frames(&p).len(), 1);
}

#[test]
fn a_new_id3_rating_uses_the_windows_media_player_email() {
    let p = fixture("base.mp3", "rate-new");
    set_stars(&p, 3);
    assert_eq!(popm_frames(&p), vec![("Windows Media Player 9 Series".to_string(), 128, 0)]);
}

#[test]
fn star_mapping_ranges_and_text_scales() {
    assert_eq!([0u8, 1, 31, 32, 95, 96, 159, 160, 192, 223, 224, 255].map(stars_from_popm), [0, 1, 1, 2, 2, 3, 3, 4, 4, 4, 5, 5]);
    for s in 0..=5u8 { assert_eq!(stars_from_popm(popm_from_stars(s)), s); }
}
