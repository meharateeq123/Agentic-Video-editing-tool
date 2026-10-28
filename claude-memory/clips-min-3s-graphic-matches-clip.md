---
name: clips-min-3s-graphic-matches-clip
description: "Every clip 3-4s (never under 3, never over 4); each graphic sits on the clip that shows its subject, timed to the real impact; big graphics blur the clip behind them"
metadata:
  node_type: memory
  type: feedback
  originSessionId: 0552e3d8-85cb-4605-b4f5-e1bcdeba125a
  modified: 2026-10-27T13:49:48.448Z
---

User on robots1 (2026-10-22): "clip tumnai 3 second sai choti ni rkhni... jo animation dikhani wohi clip bhi ho or relevancy 100% ho".
Tightened on robots2 (2026-10-27): "har chz ka khayal rkhna hai jo bat ho rhi ho woh dikhana hai, or clips 4 seconds sai bari or 3 seconds sai choti na ho, or motion graphic aisai lagana k clip buri na lagai — background mai clip ko blur kr daina".

**Why:**
- 1-2s beats felt choppy, and long ones felt slow.
- Graphics landed on the word while a different clip played under them.
- Big graphics over a sharp, busy clip looked messy.

**How to apply:**
- Plan cuts so that every clip is 3.0-4.0s. robots2 has 11 clips in 37.8s.
  - `build.mjs` fails any beat outside 3-4s.
  - Shorten the tail if the last beat runs long.
- A clip must not hide a camera cut inside its 3-4s. Check 6 frames per bed: scene detection at 0.28 missed several cuts in the UFB Vegas source.
- Put each graphic inside the clip that shows its subject.
  - Time strike tags to the real impact frame, found on a 4fps sheet.
  - If the action falls at the very end of a clip, pick another moment rather than flash the tag.
  - The graphic leaves 12f before its clip cuts.
- Big graphics (team cards, bracket, FaceCard, end title) blur the bed (about 7px) and dim it about 22% while they are up.
  - In robots2 this is the `SOFT` list in `Film.tsx`.
  - Small strike tags leave the action sharp.
- Supersedes "every beat <=3s" in [[flick-long-film-clip-rules]] for this user's newer videos.

See also [[no-cut-transitions]], [[robots1-film]], [[robots2-ultimate-bots]].
