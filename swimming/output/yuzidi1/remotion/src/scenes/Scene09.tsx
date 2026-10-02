import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S09_DUR = mountedFrames(9);

/**
 * Scene 9
 * There is one way around the age limit. If you swim fast enough to beat the elite qualifying
 * standard, the door opens no matter how young you are. Most twelve-year-olds are nowhere near
 * that wall. Yu blew straight through it.
 *
 * @generated-plain Footage only, no overlay. A graphic goes here only if this line has a real
 * photo, a real number comparison, or a real quote to show — otherwise it stays footage.
 */
export const Scene09: React.FC = () => <BedChain segs={chain(9)} dur={S09_DUR} />;
