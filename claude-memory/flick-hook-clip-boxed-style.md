---
name: flick-hook-clip-boxed-style
description: "A cold-open hook clip (real footage, original sound, played before the VO starts) is a bordered rounded box on a clean blurred backdrop, with a 'Source: X' tag and one caption bar directly under the box - never full-bleed with text scattered on the background."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 2e97caa6-3697-4fd1-9ecd-29ea5a4bf3bb
  modified: 2026-09-10T10:31:26.397Z
---

When a film opens on a real source clip with its own original audio (see [[flick-card-and-transition-style]] for the general "hook clip plays first, with sound, before the VO" pattern), present it as a **boxed video**, not full-frame:

- A blurred, darkened copy of the same clip fills the backdrop (scale ~1.35, blur ~38px, brightness ~0.4) - muted, since only the boxed copy carries sound.
- The sharp clip sits in a centred rounded-corner box (~5px off-white border, strong drop shadow) over that backdrop.
- A small `Source: @<HANDLE>` tag sits top-left in its own dark pill - the clip's **real YouTube channel handle** (fetch via `yt-dlp --print "%(channel)s|%(uploader)s|%(uploader_id)s|%(channel_id)s"`), prefixed with "@", not a generic label like "Source: NASCAR".
- **Caption(s) go directly under the box, word-by-word, and must be the broadcast's actual spoken commentary** - not an invented or paraphrased line describing the moment. Pull YouTube's own auto-captions for that exact clip window (`yt-dlp --write-auto-sub --sub-lang en --skip-download --sub-format vtt`), parse the VTT's `<c>` word-timing tags for per-word timestamps, and reveal each word individually at the frame it's actually said (karaoke-style pop-in), not the whole line at once. Group words into lines only for crossfade transitions between phrases. Driver/subject names picked out in amber as they're said. Never put text anywhere else on the blurred backdrop - the user was explicit: "subtitles only inside this clip/card... keep the blurred background completely clean."
- The tag and caption fade out a beat before the clip ends (same [[flick-graphic-exit-timing]] logic) so the cut into the next scene is clean; the boxed video itself stays full-opacity for the whole clip.

**Why:** The user sent a reference screenshot of exactly this layout and said to match it for the hook clip. Built for larson1's opening (Bell passing Larson, hook.mp4) in `components/HookOpen.tsx`. Two corrections came after the first pass: the source tag had a generic name instead of the real "@handle", and the caption was an invented line ("Bell makes the winning move on Larson!") instead of real commentary - fixed by pulling actual auto-captions. A third correction moved the caption from appearing as full sentences to word-by-word reveal.

**How to apply:** Reuse `HookOpen.tsx`'s structure for any future film's cold-open hook clip - swap the video file, fetch the real handle, and pull real auto-captions with per-word timestamps rather than writing caption text by hand. Related: [[flick-card-and-transition-style]].
