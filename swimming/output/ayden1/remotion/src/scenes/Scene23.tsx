import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S23_DUR = mountedFrames(23);

/**
 * Scene 23
 * Club stability matters more than casual fans often realize. Many young swimmers change teams and
 * coaches repeatedly as they search for the right fit, which can disrupt technical development
 * during exactly the years when it matters most.
 *
 * @generated-plain Footage only, no overlay. A graphic goes here only if this line has a real
 * photo, a real number comparison, or a real quote to show — otherwise it stays footage.
 */
export const Scene23: React.FC = () => <BedChain segs={chain(23)} dur={S23_DUR} />;
