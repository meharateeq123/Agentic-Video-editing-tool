---
name: flick-image-fallback-when-no-clip
description: "when no usable video clip exists for a beat, fall back to a still image (Wikimedia, Pexels, wherever needed) instead of forcing an irrelevant/duplicate/subtitled/watermarked clip"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 3d12fe9f-5670-4e8b-9b0e-948737411aba
  modified: 2026-09-23T10:14:20.192Z
---

When a real video clip genuinely cannot be found for what a line needs (after an honest search), fall back to a still image instead - pull it from Wikimedia Commons, Pexels, or wherever else is needed. Don't force through a clip that fails the other QC gates (duplicate, irrelevant/"fazool", subtitled in any language, logo/watermark-heavy, wrong person) just because it's the only video footage available.

**Why:** user's direct instruction, given right after tightening the clip QC gates ([[flick-swimming-no-subtitle-clips]]) - the two go together: reject a bad clip, then use an image rather than a compromise clip.

**How to apply:**
- Video footage is still the default and preferred choice per [[flick-no-game-footage]] and [[flick-shot-relevance]] - only drop to a still image when a real search for video genuinely comes up empty for that specific beat.
- Source the image from Wikimedia Commons or Pexels first (free-use, no watermark issues); use whichever actually has the right shot.
- Treat an image beat like the existing non-card info treatments in [[flick-info-without-cards]] - place it cleanly (e.g. full-bleed or in a bordered box per [[flick-hook-clip-boxed-style]]), not as a plain thumbnail slapped on screen.
- Still applies alongside every other gate: no duplicate use across a project or across earlier shorts/films, no burned-in subtitles/watermarks on the image either, and it still has to actually match the line being spoken.
