import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S27_DUR = mountedFrames(27);

/**
 * Scene 27 - "Every entry runs through his store, his memberships, or his streaming service. The giveaway is the engine that powers his entire business."
 *
 * Footage-only - no overlay. Per the user's standing note for this film: default every line to
 * no text; only add a graphic when there's a real photo or a real number comparison to show.
 */
export const Scene27: React.FC = () => <BedChain segs={chain(27)} dur={S27_DUR} />;
