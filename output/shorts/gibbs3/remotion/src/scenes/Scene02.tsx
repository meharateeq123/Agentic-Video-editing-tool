import React from 'react';
import {Caption} from '../components/Caption';
import {SCENE2_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S02_DUR = 102; // 4.68 -> 8.08s

const CUT_FRAMES = [50, 52];

/** Bristol Motor Speedway this week - the footage carries it, no card. */
export const Scene02: React.FC = () => (
  <>
    <Cuts cuts={SCENE2_CUTS} frames={CUT_FRAMES} amp={0.06} />
    <Caption text="But now he heads to BRISTOL, and this could be his chance to FIGHT BACK." outAt={94} fontSize={48} />
  </>
);
