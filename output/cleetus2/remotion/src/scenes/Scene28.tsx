import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S28_DUR = mountedFrames(28);

/**
 * Scene 28 - "And this big one isn't even alone - a separate Ram 2500 giveaway, a side-by-side giveaway, and smaller daily prize drops are running at the same time."
 *
 * Footage-only - no overlay. Per the user's standing note for this film: default every line to
 * no text; only add a graphic when there's a real photo or a real number comparison to show.
 */
export const Scene28: React.FC = () => <BedChain segs={chain(28)} dur={S28_DUR} />;
