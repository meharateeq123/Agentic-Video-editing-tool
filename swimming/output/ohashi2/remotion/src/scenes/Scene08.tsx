import React from 'react';
import {Sequence} from 'remotion';

import {Caption} from '../components/Caption';
import {SCENE8_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S08_DUR = 78;
export const S08_CUTS = [39, 39];

export const Scene08: React.FC = () => (
  <>
    <Cuts cuts={SCENE8_CUTS} frames={S08_CUTS} amp={0.05} />
    <Sequence from={4} durationInFrames={35} layout="none">
      <Caption text="COULD THIS BECOME A HUGE" inAt={0} outAt={26} fontSize={50} />
    </Sequence>
    <Sequence from={40} durationInFrames={38} layout="none">
      <Caption text="OLYMPIC BATTLE?" inAt={0} outAt={28} fontSize={64} />
    </Sequence>
  </>
);
