import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S02_DUR = mountedFrames(2);

/**
 * Scene 2 - "Forty-nine points. That's how far behind Denny Hamlin Kyle Larson was on Sunday
 * morning. By Sunday night, that number was nine... Here's exactly how it happened, and why Denny
 * Hamlin should be worried heading into Bristol." The hook restated - footage-only, the numbers
 * get their own cards later once they have context (scenes 3, 6, 8).
 */
export const Scene02: React.FC = () => <BedChain segs={chain(2)} dur={S02_DUR} />;
