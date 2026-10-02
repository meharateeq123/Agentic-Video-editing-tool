import React from 'react';
import {Sequence} from 'remotion';
import {SceneBed} from '../components/Bed';
import {FadeIn} from '../components/base';
import {Caption} from '../components/Caption';
import {SCENE5_CUTS} from '../footage';

export const S05_DUR = 75; // 7.94 -> 10.44s

const CUT_FRAMES = [38, 37];

/** Scene 5 — racing, no graphic: the closing card lands in the next scene. */
export const Scene05: React.FC = () => {
  let from = 0;
  return (
    <>
      {CUT_FRAMES.map((dur, i) => {
        const isFirst = i === 0;
        const seq = (
          <Sequence key={i} from={from} durationInFrames={dur} layout="none">
            <FadeIn len={isFirst ? 0 : 6} skip={isFirst}>
              <SceneBed {...SCENE5_CUTS[i]} dur={dur} wins={[]} amp={0.07} />
            </FadeIn>
          </Sequence>
        );
        from += dur;
        return seq;
      })}
      <Caption text="Gibbs has a HUGE chance to close the gap again." outAt={S05_DUR - 3} fontSize={44} />
    </>
  );
};
