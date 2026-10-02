import React from 'react';
import {Img, staticFile, useCurrentFrame} from 'remotion';
import {SceneBed} from '../components/Bed';
import {band} from '../components/base';
import {Caption} from '../components/Caption';
import {C, FONT, cardStyle, labelStyle} from '../theme';
import {SCENE2_CUTS, GIBBS_ID} from '../footage';

export const S02_DUR = 68; // 1.85 -> 4.14s

const CARD_WIN: [number, number, number, number] = [6, 20, 42, 60];

/** Sits low: the bed under it is a face close-up, so a mid-frame card would cover his eyes. */
const IdCard: React.FC = () => {
  const frame = useCurrentFrame();
  const k = band(frame, ...CARD_WIN);
  if (k <= 0.001) return null;
  return (
    <div
      style={{
        position: 'absolute',
        left: 130,
        top: 1180,
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
        src={staticFile(GIBBS_ID)}
        style={{width: 190, height: 190, objectFit: 'cover', alignSelf: 'center', margin: 18, borderRadius: 14}}
      />
      <div style={{padding: '26px 30px 26px 6px', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
        <div style={{...labelStyle(17), color: C.muted}}>Runner-up at Darlington</div>
        <div style={{fontFamily: FONT, fontSize: 52, fontWeight: 800, color: C.text, letterSpacing: -2, lineHeight: 1.05, marginTop: 8}}>
          Ty Gibbs
        </div>
        <div style={{fontFamily: FONT, fontSize: 19, fontWeight: 500, color: C.muted, marginTop: 8, lineHeight: 1.3}}>
          No. 54 — Joe Gibbs Racing Toyota
        </div>
      </div>
    </div>
  );
};

/** Scene 2 — who the "young star" is, stated with a real face under a real name. */
export const Scene02: React.FC = () => (
  <>
    <SceneBed {...SCENE2_CUTS[0]} dur={S02_DUR} wins={[]} amp={0.06} />
    <IdCard />
    <Caption text="...the young star moved to just 39 points" outAt={S02_DUR - 3} fontSize={44} />
  </>
);
