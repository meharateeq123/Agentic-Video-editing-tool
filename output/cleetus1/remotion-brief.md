# Remotion Composition Brief: Flick

## Objective

Build the approved film from `flick-plan.md` — the Cleetus McFarland / Dale Earnhardt Jr.
Berlin story — as one 1920×1080 composition cut to the voiceover's own pause-aligned timings,
carried almost entirely by original motion graphics.

## Output

- Remotion project: `D:\flick\output\cleetus1\remotion\`
- Format: 16:9 — 1920×1080 at 30 fps
- Final film: `final-film` → `cleetus-dale-jr-final.mp4` (10,069 frames / 335.64 s)
- Rendered scenes (one composition each, kebab IDs):
  - `hook-berlin-crash` → `scenes/hook-berlin-crash/hook-berlin-crash.mp4`
  - `what-we-break-down` → `scenes/what-we-break-down/what-we-break-down.mp4`
  - `berlin-raceway-michigan` → `scenes/berlin-raceway-michigan/berlin-raceway-michigan.mp4`
  - `qualified-18th` → `scenes/qualified-18th/qualified-18th.mp4`
  - `the-spin-p19` → `scenes/the-spin-p19/the-spin-p19.mp4`
  - `right-rear-overheated` → `scenes/right-rear-overheated/right-rear-overheated.mp4`
  - `the-backlash` → `scenes/the-backlash/the-backlash.mp4`
  - `dale-jr-download` → `scenes/dale-jr-download/dale-jr-download.mp4`
  - `earnhardts-argument` → `scenes/earnhardts-argument/earnhardts-argument.mp4`
  - `first-attempt-wreck` → `scenes/first-attempt-wreck/first-attempt-wreck.mp4`
  - `every-level` → `scenes/every-level/every-level.mp4`
  - `asked-then-punished` → `scenes/asked-then-punished/asked-then-punished.mp4`
  - `seventy-five-lap-race` → `scenes/seventy-five-lap-race/seventy-five-lap-race.mp4`
  - `running-position-graph` → `scenes/running-position-graph/running-position-graph.mp4`
  - `no-crash-no-spin` → `scenes/no-crash-no-spin/no-crash-no-spin.mp4`
  - `the-real-story` → `scenes/the-real-story/the-real-story.mp4`
  - `two-races-compared` → `scenes/two-races-compared/two-races-compared.mp4`
  - `racing-resume-map` → `scenes/racing-resume-map/racing-resume-map.mp4`
  - `rockingham-to-nashville` → `scenes/rockingham-to-nashville/rockingham-to-nashville.mp4`
  - `more-chances-not-fewer` → `scenes/more-chances-not-fewer/more-chances-not-fewer.mp4`
  - `climb-to-daytona-500` → `scenes/climb-to-daytona-500/climb-to-daytona-500.mp4`
  - `not-a-finished-product` → `scenes/not-a-finished-product/not-a-finished-product.mp4`
  - `the-message` → `scenes/the-message/the-message.mp4`
  - `stacking-races` → `scenes/stacking-races/stacking-races.mp4`
  - `road-to-daytona` → `scenes/road-to-daytona/road-to-daytona.mp4`

## Source Material

- Transcript: `transcript.json` — 25 segments, real start/end seconds aligned to the voiceover
  by pause detection. These are the timeline; nothing here is estimated.
- Voiceover: `remotion/public/vo/tts-audio.wav` (335.64 s), the film's only audio track.
- Approved plan: `flick-plan.md`
- Script: `source-script.txt`
- Selected brand assets: four sourced clips in `remotion/public/auto-footage/` (scenes 1, 2, 3
  and 25 — see below). Everything else on screen is authored here.
- Available sound effects: `remotion/public/sounds/` — **none used**.

## Creative Direction

- User direction: match the NASCAR 2 reference — a translucent dark stat card with a small
  uppercase label, one big number and an arc; a compact bar comparison tucked into the
  bottom-right negative space; a 3D globe with the USA lit amber, an orange pin and a clean
  bottom name plate. Zoom in as an element lands, hold, then pull out and let the graphic
  settle into free space. Modern, varied transitions landing on the voiceover's pauses. A
  cinematic ending.
- Interpretation: the palette, card anatomy and camera move from `flick-plan.md` are applied
  without exception — near-black ground `#0b0b0d`, translucent card `rgba(16,16,20,0.86)` with
  a 1px `rgba(255,255,255,0.10)` hairline and 18px radius, text `#f4f4f6`, muted `#9aa0aa`,
  amber `#f5a623`, red `#e03b3b`, emerald `#25c07a`, steel `#4d8dd6`. Exactly one focal number
  per graphic. Every element sits inside a 65px safe margin, and no two elements' bounding
  boxes intersect at any frame of their animation. The reference frames also showed a source
  channel's watermark and a broadcast timing tower bleeding through — the mistake **not** to
  repeat, which is why three of the four clips here are cropped rather than used as delivered.
