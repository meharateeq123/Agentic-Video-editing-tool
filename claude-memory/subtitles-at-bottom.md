---
name: subtitles-at-bottom
description: "Short-form kinetic/subtitle lines go at the BOTTOM of the 9:16 frame, never centred"
metadata:
  node_type: memory
  type: feedback
  originSessionId: 3d12fe9f-5670-4e8b-9b0e-948737411aba
  modified: 2026-10-12T16:36:43.070Z
---

User (2026-10-12): "jo subtitle hain centre mai ni neechai show krana". In shorts, the VO-word kinetic lines (KineticSequence) must sit at the bottom (paddingBottom ~230, font ~66/82, maxWidth 960), not huge in the centre. Big stamps/BigType graphics may stay centre.

**Why:** big centred text covered the footage subject.
**How to apply:** after copying the components in a new short, patch `components/KineticLine.tsx`: `justifyContent:'flex-end', paddingBottom:230`, `fontSize: accent ? 82 : 66`, `maxWidth: 960`, no rotate. Done for zhang10, yuzidi13, yuzidi14, pan2 (D:\flick\swimming\output). Older shorts still have centred kinetic lines. See [[flick-shorts-energy]].

Also: Windows filenames — drop `:` and `?` from titles (a `:` makes an NTFS stream, 0-byte file; see pan1).
