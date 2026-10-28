---
name: shorts-editing-rules-2026-10-12
description: "User's 4 standing rules for every next short: word-for-word subtitles of the whole VO (bottom), only relevant clips, faces framed, clean editing"
metadata:
  node_type: memory
  type: feedback
  originSessionId: 3d12fe9f-5670-4e8b-9b0e-948737411aba
  modified: 2026-10-12T16:49:32.375Z
---

User (2026-10-12) said "SAVE THESE RULES FOR NEXT VIDEOS". They apply to every new short:

1. **Word-for-word subtitles, every spoken word.** Subtitle the entire VO exactly as spoken: no skipped, removed, changed or paraphrased words, no spoken sentence without subtitles, tightly synced to the VO word timings (vo-words.json startMs/endMs). Place them at the bottom ([[subtitles-at-bottom]]). The old "short punchy KineticSequence phrases" are NOT enough on their own any more; they must not replace the full transcript. Use the TTS words as spoken (Whisper text), but fix obvious mis-heard names to the script's spelling only if the VO audio says that name; when the VO mispronounces a name (e.g. "Johnley"), subtitle the script spelling and tell the user.
2. **Relevant clips only.** Every clip must support the line being said at that moment; no filler/repeated/irrelevant clips just to fill time (see [[flick-shot-relevance]], [[flick-no-repeat-clips-across-shorts]]). If no relevant clip exists, shorten/reuse nothing and tell the user.
3. **Proper face framing.** Whenever a person is on screen, the face must be clearly visible and sensibly placed in the 9:16 crop: no cropped faces, cut-off heads or faces at the edge; set cx/cy/s per bed to keep face + expression + action (check the bed grid before render).
4. **Clean editing.** Smooth transitions and clean cuts, visuals matched to the exact narration moment, no distracting effects, engaging pace without losing clarity.

**Why:** the last batches used big kinetic phrases (not every word), weak/generic clips and some off-centre faces.
**How to apply:** build a per-word (or 3-5-word chunk) caption track from vo-words.json for the whole VO in every scene (new component, bottom, Caption-style highlight of the current word), keep stamps/graphics only where there is a real number/fact, review every bed grid for face position, and say honestly in the report where a relevant clip was not found.
