import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C, FONT, labelStyle} from '../theme';
import {BedChain} from '../components/BedChain';
import {Overlay, winK, type Win} from '../components/Bed';
import {ease} from '../components/base';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S03_DUR = mountedFrames(3);

/**
 * Scene 3 - short bridge line: "Here's exactly what happened at Darlington, what both drivers
 * said afterward, and why NASCAR's next move might matter as much as anything on the track."
 */
const W: Win = [10, 34, 90, 120];

export const Scene03: React.FC = () => {
  const frame = useCurrentFrame();
  const g = ease(frame, W[0] + 6, W[0] + 30);

  return (
    <BedChain segs={chain(3)} dur={S03_DUR} wins={[W]} amp={0.06} maxBlur={16} dim={0.52}>
      <Overlay k={winK(frame, W)} rise={18}>
        <div style={{position: 'absolute', left: 0, top: 460, width: 1920, textAlign: 'center', opacity: g}}>
          <div
            style={{
              fontFamily: FONT,
              fontSize: 46,
              fontWeight: 700,
              color: C.text,
              letterSpacing: -0.6,
              lineHeight: 1.2,
              maxWidth: 1500,
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            Here's exactly what happened - and what both drivers said afterward.
          </div>
        </div>
      </Overlay>
    </BedChain>
  );
};
