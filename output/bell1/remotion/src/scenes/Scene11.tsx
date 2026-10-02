import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S11_DUR = mountedFrames(11);

/**
 * Scene 11 -- "A broken wrist is the kind of injury that can derail months of a season." Reasoning, not a statistic. The footage of him racing hurt is the argument.
 */
export const Scene11: React.FC = () => <BedChain segs={chain(11)} dur={S11_DUR} />;