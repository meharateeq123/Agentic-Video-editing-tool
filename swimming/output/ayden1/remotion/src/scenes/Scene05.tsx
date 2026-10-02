import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S05_DUR = mountedFrames(5);

/**
 * Scene 5
 * Tan wasted no time. At the Roseville Sectionals in February 2026, competing in the 50 yard
 * backstroke, Tan did something that stopped people watching cold.
 *
 * @generated-plain Footage only, no overlay. A graphic goes here only if this line has a real
 * photo, a real number comparison, or a real quote to show — otherwise it stays footage.
 */
export const Scene05: React.FC = () => <BedChain segs={chain(5)} dur={S05_DUR} />;
