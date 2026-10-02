import React from 'react';
import {Sequence} from 'remotion';
import {Caption} from '../components/Caption';
import {SCENE4_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S04_DUR = 125;
export const S04_CUTS = [31, 31, 31, 32];

export const Scene04: React.FC = () => (
  <>
    <Cuts cuts={SCENE4_CUTS} frames={S04_CUTS} amp={0.05} maxBlur={0} dim={0} />
    <Sequence from={3} durationInFrames={58} layout="none">
      <Caption text="THE CHAMPIONSHIP FIGHT is SO TIGHT" inAt={0} outAt={46} fontSize={42} />
    </Sequence>
    <Sequence from={66} durationInFrames={59} layout="none">
      <Caption text="ONE LATE RESTART COULD CHANGE EVERYTHING" inAt={0} outAt={46} fontSize={38} />
    </Sequence>
  </>
);
