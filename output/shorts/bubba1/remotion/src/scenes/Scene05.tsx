import React from 'react';
import {Sequence} from 'remotion';

import {Caption} from '../components/Caption';
import {SCENE5_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S05_DUR = 115;
export const S05_CUTS = [115];

// Bubba's own voice, no VO: "...winning Sunday, ultimately flips the script for all of us." Captions
// follow his words. In the bed's own time: winning 0.63s, Sunday 0.97s, [1.4s jump cut], Ultimately
// 1.54s, flips 2.14s, the 2.58s, script 2.76s, for 3.04s, all 3.34s, of 3.46s, us 3.58s.
export const Scene05: React.FC = () => (
  <>
    <Cuts cuts={SCENE5_CUTS} frames={S05_CUTS} amp={0.05} />
    <Sequence from={16} durationInFrames={30} layout="none">
      <Caption text="WINNING SUNDAY" inAt={0} outAt={20} fontSize={62} />
    </Sequence>
    <Sequence from={45} durationInFrames={30} layout="none">
      <Caption text="ULTIMATELY FLIPS" inAt={0} outAt={22} fontSize={62} />
    </Sequence>
    <Sequence from={75} durationInFrames={40} layout="none">
      <Caption text="the SCRIPT for ALL of US" inAt={0} outAt={34} fontSize={62} />
    </Sequence>
  </>
);
