import React from 'react';
import {Sequence, useCurrentFrame} from 'remotion';
import {SceneBed, Overlay, winK, type Win} from '../components/Bed';
import {FadeIn} from '../components/base';
import {Caption} from '../components/Caption';
import {C, FONT} from '../theme';
import {SCENE4_CUTS} from '../footage';

export const S04_DUR = 141; // 13.98 -> 18.68s

const CUT_FRAMES = [71, 70];

const CARD_WIN: Win = [8, 24, 56, 70];

const GrowthCard: React.FC = () => {
  const frame = useCurrentFrame();
  const k = winK(frame, CARD_WIN);
  return (
    <Overlay k={k} rise={18}>
      <div
        style={{
          position: 'absolute',
          left: 130,
          top: 700,
          padding: '26px 32px',
          background: C.card,
          border: `1px solid ${C.hairline}`,
          borderRadius: 16,
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          boxShadow: '0 24px 70px rgba(0,0,0,0.55)',
        }}
      >
        <div style={{fontFamily: FONT, fontWeight: 700, fontSize: 20, color: C.emerald, letterSpacing: 1.2, textTransform: 'uppercase'}}>
          Real-world career
        </div>
        <div style={{fontFamily: FONT, fontWeight: 900, fontSize: 40, color: '#ffffff', marginTop: 4}}>
          Growing fast in 2026
        </div>
      </div>
    </Overlay>
  );
};

export const Scene04: React.FC = () => {
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
                {...SCENE4_CUTS[i]}
                dur={dur}
                wins={isLast ? [CARD_WIN] : []}
                amp={0.06}
                maxBlur={12}
                dim={0.3}
              >
                {isLast ? <GrowthCard /> : null}
              </SceneBed>
            </FadeIn>
          </Sequence>
        );
        from += dur;
        return seq;
      })}
      <Caption
        text="And with his real-world NASCAR career growing, fans wonder if he'll have an even bigger role this time."
        outAt={S04_DUR - 4}
        fontSize={34}
      />
    </>
  );
};
