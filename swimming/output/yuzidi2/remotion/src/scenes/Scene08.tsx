import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S08_DUR = mountedFrames(8);

/**
 * Scene 8
 * World Aquatics rules normally require swimmers to be at least 14 to compete at major
 * international championships. Yu was allowed in under an exception reserved for swimmers fast
 * enough to justify it. She was fast enough.
 *
 * @generated-plain Footage only, no overlay. A graphic goes here only if this line has a real
 * photo, a real number comparison, or a real quote to show — otherwise it stays footage.
 */
export const Scene08: React.FC = () => <BedChain segs={chain(8)} dur={S08_DUR} />;
