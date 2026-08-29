; Melo installer hooks (NSIS)
;
; Purpose: fix Windows Explorer's default "Open with" behaviour for
; multi-file selections.
;
; By default, when a user selects several files of a registered type and
; chooses "Open with > Melo", Windows Explorer launches the target EXE
; ONCE PER SELECTED FILE (N separate processes, each given a single file
; path) UNLESS the file type's registered class declares
; "MultiSelectModel"="Player" under its \shell key. Tauri's built-in
; `bundle.fileAssociations` config (tauri.conf.json) does not set this
; value.
;
; Without this hook: selecting 3 audio files and choosing "Open with >
; Melo" spawns Melo 3 times, each with a single file path. Melo's single-
; instance plugin forwards each of those single-file launches to the
; already-running instance as a separate "melo:open-files" event, and
; because the frontend imports with `mode: "replace"`, only the LAST of
; those 3 separate single-file events survives — matching the reported bug
; ("select multiple files, only one gets added").
;
; This hook runs after Tauri's own FileAssociation.nsh registers each
; extension's ProgID, and adds the missing MultiSelectModel value to each
; one so Explorer launches Melo exactly once, with every selected path in
; argv, instead of once per file.
;
; NOTE: this file has not been exercised by a real NSIS/Windows build in
; the environment this was written in (Linux, no Windows/NSIS toolchain
; available) — please verify on the next Windows build:
;   1. Select 2-3 audio files in Explorer.
;   2. Right-click -> Open with -> Melo.
;   3. Confirm ALL selected files appear in the queue, not just one.
; If MultiSelectModel doesn't take effect for some reason, the next
; fallback to investigate is whether Explorer is still using a cached
; per-extension association that needs `ie4uinit.exe -show` / an explorer
; restart to pick up, which is a known quirk of registering file
; associations via NSIS.

!macro Melo_SetMultiSelectModel ext root
  Push $0
  ReadRegStr $0 ${root} "Software\Classes\.${ext}" ""
  ${If} $0 != ""
    WriteRegStr ${root} "Software\Classes\$0\shell" "MultiSelectModel" "Player"
  ${EndIf}
  Pop $0
!macroend

!macro NSIS_HOOK_POSTINSTALL
  ; Both HKLM and HKCU are covered so this works regardless of whether the
  ; installer ends up running in per-machine or per-user mode.
  !insertmacro Melo_SetMultiSelectModel "mp3"  HKLM
  !insertmacro Melo_SetMultiSelectModel "mp3"  HKCU
  !insertmacro Melo_SetMultiSelectModel "flac" HKLM
  !insertmacro Melo_SetMultiSelectModel "flac" HKCU
  !insertmacro Melo_SetMultiSelectModel "wav"  HKLM
  !insertmacro Melo_SetMultiSelectModel "wav"  HKCU
  !insertmacro Melo_SetMultiSelectModel "aac"  HKLM
  !insertmacro Melo_SetMultiSelectModel "aac"  HKCU
  !insertmacro Melo_SetMultiSelectModel "ogg"  HKLM
  !insertmacro Melo_SetMultiSelectModel "ogg"  HKCU
  !insertmacro Melo_SetMultiSelectModel "m4a"  HKLM
  !insertmacro Melo_SetMultiSelectModel "m4a"  HKCU
  !insertmacro Melo_SetMultiSelectModel "alac" HKLM
  !insertmacro Melo_SetMultiSelectModel "alac" HKCU
  !insertmacro Melo_SetMultiSelectModel "opus" HKLM
  !insertmacro Melo_SetMultiSelectModel "opus" HKCU
  !insertmacro Melo_SetMultiSelectModel "wma"  HKLM
  !insertmacro Melo_SetMultiSelectModel "wma"  HKCU
  !insertmacro Melo_SetMultiSelectModel "aiff" HKLM
  !insertmacro Melo_SetMultiSelectModel "aiff" HKCU
!macroend
