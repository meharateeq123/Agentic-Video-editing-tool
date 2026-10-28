---
name: flick-long-film-clip-rules
description: "Standing rules for beat pacing in long swimming films (from yuzidi4 corrections) - every beat short, no repeats, relevance beats duration, plus the BedChain traps that broke it."
metadata:
  node_type: memory
  type: feedback
  originSessionId: 3d12fe9f-5670-4e8b-9b0e-948737411aba
  modified: 2026-10-19T17:11:20.799Z
---

User corrections while building yuzidi4 (Sept 2026), now standing for every long film:

- **Every beat is short: a video clip or a still image holds the screen at most ~3s.** A scene is a fast chain of many
  beats, never one clip/photo slow-mo stretched across 20-30s ("aik hi itna lamba", "yai image itni dfa dikha di").
- **Never show the same clip or image twice in a film.** Different range of a long source is fine; the same photo at a
  different zoom/offset is NOT (user counted it as repeated). Source many photos/clips instead of cycling a few.
- **Relevance beats everything**: never fill a scene about person A with person B's race video to dodge a repeat.
  If a real clip isn't there, use an image (Wikimedia via curl + en.wikipedia pageimages API), face card, or map.
- The only sanctioned fallback when unique content truly runs out: let that scene's beats run longer (<=8s), and
  say so. Two such stretches froze (freezedetect) in the yuzidi4 render - report it, don't hide it.
- Use everything the user gave: face (ID) cards on named people, map/globe beat (5-7s, over footage), real
  broadcast graphics; keep other graphics minimal.

**Why:** the user watched each Studio version and rejected static-looking, repeated or off-topic stretches three
times in a row.

**How to apply:** plan beats first (plan.mjs: scene -> ["SRC@m:ss", "IMG:name"], count = ceil(mounted/90)), bake
each as its own 3s file, validate no overlapping windows / no reused image, then QC contact sheets for on-screen text,
timecode burn-ins, logos, wrong person. Traps found: BedChain stretches the LAST link to fill the scene even for a
video (V+V chains froze); mp4s must be `-movflags +faststart` or Studio throws MediaPlaybackError; a "static" clip
(swimmer standing still) reads as an image - drop it; sideways (rotated) phone video exists in promo reels.
See [[flick-swimming-no-subtitle-clips]], [[flick-image-fallback-when-no-clip]].

**yuzidi10 (2026-10-03) mistakes — never again:**
- **Never fill a film by cutting one recap video into consecutive 3s slices (s000..s170).** It looks like
  "one footage in three clips back to back", ignores the line being spoken, and recap videos are full of
  photo-montage stills. Pick a source and range per VO phrase from word timestamps.
- **Run freezedetect (`n=-50dB:d=0.4`) on EVERY baked beat before wiring it.** Any beat with ≥1s frozen
  is a still in disguise and gets replaced. Do this in bulk, not on spot checks.
- **Portrait photo in a 16:9 beat: never centre-crop.** That cut Ye Shiwen's face off and left only her
  medal. Fit the photo to full height over a blurred copy of itself, anchor the zoom on the face, then look at a QC frame.
- **A named person's photo goes ONLY under the line that names them, never under another person's ID
  card.** McIntosh's Paris photo under the "Yu Zidi" card and Ye Shiwen's Incheon medal under "the
  story of Yu Zidi" were both flagged. Also, don't show the subject before the VO introduces them.
- **Show the event, not its title card.** For "Commonwealth Games", show the Glasgow 2026 pool with
  meet branding in the arena, not the logo bumper/interstitial.
- **Check cross-film reuse by parsing prior films' footage.ts** for used [start,end] ranges per
  source before picking. yuzidi1 had already used ALL of cgtn-asianrecord / cgtn-nationalgames, and
  popovici1 had used eu46@108. A contact sheet alone doesn't tell you that.
- yt-dlp needs `--js-runtimes node` now; without it YouTube asks for a bot sign-in.

**yuzidi16 (2026-10-19) - broke the no-repeat rule again, user forgave it ONCE ("is dfa maafi next time na ho"):**
- The hook used `Wm6` + `Wm6@3` back to back = the same Yu photo twice. WION / Hattrick / slideshow uploads
  (H, Wi, Wt, Wm, Rm, Aq, Ap) are photo montages: each scene-detected "shot" is ONE image, so `ID` and `ID@3`
  are the same picture. Fifteen such pairs went out in that film.
- **One window per shot for any photo/slideshow source, and never two windows of one shot back to back for any source.**
  bake.mjs `--check` now fails on `SAME IMAGE TWICE` (PHOTO prefix set) - copy that gate into every new project
  and extend PHOTO whenever a source turns out to be a slideshow (freezedetect >=1s on its beds = slideshow).
- Hook/opening scenes get extra care: the user watches the first 10s hardest.
