import React from 'react';
import {SceneBed} from '../components/Bed';
import {bed} from '../footage';

export const S02_DUR = 229; // 11.45 -> 19.11s

/**
 * Scene 2 — "Let's go through exactly what happened, why it caught the entire NASCAR world off guard,…"
 *
 * The clip carries this line on its own: it runs sharp, first frame to last, with a slow camera
 * push and no overlay. Nothing is added that the narration does not ask for.
 */
export const Scene02: React.FC = () => (
  <SceneBed {...bed(2)} dur={S02_DUR} wins={[]} amp={0.09} />
);
