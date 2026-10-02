import React from 'react';
import {SceneBed} from '../components/Bed';
import {bed} from '../footage';

export const S11_DUR = 188; // 120.98 -> 129.28s

/** Scene 11 — spins happen at every level. Narration; footage alone. */
export const Scene11: React.FC = () => <SceneBed {...bed(11)} dur={S11_DUR} amp={0.09} />;
