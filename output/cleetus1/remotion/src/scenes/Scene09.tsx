import React from 'react';
import {SceneBed} from '../components/Bed';
import {bed} from '../footage';

export const S09_DUR = 492; // 91.26 -> 111.16s

/** Scene 9 — Earnhardt's argument, spoken. Footage alone. */
export const Scene09: React.FC = () => <SceneBed {...bed(9)} dur={S09_DUR} amp={0.09} />;
