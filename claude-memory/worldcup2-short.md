---
name: worldcup2-short
description: "swimming/output/worldcup2 - 2026 World Cup opening-day short (2026-10-01): named 4 athletes with no time to verify footage, used typographic name cards over generic racing b-roll instead"
metadata:
  node_type: memory
  type: project
  originSessionId: 3d12fe9f-5670-4e8b-9b0e-948737411aba
  modified: 2026-10-01T12:14:42.169Z
---

Short at `D:\flick\swimming\output\worldcup2`, delivered as `The 2026 Swimming World Cup Starts TODAY!.mp4` (21.61s, 1080x1920, -13.1 LUFS, freeze-clean). VO = `Downloads\Music\tts-audio - 2026-10-01T152236.143.wav` (21.56s) - the first candidate dropped turned out to be a different (track & field) short's VO entirely ("Melissa Jefferson Wooden"), caught by transcribing before building, per the standing rule.

No new download - reused [[worldcup1-short]]'s three official World Aquatics promo downloads (`FoHSNV8VdEo` Silk Road Tour, `4nB6hRq63v0` Beijing 2026, `OFbxcD5DuqE` Josh Liendo WR) at fresh ranges, listed in `bake.mjs`'s header against worldcup1's exact used windows.

**Script named four specific swimmers (Cameron McEvoy, Siobhan Haughey, Marrit Steenbergen, Qin Haiyang) with no time budget to verify any of their footage.** Rather than guess at faces in the promo reels, used plain typographic name cards (`BigType`, one per name, timed to land when each name is spoken) over a generic, un-closeup racing wide-shot as the backdrop - the backdrop never claims to show that specific swimmer, so no identity risk. This is the CLAUDE.md rule-6 fallback ("drop footage or use a typographic plate... instead of guessing") applied for the first time under real time pressure.

**Contact-sheet row/column mis-mapping cost real time twice.** A sparse `fps=1` contact sheet is easy to miscount by a row when reading text out of the tiled image (confirmed "$1.2M PRIZE POOL" at what looked like t=43-44 was actually at t=41-42; "Beijing" b-roll assumed at t=50 was actually a named swimmer's close-up, the real Beijing shot was ~1s later). Always confirm the exact second with a direct `-ss` frame pull before locking a bake offset in - the sheet narrows the search window, it doesn't replace the final check.

Related: [[worldcup1-short]], [[flick-shot-relevance]], [[flick-shorts-audio-level]].
