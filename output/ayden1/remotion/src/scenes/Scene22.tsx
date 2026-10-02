import React from 'react';
import {SceneShell} from '../components/SceneShell';
import {BEDS} from '../footage';

export const S22_DUR = 664; // 441.84 -> 463.98s

/** Scene 22 — the CTA close. Pure footage; the narration carries the ask. */
export const Scene22: React.FC = () => <SceneShell beds={BEDS[22]} dur={S22_DUR} />;
