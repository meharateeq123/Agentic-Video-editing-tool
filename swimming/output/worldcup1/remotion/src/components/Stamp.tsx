import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import {C, FONT} from '../theme';
import {winK, type Win} from './Bed';

const BACK = Easing.bezier(0.34, 1.56, 0.64, 1);

/**
 * Information treatments for this short that are NOT cards. The user asked for card boxes to stop
 * being the default answer for every fact, so everything here sits directly on the footage:
 * a broadcast-style venue bug, a stamped finishing position, and full-bleed type. Scene 4's number
 * needs none of these â€” the real SEIKO photo finish prints the result itself.
 */

/** A thin accent rule plus two lines, pinned top-left like a broadcast bug. */
export const VenueStamp: React.FC<{title: string; sub: string; win: Win}> = ({title, sub, win}) => {
  const frame = useCurrentFrame();
  const k = winK(frame, win);
  if (k <= 0.001) return null;
  const slide = interpolate(k, [0, 1], [-40, 0]);
  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      <div style={{position: 'absolute', left: 70, top: 168, display: 'flex', gap: 20, opacity: k, transform: `translateX(${slide}px)`}}>
        <div style={{width: 7, borderRadius: 4, background: C.amber}} />
        <div>
          <div
            style={{
              fontFamily: FONT,
              fontSize: 54,
              fontWeight: 900,
              color: '#fff',
              letterSpacing: -1,
              lineHeight: 1.05,
              textTransform: 'uppercase',
              WebkitTextStroke: '2px #000',
              paintOrder: 'stroke fill',
              textShadow: '0 3px 16px rgba(0,0,0,0.8)',
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontFamily: FONT,
              fontSize: 23,
              fontWeight: 700,
              color: C.amber,
              letterSpacing: 3.4,
              marginTop: 7,
              textTransform: 'uppercase',
              textShadow: '0 2px 10px rgba(0,0,0,0.9)',
            }}
          >
            {sub}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/** A finishing position stamped onto the frame â€” hollow type, no box behind it. */
export const RankStamp: React.FC<{value: string; label: string; at: number; win: Win; size?: number}> = ({value, label, at, win, size = 300}) => {
  const frame = useCurrentFrame();
  const k = winK(frame, win);
  if (k <= 0.001) return null;
  const s = interpolate(frame, [at, at + 10], [2.1, 1], {easing: BACK, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const a = interpolate(frame, [at, at + 3], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', pointerEvents: 'none'}}>
      <div style={{opacity: k * a, transform: `scale(${s})`, textAlign: 'center', marginTop: -180}}>
        <div
          style={{
            fontFamily: FONT,
            fontSize: size,
            fontWeight: 900,
            letterSpacing: -14,
            lineHeight: 0.86,
            color: 'transparent',
            WebkitTextStroke: `9px ${C.amber}`,
            textShadow: '0 10px 40px rgba(0,0,0,0.6)',
          }}
        >
          {value}
        </div>
        <div
          style={{
            fontFamily: FONT,
            fontSize: 30,
            fontWeight: 800,
            letterSpacing: 8,
            color: '#fff',
            textTransform: 'uppercase',
            marginTop: 6,
            textShadow: '0 2px 12px rgba(0,0,0,0.9)',
          }}
        >
          {label}
        </div>
      </div>
    </AbsoluteFill>
  );
};

/** Two stacked words that land one after the other, straight on the footage. */
export const BigType: React.FC<{lines: string[]; ats: number[]; sub?: string; subAt?: number; win: Win}> = ({
  lines,
  ats,
  sub,
  subAt = 0,
  win,
}) => {
  const frame = useCurrentFrame();
  const k = winK(frame, win);
  if (k <= 0.001) return null;
  return (
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', pointerEvents: 'none'}}>
      <div style={{opacity: k, textAlign: 'center', marginTop: -220}}>
        {lines.map((line, i) => {
          const at = ats[i];
          const s = interpolate(frame, [at, at + 11], [1.7, 1], {easing: BACK, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
          const a = interpolate(frame, [at, at + 4], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
          return (
            <div
              key={line}
              style={{
                opacity: a,
                transform: `scale(${s})`,
                fontFamily: FONT,
                fontSize: i === 0 ? 132 : 104,
                fontWeight: 900,
                letterSpacing: -4,
                lineHeight: 1.0,
                color: i === 0 ? C.amber : '#fff',
                textTransform: 'uppercase',
                WebkitTextStroke: '3px #000',
                paintOrder: 'stroke fill',
                textShadow: '0 6px 26px rgba(0,0,0,0.75)',
              }}
            >
              {line}
            </div>
          );
        })}
        {sub ? (
          <div
            style={{
              opacity: interpolate(frame, [subAt, subAt + 6], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
              fontFamily: FONT,
              fontSize: 26,
              fontWeight: 700,
              letterSpacing: 5,
              color: '#fff',
              textTransform: 'uppercase',
              marginTop: 16,
              textShadow: '0 2px 12px rgba(0,0,0,0.95)',
            }}
          >
            {sub}
          </div>
        ) : null}
      </div>
    </AbsoluteFill>
  );
};

