import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S28_DUR = mountedFrames(28);

/**
 * Scene 28
 * What separates the two groups is rarely just talent. It is usually the ability to keep improving
 * technically even as the competition gets tougher and the margins get smaller.
 *
 * @generated-plain Footage only, no overlay. A graphic goes here only if this line has a real
 * photo, a real number comparison, or a real quote to show — otherwise it stays footage.
 */
export const Scene28: React.FC = () => <BedChain segs={chain(28)} dur={S28_DUR} />;
