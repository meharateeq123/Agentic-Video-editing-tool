import React from 'react';
import {Sequence} from 'remotion';

import {Caption} from '../components/Caption';
import {SCENE4_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S04_DUR = 81;
export const S04_CUTS = [41, 40];

export const Scene04: React.FC = () => (
  <>
    <Cuts cuts={SCENE4_CUTS} frames={S04_CUTS} amp={0.05} />
    <Sequence from={5} durationInFrames={29} layout="none">
      <Caption text="AND THE NEXT CHAPTER" inAt={0} outAt={22} fontSize={54} />
    </Sequence>
    <Sequence from={37} durationInFrames={44} layout="none">
      <Caption text="COULD BE VERY INTERESTING!" inAt={0} outAt={33} fontSize={56} />
    </Sequence>
  </>
);
