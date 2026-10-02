---
name: milak1-short
description: "swimming/output/milak1 - Kristof Milak 49.48 European record short (2026-09-25): three Paris 2026 broadcasts + Tokyo 2020 Dressel WR, delivered as its title.mp4"
metadata:
  node_type: memory
  type: project
  originSessionId: 3d12fe9f-5670-4e8b-9b0e-948737411aba
  modified: 2026-09-25T11:41:26.988Z
---

Short at `D:\flick\swimming\output\milak1`, delivered as `Kristóf Milák JUST Came 0.03 Seconds From History!.mp4` (20.99s, 1080x1920, mastered to -12 LUFS, freeze check clean). VO = `Downloads\Music\tts-audio (46).wav` (20.44s; Whisper hears "Christoph Malak"/"Taleb Dressel", script spelling used in captions). `milak1-quiet.mp4` is the unmastered render.

**Sources (all yt-dlp h264, in `dl\`):** the same 2026 European Championships men's 100 fly final (Paris) from three feeds - Eurovision Sport `QcA3_B0R_AU` (nat2, best: name lower-thirds "HUN Kristof MILAK 5", results graphic, "ER 49.48"), RTVE `Luuxb8C8Hf4` (nat1), france.tv via WATERLIFE_MED `dxH3KOOI7s4` (waterlife); Tokyo 2020 100 fly final `3gEUxFMwv1c` swimramp (dressel: cap "DRESSEL", graphic "C. DRESSEL WR", "NEW WR 49.45"). Milak ID card = crop of nat2@170.6; Dressel card = Wikimedia photo (Wikimedia's Milak pageimage is a 2018 Youth Olympics shot of unproven identity, so not used).

**Gotchas:** contact-sheet labels can be 1-3s off the real cut points (fps filter) - always bake then look at the 9:16 windows. In race overhead/side shots the swimmer can't be named (side tracker follows a red cap, not Milak), so only lower-third/reaction/finish beats carry his name. Broadcast lower-thirds sit at ~y 1700 of 1920: captions over those beats use `bottom={430}`. `RankStamp` `y` shifts the stamp by y/2 (centred flex) - -1300 puts it above a mid-frame fill graphic. Wide graphics use bake 'fill' (crop + blurred backdrop).

Built from [[tsmith2-short]]'s scaffold (node_modules is a junction to tsmith2's). Related: [[flick-short-file-named-by-title]], [[flick-shorts-audio-level]], [[flick-long-film-clip-rules]].
