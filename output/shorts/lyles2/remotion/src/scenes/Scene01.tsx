import React from 'react';
import {Sequence} from 'remotion';

import {Caption} from '../components/Caption';
import {SCENE1_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S01_DUR = 126;
export const S01_CUTS = [72, 54];

export const Scene01: React.FC = () => (
  <>
    <Cuts cuts={SCENE1_CUTS} frames={S01_CUTS} amp={0.05} />
    <Sequence from={0} durationInFrames={52} layout="none">
      <Caption text="NOAH LYLES JUST REMINDED EVERYONE" inAt={0} outAt={42} fontSize={50} />
    </Sequence>
    <Sequence from={52} durationInFrames={70} layout="none">
      <Caption text="WHY HE'S ONE OF AMERICA'S BIGGEST SPRINT STARS" inAt={0} outAt={60} fontSize={42} />
    </Sequence>
  </>
);
