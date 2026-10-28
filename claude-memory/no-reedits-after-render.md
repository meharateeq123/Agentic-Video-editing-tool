---
name: no-reedits-after-render
description: "Once a film's render starts, don't go back and re-edit/re-render parts — get it right before rendering, then just join"
metadata:
  node_type: memory
  type: feedback
  originSessionId: 235ea8ac-0266-4464-b2f5-9013b8b8160a
  modified: 2026-10-11T19:41:20.896Z
---

On the Gabriel's Horn film (2026-10-12) I rendered, then spotted two small visual bugs and a 0.3–0.4 s cue drift, and started re-rendering four parts. The user said: "pichli film ko bs join krk done kr, edit na kro dubara, is film mai khayal krna" — just join it, no more edits, take care on the next film.

**Why:** every re-render round costs them a lot of waiting; they want one clean pass.
**How to apply:** do ALL checks BEFORE the render starts: framing, label-overlap, vo_check.py (every cue on a heard word; align.py now spells out whisper's digits), a still of each scene, missing glyphs (✓ rendered as a box in this font — don't use it), and labels that a camera zoom pushes out of the frame. After the render starts, only join. Related: [[manimgl-no-overlap-first-time]].
