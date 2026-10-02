import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S22_DUR = mountedFrames(22);

/**
 * Scene 22
 * You might think that is a heartbreak story. It is not. Because Yu still went home from Singapore
 * with hardware, and the way she got it made history on its own.
 *
 * @generated-plain Footage only, no overlay. A graphic goes here only if this line has a real
 * photo, a real number comparison, or a real quote to show — otherwise it stays footage.
 */
export const Scene22: React.FC = () => <BedChain segs={chain(22)} dur={S22_DUR} />;
