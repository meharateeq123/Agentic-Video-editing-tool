import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S16_DUR = mountedFrames(16);

/**
 * Scene 16 - "A driver who kept that level of belief through 51 races without a win, and then
 * delivered exactly when it mattered most, is not a driver who's likely to fade quietly back into
 * the middle of the pack." Footage-only.
 */
export const Scene16: React.FC = () => <BedChain segs={chain(16)} dur={S16_DUR} />;
