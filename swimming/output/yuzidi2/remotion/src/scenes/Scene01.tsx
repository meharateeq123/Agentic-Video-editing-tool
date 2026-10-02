import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S01_DUR = mountedFrames(1);

/**
 * Scene 1
 * A year ago, a 12-year-old walked onto a World Championship pool deck and finished fourth, three
 * times, against the best swimmers on the planet. Now she is 13, and in the next few days, she
 * faces the biggest test of her young career yet.
 *
 * @generated-plain Footage only, no overlay. A graphic goes here only if this line has a real
 * photo, a real number comparison, or a real quote to show — otherwise it stays footage.
 */
export const Scene01: React.FC = () => <BedChain segs={chain(1)} dur={S01_DUR} />;
