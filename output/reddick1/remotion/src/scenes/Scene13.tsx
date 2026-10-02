import React from 'react';
import {SceneBed} from '../components/Bed';
import {bed} from '../footage';

export const S13_DUR = 367; // 162.73 -> 174.97s

/**
 * Scene 13 — "Think about that. A driver who was bleeding points for three months, badly enough to fal…"
 *
 * The clip carries this line on its own: it runs sharp, first frame to last, with a slow camera
 * push and no overlay. Nothing is added that the narration does not ask for.
 */
export const Scene13: React.FC = () => (
  <SceneBed {...bed(13)} dur={S13_DUR} wins={[]} amp={0.12} />
);
