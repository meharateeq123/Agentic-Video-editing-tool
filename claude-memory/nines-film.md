---
name: nines-film
description: "0.999... = 1 long film (manimgl\\nines), 13 scenes on the real 522.6s VO, delivered 2026-10-19 at 2K, 8:43; ZoomLine piece and whisper digit-row trap"
metadata:
  node_type: memory
  type: project
  originSessionId: 235ea8ac-0266-4464-b2f5-9013b8b8160a
  modified: 2026-10-19T07:23:06.390Z
---

`manimgl\nines` "0.999... Is EXACTLY Equal to 1? The Math Proof That Will SHOCK You!" — VO `vo\nines_vo.wav` (Downloads\Music tts 9:13 PM 10-18, 522.6s), 13 scenes, 15693 frames, render to `render_nines\` (title without `?`).

- Kit = infinity kit copied as `nines_kit.py`; film pieces in `nines_parts.py`: **ZoomLine** (number line zooming on 1 by powers of ten, positions from distance-to-1 so 10^-24 works; truncation dots + gold in-band dots), EqRow (equation in pieces), DigitRow (decimal as tiles), Plate, Seg.
- Each scene has `FIT` (camera height multiplier) set from `_check.py`'s worst fill.
- Trap: whisper writes read-out rows as "0", ".99" and difflib hung scene 7's "One minus zero point nine..." rows one row late (2.8s). `nines\pin_times.py` pins those words to heard times. Run `vo_check.py` and look at every "CHECK" line.
- manimgl without `-w` opens a preview window and hangs forever; stills need `-w` + STILLS.

- D: filled up mid-render (0.38 GB left, 'No space left on device'); freed 11 GB by deleting the old films' *_silent.mp4 copies. Check D: free space (needs ~5 GB) before a render.

Related: [[horn-banach-films]], [[no-reedits-after-render]].
