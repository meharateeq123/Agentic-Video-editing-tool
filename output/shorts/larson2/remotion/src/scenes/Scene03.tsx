import React from 'react';
import {Sequence} from 'remotion';
import {SceneBed} from '../components/Bed';
import {FadeIn} from '../components/base';
import {Caption} from '../components/Caption';
import {SCENE3_CUTS} from '../footage';

export const S03_DUR = 113; // 5.40 -> 9.15s

const CUT_FRAMES = [56, 57];

/** Pure footage — the line is about racing, so the racing carries it. No card. */
export const Scene03: React.FC = () => {
  let from = 0;
  return (
    <>
      {CUT_FRAMES.map((dur, i) => {
        const isFirst = i === 0;
        const seq = (
          <Sequence key={i} from={from} durationInFrames={dur + (i === CUT_FRAMES.length - 1 ? 10 : 0)} layout="none">
            <FadeIn len={isFirst ? 0 : 6} skip={isFirst}>
              <SceneBed {...SCENE3_CUTS[i]} dur={dur} wins={[]} amp={0.07} />
            </FadeIn>
          </Sequence>
        );
        from += dur;
        return seq;
      })}
      <Caption text="That gives him a PERFECT shot to attack from the opening laps and fight for the WIN." outAt={S03_DUR - 4} fontSize={42} />
    </>
  );
};
