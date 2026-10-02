import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S08_DUR = mountedFrames(8);

/**
 * Scene 8
 * Now here is the rule that makes her story so strange. To swim at the World Championships, you
 * are normally supposed to be at least fourteen years old. Yu was twelve. So how was she even
 * allowed in the pool?
 *
 * @generated-plain Footage only, no overlay. A graphic goes here only if this line has a real
 * photo, a real number comparison, or a real quote to show — otherwise it stays footage.
 */
export const Scene08: React.FC = () => <BedChain segs={chain(8)} dur={S08_DUR} />;
