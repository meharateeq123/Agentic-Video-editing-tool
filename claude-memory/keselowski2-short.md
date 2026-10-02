---
name: keselowski2-short
description: "output/shorts/keselowski2 - RFK Racing crew chief change short (Bullins out, Skarbowski in) delivered 2026-09-26 as its title.mp4; both named people verified via real lower-thirds, no card overlays"
metadata:
  node_type: memory
  type: project
  originSessionId: 3d12fe9f-5670-4e8b-9b0e-948737411aba
  modified: 2026-09-26T16:57:23.706Z
---

Short at `D:\flick\output\shorts\keselowski2`, delivered as `Brad Keselowski JUST Got a BRAND-NEW Crew Chief!.mp4` (17.26s, 1080x1920, -12.2 LUFS, freeze check clean). VO = `Downloads\Music\tts-audio (68).wav` (16.2s).

**User's ask this time:** "agar koi fact dikhana hai to camera mai AI sai trah" - no card boxes at all; if a fact needs graphic support, it rides directly on the footage. Since both named people already have real broadcast lower-thirds in the source, this film uses **zero synthetic overlays** (no IdCard, no Stamp) - just the real graphics as shot, plus bottom captions.

**Sources, both official RFK Racing channel uploads (not the AI-recap channels that dominate search results for this story):**
- `shoptour.mp4` (`vSBKdOQzbU0`, "RFK Racing Shop Tour with Brad Keselowski") - lower-third confirms "BRAD KESELOWSKI, DRIVER/OWNER - RFK RACING" at ~0:11; also carries garage/car B-roll (No. 6 and No. 17 cars, pit crew).
- `podcast.mp4` (first 4 min of `O0e-7Ir-ZVQ`, "Backstretch Banter" downloaded via `--download-sections` with `--force-keyframes-at-cuts`) - lower-third confirms "JEREMY BULLINS, CREW CHIEF, NO. 6 CAR" at ~1:33, exactly matching the script's claim.

**No footage exists anywhere for Mike Skarbowski** (the incoming crew chief) - every search result is an AI-narrated recap channel (SPORTSWIRE USA, NASCAR Rush, Pujan Bhai Comedy, etc.), never an official shot of him. Per the never-show-wrong-person rule, he is named only in captions, never shown as a face.

**Wide-text lower-thirds need `mode: 'fill'`** in bake.mjs (blurred backdrop + centered full-width scale) - a plain 9:16 crop clips "BRAD KESELOWSKI" / "JEREMY BULLINS" mid-word since the real graphic spans close to the full 1920px width.

**Download trap:** `yt-dlp --download-sections` piped through a fresh `ffmpeg-static` sometimes stalls indefinitely mid-download (confirmed by an unchanging log timestamp for 5-10 min) even though the process is still alive - kill and relaunch rather than waiting it out.

Related: [[flick-short-file-named-by-title]], [[flick-shorts-audio-level]], [[keselowski-hocevar-film]].
