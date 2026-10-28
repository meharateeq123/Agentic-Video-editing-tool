---
name: olympic-channel-logo
description: "User strictly forbids the Olympic Channel logo in any film; Olympic Games uploads carry it on every frame (top-left, in the blurred pillarbox)"
metadata:
  node_type: memory
  type: feedback
  originSessionId: 2e97caa6-3697-4fd1-9ecd-29ea5a4bf3bb
  modified: 2026-10-16T13:08:03.246Z
---

On ohashi3 (2026-10-16), the Phelps Athens 2004 clips (KqA7kTFurvg, "Olympic Games" channel) showed the OLYMPIC CHANNEL logo in the top-left. The user said: "mainai skhti sai mana ki tha yai logo na nazar ai" (I strictly told you this logo must not appear).

**Why:** Olympic Games / Olympic Channel uploads are often pillarboxed 4:3 archive with blurred side fill. The logo sits on that blurred side, and a full-frame bake keeps it.

**How to apply:**
- Before baking, check the first frame of every Olympic-channel source at full size for the logo; small contact sheets hide it.
- Crop to the real picture. For KqA7kTFurvg, `[0.62, 0.62, 0.19, 0.19]` worked.
- After the render, spot-check those beds in the final file.

The same goes for any channel bug. See [[flick-swimming-no-subtitle-clips]].
