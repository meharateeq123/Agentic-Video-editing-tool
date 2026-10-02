import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, Easing} from 'remotion';
import {Footage} from './Footage';
import {band, hexA} from './base';
import {C} from '../theme';

/* ==================================================================== */
/* THE BED                                                              */
/*                                                                      */
/* Every scene in this film is a clip that plays from its first frame   */
/* to its last. Graphics never replace it — they ride on top of it.     */
/* When an overlay is up, the bed takes a cinematic depth-of-field      */
/* blur; the clip keeps playing and stays in sync behind it, then       */
/* comes back to full sharpness as the overlay leaves.                  */
/* ==================================================================== */

/** [fade-in start, fade-in end, fade-out start, fade-out end] in scene frames. */
export type Win = [number, number, number, number];

/** 0..1 presence of one overlay window. */
export const winK = (frame: number, w: Win) => band(frame, w[0], w[1], w[2], w[3]);

/** The strongest overlay presence at this frame — this is what drives the blur. */
export const focusAt = (frame: number, wins: Win[]) =>
  wins.length === 0 ? 0 : wins.reduce((m, w) => Math.max(m, winK(frame, w)), 0);

const CAM = Easing.bezier(0.33, 0, 0.2, 1);

export type BedProps = {
  /** path under public/, e.g. "bed-pool/....mp4" */
  src: string;
  /** seconds into the source clip - a scene reusing a clip must pick a new one */
  startFrom?: number;
  /** overscan. Never below ~1.10 or the blur will sample the frame edge. */
  zoom?: number;
  offX?: number;
  offY?: number;
  exposure?: number;
  saturate?: number;
  /**
   * Seconds of the source this scene is allowed to consume. The sourced clips
   * are shorter than the film, so the bed slows itself just enough to cover
   * the scene from its first frame to its last — the clip never runs out and
   * never freezes. Two scenes sharing one clip take disjoint spans of it.
   */
  span?: number;
  /** explicit override; normally the rate is derived from `span` */
  playbackRate?: number;
  /** slow lateral drift across the shot, in % of frame */
  driftX?: number;
  driftY?: number;
  /** overlay windows — the blur is their envelope */
  wins?: Win[];
  maxBlur?: number;
  /** per-window blur override, indexed like `wins` */
  winBlur?: (number | undefined)[];
  /** how far the bed is pushed down behind an overlay */
  dim?: number;
  /** per-window dim override, indexed like `wins` */
  winDim?: (number | undefined)[];
  /** extra scale at the top of the push, before the camera widens again */
  amp?: number;
  /** scene length excluding the transition bleed */
  dur?: number;
  /** tint of the light that sits behind the overlay */
  accent?: string;
  children?: React.ReactNode;
};

export const SceneBed: React.FC<BedProps> = ({
  src,
  startFrom = 0,
  zoom = 1.14,
  offX = 0,
  offY = 0,
  exposure = 0.94,
  saturate = 1.05,
  span,
  playbackRate,
  driftX = 0,
  driftY = 0,
  wins = [],
  maxBlur = 13,
  winBlur,
  dim = 0.3,
  winDim,
  amp = 0.055,
  dur,
  accent = C.amber,
  children,
}) => {
  const frame = useCurrentFrame();
  const cfg = useVideoConfig();
  const D = dur ?? cfg.durationInFrames;
  const t = D <= 1 ? 0 : Math.min(1, Math.max(0, frame / (D - 1)));

  const need = (D + 22) / cfg.fps;
  const rate = playbackRate ?? (span ? Math.min(1, span / need) : 1);

  const push = Math.min(amp, 0.025);
  const cam = interpolate(t, [0, 0.26, 0.64, 1], [1, 1 + push, 1 + push * 0.92, 1.002], {
    easing: CAM,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const focus = focusAt(frame, wins);
  const blur = wins.reduce(
    (m, w, i) => Math.max(m, winK(frame, w) * (winBlur?.[i] ?? maxBlur)),
    0
  );
  const dimAmt = wins.reduce((m, w, i) => Math.max(m, winK(frame, w) * (winDim?.[i] ?? dim)), 0);

  const blurK = maxBlur > 0 ? Math.min(1, blur / maxBlur) : 0;
  const effZoom = 1 + (zoom - 1) * blurK;

  return (
    <AbsoluteFill style={{backgroundColor: '#000', overflow: 'hidden'}}>
      {/* the clip — one continuous play, never cut, never frozen */}
      <AbsoluteFill
        style={{transform: `scale(${cam})`, transformOrigin: '50% 50%', willChange: 'transform'}}
      >
        <Footage
          src={src}
          startFrom={startFrom}
          zoom={effZoom}
          push={0}
          offX={offX}
          offY={offY}
          driftX={driftX}
          driftY={driftY}
          exposure={exposure * (1 - 0.07 * focus)}
          saturate={saturate * (1 - 0.1 * focus)}
          blur={blur}
          playbackRate={rate}
        />
      </AbsoluteFill>

      {focus > 0.002 ? (
        <>
          <AbsoluteFill style={{backgroundColor: '#05050a', opacity: dimAmt}} />
          <AbsoluteFill
            style={{
              opacity: focus * 0.45,
              background: `radial-gradient(78% 74% at 50% 46%, ${hexA(accent, 0.14)} 0%, ${hexA(
                accent,
                0.04
              )} 44%, rgba(0,0,0,0) 74%)`,
            }}
          />
        </>
      ) : null}

      {children}
    </AbsoluteFill>
  );
};

export const Overlay: React.FC<{
  k: number;
  rise?: number;
  children: React.ReactNode;
}> = ({k, rise = 22, children}) => {
  if (k <= 0.001) return null;
  const o = Math.min(1, k * 1.18);
  return (
    <AbsoluteFill
      style={{
        opacity: o,
        transform: `translateY(${(1 - k) * rise}px) scale(${0.988 + 0.012 * k})`,
        transformOrigin: '50% 50%',
        willChange: 'transform, opacity',
      }}
    >
      {children}
    </AbsoluteFill>
  );
};
