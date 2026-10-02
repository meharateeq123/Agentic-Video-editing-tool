import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C, FONT} from '../theme';
import {BedChain} from '../components/BedChain';
import {Overlay, winK, type Win} from '../components/Bed';
import {ease} from '../components/base';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S24_DUR = mountedFrames(24);

/**
 * Scene 24 - "That distinction matters. NASCAR isn't necessarily calling in Hocevar to explain the
 * contact. If anyone gets a call, it may be Keselowski - about the retaliation he publicly
 * promised."
 */
const W: Win = [40, 72, 108, 134];

export const Scene24: React.FC = () => {
  const frame = useCurrentFrame();
  const body = ease(frame, 46, 78);

  return (
    <BedChain segs={chain(24)} dur={S24_DUR} wins={[W]} amp={0.06} maxBlur={16} dim={0.52}>
      <Overlay k={winK(frame, W)} rise={20}>
        <div style={{position: 'absolute', left: 0, top: 400, width: 1920, textAlign: 'center'}}>
          <div
            style={{
              fontFamily: FONT,
              fontSize: 44,
              fontWeight: 700,
              color: C.text,
              letterSpacing: -0.6,
              lineHeight: 1.3,
              maxWidth: 1400,
              marginLeft: 'auto',
              marginRight: 'auto',
              opacity: body,
            }}
          >
            If anyone gets a call, it may be Keselowski - for the payback he publicly promised.
          </div>
        </div>
      </Overlay>
    </BedChain>
  );
};
