import React from 'react';
import {Sequence} from 'remotion';
import {Caption} from '../components/Caption';
import {SCENE3_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S03_DUR = 187; // 11.72 -> 17.95s
export const S03_CUTS = [36, 34, 40, 38, 39];

/** Yu, then the race, then McIntosh's real world-record broadcast - the board prints 2:05.70 itself. */
export const Scene03: React.FC = () => (
  <>
    <Cuts cuts={SCENE3_CUTS} frames={S03_CUTS} amp={0.06} />
    <Sequence from={0} durationInFrames={46} layout="none">
      <Caption text="And here's the crazy part" outAt={38} fontSize={56} />
    </Sequence>
    <Sequence from={42} durationInFrames={100} layout="none">
      <Caption text="She finished just 0.40 seconds off" outAt={88} fontSize={54} />
    </Sequence>
    <Sequence from={138} durationInFrames={49} layout="none">
      <Caption text="Summer McIntosh's World Record" outAt={40} fontSize={48} />
    </Sequence>
  </>
);
