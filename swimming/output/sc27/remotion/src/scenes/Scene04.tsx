import React from 'react';
import {Sequence} from 'remotion';
import {Caption} from '../components/Caption';
import {SCENE4_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S04_DUR = 112; // 10.80 -> 14.52s

const CUT_FRAMES = [36, 36, 40];

// "how many" starts at 12.64s = scene frame 55, so the question caption takes over there.
export const Scene04: React.FC = () => (
  <>
    <Cuts cuts={SCENE4_CUTS} frames={CUT_FRAMES} amp={0.06} />
    <Sequence from={0} durationInFrames={55} layout="none">
      <Caption text="With the BEST SWIMMERS in the world racing," outAt={48} fontSize={50} />
    </Sequence>
    <Sequence from={55} durationInFrames={57} layout="none">
      <Caption text="how many RECORDS could FALL?" outAt={40} fontSize={60} />
    </Sequence>
  </>
);
