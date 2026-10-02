import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S03_DUR = mountedFrames(3);

/**
 * Scene 3 - "Blaney came into Sunday's Enjoy Illinois 300... He posted back-to-back fourth-place
 * finishes in Stage 1 and Stage 2... By the final stage, he was running sixth and closing in on
 * Denny Hamlin... for fifth place." Footage-only, real Gateway racing.
 */
export const Scene03: React.FC = () => <BedChain segs={chain(3)} dur={S03_DUR} />;
