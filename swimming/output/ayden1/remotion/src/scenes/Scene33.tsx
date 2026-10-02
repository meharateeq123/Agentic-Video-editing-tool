import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S33_DUR = mountedFrames(33);

/**
 * Scene 33
 * Does Ayden Tan keep climbing the rankings as he moves further into his teenage years? Can he
 * keep closing the gap on swimmers several years older than him? Drop your prediction in the
 * comments below. I read every single one.
 *
 * @generated-plain Footage only, no overlay. A graphic goes here only if this line has a real
 * photo, a real number comparison, or a real quote to show — otherwise it stays footage.
 */
export const Scene33: React.FC = () => <BedChain segs={chain(33)} dur={S33_DUR} />;
