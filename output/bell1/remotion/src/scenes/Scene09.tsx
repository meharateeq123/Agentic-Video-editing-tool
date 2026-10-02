import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C, FONT, cardStyle, labelStyle} from '../theme';
import {BedChain} from '../components/BedChain';
import {Overlay, winK, type Win} from '../components/Bed';
import {ease} from '../components/base';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S09_DUR = mountedFrames(9);

/**
 * Scene 9 — "Back in June, Bell suffered a broken wrist in a crash at Michigan. He kept racing
 * through the recovery."
 *
 * A dated stamp rather than a statistic, because the point of the line is when it happened and
 * that he did not stop — the only place in the film where the timeline itself is the graphic.
 */
const W: Win = [44, 68, 114, 140];

export const Scene09: React.FC = () => {
  const frame = useCurrentFrame();
  const k = winK(frame, W);
  const g = ease(frame, W[0], W[0] + 24);
  const rule = ease(frame, W[0] + 14, W[0] + 52);

  return (
    <BedChain segs={chain(9)} dur={S09_DUR} wins={[W]} amp={0.08} maxBlur={16} dim={0.48}>
      <Overlay k={k} rise={18}>
        <div
          style={{
            position: 'absolute',
            left: 150,
            top: 690,
            width: 820,
            opacity: g,
            transform: `translateY(${(1 - g) * 22}px)`,
            ...cardStyle({radius: 16, pad: 34}),
          }}
        >
          <div style={{...labelStyle(18), color: C.red}}>June 2026 — Michigan</div>
          <div
            style={{
              fontFamily: FONT,
              fontSize: 58,
              fontWeight: 800,
              color: C.text,
              letterSpacing: -2,
              lineHeight: 1.08,
              marginTop: 10,
            }}
          >
            Broken wrist
          </div>
          {/* A rule that draws itself out from under the headline — the season continuing. */}
          <div
            style={{
              height: 3,
              width: `${rule * 100}%`,
              background: C.amber,
              marginTop: 18,
              boxShadow: `0 0 20px ${C.amberDim}`,
            }}
          />
          <div style={{fontFamily: FONT, fontSize: 21, fontWeight: 500, color: C.muted, marginTop: 14}}>
            He never missed a race
          </div>
        </div>
      </Overlay>
    </BedChain>
  );
};
