---
name: flick-scene-completeness-check
description: "Before calling a flick video's scenes done, verify every built overlay/card component is actually wired into a scene — not just spot-check a few rendered frames."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 2e97caa6-3697-4fd1-9ecd-29ea5a4bf3bb
  modified: 2026-09-05T20:12:26.741Z
---

In the reddick1 project, `remotion/src/components/IdCard.tsx` (a photo + name + affiliation broadcast-style card) was built but never imported by any scene — grep for its name matched only its own definition. Scene 1 shipped with the lighter text-only `SideIntro` card instead of the photo `IdCard` that was clearly built for this kind of moment, and the closing scene (Scene21) shipped with `wins={[]}` and no card at all. The final render looked fine at a glance (QC stills of a couple of frames all looked correct), so this shipped unnoticed until the user watched the whole thing and caught it themselves.

**Why:** This project had no `scene-spec.json` / `flick-plan.md` tying each transcript scene to its intended visual treatment, so there was nothing to cross-check the finished scenes against. A component can be fully built and correct and still never make it into the film if no one checks it's actually referenced.

**How to apply:** Before considering a flick project's scenes complete (and definitely before a long render), for every custom component under `src/components/`, grep the scenes folder for its name and confirm it's imported somewhere. A component with zero usages outside its own file is a scene that shipped without its planned overlay. Do this in addition to, not instead of, visual QC stills — stills only catch what you think to check, not what's silently missing. Related: [[reddick-southern-500-film]].
