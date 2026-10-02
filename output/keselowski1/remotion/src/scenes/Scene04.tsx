import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C, FONT} from '../theme';
import {BedChain} from '../components/BedChain';
import {Overlay, winK, type Win} from '../components/Bed';
import {ease} from '../components/base';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S04_DUR = mountedFrames(4);

/**
 * Scene 4 - the incident, mechanically: Stage 1, lap 107, Hocevar behind Keselowski for several
 * laps, moves in, washes up the track, contact with the left-rear quarter panel. A single "LAP 107"
 * stat leads it - the same big-number-first device every film in this series uses for the one hard
 * fact a scene needs to land.
 */
const W: Win = [40, 72, 590, 630];

export const Scene04: React.FC = () => {
  const frame = useCurrentFrame();
  const num = ease(frame, 78, 130);
  const foot = ease(frame, 160, 196);
  const line2 = ease(frame, 340, 376);

  return (
    <BedChain segs={chain(4)} dur={S04_DUR} wins={[W]} amp={0.06} maxBlur={16} dim={0.54}>
      <Overlay k={winK(frame, W)} rise={20}>
        <div style={{position: 'absolute', left: 0, top: 190, width: 1920, textAlign: 'center'}}>
          <div style={{...labelStyle(19), color: C.amber, opacity: head}}>Stage 1 - Cook Out Southern 500</div>
          <div
            style={{
              fontFamily: FONT,
              fontSize: 240,
              fontWeight: 800,
              color: C.text,
              letterSpacing: -12,
              lineHeight: 1,
              marginTop: 12,
              opacity: num,
            }}
          >
            LAP 107
          </div>
          <div style={{fontFamily: FONT, fontSize: 28, fontWeight: 500, color: C.muted, marginTop: 8, opacity: foot}}>
            Hocevar's #77 moves in behind Keselowski's #6, washes up the track...
          </div>
          <div
            style={{
              fontFamily: FONT,
              fontSize: 34,
              fontWeight: 700,
              color: C.text,
              marginTop: 18,
              opacity: line2,
            }}
          >
            ...and makes contact with the left-rear quarter panel.
          </div>
        </div>
      </Overlay>
    </BedChain>
  );
};
