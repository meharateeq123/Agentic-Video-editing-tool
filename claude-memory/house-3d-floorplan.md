---
name: house-3d-floorplan
description: "D:\\flick\\3d-Floorplans — 2D floor plan (murtaza bhatti.pdf) turned into a furnished, labelled 3D GLB; what was built, the fixes, and the sharing traps."
metadata:
  node_type: memory
  type: project
  originSessionId: fe105c79-3232-42b3-b989-07ea892e07ff
  modified: 2026-10-11T15:25:38.112Z
---

Built 2026-10-07/08 from the user's architectural plan PDF (`C:\Users\HASSnain computer\Downloads\murtaza bhatti.pdf`), a 36'-0" x 93'-6" single-storey house: 4 bed rooms, 4 baths, 3 sky lights + sky light area courtyard, lobby, living, drawing, kitchen, varandah, car porch, shop. 19 named rooms.

Cloned github.com/Executioner501/3d-Floorplans ("Construct-AI": 2D plan image -> YOLO detect -> boolean-cut openings + generative roof -> GLB) into `D:\flick\3d-Floorplans`, venv there with the light **runtime** set (`requirements.txt`, ONNX path) — NOT `requirements-dev.txt`, which pulls ~4 GB of torch for no benefit. Python 3.12.7 is what it needs.

**Deliverable:** `plans\murtaza_labelled.glb` — 84 walls, 14 doors, 8 windows (really cut, not stuck on), 220 furniture parts, 57 label parts.

Code written into the repo:
- `plan_schema.py` — the 20 rooms in FEET, handed to `builder.export_to_obj` as "pixels" with scale 0.3048. Exact dimensions beat the detector; use this, not YOLO, when the plan prints its measurements.
- `furniture.py` — per-room-type furnishings as trimesh boxes.
- `labels.py` — room names + dimensions as extruded geometry (matplotlib TextPath -> shapely even-odd -> extrude), NOT textures.
- `detect_tiled.py` — the real bug fix, see below.
- `run_onnx.py` — main.py's pipeline on the torch-free detector.
- `builder.py` gained one `extra=` parameter so furniture/labels reach every export path.

Traps worth not repeating:
- **The repo letterboxes the whole sheet into one 640x640 pass.** On a 1128x3058 drafted plan that leaves walls under 2 px: 21 walls found. Tiling at 900 px with 30% overlap finds 108 walls, 15 doors, 9 windows. Same trap on any CAD sheet.
- **3D text orientation:** mirroring one axis reflects the glyphs; rotating 180 about z reverses the reading order. Identity is correct — TextPath is already +x right / +y up once the builder's export rotation is undone. Both wrong versions were shipped before the right one.
- **Label size from character count is wrong** — glyph advances vary and scaling by cap height inflates strings with no descenders. Measure the built mesh, then fit to width.
- **Labels on the floor get buried** by furniture and walls; the user rejected that. They now float at 10.6 ft (walls are 9'-10") with a thin pin dropping to the room.
- **Artifacts do not serve `.glb`.** Base64 it into a `.txt` supporting file and `GLTFLoader.parse()` it. Also: publishing a supporting file from an absolute scratchpad path was blocked by a Read permission rule — copy it into the working directory and pass a relative path.
- cdnjs versions three.js as **`r128`**, not `0.128.0`. The wrong one 404s silently and the whole page dies on the first line.

Preview PNGs come from the repo's own `preview_render.py` (needs matplotlib, not in the runtime set). Headless Chrome screenshots of a local three.js page also work: `--headless=new --enable-unsafe-swiftshader --virtual-time-budget=15000 --screenshot=...`, launched via `Start-Process -Wait`.

Both artifact links published for this (the three.js plan viewer and the GLB phone viewer) went dead when the account changed — see [[flick-short-file-named-by-title]] for how deliverables are otherwise handed over. A turntable video was started and the user said to drop it (~5.8 s/frame via preview_render; ffmpeg is on PATH).
