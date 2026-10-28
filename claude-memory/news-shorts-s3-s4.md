---
name: news-shorts-s3-s4
description: "News maths shorts news_s3 (OpenAI 722 papers) and news_s4 (Prince Rupert's cube), delivered 2026-10-10; the Rupert geometry was computed, not guessed."
metadata:
  node_type: memory
  type: project
  originSessionId: 965b55a1-c203-4287-bdb0-90beabfbb7a1
  modified: 2026-10-10T13:25:38.105Z
---

Two news shorts in `D:\Animated Math\manimgl\shorts`, delivered 2026-10-10 at 1080x1920, saved by title. VOs: tts-audio 2026-10-10T174421 (s3) and T174620 (s4). Both built on `shorts\pyth_kit.py`. See [[mobius-shorts]].

- **news_s3** "A Machine Just Did a Fields Medal's Worth of Math!" — OpenAI's 722 papers of 2026-10-06, 372 groups, the Riemann one, the Rutgers Fields-Medal quote, and the two blanks (no author, not verified).
- **news_s4** "Every Shape Can Pass Through Itself. Except This One." — Prince Rupert's cube, then the 2025 non-Rupert solid (Steininger & Yurkevich, 90 vertices).

**Why:** the Rupert tunnel cannot be eyeballed. Pick the direction wrongly and the hole pokes out of the host cube.

**How to apply:**
- The Rupert optimum, recomputed here with an LP (largest square inscribed in the cube's shadow) maximised over direction: side `3*sqrt(2)/4 = 1.06066` along `u = (1,2,2)/3`, with in-plane axes `(-4,1,1)/sqrt(18)` and `(0,-1,1)/sqrt(2)`. Rotating that frame onto the world axes leaves the host cube tilted and the shaft vertical, which suits a 9:16 drop.
- `ConvexHull` triangulates every face, so a dodecahedron comes back with diagonals across its pentagons. Keep only edges within ~1.08x the shortest to get the true wireframe (`hull_edges(only_short=True)` in news_s4).
- A fly-in that starts off-frame fails `_check_short`, since `subject_at` counts those points. Keep the scatter small and only list sheets that have mostly arrived.
- The 90-vertex solid on screen is a stand-in (Fibonacci sphere, slight perturbation); their real coordinates aren't on this machine, and I told the user so.
