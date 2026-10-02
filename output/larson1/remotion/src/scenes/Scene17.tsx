import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C, FONT, labelStyle} from '../theme';
import {BedChain} from '../components/BedChain';
import {Overlay, winK, type Win} from '../components/Bed';
import {ease} from '../components/base';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S17_DUR = mountedFrames(17);

/**
 * Scene 17 - "There's also a streak still hanging over Larson that this result didn't fix. He
 * remains winless in his last 51 races." The film's other big standalone number, mirroring scene
 * 2's P25 treatment (huge central figure) so the two "here's the number that matters" beats read as
 * a matched pair on opposite sides of the story - one at the start of the night, one hanging over
 * all of it.
 */
const W: Win = [40, 72, 226, 266];

export const Scene17: React.FC = () => {
  const frame = useCurrentFrame();
  const num = ease(frame, 78, 130);
  const foot = ease(frame, 160, 196);

  return (
    <BedChain segs={chain(17)} dur={S17_DUR} wins={[W]} amp={0.06} maxBlur={17} dim={0.56}>
      <Overlay k={winK(frame, W)} rise={18}>
        <div style={{position: 'absolute', left: 0, top: 260, width: 1920, textAlign: 'center'}}>
          <div style={{...labelStyle(19), color: C.red}}>Races since his last win</div>
          <div
            style={{
              fontFamily: FONT,
              fontSize: 280,
              fontWeight: 800,
              color: C.text,
              letterSpacing: -16,
              lineHeight: 1,
              marginTop: 14,
              opacity: num,
              transform: `scale(${1 + (1 - num) * 0.08})`,
            }}
          >
            51
          </div>
          <div style={{fontFamily: FONT, fontSize: 28, fontWeight: 500, color: C.muted, marginTop: 8, opacity: foot}}>
            Leading the most laps and finishing 5th is a strong night. It isn&rsquo;t a trophy.
          </div>
        </div>
      </Overlay>
    </BedChain>
  );
};
