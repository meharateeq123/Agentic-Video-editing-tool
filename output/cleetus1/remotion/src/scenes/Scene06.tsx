import React from 'react';
import {SceneBed} from '../components/Bed';
import {bed} from '../footage';

export const S06_DUR = 252; // 59.90 -> 69.08s

/**
 * Scene 6 — his own explanation of the spin. It is a quote, not data: no
 * graph, no map, nobody new named. Footage alone.
 */
export const Scene06: React.FC = () => <SceneBed {...bed(6)} dur={S06_DUR} amp={0.1} />;
