import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S11_DUR = mountedFrames(11);

/**
 * Scene 11 - "It just wasn't enough. Hamlin still leads the Chase standings, but his cushion
 * went from a comfortable gap to a nine-point margin..." Footage-only.
 */
export const Scene11: React.FC = () => <BedChain segs={chain(11)} dur={S11_DUR} />;
