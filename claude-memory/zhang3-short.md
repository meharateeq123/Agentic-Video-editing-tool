---
name: zhang3-short
description: "swimming/output/zhang4 (moved from zhang3 after a folder collision) - Zhang Yufei 50 fly short #2 (2026-09-28): second short off the same race as zhang1, all-fresh ranges"
metadata:
  node_type: memory
  type: project
  originSessionId: 2e97caa6-3697-4fd1-9ecd-29ea5a4bf3bb
  modified: 2026-09-28T13:55:13.056Z
---

**Path correction (2026-09-28):** this short was originally built at `output\zhang3`, but that slug was already
in use by an unrelated long-film session ([[zhang3-film]]) - the long-film session found the collision, preserved
this short's finished files by moving them to `D:\flick\swimming\output\zhang4`, and rebuilt its own project at
`zhang3`. Everything below still describes this short accurately; read `output\zhang3` as `output\zhang4` in every
path. See [[flick-swimming-folder]] for the slug-collision rule this incident produced.

Short at `D:\flick\swimming\output\zhang4`, delivered as `Zhang Yufei JUST Showed Everyone She’s STILL Here!.mp4` (18.82s, 1080x1920, -12.7 LUFS, freeze-clean). VO = `Downloads\Music\tts-audio (72).wav` (18.76s). Same event as [[zhang1-short]] (the women's 50m butterfly final at Aichi-Nagoya 2026), different script and title, so every range is disjoint from the ones zhang1 used - those are listed in the header of this project's `bake.mjs`.

**No new downloads.** `zhang1\dl\race.mp4` and `podium.mp4` are sections of the host broadcast and are far from exhausted: the start-list card, per-swimmer walk-out bars, the race, the wall, the results card and the whole victory ceremony.

**Identity came free from the host feed**, which is why this one needed no guessing: her white cap is printed "ZHANG YUFEI"; the start-list and results cards name every swimmer (1 ZHANG Yufei 25.41, 2 WU Qingfeng 25.62, 3 IKEE Rikako 25.97); the beat that names Wu Qingfeng is **her own walk-out bar** ("WU Qingfeng CHN 26.00"); and the Ikee beat is the podium itself, with CHN gold, CHN silver and JPN bronze all standing on it. Rejected: `zhang_int` (a studio presenter, not Zhang, with a "sports scene" bug every frame) and `wu12` (a team celebration with no name on screen).

**Scene split note:** "touching in 25.41" is only 1.5s on its own, too short for the 25.41 stamp to land and leave. Merged it into scene 1 (199 frames, 4 cuts) so the stamp has room - though it still gets a shorter hold than the usual ~1s.

**Two traps hit:** a `Copy-Item -Recurse` onto an existing `remotion` folder nests it as `remotion\remotion` and leaves a mixed scaffold - delete the target first, and `Set-Location` out of it or the delete fails with a file lock. And a curly apostrophe (U+2019) in a filename breaks the PowerShell command wrapper - build the name with `[char]0x2019` instead of typing it literally.

Related: [[zhang1-short]], [[flick-swimming-folder]], [[flick-short-file-named-by-title]], [[flick-shorts-audio-level]].
