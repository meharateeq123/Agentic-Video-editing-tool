---
name: maths-shorts-4k
description: "Maths Shorts finals render at 1080x1920 (user, 2026-10-02); 4K and then 2K came before and were dropped as too slow. Drafts stay 540x960."
metadata:
  node_type: memory
  type: feedback
  originSessionId: 965b55a1-c203-4287-bdb0-90beabfbb7a1
  modified: 2026-10-02T13:01:01.909Z
---

From 2026-10-02 every maths Short's final render is 1080x1920. The user said "1080 krdai" right after a 2K final had been started.

History:
- 2026-09-29: 4K (2160x3840), then 2K (1440x2560); the user said "time ni hai itna".
- 2026-10-02: 1080x1920.

Render natively at the target size, never upscale.

**How to apply:**
- `shorts/render_short.ps1 -Final` renders at 1080x1920.
- Drafts stay 540x960.
- Render only when the user asks ([[shorts-render-on-request]]).
- Related: [[mobius-shorts]].
