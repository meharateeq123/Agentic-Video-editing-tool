---
name: tsmith2-short
description: "swimming/output/tsmith2 - Tatjana Smith comeback short (2026-09-24): subject-centred crops, sources reused from tsmith1 with disjoint ranges"
metadata:
  node_type: memory
  type: project
  originSessionId: 2e97caa6-3697-4fd1-9ecd-29ea5a4bf3bb
  modified: 2026-09-24T12:46:34.499Z
---

Short at `D:\flick\swimming\output\tsmith2`, delivered as `Tatjana Smith JUST Came Out of Retirement!.mp4` (21.4s, -12.3 LUFS). VO = `Downloads\Music\tts-audio (37).wav` (20.84s; I first mistook it for a Bubba VO, see [[bubba1-short]]). `tsmith1` next to it is the 7-minute long film about her (VO `(36)`), built the same day by another session.

**User's ask:** "clips ko short mai aisai dikhana k frame mai main hon" - the crop window must sit on her in every shot. `bake.mjs` does that: per beat a centre (`cx`), window height (`s`) and `cy`, 9:16 window cut from the 16:9 source, checked on a contact sheet with the window drawn in red before baking.

**Sources:** taken from `tsmith1\dl` but only ranges that film's `plan.mjs` does not use (each `SRC@m:ss` there = a 3s cut). Best of them: aquapark (her own 2026 film; the lane board "T. SCHOENMAKER RSA 1" and the RSA cap prove the racing shots), Paris 100 br walk-out (bar "RSA TATJANA SMITH"), fullview-reaffirm (Paris mixed zone, only 480p, keep it to 2-3 close beats). Rejected: smith-doc (SABC lower-thirds burned in), wa-la28-50m (two men talking).

**Traps:** contact-sheet timestamps for a source can be a second or two off the real cut points - always pull frames at the baked start and start+0.9 before trusting a window (AQ 6.0 was a 0.2s close-up, AQ 47 rotates after 0.6s). With `playbackRate: 1` pinned, each bed only needs cut length + ~0.75s, so 1s windows are usable. A `Remove-Item` inside a foreach loop got the whole command blocked here; delete files one explicit path at a time. Related: [[flick-short-file-named-by-title]], [[flick-swimming-folder]].
