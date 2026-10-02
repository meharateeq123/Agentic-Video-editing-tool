import React from 'react';
import {Sequence} from 'remotion';
import {Caption} from '../components/Caption';
import {SCENE4_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S04_DUR = 57; // 14.78 -> 16.68s
export const S04_CUTS = [29, 28];

// "toughest" is said at 0.52s = frame 16.
export const Scene04: React.FC = () => (
  <>
    <Cuts cuts={SCENE4_CUTS} frames={S04_CUTS} amp={0.06} />
    <Sequence from={0} durationInFrames={24} layout="none">
      <Caption text="Could this be her TOUGHEST" outAt={19} fontSize={54} />
    </Sequence>
    <Sequence from={24} durationInFrames={33} layout="none">
      <Caption text="SEASON YET?" outAt={28} fontSize={64} />
    </Sequence>
  </>
);