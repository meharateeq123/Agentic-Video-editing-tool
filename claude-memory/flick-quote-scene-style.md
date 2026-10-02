---
name: flick-quote-scene-style
description: "Quote scenes are a sharp, unblurred lower-third caption at bottom-centre — not every scene needs a full graphic with a dimmed/blurred clip behind it."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 2e97caa6-3697-4fd1-9ecd-29ea5a4bf3bb
  modified: 2026-09-09T09:17:25.919Z
---

Not every beat needs the full-graphic treatment (centred card, heavy `dim`/`maxBlur` on the footage). Direct quote — someone's own words on screen — should read as a **caption over a clean shot**, not a card over a darkened one: text sits in the bottom third, centred, with just a soft gradient scrim behind it for legibility, and the footage underneath stays close to full brightness and sharp (`dim` ~0.08, `maxBlur` ~2, vs. the ~0.5-0.6 / 15-19 used for stat cards and lists).

**Why:** On hamlin1 the quote scenes (6, 9, 19) were built like every other graphic scene — centred block, heavy blur/dim — and the user's note was direct: it isn't necessary to show a graphic and blur the clip everywhere; for a quote, show it bottom-centre and don't blur the clip.

**How to apply:** For a scene whose whole content is a spoken quote, use a bottom-anchored text block, a `linear-gradient(to top, rgba(6,6,8,0.86) 0%, ... 0% at ~55-60% height)` scrim instead of the BedChain `dim`, and drop `maxBlur` to ~2. Keep the [[flick-graphic-exit-timing]] rule (fade out ~1s after the last line completes) exactly the same for these too. This is specific to *quote* scenes — stat cards, lists, and comparison panels still get the full dimmed/blurred treatment. Related: [[flick-card-and-transition-style]].
