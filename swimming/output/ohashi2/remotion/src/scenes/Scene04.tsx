import React from 'react';
import {Sequence} from 'remotion';

import {Caption} from '../components/Caption';
import {SCENE4_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S04_DUR = 124;
export const S04_CUTS = [62, 62];

export const Scene04: React.FC = () => (
  <>
    <Cuts cuts={SCENE4_CUTS} frames={S04_CUTS} amp={0.05} />
    <Sequence from={5} durationInFrames={50} layout="none">
      <Caption text="MARCHAND CALLED THE 17-YEAR-OLD" inAt={0} outAt={37} fontSize={46} />
    </Sequence>
    <Sequence from={56} durationInFrames={68} layout="none">
      <Caption text="JAPANESE SWIMMER A 'SCARY' COMPETITOR" inAt={0} outAt={50} fontSize={44} />
    </Sequence>
  </>
);
