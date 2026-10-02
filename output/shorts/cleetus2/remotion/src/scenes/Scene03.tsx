import React from 'react';
import {SceneBed} from '../components/Bed';
import {Caption} from '../components/Caption';
import {bed} from '../footage';

export const S03_DUR = 69; // 7.24 -> 9.52s

/** Scene 3 — "already featured": a different moment of the same NASCAR 25 gameplay. */
export const Scene03: React.FC = () => (
  <SceneBed {...bed(3)} dur={S03_DUR} wins={[]} amp={0.06}>
    <Caption text="He was already featured in NASCAR 25" outAt={S03_DUR - 4} fontSize={58} />
  </SceneBed>
);
