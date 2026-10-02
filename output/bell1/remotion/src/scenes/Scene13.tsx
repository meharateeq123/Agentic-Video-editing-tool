import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S13_DUR = mountedFrames(13);

/**
 * Scene 13 -- "A regular-season win is valuable. A Chase-opening win is something else entirely." A short pivot into the standings section; the cards start again in scene 14.
 */
export const Scene13: React.FC = () => <BedChain segs={chain(13)} dur={S13_DUR} />;