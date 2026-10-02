---
name: fractions-film
description: "\"Most People Get This Military Math Question Wrong\" (ManimGL, manimgl\\fractions): scenes 1-6 of 10 built and passing, studio only; GLB bus/burger/pizza models; no render yet."
metadata:
  node_type: memory
  type: project
  originSessionId: 235ea8ac-0266-4464-b2f5-9013b8b8160a
  modified: 2026-09-25T18:28:20.150Z
---

The fractions film lives in `D:\Animated Math\manimgl\fractions\`: script `script.txt` (1089 words), beat sheet `D:\Animated Math\fractions_beat_sheet.md`, VO `vo\fractions_vo.wav` (366.6 s, from `Downloads\Music\tts-audio (44).wav`), aligned 1028/1089 words, film 6:07.1.

- As of 2026-09-25, all 10 scenes are built on `fraction_kit.py`, which sits on the Graham kit. All pass `fractions/_check3d.py` and are in the studio as f01–f10. The studio lists only the active film (`ACTIVE = "f"` in `preview_server.py`); the user asked for that. No render yet.
- Scenes 7–10: pizza (7), bars regridding to 24ths plus `cross_sheet` (8), 31⅓ with two buses and four props: coin, cloth, stopwatch, tin (9), and the final unit square (10). The kit gained `Sheet`, `cross_sheet`, `Prop`, `smooth_keys` (a natural-spline camera: no lurches at uneven keys), `only_when_up`, `Tag(rise=)`, and `Pizza(facing=, fine=)`.
- Render ordered 2026-09-25. The scripts are in `D:\Animated Math\render_fractions`: `run_render.cmd` runs 3 workers (`render_parts.ps1`), then `join_fractions.ps1`, which writes `fractions_2k.mp4`.
  - Workers launched with Start-Process died when the session restarted. Launch through `Invoke-CimMethod Win32_Process Create` instead, which survives.
  - Parts are resumable: finished parts are skipped.
- The trap that cost the most time: a Tag faded to nothing still wrote depth, so a sunk plate cut black holes out of GLB models behind it. It looked like black patches, and even like a "12" on a bus. The kit's `stand()` now parks hidden standees at z = -80. A single `-s` still did not show the holes; only the continuous studio run did.
- The user supplied GLB models in `D:\Animated Math\`: a 1992 Mercedes O 304 coach, a cheeseburger, and a pepperoni pizza. They load via `load_model` and `ModelMesh`. The bus cut in scene 5 clamps vertices onto the cut plane and closes it with a dark cap. The pizza slice uses an angular clamp (`_wedge`). "More beef" stretches the burger's patty band (`PATTY`).
- The script names no person, so the film uses no portraits. The user chose to keep the script unchanged (no Taubman by name).

**Why:** the user reviews in the studio and orders the render separately, same as the Graham film.

**How to apply:**
- `fraction_kit` loads this film's `timing.py` into `sys.modules` by path, so it never picks up the Graham `timing.py`.
- `\div` prints "∇·" because the TeX preamble loads the physics package. `_fixed()` rewrites it to `\divisionsymbol` in `Tag` and in `gloss_card`.
- Never name a kit constant `LEFT`, `RIGHT` or similar. The "12 stranded" constant shadowed manim's `LEFT` and broke every strike line.
- Traps that recurred while building:
  - Two `ramp`s on one tracker inside a single `self.play` fight. Split into two plays.
  - A camera keyed at short beats lurches. Use one straight move with a key on the line, or sample a smooth function at even steps (scene 5 `_orbit`).
  - Objects near a swinging camera leave the frame. Move them off its line.
- See [[manim-framing-and-overlap]], [[manimgl-studio-part-rebuild]] and [[graham-film]].
