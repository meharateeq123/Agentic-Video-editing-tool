import React from 'react';
import {Sequence} from 'remotion';
import {Caption} from '../components/Caption';
import {SCENE1_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S01_DUR = 109; // 0 -> 3.62s
export const S01_CUTS = [55, 54];

// "warning" is said at 1.70s = frame 51.
export const Scene01: React.FC = () => (
  <>
    <Cuts cuts={SCENE1_CUTS} frames={S01_CUTS} amp={0.06} />
    <Sequence from={0} durationInFrames={50} layout="none">
      <Caption text="SHA'CARRI RICHARDSON just sent a" outAt={40} fontSize={46} />
    </Sequence>
    <Sequence from={50} durationInFrames={59} layout="none">
      <Caption text="WARNING for 2027!" outAt={48} fontSize={64} />
    </Sequence>
  </>
);