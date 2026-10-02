import React from 'react';
import {SceneBed} from '../components/Bed';
import {bed} from '../footage';

export const S10_DUR = 284; // 111.16 -> 120.98s

/** Scene 10 — "wrecking on a first attempt is nothing unusual." Narration. */
export const Scene10: React.FC = () => <SceneBed {...bed(10)} dur={S10_DUR} amp={0.1} />;
