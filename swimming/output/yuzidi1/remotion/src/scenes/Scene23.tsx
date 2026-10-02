import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S23_DUR = mountedFrames(23);

/**
 * Scene 23
 * China needed her in the heats of the 4x200 meter freestyle relay. She led the team off with a
 * split of 1 minute, 59.28 seconds and helped push them into the final. In the final, China took
 * the bronze. And under the rules, swimmers who race in the heats get the same medal the team
 * wins.
 *
 * @generated-plain Footage only, no overlay. A graphic goes here only if this line has a real
 * photo, a real number comparison, or a real quote to show — otherwise it stays footage.
 */
export const Scene23: React.FC = () => <BedChain segs={chain(23)} dur={S23_DUR} />;
