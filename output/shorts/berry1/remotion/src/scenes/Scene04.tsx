import React from 'react';
import {Sequence, useCurrentFrame} from 'remotion';
import {SceneBed, Overlay, winK, type Win} from '../components/Bed';
import {FadeIn} from '../components/base';
import {Caption} from '../components/Caption';
import {C, cardStyle, labelStyle, numStyle, capStyle} from '../theme';
import {SCENE4_CUTS} from '../footage';

export const S04_DUR = 145; // 11.9 -> 16.72s

const CUT_FRAMES = [73, 72];

const CARD_WIN: Win = [8, 24, 60, 72];

const StatCard: React.FC = () => {
  const frame = useCurrentFrame();
  const k = winK(frame, CARD_WIN);
  return (
    <Overlay k={k} rise={20}>
      <div
        style={{
          position: 'absolute',
          left: 130,
          top: 640,
          width: 780,
          ...cardStyle({radius: 18, pad: 32}),
        }}
      >
        <div style={labelStyle(19)}>2026 Cup Series — Wood Brothers No. 21</div>
        <div style={{...numStyle(110, C.amber as string), marginTop: 10}}>6</div>
        <div style={{...capStyle(21), marginTop: 8}}>Straight top-10 finishes — right on time</div>
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
                {isLast ? <StatCard /> : null}
              </SceneBed>
            </FadeIn>
          </Sequence>
        );
        from += dur;
        return seq;
      })}
      <Caption
        text="Berry is coming off six straight top-10 finishes — serious speed at the right moment."
        outAt={S04_DUR - 4}
        fontSize={38}
      />
    </>
  );
};
