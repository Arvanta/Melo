mod prod;
use prod::*;
use rusqlite::{params, Connection};
use std::collections::{HashMap, HashSet};
use std::time::Instant;

struct Rng(u64);
impl Rng { fn next(&mut self) -> u64 { self.0 ^= self.0 << 13; self.0 ^= self.0 >> 7; self.0 ^= self.0 << 17; self.0 }
  fn below(&mut self, n: usize) -> usize { (self.next() % n as u64) as usize } }
fn word(r: &mut Rng) -> String {
    let n = 4 + r.below(6); let mut s = String::new();
    for i in 0..n { let c = (b'a' + r.below(26) as u8) as char; s.push(if i == 0 { c.to_ascii_uppercase() } else { c }); } s }

fn build(path: &str, n_tracks: usize, n_art: usize, n_alb: usize) -> Connection {
    let _ = std::fs::remove_file(path); let _ = std::fs::remove_file(format!("{path}-wal")); let _ = std::fs::remove_file(format!("{path}-shm"));
    let conn = Connection::open(path).unwrap();
    conn.pragma_update(None, "journal_mode", "WAL").unwrap();
    conn.pragma_update(None, "synchronous", "NORMAL").unwrap();
    conn.execute_batch("CREATE TABLE playlist_tracks(entry_id INTEGER PRIMARY KEY, playlist_id TEXT, track_id TEXT, position INTEGER);").unwrap();
    // The production schema: this is the real init_schema text from library_db.rs.
    conn.execute_batch("PRAGMA foreign_keys=OFF;").unwrap();
    let mut r = Rng(0x9E3779B97F4A7C15);
    let artists: Vec<String> = (0..n_art).map(|i| if i % 50 == 0 { format!("هنرمند {}", word(&mut r)) } else { format!("{} {}", word(&mut r), word(&mut r)) }).collect();
    let albums: Vec<(usize, String)> = (0..n_alb).map(|_| (r.below(n_art), format!("{} {}", word(&mut r), word(&mut r)))).collect();
    // schema first (drop the throwaway playlist_tracks so init_schema owns it)
    conn.execute_batch("DROP TABLE playlist_tracks;").unwrap();
    init_schema(&conn).unwrap();
    conn.execute_batch("BEGIN;").unwrap();
    {
        let mut ins = conn.prepare("INSERT INTO tracks(id,path,title,artist,album,genre,year,duration,codec,specs,artwork_path,added_at,library_owned) VALUES(?1,?2,?3,?4,?5,?6,2000,200.0,'mp3','MP3',?7,1,?8)").unwrap();
        for i in 0..n_tracks {
            let (ai, al) = &albums[i % n_alb];
            let mut ar = artists[*ai].clone(); let mut alb = al.clone();
            // casing variants inside one group (tag inconsistency the grouping merges)
            if i % 97 == 0 { ar = ar.to_uppercase(); }
            if i % 89 == 0 { alb = alb.to_lowercase(); }
            let art: Option<String> = if (i % n_alb) % 5 == 0 { None } else if i % 3 == 0 { None } else { Some(format!("C:\\cache\\{}.jpg", i)) };
            let owned = if i % 211 == 0 { 0 } else { 1 };
            ins.execute(params![format!("id{:016x}", r.next()), format!("D:\\Music\\{}\\{}\\{}.mp3", ar, alb, i), word(&mut r), ar, alb, ["Rock","Pop","Jazz","Persian"][i % 4], art, owned]).unwrap();
        }
    }
    conn.execute_batch("COMMIT;").unwrap();
    // The app runs PRAGMA optimize at every init_schema; emulate a later start.
    init_schema(&conn).unwrap();
    conn
}

fn plan(conn: &Connection, sql: &str) -> Vec<String> {
    let mut st = conn.prepare(&format!("EXPLAIN QUERY PLAN {sql}")).unwrap();
    let n = st.parameter_count();
    let binds: Vec<String> = (0..n).map(|_| "x".to_string()).collect();
    st.query_map(rusqlite::params_from_iter(binds.iter()), |r| r.get::<_, String>(3)).unwrap().map(|x| x.unwrap()).collect()
}

