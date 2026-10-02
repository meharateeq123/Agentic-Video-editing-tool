import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C, FONT} from '../theme';
import {BedChain} from '../components/BedChain';
import {Overlay, winK, type Win} from '../components/Bed';
import {ease} from '../components/base';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S14_DUR = mountedFrames(14);

/**
 * Scene 14 - "'I don't know if we're quite yet where we can go dominate like we have in the
 * past,' Larson said..." REAL quote, real footage - larson-interview.mp4 continues from Scene 13.
 * This is a short scene (7.9s); the VO-aligned cut lands mid-quote, so only the first half of the
 * sentence plays here - the "but a day like today...we can go dominate" half spills into Scene 15
 * before that scene's own content (a different paragraph) takes over, which is why this card only
 * captions the half actually spoken during this scene's own mount. VO transcript: "I" starts at
 * scene-local frame ~99, "...in the past." ends ~184.
 */
const W: Win = [85, 113, 200, 226];

export const Scene14: React.FC = () => {
  const frame = useCurrentFrame();
  const k = ease(frame, 85, 113);
  const attr = ease(frame, 190, 215);

  return (
    <BedChain segs={chain(14)} dur={S14_DUR} wins={[W]} amp={0.05} maxBlur={2} dim={0.08}>
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
              fontSize: 34,
              fontWeight: 700,
              color: C.text,
              letterSpacing: -0.5,
              opacity: k,
              transform: `translateY(${(1 - k) * 14}px)`,
              textShadow: '0 2px 18px rgba(0,0,0,0.7)',
              maxWidth: 1560,
              margin: '0 auto',
              lineHeight: 1.35,
            }}
          >
            &ldquo;I don&apos;t know if we&apos;re quite yet where we can go dominate like we have
            in the past.&rdquo;
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
