import React from 'react';
import {SceneBed} from '../components/Bed';
import {bed} from '../footage';

export const S19_DUR = 363; // 259.06 -> 271.18s

/**
 * Scene 19 — "That's what makes this situation different from a typical driver change. Nemechek isn't …"
 *
 * The clip carries this line on its own: it runs sharp, first frame to last, with a slow camera
 * push and no overlay. Nothing is added that the narration does not ask for.
 */
export const Scene19: React.FC = () => (
  <SceneBed {...bed(19)} dur={S19_DUR} wins={[]} amp={0.13} />
);
