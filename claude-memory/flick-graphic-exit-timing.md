---
name: flick-graphic-exit-timing
description: Every on-screen motion graphic must smoothly fade out ~1 second after its content finishes animating in — not hold for many seconds then hard-cut at the scene boundary.
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 2e97caa6-3697-4fd1-9ecd-29ea5a4bf3bb
  modified: 2026-09-12T17:46:49.389Z
---

**Standing rule, stated on hamlin1, missed and re-flagged on keselowski1, then missed a THIRD time on cleetus2 (every one of its 8 card scenes had a fall-start hardcoded seconds-to-minutes after content completion, e.g. Scene06 holding a stat card from frame 46 complete to frame 400 fall-start — over 11s of dead static hold):** once a graphic's last element finishes its entrance animation, hold for ~1 second (30 frames at 30fps), then fade it out smoothly over the same ~40-frame window the entrance used. Do not let it sit static until the scene's own transition-out or the `BedChain` cut takes it away.

**This is now a build-time checklist item, not just a review-time catch:** when writing ANY new card/stat/quote/comparison scene, compute `W[2]` from the content's own completion frame in the SAME edit that writes the entrance animation — never write a placeholder fall-start (like copying the scene's total duration or an arbitrary round number) intending to fix it later. The pattern of missing this three separate times across three films is copying an old scene's `Win` tuple as a template and not recomputing `W[2]`/`W[3]` for the new scene's actual content timing.

**Why:** With a `Win = [riseStart, riseEnd, fallStart, fallEnd]` overlay window (see `components/Bed.tsx`'s `band()`), the natural mistake is picking `fallStart` near the *scene's* end rather than near the *content's* completion. On hamlin1's first pass every scene had this bug — `fallStart` was hardcoded 5-15 seconds after the last element finished, so cards sat frozen with nothing new happening long after the narration had moved past them (caught via a screenshot of Scene03's stat plates sitting fully static well past when "+25" had finished landing).

**How to apply:** For every scene, find the frame the *last* element completes its `ease(frame, at, at+len)` entrance (i.e. `at + len` for the latest-starting element), then set `W[2] = that + 30` and keep the original fall duration (`W[3] - W[2]`, typically ~40 frames) so `W[3] = W[2] + ~40`. Check this arithmetic explicitly for every card/stat/quote scene before calling a film's motion graphics done — don't eyeball it. Related: [[flick-card-and-transition-style]], [[map-animation-screen-time]].

**Reference to copy from:** the SHIPPED `D:\flick\output\cleetus2` now obeys this exactly in all four of its graphic scenes — Scene04 `[24,54,80,106]` (last ease ends 50), Scene08 `[24,54,200,226]` (ends 170), Scene10 `[24,54,126,152]` (ends 96), Scene32 `[24,54,194,220]` (ends 164). Every one is `W[2] = end + 30`. Read those before writing a new card scene instead of copying an older film's tuple.
