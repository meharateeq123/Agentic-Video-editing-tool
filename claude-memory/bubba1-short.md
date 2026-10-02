---
name: bubba1-short
description: "output/shorts/bubba1 - Bubba Wallace Kansas short (built 2026-09-24): sources, crop tricks, VO mix-up trap, real-voice ending"
metadata:
  node_type: memory
  type: project
  originSessionId: 2e97caa6-3697-4fd1-9ecd-29ea5a4bf3bb
  modified: 2026-09-24T11:22:21.101Z
---

NASCAR short "Bubba Wallace JUST Revealed His HUGE Kansas Plan" at `D:\flick\output\shorts\bubba1`; final `bubba1-final.mp4` (19.3s, 1080x1920, -12.4 LUFS, `-quiet` copy kept). Built from ngetich1's scaffold (Cuts/Caption/RankStamp, `crop.ps1` bakes 9:16 beds).

**Sources (all fresh, none used in an earlier short):** NASCAR "Bubba Wallace holds off Denny Hamlin to win at Kansas" (QpGcFTvHJSY, the 2022 Hollywood Casino 400, ends 1:38 then an end card) for the win footage; Peter Stratta "Bubba Wallace Talks Kansas, Generational Chase Run" (_I1dHhOHDJw, 2026-09-23) for Bubba himself. In it he really says "we're still 92 points out" (~2:24), "I look at Kansas as a great opportunity for us" (~2:28) and "winning Sunday ultimately flips the script for all of us" (~3:10-3:15), so the short ends on his real audio with captions following his words.

**Crop tricks worth reusing:** Stratta's video is a vertical phone call pillar-boxed in 16:9 - crop x 448-832 and the "Peter Stratta" watermark and channel logo (both in the side pads) never reach the short. NASCAR's ticker bar is the top ~120px of the 720p frame; cover crops start at y=124 (335x596 window) to drop it.

**Trap:** `Downloads\Music\tts-audio (37).wav` looked like the newest VO but was Tachana Smith's swimming VO. Whisper the wav and read the text before assuming which project it belongs to (the Bubba VO was `(42)`, 15.24s). yt-dlp's `--write-auto-subs` 429s again here; download without it and whisper locally.

Mastering used a two-level gain (`volume='if(lt(t,15.3),5.3,3.35)'`) because the real-voice tail was already ~5 dB louder than the TTS. Related: [[flick-shorts-audio-level]], [[flick-shorts-energy]], [[flick-vo-file-location]].
