import React from 'react';
import {Sequence, useCurrentFrame} from 'remotion';
import {Overlay, winK, type Win} from '../components/Bed';
import {Caption} from '../components/Caption';
import {C, FONT, cardStyle, labelStyle, numStyle} from '../theme';
import {SCENE2_CUTS} from '../footage';
import {Cuts} from './Cuts';
import {pop, slam} from './pop';

export const S02_DUR = 100; // 5.30 -> 8.64s
export const S02_CUTS = [50, 50];

// "eighth" at 6.06s (f23): P8 slams in. "10th top-10" at 7.20s (f57): the second tile pops and
// settles at 71, so out0 = 71 + 30.
export const S02_SLAM_AT = 23;
export const S02_POPS = [57];
const CARD_WIN: Win = [18, 24, 100, 110];

/** The finish and what it meant for his season. */
const ResultCard: React.FC = () => {
  const frame = useCurrentFrame();
  const k = winK(frame, CARD_WIN);
  const s = slam(frame, S02_SLAM_AT);
  const p = pop(frame, S02_POPS[0]);
  const tile = {flex: 1, padding: '20px 22px', borderRadius: 20, background: 'rgba(255,255,255,0.07)'};
  return (
    <Overlay k={k} rise={0}>
      <div style={{position: 'absolute', left: 110, top: 940, width: 860, ...cardStyle({radius: 24, pad: 26}), borderLeft: `6px solid ${C.emerald}`}}>
        <div style={{...labelStyle(18), color: C.emerald}}>Gateway result</div>
        <div style={{display: 'flex', gap: 18, marginTop: 16}}>
          <div style={{...tile, opacity: s.k, transform: `scale(${s.s})`}}>
            <div style={numStyle(110, C.emerald)}>P8</div>
            <div style={{fontFamily: FONT, fontSize: 24, fontWeight: 700, color: C.muted, marginTop: 8}}>Finish</div>
          </div>
          <div style={{...tile, opacity: p.k, transform: `scale(${p.s})`}}>
            <div style={numStyle(110, C.text)}>10th</div>
            <div style={{fontFamily: FONT, fontSize: 24, fontWeight: 700, color: C.muted, marginTop: 8}}>Top-10 of 2026</div>
          </div>
        </div>
      </div>
    </Overlay>
  );
};

export const Scene02: React.FC = () => (
  <>
    <Cuts cuts={SCENE2_CUTS} frames={S02_CUTS} wins={[CARD_WIN]} amp={0.06} maxBlur={6} dim={0.2} />
    <ResultCard />
    <Sequence from={0} durationInFrames={40} layout="none">
      <Caption text="He finished EIGHTH," outAt={32} fontSize={64} />
    </Sequence>
    <Sequence from={40} durationInFrames={60} layout="none">
      <Caption text="giving him his 10TH TOP-10 of the season." outAt={48} fontSize={54} />
    </Sequence>
  </>
);
