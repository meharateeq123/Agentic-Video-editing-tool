import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, Easing} from 'remotion';
import {C, W, H} from '../theme';

/* ------------------------------------------------------------------ */
/* Camera: the NASCAR-2 move — slow push IN as the element lands,      */
/* hold, then a slow pull OUT so the graphic settles into free space.  */
/* ------------------------------------------------------------------ */

export const CameraRig: React.FC<{
  children: React.ReactNode;
  /** peak zoom at the hold */
  peak?: number;
  /** where the camera rests once it has pulled back out */
  rest?: number;
  /** subtle drift, in px, applied at peak */
  drift?: [number, number];
  origin?: string;
  /** explicit scene length in frames (ignores any transition bleed) */
  dur?: number;
}> = ({children, peak = 1.11, rest = 1.005, drift = [0, 0], origin = '50% 50%', dur}) => {
  const frame = useCurrentFrame();
  const cfg = useVideoConfig();
  const D = dur ?? cfg.durationInFrames;
  const t = D <= 1 ? 0 : Math.min(1, frame / (D - 1));

  const scale = interpolate(t, [0, 0.22, 0.6, 1], [1.0, peak, peak, rest], {
    easing: Easing.bezier(0.33, 0, 0.2, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const k = interpolate(t, [0, 0.22, 0.6, 1], [0, 1, 1, 0], {
    easing: Easing.bezier(0.33, 0, 0.2, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        transform: `scale(${scale}) translate(${drift[0] * k}px, ${drift[1] * k}px)`,
        transformOrigin: origin,
        willChange: 'transform',
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */
/* Backdrop for graphic scenes: near-black ground with depth.          */
/* ------------------------------------------------------------------ */

export const Backdrop: React.FC<{
  accent?: string;
  /** 0 = flat, 1 = strong glow */
  glow?: number;
  gx?: number;
  gy?: number;
  grid?: boolean;
  dur?: number;
}> = ({accent = C.steel, glow = 0.5, gx = 50, gy = 42, grid = true, dur}) => {
  const frame = useCurrentFrame();
  const cfg = useVideoConfig();
  const D = dur ?? cfg.durationInFrames;
  const t = D <= 1 ? 0 : Math.min(1, frame / (D - 1));
  const breathe = 1 + 0.06 * Math.sin(t * Math.PI * 2 * 0.8);

  return (
    <AbsoluteFill style={{backgroundColor: C.ground}}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(${72 * breathe}% ${78 * breathe}% at ${gx}% ${gy}%, ${hexA(
            accent,
            0.17 * glow
          )} 0%, ${hexA(accent, 0.05 * glow)} 42%, rgba(0,0,0,0) 72%)`,
        }}
      />
      {grid ? (
        <AbsoluteFill
          style={{
            opacity: 0.5,
            backgroundImage: `linear-gradient(${C.hairline} 1px, transparent 1px), linear-gradient(90deg, ${C.hairline} 1px, transparent 1px)`,
            backgroundSize: '96px 96px',
            backgroundPosition: `${(-frame * 0.14).toFixed(2)}px ${(frame * 0.07).toFixed(2)}px`,
            maskImage:
              'radial-gradient(64% 64% at 50% 46%, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 78%)',
            WebkitMaskImage:
              'radial-gradient(64% 64% at 50% 46%, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 78%)',
          }}
        />
      ) : null}
      <Vignette />
    </AbsoluteFill>
  );
};

export const Vignette: React.FC<{strength?: number}> = ({strength = 0.62}) => (
  <AbsoluteFill
    style={{
      background: `radial-gradient(120% 100% at 50% 50%, rgba(0,0,0,0) 42%, rgba(0,0,0,${strength}) 100%)`,
      pointerEvents: 'none',
    }}
  />
);

/** Converts #rrggbb + alpha into an rgba() string. */
export const hexA = (hex: string, a: number) => {
  if (hex.startsWith('rgba') || hex.startsWith('rgb')) return hex;
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
};

/* ------------------------------------------------------------------ */
/* Timing helpers                                                      */
/* ------------------------------------------------------------------ */

/** 0 -> 1 over [a, b] frames with a soft cinematic ease. */
export const ease = (frame: number, a: number, b: number) =>
  interpolate(frame, [a, b], [0, 1], {
    easing: Easing.bezier(0.22, 1, 0.36, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

/** Rises over [a,b], holds, falls over [c,d]. */
export const band = (frame: number, a: number, b: number, c: number, d: number) =>
  interpolate(frame, [a, b, c, d], [0, 1, 1, 0], {
    easing: Easing.bezier(0.33, 0, 0.2, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

/** Rise-and-settle entrance: returns {o, y} for opacity + translateY. */
export const enter = (frame: number, at: number, len = 20, dist = 34) => {
  const e = ease(frame, at, at + len);
  return {o: e, y: (1 - e) * dist};
};

/* ------------------------------------------------------------------ */
/* Card chrome                                                         */
/* ------------------------------------------------------------------ */

export const Card: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
  accent?: string;
  /** progress 0..1 of the card's own entrance, for the accent edge draw */
  reveal?: number;
}> = ({children, style, accent, reveal = 1}) => (
  <div
    style={{
      position: 'absolute',
      background: C.card,
      border: `1px solid ${C.hairline}`,
      borderRadius: 18,
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      boxShadow: '0 28px 80px rgba(0,0,0,0.6)',
      overflow: 'hidden',
      ...style,
    }}
  >
    {accent ? (
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: 3,
          height: `${reveal * 100}%`,
          background: accent,
          boxShadow: `0 0 24px ${hexA(accent, 0.7)}`,
        }}
      />
    ) : null}
    {children}
  </div>
);

export const FullBleed: React.FC<{children: React.ReactNode}> = ({children}) => (
  <AbsoluteFill style={{width: W, height: H}}>{children}</AbsoluteFill>
);

/** Fades its children up over `len` frames — used to cross-dissolve beats. */
export const FadeIn: React.FC<{children: React.ReactNode; len?: number; skip?: boolean}> = ({
  children,
  len = 8,
  skip = false,
}) => {
  const frame = useCurrentFrame();
  const o = skip ? 1 : interpolate(frame, [0, len], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.4, 0, 0.2, 1),
  });
  return <AbsoluteFill style={{opacity: o}}>{children}</AbsoluteFill>;
};
