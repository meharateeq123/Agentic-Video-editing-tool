import React from 'react';
import {Sequence} from 'remotion';

import {Caption} from '../components/Caption';
import {SCENE6_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S06_DUR = 78;
export const S06_CUTS = [39, 39];

export const Scene06: React.FC = () => (
  <>
    <Cuts cuts={SCENE6_CUTS} frames={S06_CUTS} amp={0.05} />
    <Sequence from={5} durationInFrames={39} layout="none">
      <Caption text="SO HOW FAST CAN PURIPOL" inAt={0} outAt={29} fontSize={52} />
    </Sequence>
    <Sequence from={46} durationInFrames={32} layout="none">
      <Caption text="GO NEXT?" inAt={0} outAt={24} fontSize={72} />
    </Sequence>
  </>
);
