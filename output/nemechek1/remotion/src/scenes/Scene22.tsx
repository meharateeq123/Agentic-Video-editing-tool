import React from 'react';
import {SceneBed} from '../components/Bed';
import {bed} from '../footage';

export const S22_DUR = 386; // 303.69 -> 316.56s

/**
 * Scene 22 — "So the real question for Nemechek isn't whether he can drive. It's whether he can find a…"
 *
 * The clip carries this line on its own: it runs sharp, first frame to last, with a slow camera
 * push and no overlay. Nothing is added that the narration does not ask for.
 */
export const Scene22: React.FC = () => (
  <SceneBed {...bed(22)} dur={S22_DUR} wins={[]} amp={0.09} />
);
