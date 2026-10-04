---
name: flick-bedchain-span-bug
description: "footage.ts generator bug that caused silent near-freezes across a whole long film (yuzidi10) — span must be the baked SOURCE clip length, never the output cut length."
metadata:
  node_type: memory
  type: feedback
  originSessionId: 3d12fe9f-5670-4e8b-9b0e-948737411aba
  modified: 2026-10-02T14:16:48.079Z
---

When a bake.mjs auto-generates `footage.ts`'s `L()`/`bed()` helper for the SceneBed `span` mechanism (see [[flick-footage-pacing]] and the SceneBed `span` rule in CLAUDE.md), `span` MUST be set to the actual baked clip's SOURCE duration in seconds (e.g. `4` if every clip was baked at `-t 4`), never derived from the cut's own output `frames` count (`frames / 30` is wrong — that's the OUTPUT duration, not what's available to stretch).

**What happened:** on yuzidi10 (long film, graphics-driven, short on real footage so cuts were deliberately long — one ~4s baked clip stretched to cover ~12-13s of scene time), the generator wrote `span: frames / 30`, which made `rate = min(1, span/need)` evaluate to ~0.9-1.0 instead of the intended ~0.3. Every cut in the whole film then tried to play 4s of real source across 12-13s of output and ran out, holding on the last decoded frame for the overrun — a silent near-freeze on nearly every backdrop cut. `ffmpeg freezedetect` only caught 2 of these (at low-texture/static shots where the camera's zoom-push animation didn't generate enough pixel noise to hide it); busier footage (splashes, crowds) masked the same bug from the detector by continuing to look "alive" from the zoom alone.

**Why:** a freeze-check passing is not proof the footage is behaving correctly — only that nothing crossed the detector's noise/duration threshold. The real check is always "does `span` equal the seconds of source actually baked for this clip," independent of how long the output cut needs to be.

**How to apply:** whenever reviewing or writing a bake.mjs that auto-generates a chain/footage file with a `span` field, grep for how `span` is computed and confirm it's a constant (or per-clip-correct) SOURCE length, not `frames/fps`. Re-check this specifically on any film that deliberately uses long/stretched cuts (few baked clips covering long scenes), since that's exactly when the bug's effect is largest and least likely to be caught by casual playback.
