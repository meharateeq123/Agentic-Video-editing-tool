import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S11_DUR = mountedFrames(11);

/**
 * Scene 11
 * Think about that for a second. A schoolgirl was posting times that Olympic finalists would
 * respect. She had already come painfully close once. In 2024, she tried to qualify for the Paris
 * Games in the 400 medley and missed the cut by about two seconds. Two seconds, at eleven years
 * old.
 *
 * @generated-plain Footage only, no overlay. A graphic goes here only if this line has a real
 * photo, a real number comparison, or a real quote to show — otherwise it stays footage.
 */
export const Scene11: React.FC = () => <BedChain segs={chain(11)} dur={S11_DUR} />;
