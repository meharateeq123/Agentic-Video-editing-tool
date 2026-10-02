---
name: flick-ytdlp-fps-filter-trap
description: "A [fps<=30] yt-dlp filter silently drops NASCAR/FloRacing downloads to 480p, because their 1080p h264 streams are 60fps only."
metadata: 
  node_type: memory
  type: reference
  originSessionId: 3d12fe9f-5670-4e8b-9b0e-948737411aba
  modified: 2026-09-15T14:53:31.842Z
---

On cleetus5 (2026-09-15), `-f "bv*[height<=1080][fps<=30][vcodec^=avc1]"` returned **854x480** for NASCAR's YouTube uploads and for FloRacing sections. Their 1080p (and FloRacing's 720p max) h264 streams exist only at 59.94fps, so the fps filter skipped them without any error. Two downloads had to be redone.

The `[fps<=30]` filter was originally added because a 60fps download "hung at 0 bytes". On cleetus5 a 1080p60 part file looked stalled at 0 bytes but had reached 40MB by the time it was killed. yt-dlp writes the .part file late, so a 0-byte size is not proof of a hang.

**How to apply:**
- Use `bv*[height<=1080][vcodec^=avc1]` with no fps filter. Baked crops normalise to 30fps anyway (`fps=30` in the crop filter).
- Probe each file's resolution right after downloading, before any contact sheet or crop.
- Check a "stalled" download again after a minute before killing it.

Related: [[flick-no-av1-source]], [[flick-render-commands]].
