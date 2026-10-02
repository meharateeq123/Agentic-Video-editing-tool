import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S04_DUR = mountedFrames(4);

/**
 * Scene 4 - "This wasn't a driver hanging on or scraping by. This was a driver in position to
 * gain ground on the exact man he needed to catch." Footage-only transition line.
 */
export const Scene04: React.FC = () => <BedChain segs={chain(4)} dur={S04_DUR} />;
