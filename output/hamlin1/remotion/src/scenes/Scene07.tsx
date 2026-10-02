import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S07_DUR = mountedFrames(7);

/**
 * Scene 7 - "That setup, a strong car buried in traffic because of pit road, is exactly what put
 * Hamlin in position for the contact that followed." Under five seconds, and it is the sentence
 * that hands off to the crash, so it stays on traffic and gets out of the way.
 */
export const Scene07: React.FC = () => <BedChain segs={chain(7)} dur={S07_DUR} />;
