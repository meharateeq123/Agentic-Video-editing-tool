import React from 'react';
import {SceneBed} from '../components/Bed';
import {Caption} from '../components/Caption';
import {SCENE1_CUTS} from '../footage';

export const S01_DUR = 56; // 0.00 -> 1.85s

/** Scene 1 — the hook. Straight to Gibbs on Darlington pit road, no graphic in the way. */
export const Scene01: React.FC = () => (
  <>
    <SceneBed {...SCENE1_CUTS[0]} dur={S01_DUR} wins={[]} amp={0.07} />
    <Caption text="After finishing SECOND at Darlington..." outAt={S01_DUR - 2} fontSize={46} />
  </>
);
