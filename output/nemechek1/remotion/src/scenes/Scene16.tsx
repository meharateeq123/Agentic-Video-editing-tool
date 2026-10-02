import React from 'react';
import {SceneBed} from '../components/Bed';
import {bed} from '../footage';

export const S16_DUR = 301; // 213.60 -> 223.62s

/**
 * Scene 16 — "This is where the story actually gets interesting. Before Legacy's announcement, there w…"
 *
 * The clip carries this line on its own: it runs sharp, first frame to last, with a slow camera
 * push and no overlay. Nothing is added that the narration does not ask for.
 */
export const Scene16: React.FC = () => (
  <SceneBed {...bed(16)} dur={S16_DUR} wins={[]} amp={0.1} />
);
