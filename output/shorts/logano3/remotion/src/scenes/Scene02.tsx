import React from 'react';
import {Caption} from '../components/Caption';
import {SCENE2_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S02_DUR = 90; // 6.72 -> 9.71s

const CUT_FRAMES = [90];

/** The checkered flag falls — no card, the footage carries the line. */
export const Scene02: React.FC = () => (
  <>
    <Cuts cuts={SCENE2_CUTS} frames={CUT_FRAMES} amp={0.07} />
    <Caption text="But Kyle Larson's LATE STRATEGY helped change everything." outAt={S02_DUR - 4} fontSize={44} />
  </>
);
