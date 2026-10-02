import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S30_DUR = mountedFrames(30);

/**
 * Scene 30
 * Compare that to a swimmer who only improves in one narrow event. A one-event specialist can be
 * caught quickly once puberty changes body proportions. A swimmer improving everywhere at once has
 * more paths to keep climbing even if one particular stroke stalls temporarily.
 *
 * @generated-plain Footage only, no overlay. A graphic goes here only if this line has a real
 * photo, a real number comparison, or a real quote to show — otherwise it stays footage.
 */
export const Scene30: React.FC = () => <BedChain segs={chain(30)} dur={S30_DUR} />;