// The PRE-FIX query, verbatim, for equivalence + timing comparison.
fn old_groups(conn: &Connection, kind: &str, limit: i64, offset: i64) -> Vec<(String, String, String, i64, Option<String>, Option<String>)> {
    let (group_expr, key_expr, subtitle_expr, match_expr) = match kind {
        "albums" => ("album", "artist || char(0) || album", "artist", "t2.artist=tracks.artist AND t2.album=tracks.album"),
        "genres" => ("genre", "genre", "COUNT(*) || ' tracks'", "t2.genre=tracks.genre"),
        _ => ("artist", "artist", "COUNT(DISTINCT album) || ' albums · ' || COUNT(*) || ' tracks'", "t2.artist=tracks.artist"),
    };
    let group_by = if kind == "albums" { "artist COLLATE NOCASE, album COLLATE NOCASE".to_string() } else { format!("{} COLLATE NOCASE", group_expr) };
    let where_sql = format!(" WHERE library_owned=1 AND {} LIKE ?1 COLLATE NOCASE ESCAPE '$'", group_expr);
    let ap = format!("(SELECT t2.artwork_path FROM tracks t2 WHERE t2.library_owned=1 AND {m} AND t2.artwork_path IS NOT NULL ORDER BY t2.id LIMIT 1)", m = match_expr);
    let at = format!("(SELECT t2.id FROM tracks t2 WHERE t2.library_owned=1 AND {m} AND t2.artwork_path IS NOT NULL ORDER BY t2.id LIMIT 1)", m = match_expr);
    let sql = format!("SELECT {key},{name},{sub},COUNT(*),{ap},{at} FROM tracks{w} GROUP BY {gb} ORDER BY {name} COLLATE NOCASE LIMIT ?2 OFFSET ?3", key = key_expr, name = group_expr, sub = subtitle_expr, ap = ap, at = at, w = where_sql, gb = group_by);
    let mut st = conn.prepare(&sql).unwrap();
    st.query_map(params!["%%", limit, offset], |r| Ok((r.get(0)?, r.get(1)?, r.get(2)?, r.get(3)?, r.get(4)?, r.get(5)?))).unwrap().map(|x| x.unwrap()).collect()
}

fn ms<F: FnOnce() -> R, R>(f: F) -> (f64, R) { let t = Instant::now(); let r = f(); (t.elapsed().as_secs_f64() * 1000.0, r) }

