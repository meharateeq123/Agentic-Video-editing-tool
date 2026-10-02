import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S26_DUR = mountedFrames(26);

/**
 * Scene 26 - "Now you know the prize, the catch, the entry, the deadline, and the fine print. But why does Cleetus keep dropping giveaways this massive?"
 *
 * Footage-only - no overlay. Per the user's standing note for this film: default every line to
 * no text; only add a graphic when there's a real photo or a real number comparison to show.
 */
export const Scene26: React.FC = () => <BedChain segs={chain(26)} dur={S26_DUR} />;
