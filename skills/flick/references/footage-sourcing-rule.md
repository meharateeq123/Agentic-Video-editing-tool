# Footage Sourcing — Hard Constraints

Every sourced clip must clear **all** of these before it can be used. A clip that fails any
one of them is rejected and a different clip is fetched — never patched, cropped, padded,
or used anyway.

## 1. Approved channels only

Footage comes from these channels and no others:

| Channel | Covers |
|---|---|
| `@NASCAR` | National series — Cup, Xfinity, Truck |
| `@NASCARonFOX` | Broadcast coverage of those series |
| `@MMCS07` | NASCAR incident/racing footage |
| `@redline_us` | Motorsport — **also posts F1**, so an off-domain title must be rejected |
| `@FloRacing` | Short track, Super Late Model, regional racing |
| `@dirtymomedia` | Dale Jr Download and the rest of the Dirty Mo podcast network |

Spread the sourcing across them — do not pull nearly everything from whichever one ranks
first. Track how many clips each channel has supplied and penalise a channel that is
already over-represented, so a fresh channel wins ties.

Match the channel to the story. The first four cover NASCAR's national series; a short-track
or Super Late Model story lives on `@FloRacing`, and anything said on a podcast lives on
`@dirtymomedia`. Searching only the national-series channels for a short-track story is why
a run ends up mostly motion graphics.

A channel with its search tab disabled (e.g. `@CleetusMcFarland`) cannot be searched this
way at all — reach it only via an explicitly vetted `forceYouTubeId` on the scene.

## 2. Long-form uploads only — never Shorts

Filter to `duration > 120s`. Shorts are vertical, so they can never fill a 16:9 frame
without pillarboxing, and they are usually a fast-cut reel rather than a continuous shot.

## 3. 16:9 only

Check twice, because one check is not enough:

- **Before accepting the download** — probe the stream dimensions; reject anything with an
  aspect ratio below 1.5.
- **After any normalise/pad step** — a vertical clip padded to 1280x720 *probes* as
  landscape while its actual picture sits between two pillars. Use `cropdetect` to find the
  real content box and reject it if that box is narrower than 1.5:1.

```
ffmpeg -i clip.mp4 -vf cropdetect=limit=24:round=2:reset=0 -frames:v 120 -f null -
```

## 4. No burned-in text

See [no-burned-in-text-rule.md](no-burned-in-text-rule.md). Reject compilations,
explainers, news packages, title cards, and anything whose own typography would name the
wrong subject or collide with our headings.

## 5. No third-party animation

Any animation in the final video must be one **we** authored from our own library. Reject
stop-motion, animated/CGI recreations, LEGO or toy-car series, fan simulations, and
video-game footage. If an otherwise-good clip contains someone else's animation, replace
the clip — do not use it.

## 6. Real footage, verified by more than the title

A title cannot show what is actually in the frame. A "pit road training" video can open on
a title slide; a stock result can be a vector icon animation. Gate on two measurable
signals after download:

- **Bitrate** — below ~400 kb/s at 720p means flat-colour vector/logo/title-card content,
  not camera footage.
- **Static ratio** — more than ~50% of the clip frozen (`freezedetect` at `-45dB`) means a
  title slide or logo bumper.

## 7. Audio

Sourced clips are **silent**. The voiceover is the only audio in the video.

## Related

- [no-burned-in-text-rule.md](no-burned-in-text-rule.md) — what makes a visual unusable.
- [clip-variety-rule.md](clip-variety-rule.md) — how many clips a scene needs.
- [clip-reuse-rule.md](clip-reuse-rule.md) — no reuse across scenes.
