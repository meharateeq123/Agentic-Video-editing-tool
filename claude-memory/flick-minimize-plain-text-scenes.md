---
name: flick-minimize-plain-text-scenes
description: Keep plain floating-text scenes to a minimum; favor image cards and comparison/data cards instead.
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 2e97caa6-3697-4fd1-9ecd-29ea5a4bf3bb
  modified: 2026-09-11T18:47:38.151Z
---

Don't put a text overlay on every scene. In keselowski1, nearly every scene got some kind of text graphic; the user's explicit correction was that many scenes should run on footage alone with zero overlay — no heading, no body text, nothing — the way larson1's Scene03 and Scene07 do (`<BedChain segs={chain(n)} dur={...} />` with no `Overlay`/text children at all). Reserve on-screen text for: (1) image cards (PhotoCard/IdCard with a real photo, per [[flick-card-and-transition-style]]), and (2) comparison/data cards (bar charts, stat comparisons, like larson1's Scene05 laps-led chart). A plain sentence restating what the narration is already saying is not a reason to add a text scene — if there's no photo and no data point to show, let the footage carry it and add no overlay.

**Why:** Flagged on keselowski1 after the film was already rendered, in two passes. First: "itna text nahi chahiye tha, bs image card, comparison card tak, yeh fazool ka text nahi chahiye tha" (didn't want this much text, just image cards and comparison cards, this extra text was unnecessary). Then, more precisely, pointing at screenshots that showed plain-text scenes: "jaise tumne un images mein dikhaya, har scene mein texting use ki thi, wo nahi use karna next time" (like you showed in those images, you used text in every scene — don't do that next time). They explicitly said not to re-edit that already-rendered film for it, but to apply it going forward.

**How to apply:** At the planning/scene-breakdown stage of a new film (before building scene components), default every transcript line to NO overlay (footage-only). Only add a graphic when the line has a real photo to show (→ image card) or a real number/comparison to show (→ data card). Do not add a plain-text scene just because a line exists and needs "something" on screen — bare footage under the narration is an acceptable, expected outcome for most of the film, not a gap to fill.
