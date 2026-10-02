import React from 'react';
import {Sequence} from 'remotion';

import {Caption} from '../components/Caption';
import {SCENE5_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S05_DUR = 59;
export const S05_CUTS = [33, 26];

export const Scene05: React.FC = () => (
  <>
    <Cuts cuts={SCENE5_CUTS} frames={S05_CUTS} amp={0.05} />
    <Sequence from={4} durationInFrames={55} layout="none">
      <Caption text="SO THE BIGGEST QUESTION IS SIMPLE" inAt={0} outAt={42} fontSize={52} />
    </Sequence>
  </>
);
