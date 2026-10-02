---
name: camera-rise-when-needed
description: "Don't run the Overhead Finish in every clip: rise overhead only where the content needs it, then bring the camera back down. My call where."
metadata:
  node_type: memory
  type: feedback
  originSessionId: 965b55a1-c203-4287-bdb0-90beabfbb7a1
  modified: 2026-09-29T15:48:57.928Z
---

On 2026-09-29, after seeing Laplace short 1 (which ends straight overhead), the user said of short 2: "don't take the camera up as far as in short 1; when it needs to go up, take it up and then bring it back — decide yourself."

**Why:** ending every clip straight overhead gets repetitive and flattens 3D subjects. The rise should be a moment that serves the content, not the default ending.

**How to apply:**
- Take the camera up (phi ~20, not all the way to 6) only while something that reads as a map or diagram on the floor is the point, e.g. poles on an s-plane. Then ease back to the angled view (phi ~55–58) and carry on.
- Keep it angled for standing 3D subjects (a drone, towers) and let the clip end angled.
- The choice of where is mine. Mention it when handing over the render.
- This refines [[overhead-finish-camera-rule]]. Reference implementation: `shorts/laplace_s2/laplace_s2.py` `base_view()`.
