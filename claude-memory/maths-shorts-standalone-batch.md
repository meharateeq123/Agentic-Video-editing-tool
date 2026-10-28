---
name: maths-shorts-standalone-batch
description: "Standalone maths shorts in manimgl\\shorts (Banach-Tarski, Gabriel's horn, Cantor, sphere eversion, four-colour, 0.999...): what each one computes for real, and the traps hit building them."
metadata:
  node_type: memory
  type: project
  originSessionId: 965b55a1-c203-4287-bdb0-90beabfbb7a1
  modified: 2026-10-18T16:07:25.764Z
---

A run of standalone maths shorts (no CTA, each ends on a question), built 2026-10-11 on `shorts\pyth_kit.py`. See [[mobius-shorts]] for the shared workflow.

Delivered: `bt_s1` "The Math That Turns One Ball Into Two!", `horn_s1` "The Shape You Can Fill but Never Paint!". Built and aligned, awaiting the render call: `inf_s1` (Cantor), `sphere_s1` (eversion), `map_s1` (four colours), `nine_s1` (0.999... = 1).

**Why:** these topics are easy to fake and easy to get wrong. Each one computes its claim rather than drawing a picture of it.

Added 2026-10-11: `The Secret Formula Hidden Inside Every Polyhedron` (poly_s1, Euler V-E+F=2) and `The Math That Builds Waves From Waves!` (fourier_s1, square wave from sines), both VO-aligned and checked.

Added 2026-10-16, both delivered: `The Circle Trick That Predicts Who Survives` (Josephus) and `The Billiard Table That Can Predict Chaos`.

A batch of ten delivered 2026-10-18, collected in `shorts\10 Maths Shorts\`: prime gaps, Euclid, pi, great circles, the golden ratio, GPS, Fourier/music, Lorenz, the birthday problem and Monty Hall.

**How to apply:**
- Each of the ten computes its claim: Euclid's 30031 = 59 x 509 (both off the list), the birthday crossing found by search at 23/50.73% with C(23,2)=253, Monty Hall enumerated over all three cases, GPS trilateration solved from the circles and checked against the truth, the music spectrum recovered from the wave by DFT, and the Lorenz pair diverging 1e-5 -> 24.
- The golden spiral must be a true logarithmic spiral. Stitching quarter-arcs per square left gaps of up to 1.7 units and looked tangled; `r = r0 * phi^(-2*theta/pi)` wound clockwise from the outer corner stays inside the rectangle.
- Labels that all sit at the same height under a row smear together. Show one at a time in a fixed spot (the prime factorisations), stack divisions in one column, and never draw five harmonic traces at one z.
- `\div` renders as a stray glyph in this TeX setup; use `/`.
- Numbers within 1e-16 of 1 collapse to exactly 1.0 in float64. Carry near-one values as the log of their distance below 1.
- Josephus plays the real game at import with a deque (rotate, popleft), so the dots die in the true order; an assert ties the survivor to the simulation, to 2L+1, and to the binary roll (100 = 1100100 -> 1001001 = 73). The binary trick makes the best payoff shot.
- Eliminated dots must fade to near nothing (floor about 0.05, not 0.18) or the ring never looks like it is thinning.
- The billiard short reflects off the true boundary each bounce. A stadium is chaotic and a circle is not, which is exactly the script's closing line: the gap goes 0.001 -> 1.55 in 26 bounces on the stadium, but only to 0.033 on the circle. Don't assert the circle keeps them to within 0.02 — its growth is linear, not zero.
- When two paths lie on top of each other, draw one wide and one narrow so it still reads as two.
- `poly_s1` counts V, E and F off each solid: convex hull, triangles merged back into real faces by their plane, edges from each face's rim, and an assert that V - E + F = 2 for all five. Cube 8/12/6 and dodecahedron 20/30/12 come out right.
- Four solids in a row leave no room for a caption each in 9:16; a 2x2 grid does.
- `fourier_s1` sums the real series, and the overshoot settles at 1.179 (the Gibbs constant), which is the check that it is right. Draw ONE period across the frame: two periods make the ripples too fine to read as waves, and they come out as fuzz.
- `map_s1` builds a Voronoi map, reads adjacency off the shared ridges, and 4-colours it by backtracking; an assert at import checks no two neighbours match, and the same search confirms no 3-colouring exists. A greedy 3-colour attempt must colour every region and only *record* where it jams — breaking out of the loop leaves most of the map grey.
- `inf_s1` runs the real diagonal: digit `d` becomes 5, or 6 when it is already 5.
- `sphere_s1` everts by sweeping a front from pole to pole, not by flipping the whole sphere at once: a single `cos u` factor must cross zero, which sends the surface flat mid-way. Recentre on the z extremes (precomputed table) or it sinks. It is an illustration, not a verified immersion, and the file says so.
- `nine_s1` hit the cue trap again: "The repeating decimal" also matches "Call the repeating decimal x" earlier in the script, so two HUD cards showed at once. Anchor with following words. Symptom to watch for: two headlines overlapping in a still.
- A still at the wrong moment hides a bug. The sphere's eversion ran 4.9-8.9 s and the stills at 3/8/13/20 s all missed it; sample inside the animated stretch.
