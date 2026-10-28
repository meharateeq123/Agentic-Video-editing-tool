---
name: coetze1-film
description: "swimming/output/coetze1 long film (Coetze 22.09 50 back WR, Tashkent) delivered 2026-10-14, 8:02; VO came as 3 parts from a Google Drive folder"
metadata:
  node_type: memory
  type: project
  originSessionId: 2e97caa6-3697-4fd1-9ecd-29ea5a4bf3bb
  modified: 2026-10-14T12:05:52.153Z
---

Delivered `swimming/output/coetze1/Pieter Coetze JUST SHOCKED the 50m WORLD With an INSANE 22.09! - Swimming World Cup 2026.mp4` (8:02, 1080p). The VO came as 3 WAV parts (24 kHz mono) in a Google Drive folder; I downloaded it with `python -m gdown --folder <url>` (pip install gdown) and joined the parts in order 1-2-3.

Built on the kornev4 pipeline (shots/chunks/plan/bake/gen/verify .mjs; see [[kornev4-film]]). 38 scenes, 177 beds; reused the Tashkent/Baku sources from kornev4/dl via hardlinks.

New sources:
- Singapore 2025 100 back: Ruk3ZZbwmKI (World Aquatics) and jmZue75UEt8 (Ceccon fan channel, with walkouts).
- Glasgow 2026: vHxJdlSnALs (CG day-2 recap, the 50 back final with Coetze), T-h542iIu34 (Team SA).
- Paris 2024 walkouts: 1DjVWJ2ShIY / VeT7n0lnhBc.
- Kos 48.16: SF1PBwFQAI8. Kolesnikov 22.11 (Match TV): -y6QXvTITrE. Ceccon 51.60: dG0oJHqX3UM.
- CGTN Coetze training: JZtlU09T61M, with the bottom ticker cropped off.

Rejected:
- A66rXEmQ8fI: burned-in subtitles.
- AdYeLGM_iyA: talking head.

**Traps:**
- Tashkent highlights T10/T15 shots run into OTHER events (Steenbergen IM, Haughey 200 free lane lists). Always check later windows of a long shot.
- PowerShell Get-Content | Set-Content mojibaked a regex BOM in gen.mjs again ([[powershell-utf8-rewrite-trap]]).
- No footage exists of the 48.21 100 back (Tashkent); the Singapore 100 back race was used.
