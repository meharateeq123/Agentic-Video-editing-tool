---
name: euler-film
description: "\"Euler's Identity: The 5 Numbers That Were Never Supposed to Meet\" (ManimGL, manimgl\\euler) — script approved 2026-09-26, beat sheet written, waiting on VO."
metadata:
  node_type: memory
  type: project
  originSessionId: 235ea8ac-0266-4464-b2f5-9013b8b8160a
  modified: 2026-09-29T12:25:23.593Z
---

The next ManimGL long film, after [[fractions-film]].

- Title (user wanted "Euler" in it): "Euler's Identity: The 5 Numbers That Were Never Supposed to Meet".
- Script `D:\Animated Math\manimgl\euler\script.txt`, 1156 words. The user asked for about 60–70 words more than the last film, and approved it 2026-09-26.
- Beat sheet `D:\Animated Math\euler_beat_sheet.md`: 10 scenes, times estimated at 0.337 s/word (~6:30). The floor becomes the complex plane from Scene 5 on.
- 2026-09-29: the VO arrived as `Downloads\Music\tts-audio (82).wav`, 383.56 s. Beware that `tts-audio (83)` is the same size as `yuzidi7.wav` and is NOT this VO.
  - Copied to `vo\euler_vo.wav`.
  - `euler/align.py` (a copy of the fractions one) matched 1091/1156 words and wrote `timings.json`. Film is 384.1 s.
  - All 10 scenes re-checked and passing. e02 needed its coins camera key leaned left/wider and `subject_at` to count only the coins already up.
- RENDERED 2026-09-29 as `D:\Animated Math\render_euler\Euler's Identity - The 5 Numbers That Were Never Supposed to Meet.mp4`.
  - 2560x1440, 30 fps, 11,524 frames, 384.13 s, AAC 48 kHz, no freezes, 240 MB.
  - Pipeline in `render_euler\`: `render_parts.ps1` + `worker_a/b/c.cmd` + `join_euler.ps1` / `join.cmd`, launched via Win32_Process Create.
  - The parts took only 14 min with 3 workers; the join took 13 min.
- As of 2026-09-26, all 10 scenes are built and pass `euler/_check3d.py`. They are in the studio as e01–e10 (`ACTIVE = "e"`).
  - Timings are still the estimate. Re-align when the VO arrives: copy `fractions/align.py`, write `timings.json`, and rebuild.
  - Portrait: `assets/euler.jpg`, the Handmann pastel.
- Kit: `euler/euler_kit.py` sits on `fraction_kit`, which now skips its own timing when a film's timing module sets `OWNER`. Do not name anything `HERE` there; `import *` clobbers it. The kit adds:
  - `Plinth`, `Flyer`, `equation_sheet`
  - `RollingHoop`, `FloorAxis`, `Turner`, `Walker`, `BendingRod`, `Drawn` (parks itself when hidden)
- The user asked for realistic coins in e02, so the plain `coin()` was replaced with `real_coin(turn)`. It has a reeded edge, a raised rim, a bead ring, and an embossed 1 with ONE, and each coin is turned slightly differently. Trap: when a flat Tex or Text is stood up on a face with `rotate`, pass `about_point=ORIGIN`. Otherwise it spins about its own centre and ends up buried inside the solid.
- e05 uses `GlideCard`: the Euler portrait card comes up at centre, then its `slide` tracker moves it to the right just before the equation appears (the user asked for this). `scenes/_check.py` builds fresh cards, so it cannot know a card has moved. It now calls an optional `scene.card_state(cards, t)` first; without that hook, the check measures the card at centre and reports a false overlap.
- Lesson: a sine wave drawn on the floor comes out lopsided in perspective. Stand it up in x–z instead.

**Why:** same pipeline as the Graham and fractions films. The user reviews in the studio and orders the render separately.

**How to apply:**
- Build `euler/timing.py` and `align.py` from the fractions ones once the VO arrives.
- Set `ACTIVE = "e"` or similar in `preview_server.py` so the studio lists only this film.
- Launch renders via Win32_Process Create.
