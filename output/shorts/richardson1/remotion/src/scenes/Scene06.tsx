import React from 'react';
import {Sequence} from 'remotion';
import {Caption} from '../components/Caption';
import {SCENE6_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S06_DUR = 93; // 16.52 -> 19.64s
export const S06_CUTS = [47, 46];

// "exactly what" starts at 17.54s = scene frame 31.
export const Scene06: React.FC = () => (
  <>
    <Cuts cuts={SCENE6_CUTS} frames={S06_CUTS} amp={0.06} />
    <Sequence from={0} durationInFrames={31} layout="none">
      <Caption text="Could this RIVALRY be" inAt={0} outAt={25} fontSize={64} />
    </Sequence>
    <Sequence from={31} durationInFrames={62} layout="none">
      <Caption text="exactly what SHA'CARRI NEEDED?" outAt={48} fontSize={58} />
    </Sequence>
  </>
);
