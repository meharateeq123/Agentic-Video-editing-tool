import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C, FONT, cardStyle, labelStyle} from '../theme';
import {BedChain} from '../components/BedChain';
import {Overlay, winK, type Win} from '../components/Bed';
import {ease} from '../components/base';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S14_DUR = mountedFrames(14);

/**
 * Scene 14 — "Before Darlington, Bell was sitting sixth in the reseeded Chase standings. After it,
 * he jumped straight to second place, now just 12 points behind Denny Hamlin."
 *
 * A rank-change ticker: the old position, the move, the new one. It is the only graphic in the film
 * built around a change in a number rather than the number itself, which is exactly what the line
 * is about — the jump, not the position.
 */
const W: Win = [40, 64, 150, 178];

export const Scene14: React.FC = () => {
  const frame = useCurrentFrame();
  const k = winK(frame, W);
  const from = ease(frame, 46, 74);
  const arrow = ease(frame, 78, 112);
  const to = ease(frame, 104, 134);
  const gap = ease(frame, 138, 168);

  const slot = (label: string, value: string, o: number, accent: string) => (
    <div
      style={{
        ...cardStyle({radius: 16, pad: 28}),
        width: 300,
        textAlign: 'center',
        opacity: o,
        transform: `translateY(${(1 - o) * 22}px)`,
        borderTop: `3px solid ${accent}`,
      }}
    >
      <div style={{...labelStyle(16), color: C.muted}}>{label}</div>
      <div
        style={{
          fontFamily: FONT,
          fontSize: 104,
          fontWeight: 800,
          color: C.text,
          letterSpacing: -4,
          lineHeight: 1,
          marginTop: 10,
        }}
      >
        {value}
      </div>
    </div>
  );

  return (
    <BedChain segs={chain(14)} dur={S14_DUR} wins={[W]} amp={0.08} maxBlur={15} dim={0.46}>
      <Overlay k={k} rise={18}>
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 330,
            width: 1920,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 40,
          }}
        >
          {slot('Before Darlington', '6th', from, C.steel)}
          <div
            style={{
              fontFamily: FONT,
              fontSize: 76,
              fontWeight: 800,
              color: C.emerald,
              opacity: arrow,
              transform: `translateX(${(1 - arrow) * -20}px)`,
            }}
          >
            →
          </div>
          {slot('After Darlington', '2nd', to, C.emerald)}
        </div>
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 620,
            width: 1920,
            display: 'flex',
            justifyContent: 'center',
            opacity: gap,
            transform: `translateY(${(1 - gap) * 18}px)`,
          }}
        >
          <div style={{...cardStyle({radius: 14, pad: 26}), textAlign: 'center'}}>
            <div style={{fontFamily: FONT, fontSize: 30, fontWeight: 600, color: C.muted}}>
              Now just{' '}
              <span style={{color: C.amber, fontWeight: 800, fontSize: 40}}>12 points</span> behind
              Denny Hamlin
            </div>
          </div>
        </div>
      </Overlay>
    </BedChain>
  );
};
