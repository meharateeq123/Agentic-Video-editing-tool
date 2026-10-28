---
name: zhang13-yuzidi17-shorts
description: "swimming/zhang13 (Zhang Yufei 0.03 100 fly loss) + yuzidi17 (Yu Zidi 3 golds at 13) shorts delivered 2026-10-27; sources, rejected traps, junctioned node_modules"
metadata:
  node_type: memory
  type: project
  originSessionId: 2e97caa6-3697-4fd1-9ecd-29ea5a4bf3bb
  modified: 2026-10-27T10:33:23.935Z
---

Delivered 2026-10-27 as title .mp4s (1080x1920, hard cuts, every clip at least 3s, no SFX, music bed only):
- **zhang13:** "Zhang Yufei JUST LOST GOLD by 0.03 SECONDS!" — 22.4s, -13.2 LUFS, Driving Ambition at 0.04 from 0:29.
- **yuzidi17:** "Yu Zidi JUST Proved She's a Swimming PHENOMENON at 13!" — 23.7s, -14.2 LUFS, Sports Highlights at 0.033.

**Sources used (now off-limits for later shorts):**
- **zhang13:**
  - rSBO6CSW55k: a re-up of NGYMugV8YGc. Used @74, @6.1, @76.45, @90.45 (YU YITING walk-out) and @82.45.
  - 96K22cNGT0E @74.95: Zhang with her 50 fly gold.
- **yuzidi17:**
  - swj9f_rjZqE: WION agency photos. Used @25.6, @35.3, @20.5. The strap starts at y 0.78, so s 0.76.
  - ZPlr2qP954U (mnews): used @30.8, @26.4, @38.6. The banner starts at 0.73, so s 0.72.
  - 8_q4d8WPNyw @36.9: podium.

**Rejected:**
- HCrHK_agPps "400混" is the National Games (4:34.33), not the Asian Games.
- tIR9DLPlOGw is an AI channel (burned captions, mixed photos).
- OyVps1MbOkQ is phone/training clips.
- 7X9rW_LpghE is volleyball.
- _WeNEjIBTQE (200 IM final) has been taken down.
- In rSBO6, the 中泳-sponsor shots and the Jeep/UMAY mixed zone are domestic meets.
- 96K22 @90 (fly photo) is Fukuoka per its own subtitle.

**Workflow that worked:**
- **Slow connection (~600 KB/s):** download 360p previews (`bv*[height<=360][vcodec^=avc1]+ba`; format 18 is gone), contact-sheet them, then fetch only the chosen IDs in 1080.
- **Disk:** remotion node_modules is 7.8 GB, so new projects use a directory junction to yiting1's node_modules instead of copying.
- **Helper scripts:** zhang13/sheet.mjs (timestamped contact sheets) and zhang13/qcbeds.mjs (first/mid/last frame of every bed).
- **TTS:** the VO said "Jeong Yufa" and "UZD". Subtitles use the script spelling.

See [[flick-hook-music-rotation]], [[yiting1-short]], [[zhang12-film]].
