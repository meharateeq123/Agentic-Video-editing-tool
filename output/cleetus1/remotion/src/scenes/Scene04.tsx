import React from 'react';
import {SceneBed} from '../components/Bed';
import {bed} from '../footage';

export const S04_DUR = 223; // 40.10 -> 50.12s

/**
 * Scene 4 — how the night started. P18 out of a stacked field is a fact the
 * voiceover states plainly and the running order of the race carries; it does
 * not need a chart of its own, and the same number is put on screen properly
 * in the two-race comparison later. Footage alone.
 */
export const Scene04: React.FC = () => <SceneBed {...bed(4)} dur={S04_DUR} amp={0.1} />;
