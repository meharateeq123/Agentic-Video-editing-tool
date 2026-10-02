import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S35_DUR = mountedFrames(35);

/**
 * Scene 35
 * She is not a finished product. She is barely a beginning.
 *
 * @generated-plain Footage only, no overlay. A graphic goes here only if this line has a real
 * photo, a real number comparison, or a real quote to show — otherwise it stays footage.
 */
export const Scene35: React.FC = () => <BedChain segs={chain(35)} dur={S35_DUR} />;
