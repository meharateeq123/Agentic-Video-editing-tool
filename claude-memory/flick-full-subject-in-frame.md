---
name: flick-full-subject-in-frame
description: "User rule 2026-10-28 (robots3): never cut off a robot's head/face with a crop, and never put a near-miss shot on a line; the whole subject must sit well inside the frame"
metadata:
  node_type: memory
  type: feedback
  originSessionId: 0552e3d8-85cb-4605-b4f5-e1bcdeba125a
  modified: 2026-10-28T14:47:55.298Z
---

User on robots3 (2026-10-28): "dubara asi glti na ho... koi robot ka face na katai, har chz camera mai buht achi tarah ai". Two triggers:
- A boxing clip sat under "race, jump, and compete against each other". It was the same Games but the wrong action.
- Close-up beds where the zoom crop sliced the robot's head off at the top edge.

**Why:** the viewer sees a chopped head or a mismatched action at once. A crop that removes a lower-third or logo is not worth losing the subject.

**How to apply:**
- Before showing a film, check the first, middle and last frames of every bed at a readable size, asking two questions:
  - Is the main subject (robot/person) fully inside the frame, with headroom above its head?
  - Does the action match the exact words?
- Per-source zoom crops (like `:C` on robots3 `final`) must be checked bed by bed. Close-ups need their own crop with more headroom, or no zoom at all.
- If a lower-third can't be removed without cutting the subject, pick another moment.
- The same goes for every person ([[flick-shorts-editing-rules-2026-10-12]] "faces framed") and every robot.

Related: [[flick-shot-relevance]], [[robots3-film]].
