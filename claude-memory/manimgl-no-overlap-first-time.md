---
name: manimgl-no-overlap-first-time
description: "Every ManimGL film must come out with zero overlapping labels on the first pass; _check.py does not catch floor-label collisions, so run the label-overlap pass before showing the user."
metadata:
  node_type: memory
  type: feedback
  originSessionId: 235ea8ac-0266-4464-b2f5-9013b8b8160a
  modified: 2026-10-09T11:47:05.684Z
---

The user's standing requirement, stated 2026-10-09 after finding four overlaps
in the Pythagoras film by screenshotting the studio himself: **"koi overlap na
ho, aik hi go mai video perfect ho"** — no overlapping text anywhere, and the
film right the first time, not after rounds of him reporting faults.

**Why:** he reviews by watching, not by auditing. Every overlap he finds costs
him a screenshot, a message and a rebuild, and he has flagged overlap on more
than one film now.

**How to apply:** `_check.py` only tests the declared `subject_at` box against
the HUD bands. It cannot see two floor labels sitting on each other — that is
what got through on Pythagoras (Plimpton's caption on the timeline's "Babylon",
"China" on "Pythagoras", a formula on its own caption, and two tally numbers
stacked). So before showing any film:

1. Run the label-overlap pass (`OVERLAP=1` env in the kit's `run_clock`, which
   records every `Facing` label's projected box each frame and reports pairs
   that intersect while both are visible). Fix everything it lists.
2. Place dated or positional labels only after checking the values are far
   enough apart to label — two timeline stops 30 years apart land on the same
   pixel.
3. Alternate labels above/below a line rather than trusting index parity.
4. When a list of markers is shown one at a time, make the "which one is
   showing" test pick exactly one (`max(i for ...)`), never a per-item window
   that two items can satisfy at once.

Related: [[manim-framing-and-overlap]], [[pythagoras-film]], [[progress-updates]].
