---
name: flick-shorts-energy
description: "Shorts need energy - fast punch/flash cuts, popping cards, and SFX on motion-graphic entries ONLY (never on cuts, scene changes or the ending)"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 3d12fe9f-5670-4e8b-9b0e-948737411aba
  modified: 2026-09-20T10:56:01.658Z
---

After swimming short sc27 (4 scenes, 1.2-2s dissolve cuts, no sound effects), the user said "yar maza ni aya last video mai ismai thora maza ana chahia" (2026-09-17).

**Why:** a short made of plain dissolves with silent cards feels flat, even when the footage and facts are right.

**How to apply:** the sc28 pattern (`D:\flick\swimming\output\sc28`) is the answer given:
- ~1-second cuts where the line allows.
- A white-flash + zoom-punch entry on every internal cut (`scenes/Cuts.tsx` PunchIn).
- Cards that pop with overshoot.
- **Sound: SFX only where a motion graphic appears. Nowhere else.** This landed in stages and the
  current rule is the one to follow:
  - After hocevar2 (2026-09-17) the blanket SFX track was cut back to a single end-scene riser; on
    elliott3 the riser went too ("usmai sai bhi last pai rise sound khtm krdo"); on richardson1
    (2026-09-18) "wo scene chanjai honai pai sound ni lagana" removed the per-cut whoosh; re-stated
    on melissa1 and walsh2. **A scene change, an internal cut and the ending stay silent — always.**
  - Then on kerr1 (2026-09-20) the user asked for one thing back: "jab koi motion graphic appear
    hota hai to uska sfx lagao like phlai jo use kr rai thai." So `FinalFilm.tsx` carries a `HITS`
    array again, but it may contain **only** graphic-entry hits — `sounds/Pop.mp3` at ~0.35 when a
    bug/card slides in, `sounds/Impact.mp3` at ~0.4 on a slammed number. kerr1 has two graphics and
    therefore exactly two hits. The assets live in `public/sounds/` (copy from hocevar2).
  - A scene that is playing the footage's own real commentary gets no synthetic sound over it at
    all — see [[flick-shorts-audio-level]].
  - The flash/punch cuts stay regardless; they are picture, not audio.
  **When scaffolding from a prior project, check its `HITS` array against this rule rather than
  keeping or deleting it wholesale.**
- **Cards are the exception, not the default, and real on-screen evidence beats a built one.**
  On walsh2 (2026-09-18): "koshish kro card wala kam use kro is short mai kiu card tum laga daitai
  wo show hota rhta" — cards get used too often and then sit on screen. That short shipped with
  zero synthetic cards: the real Fort Lauderdale results board ("Walsh, G NYAC 29.24 54.33") was
  cut to on the stat line and carried the fact itself. Look for a scoreboard, timing bug, or
  broadcast lower-third in the footage before building a card.
- **The last scene has to SHOW something.** elliott3 closed on WJHL b-roll of an empty Bristol
  grandstand and an empty garage: "eliot k last scene ni sahi… usmai kuch dikhaya hi ni hai"
  (2026-09-18). Fixed by swapping in real Bristol night-race action (3 cuts) plus a "Next race —
  BRISTOL / 500 laps / 0.533 miles" card. Empty-venue scenery reads as nothing happening; the
  closing scene needs moving subject matter and a graphic, same as the middle scenes.

Keep every effect well under the VO. Related: [[flick-card-and-transition-style]],
[[flick-footage-pacing]], [[flick-shorts-audio-level]].
