import React from 'react';
import {SceneBed} from '../components/Bed';
import {bed} from '../footage';

export const S12_DUR = 364; // 129.28 -> 140.92s

/** Scene 12 — the contradiction Earnhardt called out. Narration; footage alone. */
export const Scene12: React.FC = () => <SceneBed {...bed(12)} dur={S12_DUR} amp={0.095} />;
