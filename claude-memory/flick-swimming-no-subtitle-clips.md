---
name: flick-swimming-no-subtitle-clips
description: "hard QC gate for ALL films (shorts AND long films, every sport) - reject any clip with burned-in subtitles/captions in any language, and crop out channel logos/banners, no exceptions"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 3d12fe9f-5670-4e8b-9b0e-948737411aba
  modified: 2026-09-28T11:55:56.418Z
---

No candidate clip may have burned-in subtitles or captions baked into the video, in ANY language (Japanese, English, whatever) - not just clips with English subtitles. This is a hard QC gate, not a nice-to-have: a clip either passes or gets rejected, checked before it goes into crop.ps1/footage.ts. This applies to EVERY film going forward - shorts and long films alike, swimming, athletics, motorsport, all of it - not just swimming shorts.

**Why:** flagged after kojima1 (swimming/output/kojima1), where some of the Japanese news-montage source footage had hardcoded subtitle text burned into the frame - not acceptable even though the subtitles were Japanese, not English. User then explicitly extended it to long films too ("or long mai bhi skhti sai" - strictly in long films too), and confirmed a real prior miss: [[long3-blaney-bristol-film]] (the Blaney Bristol long film) shipped with a clip carrying Chinese subtitles burned in - that should never have passed.

**How to apply:**
- Before baking a candidate range into a project's beds (short OR long film), pull a full-res contact-sheet frame from it and actually look for burned-in text bars/subtitles anywhere in frame - not just check the source's language or channel.
- If a clip has burned-in subtitles in any language, reject it outright and find a different source/range - don't just note it as a caveat and ship it anyway.
- Also make a strong effort (not just best-effort) to avoid clips with a channel logo/watermark bug sitting on the footage; when a logo-free alternative exists, always prefer it. A tasteful in-frame broadcast graphic (results board, name bug, official venue overlay) is fine - a corner watermark/logo stamped over the picture by the uploader is what to avoid.
- Applies across [[flick-swimming-folder]], the athletics/motorsport shorts workflow in [[flick-shot-relevance]], and equally to long-film projects (e.g. reddick1, larson1, keselowski1-style builds) - treat it as part of the same relevance/QC pass, checked per-clip alongside identity proof, on every project regardless of length or sport.
- Minimize using "Olympics"/Olympic Channel-sourced clips generally - prefer other broadcasters (the event's own federation feed, national broadcasters, the athlete's own team) when an equivalent shot exists there instead. Don't default to Olympic Channel just because it's an easy search hit. It's not a hard ban though: if no other source has the needed shot after a real search, Olympic Channel is fine to fall back on - just avoid it, don't refuse it.
- Keep making a real effort to minimize logo/watermark-bearing clips specifically, not just "avoid when convenient" - actively search for a clean alternate source before settling for one with a channel bug/watermark sitting on the footage.

**Escalated to a hard rule on zhang3 (2026-09-28, "ab yeh rule yaad rakhna next time ke liye, sakhti se").** The user caught two channel bugs in Studio that shipped uncropped: a TBS "100m Butterfly" event banner + upcoming-Games promo card across the top ~24% of `jkt18.mp4` (Jakarta 2018 footage), and a CCTV5 "体育" bug top-left on `nat25.mp4` (China National Games footage). Both were real footage worth using - the fix was never "find a different source," it was crop the bug out via the SRC table's `crop` field in bake.mjs/plan.mjs (`crop=iw:ih*<keep-frac>:0:ih*<top-frac>`), then delete and rebake just that source's beats.

**How to apply going forward, before a single beat ships to Studio, not after the user flags it:**
- For every new source file, pull a full raw frame (not a cropped preview) and actually look at all four edges for a persistent channel bug, event-promo banner, or lower-third strip - Chinese domestic broadcasts (CCTV, provincial sports channels) and Japanese terrestrial broadcasts (TBS, NHK, Fuji) are the two repeat offenders so far.
- If found, measure the bug's extent as a fraction of frame height/width from that raw frame (don't guess - a first guess under-cropped twice on jkt18 before landing on 25%), add a `crop` entry in the SRC/plan table for that source, and bake every beat from that source through the crop from the start.
- This is not "avoid when convenient" anymore - any source with a visible bug gets cropped before its first beat is baked, full stop.
