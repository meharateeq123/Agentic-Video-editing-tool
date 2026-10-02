import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S04_DUR = mountedFrames(4);

/**
 * Scene 4 - "That's the position he was racing from when the green flag dropped at World Wide
 * Technology Raceway..." Footage-only.
 */
export const Scene04: React.FC = () => <BedChain segs={chain(4)} dur={S04_DUR} />;
