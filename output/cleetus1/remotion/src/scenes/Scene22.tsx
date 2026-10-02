import React from 'react';
import {SceneBed} from '../components/Bed';
import {bed} from '../footage';

export const S22_DUR = 582; // 280.56 -> 300.10s

/**
 * Scene 22 — the honest summary. It restates the second Berlin race, which
 * the running-position graph and the two-race comparison have both already
 * shown. Footage alone.
 */
export const Scene22: React.FC = () => <SceneBed {...bed(22)} dur={S22_DUR} amp={0.09} />;
