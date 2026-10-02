---
name: zhang2-short
description: "swimming/output/zhang2 - Zhang Zhanshuo 200 free Asian record short (2026-09-26): how to pull one race out of a 2.5h session upload"
metadata:
  node_type: memory
  type: project
  originSessionId: 2e97caa6-3697-4fd1-9ecd-29ea5a4bf3bb
  modified: 2026-09-26T18:59:22.962Z
---

Short at `D:\flick\swimming\output\zhang2`, delivered as `Zhang Zhanshuo JUST SHATTERED an Asian Record!.mp4` (20.01s, 1080x1920, -12.6 LUFS, freeze-clean). VO = `Downloads\Music\tts-audio (59)_3.wav` (19.96s). Subject: his 1:43.49 in the men's 200 free at the 20th Asian Games, Aichi-Nagoya 2026, beating Hwang Sun-woo. **Not** [[zhang1-short]], which is Zhang *Yufei* - different swimmer, hence zhang2.

**Getting the clean feed out of a long session upload.** No standalone clip of this race exists; the only clean host-broadcast copy was inside `nXd4S_UrGg0` (GreekVideos, "Swimming Finals Day 4", 2h33m). The recipe:
1. Pull a 240p scout of the whole thing (`-f "wv*[height<=240]/w"`, ~42 MB) and contact-sheet it at 180s, then 40s, to find the event.
2. The broadcast's own graphics are the landmarks: the session schedule at t=0, a "Start List - Final" card before each race, the "Results - Final" card after, and the victory-ceremony name plates.
3. Download just that window at 720p with `--download-sections "*START-END"`. **Video-only (`bv*`), no `+ba`** - with the audio merge the download stalled at 0 bytes twice; video-only ran at ~700 KB/s. Shorts carry no source audio anyway.

**Identity.** Two Chinese swimmers in this final - lane 2 ZHANG Zhanshuo and lane 7 XU Haibo - so a red Team China tracksuit proves nothing (same trap as [[ohashi1-short]]). What works: his white Speedo cap has **"ZHANG ZH" printed on it**; the broadcast's lane name bars read "ZHANG Zhanshuo / MURASA Tatsuya / HWANG Sunwoo" over the closing metres; the winner lower-third reads "WINNER - ZHANG Zhanshuo - AR 1:43.49". Xu Haibo's walk-out (his own lower-third names him, race200 ~96-110s) is unused. The ID-card photo is cropped from the CGTN mixed-zone interview (`Kc-iQ-QGGYk`, clean, no subtitles).

**Rejected:** `nYxcquoWhbc` (Yonhap, burned-in Korean chyrons over the bottom third).

Related: [[flick-swimming-folder]], [[flick-short-file-named-by-title]], [[flick-shorts-audio-level]], [[flick-swimming-no-subtitle-clips]].
