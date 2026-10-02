import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S09_DUR = mountedFrames(9);

/**
 * Scene 9
 * The backstroke progress kept climbing through the summer. By August 2026, Tan swam a 49.40 in
 * the 100 back in Berkeley, a time that made him the fastest 13-year-old to ever swim that event.
 *
 * @generated-plain Footage only, no overlay. A graphic goes here only if this line has a real
 * photo, a real number comparison, or a real quote to show — otherwise it stays footage.
 */
export const Scene09: React.FC = () => <BedChain segs={chain(9)} dur={S09_DUR} />;
