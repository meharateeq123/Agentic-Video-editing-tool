import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S15_DUR = mountedFrames(15);

/**
 * Scene 15 -- "After contact with Michael McDowell sent him into the wall, Hamlin fell a lap down... eventually finishing 18th." The contact and the damage are on camera, so the footage tells it.
 */
export const Scene15: React.FC = () => <BedChain segs={chain(15)} dur={S15_DUR} />;