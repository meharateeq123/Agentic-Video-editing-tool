---
name: flick-athletics-shorts
description: "Track & field is the third sport in the library; where its footage comes from and why Sha'Carri close-ups come from a different meet than the race"
metadata: 
  node_type: memory
  type: project
  originSessionId: 3d12fe9f-5670-4e8b-9b0e-948737411aba
  modified: 2026-09-17T20:37:29.416Z
---

richardson1 (2026-09-18, `D:\flick\output\shorts\richardson1`) is the library's first athletics
short — Sha'Carri Richardson after the World Athletics Ultimate Championship, Budapest, 12 Sep 2026.
It lives under `output/shorts` with the motorsport ones, not in its own tree like
[[flick-swimming-folder]].

**Footage:** the **World Athletics** YouTube channel is the clean source — its "Day N Extended
Highlights" uploads are full broadcast with no watermark, and the women's 100m semi-final and final
both sit inside Day 2 (`1qZQ5akjdl4`). Avoid the reaction channels (Lethal Labs, Rise and Run):
they letterbox the race inside a static zoomed still, stamp a webcam circle over the corner, and
splice clips from five different meets into one video.

**Crop note:** a 100m is shot wide in 16:9. Cropping the full 720 height to 9:16 leaves the runners
a thin band over empty infield — crop ~360x640 (a 2x upscale) centred on the pack instead.

**Identity is the hard part here, same as swimming.** The Budapest feed never puts Richardson's name
next to her face; it only ever names the winner. What *is* provable there: the trophy shot runs
continuously into a "Melissa JEFFERSON-WOODEN 10.62" lower-third while her hip bib reads 4. That is
not enough to label the other American, so her close-ups in richardson1 come from the **Brussels**
Diamond League broadcast, where her bib reads RICHARDSON and the lower-third names her — placed only
under lines that mention no venue. Her Brussels bib does say "BRUSSELS" in small type; the user was
told.

**mcintosh1** (2026-09-18, `D:\flick\swimming\output\mcintosh1`) is a second one, in the swimming
tree this time — Summer McIntosh's 400 IM at Pan Pacs 2026 (Irvine) vs. her own 4:23.65 world
record from the 2025 Canadian Trials. Built after the user's relevancy correction on richardson1
([[flick-shot-relevance]]): every shot here is the actual event named in the line it plays under —
Pan Pacs footage for the Pan Pacs win and interview, the 2025 Trials footage only for the
world-record line. Both sources were already on disk from `records2026`, reused from disjoint
timestamp ranges. The one built graphic (`TimeCompare` in `components/Stamp.tsx`) exists because no
single broadcast frame puts 4:28.01 and 4:23.65 side by side — everywhere else the real broadcast
graphic or a stamp carries the number, same pattern as [[flick-info-without-cards]].

Related: [[flick-no-repeat-clips-across-shorts]], [[flick-info-without-cards]], [[flick-shot-relevance]].
