import React from 'react';
import {Sequence} from 'remotion';
import {Caption} from '../components/Caption';
import {SCENE2_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S02_DUR = 152;
export const S02_CUTS = [38, 38, 38, 38];

export const Scene02: React.FC = () => (
  <>
    <Cuts cuts={SCENE2_CUTS} frames={S02_CUTS} amp={0.05} maxBlur={0} dim={0} />
    <Sequence from={3} durationInFrames={40} layout="none">
      <Caption text="NOW BLANEY HAS REVEALED" inAt={0} outAt={30} fontSize={50} bottom={430} />
    </Sequence>
    <Sequence from={44} durationInFrames={54} layout="none">
      <Caption text="the FIGHT WAS the RESULT of" inAt={0} outAt={42} fontSize={48} bottom={430} />
    </Sequence>
    <Sequence from={84} durationInFrames={44} layout="none">
      <Caption text="WEEKS OF FRUSTRATION" inAt={0} outAt={34} fontSize={56} bottom={430} />
    </Sequence>
    <Sequence from={122} durationInFrames={30} layout="none">
      <Caption text="NOT JUST ONE WRECK" inAt={0} outAt={22} fontSize={54} bottom={430} />
    </Sequence>
  </>
);
