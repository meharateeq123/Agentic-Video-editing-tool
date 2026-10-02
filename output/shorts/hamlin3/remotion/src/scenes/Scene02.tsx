import React from 'react';
import {Caption} from '../components/Caption';
import {SCENE2_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S02_DUR = 76; // 6.40 -> 8.92s

const CUT_FRAMES = [34, 42];

/** Bristol Motor Speedway this week - the footage carries it, no card. */
export const Scene02: React.FC = () => (
  <>
    <Cuts cuts={SCENE2_CUTS} frames={CUT_FRAMES} amp={0.06} />
    <Caption text="...with the playoffs heating up and BRISTOL coming next." outAt={S02_DUR - 4} fontSize={46} />
  </>
);
