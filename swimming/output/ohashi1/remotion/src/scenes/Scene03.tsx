import React from 'react';
import {Sequence} from 'remotion';

import {Caption} from '../components/Caption';
import {SCENE3_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S03_DUR = 104;
export const S03_CUTS = [52, 52];

export const Scene03: React.FC = () => (
  <>
    <Cuts cuts={SCENE3_CUTS} frames={S03_CUTS} amp={0.05} />
    <Sequence from={9} durationInFrames={36} layout="none">
      <Caption text="BUT HERE'S THE CRAZY PART" inAt={0} outAt={27} fontSize={56} />
    </Sequence>
    <Sequence from={49} durationInFrames={55} layout="none">
      <Caption text="THIS IS ONLY HIS FIRST WORLD RECORD" inAt={0} outAt={42} fontSize={52} />
    </Sequence>
  </>
);
