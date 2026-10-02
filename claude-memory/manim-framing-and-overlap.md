---
name: manim-framing-and-overlap
description: "ManimGL films: everything on screen must stay inside the frame and nothing may overlap — and _check3d only enforces what subject_at actually lists."
metadata:
  node_type: memory
  type: feedback
  originSessionId: 235ea8ac-0266-4464-b2f5-9013b8b8160a
  modified: 2026-09-24T13:44:44.830Z
---

Standing rule for every ManimGL film (Möbius, Graham, fractions and after): **everything on screen stays inside the frame, nothing ever overlaps anything, zoom in where the moment needs it and move the camera round to the other side where that is what the moment needs.** The user has now said this twice, in stronger words the second time ("kahi par bhi skhti sai" — strictly, anywhere).

**Why:** they review in the studio and catch these by eye. Cards over diagrams, leaders crossing shapes, and objects sliced by the frame edge all read as a mistake rather than as style, and they have flagged each of them at least once.

**How to apply:**
- `scenes/_check.py` (run via `graham/_check3d.py`) already tests framing, label and card spill, label-on-diagram and card-on-diagram overlap, lurch, eye-above-floor and slot length. Run it on every scene and do not call a scene done until it passes.
- **The check only enforces what `subject_at(t)` returns.** In the Graham film, scene 5's towers were sliced off by the top of frame for the whole procession and the scene still passed, because `subject_at` only listed the towers' *bases*. List the full extent of everything that is actually on screen — tops included — or the check will tell you something is fine when it is not. See [[graham-film]].
- When an object is genuinely too big for the shot, do not let the frame edge cut it. Either widen, or give it a fade so it dissolves into the dark before it reaches the edge (`PlateTower.fade` is a tracker for exactly this). A hard-cut edge reads as a cropping bug.
- A card that will not fit tries the other band before it is shrunk: in Graham scene 2 a two-face `PortraitCard` collided with the cube in both the up and down bands and only worked on the right.
- Verify by eye as well as by check — pull frames out of the studio cache at the suspect second and actually look at them.
