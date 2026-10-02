import React from 'react';
import {Sequence} from 'remotion';

import {Caption} from '../components/Caption';
import {SCENE5_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S05_DUR = 55;
export const S05_CUTS = [55];

export const Scene05: React.FC = () => (
  <>
    <Cuts cuts={SCENE5_CUTS} frames={S05_CUTS} amp={0.05} />
    <Sequence from={6} durationInFrames={49} layout="none">
      <Caption text="THREE GOLDS. THREE RECORDS." inAt={0} outAt={36} fontSize={54} />
    </Sequence>
  </>
);