- Avoid: generic filler visuals, unapproved assets, background music, captions, subtitles,
  scene numbers, timestamps, numbered labels, and any third-party cartoon/animated/CGI footage
  or premade motion graphic.

## Footage decisions

Only four scenes had usable footage; the other twenty-one are original graphics.

| Scene | Clip | Treatment |
|---|---|---|
| 1 | @FloRacing — Super Late Model debut, Tekton 250 at Berlin | Cropped: top 15 % removes the broadcast timing tower, right/bottom 8 % removes the FLO bug. First 3.15 s (channel bumper) skipped. |
| 1 | @dirtymomedia — The Dale Jr. Download | Clean; started at 1.85 s so Dale Jr. is on camera, played at 0.75× to fill the beat. |
| 3 | @NASCAR — Cleetus McFarland talks Michigan | Bottom 32 % cropped away; the source lower third read "FINISHED 14TH", which contradicts this film's own numbers. |
| 25 | @NASCAR — after the Truck Series debut | Only the Daytona pack-racing aerials from 5.72 s are used. The interview half, with its burned-in CRAFTSMAN timing box, is cut. |

Cut for irrelevance before the build: the auto-fetched clips for scenes 7, 10 and 21 (an
Xfinity win under a line about online critics, a retaliation clip under a line about rookie
wrecks, a FOX-booth debut under the Daytona 500 ambition line). Those scenes became graphics.

## Scene Compositions

See `scene-spec.json` for the machine-readable record of every scene: composition ID,
component name, transcript line, start/end timestamp, start frame, frame count, what is on
screen, the exact on-screen text, the motion-graphic template used, and the transition in.
The summary below is the shape of the film.

- **Scenes 1–2 (0.00–23.85 s)** — the hook. Berlin footage, Dale Jr. on camera at the second
  he is named, the thesis as one headline, then the film's three-part structure drawn as the
  narration names it.
- **Scenes 3–6 (23.85–69.08 s)** — the race. Globe → United States → a pin on Berlin Raceway
  in Michigan; the starting grid with P18 lit; the spin and P19; the right-rear tyre going
  away, as a top-down schematic.
- **Scenes 7–12 (69.08–140.92 s)** — the argument. The two series the critics cited; the
  podcast attribution; the three things he was asked to do, ticked off; the caution flag; the
  ladder where spins happen at every level; the asked-then-punished contradiction.
- **Scenes 13–17 (140.92–201.03 s)** — the second race. The 75-lap ring counter; the running
  position graph, flat at P2 for 30 laps then fading to P13; the clean green-flag run;
  Earnhardt's read; the two races compared as bars.
- **Scenes 18–21 (201.03–280.56 s)** — the résumé. ARCA in 2025; a US map with Talladega,
  Charlotte and Daytona pinned in narration order; the Rockingham → Talladega (denied) →
  Nashville (approved) route; the step-by-step climb to the Daytona 500.
- **Scenes 22–25 (280.56–335.64 s)** — the close. The honest summary and the recap pair; the
  message given the whole frame; results stacking into a column; then Daytona from above, the
  bowed route back to Michigan, a widening camera and a slow fade.

## Transitions

Four kinds, deliberately cycled so the same one is never used twice in a row, each beginning
exactly on a transcript cut — which is a pause in the voiceover — and resolving over 16 frames:

- **dip** — 8 frames down to black, 8 back up. Used into scenes 5, 13, 18 and 25, the four
  reflective turns in the film.
- **whip / whipDown** — directional slide with motion blur. Used into the contradictions and
  the hard turns (scenes 4, 7, 12, 15, 19; drops into 10 and 22).
- **push** — scale-through: the outgoing frame grows past the camera as the incoming one
  scales up into place (scenes 2, 6, 9, 14, 17, 21, 24).
- **wipe** — a soft luma/gradient wipe with a travelling amber edge (scenes 3, 8, 11, 16, 20, 23).

Each scene bleeds 20 frames past its own cut so the outgoing image is still there for the
incoming transition to play over; scene start frames themselves are untouched, so the film
stays locked to the transcript.

## Remotion Instructions

- One dedicated React component per approved scene under `src/scenes/Scene01.tsx` …
  `Scene25.tsx`; shared design primitives live in `src/components/` and `src/theme.ts`.
- Every scene is registered as its own `<Composition>` in `src/Root.tsx`, alongside the
  `final-film` composition that joins all 25 in order over the single voiceover track.
- Frame timing is derived from `src/timeline.ts`, which restates the approved transcript
  timestamps verbatim.
- All motion is frame-driven. Every graphic — the globe, the flat US maps, the routes, the
  position graph, the comparison bars, the ring counter, the step timeline, the car schematic,
  the grid — is authored from scratch in this project. The US and North American outlines in
  `src/geo.ts` are hand-typed lat/long coordinate lists, projected orthographically for the
  globe and equirectangularly for the flat maps.
- Sourced clips play `muted`. No background music. No sound effects.
- On-screen text appears only where a heading, a name, a date or a stat genuinely earns it;
  most scenes carry a label, one headline and one caption at most.
