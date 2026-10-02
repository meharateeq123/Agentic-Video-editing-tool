import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S14_DUR = mountedFrames(14);

/**
 * Scene 14
 * So where does that leave the record book heading into the short course season? Short course
 * meters, swum in 25 meter pools instead of 50, produces different times due to the extra turns,
 * and its own separate set of world records. Given how many long course marks fell in the first
 * eight months of 2026, from sprint freestyle to butterfly to the oldest surviving women's record
 * in the sport, there is little reason to think the record-breaking pace slows down once the
 * season shifts to short course pools.
 *
 * @generated-plain Footage only, no overlay. A graphic goes here only if this line has a real
 * photo, a real number comparison, or a real quote to show — otherwise it stays footage.
 */
export const Scene14: React.FC = () => <BedChain segs={chain(14)} dur={S14_DUR} />;
