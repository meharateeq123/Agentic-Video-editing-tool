import React from 'react';
import {SceneBed} from '../components/Bed';
import {bed} from '../footage';

export const S18_DUR = 321; // 248.37 -> 259.06s

/**
 * Scene 18 — "In other words, Nemechek's departure from Legacy didn't open up a crowded market of poss…"
 *
 * The clip carries this line on its own: it runs sharp, first frame to last, with a slow camera
 * push and no overlay. Nothing is added that the narration does not ask for.
 */
export const Scene18: React.FC = () => (
  <SceneBed {...bed(18)} dur={S18_DUR} wins={[]} amp={0.09} />
);
