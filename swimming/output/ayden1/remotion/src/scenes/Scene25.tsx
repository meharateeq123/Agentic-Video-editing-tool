import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S25_DUR = mountedFrames(25);

/**
 * Scene 25
 * The bigger question hanging over any swimmer this fast this young is what comes after age-group
 * swimming altogether. Coaches who track long-term development often point to swimmers who show
 * range across multiple strokes and distances as more likely to succeed at the senior level,
 * because it suggests strong overall technique rather than one specific physical advantage.
 *
 * @generated-plain Footage only, no overlay. A graphic goes here only if this line has a real
 * photo, a real number comparison, or a real quote to show — otherwise it stays footage.
 */
export const Scene25: React.FC = () => <BedChain segs={chain(25)} dur={S25_DUR} />;
