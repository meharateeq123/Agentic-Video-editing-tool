import React from 'react';
import {SceneBed} from '../components/Bed';
import {bed} from '../footage';

export const S24_DUR = 415; // 335.71 -> 349.53s

/**
 * Scene 24 — "Legacy Motor Club still has to name Nemechek's replacement. Whether that turns out to be…"
 *
 * The clip carries this line on its own: it runs sharp, first frame to last, with a slow camera
 * push and no overlay. Nothing is added that the narration does not ask for.
 */
export const Scene24: React.FC = () => (
  <SceneBed {...bed(24)} dur={S24_DUR} wins={[]} amp={0.1} />
);
