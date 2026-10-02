---
name: manimgl-studio-part-rebuild
description: "ManimGL preview studio (D:\\Animated Math\\preview_server.py): rebuild only a marked stretch of a scene, and how GLB models are loaded (ModelMesh)."
metadata:
  node_type: memory
  type: feedback
  originSessionId: 235ea8ac-0266-4464-b2f5-9013b8b8160a
  modified: 2026-09-25T13:18:14.738Z
---

The user said "poora scene na rebuild kia kro srf jo part khrb hota usko kia kro" — rebuild only the broken part, not the whole scene, when fixing one moment.

**Why:** a full studio rebuild costs a couple of minutes per scene, and most fixes touch a few seconds.

**How to apply:**
- The studio supports it (added 2026-09-25): `POST /rebuild/<scene>?from=<s>&to=<s>`. On the page, **I** / **O** mark in and out on the slider and "rebuild in→out only" pads half a second each side. `preview_worker.py` still runs the whole scene (so state is exact) but skips the GPU draw and JPEG outside the window; the server keeps the other cached frames.
- Use a part rebuild when the change is local to a stretch. Use a full rebuild when the change touches the whole scene (a shared object's look, a camera key early on) or the scene's length changed — the server reports an error if the length no longer matches the cache.
- Honest speed: a 4 s window took 109 s against 136 s for the full 29.5 s scene, because construct and updaters still run every frame. The saving grows with scene length.
- **To rebuild to the end, pass `to=999`, never the scene's slot length.** The cache runs a few frames past the slot, because manim rounds every play up to whole frames (for example 843 frames = 42.15 s against a 41.73 s slot). A window ending at the slot left the last frames stale, and the user caught a collision there that had already been fixed everywhere else. After part rebuilds, audit each cache's oldest frame time against the time of the last change that touches it.
- Frames are served with `?v=<stamp>`; the browser caches `/frame` for a day, so without the stamp a rebuilt moment keeps showing old pictures.
- GLB models: this manimlib fork has `TexturedGeometry` but it fails to compile (shader wants `DarkTexture`) and misses Surface attributes. `fractions/fraction_kit.py` has `ModelMesh`, which fixes both without touching manimlib; `_load_bus_parts` shows how to load a GLB with trimesh, turn glTF y-up into stage z-up with a proper rotation, and write out the embedded textures. See [[manim-framing-and-overlap]].
