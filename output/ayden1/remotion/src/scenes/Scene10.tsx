import React from 'react';
import {SceneShell} from '../components/SceneShell';
import {BEDS} from '../footage';

export const S10_DUR = 298; // 179.40 -> 189.34s

/** Scene 10 — six of seven consecutive weekends. Pure footage, no overlay. */
export const Scene10: React.FC = () => <SceneShell beds={BEDS[10]} dur={S10_DUR} />;
