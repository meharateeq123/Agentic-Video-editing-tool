import React from 'react';
import {Img, staticFile, useCurrentFrame} from 'remotion';
import {band} from '../components/base';
import {Caption} from '../components/Caption';
import {C, FONT, cardStyle, labelStyle} from '../theme';
import {LARSON_ID, SCENE2_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S02_DUR = 102; // 2.20 -> 5.60s

const CUT_FRAMES = [51, 51];

// Card is complete at 17; out0 = 17 + 30.
const CARD_WIN: [number, number, number, number] = [6, 17, 47, 63];

/** Sits low, under the car and the window celebration. */
const IdCard: React.FC = () => {
  const frame = useCurrentFrame();
  const k = band(frame, ...CARD_WIN);
  if (k <= 0.001) return null;
  return (
    <div
      style={{
        position: 'absolute',
        left: 130,
        top: 1130,
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
        src={staticFile(LARSON_ID)}
        style={{width: 190, height: 190, objectFit: 'cover', alignSelf: 'center', margin: 18, borderRadius: 14}}
      />
      <div style={{padding: '26px 30px 26px 6px', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
        <div style={{...labelStyle(17), color: C.amber}}>Winner — Gateway</div>
        <div style={{fontFamily: FONT, fontSize: 46, fontWeight: 800, color: C.text, letterSpacing: -2, lineHeight: 1.05, marginTop: 8}}>
          Kyle Larson
        </div>
        <div style={{fontFamily: FONT, fontSize: 19, fontWeight: 500, color: C.muted, marginTop: 8, lineHeight: 1.3}}>
          No. 5 Hendrick Chevrolet — double overtime
        </div>
      </div>
    </div>
  );
};

export const Scene02: React.FC = () => (
  <>
    <Cuts cuts={SCENE2_CUTS} frames={CUT_FRAMES} amp={0.06} />
    <IdCard />
    <Caption text="Larson finally BROKE THROUGH at Gateway with a HUGE overtime victory." outAt={S02_DUR - 4} fontSize={42} />
  </>
);
