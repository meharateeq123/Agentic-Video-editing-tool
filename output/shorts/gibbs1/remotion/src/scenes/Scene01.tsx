import React from 'react';
import {Sequence} from 'remotion';
import {SceneBed} from '../components/Bed';
import {FadeIn} from '../components/base';
import {Caption} from '../components/Caption';
import {SCENE1_CUTS} from '../footage';

export const S01_DUR = 145; // 0.00 -> 4.83s

const CUT_FRAMES = [73, 72];

/** Scene 1 — the hook. Real Ty Gibbs interview, then real Darlington pack racing. */
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
      <Caption
        text="Ty Gibbs JUST proved he's not a future champion anymore... he's a threat RIGHT NOW!"
        outAt={S01_DUR - 4}
        fontSize={40}
      />
    </>
  );
};
