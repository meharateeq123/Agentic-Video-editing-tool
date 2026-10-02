import React from 'react';
import {SceneBed} from '../components/Bed';
import {bed} from '../footage';

export const S25_DUR = 291; // 349.53 -> 359.24s

/**
 * Scene 25 — "For John Hunter Nemechek, the 2027 Silly Season isn't over. It's just getting started. A…"
 *
 * The clip carries this line on its own: it runs sharp, first frame to last, with a slow camera
 * push and no overlay. Nothing is added that the narration does not ask for.
 */
export const Scene25: React.FC = () => (
  <SceneBed {...bed(25)} dur={S25_DUR} wins={[]} amp={0.11} />
);
