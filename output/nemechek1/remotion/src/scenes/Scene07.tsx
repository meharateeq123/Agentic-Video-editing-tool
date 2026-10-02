import React from 'react';
import {SceneBed} from '../components/Bed';
import {bed} from '../footage';

export const S07_DUR = 417; // 74.73 -> 88.64s

/**
 * Scene 7 — "Nemechek didn't stay quiet for long. He posted his own statement on social media, expres…"
 *
 * The clip carries this line on its own: it runs sharp, first frame to last, with a slow camera
 * push and no overlay. Nothing is added that the narration does not ask for.
 */
export const Scene07: React.FC = () => (
  <SceneBed {...bed(7)} dur={S07_DUR} wins={[]} amp={0.14} />
);
