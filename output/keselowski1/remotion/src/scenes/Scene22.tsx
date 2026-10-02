import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C, FONT} from '../theme';
import {BedChain} from '../components/BedChain';
import {Overlay, winK, type Win} from '../components/Bed';
import {ease} from '../components/base';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S22_DUR = mountedFrames(22);

/**
 * Scene 22 - "NASCAR has stopped short of stepping in directly. There's no formal meeting scheduled
 * between Keselowski and Hocevar."
 */
const W: Win = [40, 70, 108, 134];

export const Scene22: React.FC = () => {
  const frame = useCurrentFrame();
  const body = ease(frame, 46, 78);

  return (
    <BedChain segs={chain(22)} dur={S22_DUR} wins={[W]} amp={0.06} maxBlur={16} dim={0.52}>
      <Overlay k={winK(frame, W)} rise={20}>
        <div style={{position: 'absolute', left: 0, top: 400, width: 1920, textAlign: 'center'}}>
          <div
            style={{
              fontFamily: FONT,
              fontSize: 46,
              fontWeight: 700,
              color: C.text,
              letterSpacing: -0.6,
              lineHeight: 1.3,
              marginTop: 14,
              opacity: body,
            }}
          >
            NASCAR has stopped short of stepping in directly.
          </div>
        </div>
      </Overlay>
    </BedChain>
  );
};
