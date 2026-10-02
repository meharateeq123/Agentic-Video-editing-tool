import React from 'react';
import {SceneBed} from '../components/Bed';
import {bed} from '../footage';

export const S07_DUR = 327; // 69.08 -> 81.23s

/** Scene 7 — the backlash. Narration; the footage carries it alone. */
export const Scene07: React.FC = () => <SceneBed {...bed(7)} dur={S07_DUR} amp={0.095} />;
