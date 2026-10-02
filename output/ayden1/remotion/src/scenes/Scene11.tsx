import React from 'react';
import {SceneShell} from '../components/SceneShell';
import {BEDS} from '../footage';

export const S11_DUR = 580; // 189.34 -> 208.66s

/** Scene 11 — the range of events. Pure footage montage, no overlay. */
export const Scene11: React.FC = () => <SceneShell beds={BEDS[11]} dur={S11_DUR} />;
