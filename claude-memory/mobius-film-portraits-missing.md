---
name: mobius-film-portraits-missing
description: Möbius film (D:\Animated Math) needs two scientist portrait JPGs that were deleted and cannot be downloaded from this machine.
metadata: 
  node_type: memory
  type: project
  originSessionId: 235ea8ac-0266-4464-b2f5-9013b8b8160a
  modified: 2026-09-09T14:56:57.163Z
---

Scene 5 of the Möbius film needs `D:\Animated Math\manimgl\assets\listing.jpg`
and `mobius.jpg` (Johann Benedict Listing, August Ferdinand Möbius — both
public domain). The originals were deleted on 2026-09-09 during a wipe and were
untracked, so they are unrecoverable.

**Why:** outbound HTTPS to commons.wikimedia.org fails from this machine's
shell (connection reset during the TLS handshake, via both PowerShell and
Python), so they cannot be re-fetched here — the user has to supply them.

**How to apply:** don't try to download them again. Ask the user to drop the two
files in `manimgl\assets\`. `PortraitCard` in [[mobius-film-scene-kit]] already
draws a same-size placeholder plate with initials when a file is absent and
centre-crops the real photo to the card's aspect once it appears, so nothing
else in the layout moves when they arrive — no re-tuning needed.
