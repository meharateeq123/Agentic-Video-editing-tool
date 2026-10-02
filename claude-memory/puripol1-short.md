---
name: puripol1-short
description: output/shorts/puripol1 - Puripol Boonson Asian Games sprint double (2026-09-28); T Sports 7 is the clean source for Thai athletics
metadata:
  node_type: memory
  type: project
  originSessionId: 2e97caa6-3697-4fd1-9ecd-29ea5a4bf3bb
  modified: 2026-09-28T14:13:43.837Z
---

Short at `D:\flick\output\shorts\puripol1`, delivered as `Puripol Boonson JUST did it AGAIN!.mp4` (19.22s, 1080x1920, -12.5 LUFS, freeze-clean). VO = `Downloads\Music\tts-audio (76).wav` (19.16s). Subject: his 9.90 in the 100m and 19.88 Asian record in the 200m at the 20th Asian Games, Aichi-Nagoya 2026.

**Sources.** `8L33gG5CiR8` — **T Sports 7** (the Thai broadcaster), men's 100m final highlight. This is the find worth remembering: for Thai athletes T Sports 7 posts clean host pictures with only a small top-right channel bug, and the Asian Games host graphics name the athlete three separate times (START LIST, the "WINNER Puripol BOONSON GR 9.90" lower-third, and the RESULTS board). No 200m final equivalent existed, so the 200m beats come from `tHVWRhjsaCE` (Global Athletics) — softer, an upscale, with a round logo top-right, but it carries "FINISH 19.88", the ASIAN RECORD board and the 200m results board.

**Logo handling per source, not global** (the lesson from [[yuzidi6-short]]): both bugs sit top-RIGHT, so every tight 9:16 crop near `cx 0.5` clears them without any vertical cropping. Only the three full-width result boards need `fill`, and those bake with the right edge trimmed first (`crop=W*(1-trim)` then letterbox over blur) — 8% for T Sports 7, 14% for Global Athletics.

**Rejected:** the reaction/recap channels that dominate the search results (Elite Athletes Talks, Athlete Pro Talks, Trackside Report, Runner Insider) — talking heads with their own branding. Several downloads also hit YouTube 429 and never recovered; the two that landed were enough.

**Trap:** the T Sports 7 highlight ends with a broadcaster title card ("SAT OFFICIAL BROADCASTER"), and the first bake of the results-board beat landed on it. The board itself is only up ~109-112s. Same timestamp-drift lesson as [[richardson3-short]] - probe the real frame at the intended in-point.

Related: [[flick-athletics-shorts]], [[flick-short-file-named-by-title]], [[flick-shorts-audio-level]].
