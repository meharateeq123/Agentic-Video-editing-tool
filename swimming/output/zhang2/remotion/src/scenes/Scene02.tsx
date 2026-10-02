import React from 'react';
import {Sequence} from 'remotion';

import {Caption} from '../components/Caption';
import {SCENE2_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S02_DUR = 139;
export const S02_CUTS = [46, 47, 46];

export const Scene02: React.FC = () => (
  <>
    <Cuts cuts={SCENE2_CUTS} frames={S02_CUTS} amp={0.05} />
    <Sequence from={3} durationInFrames={44} layout="none">
      <Caption text="IN THE 200-METER FREESTYLE" inAt={0} outAt={33} fontSize={52} />
    </Sequence>
    <Sequence from={48} durationInFrames={41} layout="none">
      <Caption text="AT THE ASIAN GAMES" inAt={0} outAt={30} fontSize={58} />
    </Sequence>
    <Sequence from={93} durationInFrames={46} layout="none">
      <Caption text="SMASHING THE ASIAN RECORD" inAt={0} outAt={34} fontSize={54} />
    </Sequence>
  </>
);
