---
name: mobius-shorts
description: "Möbius YouTube Shorts in D:\\Animated Math: 9:16 vertical, built on a shared short_kit, while a parallel session makes the long films. User supplies script + VO."
metadata:
  node_type: memory
  type: project
  originSessionId: 965b55a1-c203-4287-bdb0-90beabfbb7a1
  modified: 2026-10-11T13:32:50.472Z
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
- **Every Short's folder is named by its title**, asked for twice on 2026-10-11 ("mujhai folder milta hi ni"); a FINAL folder alone was rejected. So `shorts\The Math That Turns One Ball Into Two!\` holds `bt_s1.py`. The scene file keeps its short code, because `_check_short` imports it by module name and a title has spaces and "!" in it. Name a new Short's folder by its title from the start.
  - `shorts_studio.py` and `render_short.ps1` now find the scene by scanning the folder for the one `.py` defining a `Scene`, not by assuming `<folder>.py`. `render_short.ps1 -Name "<Title>"` therefore needs no module argument (`-Module` overrides).
  - Windows forbids `? : * " < > | \ /` and a trailing dot in a folder name, so "…Except This One." became "…- Except This One" and "0.999… = 1?!" became "0.999 Is Exactly Equal to 1!".
- Finished Shorts are also copied to `shorts\FINAL\<title>.mp4` by `render_short.ps1` on a `-Final -Title` run, so every delivered video sits in one place.
- `render_short.ps1 -Name -Class [-Final -Title]` renders, masters the audio and saves the file by title. `SHORT_FIT=1` with `_check_short.py` prints a widened camera table; it's an env var because manimlib eats argv flags.
- For shorts, use the generic check `shorts\_check_short.py <module>`. The module supplies BANDS. Always pass `windows=CARDS, t=t` to `place_cards` so a label rising just before a stamp can't glide through the strip.
- Don't touch `fractions\`, `graham\`, `vo\`, or the studio/preview servers.
- Glyph trap: the HUD font (Corbel Bold, `words()`) has no "→", "⇒" or "≠"; they render as empty boxes. "AREA → 0" shipped broken in news_s1 and was re-rendered 2026-10-06. Write these in words, or use `maths()` (TeX). "×", "·" and "£" are fine.
- Graham clock-puzzle (rearrangement conjecture) shorts, scripted 2026-10-05 from `manimgl\graham_rearrange\script.txt`.
  - Built 2026-10-06 as `shorts\rearr_s1` (game: lose/win) and `rearr_s2` (probabilistic method) on the film's graham_kit.
  - s2 uses VO tts-audio 2026-10-05T182342. s1's VO hadn't arrived (estimated timing).
  - Cue trap: a phrase like "Must." also matches an earlier "must", so anchor it with following words: `cue("Must. That is")`. The user's titles:
  - s1: "This Math Puzzle Took 50 Years to Solve!"
  - s2: "How Randomness Cracked This 50-Year-Old Puzzle"
- Pythagoras shorts, from `manimgl\pythagoras\script.txt`. The user finalised both scripts 2026-10-06 (their own wording, longer than 20 s, with a short "Watch the full video" CTA; keep it as written).
  - s1: "Why Was This Pythagorean Proof Called IMPOSSIBLE?" (Loomis bans trig because sin²+cos²=1 is circular; 2022 students used the law of sines).
  - s2: "The Triangle That Proves Pythagoras Isn't Universal" (globe octant triangle: three 90° angles, equal sides).
  - Built 2026-10-07 as `shorts\pyth_s1` and `pyth_s2`, sharing `shorts\pyth_kit.py` (Glow, Patch, figure(), LoopArrow) on top of graham_kit.
    - VOs: tts-audio 2026-10-07T134302 (s1, 34 s) and T134501 (s2, 36 s).
    - Rendered and delivered 2026-10-07 at 1080x1920, saved by title in their folders.
  - whisper lives in the system Python312 (`AppData\Local\Programs\Python\Python312\python.exe`), not in .venv-gl.
