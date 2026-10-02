import React from 'react';
import {Sequence} from 'remotion';

import {Caption} from '../components/Caption';
import {SCENE4_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S04_DUR = 73;
export const S04_CUTS = [37, 36];

export const Scene04: React.FC = () => (
  <>
    <Cuts cuts={SCENE4_CUTS} frames={S04_CUTS} amp={0.05} />
    <Sequence from={4} durationInFrames={32} layout="none">
      <Caption text="NOW THE CHAMPIONSHIP FIGHT" inAt={0} outAt={24} fontSize={54} />
    </Sequence>
    <Sequence from={38} durationInFrames={35} layout="none">
      <Caption text="IS INCREDIBLY TIGHT" inAt={0} outAt={26} fontSize={58} />
    </Sequence>
  </>
);
