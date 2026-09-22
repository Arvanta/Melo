# groups-bench

Real-SQLite regression harness for `query_groups` (Library Artists/Albums/Genres paging).
It extracts the production functions verbatim from `src-tauri/src/library_db.rs` and runs them
on generated libraries (correctness vs the pre-fix query, query plans, timings).

    cd tools/groups-bench
    python3 extract.py        # writes src/prod.rs from library_db.rs
    cargo run --release -- correct   # equivalence + plan assertions (seconds)
    cargo run --release -- perf      # 7k / 100k / 500k tracks

Not part of CI or the app build.
