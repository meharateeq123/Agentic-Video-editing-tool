---
name: sha3-bolt1-shorts
description: "sha3 (Sha'Carri NOT giving up) and bolt1 (Bolt 9.58 untouchable) shorts delivered 2026-10-16 with the new hero motion graphics (components/Gfx.tsx)"
metadata:
  node_type: memory
  type: project
  originSessionId: 235ea8ac-0266-4464-b2f5-9013b8b8160a
  modified: 2026-10-16T15:53:19.279Z
---

Both in `D:\flick\output\shorts\`, delivered 2026-10-16 as their title .mp4s (1080x1920, ~-13.5 LUFS). Built in the Rise and Run framing ([[reference-framing-rise-and-run]]): 7-9 long continuous beds, subject filling the frame, yellow one-word subs, zoom-punch + short blur cuts (no white flash). The user asked for "heavy, beautiful" motion graphics, so these have them.

- **Gfx.tsx** (sha3, extended in bolt1): RankPanel, Stopwatch (ring + rolling number + shockwave), GapMeter, YearsSpan, TimeBars, Challenge. Graphics sit in the band y≈1080-1420, between faces and subtitles. Copy this file into the next shorts.
- **bake.mjs** gained a pan (cx -> cx1, ffmpeg crop x expression) and a 'fill' mode with a crop share (a board that must read whole).
- sha3 facts were read from the Budapest board: MJW 10.62, Alfred 10.74, Richardson 10.76 (gap 0.14); London 10.80.
- bolt1: Berlin 2009 from World Athletics ol9fiOAditk; Tokyo 25 (Seville 9.77) from nOjWjGrjUCo.
- Traps: the London slow-mo has a focus pull at about 170.5s; trim beds before camera focus pulls and scene cuts (find them with ffmpeg scene detect at 0.12).
- `output\shorts\vo_words.py <proj> "Wrong=Right"` writes vo-words.json and words.ts.
