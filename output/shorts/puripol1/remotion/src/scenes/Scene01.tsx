import React from 'react';
import {Sequence} from 'remotion';

import {Caption} from '../components/Caption';
import {SCENE1_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S01_DUR = 117;
export const S01_CUTS = [39, 39, 39];

export const Scene01: React.FC = () => (
  <>
    <Cuts cuts={SCENE1_CUTS} frames={S01_CUTS} amp={0.05} />
    <Sequence from={0} durationInFrames={39} layout="none">
      <Caption text="AFTER WINNING THE ASIAN GAMES" inAt={0} outAt={29} fontSize={48} />
    </Sequence>
    <Sequence from={40} durationInFrames={29} layout="none">
      <Caption text="100 METERS" inAt={0} outAt={22} fontSize={66} />
    </Sequence>
    <Sequence from={78} durationInFrames={39} layout="none">
      <Caption text="IN A STUNNING 9.90" inAt={0} outAt={29} fontSize={58} />
    </Sequence>
  </>
);
