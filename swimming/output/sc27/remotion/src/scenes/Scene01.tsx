import React from 'react';
import {Caption} from '../components/Caption';
import {SCENE1_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S01_DUR = 59; // 0.00 -> 1.96s

const CUT_FRAMES = [59];

/** A 25m final lining up - the footage carries it, no card. */
export const Scene01: React.FC = () => (
  <>
    <Cuts cuts={SCENE1_CUTS} frames={CUT_FRAMES} amp={0.06} />
    <Caption text="The SHORT-COURSE SEASON is almost here," inAt={0} outAt={52} fontSize={54} />
  </>
);
