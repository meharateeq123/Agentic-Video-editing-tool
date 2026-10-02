---
name: tsmith1-film
description: "swimming/output/tsmith1 - Tatjana Smith comeback long film (50m breaststroke, LA 2028); built 2026-09-24, in Studio, not rendered yet."
metadata:
  node_type: memory
  type: project
  originSessionId: 3d12fe9f-5670-4e8b-9b0e-948737411aba
  modified: 2026-09-24T12:10:45.725Z
---

Long film for the script "Tatjana Smith Lost Her Love for Swimming" (VO tts-audio (36).wav, 7:07, 20 scenes).
Folder D:\flick\swimming\output\tsmith1 (remotion\ + dl\ sources + plan.mjs / bake.mjs / hook-bake.mjs).

- Structure: NO hook (user had it removed after 3 rounds: 15s -> 6s -> intense-sound -> "hook remove hi krdo";
  VO starts at frame 0, render.ps1 is VO-only). 20 VO-aligned scenes,
  158 beats (each unique, <=3s). Overlays: ID cards (Tatjana, Meilutyte, van Niekerk, Elendt), stat cards
  (4 medals, 5th), CompareBars 29.16 vs 30.09, globe beats (Pietermaritzburg, Los Angeles, Stellenbosch, Beijing).
- Studio: port 3012, composition "final-film". User said "studio mai dikhana hai phlai" - do NOT render until they OK
  it. Render = remotion\render.ps1 (chunked, muted picture, audio built from hook-audio.json + VO, concurrency 2, angle GPU).
- Script quirks: Whisper hears "Tatjana" as "Johnna"/"Tejana", Meilutyte as "Milutite", Pietermaritzburg as
  "Peter Merrittsburg" - source-script.txt holds the real spelling; timings were still aligned fine.
- Sources: Olympics (Paris 100br final, Tokyo 200/100 br), Fukuoka 2023 WA clips, AquaPark partner film (her own,
  interview shots are 4 of ~30 usable slots), SA Short Course Champs day-1 stream (needs bottom crop: burned-in
  timecode + timer), London Super-50 breast, Wikimedia stills. Not usable: SABC/eNCA clips (permanent lower thirds).

Related: [[flick-long-film-clip-rules]], [[yuzidi4-film]]
