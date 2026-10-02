---
name: overhead-finish-camera-rule
description: "\"Overhead Finish\": the user's named camera rule for ManimGL clips. Open on an angled slow orbit, then in the last ~2.5s rise to look straight down on the subject. Apply it wherever it fits."
metadata:
  node_type: memory
  type: feedback
  originSessionId: 235ea8ac-0266-4464-b2f5-9013b8b8160a
  modified: 2026-09-29T09:01:10.362Z
---

**Overhead Finish** is the name the user gave this camera rule on 2026-09-29. Use it in every clip where it fits. If the user says "Overhead Finish", this is what they mean.

The rule:
1. **Start angled.** Tilted view (phi ~55–60°) with a slow orbit (theta drifts ~20°). Never open on empty floor; the subject is in shot from frame one.
2. **End overhead.** Over roughly the last 2.5–3 seconds, ease up to look straight down on the subject: phi ~6°, theta 0, centre nudged a little toward the bottom so a bottom caption or equation fits under it.
3. **Labels face the camera.** Use `Facing` billboards, re-turned every frame, so they still read from above. Upright text is edge-on overhead.
4. **Grid fades with distance.** Never a hard edge. Set opacity per point after `insert_n_curves`, the same way `house_grid` does.

Code: `D:\Animated Math\manimgl\scenes\camera_rules.py` provides `overhead_finish(t, length, side, mid, top, rise=2.6, settle=0.4)`, which returns reorient args, plus the `Facing` billboard. Call `frame.reorient(*overhead_finish(t, LENGTH))`. Reference implementation: `D:\Animated Math\manimgl\euler\shot_turn.py`. The camera keys there are side (-20, 60, h 8.4) → mid (0, 55, h 7.8) over 0–7 s → top (0, 6, h 7.4) over 7–9.6 s, all eased.

**Why:** the user liked the angled look but wanted the payoff seen from straight above. They corrected a first try that did overhead at the start.

**How to apply:**
- Build this in by default for math/diagram shots that end on a result: circles, planes, anything laid on the floor.
- Skip it where overhead hides the point, e.g. upright 3D objects or a standing wave. Say so when you skip it.

Related: [[manimgl-colour-scheme-change]] (the look this was built with) and [[manim-framing-and-overlap]].
