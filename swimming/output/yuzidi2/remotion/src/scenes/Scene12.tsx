import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S12_DUR = mountedFrames(12);

/**
 * Scene 12
 * It is worth noting how these achievements compare across events for context, not just headlines.
 * Her 400 IM time of 4:30.79 ranks eighth in the entire history of the event, across swimmers of
 * every age, not just her own age bracket. Her 200 fly and 400 free times from the same meet were
 * also lifetime bests. That kind of across-the-board improvement, rather than one standout swim,
 * is usually a stronger signal of genuine development than a single fast race.
 *
 * @generated-plain Footage only, no overlay. A graphic goes here only if this line has a real
 * photo, a real number comparison, or a real quote to show — otherwise it stays footage.
 */
export const Scene12: React.FC = () => <BedChain segs={chain(12)} dur={S12_DUR} />;
