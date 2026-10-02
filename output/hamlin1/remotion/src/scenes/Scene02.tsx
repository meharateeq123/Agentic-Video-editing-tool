import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S02_DUR = mountedFrames(2);

/**
 * Scene 2 - "Here's exactly what happened at Darlington, how it happened, and why Hamlin has almost
 * no room left for another mistake." A six-second roadmap line; a graphic here would be a signpost
 * pointing at a signpost, so the footage just keeps moving.
 */
export const Scene02: React.FC = () => <BedChain segs={chain(2)} dur={S02_DUR} />;
