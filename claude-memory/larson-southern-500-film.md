---
name: larson-southern-500-film
description: "output/larson1 - Kyle Larson 2026 Cook Out Southern 500 documentary; cold-open hook clip architecture, render status, and what's left before it's final."
metadata:
  type: project
  originSessionId: 2e97caa6-3697-4fd1-9ecd-29ea5a4bf3bb
  modified: 2026-09-10T11:24:34.564Z
---

`output/larson1` - Kyle Larson at the 2026 Cook Out Southern 500 (started 25th, led a race-high 99 laps, lost it on a red-flag stay-out gamble to Bell, finished 5th, 51 races winless). Built on the same pipeline as [[bell-darlington-film]] and hamlin1 (reuses their transcoded Darlington bed-pool - `final-laps.mp4`, `southern500-highlights.mp4`, `postrace-interviews.mp4`).

**Cold-open hook clip:** opens on real YouTube footage (Bell passing Larson, `@NASCAR`'s race replay, 04:04:30-04:04:46) with its own original sound before any narration starts - see [[flick-hook-clip-boxed-style]] for the boxed-video treatment and word-by-word real-caption pattern used in `components/HookOpen.tsx`. The whole scripted timeline is offset by `HOOK_FRAMES` (`timeline.ts`) so `gen-timeline.mjs`'s own alignment math never needs to know the hook exists - this survives re-running `gen-timeline.mjs` with a real VO unmodified.

**Render status (as of 2026-09-10):** VO is in. The user had already saved it to `Downloads\Music\new.wav` (not the `tts-audio.wav` name expected by convention - check that folder by content/timestamp, not just filename, if a VO seems missing on a future film). Copied to `remotion/public/vo/tts-audio.wav` (309.40s) and `gen-timeline.mjs` re-run with it - real per-scene timing landed well short of the provisional word-count estimate (309.40s vs. 433.60s), so every scene in `footage.ts`'s `CHAINS` had to be trimmed down (never extended) to match the new, shorter `mounted()` duration per scene via `verify-chains.mjs`'s exact-match check - always dropping from the end of a scene's link list first so its earliest, most-deliberately-chosen shot survives. `TOTAL_FRAMES = 9762` (309.40s VO + 16.003s hook, 30fps). Full chunked render running via `render.ps1` (hook audio + real VO concat, not silence).

**How to apply:** if a future re-run of `gen-timeline.mjs` shortens scene durations again, expect to re-trim `footage.ts` the same way - `verify-chains.mjs` will point at exactly which scenes overshoot and by how much. Two visual bugs were found and fixed this session: Scene04's progress-rail overlap (see [[flick-moving-label-collision]]) and the hook caption's source-tag/verbatim-commentary/word-by-word corrections (folded into [[flick-hook-clip-boxed-style]]). No map/globe animation exists in this film - the script never references a location change, unlike bell1/hamlin1.
