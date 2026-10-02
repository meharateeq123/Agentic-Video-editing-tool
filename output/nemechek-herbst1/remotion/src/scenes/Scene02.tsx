import React from 'react';
import {SceneBed} from '../components/Bed';
import {Caption} from '../components/Caption';
import {bed} from '../footage';

export const S02_DUR = 66; // 4.66 -> 6.88s

/**
 * Scene 2 — "and the shocking part?" A disjoint later moment of the same victory lane — the
 * celebration keeps going as the question lands, a quick beat before the reveal.
 */
export const Scene02: React.FC = () => (
  <SceneBed {...bed(2)} dur={S02_DUR} wins={[]} amp={0.05}>
    <Caption text="And the shocking part?" inAt={4} outAt={S02_DUR - 2} />
  </SceneBed>
);
