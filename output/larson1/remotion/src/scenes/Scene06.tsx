import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S06_DUR = mountedFrames(6);

/**
 * Scene 6 - "Starting 25th and leading the most laps in the race isn't a coincidence. It's a
 * signal." A short, declarative line right after the bar chart proved the point - putting another
 * graphic under a line that's *about* not needing more proof would undercut itself.
 */
export const Scene06: React.FC = () => <BedChain segs={chain(6)} dur={S06_DUR} />;
