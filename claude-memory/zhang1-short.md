---
name: zhang1-short
description: "swimming/output/zhang1 - Zhang Yufei 50m butterfly Asian Games 2026 short (2026-09-26): host-broadcast sections of Aichi-Nagoya day 6, delivered as its title.mp4"
metadata:
  node_type: memory
  type: project
  originSessionId: 3d12fe9f-5670-4e8b-9b0e-948737411aba
  modified: 2026-09-26T15:30:35.198Z
---

Short at `D:\flick\swimming\output\zhang1`, delivered as `Zhang Yufei JUST Dominated the Asian Games AGAIN!.mp4` (20.65s, 1080x1920, -13.0 LUFS, freeze check clean). VO = `Downloads\Music\tts-audio (56).wav` (20.1s). Built from [[popovici1-short]]'s scaffold and bake.mjs.

**Sources:** one video, the full host-broadcast session of Aichi-Nagoya 2026 swimming day 6 (`AEnPtu7jM78`, GreekVideos upload, 2:22:20) - downloaded as a 360p scan copy first (`session_lo.mp4`) to find timestamps, then re-pulled as separate 1080p sections with `yt-dlp --download-sections "*start-end"` (no re-encode, ~2x realtime): `race.mp4` (session 3:35-10:50, women's 50 fly final: start list, walk-outs, finish, results board, crowd), `podium.mp4` (40:20-46:30, 50 fly victory ceremony - lower-thirds "IKEE Rikako BRONZE", "ZHANG Yufei GOLD", "WU Qingfeng SILVER"), `relay.mp4` (1:42:00-1:53:00, women's 4x100 medley relay - cap "CHN ZHANG YUFEI"), `cer.mp4` (2:08:00-2:20:30, relay ceremony). ID cards cropped from race.mp4@337.6 (Zhang) and podium.mp4 (Wu@262.3, Ikee@220.6).

**Traps:** yt-dlp's `--download-sections` needs `--ffmpeg-location` pointed at a real ffmpeg-static build or it silently re-encodes (first attempt produced a corrupt 0.6x-speed file); re-running without a stray re-encode filter fixed it. The full-session 360p scan (525 MB) is the fast way to find rough timestamps on a 2h22m broadcast before committing to a 1080p pull - contact-sheet it in 5-10min chunks. Script's "Rikako Ikee grab bronze" (present tense) kept as-is per VO. Related: [[flick-short-file-named-by-title]], [[flick-shorts-audio-level]].
