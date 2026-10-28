---
name: flick-hook-music-rotation
description: "Hooks get NO motion-graphic SFX, only background music; alternate the user's two mixkit tracks video by video"
metadata:
  node_type: memory
  type: feedback
  originSessionId: 2e97caa6-3697-4fd1-9ecd-29ea5a4bf3bb
  modified: 2026-10-27T10:33:25.024Z
---

User (2026-10-24, ching1 Hook10 test): no SFX on motion graphics in the hook, only a background music bed. The two tracks are used one per video, alternating:
1. `mixkit-sports-highlights-51.mp3` (Downloads\Documents and Downloads\Music; 123 BPM, full energy from second 0). Used in **ching1**.
2. `mixkit-driving-ambition-32.mp3` (Downloads\Music; 99 BPM, quiet start, big lift at ~38.5s). Used in **haughey3** (from 0:29, vol 0.045). Then #1 again in **xu1** (vol 0.035). Shorts 2026-10-27: zhang13 = Driving Ambition (0.04, from 0:29), yuzidi17 = Sports Highlights (0.033). **NEXT video: Driving Ambition**, then alternate.

**Why:** the user wants the hook clean (music only) and doesn't want the same music in back-to-back videos.

**How to apply:**
- Before using a track, check this file for which one is next, then update it.
- Mix the music about 11-12 dB under the VO; measure both with ebur128, never guess. Sports Highlights at volume 0.16 came out LOUDER than the -28.7 LUFS VO; 0.035 was right. Re-measure Driving Ambition, which is quieter.
- Fade the music out over the last 0.5s of the hook.

See also [[flick-suspense-hook-format]], [[ching1-film]].
