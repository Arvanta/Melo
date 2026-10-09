; Melo installer hooks (NSIS)
;
; Purpose: make Windows Explorer launch Melo ONCE for a multi-file selection.
;
; Without MultiSelectModel=Player on the verb that opens the file, Explorer
; starts melo.exe once PER SELECTED FILE. The app now copes with that (cold
; start guard in src-tauri/src/instance_guard.rs + append-within-burst in
; main.ts), but one process is still cheaper and keeps the file order.
;
; MultiSelectModel is a value of the VERB key (...\shell\open), not of the
; parent "shell" key and not of "command". It must be set on the class that
; Explorer actually resolves for the user's choice:
;   1. Applications\melo.exe - what Windows records when a user picks Melo
;      under "Open with" (HKCR\Applications\melo.exe, UserChoice ProgId).
;      Windows creates it itself, but only AFTER the first such choice, so the
;      installer writes it up front with the same command line.
;   2. The ProgID Tauri registers for each audio extension - only when that
;      class already has a shell\open\command (never creates a verb without
;      a command).
;
; NOTE: not exercised by a real NSIS build in the authoring environment.
; Verify on Windows after installing (and restarting Explorer):
;   reg query "HKCR\Applications\melo.exe\shell\open" /v MultiSelectModel
; then select several audio files, press Enter, and check Task Manager shows
; ONE melo.exe and the queue holds every file. A per-user override under
; HKCU\Software\Classes\Applications\melo.exe wins over HKLM; remove any
; manual one first.

!macro Melo_RegisterApplicationsKey root
  WriteRegStr ${root} "Software\Classes\Applications\melo.exe\shell\open" "MultiSelectModel" "Player"
  WriteRegStr ${root} "Software\Classes\Applications\melo.exe\shell\open\command" "" '"$INSTDIR\melo.exe" "%1"'
!macroend

!macro Melo_SetMultiSelectModel ext root
  Push $0
  Push $1
  ReadRegStr $0 ${root} "Software\Classes\.${ext}" ""
  ${If} $0 != ""
    ReadRegStr $1 ${root} "Software\Classes\$0\shell\open\command" ""
    ${If} $1 != ""
      WriteRegStr ${root} "Software\Classes\$0\shell\open" "MultiSelectModel" "Player"
    ${EndIf}
  ${EndIf}
  Pop $1
  Pop $0
!macroend

!macro NSIS_HOOK_POSTINSTALL
  ; Both HKLM and HKCU are covered so this works regardless of whether the
  ; installer ends up running in per-machine or per-user mode.
  !insertmacro Melo_RegisterApplicationsKey HKLM
  !insertmacro Melo_RegisterApplicationsKey HKCU
  !insertmacro Melo_SetMultiSelectModel "mp3" HKLM
  !insertmacro Melo_SetMultiSelectModel "mp3" HKCU
  !insertmacro Melo_SetMultiSelectModel "flac" HKLM
  !insertmacro Melo_SetMultiSelectModel "flac" HKCU
  !insertmacro Melo_SetMultiSelectModel "wav" HKLM
  !insertmacro Melo_SetMultiSelectModel "wav" HKCU
  !insertmacro Melo_SetMultiSelectModel "aac" HKLM
  !insertmacro Melo_SetMultiSelectModel "aac" HKCU
  !insertmacro Melo_SetMultiSelectModel "ogg" HKLM
  !insertmacro Melo_SetMultiSelectModel "ogg" HKCU
  !insertmacro Melo_SetMultiSelectModel "m4a" HKLM
  !insertmacro Melo_SetMultiSelectModel "m4a" HKCU
  !insertmacro Melo_SetMultiSelectModel "alac" HKLM
  !insertmacro Melo_SetMultiSelectModel "alac" HKCU
  !insertmacro Melo_SetMultiSelectModel "opus" HKLM
  !insertmacro Melo_SetMultiSelectModel "opus" HKCU
  !insertmacro Melo_SetMultiSelectModel "wma" HKLM
  !insertmacro Melo_SetMultiSelectModel "wma" HKCU
  !insertmacro Melo_SetMultiSelectModel "aiff" HKLM
  !insertmacro Melo_SetMultiSelectModel "aiff" HKCU
!macroend

!macro NSIS_HOOK_POSTUNINSTALL
  DeleteRegKey HKLM "Software\Classes\Applications\melo.exe"
  DeleteRegKey HKCU "Software\Classes\Applications\melo.exe"
!macroend
