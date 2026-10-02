import React from 'react';
import {
  AbsoluteFill,
  OffthreadVideo,
  staticFile,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from 'remotion';
import {C} from '../theme';
import {Vignette, hexA} from './base';

export type FootageProps = {
  /** path under public/, e.g. "bed-pool/....mp4" */
  src: string;
  /** seconds into the source clip to begin */
  startFrom?: number;
  /**
   * Overscan pushes the source frame's edges outside the canvas. Used both for
   * the cinematic push and to shove any corner channel-bug off screen.
   */
  zoom?: number;
  /** extra zoom added across the shot (the slow push) */
  push?: number;
  /** frame offset in % of frame size; positive x moves the image right */
  offX?: number;
  offY?: number;
  /** drift across the shot, in % */
  driftX?: number;
  driftY?: number;
  /** darken the half of the frame a card will sit on */
  scrim?: 'none' | 'left' | 'right' | 'bottom' | 'top' | 'bottom-right' | 'bottom-left';
  /** overall exposure multiplier */
  exposure?: number;
  saturate?: number;
  /** blur, used behind an ID card */
  blur?: number;
  playbackRate?: number;
  /**
   * 0 = silent, which is still the default. Above 0 the clip's own sync sound — stadium noise and
   * the broadcast commentary — plays underneath the voiceover. Keep it low; the VO has to stay on top.
   */
  volume?: number;
};

const scrimGradient = (kind: NonNullable<FootageProps['scrim']>) => {
  switch (kind) {
    case 'left':
      return 'linear-gradient(90deg, rgba(6,6,8,0.80) 0%, rgba(6,6,8,0.40) 34%, rgba(0,0,0,0) 62%)';
    case 'right':
      return 'linear-gradient(270deg, rgba(6,6,8,0.80) 0%, rgba(6,6,8,0.40) 34%, rgba(0,0,0,0) 62%)';
    case 'bottom':
      return 'linear-gradient(0deg, rgba(6,6,8,0.86) 0%, rgba(6,6,8,0.35) 30%, rgba(0,0,0,0) 60%)';
    case 'top':
      return 'linear-gradient(180deg, rgba(6,6,8,0.82) 0%, rgba(6,6,8,0.30) 28%, rgba(0,0,0,0) 58%)';
    case 'bottom-right':
      return 'radial-gradient(78% 78% at 82% 84%, rgba(6,6,8,0.86) 0%, rgba(6,6,8,0.45) 40%, rgba(0,0,0,0) 74%)';
    case 'bottom-left':
      return 'radial-gradient(78% 78% at 18% 84%, rgba(6,6,8,0.86) 0%, rgba(6,6,8,0.45) 40%, rgba(0,0,0,0) 74%)';
    default:
      return 'none';
  }
};

/**
 * A sourced clip, framed so the subject stays whole and graded to sit under our own typography.
 * Silent unless `volume` is set, in which case its real broadcast audio plays under the voiceover.
 */
export const Footage: React.FC<FootageProps> = ({
  src,
  startFrom = 0,
  zoom = 1.06,
  push = 0.07,
  offX = 0,
  offY = 0,
  driftX = 0,
  driftY = 0,
  scrim = 'none',
  exposure = 0.92,
  saturate = 1.04,
  blur = 0,
  playbackRate = 1,
  volume = 0,
}) => {
  const frame = useCurrentFrame();
  const {durationInFrames: D, fps} = useVideoConfig();
  const t = D <= 1 ? 0 : frame / (D - 1);

  const raw = interpolate(t, [0, 1], [zoom, zoom + push], {
    easing: Easing.bezier(0.4, 0, 0.4, 1),
  });
  const dx = offX + driftX * t;
  const dy = offY + driftY * t;

  const shift = Math.max(Math.abs(dx), Math.abs(dy));
  const minScale = shift > 0 ? 1.002 / Math.max(0.5, 1 - (2 * shift) / 100) : 1.002;
  const s = Math.max(raw, minScale);

  return (
    <AbsoluteFill style={{backgroundColor: '#000', overflow: 'hidden'}}>
      <AbsoluteFill
        style={{
          transform: `scale(${s}) translate(${dx}%, ${dy}%)`,
          willChange: 'transform',
          filter: `brightness(${exposure}) saturate(${saturate}) contrast(1.06)${
            blur ? ` blur(${blur}px)` : ''
          }`,
        }}
      >
        <OffthreadVideo
          src={staticFile(src)}
          muted={volume <= 0}
          volume={volume}
          startFrom={Math.round(startFrom * fps)}
          playbackRate={playbackRate}
          style={{width: '100%', height: '100%', objectFit: 'cover'}}
        />
      </AbsoluteFill>
      {scrim !== 'none' ? (
        <AbsoluteFill style={{background: scrimGradient(scrim)}} />
      ) : null}
      <Vignette strength={0.5} />
    </AbsoluteFill>
  );
};

/** Thin accent bar used to tie footage scenes to the graphic language. */
export const AccentEdge: React.FC<{color?: string; progress: number; side?: 'top' | 'bottom'}> = ({
  color = C.amber,
  progress,
  side = 'bottom',
}) => (
  <div
    style={{
      position: 'absolute',
      left: 0,
      [side]: 0,
      height: 3,
      width: `${Math.max(0, Math.min(1, progress)) * 100}%`,
      background: `linear-gradient(90deg, ${hexA(color, 0)} 0%, ${color} 22%, ${color} 100%)`,
    }}
  />
);
