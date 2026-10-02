import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S07_DUR = mountedFrames(7); // 145f, 1 link

/**
 * Scene 7 -- "To understand why this moment carries weight, you have to go back."
 *
 * A short bridge line, so a single short link.
 */
export const Scene07: React.FC = () => <BedChain segs={chain(7)} dur={S07_DUR} />;
