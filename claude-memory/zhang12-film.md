---
name: zhang12-film
description: "swimming/output/zhang12 \"Zhang Yufei JUST MADE HISTORY AGAIN! 13 Asian Games GOLD MEDALS!\" long film, 2K, built 2026-10-20 on the yuzidi16 pipeline"
metadata:
  node_type: memory
  type: project
  originSessionId: 2e97caa6-3697-4fd1-9ecd-29ea5a4bf3bb
  modified: 2026-10-20T12:05:05.687Z
---

VO 468.5s, 59 scenes, 182 beats. Built on the yuzidi16 pipeline ([[yuzidi16-film]]): shots, align, plan, bake, gen, verify, then a 2K render with 3 workers.

**Sources:** zhang3 dl was hardlinked (race, podium, relay, cer, nat25, jkt18, fuk23, hz23, tok20relay, yzfly), plus the zhang9 / yuzidi16 sources. New downloads:
- w5jG8peU8Ec: photo slideshow
- WcuGsLbnHqY: Tokyo 2020 200 fly full final
- Ki4ZY9yR1RY: CGTN interview and training
- 30NclAemE_c: Incheon 2014 50 fly
- U-GolOipSXY: CGTN Hangzhou
- lgovFker6mg, 3FBj3ruFJa4: Hangzhou clips
- -azEJuQK15k: National Games 200 fly, 2021

**Traps:**
- **NGYMugV8YGc (the 100 fly "final"):**
  - It's a Chinese edit that mixes in old footage: an OneAmerica US-meet banner, a Paris cap, and burned text like 漫天水雾.
  - Only shots whose own subtitle says 名古屋 / 0.03, or that show a YU YITING / ZHANG YUFEI cap, are usable. Crop the bottom 20%.
  - No clean 100 fly broadcast exists.
- **Japanese photo slideshows (w5jG8peU8Ec, 9WT_Uwy2aDg) mix Hangzhou 2023 and Nagoya 2026:**
  - Hangzhou: purple 杭州第19届 backdrop, white-red China jackets.
  - Nagoya: light-blue jackets, red "20th Asian Games" backdrop.
  - The real Nagoya hug video is in 96K22cNGT0E (Macao Daily, Mc1@24-42; crop its subtitles).
- **Wrong-person traps:**
  - race.mp4 R14 is a man.
  - X6_DyG7 Xr2 is the Hong Kong team.
  - cer.mp4 C18@3 is Japan.
  - Mp6 is Yu Yiting, not Wu.
- **yzfly has CCTV5 bugs top-left and top-right.** Crop [0.81,0.81,0.1,0.19].
- **The TTS misreads numbers:** "2006" for 2:06.61, "33 to" for 3:33.10, "340.43.8", "0.3" for 0.03, "Jung Yufae". Graphics show the right values; tell the user.
- **Map camera math:** y = 540 + (camLat - lat) * 34 * zoom. Keep the pin y below ~850 so the tag fits.
