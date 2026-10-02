---
name: camera-front-not-side
description: "ManimGL films must show the stage from the front (theta ~0, within ±6°), never a side/diagonal view (theta -20…-30 was rejected)."
metadata:
  node_type: memory
  type: feedback
  originSessionId: 235ea8ac-0266-4464-b2f5-9013b8b8160a
  modified: 2026-09-30T12:29:03.333Z
---

On 2026-09-30, while the Laplace film was being built, the user saw Scene 1 at theta ≈ −20° and said: "why is the camera crooked, keep it in front, why show it from the side".

**Why:** a diagonal view reads as crooked. The user wants the subject square to the viewer.

**How to apply:**
- Camera theta is exactly 0, always. Even ±2–6° slanted the far grid lines, and the user said "straighten the grid at the top" (2026-09-30). `alive()` in `laplace_kit` forces theta = 0 and gets its motion from the push, the phi tilt and a sideways pan instead.
- Phi (the tilt down) is fine as before (~60–72°).
- Build set pieces to face the lens. The Laplace gate stands in the x–z plane facing −y, and things slide through it left to right.
- This goes with [[manimgl-house-style-v2]], [[focus-zoom-camera-rule]] and [[camera-rise-when-needed]].
