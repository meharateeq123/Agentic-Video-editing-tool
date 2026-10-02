import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S11_DUR = mountedFrames(11);

/**
 * The script attributes a specific quote to Blaney here ("If you can come out of Charlotte
 * within 40 points...") that could not be verified in any downloaded source - it isn't in his
 * April Bristol FOX interview (the footage used) or anywhere else checked. Rather than show a
 * quote caption implying this clip is him saying those exact words, this plays as plain real
 * footage of him (still on-topic: his own post-Bristol interview) under the narration, with no
 * graphic making an unverified claim.
 */
export const Scene11: React.FC = () => <BedChain segs={chain(11)} dur={S11_DUR} amp={0.05} />;
