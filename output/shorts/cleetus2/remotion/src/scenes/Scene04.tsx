import React from 'react';
import {SceneBed} from '../components/Bed';
import {Caption} from '../components/Caption';
import {bed} from '../footage';

export const S04_DUR = 53; // 9.52 -> 11.30s

/** Scene 4 — the confirmation beat: a third disjoint moment of the same gameplay clip. */
export const Scene04: React.FC = () => (
  <SceneBed {...bed(4)} dur={S04_DUR} wins={[]} amp={0.06}>
    <Caption text="but now he's officially returning" outAt={S04_DUR - 4} fontSize={60} />
  </SceneBed>
);
