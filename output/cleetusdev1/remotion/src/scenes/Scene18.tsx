import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S18_DUR = mountedFrames(18); // 488f, 3 links

/**
 * Scene 18 -- "expect the video game side of his story to keep following right along with it."
 *
 * The career the game is following: ARCA, Rockingham, Talladega.
 */
export const Scene18: React.FC = () => <BedChain segs={chain(18)} dur={S18_DUR} />;
