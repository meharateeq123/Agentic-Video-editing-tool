---
name: ohashi3-film
description: "swimming/output/ohashi3 long film (Ohashi 2:04.83 200 breast WR) delivered 2026-10-16 at 2K (2560x1440), 8:16; how 2K was done"
metadata:
  node_type: memory
  type: project
  originSessionId: 2e97caa6-3697-4fd1-9ecd-29ea5a4bf3bb
  modified: 2026-10-16T12:40:33.589Z
---

Delivered `swimming/output/ohashi3/Michael Phelps STUNNED After Shin Ohashi DESTROYS Men's Breaststroke at 17!.mp4` (8:16, 2560x1440, 1077 MB). The user asked for 2K this time. VO was `tts-audio - 2026-10-16T155543.242.wav` (496.2s).

**How 2K worked (no --scale flag):** in gen.mjs, set the final-film composition to 2560x1440 and wrap the 1920x1080 scene stack in `transform: scale(1.3333333333)`, transformOrigin 0 0. Graphics keep their layout. The render took ~55 min with 3 workers (50 chunks). Studio was stopped first to free RAM.

Pipeline is the same as [[kornev4-film]] / [[coetze1-film]]: 36 scenes, 186 beds.

**Traps:**
- The Daily Guardian medalists-event clip (556W2LjdR7I) cuts between Ohashi and ANOTHER Japanese swimmer (an older man in the same red jacket). G17/G19/G20/G21 were the wrong person. Check identity on every interview shot.
- The same clip has a "SOURCE: REUTERS" tag top-left; the crop needed [0.64, 0.64, 0.25, 0.11].
- Many Ohashi "videos" on YouTube are photo slideshows: _c413nVskk0, jShxeAiC-Dk, hLU-rnQ3D18, mTMSa4NvVaQ. Only a few were used, as image fallbacks.
- Phelps 2002 footage not found; Athens 2004 400 IM was used instead.
- Whisper dropped words around "2:00.12"; align anchors had to use nearby tokens.
