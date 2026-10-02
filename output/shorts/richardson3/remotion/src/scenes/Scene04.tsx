import React from 'react';
import {Sequence} from 'remotion';

import {Caption} from '../components/Caption';
import {SCENE4_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S04_DUR = 119;
export const S04_CUTS = [40, 40, 39];

export const Scene04: React.FC = () => (
  <>
    <Cuts cuts={SCENE4_CUTS} frames={S04_CUTS} amp={0.05} />
    <Sequence from={4} durationInFrames={42} layout="none">
      <Caption text="BUT SHA'CARRI SAID SHE WISHED" inAt={0} outAt={31} fontSize={48} />
    </Sequence>
    <Sequence from={48} durationInFrames={31} layout="none">
      <Caption text="THIS PERFORMANCE HAD HAPPENED" inAt={0} outAt={23} fontSize={48} />
    </Sequence>
    <Sequence from={80} durationInFrames={39} layout="none">
      <Caption text="AT THE BEGINNING OF HER SEASON" inAt={0} outAt={29} fontSize={48} />
    </Sequence>
  </>
);
