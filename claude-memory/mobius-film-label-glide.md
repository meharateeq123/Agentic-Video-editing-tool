---
name: mobius-film-label-glide
description: "Arrows and labels in the Möbius film must slide smoothly when they move or change side, never jump."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 235ea8ac-0266-4464-b2f5-9013b8b8160a
  modified: 2026-09-15T17:04:44.371Z
---

A label or arrow that changes its seat must glide there, never jump from one side to the other in a single frame.

**Why:** on 2026-09-15 the user said the arrow "vibrates" and jumps straight to the other side when it changes position, and asked for its movement to be as smooth as possible.

**How to apply:**
- `Annotation.GLIDE` in `mobius_kit.py` eases the seat each frame. It is reset when the label is hidden, so a fresh entrance appears in place rather than sliding in.
- Keep that easing whenever label placement changes.
- Prefer label targets that do not race around the band, such as the cut line facing the camera rather than the blade tip.
- Check any label move with stills about 0.25s apart, not just a 2s contact sheet.

Related: [[mobius-film-2k-render]].
