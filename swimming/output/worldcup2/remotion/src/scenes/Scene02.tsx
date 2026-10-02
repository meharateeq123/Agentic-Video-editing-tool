import React from 'react';
import {Sequence} from 'remotion';

import {Caption} from '../components/Caption';
import {SCENE2_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S02_DUR = 131;
export const S02_CUTS = [131];

export const Scene02: React.FC = () => (
  <>
    <Cuts cuts={SCENE2_CUTS} frames={S02_CUTS} amp={0.05} />
    <Sequence from={2} durationInFrames={58} layout="none">
      <Caption text="AZERBAIJAN - 216 SWIMMERS" inAt={0} outAt={48} fontSize={40} />
    </Sequence>
    <Sequence from={72} durationInFrames={56} layout="none">
      <Caption text="44 NATIONS READY TO RACE" inAt={0} outAt={46} fontSize={42} />
    </Sequence>
  </>
);
