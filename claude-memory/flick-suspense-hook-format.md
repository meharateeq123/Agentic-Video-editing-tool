---
name: flick-suspense-hook-format
description: "SUPERSEDED 2026-10-24 by flick-modern-hook-10s. Old cold-open hook format for building suspense in the first ~15s - full-screen rapid-cut montage with real sync audio, not the single boxed-clip hook."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 2e97caa6-3697-4fd1-9ecd-29ea5a4bf3bb
  modified: 2026-09-13T17:05:29.138Z
---

For future films, the cold-open hook should build suspense using a full-screen rapid-cut montage in exactly the first 15 seconds (fixed length, not "~15s"), not the older single-boxed-clip hook ([[flick-hook-clip-boxed-style]]).

Format:
- Boxed, not full-screen: same bordered-box-on-blurred-backdrop treatment as [[flick-hook-clip-boxed-style]] (reuse larson1's HookOpen.tsx structure) - box/backdrop position stays fixed on screen, only the clip playing inside it cycles rapidly. Source tag top-left, caption directly under the box (superseded the earlier full-screen-no-box idea after the user asked for card/box style specifically).
- 3-4 hard cuts, ~0.4-0.6s each.
- Audio: the clips' OWN real sound (engine, crowd, drone hum, broadcast ambience) - **never VO narration**. The user was explicit and corrected this directly once already (logano1): even when the footage is generic b-roll rather than real quote/interview clips, the hook must carry the clips' real audio, not the narrator's voice. Only the sharp box copy is unmuted; the blurred backdrop copy of the same clip stays muted so sound isn't doubled. If a caption is used, it's text-only with no matching narration audio underneath it.
- One quiet underscore layer is allowed **only for method 2** (no supplied clip): a low (~0.3 volume, fading in) tension SFX bed - flick's bundled `riser.mp3` / `Suspense.mp3` under `.claude/skills/flick/assets/starter-remotion/public/sounds/` - under the closing beat only, building into the cut-to-black. The real clip audio still leads; this is underneath it, not instead of it. Method 1's hook (a user-supplied real clip) gets no added layer at all - just that clip's own real audio, nothing else.
- End on the single most unresolved beat/quote of the story, then a hard cut to black/silence.
- Right before that final cut, show one short story-specific suspense line at the bottom-center (sharp/unblurred, quote-scene style, no other text on screen) - not a generic "to be continued" card. Write a line tied to this specific story's stakes/question (e.g. "But by Sunday, everything could change." / "His warning was public. What happens next wasn't."), decided fresh per film.
- After the cut to black, the film restarts properly from its true chronological beginning.
- The montage's overview should tease the conflict/question, never reveal the resolution.

**Footage-reuse exception**: clips used in this opening montage MAY be reused later in the film in full context - this is a deliberate exception to the standing "no duplicate footage ranges" rule, since it's a recap/preview, not padding.

**Why**: user wants viewers hooked with real suspense in the opening rather than a calm single-clip cold open, after seeing keselowski1/cleetus2/logano1 all use the older boxed-hook style. Confirmed directly ("han bs yahi") after I proposed the full-screen montage option over keeping the boxed format.

**How to apply**: use this format as the default hook style starting with the next new film, whenever the story has enough real footage/quotes to source 3-4 sync-audio moments. If the event is too recent to have real quote/interview footage (footage-scarce case, same as [[keselowski-hocevar-film]] vs a brand-new race), fall back to VO-driven lines for the montage instead of forcing fake sync audio, or ask the user which to use for that specific film.

**Clip-supplied override**: if the user gives a specific real clip link for the hook, just cut that exact clip into the hook directly (full-screen, sync audio as-is) - don't build the multi-clip montage on top of it. Only build the full rapid-cut montage (real sync audio or VO fallback) when the user has NOT supplied a specific hook clip themselves.
