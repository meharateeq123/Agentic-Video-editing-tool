---
name: yuzidi7-film
description: "swimming/output/yuzidi7 delivered 2026-09-29; Yu Zidi vs Summer McIntosh comparison film, key QC lessons on footage sourcing and variety"
metadata:
  node_type: memory
  type: project
  originSessionId: 3d12fe9f-5670-4e8b-9b0e-948737411aba
  modified: 2026-09-29T11:10:28.379Z
---

# Yu Zidi vs Summer McIntosh film (yuzidi7)

Delivered 2026-09-29 as `swimming/output/yuzidi7/Yu Zidi JUST Set Up a HUGE Battle With Summer McIntosh!.mp4` (469.2s, 1080p, no freeze, mean_volume -31.5dB / max -13.5dB).

20 scenes, 169 beats. A two-swimmer comparison film: 13-year-old Yu Zidi's three Asian Games golds vs 19-year-old Summer McIntosh's world records.

## Sources
- YZF = fly_full.mp4 — Yu Zidi 200 fly, Asian Games Aichi-Nagoya (CCTV5 broadcast)
- YZH = cgtn_hist.mp4 — Yu Zidi post-race interview, Asian Games (CGTN)
- SMF = mac_200fly_wr.mp4 — McIntosh 200 fly WR, Canadian trials (CBC)
- SMI = mac_400im_wa.mp4 — McIntosh 400 IM, World Aquatics Budapest 2024
- SMY = mac_yiting_200im_panpac.mp4 — McIntosh + Yu Yiting 200 IM, Pan Pacs 2026 (USA Swimming)
- SMR = mac_400free_wr.mp4 — McIntosh 400 free, Canadian trials (CBC)
- SMB = mac_bowman.mp4 — McIntosh + coach Bob Bowman (CBC)

## QC lessons from this build

1. WION-style news packages can be disguised static-photo montages (pillarboxed/blur-padded stills) rather than real motion video — always frame-check EVERY intended timestamp before baking, not just spot-check. `wion2g.mp4`/`im400_wion.mp4` looked usable until a full frame-by-frame audit caught this. See [[flick-swimming-no-subtitle-clips]].
2. Never let 2+ consecutive beats in a scene share a source/camera even at different timestamps — it reads as duplicated footage. Interleave zones round-robin (`mix()` helper in `gen-plan.mjs`) and widen per-zone spacing.
3. Shot relevance: don't show an unnamed/uncovered person's footage during narration that's only about someone else, even if thematically related and named later in the script — relevance beats variety; a single-zone run is an acceptable trade-off when no alternative real footage exists. See [[flick-shot-relevance]].
4. The flat SVG `Globe` component (`components/Maps.tsx`, using `geo.ts` polygons + `ortho()`/`flat()` projections) is the WORKING map/globe option — self-contained, no missing deps. `components/RealisticGlobe.tsx` (3D WebGL globe) is currently BROKEN/unusable: its imported `./geo3d` helper does not exist anywhere in the codebase. Don't reach for `RealisticGlobe` until `geo3d.ts` is written. See [[map-animation-screen-time]].

Also: motion-graphic variety matters — don't default to the same 1-2 DataViz component types repeatedly; this build spread usage across IdCard, CompareBars, StatCard, Ordinal, RingStat, and PositionChart (extended with optional `yLabel`/`xLabel` formatter props to repurpose it as a generic time-series chart, not just lap-position).
