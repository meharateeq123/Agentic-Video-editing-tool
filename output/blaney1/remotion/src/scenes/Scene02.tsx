import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S02_DUR = mountedFrames(2);

/**
 * Scene 2 - "Ryan Blaney was running fifth. Then, in the blink of an eye, a piece of his own car
 * exploded through the hood. No crash. No mistake. Just one part, failing at the worst possible
 * second." Footage-only - real Gateway race action, no graphic needed for the hook line.
 */
export const Scene02: React.FC = () => <BedChain segs={chain(2)} dur={S02_DUR} />;
