import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S07_DUR = mountedFrames(7);

/**
 * Scene 7
 * She was not finished. Later in that same meet, Yu finished fourth in both the 400 meter
 * individual medley and the 200 meter butterfly, missing the podium by fractions of a second each
 * time. In the 400 IM, she touched in 4 minutes 33.76 seconds, half a second behind the co-silver
 * medalists. Three finals. Three near misses. One historic medal. All before she had even turned
 * 13.
 *
 * @generated-plain Footage only, no overlay. A graphic goes here only if this line has a real
 * photo, a real number comparison, or a real quote to show — otherwise it stays footage.
 */
export const Scene07: React.FC = () => <BedChain segs={chain(7)} dur={S07_DUR} />;
