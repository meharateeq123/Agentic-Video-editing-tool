import React from 'react';
import {SceneBed} from '../components/Bed';
import {bed} from '../footage';

export const S20_DUR = 806; // 289.95 -> 316.83s

/**
 * Scene 20 — "If Reddick wins the Southern 500, it doesn't just hand him a trophy. It hands him playof…"
 *
 * The clip carries this line on its own: it runs sharp, first frame to last, with a slow camera
 * push and no overlay. Nothing is added that the narration does not ask for.
 */
export const Scene20: React.FC = () => (
  <SceneBed {...bed(20)} dur={S20_DUR} wins={[]} amp={0.08} />
);
