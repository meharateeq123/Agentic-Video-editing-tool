---
name: flick-info-without-cards
description: "Cards stopped being the default way to put a fact on screen; prefer the real broadcast graphic, a stamped number, or full-bleed type"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 3d12fe9f-5670-4e8b-9b0e-948737411aba
  modified: 2026-09-17T20:02:29.982Z
---

On richardson1 the user said: "zaroori ni hai information k lia card use kro, koi or approach use
krlia kro" (2026-09-18) — a card box is no longer the automatic answer for every fact.

**Why:** by then every short in the library was solving each number the same way, with a rounded
translucent card sliding up from the bottom. It had become a tic, and it also buries facts that the
footage already shows better than a rebuilt card can.

**How to apply:** reach for these first, and only build a card when none of them fit.
- **Let the broadcast graphic do it.** richardson1's scene 4 had to land "10.76 behind
  Jefferson-Wooden and Alfred"; instead of a card, the bed is the real SEIKO photo finish cropped
  hard so its printed result list (1 JEFFERSON-WOODEN 10.62 / 2 ALFRED 10.74 / 3 RICHARDSON 10.76)
  fills the frame. Crop tight — at full frame height that on-screen text is far too small on a phone.
- **Stamp the number onto the footage.** `RankStamp` in `components/Stamp.tsx`: giant hollow
  outlined type (`WebkitTextStroke`, transparent fill) that slams down on the word, no box.
- **Full-bleed type instead of a caption.** `BigType` for a name/venue beat — richardson1's scene 5
  drops the caption track entirely and the words ATHLOS / LONDON land one per spoken word.
- **A broadcast bug, not a card**, for place and date: `VenueStamp` is an accent rule plus two lines
  pinned top-left.
- **Sometimes nothing.** A line that names a person the footage can't verify gets no graphic at all.

**Captions stay at the bottom.** richardson1 raised them in scene 4 to clear the photo finish's own
result list, and the user called it out: "captions neechai likhnai thai" (2026-09-18). The `Caption`
`bottom` prop exists but is not the fix — re-crop or re-pick the shot so the lower third of the
frame is free, and leave the caption where every other short in the library puts it.

Related: [[flick-card-and-transition-style]], [[flick-minimize-plain-text-scenes]],
[[flick-shorts-energy]], [[flick-shot-relevance]].
