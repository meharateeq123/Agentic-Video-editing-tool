import React from 'react';
import {Sequence} from 'remotion';

import {Caption} from '../components/Caption';
import {SCENE6_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S06_DUR = 73;
export const S06_CUTS = [37, 36];

export const Scene06: React.FC = () => (
  <>
    <Cuts cuts={SCENE6_CUTS} frames={S06_CUTS} amp={0.05} />
    <Sequence from={6} durationInFrames={67} layout="none">
      <Caption text="WHAT CAN THIS 13-YEAR-OLD DO NEXT?" inAt={0} outAt={50} fontSize={48} />
    </Sequence>
  </>
);
