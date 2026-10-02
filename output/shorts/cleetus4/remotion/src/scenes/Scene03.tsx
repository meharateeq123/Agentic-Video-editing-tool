import React from 'react';
import {Sequence, useCurrentFrame} from 'remotion';
import {SceneBed, Overlay, winK, type Win} from '../components/Bed';
import {FadeIn} from '../components/base';
import {Caption} from '../components/Caption';
import {C, FONT} from '../theme';
import {SCENE3_CUTS} from '../footage';

export const S03_DUR = 159; // 8.66 -> 13.98s

const CUT_FRAMES = [80, 79];

const CARD_WIN: Win = [8, 24, 62, 79];

const GameCard: React.FC = () => {
  const frame = useCurrentFrame();
  const k = winK(frame, CARD_WIN);
  return (
    <Overlay k={k} rise={20}>
      <div
        style={{
          position: 'absolute',
          left: 130,
          top: 620,
          width: 780,
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
          In the game
        </div>
        <div style={{display: 'flex', alignItems: 'baseline', gap: 18, marginTop: 10}}>
          <div style={{fontFamily: FONT, fontWeight: 800, fontSize: 46, color: C.muted}}>NASCAR 25</div>
          <div style={{fontFamily: FONT, fontWeight: 900, fontSize: 40, color: C.amber}}>→</div>
          <div style={{fontFamily: FONT, fontWeight: 900, fontSize: 52, color: '#ffffff'}}>NASCAR 26</div>
        </div>
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
                dim={0.3}
              >
                {isLast ? <GameCard /> : null}
              </SceneBed>
            </FadeIn>
          </Sequence>
        );
        from += dur;
        return seq;
      })}
      <Caption text="After appearing in NASCAR 25, Cleetus is now coming back for NASCAR 26." outAt={S03_DUR - 4} fontSize={40} />
    </>
  );
};
