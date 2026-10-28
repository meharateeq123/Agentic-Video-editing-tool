---
name: horn-banach-films
description: "Gabriel's Horn (manimgl\\horn) and Banach-Tarski (manimgl\\banach) long films, both delivered 2026-10-12 at 2K; pipeline traps hit on the way"
metadata:
  node_type: memory
  type: project
  originSessionId: 235ea8ac-0266-4464-b2f5-9013b8b8160a
  modified: 2026-10-12T15:36:25.023Z
---

- **Horn**: `render_horn\The Shape You Can Fill but Never Paint!.mp4`, 2560x1440, 12190 frames, 6:46, VO `vo\horn_vo.wav`. Kit `horn_kit.py` (HornWire, Region, AxisLines). Studio keys h01-h11, ACTIVE="h".
- **Banach**: `render_banach\Mathematics Says You Can Turn One Ball Into Two!.mp4`, 2560x1440, 12602 frames, 7:00, VO `vo\banach_vo.wav`. Kit `banach_kit.py` = horn kit + free-group Tree (arccos 1/3 turns, verified: 53 distinct points, a·W(A) covers the rest), TreeView, Dust, WireBall, Box3. Not wired into the studio.
- The third script written that day, "One Infinity Is Actually Bigger Than Another" (`manimgl\infinity\script.txt`), has no VO or scenes yet.

Traps:
- **GTX 1650 NVENC = 3 sessions max.** A 4th render worker, or a join cutting while 3 workers render, fails with "Error while opening encoder". Max 3 NVENC jobs at once, across both films.
- Background processes die when the session restarts. Check for `_temp.mp4` parts and 0-byte/moov-less cuts (ffprobe them) before joining.
- `align.py` now spells out whisper's digits ("1" → one); `manimgl\vo_check.py <film>` lists any cue that isn't on a heard word.
- Pre-render contact sheet: `STILLS=0.12,0.37,0.62,0.9` in banach_kit's run_clock gives one frame per fraction.

Related: [[no-reedits-after-render]], [[schrodinger-film]].

- **Infinity** (manimgl\infinity, 2026-10-13): render_infinity\One Infinity Is Actually Bigger Than Another.mp4, 2560x1440, 14634 frames, 8:08. Kit adds Tile + Stairs. Whisper mistimed the read-out digit rows; fixed from silencedetect onsets in timings.json.
