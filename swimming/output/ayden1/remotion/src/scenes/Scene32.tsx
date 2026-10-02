import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S32_DUR = mountedFrames(32);

/**
 * Scene 32
 * The pattern so far suggests Tan is not just a swimmer who peaked early. He is a swimmer whose
 * results keep climbing every time the competition gets harder. That is the trait that separates
 * age group record holders who fade from the ones who go on to make senior national teams.
 *
 * @generated-plain Footage only, no overlay. A graphic goes here only if this line has a real
 * photo, a real number comparison, or a real quote to show — otherwise it stays footage.
 */
export const Scene32: React.FC = () => <BedChain segs={chain(32)} dur={S32_DUR} />;
