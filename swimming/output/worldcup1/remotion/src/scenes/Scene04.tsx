import React from 'react';
import {Sequence} from 'remotion';

import {Caption} from '../components/Caption';
import {SCENE4_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S04_DUR = 115;
export const S04_CUTS = [58, 57];

export const Scene04: React.FC = () => (
  <>
    <Cuts cuts={SCENE4_CUTS} frames={S04_CUTS} amp={0.05} />
    <Sequence from={4} durationInFrames={55} layout="none">
      <Caption text="THE WORLD SHORT COURSE CHAMPIONSHIPS" inAt={0} outAt={41} fontSize={42} />
    </Sequence>
    <Sequence from={67} durationInFrames={48} layout="none">
      <Caption text="IN BEIJING THIS DECEMBER" inAt={0} outAt={35} fontSize={52} />
    </Sequence>
  </>
);
