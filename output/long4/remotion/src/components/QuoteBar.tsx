import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C, FONT} from '../theme';
import {Overlay, winK, type Win} from './Bed';
import {ease} from './base';

/**
 * A real quote as a sharp, unblurred bottom-centre caption over the live footage
 * (flick-quote-scene-style): gradient scrim at the foot, no dimming or blurring of the clip.
 * `win` is the overlay window in scene frames; `who` fades in a beat after the text.
 */
export const QuoteBar: React.FC<{text: string; who: string; win: Win; whoAt?: number; fontSize?: number}> = ({
  text,
  who,
  win,
  whoAt,
  fontSize = 34,
}) => {
  const frame = useCurrentFrame();
  const k = winK(frame, win);
  const a = ease(frame, whoAt ?? win[1] + 12, (whoAt ?? win[1] + 12) + 22);
  return (
    <Overlay k={k} rise={14}>
      <AbsoluteFill
        style={{
          background: 'linear-gradient(to top, rgba(6,6,8,0.92) 0%, rgba(6,6,8,0.58) 32%, rgba(6,6,8,0) 60%)',
        }}
      />
      <div style={{position: 'absolute', left: 0, bottom: 84, width: 1920, textAlign: 'center'}}>
        <div
          style={{
            fontFamily: FONT,
            fontSize,
            fontWeight: 700,
            color: C.text,
            letterSpacing: -0.3,
            textShadow: '0 2px 18px rgba(0,0,0,0.7)',
            maxWidth: 1500,
            margin: '0 auto',
            lineHeight: 1.4,
          }}
        >
          &ldquo;{text}&rdquo;
        </div>
        <div style={{fontFamily: FONT, fontSize: 21, fontWeight: 500, color: C.muted, marginTop: 16, opacity: a}}>{who}</div>
      </div>
    </Overlay>
  );
};
