import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S30_DUR = mountedFrames(30);

/**
 * Scene 30 - "Which brings us to the exact question in the title. Is this his biggest giveaway ever?"
 *
 * Footage-only - no overlay. Per the user's standing note for this film: default every line to
 * no text; only add a graphic when there's a real photo or a real number comparison to show.
 */
export const Scene30: React.FC = () => <BedChain segs={chain(30)} dur={S30_DUR} />;
