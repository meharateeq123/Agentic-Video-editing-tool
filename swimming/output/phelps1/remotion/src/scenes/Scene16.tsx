import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S16_DUR = mountedFrames(16);

/**
 * Scene 16
 * Phelps has described parenting as its own kind of demanding training block, one where the payoff
 * is not measured in seconds but in showing up consistently for four young kids. That framing
 * matters for a man who spent nearly two decades measuring his worth in hundredths of a second.
 * Trading a stopwatch for a school pickup line is its own adjustment, and Phelps has been candid
 * that it took real effort to redefine success once competitive swimming stopped providing the
 * scoreboard.
 *
 * @generated-plain Footage only, no overlay. A graphic goes here only if this line has a real
 * photo, a real number comparison, or a real quote to show — otherwise it stays footage.
 */
export const Scene16: React.FC = () => <BedChain segs={chain(16)} dur={S16_DUR} />;
