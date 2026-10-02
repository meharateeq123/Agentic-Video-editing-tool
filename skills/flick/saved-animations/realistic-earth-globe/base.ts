import {Easing, interpolate} from 'remotion';

/** 0 -> 1 over [a, b] frames with a soft cinematic ease. Same helper the film projects use. */
export const ease = (frame: number, a: number, b: number) =>
  interpolate(frame, [a, b], [0, 1], {
    easing: Easing.bezier(0.22, 1, 0.36, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
