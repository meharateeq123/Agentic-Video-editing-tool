import React from 'react';
import {Sequence} from 'remotion';

import {Caption} from '../components/Caption';
import {SCENE4_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S04_DUR = 78;
export const S04_CUTS = [39, 39];

export const Scene04: React.FC = () => (
  <>
    <Cuts cuts={SCENE4_CUTS} frames={S04_CUTS} amp={0.05} />
    <Sequence from={6} durationInFrames={35} layout="none">
      <Caption text="MAKING HER THE FIFTH-FASTEST" inAt={0} outAt={26} fontSize={50} />
    </Sequence>
    <Sequence from={44} durationInFrames={34} layout="none">
      <Caption text="PERFORMER IN HISTORY" inAt={0} outAt={25} fontSize={56} />
    </Sequence>
  </>
);
