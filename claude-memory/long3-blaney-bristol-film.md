---
name: long3-blaney-bristol-film
description: "output/long3 Blaney Bristol crash/fight film, rendered 2026-09-21; sources, VO defects, hook choice."
metadata: 
  node_type: memory
  type: project
  originSessionId: 2e97caa6-3697-4fd1-9ecd-29ea5a4bf3bb
  modified: 2026-09-23T10:10:47.832Z
---

output/long3 (Ryan Blaney's Bristol Disaster) rendered 2026-09-21 to long3-final.mp4 (7:12, 44 chunks in ~65 min, no failures, freeze check clean). VO was `tts-audio (33).wav` in Downloads\Music (6:57).

Hook: user-supplied clip MsJuBKfoTrs 2:17-2:30 (source 137-150s), 13s full-screen with its own audio, no riser (clip-supplied override). Sources all fresh: NASCAR official Bristol highlights/drivers/final laps, FOX chaos, Frontstretch Blaney, Stratta, Atlanta 2025 (kteROVOO4nU), Blaney 2023 title (Xgzp70_jVRA, 360p), NASCAR Radioactive Gateway (y0G1eNxtxFE). Do not reuse st3dX3_-x10 / W1u734oeW1o ranges (logano2/larson3).

**VO defects flagged to user:** TTS says "22 laps" where script says 202 (3 places, scenes 2/5/26); script attributes "I was going to play the audience" to Blaney but on-camera speaker is Hocevar (scene 12 shows crowd only, no quote bar).

**Also flagged after delivery:** at least one clip in this film carried burned-in Chinese subtitles - should have been rejected at sourcing, not shipped. See [[flick-swimming-no-subtitle-clips]] for the standing no-subtitle QC gate this caused (now applies to every film, short and long, any sport).

**How to apply:** check TTS numbers with whisper `small` on a cut of the wav before stamping numbers; broadcast quote footage often plays over replays, not the speaker's face.
