import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S19_DUR = mountedFrames(19);

/**
 * Scene 19
 * What makes this test genuinely uncertain is that nobody, including Yu herself, knows exactly how
 * a 13-year-old handles this kind of sustained international pressure over multiple events across
 * more than two weeks of competition. Her domestic times suggest she is ready. Her only true
 * international experience suggests she thrives under bright lights. But domestic dominance and
 * international pressure are not always the same thing, and the Asian Games will be the clearest
 * signal yet of which one defines her career going forward.
 *
 * @generated-plain Footage only, no overlay. A graphic goes here only if this line has a real
 * photo, a real number comparison, or a real quote to show — otherwise it stays footage.
 */
export const Scene19: React.FC = () => <BedChain segs={chain(19)} dur={S19_DUR} />;
