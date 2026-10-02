import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C, FONT, cardStyle, labelStyle} from '../theme';
import {BedChain} from '../components/BedChain';
import {Overlay, winK, type Win} from '../components/Bed';
import {ease} from '../components/base';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S05_DUR = mountedFrames(5);

/**
 * Scene 5 — "It's been too long, oh my gosh, man... Darlington has been one I've always wanted to
 * win since I got into the sport. It's the ultimate driver's track."
 *
 * The film's one pull-quote card. Scene 10 carries the other quote in the script and deliberately
 * gets no card at all, so this treatment is used exactly once.
 */
const W: Win = [30, 52, 240, 268];

export const Scene05: React.FC = () => {
  const frame = useCurrentFrame();
  const k = winK(frame, W);
  const g = ease(frame, W[0], W[0] + 26);

  return (
    <BedChain segs={chain(5)} dur={S05_DUR} wins={[W]} amp={0.07} maxBlur={18} dim={0.55}>
      <Overlay k={k} rise={22}>
        <div
          style={{
            position: 'absolute',
            left: 220,
            top: 300,
            width: 1480,
            opacity: g,
            transform: `translateY(${(1 - g) * 26}px)`,
            ...cardStyle({radius: 20, pad: 54}),
            borderLeft: `4px solid ${C.amber}`,
          }}
        >
          <div style={{...labelStyle(18), color: C.amber}}>Christopher Bell, in victory lane</div>
          <div
            style={{
              fontFamily: FONT,
              fontSize: 62,
              fontWeight: 700,
              color: C.text,
              letterSpacing: -1.6,
              lineHeight: 1.22,
              marginTop: 20,
            }}
          >
            “It’s been too long, oh my gosh, man. Darlington has been one I’ve always wanted to win.
            It’s the ultimate driver’s track.”
          </div>
        </div>
      </Overlay>
    </BedChain>
  );
};
