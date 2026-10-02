import React from 'react';
import {Sequence} from 'remotion';

import {Caption} from '../components/Caption';
import {SCENE5_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S05_DUR = 48;
export const S05_CUTS = [48];

export const Scene05: React.FC = () => (
  <>
    <Cuts cuts={SCENE5_CUTS} frames={S05_CUTS} amp={0.05} />
    <Sequence from={0} durationInFrames={44} layout="none">
      <Caption text="AND HE'S ONLY 19" inAt={2} outAt={36} fontSize={62} />
    </Sequence>
  </>
);
