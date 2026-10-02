import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S04_DUR = mountedFrames(4); // 663f, 4 links

/**
 * Scene 4 -- "It was the BaldEagle.com paint scheme... the scheme he debuted at Talladega."
 *
 * Four looks at the car and the race the scheme belongs to, in-car and broadcast alternating so no single angle sits too long.
 */
export const Scene04: React.FC = () => <BedChain segs={chain(4)} dur={S04_DUR} />;
