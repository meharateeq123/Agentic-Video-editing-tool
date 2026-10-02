import React from 'react';
import {Sequence} from 'remotion';

import {Caption} from '../components/Caption';
import {SCENE4_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S04_DUR = 71;
export const S04_CUTS = [36, 35];

export const Scene04: React.FC = () => (
  <>
    <Cuts cuts={SCENE4_CUTS} frames={S04_CUTS} amp={0.05} />
    <Sequence from={8} durationInFrames={26} layout="none">
      <Caption text="BUT THIS TIME" inAt={0} outAt={16} fontSize={60} />
    </Sequence>
    <Sequence from={33} durationInFrames={38} layout="none">
      <Caption text="she has a NEW CHALLENGE" inAt={0} outAt={26} fontSize={58} />
    </Sequence>
  </>
);
