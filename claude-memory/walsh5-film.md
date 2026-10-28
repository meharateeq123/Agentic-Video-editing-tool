---
name: walsh5-film
description: "swimming/output/walsh5 Walsh 22.75 long film, 2K 8:02, delivered 2026-10-21; introduced the FaceCard v2 face image card the user asked for"
metadata:
  node_type: memory
  type: project
  originSessionId: 2e97caa6-3697-4fd1-9ecd-29ea5a4bf3bb
  modified: 2026-10-21T13:27:44.905Z
---

Delivered 2026-10-21 as "Gretchen Walsh JUST SHOCKED the 50m Freestyle With an EPIC 22.75! - Women's 50m Freestyle.mp4" (2560x1440, 8:02). The "||" in the title was replaced with "-". Built on the zhang12 pipeline ([[zhang12-film]]).

**New: components/FaceCard.tsx**, the face image card the user asked for ("new face image cards").
- A 540x700 portrait card with a rotating conic-gradient rim. It swings in with a 3D tilt, the photo wipes open and a sheen crosses it.
- First name light, surname heavy, a flag stripe with country, a role line, and a stat badge that pops in.
- A side scrim keeps the footage visible.
- gen type `face` (photo, first, last, role, flag[], country, stat, statLabel, pos, side).
- Photos are cut from interview frames into public/id/. Run cropdetect first, because phone interviews have black side bars.
- Copy this card into every new long film; see [[flick-person-image-cards]].

**Sources:**
- UVA:
  - SwimSwam livestream sess3 (U9, fixed wide; Walsh dive ~@139)
  - zmWeI1i4ZsU, Walsh interview (crop 962:600 from x=160)
  - PMwJNwjNoDk, Douglass (red caption from @39)
  - 29News 639jaZriVic: N15/N7 and N14/N5 are ALEX Walsh, never Gretchen
- Budapest 2024: CQ8SxocdEFM and MkRaH4-PHSY, rich in Walsh.
- Kromowidjojo: jr0i_4ZtEr8. Kb4 is actually Sjöström (yellow cap), and Kb5 is a man.
- Sette Colli: fDWbVDfHRu0. Douglass 23.59: vt7zW2CNFWs. Douglass 23.49 at Pan Pacs: -ldCdms1RGk.
- Water Cube: wCbJUSvebVc (captions cropped).

**Traps:**
- The session-2 stream end (sess2end) is warm-down only. No footage exists of Douglass's 22.94 time trial.
- The D: drive was down to 4 GB. Delete parts/ and bundle/ of delivered films before rendering.
