import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S18_DUR = mountedFrames(18);

/**
 * Scene 18
 * What makes Phelps's post-retirement life stand out is not the size of his house or the models of
 * his cars. It is the shift in what he considers his real work. For eighteen years, his identity
 * was built entirely around being the fastest man in the water. Today, by his own account, his
 * focus is on being present for his sons, running a foundation aimed at kids, and using his
 * platform to make it easier for people to say they are struggling and ask for help.
 *
 * @generated-plain Footage only, no overlay. A graphic goes here only if this line has a real
 * photo, a real number comparison, or a real quote to show — otherwise it stays footage.
 */
export const Scene18: React.FC = () => <BedChain segs={chain(18)} dur={S18_DUR} />;
