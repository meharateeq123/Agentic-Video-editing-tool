import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S01_DUR = mountedFrames(1);

/**
 * Scene 1
 * A scoreboard flashes red. Then it happens again. And again. By mid-2026, swimming fans had
 * watched world record after world record fall, sometimes to the same swimmer twice in the same
 * year. This is not a normal season. This is a year that is rewriting what elite swimming looks
 * like.
 *
 * @generated-plain Footage only, no overlay. A graphic goes here only if this line has a real
 * photo, a real number comparison, or a real quote to show — otherwise it stays footage.
 */
export const Scene01: React.FC = () => <BedChain segs={chain(1)} dur={S01_DUR} />;
