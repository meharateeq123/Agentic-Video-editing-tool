---
name: zhang3-film
description: "swimming/output/zhang3 - Zhang Yufei 50m fly Asian Games title-defense long film; delivered 2026-09-28 at 1080p (2K upscale cancelled by user - deliver 1080p only)."
metadata:
  node_type: memory
  type: project
  originSessionId: 3d12fe9f-5670-4e8b-9b0e-948737411aba
  modified: 2026-09-28T13:54:46.092Z
---

Long film "Zhang Yufei JUST SHOCKED the 50m Butterfly With an EPIC 25.4!" (VO 7:21/441.32s, no hook, 20 VO-aligned
scenes, 161 beats). Delivered as `D:\flick\swimming\output\zhang3\Zhang Yufei JUST SHOCKED the 50m Butterfly With an
EPIC 25.4!.mp4`, 1920x1080. **User explicitly cancelled the 2K upscale mid-run ("bas 1080 mai hi rehne do") - the
delivered file is 1080p only, not 2560x1440.** Freeze check was clean (zero freeze_start lines); audio mean -31.6dB /
max -12.9dB.

- Structure: same tsmith1 architecture (BedChain/Overlay/IdCard/DataViz/SceneTransition, plan.mjs+bake.mjs pipeline,
  align-timeline.mjs). 8 overlay scenes (03 Zhang IdCard, 04/06/09/12/17 CompareBars, 11 Ikee IdCard, 13 StatCard "12
  career medals"), 12 plain-footage scenes.
- Sources (dl\): race/podium/relay/cer.mp4 (reused from zhang1, Aichi-Nagoya 2026 Asian Games broadcast, Tokyo
  Aquatics Centre), nat25.mp4 (2025 China National Games 50fly final - **CCTV5 logo bug, cropped
  `crop=iw:ih*0.82:0:ih*0.18`**), jkt18.mp4 (Jakarta 2018 Zhang vs Ikee 100fly - **TBS banner bug, cropped
  `crop=iw:ih*0.75:0:ih*0.25`**), fuk23.mp4 (Fukuoka 2023 Worlds, Zhang's 25.05 PB), tok20relay.mp4 (Tokyo 2020
  4x200 free relay ceremony), zzs200.mp4/yzfly.mp4 (reused from zhang2/yuzidi5, identity pre-verified).
- Caveats reported to user: no footage exists for the June 2026 China National Championships (spoken only in VO);
  Incheon 2014 has zero footage (spoken/captioned only, no visual claim made); Wu Qingfeng's 50m freestyle win at
  these Games has no dedicated footage (spoken only, not shown).
- Render: chunked 300-frame parts, GPU angle. Concurrency was bumped 2->3 mid-render on user request for speed
  ("yar fast karo speed") - held stable at ~2GB free RAM on this 8GB box, no crashes, ~57s/part vs ~70s/part at
  concurrency=2. render.ps1 still has the automatic 1080p->2K lanczos upscale tail; it was killed and the partial 2K
  file deleted per the user's "rehne do" - re-run only the upscale ffmpeg step manually if a 2K version is wanted
  later (source: the delivered 1080p file itself, or video-only.mp4 + vo/vo.wav if still present).

**Folder-collision incident (2026-09-28), now the reason for [[flick-swimming-folder]]'s slug-check rule:** partway
through the first render attempt, a *different, parallel Claude Code session* (working on shorts) reused the same
project slug `zhang3` for an unrelated short film about the same swimmer/event and overwrote this project's entire
Remotion code in place - all 20 scene files, timeline.ts, footage.ts, Root.tsx, FinalFilm.tsx, render.ps1, bake.mjs,
and every baked beat in bed-pool were destroyed. Recovery was possible only because `plan.mjs`, `source-script.txt`,
`vo-words.json`, `vo\vo.wav` (the master VO), and the raw `dl\` sources were untouched (they predated the collision
window) - the whole pipeline (bake.mjs, timeline.ts via align-timeline.mjs, footage.ts, all 20 scenes, the 3 ID
photos) was rewritten/regenerated from those survivors and re-verified with fresh QC stills before rendering again.
The other session's completed short was preserved (moved, not deleted) to `output\zhang4`. **Lesson: before starting
any new project under `output\`, check whether that folder name is already in use by another in-progress build - see
[[flick-swimming-folder]].**

Related: [[tsmith1-film]], [[zhang1-short]], [[zhang2-short]], [[flick-swimming-no-subtitle-clips]],
[[flick-long-film-clip-rules]]
