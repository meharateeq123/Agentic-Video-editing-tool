import React from 'react';
import {Sequence} from 'remotion';
import {Caption} from '../components/Caption';
import {SCENE1_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S01_DUR = 132;
export const S01_CUTS = [44, 44, 44];

export const Scene01: React.FC = () => (
  <>
    <Cuts cuts={SCENE1_CUTS} frames={S01_CUTS} amp={0.05} maxBlur={0} dim={0} />
    <Sequence from={3} durationInFrames={44} layout="none">
      <Caption text="RYAN BLANEY is STILL CARRYING" inAt={0} outAt={34} fontSize={46} bottom={430} />
    </Sequence>
    <Sequence from={48} durationInFrames={40} layout="none">
      <Caption text="a BLACK EYE from his" inAt={0} outAt={30} fontSize={54} bottom={430} />
    </Sequence>
    <Sequence from={90} durationInFrames={42} layout="none">
      <Caption text="BRISTOL FIGHT with CARSON HOCEVAR" inAt={0} outAt={34} fontSize={40} bottom={430} />
    </Sequence>
  </>
);
