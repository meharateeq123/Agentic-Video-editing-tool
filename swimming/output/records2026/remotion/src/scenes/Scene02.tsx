import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S02_DUR = mountedFrames(2);

/**
 * Scene 2
 * Here are the records that shocked the world in 2026, and why the fastest swimmers on the planet
 * think the biggest shocks might still be coming.
 *
 * @generated-plain Footage only, no overlay. A graphic goes here only if this line has a real
 * photo, a real number comparison, or a real quote to show — otherwise it stays footage.
 */
export const Scene02: React.FC = () => <BedChain segs={chain(2)} dur={S02_DUR} />;
