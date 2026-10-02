import React from 'react';
import {SceneBed} from '../components/Bed';
import {bed} from '../footage';

export const S12_DUR = 422; // 140.31 -> 154.36s

/**
 * Scene 12 — "A team that had extended him just months earlier reversed that decision based on a seaso…"
 *
 * The clip carries this line on its own: it runs sharp, first frame to last, with a slow camera
 * push and no overlay. Nothing is added that the narration does not ask for.
 */
export const Scene12: React.FC = () => (
  <SceneBed {...bed(12)} dur={S12_DUR} wins={[]} amp={0.1} />
);
