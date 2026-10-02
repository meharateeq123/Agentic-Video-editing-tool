import React from 'react';
import {Sequence} from 'remotion';
import {Caption} from '../components/Caption';
import {SCENE3_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S03_DUR = 111;
export const S03_CUTS = [37, 37, 37];

export const Scene03: React.FC = () => (
  <>
    <Cuts cuts={SCENE3_CUTS} frames={S03_CUTS} amp={0.05} maxBlur={0} dim={0} />
    <Sequence from={3} durationInFrames={44} layout="none">
      <Caption text="HE SAYS NASCAR MADE" inAt={0} outAt={34} fontSize={54} bottom={430} />
    </Sequence>
    <Sequence from={48} durationInFrames={30} layout="none">
      <Caption text="the RIGHT CALL" inAt={0} outAt={22} fontSize={62} bottom={430} />
    </Sequence>
    <Sequence from={74} durationInFrames={37} layout="none">
      <Caption text="NO PENALTY for EITHER DRIVER" inAt={0} outAt={28} fontSize={46} bottom={430} />
    </Sequence>
  </>
);
