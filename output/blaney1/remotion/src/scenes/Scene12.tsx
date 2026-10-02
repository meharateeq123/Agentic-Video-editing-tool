import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S12_DUR = mountedFrames(12);

/**
 * Scene 12 - "Two championship contenders, in the same race, losing brakes within laps of each
 * other. That's not one unlucky part. That's a pattern serious enough that it wiped out multiple
 * title hopefuls on the same afternoon." Footage-only, real Gateway racing.
 */
export const Scene12: React.FC = () => <BedChain segs={chain(12)} dur={S12_DUR} />;
