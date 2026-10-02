import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C, FONT} from '../theme';
import {BedChain} from '../components/BedChain';
import {Overlay, winK, type Win} from '../components/Bed';
import {ease} from '../components/base';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S10_DUR = mountedFrames(10);

/** Scene 10 - quote: "No, but there will be," he said. Two seconds - a single sharp beat. */
const W: Win = [3, 14, 38, 54];

export const Scene10: React.FC = () => {
  const frame = useCurrentFrame();
  const k = ease(frame, 5, 18);

  return (
    <BedChain segs={chain(10)} dur={S10_DUR} wins={[W]} amp={0.04} maxBlur={2} dim={0.08}>
      <Overlay k={winK(frame, W)} rise={12}>
        <AbsoluteFill
          style={{
            background: 'linear-gradient(to top, rgba(6,6,8,0.88) 0%, rgba(6,6,8,0.5) 32%, rgba(6,6,8,0) 60%)',
          }}
        />
        <div style={{position: 'absolute', left: 0, bottom: 90, width: 1920, textAlign: 'center'}}>
          <div
            style={{
              fontFamily: FONT,
              fontSize: 56,
              fontWeight: 700,
              color: C.text,
              letterSpacing: -1,
              opacity: k,
              transform: `translateY(${(1 - k) * 14}px)`,
              textShadow: '0 2px 18px rgba(0,0,0,0.7)',
            }}
          >
            &ldquo;No. But there will be.&rdquo;
          </div>
        </div>
      </Overlay>
    </BedChain>
  );
};
