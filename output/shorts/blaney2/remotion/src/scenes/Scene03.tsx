import React from 'react';
import {Sequence} from 'remotion';
import {Caption} from '../components/Caption';
import {SCENE3_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S03_DUR = 113; // 11.97 -> 15.74s

const CUT_FRAMES = [50, 63];

/** The damaged car, then Blaney in the garage - the footage carries it, no card. */
export const Scene03: React.FC = () => (
  <>
    <Cuts cuts={SCENE3_CUTS} frames={CUT_FRAMES} amp={0.06} />
    <Sequence from={0} durationInFrames={44} layout="none">
      <Caption text="But here's the SCARY PART." outAt={36} fontSize={56} />
    </Sequence>
    <Sequence from={45} durationInFrames={68} layout="none">
      <Caption text="Blaney WASN'T THE ONLY DRIVER with BRAKE TROUBLE." outAt={62} fontSize={48} />
    </Sequence>
  </>
);
