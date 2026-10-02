import React from 'react';
import {Sequence} from 'remotion';
import {SceneBed} from '../components/Bed';
import {FadeIn} from '../components/base';
import {Caption} from '../components/Caption';
import {SCENE1_CUTS} from '../footage';

export const S01_DUR = 84; // 0.00 -> 2.80s

const CUT_FRAMES = [42, 42];

/** Scene 1 — the hook. Straight to the real finish, no graphic in the way. */
export const Scene01: React.FC = () => {
  let from = 0;
  return (
    <>
      {CUT_FRAMES.map((dur, i) => {
        const isFirst = i === 0;
        const seq = (
          <Sequence key={i} from={from} durationInFrames={dur} layout="none">
            <FadeIn len={isFirst ? 0 : 6} skip={isFirst}>
              <SceneBed {...SCENE1_CUTS[i]} dur={dur} wins={[]} amp={0.07} />
            </FadeIn>
          </Sequence>
        );
        from += dur;
        return seq;
      })}
      <Caption text="Toyota JUST took over the NASCAR championship!" outAt={S01_DUR - 3} fontSize={46} />
    </>
  );
};
