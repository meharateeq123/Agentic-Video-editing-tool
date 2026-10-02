import React from 'react';
import {Img, staticFile, useCurrentFrame} from 'remotion';
import {SceneBed} from '../components/Bed';
import {band} from '../components/base';
import {Caption} from '../components/Caption';
import {C, FONT, cardStyle, labelStyle} from '../theme';
import {SCENE6_CUTS, BERRY_ID} from '../footage';

export const S06_DUR = 60; // 19.08 -> 21.06s

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
        src={staticFile(BERRY_ID)}
        style={{width: 190, height: 190, objectFit: 'cover', alignSelf: 'center', margin: 18, borderRadius: 14}}
      />
      <div style={{padding: '26px 30px 26px 6px', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
        <div style={{...labelStyle(17), color: C.emerald}}>2027</div>
        <div style={{fontFamily: FONT, fontSize: 48, fontWeight: 800, color: C.text, letterSpacing: -2, lineHeight: 1.05, marginTop: 8}}>
          Josh Berry
        </div>
        <div style={{fontFamily: FONT, fontSize: 19, fontWeight: 500, color: C.muted, marginTop: 8, lineHeight: 1.3}}>
          Legacy Motor Club No. 42
        </div>
      </div>
    </div>
  );
};

/** Scene 6 — the button. Real footage, Berry's ID card once more as a bookend. */
export const Scene06: React.FC = () => (
  <>
    <SceneBed {...SCENE6_CUTS[0]} dur={S06_DUR} wins={[]} amp={0.06} />
    <IdCard />
    <Caption text="Could this be the move that changes Berry's career?" outAt={S06_DUR - 2} fontSize={44} />
  </>
);
