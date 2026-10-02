import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S34_DUR = mountedFrames(34);

/**
 * Scene 34 - "If you won, would you keep that track-ready Corvette and race it, or sell it and pocket the cash? Drop your answer in the comments."
 *
 * Footage-only - no overlay. Per the user's standing note for this film: default every line to
 * no text; only add a graphic when there's a real photo or a real number comparison to show.
 */
export const Scene34: React.FC = () => <BedChain segs={chain(34)} dur={S34_DUR} />;
