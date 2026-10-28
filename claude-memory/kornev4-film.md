---
name: kornev4-film
description: "swimming/output/kornev4 long film (Kornev 21.28 50 fly WR, Tashkent) delivered 2026-10-13, 8:05, 1080p; shot-library workflow + yt-dlp bot-block fix"
metadata:
  node_type: memory
  type: project
  originSessionId: 2e97caa6-3697-4fd1-9ecd-29ea5a4bf3bb
  modified: 2026-10-12T21:42:35.851Z
---

Delivered `swimming/output/kornev4/Egor Kornev JUST Smashes the Men's 50m Butterfly With an EPIC 21.28! - Swimming World Cup 2026.mp4` (8:05, 1080p, 748 MB). The title's `||` was replaced with `-` because `|` is illegal in Windows filenames. VO = `tts-audio - 2026-10-12T215131.480.wav` (485.2s); the sibling `...T214221.968.wav` (487s) is an earlier take.

**Workflow that worked:**
- `shots.mjs`: scene-detect every source into `library.json`.
- `chunks.mjs`: labelled 3s-chunk sheets.
- `plan.mjs`: 32 paragraph scenes, refs like `T38@6`.
- `bake.mjs --check`: catches unknown refs, beds that are too short, and overlapping windows.
- `gen.mjs`: chains, plus graphics anchored to Whisper words. The keywords had to match Whisper's misspellings ("mcavoy", "ponte", "estana").
- `verify.mjs`: a sheet of every beat with its spoken words.
- Ran freezedetect on all 189 beds; one static start-list board was swapped out.
- Rendered as 49 chunks with 3 parallel workers, about 32 min.

**yt-dlp trap:** on 2026-10-12, YouTube bot-blocked every download ("Sign in to confirm you're not a bot" / 429). `--cookies-from-browser` failed because Chrome locks its cookie database. Fixed with `pip install -U --pre yt-dlp[default]` (2026.10.10 dev). Some IDs still blocked on the first try and worked about 20 minutes later.

Sources are all World Aquatics: Tashkent WR clip, Tashkent highlights/recap, Coetze WR, both Ponti WRs (Budapest 2024), Baku highlights/recap, Euros 2026 50 fly final (Eurovision), Singapore 2025, Silk Road Tour preview (maps/Astana/medals). Beijing b-roll comes from worldcup1/dl.

Honest gaps told to the user: no footage of the 2024 Budapest Russian medley relay, so the beat about it used other footage. The Russian Championship 21.06 clips are a fan channel with a Match TV bug.
