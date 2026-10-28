---
name: yuzidi16-film
description: "swimming/output/yuzidi16 \"The Truth About Yu Zidi\" long film, 2K, built 2026-10-19 with new animation types (ladder, race, medals, waffle, post) + world SilkMap"
metadata:
  node_type: memory
  type: project
  originSessionId: 2e97caa6-3697-4fd1-9ecd-29ea5a4bf3bb
  modified: 2026-10-19T16:01:01.598Z
---

swimming/output/yuzidi16: "The Truth About Yu Zidi: China's 13-Year-Old Swimming Sensation!" (VO 494.44s, 53 scenes, 184 beds), rendered at 2K 2026-10-19 as "The Truth About Yu Zidi - China's 13-Year-Old Swimming Sensation!.mp4".

New reusable pieces (copy from here for future long films):
- components/Extra.tsx: Ladder (dated results rail), Race (two-lane gap replay), Medals (gold discs), Waffle (10x10 % grid), Post (quoted social post) - gen.mjs types ladder/race/medals/waffle/post, per-graphic `hold`, quote `plain` (no quote marks for paraphrase).
- SilkMap.tsx: whole-world mkgeo (lon wrapped to [-30,330) so China->LA crosses the Pacific), `hl` country-name glow, always-on push-in so map beats never freeze, city `side: 'l'` for right-edge labels.
- bake.mjs: parallel (4 ffmpeg) + PREREF per-ref crop overrides.

Traps hit:
- gen.mjs `sub=${JSON.stringify(undefined)}` and quotes inside strings break JSX -> attrs must be `={${JSON.stringify(v ?? '')}}`. Don't edit gen via `node -e "..."` in PowerShell: `$` in double quotes gets expanded.
- WION banner starts ~0.77 of height: crop [0.72,0.72,0.14,0.04]. CCTV5 bug in Iy/F/Ar needs >=11-15% off top/left. Aq and Rm (and Cg/Ng) were the same source twice.
- A map keyed to the last word of a sentence gets ~1s - key maps on the sentence's first word.

Related: [[yuzidi10-film]], [[flick-long-film-clip-rules]], [[olympic-channel-logo]], [[map-animation-screen-time]]
