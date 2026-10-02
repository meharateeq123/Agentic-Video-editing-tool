import React from 'react';
import {Sequence} from 'remotion';
import {Caption} from '../components/Caption';
import {SCENE6_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S06_DUR = 120; // 14.44 -> 18.44s
export const S06_CUTS = [40, 40, 40];

// "but McIntosh clearly believes" starts at 15.36s = scene frame 28.
export const Scene06: React.FC = () => (
  <>
    <Cuts cuts={SCENE6_CUTS} frames={S06_CUTS} amp={0.06} />
    <Sequence from={0} durationInFrames={28} layout="none">
      <Caption text="She won GOLD," inAt={0} outAt={22} fontSize={72} />
    </Sequence>
    <Sequence from={28} durationInFrames={92} layout="none">
      <Caption text="but McIntosh clearly believes she can go MUCH FASTER." outAt={72} fontSize={50} />
    </Sequence>
  </>
);
