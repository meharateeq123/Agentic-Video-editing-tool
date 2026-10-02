import React from 'react';
import {SceneBed} from '../components/Bed';
import {Caption} from '../components/Caption';
import {SCENE4_CUTS} from '../footage';

export const S04_DUR = 63; // 9.98 -> 12.07s

/** Scene 4 — one short beat, no graphic: the standings card lands in the next scene. */
export const Scene04: React.FC = () => (
  <>
    <SceneBed {...SCENE4_CUTS[0]} dur={S04_DUR} wins={[]} amp={0.06} />
    <Caption text="Now he sits LAST among the Chase drivers," outAt={S04_DUR - 2} fontSize={46} />
  </>
);
