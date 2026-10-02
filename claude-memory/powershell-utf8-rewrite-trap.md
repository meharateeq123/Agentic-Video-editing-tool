---
name: powershell-utf8-rewrite-trap
description: Never rewrite a source file with PowerShell 5.1 Get-Content | Set-Content — it double-encodes UTF-8 (— becomes â€”). Use the Edit tool.
metadata:
  node_type: memory
  type: feedback
  originSessionId: 235ea8ac-0266-4464-b2f5-9013b8b8160a
  modified: 2026-09-25T12:45:03.290Z
---

Do not edit source files with `(Get-Content f) -replace … | Set-Content -Encoding utf8 f` on this machine.

**Why:** Windows PowerShell 5.1 reads a UTF-8 file that has no BOM as the ANSI codepage, then writes it back as UTF-8 with a BOM. Every non-ASCII character is double-encoded: em dashes, ÷, ° and ∇ all turn into `â€”`-style garbage. This happened in the Graham session and again in fractions `scene_05_third.py` on 2026-09-25.

**How to apply:**
- Make every source change with the Edit tool.
- If a file has already been hit, repair it with Python: `t.encode('cp1252').decode('utf-8')`, then write it back without a BOM. Afterwards, check that no `â€` remains.
