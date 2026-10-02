import React from 'react';
import {Caption} from '../components/Caption';
import {SCENE1_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S01_DUR = 95; // 0.00 -> 3.18s
export const S01_CUTS = [95];

/** Real footage of Buescher — no card, the optimism is still intact here. */
export const Scene01: React.FC = () => (
  <>
    <Cuts cuts={SCENE1_CUTS} frames={S01_CUTS} amp={0.06} />
    <Caption text="Chris Buescher looked like he was heading for a much BETTER Gateway result." outAt={S01_DUR - 6} fontSize={40} />
  </>
);
