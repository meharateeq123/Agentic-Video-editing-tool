---
name: chase2-short
description: "output/shorts/chase2 - 'NASCAR JUST Revealed the 3 Races That Could BREAK the Chase!' short (2026-09-25): sources and the timestamp-drift trap"
metadata:
  node_type: memory
  type: project
  originSessionId: 2e97caa6-3697-4fd1-9ecd-29ea5a4bf3bb
  modified: 2026-09-25T12:18:42.530Z
---

Short at `D:\flick\output\shorts\chase2`, delivered as `NASCAR JUST Revealed the 3 Races That Could BREAK the Chase!.mp4` (18.4s; VO `Downloads\Music\tts-audio (48).wav`, 17.88s). Not a repeat of [[kansas1-short]]: none of that short's sources were reused.

**Sources (NASCAR-official 2026):** VTBqA77xDE4 (Kansas final laps, restarts), QiPbZV4zRpo (Las Vegas highlights), VYNROY3WGh0 (FOX Las Vegas final laps - Hamlin's #11 close-ups and burnout), a_6CpnBk-uQ (Coca-Cola 600 - Charlotte, the LAP 53 wreck), FjtMypEqYUc ("Hamlin and Larson battle it out in Stage 1", Bristol 2026 - #5 red Valvoline, #11 FedEx side by side).

**Rejected:** xL5wsAdIWyo ("Final Battle", Larson in-car with radio subtitles burned in - fails the no-subtitle gate), Hj4tjkqI44s (COTA spin, only a dashboard camera).

**Trap:** contact-sheet timestamps on long highlight reels drift by up to a few seconds (c600 "23:20" wreck was really at 1410s, "1:00" pack was a ceremony). Pull frames at the exact bed start before baking. Also: three track-name stamps in one scene must each end at their own cut's boundary or the previous name hangs over the next track's footage.

Larson/Hamlin ID cards reuse the photos from kansas1 (`public/id/`), each landing on its cut of the matching car. Related: [[flick-short-file-named-by-title]], [[flick-shorts-visual-style-upgrade]].
