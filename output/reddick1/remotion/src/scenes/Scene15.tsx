import React from 'react';
import {SceneBed} from '../components/Bed';
import {bed} from '../footage';

export const S15_DUR = 419; // 187.77 -> 201.74s

/**
 * Scene 15 — "This isn't just about one win in March. Reddick has built a real track record at Darling…"
 *
 * The clip carries this line on its own: it runs sharp, first frame to last, with a slow camera
 * push and no overlay. Nothing is added that the narration does not ask for.
 */
export const Scene15: React.FC = () => (
  <SceneBed {...bed(15)} dur={S15_DUR} wins={[]} amp={0.11} />
);
