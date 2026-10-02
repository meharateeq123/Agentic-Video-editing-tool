import React from 'react';
import {SceneBed} from '../components/Bed';
import {bed} from '../footage';

export const S15_DUR = 200; // 167.65 -> 176.56s

/** Scene 15 — "No crash. No late spin." A hard beat; the footage takes it. */
export const Scene15: React.FC = () => <SceneBed {...bed(15)} dur={S15_DUR} amp={0.105} />;
