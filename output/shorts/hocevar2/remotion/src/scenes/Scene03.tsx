import React from 'react';
import {Sequence, interpolate, useCurrentFrame} from 'remotion';
import {Overlay, winK, type Win} from '../components/Bed';
import {Caption} from '../components/Caption';
import {C, FONT, cardStyle, labelStyle, numStyle} from '../theme';
import {SCENE3_CUTS} from '../footage';
import {Cuts} from './Cuts';
import {pop, slam} from './pop';

export const S03_DUR = 104; // 8.64 -> 12.10s
export const S03_CUTS = [34, 35, 35];

// "gained" at 9.92s (f38): 12TH pops. "three positions" (f46-68): the arrow grows and 9TH slams in
// at 52, settling at 62, so out0 = 62 + 30.
export const S03_POPS = [38];
export const S03_SLAM_AT = 52;
const CARD_WIN: Win = [36, 40, 92, 104];

/** Chase position before and after Gateway. */
const ClimbCard: React.FC = () => {
  const frame = useCurrentFrame();
  const k = winK(frame, CARD_WIN);
  const a = pop(frame, S03_POPS[0]);
  const b = slam(frame, S03_SLAM_AT);
  const arrow = interpolate(frame, [44, 52], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <Overlay k={k} rise={0}>
      <div style={{position: 'absolute', left: 110, top: 940, width: 860, ...cardStyle({radius: 24, pad: 26}), borderLeft: `6px solid ${C.emerald}`}}>
        <div style={{...labelStyle(18), color: C.emerald}}>Chase standings</div>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 14}}>
          <div style={{textAlign: 'center', opacity: a.k, transform: `scale(${a.s})`}}>
            <div style={numStyle(110, C.muted)}>12th</div>
            <div style={{fontFamily: FONT, fontSize: 22, fontWeight: 700, color: C.muted}}>Before</div>
          </div>
          <div style={{flex: 1, margin: '0 26px', position: 'relative', height: 16}}>
            <div style={{position: 'absolute', left: 0, top: 5, height: 6, width: `${arrow * 100}%`, background: C.emerald, borderRadius: 3}} />
            <div style={{position: 'absolute', left: `calc(${arrow * 100}% - 14px)`, top: -6, fontSize: 28, color: C.emerald, opacity: arrow, fontFamily: FONT, fontWeight: 900}}>
              ▶
            </div>
            <div style={{position: 'absolute', left: 0, right: 0, top: -48, textAlign: 'center', fontFamily: FONT, fontSize: 30, fontWeight: 900, color: C.emerald, opacity: arrow}}>
              +3
            </div>
          </div>
          <div style={{textAlign: 'center', opacity: b.k, transform: `scale(${b.s})`}}>
            <div style={numStyle(110, C.emerald)}>9th</div>
            <div style={{fontFamily: FONT, fontSize: 22, fontWeight: 700, color: C.emerald}}>Now</div>
          </div>
        </div>
      </div>
    </Overlay>
  );
};

export const Scene03: React.FC = () => (
  <>
    <Cuts cuts={SCENE3_CUTS} frames={S03_CUTS} wins={[CARD_WIN]} amp={0.06} maxBlur={6} dim={0.2} />
    <ClimbCard />
    <Sequence from={0} durationInFrames={30} layout="none">
      <Caption text="EVEN CRAZIER," inAt={0} outAt={24} fontSize={70} />
    </Sequence>
    <Sequence from={30} durationInFrames={74} layout="none">
      <Caption text="he GAINED THREE POSITIONS in the championship standings." outAt={62} fontSize={50} />
    </Sequence>
  </>
);
