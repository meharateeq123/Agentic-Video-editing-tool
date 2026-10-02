import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C, FONT} from '../theme';
import {BedChain} from '../components/BedChain';
import {Overlay, winK, type Win} from '../components/Bed';
import {ease} from '../components/base';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S12_DUR = mountedFrames(12);

/**
 * Scene 12 - "That's not frustration fading by the time a driver reaches the media pen. That's a
 * direct, public warning, delivered by a 2012 Cup Series champion and current team co-owner, aimed
 * at a specific driver by name."
 */
const W: Win = [40, 70, 108, 134];

export const Scene12: React.FC = () => {
  const frame = useCurrentFrame();
  const body = ease(frame, 46, 78);

  return (
    <BedChain segs={chain(12)} dur={S12_DUR} wins={[W]} amp={0.06} maxBlur={16} dim={0.52}>
      <Overlay k={winK(frame, W)} rise={20}>
        <div style={{position: 'absolute', left: 0, top: 400, width: 1920, textAlign: 'center'}}>
          <div
            style={{
              fontFamily: FONT,
              fontSize: 46,
              fontWeight: 700,
              color: C.text,
              letterSpacing: -0.8,
              lineHeight: 1.3,
              maxWidth: 1500,
              marginLeft: 'auto',
              marginRight: 'auto',
              opacity: body,
            }}
          >
            A direct, public warning - from a 2012 champion and team co-owner, aimed at a driver by
            name.
          </div>
        </div>
      </Overlay>
    </BedChain>
  );
};
