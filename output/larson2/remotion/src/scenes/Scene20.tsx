import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S20_DUR = mountedFrames(20);

/**
 * Scene 20 - "Nine points is nothing in a 10-race championship... Before Gateway, Hamlin was
 * racing with room to breathe. After it, he's racing with Kyle Larson in his mirror..."
 * Footage-only.
 */
export const Scene20: React.FC = () => <BedChain segs={chain(20)} dur={S20_DUR} />;
