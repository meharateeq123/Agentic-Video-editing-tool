---
name: manimgl-house-style-v2
description: "Approved 2026-09-29: every new ManimGL video uses this house style. Glossy dark-blue floor with a fading grid, gold / cyan / crimson / white colour roles, grain, and the Overhead Finish and Focus Zoom camera rules."
metadata:
  node_type: memory
  type: feedback
  originSessionId: 235ea8ac-0266-4464-b2f5-9013b8b8160a
  modified: 2026-09-29T09:12:32.847Z
---

On 2026-09-29 the user approved the x01 shot (`D:\Animated Math\manimgl\euler\shot_turn.py`): "perfect, great, very good". They said every next video is built on these rules, colours and camera. This is the default for every new ManimGL film and short. It replaces the old cream/ivory + gold house look.

**Colours** (details in [[manimgl-colour-scheme-change]]):

| Role | Colour |
|---|---|
| Background | `#02050b` |
| Floor | Glossy `#03091a`, opacity 0.92, with mirrored reflections under it |
| Grid | Black-blue `#1f3f78` at 0.55, fading into the dark with distance |
| Still to come | Blue `#2a8dff` / `#6fd0ff` |
| The thing itself, done | Gold `#ffb42e` / `#ffd36b` |
| Answer | Cyan |
| Negative / wrong, sparingly | Crimson `#ff4d6d` |
| Text | White `#f4f7ff` |

- Glow stays restrained.
- Film grain at 0.03.
- Soft vignette.
- Blue light pool at the back right.

**Camera**, from `scenes/camera_rules.py`:
- [[overhead-finish-camera-rule]]: open on an angled slow orbit and end straight overhead. Labels are `Facing` billboards.
- [[focus-zoom-camera-rule]]: ease in on the thing the VO names, hold, ease out, carry on.

Still in force alongside these: [[manim-framing-and-overlap]] (everything in frame, nothing overlapping).

**Why:** the user iterated through navy/cyan, emerald and a reference still before approving this exact look, and named both camera rules themself.

**How to apply:**
- Start a new film's kit from `shot_turn.py` and `camera_rules.py`, not from the old `fraction_kit` palette.
- Don't re-propose palettes. This one is decided unless the user reopens it.
- The Euler film (e01–e10) stays in the old look unless the user asks to restyle it.
