import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S18_DUR = mountedFrames(18);

/**
 * Scene 18
 * It shows he can compete directly against older, more physically developed swimmers, not just
 * dominate his own peer group.
 *
 * @generated-plain Footage only, no overlay. A graphic goes here only if this line has a real
 * photo, a real number comparison, or a real quote to show — otherwise it stays footage.
 */
export const Scene18: React.FC = () => <BedChain segs={chain(18)} dur={S18_DUR} />;
