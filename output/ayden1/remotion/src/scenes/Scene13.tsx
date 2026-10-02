import React from 'react';
import {SceneShell} from '../components/SceneShell';
import {BEDS} from '../footage';

export const S13_DUR = 263; // 227.60 -> 236.36s

/** Scene 13 — IM success signals a complete swimmer. Pure footage, no overlay. */
export const Scene13: React.FC = () => <SceneShell beds={BEDS[13]} dur={S13_DUR} />;
