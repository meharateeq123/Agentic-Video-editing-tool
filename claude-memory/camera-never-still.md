---
name: camera-never-still
description: ManimGL films — the camera must never hold still; a constant slow zoom in/out and drift so it never looks like nothing is happening. Also no hard horizon line.
metadata:
  node_type: memory
  type: feedback
  originSessionId: 235ea8ac-0266-4464-b2f5-9013b8b8160a
  modified: 2026-09-30T12:16:11.689Z
---

On 2026-09-30, while the Laplace film was being built, the user asked for two things:
- "The camera shouldn't stop; it should keep zooming in and out, so it never looks like nothing is happening."
- "This is a very hard cut", about the line where the lit floor meets the dark sky at the horizon.

**Why:** a held camera reads as a frozen video, and a hard horizon edge reads as cheap.

**How to apply:**
- Lay a slow, always-on breathing push in/out plus a small drift of angle and aim over every scene's camera, clocked on film time so scene joins stay seamless. In `laplace/laplace_kit.py` this is `alive(view, t)`, called via `as_reorient(view, START + t)`: height ×(1 ± ~8%), theta ±2°, phi ±1°. It comes on top of [[focus-zoom-camera-rule]] moments.
- Never let the floor end on a hard line. `FilmStage` puts a gradient wall far behind the stage, running from the floor's horizon colour (`#080e1e`) up into `BACK`.
- Related: [[camera-front-not-side]], [[manimgl-house-style-v2]].
