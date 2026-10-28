---
name: robots3-film
description: "output/robots3 humanoid robot 100m 8.64 film (16:9, ~4:06, 68 beds + Hook10-style hook), Studio 3016; built 2026-10-28, no VO, no main-film graphics yet"
metadata:
  node_type: memory
  type: project
  originSessionId: 0552e3d8-85cb-4605-b4f5-e1bcdeba125a
  modified: 2026-10-28T15:12:21.853Z
---

Script: "This Humanoid Robot JUST SMASHED the 100m World Record!" (554 words, estimated timings until a VO arrives). Facts checked: AP says 8.64s on Aug 26 2026, second World Humanoid Robot Games, Beijing; the robot is Tiangong Ultra (X-Humanoid). 9.39 (heat) and 8.86 (semi) came before it. The script's "Tian Jiao Dui" team name is unverified, so it is never put on screen.

User feedback 2026-10-27: "relevancy 100 chahiye... jo chz boli jari ho wohi dikhai jai" plus "last swimming vid jaisi hook chahiye". The fix was to re-pick every bed per line ([[flick-shot-relevance]]) and build `components/Hook.tsx` in the [[flick-modern-hook-10s]] grammar. Its beats: IMAGINE THIS → 100M slam → 8.64 rolling clock → ROBOT 8.64 vs BOLT 9.58 −0.94s → IMPOSSIBLE?, with Driving Ambition from 0:29 at 0.045.

**Pipeline:** `qc/mkplan.mjs` (word anchors W + clip list C, `:C`/`:B` crop tags, `hook` list) → `plan.json` → `build.mjs`. `build.mjs` bakes beds and `public/hook/hNN.mp4`; per-item `crop`, and `slow` stretches a too-short static shot. The QC tools are `sheet.mjs`, `sheet2.mjs` (4fps detail) and `grid.mjs` (beds_NN.jpg pages).

**Sources (dl/):**
- **final:** CN.科技发布会 iUL4JE1k36A, the full 100m final broadcast. 8.64 board ~496; crowd/crash ~470-485; it has a lower-third, so use the `:C` crop.
- **bolt / bolt2:** World Athletics Berlin 2009.
- **News:** ap1, ap2, reut, sky1, sky2, cnet, cna, ncau, cgtn939, cgtn400, yicai.
- **Robot footage:** uni10 (Unitree 10 m/s; it has text overlays after 13.5) and atlas.

**Traps:**
- Hidden cuts that the 0.28 scene threshold misses. Check every bed on a 6-frame grid.
- reut's 9.39 board is clean only from 12.85 to 16.32.

**Close-ups (2026-10-28, [[flick-full-subject-in-frame]]):** the broadcast close-ups put the robot's head right under the games logo (top-left) and the TV bug (top-right). The old `:C` zoom cut the heads off, and delogo left white smears. They are now tagged `:F` and handled like this:
- Crop [0.835,0.835,0.083,0]: centred, full head, bottom bar excluded.
- Each logo is covered with a clean neighbouring patch, using the `delogo` "x:y:w:h:sx:sy" field in `build.mjs`. "#color" fills the box instead.
- `Film.tsx` `EventBug` puts our own "100M FINAL" and "WORLD HUMANOID ROBOT GAMES" panels over both corners while those 7 beds play.

Robot 016 (b13) wears a "天工 Ultra" head label, so it is Tiangong Ultra, the record holder.

**Relevance pass (2026-10-28):** cgtn939 is the **9.39 heat**, not the 8.64 final, so never put it under an 8.64 line. In `final` the 8.64 race runs from 445.9 to 463.7: a tracking shot 452.8-457.8, then the finish-line view from 457.9. It carries a games logo top-left and a purple race timer bottom-right, so crop [0.67,0.67,0.17,0.17]. 436.3-441.3 is a red robot close-up, used for the "hardware" line.

Next steps: graphics for the main film, then VO alignment. Render only when the user asks.
