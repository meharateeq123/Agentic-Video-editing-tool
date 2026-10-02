import React from 'react';
import {SceneBed} from '../components/Bed';
import {bed} from '../footage';

export const S21_DUR = 425; // 316.83 -> 331.00s

/**
 * Scene 21 — "The Chase always starts at the track that shows no mercy. This year, it also starts at t…"
 *
 * The clip carries this line on its own: it runs sharp, first frame to last, with a slow camera
 * push and no overlay. Nothing is added that the narration does not ask for.
 */
export const Scene21: React.FC = () => (
  <SceneBed {...bed(21)} dur={S21_DUR} wins={[]} amp={0.1} />
);
