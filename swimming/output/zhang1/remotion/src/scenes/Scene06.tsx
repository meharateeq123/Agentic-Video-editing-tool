import React from 'react';
import {Sequence} from 'remotion';
import {Caption} from '../components/Caption';
import {SCENE6_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S06_DUR = 87;
export const S06_CUTS = [29, 29, 29];

export const Scene06: React.FC = () => (
  <>
    <Cuts cuts={SCENE6_CUTS} frames={S06_CUTS} amp={0.05} maxBlur={0} dim={0} />
    <Sequence from={4} durationInFrames={38} layout="none">
      <Caption text="STILL ONE of SWIMMING'S" inAt={0} outAt={28} fontSize={52} bottom={430} />
    </Sequence>
    <Sequence from={42} durationInFrames={45} layout="none">
      <Caption text="BIGGEST STARS" inAt={0} outAt={40} fontSize={66} bottom={430} />
    </Sequence>
  </>
);
