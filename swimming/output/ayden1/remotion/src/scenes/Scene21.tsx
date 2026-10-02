import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S21_DUR = mountedFrames(21);

/**
 * Scene 21
 * Tan continues to train with San Ramon Valley Aquatics in California, the same club that guided
 * his record-breaking run the year before.
 *
 * @generated-plain Footage only, no overlay. A graphic goes here only if this line has a real
 * photo, a real number comparison, or a real quote to show — otherwise it stays footage.
 */
export const Scene21: React.FC = () => <BedChain segs={chain(21)} dur={S21_DUR} />;
