import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S25_DUR = mountedFrames(25);

/**
 * Scene 25
 * So she left Singapore as the youngest ever to reach a final, the youngest ever to win a medal,
 * and the swimmer everyone in the building was whispering about. But she still did not have that
 * one signature swim. The one that leaves no argument. That was still coming.
 *
 * @generated-plain Footage only, no overlay. A graphic goes here only if this line has a real
 * photo, a real number comparison, or a real quote to show — otherwise it stays footage.
 */
export const Scene25: React.FC = () => <BedChain segs={chain(25)} dur={S25_DUR} />;
