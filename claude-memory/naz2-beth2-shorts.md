---
name: naz2-beth2-shorts
description: Surfing shorts naz2 (Nazaré wave) and beth2 (Bethany Hamilton) delivered 2026-10-16 in the Rise and Run style with hero graphics
metadata:
  node_type: memory
  type: project
  originSessionId: 235ea8ac-0266-4464-b2f5-9013b8b8160a
  modified: 2026-10-16T16:40:15.879Z
---

Both in `D:\flick\surfing\`, delivered 2026-10-16 as their title .mp4s (1080x1920, about -13.6 LUFS, decode-checked; render.ps1 now adds `-movflags +faststart` and a decode check).

- **naz2** "The WAVE That Should Have Swallowed This Surfer!": WSL sources only (0gzIoTJ1Y4Q Nazaré 2025 highlights, DmNNKVwt3JE Top 5, 6o5XtipuZvM jet-ski wipeout). Graphics: LocationPin (NAZARÉ 39.60°N 9.08°W), HeightScale (26.2 m / 86 ft Guinness record, Steudtner 2020, vs a 1.8 m surfer), RiskMeter (WIPEOUT).
- **beth2** "A SHARK Took Her Arm… But NOT Her Dream!": Lieber Films 04jACEVTltw (beautiful one-arm surfing and close-ups) plus WSL Fiji 2017 6O_nb8W4_Jk. In that heat Bethany wears a blue top and red shorts (the WSL score bug confirms it; Tyler is yellow). Graphics: FactBadge (13 YEARS OLD, Oct 31 2003, Kauai), Milestones, VsCard (wildcard vs world champion Tyler Wright).
- Gfx.tsx now has 12 components; the latest copy is beth2's. Cut detection on each source (scene 0.15) picks continuous shots; contact-sheet tiles drift by seconds, so always check the baked bed's frames.
- The "…" in a title gets mangled by the Python-written render.ps1. Rename the file afterwards with [char]0x2026.
