import React from 'react';
import {SceneBed} from '../components/Bed';
import {bed} from '../footage';

export const S06_DUR = 252; // 74.00 -> 82.39s

/**
 * Scene 6 — "To understand why Reddick is such a dangerous name heading into the postseason, you have…"
 *
 * The clip carries this line on its own: it runs sharp, first frame to last, with a slow camera
 * push and no overlay. Nothing is added that the narration does not ask for.
 */
export const Scene06: React.FC = () => (
  <SceneBed {...bed(6)} dur={S06_DUR} wins={[]} amp={0.08} />
);
