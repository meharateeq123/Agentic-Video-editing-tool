# One Scene = One Visual Journey

A scene's visuals must carry the viewer forward for its whole duration. Never fill a long
scene by repeating, looping, or freezing one short clip.

## The rule

**If a clip has already appeared in the current scene, do not use it again** — the only
exception is a deliberate, very short flashback/replay that the narration itself calls for.

**Never freeze the tail.** Each clip must stay a continuously moving video for its entire
assigned span. A frozen last frame held for the final 2-3 seconds reads as a broken video.

## Covering a long scene

A 15-second scene needs 15 seconds of *visual journey*, not a 5-second clip played three
times. Cut between several different, individually relevant clips:

> **Example — "Bubba Wallace disagrees, says qualifying gave the field zero indication"**
>
> 1. Bubba Wallace interview — him speaking
> 2. A different angle or a different moment from another interview
> 3. Relevant race / pit-lane / track footage
> 4. Bubba racing, or working with his team
> 5. Another reaction or interview shot

Each clip must add **new visual information** and stay relevant to the narration. If the
exact person or event footage does not exist for a slot, use different relevant B-roll —
never repeat a clip you have already used in that scene.

The result should feel like a real edited news/documentary segment, not a slideshow and
not looped footage.

## Implementation

`MultiFootage` renders a scene as an ordered list of slots, each its own clip playing from
its own frame 0:

```tsx
const SLOTS: FootageSlot[] = [
  {file: '7a-bubba-interview.mp4', durationInFrames: 132},
  {file: '7b-bubba-interview2.mp4', durationInFrames: 132},
  {file: '7c-bubba-racing.mp4', durationInFrames: 132},
  {file: '7d-bubba-pit.mp4', durationInFrames: 132},
];
```

Two invariants the slot builder must hold:

- **A slot never exceeds its clip's real duration** (keep ~0.25s margin). Asking for more
  frames than the clip has is exactly what produces a frozen tail. Redistribute the
  overflow to clips that still have headroom.
- **If the available clips cannot cover the scene**, fetch another clip. Do not stretch,
  loop, or freeze what you have.

Source clips also need a freeze audit before use — a downloaded segment can contain frozen
stretches of its own. Detect them (`ffmpeg -vf freezedetect`), cut those ranges out, and
build the usable footage from the clean remainder.

## Related

- [clip-reuse-rule.md](clip-reuse-rule.md) — the same principle *across* scenes.
- [no-burned-in-text-rule.md](no-burned-in-text-rule.md) — what makes a clip unusable.
