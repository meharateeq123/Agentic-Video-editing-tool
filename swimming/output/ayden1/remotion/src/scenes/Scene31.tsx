import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S31_DUR = mountedFrames(31);

/**
 * Scene 31
 * So far, that is exactly what Tan has done. He did not just hold onto his 11-12 form after aging
 * up. He beat older competition in finals, broke into the top 20 all-time in his new age group,
 * and kept dropping full seconds off his personal bests across multiple events, all within his
 * first year in the 13-14 bracket.
 *
 * @generated-plain Footage only, no overlay. A graphic goes here only if this line has a real
 * photo, a real number comparison, or a real quote to show — otherwise it stays footage.
 */
export const Scene31: React.FC = () => <BedChain segs={chain(31)} dur={S31_DUR} />;
