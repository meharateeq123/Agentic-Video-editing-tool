import React from 'react';
import {Sequence} from 'remotion';

import {Caption} from '../components/Caption';
import {SCENE3_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S03_DUR = 134;
export const S03_CUTS = [45, 45, 44];

export const Scene03: React.FC = () => (
  <>
    <Cuts cuts={SCENE3_CUTS} frames={S03_CUTS} amp={0.05} />
    <Sequence from={6} durationInFrames={60} layout="none">
      <Caption text="AFTER EVERYTHING SHE'S ALREADY ACHIEVED" inAt={0} outAt={44} fontSize={46} />
    </Sequence>
    <Sequence from={74} durationInFrames={31} layout="none">
      <Caption text="ZHANG IS STILL WINNING" inAt={0} outAt={23} fontSize={54} />
    </Sequence>
    <Sequence from={105} durationInFrames={29} layout="none">
      <Caption text="ON THE BIGGEST STAGES" inAt={0} outAt={22} fontSize={54} />
    </Sequence>
  </>
);
