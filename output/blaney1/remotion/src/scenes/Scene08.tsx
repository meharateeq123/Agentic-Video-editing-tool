import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C, FONT} from '../theme';
import {BedChain} from '../components/BedChain';
import {Overlay, winK, type Win} from '../components/Bed';
import {ease} from '../components/base';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S08_DUR = mountedFrames(8);

/**
 * Scene 8 - "Blaney didn't dodge the reality of it afterward. 'Didn't feel great about them the
 * run before, and finally expired,' he said of the brakes..." REAL quote, real footage - this is
 * Ryan Blaney's own post-race interview (blaney-interview.mp4), auto-captions confirmed this
 * exact line at ~10-17s into the clip. Quote-scene-style caption, sharp and unblurred.
 */
const W: Win = [20, 48, 96, 122];

export const Scene08: React.FC = () => {
  const frame = useCurrentFrame();
  const k = ease(frame, 20, 48);
  const attr = ease(frame, 38, 66);

  return (
    <BedChain segs={chain(8)} dur={S08_DUR} wins={[W]} amp={0.05} maxBlur={2} dim={0.08}>
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
              fontSize: 42,
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
            &ldquo;Didn&apos;t feel great about them the run before, and finally expired.&rdquo;
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
