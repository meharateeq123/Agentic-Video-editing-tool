---
name: reddick-southern-500-film
description: The in-progress flick video is output/reddick1 — a 5:31 Tyler Reddick / Darlington Southern 500 film; where it stands and how it is wired.
metadata: 
  node_type: memory
  type: project
  originSessionId: 2e97caa6-3697-4fd1-9ecd-29ea5a4bf3bb
  modified: 2026-09-05T20:12:38.336Z
---

The active video in d:\flick is `output/reddick1`: a 331-second (21-scene, 30fps) film about Tyler Reddick going into the 2026 Southern 500 at Darlington. As of 2026-09-05 all 21 scene components, the timeline, and the footage mapping are written and typecheck clean, and the 1080p render completed (`final-film-1080p.mp4`, 5:31, VO-synced, no chunk-seam glitches).

**Known gap the user flagged after watching it (not fixed — user said to let this render go, but note it for next time):** `components/IdCard.tsx` (a photo + name + affiliation broadcast card) is built but wired into zero scenes. Scene 1 shows the lighter text-only `SideIntro` card instead of an `IdCard` with Reddick's photo, and the closing Scene 21 has no card at all (`wins={[]}`). See [[flick-scene-completeness-check]] for the general lesson this produced.

How it is wired (not obvious from a cold read):
- `remotion/src/timeline.ts` holds the real cut list, generated from `transcript.json` by `gen-timeline.mjs`. Scene timing is voiceover-aligned — do not hand-edit those numbers.
- `remotion/src/footage.ts` maps each scene to a bed clip and documents why several clips were rejected at QC (wrong sport, sim racing, unrelated documentary). Long scenes use `bed-pool/*-long.mp4` second fetches instead of extreme slow motion.
- Scenes 3, 7 and 11 are hand-written motion graphics; `gen-scenes.mjs` regenerates the other 18 as footage-only beds and will overwrite them, so hand edits to those scenes must be made in `gen-scenes.mjs` or the scene added to its `HAND_WRITTEN` set.
- Scenes 1 and 19 carry `SideIntro` name cards; the composition is 1920x1080 and 4K output comes from `--scale=2` at render time, not from changing the composition.

**Why:** The old chat was lost, and none of this state is recorded in git or a plan file inside the project.

**How to apply:** Before touching reddick1, read `footage.ts` and `timeline.ts` first — they carry the decisions. Related: [[flick-render-commands]].
