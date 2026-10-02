import React from 'react';
import {Sequence, useCurrentFrame} from 'remotion';
import {SceneBed, Overlay, winK, type Win} from '../components/Bed';
import {FadeIn} from '../components/base';
import {Caption} from '../components/Caption';
import {C, FONT} from '../theme';
import {hexA} from '../components/base';
import {SCENE2_CUTS} from '../footage';

export const S02_DUR = 141; // 4.14 -> 8.82s

const CUT_FRAMES = [71, 70];

// Card lands on the second cut, timed to "the No. 42 Toyota."
const CARD_WIN: Win = [8, 24, 58, 70];

const NumberCard: React.FC = () => {
  const frame = useCurrentFrame();
  const k = winK(frame, CARD_WIN);
  return (
    <Overlay k={k} rise={20}>
      <div
        style={{
          position: 'absolute',
          left: 130,
          top: 560,
          width: 820,
          background: C.card,
          border: `1px solid ${C.hairline}`,
          borderRadius: 20,
          padding: 34,
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          boxShadow: '0 24px 70px rgba(0,0,0,0.55)',
          display: 'flex',
          alignItems: 'center',
          gap: 28,
        }}
      >
        <div
          style={{
            fontFamily: FONT,
            fontWeight: 900,
            fontSize: 132,
            lineHeight: 0.9,
            color: '#ffffff',
            letterSpacing: -4,
            textShadow: `0 0 30px ${hexA(C.amber, 0.5)}`,
          }}
        >
          42
        </div>
        <div>
          <div style={{fontFamily: FONT, fontWeight: 700, fontSize: 22, color: C.amber, letterSpacing: 1.2, textTransform: 'uppercase'}}>
            Legacy Motor Club
          </div>
          <div style={{fontFamily: FONT, fontWeight: 500, fontSize: 22, color: C.muted, marginTop: 6}}>
            2027 Toyota — Berry's new ride
          </div>
        </div>
      </div>
    </Overlay>
  );
};

export const Scene02: React.FC = () => {
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
                {...SCENE2_CUTS[i]}
                dur={dur}
                wins={isLast ? [CARD_WIN] : []}
                amp={0.07}
                maxBlur={12}
                dim={0.3}
              >
                {isLast ? <NumberCard /> : null}
              </SceneBed>
            </FadeIn>
          </Sequence>
        );
        from += dur;
        return seq;
      })}
      <Caption
        text="Legacy Motor Club has announced Berry will take over the No. 42 Toyota next season."
        outAt={S02_DUR - 4}
        fontSize={40}
      />
    </>
  );
};
