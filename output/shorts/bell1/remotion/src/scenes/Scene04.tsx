import React from 'react';
import {Sequence} from 'remotion';
import {SceneBed} from '../components/Bed';
import {FadeIn} from '../components/base';
import {Caption} from '../components/Caption';
import {SCENE4_CUTS} from '../footage';

export const S04_DUR = 92; // 10.23 -> 13.30s

// Two cuts (1.8s + 1.8s bleed-safe at 46 frames each), both under the 3s cap.
const CUT_FRAMES = [46, 46];

/** Scene 4 — "momentum" beat, two disjoint real racing moments. */
export const Scene04: React.FC = () => {
  let from = 0;
  return (
    <>
      {CUT_FRAMES.map((dur, i) => {
        const isFirst = i === 0;
        const seq = (
          <Sequence key={i} from={from} durationInFrames={dur} layout="none">
            <FadeIn len={isFirst ? 0 : 6} skip={isFirst}>
              <SceneBed {...SCENE4_CUTS[i]} dur={dur} wins={[]} amp={0.07} />
            </FadeIn>
          </Sequence>
        );
        from += dur;
        return seq;
      })}
      <Caption
        text="Now Bell has the momentum, and nine Chase races remain."
        outAt={S04_DUR - 4}
        fontSize={52}
      />
    </>
  );
};
