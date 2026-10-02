import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S04_DUR = mountedFrames(4);

/**
 * Scene 4
 * The signs that she was different from other young swimmers showed up fast. By her early teens,
 * Yu was already swimming times that outpaced not just her own age group but the age group above
 * her. Before she ever set foot in a global championship, her results in China had already made
 * her a name to watch.
 *
 * @generated-plain Footage only, no overlay. A graphic goes here only if this line has a real
 * photo, a real number comparison, or a real quote to show — otherwise it stays footage.
 */
export const Scene04: React.FC = () => <BedChain segs={chain(4)} dur={S04_DUR} />;
