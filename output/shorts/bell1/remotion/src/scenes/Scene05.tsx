import React from 'react';
import {Sequence} from 'remotion';
import {SceneBed} from '../components/Bed';
import {FadeIn} from '../components/base';
import {Caption} from '../components/Caption';
import {SCENE5_CUTS} from '../footage';

export const S05_DUR = 107; // 13.30 -> 16.88s

// Two cuts (54 + 53 frames, ~1.8s each), both under the 3s cap.
const CUT_FRAMES = [54, 53];

/** Scene 5 — the closing question, two disjoint real racing moments. */
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
      <Caption
        text="Could Christopher Bell be the driver nobody saw coming for the championship?"
        outAt={S05_DUR - 4}
        fontSize={46}
      />
    </>
  );
};
