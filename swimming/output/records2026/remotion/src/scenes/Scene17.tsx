import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S17_DUR = mountedFrames(17);

/**
 * Scene 17
 * That is what makes this year different from a normal record-breaking season. Usually, one or two
 * events see historic swims while the rest of the sport moves at its usual pace. In 2026, the
 * record book is under assault across sprint freestyle, sprint butterfly, and endurance freestyle
 * and medley events simultaneously, from swimmers who are still in their early twenties.
 *
 * @generated-plain Footage only, no overlay. A graphic goes here only if this line has a real
 * photo, a real number comparison, or a real quote to show — otherwise it stays footage.
 */
export const Scene17: React.FC = () => <BedChain segs={chain(17)} dur={S17_DUR} />;
