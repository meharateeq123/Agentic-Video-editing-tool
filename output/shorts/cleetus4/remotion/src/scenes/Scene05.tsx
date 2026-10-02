import React from 'react';
import {Img, staticFile, useCurrentFrame} from 'remotion';
import {SceneBed} from '../components/Bed';
import {band} from '../components/base';
import {Caption} from '../components/Caption';
import {C, FONT, cardStyle, labelStyle} from '../theme';
import {SCENE5_CUTS, CLEETUS_ID} from '../footage';

export const S05_DUR = 60; // 18.68 -> 20.68s

const CARD_WIN: [number, number, number, number] = [6, 18, 42, 60];

const IdCard: React.FC = () => {
  const frame = useCurrentFrame();
  const k = band(frame, ...CARD_WIN);
  if (k <= 0.001) return null;
  return (
    <div
      style={{
        position: 'absolute',
        left: 130,
        top: 560,
        width: 820,
        display: 'flex',
        alignItems: 'stretch',
        opacity: k,
        transform: `translateY(${(1 - k) * 22}px)`,
        ...cardStyle({radius: 20, pad: 0}),
        overflow: 'hidden',
      }}
    >
      <Img
        src={staticFile(CLEETUS_ID)}
        style={{width: 190, height: 190, objectFit: 'cover', alignSelf: 'center', margin: 18, borderRadius: 14}}
      />
      <div style={{padding: '26px 30px 26px 6px', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
        <div style={{...labelStyle(17), color: C.emerald}}>NASCAR 26</div>
        <div style={{fontFamily: FONT, fontSize: 52, fontWeight: 800, color: C.text, letterSpacing: -2, lineHeight: 1.05, marginTop: 8}}>
          Cleetus is back
        </div>
      </div>
    </div>
  );
};

/** Scene 5 — the button. Real footage, Cleetus's ID card once more as a bookend. */
export const Scene05: React.FC = () => (
  <>
    <SceneBed {...SCENE5_CUTS[0]} dur={S05_DUR} wins={[]} amp={0.06} />
    <IdCard />
    <Caption text="Cleetus is back!" outAt={S05_DUR - 2} fontSize={52} />
  </>
);
