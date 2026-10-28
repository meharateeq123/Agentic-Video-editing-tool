---
name: flick-person-image-cards
description: "Every long film needs box-style image cards (PhotoCard, big photo) for each named person - zhang12 shipped without any and the user called it out"
metadata:
  node_type: memory
  type: feedback
  originSessionId: 2e97caa6-3697-4fd1-9ecd-29ea5a4bf3bb
  modified: 2026-10-20T13:26:38.467Z
---

After zhang12 (2026-10-20) the user asked "image cards ki ni lagai?" (why are there no image cards?). The film had maps, bars, ladders, quotes and a post card, but no card for any named person.

**The rule:** when a named person is introduced (the main subject plus rivals like Yu Yiting, Wu Qingfeng, Ikee, Yu Zidi), show a box-style PhotoCard over the footage on the line that first names them: big photo on top, name, then a role/result line.

**Why:** the user said "next vid mai laga laina" (put them in the next video). They expect them in every film. Graphics variety ([[flick-graphics-variety]]) does not replace person cards.

**How to apply:**
- Add a `card` type to gfx/gen, using the PhotoCard from components, sized about 620 wide with a 420 image.
- Take the photo from a clean close-up frame in the footage, saved to public/id/.
- Plan these cards in gfx.mjs before the first render, not after.
- Related: [[flick-card-and-transition-style]], [[flick-shorts-visual-style-upgrade]].
