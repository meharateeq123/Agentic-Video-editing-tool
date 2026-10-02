import React from 'react';
import {Sequence, useCurrentFrame} from 'remotion';
import {SceneBed, Overlay, winK, type Win} from '../components/Bed';
import {FadeIn} from '../components/base';
import {Caption} from '../components/Caption';
import {C, FONT} from '../theme';
import {SCENE4_CUTS} from '../footage';

export const S04_DUR = 144; // 12.18 -> 16.96s

const CUT_FRAMES = [72, 72];

const CARD_WIN: Win = [8, 24, 46, 60];

const NextRaceCard: React.FC = () => {
  const frame = useCurrentFrame();
  const k = winK(frame, CARD_WIN);
  return (
    <Overlay k={k} rise={20}>
      <div
        style={{
          position: 'absolute',
          left: 130,
          top: 640,
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
        <div style={{fontFamily: FONT, fontWeight: 700, fontSize: 20, color: C.amber, letterSpacing: 1.3, textTransform: 'uppercase'}}>
          NASCAR is watching
        </div>
        <div style={{fontFamily: FONT, fontWeight: 900, fontSize: 46, color: '#ffffff', marginTop: 6, letterSpacing: -1.5}}>
          Next up: Gateway
        </div>
        <div style={{fontFamily: FONT, fontWeight: 500, fontSize: 21, color: C.muted, marginTop: 8}}>
          Both drivers on track again
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
                {isLast ? <NextRaceCard /> : null}
              </SceneBed>
            </FadeIn>
          </Sequence>
        );
        from += dur;
        return seq;
      })}
      <Caption
        text="NASCAR is now monitoring the situation, and both drivers could meet again at Gateway."
        outAt={S04_DUR - 4}
        fontSize={38}
      />
    </>
  );
};
