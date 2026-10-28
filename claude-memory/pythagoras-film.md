---
name: pythagoras-film
description: "Pythagoras proofs film (manimgl\\pythagoras): 11 scenes, VO-aligned, delivered 2026-10-07 at 2K; the TeX-cache poisoning trap that corrupted a scene's formulas."
metadata:
  node_type: memory
  type: project
  originSessionId: 235ea8ac-0266-4464-b2f5-9013b8b8160a
  modified: 2026-10-06T21:03:04.088Z
---

Math Sparks film on the proofs of the Pythagorean theorem, `D:\Animated Math\manimgl\pythagoras\`.

**Delivered 2026-10-07**: `render_pythagoras\They Called This Proof Impossible for 84 Years. (The Pythagorean Theorem Explained).mp4`, 2560×1440, 13456 frames, 7:28, 1.16 GB, AAC audio.

- Script 1294 words. Spine: a proof is a road, not a verdict — four proofs (rearrangement, Bhaskara, Euclid's shear, Garfield), then the reframe (the theorem only holds on flat space) and the payoff (Loomis called a trigonometric proof impossible in 1940; Zimba 2009 and then Jackson & Johnson, AMM lead article Nov 2024, ten proofs, nine new).
- **11 scenes, not 10** — scene 10 came out 74 s on the estimate and was split.
- VO was `Downloads\Music\tts-audio - 2026-10-07T134100.196.wav` (447.96 s) → `vo\pythagoras_vo.wav`; align matched 1253/1294 words.
- Studio keys p01–p11, `ACTIVE = "p"`.
- Kit `pythagoras_kit.py` = Graham kit (black floor + steel grid) plus `flat_world`, `Flat`, `Tri`, `Sq`, `Para`, `Globe`, `SkinArc`, `UnitCircle`, `Tally`, `sphere_point`, `great_arc`.
- The triangle is a 3–4–5 at half scale (a=1.5, b=2.0, c=2.5, cell 0.5), so the squares rule into **9, 16 and 25 countable cells**.

**Every proof's geometry was verified numerically, not by eye** (scripts in the scratchpad): both rearrangement layouts tile the big square 100% with no gaps or overlaps; Bhaskara's hole has all four sides = b−a; Euclid's rectangles are exactly a² and b² summing to c²; Garfield's trapezoid is ½(a+b)² and the bridge triangle has two sides = c; the globe triangle's corner is exactly 90° and c² falls 15% short of a²+b². Do this for any geometric proof film — a picture that is subtly wrong looks fine in a still.

**The trap that cost the most time: ManimGL's TeX disk cache.** `manimlib/utils/cache.py` keeps one shared `diskcache.Cache` at `%LOCALAPPDATA%\manim\manim\Cache`. Building **11 scenes in parallel** poisoned it — scene 6 rendered scene 4's formulas. Rebuilding scene 6 alone did **not** fix it, because the bad value was cached under scene 6's own key. The fix is `from manimlib.utils.cache import clear_cache; clear_cache()`, then rebuild. **Never build more than one or two manimgl processes at once when scenes contain TeX**, and if a scene shows another scene's formula, clear the cache before anything else.

Related: [[graham-rearrangement-film]], [[brachistochrone-black-floor]], [[studio-opens-old-film]], [[manimgl-studio-part-rebuild]].
