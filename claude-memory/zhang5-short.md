---
name: zhang5-short
description: "swimming/output/zhang5 - Zhang Zhanshuo 7-golds short (2026-09-30): reused zhang2's downloads at fresh ranges, official Start List/Results broadcast graphics as identity proof, wide-panel graphics need fill mode"
metadata:
  node_type: memory
  type: project
  originSessionId: 3d12fe9f-5670-4e8b-9b0e-948737411aba
  modified: 2026-09-30T10:52:51.942Z
---

Short at `D:\flick\swimming\output\zhang5`, delivered as `Zhang Zhanshuo JUST Did Something NO Swimmer Had Done Before!.mp4` (20.01s, 1080x1920, -13.4 LUFS / -1.0dBTP, freeze-clean). VO = `Downloads\Music\tts-audio (86).wav` (19.96s) - a same-timestamp candidate `(87).wav` was a different short's VO (World Cup calendar), caught by transcribing both before picking.

No new download - reused zhang2's `race200.mp4` (the 200m free final broadcast) and `Kc-iQ-QGGYk.mp4` (CGTN interview) at ranges disjoint from zhang2's own beats (listed in `bake.mjs`'s header).

**The broadcast's own "Start List - Final" and "Results - Final" graphics are excellent identity proof** - both print every swimmer's name against a lane/rank number directly, no need to gamble on an unlabelled face/cap shot. The Results card also happened to print the exact stat the script needed ("1 ZHANG Zhanshuo AR 1:43.49"), reused as both b-roll and the "1:43.49" stamp's backing plate.

**These graphics are a split panel (info left ~55%, pool video insert right)** at native 1280x720 - too wide for a straight 9:16 crop without losing the time/name column, same problem as [[yuzidi8-short]]'s lineup graphics. Fixed the same way: `fill` mode (crop the panel's own pixel width, keep full height, scale-to-fit-width with blurred pillarbox) instead of a centred crop.

**The graphic doesn't start the instant its scene does** - probed a `-ss` frame at the timestamp a coarse contact-sheet suggested and got a celebration replay, not the Results card; the card actually starts ~4-6s later than the contact-sheet cell implied. Always confirm the *exact* onset with a direct frame pull at the intended bake offset, not just the nearest contact-sheet cell.

Related: [[zhang2-short]], [[flick-swimming-no-subtitle-clips]], [[flick-shorts-audio-level]].
