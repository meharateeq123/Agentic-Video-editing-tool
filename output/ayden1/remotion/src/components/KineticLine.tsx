import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, Easing} from 'remotion';
import {FONT} from '../theme';

const EASE = Easing.bezier(0.16, 1, 0.3, 1);

/**
 * A modern kinetic-typography hook line: huge bold type slams in (scale + slight rotation
 * settle, fast), holds sharp and unblurred over the real footage, then snaps out. Built for a
 * fast sequence of short punchy phrases (see KineticSequence) rather than a paragraph.
 */
const KineticLine: React.FC<{text: string; localFrame: number; accent?: boolean}> = ({
  text,
  localFrame,
  accent,
}) => {
  const inK = interpolate(localFrame, [0, 10], [0, 1], {
    easing: EASE,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const scale = 0.7 + 0.3 * inK;
  const rot = (1 - inK) * (accent ? -4 : 4);

  return (
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
      <div
        style={{
          opacity: inK,
          transform: `scale(${scale}) rotate(${rot}deg)`,
          fontFamily: FONT,
          fontWeight: 900,
          fontSize: accent ? 128 : 96,
          letterSpacing: -3,
          textTransform: 'uppercase',
          color: accent ? '#ffd400' : '#ffffff',
          textAlign: 'center',
          lineHeight: 1.02,
          textShadow: '0 8px 40px rgba(0,0,0,0.85), 0 2px 0 rgba(0,0,0,0.4)',
          WebkitTextStroke: accent ? '3px #000' : '2.5px #000',
          paintOrder: 'stroke fill',
          maxWidth: 1500,
        }}
      >
        {text}
      </div>
    </AbsoluteFill>
  );
};

/** A fast sequence of KineticLines, each timed [start, end] in frames (scene-local). */
export const KineticSequence: React.FC<{
  lines: {text: string; start: number; end: number; accent?: boolean}[];
}> = ({lines}) => {
  const frame = useCurrentFrame();
  const active = lines.find((l) => frame >= l.start && frame < l.end);
  if (!active) return null;
  return (
    <div style={{position: 'absolute', inset: 0}}>
      <AbsoluteFill
        style={{
          background:
            'linear-gradient(0deg, rgba(5,5,8,0.55) 0%, rgba(5,5,8,0.1) 38%, rgba(5,5,8,0.1) 62%, rgba(5,5,8,0.55) 100%)',
        }}
      />
      <KineticLine text={active.text} localFrame={frame - active.start} accent={active.accent} />
    </div>
  );
};
