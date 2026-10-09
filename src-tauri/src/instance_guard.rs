// Cold-start guard that runs BEFORE tauri-plugin-single-instance.
//
// Explorer starts one melo.exe per selected file (unless the verb declares
// MultiSelectModel=Player). The plugin decides "am I the primary?" with a
// named mutex and then looks up the primary's hidden message window to
// forward argv to it. Its Windows implementation has a gap: the mutex is
// created first and the window slightly later, and a process that sees the
// mutex but finds NO window silently carries on as a second full primary
// (second main window, second tray icon, one file each). With ~20 processes
// launching at once on a cold system that gap is hit regularly.
//
// This guard closes the gap with a second named mutex ("boot") that only
// decides who is first. The first process returns immediately and keeps the
// mutex for its whole lifetime (the handle is intentionally never closed).
// Every later process waits here until the primary's single-instance window
// exists, THEN continues into the plugin, which finds the window, forwards
// argv and exits. If the owner dies while we wait, the mutex is abandoned,
// we take it over and continue as the new primary.
//
// The class/window names are the plugin's own: "<identifier>-sic" and
// "<identifier>-siw" (no semver feature is enabled on the plugin). The
// identifier below must equal tauri.conf.json "identifier" (pinned by a test).

#[cfg(windows)]
mod imp {
    use std::ffi::c_void;
    use std::time::{Duration, Instant};

    type Handle = *mut c_void;

    const IDENTIFIER: &str = "com.melo.app";
    const ERROR_ALREADY_EXISTS: u32 = 183;
    const WAIT_OBJECT_0: u32 = 0;
    const WAIT_ABANDONED: u32 = 0x80;
    const MAX_WAIT: Duration = Duration::from_secs(30);
    const POLL: Duration = Duration::from_millis(15);

    #[link(name = "kernel32")]
    extern "system" {
        fn CreateMutexW(attrs: *const c_void, initial_owner: i32, name: *const u16) -> Handle;
        fn GetLastError() -> u32;
        fn WaitForSingleObject(handle: Handle, millis: u32) -> u32;
    }

    #[link(name = "user32")]
    extern "system" {
        fn FindWindowW(class_name: *const u16, window_name: *const u16) -> Handle;
    }

    fn wide(s: &str) -> Vec<u16> {
        s.encode_utf16().chain(std::iter::once(0)).collect()
    }

    pub fn wait_for_primary_if_booting() {
        let boot_name = wide(&format!("{IDENTIFIER}-boot"));
        let class_name = wide(&format!("{IDENTIFIER}-sic"));
        let window_name = wide(&format!("{IDENTIFIER}-siw"));
        unsafe {
            let boot = CreateMutexW(std::ptr::null(), 1, boot_name.as_ptr());
            if boot.is_null() {
                return;
            }
            if GetLastError() != ERROR_ALREADY_EXISTS {
                return;
            }
            let deadline = Instant::now() + MAX_WAIT;
            loop {
                if !FindWindowW(class_name.as_ptr(), window_name.as_ptr()).is_null() {
                    return;
                }
                let state = WaitForSingleObject(boot, 0);
                if state == WAIT_OBJECT_0 || state == WAIT_ABANDONED {
                    return;
                }
                if Instant::now() >= deadline {
                    return;
                }
                std::thread::sleep(POLL);
            }
        }
    }
}

#[cfg(windows)]
pub use imp::wait_for_primary_if_booting;

#[cfg(not(windows))]
pub fn wait_for_primary_if_booting() {}
