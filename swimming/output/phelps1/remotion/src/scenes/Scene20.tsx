import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S20_DUR = mountedFrames(20);

/**
 * Scene 20
 * Do you think Michael Phelps has found more fulfillment after swimming than he did during his
 * competitive career? What do you think retired athletes should do with the platform they build?
 * Drop your thoughts in the comments below.
 *
 * @generated-plain Footage only, no overlay. A graphic goes here only if this line has a real
 * photo, a real number comparison, or a real quote to show — otherwise it stays footage.
 */
export const Scene20: React.FC = () => <BedChain segs={chain(20)} dur={S20_DUR} />;
