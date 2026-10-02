import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S19_DUR = mountedFrames(19);

/**
 * Scene 19 -- "That conversation just changed completely." The turn of the argument, carried by the win footage rather than another card.
 */
export const Scene19: React.FC = () => <BedChain segs={chain(19)} dur={S19_DUR} />;