---
name: kornev1-short
description: "swimming/kornev1 - Egor Kornev ties 100 free WR at Baku World Cup (2026-10-03): the event happened that day, so no footage of it exists; 44.84 is the SHORT-COURSE record"
metadata:
  node_type: memory
  type: project
  originSessionId: 2e97caa6-3697-4fd1-9ecd-29ea5a4bf3bb
  modified: 2026-10-03T09:18:42.983Z
---

Built at `D:\flick\swimming\output\kornev1` (16.45s, 9:16, 4 scenes, 10 beds). VO = `Downloads\Music\tts-audio - 2026-10-03T130121.130.wav` (16.44s) - a **different, similarly named file** (`...T130248.618.wav`, 19.88s) is the McEvoy 100 free VO for another short, so pick by transcript, not by recency. Built and typechecked; **not rendered** - per [[shorts-render-on-request]] I stop after the build and wait for the user.

**Two facts the script glosses over and I did not fix:**
1. The Baku 100m free happened that day, so **no footage of it exists**. Beds are Kornev's earlier races (`ftrTqZ2MbyE` "EGOR KORNEV 100M FREESTYLE 47.42", a Russian Championship final on the MATCH TV feed, ~14-90s) where **his name is on the lane bars in Cyrillic ("Е.КОРНЕВ")** - that is the identity proof - plus Chalmers' real record swim.
2. **44.84 is the short-course (25m) world record**, set by Kyle Chalmers at Kazan 2021 (`LQDe1sQEr9k`, World Aquatics, "WR K. CHALMERS 1", results board 44.84, ~52-66s). The VO just says "100-meter freestyle"; I left it and did not caption it as long-course.

Rejected: `Euravixa` (Russian-language recap, only Baku coverage found), `ZGVcT30L54k` Swim Scribe (a talking-head host in most frames; only its race inserts are usable and I used none).

**Graphic:** one "44.84 / 100m Freestyle" RankStamp on the spoken number (S1), one SFX hit.

**Traps hit (token cost):** a PowerShell `@(@('KR',5),@('KR',14))` array of arrays flattens to scalars - build with `$items+=,@('KR',$t)`. A variable named `$f` silently overwrites a hashtable named `$F` (case-insensitive). A single long script that ends in `Remove-Item` on a path got blocked and **silently skipped the earlier writes in the same call** - write source files with the Write tool, never batch them with a Remove-Item. `Get-Content | WriteAllText` double-encoded Cyrillic comments into mojibake again (see [[powershell-utf8-rewrite-trap]]).

Related: [[worldcup1-short]], [[flick-swimming-folder]], [[flick-short-file-named-by-title]].
