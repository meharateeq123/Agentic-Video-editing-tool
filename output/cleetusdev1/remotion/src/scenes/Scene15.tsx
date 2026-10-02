import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S15_DUR = mountedFrames(15); // 560f, 3 links

/**
 * Scene 15 -- "his No. 30 ARCA Ford is in the game, in a paint scheme tied directly to his best on-track result of the year."
 *
 * The real car, then the result that gave the scheme its meaning, then the finish from the broadcast side.
 */
export const Scene15: React.FC = () => <BedChain segs={chain(15)} dur={S15_DUR} />;
