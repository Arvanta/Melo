//! File rename core (round 123): name validation and an all-or-nothing batch
//! rename with rollback. Pure std — no Tauri, no database — so it is unit
//! tested on its own. The database / lyrics-cache / UI sides live elsewhere.
//!
//! Scope: only the file NAME changes (stem), never the extension and never the
//! folder.

use std::fs;
use std::path::{Path, PathBuf};

/// Longest accepted file-name stem (characters).
pub const MAX_STEM_CHARS: usize = 200;
/// Windows' classic MAX_PATH; longer full paths are refused up front.
pub const MAX_PATH_CHARS: usize = 259;

const RESERVED: [&str; 22] = [
    "CON", "PRN", "AUX", "NUL", "COM1", "COM2", "COM3", "COM4", "COM5", "COM6", "COM7", "COM8", "COM9",
    "LPT1", "LPT2", "LPT3", "LPT4", "LPT5", "LPT6", "LPT7", "LPT8", "LPT9",
];

/// Returns the cleaned stem (trimmed) or the reason it cannot be used.
pub fn validate_stem(stem: &str) -> Result<String, String> {
    let s = stem.trim();
    if s.is_empty() {
        return Err("The file name is empty".into());
    }
    if s.chars().count() > MAX_STEM_CHARS {
        return Err(format!("The file name is longer than {MAX_STEM_CHARS} characters"));
    }
    if let Some(c) = s.chars().find(|c| matches!(c, '<' | '>' | ':' | '"' | '/' | '\\' | '|' | '?' | '*') || (*c as u32) < 0x20) {
        let shown = if (c as u32) < 0x20 { "a control character".to_string() } else { format!("\"{c}\"") };
        return Err(format!("A file name cannot contain {shown}"));
    }
    if s.ends_with('.') || s.ends_with(' ') {
        return Err("A file name cannot end with a dot or a space".into());
    }
    let first = s.split('.').next().unwrap_or("").trim_end().to_uppercase();
    if RESERVED.contains(&first.as_str()) {
        return Err(format!("\"{first}\" is a reserved name on Windows"));
    }
    Ok(s.to_string())
}

/// Same folder, new stem, original extension.
pub fn target_for(old: &Path, stem: &str) -> Result<PathBuf, String> {
    let clean = validate_stem(stem)?;
    let ext = old.extension().map(|e| e.to_string_lossy().to_string());
    let name = match ext {
        Some(e) if !e.is_empty() => format!("{clean}.{e}"),
        _ => clean,
    };
    let target = old.with_file_name(name);
    if target.to_string_lossy().chars().count() > MAX_PATH_CHARS {
        return Err("The full path would be too long".into());
    }
    Ok(target)
}

#[derive(Debug, Clone)]
pub struct RenamePair {
    pub from: PathBuf,
    pub to: PathBuf,
}

fn lower(p: &Path) -> String {
    p.to_string_lossy().to_lowercase()
}

/// A rename that only changes letter case (`a.mp3` -> `A.mp3`) is the same file
/// on Windows' case-insensitive file system, so "target exists" must not block it.
fn case_only(from: &Path, to: &Path) -> bool {
    cfg!(windows) && from != to && lower(from) == lower(to)
}

/// Checks every pair, then performs all renames. If one fails, the ones
/// already done are renamed back; the error says what happened.
pub fn apply_renames(pairs: &[RenamePair]) -> Result<(), String> {
    for (i, p) in pairs.iter().enumerate() {
        if !p.from.exists() {
            return Err(format!("\"{}\" no longer exists", name_of(&p.from)));
        }
        if p.from == p.to {
            continue;
        }
        for (j, q) in pairs.iter().enumerate() {
            if i == j { continue; }
            if lower(&p.to) == lower(&q.to) {
                return Err(format!("Two files would both be named \"{}\"", name_of(&p.to)));
            }
            if lower(&p.to) == lower(&q.from) && p.from != p.to {
                return Err(format!("\"{}\" is the current name of another file in this batch", name_of(&p.to)));
            }
        }
        if p.to.exists() && !case_only(&p.from, &p.to) {
            return Err(format!("A file named \"{}\" already exists in that folder", name_of(&p.to)));
        }
    }
    let mut done: Vec<&RenamePair> = Vec::new();
    for p in pairs {
        if p.from == p.to { continue; }
        if let Err(e) = fs::rename(&p.from, &p.to) {
            let mut rollback_failed = false;
            for d in done.iter().rev() {
                if fs::rename(&d.to, &d.from).is_err() { rollback_failed = true; }
            }
            let hint = "is it open in another program or being played?";
            return Err(if rollback_failed {
                format!("Could not rename \"{}\" ({hint}: {e}) and some earlier renames could not be undone", name_of(&p.from))
            } else {
                format!("Could not rename \"{}\" — {hint} ({e})", name_of(&p.from))
            });
        }
        done.push(p);
    }
    Ok(())
}

/// Undo of a successful `apply_renames` (used when a later step fails).
pub fn undo_renames(pairs: &[RenamePair]) {
    for p in pairs.iter().rev() {
        if p.from != p.to {
            let _ = fs::rename(&p.to, &p.from);
        }
    }
}

