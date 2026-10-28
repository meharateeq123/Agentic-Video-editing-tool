---
name: shorts-no-dead-opening
description: "Standing rule from 2026-10-18: a Short must have real artwork on screen from the first second; no empty opening while the voice-over talks."
metadata:
  node_type: memory
  type: feedback
  originSessionId: 965b55a1-c203-4287-bdb0-90beabfbb7a1
  modified: 2026-10-25T17:43:38.133Z
---

Every second of a Short has to earn its place. The first 5-6 seconds must already carry the real subject, not just a caption over an empty frame.

**Why:** in the batch of ten delivered 2026-10-18 the user found "bht shorts thi jink frst 5 6 sec bilkul khali thi" — several opened on near-black. Measuring the ink below the caption band confirmed it: four of the ten sat at 0.0-0.4% for the first five to seven seconds. A viewer scrolls past an empty frame before the payoff ever arrives.

**The cause, so it does not repeat:** I hung each opening on its first *spoken* cue. If the set piece is tied to a phrase that lands at six seconds, the frame stays black until then. The script's words pace the middle of a Short; they must not decide when the picture starts.

**How to apply:**
- The main set piece starts arriving by about `t = 0.2` and is substantially on screen by `t = 1.0`, whatever the voice-over is saying. Early cues control *detail*, never *existence*.
- Write opening levels as `window(t, 0.15, 0.6)`, not `window(t, SOME_CUE - 0.2, ...)`.
- A growing thing (a list, a crowd, a plot, a trajectory) should already be growing during the hook; the named moment then lands on something the viewer is watching, not on a reveal from nothing.
- **The specific trap, hit twice more on 2026-10-25:** a progress function written as `N * ease(window(t, 0.15, SOME_LATE_CUE))` looks like it starts at 0.15, but easing across a ten-second window means barely anything is drawn for the first few seconds. Give growth its own short window (`window(t, 0.15, 2.6)`), finish it in about 2-4 s, and let it simply sit there when the narration catches up.
- Test a growth function before rendering: print it at t = 0.5, 1, 2, 3. If it is near zero at t = 1, the opening is dead.
- Check it, do not assume: sample frames at 1..7 s, drop the top 30% of the frame (the caption band) and measure the fraction of pixels above ~45/255. Under about 1% is a dead opening. Healthy shorts in that batch ran 1.5-13%.
