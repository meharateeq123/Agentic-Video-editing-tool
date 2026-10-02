import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, Easing} from 'remotion';
import type {TKind} from '../timeline';

const E = Easing.bezier(0.4, 0, 0.15, 1);

const ramp = (f: number, a: number, b: number) =>
  interpolate(f, [a, b], [0, 1], {
    easing: E,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

/**
 * Wraps one scene and plays its transition IN (frames 0..overlap) and its
 * transition OUT (frames dur..dur+overlap, the bleed past its own cut).
 * Scenes keep their exact transcript start frames; only the tail overlaps,
 * so every transition lands on the VO's own pause.
 */
export const SceneTransition: React.FC<{
  children: React.ReactNode;
  inKind: TKind | null;
  outKind: TKind | null;
  /** the scene's own length, excluding the bleed */
  dur: number;
  overlap: number;
}> = ({children, inKind, outKind, dur, overlap}) => {
  const f = useCurrentFrame();

  let transform = '';
  let filter = '';
  let opacity = 1;
  let mask: string | undefined;
  let maskSize: string | undefined;
  let maskPos: string | undefined;
  let black = 0;
  let edge: React.ReactNode = null;

  // ---- transition IN ------------------------------------------------
  if (inKind && f <= overlap) {
    const p = ramp(f, 0, overlap);
    if (inKind === 'dip') {
      if (f < overlap / 2) {
        opacity = 0;
      } else {
        black = 1 - ramp(f, overlap / 2, overlap);
      }
    } else if (inKind === 'whip') {
      transform = `translateX(${(1 - p) * 46}%)`;
      filter = `blur(${(1 - p) * 26}px)`;
    } else if (inKind === 'whipDown') {
      transform = `translateY(${(1 - p) * -34}%)`;
      filter = `blur(${(1 - p) * 20}px)`;
    } else if (inKind === 'push') {
      transform = `scale(${1.16 - 0.16 * p})`;
      opacity = p;
      filter = `blur(${(1 - p) * 9}px)`;
    } else if (inKind === 'wipe') {
      mask = 'linear-gradient(102deg, #000 0%, #000 38%, rgba(0,0,0,0) 52%, rgba(0,0,0,0) 100%)';
      maskSize = '260% 100%';
      maskPos = `${(1 - p) * 100}% 0`;
      edge = (
        <div
          style={{
            position: 'absolute',
            top: '-12%',
            left: `${p * 118 - 9}%`,
            width: 5,
            height: '124%',
            background:
              'linear-gradient(180deg, rgba(245,166,35,0) 0%, rgba(245,166,35,0.85) 50%, rgba(245,166,35,0) 100%)',
            filter: 'blur(2px)',
            transform: 'rotate(6deg)',
            opacity: Math.sin(p * Math.PI),
            pointerEvents: 'none',
          }}
        />
      );
    }
  }

  // ---- transition OUT (played during the bleed) ---------------------
  if (outKind && f >= dur) {
    const p = ramp(f, dur, dur + overlap);
    if (outKind === 'dip') {
      black = Math.max(black, Math.min(1, p * 2));
    } else if (outKind === 'whip') {
      transform = `translateX(${p * -18}%)`;
      filter = `blur(${p * 24}px)`;
      opacity = 1 - p * 0.55;
    } else if (outKind === 'whipDown') {
      transform = `translateY(${p * 14}%)`;
      filter = `blur(${p * 18}px)`;
      opacity = 1 - p * 0.55;
    } else if (outKind === 'push') {
      transform = `scale(${1 + p * 0.34})`;
      opacity = 1 - p * 0.7;
      filter = `blur(${p * 8}px)`;
    }
  }

  return (
    <AbsoluteFill
      style={{
        transform: transform || undefined,
        filter: filter || undefined,
        opacity,
        WebkitMaskImage: mask,
        maskImage: mask,
        WebkitMaskSize: maskSize,
        maskSize,
        WebkitMaskPosition: maskPos,
        maskPosition: maskPos,
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        backgroundColor: '#000',
        willChange: 'transform, filter, opacity',
      }}
    >
      {children}
      {edge}
      {black > 0.001 ? (
        <AbsoluteFill style={{backgroundColor: '#000', opacity: black}} />
      ) : null}
    </AbsoluteFill>
  );
};
