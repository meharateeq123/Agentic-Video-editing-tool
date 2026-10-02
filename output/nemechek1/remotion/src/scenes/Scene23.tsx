import React from 'react';
import {SceneBed} from '../components/Bed';
import {bed} from '../footage';

export const S23_DUR = 574; // 316.56 -> 335.71s

/**
 * Scene 23 — "Nemechek still has roughly a third of the 2026 season left to make his case to other tea…"
 *
 * The clip carries this line on its own: it runs sharp, first frame to last, with a slow camera
 * push and no overlay. Nothing is added that the narration does not ask for.
 */
export const Scene23: React.FC = () => (
  <SceneBed {...bed(23)} dur={S23_DUR} wins={[]} amp={0.14} />
);
