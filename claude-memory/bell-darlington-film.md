---
name: bell-darlington-film
description: "The Christopher Bell / Darlington film in output/bell1 — what it is, how it's cut, and the footage traps found while building it."
metadata: 
  node_type: memory
  type: project
  originSessionId: 2e97caa6-3697-4fd1-9ecd-29ea5a4bf3bb
  modified: 2026-09-09T09:29:45.500Z
---

`D:\flick\output\bell1` — 5:26 (326.28s, 9788 frames, 1080p30) film on Christopher Bell winning the 2026 Cook Out Southern 500 at Darlington in the Chase opener. Rendered 2026-09-09 to `bell1.mp4` (346MB). 21 scenes, 63 links, 13 motion graphics (scene 6 deliberately has none — the user asked for it bare).

Footage sources actually used, all cropped per-source into `remotion/public/bed-pool/`:
- `final-laps.mp4` — Bell's own #20 Mobil 1 runs alone at **~508s** (not 400-420s). Avoid **336-430s** and **104-116s**: FOX lays speed-comparison and "CLOSING THE GAP" telemetry across mid-frame, which no crop removes. 432-452s has a picture-in-picture of Bell's wife; last ~25s is a FOX bumper.
- `southern500-highlights.mp4` — **daylight until roughly 1120-1150s, night from there on.** The
  Cook Out Southern 500 starts in daylight and runs into full dark; a scan at 380/400/440/470/800/
  900/950/1000/1050/1100s was all day, 1150s+ was confirmed night. Caught on hamlin1 when a scene
  captioned "how the night started" was cut to a bright, sunlit shot — check this before using any
  B-roll under a line that implies night (the finish, a late-race incident, "under the lights").
  `final-laps.mp4` (A) is all-night throughout and is the safe fallback for anything after the sun
  sets in the story, even mid-race.
- `gateway.mp4`
- `bell-recalls-michigan.mp4` — Bell's Pocono presser with the wrist wrap, plus real B-roll of his own wrecked #20 on a flatbed at ~120-132s.
- `postrace-interviews.mp4` — Bell's victory-lane interview is the first ~90s; **Hamlin's own interview runs ~272-347s** and the broadcast captions it "FINISHED: 18th", the exact number the script reads, with a race replay cut inside it.

Two downloads were dropped after scanning: `michigan-wreck.mp4` was **Chase Elliott's #9 wreck, not Bell's**, and `darlington-highlights-nascar.mp4` became unnecessary once Hamlin's own captioned interview covered scene 15 — dropping it saved an hour of AV1 transcoding.

**Why:** Two of seven downloads were wrong or redundant, and the "obvious" timestamp for the hero car was 90s off. Contact-sheet scanning every source before writing `footage.ts` is what caught all three.

**How to apply:** Scan first, write ranges second. Related: [[flick-render-commands]], [[flick-footage-pacing]], [[flick-no-game-footage]].
