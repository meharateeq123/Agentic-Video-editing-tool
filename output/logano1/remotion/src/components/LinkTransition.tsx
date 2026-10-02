import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';

/**
 * The cut between two links inside a scene.
 *
 * Up to bell1 every one of these was a hard cut, and the user's note after watching it was that the
 * films looked good but the cutting was plain — "simple clipping thi... ab kuch modern type
 * transitions use krna". The follow-up was just as important: "transition ziada second ki na ho,
 * aik buht hi smooth ho". So these are deliberately **short** (9 frames, 0.3s) and eased out hard,
 * with no bounce and no held mid-state. A transition you have time to notice is worse than the cut
 * it replaced.
 *
 * Every variant animates the *incoming* link only, over its own first frames. Nothing here touches
 * a link's `startFrom` or `frames`, so the footage ranges stay exactly as footage.ts declares them
 * and the no-overlapping-ranges rule is unaffected. The incoming shot never starts from black
 * either — opacity begins around a third rather than zero, which is what makes it read as a cut
 * with energy rather than a fade.
 */
export const TRANS_FRAMES = 9;

export type TransKind = 'punch' | 'whipL' | 'whipR' | 'rise' | 'flash' | 'glide';

/** Cycled by link index so the same move never lands twice in a row. */
export const TRANS_CYCLE: TransKind[] = ['punch', 'whipL', 'rise', 'flash', 'whipR', 'glide'];

export const transForIndex = (i: number): TransKind => TRANS_CYCLE[i % TRANS_CYCLE.length];

const OUT = Easing.bezier(0.16, 1, 0.3, 1);

const at = (t: number, from: number, to: number) =>
  interpolate(t, [0, 1], [from, to], {
    easing: OUT,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

/**
 * Wraps one link. `kind` of `null` means a straight cut — used for the first link of a scene,
 * where the scene's own TRANSITION_IN is already doing the work and stacking a second move on top
 * would read as a stutter.
 */
export const LinkTransition: React.FC<{
  kind: TransKind | null;
  children: React.ReactNode;
}> = ({kind, children}) => {
  const frame = useCurrentFrame();

  if (kind === null || frame >= TRANS_FRAMES) {
    return <AbsoluteFill>{children}</AbsoluteFill>;
  }

  const t = Math.max(0, Math.min(1, frame / TRANS_FRAMES));

  let transform = '';
  let filter = '';
  let opacity = at(t, 0.34, 1);

  switch (kind) {
    case 'punch':
      transform = `scale(${at(t, 1.075, 1)})`;
      filter = `blur(${at(t, 11, 0).toFixed(2)}px)`;
      break;
    case 'whipL':
      transform = `translateX(${at(t, -7.5, 0).toFixed(3)}%) scale(${at(t, 1.05, 1)})`;
      filter = `blur(${at(t, 15, 0).toFixed(2)}px)`;
      break;
    case 'whipR':
      transform = `translateX(${at(t, 7.5, 0).toFixed(3)}%) scale(${at(t, 1.05, 1)})`;
      filter = `blur(${at(t, 15, 0).toFixed(2)}px)`;
      break;
    case 'rise':
      transform = `translateY(${at(t, 5.5, 0).toFixed(3)}%) scale(${at(t, 1.045, 1)})`;
      filter = `blur(${at(t, 9, 0).toFixed(2)}px)`;
      break;
    case 'glide':
      transform = `scale(${at(t, 0.955, 1)})`;
      filter = `blur(${at(t, 8, 0).toFixed(2)}px)`;
      break;
    case 'flash':
      // No displacement at all — a clean exposure lift that falls away. The one variant that reads
      // as a straight cut, so the chain never feels like it is always sliding.
      transform = `scale(${at(t, 1.02, 1)})`;
      filter = `brightness(${at(t, 1.55, 1).toFixed(3)}) blur(${at(t, 5, 0).toFixed(2)}px)`;
      opacity = at(t, 0.55, 1);
      break;
  }

  return (
    <AbsoluteFill
      style={{
        transform,
        filter,
        opacity,
        transformOrigin: '50% 50%',
        willChange: 'transform, filter, opacity',
      }}
    >
      {children}
    </AbsoluteFill>
  );
};
