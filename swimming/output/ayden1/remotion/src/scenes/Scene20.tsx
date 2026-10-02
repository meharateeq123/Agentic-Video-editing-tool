import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S20_DUR = mountedFrames(20);

/**
 * Scene 20
 * Tan's results suggest the opposite pattern so far. Rather than the field catching up to him, he
 * has continued opening distance on his own age group while also closing the gap on swimmers who
 * used to be well out of reach.
 *
 * @generated-plain Footage only, no overlay. A graphic goes here only if this line has a real
 * photo, a real number comparison, or a real quote to show — otherwise it stays footage.
 */
export const Scene20: React.FC = () => <BedChain segs={chain(20)} dur={S20_DUR} />;
