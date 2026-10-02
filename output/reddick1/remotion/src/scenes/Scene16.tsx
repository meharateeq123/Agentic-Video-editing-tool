import React from 'react';
import {SceneBed} from '../components/Bed';
import {bed} from '../footage';

export const S16_DUR = 743; // 201.74 -> 226.49s

/**
 * Scene 16 — "That consistency matters more at Darlington than almost anywhere else on the schedule. K…"
 *
 * The clip carries this line on its own: it runs sharp, first frame to last, with a slow camera
 * push and no overlay. Nothing is added that the narration does not ask for.
 */
export const Scene16: React.FC = () => (
  <SceneBed {...bed(16)} dur={S16_DUR} wins={[]} amp={0.08} />
);
