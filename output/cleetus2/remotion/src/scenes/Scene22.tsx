import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S22_DUR = mountedFrames(22);

/**
 * Scene 22 - "But before you start spending, there are two more things the highlight reels never mention."
 *
 * Footage-only - no overlay. Per the user's standing note for this film: default every line to
 * no text; only add a graphic when there's a real photo or a real number comparison to show.
 */
export const Scene22: React.FC = () => <BedChain segs={chain(22)} dur={S22_DUR} />;
