import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S11_DUR = mountedFrames(11);

/**
 * Scene 11 - "Let that sink in. The Corvette and the truck are track machines. You could not legally drive them to work on Monday morning. The rules go further - handed over as is, no warranty, some parts preowned."
 *
 * Footage-only - no overlay. Per the user's standing note for this film: default every line to
 * no text; only add a graphic when there's a real photo or a real number comparison to show.
 */
export const Scene11: React.FC = () => <BedChain segs={chain(11)} dur={S11_DUR} />;
