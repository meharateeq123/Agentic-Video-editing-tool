import React from 'react';
import {Sequence} from 'remotion';
import {Caption} from '../components/Caption';
import {SCENE2_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S02_DUR = 224;
export const S02_CUTS = [60, 50, 60, 54];

export const Scene02: React.FC = () => (
  <>
    <Cuts cuts={SCENE2_CUTS} frames={S02_CUTS} amp={0.05} maxBlur={0} dim={0} />
    <Sequence from={4} durationInFrames={54} layout="none">
      <Caption text="RFK RACING SPLIT WITH" inAt={0} outAt={42} fontSize={52} bottom={430} />
    </Sequence>
    <Sequence from={60} durationInFrames={58} layout="none">
      <Caption text="LONGTIME CREW CHIEF" inAt={0} outAt={44} fontSize={52} bottom={430} />
    </Sequence>
    <Sequence from={120} durationInFrames={54} layout="none">
      <Caption text="and 35-YEAR-OLD MIKE SKARBOWSKI" inAt={0} outAt={42} fontSize={42} bottom={430} />
    </Sequence>
    <Sequence from={176} durationInFrames={46} layout="none">
      <Caption text="HAS NOW TAKEN OVER the NO. 6" inAt={0} outAt={34} fontSize={46} bottom={430} />
    </Sequence>
  </>
);
