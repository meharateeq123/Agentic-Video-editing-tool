import React from 'react';
import {SceneBed} from '../components/Bed';
import {bed} from '../footage';

export const S03_DUR = 461; // 19.11 -> 34.45s

/**
 * Scene 3 — "On September 2, Legacy Motor Club confirmed that John Hunter Nemechek will not return to…"
 *
 * The clip carries this line on its own: it runs sharp, first frame to last, with a slow camera
 * push and no overlay. Nothing is added that the narration does not ask for.
 */
export const Scene03: React.FC = () => (
  <SceneBed {...bed(3)} dur={S03_DUR} wins={[]} amp={0.13} />
);
