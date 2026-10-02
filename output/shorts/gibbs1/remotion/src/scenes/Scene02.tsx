import React from 'react';
import {Sequence} from 'remotion';
import {SceneBed} from '../components/Bed';
import {FadeIn} from '../components/base';
import {Caption} from '../components/Caption';
import {SCENE2_CUTS} from '../footage';

export const S02_DUR = 148; // 4.83 -> 9.78s

const CUT_FRAMES = [74, 74];

export const Scene02: React.FC = () => {
  let from = 0;
  return (
    <>
      {CUT_FRAMES.map((dur, i) => {
        const isFirst = i === 0;
        const seq = (
          <Sequence key={i} from={from} durationInFrames={dur} layout="none">
            <FadeIn len={isFirst ? 0 : 6} skip={isFirst}>
              <SceneBed {...SCENE2_CUTS[i]} dur={dur} wins={[]} amp={0.07} />
            </FadeIn>
          </Sequence>
        );
        from += dur;
        return seq;
      })}
      <Caption
        text="Starting 28th at Darlington, Gibbs charged all the way to second in the Southern 500."
        outAt={S02_DUR - 4}
        fontSize={42}
      />
    </>
  );
};
