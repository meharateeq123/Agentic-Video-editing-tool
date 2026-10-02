import React from 'react';
import {SceneShell} from '../components/SceneShell';
import {BEDS} from '../footage';

export const S12_DUR = 568; // 208.66 -> 227.60s

/** Scene 12 — why range matters (four strokes, different skills). Pure footage, no overlay. */
export const Scene12: React.FC = () => <SceneShell beds={BEDS[12]} dur={S12_DUR} />;
