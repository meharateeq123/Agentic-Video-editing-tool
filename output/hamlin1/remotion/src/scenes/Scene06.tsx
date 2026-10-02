import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C, FONT, labelStyle} from '../theme';
import {BedChain} from '../components/BedChain';
import {Overlay, winK, type Win} from '../components/Bed';
import {ease} from '../components/base';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S06_DUR = mountedFrames(6);

/**
 * Scene 6 - Hamlin on the stop: "It's a professional sport. You can't have big mistakes."
 *
 * Not every scene needs the footage buried under a full graphic. A quote doesn't need a card - it
 * needs the man's own face while he says it, so this is a lower-third caption: the footage stays
 * sharp and close to full brightness, and the words sit in a strip across the bottom third rather
 * than a centred block over a dimmed, blurred frame.
 */
const W: Win = [58, 90, 292, 332];

const LINES = [
  {at: 96, text: '"It\'s a professional sport.'},
  {at: 150, text: 'You can\'t have big mistakes."'},
];

export const Scene06: React.FC = () => {
  const frame = useCurrentFrame();
  const mark = ease(frame, 72, 104);
  const attr = ease(frame, 226, 262);

  return (
    <BedChain segs={chain(6)} dur={S06_DUR} wins={[W]} amp={0.05} maxBlur={2} dim={0.08}>
      <Overlay k={winK(frame, W)} rise={16}>
        {/* Just enough of a scrim behind the strip for the text to read - the shot above it stays
            clean. */}
        <AbsoluteFill
          style={{
            background: 'linear-gradient(to top, rgba(6,6,8,0.86) 0%, rgba(6,6,8,0.5) 32%, rgba(6,6,8,0) 58%)',
          }}
        />

        <div style={{position: 'absolute', left: 0, bottom: 96, width: 1920, textAlign: 'center'}}>
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              gap: 16,
            }}
          >
            <div
              style={{
                fontFamily: FONT,
                fontSize: 96,
                fontWeight: 800,
                color: C.amber,
                lineHeight: 0.5,
                opacity: mark,
                transform: `translateY(${(1 - mark) * 12}px)`,
              }}
            >
              &ldquo;
            </div>

            <div style={{maxWidth: 1380}}>
              {LINES.map((l) => {
                const k = ease(frame, l.at, l.at + 30);
                return (
                  <div
                    key={l.text}
                    style={{
                      fontFamily: FONT,
                      fontSize: 50,
                      fontWeight: 700,
                      color: C.text,
                      letterSpacing: -1.2,
                      lineHeight: 1.22,
                      opacity: k,
                      transform: `translateY(${(1 - k) * 14}px)`,
                      textShadow: '0 2px 18px rgba(0,0,0,0.7)',
                    }}
                  >
                    {l.text}
                  </div>
                );
              })}
            </div>
          </div>

          <div
            style={{
              ...labelStyle(16),
              color: C.muted,
              marginTop: 20,
              opacity: attr,
            }}
          >
            Denny Hamlin, after the race
          </div>
        </div>
      </Overlay>
    </BedChain>
  );
};
