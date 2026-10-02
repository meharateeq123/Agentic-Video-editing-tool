import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S33_DUR = mountedFrames(33);

/**
 * Scene 33 - "So let's bring it home: Corvette ZR1, 2500HD truck, matching trailer, $75,000 cash - $300,000 total. Track-only, given as-is. Free entry by mail, closing September 25, winner drawn October 2."
 *
 * Footage-only - no overlay. Per the user's standing note for this film: default every line to
 * no text; only add a graphic when there's a real photo or a real number comparison to show.
 */
export const Scene33: React.FC = () => <BedChain segs={chain(33)} dur={S33_DUR} />;
