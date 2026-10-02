import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S37_DUR = mountedFrames(37);

/**
 * Scene 37
 * Was Singapore the ceiling, or was it the warning shot?
 *
 * @generated-plain Footage only, no overlay. A graphic goes here only if this line has a real
 * photo, a real number comparison, or a real quote to show — otherwise it stays footage.
 */
export const Scene37: React.FC = () => <BedChain segs={chain(37)} dur={S37_DUR} />;
