import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S20_DUR = mountedFrames(20);

/**
 * Scene 20
 * Does Yu Zidi medal individually at the 2026 Asian Games? Does she keep closing the gap toward
 * Olympic contention two years ahead of Los Angeles? Drop your prediction in the comments below. I
 * read every single one.
 *
 * @generated-plain Footage only, no overlay. A graphic goes here only if this line has a real
 * photo, a real number comparison, or a real quote to show — otherwise it stays footage.
 */
export const Scene20: React.FC = () => <BedChain segs={chain(20)} dur={S20_DUR} />;
