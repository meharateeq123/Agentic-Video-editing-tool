import React from 'react';
import {useCurrentFrame} from 'remotion';
import {BedChain} from '../components/BedChain';
import {Overlay, winK, type Win} from '../components/Bed';
import {ease} from '../components/base';
import {C, FONT, cardStyle, labelStyle, numStyle} from '../theme';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S06_DUR = mountedFrames(6);

/**
 * Scene 6 - "Then came the moment that made her a household name. Swimming in the heats of the
 * 4x200 meter freestyle relay ... At 12 years old, Yu Zidi became the youngest medalist in the
 * history of the World Aquatics Championships."
 *
 * A typographic plate, not a photo card: there is no name-verified photo of Yu in this film, and
 * the relay footage under it does not carry her name, so nothing here puts a face next to a label.
 * "12" lands on "12 years old" (16.1s = f483); the title and sub land on "youngest medalist"
 * (18.2s = f546) and settle by f578, so out0 = 578 + 30.
 */
const W: Win = [478, 504, 608, 634];

export const Scene06: React.FC = () => {
  const frame = useCurrentFrame();
  const a = ease(frame, 483, 509);
  const b = ease(frame, 546, 570);
  const c = ease(frame, 556, 578);
  return (
    <BedChain segs={chain(6)} dur={S06_DUR} wins={[W]} amp={0.06} maxBlur={10} dim={0.36}>
      <Overlay k={winK(frame, W)} rise={22}>
        <div
          style={{
            position: 'absolute',
            left: 130,
            top: 270,
            width: 720,
            ...cardStyle({radius: 24, pad: 40}),
            borderLeft: `6px solid ${C.amber}`,
          }}
        >
          <div style={{...labelStyle(19), color: C.amber, opacity: a}}>Singapore 2025 · World Aquatics Championships</div>
          <div style={{display: 'flex', alignItems: 'flex-end', gap: 22, marginTop: 18, opacity: a, transform: `translateY(${(1 - a) * 26}px)`}}>
            <div style={numStyle(190, C.text)}>12</div>
            <div style={{...numStyle(46, C.muted), paddingBottom: 22, letterSpacing: -1}}>years old</div>
          </div>
          <div
            style={{
              fontFamily: FONT,
              fontSize: 46,
              fontWeight: 800,
              color: C.amber,
              letterSpacing: -1.2,
              lineHeight: 1.08,
              marginTop: 22,
              opacity: b,
              transform: `translateY(${(1 - b) * 22}px)`,
            }}
          >
            Youngest medalist in championship history
          </div>
          <div
            style={{
              fontFamily: FONT,
              fontSize: 24,
              fontWeight: 500,
              color: C.muted,
              marginTop: 12,
              opacity: c,
              transform: `translateY(${(1 - c) * 18}px)`,
            }}
          >
            4x200m freestyle relay heat · China's bronze
          </div>
        </div>
      </Overlay>
    </BedChain>
  );
};
