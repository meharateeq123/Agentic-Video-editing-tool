import React from 'react';
import {Sequence} from 'remotion';
import {Caption} from '../components/Caption';
import {SCENE4_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S04_DUR = 105;
export const S04_CUTS = [35, 35, 35];

export const Scene04: React.FC = () => (
  <>
    <Cuts cuts={SCENE4_CUTS} frames={S04_CUTS} amp={0.05} maxBlur={0} dim={0} />
    <Sequence from={3} durationInFrames={62} layout="none">
      <Caption text="NEXT OLYMPIC CYCLE already UNDERWAY" inAt={0} outAt={48} fontSize={52} bottom={430} />
    </Sequence>
    <Sequence from={72} durationInFrames={33} layout="none">
      <Caption text="THE QUESTION is SIMPLE" inAt={0} outAt={26} fontSize={54} bottom={430} />
    </Sequence>
  </>
);
