import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S07_DUR = mountedFrames(7);

/**
 * Scene 7 - "It was his 33rd career Cup win, his first at Gateway, and his first since May of
 * 2025..." Footage-only - the real "GOES BACK TO VICTORY LANE...AND WINS" broadcast call
 * (highlights.mp4 offset 1907) carries this beat.
 */
export const Scene07: React.FC = () => <BedChain segs={chain(7)} dur={S07_DUR} />;
