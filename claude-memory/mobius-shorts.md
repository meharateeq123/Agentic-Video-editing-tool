---
name: mobius-shorts
description: "Möbius YouTube Shorts in D:\\Animated Math: 9:16 vertical, built on a shared short_kit, while a parallel session makes the long films. User supplies script + VO."
metadata:
  node_type: memory
  type: project
  originSessionId: 965b55a1-c203-4287-bdb0-90beabfbb7a1
  modified: 2026-09-29T16:16:38.342Z
---

From 2026-09-25 the user runs two sessions in `D:\Animated Math`: one makes the long ManimGL films, the other makes Möbius YouTube Shorts. The user gives each short's script and VO; the VO lands in `vo\tts-audio (N).wav`, so find it by recency.

**The shorts are 9:16 vertical (1080x1920).** Mid-build the user wrote "16:9 hai short ka". That was a complaint that the output was 16:9, not a request for 16:9. I misread it, delivered 16:9, and had to redo the render. Read that kind of message as a complaint. They also want speed ("jaldi").

**Why:** they split the work so the two sessions don't touch each other's files or renders.

**How to apply:**
- Put each short in `manimgl\shorts\<name>\` with its own `custom_config.yml`, `render.ps1` (draft 960x540, `-Final` for 1080p) and `_check.py`.
- The shared helper is `shorts\short_kit.py`: `K()` keyframes, `up()` windows, `Stamp` headlines, `VCard`, and `place_cards`. It imports `scenes/mobius_kit.py`, which is never edited.
- Timing: everything is a function of `path.clock`, then `self.wait(TOTAL)`. Take beats from whisper word timestamps, per [[mobius-film-vo-word-sync]].
- `_check.py` also tests the text bands (a top stamp over the strip, a bottom card over the strip). Before any render, fix every stretch it flags; [[manim-framing-and-overlap]] applies.
- A full draft renders in about 1.5 min.
- Deliver as `<title>.mp4` ([[flick-short-file-named-by-title]]). For audio, a volume boost plus a limiter lands around -14 LUFS; loudnorm alone undershoots.
- mobius_s1, "The line that never lifts!", was delivered 2026-09-25.
- mobius_s2, "Predict the cut!", was delivered 2026-09-25. It reuses the long film's scene 6-8 geometry: the band at bend=2 unfurls to bend=1, and the third-cut uses NARROW/WIDE sub-bands.
- Script caveat on s2: the VO says the middle "laps twice before it closes", but a centre cut closes in one lap. I animated two laps as the VO says, and flagged it to the user.
- Graham shorts delivered 2026-09-26 in `shorts\graham_s1` and `graham_s2`, saved by title. Windows forbids ":" in file names, so the first is "Graham's Number - One More Arrow.mp4". Their VOs were ElevenLabs mp3s in Downloads, not in Downloads\Music.
- Fractions shorts delivered 2026-09-26 in `shorts\fractions_s1` (bus question) and `fractions_s2` (A&W burger + pizza), built on fraction_kit's Bus, Crowd, Tag, Burger and Pizza, and saved by title.
- Perspective trap: never stack two things being compared in size at different distances from the camera. A near pizza looks bigger; shoot comparisons straight down (phi ~15).
- In a 9:16 frame, stack a pair along depth so a camera looking down shows it top/bottom; don't set it side by side.
- Euler shorts delivered 2026-09-28 in `shorts\euler_s1` and `euler_s2`, VOs from Downloads\Music tts-audio (80)/(81). Filenames use " - " for the colon.
- Build before the VO: every Short hangs its beats on phrases of its own `script.txt` via `short_kit.Cues` (estimate first, then `words.json`). To align: vo.wav, then `_words.py`, then SHORT_FIT, then render. Scene files must not rely on `HERE`, because `from short_kit import *` rebinds it; use SHORT_DIR.
- 9:16 layout: a column facing the camera beats plinths laid out in depth. Form an equation where nothing else stands; flights through standing glyphs collide.
- Equations and numbers go at the TOP in every maths short, never the bottom, where YouTube's title and controls cover them (user, 2026-09-28, with a screenshot). `VEquationCard` now defaults to side="up". When a headline Stamp is up at the same time, pass `under="<stamp name>"` and the formula drops beneath it. Update the check's BANDS to "up" to match. Shorts delivered before this date still carry bottom formulas.
- Text size: the user asked twice for smaller text. It now lives in short_kit (Stamp.SCALE 0.52, LABEL_SIZE 36, FORMULA_SIZE 52, GLOSS_SIZE 28), and scenes use those rather than sizes of their own.
- Depth trap: solids standing at the same spot (PlateTower plates, blocks) still hide others when faded to zero, so move a hidden solid to 500*IN. Use a lighter plate colour (#6a707c) so towers don't read hollow.
- `render_short.ps1 -Name -Class [-Final -Title]` renders, masters the audio and saves the file by title. `SHORT_FIT=1` with `_check_short.py` prints a widened camera table; it's an env var because manimlib eats argv flags.
- For shorts, use the generic check `shorts\_check_short.py <module>`. The module supplies BANDS. Always pass `windows=CARDS, t=t` to `place_cards` so a label rising just before a stamp can't glide through the strip.
- Don't touch `fractions\`, `graham\`, `vo\`, or the studio/preview servers.
- Laplace shorts delivered 2026-09-29 in `shorts\laplace_s1` and `laplace_s2`, 2K, VOs tts-audio (93)/(94). They are the first built in house style v2: `shorts\house_v2.py` provides Stage, Hud (top text), glowing/fade, and the camera rules. `_check_short` accepts a module-level `view_at(t)` instead of CAMERA. Trap: never name cues LEFT/RIGHT, since that clobbers manim's direction vectors.
