import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S02_DUR = mountedFrames(2);

/**
 * Scene 2
 * This is what life actually looks like for the greatest swimmer of all time, nearly a decade
 * after he stopped racing.
 *
 * @generated-plain Footage only, no overlay. A graphic goes here only if this line has a real
 * photo, a real number comparison, or a real quote to show — otherwise it stays footage.
 */
export const Scene02: React.FC = () => <BedChain segs={chain(2)} dur={S02_DUR} />;
