import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S10_DUR = mountedFrames(10);

/**
 * Scene 10 - "Daniels defended the decision to stay out, calling it a logical move given the
 * alternative... Larson backed that reasoning without hesitation." The reasoning itself (restarting
 * no better than 4th or 5th anyway) is explained by the narration, not a driver's own quote, so
 * nothing is pulled onto the screen here - scene 11 is where his actual words arrive.
 */
export const Scene10: React.FC = () => <BedChain segs={chain(10)} dur={S10_DUR} />;
