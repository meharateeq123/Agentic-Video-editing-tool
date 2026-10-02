import React from 'react';
import {Img, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {SceneBed} from '../components/Bed';
import {FadeIn, band} from '../components/base';
import {Caption} from '../components/Caption';
import {C, FONT, cardStyle, labelStyle} from '../theme';
import {SCENE6_CUTS, BERRY_ID} from '../footage';

export const S06_DUR = 101; // 19.16 -> 22.52s

const CUT_FRAMES = [51, 50];

// Bookend card, on the closing Berry cut.
const CARD_WIN: [number, number, number, number] = [58, 70, 88, 100];

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
        src={staticFile(BERRY_ID)}
        style={{width: 190, height: 190, objectFit: 'cover', alignSelf: 'center', margin: 18, borderRadius: 14}}
      />
      <div style={{padding: '26px 30px 26px 6px', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
        <div style={{...labelStyle(17), color: C.emerald}}>2027</div>
        <div style={{fontFamily: FONT, fontSize: 50, fontWeight: 800, color: C.text, letterSpacing: -2, lineHeight: 1.05, marginTop: 8}}>
          Josh Berry
        </div>
        <div style={{fontFamily: FONT, fontSize: 19, fontWeight: 500, color: C.muted, marginTop: 8, lineHeight: 1.3}}>
          Legacy Motor Club No. 42
        </div>
      </div>
    </div>
  );
};

export const Scene06: React.FC = () => {
  let from = 0;
  return (
    <>
      {CUT_FRAMES.map((dur, i) => {
        const isFirst = i === 0;
        const seq = (
          <Sequence key={i} from={from} durationInFrames={dur} layout="none">
            <FadeIn len={isFirst ? 0 : 6} skip={isFirst}>
              <SceneBed {...SCENE6_CUTS[i]} dur={dur} wins={[]} amp={0.06} />
            </FadeIn>
          </Sequence>
        );
        from += dur;
        return seq;
      })}
      <IdCard />
      <Caption text="Could this move finally turn Josh Berry into a NASCAR star?" outAt={S06_DUR - 3} fontSize={42} />
    </>
  );
};
