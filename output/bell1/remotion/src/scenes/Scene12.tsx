import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S12_DUR = mountedFrames(12);

/**
 * Scene 12 -- "Bell bowed toward the packed Darlington grandstands in a gesture honoring his former teammate, the late Kyle Busch." Deliberately no overlay of any kind. This is the emotional beat of the film and anything laid over it would cheapen it.
 */
export const Scene12: React.FC = () => <BedChain segs={chain(12)} dur={S12_DUR} />;