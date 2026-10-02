import React from 'react';
import {Sequence} from 'remotion';

import {Caption} from '../components/Caption';
import {SCENE3_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S03_DUR = 94;
export const S03_CUTS = [47, 47];

export const Scene03: React.FC = () => (
  <>
    <Cuts cuts={SCENE3_CUTS} frames={S03_CUTS} amp={0.05} />
    <Sequence from={4} durationInFrames={27} layout="none">
      <Caption text="EVEN CRAZIER" inAt={0} outAt={20} fontSize={64} />
    </Sequence>
    <Sequence from={33} durationInFrames={34} layout="none">
      <Caption text="HE DROPPED MORE THAN A SECOND" inAt={0} outAt={26} fontSize={50} />
    </Sequence>
    <Sequence from={67} durationInFrames={27} layout="none">
      <Caption text="FROM HIS PREVIOUS BEST" inAt={0} outAt={20} fontSize={56} />
    </Sequence>
  </>
);
