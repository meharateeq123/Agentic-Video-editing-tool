import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C, FONT, labelStyle} from '../theme';
import {BedChain} from '../components/BedChain';
import {Overlay, winK, type Win} from '../components/Bed';
import {ease} from '../components/base';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S09_DUR = mountedFrames(9);

/**
 * Scene 9 - "When asked whether there was any history between him and Hocevar before Darlington,
 * Keselowski's answer set the tone for everything that followed."
 */
const W: Win = [30, 58, 150, 180];

export const Scene09: React.FC = () => {
  const frame = useCurrentFrame();
  const g = ease(frame, 36, 66);

  return (
    <BedChain segs={chain(9)} dur={S09_DUR} wins={[W]} amp={0.06} maxBlur={16} dim={0.52}>
      <Overlay k={winK(frame, W)} rise={18}>
        <div style={{position: 'absolute', left: 0, top: 460, width: 1920, textAlign: 'center', opacity: g}}>
          <div
            style={{
              fontFamily: FONT,
              fontSize: 44,
              fontWeight: 700,
              color: C.text,
              letterSpacing: -0.6,
              lineHeight: 1.25,
              maxWidth: 1400,
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            Any history between them before Darlington?
          </div>
        </div>
      </Overlay>
    </BedChain>
  );
};
