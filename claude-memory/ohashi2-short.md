---
name: ohashi2-short
description: "swimming/output/ohashi2 - Marchand-calls-Ohashi-'scary' short (2026-09-29): two-athlete short, each beat pinned to whoever the line is about"
metadata:
  node_type: memory
  type: project
  originSessionId: 2e97caa6-3697-4fd1-9ecd-29ea5a4bf3bb
  modified: 2026-09-29T13:04:33.452Z
---

Short at `D:\flick\swimming\output\ohashi2`, delivered as `Leon Marchand JUST Called This 17-Year-Old SCARY!.mp4` (23.45s, 1080x1920, -12.4 LUFS, freeze-clean). VO = `Downloads\Music\tts-audio (85).wav` (23.40s). One graphic: a "2:04.83 / World Record" stamp.

**A two-athlete short, so every beat is pinned to whoever the line names.** Getting this wrong is the easy mistake: my first cut put Marchand under "swimming's newest rising star", which is Ohashi. Read each clause, not each sentence.

**Sources.** Ohashi's race and celebration come from [[ohashi1-short]]'s downloads at ranges disjoint from that short (its used list is in this project's `bake.mjs`). Marchand needed two new ones:
- `wR0FW5Lab6w` **World Aquatics**, his 200m IM world record (Singapore 2025) - clean host pictures, his own results board reads "WR MARCHAND 1". Usable 118-137s; after that it is the World Aquatics outro card.
- `NmQk2BjelRI` Eurosport, his **Paris 2024 200m breaststroke** gold - deliberately chosen because that is Ohashi's own event. "LIVE EUROSPORT" bug top-right, so crops stay left of x 0.82. Usable ~130-140s; 142s+ is crowd then a Eurosport card.

**The interview.** No clean copy of the Reuters mixed-zone interview exists - both carriers burn text over it. Picked `556W2LjdR7I` (The Daily Guardian) over `EbTdwHnieuI` (APT Sports) because the Guardian's strap is a plain "BREAKING NEWS" bar at the bottom (y>0.86) plus a "SOURCE: REUTERS" tag top-left (x<0.16), whereas APT burns actual English **subtitles** across the same area. `s <= 0.80` at `cx ~0.53` clears both of the Guardian's. Its interview runs ~36-60s and ~86-97s; the rest is medal ceremony.

**Trap:** the DT source's first 3.4 seconds carry a burned-in headline ("...ashes 200m breaststroke w..."), which is why ohashi1 started at 3.45. DT 11.8-14 is a clean, big Ohashi breaststroke close-up (arena cap + pink goggles) and is the best face shot in the whole pool of material - but it has a ~6px red border, so `s 0.92, cy 0.53` is needed to push the crop clear of it.

Related: [[ohashi1-short]], [[flick-swimming-folder]], [[flick-short-file-named-by-title]], [[flick-shorts-audio-level]].
