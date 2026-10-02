import React from 'react';
import {SceneBed} from '../components/Bed';
import {bed} from '../footage';

export const S10_DUR = 402; // 126.64 -> 140.03s

/**
 * Scene 10 — "Reddick himself compared the season to a coin, one side dominant, the other side rough, …"
 *
 * The clip carries this line on its own: it runs sharp, first frame to last, with a slow camera
 * push and no overlay. Nothing is added that the narration does not ask for.
 */
export const Scene10: React.FC = () => (
  <SceneBed {...bed(10)} dur={S10_DUR} wins={[]} amp={0.08} />
);
