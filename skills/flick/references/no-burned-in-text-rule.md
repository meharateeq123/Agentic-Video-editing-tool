# No Burned-In Text on Sourced Visuals

**The visual asset and the text layer are always separate.** Every word on screen must be
drawn by our own renderer (Step 3 / Remotion), never inherited from the footage or image
we sourced.

## Never use a visual that already contains

- Headlines, captions, subtitles, or quote text
- News-article screenshots or social-media post screenshots
- Thumbnails with big promotional text
- Telestration, on-screen stat cards, or lower-thirds
- Watermarks or promotional logo-with-text bugs (avoid where a clean alternative exists)

Two things go wrong when a text-bearing visual slips through:

1. **It names the wrong subject.** A championship-celebration compilation labels whichever
   driver is on screen — so a scene narrating *Larson's* winless streak ends up displaying
   another driver's name.
2. **It collides with our own typography.** Our heading sits top-left inside the safe
   margin; the clip's burned-in text lands wherever the original editor put it, and the
   two overlap. See [visual-relevancy-rules.md](visual-relevancy-rules.md).

## Instead

- Source a **clean photo or clip of the actual subject** — the driver, the car, the track,
  the pit lane, the race itself.
- Add every headline, stat, and caption **programmatically**, so font, size, position,
  animation and timing stay under our control.
- When a scene needs data on screen, build the graphic ourselves from
  [motion-graphic-templates.md](motion-graphic-templates.md) — we already have a full
  catalog. Never solve a missing visual by grabbing a pre-made graphic.

## Search discipline

**Do not search for "graphics" when a clean photo is needed.** Search for the actual
subject or event, and create the graphics yourself.

| Need | Search for | Not |
|---|---|---|
| A stat about a driver | that driver racing, onboard, in the garage | "driver stats", "career recap" |
| Standings / seeding | cars racing side by side | "standings explained", "playoff breakdown" |
| A milestone | the race or celebration itself | "top 10", "every winner", "greatest moments" |
| A location | the track, aerial or trackside | "track guide", "circuit explained" |

Title patterns that almost always carry burned-in text, and are rejected outright by
`auto-footage.mjs` / the multi-clip fetcher:

`every …`, `top 10`, `greatest`, `best …`, `biggest`, `worst …`, `wildest`, `moments`,
`compilation`, `countdown`, `ranked`, `recap`, `career`, `explained`, `breakdown`,
`analysis`, `stats`, `review`, `documentary`, `news:`, `inside the race`, `vs `,
`but it gets increasingly …`

Also rejected: video-game/simulator footage, fan-made "rebirth"/fantasy series, animated
`starting grid` / `starting lineup` car-render graphics, and drama/`fight`/`rage` clips.

## Checking before you accept

Look at the visual before using it. If visible text is present, reject it and find another.
A missing clean visual is fixed by searching differently — never by settling for a
text-heavy one.
