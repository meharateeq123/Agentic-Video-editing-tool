import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C, FONT, labelStyle} from '../theme';
import {BedChain} from '../components/BedChain';
import {Overlay, winK, type Win} from '../components/Bed';
import {ease} from '../components/base';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S09_DUR = mountedFrames(9);

/**
 * Scene 9 - "I certainly felt like I had some responsibility in it, being that I did lift off the
 * corner because I had a moment."
 *
 * The film's second quote. Scene 6 was already a lower-third; this one keeps the same sharp-footage
 * approach but is told apart by the podcast tag sitting above the words - the source matters here,
 * since he said it on his own show rather than into a broadcast microphone.
 */
const W: Win = [70, 104, 370, 414];

export const Scene09: React.FC = () => {
  const frame = useCurrentFrame();
  const strip = ease(frame, 86, 118);
  const q1 = ease(frame, 132, 166);
  const q2 = ease(frame, 186, 220);
  const foot = ease(frame, 300, 340);

  return (
    <BedChain segs={chain(9)} dur={S09_DUR} wins={[W]} amp={0.05} maxBlur={2} dim={0.08}>
      <Overlay k={winK(frame, W)} rise={16}>
        <AbsoluteFill
          style={{
            background: 'linear-gradient(to top, rgba(6,6,8,0.88) 0%, rgba(6,6,8,0.52) 34%, rgba(6,6,8,0) 62%)',
          }}
        />

        <div style={{position: 'absolute', left: 0, bottom: 90, width: 1920, textAlign: 'center'}}>
          <div
            style={{
              display: 'inline-block',
              background: C.amber,
              ...labelStyle(15),
              color: '#0b0b0d',
              padding: '7px 18px',
              borderRadius: 7,
              opacity: strip,
              transform: `translateY(${(1 - strip) * 12}px)`,
            }}
          >
            On his podcast - Actions Detrimental
          </div>

          <div style={{marginTop: 20}}>
            <div
              style={{
                fontFamily: FONT,
                fontSize: 46,
                fontWeight: 700,
                color: C.text,
                letterSpacing: -1,
                lineHeight: 1.24,
                opacity: q1,
                transform: `translateY(${(1 - q1) * 14}px)`,
                textShadow: '0 2px 18px rgba(0,0,0,0.7)',
              }}
            >
              &ldquo;I certainly felt like I had some responsibility in it,
            </div>
            <div
              style={{
                fontFamily: FONT,
                fontSize: 46,
                fontWeight: 700,
                color: C.text,
                letterSpacing: -1,
                lineHeight: 1.24,
                opacity: q2,
                transform: `translateY(${(1 - q2) * 14}px)`,
                textShadow: '0 2px 18px rgba(0,0,0,0.7)',
              }}
            >
              being that I did lift off the corner.&rdquo;
            </div>
          </div>

          <div
            style={{
              fontFamily: FONT,
              fontSize: 20,
              fontWeight: 500,
              color: C.muted,
              marginTop: 22,
              opacity: foot,
              maxWidth: 1100,
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            He called it a racing incident he put himself into - and said he'd give McDowell the
            benefit of the doubt.
          </div>
        </div>
      </Overlay>
    </BedChain>
  );
};
