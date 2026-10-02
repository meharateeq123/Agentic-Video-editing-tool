import React from 'react';
import {SceneBed} from '../components/Bed';
import {bed} from '../footage';

export const S02_DUR = 175; // 16.59 -> 23.85s

/**
 * Scene 2 — "let's break down what happened". Pure narration: no graph, no
 * map, no one named who isn't already on screen. The footage carries it.
 */
export const Scene02: React.FC = () => <SceneBed {...bed(2)} dur={S02_DUR} amp={0.085} />;
