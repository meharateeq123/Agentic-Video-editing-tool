import React from 'react';
import {Sequence} from 'remotion';

import {Caption} from '../components/Caption';
import {SCENE1_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S01_DUR = 72;
export const S01_CUTS = [36, 36];

export const Scene01: React.FC = () => (
  <>
    <Cuts cuts={SCENE1_CUTS} frames={S01_CUTS} amp={0.06} />
    <Sequence from={0} durationInFrames={32} layout="none">
      <Caption text="BUBBA WALLACE knows" inAt={0} outAt={22} fontSize={56} />
    </Sequence>
    <Sequence from={27} durationInFrames={45} layout="none">
      <Caption text="KANSAS could change EVERYTHING" inAt={0} outAt={38} fontSize={56} />
    </Sequence>
  </>
);
