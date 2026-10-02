import React from 'react';
import {Img, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {SceneBed} from '../components/Bed';
import {FadeIn, band} from '../components/base';
import {Caption} from '../components/Caption';
import {C, FONT, cardStyle, labelStyle} from '../theme';
import {SCENE1_CUTS, CLEETUS_ID} from '../footage';

export const S01_DUR = 113; // 0.00 -> 3.78s

const CUT_FRAMES = [57, 56];

const CARD_WIN: [number, number, number, number] = [8, 22, 46, 56];

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
        <div style={{...labelStyle(17), color: C.muted}}>NASCAR 26</div>
        <div style={{fontFamily: FONT, fontSize: 48, fontWeight: 800, color: C.text, letterSpacing: -2, lineHeight: 1.05, marginTop: 8}}>
          Cleetus McFarland
        </div>
        <div style={{fontFamily: FONT, fontSize: 19, fontWeight: 500, color: C.muted, marginTop: 8, lineHeight: 1.3}}>
          No. 30 — ARCA Menards Series
        </div>
      </div>
    </div>
  );
};

/** Scene 1 — the hook. Real Talladega footage, an ID card naming Cleetus over it. */
export const Scene01: React.FC = () => {
  let from = 0;
  return (
    <>
      {CUT_FRAMES.map((dur, i) => {
        const isFirst = i === 0;
        const seq = (
          <Sequence key={i} from={from} durationInFrames={dur} layout="none">
            <FadeIn len={isFirst ? 0 : 6} skip={isFirst}>
              <SceneBed {...SCENE1_CUTS[i]} dur={dur} wins={[]} amp={0.07} />
            </FadeIn>
          </Sequence>
        );
        from += dur;
        return seq;
      })}
      <IdCard />
      <Caption text="Cleetus McFarland JUST got a huge NASCAR 26 reveal!" outAt={S01_DUR - 3} fontSize={44} />
    </>
  );
};
