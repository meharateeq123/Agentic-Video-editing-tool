import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S09_DUR = mountedFrames(9);

/**
 * Scene 9
 * Her age group numbers before Singapore already hinted at what was coming. In her 200 IM debut
 * heat there, she swam 2:11.90, and while that time only ranked 15th among the 16 qualifiers
 * advancing to semifinals, it was still more than nine seconds faster than the U.S. national age
 * group record for 11-12-year-olds in that event, and roughly three seconds faster than the boys'
 * record in the same bracket. She was not just fast for a 12-year-old girl. She was fast by almost
 * any youth swimming standard on the planet.
 *
 * @generated-plain Footage only, no overlay. A graphic goes here only if this line has a real
 * photo, a real number comparison, or a real quote to show — otherwise it stays footage.
 */
export const Scene09: React.FC = () => <BedChain segs={chain(9)} dur={S09_DUR} />;
