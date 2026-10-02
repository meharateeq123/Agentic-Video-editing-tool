import React from 'react';
import {Sequence} from 'remotion';

import {Caption} from '../components/Caption';
import {SCENE6_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S06_DUR = 73;
export const S06_CUTS = [73];

export const Scene06: React.FC = () => (
  <>
    <Cuts cuts={SCENE6_CUTS} frames={S06_CUTS} amp={0.05} />
    <Sequence from={3} durationInFrames={37} layout="none">
      <Caption text="WHERE MARCHAND COULD BECOME" inAt={0} outAt={27} fontSize={48} />
    </Sequence>
    <Sequence from={42} durationInFrames={31} layout="none">
      <Caption text="ONE OF HIS BIGGEST RIVALS" inAt={0} outAt={23} fontSize={50} />
    </Sequence>
  </>
);
