import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S16_DUR = mountedFrames(16);

/**
 * Scene 16
 * That mindset will be tested directly at these Asian Games. A young athlete who performed well as
 * a surprising underdog does not always perform the same way once she is the swimmer everyone
 * expects to medal. Handling that shift, mentally as much as physically, is often the real
 * dividing line between prodigies who fade and prodigies who become long-term stars.
 *
 * @generated-plain Footage only, no overlay. A graphic goes here only if this line has a real
 * photo, a real number comparison, or a real quote to show — otherwise it stays footage.
 */
export const Scene16: React.FC = () => <BedChain segs={chain(16)} dur={S16_DUR} />;
