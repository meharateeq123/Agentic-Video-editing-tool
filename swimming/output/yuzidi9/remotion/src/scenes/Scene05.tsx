import React from 'react';
import {Sequence} from 'remotion';

import {Caption} from '../components/Caption';
import {SCENE5_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S05_DUR = 46;
export const S05_CUTS = [46];

export const Scene05: React.FC = () => (
  <>
    <Cuts cuts={SCENE5_CUTS} frames={S05_CUTS} amp={0.05} />
    <Sequence from={2} durationInFrames={38} layout="none">
      <Caption text="SHE'S ONLY 13" inAt={0} outAt={30} fontSize={62} />
    </Sequence>
  </>
);
