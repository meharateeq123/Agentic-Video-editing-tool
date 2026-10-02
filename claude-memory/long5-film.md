---
name: long5-film
description: "output/long5 (Kyle Larson took control / Hamlin 1 point back) rendered 2026-09-26; no hook, 33 graphics, chunk-audio-padding concat trap"
metadata:
  node_type: memory
  type: project
  originSessionId: 2e97caa6-3697-4fd1-9ecd-29ea5a4bf3bb
  modified: 2026-09-25T19:36:50.880Z
---

output/long5 delivered 2026-09-26 as `Kyle Larson JUST Took Control of NASCAR - And Hamlin Is ONLY 1 Point Back!.mp4` (310.53 s, 1080p, ~390 MB, freeze-clean, mean -31 dB, not LUFS-mastered). No cold-open hook (user cut it); VO starts at frame 0. 33 graphics: 19 number stamps, 11 ID cards, 2 venue stamps, 1 map (scene 17, Kansas→Vegas→Charlotte). Footage ranges disjoint from long3/long4/kansas1/kansas2/chase2 (EXCL table in plan.mjs).

**Trap:** each 300-frame chunk's AAC track is 10.048 s vs 10.000 s of video, so a plain `concat -c copy` stretched the film to 312.06 s with a 1.5-frame hold at every seam. Fix: concat list with `outpoint <video stream duration>` after each `file` line (strip the trailing comma from ffprobe csv output) → video and audio both exactly 310.533 s. Bake this into render.ps1 for future long films. `long5-final-padded.mp4` is the old padded concat, kept as backup.

Related: [[flick-short-file-named-by-title]], [[flick-long-film-clip-rules]].
