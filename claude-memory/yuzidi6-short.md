---
name: yuzidi6-short
description: "swimming/output/yuzidi6 - Yu Zidi 3-golds short #2 (2026-09-28): crop the top 20% off to kill channel bugs; recap-cut sources hide anchor shots between swim shots"
metadata:
  node_type: memory
  type: project
  originSessionId: 2e97caa6-3697-4fd1-9ecd-29ea5a4bf3bb
  modified: 2026-09-28T11:55:18.162Z
---

Short at `D:\flick\swimming\output\yuzidi6`, delivered as `Yu Zidi JUST Made Her 13-Year-Old Season Even CRAZIER!.mp4` (18.65s, 1080x1920, -12.5 LUFS, freeze-clean). VO = `Downloads\Music\tts-audio (71).wav` (18.60s). Same subject as [[yuzidi5-short]] (her three Asian Games golds) but a different script/title, so all footage ranges are disjoint from that one's.

**The user's three rules for this build:** her face must be in frame, no clip carrying a channel logo or a burned-in banner, and no clip shown twice.

**How the logo rule was met - and the mistake to not repeat.** Both usable sources carry a bug in the top strip: `hattrick` (Sports Roundup) top-LEFT only, `fly_full` (host broadcast) CCTV-5 top-left AND top-right plus a Chinese banner top-CENTRE. My first pass cropped `s <= 0.80` with a low `cy` on *both*, which chopped the top 20% off everything - and the user came back with "doosri pic mai face cut ra ha": the podium shot lost the top of her head. The right rule is per-source:
- **hattrick**: the bug is only top-left, and a 9:16 window centred at `cx 0.5` on a 1920-wide frame spans x 0.365-0.635, so it is already excluded horizontally. Use `s = 1.0` (full height) and never crop vertically.
- **fly_full**: the top-centre banner *is* inside a centred window, so it does need `s = 0.90, cy = 0.55` (top 10% off).

Rejected outright: `wion_400` and `im400_wion` (WION burns a two-line headline strap across every frame) and `cgtn3g` (a Chinese domestic meet, 4:34.33 - not the Asian Games).

**Repetition.** The user also flagged "pehli wali image to bohat ziada use ki" - the same tight white-cap close-up was carrying 3 of 12 beats, and separately 5 beats were the same "CHN YU ZIDI at the wall" setup. Count *shot setups*, not timestamps: two beats cut from the same continuous camera read as one clip even seconds apart. Final mix is 4 faces from genuinely different moments (white cap, dark cap, podium), 4 race angles, 3 wall shots, 1 lane-bar name graphic.

**Trap that cost three re-bakes:** `hattrick` is a news recap, so it cuts between swim footage and a studio anchor every few seconds. Contact-sheet tiles at 4s intervals land on the swim shots and hide the anchor shots in between, so offsets picked off the sheet kept landing on the anchor (5 of 12 beds on the first bake, then 2 more that I had not re-checked - one of them under the 4:28.56 stamp). On a recap-cut source, pull a frame at the intended in- AND out-point of every beat before rendering, not just the ones that looked wrong. The shots also cross-fade out, so the last ~0.3s of a bed can be a washed-out dissolve.

One graphic only: "4:28.56 / Games Record" stamp on the spoken number.

Related: [[flick-swimming-folder]], [[flick-short-file-named-by-title]], [[flick-shorts-audio-level]], [[flick-swimming-no-subtitle-clips]].
