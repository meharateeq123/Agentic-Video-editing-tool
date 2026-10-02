import React from 'react';
import {SceneBed} from '../components/Bed';
import {bed} from '../footage';

export const S18_DUR = 525; // 249.78 -> 267.25s

/**
 * Scene 18 — "And Toyota as a manufacturer is loaded. Six Toyota drivers made the 16-driver Chase fiel…"
 *
 * The clip carries this line on its own: it runs sharp, first frame to last, with a slow camera
 * push and no overlay. Nothing is added that the narration does not ask for.
 */
export const Scene18: React.FC = () => (
  <SceneBed {...bed(18)} dur={S18_DUR} wins={[]} amp={0.09} />
);
