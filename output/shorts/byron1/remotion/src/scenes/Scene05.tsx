import React from 'react';
import {Sequence, useCurrentFrame} from 'remotion';
import {SceneBed, Overlay, winK, type Win} from '../components/Bed';
import {FadeIn} from '../components/base';
import {Caption} from '../components/Caption';
import {C, FONT, labelStyle} from '../theme';
import {SCENE5_CUTS} from '../footage';

export const S05_DUR = 102; // 12.07 -> 15.48s

const CUT_FRAMES = [51, 51];

const CARD_WIN: Win = [7, 20, 36, 49];

const gapRow = (label: string, value: string, sub: string, accent: string) => (
  <div
    key={label}
    style={{display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginTop: 16}}
  >
    <div style={{fontFamily: FONT, fontWeight: 800, fontSize: 34, color: C.text, letterSpacing: -1}}>{label}</div>
    <div style={{display: 'flex', alignItems: 'baseline', gap: 12}}>
      <div style={{fontFamily: FONT, fontWeight: 900, fontSize: 44, color: accent, fontVariantNumeric: 'tabular-nums'}}>
        {value}
      </div>
      <div style={{fontFamily: FONT, fontWeight: 500, fontSize: 20, color: C.muted}}>{sub}</div>
    </div>
  </div>
);

const GapCard: React.FC = () => {
  const frame = useCurrentFrame();
  const k = winK(frame, CARD_WIN);
  return (
    <Overlay k={k} rise={20}>
      <div
        style={{
          position: 'absolute',
          left: 130,
          top: 620,
          width: 820,
          background: C.card,
          border: `1px solid ${C.hairline}`,
          borderLeft: `5px solid ${C.amber}`,
          borderRadius: 18,
          padding: 32,
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          boxShadow: '0 24px 70px rgba(0,0,0,0.55)',
        }}
      >
        <div style={{...labelStyle(19), color: C.amber}}>The hole he is in</div>
        {gapRow('Behind Hamlin', '114', 'points', C.red as string)}
        {gapRow('Races left', '9', 'to go', C.text as string)}
      </div>
    </Overlay>
  );
};

/** Scene 5 — the gap, on the card and in the caption at once. */
export const Scene05: React.FC = () => {
  let from = 0;
  return (
    <>
      {CUT_FRAMES.map((dur, i) => {
        const isFirst = i === 0;
        const isLast = i === CUT_FRAMES.length - 1;
        const seq = (
          <Sequence key={i} from={from} durationInFrames={dur} layout="none">
            <FadeIn len={isFirst ? 0 : 6} skip={isFirst}>
              <SceneBed
                {...SCENE5_CUTS[i]}
                dur={dur}
                wins={isLast ? [CARD_WIN] : []}
                amp={0.06}
                maxBlur={12}
                dim={0.32}
              >
                {isLast ? <GapCard /> : null}
              </SceneBed>
            </FadeIn>
          </Sequence>
        );
        from += dur;
        return seq;
      })}
      <Caption
        text="114 points behind Denny Hamlin with nine races left."
        outAt={S05_DUR - 4}
        fontSize={42}
      />
    </>
  );
};
