---
name: stick-figure-shorts
description: "The monochrome stick-figure look for maths Shorts (shorts\\stick_kit.py), started 2026-10-11 from a reference video; how the rig, the void stage and the no-VO pacing work."
metadata:
  node_type: memory
  type: project
  originSessionId: 965b55a1-c203-4287-bdb0-90beabfbb7a1
  modified: 2026-10-11T19:17:09.963Z
---

A second look for Shorts, alongside House Style v2: flat black void, white line art, a posable stick figure. Asked for on 2026-10-11 after the user shared a reference video (@banti_ki_lab "MATHEMATICA", an Alan Becker *Animation vs Math* style piece). The kit is `D:\Animated Math\manimgl\shorts\stick_kit.py`; the first one made with it is `The Calculus That Makes AI Learn`. See [[mobius-shorts]] for the shared workflow.

**Why:** the house style is a 3D lit stage. This look is 2D, monochrome and character-led, so it needs its own stage, camera and rig rather than a reskin.

**How to apply:**
- Build in the **x-y plane with phi = 0**, not the x-z plane the other kits use. `drift()` replaces `alive()`: slow zoom and pan only, since any phi wobble tilts a flat composition.
- `Void` is black with a soft radial spotlight (a PNG written once) and grain. No floor, no grid, no colour but `INK` and `HAZE`.
- `Figure.put(feet, pose, level, scale)` places the figure by its **feet**, so it stands on any curve. Poses are joint angles: `stand(t)`, `walk(p)`, and `blend_pose` between them. Arms need a shoulder angle of about ±0.5 rad; anything smaller and they hide against the torso and the figure reads as a head on a pair of legs. Scale about 1.3 for a 7-unit frame.
- `place()` in this kit sets opacity directly. house_v2's `fade()` only understands glow groups and throws `'Tex' object has no attribute 'alphas'` on a plain mobject.
- 9:16 is narrow: at frame height 7 the usable width is only about 3.9 units. Stack set pieces **up the frame**, never side by side; a net beside a figure beside a digit overflows by half.
- **No voice-over** on this one, at the user's request. The captions carry it, and the script is used only for the shape of the pacing, then scaled to a flat 35 s (`SPEED = TOTAL / cue.total`). `render_short.ps1` now gives a silent `-Final -Title` run its proper title and the FINAL copy.
- "Simple si hai" (2026-10-12): the first cut was judged too plain. What fixed it — camera kick and a white frame-flash on every impact, sparks running the wires forward then racing back for backpropagation, the figure knocked back by the error rather than just surprised, maths symbols drifting up past it, dust at each footfall, and the loss bar tied to the real `L(w)` so it visibly shrinks on the way down. Build these in from the start on this look.
- **Sound is synthesised, not downloaded**: `make_sfx.py` in the Short's folder imports the scene to read its own beat times, builds clicks, whooshes, thuds, a riser, chimes and a low drone with numpy, and writes `sfx.wav`. Nothing to licence and it cannot drift out of sync. `render_short.ps1` uses `sfx.wav` as the track when there is no `vo.wav`, normalising to about -14 LUFS.
- A gradient-descent walk should be real: iterate `w <- w - eta * L'(w)` at import and assert it settles. Keep the ripple on the loss curve small enough that `L'` stays increasing, or the walk stalls in a local dip, and start the walk inside the drawn span of the curve.
