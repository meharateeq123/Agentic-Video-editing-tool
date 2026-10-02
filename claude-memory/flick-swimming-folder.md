---
name: flick-swimming-folder
description: "Swimming films get their own tree at D:\\flick\\swimming (not output\\), with a CLAUDE.md there carrying the standing NASCAR rules forward."
metadata: 
  node_type: memory
  type: project
  originSessionId: 3d12fe9f-5670-4e8b-9b0e-948737411aba
  modified: 2026-09-28T13:54:56.015Z
---

**Set up 2026-09-12 at the user's request.** All swimming work goes in `D:\flick\swimming\` —
`vo\`, `scripts\`, `output\<film>\`, `sources\` — and NOT in `D:\flick\output\`, which stays the
motorsport library. `D:\flick\swimming\CLAUDE.md` is written and auto-loads when working there; it
carries the standing rules (no gratuitous text, 1-second graphic exit, image cards as boxes, latest
map/globe kept to a 5-7s beat, fresh footage only, never name an unverified face) plus the pipeline
commands and the gotchas already paid for.

**Why:** the user wants the two subjects kept apart but the hard-won conventions to carry over, so
the rules live in a directory-scoped CLAUDE.md rather than being re-derived each time.

**How to apply:** when the user says "swimming", build under `D:\flick\swimming\output\`. Read that
CLAUDE.md first. The one rule that genuinely gets harder in swimming is identity: motorsport gives
car numbers, liveries and burned-in driver boxes, while swimmers in caps and goggles give only lane
number cross-checked against a start list, the results/scoreboard graphic, the broadcast's name
lower-third, or name/country on cap or parka — if none of those is in frame, no name card goes on it.
Expect more geo-blocked and taken-down sources than motorsport; say so rather than quietly
substituting. Related: [[flick-no-repeat-clips-across-shorts]], [[flick-graphic-exit-timing]],
[[flick-minimize-plain-text-scenes]], [[flick-shorts-visual-style-upgrade]],
[[map-animation-screen-time]], [[flick-vo-file-location]].

**Project-slug collision (2026-09-28), from [[zhang3-film]]:** a parallel Claude Code session working shorts
reused the slug `zhang3` while this session had a long film in progress under that exact same
`output\zhang3` folder, and overwrote its entire Remotion build in place (only `plan.mjs`, VO, script and
raw `dl\` sources survived, because they predated the overwrite window - everything else had to be rebuilt).
**Before starting any new project (short or long) under `output\`, check whether that folder name already
exists and has recent activity** (`Get-ChildItem output\<slug>` - if it's there and its files are being
actively written, it's someone else's in-progress build, not a free slug). Pick the next free number instead
of assuming a slug is available just because it wasn't the one you last used.
