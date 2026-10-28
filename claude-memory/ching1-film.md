---
name: ching1-film
description: "swimming/output/ching1 Adrianna Ching (10-year-old, 7 golds in Cebu) long film, 2K 7:27, delivered 2026-10-22; built from her real photos + real meet footage, since no race video of her exists"
metadata:
  node_type: memory
  type: project
  originSessionId: 2e97caa6-3697-4fd1-9ecd-29ea5a4bf3bb
  modified: 2026-10-24T09:57:10.248Z
---

Delivered 2026-10-22 as "This 10-Year-Old Kid Wins 7 GOLDS in Cebu - Adrianna Erika Ching.mp4" (2560x1440, 7:27).

There is no video of her racing online. The film uses:
- **7 real photos of her**, taken from frames of the Fluxswim video KycgiDpKbVY (Facebook/news photos): sofa medals, Mickey jersey, bench, certificate, Bangkok backdrop with flag, the "2" plaque, and the Race Pace trophy under her name banner. Each was made into a 4.2s blurred-background slow-zoom clip (dl/ph_*.mp4) and used once.
  - Rejected: the AI-looking frames in that video (pool portrait, "older" smiling shots, morph transitions), and all of 0Jv5zwLpHSU / hU3SBpWYiTU, which are AI imagery.
- **Real meet footage:**
  - ikTFYGm5ul8: Cebu Race Pace 2026, wide
  - niDYaNX9wH8: CVIRAA 2026, vertical; crop [1,0.316,0,0.4]
  - K29rY44izIM etc.: AOSI Bangkok 2026, a "Live 24" presenter channel; only the non-presenter shots, with the bottom banner cropped
  - V0--PN7Ouig: Batang Pinoy opening ceremony
  - Batang Pinoy qualifier pools
  - Cebu City Sports Center tours
  - Cebu, Bacolod and Bangkok drones
- **Phelps:** e-ldwePuoW0 has the OLYMPIC CHANNEL LOGO top-left. Crop [0.76,0.76,0.16,0.16]. Mp63 is Cseh, not Phelps.

**Modern 10s hook test (2026-10-24):** remotion/src/components/Hook10.tsx, composition "hook" (324f, VO 0-10.8s), Studio port 3015. Hard cuts on VO words; 7 slam, medal pops + face punch-in, Cebu pin, 500 counter, name slam. Uses only scene 1-3 beds. Awaiting the user's verdict. If adopted: replace scenes 1-2 and the scene-3 FaceCard. ching.jpg is a crop of the sofa photo Pa1, so never use both.

**Traps:**
- `$D` in PowerShell clobbers `$d` (variable names are case-insensitive).
- Session restarts and tool interrupts killed Start-Process render workers twice. Launch them with Invoke-CimMethod Win32_Process Create (detached), and don't start two workers at once while render.ps1 rebundles (EISDIR race).
