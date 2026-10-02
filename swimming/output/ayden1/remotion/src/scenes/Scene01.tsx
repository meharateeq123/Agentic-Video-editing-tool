import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S01_DUR = mountedFrames(1);

/**
 * Scene 1
 * Last summer, a 12-year-old broke seven national age group records in a single season. The
 * obvious question after any run like that is simple: what happens next? Does the progress
 * continue, or does the kid who dominated one age group get swallowed up by the next one?
 *
 * @generated-plain Footage only, no overlay. A graphic goes here only if this line has a real
 * photo, a real number comparison, or a real quote to show — otherwise it stays footage.
 */
export const Scene01: React.FC = () => <BedChain segs={chain(1)} dur={S01_DUR} />;
