import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S09_DUR = mountedFrames(9); // 373f, 2 links

/**
 * Scene 9 -- "He was added because he was already racing against those same drivers in real ARCA events."
 *
 * Two views of that actual racing.
 */
export const Scene09: React.FC = () => <BedChain segs={chain(9)} dur={S09_DUR} />;
