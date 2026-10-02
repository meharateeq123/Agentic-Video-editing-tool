---
name: mobius-film-vo-word-sync
description: Möbius film beat timings must come from word-level voiceover timestamps; the old silence-gap tables left visuals many seconds late.
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 235ea8ac-0266-4464-b2f5-9013b8b8160a
  modified: 2026-09-15T17:04:45.445Z
---

Every scene's `SPEECH` beat table must be matched to when the narrator actually says each thing, taken from word-level timestamps. Silence gaps alone are not enough.

**Why:**
- On 2026-09-15 the user saw the red "outside" paint arriving long after the voiceover said it.
- A whisper transcript showed the silencedetect tables had hung beats on the wrong gaps.
- Scene 1 ran 5–9s late and scene 2 about 10s late.
- Scenes 5 (Listing), 8 and 10 were also several seconds off.

**How to apply:**
- System Python (not the manimgl venv) has `whisper`, with the `small` model cached. Run it with `word_timestamps=True` on `vo/tts-audio (12).wav`.
- Keep each scene's slot length fixed, so the join frame counts stay valid, and move only the inner beats.
- Retime camera keys that are written as literal seconds rather than `BEATS[i]`, and check for motion spikes.
- Update `CARDS` windows too.

Related: [[mobius-film-2k-render]], [[mobius-film-label-glide]].
