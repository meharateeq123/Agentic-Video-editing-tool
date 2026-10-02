---
name: flick-moving-label-collision
description: "In a progress-rail/climb graphic, never attach a text label to the moving marker - pin labels at the rail's fixed endpoints instead, or the moving label collides with a fixed one once the animation finishes."
metadata:
  type: feedback
  originSessionId: 2e97caa6-3697-4fd1-9ecd-29ea5a4bf3bb
  modified: 2026-09-10T10:31:38.089Z
---

When a scene shows a marker (dot/circle) climbing or sliding along a rail to represent movement (position gained, value changing over time), don't give the moving marker its own floating text label that travels with it. If a second, fixed label sits at the rail's end (e.g. the final value), the traveling label ends up sharing the exact same screen position as the fixed one the instant the climb animation completes - producing an overlapping/unreadable tangle of text.

**Fix:** only the marker itself moves. All text is pinned at fixed positions - one label at the rail's start, one at its end - each fading in on its own timing (`ease(frame, ...)`), independent of where the dot currently is.

**Why:** Found via a user bug report with a screenshot ("overlapping kiu ai?") on larson1's Scene04 (a 16th-to-2nd climb graphic, in `scenes/Scene04.tsx`). The original version put a label next to the moving dot showing "16th" → "2nd" as it climbed, which collided with a separately fixed "2nd - end of Stage 2" label at the top of the rail once the dot arrived.

**How to apply:** Any future progress-rail / climbing-value graphic (position over a race, ranking over a season, etc.) should default to marker-only motion with fixed-position labels at the endpoints, never a label bound to the moving element. Related: [[flick-graphic-exit-timing]].
