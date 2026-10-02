import React from 'react';
import {SceneBed} from '../components/Bed';
import {bed} from '../footage';

export const S10_DUR = 219; // 112.75 -> 120.06s

/**
 * Scene 10 — "2025 looked like the breakthrough. He recorded two top-five finishes and eight top-10s, …"
 *
 * The clip carries this line on its own: it runs sharp, first frame to last, with a slow camera
 * push and no overlay. Nothing is added that the narration does not ask for.
 */
export const Scene10: React.FC = () => (
  <SceneBed {...bed(10)} dur={S10_DUR} wins={[]} amp={0.09} />
);
