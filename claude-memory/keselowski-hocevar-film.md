---
name: keselowski-hocevar-film
description: "output/keselowski1 - Brad Keselowski/Carson Hocevar Darlington incident film, rendered and delivered."
metadata: 
  node_type: memory
  type: project
  originSessionId: 2e97caa6-3697-4fd1-9ecd-29ea5a4bf3bb
  modified: 2026-09-11T18:42:32.705Z
---

`D:\flick\output\keselowski1\final-film.mp4` — 378.3s (6:18), 1920x1080, delivered and freeze-scan verified clean. Same bespoke pipeline as [[larson-southern-500-film]] (hook-clip architecture, VO-aligned timeline, chunked GPU render via render.ps1/launch-render.ps1).

**Known off-by-one bug fixed here:** `TOTAL_FRAMES` (computed in `timeline.ts` from `FILM_SECONDS * FPS + HOOK_FRAMES`) evaluated to 11349, but `render.ps1`'s hardcoded `$total` was 11350 (copied from a template assumption). The last chunk's frame range then exceeded the composition's actual duration and Remotion threw `resolveFrameRange` errors on every retry. Fix: always derive `$total` from the actual rendered composition length, or if hardcoding it in render.ps1, double-check it against `timeline.ts`'s computed `TOTAL_FRAMES` (not just the `gen-timeline.mjs` console output) before launching a multi-hour render — this cost a full failed final chunk (3 retries) before being caught.

**Why:** Same off-by-one class of bug could recur on any future film using this render.ps1 template if `$total` isn't re-verified per-project.

**How to apply:** Before launching a chunked render, grep the built `timeline.ts` for `TOTAL_FRAMES` or log it directly, and confirm render.ps1's `$total` matches exactly — don't just trust the number `gen-timeline.mjs` printed at generation time, since later edits (adding/removing hook seconds, retiming scenes) can shift it by a frame or two.

**Post-render feedback:** User flagged (after final render) that the film had too many plain floating-text scenes and wanted more image/comparison cards instead — see [[flick-minimize-plain-text-scenes]]. They explicitly declined to re-edit this already-delivered film for it; it's a note for the next film's planning stage. Also flagged mid-build that motion graphics were held on screen too long in several scenes (Scene12 specifically) before the final render — see [[flick-graphic-exit-timing]].

**Machine stability notes reconfirmed here:** this session repeatedly lost background renders to session restarts (the harness's tracked background PowerShell shell dies when the CLI session restarts, even though it looked to have survived once with node subprocesses staying alive as orphans). When resuming after a restart, always check for orphaned node/ffmpeg child processes left over from the dead wrapper script before relaunching — an orphaned ffmpeg process from the *first* failed attempt at a chunk was still running and eating 100% of a CPU core (9000+ seconds of accumulated CPU time) well into a *later*, successfully-relaunched attempt at the same chunk, silently halving render speed until spotted and killed. `render.ps1`'s own SKIP-if-already-rendered logic makes relaunching safe for completed parts, but doesn't clean up stray child processes from a half-finished chunk on its own.
