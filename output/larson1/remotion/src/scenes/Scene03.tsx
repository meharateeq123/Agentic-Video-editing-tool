import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S03_DUR = mountedFrames(3);

/**
 * Scene 3 - "Twenty-four cars between Larson and the front row before the green flag had even
 * waved." A short, punchy bridge line. P25 was just shown big in scene 2; repeating it here as
 * another graphic would be saying the same thing twice, so this one runs on the green-flag footage
 * alone.
 */
export const Scene03: React.FC = () => <BedChain segs={chain(3)} dur={S03_DUR} />;
