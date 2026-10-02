import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S17_DUR = mountedFrames(17);

/**
 * Scene 17 - "The second way is buying something in person at a Cleetus McFarland or GForce Media event. Same math: five dollars, one entry."
 *
 * Footage-only - no overlay. Per the user's standing note for this film: default every line to
 * no text; only add a graphic when there's a real photo or a real number comparison to show.
 */
export const Scene17: React.FC = () => <BedChain segs={chain(17)} dur={S17_DUR} />;
