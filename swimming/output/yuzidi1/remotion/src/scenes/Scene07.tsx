import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S07_DUR = mountedFrames(7);

/**
 * Scene 7
 * She joined a swim class just to get through the summer. She figured she would quit once real
 * school started. She never quit. A few years later she moved to train with the Hebei Taihua Jinye
 * club, and that is where the talent stopped looking normal and started looking impossible.
 *
 * @generated-plain Footage only, no overlay. A graphic goes here only if this line has a real
 * photo, a real number comparison, or a real quote to show — otherwise it stays footage.
 */
export const Scene07: React.FC = () => <BedChain segs={chain(7)} dur={S07_DUR} />;
