import React from 'react';
import {SceneBed} from '../components/Bed';
import {Caption} from '../components/Caption';
import {SCENE3_CUTS} from '../footage';

export const S03_DUR = 66; // 8.04 -> 10.23s

/** Scene 3 — the payoff beat, under the 3s cap; tight pack racing on the banking. */
export const Scene03: React.FC = () => (
  <SceneBed {...SCENE3_CUTS[0]} dur={S03_DUR} wins={[]} amp={0.07}>
    <Caption text="and grabbed a huge win when it mattered most." outAt={S03_DUR - 4} fontSize={58} />
  </SceneBed>
);
