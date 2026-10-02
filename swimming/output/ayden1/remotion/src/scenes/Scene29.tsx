import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S29_DUR = mountedFrames(29);

/**
 * Scene 29
 * Tan's own numbers make the case for optimism. A swimmer whose times drop by full seconds year
 * over year, across backstroke, freestyle, and the medley, is showing the kind of broad-based
 * development that tends to carry forward rather than stall out.
 *
 * @generated-plain Footage only, no overlay. A graphic goes here only if this line has a real
 * photo, a real number comparison, or a real quote to show — otherwise it stays footage.
 */
export const Scene29: React.FC = () => <BedChain segs={chain(29)} dur={S29_DUR} />;
