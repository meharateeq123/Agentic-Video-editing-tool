import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C, FONT} from '../theme';
import {BedChain} from '../components/BedChain';
import {Overlay, winK, type Win} from '../components/Bed';
import {ease} from '../components/base';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S20_DUR = mountedFrames(20);

/**
 * Scene 20 - "NASCAR didn't ignore this. The incident was discussed during the sanctioning body's
 * weekly competition debrief."
 */
const W: Win = [40, 70, 108, 134];

export const Scene20: React.FC = () => {
  const frame = useCurrentFrame();
  const body = ease(frame, 46, 78);

  return (
    <BedChain segs={chain(20)} dur={S20_DUR} wins={[W]} amp={0.06} maxBlur={16} dim={0.52}>
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
              maxWidth: 1400,
              marginLeft: 'auto',
              marginRight: 'auto',
              opacity: body,
            }}
          >
            Discussed at the sanctioning body's weekly competition debrief.
          </div>
        </div>
      </Overlay>
    </BedChain>
  );
};
