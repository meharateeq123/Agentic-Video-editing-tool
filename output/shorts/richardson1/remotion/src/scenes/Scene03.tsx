import React from 'react';
import {Sequence} from 'remotion';
import {Caption} from '../components/Caption';
import {SCENE3_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S03_DUR = 118; // 6.02 -> 9.96s
export const S03_CUTS = [40, 39, 39];

// No graphic here on purpose. The shot under this line is the two Americans in the semi-final, and
// nothing in the Budapest feed names Julien Alfred next to a face, so nothing gets labelled.
// "actually helped her" starts at 7.66s = scene frame 49.
export const Scene03: React.FC = () => (
  <>
    <Cuts cuts={SCENE3_CUTS} frames={S03_CUTS} amp={0.06} />
    <Sequence from={0} durationInFrames={49} layout="none">
      <Caption text="But she says rival JULIEN ALFRED" outAt={40} fontSize={56} />
    </Sequence>
    <Sequence from={49} durationInFrames={69} layout="none">
      <Caption text="actually HELPED HER REGAIN HER FORM." outAt={56} fontSize={54} />
    </Sequence>
  </>
);
