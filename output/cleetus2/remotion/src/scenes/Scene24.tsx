import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S24_DUR = mountedFrames(24);

/**
 * Scene 24 - "The second is taxes. A $300,000 prize counts as taxable income - the real cost of winning is the tax bill, not the car."
 *
 * Footage-only - no overlay. Per the user's standing note for this film: default every line to
 * no text; only add a graphic when there's a real photo or a real number comparison to show.
 */
export const Scene24: React.FC = () => <BedChain segs={chain(24)} dur={S24_DUR} />;
