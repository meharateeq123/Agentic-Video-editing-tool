import React from 'react';
import {Img, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {SceneBed} from '../components/Bed';
import {FadeIn, band} from '../components/base';
import {Caption} from '../components/Caption';
import {C, FONT, cardStyle, labelStyle} from '../theme';
import {SCENE3_CUTS, HOCEVAR_ID} from '../footage';

export const S03_DUR = 120; // 8.16 -> 12.18s

const CUT_FRAMES = [60, 60];

// Card lands on the Hocevar cut — the man being warned — and clears before the scene ends.
const CARD_WIN: [number, number, number, number] = [66, 80, 100, 114];

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
        src={staticFile(HOCEVAR_ID)}
        style={{width: 190, height: 190, objectFit: 'cover', alignSelf: 'center', margin: 18, borderRadius: 14}}
      />
      <div style={{padding: '26px 30px 26px 6px', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
        <div style={{...labelStyle(17), color: C.red}}>"Watch out"</div>
        <div style={{fontFamily: FONT, fontSize: 48, fontWeight: 800, color: C.text, letterSpacing: -2, lineHeight: 1.05, marginTop: 8}}>
          Carson Hocevar
        </div>
        <div style={{fontFamily: FONT, fontSize: 19, fontWeight: 500, color: C.muted, marginTop: 8, lineHeight: 1.3}}>
          No. 77 — Spire Motorsports
        </div>
      </div>
    </div>
  );
};

/** Scene 3 — the warning itself: Keselowski talking, then Hocevar, named by his own card. */
export const Scene03: React.FC = () => {
  let from = 0;
  return (
    <>
      {CUT_FRAMES.map((dur, i) => {
        const isFirst = i === 0;
        const seq = (
          <Sequence key={i} from={from} durationInFrames={dur} layout="none">
            <FadeIn len={isFirst ? 0 : 6} skip={isFirst}>
              <SceneBed {...SCENE3_CUTS[i]} dur={dur} wins={[]} amp={0.07} />
            </FadeIn>
          </Sequence>
        );
        from += dur;
        return seq;
      })}
      <IdCard />
      <Caption
        text="He even told Hocevar to WATCH OUT — hinting payback could be coming."
        outAt={S03_DUR - 4}
        fontSize={40}
      />
    </>
  );
};
