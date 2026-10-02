import React from 'react';
import {Img, staticFile, useCurrentFrame} from 'remotion';
import {SceneBed} from '../components/Bed';
import {band} from '../components/base';
import {Caption} from '../components/Caption';
import {C, FONT, cardStyle, labelStyle} from '../theme';
import {SCENE1_CUTS, BLANEY_ID} from '../footage';

export const S01_DUR = 53; // 0.00 -> 1.78s

// Card is complete at 14; out0 = 14 + 30. The fade runs into the transition bleed (53 + 10).
const CARD_WIN: [number, number, number, number] = [3, 14, 44, 60];

/** Sits low: the bed is a face close-up, so a mid-frame card would cover his eyes. */
const IdCard: React.FC = () => {
  const frame = useCurrentFrame();
  const k = band(frame, ...CARD_WIN);
  if (k <= 0.001) return null;
  return (
    <div
      style={{
        position: 'absolute',
        left: 130,
        top: 1150,
        width: 820,
        display: 'flex',
        alignItems: 'stretch',
        opacity: k,
        transform: `translateY(${(1 - k) * 22}px)`,
        ...cardStyle({radius: 20, pad: 0}),
        borderLeft: `5px solid ${C.amber}`,
        overflow: 'hidden',
      }}
    >
      <Img
        src={staticFile(BLANEY_ID)}
        style={{width: 190, height: 190, objectFit: 'cover', alignSelf: 'center', margin: 18, borderRadius: 14}}
      />
      <div style={{padding: '26px 30px 26px 6px', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
        <div style={{...labelStyle(17), color: C.amber}}>Qualified P3 — Gateway</div>
        <div style={{fontFamily: FONT, fontSize: 46, fontWeight: 800, color: C.text, letterSpacing: -2, lineHeight: 1.05, marginTop: 8}}>
          Ryan Blaney
        </div>
        <div style={{fontFamily: FONT, fontSize: 19, fontWeight: 500, color: C.muted, marginTop: 8, lineHeight: 1.3}}>
          No. 12 — Team Penske Ford
        </div>
      </div>
    </div>
  );
};

export const Scene01: React.FC = () => (
  <>
    <SceneBed {...SCENE1_CUTS[0]} dur={S01_DUR} wins={[]} amp={0.06} />
    <IdCard />
    <Caption text="Blaney qualified THIRD at Gateway..." outAt={S01_DUR - 3} fontSize={50} />
  </>
);
