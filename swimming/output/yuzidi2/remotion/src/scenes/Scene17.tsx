import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S17_DUR = mountedFrames(17);

/**
 * Scene 17
 * Her path forward already looks mapped out. On her current trajectory, Yu is expected to compete
 * at the Los Angeles 2028 Olympics, where she will be 15 years old. If her improvement curve from
 * the past year continues, she will arrive in Los Angeles as a legitimate medal threat rather than
 * a young athlete gaining experience. But that path runs directly through meets like this one in
 * Japan, where she has to prove her Singapore performance was the beginning of a trend, not a
 * one-time surprise fueled by novelty.
 *
 * @generated-plain Footage only, no overlay. A graphic goes here only if this line has a real
 * photo, a real number comparison, or a real quote to show — otherwise it stays footage.
 */
export const Scene17: React.FC = () => <BedChain segs={chain(17)} dur={S17_DUR} />;
