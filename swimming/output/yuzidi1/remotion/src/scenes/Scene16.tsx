import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S16_DUR = mountedFrames(16);

/**
 * Scene 16
 * Her first event was the 200 individual medley. To even reach the final, she had to beat women
 * nearly twice her age. She did. And the moment she touched that wall in the semifinal and saw her
 * name in the top eight, she became the youngest swimmer ever to reach a final at a World
 * Championships. Just reaching the final was already history.
 *
 * @generated-plain Footage only, no overlay. A graphic goes here only if this line has a real
 * photo, a real number comparison, or a real quote to show — otherwise it stays footage.
 */
export const Scene16: React.FC = () => <BedChain segs={chain(16)} dur={S16_DUR} />;
