import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S17_DUR = mountedFrames(17);

/**
 * Scene 17
 * In the 13-14 bracket, he is now racing against swimmers up to two years older, some of whom are
 * already committing to top college programs. Beating a final of high schoolers in backstroke, as
 * he did in February, is a different kind of statement than breaking a national age group record
 * in a smaller local meet.
 *
 * @generated-plain Footage only, no overlay. A graphic goes here only if this line has a real
 * photo, a real number comparison, or a real quote to show — otherwise it stays footage.
 */
export const Scene17: React.FC = () => <BedChain segs={chain(17)} dur={S17_DUR} />;
