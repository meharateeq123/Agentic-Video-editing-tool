import React from 'react';
import {SceneBed} from '../components/Bed';
import {Caption} from '../components/Caption';
import {SCENE4_CUTS} from '../footage';

export const S04_DUR = 94; // 9.15 -> 12.31s

/** Larson's own face after Darlington carries "needs a big result" — no card. */
export const Scene04: React.FC = () => (
  <>
    <SceneBed {...SCENE4_CUTS[0]} dur={S04_DUR} wins={[]} amp={0.06} />
    <Caption text="With the NASCAR playoffs HEATING UP, Larson needs a BIG result." outAt={S04_DUR - 4} fontSize={44} />
  </>
);
