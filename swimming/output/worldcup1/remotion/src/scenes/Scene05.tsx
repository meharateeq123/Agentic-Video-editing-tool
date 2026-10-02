import React from 'react';
import {Sequence} from 'remotion';

import {Caption} from '../components/Caption';
import {SCENE5_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S05_DUR = 51;
export const S05_CUTS = [51];

export const Scene05: React.FC = () => (
  <>
    <Cuts cuts={SCENE5_CUTS} frames={S05_CUTS} amp={0.05} />
    <Sequence from={2} durationInFrames={49} layout="none">
      <Caption text="MORE RECORDS COULD BE COMING" inAt={0} outAt={36} fontSize={48} />
    </Sequence>
  </>
);
