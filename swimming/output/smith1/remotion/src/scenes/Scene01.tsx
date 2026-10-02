import React from 'react';
import {Sequence} from 'remotion';
import {Caption} from '../components/Caption';
import {SCENE1_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S01_DUR = 92; // 0 -> 3.08s
export const S01_CUTS = [92];

// "strange" is said at 0.94s = frame 28.
export const Scene01: React.FC = () => (
  <>
    <Cuts cuts={SCENE1_CUTS} frames={S01_CUTS} amp={0.06} />
    <Sequence from={0} durationInFrames={40} layout="none">
      <Caption text="Regan SMITH had a STRANGE" outAt={32} fontSize={54} />
    </Sequence>
    <Sequence from={40} durationInFrames={52} layout="none">
      <Caption text="PAN PACIFIC CHAMPIONSHIPS." outAt={42} fontSize={46} />
    </Sequence>
  </>
);