import React from 'react';
import {SceneBed} from '../components/Bed';
import {bed} from '../footage';

export const S04_DUR = 159; // 34.45 -> 39.78s

/**
 * Scene 4 — "That's the official version. But the story behind it is far more complicated, and far mo…"
 *
 * The clip carries this line on its own: it runs sharp, first frame to last, with a slow camera
 * push and no overlay. Nothing is added that the narration does not ask for.
 */
export const Scene04: React.FC = () => (
  <SceneBed {...bed(4)} dur={S04_DUR} wins={[]} amp={0.1} />
);
