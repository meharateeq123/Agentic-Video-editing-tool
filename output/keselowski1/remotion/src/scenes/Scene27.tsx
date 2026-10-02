import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C, FONT} from '../theme';
import {BedChain} from '../components/BedChain';
import {Overlay, winK, type Win} from '../components/Bed';
import {ease} from '../components/base';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S27_DUR = mountedFrames(27);

/**
 * Scene 27 - "That leaves Keselowski in a difficult spot. He's publicly promised payback. NASCAR
 * is watching closely. And Hocevar, for his part, doesn't appear worried in the slightest."
 */
const W: Win = [40, 70, 220, 252];

export const Scene27: React.FC = () => {
  const frame = useCurrentFrame();
  const body = ease(frame, 46, 78);
  const foot = ease(frame, 150, 176);

  return (
    <BedChain segs={chain(27)} dur={S27_DUR} wins={[W]} amp={0.06} maxBlur={16} dim={0.52}>
      <Overlay k={winK(frame, W)} rise={20}>
        <div style={{position: 'absolute', left: 0, top: 380, width: 1920, textAlign: 'center'}}>
          <div
            style={{
              fontFamily: FONT,
              fontSize: 48,
              fontWeight: 800,
              color: C.text,
              letterSpacing: -1,
              lineHeight: 1.25,
              opacity: body,
            }}
          >
            He's publicly promised payback. NASCAR is watching.
          </div>
          <div style={{fontFamily: FONT, fontSize: 25, fontWeight: 500, color: C.muted, marginTop: 16, opacity: foot}}>
            Hocevar, meanwhile, doesn't seem worried in the slightest.
          </div>
        </div>
      </Overlay>
    </BedChain>
  );
};
