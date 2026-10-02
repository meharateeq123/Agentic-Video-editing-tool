import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S15_DUR = mountedFrames(15);

/**
 * Scene 15
 * The biggest names in the sport were all there. Summer McIntosh, breaking world records. American
 * legend Katie Ledecky, one of the greatest swimmers who has ever lived. And in the middle of all
 * of them, a twelve-year-old in a dog-print cap.
 *
 * @generated-plain Footage only, no overlay. A graphic goes here only if this line has a real
 * photo, a real number comparison, or a real quote to show — otherwise it stays footage.
 */
export const Scene15: React.FC = () => <BedChain segs={chain(15)} dur={S15_DUR} />;
