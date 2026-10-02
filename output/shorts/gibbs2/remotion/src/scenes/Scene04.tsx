import React from 'react';
import {useCurrentFrame} from 'remotion';
import {SceneBed} from '../components/Bed';
import {band} from '../components/base';
import {Caption} from '../components/Caption';
import {C, FONT, cardStyle, labelStyle} from '../theme';
import {SCENE4_CUTS} from '../footage';

export const S04_DUR = 45; // 6.42 -> 7.94s

// A short scene, so the plate animates in fast and is already clearing before the cut.
const PLATE_WIN: [number, number, number, number] = [3, 12, 26, 38];

/** Sits high, clear of the caption line. */
const NextUpPlate: React.FC = () => {
  const frame = useCurrentFrame();
  const k = band(frame, ...PLATE_WIN);
  if (k <= 0.001) return null;
  return (
    <div
      style={{
        position: 'absolute',
        left: 130,
        top: 470,
        width: 820,
        opacity: k,
        transform: `translateY(${(1 - k) * 20}px)`,
        ...cardStyle({radius: 18, pad: 30}),
        borderLeft: `5px solid ${C.emerald}`,
      }}
    >
      <div style={{...labelStyle(18), color: C.emerald}}>Next up</div>
      <div style={{fontFamily: FONT, fontSize: 50, fontWeight: 800, color: C.text, letterSpacing: -2, lineHeight: 1.05, marginTop: 10}}>
        Gateway
      </div>
      <div style={{fontFamily: FONT, fontSize: 20, fontWeight: 500, color: C.muted, marginTop: 10, lineHeight: 1.3}}>
        World Wide Technology Raceway
      </div>
    </div>
  );
};

/** Scene 4 — the turn towards the next race. */
export const Scene04: React.FC = () => (
  <>
    <SceneBed {...SCENE4_CUTS[0]} dur={S04_DUR} wins={[]} amp={0.06} />
    <NextUpPlate />
    <Caption text="Now, with GATEWAY next," outAt={S04_DUR - 2} fontSize={46} />
  </>
);
