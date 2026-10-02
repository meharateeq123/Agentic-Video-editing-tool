import React from 'react';
import {Sequence, useCurrentFrame} from 'remotion';
import {SceneBed, Overlay, winK, type Win} from '../components/Bed';
import {FadeIn} from '../components/base';
import {Caption} from '../components/Caption';
import {C, FONT} from '../theme';
import {SCENE3_CUTS} from '../footage';

export const S03_DUR = 87; // 8.08 -> 10.98s

const CUT_FRAMES = [44, 43];

const CARD_WIN: Win = [6, 18, 32, 43];

const row = (pos: string, num: string, name: string, accent: string) => (
  <div key={pos} style={{display: 'flex', alignItems: 'center', gap: 18, marginTop: 10}}>
    <div style={{fontFamily: FONT, fontWeight: 900, fontSize: 34, color: accent, width: 40}}>{pos}</div>
    <div
      style={{
        fontFamily: FONT,
        fontWeight: 800,
        fontSize: 24,
        color: '#0b0b0d',
        background: '#e9e9ee',
        borderRadius: 6,
        padding: '2px 10px',
        minWidth: 46,
        textAlign: 'center',
      }}
    >
      {num}
    </div>
    <div style={{fontFamily: FONT, fontWeight: 800, fontSize: 34, color: C.text, letterSpacing: -1}}>{name}</div>
  </div>
);

const PodiumCard: React.FC = () => {
  const frame = useCurrentFrame();
  const k = winK(frame, CARD_WIN);
  return (
    <Overlay k={k} rise={20}>
      <div
        style={{
          position: 'absolute',
          left: 130,
          top: 600,
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
        <div style={{fontFamily: FONT, fontWeight: 700, fontSize: 19, color: C.amber, letterSpacing: 1.4, textTransform: 'uppercase'}}>
          Cook Out Southern 500 — Toyota sweep
        </div>
        {row('1st', '20', 'Bell', C.amber as string)}
        {row('2nd', '54', 'Gibbs', C.muted as string)}
        {row('3rd', '45', 'Reddick', C.muted as string)}
      </div>
    </Overlay>
  );
};

export const Scene03: React.FC = () => {
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
                {...SCENE3_CUTS[i]}
                dur={dur}
                wins={isLast ? [CARD_WIN] : []}
                amp={0.06}
                maxBlur={12}
                dim={0.32}
              >
                {isLast ? <PodiumCard /> : null}
              </SceneBed>
            </FadeIn>
          </Sequence>
        );
        from += dur;
        return seq;
      })}
      <Caption text="...finished FIRST, SECOND and THIRD — and it gets even crazier." outAt={S03_DUR - 4} fontSize={40} />
    </>
  );
};
