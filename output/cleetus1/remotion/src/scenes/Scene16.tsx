import React from 'react';
import {SceneBed} from '../components/Bed';
import {bed} from '../footage';

export const S16_DUR = 317; // 176.56 -> 184.26s

/** Scene 16 — Earnhardt's read on the second run. Narration; footage alone. */
export const Scene16: React.FC = () => <SceneBed {...bed(16)} dur={S16_DUR} amp={0.09} />;
