---
name: flick-card-and-transition-style
description: "Standing look for flick films: image cards are boxes with a large image, and cuts use modern transitions rather than hard clips."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 2e97caa6-3697-4fd1-9ecd-29ea5a4bf3bb
  modified: 2026-09-08T20:46:15.566Z
---

Two standing style rules the user gave after bell1 (2026-09-09):

1. **Image cards are a box, not a strip.** Don't lay the photo across a wide thin banner ("aik patti"). Build a box-shaped card and let the **image be large** inside it — the picture is the point, the caption supports it. This applies to the opening ID card and the closing end card.

2. **Use modern transitions, not plain cuts.** "Ab tak hamari saari videos buht achi thi lekin simple clipping thi" — the films looked good but every cut was a hard cut. Wanted: zoom punch, whip with directional motion blur, flash/luma cut, glitch/RGB split, speed ramp — applied **between links inside a scene**, not only at scene boundaries, so the cutting itself has energy.
   **Keep each transition short and smooth** — the user followed up with "transition ziada second ki na ho, aik buht hi smooth ho": roughly 6-12 frames (0.2-0.4s) at 30fps. A transition that lingers is worse than the hard cut it replaced.

**Why:** The films read as competent but flat. Both notes are about production feel, not content, and the user asked for them unprompted after watching a finished render.

**How to apply:** Put the transition layer inside `BedChain` so link-to-link changes get a short modern transition, and keep the per-scene `TRANSITION_IN` variety for scene boundaries. Related: [[map-animation-screen-time]], [[flick-footage-pacing]], [[bell-darlington-film]].
