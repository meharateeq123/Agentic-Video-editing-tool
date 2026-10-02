# Flick plan — Cleetus McFarland / Dale Jr defends the Berlin crash

Format: **1920×1080, 16:9, 30fps**. Voiceover: `D:\flick\vo\tts-audio.wav` (335.64s).
Scene timings come from `transcript.json`, aligned to the real VO by pause detection — they are
the timeline, not estimates.

## Visual language (matches the NASCAR 2 video)

- **Palette:** near-black ground (`#0b0b0d`), translucent card `rgba(16,16,20,0.86)` with a
  1px `rgba(255,255,255,0.10)` hairline border and ~18px radius. Text `#f4f4f6`, muted
  `#9aa0aa`. Accents: amber `#f5a623` (map highlight/pin), red `#e03b3b` (negative/decline),
  emerald `#25c07a` (positive), steel blue `#4d8dd6` (neutral data).
- **Card anatomy:** small uppercase letterspaced label → large bold number → one short caption.
  Exactly one focal number per graphic.
- **Camera:** the NASCAR 2 move — a slow push **in** on the footage/graphic as it lands, hold,
  then a slow pull **out**; the graphic settles into the frame's free/negative space as the
  camera widens. Never centre a card over the action or a face.
- **Safe area:** 6% margin (≈65px) on every side. No element touches an edge; no two elements'
  bounding boxes may intersect at *any* frame of their animation.

## Structure — footage carries the film, graphics ride on top

This is the single most important thing about this build, and the first attempt got it wrong by
making standalone full-screen graphic scenes.

**Target mix: ~96% footage, ~4% images.** A clip is playing essentially all the time. There is
no such thing as a scene that is only a graphic on a black background.

- **Footage is the bed.** Every scene opens on real footage and keeps playing.
- **A graphic never replaces the footage — it overlays it.** When a graphic or ID card comes in,
  the clip behind it takes a smooth cinematic blur (depth-of-field, not a freeze — the clip
  keeps playing and stays in sync), the sharp graphic animates in over it, holds for its line,
  then animates out as the blur lifts and the clip returns to full sharpness.
- **Images are only person ID cards** — a person's photo with their name, brought in exactly
  when that person is named, per `person-id-card-overlay-rule.md`. Two side by side when two
  people are named together. Nothing else uses an image.
- **Graphics exist only for graphs, maps, and those ID cards.** No graphic for a line that is
  just narration; the footage carries those alone.

Because a clip is a bed under an overlay, it does not have to depict that exact sentence — it
has to be real footage from this story's world (Cleetus, Dale Jr, NASCAR/short-track racing) and
keep visual continuity with the scenes on either side. The overlay supplies the specific meaning.
What is still forbidden is footage from outside that world, another channel's burned-in text or
branding, third-party animation, and reusing the same clip on two scenes.

## Hard rules for this build

1. **No captions, no subtitles, no scene numbers, no timestamps, no numbered labels** anywhere.
2. On-screen text only where a heading genuinely earns it (a stat, a name, a date). Most scenes
   carry none.
3. Every motion graphic is authored here from scratch. Nothing premade, nothing downloaded.
4. Graphics only for data: statistics, comparisons, rankings, dates, routes. Never decoration.
5. Footage/images only where they show what the narration is saying **at that second**. Anything
   that doesn't earn its place is cut and the scene becomes a graphic instead.
6. Sourced clips play muted; the voiceover is the only audio. No background music.
7. No cartoon/animated/CGI/recreation footage from any third party.
8. Scene changes use modern transitions (see below), never a hard cut on every boundary.

## Transitions

Cycle deliberately, never the same one twice in a row: soft dip-to-black (≈8f), directional
whip/slide with motion blur, scale-through push, and a light luma/gradient wipe. Match the cut
to the beat — a whip into a contradiction ("No crash. No late spin."), a gentle dip into a
reflective line. Every transition lands on the VO's own pause, not mid-word.

## Custom graphics required (data-driven scenes)

| Scene | Line it serves | Graphic |
|---|---|---|
| 3 | Berlin Raceway, **Michigan**, Tekton 250, August 12 | **Map**: globe → push to United States → Michigan → pin on Berlin Raceway, amber highlight, clean place plate |
| 4 | qualified **18th**, running inside the **top 20** | Starting-position marker on a field-of-cars strip; 18 → top-20 band |
| 5 | spun with under 20 laps left, finished **19th** | Decline: running position drops to P19, red accent |
| 9 | **18th on his very first attempt** | Single stat card, emerald accent |
| 13 | his own Late Model Series, a **75-lap race** | Compact stat card: 75 laps |
| 14 | first **30 laps running 2nd**, faded to **13th** | **Line/position graph** across 75 laps: flat at P2, then the fade to P13 |
| 17 | two races: one wreck (**19th**) vs **13th** after leading | **Comparison**: two bars/positions side by side, red vs emerald |
| 18 | ARCA **2025**, top-10s at **Talladega** and **Charlotte**, Truck debut at **Daytona** | **Map**: US map with the three tracks pinned in narration order |
| 19 | Rockingham debut, **six laps down**, denied **Talladega**, approved **Nashville** | **Map/route**: Rockingham → (Talladega ✕) → Nashville, with the "6 laps down" stat |
| 21 | step-by-step climb toward the **Daytona 500** | **Timeline**: short track → ARCA → Truck → O'Reilly → Daytona 500 |
| 22 | ran **2nd for 30 laps**, finished **13th** | Recap stat pair, reusing neither template used at 14 nor 17 verbatim |
| 25 | road to Daytona, **short tracks in Michigan** | **Map/route**, then the cinematic close |

Template variety rule applies: no numbered template from `motion-graphic-templates.md` is used
twice in this project while an unused entry in its category still fits.

## Ending

Scene 25 closes the film: the route settles, the graphic recedes, and the frame pushes slowly
into a held wide shot as the last line lands — then a slow fade. It should feel like an ending,
not a stop.

## Review gate

Before any render: play the whole thing against the voiceover and confirm the visual matches
what is being said at that second, every graphic sits in free space with no overlap, and nothing
carries a caption, a scene number, or another channel's burned-in branding. Cut anything that
fails rather than shipping it.
