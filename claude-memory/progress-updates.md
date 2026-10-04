---
name: progress-updates
description: "User wants a short progress line after each step during long builds/renders, not long silent stretches."
metadata:
  node_type: memory
  type: feedback
  originSessionId: 235ea8ac-0266-4464-b2f5-9013b8b8160a
  modified: 2026-10-02T11:43:34.688Z
---

During long work (building scenes, renders, studio previews), tell the user briefly after each step what finished and what is running, with an ETA. Don't go quiet for many tool calls.

**Why:** on 2026-10-02 the user said "mujhai btatai rha karo yar sath sath" after a long silent stretch of rebuilds. They had also been asking "?", "hogia?" and "lag gya?" repeatedly.

**How to apply:** after each meaningful step (scene written or checked, preview built, render part done), send one or two lines of Roman Urdu with the status and the next ETA.
