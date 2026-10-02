import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {SceneBed, type BedProps, type Win} from './Bed';
import {LinkTransition, transForIndex} from './LinkTransition';

/** One link in a chain: a bed plus how many frames it holds the screen. */
export type Link = BedProps & {frames: number};

/**
 * The hard limit this file exists to enforce: **no single clip holds the screen for more than
 * seven seconds.** The user set it after watching a cut where scene 11 sat on one in-car shot for
 * thirty-three seconds and scene 1 on one interview for nineteen — "aik hi itna lamba". A shot
 * that outstays that starts to read as filler no matter how good it is.
 *
 * So a scene is a chain of short links rather than one bed, and each link comes from a different
 * place: a different source clip where one fits the line, and at minimum a different,
 * non-overlapping range of the same clip. Every link still has to earn its place against the
 * narration — the rule is different clips, not random ones.
 *
 * `wins` are the scene's overlay windows, in scene frames. They are shifted into each link's own
 * local time so the bed's blur and dim follow a card that spans a cut, instead of resetting at
 * every link boundary.
 *
 * Children render above the whole chain in unshifted scene frames, so a card can span as many
 * links as it likes.
 */
export const MAX_LINK_FRAMES = 210; // 7s at 30fps

/**
 * `dur` must be the scene's **mounted** length — sceneFrames(n) + OVERLAP — not its base length.
 * Every scene except the last is mounted for OVERLAP extra frames so the next scene can cross
 * over it, and whatever is on screen during those frames is what the transition dissolves from.
 * The predecessor of this component covered only the base length, which left the bed missing for
 * the overlap: the 2->3 cut in the first render dissolved out of pure black. So the last link is
 * stretched to reach `dur` no matter what the numbers add up to, and that tail is why links are
 * sized to 194 frames rather than the full 210 — plus the overlap they still land under 7s.
 */
export const BedChain: React.FC<{
  segs: Link[];
  /** scene's mounted length in frames, i.e. sceneFrames(n) + OVERLAP */
  dur: number;
  /** overlay windows in scene frames, shared across the chain */
  wins?: Win[];
  /** camera-drift amount, applied to every link so the motion feels continuous across cuts */
  amp?: number;
  /** how far the bed blurs behind a card at full presence */
  maxBlur?: number;
  /** how far the bed darkens behind a card at full presence */
  dim?: number;
  children?: React.ReactNode;
}> = ({segs, dur, wins = [], amp, maxBlur, dim, children}) => {
  const total = segs.reduce((t, s) => t + s.frames, 0);
  let acc = 0;
  const links = segs.map((s, i) => {
    const from = acc;
    const last = i === segs.length - 1;
    const held = last ? Math.max(s.frames, dur - from) : s.frames;
    acc += s.frames;
    const shifted: Win[] = wins.map(
      (w) => [w[0] - from, w[1] - from, w[2] - from, w[3] - from] as Win,
    );
    // The first link inherits the scene's own TRANSITION_IN, so it cuts straight in; every later
    // link gets a short move, cycled by index so no two in a row are the same.
    return (
      <Sequence key={i} from={from} durationInFrames={held} layout="none">
        <LinkTransition kind={i === 0 ? null : transForIndex(i - 1)}>
          <SceneBed {...s} dur={held} wins={shifted} amp={amp} maxBlur={maxBlur} dim={dim} />
        </LinkTransition>
      </Sequence>
    );
  });

  if (process.env.NODE_ENV === 'development' && total > dur) {
    // eslint-disable-next-line no-console
    console.warn(`BedChain: links total ${total} frames but scene is ${dur} — tail will be cut.`);
  }

  return (
    <AbsoluteFill>
      {links}
      {children}
    </AbsoluteFill>
  );
};
