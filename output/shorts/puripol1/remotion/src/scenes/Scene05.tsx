import React from 'react';
import {Sequence} from 'remotion';

import {Caption} from '../components/Caption';
import {SCENE5_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S05_DUR = 101;
export const S05_CUTS = [51, 50];

export const Scene05: React.FC = () => (
  <>
    <Cuts cuts={SCENE5_CUTS} frames={S05_CUTS} amp={0.05} />
    <Sequence from={5} durationInFrames={49} layout="none">
      <Caption text="HE NOW OWNS TWO HUGE PERFORMANCES" inAt={0} outAt={36} fontSize={46} />
    </Sequence>
    <Sequence from={55} durationInFrames={46} layout="none">
      <Caption text="AT ONE ASIAN GAMES" inAt={0} outAt={34} fontSize={56} />
    </Sequence>
  </>
);
