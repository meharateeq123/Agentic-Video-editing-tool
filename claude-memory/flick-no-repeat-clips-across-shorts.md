---
name: flick-no-repeat-clips-across-shorts
description: A source clip used in ANY earlier short in the library must not be reused in a new one — source fresh footage every time, not just vs. the last 2
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 3d12fe9f-5670-4e8b-9b0e-948737411aba
  modified: 2026-09-09T15:18:36.058Z
---

Rule: before finalizing `footage.ts` for a new short, treat every real-footage source file used in ANY previous short in the whole shorts library as off-limits — not just the immediately preceding 2. Always go find new real footage (new yt-dlp search/download + QC) for a new short, even when a fitting, already-QC'd clip exists from an earlier project on the same subject.

**Why:** First incident — gibbs1 (Ty Gibbs) directly reused bell1/bell2's bell-battle-raw.mp4/bell-playoffs-raw.mp4 as generic Darlington beds; caught immediately ("gibbs bhi bilkul same waisi hi bna di hai"). That produced a first version of this rule scoped to "the last 2 shorts only." Second incident — cleetus4 was built by reusing cleetus3's hook-forehead.mp4/talladega-mid.mp4/daytona-truck.mp4/talladega-reaction.mp4 (a same-subject short from 3 shorts back, so technically outside the "last 2" window). The user caught it again and was explicit: "mainai bola tha k last 2 ki clip use ni krni, tumnai again wohi kam kia" — i.e. the "only last 2" scoping was too narrow and the user's actual intent is broader: don't reuse footage from *any* earlier short, period. Fixed by dropping all 4 reused files and sourcing 2 entirely new videos (talladega-final-laps.mp4, press-conference.mp4) neither of which had ever appeared in this project's history.

**How to apply:** When scaffolding a new short's footage.ts, check the bed-pool/footage.ts of every prior short in `output/shorts/` (not just the 2 most recent) and treat all of those source files as off-limits. This applies especially hard when the new short covers the same subject/driver as an older short (e.g. a second Cleetus short, a third Bell short) — that's exactly when the temptation to reuse "already-verified" clips is highest, and exactly when the user has caught it twice now. This is independent of [[flick-footage-pacing]] (not stretching one clip within a single video) and [[flick-no-game-footage]] (never gameplay footage) — this rule is specifically about variety *across* every short in the library.
