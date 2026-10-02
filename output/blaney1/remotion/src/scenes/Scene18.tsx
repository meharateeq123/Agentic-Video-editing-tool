import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C, FONT} from '../theme';
import {BedChain} from '../components/BedChain';
import {Overlay, winK, type Win} from '../components/Bed';
import {ease} from '../components/base';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S18_DUR = mountedFrames(18);

/**
 * Scene 18 - "Blaney's own words after the race carried the tone of a driver trying to move
 * forward fast. 'Just got to keep going,' he said. '...The car was good and had good stage points
 * and was looking forward to the end of the race. We will just go race next week.'" REAL quote,
 * real footage - Blaney's own interview, auto-captions confirmed this exact line at ~27-43s into
 * blaney-interview.mp4.
 */
const W: Win = [24, 52, 100, 126];

export const Scene18: React.FC = () => {
  const frame = useCurrentFrame();
  const k = ease(frame, 24, 52);
  const attr = ease(frame, 42, 70);

  return (
    <BedChain segs={chain(18)} dur={S18_DUR} wins={[W]} amp={0.05} maxBlur={2} dim={0.08}>
      <Overlay k={winK(frame, W)} rise={14}>
        <AbsoluteFill
          style={{
            background:
              'linear-gradient(to top, rgba(6,6,8,0.88) 0%, rgba(6,6,8,0.5) 32%, rgba(6,6,8,0) 60%)',
          }}
        />
        <div style={{position: 'absolute', left: 0, bottom: 90, width: 1920, textAlign: 'center'}}>
          <div
            style={{
              fontFamily: FONT,
              fontSize: 40,
              fontWeight: 700,
              color: C.text,
              letterSpacing: -1,
              opacity: k,
              transform: `translateY(${(1 - k) * 14}px)`,
              textShadow: '0 2px 18px rgba(0,0,0,0.7)',
              maxWidth: 1450,
              margin: '0 auto',
              lineHeight: 1.3,
            }}
          >
            &ldquo;Just got to keep going. The car was good today. We will just go race next
            week.&rdquo;
          </div>
          <div
            style={{
              fontFamily: FONT,
              fontSize: 19,
              fontWeight: 500,
              color: C.muted,
              marginTop: 16,
              opacity: attr,
            }}
          >
            Ryan Blaney - postrace interview
          </div>
        </div>
      </Overlay>
    </BedChain>
  );
};
