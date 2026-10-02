---
name: flick-studio-blur-scrub-artifact
description: "A dark ribbed/banded texture shown in a Remotion Studio screenshot is a scrubbing render glitch from heavy CSS blur on OffthreadVideo, not real footage - confirm against an actual rendered QC still before touching footage.ts."
metadata:
  type: reference
  originSessionId: 2e97caa6-3697-4fd1-9ecd-29ea5a4bf3bb
  modified: 2026-09-10T10:31:52.311Z
---

If the user sends a Remotion **Studio** screenshot showing an odd dark, diagonally-ribbed/banded texture filling most of the frame (looks like corrugated metal or roofing, nothing like the actual source footage), this is very likely a **scrubbing artifact from a heavy CSS `blur()` filter on an `OffthreadVideo`** (e.g. the ~38px blurred backdrop copy every [[flick-hook-clip-boxed-style]] hook clip and every `BedChain` blurred-background layer uses) - Studio's preview can show this banding while the timeline is being dragged and the frame hasn't fully decoded, especially at high blur radii. It is not present in an actual render.

**Also worth remembering:** `startFrom` in this codebase's `Footage.tsx`/`Bed.tsx`/`footage.ts` `L()` helper is in **seconds**, not frames (`Footage.tsx` does `startFrom={Math.round(startFrom * fps)}` internally, `frames` is the separate frame-count duration). Assuming `startFrom` is already in frames and dividing by fps to get a source timestamp gives the wrong second in the source file entirely - don't diagnose a footage-relevancy complaint by sampling raw source video at hand-derived timestamps; the units are easy to get backwards.

**How to apply:** Before editing `footage.ts` or re-cropping source clips in response to a visual complaint, render an actual QC still (`npx remotion still <bundle> final-film <out> --frame=<absolute-frame> --image-format=jpeg --timeout=180000 --gl=angle`) at the real absolute frame (remember to add `HOOK_FRAMES` if the film has a cold open, per [[flick-hook-clip-boxed-style]]) and look at that first - it settles in seconds and avoids a wasted detour through raw-footage sampling with guessed units. Related: [[flick-render-commands]].
