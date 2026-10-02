import React from 'react';
import {useCurrentFrame} from 'remotion';
import {SceneBed, Overlay, winK, type Win} from '../components/Bed';
import {Caption} from '../components/Caption';
import {C, FONT} from '../theme';
import {SCENE5_CUTS} from '../footage';

export const S05_DUR = 77; // 16.60 -> 19.16s

const CARD_WIN: Win = [6, 20, 52, 70];

const LegacyBadge: React.FC = () => {
  const frame = useCurrentFrame();
  const k = winK(frame, CARD_WIN);
  return (
    <Overlay k={k} rise={18}>
      <div
        style={{
          position: 'absolute',
          left: 130,
          top: 700,
          padding: '26px 32px',
          background: C.card,
          border: `1px solid ${C.hairline}`,
          borderRadius: 16,
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          boxShadow: '0 24px 70px rgba(0,0,0,0.55)',
        }}
      >
        <div style={{fontFamily: FONT, fontWeight: 700, fontSize: 20, color: C.emerald, letterSpacing: 1.2, textTransform: 'uppercase'}}>
          A fresh start
        </div>
        <div style={{fontFamily: FONT, fontWeight: 900, fontSize: 40, color: '#ffffff', marginTop: 4}}>
          Legacy Motor Club
        </div>
      </div>
    </Overlay>
  );
};

export const Scene05: React.FC = () => (
  <>
    <SceneBed {...SCENE5_CUTS[0]} dur={S05_DUR} wins={[CARD_WIN]} amp={0.06} maxBlur={12} dim={0.3}>
      <LegacyBadge />
    </SceneBed>
    <Caption text="Now he gets a fresh start with Legacy Motor Club." outAt={S05_DUR - 4} fontSize={44} />
  </>
);
