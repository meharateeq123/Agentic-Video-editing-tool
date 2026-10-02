import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S17_DUR = mountedFrames(17);

/**
 * Scene 17
 * But Yu did not come to make up the numbers. She came to fight for a medal. And this is where the
 * story gets almost cruel.
 *
 * @generated-plain Footage only, no overlay. A graphic goes here only if this line has a real
 * photo, a real number comparison, or a real quote to show — otherwise it stays footage.
 */
export const Scene17: React.FC = () => <BedChain segs={chain(17)} dur={S17_DUR} />;
