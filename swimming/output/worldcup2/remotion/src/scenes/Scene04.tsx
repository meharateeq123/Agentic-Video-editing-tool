import React from 'react';
import {Sequence} from 'remotion';

import {Caption} from '../components/Caption';
import {SCENE4_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S04_DUR = 157;
export const S04_CUTS = [90, 67];

export const Scene04: React.FC = () => (
  <>
    <Cuts cuts={SCENE4_CUTS} frames={S04_CUTS} amp={0.05} />
    <Sequence from={6} durationInFrames={56} layout="none">
      <Caption text="A $1.2 MILLION PRIZE POOL" inAt={0} outAt={46} fontSize={42} />
    </Sequence>
    <Sequence from={88} durationInFrames={64} layout="none">
      <Caption text="PLUS BEIJING CHAMPIONSHIP SPOTS" inAt={0} outAt={54} fontSize={38} />
    </Sequence>
  </>
);
