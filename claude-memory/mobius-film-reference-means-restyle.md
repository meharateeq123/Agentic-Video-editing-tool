---
name: mobius-film-reference-means-restyle
description: "When the user shares a reference video for the Möbius film, they want one element of the existing film restyled, not a new scene built from it."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 235ea8ac-0266-4464-b2f5-9013b8b8160a
  modified: 2026-09-13T19:18:58.643Z
---

When the user points at a reference video ("is video jaisa grid/visuals chahiye") while working on the Möbius film in `D:\Animated Math`, they mean: keep our existing film exactly as it is and change only the named element (it was the grid colour). They consider the Möbius film already good.

**Why:** On 2026-09-13 I analysed "We Have To Talk About the Gamma Function" and built a whole standalone Manim scene recreating it. The user was frustrated: "humari video bohot achi thi, sirf grid ka bola tha."

**How to apply:** Before building anything from a reference, ask which single element of the existing film should change, then edit the shared kit (`mobius_kit.py`) so all 12 scenes pick it up. The user also calls the ManimGL preview page (`preview_server.py`, http://127.0.0.1:8080/preview) "Remotion studio"; that page is what they mean. Related: [[mobius-film-portraits-missing]].
