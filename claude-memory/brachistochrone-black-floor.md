---
name: brachistochrone-black-floor
description: "Brachistochrone film (manimgl\\brachistochrone): fractions-style black floor + steel grid (not navy v2); scenes 1-6 built in studio b01-b06; kit with real track physics (Ride)."
metadata:
  node_type: memory
  type: project
  originSessionId: 235ea8ac-0266-4464-b2f5-9013b8b8160a
  modified: 2026-10-02T09:21:45.576Z
---

Brachistochrone film, `D:\Animated Math\manimgl\brachistochrone\`. Script is 1356 words (`script.txt`). VO is `vo\brach_vo.wav` (6:47, from `Downloads\Music\tts-audio - 2026-10-02T130307.474.wav`), aligned 1341/1356. Portraits are in `assets\`: newton, huygens, bernoulli. No Harrison portrait has arrived yet.

**Look:** the user wants the **fractions video's black stage**: near-black floor and a thin steel-grey grid (`STEEL #7e93b8`) fading into the dark, with no navy glow. Text and objects keep the House Style v2 colour roles. I first misread this as "the dark v2 floor" and had to be corrected, so check against a real frame (fractions_2k.mp4 at 60 s).

**State (2026-10-02):**
- The user asked for the first 6 scenes in the studio first. Those are built (`scene_01_hook` … `scene_06_light`), pass `_check.py`, and are in the studio as b01–b06 (`ACTIVE = "b"`, `voice_for` "b").
- Scenes 7–10 are not written: layers, Newton, honest notes/Scilly/Harrison, finale.

**Kit:** `brach_kit.py`
- `BlackStage`, camera `views`/`alive`, `Callout`, `Portrait`, `Rail`, `Ball`, `Ring`, `Arrow3`.
- `Ride` integrates a frictionless bead on any track. Every race time on screen is computed, not faked.
- The cycloid quarter period is 2.323 s at R = 1.15 (G ≈ 2.10).

**Script note:** "Twenty-three years later" now follows 1659 in the shortened script, because the 1673 line was cut. Scene 5 shows the true year, 1696.

Related: [[manimgl-house-style-v2]], [[fractions-film]], [[laplace-film]].

**Rendered 2026-10-02:** render_brach\<title>.mp4 (2K, 6:47, 12224 frames, 1.1 GB). Render encodes on the GPU: env MANIM_FFMPEG_BIN/MANIM_VCODEC/MANIM_FFMPEG_EXTRA (patched into manimlib scene_file_writer) -> tools\ffmpeg501 h264_nvenc; 2.6x faster than libx264. Join cuts with the same NVENC. Scene 1 uses Apparatus + GlossBall (realistic metal block, user's reference still); Scene 4 uses the user's clock.glb (assets\models\clock).
