import React from 'react';
import {Sequence} from 'remotion';
import {Caption} from '../components/Caption';
import {SCENE4_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S04_DUR = 134; // 9.96 -> 14.44s
export const S04_CUTS = [24, 62, 48];

// This scene carries the only numbers in the script and builds no card for them: cut 2 is the
// SEIKO photo finish itself, which prints 1 JEFFERSON-WOODEN 10.62 / 2 ALFRED 10.74 /
// 3 RICHARDSON 10.76. It is up from frame 24, and "10.76" is said at 10.80s = frame 25.
// "behind" starts at 11.88s = scene frame 58.
export const Scene04: React.FC = () => (
  <>
    <Cuts cuts={SCENE4_CUTS} frames={S04_CUTS} amp={0.05} />
    {/* Raised clear of the photo finish's own result list, which sits low in frame. */}
    <Sequence from={0} durationInFrames={58} layout="none">
      <Caption text="Sha'Carri ran 10.76," outAt={46} fontSize={62} bottom={860} />
    </Sequence>
    <Sequence from={58} durationInFrames={76} layout="none">
      <Caption text="behind MELISSA JEFFERSON-WOODEN and ALFRED." outAt={62} fontSize={50} bottom={860} />
    </Sequence>
  </>
);
