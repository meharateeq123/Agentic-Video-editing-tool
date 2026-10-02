import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {C, FONT} from '../theme';

/**
 * A quote is a sharp, unblurred bottom-centre caption — never a full graphic that dims or
 * blurs the clip behind it. Just text, with a thin accent rule above it.
 */
export const Quote: React.FC<{
  text: string;
  attribution?: string;
  inAt?: number;
  outAt: number;
}> = ({text, attribution, inAt = 10, outAt}) => {
  const frame = useCurrentFrame();
  const k = interpolate(frame, [0, inAt, outAt, outAt + 14], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  if (k <= 0.001) return null;

  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        bottom: 120,
        transform: `translate(-50%, ${(1 - k) * 20}px)`,
        opacity: k,
        width: 1280,
        textAlign: 'center',
      }}
    >
      <div style={{width: 64, height: 3, background: C.amber, margin: '0 auto 22px', borderRadius: 2}} />
      <div
        style={{
          fontFamily: FONT,
          fontSize: 42,
          fontWeight: 700,
          color: '#ffffff',
          lineHeight: 1.3,
          textShadow: '0 4px 24px rgba(0,0,0,0.85)',
        }}
      >
        {text}
      </div>
      {attribution ? (
        <div
          style={{
            fontFamily: FONT,
            fontSize: 20,
            fontWeight: 600,
            letterSpacing: 2,
            textTransform: 'uppercase',
            color: C.muted,
            marginTop: 18,
            textShadow: '0 2px 10px rgba(0,0,0,0.8)',
          }}
        >
          {attribution}
        </div>
      ) : null}
    </div>
  );
};
