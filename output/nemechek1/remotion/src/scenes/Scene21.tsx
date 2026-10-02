import React from 'react';
import {SceneBed} from '../components/Bed';
import {bed} from '../footage';

export const S21_DUR = 344; // 292.22 -> 303.69s

/**
 * Scene 21 — "That record proves Nemechek can win consistently when he's in competitive equipment. The…"
 *
 * The clip carries this line on its own: it runs sharp, first frame to last, with a slow camera
 * push and no overlay. Nothing is added that the narration does not ask for.
 */
export const Scene21: React.FC = () => (
  <SceneBed {...bed(21)} dur={S21_DUR} wins={[]} amp={0.12} />
);
