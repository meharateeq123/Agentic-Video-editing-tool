import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S31_DUR = mountedFrames(31);

/**
 * Scene 31 - "Based on his recent history, the answer is yes - and the climb is wild to watch."
 *
 * Footage-only - no overlay. Per the user's standing note for this film: default every line to
 * no text; only add a graphic when there's a real photo or a real number comparison to show.
 */
export const Scene31: React.FC = () => <BedChain segs={chain(31)} dur={S31_DUR} />;
