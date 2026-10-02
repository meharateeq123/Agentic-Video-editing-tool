import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C, FONT} from '../theme';
import {BedChain} from '../components/BedChain';
import {Overlay, winK, type Win} from '../components/Bed';
import {ease} from '../components/base';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S13_DUR = mountedFrames(13);

/**
 * Scene 13 - "Larson wasn't shy about what Sunday meant... 'We got our swagger back,' he said in
 * Victory Lane." REAL quote, real footage - larson-interview.mp4 (NASCAR on USA, "LAST WORD from
 * the Enjoy Illinois 300"). VO transcript: "We got our swagger back." lands at scene-local frame
 * ~370-393; "he said in victory lane" (the attribution line) follows right after.
 */
const W: Win = [360, 388, 458, 484];

export const Scene13: React.FC = () => {
  const frame = useCurrentFrame();
  const k = ease(frame, 360, 388);
  const attr = ease(frame, 400, 428);

  return (
    <BedChain segs={chain(13)} dur={S13_DUR} wins={[W]} amp={0.05} maxBlur={2} dim={0.08}>
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
              fontSize: 46,
              fontWeight: 700,
              color: C.text,
              letterSpacing: -1,
              opacity: k,
              transform: `translateY(${(1 - k) * 14}px)`,
              textShadow: '0 2px 18px rgba(0,0,0,0.7)',
              maxWidth: 1400,
              margin: '0 auto',
              lineHeight: 1.3,
            }}
          >
            &ldquo;We got our swagger back.&rdquo;
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
            Kyle Larson - Victory Lane
          </div>
        </div>
      </Overlay>
    </BedChain>
  );
};
