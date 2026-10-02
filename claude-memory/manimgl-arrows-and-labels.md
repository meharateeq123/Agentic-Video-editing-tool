---
name: manimgl-arrows-and-labels
description: ManimGL films — name things on screen with labels that have arrows pointing at them; the user asked for arrows + labels in every scene.
metadata:
  node_type: memory
  type: feedback
  originSessionId: 235ea8ac-0266-4464-b2f5-9013b8b8160a
  modified: 2026-09-30T12:24:43.353Z
---

On 2026-09-30, while the Laplace film was being built, the user said: "keep these things in mind in the other scenes, and add arrows and labels too". "These things" meant front camera, never-still camera, soft horizon and no overlaps.

**Why:** the user wants the viewer told what each object is, with a pointer to it, not left to infer it.

**How to apply:**
- Use `Callout(text, colour)` in `laplace/laplace_kit.py`. It is a label standing in the world with an arrow (shaft plus a chevron head facing the camera) to the thing it names. Call `place(frame, target, at, level)` every frame.
- Give each scene several callouts, on the words the VO says, keeping them clear of each other and of HUD text ([[manim-framing-and-overlap]]).
- Put label points in `subject_at` so the framing check keeps them inside the frame.
- This goes with [[camera-front-not-side]], [[camera-never-still]] and [[manimgl-house-style-v2]].
