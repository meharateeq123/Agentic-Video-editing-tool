import React from 'react';
import {SceneBed} from '../components/Bed';
import {bed} from '../footage';

export const S14_DUR = 384; // 174.97 -> 187.77s

/**
 * Scene 14 — "That's not a small break. That's a driver who just got a clean restart at the worst poin…"
 *
 * The clip carries this line on its own: it runs sharp, first frame to last, with a slow camera
 * push and no overlay. Nothing is added that the narration does not ask for.
 */
export const Scene14: React.FC = () => (
  <SceneBed {...bed(14)} dur={S14_DUR} wins={[]} amp={0.09} />
);
