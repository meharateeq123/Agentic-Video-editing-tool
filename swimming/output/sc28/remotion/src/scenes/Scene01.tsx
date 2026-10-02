import React from 'react';
import {Sequence} from 'remotion';
import {Caption} from '../components/Caption';
import {SCENE1_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S01_DUR = 150; // 0.00 -> 5.00s

export const S01_CUTS = [30, 30, 30, 30, 30];

/** Five one-second race cuts - the footage carries it, no card. */
export const Scene01: React.FC = () => (
  <>
    <Cuts cuts={SCENE1_CUTS} frames={S01_CUTS} amp={0.06} />
    <Sequence from={0} durationInFrames={80} layout="none">
      <Caption text="The OLD GUARD is facing a NEW GENERATION of swimmers" inAt={0} outAt={72} fontSize={50} />
    </Sequence>
    <Sequence from={80} durationInFrames={70} layout="none">
      <Caption text="who are BREAKING RECORDS and CHALLENGING CHAMPIONS." outAt={62} fontSize={50} />
    </Sequence>
  </>
);
