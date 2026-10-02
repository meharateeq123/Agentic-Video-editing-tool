import React from 'react';
import {Sequence} from 'remotion';

import {Caption} from '../components/Caption';
import {SCENE3_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S03_DUR = 131;
export const S03_CUTS = [55, 76];

export const Scene03: React.FC = () => (
  <>
    <Cuts cuts={SCENE3_CUTS} frames={S03_CUTS} amp={0.05} />
    <Sequence from={5} durationInFrames={49} layout="none">
      <Caption text="SHE WON BOTH TITLES IN BUDAPEST" inAt={0} outAt={38} fontSize={46} />
    </Sequence>
    <Sequence from={60} durationInFrames={68} layout="none">
      <Caption text="BEATING ELITE COMPETITION ACROSS TWO SPRINT EVENTS" inAt={0} outAt={54} fontSize={38} />
    </Sequence>
  </>
);
