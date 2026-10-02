# Person / Driver Mention — Cinematic ID Card Overlay

This governs *how* a named person is shown when they are mentioned while a different (but still relevant) clip is already playing — e.g. wide race footage during "Denny Hamlin was battling closely with Kyle Larson." It sits alongside [character-visual-rules.md](character-visual-rules.md): that file governs *whether* a person needs a video/image match at all; this file governs the on-screen treatment when the exact person's own footage isn't what's currently playing.

## Core behavior

* Use the **exact video clip currently playing** as the background. Do NOT generate, fetch, or switch to a different background or a generic stadium/venue shot.
* Keep the original clip playing normally, but apply a smooth cinematic blur/depth-of-field to the entire background for the duration of the mention.
* The background must stay recognizable as the same scene and stay synchronized with the narration — it is not paused or replaced, just blurred.
* Place a premium cinematic ID card in the foreground: the mentioned person's fetched image (per `character-visual-rules.md`'s image-sourcing/verification rules), with their name below it.
* Keep the person's image sharp while the background clip stays blurred behind it.
* Animate the card in smoothly exactly when the person's name is mentioned (frame-accurate to the transcript timestamp), and animate it back out — with the blur lifting in sync — the moment the mention ends, returning the clip to full sharpness.

## Multiple people mentioned together

* Keep the same current clip as the background; blur it once, not per-card.
* Show one ID card per person, side by side, evenly sized, fully visible.
* Never crop a face or a name to fit more cards in — if more than ~2 cards would not fit cleanly at the project's aspect ratio, prioritize the people actually being discussed in that instant over an exhaustive roster.

## Card placement

Automatically choose card position(s) so nothing important in the original footage is covered — cars, drivers, the action, existing on-screen text/graphics. Treat this as a per-scene layout decision, not a fixed corner.

## Frame format

Match the project's approved aspect ratio exactly — 16:9 (1920×1080) for long-form, 9:16 (1080×1920) for short-form. All cards, images, and names stay inside the safe area; nothing is ever cropped by the frame edge.

## Worked example

Clip: NASCAR race footage at Bristol Motor Speedway, already playing as B-roll.
Narration: "Denny Hamlin was battling closely with Kyle Larson."

1. Keep that exact Bristol clip playing.
2. Blur it cinematically for the duration of the line.
3. Bring in a sharp ID card for Denny Hamlin (image + name + car number/team badge).
4. Bring in a sharp ID card for Kyle Larson, alongside it.
5. Hold both cards while the narration discusses them.
6. Animate the cards out; lift the blur in sync.
7. Return to the original clip at full sharpness.

## Relationship to the footage-first rule

This is an overlay technique, not a replacement for the video/image/motion-graphic priority order in `character-visual-rules.md`. It applies specifically when the currently-playing clip is itself relevant (same event/context) but isn't footage of the named person — instead of hard-cutting away to that person's own clip/image, the scene stays on the relevant action and layers the ID card on top. If no relevant clip is playing at all when the person is named, fall back to `character-visual-rules.md`'s normal video-first → authentic-image priority instead of inventing a blurred background to overlay a card onto.
