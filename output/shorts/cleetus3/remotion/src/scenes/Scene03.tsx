import React from 'react';
import {Sequence} from 'remotion';
import {SceneBed} from '../components/Bed';
import {FadeIn} from '../components/base';
import {Caption} from '../components/Caption';
import {SCENE3_CUTS} from '../footage';

export const S03_DUR = 128; // 9.43 -> 13.69s

// Two cuts (~2.2s each), under the 3s cap.
const CUT_FRAMES = [64, 64];

/** Scene 3 — the "wild year" beat. Real reaction, then a second real in-car moment. */
export const Scene03: React.FC = () => {
  let from = 0;
  return (
    <>
      {CUT_FRAMES.map((dur, i) => {
        const isFirst = i === 0;
        const seq = (
          <Sequence key={i} from={from} durationInFrames={dur} layout="none">
            <FadeIn len={isFirst ? 0 : 6} skip={isFirst}>
              <SceneBed {...SCENE3_CUTS[i]} dur={dur} wins={[]} amp={0.07} />
            </FadeIn>
          </Sequence>
        );
        from += dur;
        return seq;
      })}
      <Caption
        text="After a wild year of racing, this could be his last NASCAR start of the season."
        outAt={S03_DUR - 4}
        fontSize={46}
      />
    </>
  );
};