fn name_of(p: &Path) -> String {
    p.file_name().map(|n| n.to_string_lossy().to_string()).unwrap_or_else(|| p.to_string_lossy().to_string())
}

#[cfg(test)]
mod tests {
    use super::*;
    use std::sync::atomic::{AtomicUsize, Ordering};

    static N: AtomicUsize = AtomicUsize::new(0);
    fn tmpdir() -> PathBuf {
        let d = std::env::temp_dir().join(format!("melo-rename-test-{}-{}", std::process::id(), N.fetch_add(1, Ordering::SeqCst)));
        let _ = fs::remove_dir_all(&d);
        fs::create_dir_all(&d).unwrap();
        d
    }

    #[test]
    fn stem_rules() {
        assert_eq!(validate_stem("  01 - Hello  ").unwrap(), "01 - Hello");
        assert_eq!(validate_stem("سلام دنیا").unwrap(), "سلام دنیا");
        assert!(validate_stem("").is_err());
        assert!(validate_stem("   ").is_err());
        for bad in ["a/b", "a\\b", "a:b", "a*b", "a?b", "a\"b", "a<b", "a>b", "a|b", "a\u{1}b"] {
            assert!(validate_stem(bad).is_err(), "{bad}");
        }
        assert!(validate_stem("name.").is_err());
        assert!(validate_stem("CON").is_err());
        assert!(validate_stem("nul.txt").is_err());
        assert!(validate_stem("com1").is_err());
        assert!(validate_stem("console").is_ok());
        assert!(validate_stem(&"a".repeat(201)).is_err());
        assert!(validate_stem(&"a".repeat(200)).is_ok());
    }

    #[test]
    fn target_keeps_folder_and_extension() {
        let t = target_for(Path::new("/m/Artist/old name.MP3"), "New Name").unwrap();
        assert_eq!(t, PathBuf::from("/m/Artist/New Name.MP3"));
        assert!(target_for(Path::new("/m/a.mp3"), "x/y").is_err());
        let long = format!("/{}/a.mp3", "d".repeat(260));
        assert!(target_for(Path::new(&long), "new").is_err());
    }

    #[test]
    fn renames_files_and_sidecars_together() {
        let d = tmpdir();
        fs::write(d.join("a.mp3"), b"1").unwrap();
        fs::write(d.join("a.lrc"), b"2").unwrap();
        let pairs = vec![
            RenamePair { from: d.join("a.mp3"), to: d.join("b.mp3") },
            RenamePair { from: d.join("a.lrc"), to: d.join("b.lrc") },
        ];
        apply_renames(&pairs).unwrap();
        assert!(d.join("b.mp3").exists() && d.join("b.lrc").exists());
        assert!(!d.join("a.mp3").exists() && !d.join("a.lrc").exists());
        undo_renames(&pairs);
        assert!(d.join("a.mp3").exists() && d.join("a.lrc").exists());
        let _ = fs::remove_dir_all(&d);
    }

    #[test]
    fn refuses_existing_target_duplicates_and_chains_without_touching_anything() {
        let d = tmpdir();
        for n in ["a.mp3", "b.mp3", "c.mp3"] {
            fs::write(d.join(n), n.as_bytes()).unwrap();
        }
        // target already exists
        let e = apply_renames(&[RenamePair { from: d.join("a.mp3"), to: d.join("b.mp3") }]).unwrap_err();
        assert!(e.contains("already exists"), "{e}");
        // two files, one name
        let e = apply_renames(&[
            RenamePair { from: d.join("a.mp3"), to: d.join("x.mp3") },
            RenamePair { from: d.join("b.mp3"), to: d.join("X.mp3") },
        ]).unwrap_err();
        assert!(e.contains("Two files"), "{e}");
        // chain a -> b while b -> c
        let e = apply_renames(&[
            RenamePair { from: d.join("a.mp3"), to: d.join("b.mp3") },
            RenamePair { from: d.join("b.mp3"), to: d.join("c2.mp3") },
        ]).unwrap_err();
        assert!(e.contains("another file"), "{e}");
        for n in ["a.mp3", "b.mp3", "c.mp3"] {
            assert_eq!(fs::read(d.join(n)).unwrap(), n.as_bytes());
        }
        assert!(!d.join("x.mp3").exists() && !d.join("c2.mp3").exists());
        let _ = fs::remove_dir_all(&d);
    }

    #[test]
    fn a_failure_in_the_middle_rolls_everything_back() {
        let d = tmpdir();
        fs::write(d.join("a.mp3"), b"a").unwrap();
        fs::write(d.join("b.mp3"), b"b").unwrap();
        // the second target lives in a folder that does not exist -> rename fails
        let pairs = vec![
            RenamePair { from: d.join("a.mp3"), to: d.join("a2.mp3") },
            RenamePair { from: d.join("b.mp3"), to: d.join("missing-dir").join("b2.mp3") },
        ];
        assert!(apply_renames(&pairs).is_err());
        assert!(d.join("a.mp3").exists(), "first rename was not rolled back");
        assert!(!d.join("a2.mp3").exists());
        assert!(d.join("b.mp3").exists());
        let _ = fs::remove_dir_all(&d);
    }
}