- Quantum shorts: scripts saved 2026-10-07 in `shorts\wave_s1` (wave function; FINAL title "The Math Behind the Quantum Wave Function 🤯") and `wave_s2` (Schrödinger equation; FINAL title "The Math Behind the Schrödinger Equation 🤯"; FINAL script exactly as the user gave it, ending on the question with no CTA; the user reverted an added CTA). Files drop the emoji.
  - Built 2026-10-07 on pyth_kit.
    - VOs: tts-audio 2026-10-07T185519 (s1, 24 s) and T185652 (s2, 27 s).
    - s1's VO left out the Math Sparks CTA, so the script was trimmed to match.
    - s1 shows a ψ helix, |ψ|² with detection dots, a three-place split, then Schrödinger.
    - s2 shows a wireframe water sheet with stone ripples that morphs into a |Ψ|² hill.
    - Rendered and delivered 2026-10-08 at 1080x1920, saved by title.
  - Shorts 3 and 4 came from the same `manimgl\schrodinger\script.txt`, in `shorts\wave_s3` and `wave_s4`; rendered and delivered 2026-10-09 at 1080x1920 (VOs tts-audio 2026-10-09T162316 and T162452). The user asked for smaller text again and I scaled every HUD size by 0.78 inside build_hud; carry those smaller sizes into new shorts.
    - s3 "The Math Behind the Double-Slit Mystery": two-slit wall, interference bands, two arrows added head to tail then turned opposite to cancel. Fringes need K~17; a lower K gives one hump, not bands.
    - s4 "Why Quantum Physics Needs Imaginary Numbers": number line, i a quarter turn off it, the i in the equation, a grid of clock hands, then |psi|² bars (Born's 1926 footnote).. The user said to start ONLY when they say so. s1's CTA names the channel: "Watch the full video on Math Sparks."
- Standalone shorts built 2026-10-11 in `shorts\bt_s1` ("The Math That Turns One Ball Into Two!") and `shorts\horn_s1` ("The Shape You Can Fill but Never Paint!"), on estimated timing; both pass the check. The user will send VOs to align, then call the render.
  - bt_s1 draws the ball as `DotCloud` dust (5 groups, sizes 380/380/250/250/250 so both copies end up equally dense), because the real pieces are scattered, not chunks. The end card credits the axiom of choice.
  - horn_s1: y = 1/x spun about an axis laid ACROSS the frame. Pointing the axis into the screen makes it read as a cone, not a trumpet. Depth maps as 1 - 1/x, so the endless horn fits a finite stretch.
  - Trap hit again: a `ParametricSurface` at opacity 0 still writes depth and hid the paint inside it. Park a hidden surface under the floor, as with other solids.
  - A surface that grows is cheapest as one `ParametricSurface` whose `uv_func` reads a mutable cell; set the cell and call `init_points()`, which resets the colour, so re-apply `solid()` after.
- News shorts built 2026-10-04 on estimated timing and not rendered:
  - `shorts\news_s1` covers Hong Wang's 2026 Fields Medal and Kakeya in 3D. It uses the optional `hong_wang.jpg` in its folder, or a medal if there's no photo.
  - `shorts\news_s2` covers OpenAI's Navier-Stokes claim of 2026-09-08, framed as a claim, not a proof.
  - Both pass the check. Waiting on VOs.
- Euler shorts 3 and 4 were built 2026-10-03 in `shorts\euler_s3` (bank → e, coin stack) and `euler_s4` (i quarter turns → spin → wave). They're on brach_kit's black stage and check clear. VOs: tts-audio 2026-10-03T150554 (s3) and T150652 (s4). Not rendered yet.
- Look check without a video render: run the scene with env STILL=<sec> and `-w -r 540x960` to a scratch dir, then pull the frame with ffmpeg. Never use `-s` without `-w`: it opens a preview window and hangs. File names must not contain a "." (e.g. 9.0), since manimgl truncates them.
- Brachistochrone shorts built 2026-10-02 in `shorts\brach_s1` (tie) and `brach_s2` (fastest ramp). They import the film's `brach_kit` (BlackStage, Apparatus, GlossBall, Ride physics, Callout, alive camera) and pass `_check_short`. Render waits for the user's go-ahead. VOs are tts-audio 2026-10-02T162453 (s1) and T162730 (s2).
- Laplace shorts delivered 2026-09-29 in `shorts\laplace_s1` and `laplace_s2`, 2K, VOs tts-audio (93)/(94). They are the first built in house style v2: `shorts\house_v2.py` provides Stage, Hud (top text), glowing/fade, and the camera rules. `_check_short` accepts a module-level `view_at(t)` instead of CAMERA. Trap: never name cues LEFT/RIGHT, since that clobbers manim's direction vectors.
