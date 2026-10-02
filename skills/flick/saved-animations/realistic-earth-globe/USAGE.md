# realistic-earth-globe — usage

A real 3D Earth (three.js via `@remotion/three`, not a 2D projection): satellite day texture,
terrain relief, every country's border, readable name labels, a camera that dollies in from a wide
establishing view to sit over one target country, and a pulsing gold highlight on that country once
the camera arrives. Built to replace the flat/orthographic `Globe` in `components/Maps.tsx` — use
this one whenever a project calls for a cinematic, satellite-realistic globe rather than the
lighter hand-drawn map style.

## One-time setup in a new project

1. Copy `RealisticGlobe.tsx` and `geo3d.ts` into that project's `remotion/src/components/`.
2. Add to the project's `remotion/package.json` and `npm install`:
   ```json
   "three": "0.169.0",
   "@remotion/three": "4.0.522",
   "@react-three/fiber": "8.17.10",
   "@types/three": "0.169.0"
   ```
   (`@react-three/fiber` is pinned to the 8.x line deliberately — the 9.x line requires React 19,
   and this pipeline's projects are on React 18.)
3. Copy the shared texture set into that project's `remotion/public/globe/textures/` — these never
   change per video, copy them as-is from:
   `D:\flick\assets\globe\textures\` (`earth_day_4096.jpg`, `earth_normal_2048.jpg`,
   `earth_specular_2048.jpg`, `earth_clouds_1024.png`, `borders_4096.png`)
4. Copy `D:\flick\assets\globe\labels.json` into `remotion/public/globe/labels.json` — also
   shared/unchanged, every country's name + centroid + size.

## Per target country

`D:\flick\assets\globe-builder\` is a standalone Node package (not part of any video's Remotion
app) that turns Natural Earth country geometry into the highlight PNG this component needs:

```
cd D:\flick\assets\globe-builder
node build.mjs highlight "United States of America"
```

Match the exact country name as it appears in `D:\flick\assets\globe\labels.json` (open it and
search, or just try the common English name — Natural Earth's names are what's in there, e.g.
"United States of America", "Russia", "United Kingdom"). This is cached: reusing a country in a
later video just skips straight to "already built."

Then copy the one new file it produced into the current project:
```
D:\flick\assets\globe\highlights\<slug>.png  ->  remotion/public/globe/highlights/<slug>.png
```
(`<slug>` is the lowercased, hyphenated country name — the script prints the exact path.)

## In a scene

Two kinds of target. A **country**, which flies down to it and holds it gold-highlighted:

```tsx
import {RealisticGlobe} from '../components/RealisticGlobe';

<RealisticGlobe target="United States of America" dur={S10_DUR} />
```

…or a **place**, which flies all the way down onto the exact spot the narration names and drops a
pinging marker on it. A place needs no build step at all — just latitude and longitude:

```tsx
<RealisticGlobe
  target={{
    name: 'Talladega',
    lat: 33.5686,
    lon: -86.0661,
    sub: 'ARCA — 2nd',                    // optional line under the name
    country: 'United States of America',  // optional, kept highlighted for context on the way down
  }}
  dur={S11_DUR}
/>
```

- `dur` — total frames the component is mounted for (same convention as `SceneBed`'s `dur`).
- `arriveAt` (default 0.62) — fraction of `dur` where the dolly-in completes and the highlight
  starts fading in.
- `arriveDistance` — how close the camera ends up, in globe radii. Defaults to a country-sized
  framing for a country and 1.7 for a place. Don't go below ~1.6 (see the imagery limit below).
- `labelCountries` (optional) — override which nearby countries get labeled; by default the 4
  geographically nearest countries above a minimum size are auto-picked, alongside the target.
- `maxLabels` (default 5, target included) — raise/lower if a region is especially crowded or empty.

## Speed follows the voiceover

Pass the scene's own frame count as `dur` — the number that came out of the VO-aligned timeline —
and the whole move stretches or compresses to it. The descent finishes as the line lands, and the
shot rests on the target for whatever is left.

Two things are deliberately *not* proportional to `dur`:

- **The descent is clamped to roughly 2.6-9 seconds.** On a very short line a purely proportional
  dolly becomes a lurch; on a very long one it creeps so slowly the shot reads as a still. Inside
  that range it follows the voiceover exactly; outside it, it holds the nearest natural speed and
  simply rests longer.
- **The highlight pulse and the pin's ping are timed in real seconds.** A heartbeat that sped up on
  a short line and crawled on a long one reads as a glitch, not a rhythm.

`globe-lab`'s `globe-vo-short-4s`, `globe-vo-6s` and `globe-vo-long-20s` compositions exist to check
exactly this against real narration lengths.

## Known limits, on purpose

- A country's on-screen position and size come from its **largest contiguous landmass only** —
  Alaska doesn't pull the "USA" camera/label off-center, French Guiana doesn't widen "France." This
  is a deliberate choice (see `build.mjs`'s `mainLandmass` comment), not a bug: a documentary zoom to
  a country should frame where its story actually is.
- The camera always arrives looking straight down at the target from directly "above" it (a pure
  radial dolly, no orbit/pan) — simple and robust, but every use of this component will look the
  same in that sense. Fine for the current brief; revisit if a future video wants an angled arrival.
- Labels are plain projected HTML text, not baked into the globe — they always stay upright and
  correctly sized regardless of zoom, but they will not curve to follow the sphere's surface.
