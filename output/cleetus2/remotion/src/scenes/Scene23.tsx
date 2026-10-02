import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S23_DUR = mountedFrames(23);

/**
 * Scene 23 - "The winner has to pick up the prize in person in Bradenton, Florida, within thirty days - with a valid license and proof of insurance."
 *
 * Footage-only - no overlay. Per the user's standing note for this film: default every line to
 * no text; only add a graphic when there's a real photo or a real number comparison to show.
 */
export const Scene23: React.FC = () => <BedChain segs={chain(23)} dur={S23_DUR} />;
