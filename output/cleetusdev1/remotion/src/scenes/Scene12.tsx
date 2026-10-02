import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S12_DUR = mountedFrames(12); // 430f, 3 links

/**
 * Scene 12 -- "both on real racetracks and inside the games that simulate them."
 *
 * Rockingham, then Talladega, then the broadcast finish: the real racetracks the line is claiming.
 */
export const Scene12: React.FC = () => <BedChain segs={chain(12)} dur={S12_DUR} />;
