---
name: blaney3-short
description: "output/shorts/blaney3 - Blaney 'what really happened with Hocevar' short (2026-09-26): NASCAR official Bristol fight footage + Blaney Kansas media session, no cards, delivered as its title.mp4"
metadata:
  node_type: memory
  type: project
  originSessionId: 3d12fe9f-5670-4e8b-9b0e-948737411aba
  modified: 2026-09-26T18:38:17.591Z
---

Short at `D:\flick\output\shorts\blaney3`, delivered as `Ryan Blaney JUST Revealed What REALLY Happened With Hocevar!.mp4` (15.55s, 1080x1920, -12.x LUFS, freeze check clean). VO = `Downloads\Music\tts-audio (69).wav` (14.92s). (`blaney1`/`blaney2` and long3 already exist for other Blaney stories.)

**Sources:** `fight.mp4` = NASCAR's official channel `MsJuBKfoTrs` "Carson Hocevar, Ryan Blaney Get Into It at Bristol" (5:44): #12 WABASH vs #77 ZEIGLER wreck, pit-road brawl with NASCAR "OFFICIAL" shirts, Blaney's USA Sports interview, Hocevar by his #77 (firesuit "@CarsonHocevar", windshield name plate). `talks.mp4` = first 3 min of Frontstretch's `S14H8q0IK1c` (Blaney's Kansas media session, Ford Racing hoodie + Cardell cap, Kansas Speedway backdrop, raw feed, no watermark). Rejected: `zucbKmYLL4Y` (USA Sports feed, permanent leaderboard/results ticker on most frames), `ARGk0Z6nP9Y` (Daytona pre-race interview, wrong context). Identity proof = car numbers/liveries + firesuit text; no lower-thirds needed.

**No card/stamp overlays** (user's standing "no card, put the fact on camera" ask from [[keselowski2-short]]); captions only, no SFX.

**Traps:** black eye is not visible in any footage (cap brim/lighting) - the caption claims it, footage doesn't show it. Background `yt_dlp` downloads started with `Start-Process` die when the session restarts; relaunch with `Invoke-CimMethod Win32_Process Create` (they then survive). A NASCAR-channel download can crawl at ~19 KB/s on one attempt and 2-3 MB/s on the next - kill and retry.

Related: [[flick-short-file-named-by-title]], [[flick-shorts-audio-level]], [[long3-blaney-bristol-film]].
