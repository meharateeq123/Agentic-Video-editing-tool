import React from 'react';
import {SceneBed} from '../components/Bed';
import {bed} from '../footage';

export const S20_DUR = 317; // 244.73 -> 262.01s

/** Scene 20 — the pattern: more chances, not fewer. Narration; footage alone. */
export const Scene20: React.FC = () => <SceneBed {...bed(20)} dur={S20_DUR} amp={0.095} />;
