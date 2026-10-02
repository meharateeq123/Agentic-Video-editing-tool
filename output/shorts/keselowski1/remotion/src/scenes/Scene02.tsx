import React from 'react';
import {Sequence} from 'remotion';
import {SceneBed} from '../components/Bed';
import {FadeIn} from '../components/base';
import {Caption} from '../components/Caption';
import {SCENE2_CUTS} from '../footage';

export const S02_DUR = 139; // 3.52 -> 8.16s

const CUT_FRAMES = [70, 69];

/** Scene 2 — the incident beat. Pure real Darlington footage, no graphic on top. */
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
        text="After their Darlington incident, Keselowski made it clear he hasn't forgotten."
        outAt={S02_DUR - 4}
        fontSize={40}
      />
    </>
  );
};
