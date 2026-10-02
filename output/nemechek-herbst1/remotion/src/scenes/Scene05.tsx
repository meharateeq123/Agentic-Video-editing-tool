import React from 'react';
import {SceneBed} from '../components/Bed';
import {Caption} from '../components/Caption';
import {bed} from '../footage';

export const S05_DUR = 52; // 13.86 -> 15.59s

/**
 * Scene 5 — "where does he go next?" A short beat, a different disjoint moment of the same
 * broadcast, keeping the question open rather than answering it with a graphic.
 */
export const Scene05: React.FC = () => (
  <SceneBed {...bed(5)} dur={S05_DUR} wins={[]} amp={0.05}>
    <Caption text="Where does he go next?" inAt={4} outAt={S05_DUR - 2} />
  </SceneBed>
);
