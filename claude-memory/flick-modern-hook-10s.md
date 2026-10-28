---
name: flick-modern-hook-10s
description: "APPROVED default hook for every long film (2026-10-24, ching1): ~10s, VO-driven, hard cuts on the words, boxed clip on blurred sides, one small kinetic graphic per beat, music only"
metadata:
  node_type: memory
  type: feedback
  originSessionId: 2e97caa6-3697-4fd1-9ecd-29ea5a4bf3bb
  modified: 2026-10-24T12:23:04.603Z
---

The user approved this hook style on 2026-10-24 ("ab yai hook style yad rkhna hai"). It **replaces** [[flick-suspense-hook-format]] as the default for long films.

Template: `D:\flick\.claude\skills\flick\saved-animations\modern-hook-10s\Hook10.tsx` (original in swimming/output/ching1/remotion/src/components/Hook10.tsx, composition "hook").

**Format:**
- **Length:** about 10s, using the VO's own first sentence(s). End on a natural word, ideally the subject's name.
- **Audio:** the VO plays. NO clip sync audio and NO motion-graphic SFX. Background music only, alternated per video, mixed about 11 dB under the VO and faded over the last 0.5s; see [[flick-hook-music-rotation]].
- **Boxed look:** the sharp clip sits in a centred rounded box (x230 y150, 1460x822 in 1920 space, 4px white border, big shadow). The same clip plays blurred (40px, darkened) behind it, filling the sides. A slow zoom runs inside the box.
- **Cuts:** a hard cut on each VO phrase, every 0.7-2s. The only flashes are a white flash at frame 0 and small ones on the key beats. A fast face punch-in is allowed on the person's photo.
- **Graphics:** one kinetic graphic per beat, timed to the exact Whisper word:
  - a number slam ("7 EVENTS")
  - medal pops placed in the blurred strip ABOVE the box, with the words in the strip BELOW
  - "AGE 10" in a corner
  - a location pin with flag and typed coordinates
  - a rolling counter ("~500 SWIMMERS")
  - a name slam at the end: photo card with a rotating gold rim, first names light and surname heavy, flag plus "AGE · CITY"
- **Text size:** keep it SMALL. The user rejected huge type ("text buht bara hai"): about a 200px hero number, an 80px word, and a 40px label. Text must NEVER cover a face ("moo chup ra").
- **Footage:** only clips from the scenes the hook replaces, split into different moments. No image twice; for example, a crop of a photo counts as that photo.

**Why:** the user asked for a "modern" hook that finishes in 10 seconds, then iterated it in Studio (box with blurred sides, smaller text, face clear, no SFX) and approved it.

**How to apply:**
- Build this hook for every new long film and show it in Studio first.
- Then replace the opening scenes it covers, including any face card at the same word.
- Check stills for face overlap before showing it.
