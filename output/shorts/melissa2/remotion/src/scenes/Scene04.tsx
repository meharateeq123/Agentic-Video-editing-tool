import React from 'react';
import {Sequence} from 'remotion';

import {Caption} from '../components/Caption';
import {SCENE4_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S04_DUR = 158;
export const S04_CUTS = [158];

export const Scene04: React.FC = () => (
  <>
    <Cuts cuts={SCENE4_CUTS} frames={S04_CUTS} amp={0.05} />
    <Sequence from={3} durationInFrames={51} layout="none">
      <Caption text="THIS ISN'T JUST A HOT STREAK ANYMORE" inAt={0} outAt={40} fontSize={46} />
    </Sequence>
    <Sequence from={61} durationInFrames={64} layout="none">
      <Caption text="MELISSA JEFFERSON-WOODEN HAS OFFICIALLY ENTERED" inAt={0} outAt={50} fontSize={36} />
    </Sequence>
    <Sequence from={125} durationInFrames={33} layout="none">
      <Caption text="A NEW LEVEL" inAt={0} outAt={24} fontSize={62} />
    </Sequence>
  </>
);
