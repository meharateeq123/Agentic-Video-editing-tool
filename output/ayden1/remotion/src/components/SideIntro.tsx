import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {C, FONT, cardStyle, labelStyle} from '../theme';

/**
 * A light-touch name card for a person already on screen in the footage itself — pinned to one
 * side, never blurring or dimming the shot behind it (unlike the full ID-card overlay pattern).
 * Used only when the footage already shows the named person; it just confirms who they are.
 */
export const SideIntro: React.FC<{
  name: string;
  role: string;
  side?: 'left' | 'right';
  inAt?: number;
  outAt: number;
}> = ({name, role, side = 'right', inAt = 10, outAt}) => {
  const frame = useCurrentFrame();
  const k = interpolate(frame, [0, inAt, outAt, outAt + 14], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  if (k <= 0.001) return null;

  const dx = side === 'right' ? (1 - k) * 40 : -(1 - k) * 40;

  return (
    <AbsoluteFill
      style={{
        alignItems: side === 'right' ? 'flex-end' : 'flex-start',
        justifyContent: 'flex-end',
        padding: 70,
      }}
    >
      <div
        style={{
          ...cardStyle({radius: 14, pad: 22}),
          width: 360,
          opacity: k,
          transform: `translateX(${dx}px)`,
          borderLeft: side === 'right' ? `2px solid ${C.steel}` : undefined,
          borderRight: side === 'left' ? `2px solid ${C.steel}` : undefined,
        }}
      >
        <div style={{...labelStyle(15), color: C.muted}}>{role}</div>
        <div style={{fontFamily: FONT, fontSize: 30, fontWeight: 800, color: C.text, marginTop: 4}}>
          {name}
        </div>
      </div>
    </AbsoluteFill>
  );
};
