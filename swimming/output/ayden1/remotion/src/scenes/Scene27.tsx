import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S27_DUR = mountedFrames(27);

/**
 * Scene 27
 * There are no guarantees in age group swimming. Puberty changes bodies unpredictably. Some
 * swimmers who dominate their early teenage years plateau once their competitors catch up
 * physically. Others keep improving steadily into their college years and beyond.
 *
 * @generated-plain Footage only, no overlay. A graphic goes here only if this line has a real
 * photo, a real number comparison, or a real quote to show — otherwise it stays footage.
 */
export const Scene27: React.FC = () => <BedChain segs={chain(27)} dur={S27_DUR} />;
