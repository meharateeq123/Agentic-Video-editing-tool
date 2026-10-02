import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S01_DUR = mountedFrames(1);

/**
 * Scene 1 - "Joey Logano JUST Dropped a BOMBSHELL on Kyle Larson at Gateway Pole!" (title, no
 * card - the line itself is the hook).
 *
 * Footage-only - no overlay. Default every line to no text; only add a graphic when there is a
 * real number/comparison or a real quote to show.
 */
export const Scene01: React.FC = () => <BedChain segs={chain(1)} dur={S01_DUR} />;
