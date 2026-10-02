---
name: flick-vo-file-location
description: "The user drops a film's VO/TTS audio into Downloads\\Music under an ad-hoc filename, not the project's expected public\\vo\\tts-audio.wav path or name - check there by recency/duration, not just by filename, before concluding VO hasn't arrived yet."
metadata:
  type: reference
  originSessionId: 2e97caa6-3697-4fd1-9ecd-29ea5a4bf3bb
  modified: 2026-09-10T11:24:47.767Z
---

When a flick project is waiting on a voiceover track and none has shown up in the project's own `remotion/public/vo/` folder, check `C:\Users\HASSnain computer\Downloads\Music\` before assuming it hasn't been supplied yet. The user saves VO files there under whatever name they used when exporting (e.g. `new.wav` for larson1, not `tts-audio.wav`), so a filename search for `tts-audio*` will miss it. Sort that folder by `LastWriteTime` and cross-check candidates with `ffprobe -show_entries format=duration` against the film's expected VO length before picking one.

**Why:** On larson1, the user had already saved the VO as `Downloads\Music\new.wav` while this session was working on the film; it went unnoticed because only the project's own `vo/` path was checked.

**How to apply:** Before telling the user a VO is still needed, check `Downloads\Music` for a recent `.wav`/`.mp3`/`.m4a` first. Once found, copy it into `<project>\remotion\public\vo\tts-audio.wav` and proceed with [[larson-southern-500-film]]'s re-align workflow (`gen-timeline.mjs` re-run, `footage.ts` chain trim if scene durations shrink). Related: [[flick-render-commands]].
