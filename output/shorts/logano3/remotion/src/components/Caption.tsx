import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {FONT} from '../theme';

const ACCENT = '#ffd400';

/**
 * CapCut-style short-form caption: no card/box. Each word's letters type in smoothly one after
 * another (fade + slight rise, no bounce), and the word currently being typed glows accent
 * yellow before settling to white once the next word starts. Carried over verbatim from the
 * prior shorts so every Short in this library reads the same.
 */
export const Caption: React.FC<{
  text: string;
  inAt?: number;
  outAt: number;
  fontSize?: number;
}> = ({text, inAt = 4, outAt, fontSize = 62}) => {
  const frame = useCurrentFrame();
  const words = text.split(/\s+/).filter(Boolean);
  const revealSpan = Math.max(outAt - inAt, words.length * 3);
  const perWord = revealSpan / words.length;
  const highlightDur = perWord + 4;

  const groupFade = interpolate(frame, [0, 3, outAt, outAt + 8], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  if (groupFade <= 0.001) return null;

  return (
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 250}}>
      <div
        style={{
          opacity: groupFade,
          maxWidth: 900,
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '0 16px',
          padding: '0 24px',
        }}
      >
        {words.map((word, wi) => {
          const wordStart = inAt + wi * perWord;
          const sinceWordStart = frame - wordStart;
          const isActive = sinceWordStart >= 0 && sinceWordStart < highlightDur;
          const color = isActive ? ACCENT : '#ffffff';
          const perChar = Math.min(perWord / word.length, 3);

          return (
            <span key={wi} style={{display: 'inline-flex'}}>
              {word.split('').map((ch, ci) => {
                const charFrame = wordStart + ci * perChar;
                const p = interpolate(frame, [charFrame, charFrame + 5], [0, 1], {
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                });
                return (
                  <span
                    key={ci}
                    style={{
                      display: 'inline-block',
                      opacity: p,
                      transform: `translateY(${(1 - p) * 10}px)`,
                      fontFamily: FONT,
                      fontSize,
                      fontWeight: 900,
                      lineHeight: 1.2,
                      color,
                      letterSpacing: -0.5,
                      textTransform: 'uppercase',
                      WebkitTextStroke: '2.5px #000',
                      paintOrder: 'stroke fill',
                      textShadow: '0 3px 14px rgba(0,0,0,0.75)',
                    }}
                  >
                    {ch}
                  </span>
                );
              })}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
