import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S06_DUR = mountedFrames(6);

/**
 * Scene 6
 * At that same Rome meet in June, Walsh also posted a 24.51 in the 50 meter butterfly, the
 * second-fastest time ever swum in that event, behind only Sjostrom's own world record of 24.43
 * from 2014. Two swims, two different strokes, both ranking among the greatest performances in
 * swimming history, in the same meet.
 *
 * @generated-plain Footage only, no overlay. A graphic goes here only if this line has a real
 * photo, a real number comparison, or a real quote to show — otherwise it stays footage.
 */
export const Scene06: React.FC = () => <BedChain segs={chain(6)} dur={S06_DUR} />;
