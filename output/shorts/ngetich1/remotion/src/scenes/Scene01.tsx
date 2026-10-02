import React from 'react';
import {Sequence} from 'remotion';

import {Caption} from '../components/Caption';
import {SCENE1_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S01_DUR = 94;
export const S01_CUTS = [47, 47];

export const Scene01: React.FC = () => (
  <>
    <Cuts cuts={SCENE1_CUTS} frames={S01_CUTS} amp={0.06} />
    <Sequence from={0} durationInFrames={50} layout="none">
      <Caption text="AGNES NGETICH just" outAt={40} fontSize={54} />
    </Sequence>
    <Sequence from={50} durationInFrames={44} layout="none">
      <Caption text="DESTROYED a WORLD RECORD!" outAt={36} fontSize={56} />
    </Sequence>
  </>
);
