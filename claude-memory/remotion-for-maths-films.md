---
name: remotion-for-maths-films
description: "User 2026-10-27 wants maths films built in Remotion Studio like the swimming films: build scenes, keep Studio open while building so they watch along, they render themselves"
metadata:
  node_type: memory
  type: feedback
  originSessionId: 235ea8ac-0266-4464-b2f5-9013b8b8160a
  modified: 2026-10-27T14:15:22.707Z
---

On the prime-spirals film the user stopped the ManimGL build: "build the scenes and show them in a Remotion Studio like the swimming one; then I'll render". They picked Remotion over the ManimGL 8080 studio. Mid-build they asked: "turn the studio on so I can watch as you go".

**Why:** Remotion Studio scrubs live with no bake step, and the user wants to watch and render themselves.

**How to apply:**
- For a new maths film, default to a Remotion + three.js project ([[spirals-film]] is the template: Galaxy engine, Hud, Panels, Props3d, beats.ts from whisper).
- Start Studio detached early (`Invoke-CimMethod Win32_Process Create`, a free port 3014+) and give the link, so scenes appear as they are written.
- Do not render unless asked.
- Still check every scene with contact sheets before handing over.
