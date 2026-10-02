import React from 'react';
import {SceneBed} from '../components/Bed';
import {bed} from '../footage';

export const S13_DUR = 314; // 140.92 -> 154.17s

/**
 * Scene 13 — Berlin wasn't a one-off. The 75-lap distance is context for the
 * running-position graph that follows and is labelled there; a card of its
 * own here would put a third graphic in a row. Footage alone.
 */
export const Scene13: React.FC = () => <SceneBed {...bed(13)} dur={S13_DUR} amp={0.1} />;
