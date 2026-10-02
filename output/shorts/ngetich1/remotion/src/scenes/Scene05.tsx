import React from 'react';
import {Sequence} from 'remotion';

import {Caption} from '../components/Caption';
import {SCENE5_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S05_DUR = 84;
export const S05_CUTS = [42, 42];

export const Scene05: React.FC = () => (
  <>
    <Cuts cuts={SCENE5_CUTS} frames={S05_CUTS} amp={0.05} />
    <Sequence from={0} durationInFrames={30} layout="none">
      <Caption text="and NGETICH is" outAt={24} fontSize={56} />
    </Sequence>
    <Sequence from={30} durationInFrames={54} layout="none">
      <Caption text="on ANOTHER LEVEL!" outAt={46} fontSize={66} />
    </Sequence>
  </>
);
