---
name: robots1-film
description: "output/robots1 Unitree H2-X kung fu 16:9 film (~27s script), first robot-sports video; built 2026-10-22 in Studio port 3013, no VO yet, not rendered"
metadata:
  node_type: memory
  type: project
  originSessionId: 0552e3d8-85cb-4605-b4f5-e1bcdeba125a
  modified: 2026-10-22T13:28:52.821Z
---

First robot-sports video (2026-10-22), `D:\flick\output\robots1`. Script is only ~70 words (~27s) but the user asked for 16:9 "long format" and said "vo ignore kro", so subtitles/beats run on ESTIMATED word timings until a VO arrives (`node build.mjs --vo <vo-words.json>` swaps in whisper timings, then rebake).

User asked to change the editing style this time, keep walsh5's FaceCard ([[walsh5-film]]), and make the motion graphics better. Build is a compact single-composition pipeline, not walsh5's 55-scene generator:
- `plan.json` (beats anchored to word index + per-source crop) -> `build.mjs` (data.ts + bakes) -> `grid.mjs` (first/mid/last bed QC grid).
- `components/BeatBed.tsx` cuts: punch / whip / glitch (RGB split) / flash / drop. `components/Gfx.tsx`: HookTitle, StrikeTag (HUD reticle), DemoCheck (tick/cross), HowFar (power meter), CombatTimeline. `Subs.tsx`: word-for-word, active word yellow.
- node_modules is a junction to walsh5's (D: had ~5 GB free).

Source traps: Unitree official uploads carry small corner text (crop h2x [0.9,0.9,0.05,0.015]); h2x@15-18 has a "High Platform" label; ucombat after 6s is a split-screen data view; Guardian WHRG has captions + logo; NHRL has DAZN bug + lower-thirds; BattleBots has title bar + BATTLE CLOCK (crop [0.6,0.6,0.24,0.17]); URKL scoreboard + HIGHLIGHTS badge.
