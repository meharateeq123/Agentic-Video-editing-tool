---
name: yuzidi8-short
description: "swimming/output/yuzidi8 - Yu Zidi vs McIntosh 200IM-gap short (2026-09-29): fresh-range-vs-prior-films accounting method, wrong-subject trap in a shared multi-swimmer source, lineup-graphic identity proof, loudness fix"
metadata:
  node_type: memory
  type: project
  originSessionId: 3d12fe9f-5670-4e8b-9b0e-948737411aba
  modified: 2026-09-29T12:49:39.404Z
---

Short at `D:\flick\swimming\output\yuzidi8`, delivered as `Yu Zidi JUST Got Dangerously Close to Summer McIntosh!.mp4` (21.29s, 1080x1920, -12.6 LUFS / -0.8dBTP, freeze-clean). VO = `Downloads\Music\tts-audio (84).wav` (21.24s). Script: her 200IM 2:06.10 is 0.40s behind McIntosh's WR, plus her 3 golds/3 records, closing on "how close by LA 2028?"

**No new footage was downloaded** - this is the 4th film drawing from `fly_full.mp4` (Yu Zidi 200 fly, Asian Games, CCTV5) after [[yuzidi5-short]], [[yuzidi6-short]] and [[yuzidi7-film]], plus a 5th McIntosh source (`mac_yiting_200im_panpac.mp4`, McIntosh + Yu Yiting 200IM Pan Pacs 2026) already downloaded for yuzidi7. Every prior film's used ranges were written out explicitly (start-end seconds) before picking anything new, then contact-sheeted the gaps and picked only there. `fly_full.mp4` is only 177.5s total and had already been touched almost everywhere by yuzidi7's dense long-film beat spacing (3s clips every 4.7s) - the only real fresh room left was 2.2-5.0s (before the zone yuzidi7 started from) and two stretches inside 158.4-177.5s that fell between yuzidi6's and yuzidi7's specific beats. Map this out explicitly for any 5th+ film off the same well - don't just re-skim a contact sheet and assume a timestamp is free.

**Wrong-subject trap in a shared multi-swimmer source.** `mac_yiting_200im_panpac.mp4` contains BOTH Summer McIntosh (lane 5) and Yu Yiting (lane 2) in the same 200IM final - grabbing a random confirmed-swimmer-looking frame isn't enough proof of *which* swimmer, since a "CHN" cap or a generic face could be either one. A frame at t=153s turned out to be Yu Yiting's own victory-cap moment ("YU YITING" printed on her cap), not McIntosh - would have shipped as a McIntosh beat if not checked. Fix used here: source the pre-race **lane-list graphic** itself (t≈8.4-9.9s, before the dive) which prints every swimmer's name against their lane number - "5 MCINTOSH" - and use that as the identity-proof beat instead of gambling on an unlabelled swim/react shot from a file with more than one swimmer in it.

**A "fill" mode graphic beat (blurred pillarbox + full-width foreground, for a wide lineup/start-list graphic that would lose its text if center-cropped to 9:16) still carries the source's channel bug across its FULL height**, because fill mode by design doesn't crop vertically - only the crop-mode beats' `s`/`cy` convention removes it. Fixed by cropping the top ~10% off *before* the width-crop-and-fill step in `bake.mjs`, same fraction as the regular crop beats use for this source.

**Timing tool used for the first time this session:** `SceneBed`'s `span` prop (real seconds of baked source) lets the bed auto-slow via `rate = min(1, span/need)` to cover a cut's full duration without ever running out - this is the right tool when the *fresh, unused* footage available is shorter than the scene needs (as it was here), rather than trying to force-fit exact-duration bakes. Rates as low as ~0.3x still read fine on mostly-static broadcast shots (a start list, a swimmer holding at the wall); reserve it for exactly that kind of shot, not fast action.

**Audio loudness fix applied for the first time end-to-end here** (per [[flick-shorts-audio-level]]): raw Remotion render measured -26.5 LUFS; `ffmpeg -af "volume=14.5dB:eval=frame,alimiter=limit=0.891:attack=5:release=60:level=false" -c:v copy -c:a aac -b:a 256k` as a post-mux pass on the finished video landed it at -12.6 LUFS / -0.8dBTP. Folded this into `render.ps1` as a standard final step now - every future short's render.ps1 should include it, not just measure-and-forget.

Related: [[flick-swimming-no-subtitle-clips]], [[flick-shot-relevance]], [[flick-long-film-clip-rules]] (its "never show a clip twice across films" rule extended to shorts here), [[yuzidi7-film]].
