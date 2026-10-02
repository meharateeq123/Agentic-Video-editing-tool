import React from 'react';
import {SceneBed} from '../components/Bed';
import {bed} from '../footage';

export const S12_DUR = 524; // 145.27 -> 162.73s

/**
 * Scene 12 — "NASCAR's Chase format reseeds the entire field once the playoffs begin. Regular-season p…"
 *
 * The clip carries this line on its own: it runs sharp, first frame to last, with a slow camera
 * push and no overlay. Nothing is added that the narration does not ask for.
 */
export const Scene12: React.FC = () => (
  <SceneBed {...bed(12)} dur={S12_DUR} wins={[]} amp={0.08} />
);
