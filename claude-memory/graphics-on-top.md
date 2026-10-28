---
name: graphics-on-top
description: Motion graphics (slabs, stopwatch, chips, question) go in the UPPER part of the 9:16 frame, not the lower band near subtitles
metadata:
  type: feedback
---

User (2026-10-19): "motion graphics tum neechai lagatai ho usko upar lagaya kro" (you put motion graphics at the bottom; put them on top). Applies to every athletics/swimming short from now on.

**Why:** the lower band collides with the one-word subtitles (y~1500) and with the chest/lower body; top-of-frame graphics read cleaner.
**How to apply:** Gfx2.tsx Slab/Chips/Question default to the top (top ~150-300, below the safe zone), Stopwatch/BigNumber Band y ~420 instead of 1230. Faces must still stay clear: pick bed crops so the face sits in the middle band (y~700-1250) and keep subtitles at the bottom. Alternate left/right/center. See [[reference-framing-rise-and-run]], [[subtitles-at-bottom]].

Also: never leave broadcaster/sponsor logos (OMEGA badge, "WORLD RECORD" lower-third) visible in beds; crop them out via s/cy and check full-size frames ([[olympic-channel-logo]]). Do not render two shorts in parallel on this PC (ERR_INSUFFICIENT_RESOURCES, D: free space ~10 GB): render one at a time.
