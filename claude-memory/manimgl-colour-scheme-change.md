---
name: manimgl-colour-scheme-change
description: How the ManimGL palette changed from cream/gold to the approved glossy dark-blue + gold/cyan/crimson look; colour details. The decision itself lives in manimgl-house-style-v2.
metadata:
  node_type: memory
  type: feedback
  originSessionId: 235ea8ac-0266-4464-b2f5-9013b8b8160a
  modified: 2026-09-29T09:12:44.923Z
---

On 2026-09-28, after the Euler film, the user said: "next time color scheme hum change karain ge, yeh cream color ni sahi, kuch aur". The house palette (IVORY cream text and panels, GOLD/GLOSS peach accents, INK background) is out for the next ManimGL long film.

- Palette trials run in the stand-alone 10s shot `euler/shot_turn.py`, listed in the studio as x01. Pick a palette by changing `PICK` among `PALETTES` (navy, emerald, violet, ember).
- The user rejected navy/blue with cyan and coral ("ni blue"). Emerald (black, green, amber) was offered next, 2026-09-28.

- Then the user sent a reference still and said "same chahiye, realistic shiny". The target look:
  - glossy dark-navy floor that catches a blue light from the back right
  - faint grid in black-blue (`#1f3f78` at 0.55 opacity; the user asked for it darker than the first grey-blue)
  - unit circle glowing blue, turning gold where the dot has travelled
  - gold glowing dot, gold angle wedge, cyan dot at 1
  - glowing gold θ readout
  - vignette
- That look is now built in `shot_turn.py`. "Ni blue" had meant the flat navy/cyan version, not blue itself.
- Tricks used:
  - The floor is a big `Square3D` at opacity 0.92, with mirrored copies below it that show through as reflections.
  - Circle colours are set per point with `set_stroke(list_of_colours)`.
  - `fade()` fades glowing Tex so its halos don't turn solid.
  - The vignette is 20 thin, faint inset frames.
- The user also asked for two things:
  - The grid must dissolve into the dark with distance, not end on a hard edge. Write the opacity per point after `insert_n_curves`, the same way `house_grid` does.
  - The camera must END straight over the circle, and the start stays the angled view. The first try was wrong: it started overhead, and the user corrected it ("end circle ke upar, start kyun kiya").
  - Labels are `Facing` billboards turned to the camera every frame, so they still read from overhead.
- On 2026-09-29 the user asked for the full scheme with a third colour, and it was built into the x01 shot. Colour roles:

  | Role | Colour |
  |---|---|
  | Floor, grid, still to come | Dark blue |
  | The thing itself, what is done | Gold `#ffb42e` / `#ffd36b` |
  | The answer | Cyan `#6fd0ff` |
  | Negative / wrong / warning, used sparingly | Crimson `#ff4d6d` |
  | Plain text | White |

  - Crimson must stay pink-leaning so it never merges with the orange-ish gold.
  - Keep glow restrained: halos at (12, 0.035) and (5, 0.08).
  - Film grain at 0.03: noise PNGs cycled per frame, fixed in frame. It stops YouTube banding in the dark gradients.
- Use this look as the base palette for the next film.

**Why:** the user finds the cream look stale. They have now seen it across Möbius, Graham, fractions and Euler.

**How to apply:**
- Superseded 2026-09-29: the palette is decided, see [[manimgl-house-style-v2]]. Don't propose palettes again unless the user reopens it.
- Swap the palette at the kit level (the colour constants in the mobius/world/fraction kits, or a per-film override), not scene by scene.
- Leave the Euler film unchanged unless the user asks.
