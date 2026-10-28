---
name: schrodinger-film
description: "Schrodinger film (manimgl\\schrodinger): 11 scenes, delivered 2026-10-09 at 2K; the label-overlap checker, the dead-air pixel scan, and the two-slit bugs they did not catch."
metadata:
  node_type: memory
  type: project
  originSessionId: 235ea8ac-0266-4464-b2f5-9013b8b8160a
  modified: 2026-10-11T11:42:57.410Z
---

"What Does the Schrodinger Equation REALLY Mean?" — `D:\Animated Math\manimgl\schrodinger\`.

**Delivered 2026-10-09**: `render_schrodinger\What Does the Schrodinger Equation REALLY Mean.mp4`, 2560×1440, 13645 frames, **7:35**, 1.18 GB, AAC.

- Script 1373 words. Spine: you were told it is an equation about probability, and there is no probability in it — probability was added by hand, in a footnote, in 1926. Then phase, two slits, configuration space, the measurement problem, the four camps, and the underground experiment that killed the simplest gravity-collapse model.
- VO `vo\schrodinger_vo.wav` (454.52 s), align matched 1352/1373. Studio keys q01–q11, `ACTIVE = "q"`.
- Kit `schrodinger_kit.py` = Pythagoras kit plus `two_slit`, `sample_landings`, `DotScreen`, `SlitWall`, `Phasor`, `Curve`.
- Accuracy kept: Born's footnote is real; the "nobody knows" is not overstated (Gran Sasso ruled out the parameter-free Diósi–Penrose model); no 12-decimal claim, because that is QED, not this equation.

**Three QC passes now run on every scene, in this order:**
1. `_check.py` — framing and camera smoothness.
2. **Label-overlap pass** — `OVERLAP=1` env; the kit wraps `Facing.place` to record each visible label's projected box and `run_clock` reports intersecting pairs. `overlap_all.cmd` runs all scenes one at a time. This is the check `_check.py` cannot do.
3. **Dead-air scan** — count bright pixels (>95 luminance) per built preview frame; a long run near zero is a hole. A HUD-card-gap table is *not* a substitute: it flags scenes whose floor is busy and misses holes where a card is up but the floor is bare.

**What the automated passes still missed, and the user caught by eye:**
- `SlitWall`'s middle divider was not centred on zero, so it merged into the upper block and the barrier had **one** slit, not two — and the particle flew through solid wall. Always verify a built apparatus numerically (print the solid spans and the gaps).
- The particle's flight was 0.055 s — under two frames. A visible trip needs ~0.5 s. Check any animated traversal against the frame time.
- The screen was edge-on, so the interference pattern was a one-pixel streak and the bands could not be read at the exact moment the voice named them. It now turns to face the lens and the marks spread over a panel, with the one-slit envelope drawn under them for contrast.

Related: [[manimgl-no-overlap-first-time]], [[pythagoras-film]], [[progress-updates]].
