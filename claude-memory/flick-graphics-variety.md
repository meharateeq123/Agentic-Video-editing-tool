---
name: flick-graphics-variety
description: "Use the whole motion-graphics library (bar/line graphs, pie charts, timelines, comparisons, maps…) across a film, never one stamp style over and over"
metadata:
  node_type: memory
  type: feedback
  originSessionId: 3d12fe9f-5670-4e8b-9b0e-948737411aba
  modified: 2026-10-03T11:02:38.774Z
---

Don't build a film's graphics from one or two components. yuzidi10 (2026-10-03) used the same
RankStamp (big orange-outlined number + small label, e.g. "2:05.08 / 200 FLY — NO. 1") for almost
every fact. The user objected: "itnai zyada motion graphics hmarai pas hain… sarai use krnai — graph,
bar, pie chart, or jo bhi hain sab".

**Why:** the user likes graphics, but repeating one style looks cheap and monotonous. Earlier films
(e.g. long5 with 33 graphics) already built a big library of chart and graphic components.

**How to apply:** before wiring a film's graphics, inventory the existing components across all
flick projects (output/*/remotion/src/components, swimming/output/*/remotion/src/components). Then
match each fact to the graphic that fits its data shape:
- comparisons → bar chart or head-to-head
- progression → line graph or timeline
- share or split → pie or donut
- ranking → animated ranked list
- splits → split bars
- places → map pin
yuzidi10's final graphic set is the reference: `components/Gfx.tsx` (PieChart, LineGraph, Bars, Ring,
CheckList, Timeline, Chips, Headline, Ranks, Drop, Stat) built on top of DataViz/Elements, plus
IdCard, QuoteBar, KineticSequence. Copy that file into new films. Every graphic is window-driven
and its parts land on the VO word that names them (pie slices on each meet name, line-graph
points on each date). RingStat needs its value passed as a styled node, or the number doesn't render.
Keep RankStamp to one or two moments. No graphic type should dominate a film, and the same
graphic should never appear twice in a row. Graphics still follow [[flick-graphic-exit-timing]]
and [[flick-shot-relevance]].
