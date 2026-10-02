---
name: lyles1-short
description: "Noah Lyles season-over athletics short (output/shorts/lyles1): where the footage came from, and the crop/board tricks that worked"
metadata: 
  node_type: memory
  type: project
  originSessionId: 3d12fe9f-5670-4e8b-9b0e-948737411aba
  modified: 2026-09-19T13:19:56.130Z
---

lyles1 (2026-09-19, `D:\flick\output\shorts\lyles1\lyles1-final.mp4`, 19.05s, 1080x1920) is the second
athletics short after richardson1 ([[flick-athletics-shorts]]). VO was `athlete3.wav` in Downloads\Music
(athlete4.wav is the Gout Gout script that followed it).

**Footage (all USA Track & Field / World Athletics official, all 720p h264):**
- `RdtCMkAvI90` USATF 2026 men's 200m final: Lyles is proven by the "NOAH LYLES" lower-third at ~0:15 and
  his lilac kit + hip bib 6. Blocks 42-56s, clapping/walking off 100-104 and 118-127, steady face 25-27s.
  There is a hard cut at 104.2 to Kaalund - a clip crossing it swaps athletes.
- `2UuSXzxR228` USATF 2026 men's 100m final: race 328, arms-out 342, and the NBC results board at 348
  (1 NOAH LYLES 9.79) which stands in for a card.
- `VGEP4NM60-c` World Athletics Day 3 highlights from Budapest, men's 200m at ~170-195s, used under
  "he missed Budapest" - no Lyles in it, so nothing is labelled as him.

**Tricks:** the results board is 456px wide, wider than a 9:16 crop of 720p, so crop.ps1 shows it whole
over a blurred fill (`l5c`) and lifts it 260px so the bottom caption clears its last rows. A moving face
needs a `crop=...:x='a+b*t/dur'` pan expression, not a fixed x. `-ss` before `-i` resets `t` to 0.

The user asked for no cards and clips with little on-screen text, so info is a `RankStamp` "9.79", a
`BigType` 2027/2028 and the real board. The Budapest cut includes one Budapest athlete close-up (not Lyles).
