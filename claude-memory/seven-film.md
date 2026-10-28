---
name: seven-film
description: "\"7 Math Discoveries That Should Be IMPOSSIBLE… But Aren't\" (manimgl\\seven): 16 scenes of real 3D props on the 489s VO; autofit camera; delivered 2026-10-23 at 2K, 8:10"
metadata:
  node_type: memory
  type: project
  originSessionId: 235ea8ac-0266-4464-b2f5-9013b8b8160a
  modified: 2026-10-23T11:38:11.197Z
---

`manimgl\seven`, VO `vo\seven_vo.wav` (Downloads\Music tts 3:20 PM 10-23), 16 scenes, 14693 frames, render to `render_seven\`. This was the answer to "simple videos" ([[manimgl-no-simple-films]]): every scene is built around a moving 3D prop.

- New props in `seven_parts.py`:
  - **Hotel**: rooms with a roof, gold trim, glowing doors and light spill on the floor; a `tower` mode.
  - **Sheet**: a surface re-posed each frame from a vectorised (U, V) function. Used for the horn, napkin rings, caps and paint.
  - **Coin**, **Die** (numbers on the faces, hidden when a face turns away), **Bucket**.
  - **Hairs** plus `one_zero_field`: a stereographic field with a single zero, used for the hairy ball and the wind.
  - **Gallery**: the 7 props in miniature.
  - Helpers `keyed`, `box` and `ball_box`.
- **autofit(view, subject, CARDS, BANDS, TOTAL)**: pulls the camera back per frame, only where the subject spills out of frame or under a HUD band. It uses a 1.3 s max filter followed by three 0.4 s means, which avoids jolts. The subject box must be keyed to the same times as the camera KEYS. If it isn't, autofit wrecks zooms (the paint scene pulled back 6.7x).
- **Traps:**
  - The generated render_parts table kept `p01` keys while the workers asked for `s01`, which gave "NoneType has no attribute loader". The table keys must match the worker lists.
  - A title with an apostrophe broke the generator. Write .ps1 files with a BOM so "…" survives PowerShell 5.1.
  - Wikipedia's Brouwer photo includes Bohr; crop it.

Related: [[primes-film]], [[nines-film]].
