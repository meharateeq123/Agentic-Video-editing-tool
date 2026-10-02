import React from 'react';
import {Sequence} from 'remotion';

import {Caption} from '../components/Caption';
import {SCENE5_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S05_DUR = 67;
export const S05_CUTS = [34, 33];

export const Scene05: React.FC = () => (
  <>
    <Cuts cuts={SCENE5_CUTS} frames={S05_CUTS} amp={0.05} />
    <Sequence from={3} durationInFrames={29} layout="none">
      <Caption text="SO WHAT WILL SHE LOOK LIKE" inAt={0} outAt={22} fontSize={50} />
    </Sequence>
    <Sequence from={34} durationInFrames={33} layout="none">
      <Caption text="IN 2027?" inAt={0} outAt={25} fontSize={72} />
    </Sequence>
  </>
);
