import React from 'react';
import {useCurrentFrame} from 'remotion';
import {SceneBed, Overlay, winK, type Win} from '../components/Bed';
import {Caption} from '../components/Caption';
import {C, FONT, capStyle, labelStyle, numStyle} from '../theme';
import {SCENE3_CUTS} from '../footage';

export const S03_DUR = 69; // 4.14 -> 6.42s

const CARD_WIN: Win = [6, 19, 40, 58];

const GapCard: React.FC = () => {
  const frame = useCurrentFrame();
  const k = winK(frame, CARD_WIN);
  return (
    <Overlay k={k} rise={20}>
      <div
        style={{
          position: 'absolute',
          left: 130,
          top: 640,
          width: 820,
          background: C.card,
          border: `1px solid ${C.hairline}`,
          borderLeft: `5px solid ${C.amber}`,
          borderRadius: 18,
          padding: 34,
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          boxShadow: '0 24px 70px rgba(0,0,0,0.55)',
        }}
      >
        <div style={{...labelStyle(19), color: C.amber}}>Behind the Chase leader</div>
        <div style={{display: 'flex', alignItems: 'baseline', gap: 18, marginTop: 12}}>
          <div style={numStyle(148, C.text)}>39</div>
          <div style={{fontFamily: FONT, fontSize: 44, fontWeight: 800, color: C.muted, letterSpacing: -1}}>points</div>
        </div>
        <div style={{...capStyle(24), marginTop: 12}}>Denny Hamlin leads the playoff standings</div>
      </div>
    </Overlay>
  );
};

/** Scene 3 — the gap, as one number. */
export const Scene03: React.FC = () => (
  <>
    <SceneBed {...SCENE3_CUTS[0]} dur={S03_DUR} wins={[CARD_WIN]} amp={0.06} maxBlur={12} dim={0.32}>
      <GapCard />
    </SceneBed>
    <Caption text="behind Denny Hamlin in the playoff standings." outAt={S03_DUR - 3} fontSize={42} />
  </>
);
