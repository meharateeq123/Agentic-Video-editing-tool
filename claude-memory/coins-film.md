---
name: coins-film
description: "Coin rotation paradox film (\"This Math Problem Destroyed Even the Best Test-Takers\"): Remotion + three.js, D:\\Animated Math\\coins\\remotion, Studio 3014; realistic wood table + real quarter coins; 19 scenes built 2026-10-28 on the 7:21 VO"
metadata:
  node_type: memory
  type: project
  originSessionId: 235ea8ac-0266-4464-b2f5-9013b8b8160a
  modified: 2026-10-28T14:25:29.385Z
---

`D:\Animated Math\coins\` holds this film:
- `align\`: script, whisper `words.json`, `fit_words_coins.py`, `gen_beats.py` (writes `remotion\src\beats.ts`).
- `remotion\`: node_modules junction as in [[spirals-film]].
- `stills.ps1`: QC sheets.

VO is `public/vo/coins.wav`, 441 s, 13,246 frames.

**Rendered 2026-10-28** at 2560x1440 with `coins\render.mjs`, about 4.3 min per 1500-frame part.
- Output: `D:\Animated Math\render_coins\This Math Problem Destroyed Even the Best Test-Takers.mp4`
- The user said 5 workers was too many; use 3 at most ("srf 3 workers").
- Even at 3 workers the GPU (GTX 1650) sat at 3–25%: frame capture and encoding on the CPU set the speed.

- **Look (the user asked for a realistic hook like the last film):**
  - Polyhaven CC0 `wood_table_001` PBR table.
  - 2022 Washington quarter obverse from Wikipedia (US Mint) as each coin's face map plus bump map. Spin 0 = head upright from the camera.
  - Brass disc for circle B.
  - RoomEnvironment reflections, shadows, ACES tone mapping.
- **Engine `Stage.tsx`:**
  - `Coin`, `SpinMark`, `Table`, `fitDist`, `Tags`.
  - `space` mode for the Earth/Sun scene.
  - `lib/roll.ts` holds the kinematics: outside spin = φ(R+r)/r, inside = −φ(R−r)/r, carry = φ.
- **Traps:**
  - Texture hooks inside the R3F canvas do not hold Remotion's render: coins came out white and the table was missing. Load all textures in `<Stage>` outside the canvas and read them from the cache.
  - A fixed fog distance hazes wide shots. Fog scales with camera distance.
  - A flat brass disc seen from above mirrors the studio's ceiling lights and turns cream: envMapIntensity 0.12, roughness 0.55.
  - Uppercase captions merge r and R. Use `Caption keepCase` for any title with r/R.
  - The user flagged scene 1 as "smooth ni hai" (2026-10-28). Three causes:
    - `keys()` eases every segment, so the camera stops dead at each cue. Use `glide()` (monotone cubic through all keys) for camera paths.
    - A per-frame `fitDist` on a moving coin makes the zoom breathe, and switching to it mid-scene jumps. Fit the whole orbit once, then blend with `mix(..., win())`.
    - An eased full roll rushes in the middle. Use `ramp()`: steady speed with soft ends.
  - Whisper died once silently (log had no exit line). Check the process before waiting on it.

Related: [[remotion-for-maths-films]], [[spirals-verdict-just-ok]].
