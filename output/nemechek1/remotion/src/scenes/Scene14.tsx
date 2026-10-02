import React from 'react';
import {SceneBed} from '../components/Bed';
import {bed} from '../footage';

export const S14_DUR = 245; // 175.71 -> 183.85s

/**
 * Scene 14 — "That leaves the No. 42, Nemechek's former car, as the only open question at Legacy for n…"
 *
 * The clip carries this line on its own: it runs sharp, first frame to last, with a slow camera
 * push and no overlay. Nothing is added that the narration does not ask for.
 */
export const Scene14: React.FC = () => (
  <SceneBed {...bed(14)} dur={S14_DUR} wins={[]} amp={0.09} />
);
