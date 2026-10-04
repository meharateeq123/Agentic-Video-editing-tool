---
name: yuzidi10-film
description: "swimming/output/yuzidi10 long film (Swimming World 2026 rankings) delivered 2026-10-04; what was fixed, what is still reused"
metadata:
  node_type: memory
  type: project
  originSessionId: 3d12fe9f-5670-4e8b-9b0e-948737411aba
  modified: 2026-10-03T09:42:51.840Z
---

Delivered as `swimming/output/yuzidi10/Swimming World JUST Revealed Its 2026 Rankings - And Yu Zidi NAILED It!.mp4`
(7:53, 1080p, -14.8 LUFS, peak -0.3 dBFS; freeze check d=2 came back clean). The render was chunked, and the PC
powered off mid-render; re-running render-chunked.ps1 resumed from the parts already on disk.

The user's corrections on this film are now rules in [[flick-long-film-clip-rules]], [[flick-shot-relevance]] and
[[flick-graphics-variety]]. Scene 1 was rebuilt line by line. Scenes 2-18 still run on 3s recap slices
(s011-s170), but the user accepted them ("baki sab OK"). Known leftovers:
- the Scene 1 Yu Zidi clips reuse cgtn-asianrecord ranges that yuzidi1 already used
- eu46@108 overlaps popovici1

New for this film: components/Gfx.tsx (pie, line graph, etc.), plus fresh downloads in dl/:
- cg2026_best.mkv: Glasgow 2026
- yt_dNJeG-K1CPc and yt_vVSxM_edPCA: CGTN Yu Zidi Asian Games interviews, real motion

Rejected as photo montages: yt_JUrt3WoOFzw (WION) and yt_-NHp3dH_7HU (Sports Today).
