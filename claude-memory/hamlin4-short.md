---
name: hamlin4-short
description: "output/shorts/hamlin4 - Denny Hamlin Kansas warning short (2026-09-26): panning-crop bake recipe for NASCAR wide shots"
metadata:
  node_type: memory
  type: project
  originSessionId: 2e97caa6-3697-4fd1-9ecd-29ea5a4bf3bb
  modified: 2026-09-26T16:24:25.348Z
---

Short at `D:\flick\output\shorts\hamlin4`, delivered as `Denny Hamlin JUST Got a HUGE Kansas Warning!.mp4` (18.35s, 1080x1920, -12.7 LUFS, freeze-clean). VO = `Downloads\Music\tts-audio (67).wav` (18.28s). Named hamlin4 because hamlin2/hamlin3 already exist under `output\shorts`.

**No new downloads.** Every bed comes from the Kansas sources already in `output\shorts\kansas1\dl` (hamlin23, ot2nd, thriller25, nose24, ot26), at ranges disjoint from the ones kansas1 / kansas2 / chase2 use. Those prior ranges are listed in the header of `bake.mjs` - keep that list current, it is the only record.

**The recipe worth reusing: `pan` mode in `bake.mjs`.** NASCAR broadcast shots track the cars loosely, so cars cross a third of the frame width in under two seconds and a *static* tight 9:16 crop loses them - the first bake of b5/b6/b9 ended up on empty asphalt. Fix: crop a full-height `406x720` window (exactly 9:16, so it fills the frame with no blur bars and the cars stay large) whose left edge slides x0 -> x1 across the beat:

```
crop=406:720:'x0+(x1-x0)*min(t/LEN,1)':0,scale=720:1280
```

This beats the older kansas1 "800x666 panel over its own blur" trick, which leaves the cars small in a letterboxed strip. Use a static crop only for shots that hold still (the pit box, the celebration).

**Traps:** contact-sheet tiles drift from the real cut points - always pull a full frame at the intended in- and out-point before setting cx (cost three re-bakes here). thriller25 prints a running-order board over the left ~282px and ot26 over the left ~211px, so both pan endpoints must clear it. nose24's finish-line camera is a high overhead of mostly empty apron - it does not survive a 9:16 crop. ot26 ~340s shows a "TYLER REDDICK - 2026 KANSAS RACE WINNER" lower third, which would misread in a Hamlin short.

Graphics: Hamlin ID card on his name at 0.20s (reused `id/hamlin-id.jpg`), "290 / of 547 laps led" RankStamp on "290" at 7.58s.

Related: [[kansas1-short]], [[kansas2-short]], [[chase2-short]], [[flick-short-file-named-by-title]], [[flick-shorts-audio-level]].
