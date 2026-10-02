import React from 'react';
import {Sequence, useCurrentFrame} from 'remotion';
import {SceneBed, Overlay, winK, type Win} from '../components/Bed';
import {FadeIn} from '../components/base';
import {Caption} from '../components/Caption';
import {C, FONT} from '../theme';
import {SCENE5_CUTS} from '../footage';

export const S05_DUR = 125; // 12.94 -> 17.10s

const CUT_FRAMES = [63, 62];

const CARD_WIN: Win = [8, 22, 46, 62];

const standingsRow = (pos: string, name: string, gap: string, accent: string) => (
  <div
    key={name}
    style={{
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'space-between',
      marginTop: 12,
    }}
  >
    <div style={{display: 'flex', alignItems: 'baseline', gap: 16}}>
      <div style={{fontFamily: FONT, fontWeight: 900, fontSize: 26, color: C.dim, width: 42}}>{pos}</div>
      <div style={{fontFamily: FONT, fontWeight: 800, fontSize: 36, color: C.text, letterSpacing: -1}}>{name}</div>
    </div>
    <div style={{fontFamily: FONT, fontWeight: 900, fontSize: 36, color: accent, fontVariantNumeric: 'tabular-nums'}}>
      {gap}
    </div>
  </div>
);

const StandingsCard: React.FC = () => {
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
          borderRadius: 18,
          padding: 32,
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          boxShadow: '0 24px 70px rgba(0,0,0,0.55)',
        }}
      >
        <div style={{fontFamily: FONT, fontWeight: 700, fontSize: 19, color: C.muted, letterSpacing: 1.4, textTransform: 'uppercase'}}>
          Chase standings
        </div>
        {standingsRow('P1', 'Hamlin', 'leads', C.text as string)}
        {standingsRow('P2', 'Bell', '−12', C.amber as string)}
        {standingsRow('P3', 'Gibbs', '−39', C.amber as string)}
      </div>
    </Overlay>
  );
};

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
                {isLast ? <StandingsCard /> : null}
              </SceneBed>
            </FadeIn>
          </Sequence>
        );
        from += dur;
        return seq;
      })}
      <Caption
        text="while Bell sits just 12 points behind him, with Gibbs only 39 back."
        outAt={S05_DUR - 4}
        fontSize={40}
      />
    </>
  );
};
