import React from 'react';
import {Caption} from '../components/Caption';
import {SCENE1_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S01_DUR = 107; // 0.00 -> 3.56s
export const S01_CUTS = [107];

/** Real footage of the dive - no card, the anticipation carries this one. */
export const Scene01: React.FC = () => (
  <>
    <Cuts cuts={SCENE1_CUTS} frames={S01_CUTS} amp={0.05} />
    <Caption text="Gretchen Walsh keeps pushing the 100-meter butterfly record higher." outAt={S01_DUR - 6} fontSize={38} />
  </>
);
