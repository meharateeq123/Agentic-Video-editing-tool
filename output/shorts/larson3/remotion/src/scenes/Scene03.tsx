import React from 'react';
import {SceneBed} from '../components/Bed';
import {Caption} from '../components/Caption';
import {SCENE3_CUTS} from '../footage';

export const S03_DUR = 65; // 5.60 -> 7.76s

/** The burnout close-up — no card; the stakes land in scene 4. */
export const Scene03: React.FC = () => (
  <>
    <SceneBed {...SCENE3_CUTS[0]} dur={S03_DUR} wins={[]} amp={0.07} />
    <Caption text="But this win is BIGGER than ending a drought." outAt={S03_DUR - 3} fontSize={50} />
  </>
);
