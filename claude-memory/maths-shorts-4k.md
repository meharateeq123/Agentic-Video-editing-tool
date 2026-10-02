---
name: maths-shorts-4k
description: "Maths Shorts finals render in 2K vertical, 1440x2560 (user, 2026-09-29); 4K was asked for, then dropped as too slow. Drafts stay 540x960."
metadata:
  node_type: memory
  type: feedback
  originSessionId: 965b55a1-c203-4287-bdb0-90beabfbb7a1
  modified: 2026-09-29T16:01:12.363Z
---

From 2026-09-29 every maths Short's final render is 2K vertical, 1440x2560.

The user first asked for 4K (2160x3840). Once they heard it would take about 20 minutes for two shorts, they said "2k mai hi kar de, time ni hai itna".

Render natively at the target size, never upscale: a native ManimGL render is sharper.

**How to apply:**
- `shorts/render_short.ps1 -Final` renders at 1440x2560.
- Drafts stay 540x960 so iteration stays quick.
- House-v2 film grain is generated at 1080x1920 (`grain_1080` folder).
- Related: [[mobius-shorts]].
