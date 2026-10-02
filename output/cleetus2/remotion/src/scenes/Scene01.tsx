import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S01_DUR = mountedFrames(1);

/**
 * Scene 1 - "Cleetus McFarland JUST Dropped a MASSIVE $300,000 Giveaway! (title, no card - the line itself is the hook)"
 *
 * Footage-only - no overlay. Per the user's standing note for this film: default every line to
 * no text; only add a graphic when there's a real photo or a real number comparison to show.
 */
export const Scene01: React.FC = () => <BedChain segs={chain(1)} dur={S01_DUR} />;
