---
name: maths-shorts-formulas-on-top
description: "In maths Shorts, equations and numbers go at the TOP of the frame, never the bottom, where YouTube's UI covers them."
metadata:
  node_type: memory
  type: feedback
  originSessionId: 965b55a1-c203-4287-bdb0-90beabfbb7a1
  modified: 2026-09-29T09:32:50.061Z
---

In every maths Short, formula cards, equations and numbers go at the top of the 9:16 frame and never in the bottom band.

**Why:** on 2026-09-28 the user sent a screenshot of the Euler quarter-turn short playing on a phone, with "(−1)×(−1) = 1" and its gloss under YouTube's title and player controls. They asked that future shorts put these at the top only.

**How to apply:**
- `short_kit.VEquationCard` now defaults to `side="up"`.
- When a headline Stamp is up at the same time, pass `under="<stamp name>"`; `place_cards` then drops the formula below that headline.
- In `BANDS`, formulas are ("up", frac), and the frac has to cover headline plus formula when both are shown.
- Don't use side="down" for anything the viewer must read.
- Related: [[mobius-shorts]].
