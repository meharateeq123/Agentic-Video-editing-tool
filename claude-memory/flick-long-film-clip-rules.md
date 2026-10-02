---
name: flick-long-film-clip-rules
description: "Standing rules for beat pacing in long swimming films (from yuzidi4 corrections) - every beat short, no repeats, relevance beats duration, plus the BedChain traps that broke it."
metadata:
  node_type: memory
  type: feedback
  originSessionId: 3d12fe9f-5670-4e8b-9b0e-948737411aba
  modified: 2026-09-24T11:36:07.611Z
---

User corrections while building yuzidi4 (Sept 2026), now standing for every long film:

- **Every beat is short: a video clip or a still image holds the screen at most ~3s.** A scene is a fast chain of many
  beats, never one clip/photo slow-mo stretched across 20-30s ("aik hi itna lamba", "yai image itni dfa dikha di").
- **Never show the same clip or image twice in a film.** Different range of a long source is fine; the same photo at a
  different zoom/offset is NOT (user counted it as repeated). Source many photos/clips instead of cycling a few.
- **Relevance beats everything**: never fill a scene about person A with person B's race video to dodge a repeat.
  If a real clip isn't there, use an image (Wikimedia via curl + en.wikipedia pageimages API), face card, or map.
- The only sanctioned fallback when unique content truly runs out: let that scene's beats run longer (<=8s), and
  say so. Two such stretches froze (freezedetect) in the yuzidi4 render - report it, don't hide it.
- Use everything the user gave: face (ID) cards on named people, map/globe beat (5-7s, over footage), real
  broadcast graphics; keep other graphics minimal.

**Why:** the user watched each Studio version and rejected static-looking, repeated or off-topic stretches three
times in a row.

**How to apply:** plan beats first (plan.mjs: scene -> ["SRC@m:ss", "IMG:name"], count = ceil(mounted/90)), bake
each as its own 3s file, validate no overlapping windows / no reused image, then QC contact sheets for on-screen text,
timecode burn-ins, logos, wrong person. Traps found: BedChain stretches the LAST link to fill the scene even for a
video (V+V chains froze); mp4s must be `-movflags +faststart` or Studio throws MediaPlaybackError; a "static" clip
(swimmer standing still) reads as an image - drop it; sideways (rotated) phone video exists in promo reels.
See [[flick-swimming-no-subtitle-clips]], [[flick-image-fallback-when-no-clip]].
