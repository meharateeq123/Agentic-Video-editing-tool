---
name: focus-zoom-camera-rule
description: "\"Focus Zoom\": the user's named camera rule. When the VO is on one thing that must be seen, ease in on it, hold, ease back out and carry on. Apply wherever it matters."
metadata:
  node_type: memory
  type: feedback
  originSessionId: 235ea8ac-0266-4464-b2f5-9013b8b8160a
  modified: 2026-09-29T09:10:59.551Z
---

**Focus Zoom** is the name the user gave this camera rule on 2026-09-29. Use it in every clip where it fits, together with [[overhead-finish-camera-rule]].

The rule:
- When the voiceover is about one specific thing and it really matters that the viewer sees it, the camera zooms in smoothly on it, holds for a moment, zooms out smoothly, and the shot continues.
- Never cut or snap. It is always eased in and eased out.

Code: `D:\Animated Math\manimgl\scenes\camera_rules.py` has `focus_zoom(view, t, at, start, end, zoom=0.55, ease_in=0.7, ease_out=0.8)`. It layers over whatever camera the shot already has, and you can chain several:

```
view = overhead_finish(t, LENGTH)
view = focus_zoom(view, t, at=..., start=..., end=...)
frame.reorient(*view)
```

The reference is `euler/shot_turn.py`, which zooms on −1 from 5.5 s to 6.8 s as the dot lands there.

**Why:** the user wants the camera to point the viewer at the key moment, not leave everything at one wide framing.

**How to apply:**
- Choose the zoom moments from the script. They go on the word that names the thing, e.g. "minus one" or "this point".
- Use one to three per scene at most, or it stops meaning anything.
- While zoomed in, the focus subject and its label must be fully inside the frame. Other context may go off the edge, since cropping it is the point, but never leave a label half-cut at the edge.
