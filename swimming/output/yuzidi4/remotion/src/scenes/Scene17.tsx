import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C, FONT} from '../theme';
import {BedChain} from '../components/BedChain';
import {Overlay, winK, type Win} from '../components/Bed';
import {ease} from '../components/base';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S17_DUR = mountedFrames(17);

/**
 * Scene 17 - "That collision course could arrive as early as the 2027 World Championships in
 * Budapest... Beyond that sits the Los Angeles 2028 Olympics." Three dates are hard to track by ear
 * alone, so this scene carries one light route strip - no card, no photo.
 */
const WR: Win = [40, 60, 780, 806];

const STOPS = [
  {city: 'TOKYO 2026', sub: 'Now'},
  {city: 'BUDAPEST 2027', sub: 'World Championships'},
  {city: 'LOS ANGELES 2028', sub: 'Olympic Games'},
];

export const Scene17: React.FC = () => {
  const frame = useCurrentFrame();
  const kR = winK(frame, WR);
  return (
    <BedChain segs={chain(17)} dur={S17_DUR} wins={[WR]} amp={0.05} maxBlur={0} dim={0}>
      <Overlay k={kR} rise={20}>
        <div style={{position: 'absolute', left: 0, right: 0, bottom: 130, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0}}>
          {STOPS.map((s, i) => {
            const e = ease(frame, 44 + i * 16, 60 + i * 16);
            return (
              <React.Fragment key={s.city}>
                {i > 0 ? (
                  <div style={{width: 70, height: 2, background: C.hairlineStrong, opacity: e, marginTop: -18}} />
                ) : null}
                <div style={{opacity: e, transform: `translateY(${(1 - e) * 16}px)`, textAlign: 'center', minWidth: 210}}>
                  <div style={{width: 12, height: 12, borderRadius: 6, background: i === 0 ? C.text : C.amber, margin: '0 auto 8px'}} />
                  <div style={{fontFamily: FONT, fontSize: 22, fontWeight: 800, color: C.text}}>{s.city}</div>
                  <div style={{fontFamily: FONT, fontSize: 15, fontWeight: 600, color: C.muted, marginTop: 3}}>{s.sub}</div>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </Overlay>
    </BedChain>
  );
};
