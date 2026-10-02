import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S12_DUR = mountedFrames(12);

/**
 * Scene 12 - "Chase Briscoe started fifth, followed by Carson Hocevar in sixth, giving the top six
 * spots to six different Chase-eligible drivers before a single lap of Sunday's race had even been
 * run." Short beat (9s) continuing straight off Scene 11's lineup card - too brief to comfortably
 * animate a second card in and out on its own, so it stays footage-only.
 */
export const Scene12: React.FC = () => <BedChain segs={chain(12)} dur={S12_DUR} />;
