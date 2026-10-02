---
name: eddie1-film
description: "surfing/eddie1 - first surfing film (2026-10-01): Eddie Aikau / Hokule'a 1978, 48.9s long-film-pipeline short, documentary cutaways + mixed graphics"
metadata:
  node_type: memory
  type: project
  originSessionId: 2e97caa6-3697-4fd1-9ecd-29ea5a4bf3bb
  modified: 2026-10-01T12:35:24.079Z
---

First surfing video, built at `D:\flick\surfing\eddie1`. The user pasted a ~110-word script ("March 1978. In rough seas off Molokai, the voyaging canoe Hokule'a lies capsized...") and said "long film bnani hai, apna hi style rkho jaisai swimming or nascar ki" - i.e. the 1920x1080 long-film pipeline (BedChain / SceneTransition / VO-aligned timeline, copied from `output\long5\remotion`), not a 9:16 short. VO = `Downloads\Music\tts-audio (100).wav`, 48.92s.

**Script flag:** the script and VO both stop at "three words carry his legacy: Eddie would" - the real phrase is "Eddie Would Go". I put "Eddie Would Go" on the closing quote bar.

**Graphics - the user said "aik hi motion graphic ni use krna" (don't use just one motion graphic):** so the film mixes VenueStamp (S1, Molokai Channel), IdCard (S3, Eddie), RankStamp "500+" (S4) and QuoteBar (S10, "Eddie Would Go"). Other scenes are plain footage.

**Footage (all from sources I could QC; nothing from the 1978 capsize was filmed by a crew in the water, so beats are matched by subject, not claimed as exact):**
- `QAH5HYpu3so` "The Eddie Aikau Story" (47 min documentary, Cumulus). 403'd with audio, worked **video-only** (`bv*[height<=720][vcodec^=avc1]`). The goldmine: archival 1978 Hokule'a cutaways (storm over the bow ~2058s, upturned hull ~2340s, crew in the water ~2346/2370s, night flare ~2364s, sunset ~2070s), early photos of Eddie (~87-105s), 1970s surfing, beach. **Interview shots carry burned-in name lower-thirds and talking heads - not used.**
- `gK0BtceW3gY` ESPN 30 for 30 trailer: the "thanks rescuer Eddie Aikau" newspaper clipping, the capsized canoe, the grave.
- `PQECse9VW20` WSL water-patrol rescues at The Eddie 2015/16 - a heat scoreboard runs across the top, cropped off (`crop=1056:594:112:120`).
- Rejected: AP Archive Hokulea 50th birthday (AP logo + a modern celebration, wrong era); HavocTV Quiksilver "Eddie Would Go" (Quiksilver bug + modern); Watermark "Eddie Wen' Go" (a children's picture book, with text on every frame); Surfline Eddie 2023 (REPLAY/Surfline/KHON-2 bugs).

**Map technique that found it:** a 10x10 contact sheet at 30s intervals located the zones, then a 10x10 at 6s intervals over the 1780-2380s window pinned the voyage beats; a labelled sheet (drawtext timestamp on each tile) then settled the exact seconds. Doing the labelled sheet first would have saved two passes.

**Traps:** PowerShell `$n` inside a here-string/function scope does not see outer variables - it silently wrote scene files named `1`,`2`..`10` and without imports; always write each file with full paths. long5's `footage.ts` helper is source-keyed `L(file,start,frames)`; the long3-style `L(file,frames)` is what a one-file-per-beat film needs. Run `Set-Location` back to a known folder before relative `[IO.File]::WriteAllText` paths.

Related: [[surfing-channel-analysis]], [[long5-film]], [[flick-long-film-clip-rules]], [[flick-short-file-named-by-title]].
