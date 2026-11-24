# tag_edit round-trip tests (round 119)

Standalone crate that compiles `src-tauri/src/tag_edit.rs` against lofty 0.22.4
and round-trips real mp3 / flac / ogg / m4a fixtures (partial edits, cover
set/remove, safe write leaves the original intact on failure).

    cd tools/tag-edit-test && cargo test

Not part of the CI build; run it when `tag_edit.rs` changes.
