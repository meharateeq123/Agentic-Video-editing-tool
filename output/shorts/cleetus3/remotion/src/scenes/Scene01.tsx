import React from 'react';
import {Sequence} from 'remotion';
import {SceneBed} from '../components/Bed';
import {FadeIn} from '../components/base';
import {Caption} from '../components/Caption';
import {SCENE1_CUTS} from '../footage';

export const S01_DUR = 147; // 0.00 -> 4.89s

// Two cuts (2.6s + 2.6s), each under the 3s cap — not one held clip.
const CUT_FRAMES = [74, 73];

/** Scene 1 — the hook. Real Cleetus at Talladega, two disjoint moments. */
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
        text="Cleetus McFarland's FINAL NASCAR race of 2026 is coming, and it's a big one!"
        outAt={S01_DUR - 4}
        fontSize={46}
      />
    </>
  );
};
