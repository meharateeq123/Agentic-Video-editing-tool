import React from 'react';
import {Sequence} from 'remotion';

import {Caption} from '../components/Caption';
import {SCENE5_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S05_DUR = 36;
export const S05_CUTS = [36];

export const Scene05: React.FC = () => (
  <>
    <Cuts cuts={SCENE5_CUTS} frames={S05_CUTS} amp={0.06} />
    <Sequence from={6} durationInFrames={40} layout="none">
      <Caption text="AND HERE'S THE CRAZY PART" inAt={0} outAt={28} fontSize={56} />
    </Sequence>
  </>
);
