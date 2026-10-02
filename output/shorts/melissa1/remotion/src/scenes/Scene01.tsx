import React from 'react';
import {Caption} from '../components/Caption';
import {SCENE1_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S01_DUR = 96; // 0.00 -> 3.21s
export const S01_CUTS = [96];

/** Real footage of her at the blocks — no card, the anticipation carries this one. */
export const Scene01: React.FC = () => (
  <>
    <Cuts cuts={SCENE1_CUTS} frames={S01_CUTS} amp={0.05} />
    <Caption text="Melissa Jefferson-Wooden just took her season to another level." outAt={S01_DUR - 6} fontSize={40} />
  </>
);
