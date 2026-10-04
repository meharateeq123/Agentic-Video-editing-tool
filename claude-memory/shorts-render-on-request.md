---
name: shorts-render-on-request
description: "Maths shorts: build and check them, then report back. Render (draft or final) only when the user says so."
metadata:
  node_type: memory
  type: feedback
  originSessionId: 965b55a1-c203-4287-bdb0-90beabfbb7a1
  modified: 2026-10-03T15:51:06.900Z
---

On 2026-10-02, mid-build of the Brachistochrone shorts, the user said "render ni krna kuch, bs shorts bna k mujhai btao, phir mai btaun ga jab render krna hoga".

**Why:** renders take their time and machine. They want to decide when that happens.

**Shorts studio:** the user reviews shorts in a studio, the way they review the long films ("studio mai dikhao"), not in rendered previews.
- It's `shorts\shorts_studio.py`, on http://127.0.0.1:3090, built 2026-10-04.
- It's separate from the long-film `preview_server.py`, which is 16:9 and belongs to the other session. It reuses that studio's `preview_worker.py` unchanged, run from each short's folder so the 9:16 config applies.
- Builds go to `shorts\_studio\<name>` at 540x960 and 20 fps (about 1.5 min for a 30 s short). The page plays them with vo.wav.
- Start it with Start-Process hidden (venv python). Trigger a build with POST `/build/<name>`.

**How to apply:**
- Write the scene and pass `_check_short.py` (no render needed for that).
- Then tell the user it's ready.
- Run `render_short.ps1` (draft or `-Final`) only on their go-ahead.
- Related: [[mobius-shorts]], [[maths-shorts-4k]].
