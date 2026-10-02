import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C, FONT, labelStyle} from '../theme';
import {BedChain} from '../components/BedChain';
import {Overlay, winK, type Win} from '../components/Bed';
import {ease} from '../components/base';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S15_DUR = mountedFrames(15);

/**
 * Scene 15 - "Despite leading the most laps... Larson still sits seventh in the Chase standings, 49
 * points behind leader Denny Hamlin." The film's turn: everything so far argued he was the best car
 * on track, and this scene contradicts it with the actual number. A single stat block, not a full
 * standings list (that device already appeared in bell1/hamlin1) - the point here is the gap between
 * speed and result, so it's one number against one number.
 */
const W: Win = [46, 78, 220, 260];

export const Scene15: React.FC = () => {
  const frame = useCurrentFrame();
  const head = ease(frame, 52, 84);
  const pos = ease(frame, 84, 124);
  const gap = ease(frame, 150, 190);

  return (
    <BedChain segs={chain(15)} dur={S15_DUR} wins={[W]} amp={0.07} maxBlur={17} dim={0.56}>
      <Overlay k={winK(frame, W)} rise={18}>
        <div style={{position: 'absolute', left: 0, top: 300, width: 1920, textAlign: 'center'}}>
          <div style={{...labelStyle(19), color: C.amber, opacity: head}}>
            Despite all of that
          </div>
          <div style={{display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 40, marginTop: 18}}>
            <div
              style={{
                fontFamily: FONT,
                fontSize: 200,
                fontWeight: 800,
                color: C.text,
                letterSpacing: -10,
                lineHeight: 1,
                opacity: pos,
                transform: `translateY(${(1 - pos) * 20}px)`,
              }}
            >
              P7
            </div>
            <div
              style={{
                fontFamily: FONT,
                fontSize: 80,
                fontWeight: 700,
                color: C.dim,
                letterSpacing: -3,
                opacity: gap,
              }}
            >
              -49
            </div>
          </div>
          <div style={{fontFamily: FONT, fontSize: 28, fontWeight: 500, color: C.muted, marginTop: 10, opacity: gap}}>
            behind leader Denny Hamlin
          </div>
        </div>
      </Overlay>
    </BedChain>
  );
};
