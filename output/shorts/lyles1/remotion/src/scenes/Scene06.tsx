import React from 'react';
import {Sequence} from 'remotion';
import {Caption} from '../components/Caption';
import {SCENE6_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S06_DUR = 80; // 16.34 -> 19.00s

export const S06_CUTS = [40, 40];

// "what comes next" starts at 1.34s = scene frame 40.
export const Scene06: React.FC = () => (
  <>
    <Cuts cuts={SCENE6_CUTS} frames={S06_CUTS} amp={0.06} />
    <Sequence from={0} durationInFrames={40} layout="none">
      <Caption text="The QUESTION now is," outAt={32} fontSize={62} />
    </Sequence>
    <Sequence from={40} durationInFrames={40} layout="none">
      <Caption text="WHAT COMES NEXT?" outAt={40} fontSize={70} />
    </Sequence>
  </>
);