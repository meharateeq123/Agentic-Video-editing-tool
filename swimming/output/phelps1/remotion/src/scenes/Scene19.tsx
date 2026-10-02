import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S19_DUR = mountedFrames(19);

/**
 * Scene 19
 * Phelps built one of the greatest athletic careers in history through obsessive discipline and
 * years of five a.m. training sessions. What he built after that career is a quieter kind of
 * success: a stable family life, a business built around the sport he loves, and an advocacy
 * platform he has said matters more to him than any of his 28 medals.
 *
 * @generated-plain Footage only, no overlay. A graphic goes here only if this line has a real
 * photo, a real number comparison, or a real quote to show — otherwise it stays footage.
 */
export const Scene19: React.FC = () => <BedChain segs={chain(19)} dur={S19_DUR} />;
