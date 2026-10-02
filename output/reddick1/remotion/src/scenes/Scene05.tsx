import React from 'react';
import {Sequence} from 'remotion';
import {SceneBed} from '../components/Bed';
import {FadeIn} from '../components/base';
import {SCENE5_CUTS} from '../footage';

export const S05_DUR = 622; // 53.27 -> 74.00s

// Four short cuts of real Darlington race action (not one held clip).
const CUT_FRAMES = [155, 155, 156, 156];

/**
 * Scene 5 — "That win matters for one simple reason. Darlington is one of the hardest tracks on
 * the schedule…" Cut across four real moments of the Cook Out Southern 500 broadcast: tight pack
 * racing on the banking, a dusty low-sun turn, and a real pit stop — instead of one held clip of
 * an unrelated podcast.
 */
export const Scene05: React.FC = () => {
  let from = 0;
  return (
    <>
      {CUT_FRAMES.map((dur, i) => {
        const isFirst = i === 0;
        const seq = (
          <Sequence key={i} from={from} durationInFrames={dur} layout="none">
            <FadeIn len={isFirst ? 0 : 6} skip={isFirst}>
              <SceneBed {...SCENE5_CUTS[i]} dur={dur} wins={[]} amp={0.11} />
            </FadeIn>
          </Sequence>
        );
        from += dur;
        return seq;
      })}
    </>
  );
};
