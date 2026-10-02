import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S10_DUR = mountedFrames(10);

/**
 * Scene 10 - "Here's what makes this shift even more dangerous for Hamlin...Hamlin largely
 * stayed out of trouble, finishing ninth after a problematic pit stop..." Footage-only - real
 * Denny Hamlin race footage (highlights.mp4 offset 1112) carries this beat.
 */
export const Scene10: React.FC = () => <BedChain segs={chain(10)} dur={S10_DUR} />;
