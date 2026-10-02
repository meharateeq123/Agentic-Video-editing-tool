import React from 'react';
import {Sequence} from 'remotion';
import {Caption} from '../components/Caption';
import {SCENE4_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S04_DUR = 145; // 11.45 -> 16.28s

const CUT_FRAMES = [42, 45, 58];

// "can Cleetus" starts at 12.82s = scene frame 41, so the question caption takes over there.
export const Scene04: React.FC = () => (
  <>
    <Cuts cuts={SCENE4_CUTS} frames={CUT_FRAMES} amp={0.06} />
    <Sequence from={0} durationInFrames={40} layout="none">
      <Caption text="And the BIG QUESTION is..." outAt={33} fontSize={54} />
    </Sequence>
    <Sequence from={41} durationInFrames={104} layout="none">
      <Caption text="Can Cleetus actually COMPETE with NASCAR's BIGGEST STARS in the game?" outAt={96} fontSize={46} />
    </Sequence>
  </>
);
