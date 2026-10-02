---
name: map-animation-screen-time
description: "Map/globe animations must be a short beat, not a whole scene — the user has now flagged this on two films running."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 2e97caa6-3697-4fd1-9ecd-29ea5a4bf3bb
  modified: 2026-09-08T20:41:14.712Z
---

A map or globe animation gets **roughly 5-7 seconds of screen time, then cuts to real footage** — it is an establishing beat, never the whole scene. On bell1 the globe filled all 18.07s of scene 3 with no bed footage under it and the user called it out: "map animation par bohot ziada time waste kia hai... next time yeh mistake nahi karni." He had already said the same thing on the previous film ("yeh animation bohot ziada drawn out hai").

**Why:** These scenes read as dead air. The narration over them is almost always about the *event* (who won, what happened), not the location, so holding on a slow orbital zoom starves the line of the footage it actually needs.

**How to apply:** Build the map scene as a normal `BedChain` with real footage, and lay the globe on top as an overlay that fades out after ~200 frames. Order the chain so the hero shot lands exactly as the globe clears, rather than being hidden behind it. Same rule for the flat route map. Related: [[flick-footage-pacing]], [[bell-darlington-film]], [[flick-render-commands]].
