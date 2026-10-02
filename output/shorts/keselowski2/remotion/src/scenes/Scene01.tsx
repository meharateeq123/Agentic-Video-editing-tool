import React from 'react';
import {Sequence} from 'remotion';
import {Caption} from '../components/Caption';
import {SCENE1_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S01_DUR = 104;
export const S01_CUTS = [55, 49];

export const Scene01: React.FC = () => (
  <>
    <Cuts cuts={SCENE1_CUTS} frames={S01_CUTS} amp={0.05} maxBlur={0} dim={0} />
    <Sequence from={2} durationInFrames={44} layout="none">
      <Caption text="BRAD KESELOWSKI'S TEAM" inAt={0} outAt={34} fontSize={54} bottom={430} />
    </Sequence>
    <Sequence from={48} durationInFrames={54} layout="none">
      <Caption text="JUST WENT THROUGH a MAJOR CHANGE" inAt={0} outAt={40} fontSize={44} bottom={430} />
    </Sequence>
  </>
);
