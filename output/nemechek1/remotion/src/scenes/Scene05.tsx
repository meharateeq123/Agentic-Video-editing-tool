import React from 'react';
import {SceneBed} from '../components/Bed';
import {bed} from '../footage';

export const S05_DUR = 502; // 39.78 -> 56.51s

/**
 * Scene 5 — "The Athletic's Jordan Bianchi first broke the news a day earlier, on September 1. Accord…"
 *
 * The clip carries this line on its own: it runs sharp, first frame to last, with a slow camera
 * push and no overlay. Nothing is added that the narration does not ask for.
 */
export const Scene05: React.FC = () => (
  <SceneBed {...bed(5)} dur={S05_DUR} wins={[]} amp={0.12} />
);
