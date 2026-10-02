import {Easing, interpolate} from 'remotion';

const BACK = Easing.bezier(0.34, 1.56, 0.64, 1);

/** Fade + overshoot scale for an element landing at `at`. */
export const pop = (frame: number, at: number) => ({
  k: interpolate(frame, [at, at + 6], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
  s: interpolate(frame, [at, at + 14], [0.55, 1], {easing: BACK, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
});

/** A hard slam: starts big and snaps down with overshoot. */
export const slam = (frame: number, at: number) => ({
  k: interpolate(frame, [at, at + 3], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
  s: interpolate(frame, [at, at + 10], [1.9, 1], {easing: BACK, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
});
