---
name: coetze3-short
description: "swimming/output/coetze3 \"Pieter Coetze JUST WON $100,000 After a DRAMATIC Finish!\" short delivered 2026-10-20; Astana sources + traps"
metadata:
  node_type: memory
  type: project
  originSessionId: 2e97caa6-3697-4fd1-9ecd-29ea5a4bf3bb
  modified: 2026-10-20T09:38:17.060Z
---

Delivered 2026-10-20 as its title .mp4 (1080x1920, 23.7s, -13.3 LUFS, no freezes). Built on the coetze2 template; graphics moved to the top band (Band y 430, Question top 190, Slab pos 'top').

Sources (fresh, never used before; now off-limits for later shorts):
- ctwDHDvv2hQ: World Aquatics Astana stop 3 highlights. The 50 back final runs 552-587s (Coetze at the wall 582s, lower third 22.36). The Coetze 100 back win is at 258s.
- Mh1uWN8caSU: World Aquatics Astana recap.
  - 29-35s: Coetze and Steenbergen with the overall trophies.
  - 35-50s: Coetze interview.
  - 150.0-151.16s: Coetze in his RSA cap and hoodie.
  - 151.2-160.2s: Coetze walks to the blocks, then the backstroke start.
  - 206s: the stage with the "2026 CHAMPION 100,000 USD" cheques.
- No new Kornev close-up exists. H0OppcK6WSg was already used in kornev2/3.

Traps:
- The VO says "Peter Coetzi" and "Ager Kornov". vo_words.py (whisper small) dropped "won", so the subtitles were built from the full transcribe.py output via words.mjs.
- render.ps1 is a double-quoted PowerShell string, so "$100" in the title expands to nothing. Rename the output afterwards.
- A face high in the source plus graphics at the top means a collision. Use 'fill' mode or crop tighter so the face sits at y~700-1250.
- The bake gained a `speed` (slow-mo) field for too-short shots.
