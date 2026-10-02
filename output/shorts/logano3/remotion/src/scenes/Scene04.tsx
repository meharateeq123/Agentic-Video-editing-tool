import React from 'react';
import {Easing, interpolate, useCurrentFrame} from 'remotion';
import {Overlay, winK, type Win} from '../components/Bed';
import {Caption} from '../components/Caption';
import {C, FONT, cardStyle, labelStyle, numStyle} from '../theme';
import {SCENE4_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S04_DUR = 127; // 14.0 -> 18.23s

const CUT_FRAMES = [64, 63];

// "51" lands at 16.84s = scene frame 85; "Hamlin." ends 18.1s = frame 123. The card's fall is
// compressed into the scene's own tail (118-127) since there isn't a full second to spare.
const CARD_WIN: Win = [6, 18, 118, 127];

const GapCard: React.FC = () => {
  const frame = useCurrentFrame();
  const k = winK(frame, CARD_WIN);
  const numK = interpolate(frame, [73, 85], [0, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return (
    <Overlay k={k} rise={20}>
      <div style={{position: 'absolute', left: 110, top: 1000, width: 860, ...cardStyle({radius: 22, pad: 28}), borderLeft: `5px solid ${C.red}`}}>
        <div style={{...labelStyle(18), color: C.muted}}>Chase Standings — Next: Bristol</div>
        <div style={{display: 'flex', alignItems: 'baseline', gap: 20, marginTop: 12, opacity: numK, transform: `translateY(${(1 - numK) * 14}px)`}}>
          <div style={numStyle(96, C.red)}>51</div>
          <div style={{fontFamily: FONT, fontSize: 26, fontWeight: 700, color: C.text, letterSpacing: -0.5}}>points behind Denny Hamlin</div>
        </div>
      </div>
    </Overlay>
  );
};

export const Scene04: React.FC = () => (
  <>
    <Cuts cuts={SCENE4_CUTS} frames={CUT_FRAMES} wins={[CARD_WIN]} amp={0.06} maxBlur={12} dim={0.3} />
    <GapCard />
    <Caption text="Now BRISTOL is next, and Logano is still 51 points behind Hamlin." outAt={S04_DUR - 4} fontSize={40} />
  </>
);
