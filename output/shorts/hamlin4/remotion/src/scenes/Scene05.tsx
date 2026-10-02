import React from 'react';
import {Sequence} from 'remotion';

import {Caption} from '../components/Caption';
import {SCENE5_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S05_DUR = 152;
export const S05_CUTS = [51, 51, 50];

export const Scene05: React.FC = () => (
  <>
    <Cuts cuts={SCENE5_CUTS} frames={S05_CUTS} amp={0.05} />
    <Sequence from={4} durationInFrames={49} layout="none">
      <Caption text="CAN HAMLIN FINALLY FINISH THE JOB" inAt={0} outAt={38} fontSize={50} />
    </Sequence>
    <Sequence from={53} durationInFrames={17} layout="none">
      <Caption text="AT KANSAS?" inAt={0} outAt={13} fontSize={66} />
    </Sequence>
    <Sequence from={72} durationInFrames={34} layout="none">
      <Caption text="OR WILL ANOTHER LATE RESTART" inAt={0} outAt={26} fontSize={52} />
    </Sequence>
    <Sequence from={106} durationInFrames={46} layout="none">
      <Caption text="DESTROY HIS RACE?" inAt={0} outAt={34} fontSize={60} />
    </Sequence>
  </>
);
