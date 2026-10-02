import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C, FONT, cardStyle, labelStyle} from '../theme';
import {BedChain} from '../components/BedChain';
import {Overlay, winK, type Win} from '../components/Bed';
import {ease} from '../components/base';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S02_DUR = mountedFrames(2); // 582f, 4 links

/**
 * Scene 2 — the reveal. "iRacing Studios released the third episode of its NASCAR 26 Dev Diary…
 * Buried among the gameplay footage was a screenshot fans immediately zeroed in on."
 *
 * The scene is built the way the line is: three links of the real car and the real race, and then
 * the rendered one. Putting the reveal last makes it the payoff of an edit rather than a caption,
 * and the card lands on it. It is the first of only two places in the film where game footage
 * appears at all.
 */
const W: Win = [352, 372, 417, 442]; // over the fourth link, where the in-game shot is

export const Scene02: React.FC = () => {
  const frame = useCurrentFrame();
  const k = winK(frame, W);
  const g = Math.max(0, Math.min(1, ease(frame - W[0], 0, 20) * 1.3));

  return (
    <BedChain segs={chain(2)} dur={S02_DUR} wins={[W]} amp={0.08} maxBlur={9} dim={0.26}>
      <Overlay k={k} rise={18}>
        <div
          style={{
            position: 'absolute',
            left: 96,
            top: 760,
            width: 900,
            opacity: g,
            transform: `translateY(${(1 - g) * 22}px)`,
            ...cardStyle({radius: 16, pad: 30}),
          }}
        >
          <div style={{...labelStyle(18), color: C.amber}}>NASCAR 26 Dev Diary — Ep 03</div>
          <div
            style={{
              fontFamily: FONT,
              fontSize: 56,
              fontWeight: 800,
              color: C.text,
              letterSpacing: -2,
              lineHeight: 1.05,
              marginTop: 10,
            }}
          >
            The No. 30 is in the game
          </div>
          <div style={{fontFamily: FONT, fontSize: 20, fontWeight: 500, color: C.muted, marginTop: 10}}>
            BaldEagle.com Mustang, rendered in-game — the paint scheme he debuted at Talladega.
          </div>
        </div>
      </Overlay>
    </BedChain>
  );
};
