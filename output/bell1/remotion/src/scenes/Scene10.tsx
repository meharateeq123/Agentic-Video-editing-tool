import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S10_DUR = mountedFrames(10);

/**
 * Scene 10 -- "When I was sitting in the infield care center at Michigan, I thought my season would be over." The second quote of the film. Scene 5 already carries a pull-quote card, so this one plays on his face instead -- same words, different treatment, per the no-repeated-template rule.
 */
export const Scene10: React.FC = () => <BedChain segs={chain(10)} dur={S10_DUR} />;