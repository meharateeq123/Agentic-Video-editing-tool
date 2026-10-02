import React from 'react';
import {Sequence} from 'remotion';

import {Caption} from '../components/Caption';
import {SCENE4_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S04_DUR = 113;
export const S04_CUTS = [56, 57];

export const Scene04: React.FC = () => (
  <>
    <Cuts cuts={SCENE4_CUTS} frames={S04_CUTS} amp={0.06} />
    <Sequence from={3} durationInFrames={42} layout="none">
      <Caption text="But with the CHASE getting TIGHTER" inAt={0} outAt={32} fontSize={54} />
    </Sequence>
    <Sequence from={45} durationInFrames={22} layout="none">
      <Caption text="CAN BUBBA pull off" inAt={0} outAt={14} fontSize={56} />
    </Sequence>
    <Sequence from={67} durationInFrames={46} layout="none">
      <Caption text="ANOTHER KANSAS SHOCKER?" inAt={0} outAt={34} fontSize={60} />
    </Sequence>
  </>
);
