# Step 4: Validate, preview, revise, and save

## Validate

Complete the Step 3 self-review checklist for every scene before starting Studio. Do not share a Studio URL until each named scene composition has rendered successfully.

Render every scene before review:

```text
node <flick-skill>/scripts/render-scene.mjs --project <output-directory> --composition <scene-id> --name <approved-scene-name>
```

This writes `<output-directory>/scenes/<approved-scene-name>/<approved-scene-name>.mp4`.

### If a render fails with "No frame found at position N"

This is a seek failure on a source clip, not a bug in the scene. Two causes, and both must be ruled out together:

1. **The clip's frame timing.** `auto-footage.mjs` re-encodes every clip it fetches to constant 30fps with a keyframe every second, so a clip that came through it is already fine. Any clip added to `remotion/public/` by hand needs the same pass:

   ```text
   ffmpeg -y -i <src> -r 30 -fps_mode cfr -c:v libx264 -preset veryfast -crf 20 \
     -g 30 -keyint_min 30 -sc_threshold 0 -pix_fmt yuv420p -an -movflags +faststart <tmp>
   ```

2. **Remotion's asset cache.** Remotion copies `public/` files into `%TEMP%\remotion-v<version>-assets*` and keeps serving that copy. Replace a file on disk and the cache still holds the broken one — the render fails at the identical position and the fix looks like it did nothing. Delete those directories after replacing anything in `public/`.

Fixing one and not the other reproduces the same error, which is what makes this cost hours. Do both, then render.

## Preview and revise

Start Studio from `<output-directory>/remotion/`:

```text
npm run studio
```

Only after it succeeds, give the user the Studio URL and say:

> Watch it and tell me what you think. What should change, if anything?

On feedback, revise only the affected scene, render that scene again, repeat its self-review, and reopen Studio. After acceptance, create a poster for each approved scene.

## Poster frame

Choose each scene's strongest **settled** visual beat: text fully readable, the focal action complete, and no transition in progress. Do not use a blank opening frame, an animation mid-state, or an arbitrary timestamp.

Create the poster:

```text
node <flick-skill>/scripts/create-poster.mjs --project <output-directory> --name <approved-scene-name> --timestamp <settled-seconds>
```

This writes `<output-directory>/scenes/<approved-scene-name>/poster.jpg`. It is the preview image for the scene, its reusable saved asset, and a possible gallery thumbnail. Do not replace or alter the first frame of the MP4.

## Save reusable animations

After posters are created, ask:

> Which scene animations should I save as reusable assets?

For each selected scene, run:

```text
node <flick-skill>/scripts/save-animation.mjs --library <flick-skill>/saved-animations --name <approved-scene-name> --component <component.tsx> --export <component-export> --include <local-helper.tsx> --pattern "<exact visual pattern>" --use-for "<strong-fit use cases>" --avoid-for "<mismatched use cases>"
```

Use `--include` once for each required local `.ts` or `.tsx` helper. This saves only editable code in `<flick-skill>/saved-animations/<approved-scene-name>/` and appends one compact entry to the shared catalog at `<flick-skill>/saved-animations/README.md`. Read that catalog first whenever deciding what can be reused. Reuse is optional: create a new scene when no entry is a strong fit. Do not save MP4s, posters, or private brand assets in the shared library.

## Final delivery

Tell the user:

- the path to every rendered scene MP4;
- the path to every `poster.jpg`;
- which editable components were saved under `<flick-skill>/saved-animations/`;
- that a future revision changes only the named scene.
