import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S26_DUR = mountedFrames(26);

/**
 * Scene 26
 * Tan has shown that range, posting best times and records across backstroke, freestyle,
 * butterfly, and the individual medley since he first appeared on the national radar.
 *
 * @generated-plain Footage only, no overlay. A graphic goes here only if this line has a real
 * photo, a real number comparison, or a real quote to show — otherwise it stays footage.
 */
export const Scene26: React.FC = () => <BedChain segs={chain(26)} dur={S26_DUR} />;
