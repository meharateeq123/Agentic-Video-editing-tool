---
name: flick-shorts-audio-level
description: "Every short in the library shipped ~19 dB too quiet; master to about -12 LUFS, and hand the ending over to the footage's real commentary"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 3d12fe9f-5670-4e8b-9b0e-948737411aba
  modified: 2026-09-20T10:20:44.581Z
---

On kerr1 (2026-09-20) the user shared a short as the standard to hit
(`youtube.com/shorts/sORmby1sMUk`, "The Best relay Race The WORLD HAs Ever Seen") and said mixing the
voiceover with the clips' real voices is what makes it fun.

**Two things came out of measuring it.**

**1. Level.** That short is **-9.1 LUFS integrated**. Every short this library had shipped was around
**-28.5 LUFS** (lyles1 measured -28.8), i.e. roughly 19 dB quieter - Remotion's `<Audio>` output is
simply not mastered. Nobody had flagged it because it only shows up next to a real one.

Fix, applied to the finished mp4 with the video stream copied:
```
ffmpeg -i in.mp4 -af "volume=<gain>:eval=frame,alimiter=limit=0.891:attack=5:release=60:level=false" \
  -c:v copy -c:a aac -b:a 256k out.mp4
```
Target about **-12 LUFS** overall with true peak at -1 dBTP. Measure with
`-af ebur128=peak=true` and read the **Summary** block at the end, not the first line.

**2. Structure.** The reference does **not** duck one under the other - it hands over. Its own
voiceover runs 0-9s and then stops for good, and from 11s to the end the **real broadcast commentary
plays alone at full volume**, with the karaoke captions following the commentator's words instead of
a script. That is where the energy comes from.

kerr1 does the same in the shape the user's VO allowed: the VO carries scenes 1-5 (silent beds, as
always), then scene 6 is 7 seconds of the World Athletics call of the finish at full volume with no
VO at all, captions transcribing the commentator. The plumbing is a `volume` prop threaded
Footage -> SceneBed -> the bed object in `footage.ts`; the live bed is baked **with** its audio
(no `-an`) and must never be speed-changed, or SceneBed pitch-shifts the commentary - so bake it
longer than `(dur + 10 + 22) / 30` seconds.

Related: [[flick-shorts-energy]], [[flick-info-without-cards]].
