import React from 'react';
import {SceneBed} from '../components/Bed';
import {bed} from '../footage';

export const S18_DUR = 644; // 201.03 -> 226.41s

/**
 * Scene 18 — the résumé. The tracks it names are pinned on the route map in
 * the next scene, so this one stays on the footage rather than mapping the
 * same places twice.
 */
export const Scene18: React.FC = () => <SceneBed {...bed(18)} dur={S18_DUR} amp={0.09} />;
