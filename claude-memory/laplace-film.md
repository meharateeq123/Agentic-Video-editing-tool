---
name: laplace-film
description: "The Equation That Makes Calculus Disappear" (Laplace transform) — first long film in House Style v2, manimgl\laplace, VO-aligned; status and how it's wired.
metadata:
  type: project
---

This is the first ManimGL long film in [[manimgl-house-style-v2]]. It follows [[euler-film]].

**Inputs**
- Script: `manimgl\laplace\script.txt`, 1396 words, approved.
- Beat sheet: `D:\Animated Math\laplace_beat_sheet.md`.
- VO: `Downloads\Music\tts-audio (98).wav`, copied to `vo\laplace_vo.wav`, 513.9 s. `align.py` matched 1355/1396 words and wrote `laplace/timings.json`.
- Assets:
  - `assets/laplace.jpg` (Guérin portrait) and `assets/heaviside.jpg`.
  - The user's GLB models are in `D:\Animated Math\models\`: `photorealistic_bathtub.glb` and `animated_drone_with_camera_free.glb`. Parts and textures are cached in `assets/models/<name>/`, because a raw trimesh load takes ~9 min for the drone.

**Kit and checks**
- `laplace/laplace_kit.py` provides:
  - `FilmStage`: the house v2 stage at 16:9, a 600-unit floor, and a gradient sky wall.
  - `Gate`: faces the lens; things slide through it left (time world) to right (s world).
  - `views`/`blend`, `alive()` and `Callout`.
  - `Portrait`: a HUD card that glides from centre to the right.
  - `Model`: GLB with position tracked by `cur`, never read from its points; reading them sank the tub under the floor.
  - `StandCurve`.
- `laplace/_check.py` checks framing, the up/down/right bands, and jolts. It needs `view_at`, `subject_at`, `CARDS`, `BANDS`, `BEATS`.
- Each scene exports `raw(t)`, the camera before `alive`, which the next scene opens on.

**Status (2026-09-30)**
- All 10 scenes written and passing `_check.py`. Studio entries are l01–l10 with `ACTIVE = "l"`.
- Scenes 1–2 visually verified after the camera fixes. Frame review of 3–10 is pending as their studio builds finish.
- Not rendered.

**Scene fixes**
- The gate shows only while something passes through it (`gate_level`). It is in scene 1, in 4–8 during crossings, and in 10 at the integral and the end. It is gone from 2, 3 and 9. The user: "it's in every scene; if it isn't needed beyond scene 1, take it out."
- In scene 3 the camera rises over the rings on the orbits beat, as the user asked.
- Kit `maths()` rewrites `\;`, which silently broke scene 4's dictionary into lone "s" glyphs.

- Overlap sweep, 2026-09-30:
  - Rows that contain fractions need about 1.25 units of vertical gap.
  - A walking term arcs up over the terms still standing.
  - Scene 8's circuit shrinks into the gate instead of sliding under it.
  - Scene 9's drone is 2.4 units, and G(s) stands beside it.
  - Scene 10's scratch-work uses words, because two TeX strings failed to compile.
- Callouts are drawn at 1.25× size with thin halos (`Callout.CRISP`). The user found the small labels blurry.
- The studio build queue is `D:\Animated Math\laplace_queue.ps1 -List l0x,...`, launched detached via Win32_Process Create, with its log in `laplace_queue.log`. It survives session restarts.

**User feedback given during the build**
- [[camera-front-not-side]]
- [[camera-never-still]]
- [[manimgl-arrows-and-labels]]
