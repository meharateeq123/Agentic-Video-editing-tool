import React from 'react';
import {Sequence} from 'remotion';
import {Caption} from '../components/Caption';
import {SCENE4_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S04_DUR = 79; // 11.56 -> 14.20s
export const S04_CUTS = [40, 39];

// No stamp here: the second cut is the broadcast's own FINISH bug reading 3:29.36, so the number
// the line says is already on the footage.
export const Scene04: React.FC = () => (
  <>
    <Cuts cuts={SCENE4_CUTS} frames={S04_CUTS} amp={0.06} />
    <Sequence from={0} durationInFrames={40} layout="none">
      <Caption text="and WON the 1500 METERS" outAt={32} fontSize={54} />
    </Sequence>
    <Sequence from={40} durationInFrames={39} layout="none">
      <Caption text="in 3:29.35." outAt={32} fontSize={64} />
    </Sequence>
  </>
);