import React from 'react';
import {SceneBed} from '../components/Bed';
import {bed} from '../footage';

export const S08_DUR = 70; // 102.18 -> 104.51s

/**
 * Scene 8 — "Then the second half of his season happened."
 *
 * The clip carries this line on its own: it runs sharp, first frame to last, with a slow camera
 * push and no overlay. Nothing is added that the narration does not ask for.
 */
export const Scene08: React.FC = () => (
  <SceneBed {...bed(8)} dur={S08_DUR} wins={[]} amp={0.09} />
);
