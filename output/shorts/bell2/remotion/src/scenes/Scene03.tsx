import React from 'react';
import {Sequence, useCurrentFrame} from 'remotion';
import {SceneBed, Overlay, winK, type Win} from '../components/Bed';
import {FadeIn} from '../components/base';
import {Caption} from '../components/Caption';
import {C, cardStyle, labelStyle, numStyle, capStyle} from '../theme';
import {SCENE3_CUTS} from '../footage';

export const S03_DUR = 150; // 9.00 -> 13.99s

const CUT_FRAMES = [75, 75];

// Card lands on the second cut, timed to "12 points behind Hamlin."
const CARD_WIN: Win = [12, 28, 66, 75];

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
          ...cardStyle({radius: 18, pad: 32}),
        }}
      >
        <div style={labelStyle(19)}>Chase standings</div>
        <div style={{...numStyle(112, C.emerald as string), marginTop: 10}}>
          P2
        </div>
        <div style={{...capStyle(21), marginTop: 8}}>12 points behind Denny Hamlin</div>
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
                amp={0.07}
                maxBlur={12}
                dim={0.3}
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
        text="That victory pushed him all the way to second in the Chase, just 12 points behind Denny Hamlin."
        outAt={S03_DUR - 4}
        fontSize={42}
      />
    </>
  );
};
