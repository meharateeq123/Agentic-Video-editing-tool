---
name: graham-rearrangement-film
description: "Graham rearrangement-conjecture film (manimgl\\graham_rearrange): all 10 scenes built on estimated timing, studio r01-r10; waiting on VO; facts verified against Quanta + arXiv."
metadata:
  node_type: memory
  type: project
  originSessionId: 235ea8ac-0266-4464-b2f5-9013b8b8160a
  modified: 2026-10-06T16:16:49.941Z
---

Math Sparks film on Ronald Graham's rearrangement conjecture, `D:\Animated Math\manimgl\graham_rearrange\`.

- Script `script.txt`, 1151 words (~7 min). Title format follows the Brachistochrone one (two punchy lines + topic in brackets).
- `timing.py` (OWNER `graham_rearrange`) + `align.py` as usual. **No VO yet**: every scene is cut to the word-count estimate, so all beats move when `align.py` runs on the real voiceover. The studio expects `vo\graham_vo2.wav` (not `graham_vo.mp3`, which is the older Graham's-number film).
- Studio keys r01–r10 (`ACTIVE = "r"` in preview_server.py); all 10 pass `_check.py`.
- **Delivered 2026-10-06 with VO**: `render_graham\Never Land on the Same Hour Twice. (Graham's Conjecture Explained).mp4`, 2560×1440, 12529 frames, 6:58, 1.09 GB, AAC audio. The VO was `Downloads\Music\tts-audio - 2026-10-05T182210.114.wav` (417.16 s), copied to `vo\graham_vo2.wav`; align matched 1071/1151 words. `join_graham.ps1` now muxes the VO (no `-shortest`: the picture is longer by TAIL). Parts are `parts\r01–r10.mp4`; the earlier estimate-timed parts sit in `parts\estimate\`. The same folder still holds the older Graham's-number film's `g01–g10` and `graham_2k.mp4`, so never wipe it, only the `r*` files.
- Three render workers fit in this 12 GB machine (~3.7 GB free at peak) and cut the render to 33 min vs ~42 with two. Give worker c the tail of the other two lists, so `render_parts.ps1`'s "already present" check skips a part the others reach later.
- Kit `graham_kit.py` is the Brachistochrone kit (black floor + steel grid) plus: `Dial`, `Card`, `Hop`, `Bars`, `SizeAxis`, `hour_point`, `run_clock` (STILL=<secs> env renders one frame for look checks).
- Scene 8's histogram and Fourier bars are computed from the real sets at import: mixed `[1,2,4,8,5,10]` is flat (max/mean 1.22, top beat 0.05), sneaky `[1,12,2,11,3,10]` (pairs summing to 13) piles on zero (2.03, 0.41). The spectrum is a true DFT, so the strong beat shows as a mirrored pair of bars — the label says "a strong beat", not "one".

**Verified facts (2026-10-05, Quanta + arXiv):** 1971 conjecture; 2022 Müyesser & Pokrovskiy (large sets, reserve-and-repair); Sept 2024 Kravitz & Bedert (tiny sets, past the rectification barrier); Aug 2025 Müyesser's team (relatively large sets); Feb 2026 Sauermann & Pham (middle range, anti-concentration + Fourier, repair works >=90% of the time). Together they prove it **only for sufficiently large primes** (~10^100); every smaller prime is still open. Never say the whole conjecture is solved.

**Traps hit here:**
- A scene file named `scene_02_line.py` collided with `manimgl\scenes\scene_02_line.py` (Möbius) and the wrong module got imported. Scene files in a new film must not reuse names from `scenes\` (`scene_01_loop`, `scene_02_line`, `scene_10_clock`, …).
- `_check.py` requires the module-level dict `CARDS` to be the HUD spans; naming a list of card values `CARDS` breaks it.
- `_check.py` never runs `construct()`, so a scene can pass the check and still crash in the studio. A local named `mix` shadowed the kit's `mix()` and only the studio run caught it.

Related: [[brachistochrone-black-floor]], [[manimgl-scripts-must-be-heavy]], [[progress-updates]].
