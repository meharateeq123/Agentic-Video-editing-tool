import React from 'react';
import {Easing, interpolate, useCurrentFrame} from 'remotion';
import {SceneBed, Overlay, winK, type Win} from '../components/Bed';
import {Caption} from '../components/Caption';
import {C, FONT, cardStyle, labelStyle, numStyle} from '../theme';
import {SCENE1_CUTS} from '../footage';

export const S01_DUR = 66; // 0.00 -> 2.20s

// The count lands at 16; out0 = 16 + 30. The fade runs into the transition bleed (66 + 10).
const CARD_WIN: Win = [3, 14, 46, 62];

/** The drought, as a number: 51 Cup races without a win (NASCAR.com recap). */
const DroughtCard: React.FC = () => {
  const frame = useCurrentFrame();
  const k = winK(frame, CARD_WIN);
  const count = Math.round(
    interpolate(frame, [4, 16], [0, 51], {easing: Easing.out(Easing.cubic), extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})
  );
  return (
    <Overlay k={k} rise={20}>
      <div
        style={{
          position: 'absolute',
          left: 170,
          top: 980,
          width: 740,
          textAlign: 'center',
          ...cardStyle({radius: 22, pad: 34}),
          borderTop: `5px solid ${C.red}`,
        }}
      >
        <div style={{...labelStyle(18), color: C.red}}>Cup winless streak</div>
        <div style={{display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 18, marginTop: 14}}>
          <div style={numStyle(150, C.text)}>{count}</div>
          <div style={{fontFamily: FONT, fontSize: 52, fontWeight: 800, color: C.text, letterSpacing: -1.5}}>races</div>
        </div>
        <div style={{fontFamily: FONT, fontSize: 24, fontWeight: 600, color: C.muted, marginTop: 12}}>
          Kyle Larson — snapped at Gateway
        </div>
      </div>
    </Overlay>
  );
};

export const Scene01: React.FC = () => (
  <>
    <SceneBed {...SCENE1_CUTS[0]} dur={S01_DUR} wins={[CARD_WIN]} amp={0.06} maxBlur={10} dim={0.25} />
    <DroughtCard />
    <Caption text="After going WINLESS for more than a year..." outAt={S01_DUR - 3} fontSize={50} />
  </>
);
