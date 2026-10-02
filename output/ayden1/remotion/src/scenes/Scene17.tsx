import React from 'react';
import {SceneShell} from '../components/SceneShell';
import {BEDS} from '../footage';

export const S17_DUR = 878; // 316.86 -> 346.12s

/** Scene 17 — what comes next: puberty, growth, training risk. Pure footage, reflective. */
export const Scene17: React.FC = () => <SceneShell beds={BEDS[17]} dur={S17_DUR} />;
