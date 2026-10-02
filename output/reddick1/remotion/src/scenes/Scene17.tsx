import React from 'react';
import {SceneBed} from '../components/Bed';
import {bed} from '../footage';

export const S17_DUR = 698; // 226.49 -> 249.78s

/**
 * Scene 17 — "To be clear, Reddick isn't walking into an empty field. Hamlin enters as the No. 1 seed …"
 *
 * The clip carries this line on its own: it runs sharp, first frame to last, with a slow camera
 * push and no overlay. Nothing is added that the narration does not ask for.
 */
export const Scene17: React.FC = () => (
  <SceneBed {...bed(17)} dur={S17_DUR} wins={[]} amp={0.13} />
);
