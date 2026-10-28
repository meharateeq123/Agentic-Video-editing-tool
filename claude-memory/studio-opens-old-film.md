---
name: studio-opens-old-film
description: "The ManimGL studio kept opening an old film's scene because /preview trusted a stale URL hash; fixed in the page, and ACTIVE must be switched the moment a new film's scenes exist."
metadata:
  node_type: memory
  type: feedback
  originSessionId: 235ea8ac-0266-4464-b2f5-9013b8b8160a
  modified: 2026-10-06T18:16:36.540Z
---

When a new ManimGL film's scenes go into the studio, the user opens
`http://127.0.0.1:8080/preview` and must land on **that film**, never an older
one. This went wrong repeatedly and the user was rightly angry about it
("itni dfa smjhaya apko").

Two separate causes, both now handled:

1. `ACTIVE` in `preview_server.py` picks the film whose scenes are listed
   (`SHOWN`). Set it to the new film's key prefix in the same edit that adds
   the scenes — not later.
2. The `/preview` page used to read `location.hash` and fall back to the
   literal `'scene01'`, so a hash left in the address bar from an earlier film
   reopened that film: the title came from the old film and the dropdown sat
   empty. Both studio pages now check the hash against the options actually
   listed and fall back to `pick.options[0]`.

**Why:** the user reviews every film through this page, so a stale hash means
they are reviewing the wrong video and lose trust in the whole handoff.

**How to apply:** after wiring a new film in, restart the server and fetch
`/preview`, then confirm the `<option>` list holds only the new film's keys
before telling the user it is ready. Do not ask them to edit the URL.

Related: [[flick-render-commands]], [[manimgl-studio-part-rebuild]].
