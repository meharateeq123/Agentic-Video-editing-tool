import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S20_DUR = mountedFrames(20);

/**
 * Scene 20 - "The giveaway began August 7, 2026, and ends September 25 at 11:59pm Eastern. Mailed entries need to be postmarked by the 26th, in the mailbox by the 30th."
 *
 * Footage-only - no overlay. Per the user's standing note for this film: default every line to
 * no text; only add a graphic when there's a real photo or a real number comparison to show.
 */
export const Scene20: React.FC = () => <BedChain segs={chain(20)} dur={S20_DUR} />;
