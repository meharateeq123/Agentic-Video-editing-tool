import React from 'react';
import {Sequence} from 'remotion';
import {Caption} from '../components/Caption';
import {SCENE1_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S01_DUR = 102; // 0 -> 3.40s
export const S01_CUTS = [51, 51];

// "craziest" is said at 1.40s = frame 42, which is where the caption turns over.
export const Scene01: React.FC = () => (
  <>
    <Cuts cuts={SCENE1_CUTS} frames={S01_CUTS} amp={0.06} />
    <Sequence from={0} durationInFrames={42} layout="none">
      <Caption text="JOSH KERR just produced one of the" outAt={34} fontSize={48} />
    </Sequence>
    <Sequence from={42} durationInFrames={60} layout="none">
      <Caption text="CRAZIEST FINISHES of his CAREER." outAt={50} fontSize={52} />
    </Sequence>
  </>
);