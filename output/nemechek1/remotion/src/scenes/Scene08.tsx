import React from 'react';
import {SceneBed} from '../components/Bed';
import {bed} from '../footage';

export const S08_DUR = 319; // 88.64 -> 99.28s

/**
 * Scene 8 — "That response tells you a lot. This wasn't a driver expecting to be let go. It was a dri…"
 *
 * The clip carries this line on its own: it runs sharp, first frame to last, with a slow camera
 * push and no overlay. Nothing is added that the narration does not ask for.
 */
export const Scene08: React.FC = () => (
  <SceneBed {...bed(8)} dur={S08_DUR} wins={[]} amp={0.1} />
);
