import React from 'react';
import {SceneBed} from '../components/Bed';
import {bed} from '../footage';

export const S09_DUR = 405; // 99.28 -> 112.75s

/**
 * Scene 9 — "To understand the decision, look at the numbers. Nemechek joined Legacy Motor Club in 20…"
 *
 * The clip carries this line on its own: it runs sharp, first frame to last, with a slow camera
 * push and no overlay. Nothing is added that the narration does not ask for.
 */
export const Scene09: React.FC = () => (
  <SceneBed {...bed(9)} dur={S09_DUR} wins={[]} amp={0.11} />
);
