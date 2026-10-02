import React from 'react';
import {SceneBed} from '../components/Bed';
import {Caption} from '../components/Caption';
import {SCENE5_CUTS} from '../footage';

export const S05_DUR = 44; // 19.59 -> 21.08s

/** Scene 5 — the closing question, under the 3s cap already. */
export const Scene05: React.FC = () => (
  <SceneBed {...SCENE5_CUTS[0]} dur={S05_DUR} wins={[]} amp={0.07}>
    <Caption text="Could this be Bell's year?" outAt={S05_DUR - 4} fontSize={58} />
  </SceneBed>
);
