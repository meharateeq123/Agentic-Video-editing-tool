import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S02_DUR = mountedFrames(2);

/**
 * Scene 2 -- "Here is exactly what happened, why this win matters so much more than a normal victory." A short roadmap line, so the footage simply keeps moving; a graphic here would be signposting a signpost.
 */
export const Scene02: React.FC = () => <BedChain segs={chain(2)} dur={S02_DUR} />;