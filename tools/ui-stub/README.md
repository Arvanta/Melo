# UI stub harness (dev-only, NOT part of the app build)

Headless-Chromium verification of the Library / Playlist / Settings windows *without*
Tauri or Windows. `stub.js` installs a fake `window.__TAURI_INTERNALS__` backed by a
small fake library (4 albums, 16 tracks with play counts, the three auto-playlists),
so the real `library.ts` / `playlist` / settings code renders against it.

Run against a built bundle (`npx vite build` first):

    node tools/ui-stub/tiles-shot.mjs dist /tmp/tiles.png     # Library tiles, measured clip
    node tools/ui-stub/compose.mjs sheet dist /tmp/sheet.png   # album sheet (drills into an album)
    node tools/ui-stub/compose.mjs mostplayed dist /tmp/mp.png # playlist window w/ plays badges
    node tools/ui-stub/compose.mjs settings dist /tmp/set.png  # settings → appearance tab

Requires `puppeteer` (install ad-hoc in a scratch dir and point NODE_PATH at it; it is
deliberately NOT a project dependency). The views force the app's own localStorage keys
(`melo-lib-view`, `melo-lib-layout`, `melo-library-navigation`, `melo-currentPlaylist`)
and reveal one `.float-win` at a time. Added round 73.
