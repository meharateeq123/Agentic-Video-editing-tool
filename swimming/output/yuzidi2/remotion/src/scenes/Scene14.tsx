import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S14_DUR = mountedFrames(14);

/**
 * Scene 14
 * The stakes are different this time. In Singapore, Yu was a surprising newcomer, someone nobody
 * quite knew what to expect from. At the Asian Games, she arrives as a known quantity, a swimmer
 * with a World Championship medal and a top-ten all-time performance in the 400 IM. Her
 * competitors have had over a year to study her races. The element of surprise is gone. What
 * remains is whether she can perform under the weight of expectation rather than just curiosity.
 *
 * @generated-plain Footage only, no overlay. A graphic goes here only if this line has a real
 * photo, a real number comparison, or a real quote to show — otherwise it stays footage.
 */
export const Scene14: React.FC = () => <BedChain segs={chain(14)} dur={S14_DUR} />;
