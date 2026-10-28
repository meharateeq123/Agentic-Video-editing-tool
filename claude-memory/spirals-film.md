---
name: spirals-film
description: "Prime spirals film (\"The Beautiful Mystery of Prime Numbers and Spirals\"): first maths film built in Remotion + three.js, D:\\Animated Math\\spirals\\remotion, Studio port 3014; rendered 2026-10-27 at 2K 8:59 into render_spirals\\"
metadata:
  node_type: memory
  type: project
  originSessionId: 235ea8ac-0266-4464-b2f5-9013b8b8160a
  modified: 2026-10-27T14:54:59.082Z
---

`D:\Animated Math\spirals\remotion` (node_modules = junction to `D:\flick\surfing\eddie1\remotion\node_modules`, which has three 0.169, @react-three/fiber 8, @remotion/three). VO `public/vo/spirals.wav` (8:59). Beats come from whisper: `manimgl\spirals\words.json` → `fit_words.py` → `timings.json` → `gen_beats.py` writes `src/beats.ts` (cue phrases per scene live in gen_beats.py). Final composition `final-film` is native 2560x1440.

- Engine `src/components/Galaxy.tsx`: one shader draws every integer to 200,000 as glowing points (r = n·scale, θ = n·step). Uniforms cover zoom, growth, primes vs composites, hue by residue (6/44/710), highlight one residue, a dark sweep of non-coprime arms, lift primes as a layer, sqrt law (sunflower), and tint. Angles are reduced mod 2π on the CPU in float64. Float32 sin(n) is off by ~0.01 rad at n = 2e5, which is wider than the gap between the 710 rays.
- `fitDist()` is the autofit: every camera goes through it, so the subject stays clear of the caption band. `cam.shift` (view offset) frees the right side for a panel. Shifting the camera target instead shrinks the subject to a dot.
- **Traps:**
  - The core glow sprite turns the screen grey when the camera dives inside it. It now fades by camera distance.
  - A three.js photo texture missed the first frames. The M101 photo is an HTML `<Img>` backdrop.
  - Overshoots: 44 and 710 rad are slightly MORE than 7 and 113 turns (6 rad falls short). The dial shows the miss to the nearest whole turn.
  - 1° rays only appear at around 100k integers. At 2,600 integers you see one spiral.
  - 150k integers at normal size wash into a white blob. Go to the rim with small points.
  - Ulam's x = −y diagonal holds odd squares, not primes. `richestDiagonalCells` picks the real prime-rich diagonal.
- QC: `D:\Animated Math\spirals\stills.ps1 -Scene N -Fr ...` (bundle, stills, 3-across sheet). Call it with `&`. A `powershell -ExecutionPolicy Bypass` run was blocked.

Render: `node D:\Animated Math\spirals\render.mjs` (launched detached with Win32_Process Create). It renders 1500-frame chunks with `--gl=angle`, resumes from finished parts, then joins with `-auto_convert 0` and muxes the VO. Close Studio first: RAM was 1.1 GB free. At concurrency 3 (needs 3+ GB free) a chunk takes about 2.5 min, against 3.5 min at 2; the whole film took about 33 min. freezedetect flags held portrait cards and dim moments; those are not stalls.

Related: [[remotion-for-maths-films]], [[seven-film]], [[manimgl-no-simple-films]].
