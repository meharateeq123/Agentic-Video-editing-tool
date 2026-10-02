import React from 'react';
import {SceneBed} from '../components/Bed';
import {bed} from '../footage';

export const S23_DUR = 319; // 300.10 -> 312.13s

/**
 * Scene 23 — Earnhardt's message. It is a spoken argument, not data, and
 * putting it on screen as type would be a caption. Footage alone.
 */
export const Scene23: React.FC = () => <SceneBed {...bed(23)} dur={S23_DUR} amp={0.085} />;
