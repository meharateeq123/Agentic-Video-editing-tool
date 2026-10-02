import React from 'react';
import {SceneBed} from '../components/Bed';
import {bed} from '../footage';

export const S09_DUR = 664; // 104.51 -> 126.64s

/**
 * Scene 9 — "As the schedule turned toward summer, a string of on-track incidents and mechanical issu…"
 *
 * The clip carries this line on its own: it runs sharp, first frame to last, with a slow camera
 * push and no overlay. Nothing is added that the narration does not ask for.
 */
export const Scene09: React.FC = () => (
  <SceneBed {...bed(9)} dur={S09_DUR} wins={[]} amp={0.1} />
);
