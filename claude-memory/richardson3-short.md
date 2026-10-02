---
name: richardson3-short
description: "output/shorts/richardson3 - Sha'Carri 2026 season statement short (2026-09-28): third short off the richardson2 sources, fill-mode for result boards"
metadata:
  node_type: memory
  type: project
  originSessionId: 2e97caa6-3697-4fd1-9ecd-29ea5a4bf3bb
  modified: 2026-09-28T13:33:50.057Z
---

Short at `D:\flick\output\shorts\richardson3`, delivered as `Sha’Carri Richardson JUST finished her 2026 season with a statement!.mp4` (16.32s, 1080x1920, -12.5 LUFS, freeze-clean). VO = `Downloads\Music\tts-audio (75).wav` (16.28s). The pasted title line is not in the VO - the script starts at "After taking third in Budapest".

**No new downloads.** All three sources were already in `output\shorts\richardson2\dl`, at ranges disjoint from that short's (its used list is in this project's `bake.mjs` header): `usa-athlos100` (Athlos London 100m highlights), `rog-mjw` (Budapest women's 100m final) and `citius-int` (CITIUS MAG mixed zone) - the last one richardson2 never used at all.

**Identity is on screen everywhere**, which is the pattern worth repeating for athletics: the Budapest result list reads JEFFERSON-WOODEN / ALFRED / RICHARDSON (proves "third in Budapest"), the Athlos 100M STARTLIST and 100M RESULTS boards both read SHA'CARRI RICHARDSON 10.80, and her bib reads RICHARDSON in the trackside and mixed-zone shots.

**`fill` mode for boards.** A full-width results board cannot survive a tight 9:16 crop, so those four beats bake as the whole 16:9 frame over its own blurred copy (`boxblur=26:2, eq=brightness=-0.14`). Everything else is a tight crop with her face in frame.

**Traps hit again:** contact-sheet timestamps drifted on 7 of 11 beats on the first bake (the results board was 4s later than the sheet tile suggested, the celebration 6s later). Always pull a full frame at the intended in-point before setting `cx`. And after the first render, 4 mixed-zone beats ran back to back - swapped the closer for her trackside portrait so no more than 3 share a setup. A curly apostrophe in the filename needs `[char]0x2019`, not a literal (see [[zhang3-short]]).

Related: [[richardson2-short]], [[flick-athletics-shorts]], [[flick-short-file-named-by-title]], [[flick-shorts-audio-level]].
