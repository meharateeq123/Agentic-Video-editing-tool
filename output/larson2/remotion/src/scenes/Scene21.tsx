import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S21_DUR = mountedFrames(21);

/**
 * Scene 21 - "The next eight races will decide whether Sunday was the moment Larson officially
 * took over this championship fight... Denny Hamlin knows exactly who he has to watch now."
 * Footage-only - closing line, no graphic, real footage lands the ending.
 */
export const Scene21: React.FC = () => <BedChain segs={chain(21)} dur={S21_DUR} />;
