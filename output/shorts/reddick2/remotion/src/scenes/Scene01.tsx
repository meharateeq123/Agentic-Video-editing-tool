import React from 'react';
import {Caption} from '../components/Caption';
import {SCENE1_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S01_DUR = 94; // 0.00 -> 3.13s
export const S01_CUTS = [94];

/** Real footage of the field racing — no card, the trouble is still to come. */
export const Scene01: React.FC = () => (
  <>
    <Cuts cuts={SCENE1_CUTS} frames={S01_CUTS} amp={0.07} />
    <Caption text="Tyler Reddick's Gateway race went WRONG almost immediately." outAt={S01_DUR - 6} fontSize={44} />
  </>
);
