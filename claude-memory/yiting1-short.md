---
name: yiting1-short
description: "swimming/output/yiting1 \"Yu Yiting JUST DESTROYED a 14-Year-Old Chinese Record!\" (4:22.74 400 IM, Astana) short delivered 2026-10-21"
metadata:
  node_type: memory
  type: project
  originSessionId: 2e97caa6-3697-4fd1-9ecd-29ea5a4bf3bb
  modified: 2026-10-21T07:41:34.752Z
---

Delivered 2026-10-21 as its title .mp4 (1080x1920, 22.1s, -12.6 LUFS). Built on the walsh4/coetze3 template, with graphics at the top.

Sources:
- **LvMxdWBZ_Q0:** 体育心知晓 Chinese re-up of the actual Astana 400 IM final, the only 400 IM footage on YouTube.
  - Yu on deck: 30.5-33 (left side, cx 0.17).
  - Yu close-up behind the blocks: 37.5-41.
  - Underwater: 57-61. ASTANA wall: 65-67.
  - Burned subtitles sit at the bottom ~0.93 and the channel watermark top-left down to ~0.18, so crop s<=0.62, cy~0.52.
- **ye-shiwen-london** (linked from yuzidi16): walkout at 12s, at the wall at 58.6s. Crop away the 200 IM lower third.
- **aEVTqyxMCOo:** Pan Pacs 2026 200 IM. Yu at the wall at 306-312s.
- **Off-limits:** the World Aquatics stop reels (Baku V9Pp, Tashkent fEZR, Astana ctwD) were already used by earlier shorts. The Astana reel only has her 200 IM anyway (lower third 2:02.63).

Trap: contact sheets made with `-ss X` show timestamps relative to X. Add the offset back before baking (the first bake hit the medal girls instead of Yu).
