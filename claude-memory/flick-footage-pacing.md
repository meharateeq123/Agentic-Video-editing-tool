---
name: flick-footage-pacing
description: "Never stretch one clip's playback rate to cover a long scene — cut in another relevant clip to fill the scene instead."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 2e97caa6-3697-4fd1-9ecd-29ea5a4bf3bb
  modified: 2026-09-05T20:32:45.433Z
---

When a scene's duration is longer than what one sourced clip comfortably covers, do not slow that single clip down further to stretch across the whole scene. Cut to a second, relevant clip partway through the scene to complete it instead — same approach `footage.ts` already uses in reddick1 for scenes needing a longer span (the `bed-pool/*-long.mp4` second fetches), but the user's rule is broader: apply it as the default whenever a clip is at risk of running long/extreme slow-mo, not only when a second fetch happens to already exist.

**Why:** The user flagged this directly while a new project (cleetusdev1) was being set up — extreme slow motion on a single clip reads as sluggish/unnatural compared to cutting to more real footage.

**How to apply:** When building `footage.ts`/bed maps for any flick project, check the implied `playbackRate` for a bed (span vs scene duration). If a single clip would need heavy slow-down to fill a scene, split the scene into two beds from different (but topically related) clips instead of one stretched bed. Related: [[reddick-southern-500-film]].
