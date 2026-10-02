import React from 'react';
import {SceneShell} from '../components/SceneShell';
import {BEDS} from '../footage';

export const S16_DUR = 575; // 297.70 -> 316.86s

/** Scene 16 — club changes: DART, CROW, San Ramon Valley Aquatics, Phoenix. Pure footage. */
export const Scene16: React.FC = () => <SceneShell beds={BEDS[16]} dur={S16_DUR} />;
