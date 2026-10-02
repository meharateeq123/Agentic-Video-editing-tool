import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S31_DUR = mountedFrames(31);

/**
 * Scene 31
 * Say that number one more time in your head. Two minutes, seven point four one. From a girl who
 * started swimming to escape the summer heat.
 *
 * @generated-plain Footage only, no overlay. A graphic goes here only if this line has a real
 * photo, a real number comparison, or a real quote to show — otherwise it stays footage.
 */
export const Scene31: React.FC = () => <BedChain segs={chain(31)} dur={S31_DUR} />;
