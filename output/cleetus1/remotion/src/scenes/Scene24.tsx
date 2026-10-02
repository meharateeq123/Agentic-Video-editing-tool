import React from 'react';
import {SceneBed} from '../components/Bed';
import {bed} from '../footage';

export const S24_DUR = 425; // 312.13 -> 324.92s

/** Scene 24 — stacking races. Narration; the footage carries it alone. */
export const Scene24: React.FC = () => <SceneBed {...bed(24)} dur={S24_DUR} amp={0.1} />;
