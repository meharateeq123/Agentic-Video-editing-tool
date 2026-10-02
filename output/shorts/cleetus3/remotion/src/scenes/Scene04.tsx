import React from 'react';
import {Sequence} from 'remotion';
import {SceneBed} from '../components/Bed';
import {FadeIn} from '../components/base';
import {Caption} from '../components/Caption';
import {SCENE4_CUTS} from '../footage';

export const S04_DUR = 114; // 13.69 -> 17.50s

// Cut short at the user's request: the second cut ends early (43 frames instead of 71) so the
// scene stops right after "statement" instead of playing out "at Talladega?" and the trailing
// sound. The caption's own word-reveal timing below is left untouched (still paced for the full
// line) so "statement" lands on the same frame it did in the version the user watched — the
// video just stops before its fade-out would ever start.
const CUT_FRAMES = [71, 43];
const CAPTION_OUT = 138;

/** Scene 4 — the closing beat, trimmed short right after "statement." */
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
        text="But can Cleetus finish 2026 with a HUGE statement at Talladega?"
        outAt={CAPTION_OUT}
        fontSize={48}
      />
    </>
  );
};
