import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C, FONT} from '../theme';
import {BedChain} from '../components/BedChain';
import {Overlay, winK, type Win} from '../components/Bed';
import {ease} from '../components/base';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S16_DUR = mountedFrames(16);

/** Scene 16 - quote: "I'll tighten my belts," he said. Same interview as scenes 8/10/11, ~50s in. */
const W: Win = [3, 14, 38, 54];

export const Scene16: React.FC = () => {
  const frame = useCurrentFrame();
  const k = ease(frame, 5, 18);

  return (
    <BedChain segs={chain(16)} dur={S16_DUR} wins={[W]} amp={0.04} maxBlur={2} dim={0.08}>
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
              fontSize: 54,
              fontWeight: 700,
              color: C.text,
              letterSpacing: -1,
              opacity: k,
              transform: `translateY(${(1 - k) * 14}px)`,
              textShadow: '0 2px 18px rgba(0,0,0,0.7)',
            }}
          >
            &ldquo;I'll tighten my belts.&rdquo;
          </div>
          <div style={{fontFamily: FONT, fontSize: 19, fontWeight: 500, color: C.muted, marginTop: 16, opacity: k}}>
            Carson Hocevar
          </div>
        </div>
      </Overlay>
    </BedChain>
  );
};
