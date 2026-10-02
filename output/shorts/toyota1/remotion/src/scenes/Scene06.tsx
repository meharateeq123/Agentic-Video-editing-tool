import React from 'react';
import {Sequence} from 'remotion';
import {SceneBed} from '../components/Bed';
import {FadeIn} from '../components/base';
import {Caption} from '../components/Caption';
import {SCENE6_CUTS} from '../footage';

export const S06_DUR = 143; // 17.10 -> 21.88s

const CUT_FRAMES = [72, 71];

/** Scene 6 — the button: the win itself, then victory lane, question carried by the caption. */
export const Scene06: React.FC = () => {
  let from = 0;
  return (
    <>
      {CUT_FRAMES.map((dur, i) => {
        const isFirst = i === 0;
        const seq = (
          <Sequence key={i} from={from} durationInFrames={dur} layout="none">
            <FadeIn len={isFirst ? 0 : 6} skip={isFirst}>
              <SceneBed {...SCENE6_CUTS[i]} dur={dur} wins={[]} amp={0.06} />
            </FadeIn>
          </Sequence>
        );
        from += dur;
        return seq;
      })}
      <Caption
        text="With Toyota controlling the top of the standings, can anyone stop them?"
        outAt={S06_DUR - 3}
        fontSize={40}
      />
    </>
  );
};
