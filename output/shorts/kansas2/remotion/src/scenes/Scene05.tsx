import React from 'react';
import {Sequence} from 'remotion';

import {Caption} from '../components/Caption';
import {SCENE5_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S05_DUR = 115;
export const S05_CUTS = [38, 38, 39];

export const Scene05: React.FC = () => (
  <>
    <Cuts cuts={SCENE5_CUTS} frames={S05_CUTS} amp={0.06} />
    <Sequence from={6} durationInFrames={30} layout="none">
      <Caption text="AND AT KANSAS" inAt={0} outAt={18} fontSize={60} />
    </Sequence>
    <Sequence from={26} durationInFrames={30} layout="none">
      <Caption text="THE FINAL LAP" inAt={0} outAt={22} fontSize={66} />
    </Sequence>
    <Sequence from={52} durationInFrames={63} layout="none">
      <Caption text="CAN CHANGE EVERYTHING!" inAt={0} outAt={32} fontSize={70} />
    </Sequence>
  </>
);
