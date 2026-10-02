import React from 'react';
import {Sequence} from 'remotion';

import {Caption} from '../components/Caption';
import {SCENE4_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S04_DUR = 96;
export const S04_CUTS = [48, 48];

export const Scene04: React.FC = () => (
  <>
    <Cuts cuts={SCENE4_CUTS} frames={S04_CUTS} amp={0.06} />
    <Sequence from={7} durationInFrames={24} layout="none">
      <Caption text="ONE LATE RESTART" inAt={0} outAt={16} fontSize={60} />
    </Sequence>
    <Sequence from={32} durationInFrames={32} layout="none">
      <Caption text="could COMPLETELY CHANGE" inAt={0} outAt={22} fontSize={56} />
    </Sequence>
    <Sequence from={64} durationInFrames={32} layout="none">
      <Caption text="the CHAMPIONSHIP PICTURE" inAt={0} outAt={22} fontSize={56} />
    </Sequence>
  </>
);
