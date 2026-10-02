import React from 'react';
import {Sequence} from 'remotion';

import {Caption} from '../components/Caption';
import {SCENE2_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S02_DUR = 123;
export const S02_CUTS = [75, 48];

export const Scene02: React.FC = () => (
  <>
    <Cuts cuts={SCENE2_CUTS} frames={S02_CUTS} amp={0.05} />
    <Sequence from={6} durationInFrames={89} layout="none">
      <Caption text="THEN SHE CAME BACK AND RAN AN INCREDIBLE 21.47" inAt={0} outAt={72} fontSize={40} />
    </Sequence>
    <Sequence from={95} durationInFrames={28} layout="none">
      <Caption text="IN THE 200" inAt={0} outAt={20} fontSize={58} />
    </Sequence>
  </>
);