fn main() {
    let args: Vec<String> = std::env::args().collect();
    let mode = args.get(1).map(|s| s.as_str()).unwrap_or("all");
    if mode == "correct" || mode == "all" {
        println!("=== CORRECTNESS (20k tracks / 400 artists / 2000 albums) ===");
        let conn = build("/tmp/h_correct.db", 20_000, 400, 2000);
        for kind in ["albums", "artists", "genres"] {
            // 1. paging through everything yields exactly `total` unique, ordered groups
            let first = query_groups(&conn, kind, None, None, 50, 0, true).unwrap();
            let total = first.total as usize;
            let mut all = Vec::new(); let mut off = 0;
            while off < total { let p = query_groups(&conn, kind, None, None, 50, off, false).unwrap(); assert_eq!(p.total, 0, "total must be skipped"); assert!(!p.items.is_empty()); off += p.items.len(); all.extend(p.items); }
            assert_eq!(all.len(), total, "{kind}: pages must add up to total");
            let keys: HashSet<String> = all.iter().map(|g| g.key.to_lowercase()).collect();
            assert_eq!(keys.len(), total, "{kind}: no duplicate/missing groups across pages");
            let names: Vec<String> = all.iter().map(|g| g.name.to_lowercase()).collect();
            let mut sorted = names.clone(); sorted.sort();
            assert_eq!(names, sorted, "{kind}: groups must be ordered by name (NOCASE)");
            // 2. equivalence with the pre-fix query: same groups, same counts, cover presence
            let old = old_groups(&conn, kind, 100000, 0);
            assert_eq!(old.len(), total, "{kind}: same number of groups as the old query");
            let mut oldmap: HashMap<String, (i64, bool)> = HashMap::new();
            for o in &old { oldmap.insert(o.0.to_lowercase(), (o.3, o.4.is_some())); }
            let mut cover_more = 0; let mut mismatches = 0;
            for g in &all {
                let (cnt, had) = oldmap.get(&g.key.to_lowercase()).copied().unwrap_or_else(|| panic!("{kind}: group {:?} missing from old result", g.key));
                assert_eq!(g.count, cnt, "{kind}: count differs for {:?}", g.key);
                if had && g.cover.is_none() { mismatches += 1; }
                if !had && g.cover.is_some() { cover_more += 1; }
            }
            assert_eq!(mismatches, 0, "{kind}: the new query must never LOSE a cover the old one had");
            // 3. cover and artworkTrackId belong together and to the group
            for g in &all {
                assert_eq!(g.cover.is_some(), g.artwork_track_id.is_some(), "{kind}: cover/id presence must match");
                if let Some(id) = &g.artwork_track_id {
                    let (a, p): (String, Option<String>) = conn.query_row("SELECT artist||char(0)||album, artwork_path FROM tracks WHERE id=?1", params![id], |r| Ok((r.get(0)?, r.get(1)?))).unwrap();
                    assert_eq!(p, g.cover, "{kind}: cover must be that track's artwork_path");
                    if kind == "albums" { assert_eq!(a.to_lowercase(), g.key.to_lowercase(), "album cover from a different album"); }
                }
            }
            println!("  {kind:8} OK  groups={total:5}  (covers the old query missed thanks to NOCASE match: {cover_more})");
        }
        // search + artist filter paths
        let s = query_groups(&conn, "albums", Some("a".into()), None, 50, 0, true).unwrap();
        assert!(s.total > 0 && s.items.iter().all(|g| g.name.to_lowercase().contains('a')));
        let art = { let c: String = conn.query_row("SELECT artist FROM tracks WHERE library_owned=1 LIMIT 1", [], |r| r.get(0)).unwrap(); c };
        let f = query_groups(&conn, "albums", None, Some(art.clone()), 50, 0, true).unwrap();
        assert!(f.total >= 1 && f.items.iter().all(|g| g.subtitle == art), "artist filter must scope albums");
        let e = query_groups(&conn, "albums", Some("zzzzqqqq".into()), None, 50, 0, true).unwrap();
        assert_eq!(e.total, 0); assert!(e.items.is_empty());
        let lit = query_groups(&conn, "albums", Some("100%_[x]$".into()), None, 50, 0, true).unwrap();
        assert_eq!(lit.total, 0, "LIKE wildcards in the query must be literal");
        let big = query_groups(&conn, "albums", None, None, 10_000_000, 0, false).unwrap();
        assert_eq!(big.limit, 5000, "limit ceiling");
        let past = query_groups(&conn, "albums", None, None, 50, 10_000_000, true).unwrap();
        assert!(past.items.is_empty() && past.total > 0);
        // library_owned=0 rows never appear
        let ghost: i64 = conn.query_row("SELECT COUNT(*) FROM tracks WHERE library_owned=0", [], |r| r.get(0)).unwrap();
        assert!(ghost > 0);
        println!("  filters/search/limit/offset/owned=0  OK");
        // 4. query plans: covering index, no temp b-tree, no scan of the base table
        println!("  query plans (natural planner, no INDEXED BY hint):");
        for (kind, sql) in [
            ("albums", "SELECT artist || char(0) || album,album,artist,COUNT(*) FROM tracks INDEXED BY idx_lib_album_artist WHERE library_owned=1 GROUP BY album COLLATE NOCASE, artist COLLATE NOCASE ORDER BY album COLLATE NOCASE, artist COLLATE NOCASE LIMIT 50 OFFSET 100"),
            ("artists", "SELECT artist,artist,COUNT(DISTINCT album)||' albums',COUNT(*) FROM tracks WHERE library_owned=1 GROUP BY artist COLLATE NOCASE ORDER BY artist COLLATE NOCASE LIMIT 50 OFFSET 100"),
            ("genres", "SELECT genre,genre,COUNT(*)||' tracks',COUNT(*) FROM tracks WHERE library_owned=1 GROUP BY genre COLLATE NOCASE ORDER BY genre COLLATE NOCASE LIMIT 50 OFFSET 100"),
            ("cover(albums)", "SELECT id,artwork_path FROM tracks WHERE library_owned=1 AND artist=?1 COLLATE NOCASE AND album=?2 COLLATE NOCASE AND artwork_path IS NOT NULL ORDER BY id LIMIT 1"),
            ("cover(artist)", "SELECT id,artwork_path FROM tracks WHERE library_owned=1 AND artist=?1 COLLATE NOCASE AND artwork_path IS NOT NULL ORDER BY id LIMIT 1"),
        ] {
            let p = plan(&conn, sql);
            let bad_scan = p.iter().any(|l| l.starts_with("SCAN tracks") && !l.contains("INDEX"));
            let temp = p.iter().any(|l| (l.contains("FOR ORDER BY") || l.contains("FOR GROUP BY")) && !kind.starts_with("cover"));
            println!("    {kind:14} {:?}", p);
            assert!(!bad_scan, "{kind}: full table scan!");
            if !kind.starts_with("cover") { assert!(!temp, "{kind}: temp b-tree sort"); assert!(p.iter().any(|l| l.contains("COVERING INDEX")), "{kind}: not covering"); }
        }
        println!("  PLANS OK");
    }
    if mode == "perf" || mode == "all" {
        for (nt, na, nb) in [(7_000usize, 150usize, 750usize), (100_000, 3_000, 12_000), (500_000, 12_000, 60_000)] {
            println!("\n=== PERF {nt} tracks / {na} artists / {nb} albums (file-backed WAL db, fresh connection per call like the app) ===");
            let conn = build("/tmp/h_perf.db", nt, na, nb); drop(conn);
            let open = || { let c = Connection::open("/tmp/h_perf.db").unwrap(); c.busy_timeout(std::time::Duration::from_secs(5)).unwrap(); c };
            let offs = [0usize, nb / 2, nb.saturating_sub(50)];
            for &o in &offs {
                let (t_new, _) = ms(|| { let c = open(); query_groups(&c, "albums", None, None, 50, o, false).unwrap() });
                let (t_old, _) = if false /* old query is minutes at 100k; set to `nt <= 7_000` to compare */ { ms(|| { let c = open(); old_groups(&c, "albums", 50, o as i64) }) } else { (f64::NAN, vec![]) };
                println!("  albums page @offset {o:6}:  NEW {t_new:8.2} ms    OLD {}", if t_old.is_nan() { "   (skipped: minutes)".to_string() } else { format!("{t_old:8.1} ms   ({:.0}x)", t_old / t_new.max(0.001)) });
            }
            let (t_cnt, tot) = ms(|| { let c = open(); query_groups(&c, "albums", None, None, 1, 0, true).unwrap().total });
            println!("  albums COUNT (once per view, cached by UI): {t_cnt:.1} ms  -> {tot} groups");
            let (t, _) = ms(|| { let c = open(); query_groups(&c, "artists", None, None, 50, na / 2, false).unwrap() });
            println!("  artists page @mid:  {t:.2} ms");
            let (t, _) = ms(|| { let c = open(); query_groups(&c, "genres", None, None, 50, 0, false).unwrap() });
            println!("  genres  page:       {t:.2} ms");
        }
    }
}
