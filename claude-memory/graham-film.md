---
name: graham-film
description: "Graham's-number film (ManimGL) — all 10 scenes in the Möbius grammar, cut to the real ElevenLabs VO (384s); studio has word-sync audio; no render ordered yet."
metadata: 
  node_type: memory
  type: project
  originSessionId: 235ea8ac-0266-4464-b2f5-9013b8b8160a
  modified: 2026-09-21T16:06:41.254Z
---

The film "The Most INSANE Number in Mathematics" (Graham's number) lives in `D:\Animated Math\manimgl\graham\`.

- All 10 scenes are built on `world_kit.py` in the Möbius film's grammar, and all 10 pass `_check3d.py` (the Möbius `_check`, unchanged) on the real voiceover's timing. The flat first build is kept in `graham\flat_v1\`.
- The voiceover arrived from the user in two ElevenLabs parts (voice "Josh - Teacher for Kids"). Part 1 stopped mid-sentence at "…its last digits" (~5:21). The two are joined at 318.0s, with 0.25s of air, into `D:\Animated Math\vo\graham_vo.mp3` — 383.95s. The parts are kept as `graham_vo_part1.mp3` and `graham_vo_part2.mp3`.
- `timings.json` is fit from whisper word timestamps: 1013 of 1067 script words matched, film 384.53s. Nothing is provisional any more.
- The studio (`preview_server.py`, http://127.0.0.1:8080/studio) plays the voiceover in sync: `/voice/<name>` gives the scene's span, and while playing the audio element is the clock that the frame index is read from.

**Why:** The user reviews in the studio and orders the render separately — "studio mai dikhana hai render ni krna", "bar bar render na krna paai mai waha par daikho phir tumnai btaun k kam ok hai ab render krdo". They asked for word-by-word sync: "jo word bola jkara wohi dikhai".

**How to apply:**
- **One stage, not stations.** The Möbius `_check` flags camera travel between stations as a lurch. Objects rise out of the floor and sink back into it rather than fading. Every scene opens on the previous scene's `HANDOVER` row and redraws whatever was still on screen, cards and labels included.
- **Lurches are a pacing problem, not a keyframe problem.** `CameraPath` is Catmull-Rom, so it is C1 but not C2: acceleration jumps at every knot. A spike means two neighbouring segments carry very different speeds. The fixes that worked: spread a big move over more cues (scene 4's `_descent`), leave off the key a move would come to rest on so it runs into the next one, and start a reversal a cue earlier rather than making it sharper (scene 5). See [[mobius-film-vo-word-sync]].
- To try camera tables fast, sample `mobius_kit.CameraPath` and score `accel > max(10*median(accel), 0.6*median(speed))` with `WEIGHT = [1,1,1,6,6,6,3]`, instead of running the whole scene check each time.
- Use `.venv-gl` (`D:\Animated Math\manimgl\.venv-gl\Scripts\python.exe`) for manimgl and the checks; whisper and `align.py` need the system python.
- After any timing change, every studio cache is stale — rebuild all ten by POSTing `/rebuild/<g01..g10>` one at a time, never in parallel.
- An open fact to flag: the Bekenstein figure for a ~5 kg head is ~10^43 bits; the script says 10^42.
